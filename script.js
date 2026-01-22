
// Basic interactions: nav toggle, modal, filtering, contact handler
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav toggle (mobile)
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

  // Modal logic for project cards
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.project .view-btn').forEach(btn=>{
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project');
      modalTitle.textContent = card.dataset.title || 'Détails du projet';
      modalDesc.textContent = card.dataset.desc || 'Description non fournie.';
      modal.setAttribute('aria-hidden','false');
    });
  });

  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.setAttribute('aria-hidden','true');
  });

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

// Faux handler contact (remplacer par endpoint réel / email)
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('contactStatus');
  status.textContent = 'Envoi en cours...';
  // Pour production : envoyer les données vers ton email via Formspree / Netlify Forms / backend
  setTimeout(()=>{
    status.textContent = 'Merci — message envoyé ! (Ceci est une démo).';
    form.reset();
  }, 900);
}
