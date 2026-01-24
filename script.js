// Interactions : nav mobile, modal, filtrage, contact (démo)
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Progress Indicator
  const scrollProgress = document.getElementById('scrollProgress');
  let progressTimeout;
  const updateScrollProgress = () => {
    if (scrollProgress) {
      const docElement = document.documentElement;
      const winHeight = docElement.clientHeight;
      const docHeight = docElement.scrollHeight - winHeight;
      const scrolled = (window.scrollY / docHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    }
  };
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      clearTimeout(progressTimeout);
      updateScrollProgress();
      progressTimeout = setTimeout(() => {
        updateScrollProgress();
      }, 100);
    }, { passive: true });
  }

  // Parallax Effect on Hero Image (Desktop only)
  const heroImage = document.querySelector('.hero-image');
  let parallaxTimeout;
  const isMobile = () => window.innerWidth < 900;
  const updateParallax = () => {
    if (heroImage && !isMobile()) {
      const scrollY = window.scrollY;
      const parallaxOffset = scrollY * 0.3;
      heroImage.style.transform = `translateY(${Math.min(parallaxOffset, 80)}px)`;
    } else if (heroImage && isMobile()) {
      heroImage.style.transform = 'translateY(0)';
    }
  };
  if (heroImage) {
    window.addEventListener('scroll', () => {
      clearTimeout(parallaxTimeout);
      parallaxTimeout = setTimeout(() => {
        updateParallax();
      }, 16);
    }, { passive: true });
  }

  // Sticky CTA Button - Affiche après le scroll du hero
  const ctaSticky = document.getElementById('ctaSticky');
  const heroSection = document.querySelector('.hero');
  if (ctaSticky && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.offsetHeight;
      const scrolled = window.scrollY;
      if (scrolled > heroBottom) {
        ctaSticky.classList.add('show');
      } else {
        ctaSticky.classList.remove('show');
      }
    }, { passive: true });
  }

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      if (nav.classList.contains('open')) {
        nav.style.display = 'flex';
        navToggle.textContent = '✕';
      } else {
        nav.style.display = '';
        navToggle.textContent = '☰';
      }
    });
  }

  // Modal for projects
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalMeta = document.getElementById('modalMeta');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.project .view-btn').forEach(btn=>{
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project');
      const title = card.dataset.title || 'Détails';
      const desc = card.dataset.desc || 'Aucune description fournie.';
      const tech = card.querySelector('.card-tags') ? card.querySelector('.card-tags').textContent : '';
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalMeta) modalMeta.textContent = tech;
      if (modal) modal.setAttribute('aria-hidden','false');
      if (modal) modal.focus();
    });
  });

  if (modalClose && modal) modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('aria-hidden','true'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.setAttribute('aria-hidden','true'); });
  }

  // Filtering projects
  const filter = document.getElementById('filterTech');
  if (filter) {
    filter.addEventListener('change', () => {
      const val = filter.value;
      document.querySelectorAll('.project').forEach(card=>{
        if (val === 'all' || card.dataset.tech === val) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Skills bar animation on scroll
  const skillMeters = document.querySelectorAll('.meter span');
  const animateSkills = () => {
    skillMeters.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible && !bar.dataset.animated) {
        const width = bar.parentElement.querySelector('span').style.width || '0%';
        bar.style.animation = 'none';
        setTimeout(() => {
          bar.style.animation = `fillBar 1.2s ease-out forwards`;
          bar.dataset.animated = 'true';
        }, 10);
      }
    });
  };
  window.addEventListener('scroll', animateSkills, { passive: true });
  animateSkills();
});

// Demo contact handler (remplacer par Formspree / Netlify / endpoint)
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('contactStatus');
  if (status) status.textContent = 'Envoi en cours...';
  setTimeout(()=>{
    if (status) status.textContent = 'Merci — message enregistré (démo).';
    if (form) form.reset();
  }, 900);
}
