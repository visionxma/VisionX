function ar(s) {
  if (s === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s
}

function Pa(s, e) {
  s.prototype = Object.create(e.prototype), s.prototype.constructor = s, s.__proto__ = e
}
var Ct = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
  nn = {
    duration: .5,
    overwrite: !1,
    delay: 0
  },
  ro, Ve, le, Lt = 1e8,
  oe = 1 / Lt,
  Os = Math.PI * 2,
  ru = Os / 4,
  iu = 0,
  Ca = Math.sqrt,
  nu = Math.cos,
  su = Math.sin,
  Ie = function(e) {
    return typeof e == "string"
  },
  me = function(e) {
    return typeof e == "function"
  },
  pr = function(e) {
    return typeof e == "number"
  },
  io = function(e) {
    return typeof e > "u"
  },
  er = function(e) {
    return typeof e == "object"
  },
  ft = function(e) {
    return e !== !1
  },
  no = function() {
    return typeof window < "u"
  },
  vn = function(e) {
    return me(e) || Ie(e)
  },
  Ma = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {},
  Ke = Array.isArray,
  ou = /random\([^)]+\)/g,
  au = /,\s*/g,
  Do = /(?:-?\.?\d|\.)+/gi,
  ka = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
  gi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
  us = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
  Oa = /[+-]=-?[.\d]+/,
  lu = /[^,'"\[\]\s]+/gi,
  uu = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
  de, Wt, As, so, Mt = {},
  qn = {},
  Aa, Da = function(e) {
    return (qn = Ei(e, Mt)) && ht
  },
  oo = function(e, t) {
    return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()")
  },
  sn = function(e, t) {
    return !t && console.warn(e)
  },
  Ia = function(e, t) {
    return e && (Mt[e] = t) && qn && (qn[e] = t) || Mt
  },
  on = function() {
    return 0
  },
  fu = {
    suppressEvents: !0,
    isStart: !0,
    kill: !1
  },
  Ln = {
    suppressEvents: !0,
    kill: !1
  },
  du = {
    suppressEvents: !0
  },
  ao = {},
  kr = [],
  Ds = {},
  La, yt = {},
  fs = {},
  Io = 30,
  zn = [],
  lo = "",
  uo = function(e) {
    var t = e[0],
      r, i;
    if (er(t) || me(t) || (e = [e]), !(r = (t._gsap || {}).harness)) {
      for (i = zn.length; i-- && !zn[i].targetTest(t););
      r = zn[i]
    }
    for (i = e.length; i--;) e[i] && (e[i]._gsap || (e[i]._gsap = new rl(e[i], r))) || e.splice(i, 1);
    return e
  },
  jr = function(e) {
    return e._gsap || uo(zt(e))[0]._gsap
  },
  za = function(e, t, r) {
    return (r = e[t]) && me(r) ? e[t]() : io(r) && e.getAttribute && e.getAttribute(t) || r
  },
  dt = function(e, t) {
    return (e = e.split(",")).forEach(t) || e
  },
  ye = function(e) {
    return Math.round(e * 1e5) / 1e5 || 0
  },
  fe = function(e) {
    return Math.round(e * 1e7) / 1e7 || 0
  },
  vi = function(e, t) {
    var r = t.charAt(0),
      i = parseFloat(t.substr(2));
    return e = parseFloat(e), r === "+" ? e + i : r === "-" ? e - i : r === "*" ? e * i : e / i
  },
  cu = function(e, t) {
    for (var r = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < r;);
    return i < r
  },
  Xn = function() {
    var e = kr.length,
      t = kr.slice(0),
      r, i;
    for (Ds = {}, kr.length = 0, r = 0; r < e; r++) i = t[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0)
  },
  fo = function(e) {
    return !!(e._initted || e._startAt || e.add)
  },
  Ra = function(e, t, r, i) {
    kr.length && !Ve && Xn(), e.render(t, r, !!(Ve && t < 0 && fo(e))), kr.length && !Ve && Xn()
  },
  Fa = function(e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + "").match(lu).length < 2 ? t : Ie(e) ? e.trim() : e
  },
  Ba = function(e) {
    return e
  },
  kt = function(e, t) {
    for (var r in t) r in e || (e[r] = t[r]);
    return e
  },
  pu = function(e) {
    return function(t, r) {
      for (var i in r) i in t || i === "duration" && e || i === "ease" || (t[i] = r[i])
    }
  },
  Ei = function(e, t) {
    for (var r in t) e[r] = t[r];
    return e
  },
  Lo = function s(e, t) {
    for (var r in t) r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = er(t[r]) ? s(e[r] || (e[r] = {}), t[r]) : t[r]);
    return e
  },
  $n = function(e, t) {
    var r = {},
      i;
    for (i in e) i in t || (r[i] = e[i]);
    return r
  },
  Xi = function(e) {
    var t = e.parent || de,
      r = e.keyframes ? pu(Ke(e.keyframes)) : kt;
    if (ft(e.inherit))
      for (; t;) r(e, t.vars.defaults), t = t.parent || t._dp;
    return e
  },
  hu = function(e, t) {
    for (var r = e.length, i = r === t.length; i && r-- && e[r] === t[r];);
    return r < 0
  },
  Na = function(e, t, r, i, n) {
    var o = e[i],
      a;
    if (n)
      for (a = t[n]; o && o[n] > a;) o = o._prev;
    return o ? (t._next = o._next, o._next = t) : (t._next = e[r], e[r] = t), t._next ? t._next._prev = t : e[i] = t, t._prev = o, t.parent = t._dp = e, t
  },
  ns = function(e, t, r, i) {
    r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
    var n = t._prev,
      o = t._next;
    n ? n._next = o : e[r] === t && (e[r] = o), o ? o._prev = n : e[i] === t && (e[i] = n), t._next = t._prev = t.parent = null
  },
  Dr = function(e, t) {
    e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0
  },
  Kr = function(e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
      for (var r = e; r;) r._dirty = 1, r = r.parent;
    return e
  },
  gu = function(e) {
    for (var t = e.parent; t && t.parent;) t._dirty = 1, t.totalDuration(), t = t.parent;
    return e
  },
  Is = function(e, t, r, i) {
    return e._startAt && (Ve ? e._startAt.revert(Ln) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, i))
  },
  mu = function s(e) {
    return !e || e._ts && s(e.parent)
  },
  zo = function(e) {
    return e._repeat ? Pi(e._tTime, e = e.duration() + e._rDelay) * e : 0
  },
  Pi = function(e, t) {
    var r = Math.floor(e = fe(e / t));
    return e && r === e ? r - 1 : r
  },
  Wn = function(e, t) {
    return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
  },
  ss = function(e) {
    return e._end = fe(e._start + (e._tDur / Math.abs(e._ts || e._rts || oe) || 0))
  },
  os = function(e, t) {
    var r = e._dp;
    return r && r.smoothChildTiming && e._ts && (e._start = fe(r._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), ss(e), r._dirty || Kr(r, e)), e
  },
  Va = function(e, t) {
    var r;
    if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (r = Wn(e.rawTime(), t), (!t._dur || hn(0, t.totalDuration(), r) - t._tTime > oe) && t.render(r, !0)), Kr(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
      if (e._dur < e.duration())
        for (r = e; r._dp;) r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
      e._zTime = -oe
    }
  },
  jt = function(e, t, r, i) {
    return t.parent && Dr(t), t._start = fe((pr(r) ? r : r || e !== de ? At(e, r, t) : e._time) + t._delay), t._end = fe(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Na(e, t, "_first", "_last", e._sort ? "_start" : 0), Ls(t) || (e._recent = t), i || Va(e, t), e._ts < 0 && os(e, e._tTime), e
  },
  Ga = function(e, t) {
    return (Mt.ScrollTrigger || oo("scrollTrigger", t)) && Mt.ScrollTrigger.create(t, e)
  },
  Ya = function(e, t, r, i, n) {
    if (po(e, t, n), !e._initted) return 1;
    if (!r && e._pt && !Ve && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && La !== bt.frame) return kr.push(e), e._lazy = [n, i], 1
  },
  _u = function s(e) {
    var t = e.parent;
    return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || s(t))
  },
  Ls = function(e) {
    var t = e.data;
    return t === "isFromStart" || t === "isStart"
  },
  vu = function(e, t, r, i) {
    var n = e.ratio,
      o = t < 0 || !t && (!e._start && _u(e) && !(!e._initted && Ls(e)) || (e._ts < 0 || e._dp._ts < 0) && !Ls(e)) ? 0 : 1,
      a = e._rDelay,
      l = 0,
      u, f, d;
    if (a && e._repeat && (l = hn(0, e._tDur, t), f = Pi(l, a), e._yoyo && f & 1 && (o = 1 - o), f !== Pi(e._tTime, a) && (n = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== n || Ve || i || e._zTime === oe || !t && e._zTime) {
      if (!e._initted && Ya(e, t, i, r, l)) return;
      for (d = e._zTime, e._zTime = t || (r ? oe : 0), r || (r = t && !d), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = l, u = e._pt; u;) u.r(o, u.d), u = u._next;
      t < 0 && Is(e, t, r, !0), e._onUpdate && !r && Et(e, "onUpdate"), l && e._repeat && !r && e.parent && Et(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && Dr(e, 1), !r && !Ve && (Et(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()))
    } else e._zTime || (e._zTime = t)
  },
  wu = function(e, t, r) {
    var i;
    if (r > t)
      for (i = e._first; i && i._start <= r;) {
        if (i.data === "isPause" && i._start > t) return i;
        i = i._next
      } else
        for (i = e._last; i && i._start >= r;) {
          if (i.data === "isPause" && i._start < t) return i;
          i = i._prev
        }
  },
  Ci = function(e, t, r, i) {
    var n = e._repeat,
      o = fe(t) || 0,
      a = e._tTime / e._tDur;
    return a && !i && (e._time *= o / e._dur), e._dur = o, e._tDur = n ? n < 0 ? 1e10 : fe(o * (n + 1) + e._rDelay * n) : o, a > 0 && !i && os(e, e._tTime = e._tDur * a), e.parent && ss(e), r || Kr(e.parent, e), e
  },
  Ro = function(e) {
    return e instanceof ut ? Kr(e) : Ci(e, e._dur)
  },
  yu = {
    _start: 0,
    endTime: on,
    totalDuration: on
  },
  At = function s(e, t, r) {
    var i = e.labels,
      n = e._recent || yu,
      o = e.duration() >= Lt ? n.endTime(!1) : e._dur,
      a, l, u;
    return Ie(t) && (isNaN(t) || t in i) ? (l = t.charAt(0), u = t.substr(-1) === "%", a = t.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (t = t.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (u ? (a < 0 ? n : r).totalDuration() / 100 : 1)) : a < 0 ? (t in i || (i[t] = o), i[t]) : (l = parseFloat(t.charAt(a - 1) + t.substr(a + 1)), u && r && (l = l / 100 * (Ke(r) ? r[0] : r).totalDuration()), a > 1 ? s(e, t.substr(0, a - 1), r) + l : o + l)) : t == null ? o : +t
  },
  $i = function(e, t, r) {
    var i = pr(t[1]),
      n = (i ? 2 : 1) + (e < 2 ? 0 : 1),
      o = t[n],
      a, l;
    if (i && (o.duration = t[1]), o.parent = r, e) {
      for (a = o, l = r; l && !("immediateRender" in a);) a = l.vars.defaults || {}, l = ft(l.vars.inherit) && l.parent;
      o.immediateRender = ft(a.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[n - 1]
    }
    return new Ee(t[0], o, t[n + 1])
  },
  Rr = function(e, t) {
    return e || e === 0 ? t(e) : t
  },
  hn = function(e, t, r) {
    return r < e ? e : r > t ? t : r
  },
  Ue = function(e, t) {
    return !Ie(e) || !(t = uu.exec(e)) ? "" : t[1]
  },
  xu = function(e, t, r) {
    return Rr(r, function(i) {
      return hn(e, t, i)
    })
  },
  zs = [].slice,
  Ha = function(e, t) {
    return e && er(e) && "length" in e && (!t && !e.length || e.length - 1 in e && er(e[0])) && !e.nodeType && e !== Wt
  },
  Tu = function(e, t, r) {
    return r === void 0 && (r = []), e.forEach(function(i) {
      var n;
      return Ie(i) && !t || Ha(i, 1) ? (n = r).push.apply(n, zt(i)) : r.push(i)
    }) || r
  },
  zt = function(e, t, r) {
    return le && !t && le.selector ? le.selector(e) : Ie(e) && !r && (As || !Mi()) ? zs.call((t || so).querySelectorAll(e), 0) : Ke(e) ? Tu(e, r) : Ha(e) ? zs.call(e, 0) : e ? [e] : []
  },
  Rs = function(e) {
    return e = zt(e)[0] || sn("Invalid scope") || {},
      function(t) {
        var r = e.current || e.nativeElement || e;
        return zt(t, r.querySelectorAll ? r : r === e ? sn("Invalid scope") || so.createElement("div") : e)
      }
  },
  qa = function(e) {
    return e.sort(function() {
      return .5 - Math.random()
    })
  },
  Xa = function(e) {
    if (me(e)) return e;
    var t = er(e) ? e : {
        each: e
      },
      r = Qr(t.ease),
      i = t.from || 0,
      n = parseFloat(t.base) || 0,
      o = {},
      a = i > 0 && i < 1,
      l = isNaN(i) || a,
      u = t.axis,
      f = i,
      d = i;
    return Ie(i) ? f = d = {
        center: .5,
        edges: .5,
        end: 1
      } [i] || 0 : !a && l && (f = i[0], d = i[1]),
      function(p, c, g) {
        var h = (g || t).length,
          m = o[h],
          _, w, v, y, x, M, b, E, P;
        if (!m) {
          if (P = t.grid === "auto" ? 0 : (t.grid || [1, Lt])[1], !P) {
            for (b = -Lt; b < (b = g[P++].getBoundingClientRect().left) && P < h;);
            P < h && P--
          }
          for (m = o[h] = [], _ = l ? Math.min(P, h) * f - .5 : i % P, w = P === Lt ? 0 : l ? h * d / P - .5 : i / P | 0, b = 0, E = Lt, M = 0; M < h; M++) v = M % P - _, y = w - (M / P | 0), m[M] = x = u ? Math.abs(u === "y" ? y : v) : Ca(v * v + y * y), x > b && (b = x), x < E && (E = x);
          i === "random" && qa(m), m.max = b - E, m.min = E, m.v = h = (parseFloat(t.amount) || parseFloat(t.each) * (P > h ? h - 1 : u ? u === "y" ? h / P : P : Math.max(P, h / P)) || 0) * (i === "edges" ? -1 : 1), m.b = h < 0 ? n - h : n, m.u = Ue(t.amount || t.each) || 0, r = r && h < 0 ? zu(r) : r
        }
        return h = (m[p] - m.min) / m.max || 0, fe(m.b + (r ? r(h) : h) * m.v) + m.u
      }
  },
  Fs = function(e) {
    var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
    return function(r) {
      var i = fe(Math.round(parseFloat(r) / e) * e * t);
      return (i - i % 1) / t + (pr(r) ? 0 : Ue(r))
    }
  },
  $a = function(e, t) {
    var r = Ke(e),
      i, n;
    return !r && er(e) && (i = r = e.radius || Lt, e.values ? (e = zt(e.values), (n = !pr(e[0])) && (i *= i)) : e = Fs(e.increment)), Rr(t, r ? me(e) ? function(o) {
      return n = e(o), Math.abs(n - o) <= i ? n : o
    } : function(o) {
      for (var a = parseFloat(n ? o.x : o), l = parseFloat(n ? o.y : 0), u = Lt, f = 0, d = e.length, p, c; d--;) n ? (p = e[d].x - a, c = e[d].y - l, p = p * p + c * c) : p = Math.abs(e[d] - a), p < u && (u = p, f = d);
      return f = !i || u <= i ? e[f] : o, n || f === o || pr(o) ? f : f + Ue(o)
    } : Fs(e))
  },
  Wa = function(e, t, r, i) {
    return Rr(Ke(e) ? !t : r === !0 ? !!(r = 0) : !i, function() {
      return Ke(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (t - e + r * .99)) / r) * r * i) / i
    })
  },
  bu = function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
    return function(i) {
      return t.reduce(function(n, o) {
        return o(n)
      }, i)
    }
  },
  Su = function(e, t) {
    return function(r) {
      return e(parseFloat(r)) + (t || Ue(r))
    }
  },
  Eu = function(e, t, r) {
    return ja(e, t, 0, 1, r)
  },
  Ua = function(e, t, r) {
    return Rr(r, function(i) {
      return e[~~t(i)]
    })
  },
  Pu = function s(e, t, r) {
    var i = t - e;
    return Ke(e) ? Ua(e, s(0, e.length), t) : Rr(r, function(n) {
      return (i + (n - e) % i) % i + e
    })
  },
  Cu = function s(e, t, r) {
    var i = t - e,
      n = i * 2;
    return Ke(e) ? Ua(e, s(0, e.length - 1), t) : Rr(r, function(o) {
      return o = (n + (o - e) % n) % n || 0, e + (o > i ? n - o : o)
    })
  },
  an = function(e) {
    return e.replace(ou, function(t) {
      var r = t.indexOf("[") + 1,
        i = t.substring(r || 7, r ? t.indexOf("]") : t.length - 1).split(au);
      return Wa(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5)
    })
  },
  ja = function(e, t, r, i, n) {
    var o = t - e,
      a = i - r;
    return Rr(n, function(l) {
      return r + ((l - e) / o * a || 0)
    })
  },
  Mu = function s(e, t, r, i) {
    var n = isNaN(e + t) ? 0 : function(c) {
      return (1 - c) * e + c * t
    };
    if (!n) {
      var o = Ie(e),
        a = {},
        l, u, f, d, p;
      if (r === !0 && (i = 1) && (r = null), o) e = {
        p: e
      }, t = {
        p: t
      };
      else if (Ke(e) && !Ke(t)) {
        for (f = [], d = e.length, p = d - 2, u = 1; u < d; u++) f.push(s(e[u - 1], e[u]));
        d--, n = function(g) {
          g *= d;
          var h = Math.min(p, ~~g);
          return f[h](g - h)
        }, r = t
      } else i || (e = Ei(Ke(e) ? [] : {}, e));
      if (!f) {
        for (l in t) co.call(a, e, l, "get", t[l]);
        n = function(g) {
          return mo(g, a) || (o ? e.p : e)
        }
      }
    }
    return Rr(r, n)
  },
  Fo = function(e, t, r) {
    var i = e.labels,
      n = Lt,
      o, a, l;
    for (o in i) a = i[o] - t, a < 0 == !!r && a && n > (a = Math.abs(a)) && (l = o, n = a);
    return l
  },
  Et = function(e, t, r) {
    var i = e.vars,
      n = i[t],
      o = le,
      a = e._ctx,
      l, u, f;
    if (n) return l = i[t + "Params"], u = i.callbackScope || e, r && kr.length && Xn(), a && (le = a), f = l ? n.apply(u, l) : n.call(u), le = o, f
  },
  Bi = function(e) {
    return Dr(e), e.scrollTrigger && e.scrollTrigger.kill(!!Ve), e.progress() < 1 && Et(e, "onInterrupt"), e
  },
  mi, Ka = [],
  Qa = function(e) {
    if (e)
      if (e = !e.name && e.default || e, no() || e.headless) {
        var t = e.name,
          r = me(e),
          i = t && !r && e.init ? function() {
            this._props = []
          } : e,
          n = {
            init: on,
            render: mo,
            add: co,
            kill: Xu,
            modifier: qu,
            rawVars: 0
          },
          o = {
            targetTest: 0,
            get: 0,
            getSetter: go,
            aliases: {},
            register: 0
          };
        if (Mi(), e !== i) {
          if (yt[t]) return;
          kt(i, kt($n(e, n), o)), Ei(i.prototype, Ei(n, $n(e, o))), yt[i.prop = t] = i, e.targetTest && (zn.push(i), ao[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"
        }
        Ia(t, i), e.register && e.register(ht, i, ct)
      } else Ka.push(e)
  },
  se = 255,
  Ni = {
    aqua: [0, se, se],
    lime: [0, se, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, se],
    navy: [0, 0, 128],
    white: [se, se, se],
    olive: [128, 128, 0],
    yellow: [se, se, 0],
    orange: [se, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [se, 0, 0],
    pink: [se, 192, 203],
    cyan: [0, se, se],
    transparent: [se, se, se, 0]
  },
  ds = function(e, t, r) {
    return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (r - t) * e * 6 : e < .5 ? r : e * 3 < 2 ? t + (r - t) * (2 / 3 - e) * 6 : t) * se + .5 | 0
  },
  Za = function(e, t, r) {
    var i = e ? pr(e) ? [e >> 16, e >> 8 & se, e & se] : 0 : Ni.black,
      n, o, a, l, u, f, d, p, c, g;
    if (!i) {
      if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Ni[e]) i = Ni[e];
      else if (e.charAt(0) === "#") {
        if (e.length < 6 && (n = e.charAt(1), o = e.charAt(2), a = e.charAt(3), e = "#" + n + n + o + o + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9) return i = parseInt(e.substr(1, 6), 16), [i >> 16, i >> 8 & se, i & se, parseInt(e.substr(7), 16) / 255];
        e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & se, e & se]
      } else if (e.substr(0, 3) === "hsl") {
        if (i = g = e.match(Do), !t) l = +i[0] % 360 / 360, u = +i[1] / 100, f = +i[2] / 100, o = f <= .5 ? f * (u + 1) : f + u - f * u, n = f * 2 - o, i.length > 3 && (i[3] *= 1), i[0] = ds(l + 1 / 3, n, o), i[1] = ds(l, n, o), i[2] = ds(l - 1 / 3, n, o);
        else if (~e.indexOf("=")) return i = e.match(ka), r && i.length < 4 && (i[3] = 1), i
      } else i = e.match(Do) || Ni.transparent;
      i = i.map(Number)
    }
    return t && !g && (n = i[0] / se, o = i[1] / se, a = i[2] / se, d = Math.max(n, o, a), p = Math.min(n, o, a), f = (d + p) / 2, d === p ? l = u = 0 : (c = d - p, u = f > .5 ? c / (2 - d - p) : c / (d + p), l = d === n ? (o - a) / c + (o < a ? 6 : 0) : d === o ? (a - n) / c + 2 : (n - o) / c + 4, l *= 60), i[0] = ~~(l + .5), i[1] = ~~(u * 100 + .5), i[2] = ~~(f * 100 + .5)), r && i.length < 4 && (i[3] = 1), i
  },
  Ja = function(e) {
    var t = [],
      r = [],
      i = -1;
    return e.split(Or).forEach(function(n) {
      var o = n.match(gi) || [];
      t.push.apply(t, o), r.push(i += o.length + 1)
    }), t.c = r, t
  },
  Bo = function(e, t, r) {
    var i = "",
      n = (e + i).match(Or),
      o = t ? "hsla(" : "rgba(",
      a = 0,
      l, u, f, d;
    if (!n) return e;
    if (n = n.map(function(p) {
        return (p = Za(p, t, 1)) && o + (t ? p[0] + "," + p[1] + "%," + p[2] + "%," + p[3] : p.join(",")) + ")"
      }), r && (f = Ja(e), l = r.c, l.join(i) !== f.c.join(i)))
      for (u = e.replace(Or, "1").split(gi), d = u.length - 1; a < d; a++) i += u[a] + (~l.indexOf(a) ? n.shift() || o + "0,0,0,0)" : (f.length ? f : n.length ? n : r).shift());
    if (!u)
      for (u = e.split(Or), d = u.length - 1; a < d; a++) i += u[a] + n[a];
    return i + u[d]
  },
  Or = (function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      e;
    for (e in Ni) s += "|" + e + "\\b";
    return new RegExp(s + ")", "gi")
  })(),
  ku = /hsl[a]?\(/,
  el = function(e) {
    var t = e.join(" "),
      r;
    if (Or.lastIndex = 0, Or.test(t)) return r = ku.test(t), e[1] = Bo(e[1], r), e[0] = Bo(e[0], r, Ja(e[1])), !0
  },
  ln, bt = (function() {
    var s = Date.now,
      e = 500,
      t = 33,
      r = s(),
      i = r,
      n = 1e3 / 240,
      o = n,
      a = [],
      l, u, f, d, p, c, g = function h(m) {
        var _ = s() - i,
          w = m === !0,
          v, y, x, M;
        if ((_ > e || _ < 0) && (r += _ - t), i += _, x = i - r, v = x - o, (v > 0 || w) && (M = ++d.frame, p = x - d.time * 1e3, d.time = x = x / 1e3, o += v + (v >= n ? 4 : n - v), y = 1), w || (l = u(h)), y)
          for (c = 0; c < a.length; c++) a[c](x, p, M, m)
      };
    return d = {
      time: 0,
      frame: 0,
      tick: function() {
        g(!0)
      },
      deltaRatio: function(m) {
        return p / (1e3 / (m || 60))
      },
      wake: function() {
        Aa && (!As && no() && (Wt = As = window, so = Wt.document || {}, Mt.gsap = ht, (Wt.gsapVersions || (Wt.gsapVersions = [])).push(ht.version), Da(qn || Wt.GreenSockGlobals || !Wt.gsap && Wt || {}), Ka.forEach(Qa)), f = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && d.sleep(), u = f || function(m) {
          return setTimeout(m, o - d.time * 1e3 + 1 | 0)
        }, ln = 1, g(2))
      },
      sleep: function() {
        (f ? cancelAnimationFrame : clearTimeout)(l), ln = 0, u = on
      },
      lagSmoothing: function(m, _) {
        e = m || 1 / 0, t = Math.min(_ || 33, e)
      },
      fps: function(m) {
        n = 1e3 / (m || 240), o = d.time * 1e3 + n
      },
      add: function(m, _, w) {
        var v = _ ? function(y, x, M, b) {
          m(y, x, M, b), d.remove(v)
        } : m;
        return d.remove(m), a[w ? "unshift" : "push"](v), Mi(), v
      },
      remove: function(m, _) {
        ~(_ = a.indexOf(m)) && a.splice(_, 1) && c >= _ && c--
      },
      _listeners: a
    }, d
  })(),
  Mi = function() {
    return !ln && bt.wake()
  },
  Z = {},
  Ou = /^[\d.\-M][\d.\-,\s]/,
  Au = /["']/g,
  Du = function(e) {
    for (var t = {}, r = e.substr(1, e.length - 3).split(":"), i = r[0], n = 1, o = r.length, a, l, u; n < o; n++) l = r[n], a = n !== o - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), t[i] = isNaN(u) ? u.replace(Au, "").trim() : +u, i = l.substr(a + 1).trim();
    return t
  },
  Iu = function(e) {
    var t = e.indexOf("(") + 1,
      r = e.indexOf(")"),
      i = e.indexOf("(", t);
    return e.substring(t, ~i && i < r ? e.indexOf(")", r + 1) : r)
  },
  Lu = function(e) {
    var t = (e + "").split("("),
      r = Z[t[0]];
    return r && t.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [Du(t[1])] : Iu(e).split(",").map(Fa)) : Z._CE && Ou.test(e) ? Z._CE("", e) : r
  },
  zu = function(e) {
    return function(t) {
      return 1 - e(1 - t)
    }
  },
  Qr = function(e, t) {
    return e && (me(e) ? e : Z[e] || Lu(e)) || t
  },
  si = function(e, t, r, i) {
    r === void 0 && (r = function(l) {
      return 1 - t(1 - l)
    }), i === void 0 && (i = function(l) {
      return l < .5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2
    });
    var n = {
        easeIn: t,
        easeOut: r,
        easeInOut: i
      },
      o;
    return dt(e, function(a) {
      Z[a] = Mt[a] = n, Z[o = a.toLowerCase()] = r;
      for (var l in n) Z[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = Z[a + "." + l] = n[l]
    }), n
  },
  tl = function(e) {
    return function(t) {
      return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2
    }
  },
  cs = function s(e, t, r) {
    var i = t >= 1 ? t : 1,
      n = (r || (e ? .3 : .45)) / (t < 1 ? t : 1),
      o = n / Os * (Math.asin(1 / i) || 0),
      a = function(f) {
        return f === 1 ? 1 : i * Math.pow(2, -10 * f) * su((f - o) * n) + 1
      },
      l = e === "out" ? a : e === "in" ? function(u) {
        return 1 - a(1 - u)
      } : tl(a);
    return n = Os / n, l.config = function(u, f) {
      return s(e, u, f)
    }, l
  },
  ps = function s(e, t) {
    t === void 0 && (t = 1.70158);
    var r = function(o) {
        return o ? --o * o * ((t + 1) * o + t) + 1 : 0
      },
      i = e === "out" ? r : e === "in" ? function(n) {
        return 1 - r(1 - n)
      } : tl(r);
    return i.config = function(n) {
      return s(e, n)
    }, i
  };
dt("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, e) {
  var t = e < 5 ? e + 1 : e;
  si(s + ",Power" + (t - 1), e ? function(r) {
    return Math.pow(r, t)
  } : function(r) {
    return r
  }, function(r) {
    return 1 - Math.pow(1 - r, t)
  }, function(r) {
    return r < .5 ? Math.pow(r * 2, t) / 2 : 1 - Math.pow((1 - r) * 2, t) / 2
  })
});
Z.Linear.easeNone = Z.none = Z.Linear.easeIn;
si("Elastic", cs("in"), cs("out"), cs());
(function(s, e) {
  var t = 1 / e,
    r = 2 * t,
    i = 2.5 * t,
    n = function(a) {
      return a < t ? s * a * a : a < r ? s * Math.pow(a - 1.5 / e, 2) + .75 : a < i ? s * (a -= 2.25 / e) * a + .9375 : s * Math.pow(a - 2.625 / e, 2) + .984375
    };
  si("Bounce", function(o) {
    return 1 - n(1 - o)
  }, n)
})(7.5625, 2.75);
si("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s)
});
si("Circ", function(s) {
  return -(Ca(1 - s * s) - 1)
});
si("Sine", function(s) {
  return s === 1 ? 1 : -nu(s * ru) + 1
});
si("Back", ps("in"), ps("out"), ps());
Z.SteppedEase = Z.steps = Mt.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var r = 1 / e,
      i = e + (t ? 0 : 1),
      n = t ? 1 : 0,
      o = 1 - oe;
    return function(a) {
      return ((i * hn(0, o, a) | 0) + n) * r
    }
  }
};
nn.ease = Z["quad.out"];
dt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return lo += s + "," + s + "Params,"
});
var rl = function(e, t) {
    this.id = iu++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : za, this.set = t ? t.getSetter : go
  },
  un = (function() {
    function s(t) {
      this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Ci(this, +t.duration, 1, 1), this.data = t.data, le && (this._ctx = le, le.data.push(this)), ln || bt.wake()
    }
    var e = s.prototype;
    return e.delay = function(r) {
      return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay
    }, e.duration = function(r) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur
    }, e.totalDuration = function(r) {
      return arguments.length ? (this._dirty = 0, Ci(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
    }, e.totalTime = function(r, i) {
      if (Mi(), !arguments.length) return this._tTime;
      var n = this._dp;
      if (n && n.smoothChildTiming && this._ts) {
        for (os(this, r), !n._dp || n.parent || Va(n, this); n && n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
        !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && jt(this._dp, this, this._start - this._delay)
      }
      return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === oe || !this._initted && this._dur && r || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), Ra(this, r, i)), this
    }, e.time = function(r, i) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + zo(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time
    }, e.totalProgress = function(r, i) {
      return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0
    }, e.progress = function(r, i) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + zo(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0
    }, e.iteration = function(r, i) {
      var n = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (r - 1) * n, i) : this._repeat ? Pi(this._tTime, n) + 1 : 1
    }, e.timeScale = function(r, i) {
      if (!arguments.length) return this._rts === -oe ? 0 : this._rts;
      if (this._rts === r) return this;
      var n = this.parent && this._ts ? Wn(this.parent._time, this) : this._tTime;
      return this._rts = +r || 0, this._ts = this._ps || r === -oe ? 0 : this._rts, this.totalTime(hn(-Math.abs(this._delay), this.totalDuration(), n), i !== !1), ss(this), gu(this)
    }, e.paused = function(r) {
      return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Mi(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== oe && (this._tTime -= oe)))), this) : this._ps
    }, e.startTime = function(r) {
      if (arguments.length) {
        this._start = fe(r);
        var i = this.parent || this._dp;
        return i && (i._sort || !this.parent) && jt(i, this, this._start - this._delay), this
      }
      return this._start
    }, e.endTime = function(r) {
      return this._start + (ft(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
    }, e.rawTime = function(r) {
      var i = this.parent || this._dp;
      return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Wn(i.rawTime(r), this) : this._tTime : this._tTime
    }, e.revert = function(r) {
      r === void 0 && (r = du);
      var i = Ve;
      return Ve = r, fo(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), Ve = i, this
    }, e.globalTime = function(r) {
      for (var i = this, n = arguments.length ? r : i.rawTime(); i;) n = i._start + n / (Math.abs(i._ts) || 1), i = i._dp;
      return !this.parent && this._sat ? this._sat.globalTime(r) : n
    }, e.repeat = function(r) {
      return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, Ro(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
    }, e.repeatDelay = function(r) {
      if (arguments.length) {
        var i = this._time;
        return this._rDelay = r, Ro(this), i ? this.time(i) : this
      }
      return this._rDelay
    }, e.yoyo = function(r) {
      return arguments.length ? (this._yoyo = r, this) : this._yoyo
    }, e.seek = function(r, i) {
      return this.totalTime(At(this, r), ft(i))
    }, e.restart = function(r, i) {
      return this.play().totalTime(r ? -this._delay : 0, ft(i)), this._dur || (this._zTime = -oe), this
    }, e.play = function(r, i) {
      return r != null && this.seek(r, i), this.reversed(!1).paused(!1)
    }, e.reverse = function(r, i) {
      return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1)
    }, e.pause = function(r, i) {
      return r != null && this.seek(r, i), this.paused(!0)
    }, e.resume = function() {
      return this.paused(!1)
    }, e.reversed = function(r) {
      return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -oe : 0)), this) : this._rts < 0
    }, e.invalidate = function() {
      return this._initted = this._act = 0, this._zTime = -oe, this
    }, e.isActive = function() {
      var r = this.parent || this._dp,
        i = this._start,
        n;
      return !!(!r || this._ts && this._initted && r.isActive() && (n = r.rawTime(!0)) >= i && n < this.endTime(!0) - oe)
    }, e.eventCallback = function(r, i, n) {
      var o = this.vars;
      return arguments.length > 1 ? (i ? (o[r] = i, n && (o[r + "Params"] = n), r === "onUpdate" && (this._onUpdate = i)) : delete o[r], this) : o[r]
    }, e.then = function(r) {
      var i = this,
        n = i._prom;
      return new Promise(function(o) {
        var a = me(r) ? r : Ba,
          l = function() {
            var f = i.then;
            i.then = null, n && n(), me(a) && (a = a(i)) && (a.then || a === i) && (i.then = f), o(a), i.then = f
          };
        i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? l() : i._prom = l
      })
    }, e.kill = function() {
      Bi(this)
    }, s
  })();
