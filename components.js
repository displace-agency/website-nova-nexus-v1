/* ══════════════════════════════════════════════
   Nova Nexus Capital — Web Components
   Reusable, stamp-out components.
   Load BEFORE scripts.js so expanded DOM is ready for GSAP.
   ══════════════════════════════════════════════ */

const ARROW_SVG = '<svg class="arrow-icon" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';


/* ── <nova-btn variant="primary">Text</nova-btn> ──
   Variants: primary, white, dark, cta-white, light, link, white-blue
   Optional: href (renders <a> instead of <button>)
   ──────────────────────────────────────────────── */
class NovaBtn extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'primary';
    const text = this.textContent.trim();
    const href = this.getAttribute('href');
    const tag = href ? 'a' : 'button';

    const el = document.createElement(tag);
    el.className = `btn btn--${variant}`;
    if (href) {
      el.setAttribute('href', href);
      if (href.startsWith('http')) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    }

    if (variant === 'link') {
      el.innerHTML = `<span>${text}</span>${ARROW_SVG}`;
    } else {
      el.innerHTML = `<span>${text}</span><span class="btn__icon">${ARROW_SVG}</span>`;
    }

    this.replaceWith(el);
  }
}
customElements.define('nova-btn', NovaBtn);


/* ── <nova-tag [variant="blue"] [center]>Text</nova-tag> ──
   Renders section tag with /prefix.
   ──────────────────────────────────────────────── */
class NovaTag extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || '';
    const isCenter = this.hasAttribute('center');
    const text = this.textContent.trim();

    const div = document.createElement('div');
    let cls = 'section-tag';
    if (variant === 'blue') cls += ' section-tag--blue';
    if (isCenter) cls += ' section-tag--center';
    div.className = cls;

    const span = document.createElement('span');
    if (variant === 'blue') span.className = 'section-tag__text section-tag__text--blue';
    span.textContent = '/' + text;

    div.appendChild(span);
    this.replaceWith(div);
  }
}
customElements.define('nova-tag', NovaTag);


/* ── <nova-faq question="...">Answer text</nova-faq> ──
   Expands to .faq__item with question button + answer div.
   Accordion behavior handled by scripts.js.
   ──────────────────────────────────────────────── */
class NovaFaq extends HTMLElement {
  connectedCallback() {
    const question = this.getAttribute('question');
    const answer = this.textContent.trim();

    const div = document.createElement('div');
    div.className = 'faq__item faq__item--default';
    div.innerHTML = `
      <button class="faq__question">
        <span class="faq__question-text">${question}</span>
        <span class="faq__plus"></span>
      </button>
      <div class="faq__answer">
        <p>${answer}</p>
      </div>
    `;
    this.replaceWith(div);
  }
}
customElements.define('nova-faq', NovaFaq);


/* ── <nova-navbar></nova-navbar> ──
   Shared navigation across all pages.
   ──────────────────────────────────────────────── */
class NovaNavbar extends HTMLElement {
  connectedCallback() {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
      <div class="navbar__inner">
        <a href="./" class="navbar__logo">
          <img src="images/logo.svg" alt="Nova Nexus Capital" width="146" height="32">
        </a>
        <div class="navbar__links">
          <a href="./" class="navbar__link">Home</a>
          <a href="solutions.html" class="navbar__link">Soluciones</a>
          <a href="about.html" class="navbar__link">Nosotros</a>
          <a href="contact.html" class="navbar__link">Contact</a>
        </div>
        <button class="navbar__burger" aria-label="Menu" aria-expanded="false">
          <span class="navbar__burger-bar"></span>
          <span class="navbar__burger-bar"></span>
        </button>
      </div>
      <div class="navbar__overlay" aria-hidden="true">
        <div class="navbar__overlay-orb"></div>
        <div class="navbar__overlay-links">
          <a href="./" class="navbar__overlay-link">Home</a>
          <a href="solutions.html" class="navbar__overlay-link">Soluciones</a>
          <a href="about.html" class="navbar__overlay-link">Nosotros</a>
          <a href="contact.html" class="navbar__overlay-link">Contact</a>
        </div>
      </div>
    `;
    this.replaceWith(nav);
  }
}
customElements.define('nova-navbar', NovaNavbar);


/* ── <nova-footer></nova-footer> ──
   Shared footer across all pages.
   ──────────────────────────────────────────────── */
class NovaFooter extends HTMLElement {
  connectedCallback() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="footer__orb footer__orb--blue"></div>
      <div class="footer__orb footer__orb--light"></div>
      <div class="footer__inner">
        <div class="footer__logo-decoration" aria-hidden="true">
          <img src="images/hero-nexus.png" alt="">
        </div>
        <div class="footer__brand">
          <h2 class="footer__brand-name">Nova Nexus Capital</h2>
          <p class="footer__brand-desc">Facilitamos la adopción de tecnología de clase mundial en industrias estratégicas.</p>
        </div>
        <nav class="footer__nav">
          <div class="footer__nav-col">
            <span class="footer__nav-label">/NAVIGATION</span>
            <div class="footer__nav-links">
              <a href="./">Inicio</a>
              <a href="solutions.html">Soluciones</a>
              <a href="about.html">Nosotros</a>
              <a href="contact.html">Contacto</a>
            </div>
          </div>
          <div class="footer__nav-col">
            <span class="footer__nav-label">/LEGAL</span>
            <div class="footer__nav-links">
              <a href="terms.html">Términos de Servicio</a>
              <a href="privacy.html">Política de Privacidad</a>
              <!-- <a href="archive.html">Archive</a> -->
            </div>
          </div>
          <div class="footer__nav-col">
            <span class="footer__nav-label">/CONTACT</span>
            <div class="footer__nav-links">
              <a href="mailto:contact@novanexuscapital.com">contact@novanexuscapital.com</a>
              <span>Santiago, Chile</span>
            </div>
          </div>
        </nav>
        <div class="footer__bottom">
          <span class="footer__copyright"><a href="archive.html" rel="nofollow" style="color:inherit;text-decoration:none;">@2026 NOVA NEXUS CAPITAL. All Rights Reserved.</a> • <a href="privacy.html">Privacy Policy</a> • <a href="terms.html">Terms of Service</a></span>
        </div>
      </div>
    `;
    this.replaceWith(footer);
  }
}
customElements.define('nova-footer', NovaFooter);
