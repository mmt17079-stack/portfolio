// script.js (version corrigée)
// Interactions : nav mobile, modal, filtrage, contact (démo)
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Progress Indicator (guard contre division par 0)
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

  // Parallax Effect on Hero Image (Desktop only)
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

  // Sticky CTA Button - Affiche après le scroll du hero
  const ctaSticky = document.getElementById('ctaSticky');
  const heroSection = document.querySelector('.hero');
  if (ctaSticky && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.offsetHeight;
      ctaSticky.classList.toggle('show', window.scrollY > heroBottom);
      ctaSticky.setAttribute('aria-hidden', String(!(window.scrollY > heroBottom)));
    }, { passive: true });
  }

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
      const isOpen = !nav.classList.toggle('open');
      // Use CSS/display for mobile; keep it simple
      nav.style.display = nav.classList.contains('open') ? 'flex' : '';
      navToggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
    });
  }

  // Modal for projects (improved: prevent body scroll, restore focus)
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
    document.body.style.overflow = 'hidden'; // bloquer scroll fond
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

  // Project view buttons: capture any .view-btn and find nearest article[data-tech] or .project/.card
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

  // MiniWiki preview button (kept for backward compatibility)
  const miniBtn = document.getElementById('open-miniwiki');
  if (miniBtn) {
    miniBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('MiniWiki', 'MiniWiki est une mini-encyclopédie de fiches biographiques avec recherche intelligente, autocomplétion et déploiement sur serveur Linux.', 'Technos: Django, PostgreSQL, Nginx');
    });
  }

  // Filtering projects — robust: select articles that have data-tech
  const filter = document.getElementById('filterTech');
  if (filter) {
    filter.addEventListener('change', () => {
      const val = filter.value;
      document.querySelectorAll('article[data-tech]').forEach(card => {
        if (val === 'all' || card.dataset.tech === val) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Skills bar animation on scroll (lightweight)
  const skillMeters = document.querySelectorAll('.meter span');
  const animateSkills = () => {
    skillMeters.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible && !bar.dataset.animated) {
        const target = (bar.style.width && bar.style.width.trim()) || '0%';
        bar.style.width = '0%';
        bar.style.transition = 'width 1.2s ease-out';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.width = target;
            bar.dataset.animated = 'true';
          });
        });
      }
    });
  };
  window.addEventListener('scroll', animateSkills, { passive: true });
  animateSkills();

  // Contact form handler (demo)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function handleContact(e) {
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
