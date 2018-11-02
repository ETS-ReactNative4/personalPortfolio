

! function (t) {
    "use strict";
    var e = t.GreenSockGlobals || t,
        i = function (t) {
            var i, s = t.split("."),
                n = e;
            for (i = 0; i < s.length; i++) n[s[i]] = n = n[s[i]] || {};
            return n
        },
        s = i("com.greensock.utils"),
        n = function (t) {
            var e = t.nodeType,
                i = "";
            if (1 === e || 9 === e || 11 === e) {
                if ("string" == typeof t.textContent) return t.textContent;
                for (t = t.firstChild; t; t = t.nextSibling) i += n(t)
            } else if (3 === e || 4 === e) return t.nodeValue;
            return i
        },
        r = document,
        o = r.defaultView ? r.defaultView.getComputedStyle : function () {},
        a = /([A-Z])/g,
        l = function (t, e, i, s) {
            var n;
            return (i = i || o(t, null)) ? (t = i.getPropertyValue(e.replace(a, "-$1").toLowerCase()), n = t || i.length ? t : i[e]) : t.currentStyle && (i = t.currentStyle, n = i[e]), s ? n : parseInt(n, 10) || 0
        },
        h = function (t) {
            return !!(t.length && t[0] && (t[0].nodeType && t[0].style && !t.nodeType || t[0].length && t[0][0]))
        },
        c = function (t) {
            var e, i, s, n = [],
                r = t.length;
            for (e = 0; r > e; e++)
                if (i = t[e], h(i))
                    for (s = i.length, s = 0; s < i.length; s++) n.push(i[s]);
                else n.push(i);
            return n
        },
        d = /(?:\r|\n|\t\t)/g,
        u = /(?:\s\s+)/g,
        p = 55296,
        f = 56319,
        m = 56320,
        v = 127462,
        g = 127487,
        _ = 127995,
        y = 127999,
        w = function (t) {
            return (t.charCodeAt(0) - p << 10) + (t.charCodeAt(1) - m) + 65536
        },
        x = r.all && !r.addEventListener,
        b = " style='position:relative;display:inline-block;" + (x ? "*display:inline;*zoom:1;'" : "'"),
        S = function (t, e) {
            t = t || "";
            var i = -1 !== t.indexOf("++"),
                s = 1;
            return i && (t = t.split("++").join("")),
                function () {
                    return "<" + e + b + (t ? " class='" + t + (i ? s++ : "") + "'>" : ">")
                }
        },
        T = s.SplitText = e.SplitText = function (t, e) {
            if ("string" == typeof t && (t = T.selector(t)), !t) throw "cannot split a null element.";
            this.elements = h(t) ? c(t) : [t], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = e || {}, this.split(e)
        },
        C = function (t, e, i) {
            var s = t.nodeType;
            if (1 === s || 9 === s || 11 === s)
                for (t = t.firstChild; t; t = t.nextSibling) C(t, e, i);
            else(3 === s || 4 === s) && (t.nodeValue = t.nodeValue.split(e).join(i))
        },
        M = function (t, e) {
            for (var i = e.length; --i > -1;) t.push(e[i])
        },
        E = function (t) {
            var e, i = [],
                s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i
        },
        k = function (t, e, i) {
            for (var s; t && t !== e;) {
                if (s = t._next || t.nextSibling) return s.textContent.charAt(0) === i;
                t = t.parentNode || t._parent
            }
            return !1
        },
        L = function (t) {
            var e, i, s = E(t.childNodes),
                n = s.length;
            for (e = 0; n > e; e++) i = s[e], i._isSplit ? L(i) : (e && 3 === i.previousSibling.nodeType ? i.previousSibling.nodeValue += 3 === i.nodeType ? i.nodeValue : i.firstChild.nodeValue : 3 !== i.nodeType && t.insertBefore(i.firstChild, i), t.removeChild(i))
        },
        P = function (t, e, i, s, n, a, h) {
            var c, d, u, p, f, m, v, g, _, y, w, x, b = o(t),
                S = l(t, "paddingLeft", b),
                T = -999,
                E = l(t, "borderBottomWidth", b) + l(t, "borderTopWidth", b),
                P = l(t, "borderLeftWidth", b) + l(t, "borderRightWidth", b),
                A = l(t, "paddingTop", b) + l(t, "paddingBottom", b),
                O = l(t, "paddingLeft", b) + l(t, "paddingRight", b),
                D = .2 * l(t, "fontSize"),
                R = l(t, "textAlign", b, !0),
                N = [],
                z = [],
                I = [],
                j = e.wordDelimiter || " ",
                F = e.span ? "span" : "div",
                V = e.type || e.split || "chars,words,lines",
                H = n && -1 !== V.indexOf("lines") ? [] : null,
                B = -1 !== V.indexOf("words"),
                W = -1 !== V.indexOf("chars"),
                q = "absolute" === e.position || !0 === e.absolute,
                X = e.linesClass,
                Y = -1 !== (X || "").indexOf("++");
            for (H && 1 === t.children.length && t.children[0]._isSplit && (t = t.children[0]), Y && (X = X.split("++").join("")), d = t.getElementsByTagName("*"), u = d.length, f = [], c = 0; u > c; c++) f[c] = d[c];
            if (H || q)
                for (c = 0; u > c; c++) p = f[c], ((m = p.parentNode === t) || q || W && !B) && (x = p.offsetTop, H && m && Math.abs(x - T) > D && "BR" !== p.nodeName && (v = [], H.push(v), T = x), q && (p._x = p.offsetLeft, p._y = x, p._w = p.offsetWidth, p._h = p.offsetHeight), H && ((p._isSplit && m || !W && m || B && m || !B && p.parentNode.parentNode === t && !p.parentNode._isSplit) && (v.push(p), p._x -= S, k(p, t, j) && (p._wordEnd = !0)), "BR" === p.nodeName && p.nextSibling && "BR" === p.nextSibling.nodeName && H.push([])));
            for (c = 0; u > c; c++) p = f[c], m = p.parentNode === t, "BR" !== p.nodeName ? (q && (_ = p.style, B || m || (p._x += p.parentNode._x, p._y += p.parentNode._y), _.left = p._x + "px", _.top = p._y + "px", _.position = "absolute", _.display = "block", _.width = p._w + 1 + "px", _.height = p._h + "px"), !B && W ? p._isSplit ? (p._next = p.nextSibling, p.parentNode.appendChild(p)) : p.parentNode._isSplit ? (p._parent = p.parentNode, !p.previousSibling && p.firstChild && (p.firstChild._isFirst = !0), p._next = p.nextSibling && p.nextSibling._isFirst ? null : p.nextSibling, p.parentNode.removeChild(p), f.splice(c--, 1), u--) : m || (x = !p.nextSibling && k(p.parentNode, t, j), p.parentNode._parent && p.parentNode._parent.appendChild(p), x && p.parentNode.appendChild(r.createTextNode(" ")), e.span && (p.style.display = "inline"), N.push(p)) : p.parentNode._isSplit && !p._isSplit && "" !== p.innerHTML ? z.push(p) : W && !p._isSplit && (e.span && (p.style.display = "inline"), N.push(p))) : H || q ? (t.removeChild(p), f.splice(c--, 1), u--) : B || t.appendChild(p);
            if (H) {
                for (q && (y = r.createElement(F), t.appendChild(y), w = y.offsetWidth + "px", x = y.offsetParent === t ? 0 : t.offsetLeft, t.removeChild(y)), _ = t.style.cssText, t.style.cssText = "display:none;"; t.firstChild;) t.removeChild(t.firstChild);
                for (g = " " === j && (!q || !B && !W), c = 0; c < H.length; c++) {
                    for (v = H[c], y = r.createElement(F), y.style.cssText = "display:block;text-align:" + R + ";position:" + (q ? "absolute;" : "relative;"), X && (y.className = X + (Y ? c + 1 : "")), I.push(y), u = v.length, d = 0; u > d; d++) "BR" !== v[d].nodeName && (p = v[d], y.appendChild(p), g && p._wordEnd && y.appendChild(r.createTextNode(" ")), q && (0 === d && (y.style.top = p._y + "px", y.style.left = S + x + "px"), p.style.top = "0px", x && (p.style.left = p._x - x + "px")));
                    0 === u ? y.innerHTML = "&nbsp;" : B || W || (L(y), C(y, String.fromCharCode(160), " ")), q && (y.style.width = w, y.style.height = p._h + "px"), t.appendChild(y)
                }
                t.style.cssText = _
            }
            q && (h > t.clientHeight && (t.style.height = h - A + "px", t.clientHeight < h && (t.style.height = h + E + "px")), a > t.clientWidth && (t.style.width = a - O + "px", t.clientWidth < a && (t.style.width = a + P + "px"))), M(i, N), M(s, z), M(n, I)
        },
        A = function (t, e, i, s) {
            var o, a, l, h, c, m, x, b, S, T = e.span ? "span" : "div",
                M = e.type || e.split || "chars,words,lines",
                E = (M.indexOf("words"), -1 !== M.indexOf("chars")),
                k = "absolute" === e.position || !0 === e.absolute,
                L = e.wordDelimiter || " ",
                P = " " !== L ? "" : k ? "&#173; " : " ",
                A = e.span ? "</span>" : "</div>",
                O = !0,
                D = r.createElement("div"),
                R = t.parentNode;
            for (R.insertBefore(D, t), D.textContent = t.nodeValue, R.removeChild(t), t = D, o = n(t), x = -1 !== o.indexOf("<"), !1 !== e.reduceWhiteSpace && (o = o.replace(u, " ").replace(d, "")), x && (o = o.split("<").join("{{LT}}")), c = o.length, a = (" " === o.charAt(0) ? P : "") + i(), l = 0; c > l; l++)
                if ((m = o.charAt(l)) === L && o.charAt(l - 1) !== L && l) {
                    for (a += O ? A : "", O = !1; o.charAt(l + 1) === L;) a += P, l++;
                    l === c - 1 ? a += P : ")" !== o.charAt(l + 1) && (a += P + i(), O = !0)
                } else "{" === m && "{{LT}}" === o.substr(l, 6) ? (a += E ? s() + "{{LT}}</" + T + ">" : "{{LT}}", l += 5) : m.charCodeAt(0) >= p && m.charCodeAt(0) <= f || o.charCodeAt(l + 1) >= 65024 && o.charCodeAt(l + 1) <= 65039 ? (b = w(o.substr(l, 2)), S = w(o.substr(l + 2, 2)), h = b >= v && g >= b && S >= v && g >= S || S >= _ && y >= S ? 4 : 2, a += E && " " !== m ? s() + o.substr(l, h) + "</" + T + ">" : o.substr(l, h), l += h - 1) : a += E && " " !== m ? s() + m + "</" + T + ">" : m;
            t.outerHTML = a + (O ? A : ""), x && C(R, "{{LT}}", "<")
        },
        O = function (t, e, i, s) {
            var n, r, o = E(t.childNodes),
                a = o.length,
                h = "absolute" === e.position || !0 === e.absolute;
            if (3 !== t.nodeType || a > 1) {
                for (e.absolute = !1, n = 0; a > n; n++) r = o[n], (3 !== r.nodeType || /\S+/.test(r.nodeValue)) && (h && 3 !== r.nodeType && "inline" === l(r, "display", null, !0) && (r.style.display = "inline-block", r.style.position = "relative"), r._isSplit = !0, O(r, e, i, s));
                return e.absolute = h, void(t._isSplit = !0)
            }
            A(t, e, i, s)
        },
        D = T.prototype;
    D.split = function (t) {
        this.isSplit && this.revert(), this.vars = t = t || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var e, i, s, n = this.elements.length, r = t.span ? "span" : "div", o = ("absolute" === t.position || t.absolute, S(t.wordsClass, r)), a = S(t.charsClass, r); --n > -1;) s = this.elements[n], this._originals[n] = s.innerHTML, e = s.clientHeight, i = s.clientWidth, O(s, t, o, a), P(s, t, this.chars, this.words, this.lines, i, e);
        return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
    }, D.revert = function () {
        if (!this._originals) throw "revert() call wasn't scoped properly.";
        for (var t = this._originals.length; --t > -1;) this.elements[t].innerHTML = this._originals[t];
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, T.selector = t.$ || t.jQuery || function (e) {
        var i = t.$ || t.jQuery;
        return i ? (T.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
    }, T.version = "0.5.6"
}(_gsScope),
function (t) {
    "use strict";
    var e = function () {
        return (_gsScope.GreenSockGlobals || _gsScope)[t]
    };
    "function" == typeof define && define.amd ? define([], e) : "undefined" != typeof module && module.exports && (module.exports = e())
}("SplitText");
