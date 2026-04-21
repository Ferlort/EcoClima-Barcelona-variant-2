# EcoClima Barcelona — Landing Page

Landing de conversión para **EcoClima Barcelona** (instalación y mantenimiento de aire acondicionado).
Stack: **HTML + CSS + JavaScript vanilla**. Sin frameworks, sin build step.

---

## Estructura (plana)

Todos los archivos viven en la raíz del proyecto, sin subcarpetas:

```
EcoClima Barcelona variant 2/
├── index.html          # Página principal (9 secciones)
├── styles.css          # Estilos completos (eco palette, REM, responsive)
├── main.js             # i18n ES/EN, A/B/C, header, chatbot, form, reveal
├── calculator.js       # Calculadora de presupuesto
├── analytics.js        # GA4 + Google Ads (track*/trackConversion)
├── header.html         # Snippet del header (opcional, para multi-page)
├── footer.html         # Snippet del footer (opcional)
└── README.md
```

**Imágenes opcionales** (colocarlas en la raíz si quieres sustituir los gradientes de fallback):

- `og-cover.jpg` — 1200×630, preview de OpenGraph
- `service-install.jpg` — 640×420
- `service-maintenance.jpg` — 640×420
- `service-repair.jpg` — 640×420

Si no existen, `index.html` usa un gradiente CSS como fallback automático (atributo `onerror` en los `<img>`).

---

## Características

- Mobile-first, responsive fluido (320px → 4K)
- Fuente **Inter**, sistema REM (1rem = 16px)
- Paleta eco: verde `#10b981` + aqua `#06b6d4`
- Sticky header + burger menu en móvil
- FAB stack: **Chatbot ↑ · Telegram · WhatsApp ↓** (no bloquea el contenido)
- Chatbot rule-based bilingüe (cerrado por defecto)
- Calculadora en vivo (`precio = base × vivienda × accesibilidad × equipos`)
- Formulario de contacto con validación nativa
- Idiomas: **Español (default)** / **Inglés** (switch en header + `localStorage`)
- **A/B/C copy variants** en el HERO (urgencia / confianza / eco)
- Google Analytics 4 + Google Ads conversion tracking
- SEO: meta title/description, OpenGraph, Twitter Cards, JSON-LD `HVACBusiness`
- Lazy load en imágenes, animaciones reveal-on-scroll, `prefers-reduced-motion`

---

## Puesta en marcha

### Abrir localmente

**Doble clic** sobre `index.html` — funciona en cualquier navegador.

**Servidor local** (recomendado, evita restricciones de `file://`):
```powershell
# Python 3
python -m http.server 5173

# Node (si tienes npx)
npx serve .

# VSCode: extensión "Live Server" → click derecho en index.html
```

Luego abre `http://localhost:5173`.

### Desplegar

Cualquier hosting estático funciona. Subes los 8 archivos y listo:

- **Netlify** (drag & drop)
- **Vercel**
- **GitHub Pages**
- **Cloudflare Pages**
- **Firebase Hosting**, **Surge**, o cualquier FTP/servidor Apache/Nginx

---

## Configuración antes del deploy

### 1. IDs de Google Analytics / Ads

En **`index.html`** (cabecera):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
gtag('config', 'G-XXXXXXX');
gtag('config', 'AW-XXXXXXX');
```

En **`analytics.js`** (arriba):
```js
var GA4_ID    = 'G-XXXXXXX';
var ADS_ID    = 'AW-XXXXXXX';
var ADS_LABEL = 'abcDEF123';
```

### 2. Contacto

Búsqueda/reemplazo global en `index.html`, `header.html`, `footer.html`, `calculator.js`:
- `34637575000` → tu número WhatsApp
- `637 575 000` → tu teléfono visible
- `@ecoclimabcn` → tu usuario de Telegram

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Variante HERO A/B/C | `main.js` → `var ACTIVE_AB = 'A'` (o URL `?ab=B`) |
| Precios calculadora | `calculator.js` → `BASE`, `HOUSING`, `ACCESS` |
| Textos ES / EN | `main.js` → objeto `DICT` |
| Colores / fuente | `styles.css` → `:root { --c-primary, --c-accent, --ff }` |

---

## Analítica disponible

| Función | Evento GA4 | Se dispara en… |
|---|---|---|
| `trackForm()` | `form_submit` | Envío del formulario de contacto |
| `trackWhatsApp()` | `whatsapp_click` | Click en `.js-whatsapp` |
| `trackPhone()` | `phone_click` | Click en `.js-phone` |
| `trackTelegram()` | `telegram_click` | Click en `.js-telegram` |
| `trackCalculator()` | `calculator_used` | Cambio en calculadora |
| `trackChatbot()` | `chatbot_*` | Apertura / mensajes bot |
| `trackConversion()` | `conversion` (Google Ads) | Form + WhatsApp + Phone + Calc |

Todas expuestas en `window.EcoAnalytics`.
