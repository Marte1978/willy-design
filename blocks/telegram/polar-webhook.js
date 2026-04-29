/**
 * willy-design · block: telegram (Polar webhook → Telegram)
 *
 * Vercel serverless function. Recibe webhooks de Polar (Standard Webhooks
 * signature) y envía notificación al chat de Telegram configurado.
 *
 * Coloca este archivo en `api/polar-webhook.js` del proyecto Vercel.
 *
 * Variables de entorno requeridas:
 *   TELEGRAM_BOT_TOKEN     token del bot
 *   TELEGRAM_CHAT_ID       chat destino (ej: 8380327905)
 *   POLAR_WEBHOOK_SECRET   secret que devuelve POST /v1/webhooks/endpoints
 *
 * Pattern documentado en:
 *   ~/.claude/projects/.../memory/reference_polar_webhook_pattern.md
 */

const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID   = process.env.TELEGRAM_CHAT_ID;
  const POLAR_WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: "missing telegram env" });
  }

  const rawBody = await readRawBody(req);

  // Verify Polar signature when secret is configured
  if (POLAR_WEBHOOK_SECRET) {
    const id        = req.headers["webhook-id"];
    const timestamp = req.headers["webhook-timestamp"];
    const sigHeader = req.headers["webhook-signature"];
    if (!id || !timestamp || !sigHeader) {
      return res.status(400).json({ error: "missing webhook headers" });
    }
    const secret = POLAR_WEBHOOK_SECRET.replace(/^(polar_whs_|whsec_)/, "");
    const secretBytes = Buffer.from(secret, "base64");
    const signedContent = `${id}.${timestamp}.${rawBody}`;
    const expected = crypto
      .createHmac("sha256", secretBytes)
      .update(signedContent)
      .digest("base64");
    const provided = sigHeader
      .split(" ")
      .map((p) => p.split(",")[1])
      .filter(Boolean);
    const ok = provided.some((s) => safeEqual(s, expected));
    if (!ok) {
      return res.status(401).json({ error: "invalid signature" });
    }
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: "invalid json" });
  }

  const text = formatMessage(event);
  if (!text) {
    return res.status(200).json({ ok: true, skipped: event.type });
  }

  try {
    const tg = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );
    const tgJson = await tg.json();
    if (!tgJson.ok) {
      return res.status(502).json({ error: "telegram failed", tg: tgJson });
    }
    return res.status(200).json({ ok: true, type: event.type });
  } catch (e) {
    return res.status(500).json({ error: "telegram fetch error" });
  }
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function safeEqual(a, b) {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function formatMessage(event) {
  const t = event.type || "";
  const data = event.data || {};

  if (t === "order.created" || t === "order.paid") {
    const amount = ((data.amount ?? data.net_amount ?? 0) / 100).toFixed(2);
    const currency = (data.currency || "usd").toUpperCase();
    const product = data.product?.name || "—";
    const customer = data.customer?.email || data.customer_email || "—";
    const id = data.id || "—";
    const tag = t === "order.paid" ? "💰 PAGO RECIBIDO" : "🛒 Nueva orden";
    return [
      `<b>${tag}</b>`,
      ``,
      `<b>Producto:</b> ${escapeHtml(product)}`,
      `<b>Monto:</b> ${currency} ${amount}`,
      `<b>Cliente:</b> ${escapeHtml(customer)}`,
      `<b>Order ID:</b> <code>${escapeHtml(id)}</code>`,
      ``,
      `<i>Recuerda: enviar formulario de información del proyecto al cliente.</i>`,
    ].join("\n");
  }

  if (t === "checkout.updated" && data.status === "succeeded") {
    const amount = ((data.amount ?? 0) / 100).toFixed(2);
    const product = data.product?.name || "—";
    const email = data.customer_email || data.customer?.email || "—";
    return [
      `<b>✅ Checkout completado</b>`,
      ``,
      `<b>Producto:</b> ${escapeHtml(product)}`,
      `<b>Monto:</b> USD ${amount}`,
      `<b>Email:</b> ${escapeHtml(email)}`,
    ].join("\n");
  }

  if (t === "subscription.created" || t === "subscription.canceled") {
    const product = data.product?.name || "—";
    const email = data.user?.email || data.customer?.email || "—";
    const tag = t === "subscription.created" ? "🔁 Nueva suscripción" : "❌ Suscripción cancelada";
    return `<b>${tag}</b>\n\n<b>Producto:</b> ${escapeHtml(product)}\n<b>Email:</b> ${escapeHtml(email)}`;
  }

  return null;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
