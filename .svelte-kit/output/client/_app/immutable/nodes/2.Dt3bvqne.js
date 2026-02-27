import { a as se, f as ve } from '../chunks/DUysMBZ5.js';
import { o as ce } from '../chunks/6MsVjp58.js';
import {
  aA as ae,
  f as te,
  t as ue,
  aB as de,
  aC as pe,
  aD as fe,
  c as f,
  aE as oe,
  aF as _e,
  u as he,
  g as me,
  h as ge,
  ag as ye,
  D as be,
  K as ke,
  M as xe,
  P as p,
  aj as we,
  ax as v,
  az as a,
  aG as Se,
  ay as c,
  a4 as K,
  aH as Me,
  aI as g,
  aJ as Ce,
  aK as V
} from '../chunks/Rq4LI6QR.js';
import { e as $ } from '../chunks/ecA2bgat.js';
import { h as Ee, s as Ae } from '../chunks/CiNKaql4.js';
import { b as Ie } from '../chunks/Vz342YLG.js';
function ne(e, t, r = !1) {
  if (e.multiple) {
    if (t == null) return;
    if (!de(t)) return pe();
    for (var i of e.options) i.selected = t.includes(m(i));
    return;
  }
  for (i of e.options) {
    var l = m(i);
    if (fe(l, t)) {
      i.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function je(e) {
  var t = new MutationObserver(() => {
    ne(e, e.__value);
  });
  (t.observe(e, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ['value'] }),
    ue(() => {
      t.disconnect();
    }));
}
function qe(e, t, r = t) {
  var i = new WeakSet(),
    l = !0;
  (ae(e, 'change', (n) => {
    var u = n ? '[selected]' : ':checked',
      s;
    if (e.multiple) s = [].map.call(e.querySelectorAll(u), m);
    else {
      var d = e.querySelector(u) ?? e.querySelector('option:not([disabled])');
      s = d && m(d);
    }
    (r(s), f !== null && i.add(f));
  }),
    te(() => {
      var n = t();
      if (e === document.activeElement) {
        var u = oe ?? f;
        if (i.has(u)) return;
      }
      if ((ne(e, n, l), l && n === void 0)) {
        var s = e.querySelector(':checked');
        s !== null && ((n = m(s)), r(n));
      }
      ((e.__value = n), (l = !1));
    }),
    je(e));
}
function m(e) {
  return '__value' in e ? e.__value : e.value;
}
function Be(e, t, r = t) {
  var i = new WeakSet();
  (ae(e, 'input', async (l) => {
    var n = l ? e.defaultValue : e.value;
    if (((n = L(e) ? N(n) : n), r(n), f !== null && i.add(f), await _e(), n !== (n = t()))) {
      var u = e.selectionStart,
        s = e.selectionEnd,
        d = e.value.length;
      if (((e.value = n ?? ''), s !== null)) {
        var _ = e.value.length;
        u === s && s === d && _ > d
          ? ((e.selectionStart = _), (e.selectionEnd = _))
          : ((e.selectionStart = u), (e.selectionEnd = Math.min(s, _)));
      }
    }
  }),
    ((ge && e.defaultValue !== e.value) || (he(t) == null && e.value)) &&
      (r(L(e) ? N(e.value) : e.value), f !== null && i.add(f)),
    me(() => {
      var l = t();
      if (e === document.activeElement) {
        var n = oe ?? f;
        if (i.has(n)) return;
      }
      (L(e) && l === N(e.value)) ||
        (e.type === 'date' && !l && !e.value) ||
        (l !== e.value && (e.value = l ?? ''));
    }));
}
function L(e) {
  var t = e.type;
  return t === 'number' || t === 'range';
}
function N(e) {
  return e === '' ? null : +e;
}
const De = '' + new URL('../assets/woman-laptop.DuxNV_n4.svg', import.meta.url).href;
var Pe = ve(
  '<nav class="navbar"><div class="navbar-inner"><a href="#" class="navbar-brand">Johanna 24/7</a> <div class="navbar-links"><a href="#" class="nav-link active">New</a> <a href="#" class="nav-link">History</a> <button class="theme-toggle" aria-label="Toggle dark mode"><svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div></div></nav> <main class="main"><div class="main-inner"><section class="greeting"><img alt="Avatar" class="greeting-avatar"/> <h1 class="greeting-headline">Hej! Jag heter Johanna<span class="dot">.</span></h1> <p class="greeting-sub">Hur kan jag hjälpa dig idag?</p></section> <div class="input-area"><div class="input-wrapper"><textarea class="chat-input" placeholder="Skriv ditt meddelande…" rows="1" aria-label="Message input"></textarea> <button class="send-btn" aria-label="Send message"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></button></div> <div class="input-meta"><p class="input-hint"><kbd>↵</kbd> to send · AI kan generera felaktig information</p> <label class="mode-inline" for="mode-select"><span class="mode-inline-label">Mode:</span> <span class="mode-inline-select-wrap"><select id="mode-select" class="mode-select" aria-label="Select AI mode"><option>Classic</option><option>Philosophic</option><option>Therapeutic</option><option>Debugger</option><option>Nurse</option><option>Creative</option><option>Socratic</option><option>Mentor</option><option>Poet</option><option>Analyst</option><option>Comedian</option><option>Scientist</option><option>Coach</option><option>Storyteller</option><option>Minimalist</option><option>Explorer</option></select> <svg class="mode-select-icon" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline></svg></span></label></div></div></div></main> <footer class="footer"><div class="footer-inner"><span class="footer-copy">© 2025 Chat</span> <span class="footer-sep">·</span> <a href="#" class="footer-link">Terms</a> <span class="footer-sep">·</span> <a href="#" class="footer-link">Privacy</a></div></footer>',
  1
);
function Le(e, t) {
  ye(t, !0);
  let r = null,
    i = V(''),
    l = V('classic'),
    n = V('light');
  const u = Ce(() => p(i).trim().length > 0);
  function s() {
    if (typeof window > 'u') return 'light';
    const o = localStorage.getItem('theme');
    return o === 'light' || o === 'dark'
      ? o
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  }
  function d(o) {
    (g(n, o, !0),
      document.documentElement.setAttribute('data-theme', o),
      localStorage.setItem('theme', o));
  }
  function _() {
    d(p(n) === 'dark' ? 'light' : 'dark');
  }
  function W() {
    const o = p(i).trim();
    o && (console.log('Send:', o), g(i, ''), r?.focus());
  }
  function ie(o) {
    o.key === 'Enter' && !o.shiftKey && (o.preventDefault(), p(u) && W());
  }
  (ce(() => {
    d(s());
  }),
    be(() => {
      r && (p(i), (r.style.height = 'auto'), (r.style.height = `${r.scrollHeight}px`));
    }));
  var z = Pe();
  Ee('1uha8ag', (o) => {
    te(() => {
      Se.title = 'Johanna 24/7';
    });
  });
  var y = ke(z),
    F = v(y),
    G = a(v(F), 2),
    re = a(v(G), 4);
  (c(G), c(F), c(y));
  var O = a(y, 2),
    R = v(O),
    b = v(R),
    le = v(b);
  (K(4), c(b));
  var U = a(b, 2),
    k = v(U),
    h = v(k);
  (Me(h),
    Ie(
      h,
      (o) => (r = o),
      () => r
    ));
  var Q = a(h, 2);
  c(k);
  var X = a(k, 2),
    Y = a(v(X), 2),
    Z = a(v(Y), 2),
    x = v(Z),
    w = v(x);
  w.value = w.__value = 'classic';
  var S = a(w);
  S.value = S.__value = 'philosophic';
  var M = a(S);
  M.value = M.__value = 'therapeutic';
  var C = a(M);
  C.value = C.__value = 'debugger';
  var E = a(C);
  E.value = E.__value = 'nurse';
  var A = a(E);
  A.value = A.__value = 'creative';
  var I = a(A);
  I.value = I.__value = 'socratic';
  var j = a(I);
  j.value = j.__value = 'mentor';
  var q = a(j);
  q.value = q.__value = 'poet';
  var B = a(q);
  B.value = B.__value = 'analyst';
  var D = a(B);
  D.value = D.__value = 'comedian';
  var P = a(D);
  P.value = P.__value = 'scientist';
  var T = a(P);
  T.value = T.__value = 'coach';
  var H = a(T);
  H.value = H.__value = 'storyteller';
  var J = a(H);
  J.value = J.__value = 'minimalist';
  var ee = a(J);
  ((ee.value = ee.__value = 'explorer'),
    c(x),
    K(2),
    c(Z),
    c(Y),
    c(X),
    c(U),
    c(R),
    c(O),
    K(2),
    xe(() => {
      (Ae(le, 'src', De), (Q.disabled = !p(u)));
    }),
    $('click', re, _),
    Be(
      h,
      () => p(i),
      (o) => g(i, o)
    ),
    $('keydown', h, ie),
    $('click', Q, W),
    qe(
      x,
      () => p(l),
      (o) => g(l, o)
    ),
    se(e, z),
    we());
}
export { Le as component };
