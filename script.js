
(() => {
  const body = document.body;
  const menuBtn = document.querySelector('.menu-btn');
  const panel = document.querySelector('.menu-panel');
  const toggle = document.querySelector('.lang-toggle');
  const state = document.querySelector('.lang-state');
  const other = document.querySelector('.lang-other');

  function setLang(lang, persist=true){
    lang = lang === 'ja' ? 'ja' : 'en';
    body.dataset.lang = lang;
    document.documentElement.lang = lang;
    if(state) state.textContent = lang === 'en' ? 'EN' : 'JP';
    if(other) other.textContent = lang === 'en' ? 'JP' : 'EN';
    if(persist) localStorage.setItem('kohei-lang', lang);
  }
  // English is the default; remember an explicit choice after the first switch.
  setLang(localStorage.getItem('kohei-lang') || 'en', false);
  if(toggle) toggle.addEventListener('click', () => setLang(body.dataset.lang === 'en' ? 'ja' : 'en'));

  if(menuBtn && panel){
    menuBtn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      body.classList.toggle('menu-open', open);
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      panel.classList.remove('open'); body.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded','false');
    }));
  }

  const slides = [...document.querySelectorAll('.hero-slide')];
  if(slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 7200);
  }

  const header = document.querySelector('.site-header');
  let lastY = window.scrollY;
  let ticking = false;
  const updateHeader = () => {
    const y = window.scrollY;
    if(header && !body.classList.contains('menu-open')){
      if(y > lastY && y > 120) header.classList.add('is-hidden');
      else if(y < lastY) header.classList.remove('is-hidden');
    }
    lastY = y; ticking = false;
  };
  window.addEventListener('scroll', () => { if(!ticking){ requestAnimationFrame(updateHeader); ticking = true; } }, {passive:true});
})();
