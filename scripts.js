gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════
   PAGE TRANSITION — Subtle navy fade
   ═══════════════════════════════════════ */

const pageOverlay = document.querySelector('.page-transition');
if (pageOverlay) {
  gsap.to(pageOverlay, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
    delay: 0.05,
    onComplete() { pageOverlay.style.visibility = 'hidden'; },
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
    const current = location.pathname.split('/').pop().replace('.html', '') || '';
    const isHome = !current || current === 'index';
    const hrefClean = href.replace('.html', '');
    const hrefIsHome = hrefClean === './' || hrefClean === '/' || hrefClean === 'index';
    if ((isHome && hrefIsHome) || hrefClean === current) return;
    e.preventDefault();
    pageOverlay.style.visibility = 'visible';
    pageOverlay.style.pointerEvents = 'all';
    gsap.to(pageOverlay, {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.in',
      onComplete() { window.location.href = href; },
    });
  });
}


/* ═══════════════════════════════════════
   HERO — Staggered reveal (homepage only)
   ═══════════════════════════════════════ */

const heroHeading = document.querySelector('.hero__heading');
if (heroHeading) {
  heroHeading.innerHTML = heroHeading.textContent.trim().split(/\s+/)
    .map(w => `<span class="hero-word">${w}</span>`)
    .join(' ');

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-word', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
    })
    .from('.hero__subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.7,
    }, '-=0.4')
    .from('.hero__buttons .btn', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.12,
    }, '-=0.3')
    .from('.hero__visual img', {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 1.2,
      ease: 'power2.out',
    }, 0.3);
}


/* ═══════════════════════════════════════
   TECH STACK — Infinite marquee (homepage only)
   ═══════════════════════════════════════ */

const marqueeRow = document.querySelector('.tech-stack__row');
let marqueeTween = null;
let origItems = [];
let resizeTimer;

if (marqueeRow) {
  origItems = [...marqueeRow.querySelectorAll('.tech-stack__item')];

  for (let i = 0; i < 2; i++) {
    origItems.forEach(item => marqueeRow.appendChild(item.cloneNode(true)));
  }

  function initMarquee() {
    if (marqueeTween) marqueeTween.kill();
    const oneSetWidth = origItems.reduce((sum, item) => sum + item.getBoundingClientRect().width, 0);
    gsap.set(marqueeRow, { x: -oneSetWidth });
    marqueeTween = gsap.to(marqueeRow, {
      x: -(oneSetWidth * 2),
      duration: 25,
      ease: 'none',
      repeat: -1,
    });
  }

  initMarquee();
}


/* ═══════════════════════════════════════
   SCROLL REVEAL — Cards stagger up (homepage only)
   ═══════════════════════════════════════ */

const revealSets = [
  { selector: '.pain-point__card',  trigger: '.pain-point__cards' },
  { selector: '.operate__item',    trigger: '.operate__accordion' },
  { selector: '.bento-card-2col, .bento-card-3col', trigger: '.services__bento' },
  { selector: '.comparison__card',  trigger: '.comparison__cards' },
  { selector: '.community__card',   trigger: '.community__row' },
  { selector: '.capacidades__card', trigger: '.capacidades__grid' },
  { selector: '.casos__card',       trigger: '.casos__cards' },
  { selector: '.valores__card',    trigger: '.valores__cards' },
  { selector: '.metodo__step',     trigger: '.metodo__steps' },
  { selector: '.logros__card',     trigger: '.logros__grid' },
];

revealSets.forEach(({ selector, trigger }) => {
  if (!document.querySelector(trigger)) return;
  gsap.from(selector, {
    scrollTrigger: { trigger, start: 'top 80%' },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
  });
});


/* ═══════════════════════════════════════
   APPROACH — Count-up stats (homepage only)
   ═══════════════════════════════════════ */

