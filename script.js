/* ===== THEME TOGGLE ===== */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('lp-theme');
if(savedTheme) root.setAttribute('data-theme', savedTheme);
themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('lp-theme', next);
});

/* ===== NAV SCROLL & BURGER ===== */
const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const burger = document.getElementById('burger');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateProgress();
  updateActiveLink();
});
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ===== SCROLL PROGRESS ===== */
const progressBar = document.getElementById('progressBar');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
}

/* ===== ACTIVE LINK ===== */
const sections = document.querySelectorAll('section[id]');
function updateActiveLink(){
  let current = 'home';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if(window.scrollY >= top) current = sec.id;
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ===== TIMELINE SCROLL ANIMATION ===== */
const timelines = document.querySelectorAll('.timeline');
function updateTimelineProgress(){
  timelines.forEach(tl => {
    const rect = tl.getBoundingClientRect();
    const trigger = window.innerHeight * 0.82;
    const progress = (trigger - rect.top) / rect.height;
    tl.style.setProperty('--tl-progress', Math.max(0, Math.min(1, progress)));
  });
}
window.addEventListener('scroll', updateTimelineProgress);
window.addEventListener('resize', updateTimelineProgress);
updateTimelineProgress();

/* ===== REVEAL ON SCROLL (with stagger) ===== */
const revealEls = document.querySelectorAll('.reveal, .reveal-up');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const group = e.target.closest('.cards-grid, .projects-grid, .timeline, .chips');
      if(group){
        const siblings = [...group.children].filter(c => c.classList.contains('reveal') || c.classList.contains('reveal-up'));
        const idx = siblings.indexOf(e.target);
        e.target.style.transitionDelay = (idx * 0.08) + 's';
      }
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));
// hero elements reveal immediately
setTimeout(() => document.querySelectorAll('.hero-text .reveal-up').forEach(el => el.classList.add('in')), 150);

/* ===== PARALLAX HERO PHOTO ===== */
const heroPhoto = document.querySelector('.hero-photo');
window.addEventListener('scroll', () => {
  if(!heroPhoto) return;
  const y = window.scrollY;
  if(y < window.innerHeight){
    heroPhoto.style.transform = `translateY(${y * 0.18}px)`;
  }
});

