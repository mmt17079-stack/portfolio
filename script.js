// Interactions : nav mobile, modal, filtrage, contact (démo)
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    if(nav.classList.contains('open')){
      nav.style.display = 'flex';
      navToggle.textContent = '✕';
    } else {
      nav.style.display = '';
      navToggle.textContent = '☰';
    }
  });

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
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalMeta.textContent = tech;
      modal.setAttribute('aria-hidden','false');
      modal.focus();
    });
  });

  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e) => { if(e.target === modal) modal.setAttribute('aria-hidden','true'); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') modal.setAttribute('aria-hidden','true'); });

  // Filtering projects
  const filter = document.getElementById('filterTech');
  filter.addEventListener('change', () => {
    const val = filter.value;
    document.querySelectorAll('.project').forEach(card=>{
      if(val === 'all' || card.dataset.tech === val) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Demo contact handler (remplacer par Formspree / Netlify / endpoint)
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('contactStatus');
  status.textContent = 'Envoi en cours...';
  setTimeout(()=>{
    status.textContent = 'Merci — message enregistré (démo).';
    form.reset();
  }, 900);
}
