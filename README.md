# Nova Nexus Capital — Marketing Website

Static marketing website for Nova Nexus Capital — a technology consulting company facilitating the adoption of world-class technology in strategic industries across Latin America. Vanilla HTML, CSS, and JavaScript — no frameworks, no build tools.

## Pages

- **`index.html`** — Homepage: hero, approach/Oscilar case study, pain points, operate accordion, community events, CTA
- **`solutions.html`** — Solutions: hero, paneles estratégicos, capacidades, casos de éxito, recursos descargables (PDFs on Cloudflare R2), CTA
- **`about.html`** — About: hero, vision, valores, método, logros, CTA
- **`contact.html`** — Contact: hero, form, CTA
- **`terms.html`** / **`privacy.html`** — Legal pages

## Architecture

### Web Components (`components.js`)

Custom Elements API with stamp-out pattern (`replaceWith()`). No Shadow DOM — BEM CSS applies directly. Loads **before** `scripts.js` so expanded DOM is ready for GSAP.

| Component | Usage | Description |
|-----------|-------|-------------|
| `<nova-btn>` | `<nova-btn variant="primary">Text</nova-btn>` | Button with arrow icon. Variants: `primary`, `white`, `dark`, `cta-white`, `light`, `link`, `white-blue` |
| `<nova-tag>` | `<nova-tag variant="blue" center>Text</nova-tag>` | Section label with `/prefix` |
| `<nova-faq>` | `<nova-faq question="...">Answer</nova-faq>` | Accordion item (behavior in scripts.js) |
| `<nova-navbar>` | `<nova-navbar></nova-navbar>` | Navigation bar with mobile hamburger menu + full-screen overlay |
| `<nova-footer>` | `<nova-footer></nova-footer>` | Footer with brand mark, nav columns, orbs, copyright |

### Styling (`styles.css`)

Single stylesheet, BEM naming, CSS custom properties:

```
--navy: #0F112A       (dark backgrounds)
--blue: #2B40F5       (primary accent)
--lavender: #E4E6F3   (light text on dark)
--white: #FFFFFF
--max-w: 1240px       (content width cap)
--section-pad: 100px  (vertical rhythm)
```

**Page gradient:** Body uses a continuous gradient (`#2B40F5 → #E4E6F3 → #FFFFFF`) that flows through the full page height. The hero and approach sections have their own opaque backgrounds; sections below (operate, community) are transparent and let the body gradient show through. Dark sections (pain points, CTA) sit on top with their own backgrounds.

**Responsive breakpoints:**
- `> 1024px` — Desktop (1440px baseline)
- `≤ 1024px` — Tablet (stacked layouts, 2-up grids)
- `≤ 768px` — Mobile (single column, hamburger menu)
- `≤ 480px` — Small mobile (compact spacing)

### Animations (`scripts.js`)

GSAP 3.12.5 + ScrollTrigger. Existence-guarded so all pages share one script.

- **Page transitions** — Navy overlay fade between internal links
- **Hero** — Word-by-word stagger reveal
- **Scroll reveals** — Card sets stagger up on scroll (pain points, community, valores, etc.)
- **Operate accordion** — Coordinated GSAP timeline: close and open overlap for smooth transitions
- **Mobile menu** — Full-screen glassmorphism overlay with staggered link reveals, hamburger→X animation
- **Stat count-ups** — Approach card numbers animate on scroll
- **About/Solutions/Contact heroes** — Staggered element reveals

### Resources (Cloudflare R2)

PDF resources for the Solutions page are hosted on Cloudflare R2:

```
https://cdn.displace.agency/nova-nexus/resources/
├── oscilar-presentacion-general.pdf
├── oscilar-guia-bancos-2025.pdf
├── oscilar-plataforma-ia.pdf
├── oscilar-antifraude.pdf
├── oscilar-cumplimiento-aml.pdf
├── oscilar-credito.pdf
├── oscilar-kyc-kyb.pdf
├── oscilar-modelos-ml.pdf
├── oscilar-case-management.pdf
├── oscilar-inteligencia-dispositivo.pdf
├── oscilar-credit-unions.pdf
├── sofi-case-study.pdf
└── oscilar-casos-exito-2025.pdf
```

### Fonts

Google Fonts:
- **Albert Sans** (400–700) — Headings and body
- **Inter** (400, 500) — Secondary text
- **Roboto Mono** (400) — Monospaced accents

## File Structure

```
website-nova-nexus-v1/
├── index.html          Homepage
├── solutions.html      Solutions page
├── about.html          About page
├── contact.html        Contact page
├── terms.html          Terms of service
├── privacy.html        Privacy policy
├── styles.css          All styles (base + 4 responsive breakpoints)
├── components.js       Web Components (loads first)
├── scripts.js          GSAP animations + mobile menu (loads after components)
└── images/             All image assets
```

## Development

No build step. Serve with any static file server:

```bash
npx serve . -p 3000
```

`serve` supports clean URLs automatically (`/solutions` → `solutions.html`).