/* ===== PROJECTS DATA ===== */
const projects = [
  { cat:'branding', catLabel:'Branding', title:'Vogue Concept', type:'image', src:'assets/PROJETOS/projeto-vogue.jpeg',
    desc:'Projeto editorial focado em branding fashion, identidade visual moderna e direção criativa inspirada em revistas de moda.' },
  { cat:'campanha', catLabel:'Campanha', title:'Nike Running', type:'image', src:'assets/PROJETOS/nike-running.jpeg',
    desc:'Campanha criativa inspirada em performance esportiva, branding visual e marketing para redes sociais.' },
  { cat:'fotografia', catLabel:'Fotografia', title:'Fotografia Publicitária', type:'image', src:'assets/PROJETOS/foto-gastronomia.jpeg',
    desc:'Projeto fotográfico desenvolvido para destacar produtos gastronômicos através de composição visual e iluminação.' },
  { cat:'campanha', catLabel:'Campanha', title:'Estudo Estético: 1980', type:'image', src:'assets/PROJETOS/publicidade%201980.jpeg',
    desc:'Projeto de resgate histórico focado na evolução da publicidade e nos padrões da beleza feminina na década de 1980. Combina direção de arte nostálgica, fotografia em tons clássicos e tipografia marcante.' },
  { cat:'social', catLabel:'Social Media', title:'Academia Smart', type:'image', src:'assets/PROJETOS/publicidade%20academia%20smart.jpeg',
    desc:'Post comercial para o segmento de fitness e bem-estar, unindo identidade visual forte, cores vibrantes e gatilhos de conversão direcionados para captação de clientes.' },
  { cat:'social', catLabel:'Social Media', title:'Marketing Jurídico', type:'image', src:'assets/PROJETOS/publicidade%20advogado.jpeg',
    desc:'Criativo focado em posicionamento e autoridade para o nicho de advocacia, com composição sofisticada, tons neutros e tipografia clean para gerar credibilidade e engajamento.' },
  { cat:'social', catLabel:'Social Media', title:'Personal Branding', type:'image', src:'assets/PROJETOS/publicidade%20autoridade.jpeg',
    desc:'Design focado em posicionamento de marca pessoal e liderança, com minimalismo elegante e tipografia editorial sofisticada para construção de autoridade digital.' },
  { cat:'social', catLabel:'Social Media', title:'Design de Engajamento', type:'image', src:'assets/PROJETOS/publicidade%20bom%20dia%20com%20Jesus.jpeg',
    desc:'Criativo focado em marketing de comunidade e conexão diária para redes sociais, com elementos simbólicos e forte apelo emocional para gerar identificação e engajamento orgânico.' },
  { cat:'campanha', catLabel:'Campanha', title:'Destino Brasil', type:'image', src:'assets/PROJETOS/publicidade%20brasil.jpeg',
    desc:'Direção de arte e manipulação digital para o setor de turismo, integrando tipografia bold em perspectiva e reflexos realistas na água para uma identidade marcante e imersiva.' },
  { cat:'social', catLabel:'Social Media', title:'Pet Care Design', type:'image', src:'assets/PROJETOS/publicidade%20cachorro.jpeg',
    desc:'Peça digital para o segmento pet, com elementos visuais temáticos, paleta vibrante e tipografia descontraída para gerar engajamento e clareza informativa.' },
  { cat:'social', catLabel:'Social Media', title:'Coffee Shop Design', type:'image', src:'assets/PROJETOS/publicidade%20cafe.jpeg',
    desc:'Peça publicitária para o nicho de gastronomia e cafeterias, com apelo sensorial através de cores quentes e efeitos de profundidade para uma composição convidativa.' },
  { cat:'social', catLabel:'Social Media', title:'Design de Eventos', type:'image', src:'assets/PROJETOS/publicidade%20culto.jpeg',
    desc:'Material informativo para divulgação de eventos institucionais, com tipografia estilizada em neon e excelente hierarquia visual para dados como data, local e participantes.' },
  { cat:'social', catLabel:'Social Media', title:'Pizza Delivery Design', type:'image', src:'assets/PROJETOS/publicidade%20dia%20da%20pizza.jpeg',
    desc:'Design publicitário para food delivery, explorando urgência através da fusão visual entre o produto e um relógio, com forte contraste cromático e foco em conversão.' },
  { cat:'campanha', catLabel:'Campanha', title:'Doritos Motion Campaign', type:'video', src:'assets/PROJETOS/publicidade%20doritos.mp4',
    desc:'Animação publicitária (motion design) para engajamento e ativação de produto no segmento de snacks, com transições dinâmicas e gatilhos visuais de apetite.' },
  { cat:'social', catLabel:'Social Media', title:'Branding & Mentoria', type:'image', src:'assets/PROJETOS/publicidade%20faturar.jpeg',
    desc:'Criativo focado em conversão e branding de autoridade para o nicho corporativo e jurídico, com identidade clean e tipografia de forte impacto para venda de mentorias.' },
  { cat:'campanha', catLabel:'Campanha', title:'Fashion Campaign', type:'image', src:'assets/PROJETOS/publicidade%20invista.jpeg',
    desc:'Peça conceitual para o mercado de moda e vestuário urbano, com estética street style e intervenção tipográfica moderna para atração do público jovem.' },
  { cat:'campanha', catLabel:'Campanha', title:'Partiu Maldivas', type:'image', src:'assets/PROJETOS/publicidade%20partiu.jpeg',
    desc:'Manipulação digital e direção de arte para o mercado de turismo, com transição criativa de cenários simulando a imersão em um destino paradisíaco.' },
  { cat:'social', catLabel:'Social Media', title:'Yara Perfume Motion', type:'video', src:'assets/PROJETOS/publicidade%20perfurme.mp4',
    desc:'Criativo animado para o nicho de cosméticos e perfumaria, com paleta vibrante e moldura tipográfica em movimento circular para campanhas de lançamento.' },
  { cat:'social', catLabel:'Social Media', title:'Premium Portfolio Design', type:'image', src:'assets/PROJETOS/publicidade%20portifolio.jpeg',
    desc:'Design institucional para apresentação de portfólio de alto padrão, com paleta de tons neutros e dourados e tipografia serifada elegante.' },
  { cat:'social', catLabel:'Social Media', title:'Estratégia de Público', type:'image', src:'assets/PROJETOS/publicidade%20publico.jpeg',
    desc:'Criativo educativo focado em autoridade digital e estratégias de engajamento, com camadas em opacidade sutil e forte legibilidade tipográfica.' },
  { cat:'social', catLabel:'Social Media', title:'Burger Primer Design', type:'image', src:'assets/PROJETOS/publicidade%20sexta%20do%20hamburger.jpeg',
    desc:'Criativo para food delivery e hamburgueria, com forte apelo visual, tipografia bold sobreposta e paleta de cores quentes para impulsionar vendas de fim de semana.' },
  { cat:'campanha', catLabel:'Campanha', title:'Ipanema Motion Campaign', type:'video', src:'assets/PROJETOS/publicidade%20ipanema.mp4',
    desc:'Peça em motion design para o setor de turismo e aviação, combinando transições fluidas de elementos 3D e composição cinematográfica para ativação de marca.' },
];