kt(un.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -oe,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var ut = (function(s) {
  Pa(e, s);

  function e(r, i) {
    var n;
    return r === void 0 && (r = {}), n = s.call(this, r) || this, n.labels = {}, n.smoothChildTiming = !!r.smoothChildTiming, n.autoRemoveChildren = !!r.autoRemoveChildren, n._sort = ft(r.sortChildren), de && jt(r.parent || de, ar(n), i), r.reversed && n.reverse(), r.paused && n.paused(!0), r.scrollTrigger && Ga(ar(n), r.scrollTrigger), n
  }
  var t = e.prototype;
  return t.to = function(i, n, o) {
    return $i(0, arguments, this), this
  }, t.from = function(i, n, o) {
    return $i(1, arguments, this), this
  }, t.fromTo = function(i, n, o, a) {
    return $i(2, arguments, this), this
  }, t.set = function(i, n, o) {
    return n.duration = 0, n.parent = this, Xi(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new Ee(i, n, At(this, o), 1), this
  }, t.call = function(i, n, o) {
    return jt(this, Ee.delayedCall(0, i, n), o)
  }, t.staggerTo = function(i, n, o, a, l, u, f) {
    return o.duration = n, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = f, o.parent = this, new Ee(i, o, At(this, l)), this
  }, t.staggerFrom = function(i, n, o, a, l, u, f) {
    return o.runBackwards = 1, Xi(o).immediateRender = ft(o.immediateRender), this.staggerTo(i, n, o, a, l, u, f)
  }, t.staggerFromTo = function(i, n, o, a, l, u, f, d) {
    return a.startAt = o, Xi(a).immediateRender = ft(a.immediateRender), this.staggerTo(i, n, a, l, u, f, d)
  }, t.render = function(i, n, o) {
    var a = this._time,
      l = this._dirty ? this.totalDuration() : this._tDur,
      u = this._dur,
      f = i <= 0 ? 0 : fe(i),
      d = this._zTime < 0 != i < 0 && (this._initted || !u),
      p, c, g, h, m, _, w, v, y, x, M, b;
    if (this !== de && f > l && i >= 0 && (f = l), f !== this._tTime || o || d) {
      if (a !== this._time && u && (f += this._time - a, i += this._time - a), p = f, y = this._start, v = this._ts, _ = !v, d && (u || (a = this._zTime), (i || !n) && (this._zTime = i)), this._repeat) {
        if (M = this._yoyo, m = u + this._rDelay, this._repeat < -1 && i < 0) return this.totalTime(m * 100 + i, n, o);
        if (p = fe(f % m), f === l ? (h = this._repeat, p = u) : (x = fe(f / m), h = ~~x, h && h === x && (p = u, h--), p > u && (p = u)), x = Pi(this._tTime, m), !a && this._tTime && x !== h && this._tTime - x * m - this._dur <= 0 && (x = h), M && h & 1 && (p = u - p, b = 1), h !== x && !this._lock) {
          var E = M && x & 1,
            P = E === (M && h & 1);
          if (h < x && (E = !E), a = E ? 0 : f % u ? u : f, this._lock = 1, this.render(a || (b ? 0 : fe(h * m)), n, !u)._lock = 0, this._tTime = f, !n && this.parent && Et(this, "onRepeat"), this.vars.repeatRefresh && !b && (this.invalidate()._lock = 1, x = h), a && a !== this._time || _ !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
          if (u = this._dur, l = this._tDur, P && (this._lock = 2, a = E ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !b && this.invalidate()), this._lock = 0, !this._ts && !_) return this
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (w = wu(this, fe(a), fe(p)), w && (f -= p - (p = w._start))), this._tTime = f, this._time = p, this._act = !!v, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, a = 0), !a && f && u && !n && !x && (Et(this, "onStart"), this._tTime !== f)) return this;
      if (p >= a && i >= 0)
        for (c = this._first; c;) {
          if (g = c._next, (c._act || p >= c._start) && c._ts && w !== c) {
            if (c.parent !== this) return this.render(i, n, o);
            if (c.render(c._ts > 0 ? (p - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (p - c._start) * c._ts, n, o), p !== this._time || !this._ts && !_) {
              w = 0, g && (f += this._zTime = -oe);
              break
            }
          }
          c = g
        } else {
          c = this._last;
          for (var S = i < 0 ? i : p; c;) {
            if (g = c._prev, (c._act || S <= c._end) && c._ts && w !== c) {
              if (c.parent !== this) return this.render(i, n, o);
              if (c.render(c._ts > 0 ? (S - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (S - c._start) * c._ts, n, o || Ve && fo(c)), p !== this._time || !this._ts && !_) {
                w = 0, g && (f += this._zTime = S ? -oe : oe);
                break
              }
            }
            c = g
          }
        }
      if (w && !n && (this.pause(), w.render(p >= a ? 0 : -oe)._zTime = p >= a ? 1 : -1, this._ts)) return this._start = y, ss(this), this.render(i, n, o);
      this._onUpdate && !n && Et(this, "onUpdate", !0), (f === l && this._tTime >= this.totalDuration() || !f && a) && (y === this._start || Math.abs(v) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && (f === l && this._ts > 0 || !f && this._ts < 0) && Dr(this, 1), !n && !(i < 0 && !a) && (f || a || !l) && (Et(this, f === l && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom())))
    }
    return this
  }, t.add = function(i, n) {
    var o = this;
    if (pr(n) || (n = At(this, n, i)), !(i instanceof un)) {
      if (Ke(i)) return i.forEach(function(a) {
        return o.add(a, n)
      }), this;
      if (Ie(i)) return this.addLabel(i, n);
      if (me(i)) i = Ee.delayedCall(0, i);
      else return this
    }
    return this !== i ? jt(this, i, n) : this
  }, t.getChildren = function(i, n, o, a) {
    i === void 0 && (i = !0), n === void 0 && (n = !0), o === void 0 && (o = !0), a === void 0 && (a = -Lt);
    for (var l = [], u = this._first; u;) u._start >= a && (u instanceof Ee ? n && l.push(u) : (o && l.push(u), i && l.push.apply(l, u.getChildren(!0, n, o)))), u = u._next;
    return l
  }, t.getById = function(i) {
    for (var n = this.getChildren(1, 1, 1), o = n.length; o--;)
      if (n[o].vars.id === i) return n[o]
  }, t.remove = function(i) {
    return Ie(i) ? this.removeLabel(i) : me(i) ? this.killTweensOf(i) : (i.parent === this && ns(this, i), i === this._recent && (this._recent = this._last), Kr(this))
  }, t.totalTime = function(i, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = fe(bt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), s.prototype.totalTime.call(this, i, n), this._forcing = 0, this) : this._tTime
  }, t.addLabel = function(i, n) {
    return this.labels[i] = At(this, n), this
  }, t.removeLabel = function(i) {
    return delete this.labels[i], this
  }, t.addPause = function(i, n, o) {
    var a = Ee.delayedCall(0, n || on, o);
    return a.data = "isPause", this._hasPause = 1, jt(this, a, At(this, i))
  }, t.removePause = function(i) {
    var n = this._first;
    for (i = At(this, i); n;) n._start === i && n.data === "isPause" && Dr(n), n = n._next
  }, t.killTweensOf = function(i, n, o) {
    for (var a = this.getTweensOf(i, o), l = a.length; l--;) br !== a[l] && a[l].kill(i, n);
    return this
  }, t.getTweensOf = function(i, n) {
    for (var o = [], a = zt(i), l = this._first, u = pr(n), f; l;) l instanceof Ee ? cu(l._targets, a) && (u ? (!br || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && o.push(l) : (f = l.getTweensOf(a, n)).length && o.push.apply(o, f), l = l._next;
    return o
  }, t.tweenTo = function(i, n) {
    n = n || {};
    var o = this,
      a = At(o, i),
      l = n,
      u = l.startAt,
      f = l.onStart,
      d = l.onStartParams,
      p = l.immediateRender,
      c, g = Ee.to(o, kt({
        ease: n.ease || "none",
        lazy: !1,
        immediateRender: !1,
        time: a,
        overwrite: "auto",
        duration: n.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || oe,
        onStart: function() {
          if (o.pause(), !c) {
            var m = n.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale());
            g._dur !== m && Ci(g, m, 0, 1).render(g._time, !0, !0), c = 1
          }
          f && f.apply(g, d || [])
        }
      }, n));
    return p ? g.render(0) : g
  }, t.tweenFromTo = function(i, n, o) {
    return this.tweenTo(n, kt({
      startAt: {
        time: At(this, i)
      }
    }, o))
  }, t.recent = function() {
    return this._recent
  }, t.nextLabel = function(i) {
    return i === void 0 && (i = this._time), Fo(this, At(this, i))
  }, t.previousLabel = function(i) {
    return i === void 0 && (i = this._time), Fo(this, At(this, i), 1)
  }, t.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + oe)
  }, t.shiftChildren = function(i, n, o) {
    o === void 0 && (o = 0);
    var a = this._first,
      l = this.labels,
      u;
    for (i = fe(i); a;) a._start >= o && (a._start += i, a._end += i), a = a._next;
    if (n)
      for (u in l) l[u] >= o && (l[u] += i);
    return Kr(this)
  }, t.invalidate = function(i) {
    var n = this._first;
    for (this._lock = 0; n;) n.invalidate(i), n = n._next;
    return s.prototype.invalidate.call(this, i)
  }, t.clear = function(i) {
    i === void 0 && (i = !0);
    for (var n = this._first, o; n;) o = n._next, this.remove(n), n = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Kr(this)
  }, t.totalDuration = function(i) {
    var n = 0,
      o = this,
      a = o._last,
      l = Lt,
      u, f, d;
    if (arguments.length) return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -i : i));
    if (o._dirty) {
      for (d = o.parent; a;) u = a._prev, a._dirty && a.totalDuration(), f = a._start, f > l && o._sort && a._ts && !o._lock ? (o._lock = 1, jt(o, a, f - a._delay, 1)._lock = 0) : l = f, f < 0 && a._ts && (n -= f, (!d && !o._dp || d && d.smoothChildTiming) && (o._start += fe(f / o._ts), o._time -= f, o._tTime -= f), o.shiftChildren(-f, !1, -1 / 0), l = 0), a._end > n && a._ts && (n = a._end), a = u;
      Ci(o, o === de && o._time > n ? o._time : n, 1, 1), o._dirty = 0
    }
    return o._tDur
  }, e.updateRoot = function(i) {
    if (de._ts && (Ra(de, Wn(i, de)), La = bt.frame), bt.frame >= Io) {
      Io += Ct.autoSleep || 120;
      var n = de._first;
      if ((!n || !n._ts) && Ct.autoSleep && bt._listeners.length < 2) {
        for (; n && !n._ts;) n = n._next;
        n || bt.sleep()
      }
    }
  }, e
})(un);
kt(ut.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Ru = function(e, t, r, i, n, o, a) {
    var l = new ct(this._pt, e, t, 0, 1, ll, null, n),
      u = 0,
      f = 0,
      d, p, c, g, h, m, _, w;
    for (l.b = r, l.e = i, r += "", i += "", (_ = ~i.indexOf("random(")) && (i = an(i)), o && (w = [r, i], o(w, e, t), r = w[0], i = w[1]), p = r.match(us) || []; d = us.exec(i);) g = d[0], h = i.substring(u, d.index), c ? c = (c + 1) % 5 : h.substr(-5) === "rgba(" && (c = 1), g !== p[f++] && (m = parseFloat(p[f - 1]) || 0, l._pt = {
      _next: l._pt,
      p: h || f === 1 ? h : ",",
      s: m,
      c: g.charAt(1) === "=" ? vi(m, g) - m : parseFloat(g) - m,
      m: c && c < 4 ? Math.round : 0
    }, u = us.lastIndex);
    return l.c = u < i.length ? i.substring(u, i.length) : "", l.fp = a, (Oa.test(i) || _) && (l.e = 0), this._pt = l, l
  },
  co = function(e, t, r, i, n, o, a, l, u, f) {
    me(i) && (i = i(n || 0, e, o));
    var d = e[t],
      p = r !== "get" ? r : me(d) ? u ? e[t.indexOf("set") || !me(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](u) : e[t]() : d,
      c = me(d) ? u ? Gu : ol : ho,
      g;
    if (Ie(i) && (~i.indexOf("random(") && (i = an(i)), i.charAt(1) === "=" && (g = vi(p, i) + (Ue(p) || 0), (g || g === 0) && (i = g))), !f || p !== i || Bs) return !isNaN(p * i) && i !== "" ? (g = new ct(this._pt, e, t, +p || 0, i - (p || 0), typeof d == "boolean" ? Hu : al, 0, c), u && (g.fp = u), a && g.modifier(a, this, e), this._pt = g) : (!d && !(t in e) && oo(t, i), Ru.call(this, e, t, p, i, c, l || Ct.stringFilter, u))
  },
  Fu = function(e, t, r, i, n) {
    if (me(e) && (e = Wi(e, n, t, r, i)), !er(e) || e.style && e.nodeType || Ke(e) || Ma(e)) return Ie(e) ? Wi(e, n, t, r, i) : e;
    var o = {},
      a;
    for (a in e) o[a] = Wi(e[a], n, t, r, i);
    return o
  },
  il = function(e, t, r, i, n, o) {
    var a, l, u, f;
    if (yt[e] && (a = new yt[e]).init(n, a.rawVars ? t[e] : Fu(t[e], i, n, o, r), r, i, o) !== !1 && (r._pt = l = new ct(r._pt, n, e, 0, 1, a.render, a, 0, a.priority), r !== mi))
      for (u = r._ptLookup[r._targets.indexOf(n)], f = a._props.length; f--;) u[a._props[f]] = l;
    return a
  },
  br, Bs, po = function s(e, t, r) {
    var i = e.vars,
      n = i.ease,
      o = i.startAt,
      a = i.immediateRender,
      l = i.lazy,
      u = i.onUpdate,
      f = i.runBackwards,
      d = i.yoyoEase,
      p = i.keyframes,
      c = i.autoRevert,
      g = e._dur,
      h = e._startAt,
      m = e._targets,
      _ = e.parent,
      w = _ && _.data === "nested" ? _.vars.targets : m,
      v = e._overwrite === "auto" && !ro,
      y = e.timeline,
      x = i.easeReverse || d,
      M, b, E, P, S, O, k, A, z, N, I, L, F;
    if (y && (!p || !n) && (n = "none"), e._ease = Qr(n, nn.ease), e._rEase = x && (Qr(x) || e._ease), e._from = !y && !!i.runBackwards, e._from && (e.ratio = 1), !y || p && !i.stagger) {
      if (A = m[0] ? jr(m[0]).harness : 0, L = A && i[A.prop], M = $n(i, ao), h && (h._zTime < 0 && h.progress(1), t < 0 && f && a && !c ? h.render(-1, !0) : h.revert(f && g ? Ln : fu), h._lazy = 0), o) {
        if (Dr(e._startAt = Ee.set(m, kt({
            data: "isStart",
            overwrite: !1,
            parent: _,
            immediateRender: !0,
            lazy: !h && ft(l),
            startAt: null,
            delay: 0,
            onUpdate: u && function() {
              return Et(e, "onUpdate")
            },
            stagger: 0
          }, o))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (Ve || !a && !c) && e._startAt.revert(Ln), a && g && t <= 0 && r <= 0) {
          t && (e._zTime = t);
          return
        }
      } else if (f && g && !h) {
        if (t && (a = !1), E = kt({
            overwrite: !1,
            data: "isFromStart",
            lazy: a && !h && ft(l),
            immediateRender: a,
            stagger: 0,
            parent: _
          }, M), L && (E[A.prop] = L), Dr(e._startAt = Ee.set(m, E)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (Ve ? e._startAt.revert(Ln) : e._startAt.render(-1, !0)), e._zTime = t, !a) s(e._startAt, oe, oe);
        else if (!t) return
      }
      for (e._pt = e._ptCache = 0, l = g && ft(l) || l && !g, b = 0; b < m.length; b++) {
        if (S = m[b], k = S._gsap || uo(m)[b]._gsap, e._ptLookup[b] = N = {}, Ds[k.id] && kr.length && Xn(), I = w === m ? b : w.indexOf(S), A && (z = new A).init(S, L || M, e, I, w) !== !1 && (e._pt = P = new ct(e._pt, S, z.name, 0, 1, z.render, z, 0, z.priority), z._props.forEach(function(q) {
            N[q] = P
          }), z.priority && (O = 1)), !A || L)
          for (E in M) yt[E] && (z = il(E, M, e, I, S, w)) ? z.priority && (O = 1) : N[E] = P = co.call(e, S, E, "get", M[E], I, w, 0, i.stringFilter);
        e._op && e._op[b] && e.kill(S, e._op[b]), v && e._pt && (br = e, de.killTweensOf(S, N, e.globalTime(t)), F = !e.parent, br = 0), e._pt && l && (Ds[k.id] = 1)
      }
      O && ul(e), e._onInit && e._onInit(e)
    }
    e._onUpdate = u, e._initted = (!e._op || e._pt) && !F, p && t <= 0 && y.render(Lt, !0, !0)
  },
  Bu = function(e, t, r, i, n, o, a, l) {
    var u = (e._pt && e._ptCache || (e._ptCache = {}))[t],
      f, d, p, c;
    if (!u)
      for (u = e._ptCache[t] = [], p = e._ptLookup, c = e._targets.length; c--;) {
        if (f = p[c][t], f && f.d && f.d._pt)
          for (f = f.d._pt; f && f.p !== t && f.fp !== t;) f = f._next;
        if (!f) return Bs = 1, e.vars[t] = "+=0", po(e, a), Bs = 0, l ? sn(t + " not eligible for reset. Try splitting into individual properties") : 1;
        u.push(f)
      }
    for (c = u.length; c--;) d = u[c], f = d._pt || d, f.s = (i || i === 0) && !n ? i : f.s + (i || 0) + o * f.c, f.c = r - f.s, d.e && (d.e = ye(r) + Ue(d.e)), d.b && (d.b = f.s + Ue(d.b))
  },
  Nu = function(e, t) {
    var r = e[0] ? jr(e[0]).harness : 0,
      i = r && r.aliases,
      n, o, a, l;
    if (!i) return t;
    n = Ei({}, t);
    for (o in i)
      if (o in n)
        for (l = i[o].split(","), a = l.length; a--;) n[l[a]] = n[o];
    return n
  },
  Vu = function(e, t, r, i) {
    var n = t.ease || i || "power1.inOut",
      o, a;
    if (Ke(t)) a = r[e] || (r[e] = []), t.forEach(function(l, u) {
      return a.push({
        t: u / (t.length - 1) * 100,
        v: l,
        e: n
      })
    });
    else
      for (o in t) a = r[o] || (r[o] = []), o === "ease" || a.push({
        t: parseFloat(e),
        v: t[o],
        e: n
      })
  },
  Wi = function(e, t, r, i, n) {
    return me(e) ? e.call(t, r, i, n) : Ie(e) && ~e.indexOf("random(") ? an(e) : e
  },
  nl = lo + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",
  sl = {};
dt(nl + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return sl[s] = 1
});
var Ee = (function(s) {
  Pa(e, s);

  function e(r, i, n, o) {
    var a;
    typeof i == "number" && (n.duration = i, i = n, n = null), a = s.call(this, o ? i : Xi(i)) || this;
    var l = a.vars,
      u = l.duration,
      f = l.delay,
      d = l.immediateRender,
      p = l.stagger,
      c = l.overwrite,
      g = l.keyframes,
      h = l.defaults,
      m = l.scrollTrigger,
      _ = i.parent || de,
      w = (Ke(r) || Ma(r) ? pr(r[0]) : "length" in i) ? [r] : zt(r),
      v, y, x, M, b, E, P, S;
    if (a._targets = w.length ? uo(w) : sn("GSAP target " + r + " not found. https://gsap.com", !Ct.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = c, g || p || vn(u) || vn(f)) {
      i = a.vars;
      var O = i.easeReverse || i.yoyoEase;
      if (v = a.timeline = new ut({
          data: "nested",
          defaults: h || {},
          targets: _ && _.data === "nested" ? _.vars.targets : w
        }), v.kill(), v.parent = v._dp = ar(a), v._start = 0, p || vn(u) || vn(f)) {
        if (M = w.length, P = p && Xa(p), er(p))
          for (b in p) ~nl.indexOf(b) && (S || (S = {}), S[b] = p[b]);
        for (y = 0; y < M; y++) x = $n(i, sl), x.stagger = 0, O && (x.easeReverse = O), S && Ei(x, S), E = w[y], x.duration = +Wi(u, ar(a), y, E, w), x.delay = (+Wi(f, ar(a), y, E, w) || 0) - a._delay, !p && M === 1 && x.delay && (a._delay = f = x.delay, a._start += f, x.delay = 0), v.to(E, x, P ? P(y, E, w) : 0), v._ease = Z.none;
        v.duration() ? u = f = 0 : a.timeline = 0
      } else if (g) {
        Xi(kt(v.vars.defaults, {
          ease: "none"
        })), v._ease = Qr(g.ease || i.ease || "none");
        var k = 0,
          A, z, N;
        if (Ke(g)) g.forEach(function(I) {
          return v.to(w, I, ">")
        }), v.duration();
        else {
          x = {};
          for (b in g) b === "ease" || b === "easeEach" || Vu(b, g[b], x, g.easeEach);
          for (b in x)
            for (A = x[b].sort(function(I, L) {
                return I.t - L.t
              }), k = 0, y = 0; y < A.length; y++) z = A[y], N = {
              ease: z.e,
              duration: (z.t - (y ? A[y - 1].t : 0)) / 100 * u
            }, N[b] = z.v, v.to(w, N, k), k += N.duration;
          v.duration() < u && v.to({}, {
            duration: u - v.duration()
          })
        }
      }
      u || a.duration(u = v.duration())
    } else a.timeline = 0;
    return c === !0 && !ro && (br = ar(a), de.killTweensOf(w), br = 0), jt(_, ar(a), n), i.reversed && a.reverse(), i.paused && a.paused(!0), (d || !u && !g && a._start === fe(_._time) && ft(d) && mu(ar(a)) && _.data !== "nested") && (a._tTime = -oe, a.render(Math.max(0, -f) || 0)), m && Ga(ar(a), m), a
  }
  var t = e.prototype;
  return t.render = function(i, n, o) {
    var a = this._time,
      l = this._tDur,
      u = this._dur,
      f = i < 0,
      d = i > l - oe && !f ? l : i < oe ? 0 : i,
      p, c, g, h, m, _, w, v;
    if (!u) vu(this, i, n, o);
    else if (d !== this._tTime || !i || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f || this._lazy) {
      if (p = d, v = this.timeline, this._repeat) {
        if (h = u + this._rDelay, this._repeat < -1 && f) return this.totalTime(h * 100 + i, n, o);
        if (p = fe(d % h), d === l ? (g = this._repeat, p = u) : (m = fe(d / h), g = ~~m, g && g === m ? (p = u, g--) : p > u && (p = u)), _ = this._yoyo && g & 1, _ && (p = u - p), m = Pi(this._tTime, h), p === a && !o && this._initted && g === m) return this._tTime = d, this;
        g !== m && this.vars.repeatRefresh && !_ && !this._lock && p !== h && this._initted && (this._lock = o = 1, this.render(fe(h * g), !0).invalidate()._lock = 0)
      }
      if (!this._initted) {
        if (Ya(this, f ? i : p, o, n, d)) return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && g !== m)) return this;
        if (u !== this._dur) return this.render(i, n, o)
      }
      if (this._rEase) {
        var y = p < a;
        if (y !== this._inv) {
          var x = y ? a : u - a;
          this._inv = y, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = a, this._invRecip = x ? (y ? -1 : 1) / x : 0, this._invScale = y ? -this.ratio : 1 - this.ratio, this._invEase = y ? this._rEase : this._ease
        }
        this.ratio = w = this._invRatio + this._invScale * this._invEase((p - this._invTime) * this._invRecip)
      } else this.ratio = w = this._ease(p / u);
      if (this._from && (this.ratio = w = 1 - w), this._tTime = d, this._time = p, !this._act && this._ts && (this._act = 1, this._lazy = 0), !a && d && !n && !m && (Et(this, "onStart"), this._tTime !== d)) return this;
      for (c = this._pt; c;) c.r(w, c.d), c = c._next;
      v && v.render(i < 0 ? i : v._dur * v._ease(p / this._dur), n, o) || this._startAt && (this._zTime = i), this._onUpdate && !n && (f && Is(this, i, n, o), Et(this, "onUpdate")), this._repeat && g !== m && this.vars.onRepeat && !n && this.parent && Et(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (f && !this._onUpdate && Is(this, i, !0, !0), (i || !u) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && Dr(this, 1), !n && !(f && !a) && (d || a || _) && (Et(this, d === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom()))
    }
    return this
  }, t.targets = function() {
    return this._targets
  }, t.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), s.prototype.invalidate.call(this, i)
  }, t.resetTo = function(i, n, o, a, l) {
    ln || bt.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
      f;
    return this._initted || po(this, u), f = this._ease(u / this._dur), Bu(this, i, n, o, a, f, u, l) ? this.resetTo(i, n, o, a, 1) : (os(this, 0), this.parent || Na(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
  }, t.kill = function(i, n) {
    if (n === void 0 && (n = "all"), !i && (!n || n === "all")) return this._lazy = this._pt = 0, this.parent ? Bi(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Ve), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, n, br && br.vars.overwrite !== !0)._first || Bi(this), this.parent && o !== this.timeline.totalDuration() && Ci(this, this._dur * this.timeline._tDur / o, 0, 1), this
    }
    var a = this._targets,
      l = i ? zt(i) : a,
      u = this._ptLookup,
      f = this._pt,
      d, p, c, g, h, m, _;
    if ((!n || n === "all") && hu(a, l)) return n === "all" && (this._pt = 0), Bi(this);
    for (d = this._op = this._op || [], n !== "all" && (Ie(n) && (h = {}, dt(n, function(w) {
        return h[w] = 1
      }), n = h), n = Nu(a, n)), _ = a.length; _--;)
      if (~l.indexOf(a[_])) {
        p = u[_], n === "all" ? (d[_] = n, g = p, c = {}) : (c = d[_] = d[_] || {}, g = n);
        for (h in g) m = p && p[h], m && ((!("kill" in m.d) || m.d.kill(h) === !0) && ns(this, m, "_pt"), delete p[h]), c !== "all" && (c[h] = 1)
      } return this._initted && !this._pt && f && Bi(this), this
  }, e.to = function(i, n) {
    return new e(i, n, arguments[2])
  }, e.from = function(i, n) {
    return $i(1, arguments)
  }, e.delayedCall = function(i, n, o, a) {
    return new e(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: i,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    })
  }, e.fromTo = function(i, n, o) {
    return $i(2, arguments)
  }, e.set = function(i, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new e(i, n)
  }, e.killTweensOf = function(i, n, o) {
    return de.killTweensOf(i, n, o)
  }, e
})(un);
kt(Ee.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
dt("staggerTo,staggerFrom,staggerFromTo", function(s) {
  Ee[s] = function() {
    var e = new ut,
      t = zs.call(arguments, 0);
    return t.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), e[s].apply(e, t)
  }
});
var ho = function(e, t, r) {
    return e[t] = r
  },
  ol = function(e, t, r) {
    return e[t](r)
  },
  Gu = function(e, t, r, i) {
    return e[t](i.fp, r)
  },
  Yu = function(e, t, r) {
    return e.setAttribute(t, r)
  },
  go = function(e, t) {
    return me(e[t]) ? ol : io(e[t]) && e.setAttribute ? Yu : ho
  },
  al = function(e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t)
  },
  Hu = function(e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t)
  },
  ll = function(e, t) {
    var r = t._pt,
      i = "";
    if (!e && t.b) i = t.b;
    else if (e === 1 && t.e) i = t.e;
    else {
      for (; r;) i = r.p + (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) + i, r = r._next;
      i += t.c
    }
    t.set(t.t, t.p, i, t)
  },
  mo = function(e, t) {
    for (var r = t._pt; r;) r.r(e, r.d), r = r._next
  },
  qu = function(e, t, r, i) {
    for (var n = this._pt, o; n;) o = n._next, n.p === i && n.modifier(e, t, r), n = o
  },
  Xu = function(e) {
    for (var t = this._pt, r, i; t;) i = t._next, t.p === e && !t.op || t.op === e ? ns(this, t, "_pt") : t.dep || (r = 1), t = i;
    return !r
  },
  $u = function(e, t, r, i) {
    i.mSet(e, t, i.m.call(i.tween, r, i.mt), i)
  },
  ul = function(e) {
    for (var t = e._pt, r, i, n, o; t;) {
      for (r = t._next, i = n; i && i.pr > t.pr;) i = i._next;
      (t._prev = i ? i._prev : o) ? t._prev._next = t: n = t, (t._next = i) ? i._prev = t : o = t, t = r
    }
    e._pt = n
  },
  ct = (function() {
    function s(t, r, i, n, o, a, l, u, f) {
      this.t = r, this.s = n, this.c = o, this.p = i, this.r = a || al, this.d = l || this, this.set = u || ho, this.pr = f || 0, this._next = t, t && (t._prev = this)
    }
    var e = s.prototype;
    return e.modifier = function(r, i, n) {
      this.mSet = this.mSet || this.set, this.set = $u, this.m = r, this.mt = n, this.tween = i
    }, s
  })();
dt(lo + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(s) {
  return ao[s] = 1
});
Mt.TweenMax = Mt.TweenLite = Ee;
Mt.TimelineLite = Mt.TimelineMax = ut;
de = new ut({
  sortChildren: !1,
  defaults: nn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Ct.stringFilter = el;
var Zr = [],
  Rn = {},
  Wu = [],
  No = 0,
  Uu = 0,
  hs = function(e) {
    return (Rn[e] || Wu).map(function(t) {
      return t()
    })
  },
  Ns = function() {
    var e = Date.now(),
      t = [];
    e - No > 2 && (hs("matchMediaInit"), Zr.forEach(function(r) {
      var i = r.queries,
        n = r.conditions,
        o, a, l, u;
      for (a in i) o = Wt.matchMedia(i[a]).matches, o && (l = 1), o !== n[a] && (n[a] = o, u = 1);
      u && (r.revert(), l && t.push(r))
    }), hs("matchMediaRevert"), t.forEach(function(r) {
      return r.onMatch(r, function(i) {
        return r.add(null, i)
      })
    }), No = e, hs("matchMedia"))
  },
  fl = (function() {
    function s(t, r) {
      this.selector = r && Rs(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Uu++, t && this.add(t)
    }
    var e = s.prototype;
    return e.add = function(r, i, n) {
      me(r) && (n = i, i = r, r = me);
      var o = this,
        a = function() {
          var u = le,
            f = o.selector,
            d;
          return u && u !== o && u.data.push(o), n && (o.selector = Rs(n)), le = o, d = i.apply(o, arguments), me(d) && o._r.push(d), le = u, o.selector = f, o.isReverted = !1, d
        };
      return o.last = a, r === me ? a(o, function(l) {
        return o.add(null, l)
      }) : r ? o[r] = a : a
    }, e.ignore = function(r) {
      var i = le;
      le = null, r(this), le = i
    }, e.getTweens = function() {
      var r = [];
      return this.data.forEach(function(i) {
        return i instanceof s ? r.push.apply(r, i.getTweens()) : i instanceof Ee && !(i.parent && i.parent.data === "nested") && r.push(i)
      }), r
    }, e.clear = function() {
      this._r.length = this.data.length = 0
    }, e.kill = function(r, i) {
      var n = this;
      if (r ? (function() {
          for (var a = n.getTweens(), l = n.data.length, u; l--;) u = n.data[l], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(f) {
            return a.splice(a.indexOf(f), 1)
          }));
          for (a.map(function(f) {
              return {
                g: f._dur || f._delay || f._sat && !f._sat.vars.immediateRender ? f.globalTime(0) : -1 / 0,
                t: f
              }
            }).sort(function(f, d) {
              return d.g - f.g || -1 / 0
            }).forEach(function(f) {
              return f.t.revert(r)
            }), l = n.data.length; l--;) u = n.data[l], u instanceof ut ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof Ee) && u.revert && u.revert(r);
          n._r.forEach(function(f) {
            return f(r, n)
          }), n.isReverted = !0
        })() : this.data.forEach(function(a) {
          return a.kill && a.kill()
        }), this.clear(), i)
        for (var o = Zr.length; o--;) Zr[o].id === this.id && Zr.splice(o, 1)
    }, e.revert = function(r) {
      this.kill(r || {})
    }, s
  })(),
  ju = (function() {
    function s(t) {
      this.contexts = [], this.scope = t, le && le.data.push(this)
    }
    var e = s.prototype;
    return e.add = function(r, i, n) {
      er(r) || (r = {
        matches: r
      });
      var o = new fl(0, n || this.scope),
        a = o.conditions = {},
        l, u, f;
      le && !o.selector && (o.selector = le.selector), this.contexts.push(o), i = o.add("onMatch", i), o.queries = r;
      for (u in r) u === "all" ? f = 1 : (l = Wt.matchMedia(r[u]), l && (Zr.indexOf(o) < 0 && Zr.push(o), (a[u] = l.matches) && (f = 1), l.addListener ? l.addListener(Ns) : l.addEventListener("change", Ns)));
      return f && i(o, function(d) {
        return o.add(null, d)
      }), this
    }, e.revert = function(r) {
      this.kill(r || {})
    }, e.kill = function(r) {
      this.contexts.forEach(function(i) {
        return i.kill(r, !0)
      })
    }, s
  })(),
  Un = {
    registerPlugin: function() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
      t.forEach(function(i) {
        return Qa(i)
      })
    },
    timeline: function(e) {
      return new ut(e)
    },
    getTweensOf: function(e, t) {
      return de.getTweensOf(e, t)
    },
    getProperty: function(e, t, r, i) {
      Ie(e) && (e = zt(e)[0]);
      var n = jr(e || {}).get,
        o = r ? Ba : Fa;
      return r === "native" && (r = ""), e && (t ? o((yt[t] && yt[t].get || n)(e, t, r, i)) : function(a, l, u) {
        return o((yt[a] && yt[a].get || n)(e, a, l, u))
      })
    },
    quickSetter: function(e, t, r) {
      if (e = zt(e), e.length > 1) {
        var i = e.map(function(f) {
            return ht.quickSetter(f, t, r)
          }),
          n = i.length;
        return function(f) {
          for (var d = n; d--;) i[d](f)
        }
      }
      e = e[0] || {};
      var o = yt[t],
        a = jr(e),
        l = a.harness && (a.harness.aliases || {})[t] || t,
        u = o ? function(f) {
          var d = new o;
          mi._pt = 0, d.init(e, r ? f + r : f, mi, 0, [e]), d.render(1, d), mi._pt && mo(1, mi)
        } : a.set(e, l);
      return o ? u : function(f) {
        return u(e, l, r ? f + r : f, a, 1)
      }
    },
    quickTo: function(e, t, r) {
      var i, n = ht.to(e, kt((i = {}, i[t] = "+=0.1", i.paused = !0, i.stagger = 0, i), r || {})),
        o = function(l, u, f) {
          return n.resetTo(t, l, u, f)
        };
      return o.tween = n, o
    },
    isTweening: function(e) {
      return de.getTweensOf(e, !0).length > 0
    },
    defaults: function(e) {
      return e && e.ease && (e.ease = Qr(e.ease, nn.ease)), Lo(nn, e || {})
    },
    config: function(e) {
      return Lo(Ct, e || {})
    },
    registerEffect: function(e) {
      var t = e.name,
        r = e.effect,
        i = e.plugins,
        n = e.defaults,
        o = e.extendTimeline;
      (i || "").split(",").forEach(function(a) {
        return a && !yt[a] && !Mt[a] && sn(t + " effect requires " + a + " plugin.")
      }), fs[t] = function(a, l, u) {
        return r(zt(a), kt(l || {}, n), u)
      }, o && (ut.prototype[t] = function(a, l, u) {
        return this.add(fs[t](a, er(l) ? l : (u = l) && {}, this), u)
      })
    },
    registerEase: function(e, t) {
      Z[e] = Qr(t)
    },
    parseEase: function(e, t) {
      return arguments.length ? Qr(e, t) : Z
    },
    getById: function(e) {
      return de.getById(e)
    },
    exportRoot: function(e, t) {
      e === void 0 && (e = {});
      var r = new ut(e),
        i, n;
      for (r.smoothChildTiming = ft(e.smoothChildTiming), de.remove(r), r._dp = 0, r._time = r._tTime = de._time, i = de._first; i;) n = i._next, (t || !(!i._dur && i instanceof Ee && i.vars.onComplete === i._targets[0])) && jt(r, i, i._start - i._delay), i = n;
      return jt(de, r, 0), r
    },
    context: function(e, t) {
      return e ? new fl(e, t) : le
    },
    matchMedia: function(e) {
      return new ju(e)
    },
    matchMediaRefresh: function() {
      return Zr.forEach(function(e) {
        var t = e.conditions,
          r, i;
        for (i in t) t[i] && (t[i] = !1, r = 1);
        r && e.revert()
      }) || Ns()
    },
    addEventListener: function(e, t) {
      var r = Rn[e] || (Rn[e] = []);
      ~r.indexOf(t) || r.push(t)
    },
    removeEventListener: function(e, t) {
      var r = Rn[e],
        i = r && r.indexOf(t);
      i >= 0 && r.splice(i, 1)
    },
    utils: {
      wrap: Pu,
      wrapYoyo: Cu,
      distribute: Xa,
      random: Wa,
      snap: $a,
      normalize: Eu,
      getUnit: Ue,
      clamp: xu,
      splitColor: Za,
      toArray: zt,
      selector: Rs,
      mapRange: ja,
      pipe: bu,
      unitize: Su,
      interpolate: Mu,
      shuffle: qa
    },
    install: Da,
    effects: fs,
    ticker: bt,
    updateRoot: ut.updateRoot,
    plugins: yt,
    globalTimeline: de,
    core: {
      PropTween: ct,
      globals: Ia,
      Tween: Ee,
      Timeline: ut,
      Animation: un,
      getCache: jr,
      _removeLinkedListItem: ns,
      reverting: function() {
        return Ve
      },
      context: function(e) {
        return e && le && (le.data.push(e), e._ctx = le), le
      },
      suppressOverwrites: function(e) {
        return ro = e
      }
    }
  };
dt("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return Un[s] = Ee[s]
});
bt.add(ut.updateRoot);
mi = Un.to({}, {
  duration: 0
});
var Ku = function(e, t) {
    for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t;) r = r._next;
    return r
  },
  Qu = function(e, t) {
    var r = e._targets,
      i, n, o;
    for (i in t)
      for (n = r.length; n--;) o = e._ptLookup[n][i], o && (o = o.d) && (o._pt && (o = Ku(o, i)), o && o.modifier && o.modifier(t[i], e, r[n], i))
  },
  gs = function(e, t) {
    return {
      name: e,
      headless: 1,
      rawVars: 1,
      init: function(i, n, o) {
        o._onInit = function(a) {
          var l, u;
          if (Ie(n) && (l = {}, dt(n, function(f) {
              return l[f] = 1
            }), n = l), t) {
            l = {};
            for (u in n) l[u] = t(n[u]);
            n = l
          }
          Qu(a, n)
        }
      }
    }
  },
  ht = Un.registerPlugin({
    name: "attr",
    init: function(e, t, r, i, n) {
      var o, a, l;
      this.tween = r;
      for (o in t) l = e.getAttribute(o) || "", a = this.add(e, "setAttribute", (l || 0) + "", t[o], i, n, 0, 0, o), a.op = o, a.b = l, this._props.push(o)
    },
    render: function(e, t) {
      for (var r = t._pt; r;) Ve ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next
    }
  }, {
    name: "endArray",
    headless: 1,
    init: function(e, t) {
      for (var r = t.length; r--;) this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1)
    }
  }, gs("roundProps", Fs), gs("modifiers"), gs("snap", $a)) || Un;