document.querySelectorAll('.approach__stat-value').forEach(el => {
  const raw = el.textContent.trim();
  const num = parseInt(raw.match(/\d+/)?.[0]);
  if (isNaN(num)) return;
  const suffix = raw.replace(/\d+/, '');

  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter() {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: num,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = Math.round(counter.val) + suffix;
        },
      });
    },
  });
});


/* ═══════════════════════════════════════
   DRAG-TO-SCROLL — Shared carousel utility
   ═══════════════════════════════════════ */

function initDragScroll(container) {
  if (!container) return;
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('is-dragging');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  const stop = () => {
    isDown = false;
    container.classList.remove('is-dragging');
  };

  container.addEventListener('mouseleave', stop);
  container.addEventListener('mouseup', stop);
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    container.scrollLeft = scrollLeft - (x - startX) * 2;
  });
}

initDragScroll(document.querySelector('.process__cards'));
initDragScroll(document.querySelector('.services__bento'));
initDragScroll(document.querySelector('.capacidades__grid'));
initDragScroll(document.querySelector('.valores__cards'));
initDragScroll(document.querySelector('.metodo__steps'));

// Recalculate marquees on resize (debounced)
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (typeof initMarquee === 'function') initMarquee();
  }, 250);
});


/* ═══════════════════════════════════════
   FAQ — Accordion (homepage only)
   ═══════════════════════════════════════ */

document.querySelectorAll('.faq__item').forEach(item => {
  item.querySelector('.faq__question').addEventListener('click', () => {
    const isActive = item.classList.contains('faq__item--active');

    document.querySelectorAll('.faq__item').forEach(other => {
      other.classList.remove('faq__item--active');
      other.classList.add('faq__item--default');
      gsap.to(other.querySelector('.faq__plus'), {
        rotation: 0, duration: 0.3, ease: 'power2.inOut',
      });
      const otherAnswer = other.querySelector('.faq__answer');
      if (otherAnswer) {
        gsap.to(otherAnswer, {
          height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut',
        });
      }
    });

    if (!isActive) {
      item.classList.remove('faq__item--default');
      item.classList.add('faq__item--active');
      gsap.to(item.querySelector('.faq__plus'), {
        rotation: 45, duration: 0.3, ease: 'power2.inOut',
      });
      const answer = item.querySelector('.faq__answer');
      if (answer) {
        gsap.to(answer, {
          height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out',
        });
      }
    }
  });
});


/* ═══════════════════════════════════════
   OPERATE — Accordion (homepage)
   ═══════════════════════════════════════ */

(function() {
  const items = document.querySelectorAll('.operate__item');
  if (!items.length) return;

  // Set initial open state for first item
  const firstOpen = document.querySelector('.operate__item--open');
  if (firstOpen) {
    const answer = firstOpen.querySelector('.operate__answer');
    if (answer) {
      gsap.set(answer, { height: 'auto', opacity: 1, paddingTop: 12, paddingBottom: 24 });
    }
  }

  // Click handlers
  items.forEach(item => {
    item.querySelector('.operate__question').addEventListener('click', () => {
      const isOpen = item.classList.contains('operate__item--open');
      const tl = gsap.timeline();

      // Close all others first (at time 0)
      items.forEach(other => {
        if (other === item && !isOpen) return;
        const a = other.querySelector('.operate__answer');
        if (!a || !other.classList.contains('operate__item--open')) return;
        a.style.overflow = 'hidden';
        tl.to(a, {
          height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0,
          duration: 0.25, ease: 'power2.in',
          onComplete() { other.classList.remove('operate__item--open'); a.style.overflow = ''; }
        }, 0);
      });

      // Open clicked item (overlapping at 0.1s so it feels like one motion)
      if (!isOpen) {
        const answer = item.querySelector('.operate__answer');
        if (answer) {
          item.classList.add('operate__item--open');
          answer.style.overflow = 'hidden';
          tl.to(answer, {
            height: 'auto', opacity: 1, paddingTop: 12, paddingBottom: 24,
            duration: 0.4, ease: 'power3.out',
            onComplete() { answer.style.overflow = ''; }
          }, 0.1);
        }
      }
    });
  });
})();