const grid = document.getElementById('projectsGrid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'proj-frame reveal';
  card.dataset.cat = p.cat;
  card.innerHTML = `
    <div class="proj-media">
      <span class="proj-corner tl"></span><span class="proj-corner tr"></span>
      <span class="proj-corner bl"></span><span class="proj-corner br"></span>
      ${p.type === 'video'
        ? `<video src="${p.src}" muted loop playsinline></video><span class="proj-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>`
        : `<img src="${p.src}" alt="${p.title}" loading="lazy">`}
    </div>
    <div class="proj-plate">
      <span class="proj-index">${String(i + 1).padStart(2, '0')}</span>
      <div class="proj-plate-text">
        <span class="proj-cat">${p.catLabel}</span>
        <h4>${p.title}</h4>
      </div>
      <span class="proj-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg></span>
    </div>
  `;
  card.addEventListener('click', () => openModal(p));
  if(p.type === 'video'){
    card.addEventListener('mouseenter', () => card.querySelector('video').play());
    card.addEventListener('mouseleave', () => card.querySelector('video').pause());
  }
  grid.appendChild(card);
  io.observe(card);
});

/* filters */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.proj-frame').forEach(card => {
      card.classList.toggle('hide', f !== 'all' && card.dataset.cat !== f);
    });
  });
});

/* ===== MODAL ===== */
const modal = document.getElementById('projectModal');
const modalMedia = document.getElementById('modalMedia');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalCat = document.getElementById('modalCat');

function openModal(p){
  modalMedia.innerHTML = p.type === 'video'
    ? `<video src="${p.src}" controls autoplay muted loop playsinline></video>`
    : `<img src="${p.src}" alt="${p.title}">`;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalCat.textContent = p.catLabel;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.classList.remove('open');
  document.body.style.overflow = '';
  modalMedia.innerHTML = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalBackdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const email = document.getElementById('email').value;
  const text = `Olá Lorraini! Meu nome é ${name} (${email}).%0AAssunto: ${subject}%0A%0A${message}`;
  window.open(`https://wa.me/5544984294424?text=${text}`, '_blank');
  formNote.textContent = 'Redirecionando para o WhatsApp...';
  form.reset();
});

/* ===== FAB MENU ===== */
const fabWrap = document.querySelector('.fab-wrap');
const fabMain = document.getElementById('fabMain');
fabMain.addEventListener('click', () => fabWrap.classList.toggle('open'));

/* ===== FOOTER YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();