Ee.version = ut.version = ht.version = "3.15.0";
Aa = 1;
no() && Mi();
Z.Power0;
Z.Power1;
Z.Power2;
Z.Power3;
Z.Power4;
Z.Linear;
Z.Quad;
Z.Cubic;
Z.Quart;
Z.Quint;
Z.Strong;
Z.Elastic;
Z.Back;
Z.SteppedEase;
Z.Bounce;
Z.Sine;
Z.Expo;
Z.Circ;
var Vo, Sr, wi, _o, Wr, Go, vo, Zu = function() {
    return typeof window < "u"
  },
  hr = {},
  qr = 180 / Math.PI,
  yi = Math.PI / 180,
  ui = Math.atan2,
  Yo = 1e8,
  wo = /([A-Z])/g,
  Ju = /(left|right|width|margin|padding|x)/i,
  ef = /[\s,\(]\S/,
  Kt = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  },
  Vs = function(e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
  },
  tf = function(e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
  },
  rf = function(e, t) {
    return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t)
  },
  nf = function(e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t)
  },
  sf = function(e, t) {
    var r = t.s + t.c * e;
    t.set(t.t, t.p, ~~(r + (r < 0 ? -.5 : .5)) + t.u, t)
  },
  dl = function(e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t)
  },
  cl = function(e, t) {
    return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t)
  },
  of = function(e, t, r) {
    return e.style[t] = r
  },
  af = function(e, t, r) {
    return e.style.setProperty(t, r)
  },
  lf = function(e, t, r) {
    return e._gsap[t] = r
  },
  uf = function(e, t, r) {
    return e._gsap.scaleX = e._gsap.scaleY = r
  },
  ff = function(e, t, r, i, n) {
    var o = e._gsap;
    o.scaleX = o.scaleY = r, o.renderTransform(n, o)
  },
  df = function(e, t, r, i, n) {
    var o = e._gsap;
    o[t] = r, o.renderTransform(n, o)
  },
  ce = "transform",
  pt = ce + "Origin",
  cf = function s(e, t) {
    var r = this,
      i = this.target,
      n = i.style,
      o = i._gsap;
    if (e in hr && n) {
      if (this.tfm = this.tfm || {}, e !== "transform") e = Kt[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(a) {
        return r.tfm[a] = lr(i, a)
      }) : this.tfm[e] = o.x ? o[e] : lr(i, e), e === pt && (this.tfm.zOrigin = o.zOrigin);
      else return Kt.transform.split(",").forEach(function(a) {
        return s.call(r, a, t)
      });
      if (this.props.indexOf(ce) >= 0) return;
      o.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(pt, t, "")), e = ce
    }(n || t) && this.props.push(e, t, n[e])
  },
  pl = function(e) {
    e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"))
  },
  pf = function() {
    var e = this.props,
      t = this.target,
      r = t.style,
      i = t._gsap,
      n, o;
    for (n = 0; n < e.length; n += 3) e[n + 1] ? e[n + 1] === 2 ? t[e[n]](e[n + 2]) : t[e[n]] = e[n + 2] : e[n + 2] ? r[e[n]] = e[n + 2] : r.removeProperty(e[n].substr(0, 2) === "--" ? e[n] : e[n].replace(wo, "-$1").toLowerCase());
    if (this.tfm) {
      for (o in this.tfm) i[o] = this.tfm[o];
      i.svg && (i.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), n = vo(), (!n || !n.isStart) && !r[ce] && (pl(r), i.zOrigin && r[pt] && (r[pt] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1)
    }
  },
  hl = function(e, t) {
    var r = {
      target: e,
      props: [],
      revert: pf,
      save: cf
    };
    return e._gsap || ht.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(i) {
      return r.save(i)
    }), r
  },
  gl, Gs = function(e, t) {
    var r = Sr.createElementNS ? Sr.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Sr.createElement(e);
    return r && r.style ? r : Sr.createElement(e)
  },
  Pt = function s(e, t, r) {
    var i = getComputedStyle(e);
    return i[t] || i.getPropertyValue(t.replace(wo, "-$1").toLowerCase()) || i.getPropertyValue(t) || !r && s(e, ki(t) || t, 1) || ""
  },
  Ho = "O,Moz,ms,Ms,Webkit".split(","),
  ki = function(e, t, r) {
    var i = t || Wr,
      n = i.style,
      o = 5;
    if (e in n && !r) return e;
    for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(Ho[o] + e in n););
    return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Ho[o] : "") + e
  },
  Ys = function() {
    Zu() && window.document && (Vo = window, Sr = Vo.document, wi = Sr.documentElement, Wr = Gs("div") || {
      style: {}
    }, Gs("div"), ce = ki(ce), pt = ce + "Origin", Wr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", gl = !!ki("perspective"), vo = ht.core.reverting, _o = 1)
  },
  qo = function(e) {
    var t = e.ownerSVGElement,
      r = Gs("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      i = e.cloneNode(!0),
      n;
    i.style.display = "block", r.appendChild(i), wi.appendChild(r);
    try {
      n = i.getBBox()
    } catch {}
    return r.removeChild(i), wi.removeChild(r), n
  },
  Xo = function(e, t) {
    for (var r = t.length; r--;)
      if (e.hasAttribute(t[r])) return e.getAttribute(t[r])
  },
  ml = function(e) {
    var t, r;
    try {
      t = e.getBBox()
    } catch {
      t = qo(e), r = 1
    }
    return t && (t.width || t.height) || r || (t = qo(e)), t && !t.width && !t.x && !t.y ? {
      x: +Xo(e, ["x", "cx", "x1"]) || 0,
      y: +Xo(e, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : t
  },
  _l = function(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && ml(e))
  },
  Ir = function(e, t) {
    if (t) {
      var r = e.style,
        i;
      t in hr && t !== pt && (t = ce), r.removeProperty ? (i = t.substr(0, 2), (i === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), r.removeProperty(i === "--" ? t : t.replace(wo, "-$1").toLowerCase())) : r.removeAttribute(t)
    }
  },
  Er = function(e, t, r, i, n, o) {
    var a = new ct(e._pt, t, r, 0, 1, o ? cl : dl);
    return e._pt = a, a.b = i, a.e = n, e._props.push(r), a
  },
  $o = {
    deg: 1,
    rad: 1,
    turn: 1
  },
  hf = {
    grid: 1,
    flex: 1
  },
  Lr = function s(e, t, r, i) {
    var n = parseFloat(r) || 0,
      o = (r + "").trim().substr((n + "").length) || "px",
      a = Wr.style,
      l = Ju.test(t),
      u = e.tagName.toLowerCase() === "svg",
      f = (u ? "client" : "offset") + (l ? "Width" : "Height"),
      d = 100,
      p = i === "px",
      c = i === "%",
      g, h, m, _;
    if (i === o || !n || $o[i] || $o[o]) return n;
    if (o !== "px" && !p && (n = s(e, t, r, "px")), _ = e.getCTM && _l(e), (c || o === "%") && (hr[t] || ~t.indexOf("adius"))) return g = _ ? e.getBBox()[l ? "width" : "height"] : e[f], ye(c ? n / g * d : n / 100 * g);
    if (a[l ? "width" : "height"] = d + (p ? o : i), h = i !== "rem" && ~t.indexOf("adius") || i === "em" && e.appendChild && !u ? e : e.parentNode, _ && (h = (e.ownerSVGElement || {}).parentNode), (!h || h === Sr || !h.appendChild) && (h = Sr.body), m = h._gsap, m && c && m.width && l && m.time === bt.time && !m.uncache) return ye(n / m.width * d);
    if (c && (t === "height" || t === "width")) {
      var w = e.style[t];
      e.style[t] = d + i, g = e[f], w ? e.style[t] = w : Ir(e, t)
    } else(c || o === "%") && !hf[Pt(h, "display")] && (a.position = Pt(e, "position")), h === e && (a.position = "static"), h.appendChild(Wr), g = Wr[f], h.removeChild(Wr), a.position = "absolute";
    return l && c && (m = jr(h), m.time = bt.time, m.width = h[f]), ye(p ? g * n / d : g && n ? d / g * n : 0)
  },
  lr = function(e, t, r, i) {
    var n;
    return _o || Ys(), t in Kt && t !== "transform" && (t = Kt[t], ~t.indexOf(",") && (t = t.split(",")[0])), hr[t] && t !== "transform" ? (n = dn(e, i), n = t !== "transformOrigin" ? n[t] : n.svg ? n.origin : Kn(Pt(e, pt)) + " " + n.zOrigin + "px") : (n = e.style[t], (!n || n === "auto" || i || ~(n + "").indexOf("calc(")) && (n = jn[t] && jn[t](e, t, r) || Pt(e, t) || za(e, t) || (t === "opacity" ? 1 : 0))), r && !~(n + "").trim().indexOf(" ") ? Lr(e, t, n, r) + r : n
  },
  gf = function(e, t, r, i) {
    if (!r || r === "none") {
      var n = ki(t, e, 1),
        o = n && Pt(e, n, 1);
      o && o !== r ? (t = n, r = o) : t === "borderColor" && (r = Pt(e, "borderTopColor"))
    }
    var a = new ct(this._pt, e.style, t, 0, 1, ll),
      l = 0,
      u = 0,
      f, d, p, c, g, h, m, _, w, v, y, x;
    if (a.b = r, a.e = i, r += "", i += "", i.substring(0, 6) === "var(--" && (i = Pt(e, i.substring(4, i.indexOf(")")))), i === "auto" && (h = e.style[t], e.style[t] = i, i = Pt(e, t) || i, h ? e.style[t] = h : Ir(e, t)), f = [r, i], el(f), r = f[0], i = f[1], p = r.match(gi) || [], x = i.match(gi) || [], x.length) {
      for (; d = gi.exec(i);) m = d[0], w = i.substring(l, d.index), g ? g = (g + 1) % 5 : (w.substr(-5) === "rgba(" || w.substr(-5) === "hsla(") && (g = 1), m !== (h = p[u++] || "") && (c = parseFloat(h) || 0, y = h.substr((c + "").length), m.charAt(1) === "=" && (m = vi(c, m) + y), _ = parseFloat(m), v = m.substr((_ + "").length), l = gi.lastIndex - v.length, v || (v = v || Ct.units[t] || y, l === i.length && (i += v, a.e += v)), y !== v && (c = Lr(e, t, h, v) || 0), a._pt = {
        _next: a._pt,
        p: w || u === 1 ? w : ",",
        s: c,
        c: _ - c,
        m: g && g < 4 || t === "zIndex" ? Math.round : 0
      });
      a.c = l < i.length ? i.substring(l, i.length) : ""
    } else a.r = t === "display" && i === "none" ? cl : dl;
    return Oa.test(i) && (a.e = 0), this._pt = a, a
  },
  Wo = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  },
  mf = function(e) {
    var t = e.split(" "),
      r = t[0],
      i = t[1] || "50%";
    return (r === "top" || r === "bottom" || i === "left" || i === "right") && (e = r, r = i, i = e), t[0] = Wo[r] || r, t[1] = Wo[i] || i, t.join(" ")
  },
  _f = function(e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
      var r = t.t,
        i = r.style,
        n = t.u,
        o = r._gsap,
        a, l, u;
      if (n === "all" || n === !0) i.cssText = "", l = 1;
      else
        for (n = n.split(","), u = n.length; --u > -1;) a = n[u], hr[a] && (l = 1, a = a === "transformOrigin" ? pt : ce), Ir(r, a);
      l && (Ir(r, ce), o && (o.svg && r.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", dn(r, 1), o.uncache = 1, pl(i)))
    }
  },
  jn = {
    clearProps: function(e, t, r, i, n) {
      if (n.data !== "isFromStart") {
        var o = e._pt = new ct(e._pt, t, r, 0, 0, _f);
        return o.u = i, o.pr = -10, o.tween = n, e._props.push(r), 1
      }
    }
  },
  fn = [1, 0, 0, 1, 0, 0],
  vl = {},
  wl = function(e) {
    return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e
  },
  Uo = function(e) {
    var t = Pt(e, ce);
    return wl(t) ? fn : t.substr(7).match(ka).map(ye)
  },
  yo = function(e, t) {
    var r = e._gsap || jr(e),
      i = e.style,
      n = Uo(e),
      o, a, l, u;
    return r.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? fn : n) : (n === fn && !e.offsetParent && e !== wi && !r.svg && (l = i.display, i.display = "block", o = e.parentNode, (!o || !e.offsetParent && !e.getBoundingClientRect().width) && (u = 1, a = e.nextElementSibling, wi.appendChild(e)), n = Uo(e), l ? i.display = l : Ir(e, "display"), u && (a ? o.insertBefore(e, a) : o ? o.appendChild(e) : wi.removeChild(e))), t && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n)
  },
  Hs = function(e, t, r, i, n, o) {
    var a = e._gsap,
      l = n || yo(e, !0),
      u = a.xOrigin || 0,
      f = a.yOrigin || 0,
      d = a.xOffset || 0,
      p = a.yOffset || 0,
      c = l[0],
      g = l[1],
      h = l[2],
      m = l[3],
      _ = l[4],
      w = l[5],
      v = t.split(" "),
      y = parseFloat(v[0]) || 0,
      x = parseFloat(v[1]) || 0,
      M, b, E, P;
    r ? l !== fn && (b = c * m - g * h) && (E = y * (m / b) + x * (-h / b) + (h * w - m * _) / b, P = y * (-g / b) + x * (c / b) - (c * w - g * _) / b, y = E, x = P) : (M = ml(e), y = M.x + (~v[0].indexOf("%") ? y / 100 * M.width : y), x = M.y + (~(v[1] || v[0]).indexOf("%") ? x / 100 * M.height : x)), i || i !== !1 && a.smooth ? (_ = y - u, w = x - f, a.xOffset = d + (_ * c + w * h) - _, a.yOffset = p + (_ * g + w * m) - w) : a.xOffset = a.yOffset = 0, a.xOrigin = y, a.yOrigin = x, a.smooth = !!i, a.origin = t, a.originIsAbsolute = !!r, e.style[pt] = "0px 0px", o && (Er(o, a, "xOrigin", u, y), Er(o, a, "yOrigin", f, x), Er(o, a, "xOffset", d, a.xOffset), Er(o, a, "yOffset", p, a.yOffset)), e.setAttribute("data-svg-origin", y + " " + x)
  },
  dn = function(e, t) {
    var r = e._gsap || new rl(e);
    if ("x" in r && !t && !r.uncache) return r;
    var i = e.style,
      n = r.scaleX < 0,
      o = "px",
      a = "deg",
      l = getComputedStyle(e),
      u = Pt(e, pt) || "0",
      f, d, p, c, g, h, m, _, w, v, y, x, M, b, E, P, S, O, k, A, z, N, I, L, F, q, T, ie, ze, Ft, pe, Re;
    return f = d = p = h = m = _ = w = v = y = 0, c = g = 1, r.svg = !!(e.getCTM && _l(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (i[ce] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[ce] !== "none" ? l[ce] : "")), i.scale = i.rotate = i.translate = "none"), b = yo(e, r.svg), r.svg && (r.uncache ? (F = e.getBBox(), u = r.xOrigin - F.x + "px " + (r.yOrigin - F.y) + "px", L = "") : L = !t && e.getAttribute("data-svg-origin"), Hs(e, L || u, !!L || r.originIsAbsolute, r.smooth !== !1, b)), x = r.xOrigin || 0, M = r.yOrigin || 0, b !== fn && (O = b[0], k = b[1], A = b[2], z = b[3], f = N = b[4], d = I = b[5], b.length === 6 ? (c = Math.sqrt(O * O + k * k), g = Math.sqrt(z * z + A * A), h = O || k ? ui(k, O) * qr : 0, w = A || z ? ui(A, z) * qr + h : 0, w && (g *= Math.abs(Math.cos(w * yi))), r.svg && (f -= x - (x * O + M * A), d -= M - (x * k + M * z))) : (Re = b[6], Ft = b[7], T = b[8], ie = b[9], ze = b[10], pe = b[11], f = b[12], d = b[13], p = b[14], E = ui(Re, ze), m = E * qr, E && (P = Math.cos(-E), S = Math.sin(-E), L = N * P + T * S, F = I * P + ie * S, q = Re * P + ze * S, T = N * -S + T * P, ie = I * -S + ie * P, ze = Re * -S + ze * P, pe = Ft * -S + pe * P, N = L, I = F, Re = q), E = ui(-A, ze), _ = E * qr, E && (P = Math.cos(-E), S = Math.sin(-E), L = O * P - T * S, F = k * P - ie * S, q = A * P - ze * S, pe = z * S + pe * P, O = L, k = F, A = q), E = ui(k, O), h = E * qr, E && (P = Math.cos(E), S = Math.sin(E), L = O * P + k * S, F = N * P + I * S, k = k * P - O * S, I = I * P - N * S, O = L, N = F), m && Math.abs(m) + Math.abs(h) > 359.9 && (m = h = 0, _ = 180 - _), c = ye(Math.sqrt(O * O + k * k + A * A)), g = ye(Math.sqrt(I * I + Re * Re)), E = ui(N, I), w = Math.abs(E) > 2e-4 ? E * qr : 0, y = pe ? 1 / (pe < 0 ? -pe : pe) : 0), r.svg && (L = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !wl(Pt(e, ce)), L && e.setAttribute("transform", L))), Math.abs(w) > 90 && Math.abs(w) < 270 && (n ? (c *= -1, w += h <= 0 ? 180 : -180, h += h <= 0 ? 180 : -180) : (g *= -1, w += w <= 0 ? 180 : -180)), t = t || r.uncache, r.x = f - ((r.xPercent = f && (!t && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + o, r.y = d - ((r.yPercent = d && (!t && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + o, r.z = p + o, r.scaleX = ye(c), r.scaleY = ye(g), r.rotation = ye(h) + a, r.rotationX = ye(m) + a, r.rotationY = ye(_) + a, r.skewX = w + a, r.skewY = v + a, r.transformPerspective = y + o, (r.zOrigin = parseFloat(u.split(" ")[2]) || !t && r.zOrigin || 0) && (i[pt] = Kn(u)), r.xOffset = r.yOffset = 0, r.force3D = Ct.force3D, r.renderTransform = r.svg ? wf : gl ? yl : vf, r.uncache = 0, r
  },
  Kn = function(e) {
    return (e = e.split(" "))[0] + " " + e[1]
  },
  ms = function(e, t, r) {
    var i = Ue(t);
    return ye(parseFloat(t) + parseFloat(Lr(e, "x", r + "px", i))) + i
  },
  vf = function(e, t) {
    t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, yl(e, t)
  },
  Yr = "0deg",
  zi = "0px",
  Hr = ") ",
  yl = function(e, t) {
    var r = t || this,
      i = r.xPercent,
      n = r.yPercent,
      o = r.x,
      a = r.y,
      l = r.z,
      u = r.rotation,
      f = r.rotationY,
      d = r.rotationX,
      p = r.skewX,
      c = r.skewY,
      g = r.scaleX,
      h = r.scaleY,
      m = r.transformPerspective,
      _ = r.force3D,
      w = r.target,
      v = r.zOrigin,
      y = "",
      x = _ === "auto" && e && e !== 1 || _ === !0;
    if (v && (d !== Yr || f !== Yr)) {
      var M = parseFloat(f) * yi,
        b = Math.sin(M),
        E = Math.cos(M),
        P;
      M = parseFloat(d) * yi, P = Math.cos(M), o = ms(w, o, b * P * -v), a = ms(w, a, -Math.sin(M) * -v), l = ms(w, l, E * P * -v + v)
    }
    m !== zi && (y += "perspective(" + m + Hr), (i || n) && (y += "translate(" + i + "%, " + n + "%) "), (x || o !== zi || a !== zi || l !== zi) && (y += l !== zi || x ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + Hr), u !== Yr && (y += "rotate(" + u + Hr), f !== Yr && (y += "rotateY(" + f + Hr), d !== Yr && (y += "rotateX(" + d + Hr), (p !== Yr || c !== Yr) && (y += "skew(" + p + ", " + c + Hr), (g !== 1 || h !== 1) && (y += "scale(" + g + ", " + h + Hr), w.style[ce] = y || "translate(0, 0)"
  },
  wf = function(e, t) {
    var r = t || this,
      i = r.xPercent,
      n = r.yPercent,
      o = r.x,
      a = r.y,
      l = r.rotation,
      u = r.skewX,
      f = r.skewY,
      d = r.scaleX,
      p = r.scaleY,
      c = r.target,
      g = r.xOrigin,
      h = r.yOrigin,
      m = r.xOffset,
      _ = r.yOffset,
      w = r.forceCSS,
      v = parseFloat(o),
      y = parseFloat(a),
      x, M, b, E, P;
    l = parseFloat(l), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, l += f), l || u ? (l *= yi, u *= yi, x = Math.cos(l) * d, M = Math.sin(l) * d, b = Math.sin(l - u) * -p, E = Math.cos(l - u) * p, u && (f *= yi, P = Math.tan(u - f), P = Math.sqrt(1 + P * P), b *= P, E *= P, f && (P = Math.tan(f), P = Math.sqrt(1 + P * P), x *= P, M *= P)), x = ye(x), M = ye(M), b = ye(b), E = ye(E)) : (x = d, E = p, M = b = 0), (v && !~(o + "").indexOf("px") || y && !~(a + "").indexOf("px")) && (v = Lr(c, "x", o, "px"), y = Lr(c, "y", a, "px")), (g || h || m || _) && (v = ye(v + g - (g * x + h * b) + m), y = ye(y + h - (g * M + h * E) + _)), (i || n) && (P = c.getBBox(), v = ye(v + i / 100 * P.width), y = ye(y + n / 100 * P.height)), P = "matrix(" + x + "," + M + "," + b + "," + E + "," + v + "," + y + ")", c.setAttribute("transform", P), w && (c.style[ce] = P)
  },
  yf = function(e, t, r, i, n) {
    var o = 360,
      a = Ie(n),
      l = parseFloat(n) * (a && ~n.indexOf("rad") ? qr : 1),
      u = l - i,
      f = i + u + "deg",
      d, p;
    return a && (d = n.split("_")[1], d === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), d === "cw" && u < 0 ? u = (u + o * Yo) % o - ~~(u / o) * o : d === "ccw" && u > 0 && (u = (u - o * Yo) % o - ~~(u / o) * o)), e._pt = p = new ct(e._pt, t, r, i, u, tf), p.e = f, p.u = "deg", e._props.push(r), p
  },
  jo = function(e, t) {
    for (var r in t) e[r] = t[r];
    return e
  },
  xf = function(e, t, r) {
    var i = jo({}, r._gsap),
      n = "perspective,force3D,transformOrigin,svgOrigin",
      o = r.style,
      a, l, u, f, d, p, c, g;
    i.svg ? (u = r.getAttribute("transform"), r.setAttribute("transform", ""), o[ce] = t, a = dn(r, 1), Ir(r, ce), r.setAttribute("transform", u)) : (u = getComputedStyle(r)[ce], o[ce] = t, a = dn(r, 1), o[ce] = u);
    for (l in hr) u = i[l], f = a[l], u !== f && n.indexOf(l) < 0 && (c = Ue(u), g = Ue(f), d = c !== g ? Lr(r, l, u, g) : parseFloat(u), p = parseFloat(f), e._pt = new ct(e._pt, a, l, d, p - d, Vs), e._pt.u = g || 0, e._props.push(l));
    jo(a, i)
  };
dt("padding,margin,Width,Radius", function(s, e) {
  var t = "Top",
    r = "Right",
    i = "Bottom",
    n = "Left",
    o = (e < 3 ? [t, r, i, n] : [t + n, t + r, i + r, i + n]).map(function(a) {
      return e < 2 ? s + a : "border" + a + s
    });
  jn[e > 1 ? "border" + s : s] = function(a, l, u, f, d) {
    var p, c;
    if (arguments.length < 4) return p = o.map(function(g) {
      return lr(a, g, u)
    }), c = p.join(" "), c.split(p[0]).length === 5 ? p[0] : c;
    p = (f + "").split(" "), c = {}, o.forEach(function(g, h) {
      return c[g] = p[h] = p[h] || p[(h - 1) / 2 | 0]
    }), a.init(l, c, d)
  }
});
var xl = {
  name: "css",
  register: Ys,
  targetTest: function(e) {
    return e.style && e.nodeType
  },
  init: function(e, t, r, i, n) {
    var o = this._props,
      a = e.style,
      l = r.vars.startAt,
      u, f, d, p, c, g, h, m, _, w, v, y, x, M, b, E, P;
    _o || Ys(), this.styles = this.styles || hl(e), E = this.styles.props, this.tween = r;
    for (h in t)
      if (h !== "autoRound" && (f = t[h], !(yt[h] && il(h, t, r, i, e, n)))) {
        if (c = typeof f, g = jn[h], c === "function" && (f = f.call(r, i, e, n), c = typeof f), c === "string" && ~f.indexOf("random(") && (f = an(f)), g) g(this, e, h, f, r) && (b = 1);
        else if (h.substr(0, 2) === "--") u = (getComputedStyle(e).getPropertyValue(h) + "").trim(), f += "", Or.lastIndex = 0, Or.test(u) || (m = Ue(u), _ = Ue(f), _ ? m !== _ && (u = Lr(e, h, u, _) + _) : m && (f += m)), this.add(a, "setProperty", u, f, i, n, 0, 0, h), o.push(h), E.push(h, 0, a[h]);
        else if (c !== "undefined") {
          if (l && h in l ? (u = typeof l[h] == "function" ? l[h].call(r, i, e, n) : l[h], Ie(u) && ~u.indexOf("random(") && (u = an(u)), Ue(u + "") || u === "auto" || (u += Ct.units[h] || Ue(lr(e, h)) || ""), (u + "").charAt(1) === "=" && (u = lr(e, h))) : u = lr(e, h), p = parseFloat(u), w = c === "string" && f.charAt(1) === "=" && f.substr(0, 2), w && (f = f.substr(2)), d = parseFloat(f), h in Kt && (h === "autoAlpha" && (p === 1 && lr(e, "visibility") === "hidden" && d && (p = 0), E.push("visibility", 0, a.visibility), Er(this, a, "visibility", p ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), h !== "scale" && h !== "transform" && (h = Kt[h], ~h.indexOf(",") && (h = h.split(",")[0]))), v = h in hr, v) {
            if (this.styles.save(h), P = f, c === "string" && f.substring(0, 6) === "var(--") {
              if (f = Pt(e, f.substring(4, f.indexOf(")"))), f.substring(0, 5) === "calc(") {
                var S = e.style.perspective;
                e.style.perspective = f, f = Pt(e, "perspective"), S ? e.style.perspective = S : Ir(e, "perspective")
              }
              d = parseFloat(f)
            }
            if (y || (x = e._gsap, x.renderTransform && !t.parseTransform || dn(e, t.parseTransform), M = t.smoothOrigin !== !1 && x.smooth, y = this._pt = new ct(this._pt, a, ce, 0, 1, x.renderTransform, x, 0, -1), y.dep = 1), h === "scale") this._pt = new ct(this._pt, x, "scaleY", x.scaleY, (w ? vi(x.scaleY, w + d) : d) - x.scaleY || 0, Vs), this._pt.u = 0, o.push("scaleY", h), h += "X";
            else if (h === "transformOrigin") {
              E.push(pt, 0, a[pt]), f = mf(f), x.svg ? Hs(e, f, 0, M, 0, this) : (_ = parseFloat(f.split(" ")[2]) || 0, _ !== x.zOrigin && Er(this, x, "zOrigin", x.zOrigin, _), Er(this, a, h, Kn(u), Kn(f)));
              continue
            } else if (h === "svgOrigin") {
              Hs(e, f, 1, M, 0, this);
              continue
            } else if (h in vl) {
              yf(this, x, h, p, w ? vi(p, w + f) : f);
              continue
            } else if (h === "smoothOrigin") {
              Er(this, x, "smooth", x.smooth, f);
              continue
            } else if (h === "force3D") {
              x[h] = f;
              continue
            } else if (h === "transform") {
              xf(this, f, e);
              continue
            }
          } else h in a || (h = ki(h) || h);
          if (v || (d || d === 0) && (p || p === 0) && !ef.test(f) && h in a) m = (u + "").substr((p + "").length), d || (d = 0), _ = Ue(f) || (h in Ct.units ? Ct.units[h] : m), m !== _ && (p = Lr(e, h, u, _)), this._pt = new ct(this._pt, v ? x : a, h, p, (w ? vi(p, w + d) : d) - p, !v && (_ === "px" || h === "zIndex") && t.autoRound !== !1 ? sf : Vs), this._pt.u = _ || 0, v && P !== f ? (this._pt.b = u, this._pt.e = P, this._pt.r = nf) : m !== _ && _ !== "%" && (this._pt.b = u, this._pt.r = rf);
          else if (h in a) gf.call(this, e, h, u, w ? w + f : f);
          else if (h in e) this.add(e, h, u || e[h], w ? w + f : f, i, n);
          else if (h !== "parseTransform") {
            oo(h, f);
            continue
          }
          v || (h in a ? E.push(h, 0, a[h]) : typeof e[h] == "function" ? E.push(h, 2, e[h]()) : E.push(h, 1, u || e[h])), o.push(h)
        }
      } b && ul(this)
  },
  render: function(e, t) {
    if (t.tween._time || !vo())
      for (var r = t._pt; r;) r.r(e, r.d), r = r._next;
    else t.styles.revert()
  },
  get: lr,
  aliases: Kt,
  getSetter: function(e, t, r) {
    var i = Kt[t];
    return i && i.indexOf(",") < 0 && (t = i), t in hr && t !== pt && (e._gsap.x || lr(e, "x")) ? r && Go === r ? t === "scale" ? uf : lf : (Go = r || {}) && (t === "scale" ? ff : df) : e.style && !io(e.style[t]) ? of : ~t.indexOf("-") ? af : go(e, t)
  },
  core: {
    _removeProperty: Ir,
    _getMatrix: yo
  }
};
ht.utils.checkPrefix = ki;
ht.core.getStyleSaver = hl;
(function(s, e, t, r) {
  var i = dt(s + "," + e + "," + t, function(n) {
    hr[n] = 1
  });
  dt(e, function(n) {
    Ct.units[n] = "deg", vl[n] = 1
  }), Kt[i[13]] = s + "," + e, dt(r, function(n) {
    var o = n.split(":");
    Kt[o[1]] = i[o[0]]
  })
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
dt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  Ct.units[s] = "px"
});
ht.registerPlugin(xl);
var K = ht.registerPlugin(xl) || ht;
K.core.Tween;

function Tf(s, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(s, r.key, r)
  }
}

function bf(s, e, t) {
  return e && Tf(s.prototype, e), s
}
var Ne, Fn, St, Pr, Cr, xi, Tl, Xr, Ti, bl, dr, Ht, Sl, El = function() {
    return Ne || typeof window < "u" && (Ne = window.gsap) && Ne.registerPlugin && Ne
  },
  Pl = 1,
  _i = [],
  U = [],
  Jt = [],
  Ui = Date.now,
  qs = function(e, t) {
    return t
  },
  Sf = function() {
    var e = Ti.core,
      t = e.bridge || {},
      r = e._scrollers,
      i = e._proxies;
    r.push.apply(r, U), i.push.apply(i, Jt), U = r, Jt = i, qs = function(o, a) {
      return t[o](a)
    }
  },
  Ar = function(e, t) {
    return ~Jt.indexOf(e) && Jt[Jt.indexOf(e) + 1][t]
  },
  ji = function(e) {
    return !!~bl.indexOf(e)
  },
  tt = function(e, t, r, i, n) {
    return e.addEventListener(t, r, {
      passive: i !== !1,
      capture: !!n
    })
  },
  et = function(e, t, r, i) {
    return e.removeEventListener(t, r, !!i)
  },
  wn = "scrollLeft",
  yn = "scrollTop",
  Xs = function() {
    return dr && dr.isPressed || U.cache++
  },
  Qn = function(e, t) {
    var r = function i(n) {
      if (n || n === 0) {
        Pl && (St.history.scrollRestoration = "manual");
        var o = dr && dr.isPressed;
        n = i.v = Math.round(n) || (dr && dr.iOS ? 1 : 0), e(n), i.cacheID = U.cache, o && qs("ss", n)
      } else(t || U.cache !== i.cacheID || qs("ref")) && (i.cacheID = U.cache, i.v = e());
      return i.v + i.offset
    };
    return r.offset = 0, e && r
  },
  st = {
    s: wn,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: Qn(function(s) {
      return arguments.length ? St.scrollTo(s, Me.sc()) : St.pageXOffset || Pr[wn] || Cr[wn] || xi[wn] || 0
    })
  },
  Me = {
    s: yn,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: st,
    sc: Qn(function(s) {
      return arguments.length ? St.scrollTo(st.sc(), s) : St.pageYOffset || Pr[yn] || Cr[yn] || xi[yn] || 0
    })
  },
  at = function(e, t) {
    return (t && t._ctx && t._ctx.selector || Ne.utils.toArray)(e)[0] || (typeof e == "string" && Ne.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null)
  },
  Ef = function(e, t) {
    for (var r = t.length; r--;)
      if (t[r] === e || t[r].contains(e)) return !0;
    return !1
  },
  zr = function(e, t) {
    var r = t.s,
      i = t.sc;
    ji(e) && (e = Pr.scrollingElement || Cr);
    var n = U.indexOf(e),
      o = i === Me.sc ? 1 : 2;
    !~n && (n = U.push(e) - 1), U[n + o] || tt(e, "scroll", Xs);
    var a = U[n + o],
      l = a || (U[n + o] = Qn(Ar(e, r), !0) || (ji(e) ? i : Qn(function(u) {
        return arguments.length ? e[r] = u : e[r]
      })));
    return l.target = e, a || (l.smooth = Ne.getProperty(e, "scrollBehavior") === "smooth"), l
  },
  $s = function(e, t, r) {
    var i = e,
      n = e,
      o = Ui(),
      a = o,
      l = t || 50,
      u = Math.max(500, l * 3),
      f = function(g, h) {
        var m = Ui();
        h || m - o > l ? (n = i, i = g, a = o, o = m) : r ? i += g : i = n + (g - n) / (m - a) * (o - a)
      },
      d = function() {
        n = i = r ? 0 : i, a = o = 0
      },
      p = function(g) {
        var h = a,
          m = n,
          _ = Ui();
        return (g || g === 0) && g !== i && f(g), o === a || _ - a > u ? 0 : (i + (r ? m : -m)) / ((r ? _ : o) - h) * 1e3
      };
    return {
      update: f,
      reset: d,
      getVelocity: p
    }
  },
  Ri = function(e, t) {
    return t && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e
  },
  Ko = function(e) {
    var t = Math.max.apply(Math, e),
      r = Math.min.apply(Math, e);
    return Math.abs(t) >= Math.abs(r) ? t : r
  },
  Cl = function() {
    Ti = Ne.core.globals().ScrollTrigger, Ti && Ti.core && Sf()
  },
  Ml = function(e) {
    return Ne = e || El(), !Fn && Ne && typeof document < "u" && document.body && (St = window, Pr = document, Cr = Pr.documentElement, xi = Pr.body, bl = [St, Pr, Cr, xi], Ne.utils.clamp, Sl = Ne.core.context || function() {}, Xr = "onpointerenter" in xi ? "pointer" : "mouse", Tl = xe.isTouch = St.matchMedia && St.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in St || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ht = xe.eventTypes = ("ontouchstart" in Cr ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Cr ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
      return Pl = 0
    }, 500), Fn = 1), Ti || Cl(), Fn
  };
st.op = Me;
U.cache = 0;
var xe = (function() {
  function s(t) {
    this.init(t)
  }
  var e = s.prototype;
  return e.init = function(r) {
    Fn || Ml(Ne) || console.warn("Please gsap.registerPlugin(Observer)"), Ti || Cl();
    var i = r.tolerance,
      n = r.dragMinimum,
      o = r.type,
      a = r.target,
      l = r.lineHeight,
      u = r.debounce,
      f = r.preventDefault,
      d = r.onStop,
      p = r.onStopDelay,
      c = r.ignore,
      g = r.wheelSpeed,
      h = r.event,
      m = r.onDragStart,
      _ = r.onDragEnd,
      w = r.onDrag,
      v = r.onPress,
      y = r.onRelease,
      x = r.onRight,
      M = r.onLeft,
      b = r.onUp,
      E = r.onDown,
      P = r.onChangeX,
      S = r.onChangeY,
      O = r.onChange,
      k = r.onToggleX,
      A = r.onToggleY,
      z = r.onHover,
      N = r.onHoverEnd,
      I = r.onMove,
      L = r.ignoreCheck,
      F = r.isNormalizer,
      q = r.onGestureStart,
      T = r.onGestureEnd,
      ie = r.onWheel,
      ze = r.onEnable,
      Ft = r.onDisable,
      pe = r.onClick,
      Re = r.scrollSpeed,
      Ge = r.capture,
      Te = r.allowClicks,
      Qe = r.lockAxis,
      Ye = r.onLockAxis;
    this.target = a = at(a) || Cr, this.vars = r, c && (c = Ne.utils.toArray(c)), i = i || 1e-9, n = n || 0, g = g || 1, Re = Re || 1, o = o || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(St.getComputedStyle(xi).lineHeight) || 22);
    var mr, Ze, Je, J, _e, ot, gt, C = this,
      mt = 0,
      tr = 0,
      _r = r.passive || !f && r.passive !== !1,
      he = zr(a, st),
      rr = zr(a, Me),
      vr = he(),
      Fr = rr(),
      ke = ~o.indexOf("touch") && !~o.indexOf("pointer") && Ht[0] === "pointerdown",
      wr = ji(a),
      ve = a.ownerDocument || Pr,
      Bt = [0, 0, 0],
      Ot = [0, 0, 0],
      ir = 0,
      Ai = function() {
        return ir = Ui()
      },
      be = function(V, ee) {
        return (C.event = V) && c && Ef(V.target, c) || ee && ke && V.pointerType !== "touch" || L && L(V, ee)
      },
      gn = function() {
        C._vx.reset(), C._vy.reset(), Ze.pause(), d && d(C)
      },
      nr = function() {
        var V = C.deltaX = Ko(Bt),
          ee = C.deltaY = Ko(Ot),
          D = Math.abs(V) >= i,
          G = Math.abs(ee) >= i;
        O && (D || G) && O(C, V, ee, Bt, Ot), D && (x && C.deltaX > 0 && x(C), M && C.deltaX < 0 && M(C), P && P(C), k && C.deltaX < 0 != mt < 0 && k(C), mt = C.deltaX, Bt[0] = Bt[1] = Bt[2] = 0), G && (E && C.deltaY > 0 && E(C), b && C.deltaY < 0 && b(C), S && S(C), A && C.deltaY < 0 != tr < 0 && A(C), tr = C.deltaY, Ot[0] = Ot[1] = Ot[2] = 0), (J || Je) && (I && I(C), Je && (m && Je === 1 && m(C), w && w(C), Je = 0), J = !1), ot && !(ot = !1) && Ye && Ye(C), _e && (ie(C), _e = !1), mr = 0
      },
      oi = function(V, ee, D) {
        Bt[D] += V, Ot[D] += ee, C._vx.update(V), C._vy.update(ee), u ? mr || (mr = requestAnimationFrame(nr)) : nr()
      },
      ai = function(V, ee) {
        Qe && !gt && (C.axis = gt = Math.abs(V) > Math.abs(ee) ? "x" : "y", ot = !0), gt !== "y" && (Bt[2] += V, C._vx.update(V, !0)), gt !== "x" && (Ot[2] += ee, C._vy.update(ee, !0)), u ? mr || (mr = requestAnimationFrame(nr)) : nr()
      },
      yr = function(V) {
        if (!be(V, 1)) {
          V = Ri(V, f);
          var ee = V.clientX,
            D = V.clientY,
            G = ee - C.x,
            B = D - C.y,
            Y = C.isDragging;
          C.x = ee, C.y = D, (Y || (G || B) && (Math.abs(C.startX - ee) >= n || Math.abs(C.startY - D) >= n)) && (Je || (Je = Y ? 2 : 1), Y || (C.isDragging = !0), ai(G, B))
        }
      },
      Br = C.onPress = function(H) {
        be(H, 1) || H && H.button || (C.axis = gt = null, Ze.pause(), C.isPressed = !0, H = Ri(H), mt = tr = 0, C.startX = C.x = H.clientX, C.startY = C.y = H.clientY, C._vx.reset(), C._vy.reset(), tt(F ? a : ve, Ht[1], yr, _r, !0), C.deltaX = C.deltaY = 0, v && v(C))
      },
      j = C.onRelease = function(H) {
        if (!be(H, 1)) {
          et(F ? a : ve, Ht[1], yr, !0);
          var V = !isNaN(C.y - C.startY),
            ee = C.isDragging,
            D = ee && (Math.abs(C.x - C.startX) > 3 || Math.abs(C.y - C.startY) > 3),
            G = Ri(H);
          !D && V && (C._vx.reset(), C._vy.reset(), f && Te && Ne.delayedCall(.08, function() {
            if (Ui() - ir > 300 && !H.defaultPrevented) {
              if (H.target.click) H.target.click();
              else if (ve.createEvent) {
                var B = ve.createEvent("MouseEvents");
                B.initMouseEvent("click", !0, !0, St, 1, G.screenX, G.screenY, G.clientX, G.clientY, !1, !1, !1, !1, 0, null), H.target.dispatchEvent(B)
              }
            }
          })), C.isDragging = C.isGesturing = C.isPressed = !1, d && ee && !F && Ze.restart(!0), Je && nr(), _ && ee && _(C), y && y(C, D)
        }
      },
      Nr = function(V) {
        return V.touches && V.touches.length > 1 && (C.isGesturing = !0) && q(V, C.isDragging)
      },
      Nt = function() {
        return (C.isGesturing = !1) || T(C)
      },
      Vt = function(V) {
        if (!be(V)) {
          var ee = he(),
            D = rr();
          oi((ee - vr) * Re, (D - Fr) * Re, 1), vr = ee, Fr = D, d && Ze.restart(!0)
        }
      },
      Gt = function(V) {
        if (!be(V)) {
          V = Ri(V, f), ie && (_e = !0);
          var ee = (V.deltaMode === 1 ? l : V.deltaMode === 2 ? St.innerHeight : 1) * g;
          oi(V.deltaX * ee, V.deltaY * ee, 0), d && !F && Ze.restart(!0)
        }
      },
      Vr = function(V) {
        if (!be(V)) {
          var ee = V.clientX,
            D = V.clientY,
            G = ee - C.x,
            B = D - C.y;
          C.x = ee, C.y = D, J = !0, d && Ze.restart(!0), (G || B) && ai(G, B)
        }
      },
      li = function(V) {
        C.event = V, z(C)
      },
      sr = function(V) {
        C.event = V, N(C)
      },
      Di = function(V) {
        return be(V) || Ri(V, f) && pe(C)
      };
    Ze = C._dc = Ne.delayedCall(p || .25, gn).pause(), C.deltaX = C.deltaY = 0, C._vx = $s(0, 50, !0), C._vy = $s(0, 50, !0), C.scrollX = he, C.scrollY = rr, C.isDragging = C.isGesturing = C.isPressed = !1, Sl(this), C.enable = function(H) {
      return C.isEnabled || (tt(wr ? ve : a, "scroll", Xs), o.indexOf("scroll") >= 0 && tt(wr ? ve : a, "scroll", Vt, _r, Ge), o.indexOf("wheel") >= 0 && tt(a, "wheel", Gt, _r, Ge), (o.indexOf("touch") >= 0 && Tl || o.indexOf("pointer") >= 0) && (tt(a, Ht[0], Br, _r, Ge), tt(ve, Ht[2], j), tt(ve, Ht[3], j), Te && tt(a, "click", Ai, !0, !0), pe && tt(a, "click", Di), q && tt(ve, "gesturestart", Nr), T && tt(ve, "gestureend", Nt), z && tt(a, Xr + "enter", li), N && tt(a, Xr + "leave", sr), I && tt(a, Xr + "move", Vr)), C.isEnabled = !0, C.isDragging = C.isGesturing = C.isPressed = J = Je = !1, C._vx.reset(), C._vy.reset(), vr = he(), Fr = rr(), H && H.type && Br(H), ze && ze(C)), C
    }, C.disable = function() {
      C.isEnabled && (_i.filter(function(H) {
        return H !== C && ji(H.target)
      }).length || et(wr ? ve : a, "scroll", Xs), C.isPressed && (C._vx.reset(), C._vy.reset(), et(F ? a : ve, Ht[1], yr, !0)), et(wr ? ve : a, "scroll", Vt, Ge), et(a, "wheel", Gt, Ge), et(a, Ht[0], Br, Ge), et(ve, Ht[2], j), et(ve, Ht[3], j), et(a, "click", Ai, !0), et(a, "click", Di), et(ve, "gesturestart", Nr), et(ve, "gestureend", Nt), et(a, Xr + "enter", li), et(a, Xr + "leave", sr), et(a, Xr + "move", Vr), C.isEnabled = C.isPressed = C.isDragging = !1, Ft && Ft(C))
    }, C.kill = C.revert = function() {
      C.disable();
      var H = _i.indexOf(C);
      H >= 0 && _i.splice(H, 1), dr === C && (dr = 0)
    }, _i.push(C), F && ji(a) && (dr = C), C.enable(h)
  }, bf(s, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity()
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity()
    }
  }]), s
})();
xe.version = "3.15.0";
xe.create = function(s) {
  return new xe(s)
};
xe.register = Ml;
xe.getAll = function() {
  return _i.slice()
};
xe.getById = function(s) {
  return _i.filter(function(e) {
    return e.vars.id === s
  })[0]
};
El() && Ne.registerPlugin(xe);
var R, pi, W, re, Tt, te, xo, Zn, cn, Ki, Vi, xn, $e, as, Ws, it, Qo, Zo, hi, kl, _s, Ol, rt, Us, Al, Dl, Tr, js, To, bi, bo, Qi, Ks, vs, Tn = 1,
  We = Date.now,
  ws = We(),
  Rt = 0,
  Gi = 0,
  Jo = function(e, t, r) {
    var i = wt(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
    return r["_" + t + "Clamp"] = i, i ? e.substr(6, e.length - 7) : e
  },
  ea = function(e, t) {
    return t && (!wt(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e
  },
  Pf = function s() {
    return Gi && requestAnimationFrame(s)
  },
  ta = function() {
    return as = 1
  },
  ra = function() {
    return as = 0
  },
  Ut = function(e) {
    return e
  },
  Yi = function(e) {
    return Math.round(e * 1e5) / 1e5 || 0
  },
  Il = function() {
    return typeof window < "u"
  },
  Ll = function() {
    return R || Il() && (R = window.gsap) && R.registerPlugin && R
  },
  ri = function(e) {
    return !!~xo.indexOf(e)
  },
  zl = function(e) {
    return (e === "Height" ? bo : W["inner" + e]) || Tt["client" + e] || te["client" + e]
  },
  Rl = function(e) {
    return Ar(e, "getBoundingClientRect") || (ri(e) ? function() {
      return Yn.width = W.innerWidth, Yn.height = bo, Yn
    } : function() {
      return ur(e)
    })
  },
  Cf = function(e, t, r) {
    var i = r.d,
      n = r.d2,
      o = r.a;
    return (o = Ar(e, "getBoundingClientRect")) ? function() {
      return o()[i]
    } : function() {
      return (t ? zl(n) : e["client" + n]) || 0
    }
  },
  Mf = function(e, t) {
    return !t || ~Jt.indexOf(e) ? Rl(e) : function() {
      return Yn
    }
  },
  Qt = function(e, t) {
    var r = t.s,
      i = t.d2,
      n = t.d,
      o = t.a;
    return Math.max(0, (r = "scroll" + i) && (o = Ar(e, r)) ? o() - Rl(e)()[n] : ri(e) ? (Tt[r] || te[r]) - zl(i) : e[r] - e["offset" + i])
  },
  bn = function(e, t) {
    for (var r = 0; r < hi.length; r += 3)(!t || ~t.indexOf(hi[r + 1])) && e(hi[r], hi[r + 1], hi[r + 2])
  },
  wt = function(e) {
    return typeof e == "string"
  },
  je = function(e) {
    return typeof e == "function"
  },
  Hi = function(e) {
    return typeof e == "number"
  },
  $r = function(e) {
    return typeof e == "object"
  },
  Fi = function(e, t, r) {
    return e && e.progress(t ? 0 : 1) && r && e.pause()
  },
  fi = function(e, t, r) {
    if (e.enabled) {
      var i = e._ctx ? e._ctx.add(function() {
        return t(e, r)
      }) : t(e, r);
      i && i.totalTime && (e.callbackAnimation = i)
    }
  },
  di = Math.abs,
  Fl = "left",
  Bl = "top",
  So = "right",
  Eo = "bottom",
  Jr = "width",
  ei = "height",
  Zi = "Right",
  Ji = "Left",
  en = "Top",
  tn = "Bottom",
  Se = "padding",
  Dt = "margin",
  Oi = "Width",
  Po = "Height",
  Ce = "px",
  It = function(e) {
    return W.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e)
  },
  kf = function(e) {
    var t = It(e).position;
    e.style.position = t === "absolute" || t === "fixed" ? t : "relative"
  },
  ia = function(e, t) {
    for (var r in t) r in e || (e[r] = t[r]);
    return e
  },
  ur = function(e, t) {
    var r = t && It(e)[Ws] !== "matrix(1, 0, 0, 1, 0, 0)" && R.to(e, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0
      }).progress(1),
      i = e.getBoundingClientRect ? e.getBoundingClientRect() : e.scrollingElement.getBoundingClientRect();
    return r && r.progress(0).kill(), i
  },
  Jn = function(e, t) {
    var r = t.d2;
    return e["offset" + r] || e["client" + r] || 0
  },
  Nl = function(e) {
    var t = [],
      r = e.labels,
      i = e.duration(),
      n;
    for (n in r) t.push(r[n] / i);
    return t
  },
  Of = function(e) {
    return function(t) {
      return R.utils.snap(Nl(e), t)
    }
  },
  Co = function(e) {
    var t = R.utils.snap(e),
      r = Array.isArray(e) && e.slice(0).sort(function(i, n) {
        return i - n
      });
    return r ? function(i, n, o) {
      o === void 0 && (o = .001);
      var a;
      if (!n) return t(i);
      if (n > 0) {
        for (i -= o, a = 0; a < r.length; a++)
          if (r[a] >= i) return r[a];
        return r[a - 1]
      } else
        for (a = r.length, i += o; a--;)
          if (r[a] <= i) return r[a];
      return r[0]
    } : function(i, n, o) {
      o === void 0 && (o = .001);
      var a = t(i);
      return !n || Math.abs(a - i) < o || a - i < 0 == n < 0 ? a : t(n < 0 ? i - e : i + e)
    }
  },
  Af = function(e) {
    return function(t, r) {
      return Co(Nl(e))(t, r.direction)
    }
  },
  Sn = function(e, t, r, i) {
    return r.split(",").forEach(function(n) {
      return e(t, n, i)
    })
  },
  De = function(e, t, r, i, n) {
    return e.addEventListener(t, r, {
      passive: !i,
      capture: !!n
    })
  },
  Ae = function(e, t, r, i) {
    return e.removeEventListener(t, r, !!i)
  },
  En = function(e, t, r) {
    r = r && r.wheelHandler, r && (e(t, "wheel", r), e(t, "touchmove", r))
  },
  na = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
  },
  Pn = {
    toggleActions: "play",
    anticipatePin: 0
  },
  es = {
    top: 0,
    left: 0,
    center: .5,
    bottom: 1,
    right: 1
  },
  Bn = function(e, t) {
    if (wt(e)) {
      var r = e.indexOf("="),
        i = ~r ? +(e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
      ~r && (e.indexOf("%") > r && (i *= t / 100), e = e.substr(0, r - 1)), e = i + (e in es ? es[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0)
    }
    return e
  },
  Cn = function(e, t, r, i, n, o, a, l) {
    var u = n.startColor,
      f = n.endColor,
      d = n.fontSize,
      p = n.indent,
      c = n.fontWeight,
      g = re.createElement("div"),
      h = ri(r) || Ar(r, "pinType") === "fixed",
      m = e.indexOf("scroller") !== -1,
      _ = h ? te : r.tagName === "IFRAME" ? r.contentDocument.body : r,
      w = e.indexOf("start") !== -1,
      v = w ? u : f,
      y = "border-color:" + v + ";font-size:" + d + ";color:" + v + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    return y += "position:" + ((m || l) && h ? "fixed;" : "absolute;"), (m || l || !h) && (y += (i === Me ? So : Eo) + ":" + (o + parseFloat(p)) + "px;"), a && (y += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), g._isStart = w, g.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")), g.style.cssText = y, g.innerText = t || t === 0 ? e + "-" + t : e, _.children[0] ? _.insertBefore(g, _.children[0]) : _.appendChild(g), g._offset = g["offset" + i.op.d2], Nn(g, 0, i, w), g
  },
  Nn = function(e, t, r, i) {
    var n = {
        display: "block"
      },
      o = r[i ? "os2" : "p2"],
      a = r[i ? "p2" : "os2"];
    e._isFlipped = i, n[r.a + "Percent"] = i ? -100 : 0, n[r.a] = i ? "1px" : 0, n["border" + o + Oi] = 1, n["border" + a + Oi] = 0, n[r.p] = t + "px", R.set(e, n)
  },
  $ = [],
  Qs = {},
  pn, sa = function() {
    return We() - Rt > 34 && (pn || (pn = requestAnimationFrame(cr)))
  },
  ci = function() {
    (!rt || !rt.isPressed || rt.startX > te.clientWidth) && (U.cache++, rt ? pn || (pn = requestAnimationFrame(cr)) : cr(), Rt || ni("scrollStart"), Rt = We())
  },
  ys = function() {
    Dl = W.innerWidth, Al = W.innerHeight
  },
  qi = function(e) {
    U.cache++, (e === !0 || !$e && !Ol && !re.fullscreenElement && !re.webkitFullscreenElement && (!Us || Dl !== W.innerWidth || Math.abs(W.innerHeight - Al) > W.innerHeight * .25)) && Zn.restart(!0)
  },
  ii = {},
  Df = [],
  Vl = function s() {
    return Ae(X, "scrollEnd", s) || Ur(!0)
  },
  ni = function(e) {
    return ii[e] && ii[e].map(function(t) {
      return t()
    }) || Df
  },
  vt = [],
  Gl = function(e) {
    for (var t = 0; t < vt.length; t += 5)(!e || vt[t + 4] && vt[t + 4].query === e) && (vt[t].style.cssText = vt[t + 1], vt[t].getBBox && vt[t].setAttribute("transform", vt[t + 2] || ""), vt[t + 3].uncache = 1)
  },
  Yl = function() {
    return U.forEach(function(e) {
      return je(e) && ++e.cacheID && (e.rec = e())
    })
  },
  Mo = function(e, t) {
    var r;
    for (it = 0; it < $.length; it++) r = $[it], r && (!t || r._ctx === t) && (e ? r.kill(1) : r.revert(!0, !0));
    Qi = !0, t && Gl(t), t || ni("revert")
  },
  Hl = function(e, t) {
    U.cache++, (t || !nt) && U.forEach(function(r) {
      return je(r) && r.cacheID++ && (r.rec = 0)
    }), wt(e) && (W.history.scrollRestoration = To = e)
  },
  nt, ti = 0,
  oa, If = function() {
    if (oa !== ti) {
      var e = oa = ti;
      requestAnimationFrame(function() {
        return e === ti && Ur(!0)
      })
    }
  },
  ql = function() {
    te.appendChild(bi), bo = !rt && bi.offsetHeight || W.innerHeight, te.removeChild(bi)
  },
  aa = function(e) {
    return cn(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t) {
      return t.style.display = e ? "none" : "block"
    })
  },
  Ur = function(e, t) {
    if (Tt = re.documentElement, te = re.body, xo = [W, re, Tt, te], Rt && !e && !Qi) {
      De(X, "scrollEnd", Vl);
      return
    }
    ql(), nt = X.isRefreshing = !0, Qi || Yl();
    var r = ni("refreshInit");
    kl && X.sort(), t || Mo(), U.forEach(function(i) {
      je(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0))
    }), $.slice(0).forEach(function(i) {
      return i.refresh()
    }), Qi = !1, $.forEach(function(i) {
      if (i._subPinOffset && i.pin) {
        var n = i.vars.horizontal ? "offsetWidth" : "offsetHeight",
          o = i.pin[n];
        i.revert(!0, 1), i.adjustPinSpacing(i.pin[n] - o), i.refresh()
      }
    }), Ks = 1, aa(!0), $.forEach(function(i) {
      var n = Qt(i.scroller, i._dir),
        o = i.vars.end === "max" || i._endClamp && i.end > n,
        a = i._startClamp && i.start >= n;
      (o || a) && i.setPositions(a ? n - 1 : i.start, o ? Math.max(a ? n : i.start + 1, n) : i.end, !0)
    }), aa(!1), Ks = 0, r.forEach(function(i) {
      return i && i.render && i.render(-1)
    }), U.forEach(function(i) {
      je(i) && (i.smooth && requestAnimationFrame(function() {
        return i.target.style.scrollBehavior = "smooth"
      }), i.rec && i(i.rec))
    }), Hl(To, 1), Zn.pause(), ti++, nt = 2, cr(2), $.forEach(function(i) {
      return je(i.vars.onRefresh) && i.vars.onRefresh(i)
    }), nt = X.isRefreshing = !1, ni("refresh")
  },
  Zs = 0,
  Vn = 1,
  rn, cr = function(e) {
    if (e === 2 || !nt && !Qi) {
      X.isUpdating = !0, rn && rn.update(0);
      var t = $.length,
        r = We(),
        i = r - ws >= 50,
        n = t && $[0].scroll();
      if (Vn = Zs > n ? -1 : 1, nt || (Zs = n), i && (Rt && !as && r - Rt > 200 && (Rt = 0, ni("scrollEnd")), Vi = ws, ws = r), Vn < 0) {
        for (it = t; it-- > 0;) $[it] && $[it].update(0, i);
        Vn = 1
      } else
        for (it = 0; it < t; it++) $[it] && $[it].update(0, i);
      X.isUpdating = !1
    }
    pn = 0
  },
  Js = [Fl, Bl, Eo, So, Dt + tn, Dt + Zi, Dt + en, Dt + Ji, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
  Gn = Js.concat([Jr, ei, "boxSizing", "max" + Oi, "max" + Po, "position", Dt, Se, Se + en, Se + Zi, Se + tn, Se + Ji]),
  Lf = function(e, t, r) {
    Si(r);
    var i = e._gsap;
    if (i.spacerIsNative) Si(i.spacerState);
    else if (e._gsap.swappedIn) {
      var n = t.parentNode;
      n && (n.insertBefore(e, t), n.removeChild(t))
    }
    e._gsap.swappedIn = !1
  },
  xs = function(e, t, r, i) {
    if (!e._gsap.swappedIn) {
      for (var n = Js.length, o = t.style, a = e.style, l; n--;) l = Js[n], o[l] = r[l];
      o.position = r.position === "absolute" ? "absolute" : "relative", r.display === "inline" && (o.display = "inline-block"), a[Eo] = a[So] = "auto", o.flexBasis = r.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[Jr] = Jn(e, st) + Ce, o[ei] = Jn(e, Me) + Ce, o[Se] = a[Dt] = a[Bl] = a[Fl] = "0", Si(i), a[Jr] = a["max" + Oi] = r[Jr], a[ei] = a["max" + Po] = r[ei], a[Se] = r[Se], e.parentNode !== t && (e.parentNode.insertBefore(t, e), t.appendChild(e)), e._gsap.swappedIn = !0
    }
  },
  zf = /([A-Z])/g,
  Si = function(e) {
    if (e) {
      var t = e.t.style,
        r = e.length,
        i = 0,
        n, o;
      for ((e.t._gsap || R.core.getCache(e.t)).uncache = 1; i < r; i += 2) o = e[i + 1], n = e[i], o ? t[n] = o : t[n] && t.removeProperty(n.replace(zf, "-$1").toLowerCase())
    }
  },
  Mn = function(e) {
    for (var t = Gn.length, r = e.style, i = [], n = 0; n < t; n++) i.push(Gn[n], r[Gn[n]]);
    return i.t = e, i
  },
  Rf = function(e, t, r) {
    for (var i = [], n = e.length, o = r ? 8 : 0, a; o < n; o += 2) a = e[o], i.push(a, a in t ? t[a] : e[o + 1]);
    return i.t = e.t, i
  },
  Yn = {
    left: 0,
    top: 0
  },
  la = function(e, t, r, i, n, o, a, l, u, f, d, p, c, g) {
    je(e) && (e = e(l)), wt(e) && e.substr(0, 3) === "max" && (e = p + (e.charAt(4) === "=" ? Bn("0" + e.substr(3), r) : 0));
    var h = c ? c.time() : 0,
      m, _, w;
    if (c && c.seek(0), isNaN(e) || (e = +e), Hi(e)) c && (e = R.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, p, e)), a && Nn(a, r, i, !0);
    else {
      je(t) && (t = t(l));
      var v = (e || "0").split(" "),
        y, x, M, b;
      w = at(t, l) || te, y = ur(w) || {}, (!y || !y.left && !y.top) && It(w).display === "none" && (b = w.style.display, w.style.display = "block", y = ur(w), b ? w.style.display = b : w.style.removeProperty("display")), x = Bn(v[0], y[i.d]), M = Bn(v[1] || "0", r), e = y[i.p] - u[i.p] - f + x + n - M, a && Nn(a, M, i, r - M < 20 || a._isStart && M > 20), r -= r - M
    }
    if (g && (l[g] = e || -.001, e < 0 && (e = 0)), o) {
      var E = e + r,
        P = o._isStart;
      m = "scroll" + i.d2, Nn(o, E, i, P && E > 20 || !P && (d ? Math.max(te[m], Tt[m]) : o.parentNode[m]) <= E + 1), d && (u = ur(a), d && (o.style[i.op.p] = u[i.op.p] - i.op.m - o._offset + Ce))
    }
    return c && w && (m = ur(w), c.seek(p), _ = ur(w), c._caScrollDist = m[i.p] - _[i.p], e = e / c._caScrollDist * p), c && c.seek(h), c ? e : Math.round(e)
  },
  Ff = /(webkit|moz|length|cssText|inset)/i,
  ua = function(e, t, r, i) {
    if (e.parentNode !== t) {
      var n = e.style,
        o, a;
      if (t === te) {
        e._stOrig = n.cssText, a = It(e);
        for (o in a) !+o && !Ff.test(o) && a[o] && typeof n[o] == "string" && o !== "0" && (n[o] = a[o]);
        n.top = r, n.left = i
      } else n.cssText = e._stOrig;
      R.core.getCache(e).uncache = 1, t.appendChild(e)
    }
  },
  Xl = function(e, t, r) {
    var i = t,
      n = i;
    return function(o) {
      var a = Math.round(e());
      return a !== i && a !== n && Math.abs(a - i) > 3 && Math.abs(a - n) > 3 && (o = a, r && r()), n = i, i = Math.round(o), i
    }
  },
  kn = function(e, t, r) {
    var i = {};
    i[t.p] = "+=" + r, R.set(e, i)
  },
  fa = function(e, t) {
    var r = zr(e, t),
      i = "_scroll" + t.p2,
      n = function o(a, l, u, f, d) {
        var p = o.tween,
          c = l.onComplete,
          g = {};
        u = u || r();
        var h = Xl(r, u, function() {
          p.kill(), o.tween = 0
        });
        return d = f && d || 0, f = f || a - u, p && p.kill(), l[i] = a, l.inherit = !1, l.modifiers = g, g[i] = function() {
          return h(u + f * p.ratio + d * p.ratio * p.ratio)
        }, l.onUpdate = function() {
          U.cache++, o.tween && cr()
        }, l.onComplete = function() {
          o.tween = 0, c && c.call(p)
        }, p = o.tween = R.to(e, l), p
      };
    return e[i] = r, r.wheelHandler = function() {
      return n.tween && n.tween.kill() && (n.tween = 0)
    }, De(e, "wheel", r.wheelHandler), X.isTouch && De(e, "touchmove", r.wheelHandler), n
  },
  X = (function() {
    function s(t, r) {
      pi || s.register(R) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), js(this), this.init(t, r)
    }
    var e = s.prototype;
    return e.init = function(r, i) {
      if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Gi) {
        this.update = this.refresh = this.kill = Ut;
        return
      }
      r = ia(wt(r) || Hi(r) || r.nodeType ? {
        trigger: r
      } : r, Pn);
      var n = r,
        o = n.onUpdate,
        a = n.toggleClass,
        l = n.id,
        u = n.onToggle,
        f = n.onRefresh,
        d = n.scrub,
        p = n.trigger,
        c = n.pin,
        g = n.pinSpacing,
        h = n.invalidateOnRefresh,
        m = n.anticipatePin,
        _ = n.onScrubComplete,
        w = n.onSnapComplete,
        v = n.once,
        y = n.snap,
        x = n.pinReparent,
        M = n.pinSpacer,
        b = n.containerAnimation,
        E = n.fastScrollEnd,
        P = n.preventOverlaps,
        S = r.horizontal || r.containerAnimation && r.horizontal !== !1 ? st : Me,
        O = !d && d !== 0,
        k = at(r.scroller || W),
        A = R.core.getCache(k),
        z = ri(k),
        N = ("pinType" in r ? r.pinType : Ar(k, "pinType") || z && "fixed") === "fixed",
        I = [r.onEnter, r.onLeave, r.onEnterBack, r.onLeaveBack],
        L = O && r.toggleActions.split(" "),
        F = "markers" in r ? r.markers : Pn.markers,
        q = z ? 0 : parseFloat(It(k)["border" + S.p2 + Oi]) || 0,
        T = this,
        ie = r.onRefreshInit && function() {
          return r.onRefreshInit(T)
        },
        ze = Cf(k, z, S),
        Ft = Mf(k, z),
        pe = 0,
        Re = 0,
        Ge = 0,
        Te = zr(k, S),
        Qe, Ye, mr, Ze, Je, J, _e, ot, gt, C, mt, tr, _r, he, rr, vr, Fr, ke, wr, ve, Bt, Ot, ir, Ai, be, gn, nr, oi, ai, yr, Br, j, Nr, Nt, Vt, Gt, Vr, li, sr;
      if (T._startClamp = T._endClamp = !1, T._dir = S, m *= 45, T.scroller = k, T.scroll = b ? b.time.bind(b) : Te, Ze = Te(), T.vars = r, i = i || r.animation, "refreshPriority" in r && (kl = 1, r.refreshPriority === -9999 && (rn = T)), A.tweenScroll = A.tweenScroll || {
          top: fa(k, Me),
          left: fa(k, st)
        }, T.tweenTo = Qe = A.tweenScroll[S.p], T.scrubDuration = function(D) {
          Nr = Hi(D) && D, Nr ? j ? j.duration(D) : j = R.to(i, {
            ease: "expo",
            totalProgress: "+=0",
            inherit: !1,
            duration: Nr,
            paused: !0,
            onComplete: function() {
              return _ && _(T)
            }
          }) : (j && j.progress(1).kill(), j = 0)
        }, i && (i.vars.lazy = !1, i._initted && !T.isReverted || i.vars.immediateRender !== !1 && r.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), T.animation = i.pause(), i.scrollTrigger = T, T.scrubDuration(d), yr = 0, l || (l = i.vars.id)), y && ((!$r(y) || y.push) && (y = {
          snapTo: y
        }), "scrollBehavior" in te.style && R.set(z ? [te, Tt] : k, {
          scrollBehavior: "auto"
        }), U.forEach(function(D) {
          return je(D) && D.target === (z ? re.scrollingElement || Tt : k) && (D.smooth = !1)
        }), mr = je(y.snapTo) ? y.snapTo : y.snapTo === "labels" ? Of(i) : y.snapTo === "labelsDirectional" ? Af(i) : y.directional !== !1 ? function(D, G) {
          return Co(y.snapTo)(D, We() - Re < 500 ? 0 : G.direction)
        } : R.utils.snap(y.snapTo), Nt = y.duration || {
          min: .1,
          max: 2
        }, Nt = $r(Nt) ? Ki(Nt.min, Nt.max) : Ki(Nt, Nt), Vt = R.delayedCall(y.delay || Nr / 2 || .1, function() {
          var D = Te(),
            G = We() - Re < 500,
            B = Qe.tween;
          if ((G || Math.abs(T.getVelocity()) < 10) && !B && !as && pe !== D) {
            var Y = (D - J) / he,
              Oe = i && !O ? i.totalProgress() : Y,
              Q = G ? 0 : (Oe - Br) / (We() - Vi) * 1e3 || 0,
              we = R.utils.clamp(-Y, 1 - Y, di(Q / 2) * Q / .185),
              He = Y + (y.inertia === !1 ? 0 : we),
              ge, ae, ne = y,
              Yt = ne.onStart,
              ue = ne.onInterrupt,
              _t = ne.onComplete;
            if (ge = mr(He, T), Hi(ge) || (ge = He), ae = Math.max(0, Math.round(J + ge * he)), D <= _e && D >= J && ae !== D) {
              if (B && !B._initted && B.data <= di(ae - D)) return;
              y.inertia === !1 && (we = ge - Y), Qe(ae, {
                duration: Nt(di(Math.max(di(He - Oe), di(ge - Oe)) * .185 / Q / .05 || 0)),
                ease: y.ease || "power3",
                data: di(ae - D),
                onInterrupt: function() {
                  return Vt.restart(!0) && ue && fi(T, ue)
                },
                onComplete: function() {
                  T.update(), pe = Te(), i && !O && (j ? j.resetTo("totalProgress", ge, i._tTime / i._tDur) : i.progress(ge)), yr = Br = i && !O ? i.totalProgress() : T.progress, w && w(T), _t && fi(T, _t)
                }
              }, D, we * he, ae - D - we * he), Yt && fi(T, Yt, Qe.tween)
            }
          } else T.isActive && pe !== D && Vt.restart(!0)
        }).pause()), l && (Qs[l] = T), p = T.trigger = at(p || c !== !0 && c), sr = p && p._gsap && p._gsap.stRevert, sr && (sr = sr(T)), c = c === !0 ? p : at(c), wt(a) && (a = {
          targets: p,
          className: a
        }), c && (g === !1 || g === Dt || (g = !g && c.parentNode && c.parentNode.style && It(c.parentNode).display === "flex" ? !1 : Se), T.pin = c, Ye = R.core.getCache(c), Ye.spacer ? rr = Ye.pinState : (M && (M = at(M), M && !M.nodeType && (M = M.current || M.nativeElement), Ye.spacerIsNative = !!M, M && (Ye.spacerState = Mn(M))), Ye.spacer = ke = M || re.createElement("div"), ke.classList.add("pin-spacer"), l && ke.classList.add("pin-spacer-" + l), Ye.pinState = rr = Mn(c)), r.force3D !== !1 && R.set(c, {
          force3D: !0
        }), T.spacer = ke = Ye.spacer, ai = It(c), Ai = ai[g + S.os2], ve = R.getProperty(c), Bt = R.quickSetter(c, S.a, Ce), xs(c, ke, ai), Fr = Mn(c)), F) {
        tr = $r(F) ? ia(F, na) : na, C = Cn("scroller-start", l, k, S, tr, 0), mt = Cn("scroller-end", l, k, S, tr, 0, C), wr = C["offset" + S.op.d2];
        var Di = at(Ar(k, "content") || k);
        ot = this.markerStart = Cn("start", l, Di, S, tr, wr, 0, b), gt = this.markerEnd = Cn("end", l, Di, S, tr, wr, 0, b), b && (li = R.quickSetter([ot, gt], S.a, Ce)), !N && !(Jt.length && Ar(k, "fixedMarkers") === !0) && (kf(z ? te : k), R.set([C, mt], {
          force3D: !0
        }), gn = R.quickSetter(C, S.a, Ce), oi = R.quickSetter(mt, S.a, Ce))
      }
      if (b) {
        var H = b.vars.onUpdate,
          V = b.vars.onUpdateParams;
        b.eventCallback("onUpdate", function() {
          T.update(0, 0, 1), H && H.apply(b, V || [])
        })
      }
      if (T.previous = function() {
          return $[$.indexOf(T) - 1]
        }, T.next = function() {
          return $[$.indexOf(T) + 1]
        }, T.revert = function(D, G) {
          if (!G) return T.kill(!0);
          var B = D !== !1 || !T.enabled,
            Y = $e;
          B !== T.isReverted && (B && (Gt = Math.max(Te(), T.scroll.rec || 0), Ge = T.progress, Vr = i && i.progress()), ot && [ot, gt, C, mt].forEach(function(Oe) {
            return Oe.style.display = B ? "none" : "block"
          }), B && ($e = T, T.update(B)), c && (!x || !T.isActive) && (B ? Lf(c, ke, rr) : xs(c, ke, It(c), be)), B || T.update(B), $e = Y, T.isReverted = B)
        }, T.refresh = function(D, G, B, Y) {
          if (!(($e || !T.enabled) && !G)) {
            if (c && D && Rt) {
              De(s, "scrollEnd", Vl);
              return
            }!nt && ie && ie(T), $e = T, Qe.tween && !B && (Qe.tween.kill(), Qe.tween = 0), j && j.pause(), h && i && (i.revert({
              kill: !1
            }).invalidate(), i.getChildren ? i.getChildren(!0, !0, !1).forEach(function(xr) {
              return xr.vars.immediateRender && xr.render(0, !0, !0)
            }) : i.vars.immediateRender && i.render(0, !0, !0)), T.isReverted || T.revert(!0, !0), T._subPinOffset = !1;
            var Oe = ze(),
              Q = Ft(),
              we = b ? b.duration() : Qt(k, S),
              He = he <= .01 || !he,
              ge = 0,
              ae = Y || 0,
              ne = $r(B) ? B.end : r.end,
              Yt = r.endTrigger || p,
              ue = $r(B) ? B.start : r.start || (r.start === 0 || !p ? 0 : c ? "0 0" : "0 100%"),
              _t = T.pinnedContainer = r.pinnedContainer && at(r.pinnedContainer, T),
              qt = p && Math.max(0, $.indexOf(T)) || 0,
              Fe = qt,
              Be, qe, Gr, mn, Xe, Pe, Xt, ls, Ao, Ii, $t, Li, _n;
            for (F && $r(B) && (Li = R.getProperty(C, S.p), _n = R.getProperty(mt, S.p)); Fe-- > 0;) Pe = $[Fe], Pe.end || Pe.refresh(0, 1) || ($e = T), Xt = Pe.pin, Xt && (Xt === p || Xt === c || Xt === _t) && !Pe.isReverted && (Ii || (Ii = []), Ii.unshift(Pe), Pe.revert(!0, !0)), Pe !== $[Fe] && (qt--, Fe--);
            for (je(ue) && (ue = ue(T)), ue = Jo(ue, "start", T), J = la(ue, p, Oe, S, Te(), ot, C, T, Q, q, N, we, b, T._startClamp && "_startClamp") || (c ? -.001 : 0), je(ne) && (ne = ne(T)), wt(ne) && !ne.indexOf("+=") && (~ne.indexOf(" ") ? ne = (wt(ue) ? ue.split(" ")[0] : "") + ne : (ge = Bn(ne.substr(2), Oe), ne = wt(ue) ? ue : (b ? R.utils.mapRange(0, b.duration(), b.scrollTrigger.start, b.scrollTrigger.end, J) : J) + ge, Yt = p)), ne = Jo(ne, "end", T), _e = Math.max(J, la(ne || (Yt ? "100% 0" : we), Yt, Oe, S, Te() + ge, gt, mt, T, Q, q, N, we, b, T._endClamp && "_endClamp")) || -.001, ge = 0, Fe = qt; Fe--;) Pe = $[Fe] || {}, Xt = Pe.pin, Xt && Pe.start - Pe._pinPush <= J && !b && Pe.end > 0 && (Be = Pe.end - (T._startClamp ? Math.max(0, Pe.start) : Pe.start), (Xt === p && Pe.start - Pe._pinPush < J || Xt === _t) && isNaN(ue) && (ge += Be * (1 - Pe.progress)), Xt === c && (ae += Be));
            if (J += ge, _e += ge, T._startClamp && (T._startClamp += ge), T._endClamp && !nt && (T._endClamp = _e || -.001, _e = Math.min(_e, Qt(k, S))), he = _e - J || (J -= .01) && .001, He && (Ge = R.utils.clamp(0, 1, R.utils.normalize(J, _e, Gt))), T._pinPush = ae, ot && ge && (Be = {}, Be[S.a] = "+=" + ge, _t && (Be[S.p] = "-=" + Te()), R.set([ot, gt], Be)), c && !(Ks && T.end >= Qt(k, S))) Be = It(c), mn = S === Me, Gr = Te(), Ot = parseFloat(ve(S.a)) + ae, !we && _e > 1 && ($t = (z ? re.scrollingElement || Tt : k).style, $t = {
              style: $t,
              value: $t["overflow" + S.a.toUpperCase()]
            }, z && It(te)["overflow" + S.a.toUpperCase()] !== "scroll" && ($t.style["overflow" + S.a.toUpperCase()] = "scroll")), xs(c, ke, Be), Fr = Mn(c), qe = ur(c, !0), ls = N && zr(k, mn ? st : Me)(), g ? (be = [g + S.os2, he + ae + Ce], be.t = ke, Fe = g === Se ? Jn(c, S) + he + ae : 0, Fe && (be.push(S.d, Fe + Ce), ke.style.flexBasis !== "auto" && (ke.style.flexBasis = Fe + Ce)), Si(be), _t && $.forEach(function(xr) {
              xr.pin === _t && xr.vars.pinSpacing !== !1 && (xr._subPinOffset = !0)
            }), N && Te(Gt)) : (Fe = Jn(c, S), Fe && ke.style.flexBasis !== "auto" && (ke.style.flexBasis = Fe + Ce)), N && (Xe = {
              top: qe.top + (mn ? Gr - J : ls) + Ce,
              left: qe.left + (mn ? ls : Gr - J) + Ce,
              boxSizing: "border-box",
              position: "fixed"
            }, Xe[Jr] = Xe["max" + Oi] = Math.ceil(qe.width) + Ce, Xe[ei] = Xe["max" + Po] = Math.ceil(qe.height) + Ce, Xe[Dt] = Xe[Dt + en] = Xe[Dt + Zi] = Xe[Dt + tn] = Xe[Dt + Ji] = "0", Xe[Se] = Be[Se], Xe[Se + en] = Be[Se + en], Xe[Se + Zi] = Be[Se + Zi], Xe[Se + tn] = Be[Se + tn], Xe[Se + Ji] = Be[Se + Ji], vr = Rf(rr, Xe, x), nt && Te(0)), i ? (Ao = i._initted, _s(1), i.render(i.duration(), !0, !0), ir = ve(S.a) - Ot + he + ae, nr = Math.abs(he - ir) > 1, N && nr && vr.splice(vr.length - 2, 2), i.render(0, !0, !0), Ao || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), _s(0)) : ir = he, $t && ($t.value ? $t.style["overflow" + S.a.toUpperCase()] = $t.value : $t.style.removeProperty("overflow-" + S.a));
            else if (p && Te() && !b)
              for (qe = p.parentNode; qe && qe !== te;) qe._pinOffset && (J -= qe._pinOffset, _e -= qe._pinOffset), qe = qe.parentNode;
            Ii && Ii.forEach(function(xr) {
              return xr.revert(!1, !0)
            }), T.start = J, T.end = _e, Ze = Je = nt ? Gt : Te(), !b && !nt && (Ze < Gt && Te(Gt), T.scroll.rec = 0), T.revert(!1, !0), Re = We(), Vt && (pe = -1, Vt.restart(!0)), $e = 0, i && O && (i._initted || Vr) && i.progress() !== Vr && i.progress(Vr || 0, !0).render(i.time(), !0, !0), (He || Ge !== T.progress || b || h || i && !i._initted) && (i && !O && (i._initted || Ge || i.vars.immediateRender !== !1) && i.totalProgress(b && J < -.001 && !Ge ? R.utils.normalize(J, _e, 0) : Ge, !0), T.progress = He || (Ze - J) / he === Ge ? 0 : Ge), c && g && (ke._pinOffset = Math.round(T.progress * ir)), j && j.invalidate(), isNaN(Li) || (Li -= R.getProperty(C, S.p), _n -= R.getProperty(mt, S.p), kn(C, S, Li), kn(ot, S, Li - (Y || 0)), kn(mt, S, _n), kn(gt, S, _n - (Y || 0))), He && !nt && T.update(), f && !nt && !_r && (_r = !0, f(T), _r = !1)
          }
        }, T.getVelocity = function() {
          return (Te() - Je) / (We() - Vi) * 1e3 || 0
        }, T.endAnimation = function() {
          Fi(T.callbackAnimation), i && (j ? j.progress(1) : i.paused() ? O || Fi(i, T.direction < 0, 1) : Fi(i, i.reversed()))
        }, T.labelToScroll = function(D) {
          return i && i.labels && (J || T.refresh() || J) + i.labels[D] / i.duration() * he || 0
        }, T.getTrailing = function(D) {
          var G = $.indexOf(T),
            B = T.direction > 0 ? $.slice(0, G).reverse() : $.slice(G + 1);
          return (wt(D) ? B.filter(function(Y) {
            return Y.vars.preventOverlaps === D
          }) : B).filter(function(Y) {
            return T.direction > 0 ? Y.end <= J : Y.start >= _e
          })
        }, T.update = function(D, G, B) {
          if (!(b && !B && !D)) {
            var Y = nt === !0 ? Gt : T.scroll(),
              Oe = D ? 0 : (Y - J) / he,
              Q = Oe < 0 ? 0 : Oe > 1 ? 1 : Oe || 0,
              we = T.progress,
              He, ge, ae, ne, Yt, ue, _t, qt;
            if (G && (Je = Ze, Ze = b ? Te() : Y, y && (Br = yr, yr = i && !O ? i.totalProgress() : Q)), m && c && !$e && !Tn && Rt && (!Q && J < Y + (Y - Je) / (We() - Vi) * m ? Q = 1e-4 : Q === 1 && _e > Y + (Y - Je) / (We() - Vi) * m && (Q = .9999)), Q !== we && T.enabled) {
              if (He = T.isActive = !!Q && Q < 1, ge = !!we && we < 1, ue = He !== ge, Yt = ue || !!Q != !!we, T.direction = Q > we ? 1 : -1, T.progress = Q, Yt && !$e && (ae = Q && !we ? 0 : Q === 1 ? 1 : we === 1 ? 2 : 3, O && (ne = !ue && L[ae + 1] !== "none" && L[ae + 1] || L[ae], qt = i && (ne === "complete" || ne === "reset" || ne in i))), P && (ue || qt) && (qt || d || !i) && (je(P) ? P(T) : T.getTrailing(P).forEach(function(Gr) {
                  return Gr.endAnimation()
                })), O || (j && !$e && !Tn ? (j._dp._time - j._start !== j._time && j.render(j._dp._time - j._start), j.resetTo ? j.resetTo("totalProgress", Q, i._tTime / i._tDur) : (j.vars.totalProgress = Q, j.invalidate().restart())) : i && i.totalProgress(Q, !!($e && (Re || D)))), c) {
                if (D && g && (ke.style[g + S.os2] = Ai), !N) Bt(Yi(Ot + ir * Q));
                else if (Yt) {
                  if (_t = !D && Q > we && _e + 1 > Y && Y + 1 >= Qt(k, S), x)
                    if (!D && (He || _t)) {
                      var Fe = ur(c, !0),
                        Be = Y - J;
                      ua(c, te, Fe.top + (S === Me ? Be : 0) + Ce, Fe.left + (S === Me ? 0 : Be) + Ce)
                    } else ua(c, ke);
                  Si(He || _t ? vr : Fr), nr && Q < 1 && He || Bt(Ot + (Q === 1 && !_t ? ir : 0))
                }
              }
              y && !Qe.tween && !$e && !Tn && Vt.restart(!0), a && (ue || v && Q && (Q < 1 || !vs)) && cn(a.targets).forEach(function(Gr) {
                return Gr.classList[He || v ? "add" : "remove"](a.className)
              }), o && !O && !D && o(T), Yt && !$e ? (O && (qt && (ne === "complete" ? i.pause().totalProgress(1) : ne === "reset" ? i.restart(!0).pause() : ne === "restart" ? i.restart(!0) : i[ne]()), o && o(T)), (ue || !vs) && (u && ue && fi(T, u), I[ae] && fi(T, I[ae]), v && (Q === 1 ? T.kill(!1, 1) : I[ae] = 0), ue || (ae = Q === 1 ? 1 : 3, I[ae] && fi(T, I[ae]))), E && !He && Math.abs(T.getVelocity()) > (Hi(E) ? E : 2500) && (Fi(T.callbackAnimation), j ? j.progress(1) : Fi(i, ne === "reverse" ? 1 : !Q, 1))) : O && o && !$e && o(T)
            }
            if (oi) {
              var qe = b ? Y / b.duration() * (b._caScrollDist || 0) : Y;
              gn(qe + (C._isFlipped ? 1 : 0)), oi(qe)
            }
            li && li(-Y / b.duration() * (b._caScrollDist || 0))
          }
        }, T.enable = function(D, G) {
          T.enabled || (T.enabled = !0, De(k, "resize", qi), z || De(k, "scroll", ci), ie && De(s, "refreshInit", ie), D !== !1 && (T.progress = Ge = 0, Ze = Je = pe = Te()), G !== !1 && T.refresh())
        }, T.getTween = function(D) {
          return D && Qe ? Qe.tween : j
        }, T.setPositions = function(D, G, B, Y) {
          if (b) {
            var Oe = b.scrollTrigger,
              Q = b.duration(),
              we = Oe.end - Oe.start;
            D = Oe.start + we * D / Q, G = Oe.start + we * G / Q
          }
          T.refresh(!1, !1, {
            start: ea(D, B && !!T._startClamp),
            end: ea(G, B && !!T._endClamp)
          }, Y), T.update()
        }, T.adjustPinSpacing = function(D) {
          if (be && D) {
            var G = be.indexOf(S.d) + 1;
            be[G] = parseFloat(be[G]) + D + Ce, be[1] = parseFloat(be[1]) + D + Ce, Si(be)
          }
        }, T.disable = function(D, G) {
          if (D !== !1 && T.revert(!0, !0), T.enabled && (T.enabled = T.isActive = !1, G || j && j.pause(), Gt = 0, Ye && (Ye.uncache = 1), ie && Ae(s, "refreshInit", ie), Vt && (Vt.pause(), Qe.tween && Qe.tween.kill() && (Qe.tween = 0)), !z)) {
            for (var B = $.length; B--;)
              if ($[B].scroller === k && $[B] !== T) return;
            Ae(k, "resize", qi), z || Ae(k, "scroll", ci)
          }
        }, T.kill = function(D, G) {
          T.disable(D, G), j && !G && j.kill(), l && delete Qs[l];
          var B = $.indexOf(T);
          B >= 0 && $.splice(B, 1), B === it && Vn > 0 && it--, B = 0, $.forEach(function(Y) {
            return Y.scroller === T.scroller && (B = 1)
          }), B || nt || (T.scroll.rec = 0), i && (i.scrollTrigger = null, D && i.revert({
            kill: !1
          }), G || i.kill()), ot && [ot, gt, C, mt].forEach(function(Y) {
            return Y.parentNode && Y.parentNode.removeChild(Y)
          }), rn === T && (rn = 0), c && (Ye && (Ye.uncache = 1), B = 0, $.forEach(function(Y) {
            return Y.pin === c && B++
          }), B || (Ye.spacer = 0)), r.onKill && r.onKill(T)
        }, $.push(T), T.enable(!1, !1), sr && sr(T), i && i.add && !he) {
        var ee = T.update;
        T.update = function() {
          T.update = ee, U.cache++, J || _e || T.refresh()
        }, R.delayedCall(.01, T.update), he = .01, J = _e = 0
      } else T.refresh();
      c && If()
    }, s.register = function(r) {
      return pi || (R = r || Ll(), Il() && window.document && s.enable(), pi = Gi), pi
    }, s.defaults = function(r) {
      if (r)
        for (var i in r) Pn[i] = r[i];
      return Pn
    }, s.disable = function(r, i) {
      Gi = 0, $.forEach(function(o) {
        return o[i ? "kill" : "disable"](r)
      }), Ae(W, "wheel", ci), Ae(re, "scroll", ci), clearInterval(xn), Ae(re, "touchcancel", Ut), Ae(te, "touchstart", Ut), Sn(Ae, re, "pointerdown,touchstart,mousedown", ta), Sn(Ae, re, "pointerup,touchend,mouseup", ra), Zn.kill(), bn(Ae);
      for (var n = 0; n < U.length; n += 3) En(Ae, U[n], U[n + 1]), En(Ae, U[n], U[n + 2])
    }, s.enable = function() {
      if (W = window, re = document, Tt = re.documentElement, te = re.body, R) {
        if (cn = R.utils.toArray, Ki = R.utils.clamp, js = R.core.context || Ut, _s = R.core.suppressOverwrites || Ut, To = W.history.scrollRestoration || "auto", Zs = W.pageYOffset || 0, R.core.globals("ScrollTrigger", s), te) {
          Gi = 1, bi = document.createElement("div"), bi.style.height = "100vh", bi.style.position = "absolute", ql(), Pf(), xe.register(R), s.isTouch = xe.isTouch, Tr = xe.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Us = xe.isTouch === 1, De(W, "wheel", ci), xo = [W, re, Tt, te], R.matchMedia ? (s.matchMedia = function(f) {
            var d = R.matchMedia(),
              p;
            for (p in f) d.add(p, f[p]);
            return d
          }, R.addEventListener("matchMediaInit", function() {
            Yl(), Mo()
          }), R.addEventListener("matchMediaRevert", function() {
            return Gl()
          }), R.addEventListener("matchMedia", function() {
            Ur(0, 1), ni("matchMedia")
          }), R.matchMedia().add("(orientation: portrait)", function() {
            return ys(), ys
          })) : console.warn("Requires GSAP 3.11.0 or later"), ys(), De(re, "scroll", ci);
          var r = te.hasAttribute("style"),
            i = te.style,
            n = i.borderTopStyle,
            o = R.core.Animation.prototype,
            a, l;
          for (o.revert || Object.defineProperty(o, "revert", {
              value: function() {
                return this.time(-.01, !0)
              }
            }), i.borderTopStyle = "solid", a = ur(te), Me.m = Math.round(a.top + Me.sc()) || 0, st.m = Math.round(a.left + st.sc()) || 0, n ? i.borderTopStyle = n : i.removeProperty("border-top-style"), r || (te.setAttribute("style", ""), te.removeAttribute("style")), xn = setInterval(sa, 250), R.delayedCall(.5, function() {
              return Tn = 0
            }), De(re, "touchcancel", Ut), De(te, "touchstart", Ut), Sn(De, re, "pointerdown,touchstart,mousedown", ta), Sn(De, re, "pointerup,touchend,mouseup", ra), Ws = R.utils.checkPrefix("transform"), Gn.push(Ws), pi = We(), Zn = R.delayedCall(.2, Ur).pause(), hi = [re, "visibilitychange", function() {
              var f = W.innerWidth,
                d = W.innerHeight;
              re.hidden ? (Qo = f, Zo = d) : (Qo !== f || Zo !== d) && qi()
            }, re, "DOMContentLoaded", Ur, W, "load", Ur, W, "resize", qi], bn(De), $.forEach(function(f) {
              return f.enable(0, 1)
            }), l = 0; l < U.length; l += 3) En(Ae, U[l], U[l + 1]), En(Ae, U[l], U[l + 2])
        } else if (re) {
          var u = function f() {
            s.enable(), re.removeEventListener("DOMContentLoaded", f)
          };
          re.addEventListener("DOMContentLoaded", u)
        }
      }
    }, s.config = function(r) {
      "limitCallbacks" in r && (vs = !!r.limitCallbacks);
      var i = r.syncInterval;
      i && clearInterval(xn) || (xn = i) && setInterval(sa, i), "ignoreMobileResize" in r && (Us = s.isTouch === 1 && r.ignoreMobileResize), "autoRefreshEvents" in r && (bn(Ae) || bn(De, r.autoRefreshEvents || "none"), Ol = (r.autoRefreshEvents + "").indexOf("resize") === -1)
    }, s.scrollerProxy = function(r, i) {
      var n = at(r),
        o = U.indexOf(n),
        a = ri(n);
      ~o && U.splice(o, a ? 6 : 2), i && (a ? Jt.unshift(W, i, te, i, Tt, i) : Jt.unshift(n, i))
    }, s.clearMatchMedia = function(r) {
      $.forEach(function(i) {
        return i._ctx && i._ctx.query === r && i._ctx.kill(!0, !0)
      })
    }, s.isInViewport = function(r, i, n) {
      var o = (wt(r) ? at(r) : r).getBoundingClientRect(),
        a = o[n ? Jr : ei] * i || 0;
      return n ? o.right - a > 0 && o.left + a < W.innerWidth : o.bottom - a > 0 && o.top + a < W.innerHeight
    }, s.positionInViewport = function(r, i, n) {
      wt(r) && (r = at(r));
      var o = r.getBoundingClientRect(),
        a = o[n ? Jr : ei],
        l = i == null ? a / 2 : i in es ? es[i] * a : ~i.indexOf("%") ? parseFloat(i) * a / 100 : parseFloat(i) || 0;
      return n ? (o.left + l) / W.innerWidth : (o.top + l) / W.innerHeight
    }, s.killAll = function(r) {
      if ($.slice(0).forEach(function(n) {
          return n.vars.id !== "ScrollSmoother" && n.kill()
        }), r !== !0) {
        var i = ii.killAll || [];
        ii = {}, i.forEach(function(n) {
          return n()
        })
      }
    }, s
  })();