/* ═══════════════════════════════════════
   CONTACT HERO — Staggered reveal (contact page)
   ═══════════════════════════════════════ */

const contactHero = document.querySelector('.contact-hero');
if (contactHero) {
  const contactTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  contactTl
    .from('.contact-hero__heading', {
      y: 40,
      opacity: 0,
      duration: 0.9,
    })
    .from('.contact-hero__subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.7,
    }, '-=0.4')
    .from('.contact-hero__buttons .btn', {
      y: 20,
      opacity: 0,
      duration: 0.5,
    }, '-=0.3')
    .from('.contact-hero__visual', {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 1.2,
      ease: 'power2.out',
    }, 0.3);
}


/* ═══════════════════════════════════════
   CONTACT FORM — Scroll-triggered reveal (contact page)
   ═══════════════════════════════════════ */

const contactForm = document.querySelector('.contact-form-section');
if (contactForm) {
  gsap.from('.contact-form-section__title', {
    scrollTrigger: { trigger: '.contact-form-section', start: 'top 80%' },
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  });

  gsap.from('.contact-form', {
    scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  gsap.from('.contact-form__field, .contact-form__row', {
    scrollTrigger: { trigger: '.contact-form', start: 'top 80%' },
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
  });

  gsap.from('.contact-form__submit', {
    scrollTrigger: { trigger: '.contact-form__submit', start: 'top 95%' },
    y: 15,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
  });
}


/* ═══════════════════════════════════════
   CTA — Scroll-triggered reveal (all pages)
   ═══════════════════════════════════════ */

const ctaSection = document.querySelector('.cta');
if (ctaSection) {
  gsap.from('.cta .h2', {
    scrollTrigger: { trigger: '.cta', start: 'top 80%' },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  gsap.from('.cta__subtitle', {
    scrollTrigger: { trigger: '.cta__block', start: 'top 85%' },
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: 'power2.out',
  });

  gsap.from('.cta__buttons .btn', {
    scrollTrigger: { trigger: '.cta__buttons', start: 'top 90%' },
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  });

  const ctaPartner = document.querySelector('.cta__partner');
  if (ctaPartner) {
    gsap.from(ctaPartner, {
      scrollTrigger: { trigger: ctaPartner, start: 'top 90%' },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  }
}


/* ═══════════════════════════════════════
   FOOTER — Scroll-triggered reveal (all pages)
   ═══════════════════════════════════════ */

const footer = document.querySelector('.footer');
if (footer) {
  gsap.from('.footer__brand-name', {
    scrollTrigger: { trigger: '.footer', start: 'top 85%' },
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  });

  gsap.from('.footer__brand-desc', {
    scrollTrigger: { trigger: '.footer', start: 'top 85%' },
    y: 20,
    opacity: 0,
    duration: 0.6,
    delay: 0.15,
    ease: 'power2.out',
  });

  gsap.from('.footer__nav-col', {
    scrollTrigger: { trigger: '.footer__nav', start: 'top 90%' },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  });

  gsap.from('.footer__bottom', {
    scrollTrigger: { trigger: '.footer__bottom', start: 'top 95%' },
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  // Orbs — subtle scale-in
  gsap.from('.footer__orb', {
    scrollTrigger: { trigger: '.footer', start: 'top 80%' },
    scale: 0.5,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power2.out',
  });

  // Logo decoration — fade & drift in
  const logoDecor = document.querySelector('.footer__logo-decoration');
  if (logoDecor) {
    gsap.from(logoDecor, {
      scrollTrigger: { trigger: '.footer', start: 'top 80%' },
      y: -20,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }
}


/* ═══════════════════════════════════════
   SOLUTIONS HERO — Staggered reveal
   ═══════════════════════════════════════ */

const solHero = document.querySelector('.sol-hero');
if (solHero) {
  const solTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  solTl
    .from('.sol-hero__heading', {
      y: 40,
      opacity: 0,
      duration: 0.9,
    })
    .from('.sol-hero__subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.7,
    }, '-=0.4')
    .from('.sol-hero__buttons .btn', {
      y: 20,
      opacity: 0,
      duration: 0.5,
    }, '-=0.3')
    .from('.sol-hero__visual', {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 1.2,
      ease: 'power2.out',
    }, 0.3);
}


/* ═══════════════════════════════════════
   PANELES — Scroll-triggered reveal
   ═══════════════════════════════════════ */

const panelesSection = document.querySelector('.paneles');
if (panelesSection) {
  gsap.from('.paneles__tab', {
    scrollTrigger: { trigger: '.paneles__tabs', start: 'top 85%' },
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
  });

  gsap.from('.paneles__card', {
    scrollTrigger: { trigger: '.paneles__card', start: 'top 85%' },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}


/* ═══════════════════════════════════════
   RECURSOS — Scroll-triggered reveal
   ═══════════════════════════════════════ */

const recursosSection = document.querySelector('.recursos');
if (recursosSection) {
  gsap.from('.recursos__link', {
    scrollTrigger: { trigger: '.recursos__grid', start: 'top 85%' },
    y: 20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.06,
    ease: 'power2.out',
  });
}


/* ═══════════════════════════════════════
   ABOUT HERO — Staggered reveal
   ═══════════════════════════════════════ */

const aboutHero = document.querySelector('.about-hero');
if (aboutHero) {
  const aboutTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  aboutTl
    .from('.about-hero__heading', {
      y: 40,
      opacity: 0,
      duration: 0.9,
    })
    .from('.about-hero__subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.7,
    }, '-=0.4')
    .from('.about-hero__card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
    }, '-=0.3')
    .from('.about-hero__visual', {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 1.2,
      ease: 'power2.out',
    }, 0.3);
}


/* ═══════════════════════════════════════
   PROPOSITO — Scroll-triggered reveal
   ═══════════════════════════════════════ */

const propositoSection = document.querySelector('.proposito');
if (propositoSection) {
  gsap.from('.proposito__box', {
    scrollTrigger: { trigger: '.proposito__boxes', start: 'top 85%' },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
  });
}


/* ═══════════════════════════════════════
   MOBILE MENU — Hamburger + overlay
   ═══════════════════════════════════════ */

(function () {
  const burger = document.querySelector('.navbar__burger');
  const overlay = document.querySelector('.navbar__overlay');
  if (!burger || !overlay) return;

  const overlayLinks = overlay.querySelectorAll('.navbar__overlay-link');
  let isOpen = false;
  let tl = null;

  // Mark current page link
  const currentPage = location.pathname.split('/').pop().replace('.html', '') || 'index';
  overlayLinks.forEach(link => {
    const href = link.getAttribute('href').replace('.html', '');
    const isHome = (href === './' || href === '/' || href === 'index');
    const isCurrent = isHome
      ? (!currentPage || currentPage === 'index')
      : href === currentPage;
    if (isCurrent) link.classList.add('is-current');
  });

  function openMenu() {
    isOpen = true;
    burger.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (tl) tl.kill();
    tl = gsap.timeline();
    tl.set(overlay, { visibility: 'visible' })
      .to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      .fromTo(overlayLinks,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'power3.out' },
        '-=0.1'
      );
  }

  function closeMenu() {
    isOpen = false;
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');

    if (tl) tl.kill();
    tl = gsap.timeline();
    tl.to(overlayLinks, {
      y: -20, opacity: 0, duration: 0.25, stagger: 0.08, ease: 'power2.in',
    })
    .to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in' })
    .set(overlay, { visibility: 'hidden' })
    .call(() => { document.body.style.overflow = ''; });
  }

  burger.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close on overlay link click (with page transition delay)
  overlayLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      // Let the page transition handler in scripts.js handle navigation
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
})();
