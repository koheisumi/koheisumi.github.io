(() => {
  const body = document.body;
  const menuBtn = document.querySelector('.menu-btn');
  const panel = document.querySelector('.menu-panel');
  const langChoices = [...document.querySelectorAll('.lang-choice')];
  const STORAGE_KEY = 'kohei-lang';

  const safeStorageGet = () => {
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  };
  const safeStorageSet = (lang) => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  };
  const queryLang = () => {
    try {
      const v = new URLSearchParams(location.search).get('lang');
      return v === 'ja' || v === 'en' ? v : null;
    } catch (_) { return null; }
  };
  const isInternalHref = (href) => {
    if(!href) return false;
    const h = href.trim();
    return !/^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(h) && h !== '#';
  };
  const linkWithLang = (href, lang) => {
    if(!isInternalHref(href)) return href;
    try {
      const url = new URL(href, location.href);
      url.searchParams.set('lang', lang);
      // Keep links compact and relative on normal pages and file:// previews.
      const filename = url.pathname.split('/').pop() || 'index.html';
      return filename + url.search + url.hash;
    } catch (_) { return href; }
  };
  const syncInternalLinks = (lang) => {
    document.querySelectorAll('a[href]').forEach(a => {
      const raw = a.getAttribute('href');
      if(isInternalHref(raw)) a.setAttribute('href', linkWithLang(raw, lang));
    });
  };
  const reflectLangInUrl = (lang) => {
    try {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.pathname.split('/').pop() + url.search + url.hash);
    } catch (_) {}
  };

  function setLang(lang, persist=true, reflect=true){
    lang = lang === 'ja' ? 'ja' : 'en';
    body.dataset.lang = lang;
    document.documentElement.lang = lang;
    langChoices.forEach(btn => {
      const active = btn.dataset.setLang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if(persist) safeStorageSet(lang);
    if(reflect) reflectLangInUrl(lang);
    syncInternalLinks(lang);
  }

  // URL wins, then the user's remembered choice, then English on a first visit.
  setLang(queryLang() || safeStorageGet() || 'en', false, false);
  langChoices.forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.setLang, true, true)));

  // Quietly mark the current top-level section in the persistent desktop navigation.
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  let currentSection = '';
  if(file === 'works.html' || file.startsWith('work-')) currentSection = 'works';
  else if(file === 'projects.html' || file.startsWith('project-')) currentSection = 'projects';
  else if(file === 'about.html' || file === 'biography.html' || file === 'statement.html' || file === 'cv.html') currentSection = 'about';
  else if(file === 'contact.html') currentSection = 'contact';
  if(currentSection){
    document.querySelectorAll(`[data-nav="${currentSection}"]`).forEach(a => {
      a.classList.add('is-current');
      if(!a.href.startsWith('mailto:')) a.setAttribute('aria-current','page');
    });
  }

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

  document.addEventListener('click', (e) => {
    if(panel && menuBtn && panel.classList.contains('open') && !panel.contains(e.target) && !menuBtn.contains(e.target)){
      panel.classList.remove('open'); body.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','Open menu');
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && panel && panel.classList.contains('open')){
      panel.classList.remove('open'); body.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','Open menu'); menuBtn.focus();
    }
  });

  const slides = [...document.querySelectorAll('.hero-slide')];
  if(slides.length > 1){
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 12000);
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

  // Quiet image lightbox for WORKS thumbnails.
  const lightbox = document.querySelector('#image-lightbox');
  if(lightbox){
    const triggers = [...document.querySelectorAll('[data-lightbox-src]')];
    const img = lightbox.querySelector('.lightbox-stage img');
    const close = lightbox.querySelector('.lightbox-close');
    const prev = lightbox.querySelector('.lightbox-prev');
    const next = lightbox.querySelector('.lightbox-next');
    const count = lightbox.querySelector('.lightbox-count');
    let current = 0;
    let lastFocus = null;
    const sources = triggers.map(el => ({src: el.dataset.lightboxSrc, alt: el.querySelector('img')?.alt || '', el}));
    const show = (index) => {
      if(!sources.length) return;
      current = (index + sources.length) % sources.length;
      img.src = sources[current].src;
      img.alt = sources[current].alt;
      count.textContent = `${current + 1} / ${sources.length}`;
    };
    const open = (index, sourceEl) => {
      lastFocus = sourceEl || document.activeElement;
      show(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden','false');
      body.classList.add('lightbox-open');
      close.focus();
    };
    const hide = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden','true');
      body.classList.remove('lightbox-open');
      img.src = '';
      if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    };
    triggers.forEach((el, index) => el.addEventListener('click', () => open(index, el)));
    close.addEventListener('click', hide);
    prev.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    lightbox.addEventListener('click', (e) => { if(e.target === lightbox) hide(); });
    document.addEventListener('keydown', (e) => {
      if(!lightbox.classList.contains('is-open')) return;
      if(e.key === 'Escape') hide();
      if(e.key === 'ArrowLeft') show(current - 1);
      if(e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