X.version = "3.15.0";
X.saveStyles = function(s) {
  return s ? cn(s).forEach(function(e) {
    if (e && e.style) {
      var t = vt.indexOf(e);
      t >= 0 && vt.splice(t, 5), vt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), R.core.getCache(e), js())
    }
  }) : vt
};
X.revert = function(s, e) {
  return Mo(!s, e)
};
X.create = function(s, e) {
  return new X(s, e)
};
X.refresh = function(s) {
  return s ? qi(!0) : (pi || X.register()) && Ur(!0)
};
X.update = function(s) {
  return ++U.cache && cr(s === !0 ? 2 : 0)
};
X.clearScrollMemory = Hl;
X.maxScroll = function(s, e) {
  return Qt(s, e ? st : Me)
};
X.getScrollFunc = function(s, e) {
  return zr(at(s), e ? st : Me)
};
X.getById = function(s) {
  return Qs[s]
};
X.getAll = function() {
  return $.filter(function(s) {
    return s.vars.id !== "ScrollSmoother"
  })
};
X.isScrolling = function() {
  return !!Rt
};
X.snapDirectional = Co;
X.addEventListener = function(s, e) {
  var t = ii[s] || (ii[s] = []);
  ~t.indexOf(e) || t.push(e)
};
X.removeEventListener = function(s, e) {
  var t = ii[s],
    r = t && t.indexOf(e);
  r >= 0 && t.splice(r, 1)
};
X.batch = function(s, e) {
  var t = [],
    r = {},
    i = e.interval || .016,
    n = e.batchMax || 1e9,
    o = function(u, f) {
      var d = [],
        p = [],
        c = R.delayedCall(i, function() {
          f(d, p), d = [], p = []
        }).pause();
      return function(g) {
        d.length || c.restart(!0), d.push(g.trigger), p.push(g), n <= d.length && c.progress(1)
      }
    },
    a;
  for (a in e) r[a] = a.substr(0, 2) === "on" && je(e[a]) && a !== "onRefreshInit" ? o(a, e[a]) : e[a];
  return je(n) && (n = n(), De(X, "refresh", function() {
    return n = e.batchMax()
  })), cn(s).forEach(function(l) {
    var u = {};
    for (a in r) u[a] = r[a];
    u.trigger = l, t.push(X.create(u))
  }), t
};
var da = function(e, t, r, i) {
    return t > i ? e(i) : t < 0 && e(0), r > i ? (i - t) / (r - t) : r < 0 ? t / (t - r) : 1
  },
  Ts = function s(e, t) {
    t === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = t === !0 ? "auto" : t ? "pan-" + t + (xe.isTouch ? " pinch-zoom" : "") : "none", e === Tt && s(te, t)
  },
  On = {
    auto: 1,
    scroll: 1
  },
  Bf = function(e) {
    var t = e.event,
      r = e.target,
      i = e.axis,
      n = (t.changedTouches ? t.changedTouches[0] : t).target,
      o = n._gsap || R.core.getCache(n),
      a = We(),
      l;
    if (!o._isScrollT || a - o._isScrollT > 2e3) {
      for (; n && n !== te && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(On[(l = It(n)).overflowY] || On[l.overflowX]));) n = n.parentNode;
      o._isScroll = n && n !== r && !ri(n) && (On[(l = It(n)).overflowY] || On[l.overflowX]), o._isScrollT = a
    }(o._isScroll || i === "x") && (t.stopPropagation(), t._gsapAllow = !0)
  },
  $l = function(e, t, r, i) {
    return xe.create({
      target: e,
      capture: !0,
      debounce: !1,
      lockAxis: !0,
      type: t,
      onWheel: i = i && Bf,
      onPress: i,
      onDrag: i,
      onScroll: i,
      onEnable: function() {
        return r && De(re, xe.eventTypes[0], pa, !1, !0)
      },
      onDisable: function() {
        return Ae(re, xe.eventTypes[0], pa, !0)
      }
    })
  },
  Nf = /(input|label|select|textarea)/i,
  ca, pa = function(e) {
    var t = Nf.test(e.target.tagName);
    (t || ca) && (e._gsapAllow = !0, ca = t)
  },
  Vf = function(e) {
    $r(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
    var t = e,
      r = t.normalizeScrollX,
      i = t.momentum,
      n = t.allowNestedScroll,
      o = t.onRelease,
      a, l, u = at(e.target) || Tt,
      f = R.core.globals().ScrollSmoother,
      d = f && f.get(),
      p = Tr && (e.content && at(e.content) || d && e.content !== !1 && !d.smooth() && d.content()),
      c = zr(u, Me),
      g = zr(u, st),
      h = 1,
      m = (xe.isTouch && W.visualViewport ? W.visualViewport.scale * W.visualViewport.width : W.outerWidth) / W.innerWidth,
      _ = 0,
      w = je(i) ? function() {
        return i(a)
      } : function() {
        return i || 2.8
      },
      v, y, x = $l(u, e.type, !0, n),
      M = function() {
        return y = !1
      },
      b = Ut,
      E = Ut,
      P = function() {
        l = Qt(u, Me), E = Ki(Tr ? 1 : 0, l), r && (b = Ki(0, Qt(u, st))), v = ti
      },
      S = function() {
        p._gsap.y = Yi(parseFloat(p._gsap.y) + c.offset) + "px", p.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(p._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0
      },
      O = function() {
        if (y) {
          requestAnimationFrame(M);
          var F = Yi(a.deltaY / 2),
            q = E(c.v - F);
          if (p && q !== c.v + c.offset) {
            c.offset = q - c.v;
            var T = Yi((parseFloat(p && p._gsap.y) || 0) - c.offset);
            p.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + T + ", 0, 1)", p._gsap.y = T + "px", c.cacheID = U.cache, cr()
          }
          return !0
        }
        c.offset && S(), y = !0
      },
      k, A, z, N, I = function() {
        P(), k.isActive() && k.vars.scrollY > l && (c() > l ? k.progress(1) && c(l) : k.resetTo("scrollY", l))
      };
    return p && R.set(p, {
      y: "+=0"
    }), e.ignoreCheck = function(L) {
      return Tr && L.type === "touchmove" && O() || h > 1.05 && L.type !== "touchstart" || a.isGesturing || L.touches && L.touches.length > 1
    }, e.onPress = function() {
      y = !1;
      var L = h;
      h = Yi((W.visualViewport && W.visualViewport.scale || 1) / m), k.pause(), L !== h && Ts(u, h > 1.01 ? !0 : r ? !1 : "x"), A = g(), z = c(), P(), v = ti
    }, e.onRelease = e.onGestureStart = function(L, F) {
      if (c.offset && S(), !F) N.restart(!0);
      else {
        U.cache++;
        var q = w(),
          T, ie;
        r && (T = g(), ie = T + q * .05 * -L.velocityX / .227, q *= da(g, T, ie, Qt(u, st)), k.vars.scrollX = b(ie)), T = c(), ie = T + q * .05 * -L.velocityY / .227, q *= da(c, T, ie, Qt(u, Me)), k.vars.scrollY = E(ie), k.invalidate().duration(q).play(.01), (Tr && k.vars.scrollY >= l || T >= l - 1) && R.to({}, {
          onUpdate: I,
          duration: q
        })
      }
      o && o(L)
    }, e.onWheel = function() {
      k._ts && k.pause(), We() - _ > 1e3 && (v = 0, _ = We())
    }, e.onChange = function(L, F, q, T, ie) {
      if (ti !== v && P(), F && r && g(b(T[2] === F ? A + (L.startX - L.x) : g() + F - T[1])), q) {
        c.offset && S();
        var ze = ie[2] === q,
          Ft = ze ? z + L.startY - L.y : c() + q - ie[1],
          pe = E(Ft);
        ze && Ft !== pe && (z += pe - Ft), c(pe)
      }(q || F) && cr()
    }, e.onEnable = function() {
      Ts(u, r ? !1 : "x"), X.addEventListener("refresh", I), De(W, "resize", I), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = g.smooth = !1), x.enable()
    }, e.onDisable = function() {
      Ts(u, !0), Ae(W, "resize", I), X.removeEventListener("refresh", I), x.kill()
    }, e.lockAxis = e.lockAxis !== !1, a = new xe(e), a.iOS = Tr, Tr && !c() && c(1), Tr && R.ticker.add(Ut), N = a._dc, k = R.to(a, {
      ease: "power4",
      paused: !0,
      inherit: !1,
      scrollX: r ? "+=0.1" : "+=0",
      scrollY: "+=0.1",
      modifiers: {
        scrollY: Xl(c, c(), function() {
          return k.pause()
        })
      },
      onUpdate: cr,
      onComplete: N.vars.onComplete
    }), a
  };
X.sort = function(s) {
  if (je(s)) return $.sort(s);
  var e = W.pageYOffset || 0;
  return X.getAll().forEach(function(t) {
    return t._sortY = t.trigger ? e + t.trigger.getBoundingClientRect().top : t.start + W.innerHeight
  }), $.sort(s || function(t, r) {
    return (t.vars.refreshPriority || 0) * -1e6 + (t.vars.containerAnimation ? 1e6 : t._sortY) - ((r.vars.containerAnimation ? 1e6 : r._sortY) + (r.vars.refreshPriority || 0) * -1e6)
  })
};
X.observe = function(s) {
  return new xe(s)
};
X.normalizeScroll = function(s) {
  if (typeof s > "u") return rt;
  if (s === !0 && rt) return rt.enable();
  if (s === !1) {
    rt && rt.kill(), rt = s;
    return
  }
  var e = s instanceof xe ? s : Vf(s);
  return rt && rt.target === e.target && rt.kill(), ri(e.target) && (rt = e), e
};
X.core = {
  _getVelocityProp: $s,
  _inputObserver: $l,
  _scrollers: U,
  _proxies: Jt,
  bridge: {
    ss: function() {
      Rt || ni("scrollStart"), Rt = We()
    },
    ref: function() {
      return $e
    }
  }
};
Ll() && R.registerPlugin(X);
K.registerPlugin(X);
const Gf = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Yf() {
  function s(e, t, r) {
    e.getBoundingClientRect().top < window.innerHeight * .85 ? t.delay(r || .3).play() : X.create({
      trigger: e,
      comeca: "top 85%",
      onEnter: () => t.play()
    })
  }
  document.querySelectorAll('[data-anim="card-revelar"]').forEach(e => {
    const t = K.timeline({
      paused: !0
    });
    t.from(e, {
      autoAlpha: 0,
      scale: .92,
      duration: .55,
      ease: "power3.out"
    });
    const r = e.querySelectorAll('[data-anim="fade-up"]');
    r.length && t.from(r, {
      autoAlpha: 0,
      y: 10,
      duration: .4,
      stagger: .1,
      ease: "power2.out"
    }, "-=0.4"), e.querySelectorAll('[data-anim="progress"]').forEach(n => {
      const o = n.firstElementChild;
      if (o) {
        const a = o.style.width || "49%";
        K.set(o, {
          width: "0%"
        }), t.to(o, {
          width: a,
          duration: .9,
          ease: "power2.inOut"
        }, "-=0.15")
      }
    }), e.querySelectorAll('[data-anim="stagger-rows"]').forEach(n => {
      t.from(n.children, {
        autoAlpha: 0,
        x: 20,
        duration: .4,
        stagger: .1,
        ease: "power2.out"
      }, "-=0.35")
    });
    const i = e.querySelector('[data-anim="bar-grow"]');
    if (i) {
      const n = i.querySelectorAll(".bcard_bar");
      n.forEach(a => K.set(a, {
        scaleY: 0,
        transformOrigin: "bottom center"
      }));
      const o = i.querySelectorAll(".bcard_text-year");
      t.from(o, {
        autoAlpha: 0,
        y: 6,
        duration: .25,
        stagger: .05,
        ease: "power2.out"
      }, "-=0.3"), t.to(n, {
        scaleY: 1,
        duration: .6,
        stagger: .09,
        ease: "back.out(1.4)"
      }, "-=0.1")
    }
    e.querySelectorAll('[data-anim="stagger-text"]').forEach(n => {
      t.from(n.children, {
        autoAlpha: 0,
        y: 12,
        duration: .35,
        stagger: .09,
        ease: "power2.out"
      }, "-=0.35")
    }), s(e, t, .3)
  }), document.querySelectorAll('[data-anim="orbit-revelar"]').forEach(e => {
    const t = K.timeline({
        paused: !0
      }),
      r = e.querySelectorAll(".ocard_ring");
    t.from(e, {
      autoAlpha: 0,
      duration: .25
    }), t.from(r, {
      scale: 0,
      autoAlpha: 0,
      duration: .45,
      ease: "back.out(2)"
    }, "-=0.15");
    const i = e.querySelector('[data-anim="fade-up"]');
    i && t.from(i, {
      scale: 0,
      autoAlpha: 0,
      duration: .45,
      ease: "back.out(2)"
    }, "-=0.4");
    const n = e.querySelectorAll('[data-anim="pill-float"]');
    n.forEach(o => {
      t.from(o, {
        autoAlpha: 0,
        scale: .7,
        duration: .5,
        ease: "back.out(1.5)"
      }, "-=0.35")
    }), t.call(() => {
      const o = e.getBoundingClientRect(),
        a = o.left + o.width / 2,
        l = o.top + o.height / 2,
        u = [50, 60, 45];
      n.forEach((f, d) => {
        const p = f.getBoundingClientRect(),
          c = p.left + p.width / 2,
          g = p.top + p.height / 2,
          h = c - a,
          m = g - l,
          _ = Math.sqrt(h * h + m * m),
          w = Math.atan2(m, h),
          v = Math.cos(w) * _,
          y = Math.sin(w) * _,
          x = 2 * Math.PI / (u[d] || 50);
        let M = w;
        K.ticker.add(() => {
          M += x * K.ticker.deltaRatio(60) / 60, K.set(f, {
            x: Math.cos(M) * _ - v,
            y: Math.sin(M) * _ - y
          })
        })
      })
    }), s(e, t, .3)
  }), document.querySelectorAll('[data-anim="fade-up"]').forEach(e => {
    if (e.closest('[data-anim="card-revelar"]') || e.closest('[data-anim="orbit-revelar"]')) return;
    const t = K.timeline({
      paused: !0
    });
    t.from(e, {
      autoAlpha: 0,
      y: 40,
      duration: .7,
      ease: "power2.out"
    }), s(e, t, .2)
  }), ha('[data-anim="marquee-right"]', "left", 35), ha('[data-anim="marquee-left"]', "right", 35)
}

function ha(s, e, t) {
  document.querySelectorAll(s).forEach(r => {
    const i = K.utils.toArray(r.children);
    if (!i.length) return;
    const n = i.length / 2;
    let o = 0;
    for (let l = 0; l < n; l++) o += i[l].offsetWidth + parseFloat(getComputedStyle(r).gap || "0");
    const a = o / t;
    e === "left" ? (K.set(r, {
      x: 0
    }), K.to(r, {
      x: -o,
      duration: a,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: K.utils.unitize(l => parseFloat(l) % o)
      }
    })) : (K.set(r, {
      x: -o
    }), K.to(r, {
      x: 0,
      duration: a,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: K.utils.unitize(l => -o + (parseFloat(l) + o) % o)
      }
    }))
  })
}

