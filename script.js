/**
 * Scarpini Design - Landing Page Scripts
 * Vanilla JS: Scroll Reveal, Sticky Navbar, FAQ Accordion, and Smooth Scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStickyNavbar();
  initFaqAccordion();
  initSmoothScroll();
});

/**
 * 1. Scroll Reveal Animation
 * Watches elements with [data-reveal] using IntersectionObserver.
 * Applies transition-delay if [data-reveal-delay] is specified.
 */
const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  // Fallback for environments without IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-reveal-delay');

          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }

          el.classList.add('revealed');
          obs.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
};

/**
 * 2. Sticky Navbar Effect
 * Toggles 'scrolled' class on #navbar when window.scrollY > 50.
 * Uses requestAnimationFrame with a passive listener for smooth performance.
 */
const initStickyNavbar = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  const updateNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initial check in case the page is loaded/reloaded already scrolled
  updateNavbar();
};

/**
 * 3. FAQ Accordion
 * Handles accordion behavior for .faq__question buttons.
 * Toggles 'active' class on .faq__item and updates aria-expanded.
 */
const initFaqAccordion = () => {
  const questions = document.querySelectorAll('.faq__question');
  if (!questions.length) return;

  questions.forEach((button) => {
    button.addEventListener('click', () => {
      const parentItem = button.closest('.faq__item');
      if (!parentItem) return;

      const isExpanded = parentItem.classList.contains('active');

      // Close all other FAQ items (exclusive accordion behavior)
      questions.forEach((otherButton) => {
        const otherItem = otherButton.closest('.faq__item');
        if (otherItem && otherItem !== parentItem) {
          otherItem.classList.remove('active');
          otherButton.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked FAQ item
      if (isExpanded) {
        parentItem.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
};

/**
 * 4. Smooth Scroll
 * Intercepts anchor links starting with '#' and smoothly scrolls to the target.
 */
const initSmoothScroll = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId) return;

      // Handle top-of-page link "#"
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};
