---
name: wd-ship
description: Sub-skill #7 (final) del pipeline willy-design. Despliega el sitio aprobado por wd-review a producción. Crea repo GitLab privado del cliente, push, deploy a Vercel con custom domain (subdomain.webfactoryrd.com o el dominio del cliente), configura Cloudflare DNS si aplica, registra webhook Polar→Telegram si el sitio tiene checkout, valida HTTP 200 + SSL, y genera reporte final con todos los URLs. Activa solo después de wd-review con score ≥8. Usa los tokens del usuario en secrets/ — nunca expone credenciales en repo.
---

# wd-ship — Deploy a producción

> Sub-skill #7 (final) del pipeline. Lleva el sitio del workspace local a un dominio en producción con SSL, monitoreo y notificaciones.

## Pre-condiciones

- Sitio aprobado en wd-review (score ≥8)
- Workspace tiene: `index.html`, `tokens.css`, assets, `og.png`
- Si tiene Polar checkout: producto Polar ya creado con su `polar_cl_*` URL
- Tokens disponibles en `~/.claude/secrets/`:
  - `gitlab.token` (PAT con scope api)
  - `vercel.token` (vcp_*)
  - `cloudflare.token` (cfut_*)
  - `polar.token` (polar_oat_*)
  - `telegram-bot.token`

## Pipeline interno

```
1. Crear repo GitLab privado: willymartetirado/[slug]
2. .gitignore + LICENSE (si MIT) + README mínimo
3. git init + add + commit + push
4. Vercel link --project [slug] --scope marte1978s-projects
5. Vercel deploy --prod
6. Vercel add-domain [subdomain].webfactoryrd.com (o dominio cliente)
7. Cloudflare DNS si necesario (subdominios fuera del wildcard)
8. Si Polar checkout: crear webhook endpoint → /api/polar-webhook
9. Si Telegram notify: configurar TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID env vars
10. Verificar:
    - HTTP 200 en root
    - SSL válido
    - OG meta tags presentes
    - Webhook endpoint responde 405 en GET (correcto)
11. Reporte final con URLs y siguientes pasos
```

## Decisión de dominio

| Caso | Dominio |
|---|---|
| Cliente WebFactoryRD usa subdominio | `[slug].webfactoryrd.com` (gratis con wildcard) |
| Cliente trae su propio .com | `[cliente.com]` (Cloudflare DNS + Vercel custom domain) |
| Cliente quiere .com.do | Comprar en NIC.do (manual de Willy, no auto) |
| Pruebas / demos | `demo-[slug].webfactoryrd.com` |

## Stack de deploy

**Default: Vercel** (no GitLab Pages — el CI quota free se agota).
- HTML estático: Vercel detecta automáticamente
- Si tiene `/api/*`: Vercel serverless functions Node 20

## Configuración Polar webhook (si aplica)

```
1. POST /v1/webhooks/endpoints {
     url: "https://[domain]/api/polar-webhook",
     format: "raw",
     events: ["order.created", "order.paid", "checkout.updated"]
   }
2. Guardar el `secret` que devuelve Polar:
   - En Vercel env: POLAR_WEBHOOK_SECRET
   - En backup: secrets/[slug]/polar-webhook-secret.txt
3. Redeploy para picking up del secret
```

Reusa el patrón de `secrets/web24-landing/` y la skill `reference_polar_webhook_pattern`.

## Variables de entorno por tipo de sitio

```
TELEGRAM_BOT_TOKEN          (siempre, si hay notificaciones)
TELEGRAM_CHAT_ID            (default: 8380327905 = Willy)
POLAR_WEBHOOK_SECRET        (solo si Polar checkout)
POLAR_PRODUCT_ID            (opcional — para tracking)
GA4_MEASUREMENT_ID          (si Google Analytics está activo)
META_PIXEL_ID               (si Meta Pixel)
```

## .gitignore obligatorio

```
node_modules/
.vercel/
.env
.env.*
*.token
secrets/
*.log
.DS_Store
```

## README.md mínimo en cada repo cliente

```markdown
# [cliente]

> Sitio WebFactoryRD generado con `willy-design`
> Stack: HTML estático + Tailwind v4 · Deploy: Vercel
> URL: https://[domain]

## Estructura

- `index.html` — landing principal
- `tokens.css` — design tokens
- `og.png` — preview social media

## Deploy

Auto-deploy en push a `main` (Vercel).

## Soporte

- WhatsApp: [+1 809 812 0157](https://wa.me/18098120157)
- Email: hola@webfactoryrd.com
```

## Validaciones post-deploy

```bash
# 1. Sitio responde
curl -sI https://[domain]/  →  HTTP/1.1 200 OK

# 2. SSL OK
curl -sI https://[domain]/  →  cert valid

# 3. OG image existe
curl -sI https://[domain]/og.png  →  HTTP/1.1 200 OK · image/png

# 4. Webhook (si aplica) responde 405 en GET
curl -s https://[domain]/api/polar-webhook  →  {"error":"method not allowed"}

# 5. SEO básico
curl -sL https://[domain]/ | grep -E 'og:title|og:image|description' | wc -l  →  ≥3
```

## Output reporte final

```
🚀 wd-ship completado · [cliente]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Sitio:           https://[domain]
🗄  Repo GitLab:    https://gitlab.com/willymartetirado/[slug]
🚀 Vercel project:  prj_[id]
🔒 SSL:             OK · let's encrypt
📦 OG image:        /og.png · 1200×630

💳 Polar:           [URL del checkout o N/A]
📱 WhatsApp:        +1 809 812 0157 (mensaje pre-rellenado)
🔔 Telegram:        @webfactoryrd_bot → chat 8380327905

📊 Performance:     LCP X.Xs · CLS 0.0X · A11y X/100
🧪 Review score:    X.X/10

⏱  Tiempo total:   XX min

✅ Listo para vender. Compártelo:
   https://[domain]
```

## Anti-patrones

- ❌ Subir secrets al repo — `.gitignore` SIEMPRE primero
- ❌ Push a `main` sin pasar wd-review
- ❌ Crear webhook Polar antes de que el endpoint Vercel esté live
- ❌ Olvidar redeploy después de agregar env vars
- ❌ No verificar HTTP 200 antes de reportar como listo

## Manejo de errores

- Si Vercel deploy falla con "build error" → revisar logs, fix, redeploy
- Si DNS no propaga → esperar 5 min y reverificar (Cloudflare suele ser <2 min)
- Si SSL no se emite → forzar verificación manual en Vercel domain settings
- Si webhook Polar 401 → verificar secret está en Vercel env y deploy es post-set

## Marketing post-deploy

Después de éxito, generar:
- 1 mensaje de Willy a WhatsApp/redes anunciando el sitio (60-100 palabras)
- 1 caso de estudio breve (200 palabras) para incluir en webfactoryrd.com/casos