function Hf() {
  if (!document.querySelector("[hero-text], [data-hero-bg], [data-hero-visual], [data-hero-wrap], [data-hero-fade]")) return;
  const e = K.timeline();
  K.utils.toArray("[data-hero-wrap]").forEach(n => {
    e.from(n, {
      scale: 1.1,
      duration: 1,
      ease: "power1.out"
    }, 0)
  });
  const t = K.utils.toArray("[data-hero-fade]");
  t.length && e.from(t, {
    autoAlpha: 0,
    y: "2rem",
    duration: .8,
    stagger: .12,
    ease: "power2.out"
  }, 0), K.utils.toArray("[data-hero-bg]").forEach(n => {
    e.from(n, {
      scale: 1.2,
      duration: 1.5,
      ease: "power1.inOut"
    }, 0)
  }), K.utils.toArray("[data-hero-visual]").forEach(n => {
    e.from(n, {
      scale: 0,
      autoAlpha: 0,
      duration: 1.25,
      ease: "back.out(1.7)"
    }, 0)
  });
  const r = K.utils.toArray("[hero-text]");
  r.length && e.from(r, {
    autoAlpha: 0,
    y: "1.5rem",
    duration: .6,
    stagger: .1,
    ease: "power2.out"
  }, 0);
  const i = K.utils.toArray("[data-hero-button]");
  i.length && e.from(i, {
    scale: 0,
    autoAlpha: 0,
    duration: .6,
    stagger: {
      amount: .25
    },
    ease: "power2.out"
  }, .3), K.utils.toArray("[data-hero-stairs]").forEach(n => {
    const o = n.querySelector(":scope > div:not(.avatars-wrap)"),
      a = K.utils.toArray(n.querySelectorAll(".avatar-item")),
      l = [o, ...a].filter(Boolean);
    l.length && e.from(l, {
      x: -32,
      autoAlpha: 0,
      duration: .6,
      stagger: .1,
      ease: "power3.out"
    }, .15)
  })
}

