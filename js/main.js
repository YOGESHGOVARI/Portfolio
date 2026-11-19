(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };

  /* Theme */
  const root = document.documentElement;
  const saved = store.get('yg-theme');
  if (saved) root.dataset.theme = saved;
  const meta = $('meta[name="theme-color"]');
  const syncMeta = () => { meta.content = root.dataset.theme === 'dark' ? '#050a1c' : '#eef3ff'; };
  syncMeta();
  $('#theme').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('yg-theme', root.dataset.theme); syncMeta();
  });

  /* Mobile menu */
  const burger = $('#burger'), menu = $('#menu');
  burger.addEventListener('click', () => { burger.setAttribute('aria-expanded', menu.classList.toggle('open')); });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

  /* Scroll spy */
  const sections = $$('main section[id]'), links = $$('.menu a');
  const spy = () => {
    let cur = '';
    for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s.id;
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  };
  addEventListener('scroll', spy, { passive: true }); spy();

  /* Reveal with stagger */
  $$('.reveal').forEach((el) => {
    const sibs = $$(':scope > .reveal', el.parentElement);
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 0.07 + 's');
  });
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  /* Counters */
  const count = (el) => {
    const to = parseFloat(el.dataset.to), dec = +el.dataset.dec || 0, suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = to.toFixed(dec) + suf; return; }
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1300), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } }), { threshold: 0.6 });
  $$('.count').forEach((el) => cio.observe(el));

  /* Typed role line */
  const roles = ['Software Developer @ TCS', 'Backend & full-stack engineer', 'Building AI agents that automate work', 'Computer-vision & ML enthusiast'];
  const typed = $('#typed');
  if (reduce) typed.textContent = roles[0];
  else {
    let r = 0, c = 0, del = false;
    const step = () => {
      const w = roles[r];
      typed.textContent = w.slice(0, c);
      if (!del && c === w.length) { del = true; return setTimeout(step, 1700); }
      if (del && c === 0) { del = false; r = (r + 1) % roles.length; return setTimeout(step, 320); }
      c += del ? -1 : 1;
      setTimeout(step, del ? 26 : 58);
    };
    step();
  }

  /* Ticker: duplicate for seamless loop */
  const tick = $('#tick');
  tick.innerHTML += tick.innerHTML;

  /* Copy email */
  const copy = $('#copy');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('yogeshgovari1502@gmail.com'); copy.textContent = 'Copied ✓'; }
    catch { copy.textContent = 'Press Ctrl/⌘+C'; }
    setTimeout(() => { copy.textContent = 'Copy email'; }, 1800);
  });
  /* Status-bar clock */
  const clock = $('#clock');
  const tickClock = () => { clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · India'; };
  tickClock(); setInterval(tickClock, 30000);

  /* Code-rain background */
  const cv = $('#rain'), ctx = cv.getContext('2d');
  if (!reduce) {
    const glyphs = '01{}[]<>/=+*#$;:()ABCDEFxyz'.split('');
    let cols, drops, W, H; const fs = 15;
    const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; cols = Math.ceil(W / fs); drops = Array.from({ length: cols }, () => Math.random() * H / fs); };
    size(); addEventListener('resize', size);
    let last = 0;
    const frame = (t) => {
      if (t - last > 70) {
        last = t;
        ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.globalCompositeOperation = 'destination-out'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over';
        ctx.font = fs + 'px monospace';
        const color = root.dataset.theme === 'light' ? '#2563eb' : '#60a5fa';
        for (let i = 0; i < cols; i++) {
          ctx.fillStyle = color; ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * fs, drops[i] * fs);
          if (drops[i] * fs > H && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      if (!document.hidden) requestAnimationFrame(frame); else document.addEventListener('visibilitychange', () => requestAnimationFrame(frame), { once: true });
    };
    requestAnimationFrame(frame);
  }
})();
