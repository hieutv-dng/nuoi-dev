/* ============================================
   Main JS — Nuôi Dev
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initImpactCounters();
  initFooterYear();
  initDevRegisterForm();
});

/* --- Navbar scroll effect & mobile toggle --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');

  // Add shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile hamburger toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });

    // Close menu when clicking a link
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }
}

/* --- Smooth scroll for internal navigation links --- */
function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(anchor => {
    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#') return;

    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      if (window.history?.replaceState) {
        window.history.replaceState(null, '', hash);
      }
    });
  });
}

/* --- Intersection Observer for fade-in animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* --- Impact counter animation (scroll-triggered) --- */
function initImpactCounters() {
  const counters = document.querySelectorAll('.impact-number');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString('vi-VN') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('vi-VN') + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* --- Footer current year --- */
function initFooterYear() {
  const yearNode = document.getElementById('current-year');
  if (!yearNode) return;
  yearNode.textContent = String(new Date().getFullYear());
}