function qf() {
  K.utils.toArray("._3d .group").forEach(s => {
    K.to(s, {
      rotation: "-=360",
      duration: 40,
      ease: "none",
      repeat: -1
    })
  })
}

function Xf() {
  document.querySelectorAll(".loop").forEach(s => {
    s.querySelectorAll(".loop_logos").length < 2 || K.to(s, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1
    })
  })
}

function $f() {
  document.querySelectorAll(".loop_img, .testi_loop").forEach(s => {
    s.children.length < 2 || K.to(s, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1
    })
  })
}

function Wf() {
  window.matchMedia("(max-width: 767px)").matches || K.utils.toArray(".title-wrap").forEach(s => {
    const e = s.querySelectorAll(".title-icon");
    e.length && K.from(e, {
      width: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: s,
        comeca: "top 60%",
        once: !0
      }
    })
  })
}

function Uf() {
  document.querySelectorAll("[fs-numbercount-element='number'], [fs-numbercount-end]").forEach(s => {
    const e = parseFloat(s.getAttribute("fs-numbercount-end") || s.textContent || "0"),
      t = parseFloat(s.getAttribute("fs-numbercount-comeca") || "0"),
      r = parseFloat(s.getAttribute("fs-numbercount-duration") || "2000") / 1e3;
    if (isNaN(e)) return;
    const n = (s.textContent || "").trim().replace(/[\d.,\s]/g, ""),
      o = {
        v: t
      },
      a = () => {
        s.textContent = Math.round(o.v).toLocaleString("en-US") + n
      };
    a(), X.create({
      trigger: s,
      comeca: "top 90%",
      once: !0,
      onEnter: () => K.to(o, {
        v: e,
        duration: r,
        ease: "power1.out",
        onUpdate: a
      })
    })
  })
}

function jf() {
  document.querySelectorAll("[data-reveal]").forEach(s => {
    const e = s.getAttribute("data-reveal") || "up",
      t = {
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out"
      };
    e === "scale" ? t.scale = parseFloat(s.getAttribute("data-reveal-scale") || "0.92") : e === "right" ? t.x = "5rem" : t.y = 40, K.from(s, {
      ...t,
      scrollTrigger: {
        trigger: s,
        comeca: "top 90%",
        once: !0
      }
    })
  })
}

function Kf() {
  document.querySelectorAll("[data-stagger]").forEach(s => {
    const e = s.getAttribute("data-stagger"),
      t = e ? s.querySelectorAll(e) : s.children;
    t.length && K.from(t, {
      autoAlpha: 0,
      y: 28,
      duration: .6,
      stagger: .12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: s,
        comeca: "top 85%",
        once: !0
      }
    })
  })
}

function ga() {
  if (Gf) {
    K.set("[data-anim], [hero-text], [data-hero-bg], [data-hero-visual], [data-hero-wrap], [data-hero-fade], [data-hero-button], [data-hero-stairs] *, [data-stagger] > *, [data-reveal]", {
      clearProps: "all",
      autoAlpha: 1
    });
    return
  }
  Yf(), Hf(), qf(), Wf(), Xf(), $f(), Uf(), jf(), Kf(), window.addEventListener("load", () => X.refresh())
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ga) : ga();

function ma(s) {
  return s !== null && typeof s == "object" && "constructor" in s && s.constructor === Object
}

function ko(s, e) {
  s === void 0 && (s = {}), e === void 0 && (e = {});
  const t = ["__proto__", "constructor", "prototype"];
  Object.keys(e).filter(r => t.indexOf(r) < 0).forEach(r => {
    typeof s[r] > "u" ? s[r] = e[r] : ma(e[r]) && ma(s[r]) && Object.keys(e[r]).length > 0 && ko(s[r], e[r])
  })
}
const Wl = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ""
  },
  querySelector() {
    return null
  },
  querySelectorAll() {
    return []
  },
  getElementById() {
    return null
  },
  createEvent() {
    return {
      initEvent() {}
    }
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return []
      }
    }
  },
  createElementNS() {
    return {}
  },
  importNode() {
    return null
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};

function gr() {
  const s = typeof document < "u" ? document : {};
  return ko(s, Wl), s
}
const Qf = {
  document: Wl,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {}
  },
  CustomEvent: function() {
    return this
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ""
      }
    }
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {}
  },
  requestAnimationFrame(s) {
    return typeof setTimeout > "u" ? (s(), null) : setTimeout(s, 0)
  },
  cancelAnimationFrame(s) {
    typeof setTimeout > "u" || clearTimeout(s)
  }
};

function Le() {
  const s = typeof window < "u" ? window : {};
  return ko(s, Qf), s
}

function Zf(s) {
  return s === void 0 && (s = ""), s.trim().split(" ").filter(e => !!e.trim())
}

function Jf(s) {
  const e = s;
  Object.keys(e).forEach(t => {
    try {
      e[t] = null
    } catch {}
    try {
      delete e[t]
    } catch {}
  })
}

function ts(s, e) {
  return e === void 0 && (e = 0), setTimeout(s, e)
}

function fr() {
  return Date.now()
}

function ed(s) {
  const e = Le();
  let t;
  return e.getComputedStyle && (t = e.getComputedStyle(s, null)), !t && s.currentStyle && (t = s.currentStyle), t || (t = s.style), t
}

function td(s, e) {
  e === void 0 && (e = "x");
  const t = Le();
  let r, i, n;
  const o = ed(s);
  return t.WebKitCSSMatrix ? (i = o.transform || o.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map(a => a.replace(",", ".")).join(", ")), n = new t.WebKitCSSMatrix(i === "none" ? "" : i)) : (n = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), r = n.toString().split(",")), e === "x" && (t.WebKitCSSMatrix ? i = n.m41 : r.length === 16 ? i = parseFloat(r[12]) : i = parseFloat(r[4])), e === "y" && (t.WebKitCSSMatrix ? i = n.m42 : r.length === 16 ? i = parseFloat(r[13]) : i = parseFloat(r[5])), i || 0
}

function An(s) {
  return typeof s == "object" && s !== null && s.constructor && Object.prototype.toString.call(s).slice(8, -1) === "Object"
}

function rd(s) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? s instanceof HTMLElement : s && (s.nodeType === 1 || s.nodeType === 11)
}

function xt() {
  const s = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    e = ["__proto__", "constructor", "prototype"];
  for (let t = 1; t < arguments.length; t += 1) {
    const r = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (r != null && !rd(r)) {
      const i = Object.keys(Object(r)).filter(n => e.indexOf(n) < 0);
      for (let n = 0, o = i.length; n < o; n += 1) {
        const a = i[n],
          l = Object.getOwnPropertyDescriptor(r, a);
        l !== void 0 && l.enumerable && (An(s[a]) && An(r[a]) ? r[a].__swiper__ ? s[a] = r[a] : xt(s[a], r[a]) : !An(s[a]) && An(r[a]) ? (s[a] = {}, r[a].__swiper__ ? s[a] = r[a] : xt(s[a], r[a])) : s[a] = r[a])
      }
    }
  }
  return s
}

function Dn(s, e, t) {
  s.style.setProperty(e, t)
}

function Ul(s) {
  let {
    swiper: e,
    targetPosition: t,
    side: r
  } = s;
  const i = Le(),
    n = -e.translate;
  let o = null,
    a;
  const l = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(e.cssModeFrameID);
  const u = t > n ? "next" : "prev",
    f = (p, c) => u === "next" && p >= c || u === "prev" && p <= c,
    d = () => {
      a = new Date().getTime(), o === null && (o = a);
      const p = Math.max(Math.min((a - o) / l, 1), 0),
        c = .5 - Math.cos(p * Math.PI) / 2;
      let g = n + c * (t - n);
      if (f(g, t) && (g = t), e.wrapperEl.scrollTo({
          [r]: g
        }), f(g, t)) {
        e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
          e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
            [r]: g
          })
        }), i.cancelAnimationFrame(e.cssModeFrameID);
        return
      }
      e.cssModeFrameID = i.requestAnimationFrame(d)
    };
  d()
}

function jl(s) {
  return s.querySelector(".swiper-slide-transform") || s.shadowRoot && s.shadowRoot.querySelector(".swiper-slide-transform") || s
}

function Zt(s, e) {
  e === void 0 && (e = "");
  const t = Le(),
    r = [...s.children];
  return t.HTMLSlotElement && s instanceof HTMLSlotElement && r.push(...s.assignedElements()), e ? r.filter(i => i.matches(e)) : r
}

function id(s, e) {
  const t = [e];
  for (; t.length > 0;) {
    const r = t.shift();
    if (s === r) return !0;
    t.push(...r.children, ...r.shadowRoot ? r.shadowRoot.children : [], ...r.assignedElements ? r.assignedElements() : [])
  }
}

function nd(s, e) {
  const t = Le();
  let r = e.contains(s);
  return !r && t.HTMLSlotElement && e instanceof HTMLSlotElement && (r = [...e.assignedElements()].includes(s), r || (r = id(s, e))), r
}

function rs(s) {
  try {
    console.warn(s);
    return
  } catch {}
}

function is(s, e) {
  e === void 0 && (e = []);
  const t = document.createElement(s);
  return t.classList.add(...Array.isArray(e) ? e : Zf(e)), t
}

function sd(s) {
  const e = Le(),
    t = gr(),
    r = s.getBoundingClientRect(),
    i = t.body,
    n = s.clientTop || i.clientTop || 0,
    o = s.clientLeft || i.clientLeft || 0,
    a = s === e ? e.scrollY : s.scrollTop,
    l = s === e ? e.scrollX : s.scrollLeft;
  return {
    top: r.top + a - n,
    left: r.left + l - o
  }
}

function od(s, e) {
  const t = [];
  for (; s.previousElementSibling;) {
    const r = s.previousElementSibling;
    e ? r.matches(e) && t.push(r) : t.push(r), s = r
  }
  return t
}

function ad(s, e) {
  const t = [];
  for (; s.nextElementSibling;) {
    const r = s.nextElementSibling;
    e ? r.matches(e) && t.push(r) : t.push(r), s = r
  }
  return t
}

function Mr(s, e) {
  return Le().getComputedStyle(s, null).getPropertyValue(e)
}

function _a(s) {
  let e = s,
    t;
  if (e) {
    for (t = 0;
      (e = e.previousSibling) !== null;) e.nodeType === 1 && (t += 1);
    return t
  }
}

function eo(s, e) {
  const t = [];
  let r = s.parentElement;
  for (; r;) e ? r.matches(e) && t.push(r) : t.push(r), r = r.parentElement;
  return t
}

function ld(s, e) {
  function t(r) {
    r.target === s && (e.call(s, r), s.removeEventListener("transitionend", t))
  }
  e && s.addEventListener("transitionend", t)
}

function va(s, e, t) {
  const r = Le();
  return s[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(r.getComputedStyle(s, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(r.getComputedStyle(s, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom"))
}

function or(s) {
  return (Array.isArray(s) ? s : [s]).filter(e => !!e)
}
let bs;

function ud() {
  const s = Le(),
    e = gr();
  return {
    smoothScroll: e.documentElement && e.documentElement.style && "scrollBehavior" in e.documentElement.style,
    touch: !!("ontouchstart" in s || s.DocumentTouch && e instanceof s.DocumentTouch)
  }
}

function Kl() {
  return bs || (bs = ud()), bs
}
let Ss;

function fd(s) {
  let {
    userAgent: e
  } = s === void 0 ? {} : s;
  const t = Kl(),
    r = Le(),
    i = r.navigator.platform,
    n = e || r.navigator.userAgent,
    o = {
      ios: !1,
      android: !1
    },
    a = r.screen.width,
    l = r.screen.height,
    u = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let f = n.match(/(iPad).*OS\s([\d_]+)/);
  const d = n.match(/(iPod)(.*OS\s([\d_]+))?/),
    p = !f && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    c = i === "Win32";
  let g = i === "MacIntel";
  const h = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !f && g && t.touch && h.indexOf(`${a}x${l}`) >= 0 && (f = n.match(/(Version)\/([\d.]+)/), f || (f = [0, 1, "13_0_0"]), g = !1), u && !c && (o.os = "android", o.android = !0), (f || p || d) && (o.os = "ios", o.ios = !0), o
}

function Ql(s) {
  return s === void 0 && (s = {}), Ss || (Ss = fd(s)), Ss
}
let Es;

function dd() {
  const s = Le(),
    e = Ql();
  let t = !1;

  function r() {
    const a = s.navigator.userAgent.toLowerCase();
    return a.indexOf("safari") >= 0 && a.indexOf("chrome") < 0 && a.indexOf("android") < 0
  }
  if (r()) {
    const a = String(s.navigator.userAgent);
    if (a.includes("Version/")) {
      const [l, u] = a.split("Version/")[1].split(" ")[0].split(".").map(f => Number(f));
      t = l < 16 || l === 16 && u < 2
    }
  }
  const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(s.navigator.userAgent),
    n = r(),
    o = n || i && e.ios;
  return {
    isSafari: t || n,
    needPerspectiveFix: t,
    need3dFix: o,
    isWebView: i
  }
}

function Zl() {
  return Es || (Es = dd()), Es
}

function cd(s) {
  let {
    swiper: e,
    on: t,
    emit: r
  } = s;
  const i = Le();
  let n = null,
    o = null;
  const a = () => {
      !e || e.destroyed || !e.initialized || (r("beforeResize"), r("resize"))
    },
    l = () => {
      !e || e.destroyed || !e.initialized || (n = new ResizeObserver(d => {
        o = i.requestAnimationFrame(() => {
          const {
            width: p,
            height: c
          } = e;
          let g = p,
            h = c;
          d.forEach(m => {
            let {
              contentBoxSize: _,
              contentRect: w,
              target: v
            } = m;
            v && v !== e.el || (g = w ? w.width : (_[0] || _).inlineSize, h = w ? w.height : (_[0] || _).blockSize)
          }), (g !== p || h !== c) && a()
        })
      }), n.observe(e.el))
    },
    u = () => {
      o && i.cancelAnimationFrame(o), n && n.unobserve && e.el && (n.unobserve(e.el), n = null)
    },
    f = () => {
      !e || e.destroyed || !e.initialized || r("orientationchange")
    };
  t("init", () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver < "u") {
      l();
      return
    }
    i.addEventListener("resize", a), i.addEventListener("orientationchange", f)
  }), t("destroy", () => {
    u(), i.removeEventListener("resize", a), i.removeEventListener("orientationchange", f)
  })
}

function pd(s) {
  let {
    swiper: e,
    extendParams: t,
    on: r,
    emit: i
  } = s;
  const n = [],
    o = Le(),
    a = function(f, d) {
      d === void 0 && (d = {});
      const p = o.MutationObserver || o.WebkitMutationObserver,
        c = new p(g => {
          if (e.__preventObserver__) return;
          if (g.length === 1) {
            i("observerUpdate", g[0]);
            return
          }
          const h = function() {
            i("observerUpdate", g[0])
          };
          o.requestAnimationFrame ? o.requestAnimationFrame(h) : o.setTimeout(h, 0)
        });
      c.observe(f, {
        attributes: typeof d.attributes > "u" ? !0 : d.attributes,
        childList: e.isElement || (typeof d.childList > "u" ? !0 : d).childList,
        characterData: typeof d.characterData > "u" ? !0 : d.characterData
      }), n.push(c)
    },
    l = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const f = eo(e.hostEl);
          for (let d = 0; d < f.length; d += 1) a(f[d])
        }
        a(e.hostEl, {
          childList: e.params.observeSlideChildren
        }), a(e.wrapperEl, {
          attributes: !1
        })
      }
    },
    u = () => {
      n.forEach(f => {
        f.disconnect()
      }), n.splice(0, n.length)
    };
  t({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), r("init", l), r("destroy", u)
}
var hd = {
  on(s, e, t) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof e != "function") return r;
    const i = t ? "unshift" : "push";
    return s.split(" ").forEach(n => {
      r.eventsListeners[n] || (r.eventsListeners[n] = []), r.eventsListeners[n][i](e)
    }), r
  },
  once(s, e, t) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof e != "function") return r;

    function i() {
      r.off(s, i), i.__emitterProxy && delete i.__emitterProxy;
      for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++) o[a] = arguments[a];
      e.apply(r, o)
    }
    return i.__emitterProxy = e, r.on(s, i, t)
  },
  onAny(s, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof s != "function") return t;
    const r = e ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(s) < 0 && t.eventsAnyListeners[r](s), t
  },
  offAny(s) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const t = e.eventsAnyListeners.indexOf(s);
    return t >= 0 && e.eventsAnyListeners.splice(t, 1), e
  },
  off(s, e) {
    const t = this;
    return !t.eventsListeners || t.destroyed || !t.eventsListeners || s.split(" ").forEach(r => {
      typeof e > "u" ? t.eventsListeners[r] = [] : t.eventsListeners[r] && t.eventsListeners[r].forEach((i, n) => {
        (i === e || i.__emitterProxy && i.__emitterProxy === e) && t.eventsListeners[r].splice(n, 1)
      })
    }), t
  },
  emit() {
    const s = this;
    if (!s.eventsListeners || s.destroyed || !s.eventsListeners) return s;
    let e, t, r;
    for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++) n[o] = arguments[o];
    return typeof n[0] == "string" || Array.isArray(n[0]) ? (e = n[0], t = n.slice(1, n.length), r = s) : (e = n[0].events, t = n[0].data, r = n[0].context || s), t.unshift(r), (Array.isArray(e) ? e : e.split(" ")).forEach(l => {
      s.eventsAnyListeners && s.eventsAnyListeners.length && s.eventsAnyListeners.forEach(u => {
        u.apply(r, [l, ...t])
      }), s.eventsListeners && s.eventsListeners[l] && s.eventsListeners[l].forEach(u => {
        u.apply(r, t)
      })
    }), s
  }
};

function gd() {
  const s = this;
  let e, t;
  const r = s.el;
  typeof s.params.width < "u" && s.params.width !== null ? e = s.params.width : e = r.clientWidth, typeof s.params.height < "u" && s.params.height !== null ? t = s.params.height : t = r.clientHeight, !(e === 0 && s.isHorizontal() || t === 0 && s.isVertical()) && (e = e - parseInt(Mr(r, "padding-left") || 0, 10) - parseInt(Mr(r, "padding-right") || 0, 10), t = t - parseInt(Mr(r, "padding-top") || 0, 10) - parseInt(Mr(r, "padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(t) && (t = 0), Object.assign(s, {
    width: e,
    height: t,
    size: s.isHorizontal() ? e : t
  }))
}

function md() {
  const s = this;

  function e(S, O) {
    return parseFloat(S.getPropertyValue(s.getDirectionLabel(O)) || 0)
  }
  const t = s.params,
    {
      wrapperEl: r,
      slidesEl: i,
      size: n,
      rtlTranslate: o,
      wrongRTL: a
    } = s,
    l = s.virtual && t.virtual.enabled,
    u = l ? s.virtual.slides.length : s.slides.length,
    f = Zt(i, `.${s.params.slideClass}, swiper-slide`),
    d = l ? s.virtual.slides.length : f.length;
  let p = [];
  const c = [],
    g = [];
  let h = t.slidesOffsetBefore;
  typeof h == "function" && (h = t.slidesOffsetBefore.call(s));
  let m = t.slidesOffsetAfter;
  typeof m == "function" && (m = t.slidesOffsetAfter.call(s));
  const _ = s.snapGrid.length,
    w = s.slidesGrid.length;
  let v = t.spaceBetween,
    y = -h,
    x = 0,
    M = 0;
  if (typeof n > "u") return;
  typeof v == "string" && v.indexOf("%") >= 0 ? v = parseFloat(v.replace("%", "")) / 100 * n : typeof v == "string" && (v = parseFloat(v)), s.virtualSize = -v, f.forEach(S => {
    o ? S.style.marginLeft = "" : S.style.marginRight = "", S.style.marginBottom = "", S.style.marginTop = ""
  }), t.centeredSlides && t.cssMode && (Dn(r, "--swiper-centered-offset-before", ""), Dn(r, "--swiper-centered-offset-after", ""));
  const b = t.grid && t.grid.rows > 1 && s.grid;
  b ? s.grid.initSlides(f) : s.grid && s.grid.unsetSlides();
  let E;
  const P = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter(S => typeof t.breakpoints[S].slidesPerView < "u").length > 0;
  for (let S = 0; S < d; S += 1) {
    E = 0;
    let O;
    if (f[S] && (O = f[S]), b && s.grid.updateSlide(S, O, f), !(f[S] && Mr(O, "display") === "none")) {
      if (t.slidesPerView === "auto") {
        P && (f[S].style[s.getDirectionLabel("width")] = "");
        const k = getComputedStyle(O),
          A = O.style.transform,
          z = O.style.webkitTransform;
        if (A && (O.style.transform = "none"), z && (O.style.webkitTransform = "none"), t.roundLengths) E = s.isHorizontal() ? va(O, "width") : va(O, "height");
        else {
          const N = e(k, "width"),
            I = e(k, "padding-left"),
            L = e(k, "padding-right"),
            F = e(k, "margin-left"),
            q = e(k, "margin-right"),
            T = k.getPropertyValue("box-sizing");
          if (T && T === "border-box") E = N + F + q;
          else {
            const {
              clientWidth: ie,
              offsetWidth: ze
            } = O;
            E = N + I + L + F + q + (ze - ie)
          }
        }
        A && (O.style.transform = A), z && (O.style.webkitTransform = z), t.roundLengths && (E = Math.floor(E))
      } else E = (n - (t.slidesPerView - 1) * v) / t.slidesPerView, t.roundLengths && (E = Math.floor(E)), f[S] && (f[S].style[s.getDirectionLabel("width")] = `${E}px`);
      f[S] && (f[S].swiperSlideSize = E), g.push(E), t.centeredSlides ? (y = y + E / 2 + x / 2 + v, x === 0 && S !== 0 && (y = y - n / 2 - v), S === 0 && (y = y - n / 2 - v), Math.abs(y) < 1 / 1e3 && (y = 0), t.roundLengths && (y = Math.floor(y)), M % t.slidesPerGroup === 0 && p.push(y), c.push(y)) : (t.roundLengths && (y = Math.floor(y)), (M - Math.min(s.params.slidesPerGroupSkip, M)) % s.params.slidesPerGroup === 0 && p.push(y), c.push(y), y = y + E + v), s.virtualSize += E + v, x = E, M += 1
    }
  }
  if (s.virtualSize = Math.max(s.virtualSize, n) + m, o && a && (t.effect === "slide" || t.effect === "coverflow") && (r.style.width = `${s.virtualSize+v}px`), t.setWrapperSize && (r.style[s.getDirectionLabel("width")] = `${s.virtualSize+v}px`), b && s.grid.updateWrapperSize(E, p), !t.centeredSlides) {
    const S = [];
    for (let O = 0; O < p.length; O += 1) {
      let k = p[O];
      t.roundLengths && (k = Math.floor(k)), p[O] <= s.virtualSize - n && S.push(k)
    }
    p = S, Math.floor(s.virtualSize - n) - Math.floor(p[p.length - 1]) > 1 && p.push(s.virtualSize - n)
  }
  if (l && t.loop) {
    const S = g[0] + v;
    if (t.slidesPerGroup > 1) {
      const O = Math.ceil((s.virtual.slidesBefore + s.virtual.slidesAfter) / t.slidesPerGroup),
        k = S * t.slidesPerGroup;
      for (let A = 0; A < O; A += 1) p.push(p[p.length - 1] + k)
    }
    for (let O = 0; O < s.virtual.slidesBefore + s.virtual.slidesAfter; O += 1) t.slidesPerGroup === 1 && p.push(p[p.length - 1] + S), c.push(c[c.length - 1] + S), s.virtualSize += S
  }
  if (p.length === 0 && (p = [0]), v !== 0) {
    const S = s.isHorizontal() && o ? "marginLeft" : s.getDirectionLabel("marginRight");
    f.filter((O, k) => !t.cssMode || t.loop ? !0 : k !== f.length - 1).forEach(O => {
      O.style[S] = `${v}px`
    })
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let S = 0;
    g.forEach(k => {
      S += k + (v || 0)
    }), S -= v;
    const O = S > n ? S - n : 0;
    p = p.map(k => k <= 0 ? -h : k > O ? O + m : k)
  }
  if (t.centerInsufficientSlides) {
    let S = 0;
    g.forEach(k => {
      S += k + (v || 0)
    }), S -= v;
    const O = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (S + O < n) {
      const k = (n - S - O) / 2;
      p.forEach((A, z) => {
        p[z] = A - k
      }), c.forEach((A, z) => {
        c[z] = A + k
      })
    }
  }
  if (Object.assign(s, {
      slides: f,
      snapGrid: p,
      slidesGrid: c,
      slidesSizesGrid: g
    }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    Dn(r, "--swiper-centered-offset-before", `${-p[0]}px`), Dn(r, "--swiper-centered-offset-after", `${s.size/2-g[g.length-1]/2}px`);
    const S = -s.snapGrid[0],
      O = -s.slidesGrid[0];
    s.snapGrid = s.snapGrid.map(k => k + S), s.slidesGrid = s.slidesGrid.map(k => k + O)
  }
  if (d !== u && s.emit("slidesLengthChange"), p.length !== _ && (s.params.watchOverflow && s.checkOverflow(), s.emit("snapGridLengthChange")), c.length !== w && s.emit("slidesGridLengthChange"), t.watchSlidesProgress && s.updateSlidesOffset(), s.emit("slidesUpdated"), !l && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const S = `${t.containerModifierClass}backface-hidden`,
      O = s.el.classList.contains(S);
    d <= t.maxBackfaceHiddenSlides ? O || s.el.classList.add(S) : O && s.el.classList.remove(S)
  }
}

function _d(s) {
  const e = this,
    t = [],
    r = e.virtual && e.params.virtual.enabled;
  let i = 0,
    n;
  typeof s == "number" ? e.setTransition(s) : s === !0 && e.setTransition(e.params.speed);
  const o = a => r ? e.slides[e.getSlideIndexByData(a)] : e.slides[a];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)(e.visibleSlides || []).forEach(a => {
      t.push(a)
    });
    else
      for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
        const a = e.activeIndex + n;
        if (a > e.slides.length && !r) break;
        t.push(o(a))
      } else t.push(o(e.activeIndex));
  for (n = 0; n < t.length; n += 1)
    if (typeof t[n] < "u") {
      const a = t[n].offsetHeight;
      i = a > i ? a : i
    }(i || i === 0) && (e.wrapperEl.style.height = `${i}px`)
}

function vd() {
  const s = this,
    e = s.slides,
    t = s.isElement ? s.isHorizontal() ? s.wrapperEl.offsetLeft : s.wrapperEl.offsetTop : 0;
  for (let r = 0; r < e.length; r += 1) e[r].swiperSlideOffset = (s.isHorizontal() ? e[r].offsetLeft : e[r].offsetTop) - t - s.cssOverflowAdjustment()
}
const wa = (s, e, t) => {
  e && !s.classList.contains(t) ? s.classList.add(t) : !e && s.classList.contains(t) && s.classList.remove(t)
};

