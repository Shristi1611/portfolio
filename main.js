/* Renders content.js into the page, switches between views, and powers the animations. */
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const S = typeof SITE !== 'undefined' ? SITE : null; // `const SITE` in content.js is not a window property
  if (!S) return;

  const KEYS = Object.keys(S.profiles);
  const heroApi = { refresh: null };
  const demo = { cards: [], i: 0, flipped: false };

  /* ---------- which view? (?view=ml  >  last choice  >  generic) ---------- */
  function initialView() {
    const q = new URLSearchParams(location.search).get('view');
    if (q && S.profiles[q]) return q;
    try { const v = localStorage.getItem('ss-view'); if (v && S.profiles[v]) return v; } catch (e) {}
    return 'generic';
  }
  let view = initialView();

  /* ---------- observers (reveal + counters) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  const observeReveals = (root) => (root || document).querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));

  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target;
      const target = parseFloat(el.dataset.target) || 0;
      const dec = parseInt(el.dataset.dec || '0', 10);
      const suf = el.dataset.suf || '';
      if (reduced) { el.textContent = target.toFixed(dec) + suf; return; }
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = clamp01((t - t0) / dur);
        el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  /* ---------- static content (same in every view) ---------- */
  function renderStatic() {
    $('logo').textContent = S.initials;
    $('footer-text').textContent = '© ' + new Date().getFullYear() + ' ' + S.name + ' · ' + S.location;

    const pb = $('portrait-bw'), pc = $('portrait-color');
    pb.src = pc.src = S.portrait;
    pb.alt = 'Portrait of ' + S.name;

    const row = (rev) => {
      const spans = [];
      for (let i = 0; i < 8; i++) {
        const first = i % 2 === 0;
        const outline = rev ? first : !first;
        spans.push('<span class="' + (outline ? 'o' : '') + '">' + esc(first ? S.first : S.last + ' ·') + '&nbsp;</span>');
      }
      return '<div class="mq-row ' + (rev ? 'rev' : '') + '"><div class="mq-track">' + spans.join('') + '</div></div>';
    };
    $('name-marquee').innerHTML = row(false) + row(true);
    $('signature').textContent = S.name;
    $('statement-sig').textContent = S.name;

    $('education-track').innerHTML = S.highlights.map((x) => '<article class="xcard reveal"><span class="y">' + esc(x.year) + '</span><h3>' + esc(x.title) + '</h3><span class="o">' + esc(x.org) + '</span><p>' + esc(x.text) + '</p></article>').join('');
    $('interests-chips').innerHTML = S.interests.map((i) => '<span class="chip">' + esc(i) + '</span>').join('');
    $('lang-grid').innerHTML = S.languages.map((l) => '<div class="lang"><b>' + esc(l.name) + '</b><span>' + esc(l.level) + '</span></div>').join('');

    const links = [
      { label: 'GitHub', sub: S.github.replace('https://', ''), url: S.github },
      { label: 'LinkedIn', sub: S.linkedin.replace('https://www.', ''), url: S.linkedin }
    ];
    $('biglinks').innerHTML = links.map((l) => '<a class="biglink" href="' + esc(l.url) + '" target="_blank" rel="noopener"><span>' + esc(l.label) + '<small>' + esc(l.sub) + '</small></span><i>→</i></a>').join('');

    const mail = 'mailto:' + S.email;
    $('contact-big').href = mail;
    $('contact-mail').href = mail;
    $('contact-mail').textContent = S.email;

    // header menu (mobile) mirrors the desktop links
    const links2 = $('nav-links'), panel = $('nav-panel'), toggle = $('nav-toggle');
    [...links2.children].forEach((a) => {
      const c = a.cloneNode(true);
      c.addEventListener('click', () => { panel.classList.remove('open'); toggle.textContent = 'Menu'; });
      panel.appendChild(c);
    });
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    // view controls: header dropdown + chip bar
    $('view-select').innerHTML = KEYS.map((k) => '<option value="' + k + '">' + esc(S.profiles[k].label) + '</option>').join('');
    $('view-select').addEventListener('change', (e) => setView(e.target.value));
    $('view-chips').innerHTML = KEYS.map((k) => '<button class="vchip" data-view="' + k + '" aria-pressed="false">' + esc(S.profiles[k].label) + '</button>').join('');
    $('view-chips').addEventListener('click', (e) => {
      const b = e.target.closest('.vchip');
      if (b) setView(b.dataset.view);
    });
  }

  /* ---------- view-specific content ---------- */
  const pick = (map, key) => (map && (map[key] || map.all)) || null;

  function renderView(key) {
    const P = S.profiles[key];
    document.title = S.name + ' · ' + P.role;
    document.documentElement.dataset.view = key;

    $('view-select').value = key;
    $('view-chips').querySelectorAll('.vchip').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === key)));

    // hero
    $('badge-text').textContent = P.badge;
    $('hero-tagline').textContent = P.tagline;
    $('stripe-track').innerHTML = ('<span>' + esc(P.stripe) + '&nbsp;</span>').repeat(16);

    const slots = [
      { top: '24%', left: '10%', rot: -7, depth: .05, d: .3 },
      { top: '38%', right: '8%', rot: 5, depth: .11, d: .45, hideMobile: true },
      { top: '42%', left: '4%', rot: -4, depth: .09, d: .52 },
      { top: '62%', left: '12%', rot: 4, depth: .08, d: .6 },
      { top: '72%', right: '13%', rot: -5, depth: .13, d: .75, hideMobile: true }
    ];
    const resolve = (t) => (t === '$pill' ? P.pill : t === '$tag' ? P.tag : t);
    const st = S.stickers.slice(0, 5).map((s, i) => {
      const p = slots[i];
      const pos = ['top', 'left', 'right'].filter((k) => p[k]).map((k) => k + ':' + p[k]).join(';');
      const style = 'rotate:' + p.rot + 'deg;animation-delay:' + (-i * 1.3) + 's';
      const inner = s.style === 'card'
        ? '<div style="' + style + '" class="s-card"><b>' + esc(resolve(s.text)) + '</b>' + (s.sub ? '<small>' + esc(s.sub) + '</small>' : '') + '</div>'
        : '<div style="' + style + '" class="s-' + s.style + '">' + esc(resolve(s.text)) + '</div>';
      return '<div class="sticker" data-depth="' + p.depth + '" data-hide="' + (p.hideMobile ? 1 : 0) + '" style="' + pos + ';animation-delay:' + p.d + 's">' + inner + '</div>';
    });
    st.push('<div class="sticker s-star" data-depth=".16" style="top:17%;right:24%;animation-delay:.9s"><div><svg viewBox="0 0 40 40" width="40" height="40" style="display:block"><path d="M20 0 L24 16 L40 20 L24 24 L20 40 L16 24 L0 20 L16 16 Z" fill="currentColor"/></svg></div></div>');
    $('stickers').innerHTML = st.join('');
    if (heroApi.refresh) heroApi.refresh();

    // statement, about
    const sm = P.statement;
    $('statement-text').innerHTML = esc(sm.a) + ' <em>' + esc(sm.em) + '</em>' + esc(sm.b) + '<br><span class="o">' + esc(sm.out) + '</span>';
    $('about-lead').textContent = P.lead;
    $('about-text').textContent = P.about;
    $('about-facts').innerHTML = P.facts.map((f) => '<div class="fact reveal scale"><span class="n">' + esc(f.n) + '</span><span class="l">' + esc(f.label) + '</span><span class="v">' + esc(f.value) + '</span></div>').join('');
    $('cv-btn').href = P.cv;
    $('cv-btn').textContent = 'Download CV (PDF) ↓';
    $('resume-btn').href = 'resume.html?view=' + key;

    // stats
    $('stats-grid').innerHTML = P.stats.map((s) => '<div class="stat"><span class="n stat-number" data-target="' + s.n + '" data-dec="' + (s.dec || 0) + '" data-suf="' + esc(s.suf || '') + '">' + (0).toFixed(s.dec || 0) + esc(s.suf || '') + '</span><span class="l">' + esc(s.label) + '</span></div>').join('');
    $('stats-grid').querySelectorAll('.stat-number').forEach((el) => cio.observe(el));

    // skills
    $('skills-grid').innerHTML = P.skills.map((g) => '<div class="skill-group reveal"><h3>' + esc(g.group) + '</h3><div class="chips-sm">' + g.items.map((i) => '<span class="chip-sm">' + esc(i) + '</span>').join('') + '</div></div>').join('');

    // projects
    $('projects-intro').textContent = P.projects.length + ' project' + (P.projects.length === 1 ? '' : 's') + ' selected for the ' + P.label.toLowerCase() + ' view. Switch the view at the top to see the same work told differently.';
    $('projects-grid').innerHTML = P.projects.map((id, idx) => {
      const p = S.projects[id];
      const sub = pick(p.subtitle, key);
      const bullets = pick(p.bullets, key) || [];
      const href = p.repo || (p.github ? S.github : '');
      return '<article class="pcard reveal scale"><span class="ghost-n">' + String(idx + 1).padStart(2, '0') + '</span><h3>' + esc(p.title) + '</h3>' +
        (sub ? '<p class="sub">' + esc(sub) + '</p>' : '') +
        '<p class="meta">' + esc(p.stack.join(' · ')) + ' · ' + esc(p.year) + '</p>' +
        '<ul>' + bullets.map((b) => '<li>' + esc(b) + '</li>').join('') + '</ul>' +
        (href ? '<a class="more" href="' + esc(href) + '" target="_blank" rel="noopener">' + (p.repo ? 'View on GitHub →' : 'GitHub profile →') + '</a>' : '') +
        '</article>';
    }).join('');

    // smaller repos
    const more = (S.more || []).filter((m) => m.views.includes(key));
    $('more-wrap').style.display = more.length ? '' : 'none';
    $('more-grid').innerHTML = more.map((m) => '<a class="mini reveal scale" href="' + esc(m.repo) + '" target="_blank" rel="noopener"><b>' + esc(m.title) + '</b><p>' + esc(m.text) + '</p><span class="meta">' + esc(m.tags.join(' · ')) + '</span><i>↗</i></a>').join('');

    // spotlight = first project of the view
    const sp = S.projects[P.projects[0]];
    const spSub = pick(sp.subtitle, key);
    $('spot-title').textContent = sp.title + (spSub ? ': ' + spSub : '');
    $('spot-tags').innerHTML = sp.stack.map((t) => '<span class="tag">' + esc(t) + '</span>').join('');
    $('spot-text').textContent = (pick(sp.bullets, key) || [''])[0];
    $('spot-result').textContent = sp.result;
    demo.cards = sp.flips; demo.i = 0; demo.flipped = false;
    renderDemo();

    observeReveals();
  }

  function renderDemo() {
    const c = demo.cards[demo.i];
    if (!c) return;
    $('flash-text').textContent = c[demo.flipped ? 1 : 0];
    $('flash').classList.toggle('flipped', demo.flipped);
    $('demo-label').textContent = demo.flipped ? 'Answer' : 'Tap the card';
    $('flash-count').textContent = (demo.i + 1) + ' / ' + demo.cards.length;
  }
  $('flash').addEventListener('click', () => { demo.flipped = !demo.flipped; renderDemo(); });
  $('flash-next').addEventListener('click', () => { demo.i = (demo.i + 1) % demo.cards.length; demo.flipped = false; renderDemo(); });

  function setView(key) {
    if (!S.profiles[key] || key === view) return;
    view = key;
    try { localStorage.setItem('ss-view', key); } catch (e) {}
    const url = new URL(location.href);
    if (key === 'generic') url.searchParams.delete('view'); else url.searchParams.set('view', key);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
    renderView(key);
  }

  /* ---------- header + progress ---------- */
  const header = $('site-header');
  const onHeaderScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onHeaderScroll();
  window.addEventListener('scroll', onHeaderScroll, { passive: true });
  const bar = $('scroll-progress');
  const updBar = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
  };
  updBar();
  window.addEventListener('scroll', updBar, { passive: true });

  /* ---------- hero: spotlight, dot grid, stickers, pinned scroll ---------- */
  function initHero() {
    const portrait = $('portrait'), canvas = $('dots'), hero = $('home');
    const marquee = $('name-marquee'), sig = $('signature'), tag = $('hero-tagline'), badge = $('hero-badge');
    const ctx = canvas.getContext('2d');

    let tX = 0, tY = 0, tR = 0, cX = 0, cY = 0, cR = 0;
    const SPOT = 150;
    const local = (e) => { const b = portrait.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; };
    portrait.addEventListener('pointerenter', (e) => { const p = local(e); cX = tX = p.x; cY = tY = p.y; tR = SPOT; });
    portrait.addEventListener('pointermove', (e) => { const p = local(e); tX = p.x; tY = p.y; tR = SPOT; });
    portrait.addEventListener('pointerleave', () => { tR = 0; });

    const SPACING = 26;
    let dots = [], dpr = 1, mouseX = -9999, mouseY = -9999, ex = -9999, ey = -9999;
    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
      dots = [];
      for (let y = SPACING / 2; y < innerHeight; y += SPACING)
        for (let x = SPACING / 2; x < innerWidth; x += SPACING)
          dots.push({ x, y, ph: Math.random() * 6.28, ph2: Math.random() * 6.28, amp: 4 + Math.random() * 10, spd: .18 + Math.random() * .5 });
    };
    build();
    const accRGB = () => {
      const h = getComputedStyle(document.documentElement).getPropertyValue('--acc').trim().replace('#', '');
      return /^[0-9a-f]{6}$/i.test(h) ? [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) : [124, 92, 255];
    };
    const [ar, ag, ab] = accRGB();

    const streaks = [];
    const spawn = (s, on) => {
      const w = innerWidth, h = innerHeight;
      if (on) { s.x = Math.random() * w; s.y = Math.random() * h; s.a = Math.random() * 6.28; }
      else {
        const e = Math.floor(Math.random() * 4);
        if (e === 0) { s.x = -150; s.y = Math.random() * h; s.a = 0; }
        if (e === 1) { s.x = w + 150; s.y = Math.random() * h; s.a = Math.PI; }
        if (e === 2) { s.x = Math.random() * w; s.y = -150; s.a = Math.PI / 2; }
        if (e === 3) { s.x = Math.random() * w; s.y = h + 150; s.a = -Math.PI / 2; }
        s.a += (Math.random() - .5) * 1.4;
      }
      s.speed = .6 + Math.random(); s.curve = (Math.random() - .5) * .012; s.radius = 110 + Math.random() * 70;
    };
    for (let i = 0; i < 6; i++) { const s = {}; spawn(s, true); streaks.push(s); }

    let stickers = [];
    const mobileStickers = () => document.querySelectorAll('.sticker[data-hide="1"]').forEach((el) => { el.style.display = innerWidth < 720 ? 'none' : ''; });
    heroApi.refresh = () => {
      stickers = [...document.querySelectorAll('.sticker')].map((el) => ({ el, depth: parseFloat(el.dataset.depth) || .08, x: 0, y: 0 }));
      mobileStickers();
    };
    heroApi.refresh();

    let nx = 0, ny = 0;
    window.addEventListener('pointermove', (e) => { mouseX = e.clientX; mouseY = e.clientY; nx = e.clientX / innerWidth - .5; ny = e.clientY / innerHeight - .5; });
    window.addEventListener('resize', () => { build(); mobileStickers(); });

    const frame = () => {
      requestAnimationFrame(frame);
      if (document.hidden) return;

      cX = lerp(cX, tX, reduced ? 1 : .16); cY = lerp(cY, tY, reduced ? 1 : .16); cR = lerp(cR, tR, reduced ? 1 : .08);
      portrait.style.setProperty('--mx', cX + 'px');
      portrait.style.setProperty('--my', cY + 'px');
      portrait.style.setProperty('--mr', Math.max(cR, 0.1) + 'px');

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ex = lerp(ex, mouseX, .15); ey = lerp(ey, mouseY, .15);
      for (const s of streaks) {
        s.x += Math.cos(s.a) * s.speed; s.y += Math.sin(s.a) * s.speed; s.a += s.curve;
        if (s.x < -300 || s.x > innerWidth + 300 || s.y < -300 || s.y > innerHeight + 300) spawn(s);
      }
      const pts = reduced ? [] : [{ x: ex, y: ey, radius: 190 }, ...streaks];
      const now = performance.now() / 1000;
      for (const d of dots) {
        const bx = d.x + Math.cos(now * d.spd + d.ph) * d.amp;
        const by = d.y + Math.sin(now * d.spd * .8 + d.ph2) * d.amp;
        let t = 0, px = 0, py = 0, pd = 1;
        for (const p of pts) {
          const dx = bx - p.x, dy = by - p.y, dist = Math.hypot(dx, dy), ti = Math.max(0, 1 - dist / p.radius);
          if (ti > t) { t = ti; px = dx; py = dy; pd = dist; }
        }
        const push = t * t * 16;
        const x = bx + (pd > 0 ? (px / pd) * push : 0), y = by + (pd > 0 ? (py / pd) * push : 0);
        ctx.beginPath();
        ctx.arc(x, y, 1 + t * 1.5, 0, 6.283);
        ctx.fillStyle = 'rgba(' + Math.round(238 + (ar - 238) * t) + ',' + Math.round(238 + (ag - 238) * t) + ',' + Math.round(234 + (ab - 234) * t) + ',' + (.3 + t * .55) + ')';
        ctx.fill();
      }

      if (!reduced) for (const s of stickers) {
        s.x = lerp(s.x, nx * s.depth * 700, .06); s.y = lerp(s.y, ny * s.depth * 500, .06);
        s.el.style.translate = s.x + 'px ' + s.y + 'px';
      }
    };
    requestAnimationFrame(frame);

    const onScroll = () => {
      if (reduced) { sig.style.opacity = 1; marquee.style.opacity = 1; return; }
      const total = hero.offsetHeight - innerHeight;
      const p = clamp01(scrollY / total);
      const vw = innerWidth, vh = innerHeight;
      const size = Math.min(vh * .52, vw * .8);
      const shrink = clamp01(p / .75);
      const eased = 1 - Math.pow(1 - shrink, 3);
      portrait.style.width = vw + (size - vw) * eased + 'px';
      portrait.style.height = vh + (size - vh) * eased + 'px';
      portrait.style.bottom = ((vh - size) / 2) * eased + 'px';
      marquee.style.opacity = clamp01((p - .1) / .3);
      sig.style.opacity = clamp01((p - .72) / .2);
      sig.style.transform = 'translate(-50%, -50%) rotate(-5deg) scale(' + (.9 + .1 * clamp01((p - .72) / .2)) + ')';
      const fade = 1 - clamp01(p / .25);
      tag.style.opacity = fade; badge.style.opacity = fade;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ---------- go ---------- */
  renderStatic();
  renderView(view);
  observeReveals();
  initHero();
})();
