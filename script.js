// script.js — corrected and improved
// Interactions : nav mobile, modal, filtrage, contact (démo)
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Progress Indicator (guard division by zero)
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const docElement = document.documentElement;
    const winHeight = docElement.clientHeight;
    const docHeight = Math.max(docElement.scrollHeight - winHeight, 0);
    if (docHeight === 0) {
      scrollProgress.style.width = '100%';
      return;
    }
    const scrolled = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
    scrollProgress.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Parallax Effect on Hero Image (desktop)
  const heroImage = document.querySelector('.hero-image');
  const isMobile = () => window.innerWidth < 900;
  function updateParallax() {
    if (heroImage && !isMobile()) {
      const offset = Math.min(window.scrollY * 0.3, 80);
      heroImage.style.transform = `translateY(${offset}px)`;
    } else if (heroImage) {
      heroImage.style.transform = 'translateY(0)';
    }
  }
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  // Sticky CTA Button
  const ctaSticky = document.getElementById('ctaSticky');
  const heroSection = document.querySelector('.hero');
  if (ctaSticky && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.offsetHeight;
      const show = window.scrollY > heroBottom;
      ctaSticky.classList.toggle('show', show);
      ctaSticky.setAttribute('aria-hidden', String(!show));
    }, { passive: true });
  }

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      nav.style.display = open ? 'flex' : '';
      navToggle.textContent = open ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Modal (improved: trap focus, prevent background scroll)
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalMeta = document.getElementById('modalMeta');
  const modalClose = document.getElementById('modalClose');
  let lastFocused = null;

  function openModal(title, desc, meta) {
    if (!modal) return;
    lastFocused = document.activeElement;
    if (modalTitle) modalTitle.textContent = title || '';
    if (modalDesc) modalDesc.textContent = desc || '';
    if (modalMeta) modalMeta.textContent = meta || '';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  // View buttons (works for all .view-btn)
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('article[data-tech], .project, .card');
      if (!card) return;
      const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Détails';
      const desc = card.dataset.desc || 'Aucune description fournie.';
      const tech = card.querySelector('.card-tags') ? card.querySelector('.card-tags').textContent : (card.dataset.tech || '');
      openModal(title, desc, tech);
    });
  });

  // Filtering projects
  const filter = document.getElementById('filterTech');
  if (filter) {
    filter.addEventListener('change', () => {
      const val = filter.value;
      document.querySelectorAll('article[data-tech]').forEach(card => {
        card.style.display = (val === 'all' || card.dataset.tech === val) ? '' : 'none';
      });
    });
  }

  // Skills animation: read data-width attribute (works reliably)
  const skillBars = document.querySelectorAll('.meter span');
  function animateSkills() {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible && !bar.dataset.animated) {
        const target = bar.dataset.width || bar.getAttribute('data-width') || '0%';
        bar.style.width = '0%';
        // small timeout to ensure transition
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.width = target;
            bar.dataset.animated = 'true';
          });
        });
      }
    });
  }
  window.addEventListener('scroll', animateSkills, { passive: true });
  window.addEventListener('resize', animateSkills);
  animateSkills();

  // Demo contact handler (replace with real endpoint in production)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const status = document.getElementById('contactStatus');
      if (status) status.textContent = 'Envoi en cours...';
      setTimeout(() => {
        if (status) status.textContent = 'Merci — message enregistré (démo).';
        contactForm.reset();
      }, 900);
    });
  }
});