function wd(s) {
  s === void 0 && (s = this && this.translate || 0);
  const e = this,
    t = e.params,
    {
      slides: r,
      rtlTranslate: i,
      snapGrid: n
    } = e;
  if (r.length === 0) return;
  typeof r[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let o = -s;
  i && (o = s), e.visibleSlidesIndexes = [], e.visibleSlides = [];
  let a = t.spaceBetween;
  typeof a == "string" && a.indexOf("%") >= 0 ? a = parseFloat(a.replace("%", "")) / 100 * e.size : typeof a == "string" && (a = parseFloat(a));
  for (let l = 0; l < r.length; l += 1) {
    const u = r[l];
    let f = u.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (f -= r[0].swiperSlideOffset);
    const d = (o + (t.centeredSlides ? e.minTranslate() : 0) - f) / (u.swiperSlideSize + a),
      p = (o - n[0] + (t.centeredSlides ? e.minTranslate() : 0) - f) / (u.swiperSlideSize + a),
      c = -(o - f),
      g = c + e.slidesSizesGrid[l],
      h = c >= 0 && c <= e.size - e.slidesSizesGrid[l],
      m = c >= 0 && c < e.size - 1 || g > 1 && g <= e.size || c <= 0 && g >= e.size;
    m && (e.visibleSlides.push(u), e.visibleSlidesIndexes.push(l)), wa(u, m, t.slideVisibleClass), wa(u, h, t.slideFullyVisibleClass), u.progress = i ? -d : d, u.originalProgress = i ? -p : p
  }
}

function yd(s) {
  const e = this;
  if (typeof s > "u") {
    const f = e.rtlTranslate ? -1 : 1;
    s = e && e.translate && e.translate * f || 0
  }
  const t = e.params,
    r = e.maxTranslate() - e.minTranslate();
  let {
    progress: i,
    isBeginning: n,
    isEnd: o,
    progressLoop: a
  } = e;
  const l = n,
    u = o;
  if (r === 0) i = 0, n = !0, o = !0;
  else {
    i = (s - e.minTranslate()) / r;
    const f = Math.abs(s - e.minTranslate()) < 1,
      d = Math.abs(s - e.maxTranslate()) < 1;
    n = f || i <= 0, o = d || i >= 1, f && (i = 0), d && (i = 1)
  }
  if (t.loop) {
    const f = e.getSlideIndexByData(0),
      d = e.getSlideIndexByData(e.slides.length - 1),
      p = e.slidesGrid[f],
      c = e.slidesGrid[d],
      g = e.slidesGrid[e.slidesGrid.length - 1],
      h = Math.abs(s);
    h >= p ? a = (h - p) / g : a = (h + g - c) / g, a > 1 && (a -= 1)
  }
  Object.assign(e, {
    progress: i,
    progressLoop: a,
    isBeginning: n,
    isEnd: o
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && e.updateSlidesProgress(s), n && !l && e.emit("reachBeginning toEdge"), o && !u && e.emit("reachEnd toEdge"), (l && !n || u && !o) && e.emit("fromEdge"), e.emit("progress", i)
}
const Ps = (s, e, t) => {
  e && !s.classList.contains(t) ? s.classList.add(t) : !e && s.classList.contains(t) && s.classList.remove(t)
};

function xd() {
  const s = this,
    {
      slides: e,
      params: t,
      slidesEl: r,
      activeIndex: i
    } = s,
    n = s.virtual && t.virtual.enabled,
    o = s.grid && t.grid && t.grid.rows > 1,
    a = d => Zt(r, `.${t.slideClass}${d}, swiper-slide${d}`)[0];
  let l, u, f;
  if (n)
    if (t.loop) {
      let d = i - s.virtual.slidesBefore;
      d < 0 && (d = s.virtual.slides.length + d), d >= s.virtual.slides.length && (d -= s.virtual.slides.length), l = a(`[data-swiper-slide-index="${d}"]`)
    } else l = a(`[data-swiper-slide-index="${i}"]`);
  else o ? (l = e.find(d => d.column === i), f = e.find(d => d.column === i + 1), u = e.find(d => d.column === i - 1)) : l = e[i];
  l && (o || (f = ad(l, `.${t.slideClass}, swiper-slide`)[0], t.loop && !f && (f = e[0]), u = od(l, `.${t.slideClass}, swiper-slide`)[0], t.loop && !u === 0 && (u = e[e.length - 1]))), e.forEach(d => {
    Ps(d, d === l, t.slideActiveClass), Ps(d, d === f, t.slideNextClass), Ps(d, d === u, t.slidePrevClass)
  }), s.emitSlidesClasses()
}
const Hn = (s, e) => {
    if (!s || s.destroyed || !s.params) return;
    const t = () => s.isElement ? "swiper-slide" : `.${s.params.slideClass}`,
      r = e.closest(t());
    if (r) {
      let i = r.querySelector(`.${s.params.lazyPreloaderClass}`);
      !i && s.isElement && (r.shadowRoot ? i = r.shadowRoot.querySelector(`.${s.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
        r.shadowRoot && (i = r.shadowRoot.querySelector(`.${s.params.lazyPreloaderClass}`), i && i.remove())
      })), i && i.remove()
    }
  },
  Cs = (s, e) => {
    if (!s.slides[e]) return;
    const t = s.slides[e].querySelector('[loading="lazy"]');
    t && t.removeAttribute("loading")
  },
  to = s => {
    if (!s || s.destroyed || !s.params) return;
    let e = s.params.lazyPreloadPrevNext;
    const t = s.slides.length;
    if (!t || !e || e < 0) return;
    e = Math.min(e, t);
    const r = s.params.slidesPerView === "auto" ? s.slidesPerViewDynamic() : Math.ceil(s.params.slidesPerView),
      i = s.activeIndex;
    if (s.params.grid && s.params.grid.rows > 1) {
      const o = i,
        a = [o - e];
      a.push(...Array.from({
        length: e
      }).map((l, u) => o + r + u)), s.slides.forEach((l, u) => {
        a.includes(l.column) && Cs(s, u)
      });
      return
    }
    const n = i + r - 1;
    if (s.params.rewind || s.params.loop)
      for (let o = i - e; o <= n + e; o += 1) {
        const a = (o % t + t) % t;
        (a < i || a > n) && Cs(s, a)
      } else
        for (let o = Math.max(i - e, 0); o <= Math.min(n + e, t - 1); o += 1) o !== i && (o > n || o < i) && Cs(s, o)
  };

function Td(s) {
  const {
    slidesGrid: e,
    params: t
  } = s, r = s.rtlTranslate ? s.translate : -s.translate;
  let i;
  for (let n = 0; n < e.length; n += 1) typeof e[n + 1] < "u" ? r >= e[n] && r < e[n + 1] - (e[n + 1] - e[n]) / 2 ? i = n : r >= e[n] && r < e[n + 1] && (i = n + 1) : r >= e[n] && (i = n);
  return t.normalizeSlideIndex && (i < 0 || typeof i > "u") && (i = 0), i
}

function bd(s) {
  const e = this,
    t = e.rtlTranslate ? e.translate : -e.translate,
    {
      snapGrid: r,
      params: i,
      activeIndex: n,
      realIndex: o,
      snapIndex: a
    } = e;
  let l = s,
    u;
  const f = c => {
    let g = c - e.virtual.slidesBefore;
    return g < 0 && (g = e.virtual.slides.length + g), g >= e.virtual.slides.length && (g -= e.virtual.slides.length), g
  };
  if (typeof l > "u" && (l = Td(e)), r.indexOf(t) >= 0) u = r.indexOf(t);
  else {
    const c = Math.min(i.slidesPerGroupSkip, l);
    u = c + Math.floor((l - c) / i.slidesPerGroup)
  }
  if (u >= r.length && (u = r.length - 1), l === n && !e.params.loop) {
    u !== a && (e.snapIndex = u, e.emit("snapIndexChange"));
    return
  }
  if (l === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = f(l);
    return
  }
  const d = e.grid && i.grid && i.grid.rows > 1;
  let p;
  if (e.virtual && i.virtual.enabled && i.loop) p = f(l);
  else if (d) {
    const c = e.slides.find(h => h.column === l);
    let g = parseInt(c.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(g) && (g = Math.max(e.slides.indexOf(c), 0)), p = Math.floor(g / i.grid.rows)
  } else if (e.slides[l]) {
    const c = e.slides[l].getAttribute("data-swiper-slide-index");
    c ? p = parseInt(c, 10) : p = l
  } else p = l;
  Object.assign(e, {
    previousSnapIndex: a,
    snapIndex: u,
    previousRealIndex: o,
    realIndex: p,
    previousIndex: n,
    activeIndex: l
  }), e.initialized && to(e), e.emit("activeIndexChange"), e.emit("snapIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && (o !== p && e.emit("realIndexChange"), e.emit("slideChange"))
}

function Sd(s, e) {
  const t = this,
    r = t.params;
  let i = s.closest(`.${r.slideClass}, swiper-slide`);
  !i && t.isElement && e && e.length > 1 && e.includes(s) && [...e.slice(e.indexOf(s) + 1, e.length)].forEach(a => {
    !i && a.matches && a.matches(`.${r.slideClass}, swiper-slide`) && (i = a)
  });
  let n = !1,
    o;
  if (i) {
    for (let a = 0; a < t.slides.length; a += 1)
      if (t.slides[a] === i) {
        n = !0, o = a;
        break
      }
  }
  if (i && n) t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = o;
  else {
    t.clickedSlide = void 0, t.clickedIndex = void 0;
    return
  }
  r.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
}
var Ed = {
  updateSize: gd,
  updateSlides: md,
  updateAutoHeight: _d,
  updateSlidesOffset: vd,
  updateSlidesProgress: wd,
  updateProgress: yd,
  updateSlidesClasses: xd,
  updateActiveIndex: bd,
  updateClickedSlide: Sd
};

function Pd(s) {
  s === void 0 && (s = this.isHorizontal() ? "x" : "y");
  const e = this,
    {
      params: t,
      rtlTranslate: r,
      translate: i,
      wrapperEl: n
    } = e;
  if (t.virtualTranslate) return r ? -i : i;
  if (t.cssMode) return i;
  let o = td(n, s);
  return o += e.cssOverflowAdjustment(), r && (o = -o), o || 0
}

function Cd(s, e) {
  const t = this,
    {
      rtlTranslate: r,
      params: i,
      wrapperEl: n,
      progress: o
    } = t;
  let a = 0,
    l = 0;
  const u = 0;
  t.isHorizontal() ? a = r ? -s : s : l = s, i.roundLengths && (a = Math.floor(a), l = Math.floor(l)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? a : l, i.cssMode ? n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -a : -l : i.virtualTranslate || (t.isHorizontal() ? a -= t.cssOverflowAdjustment() : l -= t.cssOverflowAdjustment(), n.style.transform = `translate3d(${a}px, ${l}px, ${u}px)`);
  let f;
  const d = t.maxTranslate() - t.minTranslate();
  d === 0 ? f = 0 : f = (s - t.minTranslate()) / d, f !== o && t.updateProgress(s), t.emit("setTranslate", t.translate, e)
}

function Md() {
  return -this.snapGrid[0]
}

function kd() {
  return -this.snapGrid[this.snapGrid.length - 1]
}

function Od(s, e, t, r, i) {
  s === void 0 && (s = 0), e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), r === void 0 && (r = !0);
  const n = this,
    {
      params: o,
      wrapperEl: a
    } = n;
  if (n.animating && o.preventInteractionOnTransition) return !1;
  const l = n.minTranslate(),
    u = n.maxTranslate();
  let f;
  if (r && s > l ? f = l : r && s < u ? f = u : f = s, n.updateProgress(f), o.cssMode) {
    const d = n.isHorizontal();
    if (e === 0) a[d ? "scrollLeft" : "scrollTop"] = -f;
    else {
      if (!n.support.smoothScroll) return Ul({
        swiper: n,
        targetPosition: -f,
        side: d ? "left" : "top"
      }), !0;
      a.scrollTo({
        [d ? "left" : "top"]: -f,
        behavior: "smooth"
      })
    }
    return !0
  }
  return e === 0 ? (n.setTransition(0), n.setTranslate(f), t && (n.emit("beforeTransitionStart", e, i), n.emit("transitionEnd"))) : (n.setTransition(e), n.setTranslate(f), t && (n.emit("beforeTransitionStart", e, i), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(p) {
    !n || n.destroyed || p.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, n.animating = !1, t && n.emit("transitionEnd"))
  }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0
}
var Ad = {
  getTranslate: Pd,
  setTranslate: Cd,
  minTranslate: Md,
  maxTranslate: kd,
  translateTo: Od
};

function Dd(s, e) {
  const t = this;
  t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${s}ms`, t.wrapperEl.style.transitionDelay = s === 0 ? "0ms" : ""), t.emit("setTransition", s, e)
}

function Jl(s) {
  let {
    swiper: e,
    runCallbacks: t,
    direction: r,
    step: i
  } = s;
  const {
    activeIndex: n,
    previousIndex: o
  } = e;
  let a = r;
  a || (n > o ? a = "next" : n < o ? a = "prev" : a = "reset"), e.emit(`transition${i}`), t && a === "reset" ? e.emit(`slideResetTransition${i}`) : t && n !== o && (e.emit(`slideChangeTransition${i}`), a === "next" ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`))
}

function Id(s, e) {
  s === void 0 && (s = !0);
  const t = this,
    {
      params: r
    } = t;
  r.cssMode || (r.autoHeight && t.updateAutoHeight(), Jl({
    swiper: t,
    runCallbacks: s,
    direction: e,
    step: "Start"
  }))
}

function Ld(s, e) {
  s === void 0 && (s = !0);
  const t = this,
    {
      params: r
    } = t;
  t.animating = !1, !r.cssMode && (t.setTransition(0), Jl({
    swiper: t,
    runCallbacks: s,
    direction: e,
    step: "End"
  }))
}
var zd = {
  setTransition: Dd,
  transitionStart: Id,
  transitionEnd: Ld
};

function Rd(s, e, t, r, i) {
  s === void 0 && (s = 0), t === void 0 && (t = !0), typeof s == "string" && (s = parseInt(s, 10));
  const n = this;
  let o = s;
  o < 0 && (o = 0);
  const {
    params: a,
    snapGrid: l,
    slidesGrid: u,
    previousIndex: f,
    activeIndex: d,
    rtlTranslate: p,
    wrapperEl: c,
    enabled: g
  } = n;
  if (!g && !r && !i || n.destroyed || n.animating && a.preventInteractionOnTransition) return !1;
  typeof e > "u" && (e = n.params.speed);
  const h = Math.min(n.params.slidesPerGroupSkip, o);
  let m = h + Math.floor((o - h) / n.params.slidesPerGroup);
  m >= l.length && (m = l.length - 1);
  const _ = -l[m];
  if (a.normalizeSlideIndex)
    for (let b = 0; b < u.length; b += 1) {
      const E = -Math.floor(_ * 100),
        P = Math.floor(u[b] * 100),
        S = Math.floor(u[b + 1] * 100);
      typeof u[b + 1] < "u" ? E >= P && E < S - (S - P) / 2 ? o = b : E >= P && E < S && (o = b + 1) : E >= P && (o = b)
    }
  if (n.initialized && o !== d && (!n.allowSlideNext && (p ? _ > n.translate && _ > n.minTranslate() : _ < n.translate && _ < n.minTranslate()) || !n.allowSlidePrev && _ > n.translate && _ > n.maxTranslate() && (d || 0) !== o)) return !1;
  o !== (f || 0) && t && n.emit("beforeSlideChangeStart"), n.updateProgress(_);
  let w;
  o > d ? w = "next" : o < d ? w = "prev" : w = "reset";
  const v = n.virtual && n.params.virtual.enabled;
  if (!(v && i) && (p && -_ === n.translate || !p && _ === n.translate)) return n.updateActiveIndex(o), a.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), a.effect !== "slide" && n.setTranslate(_), w !== "reset" && (n.transitionStart(t, w), n.transitionEnd(t, w)), !1;
  if (a.cssMode) {
    const b = n.isHorizontal(),
      E = p ? _ : -_;
    if (e === 0) v && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), v && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
      c[b ? "scrollLeft" : "scrollTop"] = E
    })) : c[b ? "scrollLeft" : "scrollTop"] = E, v && requestAnimationFrame(() => {
      n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1
    });
    else {
      if (!n.support.smoothScroll) return Ul({
        swiper: n,
        targetPosition: E,
        side: b ? "left" : "top"
      }), !0;
      c.scrollTo({
        [b ? "left" : "top"]: E,
        behavior: "smooth"
      })
    }
    return !0
  }
  const M = Zl().isSafari;
  return v && !i && M && n.isElement && n.virtual.update(!1, !1, o), n.setTransition(e), n.setTranslate(_), n.updateActiveIndex(o), n.updateSlidesClasses(), n.emit("beforeTransitionStart", e, r), n.transitionStart(t, w), e === 0 ? n.transitionEnd(t, w) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(E) {
    !n || n.destroyed || E.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(t, w))
  }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0
}

function Fd(s, e, t, r) {
  s === void 0 && (s = 0), t === void 0 && (t = !0), typeof s == "string" && (s = parseInt(s, 10));
  const i = this;
  if (i.destroyed) return;
  typeof e > "u" && (e = i.params.speed);
  const n = i.grid && i.params.grid && i.params.grid.rows > 1;
  let o = s;
  if (i.params.loop)
    if (i.virtual && i.params.virtual.enabled) o = o + i.virtual.slidesBefore;
    else {
      let a;
      if (n) {
        const p = o * i.params.grid.rows;
        a = i.slides.find(c => c.getAttribute("data-swiper-slide-index") * 1 === p).column
      } else a = i.getSlideIndexByData(o);
      const l = n ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length,
        {
          centeredSlides: u
        } = i.params;
      let f = i.params.slidesPerView;
      f === "auto" ? f = i.slidesPerViewDynamic() : (f = Math.ceil(parseFloat(i.params.slidesPerView, 10)), u && f % 2 === 0 && (f = f + 1));
      let d = l - a < f;
      if (u && (d = d || a < Math.ceil(f / 2)), r && u && i.params.slidesPerView !== "auto" && !n && (d = !1), d) {
        const p = u ? a < i.activeIndex ? "prev" : "next" : a - i.activeIndex - 1 < i.params.slidesPerView ? "next" : "prev";
        i.loopFix({
          direction: p,
          slideTo: !0,
          activeSlideIndex: p === "next" ? a + 1 : a - l + 1,
          slideRealIndex: p === "next" ? i.realIndex : void 0
        })
      }
      if (n) {
        const p = o * i.params.grid.rows;
        o = i.slides.find(c => c.getAttribute("data-swiper-slide-index") * 1 === p).column
      } else o = i.getSlideIndexByData(o)
    } return requestAnimationFrame(() => {
    i.slideTo(o, e, t, r)
  }), i
}

function Bd(s, e, t) {
  e === void 0 && (e = !0);
  const r = this,
    {
      enabled: i,
      params: n,
      animating: o
    } = r;
  if (!i || r.destroyed) return r;
  typeof s > "u" && (s = r.params.speed);
  let a = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (a = Math.max(r.slidesPerViewDynamic("current", !0), 1));
  const l = r.activeIndex < n.slidesPerGroupSkip ? 1 : a,
    u = r.virtual && n.virtual.enabled;
  if (n.loop) {
    if (o && !u && n.loopPreventsSliding) return !1;
    if (r.loopFix({
        direction: "next"
      }), r._clientLeft = r.wrapperEl.clientLeft, r.activeIndex === r.slides.length - 1 && n.cssMode) return requestAnimationFrame(() => {
      r.slideTo(r.activeIndex + l, s, e, t)
    }), !0
  }
  return n.rewind && r.isEnd ? r.slideTo(0, s, e, t) : r.slideTo(r.activeIndex + l, s, e, t)
}

function Nd(s, e, t) {
  e === void 0 && (e = !0);
  const r = this,
    {
      params: i,
      snapGrid: n,
      slidesGrid: o,
      rtlTranslate: a,
      enabled: l,
      animating: u
    } = r;
  if (!l || r.destroyed) return r;
  typeof s > "u" && (s = r.params.speed);
  const f = r.virtual && i.virtual.enabled;
  if (i.loop) {
    if (u && !f && i.loopPreventsSliding) return !1;
    r.loopFix({
      direction: "prev"
    }), r._clientLeft = r.wrapperEl.clientLeft
  }
  const d = a ? r.translate : -r.translate;

  function p(w) {
    return w < 0 ? -Math.floor(Math.abs(w)) : Math.floor(w)
  }
  const c = p(d),
    g = n.map(w => p(w)),
    h = i.freeMode && i.freeMode.enabled;
  let m = n[g.indexOf(c) - 1];
  if (typeof m > "u" && (i.cssMode || h)) {
    let w;
    n.forEach((v, y) => {
      c >= v && (w = y)
    }), typeof w < "u" && (m = h ? n[w] : n[w > 0 ? w - 1 : w])
  }
  let _ = 0;
  if (typeof m < "u" && (_ = o.indexOf(m), _ < 0 && (_ = r.activeIndex - 1), i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (_ = _ - r.slidesPerViewDynamic("previous", !0) + 1, _ = Math.max(_, 0))), i.rewind && r.isBeginning) {
    const w = r.params.virtual && r.params.virtual.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1;
    return r.slideTo(w, s, e, t)
  } else if (i.loop && r.activeIndex === 0 && i.cssMode) return requestAnimationFrame(() => {
    r.slideTo(_, s, e, t)
  }), !0;
  return r.slideTo(_, s, e, t)
}

function Vd(s, e, t) {
  e === void 0 && (e = !0);
  const r = this;
  if (!r.destroyed) return typeof s > "u" && (s = r.params.speed), r.slideTo(r.activeIndex, s, e, t)
}

function Gd(s, e, t, r) {
  e === void 0 && (e = !0), r === void 0 && (r = .5);
  const i = this;
  if (i.destroyed) return;
  typeof s > "u" && (s = i.params.speed);
  let n = i.activeIndex;
  const o = Math.min(i.params.slidesPerGroupSkip, n),
    a = o + Math.floor((n - o) / i.params.slidesPerGroup),
    l = i.rtlTranslate ? i.translate : -i.translate;
  if (l >= i.snapGrid[a]) {
    const u = i.snapGrid[a],
      f = i.snapGrid[a + 1];
    l - u > (f - u) * r && (n += i.params.slidesPerGroup)
  } else {
    const u = i.snapGrid[a - 1],
      f = i.snapGrid[a];
    l - u <= (f - u) * r && (n -= i.params.slidesPerGroup)
  }
  return n = Math.max(n, 0), n = Math.min(n, i.slidesGrid.length - 1), i.slideTo(n, s, e, t)
}

function Yd() {
  const s = this;
  if (s.destroyed) return;
  const {
    params: e,
    slidesEl: t
  } = s, r = e.slidesPerView === "auto" ? s.slidesPerViewDynamic() : e.slidesPerView;
  let i = s.getSlideIndexWhenGrid(s.clickedIndex),
    n;
  const o = s.isElement ? "swiper-slide" : `.${e.slideClass}`,
    a = s.grid && s.params.grid && s.params.grid.rows > 1;
  if (e.loop) {
    if (s.animating) return;
    n = parseInt(s.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? s.slideToLoop(n) : i > (a ? (s.slides.length - r) / 2 - (s.params.grid.rows - 1) : s.slides.length - r) ? (s.loopFix(), i = s.getSlideIndex(Zt(t, `${o}[data-swiper-slide-index="${n}"]`)[0]), ts(() => {
      s.slideTo(i)
    })) : s.slideTo(i)
  } else s.slideTo(i)
}
var Hd = {
  slideTo: Rd,
  slideToLoop: Fd,
  slideNext: Bd,
  slidePrev: Nd,
  slideReset: Vd,
  slideToClosest: Gd,
  slideToClickedSlide: Yd
};

function qd(s, e) {
  const t = this,
    {
      params: r,
      slidesEl: i
    } = t;
  if (!r.loop || t.virtual && t.params.virtual.enabled) return;
  const n = () => {
      Zt(i, `.${r.slideClass}, swiper-slide`).forEach((c, g) => {
        c.setAttribute("data-swiper-slide-index", g)
      })
    },
    o = () => {
      const p = Zt(i, `.${r.slideBlankClass}`);
      p.forEach(c => {
        c.remove()
      }), p.length > 0 && (t.recalcSlides(), t.updateSlides())
    },
    a = t.grid && r.grid && r.grid.rows > 1;
  r.loopAddBlankSlides && (r.slidesPerGroup > 1 || a) && o();
  const l = r.slidesPerGroup * (a ? r.grid.rows : 1),
    u = t.slides.length % l !== 0,
    f = a && t.slides.length % r.grid.rows !== 0,
    d = p => {
      for (let c = 0; c < p; c += 1) {
        const g = t.isElement ? is("swiper-slide", [r.slideBlankClass]) : is("div", [r.slideClass, r.slideBlankClass]);
        t.slidesEl.append(g)
      }
    };
  if (u) {
    if (r.loopAddBlankSlides) {
      const p = l - t.slides.length % l;
      d(p), t.recalcSlides(), t.updateSlides()
    } else rs("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n()
  } else if (f) {
    if (r.loopAddBlankSlides) {
      const p = r.grid.rows - t.slides.length % r.grid.rows;
      d(p), t.recalcSlides(), t.updateSlides()
    } else rs("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n()
  } else n();
  t.loopFix({
    slideRealIndex: s,
    direction: r.centeredSlides ? void 0 : "next",
    initial: e
  })
}

function Xd(s) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: r,
    setTranslate: i,
    activeSlideIndex: n,
    initial: o,
    byController: a,
    byMousewheel: l
  } = s === void 0 ? {} : s;
  const u = this;
  if (!u.params.loop) return;
  u.emit("beforeLoopFix");
  const {
    slides: f,
    allowSlidePrev: d,
    allowSlideNext: p,
    slidesEl: c,
    params: g
  } = u, {
    centeredSlides: h,
    initialSlide: m
  } = g;
  if (u.allowSlidePrev = !0, u.allowSlideNext = !0, u.virtual && g.virtual.enabled) {
    t && (!g.centeredSlides && u.snapIndex === 0 ? u.slideTo(u.virtual.slides.length, 0, !1, !0) : g.centeredSlides && u.snapIndex < g.slidesPerView ? u.slideTo(u.virtual.slides.length + u.snapIndex, 0, !1, !0) : u.snapIndex === u.snapGrid.length - 1 && u.slideTo(u.virtual.slidesBefore, 0, !1, !0)), u.allowSlidePrev = d, u.allowSlideNext = p, u.emit("loopFix");
    return
  }
  let _ = g.slidesPerView;
  _ === "auto" ? _ = u.slidesPerViewDynamic() : (_ = Math.ceil(parseFloat(g.slidesPerView, 10)), h && _ % 2 === 0 && (_ = _ + 1));
  const w = g.slidesPerGroupAuto ? _ : g.slidesPerGroup;
  let v = h ? Math.max(w, Math.ceil(_ / 2)) : w;
  v % w !== 0 && (v += w - v % w), v += g.loopAdditionalSlides, u.loopedSlides = v;
  const y = u.grid && g.grid && g.grid.rows > 1;
  f.length < _ + v || u.params.effect === "cards" && f.length < _ + v * 2 ? rs("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : y && g.grid.fill === "row" && rs("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const x = [],
    M = [],
    b = y ? Math.ceil(f.length / g.grid.rows) : f.length,
    E = o && b - m < _ && !h;
  let P = E ? m : u.activeIndex;
  typeof n > "u" ? n = u.getSlideIndex(f.find(I => I.classList.contains(g.slideActiveClass))) : P = n;
  const S = r === "next" || !r,
    O = r === "prev" || !r;
  let k = 0,
    A = 0;
  const N = (y ? f[n].column : n) + (h && typeof i > "u" ? -_ / 2 + .5 : 0);
  if (N < v) {
    k = Math.max(v - N, w);
    for (let I = 0; I < v - N; I += 1) {
      const L = I - Math.floor(I / b) * b;
      if (y) {
        const F = b - L - 1;
        for (let q = f.length - 1; q >= 0; q -= 1) f[q].column === F && x.push(q)
      } else x.push(b - L - 1)
    }
  } else if (N + _ > b - v) {
    A = Math.max(N - (b - v * 2), w), E && (A = Math.max(A, _ - b + m + 1));
    for (let I = 0; I < A; I += 1) {
      const L = I - Math.floor(I / b) * b;
      y ? f.forEach((F, q) => {
        F.column === L && M.push(q)
      }) : M.push(L)
    }
  }
  if (u.__preventObserver__ = !0, requestAnimationFrame(() => {
      u.__preventObserver__ = !1
    }), u.params.effect === "cards" && f.length < _ + v * 2 && (M.includes(n) && M.splice(M.indexOf(n), 1), x.includes(n) && x.splice(x.indexOf(n), 1)), O && x.forEach(I => {
      f[I].swiperLoopMoveDOM = !0, c.prepend(f[I]), f[I].swiperLoopMoveDOM = !1
    }), S && M.forEach(I => {
      f[I].swiperLoopMoveDOM = !0, c.append(f[I]), f[I].swiperLoopMoveDOM = !1
    }), u.recalcSlides(), g.slidesPerView === "auto" ? u.updateSlides() : y && (x.length > 0 && O || M.length > 0 && S) && u.slides.forEach((I, L) => {
      u.grid.updateSlide(L, I, u.slides)
    }), g.watchSlidesProgress && u.updateSlidesOffset(), t) {
    if (x.length > 0 && O) {
      if (typeof e > "u") {
        const I = u.slidesGrid[P],
          F = u.slidesGrid[P + k] - I;
        l ? u.setTranslate(u.translate - F) : (u.slideTo(P + Math.ceil(k), 0, !1, !0), i && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - F, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - F))
      } else if (i) {
        const I = y ? x.length / g.grid.rows : x.length;
        u.slideTo(u.activeIndex + I, 0, !1, !0), u.touchEventsData.currentTranslate = u.translate
      }
    } else if (M.length > 0 && S)
      if (typeof e > "u") {
        const I = u.slidesGrid[P],
          F = u.slidesGrid[P - A] - I;
        l ? u.setTranslate(u.translate - F) : (u.slideTo(P - A, 0, !1, !0), i && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - F, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - F))
      } else {
        const I = y ? M.length / g.grid.rows : M.length;
        u.slideTo(u.activeIndex - I, 0, !1, !0)
      }
  }
  if (u.allowSlidePrev = d, u.allowSlideNext = p, u.controller && u.controller.control && !a) {
    const I = {
      slideRealIndex: e,
      direction: r,
      setTranslate: i,
      activeSlideIndex: n,
      byController: !0
    };
    Array.isArray(u.controller.control) ? u.controller.control.forEach(L => {
      !L.destroyed && L.params.loop && L.loopFix({
        ...I,
        slideTo: L.params.slidesPerView === g.slidesPerView ? t : !1
      })
    }) : u.controller.control instanceof u.constructor && u.controller.control.params.loop && u.controller.control.loopFix({
      ...I,
      slideTo: u.controller.control.params.slidesPerView === g.slidesPerView ? t : !1
    })
  }
  u.emit("loopFix")
}

function $d() {
  const s = this,
    {
      params: e,
      slidesEl: t
    } = s;
  if (!e.loop || !t || s.virtual && s.params.virtual.enabled) return;
  s.recalcSlides();
  const r = [];
  s.slides.forEach(i => {
    const n = typeof i.swiperSlideIndex > "u" ? i.getAttribute("data-swiper-slide-index") * 1 : i.swiperSlideIndex;
    r[n] = i
  }), s.slides.forEach(i => {
    i.removeAttribute("data-swiper-slide-index")
  }), r.forEach(i => {
    t.append(i)
  }), s.recalcSlides(), s.slideTo(s.realIndex, 0)
}
var Wd = {
  loopCreate: qd,
  loopFix: Xd,
  loopDestroy: $d
};

function Ud(s) {
  const e = this;
  if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode) return;
  const t = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0), t.style.cursor = "move", t.style.cursor = s ? "grabbing" : "grab", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1
  })
}

function jd() {
  const s = this;
  s.params.watchOverflow && s.isLocked || s.params.cssMode || (s.isElement && (s.__preventObserver__ = !0), s[s.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", s.isElement && requestAnimationFrame(() => {
    s.__preventObserver__ = !1
  }))
}
var Kd = {
  setGrabCursor: Ud,
  unsetGrabCursor: jd
};

function Qd(s, e) {
  e === void 0 && (e = this);

  function t(r) {
    if (!r || r === gr() || r === Le()) return null;
    r.assignedSlot && (r = r.assignedSlot);
    const i = r.closest(s);
    return !i && !r.getRootNode ? null : i || t(r.getRootNode().host)
  }
  return t(e)
}

function ya(s, e, t) {
  const r = Le(),
    {
      params: i
    } = s,
    n = i.edgeSwipeDetection,
    o = i.edgeSwipeThreshold;
  return n && (t <= o || t >= r.innerWidth - o) ? n === "prevent" ? (e.preventDefault(), !0) : !1 : !0
}

function Zd(s) {
  const e = this,
    t = gr();
  let r = s;
  r.originalEvent && (r = r.originalEvent);
  const i = e.touchEventsData;
  if (r.type === "pointerdown") {
    if (i.pointerId !== null && i.pointerId !== r.pointerId) return;
    i.pointerId = r.pointerId
  } else r.type === "touchstart" && r.targetTouches.length === 1 && (i.touchId = r.targetTouches[0].identifier);
  if (r.type === "touchstart") {
    ya(e, r, r.targetTouches[0].pageX);
    return
  }
  const {
    params: n,
    touches: o,
    enabled: a
  } = e;
  if (!a || !n.simulateTouch && r.pointerType === "mouse" || e.animating && n.preventInteractionOnTransition) return;
  !e.animating && n.cssMode && n.loop && e.loopFix();
  let l = r.target;
  if (n.touchEventsTarget === "wrapper" && !nd(l, e.wrapperEl) || "which" in r && r.which === 3 || "button" in r && r.button > 0 || i.isTouched && i.isMoved) return;
  const u = !!n.noSwipingClass && n.noSwipingClass !== "",
    f = r.composedPath ? r.composedPath() : r.path;
  u && r.target && r.target.shadowRoot && f && (l = f[0]);
  const d = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    p = !!(r.target && r.target.shadowRoot);
  if (n.noSwiping && (p ? Qd(d, l) : l.closest(d))) {
    e.allowClick = !0;
    return
  }
  if (n.swipeHandler && !l.closest(n.swipeHandler)) return;
  o.currentX = r.pageX, o.currentY = r.pageY;
  const c = o.currentX,
    g = o.currentY;
  if (!ya(e, r, c)) return;
  Object.assign(i, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), o.startX = c, o.startY = g, i.touchStartTime = fr(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, n.threshold > 0 && (i.allowThresholdMove = !1);
  let h = !0;
  l.matches(i.focusableElements) && (h = !1, l.nodeName === "SELECT" && (i.isTouched = !1)), t.activeElement && t.activeElement.matches(i.focusableElements) && t.activeElement !== l && (r.pointerType === "mouse" || r.pointerType !== "mouse" && !l.matches(i.focusableElements)) && t.activeElement.blur();
  const m = h && e.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || m) && !l.isContentEditable && r.preventDefault(), n.freeMode && n.freeMode.enabled && e.freeMode && e.animating && !n.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", r)
}

function Jd(s) {
  const e = gr(),
    t = this,
    r = t.touchEventsData,
    {
      params: i,
      touches: n,
      rtlTranslate: o,
      enabled: a
    } = t;
  if (!a || !i.simulateTouch && s.pointerType === "mouse") return;
  let l = s;
  if (l.originalEvent && (l = l.originalEvent), l.type === "pointermove" && (r.touchId !== null || l.pointerId !== r.pointerId)) return;
  let u;
  if (l.type === "touchmove") {
    if (u = [...l.changedTouches].find(x => x.identifier === r.touchId), !u || u.identifier !== r.touchId) return
  } else u = l;
  if (!r.isTouched) {
    r.startMoving && r.isScrolling && t.emit("touchMoveOpposite", l);
    return
  }
  const f = u.pageX,
    d = u.pageY;
  if (l.preventedByNestedSwiper) {
    n.startX = f, n.startY = d;
    return
  }
  if (!t.allowTouchMove) {
    l.target.matches(r.focusableElements) || (t.allowClick = !1), r.isTouched && (Object.assign(n, {
      startX: f,
      startY: d,
      currentX: f,
      currentY: d
    }), r.touchStartTime = fr());
    return
  }
  if (i.touchReleaseOnEdges && !i.loop)
    if (t.isVertical()) {
      if (d < n.startY && t.translate <= t.maxTranslate() || d > n.startY && t.translate >= t.minTranslate()) {
        r.isTouched = !1, r.isMoved = !1;
        return
      }
    } else {
      if (o && (f > n.startX && -t.translate <= t.maxTranslate() || f < n.startX && -t.translate >= t.minTranslate())) return;
      if (!o && (f < n.startX && t.translate <= t.maxTranslate() || f > n.startX && t.translate >= t.minTranslate())) return
    } if (e.activeElement && e.activeElement.matches(r.focusableElements) && e.activeElement !== l.target && l.pointerType !== "mouse" && e.activeElement.blur(), e.activeElement && l.target === e.activeElement && l.target.matches(r.focusableElements)) {
    r.isMoved = !0, t.allowClick = !1;
    return
  }
  r.allowTouchCallbacks && t.emit("touchMove", l), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = f, n.currentY = d;
  const p = n.currentX - n.startX,
    c = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(p ** 2 + c ** 2) < t.params.threshold) return;
  if (typeof r.isScrolling > "u") {
    let x;
    t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? r.isScrolling = !1 : p * p + c * c >= 25 && (x = Math.atan2(Math.abs(c), Math.abs(p)) * 180 / Math.PI, r.isScrolling = t.isHorizontal() ? x > i.touchAngle : 90 - x > i.touchAngle)
  }
  if (r.isScrolling && t.emit("touchMoveOpposite", l), typeof r.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (r.startMoving = !0), r.isScrolling || l.type === "touchmove" && r.preventTouchMoveFromPointerMove) {
    r.isTouched = !1;
    return
  }
  if (!r.startMoving) return;
  t.allowClick = !1, !i.cssMode && l.cancelable && l.preventDefault(), i.touchMoveStopPropagation && !i.nested && l.stopPropagation();
  let g = t.isHorizontal() ? p : c,
    h = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  i.oneWayMovement && (g = Math.abs(g) * (o ? 1 : -1), h = Math.abs(h) * (o ? 1 : -1)), n.diff = g, g *= i.touchRatio, o && (g = -g, h = -h);
  const m = t.touchesDirection;
  t.swipeDirection = g > 0 ? "prev" : "next", t.touchesDirection = h > 0 ? "prev" : "next";
  const _ = t.params.loop && !i.cssMode,
    w = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!r.isMoved) {
    if (_ && w && t.loopFix({
        direction: t.swipeDirection
      }), r.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const x = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      t.wrapperEl.dispatchEvent(x)
    }
    r.allowMomentumBounce = !1, i.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", l)
  }
  if (new Date().getTime(), i._loopSwapReset !== !1 && r.isMoved && r.allowThresholdMove && m !== t.touchesDirection && _ && w && Math.abs(g) >= 1) {
    Object.assign(n, {
      startX: f,
      startY: d,
      currentX: f,
      currentY: d,
      startTranslate: r.currentTranslate
    }), r.loopSwapReset = !0, r.startTranslate = r.currentTranslate;
    return
  }
  t.emit("sliderMove", l), r.isMoved = !0, r.currentTranslate = g + r.startTranslate;
  let v = !0,
    y = i.resistanceRatio;
  if (i.touchReleaseOnEdges && (y = 0), g > 0 ? (_ && w && r.allowThresholdMove && r.currentTranslate > (i.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (i.slidesPerView !== "auto" && t.slides.length - i.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
      direction: "prev",
      setTranslate: !0,
      activeSlideIndex: 0
    }), r.currentTranslate > t.minTranslate() && (v = !1, i.resistance && (r.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + r.startTranslate + g) ** y))) : g < 0 && (_ && w && r.allowThresholdMove && r.currentTranslate < (i.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (i.slidesPerView !== "auto" && t.slides.length - i.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
      direction: "next",
      setTranslate: !0,
      activeSlideIndex: t.slides.length - (i.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(i.slidesPerView, 10)))
    }), r.currentTranslate < t.maxTranslate() && (v = !1, i.resistance && (r.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - r.startTranslate - g) ** y))), v && (l.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (r.currentTranslate = r.startTranslate), i.threshold > 0)
    if (Math.abs(g) > i.threshold || r.allowThresholdMove) {
      if (!r.allowThresholdMove) {
        r.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, r.currentTranslate = r.startTranslate, n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return
      }
    } else {
      r.currentTranslate = r.startTranslate;
      return
    }! i.followFinger || i.cssMode || ((i.freeMode && i.freeMode.enabled && t.freeMode || i.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && i.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(r.currentTranslate), t.setTranslate(r.currentTranslate))
}

function ec(s) {
  const e = this,
    t = e.touchEventsData;
  let r = s;
  r.originalEvent && (r = r.originalEvent);
  let i;
  if (r.type === "touchend" || r.type === "touchcancel") {
    if (i = [...r.changedTouches].find(x => x.identifier === t.touchId), !i || i.identifier !== t.touchId) return
  } else {
    if (t.touchId !== null || r.pointerId !== t.pointerId) return;
    i = r
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(r.type) && !(["pointercancel", "contextmenu"].includes(r.type) && (e.browser.isSafari || e.browser.isWebView))) return;
  t.pointerId = null, t.touchId = null;
  const {
    params: o,
    touches: a,
    rtlTranslate: l,
    slidesGrid: u,
    enabled: f
  } = e;
  if (!f || !o.simulateTouch && r.pointerType === "mouse") return;
  if (t.allowTouchCallbacks && e.emit("touchEnd", r), t.allowTouchCallbacks = !1, !t.isTouched) {
    t.isMoved && o.grabCursor && e.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
    return
  }
  o.grabCursor && t.isMoved && t.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
  const d = fr(),
    p = d - t.touchStartTime;
  if (e.allowClick) {
    const x = r.path || r.composedPath && r.composedPath();
    e.updateClickedSlide(x && x[0] || r.target, x), e.emit("tap click", r), p < 300 && d - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", r)
  }
  if (t.lastClickTime = fr(), ts(() => {
      e.destroyed || (e.allowClick = !0)
    }), !t.isTouched || !t.isMoved || !e.swipeDirection || a.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let c;
  if (o.followFinger ? c = l ? e.translate : -e.translate : c = -t.currentTranslate, o.cssMode) return;
  if (o.freeMode && o.freeMode.enabled) {
    e.freeMode.onTouchEnd({
      currentPos: c
    });
    return
  }
  const g = c >= -e.maxTranslate() && !e.params.loop;
  let h = 0,
    m = e.slidesSizesGrid[0];
  for (let x = 0; x < u.length; x += x < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
    const M = x < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof u[x + M] < "u" ? (g || c >= u[x] && c < u[x + M]) && (h = x, m = u[x + M] - u[x]) : (g || c >= u[x]) && (h = x, m = u[u.length - 1] - u[u.length - 2])
  }
  let _ = null,
    w = null;
  o.rewind && (e.isBeginning ? w = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (_ = 0));
  const v = (c - u[h]) / m,
    y = h < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (p > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return
    }
    e.swipeDirection === "next" && (v >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? _ : h + y) : e.slideTo(h)), e.swipeDirection === "prev" && (v > 1 - o.longSwipesRatio ? e.slideTo(h + y) : w !== null && v < 0 && Math.abs(v) > o.longSwipesRatio ? e.slideTo(w) : e.slideTo(h))
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return
    }
    e.navigation && (r.target === e.navigation.nextEl || r.target === e.navigation.prevEl) ? r.target === e.navigation.nextEl ? e.slideTo(h + y) : e.slideTo(h) : (e.swipeDirection === "next" && e.slideTo(_ !== null ? _ : h + y), e.swipeDirection === "prev" && e.slideTo(w !== null ? w : h))
  }
}

function xa() {
  const s = this,
    {
      params: e,
      el: t
    } = s;
  if (t && t.offsetWidth === 0) return;
  e.breakpoints && s.setBreakpoint();
  const {
    allowSlideNext: r,
    allowSlidePrev: i,
    snapGrid: n
  } = s, o = s.virtual && s.params.virtual.enabled;
  s.allowSlideNext = !0, s.allowSlidePrev = !0, s.updateSize(), s.updateSlides(), s.updateSlidesClasses();
  const a = o && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) && s.isEnd && !s.isBeginning && !s.params.centeredSlides && !a ? s.slideTo(s.slides.length - 1, 0, !1, !0) : s.params.loop && !o ? s.slideToLoop(s.realIndex, 0, !1, !0) : s.slideTo(s.activeIndex, 0, !1, !0), s.autoplay && s.autoplay.running && s.autoplay.paused && (clearTimeout(s.autoplay.resizeTimeout), s.autoplay.resizeTimeout = setTimeout(() => {
    s.autoplay && s.autoplay.running && s.autoplay.paused && s.autoplay.resume()
  }, 500)), s.allowSlidePrev = i, s.allowSlideNext = r, s.params.watchOverflow && n !== s.snapGrid && s.checkOverflow()
}

function tc(s) {
  const e = this;
  e.enabled && (e.allowClick || (e.params.preventClicks && s.preventDefault(), e.params.preventClicksPropagation && e.animating && (s.stopPropagation(), s.stopImmediatePropagation())))
}

function rc() {
  const s = this,
    {
      wrapperEl: e,
      rtlTranslate: t,
      enabled: r
    } = s;
  if (!r) return;
  s.previousTranslate = s.translate, s.isHorizontal() ? s.translate = -e.scrollLeft : s.translate = -e.scrollTop, s.translate === 0 && (s.translate = 0), s.updateActiveIndex(), s.updateSlidesClasses();
  let i;
  const n = s.maxTranslate() - s.minTranslate();
  n === 0 ? i = 0 : i = (s.translate - s.minTranslate()) / n, i !== s.progress && s.updateProgress(t ? -s.translate : s.translate), s.emit("setTranslate", s.translate, !1)
}

function ic(s) {
  const e = this;
  Hn(e, s.target), !(e.params.cssMode || e.params.slidesPerView !== "auto" && !e.params.autoHeight) && e.update()
}

function nc() {
  const s = this;
  s.documentTouchHandlerProceeded || (s.documentTouchHandlerProceeded = !0, s.params.touchReleaseOnEdges && (s.el.style.touchAction = "auto"))
}
const eu = (s, e) => {
  const t = gr(),
    {
      params: r,
      el: i,
      wrapperEl: n,
      device: o
    } = s,
    a = !!r.nested,
    l = e === "on" ? "addEventListener" : "removeEventListener",
    u = e;
  !i || typeof i == "string" || (t[l]("touchstart", s.onDocumentTouchStart, {
    passive: !1,
    capture: a
  }), i[l]("touchstart", s.onTouchStart, {
    passive: !1
  }), i[l]("pointerdown", s.onTouchStart, {
    passive: !1
  }), t[l]("touchmove", s.onTouchMove, {
    passive: !1,
    capture: a
  }), t[l]("pointermove", s.onTouchMove, {
    passive: !1,
    capture: a
  }), t[l]("touchend", s.onTouchEnd, {
    passive: !0
  }), t[l]("pointerup", s.onTouchEnd, {
    passive: !0
  }), t[l]("pointercancel", s.onTouchEnd, {
    passive: !0
  }), t[l]("touchcancel", s.onTouchEnd, {
    passive: !0
  }), t[l]("pointerout", s.onTouchEnd, {
    passive: !0
  }), t[l]("pointerleave", s.onTouchEnd, {
    passive: !0
  }), t[l]("contextmenu", s.onTouchEnd, {
    passive: !0
  }), (r.preventClicks || r.preventClicksPropagation) && i[l]("click", s.onClick, !0), r.cssMode && n[l]("scroll", s.onScroll), r.updateOnWindowResize ? s[u](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", xa, !0) : s[u]("observerUpdate", xa, !0), i[l]("load", s.onLoad, {
    capture: !0
  }))
};

function sc() {
  const s = this,
    {
      params: e
    } = s;
  s.onTouchStart = Zd.bind(s), s.onTouchMove = Jd.bind(s), s.onTouchEnd = ec.bind(s), s.onDocumentTouchStart = nc.bind(s), e.cssMode && (s.onScroll = rc.bind(s)), s.onClick = tc.bind(s), s.onLoad = ic.bind(s), eu(s, "on")
}

function oc() {
  eu(this, "off")
}
var ac = {
  attachEvents: sc,
  detachEvents: oc
};
const Ta = (s, e) => s.grid && e.grid && e.grid.rows > 1;

function lc() {
  const s = this,
    {
      realIndex: e,
      initialized: t,
      params: r,
      el: i
    } = s,
    n = r.breakpoints;
  if (!n || n && Object.keys(n).length === 0) return;
  const o = gr(),
    a = r.breakpointsBase === "window" || !r.breakpointsBase ? r.breakpointsBase : "container",
    l = ["window", "container"].includes(r.breakpointsBase) || !r.breakpointsBase ? s.el : o.querySelector(r.breakpointsBase),
    u = s.getBreakpoint(n, a, l);
  if (!u || s.currentBreakpoint === u) return;
  const d = (u in n ? n[u] : void 0) || s.originalParams,
    p = Ta(s, r),
    c = Ta(s, d),
    g = s.params.grabCursor,
    h = d.grabCursor,
    m = r.enabled;
  p && !c ? (i.classList.remove(`${r.containerModifierClass}grid`, `${r.containerModifierClass}grid-column`), s.emitContainerClasses()) : !p && c && (i.classList.add(`${r.containerModifierClass}grid`), (d.grid.fill && d.grid.fill === "column" || !d.grid.fill && r.grid.fill === "column") && i.classList.add(`${r.containerModifierClass}grid-column`), s.emitContainerClasses()), g && !h ? s.unsetGrabCursor() : !g && h && s.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach(M => {
    if (typeof d[M] > "u") return;
    const b = r[M] && r[M].enabled,
      E = d[M] && d[M].enabled;
    b && !E && s[M].disable(), !b && E && s[M].enable()
  });
  const _ = d.direction && d.direction !== r.direction,
    w = r.loop && (d.slidesPerView !== r.slidesPerView || _),
    v = r.loop;
  _ && t && s.changeDirection(), xt(s.params, d);
  const y = s.params.enabled,
    x = s.params.loop;
  Object.assign(s, {
    allowTouchMove: s.params.allowTouchMove,
    allowSlideNext: s.params.allowSlideNext,
    allowSlidePrev: s.params.allowSlidePrev
  }), m && !y ? s.disable() : !m && y && s.enable(), s.currentBreakpoint = u, s.emit("_beforeBreakpoint", d), t && (w ? (s.loopDestroy(), s.loopCreate(e), s.updateSlides()) : !v && x ? (s.loopCreate(e), s.updateSlides()) : v && !x && s.loopDestroy()), s.emit("breakpoint", d)
}

function uc(s, e, t) {
  if (e === void 0 && (e = "window"), !s || e === "container" && !t) return;
  let r = !1;
  const i = Le(),
    n = e === "window" ? i.innerHeight : t.clientHeight,
    o = Object.keys(s).map(a => {
      if (typeof a == "string" && a.indexOf("@") === 0) {
        const l = parseFloat(a.substr(1));
        return {
          value: n * l,
          point: a
        }
      }
      return {
        value: a,
        point: a
      }
    });
  o.sort((a, l) => parseInt(a.value, 10) - parseInt(l.value, 10));
  for (let a = 0; a < o.length; a += 1) {
    const {
      point: l,
      value: u
    } = o[a];
    e === "window" ? i.matchMedia(`(min-width: ${u}px)`).matches && (r = l) : u <= t.clientWidth && (r = l)
  }
  return r || "max"
}
var fc = {
  setBreakpoint: lc,
  getBreakpoint: uc
};

function dc(s, e) {
  const t = [];
  return s.forEach(r => {
    typeof r == "object" ? Object.keys(r).forEach(i => {
      r[i] && t.push(e + i)
    }) : typeof r == "string" && t.push(e + r)
  }), t
}

function cc() {
  const s = this,
    {
      classNames: e,
      params: t,
      rtl: r,
      el: i,
      device: n
    } = s,
    o = dc(["initialized", t.direction, {
      "free-mode": s.params.freeMode && t.freeMode.enabled
    }, {
      autoheight: t.autoHeight
    }, {
      rtl: r
    }, {
      grid: t.grid && t.grid.rows > 1
    }, {
      "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
    }, {
      android: n.android
    }, {
      ios: n.ios
    }, {
      "css-mode": t.cssMode
    }, {
      centered: t.cssMode && t.centeredSlides
    }, {
      "watch-progress": t.watchSlidesProgress
    }], t.containerModifierClass);
  e.push(...o), i.classList.add(...e), s.emitContainerClasses()
}

function pc() {
  const s = this,
    {
      el: e,
      classNames: t
    } = s;
  !e || typeof e == "string" || (e.classList.remove(...t), s.emitContainerClasses())
}
var hc = {
  addClasses: cc,
  removeClasses: pc
};

function gc() {
  const s = this,
    {
      isLocked: e,
      params: t
    } = s,
    {
      slidesOffsetBefore: r
    } = t;
  if (r) {
    const i = s.slides.length - 1,
      n = s.slidesGrid[i] + s.slidesSizesGrid[i] + r * 2;
    s.isLocked = s.size > n
  } else s.isLocked = s.snapGrid.length === 1;
  t.allowSlideNext === !0 && (s.allowSlideNext = !s.isLocked), t.allowSlidePrev === !0 && (s.allowSlidePrev = !s.isLocked), e && e !== s.isLocked && (s.isEnd = !1), e !== s.isLocked && s.emit(s.isLocked ? "lock" : "unlock")
}
var mc = {
    checkOverflow: gc
  },
  ba = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
  };

function _c(s, e) {
  return function(r) {
    r === void 0 && (r = {});
    const i = Object.keys(r)[0],
      n = r[i];
    if (typeof n != "object" || n === null) {
      xt(e, r);
      return
    }
    if (s[i] === !0 && (s[i] = {
        enabled: !0
      }), i === "navigation" && s[i] && s[i].enabled && !s[i].prevEl && !s[i].nextEl && (s[i].auto = !0), ["pagination", "scrollbar"].indexOf(i) >= 0 && s[i] && s[i].enabled && !s[i].el && (s[i].auto = !0), !(i in s && "enabled" in n)) {
      xt(e, r);
      return
    }
    typeof s[i] == "object" && !("enabled" in s[i]) && (s[i].enabled = !0), s[i] || (s[i] = {
      enabled: !1
    }), xt(e, r)
  }
}
const Ms = {
    eventsEmitter: hd,
    update: Ed,
    translate: Ad,
    transition: zd,
    slide: Hd,
    loop: Wd,
    grabCursor: Kd,
    events: ac,
    breakpoints: fc,
    checkOverflow: mc,
    classes: hc
  },
  ks = {};
class lt {
  constructor() {
    let e, t;
    for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++) i[n] = arguments[n];
    i.length === 1 && i[0].constructor && Object.prototype.toString.call(i[0]).slice(8, -1) === "Object" ? t = i[0] : [e, t] = i, t || (t = {}), t = xt({}, t), e && !t.el && (t.el = e);
    const o = gr();
    if (t.el && typeof t.el == "string" && o.querySelectorAll(t.el).length > 1) {
      const f = [];
      return o.querySelectorAll(t.el).forEach(d => {
        const p = xt({}, t, {
          el: d
        });
        f.push(new lt(p))
      }), f
    }
    const a = this;
    a.__swiper__ = !0, a.support = Kl(), a.device = Ql({
      userAgent: t.userAgent
    }), a.browser = Zl(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
    const l = {};
    a.modules.forEach(f => {
      f({
        params: t,
        swiper: a,
        extendParams: _c(t, l),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a)
      })
    });
    const u = xt({}, ba, l);
    return a.params = xt({}, u, ks, t), a.originalParams = xt({}, a.params), a.passedParams = xt({}, t), a.params && a.params.on && Object.keys(a.params.on).forEach(f => {
      a.on(f, a.params.on[f])
    }), a.params && a.params.onAny && a.onAny(a.params.onAny), Object.assign(a, {
      enabled: a.params.enabled,
      el: e,
      classNames: [],
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      isHorizontal() {
        return a.params.direction === "horizontal"
      },
      isVertical() {
        return a.params.direction === "vertical"
      },
      activeIndex: 0,
      realIndex: 0,
      isBeginning: !0,
      isEnd: !1,
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
      },
      allowSlideNext: a.params.allowSlideNext,
      allowSlidePrev: a.params.allowSlidePrev,
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        focusableElements: a.params.focusableElements,
        lastClickTime: 0,
        clickTimeout: void 0,
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      allowClick: !0,
      allowTouchMove: a.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      imagesToLoad: [],
      imagesLoaded: 0
    }), a.emit("_swiper"), a.params.init && a.init(), a
  }
  getDirectionLabel(e) {
    return this.isHorizontal() ? e : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    } [e]
  }
  getSlideIndex(e) {
    const {
      slidesEl: t,
      params: r
    } = this, i = Zt(t, `.${r.slideClass}, swiper-slide`), n = _a(i[0]);
    return _a(e) - n
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(this.slides.find(t => t.getAttribute("data-swiper-slide-index") * 1 === e))
  }
  getSlideIndexWhenGrid(e) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? e = Math.floor(e / this.params.grid.rows) : this.params.grid.fill === "row" && (e = e % Math.ceil(this.slides.length / this.params.grid.rows))), e
  }
  recalcSlides() {
    const e = this,
      {
        slidesEl: t,
        params: r
      } = e;
    e.slides = Zt(t, `.${r.slideClass}, swiper-slide`)
  }
  enable() {
    const e = this;
    e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
  }
  disable() {
    const e = this;
    e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
  }
  setProgress(e, t) {
    const r = this;
    e = Math.min(Math.max(e, 0), 1);
    const i = r.minTranslate(),
      o = (r.maxTranslate() - i) * e + i;
    r.translateTo(o, typeof t > "u" ? 0 : t), r.updateActiveIndex(), r.updateSlidesClasses()
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className.split(" ").filter(r => r.indexOf("swiper") === 0 || r.indexOf(e.params.containerModifierClass) === 0);
    e.emit("_containerClasses", t.join(" "))
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed ? "" : e.className.split(" ").filter(r => r.indexOf("swiper-slide") === 0 || r.indexOf(t.params.slideClass) === 0).join(" ")
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach(r => {
      const i = e.getSlideClasses(r);
      t.push({
        slideEl: r,
        classNames: i
      }), e.emit("_slideClass", r, i)
    }), e.emit("_slideClasses", t)
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = "current"), t === void 0 && (t = !1);
    const r = this,
      {
        params: i,
        slides: n,
        slidesGrid: o,
        slidesSizesGrid: a,
        size: l,
        activeIndex: u
      } = r;
    let f = 1;
    if (typeof i.slidesPerView == "number") return i.slidesPerView;
    if (i.centeredSlides) {
      let d = n[u] ? Math.ceil(n[u].swiperSlideSize) : 0,
        p;
      for (let c = u + 1; c < n.length; c += 1) n[c] && !p && (d += Math.ceil(n[c].swiperSlideSize), f += 1, d > l && (p = !0));
      for (let c = u - 1; c >= 0; c -= 1) n[c] && !p && (d += n[c].swiperSlideSize, f += 1, d > l && (p = !0))
    } else if (e === "current")
      for (let d = u + 1; d < n.length; d += 1)(t ? o[d] + a[d] - o[u] < l : o[d] - o[u] < l) && (f += 1);
    else
      for (let d = u - 1; d >= 0; d -= 1) o[u] - o[d] < l && (f += 1);
    return f
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const {
      snapGrid: t,
      params: r
    } = e;
    r.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach(o => {
      o.complete && Hn(e, o)
    }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();

    function i() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate,
        a = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses()
    }
    let n;
    if (r.freeMode && r.freeMode.enabled && !r.cssMode) i(), r.autoHeight && e.updateAutoHeight();
    else {
      if ((r.slidesPerView === "auto" || r.slidesPerView > 1) && e.isEnd && !r.centeredSlides) {
        const o = e.virtual && r.virtual.enabled ? e.virtual.slides : e.slides;
        n = e.slideTo(o.length - 1, 0, !1, !0)
      } else n = e.slideTo(e.activeIndex, 0, !1, !0);
      n || i()
    }
    r.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const r = this,
      i = r.params.direction;
    return e || (e = i === "horizontal" ? "vertical" : "horizontal"), e === i || e !== "horizontal" && e !== "vertical" || (r.el.classList.remove(`${r.params.containerModifierClass}${i}`), r.el.classList.add(`${r.params.containerModifierClass}${e}`), r.emitContainerClasses(), r.params.direction = e, r.slides.forEach(n => {
      e === "vertical" ? n.style.width = "" : n.style.height = ""
    }), r.emit("changeDirection"), t && r.update()), r
  }
  changeLanguageDirection(e) {
    const t = this;
    t.rtl && e === "rtl" || !t.rtl && e === "ltr" || (t.rtl = e === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update())
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let r = e || t.params.el;
    if (typeof r == "string" && (r = document.querySelector(r)), !r) return !1;
    r.swiper = t, r.parentNode && r.parentNode.host && r.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
    const i = () => `.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;
    let o = r && r.shadowRoot && r.shadowRoot.querySelector ? r.shadowRoot.querySelector(i()) : Zt(r, i())[0];
    return !o && t.params.createElements && (o = is("div", t.params.wrapperClass), r.append(o), Zt(r, `.${t.params.slideClass}`).forEach(a => {
      o.append(a)
    })), Object.assign(t, {
      el: r,
      wrapperEl: o,
      slidesEl: t.isElement && !r.parentNode.host.slideSlots ? r.parentNode.host : o,
      hostEl: t.isElement ? r.parentNode.host : r,
      mounted: !0,
      rtl: r.dir.toLowerCase() === "rtl" || Mr(r, "direction") === "rtl",
      rtlTranslate: t.params.direction === "horizontal" && (r.dir.toLowerCase() === "rtl" || Mr(r, "direction") === "rtl"),
      wrongRTL: Mr(o, "display") === "-webkit-box"
    }), !0
  }
  init(e) {
    const t = this;
    if (t.initialized || t.mount(e) === !1) return t;
    t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
    const i = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), i.forEach(n => {
      n.complete ? Hn(t, n) : n.addEventListener("load", o => {
        Hn(t, o.target)
      })
    }), to(t), t.initialized = !0, to(t), t.emit("init"), t.emit("afterInit"), t
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const r = this,
      {
        params: i,
        el: n,
        wrapperEl: o,
        slides: a
      } = r;
    return typeof r.params > "u" || r.destroyed || (r.emit("beforeDestroy"), r.initialized = !1, r.detachEvents(), i.loop && r.loopDestroy(), t && (r.removeClasses(), n && typeof n != "string" && n.removeAttribute("style"), o && o.removeAttribute("style"), a && a.length && a.forEach(l => {
      l.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), l.removeAttribute("style"), l.removeAttribute("data-swiper-slide-index")
    })), r.emit("destroy"), Object.keys(r.eventsListeners).forEach(l => {
      r.off(l)
    }), e !== !1 && (r.el && typeof r.el != "string" && (r.el.swiper = null), Jf(r)), r.destroyed = !0), null
  }
  static extendDefaults(e) {
    xt(ks, e)
  }
  static get extendedDefaults() {
    return ks
  }
  static get defaults() {
    return ba
  }
  static installModule(e) {
    lt.prototype.__modules__ || (lt.prototype.__modules__ = []);
    const t = lt.prototype.__modules__;
    typeof e == "function" && t.indexOf(e) < 0 && t.push(e)
  }
  static use(e) {
    return Array.isArray(e) ? (e.forEach(t => lt.installModule(t)), lt) : (lt.installModule(e), lt)
  }
}
Object.keys(Ms).forEach(s => {
  Object.keys(Ms[s]).forEach(e => {
    lt.prototype[e] = Ms[s][e]
  })
});
lt.use([cd, pd]);

function Oo(s) {
  let {
    swiper: e,
    extendParams: t,
    on: r,
    emit: i
  } = s;
  const n = gr(),
    o = Le();
  e.keyboard = {
    enabled: !1
  }, t({
    keyboard: {
      enabled: !1,
      onlyInViewport: !0,
      pageUpDown: !0
    }
  });

  function a(f) {
    if (!e.enabled) return;
    const {
      rtlTranslate: d
    } = e;
    let p = f;
    p.originalEvent && (p = p.originalEvent);
    const c = p.keyCode || p.charCode,
      g = e.params.keyboard.pageUpDown,
      h = g && c === 33,
      m = g && c === 34,
      _ = c === 37,
      w = c === 39,
      v = c === 38,
      y = c === 40;
    if (!e.allowSlideNext && (e.isHorizontal() && w || e.isVertical() && y || m) || !e.allowSlidePrev && (e.isHorizontal() && _ || e.isVertical() && v || h)) return !1;
    if (!(p.shiftKey || p.altKey || p.ctrlKey || p.metaKey) && !(n.activeElement && (n.activeElement.isContentEditable || n.activeElement.nodeName && (n.activeElement.nodeName.toLowerCase() === "input" || n.activeElement.nodeName.toLowerCase() === "textarea")))) {
      if (e.params.keyboard.onlyInViewport && (h || m || _ || w || v || y)) {
        let x = !1;
        if (eo(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && eo(e.el, `.${e.params.slideActiveClass}`).length === 0) return;
        const M = e.el,
          b = M.clientWidth,
          E = M.clientHeight,
          P = o.innerWidth,
          S = o.innerHeight,
          O = sd(M);
        d && (O.left -= M.scrollLeft);
        const k = [
          [O.left, O.top],
          [O.left + b, O.top],
          [O.left, O.top + E],
          [O.left + b, O.top + E]
        ];
        for (let A = 0; A < k.length; A += 1) {
          const z = k[A];
          if (z[0] >= 0 && z[0] <= P && z[1] >= 0 && z[1] <= S) {
            if (z[0] === 0 && z[1] === 0) continue;
            x = !0
          }
        }
        if (!x) return
      }
      e.isHorizontal() ? ((h || m || _ || w) && (p.preventDefault ? p.preventDefault() : p.returnValue = !1), ((m || w) && !d || (h || _) && d) && e.slideNext(), ((h || _) && !d || (m || w) && d) && e.slidePrev()) : ((h || m || v || y) && (p.preventDefault ? p.preventDefault() : p.returnValue = !1), (m || y) && e.slideNext(), (h || v) && e.slidePrev()), i("keyPress", c)
    }
  }

  function l() {
    e.keyboard.enabled || (n.addEventListener("keydown", a), e.keyboard.enabled = !0)
  }

  function u() {
    e.keyboard.enabled && (n.removeEventListener("keydown", a), e.keyboard.enabled = !1)
  }
  r("init", () => {
    e.params.keyboard.enabled && l()
  }), r("destroy", () => {
    e.keyboard.enabled && u()
  }), Object.assign(e.keyboard, {
    enable: l,
    disable: u
  })
}

function tu(s) {
  let {
    swiper: e,
    extendParams: t,
    on: r,
    emit: i
  } = s;
  const n = Le();
  t({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: "swiper-no-mousewheel"
    }
  }), e.mousewheel = {
    enabled: !1
  };
  let o, a = fr(),
    l;
  const u = [];

  function f(v) {
    let b = 0,
      E = 0,
      P = 0,
      S = 0;
    return "detail" in v && (E = v.detail), "wheelDelta" in v && (E = -v.wheelDelta / 120), "wheelDeltaY" in v && (E = -v.wheelDeltaY / 120), "wheelDeltaX" in v && (b = -v.wheelDeltaX / 120), "axis" in v && v.axis === v.HORIZONTAL_AXIS && (b = E, E = 0), P = b * 10, S = E * 10, "deltaY" in v && (S = v.deltaY), "deltaX" in v && (P = v.deltaX), v.shiftKey && !P && (P = S, S = 0), (P || S) && v.deltaMode && (v.deltaMode === 1 ? (P *= 40, S *= 40) : (P *= 800, S *= 800)), P && !b && (b = P < 1 ? -1 : 1), S && !E && (E = S < 1 ? -1 : 1), {
      spinX: b,
      spinY: E,
      pixelX: P,
      pixelY: S
    }
  }

  function d() {
    e.enabled && (e.mouseEntered = !0)
  }

  function p() {
    e.enabled && (e.mouseEntered = !1)
  }

  function c(v) {
    return e.params.mousewheel.thresholdDelta && v.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && fr() - a < e.params.mousewheel.thresholdTime ? !1 : v.delta >= 6 && fr() - a < 60 ? !0 : (v.direction < 0 ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(), i("scroll", v.raw)) : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(), i("scroll", v.raw)), a = new n.Date().getTime(), !1)
  }

  function g(v) {
    const y = e.params.mousewheel;
    if (v.direction < 0) {
      if (e.isEnd && !e.params.loop && y.releaseOnEdges) return !0
    } else if (e.isBeginning && !e.params.loop && y.releaseOnEdges) return !0;
    return !1
  }

  function h(v) {
    let y = v,
      x = !0;
    if (!e.enabled || v.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)) return;
    const M = e.params.mousewheel;
    e.params.cssMode && y.preventDefault();
    let b = e.el;
    e.params.mousewheel.eventsTarget !== "container" && (b = document.querySelector(e.params.mousewheel.eventsTarget));
    const E = b && b.contains(y.target);
    if (!e.mouseEntered && !E && !M.releaseOnEdges) return !0;
    y.originalEvent && (y = y.originalEvent);
    let P = 0;
    const S = e.rtlTranslate ? -1 : 1,
      O = f(y);
    if (M.forceToAxis)
      if (e.isHorizontal())
        if (Math.abs(O.pixelX) > Math.abs(O.pixelY)) P = -O.pixelX * S;
        else return !0;
    else if (Math.abs(O.pixelY) > Math.abs(O.pixelX)) P = -O.pixelY;
    else return !0;
    else P = Math.abs(O.pixelX) > Math.abs(O.pixelY) ? -O.pixelX * S : -O.pixelY;
    if (P === 0) return !0;
    M.invert && (P = -P);
    let k = e.getTranslate() + P * M.sensitivity;
    if (k >= e.minTranslate() && (k = e.minTranslate()), k <= e.maxTranslate() && (k = e.maxTranslate()), x = e.params.loop ? !0 : !(k === e.minTranslate() || k === e.maxTranslate()), x && e.params.nested && y.stopPropagation(), !e.params.freeMode || !e.params.freeMode.enabled) {
      const A = {
        time: fr(),
        delta: Math.abs(P),
        direction: Math.sign(P),
        raw: v
      };
      u.length >= 2 && u.shift();
      const z = u.length ? u[u.length - 1] : void 0;
      if (u.push(A), z ? (A.direction !== z.direction || A.delta > z.delta || A.time > z.time + 150) && c(A) : c(A), g(A)) return !0
    } else {
      const A = {
          time: fr(),
          delta: Math.abs(P),
          direction: Math.sign(P)
        },
        z = l && A.time < l.time + 500 && A.delta <= l.delta && A.direction === l.direction;
      if (!z) {
        l = void 0;
        let N = e.getTranslate() + P * M.sensitivity;
        const I = e.isBeginning,
          L = e.isEnd;
        if (N >= e.minTranslate() && (N = e.minTranslate()), N <= e.maxTranslate() && (N = e.maxTranslate()), e.setTransition(0), e.setTranslate(N), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!I && e.isBeginning || !L && e.isEnd) && e.updateSlidesClasses(), e.params.loop && e.loopFix({
            direction: A.direction < 0 ? "next" : "prev",
            byMousewheel: !0
          }), e.params.freeMode.sticky) {
          clearTimeout(o), o = void 0, u.length >= 15 && u.shift();
          const F = u.length ? u[u.length - 1] : void 0,
            q = u[0];
          if (u.push(A), F && (A.delta > F.delta || A.direction !== F.direction)) u.splice(0);
          else if (u.length >= 15 && A.time - q.time < 500 && q.delta - A.delta >= 1 && A.delta <= 6) {
            const T = P > 0 ? .8 : .2;
            l = A, u.splice(0), o = ts(() => {
              e.destroyed || !e.params || e.slideToClosest(e.params.speed, !0, void 0, T)
            }, 0)
          }
          o || (o = ts(() => {
            if (e.destroyed || !e.params) return;
            const T = .5;
            l = A, u.splice(0), e.slideToClosest(e.params.speed, !0, void 0, T)
          }, 500))
        }
        if (z || i("scroll", y), e.params.autoplay && e.params.autoplay.disableOnInteraction && e.autoplay.stop(), M.releaseOnEdges && (N === e.minTranslate() || N === e.maxTranslate())) return !0
      }
    }
    return y.preventDefault ? y.preventDefault() : y.returnValue = !1, !1
  }

  function m(v) {
    let y = e.el;
    e.params.mousewheel.eventsTarget !== "container" && (y = document.querySelector(e.params.mousewheel.eventsTarget)), y[v]("mouseenter", d), y[v]("mouseleave", p), y[v]("wheel", h)
  }

  function _() {
    return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", h), !0) : e.mousewheel.enabled ? !1 : (m("addEventListener"), e.mousewheel.enabled = !0, !0)
  }

  function w() {
    return e.params.cssMode ? (e.wrapperEl.addEventListener(event, h), !0) : e.mousewheel.enabled ? (m("removeEventListener"), e.mousewheel.enabled = !1, !0) : !1
  }
  r("init", () => {
    !e.params.mousewheel.enabled && e.params.cssMode && w(), e.params.mousewheel.enabled && _()
  }), r("destroy", () => {
    e.params.cssMode && _(), e.mousewheel.enabled && w()
  }), Object.assign(e.mousewheel, {
    enable: _,
    disable: w
  })
}

