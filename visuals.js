/* Project visuals beside each project: Demo / Workflow / 3D.
   - Demo: your real screens (HerBalance phone, Obliviate and SystemOne and Syndicate on a monitor, SaralKanoon chat preview).
   - Workflow + 3D: animated diagrams built only from each project's README (SITE.arch in content.js, plus the two custom flows below).
   - TokenShield "Attack stopped": an animation of the README's flow (illustration, not a recording). */
(function () {
  'use strict';
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var ARCH = {};

  /* ============ DEMO: HerBalance phone (click-through on the real screens) ============ */
  var HB_DIM = { 1: [795, 1600], 2: [799, 1599], 3: [792, 1600], 4: [809, 1600], 5: [800, 1600], 6: [793, 1600], 7: [794, 1600], 8: [805, 1600], 9: [791, 1600], 10: [788, 1600] };
  var HB_HOT = {
    1: [[290, 1195, 350, 1260, 2, 'Google'], [440, 1195, 510, 1260, 3, 'Phone'], [62, 955, 733, 1062, 4, 'Login']],
    2: [[82, 899, 720, 1007, 4, 'Continue with Google'], [285, 1175, 360, 1240, 1, 'Email'], [445, 1175, 510, 1240, 3, 'Phone']],
    3: [[290, 1175, 350, 1240, 2, 'Google'], [435, 1175, 510, 1240, 1, 'Email'], [62, 936, 730, 1043, 4, 'Login']],
    4: [[706, 22, 770, 90, 10, 'Profile'], [63, 900, 388, 997, 5, 'Log Period'], [420, 900, 745, 997, 7, 'Symptoms'], [63, 1021, 388, 1117, 8, 'Calendar'], [420, 1021, 745, 1117, 9, 'AI Insights']],
    5: [[39, 73, 117, 151, 4, 'Back'], [683, 73, 761, 151, 10, 'Profile'], [39, 1446, 760, 1558, 6, 'Add Details']],
    6: [[0, 0, 793, 780, 5, 'Close'], [46, 1457, 747, 1565, 8, 'Confirm and Save']],
    7: [[30, 30, 95, 95, 4, 'Back'], [693, 28, 756, 92, 10, 'Profile'], [62, 1455, 732, 1562, 4, 'Continue']],
    8: [[39, 72, 118, 151, 4, 'Back'], [687, 72, 766, 151, 10, 'Profile'], [274, 1453, 530, 1566, 5, 'Log Today']],
    9: [[39, 84, 116, 161, 4, 'Back'], [676, 84, 752, 161, 10, 'Profile']],
    10: [[60, 30, 115, 85, 4, 'Back'], [62, 1021, 727, 1128, 1, 'Logout']]
  };
  function hotBtn(h, d) {
    return '<button type="button" class="hs" data-go="' + h[4] + '" aria-label="' + esc(h[5]) + '" style="left:' + (h[0] / d[0] * 100) + '%;top:' + (h[1] / d[1] * 100) + '%;width:' + ((h[2] - h[0]) / d[0] * 100) + '%;height:' + ((h[3] - h[1]) / d[1] * 100) + '%"></button>';
  }
  function phone() {
    var shots = '';
    for (var i = 1; i <= 10; i++) {
      shots += '<div class="ph-screen' + (i === 4 ? ' on' : '') + '" data-s="' + i + '"><img src="assets/hb/s' + i + '.jpg" alt="HerBalance screen ' + i + '" loading="lazy">' + HB_HOT[i].map(function (h) { return hotBtn(h, HB_DIM[i]); }).join('') + '</div>';
    }
    return '<div class="phone-wrap"><div class="phone" data-demo="phone">' + shots + '</div><p class="pcap hint">Tap around: the app screens are real</p></div>';
  }

  /* ============ DEMO: monitors ============ */
  function monitor(inner, cap) {
    return '<div class="mon"><div class="mon-bezel"><div class="mon-screen">' + inner + '</div></div><div class="mon-neck"></div><div class="mon-base"></div></div>' + (cap ? '<p class="pcap hint">' + esc(cap) + '</p>' : '');
  }
  // Obliviate: your real screenshots. Hotspots in original pixels of the uncropped screenshot (x, y after cropping `top`).
  var OB = {
    landing: { top: 84, w: 1900, h: 882 - 0, hot: [[30, 100, 125, 134, 'overview', 'Overview'], [175, 100, 255, 134, 'overview', 'Console'], [30, 134, 110, 158, 'audit', 'Audit'], [1688, 925, 1754, 954, 'delete', 'Unlearn'], [1754, 925, 1822, 954, 'audit', 'Audit Log']] },
    overview: { top: 86, w: 1900, h: 856, hot: [[60, 140, 165, 166, 'landing', 'Obliviate'], [1038, 372, 1194, 422, 'delete', 'Delete and Unlearn'], [1243, 372, 1331, 422, 'audit', 'Audit Log']] },
    delete: { top: 60, w: 1900, h: 851, hot: [[558, 176, 645, 226, 'overview', 'Overview'], [1243, 176, 1331, 226, 'audit', 'Audit Log']] },
    audit: { top: 68, w: 1900, h: 866, hot: [[558, 184, 645, 234, 'overview', 'Overview'], [1038, 184, 1194, 234, 'delete', 'Delete and Unlearn']] }
  };
  function obliviate() {
    var h = '';
    Object.keys(OB).forEach(function (k) {
      var o = OB[k];
      h += '<img class="ms' + (k === 'landing' ? ' on' : '') + '" data-s="' + k + '" src="assets/ob/' + k + '.jpg" alt="Obliviate ' + k + '" loading="lazy">';
    });
    var hs = '';
    Object.keys(OB).forEach(function (k) {
      var o = OB[k];
      hs += '<div class="ms-hot" data-s="' + k + '" style="display:' + (k === 'landing' ? 'block' : 'none') + '">' + o.hot.map(function (x) {
        var y1 = x[1] - o.top, y2 = x[3] - o.top;
        return '<button type="button" class="hs' + (k === 'landing' ? ' pulse' : '') + '" data-goo="' + x[4] + '" aria-label="' + esc(x[5]) + '" style="left:' + (x[0] / o.w * 100) + '%;top:' + (y1 / o.h * 100) + '%;width:' + ((x[2] - x[0]) / o.w * 100) + '%;height:' + ((y2 - y1) / o.h * 100) + '%"></button>';
      }).join('') + '</div>';
    });
    var vid = '<video class="hero-vid" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/24f3c998-86fb-4f1d-9906-07c7fa740f8a.mp4" muted loop playsinline preload="auto" data-autoplay></video>';
    return monitor(h + vid + hs, 'Click the real dashboard: Console, Unlearn, Audit Log and the tabs');
  }
  function video(src, cap, poster) {
    return monitor('<video src="' + src + '"' + (poster ? ' poster="' + poster + '"' : '') + ' muted loop playsinline preload="none" data-autoplay></video>', cap);
  }


  /* ============ Maithili: research-paper look (all text from the project's README) ============ */
  function paper() {
    var box = function (x, y, w, t) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="34" fill="none" stroke="#222" stroke-width="1"/><text x="' + (x + w / 2) + '" y="' + (y + 21) + '" text-anchor="middle" font-size="11" font-family="Times New Roman,serif">' + t + '</text>'; };
    var ar = function (x1, y1, x2, y2) { return '<path d="M' + x1 + ',' + y1 + ' L' + x2 + ',' + y2 + '" stroke="#222" stroke-width="1" marker-end="url(#pa)"/>'; };
    var fig = '<svg viewBox="0 0 520 130" role="img" aria-label="Pipeline"><defs><marker id="pa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#222"/></marker></defs>' +
      box(4, 8, 108, 'Sentiment140') + ar(112, 25, 140, 25) + box(140, 8, 108, 'Google Translate') + ar(248, 25, 276, 25) + box(276, 8, 240, '2,967 Maithili sentences') +
      ar(396, 42, 396, 62) + box(276, 62, 240, 'Few-shot: 10 to 100 examples') + ar(396, 96, 396, 106) + '' +
      '<text x="396" y="124" text-anchor="middle" font-size="11" font-family="Times New Roman,serif">MuRIL  ·  IndicBERT v2  ·  three seeds</text></svg>';
    return '<div class="paper"><div class="pk">Companion code for the paper</div><h4>Maithili Few-Shot Sentiment</h4><div class="au">Shristi Sinha</div>' +
      '<p class="ab"><b>Abstract.</b> We test whether multilingual models can learn Maithili sentiment from 10 to 100 labelled examples, comparing MuRIL (no Maithili in pre-training) with IndicBERT v2 (Maithili included). The dataset is 2,967 sentences translated from Sentiment140 into Maithili with Google Translate, with three seeds per setting, a matched-schedule baseline ablation and qualitative error analysis.</p>' +
      '<p class="kw"><b>Keywords:</b> Maithili, few-shot learning, sentiment classification, low-resource language, MuRIL, IndicBERT v2</p><hr>' +
      '<table><thead><tr><th>Model</th><th>Maithili in pre-training</th><th>100 examples</th></tr></thead><tbody>' +
      '<tr><td>IndicBERT v2</td><td>Yes</td><td>66.5%, no collapsed runs</td></tr><tr><td>MuRIL</td><td>No</td><td>62.1% ± 10.6, seed collapse</td></tr></tbody></table>' +
      '<p class="cp"><b>Table 1.</b> IndicBERT v2 reaches 80.6% on the full set.</p><figure>' + fig + '<p class="cp"><b>Fig. 1.</b> Data and experiment pipeline.</p></figure></div>';
  }

  /* ============ DEMO: SaralKanoon chat preview ============ */
  function saral() {
    return '<div class="chat"><div class="chat-head"><b>SaralKanoon</b><small>Indian-law assistant</small></div>' +
      '<div class="chat-langs"><span>हिन्दी</span><span>தமிழ்</span><span>বাংলা</span><span>తెలుగు</span><span class="on">English</span></div>' +
      '<div class="chat-body"><div class="bubble bot">Ask a question about Indian law in Hindi, Tamil, Bengali, Telugu or English.</div></div>' +
      '<div class="chat-input"><span>Type your question…</span><i>Send</i></div></div><p class="pcap hint">Interface preview. The live demo is offline.</p>';
  }

  /* ============ FLOWS ============ */
  var NW = 150, GX = 38, GY = 40;
  function wrapText(s, max, maxLines) {
    var w = String(s || '').split(' '), lines = [], cur = '';
    w.forEach(function (x) { var t = cur ? cur + ' ' + x : x; if (t.length > max && cur) { lines.push(cur); cur = x; } else cur = t; });
    if (cur) lines.push(cur);
    if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] += '…'; }
    return lines;
  }
  function prepNodes(nodes) {
    var H = 70;
    nodes.forEach(function (n) { n.tl = wrapText(n.t, 14, 2); n.dl = wrapText(n.d, 22, 5); H = Math.max(H, 22 + n.tl.length * 22 + (n.dl.length ? 4 + n.dl.length * 14.5 : 0) + 14); });
    return Math.ceil(H);
  }
  function genericFlow(arr) {
    var n = arr.length, cols = n <= 3 ? n : (n === 4 ? 2 : 3);
    var nodes = arr.map(function (a, i) {
      var r = Math.floor(i / cols), c = i % cols; if (r % 2) c = cols - 1 - c;
      return { id: i, t: a[0], d: a[1], r: r, c: c };
    });
    var edges = [], seq = [];
    for (var i = 0; i < n - 1; i++) { edges.push([i, i + 1]); seq.push({ a: i, b: i + 1 }); }
    return { nodes: nodes, edges: edges, seq: seq, cols: cols };
  }
  var CUSTOM = {
    saralkanoon: function () {
      var N = [
        { id: 'd', t: '6 legal documents', d: '200+ pages, incl. the Consumer Protection and RTI Acts', r: 0, c: 0 },
        { id: 'e', t: 'Extract and chunk', d: '1000-character chunks with 200 overlap', r: 0, c: 1 },
        { id: 'm', t: 'Ollama embeddings', d: 'nomic-embed-text', r: 0, c: 2 },
        { id: 'q', t: 'Qdrant Cloud', d: 'Vector storage', r: 1, c: 2 },
        { id: 'u', t: 'Chat UI', d: 'HTML, CSS, JavaScript, async Fetch', r: 2.25, c: 0 },
        { id: 'w', t: 'n8n webhook', d: 'API backend', r: 2.25, c: 1 },
        { id: 'g', t: 'n8n AI agent', d: 'Groq, Llama 3.3 70B', r: 2.25, c: 2 },
        { id: 'r', t: 'Plain-language answer', d: 'Hindi, Tamil, Bengali, Telugu or English', r: 3.25, c: 1 }
      ];
      return {
        nodes: N, lanes: [{ t: 'Once: build the knowledge base', r: 0, dy: -16, c: 0 }, { t: 'Every question', r: 2.25, dy: -16, c: 0 }],
        edges: [['d', 'e'], ['e', 'm'], ['m', 'q'], ['u', 'w'], ['w', 'g'], ['q', 'g', 'dash'], ['g', 'r'], ['r', 'u']],
        seq: [{ a: 'd', b: 'e' }, { a: 'e', b: 'm' }, { a: 'm', b: 'q' }, { a: 'u', b: 'w' }, { a: 'w', b: 'g' }, { a: 'q', b: 'g' }, { a: 'g', b: 'r' }, { a: 'r', b: 'u' }]
      };
    },
    tokenshield: function () {
      var N = [
        { id: 'd1', t: 'Untrusted text', d: 'README, log or web page with a planted instruction', r: 0, c: 0 },
        { id: 'p', t: 'Plain agent', d: 'Reads the raw text', r: 0, c: 1, tag: '' },
        { id: 'd2', t: 'Untrusted text', d: 'The same document', r: 1.3, c: 0 },
        { id: 'qm', t: 'Quarantined model', d: 'Cheap model. Returns only typed, bounded fields', r: 1.3, c: 1 },
        { id: 'sc', t: 'Typed-fact check', d: 'Schema check, fail-closed', r: 1.3, c: 2 },
        { id: 'bl', t: '[TS-BLOCKED]', d: 'The instruction never leaves', r: 2.3, c: 1 },
        { id: 'mm', t: 'Main model', d: 'Sees validated facts, never raw text', r: 2.3, c: 2 }
      ];
      return {
        nodes: N, lanes: [{ t: 'Without a shield', r: 0, dy: -16, c: 0 }, { t: 'With TokenShield', r: 1.3, dy: -16, c: 0 }],
        edges: [['d1', 'p'], ['d2', 'qm'], ['qm', 'sc'], ['sc', 'bl'], ['sc', 'mm']],
        seq: [
          { a: 'd1', b: 'p', color: '#d6334f', state: 'bad', tag: 'hijacked' },
          { a: 'd2', b: 'qm' }, { a: 'qm', b: 'sc' },
          [{ a: 'sc', b: 'bl', color: '#d6334f', state: 'blocked', tag: 'blocked' }, { a: 'sc', b: 'mm', state: 'ok', tag: 'safe' }]
        ]
      };
    }
  };
  var FLOWS = {};
  function getFlow(key) {
    if (FLOWS[key]) return FLOWS[key];
    var F = CUSTOM[key] ? CUSTOM[key]() : (ARCH[key] ? genericFlow(ARCH[key]) : null);
    if (!F) return null;
    var idx = {}; F.nodes.forEach(function (n, i) { idx[n.id] = n; n.i = i; });
    F.H = prepNodes(F.nodes);
    var maxC = 0, maxR = 0;
    F.nodes.forEach(function (n) { n.x = 16 + n.c * (NW + GX); n.y = 30 + n.r * (F.H + GY); n.w = NW; n.h = F.H; maxC = Math.max(maxC, n.c); maxR = Math.max(maxR, n.r); });
    F.W = 32 + (maxC + 1) * NW + maxC * GX; F.VH = 60 + maxR * (F.H + GY) + F.H;
    F.idx = idx;
    FLOWS[key] = F; return F;
  }
  function edgePath(A, B) {
    var ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2, dx = bx - ax, dy = by - ay, x1, y1, x2, y2, c;
    if (Math.abs(dy) > Math.abs(dx) * 0.55 && Math.abs(dx) < NW * 0.75) { // vertical-ish
      x1 = ax; x2 = bx; y1 = dy > 0 ? A.y + A.h : A.y; y2 = dy > 0 ? B.y : B.y + B.h; c = (y1 + y2) / 2;
      return 'M' + x1 + ',' + y1 + ' C' + x1 + ',' + c + ' ' + x2 + ',' + c + ' ' + x2 + ',' + y2;
    }
    if (Math.abs(dx) >= NW * 0.75) { x1 = dx > 0 ? A.x + A.w : A.x; x2 = dx > 0 ? B.x : B.x + B.w; y1 = ay; y2 = by; c = (x1 + x2) / 2; return 'M' + x1 + ',' + y1 + ' C' + c + ',' + y1 + ' ' + c + ',' + y2 + ' ' + x2 + ',' + y2; }
    x1 = ax; x2 = bx; y1 = dy > 0 ? A.y + A.h : A.y; y2 = dy > 0 ? B.y : B.y + B.h; c = (y1 + y2) / 2;
    return 'M' + x1 + ',' + y1 + ' C' + x1 + ',' + c + ' ' + x2 + ',' + c + ' ' + x2 + ',' + y2;
  }
  var uid = 0;
  function flowHTML(key) {
    var F = getFlow(key); if (!F) return '';
    var id = 'fl' + (++uid);
    var s = '<svg viewBox="0 0 ' + F.W + ' ' + F.VH + '" role="img" aria-label="Workflow"><defs><marker id="' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#c78ea3"/></marker></defs>';
    (F.lanes || []).forEach(function (l) { s += '<text class="fl-lane" x="' + (16 + l.c * (NW + GX)) + '" y="' + (30 + l.r * (F.H + GY) + l.dy) + '">' + esc(l.t) + '</text>'; });
    F.edges.forEach(function (e, k) { s += '<path class="fl-edge' + (e[2] ? ' dash' : '') + '" data-e="' + e[0] + '>' + e[1] + '" d="' + edgePath(F.idx[e[0]], F.idx[e[1]]) + '" marker-end="url(#' + id + ')"/>'; });
    F.nodes.forEach(function (n, k) {
      var y = 22;
      s += '<g class="fl-node" data-n="' + n.id + '" transform="translate(' + n.x + ',' + n.y + ')"><rect class="card" width="' + n.w + '" height="' + n.h + '" rx="14"/>' +
        '<circle class="port" cx="0" cy="' + n.h / 2 + '" r="4.5"/><circle class="port" cx="' + n.w + '" cy="' + n.h / 2 + '" r="4.5"/>' +
        '<circle class="nb" cx="18" cy="18" r="9"/><text class="nn" x="18" y="21.8">' + (k + 1) + '</text>' +
        '<text class="tag" x="' + (n.w - 12) + '" y="21"></text>';
      y = 32 + 12;
      n.tl.forEach(function (l) { s += '<text class="t" x="14" y="' + (y += 0) + '" dy="0">' + esc(l) + '</text>'; y += 22; });
      y += -6;
      n.dl.forEach(function (l) { s += '<text class="d" x="14" y="' + y + '">' + esc(l) + '</text>'; y += 14.5; });
      s += '</g>';
    });
    s += '<circle class="fl-pk" r="6" cx="-20" cy="-20" fill="#bd4a74" opacity="0"/></svg>';
    return '<div class="flow" data-key="' + key + '">' + s + '</div>';
  }
  // Fix title baseline: titles begin at y=44 (below the badge row); recompute simply by CSS-free offsets above.

  function Anim(root, key) {
    var F = getFlow(key), svg = root.querySelector('svg'), pk = svg.querySelector('.fl-pk');
    var nodeEl = {}, edgeEl = {};
    svg.querySelectorAll('.fl-node').forEach(function (g) { nodeEl[g.dataset.n] = g; });
    svg.querySelectorAll('.fl-edge').forEach(function (p) { edgeEl[p.dataset.e] = p; });
    var STEP = 1000, HOLD = 2200, steps = F.seq.map(function (x) { return Array.isArray(x) ? x : [x]; });
    var total = steps.length * STEP + HOLD, t0 = performance.now(), run = false, last = -1, extra = [];
    function reset() {
      Object.keys(nodeEl).forEach(function (k) { nodeEl[k].setAttribute('class', 'fl-node'); nodeEl[k].querySelector('.tag').textContent = ''; });
      Object.keys(edgeEl).forEach(function (k) { edgeEl[k].classList.remove('hot'); });
      extra.forEach(function (c) { c.remove(); }); extra = [];
      pk.setAttribute('opacity', 0);
    }
    function lit(id, state, tag) {
      var g = nodeEl[id]; if (!g) return;
      g.setAttribute('class', 'fl-node ' + (state || 'lit'));
      if (tag) { var t = g.querySelector('.tag'); t.textContent = tag; t.setAttribute('fill', state === 'ok' ? '#2f8f63' : '#d6334f'); }
    }
    function frame(now) {
      if (!run) return;
      var t = Math.max(0, now - t0) % total, si = Math.floor(t / STEP), f = Math.min(1, (t - si * STEP) / (STEP * 0.78));
      if (si >= steps.length) { pk.setAttribute('opacity', 0); requestAnimationFrame(frame); return; }
      if (si < last) { reset(); last = -1; }
      // light everything for steps before si; lit first source
      if (last === -1) { lit(steps[0][0].a); }
      for (var k = Math.max(last, 0); k < si; k++) steps[k].forEach(function (s) { edgeEl[s.a + '>' + s.b].classList.add('hot'); lit(s.b, s.state, s.tag); });
      last = Math.max(last, si);
      // moving packet(s): first of the group on the main packet, extras as clones
      var group = steps[si];
      while (extra.length < group.length - 1) { var c = pk.cloneNode(true); svg.appendChild(c); extra.push(c); }
      group.forEach(function (s, gi) {
        var el = edgeEl[s.a + '>' + s.b], len = el.getTotalLength(), p = el.getPointAtLength(len * f), dot = gi === 0 ? pk : extra[gi - 1];
        dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); dot.setAttribute('fill', s.color || '#bd4a74'); dot.setAttribute('opacity', f >= 1 ? 0 : 1);
        el.classList.add('hot');
        if (f >= 1) lit(s.b, s.state, s.tag);
      });
      requestAnimationFrame(frame);
    }
    reset();
    return {
      start: function () { if (run) return; run = true; t0 = performance.now(); last = -1; reset(); requestAnimationFrame(frame); },
      stop: function () { run = false; },
      restart: function () { t0 = performance.now(); last = -1; reset(); if (!run) { run = true; requestAnimationFrame(frame); } }
    };
  }

  /* ============ 3D: the same flow as floating cards ============ */
  function rrShape(w, h, r) {
    var T = THREE, s = new T.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
  }
  function paintLabel(c, n, k) {
    var x = c.getContext('2d'), S = 3;
    x.clearRect(0, 0, c.width, c.height);
    x.fillStyle = '#ffffff'; x.beginPath(); x.roundRect(0, 0, c.width, c.height, 14 * S); x.fill();
    x.strokeStyle = '#efcdd8'; x.lineWidth = 3 * S; x.stroke();
    x.fillStyle = '#bd4a74'; x.beginPath(); x.arc(18 * S, 18 * S, 9 * S, 0, 6.3); x.fill();
    x.fillStyle = '#fff'; x.font = '600 ' + 10.5 * S + 'px "Instrument Sans", sans-serif'; x.textAlign = 'center'; x.fillText(String(k + 1), 18 * S, 21.8 * S); x.textAlign = 'left';
    var y = 44;
    x.fillStyle = '#1a1517'; x.font = '400 ' + 19 * S + 'px "Instrument Serif", serif';
    n.tl.forEach(function (l) { x.fillText(l, 14 * S, y * S); y += 22; });
    y -= 6; x.fillStyle = '#6a5c61'; x.font = '400 ' + 11.5 * S + 'px "Instrument Sans", sans-serif';
    n.dl.forEach(function (l) { x.fillText(l, 14 * S, y * S); y += 14.5; });
  }
  function start3D(el, key) {
    if (el._t) { el._t.visible = true; size3(el._t); return; }
    var F = getFlow(key); if (!F) return;
    if (!window.THREE) { el.innerHTML = '<p class="pcap">3D view needs WebGL.</p>'; return; }
    var T = THREE, w = el.clientWidth, h = el.clientHeight; if (!w || !h) return;
    var renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { el.innerHTML = '<p class="pcap">3D view needs WebGL.</p>'; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); renderer.setSize(w, h); renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    var scene = new T.Scene(), cam = new T.PerspectiveCamera(34, w / h, 0.1, 200), group = new T.Group(); scene.add(group);
    scene.add(new T.AmbientLight(0xffffff, 0.85)); var dl = new T.DirectionalLight(0xffffff, 0.7); dl.position.set(3, 5, 6); scene.add(dl);
    var U = 0.0125, cx = F.W / 2, cy = F.VH / 2, N = F.nodes.length, depth = 0.1, cards = {}, pos = {};
    var ready = (document.fonts && document.fonts.ready) || Promise.resolve();
    F.nodes.forEach(function (n, i) {
      var wx = (n.x + n.w / 2 - cx) * U, wy = -(n.y + n.h / 2 - cy) * U, wz = (i - (N - 1) / 2) * 0.32;
      pos[n.id] = new T.Vector3(wx, wy, wz);
      var cw = n.w * U, ch = n.h * U;
      var body = new T.Mesh(new T.ExtrudeGeometry(rrShape(cw, ch, 0.16), { depth: depth, bevelEnabled: false }), new T.MeshStandardMaterial({ color: 0xf4b6c9, roughness: 0.6 }));
      body.geometry.translate(0, 0, -depth / 2);
      var c = document.createElement('canvas'); c.width = n.w * 3; c.height = n.h * 3; paintLabel(c, n, i);
      var tex = new T.CanvasTexture(c); tex.anisotropy = 4;
      var face = new T.Mesh(new T.PlaneGeometry(cw * 0.985, ch * 0.985), new T.MeshBasicMaterial({ map: tex, transparent: true })); face.position.z = depth / 2 + 0.003;
      var back = new T.Mesh(new T.PlaneGeometry(cw * 0.985, ch * 0.985), new T.MeshBasicMaterial({ color: 0xfdeef3 })); back.position.z = -depth / 2 - 0.003; back.rotation.y = Math.PI;
      var halo = new T.Mesh(new T.PlaneGeometry(cw * 1.14, ch * 1.2), new T.MeshBasicMaterial({ color: 0xbd4a74, transparent: true, opacity: 0, depthWrite: false })); halo.position.z = -depth / 2 - 0.02;
      var g = new T.Group(); g.add(body, face, back, halo); g.position.copy(pos[n.id]); group.add(g);
      cards[n.id] = { g: g, tex: tex, c: c, n: n, i: i, halo: halo };
    });
    ready.then(function () { Object.keys(cards).forEach(function (k) { var q = cards[k]; paintLabel(q.c, q.n, q.i); q.tex.needsUpdate = true; }); });
    var tubes = [], parts = [];
    F.edges.forEach(function (e) {
      var A = pos[e[0]], B = pos[e[1]], mid = A.clone().add(B).multiplyScalar(0.5); mid.z += 0.35;
      var cw = F.idx[e[0]].w * U / 2, ch = F.idx[e[0]].h * U / 2, dx = B.x - A.x, dy = B.y - A.y;
      var a = A.clone(), b = B.clone();
      if (Math.abs(dy) > Math.abs(dx) * 0.55 && Math.abs(dx) < NW * U * 0.75) { a.y += dy > 0 ? ch : -ch; b.y -= dy > 0 ? ch : -ch; } else { a.x += dx > 0 ? cw : -cw; b.x -= dx > 0 ? cw : -cw; }
      var curve = new T.CatmullRomCurve3([a, mid, b]);
      group.add(new T.Mesh(new T.TubeGeometry(curve, 40, 0.014, 8, false), new T.MeshBasicMaterial({ color: e[2] ? 0xdcb7c4 : 0xbd4a74 })));
      var cone = new T.Mesh(new T.ConeGeometry(0.055, 0.14, 12), new T.MeshBasicMaterial({ color: 0xbd4a74 })); cone.position.copy(b);
      var tan = curve.getTangent(1); cone.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), tan); cone.position.addScaledVector(tan, -0.05); group.add(cone);
      for (var k = 0; k < 2; k++) { var s = new T.Mesh(new T.SphereGeometry(0.05, 12, 12), new T.MeshBasicMaterial({ color: 0xbd4a74 })); group.add(s); parts.push({ s: s, c: curve, o: k / 2 }); }
    });
    var grid = new T.GridHelper(Math.max(F.W, F.VH) * U * 1.7, 22, 0xd9aebd, 0xe9cdd6); grid.position.y = -F.VH * U / 2 - 0.5; grid.material.transparent = true; grid.material.opacity = 0.55; group.add(grid);
    var st = { r: renderer, scene: scene, cam: cam, group: group, el: el, F: F, U: U, drag: false, dx: 0, dy: 0, visible: true, t0: performance.now() };
    el._t = st;
    var down = null, cv = renderer.domElement;
    cv.addEventListener('pointerdown', function (e) { st.drag = true; down = [e.clientX, e.clientY, st.dy, st.dx]; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', function (e) { if (!st.drag) return; st.dy = down[2] + (e.clientX - down[0]) * 0.008; st.dx = Math.max(-0.7, Math.min(0.7, down[3] + (e.clientY - down[1]) * 0.005)); });
    var up = function () { st.drag = false; }; cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    size3(st);
    (function loop() {
      if (!document.body.contains(el)) { renderer.dispose(); return; }
      if (st.visible) {
        var t = (performance.now() - st.t0) / 1000;
        if (!st.drag) { st.dy *= 0.985; st.dx *= 0.985; }
        group.rotation.y = Math.sin(t * 0.4) * 0.5 + st.dy; group.rotation.x = 0.16 + st.dx;
        parts.forEach(function (p) { p.s.position.copy(p.c.getPoint((t * 0.22 + p.o) % 1)); });
        var act = Math.floor(t / 1.1) % (N + 2);
        Object.keys(cards).forEach(function (k) { var q = cards[k]; q.halo.material.opacity += ((q.i <= act ? 0.32 : 0) - q.halo.material.opacity) * 0.1; });
        renderer.render(scene, cam);
      }
      requestAnimationFrame(loop);
    })();
  }
  function size3(st) {
    var w = st.el.clientWidth, h = st.el.clientHeight; if (!w || !h) return;
    st.r.setSize(w, h); st.cam.aspect = w / h;
    var halfW = st.F.W * st.U / 2 + 0.3, halfH = st.F.VH * st.U / 2 + 0.3, tan = Math.tan(st.cam.fov * Math.PI / 360);
    var dist = Math.max(halfH / tan, halfW / (tan * st.cam.aspect)) * 0.7 + 0.4;
    st.cam.position.set(0, 0.35, dist); st.cam.lookAt(0, 0, 0); st.cam.updateProjectionMatrix();
  }


  /* ============ n8n-style canvas (SaralKanoon). Ingestion = your real workflow; Chat = from the README ============ */
  var IC = {
    trigger: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')" fill="none" stroke="#2b2b30" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 9 L13 31 L19 25 L24 36 L28 34 L23 24 L31 24 Z"/><path d="M9 5 A18 18 0 0 1 35 5" stroke-dasharray="3 4" opacity=".6"/></g>'; },
    disk: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')" fill="none" stroke="#1fa971" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14 V4 M8 8 l4 -4 l4 4 M28 6 V16 M24 12 l4 4 l4 -4"/><rect x="4" y="22" width="32" height="13" rx="3.5"/><circle cx="29" cy="28.5" r="1.4" fill="#1fa971"/></g>'; },
    extract: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')" fill="none" stroke="#25263a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 6 H9 a3 3 0 0 0 -3 3 V31 a3 3 0 0 0 3 3 H22"/><path d="M16 20 H35 M29 14 l6 6 l-6 6"/></g>'; },
    qdrant: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')"><path d="M20 2 L36 11 V29 L20 38 L4 29 V11 Z" fill="#dc244c"/><path d="M20 10 L29 15 V25 L20 30 L11 25 V15 Z" fill="#fff" opacity=".92"/><path d="M20 15 L24.5 17.5 V22.5 L20 25 L15.5 22.5 V17.5 Z" fill="#dc244c"/></g>'; },
    ollama: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')" fill="none" stroke="#2b2b30" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17 V6 a3 3 0 0 1 6 0 V12 M29 17 V6 a3 3 0 0 0 -6 0 V12"/><path d="M11 17 a9 9 0 0 1 18 0 V27 a9 9 0 0 1 -18 0 Z"/><ellipse cx="20" cy="25" rx="4.5" ry="3.2"/><circle cx="16" cy="19" r="1" fill="#2b2b30"/><circle cx="24" cy="19" r="1" fill="#2b2b30"/></g>'; },
    loader: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')" fill="none" stroke="#555" stroke-width="2.2" stroke-linecap="round"><path d="M20 3 L35 11.5 V28.5 L20 37 L5 28.5 V11.5 Z"/><path d="M20 12 V28 M13 16 L27 24 M27 16 L13 24"/></g>'; },
    webhook: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')" fill="none" stroke="#7c5cf0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="29" r="5"/><circle cx="27" cy="29" r="5"/><circle cx="20" cy="9" r="5"/><path d="M20 14 L13 24 M18 29 H22 M25 24 L20 15"/></g>'; },
    agent: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')" fill="none" stroke="#2b2b30" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="13" width="28" height="20" rx="6"/><path d="M20 13 V6 M16 6 H24"/><circle cx="14.5" cy="23" r="2" fill="#2b2b30"/><circle cx="25.5" cy="23" r="2" fill="#2b2b30"/><path d="M15 29 H25"/></g>'; },
    groq: function (x, y) { return '<g transform="translate(' + (x - 20) + ',' + (y - 20) + ')"><circle cx="20" cy="20" r="15" fill="#f55036"/><text x="20" y="27" text-anchor="middle" font-family="Instrument Sans,sans-serif" font-weight="700" font-size="21" fill="#fff">g</text></g>'; }
  };
  var N8N = {
    ingest: {
      title: 'SaralKanoon - Ingestion', vb: [660, 330],
      nodes: [
        { id: 't', x: 30, y: 50, k: 'sq', ic: 'trigger', t: 'When clicking ‘Execute workflow’', s: '', bolt: true, lines: ['When clicking', '‘Execute workflow’'] },
        { id: 'r', x: 150, y: 50, k: 'sq', ic: 'disk', t: 'Read/Write Files from Disk', s: 'Read File(s) From Disk', lines: ['Read/Write Files', 'from Disk'] },
        { id: 'x', x: 270, y: 50, k: 'sq', ic: 'extract', t: 'Extract from File', s: 'Extract From PDF', lines: ['Extract from File'] },
        { id: 'q', x: 400, y: 50, k: 'wide', w: 190, ic: 'qdrant', lines: ['Qdrant Vector', 'Store'] },
        { id: 'e', x: 422, y: 245, k: 'circ', ic: 'ollama', lines: ['Embeddings Ollama'] },
        { id: 'l', x: 572, y: 245, k: 'circ', ic: 'loader', lines: ['Default Data Loader'] }
      ],
      edges: [['t', 'r'], ['r', 'x'], ['x', 'q'], ['e', 'q', 'sub', 'Embedding', 440], ['l', 'q', 'sub', 'Document', 505]],
      seq: [['t'], ['r'], ['x'], ['e', 'l'], ['q']]
    },
    chat: {
      title: 'SaralKanoon - Chat', vb: [660, 330],
      nodes: [
        { id: 'w', x: 40, y: 50, k: 'sq', ic: 'webhook', lines: ['Webhook'], s: 'From the chat UI' },
        { id: 'a', x: 190, y: 50, k: 'wide', w: 190, ic: 'agent', lines: ['AI', 'Agent'] },
        { id: 'g', x: 200, y: 245, k: 'circ', ic: 'groq', lines: ['Groq Chat Model'], s: 'Llama 3.3 70B' },
        { id: 'v', x: 350, y: 245, k: 'circ', ic: 'qdrant', lines: ['Qdrant Vector Store'], s: 'Legal documents' }
      ],
      edges: [['w', 'a'], ['g', 'a', 'sub', 'Chat Model', 240], ['v', 'a', 'sub', 'Tool', 320]],
      seq: [['w'], ['g', 'v'], ['a']]
    }
  };
  function n8nSVG(key) {
    var W = N8N[key], by = {}, s = '<svg viewBox="0 0 ' + W.vb[0] + ' ' + W.vb[1] + '" role="img" aria-label="n8n workflow">';
    W.nodes.forEach(function (n) { by[n.id] = n; n.cx = n.k === 'wide' ? n.x + n.w / 2 : (n.k === 'circ' ? n.x : n.x + 38); n.cy = n.k === 'circ' ? n.y : n.y + 38; });
    W.edges.forEach(function (e, i) {
      var a = by[e[0]], b = by[e[1]], d;
      if (e[2] === 'sub') { var px = e[4], py = b.y + 76; d = 'M' + a.x + ',' + (a.y - 34) + ' C' + a.x + ',' + (a.y - 80) + ' ' + px + ',' + (py + 50) + ' ' + px + ',' + py; s += '<path class="ln sub" data-e="' + e[0] + '>' + e[1] + '" d="' + d + '"/><rect class="dia" x="' + (px - 6) + '" y="' + (py - 6) + '" width="12" height="12" transform="rotate(45 ' + px + ' ' + py + ')"/><text class="pl" x="' + (px) + '" y="' + (py + 22) + '">' + e[3] + '</text><rect class="dia" x="' + (a.x - 6) + '" y="' + (a.y - 40) + '" width="12" height="12" transform="rotate(45 ' + a.x + ' ' + (a.y - 34) + ')"/>'; }
      else { var x1 = a.x + (a.k === 'wide' ? a.w : 76) + 4, x2 = b.x - 4, y = a.y + 38; s += '<path class="ln" data-e="' + e[0] + '>' + e[1] + '" d="M' + x1 + ',' + y + ' L' + (x2 - 8) + ',' + y + '"/><path d="M' + (x2 - 9) + ',' + (y - 5) + ' L' + x2 + ',' + y + ' L' + (x2 - 9) + ',' + (y + 5) + ' Z" fill="#b9b9c0"/>'; }
    });
    W.nodes.forEach(function (n) {
      var g = '<g class="nd" data-n="' + n.id + '">';
      if (n.k === 'circ') {
        g += '<circle class="sq" cx="' + n.x + '" cy="' + n.y + '" r="34"/>' + IC[n.ic](n.x, n.y) + '<circle class="ck" cx="' + (n.x + 26) + '" cy="' + (n.y + 24) + '" r="8" fill="#1fa971"/><path class="ck" d="M' + (n.x + 22) + ',' + (n.y + 24) + ' l3,3 l5,-6" stroke="#fff" stroke-width="2" fill="none"/>';
        n.lines.forEach(function (l, i) { g += '<text class="tt" x="' + n.x + '" y="' + (n.y + 56 + i * 15) + '">' + l + '</text>'; });
        if (n.s) g += '<text class="ss" x="' + n.x + '" y="' + (n.y + 56 + n.lines.length * 15) + '">' + n.s + '</text>';
      } else if (n.k === 'wide') {
        g += '<rect class="sq" x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="76" rx="16"/>' + IC[n.ic](n.x + 38, n.y + 38) + '<text class="tt" style="text-anchor:start;font-size:14.5px" x="' + (n.x + 68) + '" y="' + (n.y + 34) + '">' + n.lines[0] + '</text><text class="tt" style="text-anchor:start;font-size:14.5px" x="' + (n.x + 68) + '" y="' + (n.y + 52) + '">' + n.lines[1] + '</text>' +
          '<circle class="ck" cx="' + (n.x + n.w - 8) + '" cy="' + (n.y + 8) + '" r="9" fill="#1fa971"/><path class="ck" d="M' + (n.x + n.w - 12) + ',' + (n.y + 8) + ' l3,3 l5,-6" stroke="#fff" stroke-width="2" fill="none"/>';
      } else {
        g += '<rect class="sq" x="' + n.x + '" y="' + n.y + '" width="76" height="76" rx="16"/>' + IC[n.ic](n.x + 38, n.y + 38) + '<circle class="ck" cx="' + (n.x + 72) + '" cy="' + (n.y + 4) + '" r="9" fill="#1fa971"/><path class="ck" d="M' + (n.x + 68) + ',' + (n.y + 4) + ' l3,3 l5,-6" stroke="#fff" stroke-width="2" fill="none"/>';
        if (n.bolt) g += '<path d="M' + (n.x - 12) + ',' + (n.y + 28) + ' l-5,10 h5 l-3,10 l9,-13 h-5 l3,-7 z" fill="#ff6d5a"/>';
        n.lines.forEach(function (l, i) { g += '<text class="tt" x="' + (n.x + 38) + '" y="' + (n.y + 98 + i * 15) + '">' + l + '</text>'; });
        if (n.s) g += '<text class="ss" x="' + (n.x + 38) + '" y="' + (n.y + 98 + n.lines.length * 15 + 1) + '">' + n.s + '</text>';
      }
      s += g + '</g>';
    });
    return s + '</svg>';
  }
  function n8nHTML() {
    return '<div class="n8n" data-w="ingest"><div class="n8n-bar"><b>Personal / SaralKanoon</b><span class="n8n-sw"><button type="button" class="on" data-w="ingest">Ingestion</button><button type="button" data-w="chat">Chat</button></span><button type="button" class="ex">Execute workflow</button></div><div class="n8n-cv" data-w="ingest">' + n8nSVG('ingest') + '</div><div class="n8n-cv" data-w="chat" style="display:none">' + n8nSVG('chat') + '</div></div><p class="pcap hint">Ingestion is your real n8n workflow. The Chat flow is drawn from the README.</p>';
  }
  function N8Ctl(root) {
    var cur = 'ingest', t0 = performance.now(), run = false, STEP = 950, HOLD = 2600;
    function cv() { return root.querySelector('.n8n-cv[data-w="' + cur + '"]'); }
    function frame(now) {
      if (!run) return;
      var W = N8N[cur], c = cv(), seq = W.seq, total = seq.length * STEP + HOLD, t = Math.max(0, now - t0) % total;
      var st = {}; seq.forEach(function (ids, i) { var d = t - i * STEP; ids.forEach(function (id) { st[id] = d < 0 ? '' : (d < 520 ? 'run' : 'done'); }); });
      c.querySelectorAll('.nd').forEach(function (g) { var v = st[g.dataset.n] || ''; g.setAttribute('class', 'nd' + (v ? ' ' + v : '')); });
      c.querySelectorAll('.ln').forEach(function (p) { var b = p.dataset.e.split('>')[1], a = p.dataset.e.split('>')[0]; p.setAttribute('class', 'ln' + (p.classList.contains('sub') ? ' sub' : '') + (st[b] && st[a] === 'done' || st[b] === 'done' ? ' on' : '')); });
      requestAnimationFrame(frame);
    }
    root.querySelectorAll('.n8n-sw button').forEach(function (b) { b.addEventListener('click', function () { cur = b.dataset.w; root.querySelectorAll('.n8n-sw button').forEach(function (x) { x.classList.toggle('on', x === b); }); root.querySelectorAll('.n8n-cv').forEach(function (x) { x.style.display = x.dataset.w === cur ? 'block' : 'none'; }); t0 = performance.now(); }); });
    root.querySelector('.ex').addEventListener('click', function () { t0 = performance.now(); if (!run) { run = true; requestAnimationFrame(frame); } });
    return { start: function () { if (run) return; run = true; t0 = performance.now(); requestAnimationFrame(frame); }, stop: function () { run = false; }, restart: function () { t0 = performance.now(); } };
  }

  /* ============ Story animations (canvas): Redrob ranking, FCCL compression, ML Unwrapped from scratch ============
     Everything shown comes from each project's README; profiles/points are illustrations, not real data. */
  var K = { ink: '#1a1517', acc: '#bd4a74', pink: '#f4b6c9', tint: '#f7e2e8', mute: '#55484d', dim: '#7b6d72', line: '#e4d4d9', red: '#d33f49', ok: '#2f8f5b', teal: '#2f9aa8', amber: '#e0912f', vio: '#6d5bd0', blue: '#4a7fd1' };
  var cl = function (x, a, b) { return Math.min(b, Math.max(a, x)); };
  var seg = function (t, a, b) { return cl((t - a) / (b - a), 0, 1); };
  var ez = function (x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };
  var lp = function (a, b, x) { return a + (b - a) * x; };
  var FB = '"Inter","Helvetica Neue",Arial,sans-serif';
  function txt(c, s, x, y, size, col, al, w) { c.font = (w || 400) + ' ' + size + 'px ' + FB; c.fillStyle = col; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(s, x, y); }
  function rr(c, x, y, w, h, r, fill, stroke, lw) { c.beginPath(); c.roundRect(x, y, w, h, r); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.lineWidth = lw || 1.5; c.strokeStyle = stroke; c.stroke(); } }
  function cap(c, t, list) { var s = list[0][1]; list.forEach(function (x) { if (t >= x[0]) s = x[1]; }); txt(c, s, 400, 28, 16, K.ink, 'center', 600); }

  /* --- Redrob: scoring and ranking --- */
  var RW = [40, 25, 20, 10, 5], RN = ['Career history', 'Skills', 'Behaviour', 'Experience', 'Profile'], RC = ['#bd4a74', '#e0912f', '#2f9aa8', '#6d5bd0', '#4c9a5b'];
  var RD = [[.92, .8, .7, .9, .8], [.55, .9, .85, .7, .9], [.8, .6, .5, .8, .7], [.3, .95, .9, .6, .9], [.7, .75, .8, .6, .5], [.95, .2, .3, .9, .4], [.45, .5, .4, .5, .6], [.9, 1, .9, .8, .9]];
  var RL = ['Profile A', 'Profile B', 'Profile C', 'Profile D', 'Profile E', 'Profile F', 'Profile G', 'Profile H'];
  var RT = RD.map(function (d) { return d.reduce(function (s, f, i) { return s + f * RW[i]; }, 0); });
  var RINIT = [3, 6, 1, 7, 5, 0, 4, 2], RS0 = [], RS1 = [], RS2 = [];
  (function () {
    RINIT.forEach(function (idx, slot) { RS0[idx] = slot; });
    var ord = RD.map(function (_, i) { return i; }).sort(function (a, b) { return RT[b] - RT[a]; });
    ord.forEach(function (idx, slot) { RS1[idx] = slot; });
    RD.forEach(function (_, i) { RS2[i] = RS1[i] - (RS1[i] > RS1[7] ? 1 : 0); });
  })();
  function drawRanking(c, t) {
    cap(c, t, [[0, '100,000 candidate profiles, CPU only'], [1.5, 'Five weighted dimensions'], [6.6, 'Career-fit gate on the final score'], [7.8, 'Sorted by score'], [9.2, 'Honeypot detection flags an impossible profile'], [11.6, 'Top 100 go to submission.csv']]);
    var lw = -110;
    RN.forEach(function (n, i) {
      var on = t > 1.5 && t < 6.6 && Math.floor(t - 1.5) === i; c.font = '500 11px ' + FB; var w = c.measureText(n + ' ' + RW[i] + '%').width + 32;
      rr(c, 150 + lw, 46, w, 22, 11, on ? RC[i] : '#fff', on ? RC[i] : K.line, 1.2);
      c.fillStyle = on ? '#fff' : RC[i]; c.beginPath(); c.arc(150 + lw + 11, 57, 3.5, 0, 6.3); if (!on) c.fill();
      txt(c, n + ' ' + RW[i] + '%', 150 + lw + 20, 57.5, 11, on ? '#fff' : K.mute, 'left', 500); lw += w + 8;
    });
    var rh = 44, y0 = 96, bw = 4.1;
    for (var i = 0; i < 8; i++) {
      var slot = lp(lp(RS0[i], RS1[i], ez(seg(t, 7.8, 9.2))), RS2[i], ez(seg(t, 10.5, 11.4)));
      var a = seg(t, .1 + i * .12, .6 + i * .12) * (i === 7 ? 1 - seg(t, 10.3, 10.9) : 1);
      if (a <= 0) continue;
      var y = y0 + slot * rh, hp = i === 7 && t > 9.2 && t < 10.9;
      c.globalAlpha = a;
      rr(c, 30, y, 740, rh - 6, 10, '#fff', hp ? K.red : K.line, hp ? 2 : 1);
      txt(c, RL[i], 46, y + (rh - 6) / 2, 13, K.ink, 'left', 600);
      var x = 150;
      for (var d = 0; d < 5; d++) {
        var f = ez(seg(t, 1.5 + d, 2.5 + d)), w = RD[i][d] * RW[d] * bw * f;
        if (w > 0) { rr(c, x, y + 10, w, rh - 26, 3, RC[d]); x += w; }
      }
      if (t > 6.6) { var sc = RT[i] * ez(seg(t, 6.6, 7.8)); txt(c, sc.toFixed(1), 600, y + (rh - 6) / 2, 14, K.ink, 'right', 700); }
      if (hp) { rr(c, 616, y + 6, 146, 26, 13, K.red); txt(c, 'Honeypot', 689, y + 19.5, 12, '#fff', 'center', 700); }
      else if (t > 11.6) { var rk = RS2[i] + 1; rr(c, 700, y + 6, 62, 26, 13, rk <= 3 ? [K.amber, K.teal, K.vio][rk - 1] : K.tint); txt(c, '#' + rk, 731, y + 19.5, 12, rk <= 3 ? '#fff' : K.acc, 'center', 700); }
      c.globalAlpha = 1;
    }
    if (t > 6.6 && t < 7.9) { var g = Math.sin(seg(t, 6.6, 7.9) * Math.PI); c.setLineDash([5, 5]); c.strokeStyle = K.amber; c.globalAlpha = g; c.lineWidth = 2; c.beginPath(); c.moveTo(620, 90); c.lineTo(620, 452); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; txt(c, 'Career-fit gate', 620, 462, 12, K.amber, 'center', 700); }
    var b = seg(t, 12, 12.6); if (b > 0) { c.globalAlpha = b; txt(c, '100,000 candidates ranked in under 40 seconds, CPU only', 400, 478, 15, K.teal, 'center', 700); c.globalAlpha = 1; }
  }

  /* --- FCCL: compress, guard, retry --- */
  var FW = [200, 215, 180, 210, 150, 205, 190, 170, 212, 140, 200, 120], FDROP = [1, 4, 7, 10];
  function docLines(c, x, y, a, tt, mode) {
    for (var i = 0; i < 12; i++) {
      var dr = FDROP.indexOf(i) >= 0, f = mode === 'drop' && dr ? tt : 0;
      c.globalAlpha = a * (1 - f * .75);
      rr(c, x, y + i * 19, FW[i] * (1 - f * .35), 8, 4, f > 0 ? '#f2c47f' : '#b9c8e6');
    }
    c.globalAlpha = 1;
  }
  function drawFccl(c, t) {
    cap(c, t, [[0, 'Context + question'], [1.3, 'The layer decides when and how hard to compress'], [2.8, 'Compression model: LLMLingua-2'], [4.4, 'Guard: falls back to the original text if needed'], [5.8, 'The model says "unknown"'], [6.2, 'Retry net: re-ask with the original'], [8, 'Answered'], [8.9, 'What real data showed (SQuAD, DREAM, MultiWOZ)']]);
    var a0 = seg(t, 0, 1);
    c.globalAlpha = a0; rr(c, 30, 70, 240, 270, 14, '#fff', K.line); txt(c, 'Context', 46, 90, 13, K.dim, 'left', 600); c.globalAlpha = 1;
    var tt = ez(seg(t, 2.8, 3.8)), show = t < 3.9 ? 1 : (t > 6.2 && t < 7.2 ? 1 : 0.35);
    docLines(c, 46, 104, a0 * (t < 3.9 || t > 6.2 ? 1 : .35), t < 6.2 ? tt : 0, t < 6.2 ? 'drop' : '');
    rr(c, 30, 355, 240, 44, 12, '#fff', K.line); txt(c, 'Question', 46, 369, 12, K.dim, 'left', 600); rr(c, 46, 380, 150, 8, 4, K.blue);
    function packet(x, y, n, col, al) { c.globalAlpha = al; for (var i = 0; i < n; i++) rr(c, x - 22, y - n * 4.5 + i * 9, 44, 6, 3, col); c.globalAlpha = 1; }
    if (t > 3.6 && t < 4.4) { packet(lp(270, 405, ez(seg(t, 3.6, 4.4))), 225, 8, K.teal, 1); }
    if (t >= 4.4 && t < 5.8) { packet(lp(405, 675, ez(seg(t, 4.6, 5.8))), 225, 8, K.teal, 1 - seg(t, 5.6, 5.8)); }
    var hl = t > 1.3 && t < 5.4;
    rr(c, 330, 150, 150, 150, 16, hl ? '#dff1f3' : '#fff', hl ? K.teal : K.line, hl ? 2.5 : 1.5);
    txt(c, 'Compression', 405, 188, 15, K.ink, 'center', 700); txt(c, 'layer', 405, 208, 15, K.ink, 'center', 700);
    txt(c, 'LLMLingua-2', 405, 236, 12, K.mute, 'center');
    var gd = t > 4.4 && t < 5.8; rr(c, 360, 262, 90, 24, 12, gd ? K.ok : '#fff', gd ? K.ok : K.line); txt(c, gd ? 'Guard ✓' : 'Guard', 405, 274.5, 12, gd ? '#fff' : K.dim, 'center', 700);
    var ans = t > 5.6;
    rr(c, 580, 150, 190, 150, 16, ans ? '#ece9fb' : '#fff', ans ? K.vio : K.line, ans ? 2.5 : 1.5); txt(c, 'Answerer LLM', 675, 188, 15, K.ink, 'center', 700);
    if (ans && t < 8) { rr(c, 615, 225, 120, 36, 18, t > 5.8 ? K.red : '#fff'); txt(c, 'unknown', 675, 243.5, 15, '#fff', 'center', 700); }
    if (t >= 8) { rr(c, 615, 225, 120, 36, 18, K.ok); txt(c, 'answer ✓', 675, 243.5, 15, '#fff', 'center', 700); }
    c.strokeStyle = K.line; c.lineWidth = 2; c.beginPath(); c.moveTo(270, 225); c.lineTo(330, 225); c.moveTo(480, 225); c.lineTo(580, 225); c.stroke();
    if (t > 6.2 && t < 8) {
      var u = ez(seg(t, 6.4, 7.8)), px = u < .8 ? lp(150, 675, u / .8) : 675, py = u < .8 ? 440 : lp(440, 275, (u - .8) / .2);
      c.strokeStyle = K.red; c.setLineDash([6, 6]); c.lineWidth = 2; c.beginPath(); c.moveTo(150, 440); c.lineTo(675, 440); c.lineTo(675, 300); c.stroke(); c.setLineDash([]);
      packet(px, py, 12, K.red, seg(t, 6.2, 6.6)); txt(c, 'original text', 412, 458, 12, K.red, 'center', 600);
    }
    var g = [[0.8, 'little or no loss', K.ok], [0.6, 'about 8 points', K.amber], [0.45, '18 to 23 points', K.red]];
    g.forEach(function (r, i) { var a = seg(t, 9 + i * .7, 9.6 + i * .7); if (a <= 0) return; c.globalAlpha = a; rr(c, 30 + i * 250, 420, 240, 46, 12, '#fff', K.line); rr(c, 30 + i * 250, 424, 5, 38, 2.5, r[2]); txt(c, 'Keep ' + r[0], 46 + i * 250, 436, 13, r[2], 'left', 700); txt(c, r[1], 46 + i * 250, 454, 13, K.mute, 'left'); c.globalAlpha = 1; });
    var f = seg(t, 11.3, 12); if (f > 0) { c.globalAlpha = f; rr(c, 300, 322, 470, 38, 19, K.vio); txt(c, '200 fresh questions: retry net lost about 1 point at 67% of tokens', 535, 341.5, 14, '#fff', 'center', 700); c.globalAlpha = 1; }
  }

  /* --- ML Unwrapped: algorithms built from scratch (tiny real implementations run live) --- */
  var MLS = (function () {
    var s = 7, r = function () { s = (s * 16807) % 2147483647; return s / 2147483647; }, g = function () { return (r() + r() + r() - 1.5) * 1.15; };
    var cluster = function (cx, cy, sd, n, k) { var o = []; for (var i = 0; i < n; i++) o.push({ x: cl(cx + g() * sd, .03, .97), y: cl(cy + g() * sd, .03, .97), k: k }); return o; };
    var lin = []; for (var i = 0; i < 28; i++) { var x = .05 + .9 * r(); lin.push({ x: x, y: cl(.15 + .65 * x + g() * .1, .02, .98) }); }
    var C2 = cluster(.3, .35, .16, 24, 0).concat(cluster(.7, .65, .16, 24, 1));
    var C3 = cluster(.22, .72, .14, 18, 0).concat(cluster(.5, .25, .14, 18, 1), cluster(.78, .7, .14, 18, 2));
    var NB = cluster(.3, .62, .2, 26, 0).concat(cluster(.68, .4, .2, 26, 1));
    // linear regression by gradient descent: path of (w,b)
    var lpth = [], w = 0, b = 0; for (i = 0; i < 60; i++) { var gw = 0, gb = 0; lin.forEach(function (p) { var e = w * p.x + b - p.y; gw += e * p.x; gb += e; }); w -= 1.2 * gw / lin.length; b -= 1.2 * gb / lin.length; lpth.push([w, b]); }
    // softmax regression path: weights K x 3
    function soft(D, Kc, steps, lr) {
      var W = []; for (var k = 0; k < Kc; k++) W.push([0, 0, 0]); var path = [];
      for (var st = 0; st < steps; st++) {
        var G = []; for (k = 0; k < Kc; k++) G.push([0, 0, 0]);
        D.forEach(function (p) { var z = W.map(function (v) { return Math.exp(v[0] * p.x + v[1] * p.y + v[2]); }), sm = z.reduce(function (a, q) { return a + q; }, 0); for (var k = 0; k < Kc; k++) { var e = z[k] / sm - (p.k === k ? 1 : 0); G[k][0] += e * p.x; G[k][1] += e * p.y; G[k][2] += e; } });
        for (k = 0; k < Kc; k++) for (var j = 0; j < 3; j++) W[k][j] -= lr * G[k][j] / D.length;
        path.push(W.map(function (v) { return v.slice(); }));
      } return path;
    }
    // decision tree (gini), breadth-first splits to depth 3
    function tree(D) {
      var out = [], q = [{ d: D, r: [0, 0, 1, 1], dep: 0 }], gini = function (d) { var c = {}; d.forEach(function (p) { c[p.k] = (c[p.k] || 0) + 1; }); var s = 1; for (var k in c) s -= Math.pow(c[k] / d.length, 2); return s; };
      while (q.length) {
        var n = q.shift(); if (n.dep >= 3 || n.d.length < 4 || gini(n.d) < .05) { n.leaf = true; out.push({ leaf: true, r: n.r, d: n.d }); continue; }
        var best = null; ['x', 'y'].forEach(function (ax) { n.d.forEach(function (p) { var L = n.d.filter(function (z) { return z[ax] <= p[ax]; }), R = n.d.filter(function (z) { return z[ax] > p[ax]; }); if (L.length < 2 || R.length < 2) return; var sc = (L.length * gini(L) + R.length * gini(R)) / n.d.length; if (!best || sc < best.sc) best = { sc: sc, ax: ax, th: p[ax], L: L, R: R }; }); });
        if (!best) { out.push({ leaf: true, r: n.r, d: n.d }); continue; }
        out.push({ ax: best.ax, th: best.th, r: n.r });
        var r0 = n.r, lr_ = best.ax === 'x' ? [r0[0], r0[1], best.th, r0[3]] : [r0[0], r0[1], r0[2], best.th], rr_ = best.ax === 'x' ? [best.th, r0[1], r0[2], r0[3]] : [r0[0], best.th, r0[2], r0[3]];
        q.push({ d: best.L, r: lr_, dep: n.dep + 1 }, { d: best.R, r: rr_, dep: n.dep + 1 });
      } return out;
    }
    return { lin: lin, C2: C2, C3: C3, NB: NB, lpth: lpth, s2: soft(C2, 2, 60, 6), s3: soft(C3, 3, 60, 6), tr: tree(C3) };
  })();
  var MLN = ['Linear regression', 'Logistic regression', 'Softmax regression', 'Naive Bayes', 'KNN', 'Decision trees'], MCOL = [K.acc, K.teal, K.amber], ACOL = [K.acc, K.teal, K.vio, K.amber, K.blue, K.ok];
  var MREG = ['#f4d6e0', '#d3ecef', '#fbe8c9'];
  var PX = 290, PY = 70, PW = 480, PH = 360, MOB = false;
  function mlLayout(m) { MOB = m; if (m) { PX = 20; PY = 230; PW = 460; PH = 330; } else { PX = 290; PY = 70; PW = 480; PH = 360; } }
  function mlItem(i) { return MOB ? [20 + (i % 2) * 240, 62 + Math.floor(i / 2) * 46, 220, 38] : [30, 84 + i * 44, 230, 36]; }
  function mx(x) { return PX + x * PW; } function my(y) { return PY + (1 - y) * PH; }
  function dots(c, D, col3, al) { D.forEach(function (p) { c.globalAlpha = al; c.beginPath(); c.arc(mx(p.x), my(p.y), 5, 0, 6.3); c.fillStyle = col3 ? MCOL[p.k] : K.acc; c.fill(); c.lineWidth = 1.5; c.strokeStyle = '#fff'; c.stroke(); }); c.globalAlpha = 1; }
  function regions(c, W, Kc) {
    var nx = 32, ny = 24; for (var i = 0; i < nx; i++) for (var j = 0; j < ny; j++) {
      var x = (i + .5) / nx, y = (j + .5) / ny, bk = 0, bv = -1e9; W.forEach(function (v, k) { var z = v[0] * x + v[1] * y + v[2]; if (z > bv) { bv = z; bk = k; } });
      c.fillStyle = MREG[bk]; c.fillRect(Math.floor(mx(i / nx)), Math.floor(my((j + 1) / ny)), Math.ceil(PW / nx) + 1, Math.ceil(PH / ny) + 1);
    } c.globalAlpha = 1;
  }
  function drawMl(c, t) {
    var cod = 'import numpy as np   # NumPy only', n = Math.floor(cod.length * ez(seg(t, .2, 1.8)));
    c.font = '500 15px "SFMono-Regular",Consolas,monospace'; c.fillStyle = K.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(cod.slice(0, n) + (t < 2.2 && Math.floor(t * 3) % 2 ? '▍' : ''), 30, 30);
    var cur = t < 2 ? -1 : Math.min(5, Math.floor((t - 2) / 4)), out = t > 26;
    MLN.forEach(function (nm, i) {
      var q = mlItem(i), x = q[0], y = q[1], vis = t > 1.8 + i * .2, done = out || i < cur, on = i === cur && !out;
      if (!vis) return;
      rr(c, x, y, q[2], q[3], 10, '#fff', on ? ACOL[i] : K.line, on ? 2.5 : 1); if (on) rr(c, x, y + 6, 5, q[3] - 12, 2.5, ACOL[i]);
      txt(c, nm, x + 16, y + q[3] / 2 + .5, MOB ? 15 : 13.5, on ? ACOL[i] : (done ? K.ink : K.dim), 'left', on ? 700 : 500);
      if (done) txt(c, '✓', x + q[2] - 14, y + q[3] / 2 + .5, 14, K.ok, 'right', 700);
    });
    rr(c, PX, PY, PW, PH, 14, '#fff', K.line, 1.5);
    if (t >= 2 && !out) {
      var k = (t - 2) / 4 - cur, u = seg(k, .12, .82), i = cur;
      c.save(); c.beginPath(); c.roundRect(PX, PY, PW, PH, 14); c.clip();
      if (i === 0) {
        var s = Math.floor(ez(u) * 59), p = MLS.lpth[s]; dots(c, MLS.lin, false, 1);
        c.strokeStyle = K.vio; c.lineWidth = 3.5; c.beginPath(); c.moveTo(mx(0), my(p[1])); c.lineTo(mx(1), my(p[0] + p[1])); c.stroke();
      } else if (i === 1 || i === 2) {
        var P = i === 1 ? MLS.s2 : MLS.s3, W = P[Math.floor(ez(u) * 59)]; regions(c, W, W.length); dots(c, i === 1 ? MLS.C2 : MLS.C3, true, 1);
      } else if (i === 3) {
        dots(c, MLS.NB, true, 1); var sc = ez(seg(k, .1, .5));
        [0, 1].forEach(function (cls) {
          var D = MLS.NB.filter(function (p) { return p.k === cls; }), m = [0, 0], v = [0, 0]; D.forEach(function (p) { m[0] += p.x / D.length; m[1] += p.y / D.length; }); D.forEach(function (p) { v[0] += Math.pow(p.x - m[0], 2) / D.length; v[1] += Math.pow(p.y - m[1], 2) / D.length; });
          c.beginPath(); c.ellipse(mx(m[0]), my(m[1]), Math.sqrt(v[0]) * 2 * PW * sc, Math.sqrt(v[1]) * 2 * PH * sc, 0, 0, 6.3); c.strokeStyle = MCOL[cls]; c.lineWidth = 2.5; c.stroke(); c.globalAlpha = .1; c.fillStyle = MCOL[cls]; c.fill(); c.globalAlpha = 1;
        });
        if (k > .55) { var qx = .5, qy = .5, ll = [0, 1].map(function (cls) { var D = MLS.NB.filter(function (p) { return p.k === cls; }), m = [0, 0], v = [0, 0], s = 0; D.forEach(function (p) { m[0] += p.x / D.length; m[1] += p.y / D.length; }); D.forEach(function (p) { v[0] += Math.pow(p.x - m[0], 2) / D.length; v[1] += Math.pow(p.y - m[1], 2) / D.length; }); return -Math.pow(qx - m[0], 2) / (2 * v[0]) - Math.pow(qy - m[1], 2) / (2 * v[1]) - .5 * Math.log(v[0] * v[1]); }); var w2 = ll[1] > ll[0] ? 1 : 0, pu = 1 + .25 * Math.sin(t * 6); c.beginPath(); c.arc(mx(qx), my(qy), 9 * pu, 0, 6.3); c.fillStyle = MCOL[w2]; c.fill(); c.lineWidth = 3; c.strokeStyle = '#fff'; c.stroke(); }
      } else if (i === 4) {
        var ang = ez(u) * 6.3, qx2 = .5 + .3 * Math.cos(ang), qy2 = .5 + .22 * Math.sin(ang), D = MLS.NB.slice().sort(function (a, b) { return Math.hypot(a.x - qx2, a.y - qy2) - Math.hypot(b.x - qx2, b.y - qy2); }).slice(0, 5), vote = D.reduce(function (s, p) { return s + p.k; }, 0) > 2 ? 1 : 0;
        dots(c, MLS.NB, true, .55); D.forEach(function (p) { c.beginPath(); c.moveTo(mx(qx2), my(qy2)); c.lineTo(mx(p.x), my(p.y)); c.strokeStyle = K.vio; c.lineWidth = 1.5; c.stroke(); }); dots(c, D, true, 1);
        c.beginPath(); c.arc(mx(qx2), my(qy2), 9, 0, 6.3); c.fillStyle = MCOL[vote]; c.fill(); c.lineWidth = 3; c.strokeStyle = '#fff'; c.stroke();
      } else {
        var T = MLS.tr, nsp = T.filter(function (z) { return !z.leaf; }), shown = Math.ceil(ez(u) * nsp.length);
        if (u > .85) T.forEach(function (z) { if (!z.leaf) return; var cnt = {}, bk = 0, bc = -1; z.d.forEach(function (p) { cnt[p.k] = (cnt[p.k] || 0) + 1; if (cnt[p.k] > bc) { bc = cnt[p.k]; bk = p.k; } }); c.globalAlpha = seg(u, .85, 1); c.fillStyle = MREG[bk]; c.fillRect(mx(z.r[0]), my(z.r[3]), (z.r[2] - z.r[0]) * PW, (z.r[3] - z.r[1]) * PH); c.globalAlpha = 1; });
        dots(c, MLS.C3, true, 1); c.strokeStyle = K.vio; c.lineWidth = 3;
        nsp.slice(0, shown).forEach(function (z) { c.beginPath(); if (z.ax === 'x') { c.moveTo(mx(z.th), my(z.r[1])); c.lineTo(mx(z.th), my(z.r[3])); } else { c.moveTo(mx(z.r[0]), my(z.th)); c.lineTo(mx(z.r[2]), my(z.th)); } c.stroke(); });
      }
      c.restore();
    }
    if (out) {
      var a = seg(t, 26, 27); c.globalAlpha = a;
      [['97.4%', 'Breast Cancer Wisconsin'], ['96.7%', 'Iris']].forEach(function (r, j) { var y = PY + 50 + j * (PH * .3); txt(c, r[0], PX + PW / 2, y, 52, [K.acc, K.teal][j], 'center', 700); txt(c, r[1], PX + PW / 2, y + 40, 16, K.mute, 'center', 500); });
      rr(c, PX + 60, PY + PH - 80, PW - 120, 40, 20, '#ece9fb'); txt(c, 'Public 30-day series · 36 commits so far', PX + PW / 2, PY + PH - 59.5, 14, K.vio, 'center', 700); c.globalAlpha = 1;
    }
    if (!out && t >= 2) { var nm = MLN[cur]; txt(c, nm + ', from scratch with NumPy', PX + PW / 2, PY + PH + 22, 15, K.ink, 'center', 600); }
  }

  var SCN = { ranking: [drawRanking, 15], fccl: [drawFccl, 13.5], mlscratch: [drawMl, 29] };
  function sceneHTML(key, hint) { return '<canvas class="scn" data-k="' + key + '" width="1600" height="1000" aria-label="Animation"></canvas><p class="pcap hint">' + hint + '</p>'; }
  function Scene(cv, key) {
    var c = cv.getContext('2d'), D = SCN[key], t0 = 0, raf = 0, run = false, sel = -1, LW = 800, LH = 500, mob = key === 'mlscratch' && window.innerWidth < 600;
    if (mob) { LW = 500; LH = 640; cv.width = 1000; cv.height = 1280; cv.style.aspectRatio = '500 / 640'; }
    function draw(t) { if (key === 'mlscratch') mlLayout(mob); c.setTransform(cv.width / LW, 0, 0, cv.width / LW, 0, 0); c.clearRect(0, 0, LW, LH); c.fillStyle = '#fff'; c.fillRect(0, 0, LW, LH); try { D[0](c, t); } catch (e) { } }
    function frame(now) {
      if (!run) return; var t = Math.max(0, now - t0) / 1000;
      if (sel >= 0) t = 2 + sel * 4 + (t % 4);          // picked an algorithm: keep looping just that one
      else if (t > D[1]) { t0 = now; t = 0; }
      draw(t); raf = requestAnimationFrame(frame);
    }
    function hit(e) { if (key !== 'mlscratch') return -1; mlLayout(mob); var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * LW, y = (e.clientY - r.top) / r.height * LH; for (var i = 0; i < 6; i++) { var q = mlItem(i); if (x >= q[0] && x <= q[0] + q[2] && y >= q[1] && y <= q[1] + q[3]) return i; } return -1; }
    cv.addEventListener('pointermove', function (e) { cv.style.cursor = hit(e) >= 0 ? 'pointer' : ''; });
    return {
      start: function () { if (run) return; run = true; t0 = performance.now(); raf = requestAnimationFrame(frame); },
      stop: function () { run = false; cancelAnimationFrame(raf); },
      restart: function () { sel = -1; t0 = performance.now(); },
      click: function (e) { var i = hit(e); if (i >= 0) { sel = i; t0 = performance.now(); } else { sel = -1; t0 = performance.now(); } },
      draw: draw
    };
  }

  /* ============ panes ============ */
  var DEMOS = {
    pcod: { label: 'Demo', html: phone },
    obliviate: { label: 'Demo', html: obliviate, wide: true },
    systemone: { label: 'Demo', html: function () { return video('assets/systemone-simulator.mp4', 'Recording of the simulator: a harmless first message, then a switch, with and without the gateway'); }, wide: true },
    syndicate: { label: 'Demo', html: function () { return video('assets/media/syndicate-ui.mp4', 'Syndicate interface (work in progress): recording'); }, wide: true },
    tokenshield: { label: 'Attack stopped', html: function () { return video('assets/media/tokenshield.mp4', 'Animation of the flow: a planted instruction is stopped before it reaches the main model'); } },
    maithili: { label: 'Paper', html: paper },
    saralkanoon: { label: 'Demo', html: saral },
    ranking: { label: 'Ranking', html: function () { return sceneHTML('ranking', 'Animation of the README pipeline with made-up profiles. Click to replay.<span class="swipe"> Swipe sideways to see all of it.</span>'); } },
    fccl: { label: 'Compression', html: function () { return sceneHTML('fccl', 'Animation of the README flow. Click to replay.<span class="swipe"> Swipe sideways to see all of it.</span>'); } },
    mlscratch: { label: 'From scratch', html: function () { return sceneHTML('mlscratch', 'Click an algorithm to watch just that one. Click elsewhere to play them all. Small illustration, not the repo code.'); } }
  };
  var WIDE = { fccl: 0, tokenshield: 1 };

  function html(key, p) {
    var tabs = [], panes = [], d = DEMOS[key];
    if (d) { tabs.push(['demo', d.label]); panes.push(['demo', d.html()]); }
    if (getFlow(key)) {
      var fl = key === 'saralkanoon' ? 'n8n workflow' : 'Workflow';
      tabs.push(['flow', fl]); panes.push(['flow', key === 'saralkanoon' ? n8nHTML() : flowHTML(key) + '<p class="pcap hint">Runs on its own. Click to replay.</p>']);
    }
    if (key === 'saralkanoon' && tabs.length > 1) { tabs.reverse(); panes.reverse(); }
    var def = tabs.length ? tabs[0][0] : '';
    var t = tabs.length > 1 ? '<div class="pv-tabs" role="tablist">' + tabs.map(function (x) { return '<button type="button" role="tab" data-t="' + x[0] + '" aria-selected="' + (x[0] === def) + '">' + x[1] + '</button>'; }).join('') + '</div>' : '';
    var b = panes.map(function (x) { return '<div class="pv-pane' + (x[0] === def ? ' on' : '') + '" data-p="' + x[0] + '">' + x[1] + '</div>'; }).join('');
    return '<div class="pvis' + (d && d.wide ? ' is-wide' : '') + '">' + t + '<div class="pv-body">' + b + '</div><p class="pcap">' + esc(p.result) + '</p></div>';
  }

  function bind(row, key) {
    var pv = row.querySelector('.pvis'); if (!pv) return;
    var panes = pv.querySelectorAll('.pv-pane'), tabs = pv.querySelectorAll('.pv-tabs button'), anim = null;
    var scv = pv.querySelector('.scn'), scn = scv ? Scene(scv, scv.dataset.k) : null; if (scv) scv.addEventListener('click', function (e) { scn.click(e); });
    var fl = pv.querySelector('.flow'), nn = pv.querySelector('.n8n'); if (nn) anim = N8Ctl(nn); else if (fl && getFlow(key)) { anim = Anim(fl, key); fl.addEventListener('click', function () { anim.restart(); }); }
    function activate() {
      var on = pv.querySelector('.pv-pane.on'); if (!on) return;
      var name = on.dataset.p, v = pv.querySelector('video'), th = pv.querySelector('.three');
      if (v) { if (name === 'demo') v.play().catch(function () {}); else v.pause(); }
      if (anim) { if (name === 'flow') anim.start(); else anim.stop(); }
      if (scn) { if (name === 'demo') scn.start(); else scn.stop(); }
      if (th) { if (name === '3d') requestAnimationFrame(function () { start3D(th, key); }); else if (th._t) th._t.visible = false; }
    }
    function show(name) {
      panes.forEach(function (p) { p.classList.toggle('on', p.dataset.p === name); });
      tabs.forEach(function (b) { b.setAttribute('aria-selected', b.dataset.t === name); });
      activate();
    }
    tabs.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.t); }); });
    // phone click-through
    var ph = pv.querySelector('.phone');
    if (ph) ph.addEventListener('click', function (e) { var b = e.target.closest('.hs'); if (!b) return; ph.querySelectorAll('.ph-screen').forEach(function (s) { s.classList.toggle('on', s.dataset.s === b.dataset.go); }); });
    // Obliviate monitor click-through
    var mon = pv.querySelector('[data-goo]') ? pv.querySelector('.mon-screen') : null;
    var hv0 = pv.querySelector('.hero-vid'); if (hv0) hv0.addEventListener('playing', function () { hv0.classList.add('ok'); });
    if (mon) mon.addEventListener('click', function (e) {
      var b = e.target.closest('[data-goo]'); if (!b) return;
      mon.querySelectorAll('img.ms').forEach(function (i) { i.classList.toggle('on', i.dataset.s === b.dataset.goo); });
      mon.querySelectorAll('.ms-hot').forEach(function (h) { h.style.display = h.dataset.s === b.dataset.goo ? 'block' : 'none'; });
      var hv = mon.querySelector('.hero-vid'); if (hv) hv.style.display = b.dataset.goo === 'landing' ? 'block' : 'none';
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var on = pv.querySelector('.pv-pane.on'); if (!on) return;
          if (e.isIntersecting) activate();
          else { var v = pv.querySelector('video'); if (v) v.pause(); if (anim) anim.stop(); if (scn) scn.stop(); var th = pv.querySelector('.three'); if (th && th._t) th._t.visible = false; }
        });
      }, { threshold: 0.25 }).observe(pv);
    }
  }

  window.Visuals = { html: html, bind: bind, drawAt: function (cv, key, tm) { Scene(cv, key).draw(tm); }, setArch: function (a) { ARCH = a || {}; FLOWS = {}; } };
  window.addEventListener('resize', function () { document.querySelectorAll('.three').forEach(function (el) { if (el._t) size3(el._t); }); });
})();
