// script.js (version corrigée)
document.addEventListener('DOMContentLoaded', () => {
  // Affiche l'année courante
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Progress Indicator
  const scrollProgress = document.getElementById('scrollProgress');
  const updateScrollProgress = () => {
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
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Effet parallax sur l'image hero (desktop uniquement)
  const heroImage = document.querySelector('.hero-image');
  const isMobile = () => window.innerWidth < 900;
  const updateParallax = () => {
    if (heroImage && !isMobile()) {
      const parallaxOffset = Math.min(window.scrollY * 0.3, 80);
      heroImage.style.transform = `translateY(${parallaxOffset}px)`;
    } else if (heroImage) {
      heroImage.style.transform = 'translateY(0)';
    }
  };
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  // Bouton CTA fixe après défilement du hero
  const ctaSticky = document.getElementById('ctaSticky');
  const heroSection = document.querySelector('.hero');
  if (ctaSticky && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.offsetHeight;
      const isVisible = (window.scrollY > heroBottom);
      ctaSticky.classList.toggle('show', isVisible);
      ctaSticky.setAttribute('aria-hidden', String(!isVisible));
    }, { passive: true });
  }

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const opened = nav.classList.contains('open');
      nav.style.display = opened ? 'flex' : '';
      navToggle.textContent = opened ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', opened.toString());
    });
  }

  // Modale projets (ouvre/ferme)
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalMeta = document.getElementById('modalMeta');
  const modalClose = document.getElementById('modalClose');
  let lastFocusedEl = null;
  function openModal(title, desc, meta) {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = title || 'Détails';
    if (modalDesc) modalDesc.textContent = desc || '';
    if (modalMeta) modalMeta.textContent = meta || '';
    lastFocusedEl = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  // Boutons "Voir" sur les projets
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card.project, article');
      if (!card) return;
      const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Détails';
      const desc = card.dataset.desc || '';
      const tech = card.querySelector('.card-tags') ? card.querySelector('.card-tags').textContent : card.dataset.tech || '';
      openModal(title, desc, tech);
    });
  });

  // Filtre par technologie (projects)
  const filter = document.getElementById('filterTech');
  if (filter) {
    filter.addEventListener('change', () => {
      const val = filter.value;
      document.querySelectorAll('article[data-tech]').forEach(card => {
        card.style.display = (val === 'all' || card.dataset.tech === val) ? '' : 'none';
      });
    });
  }

  // Animation des barres de compétences
  const skillMeters = document.querySelectorAll('.meter span');
  const animateSkills = () => {
    skillMeters.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = (rect.top < window.innerHeight && rect.bottom > 0);
      if (isVisible && !bar.dataset.animated) {
        const target = (bar.style.width && bar.style.width.trim()) || '0%';
        bar.style.width = '0%';
        bar.style.transition = 'width 1.2s ease-out';
        requestAnimationFrame(() => {
          bar.style.width = target;
          bar.dataset.animated = 'true';
        });
      }
    });
  };
  window.addEventListener('scroll', animateSkills, { passive: true });
  animateSkills();

  // Formulaire contact (simulation d'envoi)
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
