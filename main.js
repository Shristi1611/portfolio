(function () {
  'use strict';
  var S = typeof SITE !== 'undefined' ? SITE : null;
  if (!S) { document.body.insertAdjacentHTML('afterbegin', '<p style="padding:2rem">content.js failed to load.</p>'); return; }

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var pick = function (map, key) { return map[key] || map.all || map[Object.keys(map)[0]]; };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var KEYS = ['generic', 'se', 'ai', 'ml', 'ds'];
  var SHORT = { generic: 'ALL', se: 'SE', ai: 'AI', ml: 'ML', ds: 'DS' };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var view = 'generic';
  try {
    var q = new URLSearchParams(location.search).get('view');
    var saved = localStorage.getItem('ss-view');
    view = KEYS.indexOf(q) > -1 ? q : (KEYS.indexOf(saved) > -1 ? saved : 'generic');
  } catch (e) {}

  function has(v) { return Array.isArray(v) ? v.length > 0 : !!v; }
  function show(id, on) { var el = $(id); if (el) el.hidden = !on; }

  /* ---------- static content ---------- */
  function renderStatic() {
    document.title = S.name + ' · Portfolio';
    $('logo').textContent = S.initials;
    $('portrait-bw').src = S.portrait;
    $('portrait-color').src = S.portrait;
    $('portrait-bw').alt = S.name;
    $('contact-avatar').src = S.portrait;
    $('signature').textContent = S.first;
    $('statement-text').innerHTML = 'B.Tech Computer Science. CGPA 9.18.<br>GH Raisoni International Skill Tech University.';

    var links = [['projects', 'Projects']];
    if (has(S.motivation)) links.push(['motivation', 'Motivation']);
    if (has(S.mindset)) links.push(['mindset', 'Mindset']);
    links.push(['experience', 'Experience']);
    if (has(S.highlights)) links.push(['highlights', 'Highlights']);
    links.push(['interests', 'Interests']);
    if (has(S.gallery)) links.push(['gallery', 'Gallery']);
    links.push(['socials', 'Socials'], ['contact', 'Contact']);
    $('nav-links').innerHTML = links.map(function (l) { return '<a href="#' + l[0] + '" data-s="' + l[0] + '">' + l[1] + '</a>'; }).join('');
    $('nav-panel').innerHTML = links.map(function (l) { return '<a href="#' + l[0] + '">' + l[1] + '</a>'; }).join('') + '<div class="pill seg" id="view-seg-m" role="group" aria-label="View portfolio as"></div>';
    var n = links.length - 1; // socials is not numbered
    $('contact-num').textContent = 'Contact';

    if (has(S.motivation)) {
      show('motivation', true);
      $('mot-lead').textContent = S.motivation.lead || '';
      var paras = S.motivation.paras || (S.motivation.text ? [S.motivation.text] : []);
      $('mot-text').innerHTML = paras.map(function (p) { return '<span class="mot-p" style="display:block;margin-bottom:1.6rem">' + esc(p) + '</span>'; }).join('');
    }
    if (has(S.mindset)) { show('mindset', true); $('mind-list').innerHTML = S.mindset.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join(''); }
    if (has(S.highlights)) {
      show('highlights', true);
      $('hl-photos').innerHTML = (S.highlights.photos || []).map(function (p) { return '<img src="' + esc(p) + '" alt="" loading="lazy">'; }).join('');
      $('hl-cards').innerHTML = (S.highlights.cards || []).map(function (c) { return '<div class="hl-card reveal"><h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p></div>'; }).join('');
    }
    if (has(S.gallery)) show('gallery', true);

    $('exp-track').innerHTML = S.experience.map(function (x) {
      return '<article class="xcard"><span class="y">' + esc(x.year) + '</span><h3>' + esc(x.title) + '</h3><div class="o">' + esc(x.org) + '</div><p>' + esc(x.text) + '</p></article>';
    }).join('');

    $('interests-chips').innerHTML = S.interests.map(function (i) { return '<span class="chip">' + esc(i) + '</span>'; }).join('');
    $('lang-grid').innerHTML = S.languages.map(function (l) { return '<div class="lang"><b>' + esc(l.name) + '</b><span>' + esc(l.level) + '</span></div>'; }).join('');

    var ph = S.socialPhotos || [];
    if (ph.length >= 3) {
      var cnt = ph.length, mid = Math.floor((cnt - 1) / 2);
      $('fan').innerHTML = ph.map(function (p, i) {
        var d = i - mid;
        return '<div class="photo' + (d === 0 ? ' main' : '') + '" style="rotate:' + (d * 6) + 'deg;translate:0 ' + (Math.abs(d) * 4) + '%;z-index:' + (9 - Math.abs(d)) + '"><img src="' + esc(p) + '" alt="" loading="lazy"></div>';
      }).join('');
    }
    $('social-links').innerHTML = 'Find me on <a href="' + esc(S.github) + '" target="_blank" rel="noopener">GitHub</a> <a href="' + esc(S.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' + (S.devto ? ' <a href="' + esc(S.devto) + '" target="_blank" rel="noopener">DEV</a>' : '');

    $('contact-mail').textContent = S.email;
    $('contact-gh').href = S.github;
    $('contact-li').href = S.linkedin;
    $('footer-text').textContent = '© ' + new Date().getFullYear() + ' ' + S.name + ' · ' + S.location;
    buildGallery();
  }

  /* ---------- gallery ---------- */
  var galFigs = [], galWords = [];
  var GX = [24, 68, 46, 14, 76, 38, 60];
  var GS = [1, 1.35, .9, 1.5, 1.1, 1.3, .95];
  var GP = [.16, -.12, .2, -.17, .1, -.2, .14];
  function buildGallery() {
    var g = S.gallery || []; if (!g.length) return;
    var stage = $('gal');
    stage.innerHTML = '';
    galFigs = g.map(function (it, i) {
      var f = document.createElement('figure'); f.className = 'gal-fig';
      f.innerHTML = '<img src="' + esc(it.src) + '" alt="' + esc(it.caption || '') + '" loading="lazy"><figcaption>' + esc(it.caption || '') + '</figcaption>';
      f.style.width = 'calc(clamp(120px, 11vw, 240px) * ' + GS[i % GS.length] + ')';
      stage.appendChild(f); return f;
    });
    var words = g.length > 2 ? ['Build', 'Learn'] : ['Build'];
    galWords = words.map(function (w) { var s = document.createElement('span'); s.className = 'ghost-word'; s.textContent = w; s.setAttribute('aria-hidden', 'true'); stage.insertBefore(s, stage.firstChild); return s; });
    layoutGallery();
  }
  function layoutGallery() {
    if (!galFigs.length) return;
    var vh = innerHeight, vw = innerWidth, step = vh * 0.5, top0 = vh * 0.3, n = galFigs.length;
    $('gal').style.height = (top0 + n * step + vh * 0.35) + 'px';
    galFigs.forEach(function (f, i) {
      var x = GX[i % GX.length] / 100 * (vw - f.offsetWidth - 40) + 20;
      f._y = top0 + i * step;
      f.style.left = x + 'px'; f.style.top = f._y + 'px';
    });
    var half = Math.ceil(n / 2);
    galWords.forEach(function (w, k) {
      var a = k === 0 ? 0 : half, b = k === 0 ? (galWords.length > 1 ? half : n) : n;
      w.style.top = (top0 + ((a + b - 1) / 2) * step + 60) + 'px';
    });
  }

  /* ---------- per view ---------- */
  function renderSeg() {
    var html = KEYS.map(function (k) { return '<button type="button" data-v="' + k + '" aria-pressed="' + (k === view) + '" title="' + esc(S.profiles[k].label) + '">' + SHORT[k] + '</button>'; }).join('');
    ['view-seg', 'view-seg-m'].forEach(function (id) { var el = $(id); if (el) el.innerHTML = html; });
  }

  function renderView() {
    var P = S.profiles[view];
    $('hero-badge').textContent = P.badge;
    $('nav-cv').href = $('hero-cv').href = $('contact-cv').href = P.cv;

    var spots = [
      { l: '11%', t: '22%', r: -8 }, { l: '80%', t: '37%', r: 6 }, { l: '6%', t: '47%', r: -5 },
      { l: '13%', t: '70%', r: 6 }, { l: '76%', t: '73%', r: -6 }
    ];
    $('stickers').innerHTML = S.stickers.map(function (s, i) {
      var t = s.text === '$pill' ? P.pill : s.text === '$tag' ? P.tag : s.text;
      var sp = spots[i % spots.length];
      var inner = s.style === 'card' ? '<b>' + esc(t) + '</b><small>' + esc(s.sub || '') + '</small>' : esc(t);
      return '<div class="sticker" style="left:' + sp.l + ';top:' + sp.t + ';rotate:' + sp.r + 'deg;animation-delay:' + (0.3 + i * 0.15) + 's" data-p="' + ((i % 2 ? 1 : -1) * (14 + i * 6)) + '"><div class="s-' + s.style + '">' + inner + '</div></div>';
    }).join('');

    var word = '<span>' + esc(S.name) + '</span><span class="o">' + esc(S.name) + '</span>';
    var row = function (cls) { return '<div class="mq-row ' + cls + '"><div class="mq-track">' + word.repeat(6) + '</div></div>'; };
    $('name-marquee').innerHTML = row('') + row('rev');
    $('stripe-track').innerHTML = ('<span>' + esc(P.stripe) + '</span>').repeat(14);

    if (window.Visuals) window.Visuals.setArch(S.arch);
    $('projects-list').innerHTML = P.projects.map(function (key, i) {
      var p = S.projects[key];
      var b = p.bullets[view] || p.bullets.all;
      return '<article class="prow reveal' + (i % 2 ? ' flip' : '') + '">' +
        '<div class="ptext"><span class="n">' + (i + 1) + '</span><h3>' + esc(p.title) + '</h3>' +
        '<p class="sub">' + esc(pick(p.subtitle, view)) + '</p>' +
        '<div class="ptags">' + p.stack.map(function (t) { return '<span class="ptag">' + esc(t) + '</span>'; }).join('') + '<span class="ptag yr">' + esc(p.year) + '</span></div>' +
        '<p class="pp">' + esc(b[0]) + '</p>' +
        '<div class="pbtns">' + (b.length > 1 ? '<button type="button" class="pbtn rm" data-k="' + key + '">Read more</button>' : '') +
        (p.repo ? '<a class="pbtn" href="' + esc(p.repo) + '" target="_blank" rel="noopener">View on GitHub <span aria-hidden="true">→</span></a>' : '') + '</div>' +
        '</div>' +
        (window.Visuals ? window.Visuals.html(key, p, (S.arch || {})[key]) : '') +
        '</article>';
    }).join('');

    $('skills-grid').innerHTML = P.skills.map(function (g) {
      return '<div class="skill-group reveal"><p class="sub-label">' + esc(g.group) + '</p><div class="chips-sm">' + g.items.map(function (i) { return '<span class="chip-sm">' + esc(i) + '</span>'; }).join('') + '</div></div>';
    }).join('');

    if (window.Visuals) { window.Visuals.setArch(S.arch); document.querySelectorAll('.prow').forEach(function (row, i) { window.Visuals.bind(row, P.projects[i]); }); }
    observeReveals();
    layoutAll();
    requestAnimationFrame(onScroll);
  }

  function setView(v) {
    if (v === view) return;
    view = v;
    try { localStorage.setItem('ss-view', v); var u = new URL(location.href); u.searchParams.set('view', v); history.replaceState(null, '', u); } catch (e) {}
    renderSeg();
    renderView();
  }

  var io = null;
  function observeReveals() {
    if (!('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('in'); }); return; }
    if (!io) io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.reveal:not(.in)').forEach(function (e) { io.observe(e); });
  }

  /* ---------- pinned experience ---------- */
  var expSec = $('experience'), expTrack = $('exp-track'), expShift = 0;
  function layoutExp() {
    expTrack.style.transform = 'none';
    expShift = Math.max(0, expTrack.scrollWidth - innerWidth);
    expSec.style.height = (innerHeight + expShift) + 'px';
  }
  function layoutAll() { layoutExp(); layoutGallery(); layoutGlobe(); }

  /* ---------- hero ---------- */
  var home = $('home'), portrait = $('portrait'), marquee = $('name-marquee'), sig = $('signature'), actions = $('hero-actions'), header = $('site-header');
  var mx = -999, my = -999, mr = 0, targetR = 0;
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
  function heroProgress() { return clamp(scrollY / Math.max(home.offsetHeight - innerHeight, 1), 0, 1); }

  function onScroll() {
    var p = heroProgress(), e = ease(clamp(p / 0.7, 0, 1));
    var vw = innerWidth, vh = innerHeight;
    var endW = Math.min(vw * (vw < 700 ? 0.8 : 0.336), 720);
    var endH = Math.min(vh * 0.58, endW * 1.05);
    var endB = vh * 0.2;
    var w = lerp(vw, endW, e), h = lerp(vh, endH, e), b = lerp(0, endB, e);
    portrait.style.width = w + 'px'; portrait.style.height = h + 'px'; portrait.style.bottom = b + 'px';
    portrait.style.borderRadius = (24 * e) + 'px';
    marquee.style.opacity = clamp((p - 0.12) / 0.3, 0, 1);
    sig.style.opacity = clamp((p - 0.72) / 0.18, 0, 1);
    actions.style.bottom = Math.max(28, b - actions.offsetHeight + 10) + 'px';
    document.querySelectorAll('.sticker').forEach(function (s) {
      var d = parseFloat(s.dataset.p) || 0;
      s.style.translate = '0 ' + (d * p * -4) + 'px';
      s.style.opacity = (1 - clamp(p / 0.45, 0, 1));
      s.style.animation = p > 0.01 ? 'none' : '';
    });

    header.classList.toggle('at-top', scrollY <= 40);
    $('scroll-progress').style.transform = 'scaleX(' + clamp(scrollY / Math.max(document.documentElement.scrollHeight - vh, 1), 0, 1) + ')';

    // pinned experience
    var top = expSec.offsetTop, pr = expShift > 0 ? clamp((scrollY - top) / expShift, 0, 1) : 0;
    expTrack.style.transform = 'translateX(' + (-pr * expShift) + 'px)';
    $('exp-arrow').firstElementChild.style.width = (pr * 100) + '%';

    // gallery drift
    if (galFigs.length) {
      var gs = $('gallery'), gtop = gs.offsetTop, c = scrollY + vh / 2;
      if (scrollY + vh > gtop && scrollY < gtop + gs.offsetHeight) {
        galFigs.forEach(function (f, i) { var d = gtop + f._y + f.offsetHeight / 2 - c; f.style.transform = 'translateY(' + (d * GP[i % GP.length]) + 'px)'; });
      }
    }
    spy(); moveGlobe();
  }

  portrait.addEventListener('pointermove', function (ev) {
    var r = portrait.getBoundingClientRect();
    mx = ev.clientX - r.left; my = ev.clientY - r.top; targetR = Math.max(130, Math.min(r.width, r.height) * 0.24);
    portrait.style.setProperty('--mx', mx + 'px'); portrait.style.setProperty('--my', my + 'px');
  });
  portrait.addEventListener('pointerleave', function () { targetR = 0; });
  (function loopR() { mr += (targetR - mr) * 0.14; portrait.style.setProperty('--mr', mr.toFixed(1) + 'px'); requestAnimationFrame(loopR); })();

  var cv = $('dots'), cx = cv.getContext('2d'), cw = 0, ch = 0, dpr = Math.min(devicePixelRatio || 1, 2), px = -999, py = -999;
  function sizeCanvas() { cw = cv.clientWidth; ch = cv.clientHeight; cv.width = cw * dpr; cv.height = ch * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  window.addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; });
  function drawDots() {
    cx.clearRect(0, 0, cw, ch);
    var gap = 38, p = heroProgress();
    cx.fillStyle = 'rgba(30,26,28,' + (0.2 + 0.1 * p) + ')';
    for (var y = gap / 2; y < ch; y += gap) for (var x = gap / 2; x < cw; x += gap) {
      var dx = x - px, dy = y - py, d = Math.sqrt(dx * dx + dy * dy), r = 1.4;
      if (d < 140) r += (1 - d / 140) * 2.4;
      cx.beginPath(); cx.arc(x, y, r, 0, 6.2832); cx.fill();
    }
    if (!reduce) requestAnimationFrame(drawDots);
  }

  function spy() {
    var cur = '', y = innerHeight * 0.35;
    document.querySelectorAll('#nav-links a').forEach(function (a) {
      var s = $(a.dataset.s); if (!s || s.hidden) return;
      var r = s.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) cur = a.dataset.s;
    });
    document.querySelectorAll('#nav-links a').forEach(function (a) { a.classList.toggle('active', a.dataset.s === cur); });
  }

  /* ---------- geodesic globe that travels between sections ---------- */
  var globe = document.createElement('canvas'); globe.id = 'globe'; document.body.appendChild(globe);
  var gx = globe.getContext('2d'), gv = [], ge = [], rotY = 0;
  (function buildIco() {
    var t = (1 + Math.sqrt(5)) / 2, v = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
    var f = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
    var norm = function (a) { var l = Math.hypot(a[0], a[1], a[2]); return [a[0] / l, a[1] / l, a[2] / l]; };
    v = v.map(norm);
    var cache = {}, mid = function (i, j) { var k = i < j ? i + '_' + j : j + '_' + i; if (cache[k] === undefined) { var a = v[i], b = v[j]; v.push(norm([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2])); cache[k] = v.length - 1; } return cache[k]; };
    var nf = [];
    f.forEach(function (tr) { var a = tr[0], b = tr[1], c = tr[2], ab = mid(a, b), bc = mid(b, c), ca = mid(c, a); nf.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]); });
    var seen = {};
    nf.forEach(function (tr) { for (var k = 0; k < 3; k++) { var i = tr[k], j = tr[(k + 1) % 3], key = i < j ? i + '_' + j : j + '_' + i; if (!seen[key]) { seen[key] = 1; ge.push([i, j]); } } });
    gv = v;
  })();
  function drawGlobe() {
    var s = globe.clientWidth || 200; if (globe.width !== s * dpr) { globe.width = s * dpr; globe.height = s * dpr; }
    gx.setTransform(dpr, 0, 0, dpr, 0, 0); gx.clearRect(0, 0, s, s);
    var R = s * 0.45, c = s / 2, ca = Math.cos(rotY), sa = Math.sin(rotY), tilt = 0.4, ct = Math.cos(tilt), st = Math.sin(tilt);
    var pts = gv.map(function (p) {
      var x = p[0] * ca + p[2] * sa, z = -p[0] * sa + p[2] * ca, y = p[1];
      var y2 = y * ct - z * st, z2 = y * st + z * ct;
      return [c + x * R, c + y2 * R, z2];
    });
    var g = gx.createRadialGradient(c, c, 0, c, c, R * 0.42);
    g.addColorStop(0, 'rgba(70,56,62,.7)'); g.addColorStop(1, 'rgba(70,56,62,0)');
    gx.fillStyle = g; gx.beginPath(); gx.arc(c, c, R * 0.42, 0, 6.2832); gx.fill();
    gx.lineWidth = 1.1;
    ge.forEach(function (e) {
      var a = pts[e[0]], b = pts[e[1]], z = (a[2] + b[2]) / 2;
      gx.strokeStyle = 'rgba(128,108,116,' + (0.22 + 0.5 * (z + 1) / 2) + ')';
      gx.beginPath(); gx.moveTo(a[0], a[1]); gx.lineTo(b[0], b[1]); gx.stroke();
    });
    pts.forEach(function (p) { gx.fillStyle = 'rgba(140,118,127,' + (0.35 + 0.6 * (p[2] + 1) / 2) + ')'; gx.beginPath(); gx.arc(p[0], p[1], 2.4 + p[2] * 0.8, 0, 6.2832); gx.fill(); });
    if (!reduce) { rotY += 0.005; requestAnimationFrame(drawGlobe); }
  }
  // starts on the right at Motivation, then zig-zags across the page as you scroll
  var gStart = 0, gEnd = 0, aX = 0, aY = 0;
  function layoutGlobe() {
    var first = null, last = $('contact');
    ['motivation', 'mindset', 'experience', 'highlights', 'interests', 'gallery', 'socials', 'contact'].some(function (id) { var el = $(id); if (el && !el.hidden) { first = el; return true; } });
    if (!first) return;
    gStart = first.getBoundingClientRect().top + scrollY;
    gEnd = last.getBoundingClientRect().bottom + scrollY;
    var tx = $('mot-text'), vw = innerWidth;
    if (tx && first.id === 'motivation') {   // the spot to the right of the Motivation text block
      var r = tx.getBoundingClientRect(), txt = tx.firstElementChild ? tx.firstElementChild.getBoundingClientRect() : r;
      var right = Math.min(r.right, vw * 0.7);
      aX = (right + (vw - 24)) / 2; aY = r.top + scrollY + Math.min(r.height * 0.3, 260);
    } else { aX = vw * 0.84; aY = gStart + innerHeight * 0.4; }
  }
  var tri = function (t) { var m = ((t % 2) + 2) % 2; return m < 1 ? m : 2 - m; }; // 0..1..0
  function moveGlobe() {
    if (!gStart || reduce) { globe.classList.remove('on'); return; }
    var vh = innerHeight, vw = innerWidth, sz = globe.clientWidth;
    globe.classList.toggle('on', aY - scrollY < vh + sz && scrollY < gEnd - vh * 0.6);
    var hold = aY - vh * 0.4, x, y;       // until then it sits beside the text like a picture, scrolling with the page
    if (scrollY <= hold) { x = aX; y = aY - scrollY; }
    else {                                 // then it drops and wanders across the page
      var d = (scrollY - hold) / vh;
      x = lerp(aX, vw * 0.08, tri(d * 0.8));
      y = vh * lerp(0.4, 0.78, tri(d * 1.1));
    }
    globe.style.transform = 'translate(' + (x - sz / 2).toFixed(1) + 'px,' + (y - sz / 2).toFixed(1) + 'px)';
  }


  /* ---------- Read more card ---------- */
  var pm = document.createElement('div'); pm.id = 'pmodal'; pm.hidden = true; document.body.appendChild(pm);
  function closeCard() { pm.hidden = true; document.body.classList.remove('lock'); }
  function openCard(key) {
    var p = S.projects[key], b = p.bullets[view] || p.bullets.all;
    pm.innerHTML = '<div class="pm-card" role="dialog" aria-modal="true"><button type="button" class="pm-x" aria-label="Close">×</button><h3>' + esc(p.title) + '</h3><p class="sub">' + esc(pick(p.subtitle, view)) + '</p>' +
      '<div class="ptags">' + p.stack.map(function (t) { return '<span class="ptag">' + esc(t) + '</span>'; }).join('') + '<span class="ptag yr">' + esc(p.year) + '</span></div>' +
      b.map(function (x) { return '<p class="pp">' + esc(x) + '</p>'; }).join('') +
      (p.repo ? '<a class="pbtn" href="' + esc(p.repo) + '" target="_blank" rel="noopener">View on GitHub <span aria-hidden="true">→</span></a>' : '') + '</div>';
    pm.hidden = false; document.body.classList.add('lock');
  }
  pm.addEventListener('click', function (e) { if (e.target === pm || e.target.closest('.pm-x')) closeCard(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCard(); });
  document.addEventListener('click', function (e) { var r = e.target.closest('.rm'); if (r) openCard(r.dataset.k); });

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-v]');
    if (b && b.closest('.seg')) { setView(b.dataset.v); return; }
    var a = e.target.closest('#nav-panel a'); if (a) $('nav-panel').classList.remove('open');
    var l = e.target.closest('#nav-links a');
    if (l) {
      var s = $(l.dataset.s);
      if (s) { e.preventDefault(); var y = s.getBoundingClientRect().top + scrollY + (l.dataset.s === 'experience' ? 0 : 0); window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); }
    }
  });
  $('nav-toggle').addEventListener('click', function () { $('nav-panel').classList.toggle('open'); });

  var toastT;
  function copyMail() {
    var done = function () {
      var t = $('toast'); t.textContent = 'Email copied'; t.classList.add('show');
      var big = $('contact-big'), old = 'LET’S CONNECT'; big.textContent = 'Email copied';
      clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); big.textContent = old; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(S.email).then(done, function () { location.href = 'mailto:' + S.email; });
    else location.href = 'mailto:' + S.email;
  }
  ['nav-mail', 'hero-mail', 'contact-mail'].forEach(function (id) { $(id).addEventListener('click', copyMail); });

  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); } }, { passive: true });
  window.addEventListener('resize', function () { sizeCanvas(); layoutAll(); onScroll(); });
  window.addEventListener('load', function () { layoutAll(); onScroll(); });

  /* ---------- init ---------- */
  renderStatic();
  renderSeg();
  renderView();
  sizeCanvas();
  drawDots();
  drawGlobe();
  onScroll();
  setTimeout(function () { layoutAll(); onScroll(); }, 600);
})();