function vc(s, e, t, r) {
  return s.params.createElements && Object.keys(r).forEach(i => {
    if (!t[i] && t.auto === !0) {
      let n = Zt(s.el, `.${r[i]}`)[0];
      n || (n = is("div", r[i]), n.className = r[i], s.el.append(n)), t[i] = n, e[i] = n
    }
  }), t
}

function wc(s) {
  let {
    swiper: e,
    extendParams: t,
    on: r,
    emit: i
  } = s;
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), e.navigation = {
    nextEl: null,
    prevEl: null
  };

  function n(g) {
    let h;
    return g && typeof g == "string" && e.isElement && (h = e.el.querySelector(g) || e.hostEl.querySelector(g), h) ? h : (g && (typeof g == "string" && (h = [...document.querySelectorAll(g)]), e.params.uniqueNavElements && typeof g == "string" && h && h.length > 1 && e.el.querySelectorAll(g).length === 1 ? h = e.el.querySelector(g) : h && h.length === 1 && (h = h[0])), g && !h ? g : h)
  }

  function o(g, h) {
    const m = e.params.navigation;
    g = or(g), g.forEach(_ => {
      _ && (_.classList[h ? "add" : "remove"](...m.disabledClass.split(" ")), _.tagName === "BUTTON" && (_.disabled = h), e.params.watchOverflow && e.enabled && _.classList[e.isLocked ? "add" : "remove"](m.lockClass))
    })
  }

  function a() {
    const {
      nextEl: g,
      prevEl: h
    } = e.navigation;
    if (e.params.loop) {
      o(h, !1), o(g, !1);
      return
    }
    o(h, e.isBeginning && !e.params.rewind), o(g, e.isEnd && !e.params.rewind)
  }

  function l(g) {
    g.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), i("navigationPrev"))
  }

  function u(g) {
    g.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), i("navigationNext"))
  }

  function f() {
    const g = e.params.navigation;
    if (e.params.navigation = vc(e, e.originalParams.navigation, e.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      }), !(g.nextEl || g.prevEl)) return;
    let h = n(g.nextEl),
      m = n(g.prevEl);
    Object.assign(e.navigation, {
      nextEl: h,
      prevEl: m
    }), h = or(h), m = or(m);
    const _ = (w, v) => {
      w && w.addEventListener("click", v === "next" ? u : l), !e.enabled && w && w.classList.add(...g.lockClass.split(" "))
    };
    h.forEach(w => _(w, "next")), m.forEach(w => _(w, "prev"))
  }

  function d() {
    let {
      nextEl: g,
      prevEl: h
    } = e.navigation;
    g = or(g), h = or(h);
    const m = (_, w) => {
      _.removeEventListener("click", w === "next" ? u : l), _.classList.remove(...e.params.navigation.disabledClass.split(" "))
    };
    g.forEach(_ => m(_, "next")), h.forEach(_ => m(_, "prev"))
  }
  r("init", () => {
    e.params.navigation.enabled === !1 ? c() : (f(), a())
  }), r("toEdge fromEdge lock unlock", () => {
    a()
  }), r("destroy", () => {
    d()
  }), r("enable disable", () => {
    let {
      nextEl: g,
      prevEl: h
    } = e.navigation;
    if (g = or(g), h = or(h), e.enabled) {
      a();
      return
    } [...g, ...h].filter(m => !!m).forEach(m => m.classList.add(e.params.navigation.lockClass))
  }), r("click", (g, h) => {
    let {
      nextEl: m,
      prevEl: _
    } = e.navigation;
    m = or(m), _ = or(_);
    const w = h.target;
    let v = _.includes(w) || m.includes(w);
    if (e.isElement && !v) {
      const y = h.path || h.composedPath && h.composedPath();
      y && (v = y.find(x => m.includes(x) || _.includes(x)))
    }
    if (e.params.navigation.hideOnClick && !v) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === w || e.pagination.el.contains(w))) return;
      let y;
      m.length ? y = m[0].classList.contains(e.params.navigation.hiddenClass) : _.length && (y = _[0].classList.contains(e.params.navigation.hiddenClass)), i(y === !0 ? "navigationShow" : "navigationHide"), [...m, ..._].filter(x => !!x).forEach(x => x.classList.toggle(e.params.navigation.hiddenClass))
    }
  });
  const p = () => {
      e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), f(), a()
    },
    c = () => {
      e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), d()
    };
  Object.assign(e.navigation, {
    enable: p,
    disable: c,
    update: a,
    init: f,
    destroy: d
  })
}

function yc(s) {
  const {
    effect: e,
    swiper: t,
    on: r,
    setTranslate: i,
    setTransition: n,
    overwriteParams: o,
    perspective: a,
    recreateShadows: l,
    getEffectParams: u
  } = s;
  r("beforeInit", () => {
    if (t.params.effect !== e) return;
    t.classNames.push(`${t.params.containerModifierClass}${e}`), a && a() && t.classNames.push(`${t.params.containerModifierClass}3d`);
    const d = o ? o() : {};
    Object.assign(t.params, d), Object.assign(t.originalParams, d)
  }), r("setTranslate _virtualUpdated", () => {
    t.params.effect === e && i()
  }), r("setTransition", (d, p) => {
    t.params.effect === e && n(p)
  }), r("transitionEnd", () => {
    if (t.params.effect === e && l) {
      if (!u || !u().slideShadows) return;
      t.slides.forEach(d => {
        d.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(p => p.remove())
      }), l()
    }
  });
  let f;
  r("virtualUpdate", () => {
    t.params.effect === e && (t.slides.length || (f = !0), requestAnimationFrame(() => {
      f && t.slides && t.slides.length && (i(), f = !1)
    }))
  })
}

function xc(s, e) {
  const t = jl(e);
  return t !== e && (t.style.backfaceVisibility = "hidden", t.style["-webkit-backface-visibility"] = "hidden"), t
}

function Tc(s) {
  let {
    swiper: e,
    duration: t,
    transformElements: r
  } = s;
  const {
    activeIndex: i
  } = e;
  if (e.params.virtualTranslate && t !== 0) {
    let n = !1,
      o;
    o = r, o.forEach(a => {
      ld(a, () => {
        if (n || !e || e.destroyed) return;
        n = !0, e.animating = !1;
        const l = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0
        });
        e.wrapperEl.dispatchEvent(l)
      })
    })
  }
}

function bc(s) {
  let {
    swiper: e,
    extendParams: t,
    on: r
  } = s;
  t({
    fadeEffect: {
      crossFade: !1
    }
  }), yc({
    effect: "fade",
    swiper: e,
    on: r,
    setTranslate: () => {
      const {
        slides: o
      } = e, a = e.params.fadeEffect;
      for (let l = 0; l < o.length; l += 1) {
        const u = e.slides[l];
        let d = -u.swiperSlideOffset;
        e.params.virtualTranslate || (d -= e.translate);
        let p = 0;
        e.isHorizontal() || (p = d, d = 0);
        const c = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(u.progress), 0) : 1 + Math.min(Math.max(u.progress, -1), 0),
          g = xc(a, u);
        g.style.opacity = c, g.style.transform = `translate3d(${d}px, ${p}px, 0px)`
      }
    },
    setTransition: o => {
      const a = e.slides.map(l => jl(l));
      a.forEach(l => {
        l.style.transitionDuration = `${o}ms`
      }), Tc({
        swiper: e,
        duration: o,
        transformElements: a
      })
    },
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      spaceBetween: 0,
      virtualTranslate: !e.params.cssMode
    })
  })
}

function Sa(s) {
  document.querySelectorAll(s).forEach(e => {
    const t = e.querySelector(".swiper");
    if (!t) return;
    const r = new lt(t, {
      modules: [wc, tu, Oo],
      speed: 700,
      loop: !1,
      slidesPerView: 1,
      spaceBetween: 16,
      mousewheel: {
        forceToAxis: !0
      },
      keyboard: {
        enabled: !0,
        onlyInViewport: !0
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    });
    e.querySelectorAll(".slide_prev").forEach(i => i.addEventListener("click", () => r.slidePrev())), e.querySelectorAll(".slide_next").forEach(i => i.addEventListener("click", () => r.slideNext()))
  })
}

function In(s, e, t, r) {
  const i = document.querySelector(s);
  if (!i) return;
  const n = i.querySelector(e);
  if (!n) return;
  let o = null;
  const a = window.matchMedia("(max-width: 991px)"),
    l = () => {
      a.matches && !o ? o = new lt(n, {
        modules: [tu, Oo],
        speed: 700,
        loop: !1,
        slidesPerView: 1,
        spaceBetween: 16,
        mousewheel: {
          forceToAxis: !0
        },
        keyboard: {
          enabled: !0,
          onlyInViewport: !0
        },
        breakpoints: {
          768: {
            slidesPerView: r,
            spaceBetween: r > 1 ? 24 : 16
          }
        }
      }) : !a.matches && o && (o.destroy(!0, !0), o = null)
    };
  i.querySelectorAll(`${t} .slide_prev`).forEach(u => u.addEventListener("click", () => o?.slidePrev())), i.querySelectorAll(`${t} .slide_next`).forEach(u => u.addEventListener("click", () => o?.slideNext())), a.addEventListener("change", l), l()
}

function Sc(s) {
  document.querySelectorAll(s).forEach(e => {
    const t = e.querySelector(".swiper");
    if (!t) return;
    const r = new lt(t, {
      modules: [bc, Oo],
      effect: "fade",
      fadeEffect: {
        crossFade: !0
      },
      speed: 500,
      loop: !0,
      slidesPerView: 1,
      keyboard: {
        enabled: !0,
        onlyInViewport: !0
      }
    });
    e.querySelectorAll(".w-slider-arrow-left").forEach(i => i.addEventListener("click", () => r.slidePrev())), e.querySelectorAll(".w-slider-arrow-right").forEach(i => i.addEventListener("click", () => r.slideNext()))
  })
}

function Ea() {
  Sa(".section_depoimentos"), Sc(".section_testimonia"), Sa(".section_blog"), In(".section_services", ".services_cards.swiper", ".is-services", 2), In(".section_expertise", ".expertise_cards.swiper", ".is-expertise", 1), In(".section_pricing", ".pricing_cards.swiper", ".is-pricing", 2), In(".sec_team", ".team_cards.swiper", ".is-team", 2)
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Ea) : Ea();