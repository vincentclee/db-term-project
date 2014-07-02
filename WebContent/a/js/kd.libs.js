document.write = document.writeln = function () {
	throw new Error("document.[write|writeln] is nisht-nisht")
};
Encoder = {
	EncodeType: "entity",
	isEmpty: function (r) {
		return r ? null === r || 0 == r.length || /^\s+$/.test(r) : !0
	},
	arr1: ["&nbsp;", "&iexcl;", "&cent;", "&pound;", "&curren;", "&yen;", "&brvbar;", "&sect;", "&uml;", "&copy;", "&ordf;", "&laquo;", "&not;", "&shy;", "&reg;", "&macr;", "&deg;", "&plusmn;", "&sup2;", "&sup3;", "&acute;", "&micro;", "&para;", "&middot;", "&cedil;", "&sup1;", "&ordm;", "&raquo;", "&frac14;", "&frac12;", "&frac34;", "&iquest;", "&Agrave;", "&Aacute;", "&Acirc;", "&Atilde;", "&Auml;", "&Aring;", "&AElig;", "&Ccedil;", "&Egrave;", "&Eacute;", "&Ecirc;", "&Euml;", "&Igrave;", "&Iacute;", "&Icirc;", "&Iuml;", "&ETH;", "&Ntilde;", "&Ograve;", "&Oacute;", "&Ocirc;", "&Otilde;", "&Ouml;", "&times;", "&Oslash;", "&Ugrave;", "&Uacute;", "&Ucirc;", "&Uuml;", "&Yacute;", "&THORN;", "&szlig;", "&agrave;", "&aacute;", "&acirc;", "&atilde;", "&auml;", "&aring;", "&aelig;", "&ccedil;", "&egrave;", "&eacute;", "&ecirc;", "&euml;", "&igrave;", "&iacute;", "&icirc;", "&iuml;", "&eth;", "&ntilde;", "&ograve;", "&oacute;", "&ocirc;", "&otilde;", "&ouml;", "&divide;", "&oslash;", "&ugrave;", "&uacute;", "&ucirc;", "&uuml;", "&yacute;", "&thorn;", "&yuml;", "&quot;", "&amp;", "&lt;", "&gt;", "&OElig;", "&oelig;", "&Scaron;", "&scaron;", "&Yuml;", "&circ;", "&tilde;", "&ensp;", "&emsp;", "&thinsp;", "&zwnj;", "&zwj;", "&lrm;", "&rlm;", "&ndash;", "&mdash;", "&lsquo;", "&rsquo;", "&sbquo;", "&ldquo;", "&rdquo;", "&bdquo;", "&dagger;", "&Dagger;", "&permil;", "&lsaquo;", "&rsaquo;", "&euro;", "&fnof;", "&Alpha;", "&Beta;", "&Gamma;", "&Delta;", "&Epsilon;", "&Zeta;", "&Eta;", "&Theta;", "&Iota;", "&Kappa;", "&Lambda;", "&Mu;", "&Nu;", "&Xi;", "&Omicron;", "&Pi;", "&Rho;", "&Sigma;", "&Tau;", "&Upsilon;", "&Phi;", "&Chi;", "&Psi;", "&Omega;", "&alpha;", "&beta;", "&gamma;", "&delta;", "&epsilon;", "&zeta;", "&eta;", "&theta;", "&iota;", "&kappa;", "&lambda;", "&mu;", "&nu;", "&xi;", "&omicron;", "&pi;", "&rho;", "&sigmaf;", "&sigma;", "&tau;", "&upsilon;", "&phi;", "&chi;", "&psi;", "&omega;", "&thetasym;", "&upsih;", "&piv;", "&bull;", "&hellip;", "&prime;", "&Prime;", "&oline;", "&frasl;", "&weierp;", "&image;", "&real;", "&trade;", "&alefsym;", "&larr;", "&uarr;", "&rarr;", "&darr;", "&harr;", "&crarr;", "&lArr;", "&uArr;", "&rArr;", "&dArr;", "&hArr;", "&forall;", "&part;", "&exist;", "&empty;", "&nabla;", "&isin;", "&notin;", "&ni;", "&prod;", "&sum;", "&minus;", "&lowast;", "&radic;", "&prop;", "&infin;", "&ang;", "&and;", "&or;", "&cap;", "&cup;", "&int;", "&there4;", "&sim;", "&cong;", "&asymp;", "&ne;", "&equiv;", "&le;", "&ge;", "&sub;", "&sup;", "&nsub;", "&sube;", "&supe;", "&oplus;", "&otimes;", "&perp;", "&sdot;", "&lceil;", "&rceil;", "&lfloor;", "&rfloor;", "&lang;", "&rang;", "&loz;", "&spades;", "&clubs;", "&hearts;", "&diams;"],
	arr2: ["&#160;", "&#161;", "&#162;", "&#163;", "&#164;", "&#165;", "&#166;", "&#167;", "&#168;", "&#169;", "&#170;", "&#171;", "&#172;", "&#173;", "&#174;", "&#175;", "&#176;", "&#177;", "&#178;", "&#179;", "&#180;", "&#181;", "&#182;", "&#183;", "&#184;", "&#185;", "&#186;", "&#187;", "&#188;", "&#189;", "&#190;", "&#191;", "&#192;", "&#193;", "&#194;", "&#195;", "&#196;", "&#197;", "&#198;", "&#199;", "&#200;", "&#201;", "&#202;", "&#203;", "&#204;", "&#205;", "&#206;", "&#207;", "&#208;", "&#209;", "&#210;", "&#211;", "&#212;", "&#213;", "&#214;", "&#215;", "&#216;", "&#217;", "&#218;", "&#219;", "&#220;", "&#221;", "&#222;", "&#223;", "&#224;", "&#225;", "&#226;", "&#227;", "&#228;", "&#229;", "&#230;", "&#231;", "&#232;", "&#233;", "&#234;", "&#235;", "&#236;", "&#237;", "&#238;", "&#239;", "&#240;", "&#241;", "&#242;", "&#243;", "&#244;", "&#245;", "&#246;", "&#247;", "&#248;", "&#249;", "&#250;", "&#251;", "&#252;", "&#253;", "&#254;", "&#255;", "&#34;", "&#38;", "&#60;", "&#62;", "&#338;", "&#339;", "&#352;", "&#353;", "&#376;", "&#710;", "&#732;", "&#8194;", "&#8195;", "&#8201;", "&#8204;", "&#8205;", "&#8206;", "&#8207;", "&#8211;", "&#8212;", "&#8216;", "&#8217;", "&#8218;", "&#8220;", "&#8221;", "&#8222;", "&#8224;", "&#8225;", "&#8240;", "&#8249;", "&#8250;", "&#8364;", "&#402;", "&#913;", "&#914;", "&#915;", "&#916;", "&#917;", "&#918;", "&#919;", "&#920;", "&#921;", "&#922;", "&#923;", "&#924;", "&#925;", "&#926;", "&#927;", "&#928;", "&#929;", "&#931;", "&#932;", "&#933;", "&#934;", "&#935;", "&#936;", "&#937;", "&#945;", "&#946;", "&#947;", "&#948;", "&#949;", "&#950;", "&#951;", "&#952;", "&#953;", "&#954;", "&#955;", "&#956;", "&#957;", "&#958;", "&#959;", "&#960;", "&#961;", "&#962;", "&#963;", "&#964;", "&#965;", "&#966;", "&#967;", "&#968;", "&#969;", "&#977;", "&#978;", "&#982;", "&#8226;", "&#8230;", "&#8242;", "&#8243;", "&#8254;", "&#8260;", "&#8472;", "&#8465;", "&#8476;", "&#8482;", "&#8501;", "&#8592;", "&#8593;", "&#8594;", "&#8595;", "&#8596;", "&#8629;", "&#8656;", "&#8657;", "&#8658;", "&#8659;", "&#8660;", "&#8704;", "&#8706;", "&#8707;", "&#8709;", "&#8711;", "&#8712;", "&#8713;", "&#8715;", "&#8719;", "&#8721;", "&#8722;", "&#8727;", "&#8730;", "&#8733;", "&#8734;", "&#8736;", "&#8743;", "&#8744;", "&#8745;", "&#8746;", "&#8747;", "&#8756;", "&#8764;", "&#8773;", "&#8776;", "&#8800;", "&#8801;", "&#8804;", "&#8805;", "&#8834;", "&#8835;", "&#8836;", "&#8838;", "&#8839;", "&#8853;", "&#8855;", "&#8869;", "&#8901;", "&#8968;", "&#8969;", "&#8970;", "&#8971;", "&#9001;", "&#9002;", "&#9674;", "&#9824;", "&#9827;", "&#9829;", "&#9830;"],
	HTML2Numerical: function (r) {
		return this.swapArrayVals(r, this.arr1, this.arr2)
	},
	NumericalToHTML: function (r) {
		return this.swapArrayVals(r, this.arr2, this.arr1)
	},
	numEncode: function (r) {
		if (this.isEmpty(r)) return "";
		for (var e = "", a = 0; a < r.length; a++) {
			var i = r.charAt(a);
			(" " > i || i > "~") && (i = "&#" + i.charCodeAt() + ";"), e += i
		}
		return e
	},
	htmlDecode: function (r) {
		var e, a, i = r;
		if (this.isEmpty(i)) return "";
		if (i = this.HTML2Numerical(i), arr = i.match(/&#[0-9]{1,5};/g), null != arr)
			for (var t = 0; t < arr.length; t++) a = arr[t], e = a.substring(2, a.length - 1), i = e >= -32768 && 65535 >= e ? i.replace(a, String.fromCharCode(e)) : i.replace(a, "");
		return i
	},
	htmlEncode: function (r, e) {
		return this.isEmpty(r) ? "" : (e = e || !1, e && (r = "numerical" == this.EncodeType ? r.replace(/&/g, "&#38;") : r.replace(/&/g, "&amp;")), r = this.XSSEncode(r, !1), "numerical" != this.EncodeType && e || (r = this.HTML2Numerical(r)), r = this.numEncode(r), e || (r = r.replace(/&#/g, "##AMPHASH##"), r = "numerical" == this.EncodeType ? r.replace(/&/g, "&#38;") : r.replace(/&/g, "&amp;"), r = r.replace(/##AMPHASH##/g, "&#")), r = r.replace(/&#\d*([^\d;]|$)/g, "$1"), e || (r = this.correctEncoding(r)), "entity" == this.EncodeType && (r = this.NumericalToHTML(r)), r)
	},
	XSSEncode: function (r, e) {
		return this.isEmpty(r) ? "" : (e = e || !0, e ? (r = r.replace(/\'/g, "&#39;"), r = r.replace(/\"/g, "&quot;"), r = r.replace(/</g, "&lt;"), r = r.replace(/>/g, "&gt;")) : (r = r.replace(/\'/g, "&#39;"), r = r.replace(/\"/g, "&#34;"), r = r.replace(/</g, "&#60;"), r = r.replace(/>/g, "&#62;")), r)
	},
	hasEncoded: function (r) {
		return /&#[0-9]{1,5};/g.test(r) ? !0 : /&[A-Z]{2,6};/gi.test(r) ? !0 : !1
	},
	stripUnicode: function (r) {
		return r.replace(/[^\x20-\x7E]/g, "")
	},
	correctEncoding: function (r) {
		return r.replace(/(&amp;)(amp;)+/, "$1")
	},
	swapArrayVals: function (r, e, a) {
		if (this.isEmpty(r)) return "";
		var i;
		if (e && a && e.length == a.length)
			for (var t = 0, c = e.length; c > t; t++) i = new RegExp(e[t], "g"), r = r.replace(i, a[t]);
		return r
	},
	inArray: function (r, e) {
		for (var a = 0, i = e.length; i > a; a++)
			if (e[a] === r) return a;
		return -1
	}
};
! function (e, t) {
	function n(e) {
		var t = e.length,
			n = ut.type(e);
		return ut.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
	}

	function r(e) {
		var t = Nt[e] = {};
		return ut.each(e.match(ct) || [], function (e, n) {
			t[n] = !0
		}), t
	}

	function i(e, n, r, i) {
		if (ut.acceptData(e)) {
			var o, a, s = ut.expando,
				u = "string" == typeof n,
				l = e.nodeType,
				c = l ? ut.cache : e,
				f = l ? e[s] : e[s] && s;
			if (f && c[f] && (i || c[f].data) || !u || r !== t) return f || (l ? e[s] = f = Z.pop() || ut.guid++ : f = s), c[f] || (c[f] = {}, l || (c[f].toJSON = ut.noop)), ("object" == typeof n || "function" == typeof n) && (i ? c[f] = ut.extend(c[f], n) : c[f].data = ut.extend(c[f].data, n)), o = c[f], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[ut.camelCase(n)] = r), u ? (a = o[n], null == a && (a = o[ut.camelCase(n)])) : a = o, a
		}
	}

	function o(e, t, n) {
		if (ut.acceptData(e)) {
			var r, i, o, a = e.nodeType,
				u = a ? ut.cache : e,
				l = a ? e[ut.expando] : ut.expando;
			if (u[l]) {
				if (t && (o = n ? u[l] : u[l].data)) {
					ut.isArray(t) ? t = t.concat(ut.map(t, ut.camelCase)) : t in o ? t = [t] : (t = ut.camelCase(t), t = t in o ? [t] : t.split(" "));
					for (r = 0, i = t.length; i > r; r++) delete o[t[r]];
					if (!(n ? s : ut.isEmptyObject)(o)) return
				}(n || (delete u[l].data, s(u[l]))) && (a ? ut.cleanData([e], !0) : ut.support.deleteExpando || u != u.window ? delete u[l] : u[l] = null)
			}
		}
	}

	function a(e, n, r) {
		if (r === t && 1 === e.nodeType) {
			var i = "data-" + n.replace(kt, "-$1").toLowerCase();
			if (r = e.getAttribute(i), "string" == typeof r) {
				try {
					r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : Ct.test(r) ? ut.parseJSON(r) : r
				} catch (o) {}
				ut.data(e, n, r)
			} else r = t
		}
		return r
	}

	function s(e) {
		var t;
		for (t in e)
			if (("data" !== t || !ut.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}

	function u() {
		return !0
	}

	function l() {
		return !1
	}

	function c(e, t) {
		do e = e[t]; while (e && 1 !== e.nodeType);
		return e
	}

	function f(e, t, n) {
		if (t = t || 0, ut.isFunction(t)) return ut.grep(e, function (e, r) {
			var i = !!t.call(e, r, e);
			return i === n
		});
		if (t.nodeType) return ut.grep(e, function (e) {
			return e === t === n
		});
		if ("string" == typeof t) {
			var r = ut.grep(e, function (e) {
				return 1 === e.nodeType
			});
			if (It.test(t)) return ut.filter(t, r, !n);
			t = ut.filter(t, r)
		}
		return ut.grep(e, function (e) {
			return ut.inArray(e, t) >= 0 === n
		})
	}

	function p(e) {
		var t = Ut.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement)
			for (; t.length;) n.createElement(t.pop());
		return n
	}

	function d(e, t) {
		return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
	}

	function h(e) {
		var t = e.getAttributeNode("type");
		return e.type = (t && t.specified) + "/" + e.type, e
	}

	function g(e) {
		var t = on.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}

	function m(e, t) {
		for (var n, r = 0; null != (n = e[r]); r++) ut._data(n, "globalEval", !t || ut._data(t[r], "globalEval"))
	}

	function y(e, t) {
		if (1 === t.nodeType && ut.hasData(e)) {
			var n, r, i, o = ut._data(e),
				a = ut._data(t, o),
				s = o.events;
			if (s) {
				delete a.handle, a.events = {};
				for (n in s)
					for (r = 0, i = s[n].length; i > r; r++) ut.event.add(t, n, s[n][r])
			}
			a.data && (a.data = ut.extend({}, a.data))
		}
	}

	function v(e, t) {
		var n, r, i;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !ut.support.noCloneEvent && t[ut.expando]) {
				i = ut._data(t);
				for (r in i.events) ut.removeEvent(t, r, i.handle);
				t.removeAttribute(ut.expando)
			}
			"script" === n && t.text !== e.text ? (h(t).text = e.text, g(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ut.support.html5Clone && e.innerHTML && !ut.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tn.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
		}
	}

	function b(e, n) {
		var r, i, o = 0,
			a = typeof e.getElementsByTagName !== V ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== V ? e.querySelectorAll(n || "*") : t;
		if (!a)
			for (a = [], r = e.childNodes || e; null != (i = r[o]); o++)!n || ut.nodeName(i, n) ? a.push(i) : ut.merge(a, b(i, n));
		return n === t || n && ut.nodeName(e, n) ? ut.merge([e], a) : a
	}

	function x(e) {
		tn.test(e.type) && (e.defaultChecked = e.checked)
	}

	function w(e, t) {
		if (t in e) return t;
		for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = kn.length; i--;)
			if (t = kn[i] + n, t in e) return t;
		return r
	}

	function T(e, t) {
		return e = t || e, "none" === ut.css(e, "display") || !ut.contains(e.ownerDocument, e)
	}

	function N(e, t) {
		for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = ut._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && T(r) && (o[a] = ut._data(r, "olddisplay", S(r.nodeName)))) : o[a] || (i = T(r), (n && "none" !== n || !i) && ut._data(r, "olddisplay", i ? n : ut.css(r, "display"))));
		for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
		return e
	}

	function C(e, t, n) {
		var r = vn.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
	}

	function k(e, t, n, r, i) {
		for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += ut.css(e, n + Cn[o], !0, i)), r ? ("content" === n && (a -= ut.css(e, "padding" + Cn[o], !0, i)), "margin" !== n && (a -= ut.css(e, "border" + Cn[o] + "Width", !0, i))) : (a += ut.css(e, "padding" + Cn[o], !0, i), "padding" !== n && (a += ut.css(e, "border" + Cn[o] + "Width", !0, i)));
		return a
	}

	function E(e, t, n) {
		var r = !0,
			i = "width" === t ? e.offsetWidth : e.offsetHeight,
			o = fn(e),
			a = ut.support.boxSizing && "border-box" === ut.css(e, "boxSizing", !1, o);
		if (0 >= i || null == i) {
			if (i = pn(e, t, o), (0 > i || null == i) && (i = e.style[t]), bn.test(i)) return i;
			r = a && (ut.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
		}
		return i + k(e, t, n || (a ? "border" : "content"), r, o) + "px"
	}

	function S(e) {
		var t = Y,
			n = wn[e];
		return n || (n = A(e, t), "none" !== n && n || (cn = (cn || ut("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (cn[0].contentWindow || cn[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = A(e, t), cn.detach()), wn[e] = n), n
	}

	function A(e, t) {
		var n = ut(t.createElement(e)).appendTo(t.body),
			r = ut.css(n[0], "display");
		return n.remove(), r
	}

	function j(e, t, n, r) {
		var i;
		if (ut.isArray(t)) ut.each(t, function (t, i) {
			n || Sn.test(e) ? r(e, i) : j(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
		});
		else if (n || "object" !== ut.type(t)) r(e, t);
		else
			for (i in t) j(e + "[" + i + "]", t[i], n, r)
	}

	function D(e) {
		return function (t, n) {
			"string" != typeof t && (n = t, t = "*");
			var r, i = 0,
				o = t.toLowerCase().match(ct) || [];
			if (ut.isFunction(n))
				for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
		}
	}

	function L(e, t, n, r) {
		function i(s) {
			var u;
			return o[s] = !0, ut.each(e[s] || [], function (e, s) {
				var l = s(t, n, r);
				return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
			}), u
		}
		var o = {},
			a = e === zn;
		return i(t.dataTypes[0]) || !o["*"] && i("*")
	}

	function H(e, n) {
		var r, i, o = ut.ajaxSettings.flatOptions || {};
		for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
		return r && ut.extend(!0, e, r), e
	}

	function q(e, n, r) {
		var i, o, a, s, u = e.contents,
			l = e.dataTypes,
			c = e.responseFields;
		for (s in c) s in r && (n[c[s]] = r[s]);
		for (;
			"*" === l[0];) l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
		if (o)
			for (s in u)
				if (u[s] && u[s].test(o)) {
					l.unshift(s);
					break
				}
		if (l[0] in r) a = l[0];
		else {
			for (s in r) {
				if (!l[0] || e.converters[s + " " + l[0]]) {
					a = s;
					break
				}
				i || (i = s)
			}
			a = a || i
		}
		return a ? (a !== l[0] && l.unshift(a), r[a]) : void 0
	}

	function M(e, t) {
		var n, r, i, o, a = {},
			s = 0,
			u = e.dataTypes.slice(),
			l = u[0];
		if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), u[1])
			for (i in e.converters) a[i.toLowerCase()] = e.converters[i];
		for (; r = u[++s];)
			if ("*" !== r) {
				if ("*" !== l && l !== r) {
					if (i = a[l + " " + r] || a["* " + r], !i)
						for (n in a)
							if (o = n.split(" "), o[1] === r && (i = a[l + " " + o[0]] || a["* " + o[0]])) {
								i === !0 ? i = a[n] : a[n] !== !0 && (r = o[0], u.splice(s--, 0, r));
								break
							}
					if (i !== !0)
						if (i && e["throws"]) t = i(t);
						else try {
							t = i(t)
						} catch (c) {
							return {
								state: "parsererror",
								error: i ? c : "No conversion from " + l + " to " + r
							}
						}
				}
				l = r
			}
		return {
			state: "success",
			data: t
		}
	}

	function _() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}

	function F() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}

	function O() {
		return setTimeout(function () {
			Zn = t
		}), Zn = ut.now()
	}

	function B(e, t) {
		ut.each(t, function (t, n) {
			for (var r = (or[t] || []).concat(or["*"]), i = 0, o = r.length; o > i; i++)
				if (r[i].call(e, t, n)) return
		})
	}

	function P(e, t, n) {
		var r, i, o = 0,
			a = ir.length,
			s = ut.Deferred().always(function () {
				delete u.elem
			}),
			u = function () {
				if (i) return !1;
				for (var t = Zn || O(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
				return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
			},
			l = s.promise({
				elem: e,
				props: ut.extend({}, t),
				opts: ut.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: Zn || O(),
				duration: n.duration,
				tweens: [],
				createTween: function (t, n) {
					var r = ut.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
					return l.tweens.push(r), r
				},
				stop: function (t) {
					var n = 0,
						r = t ? l.tweens.length : 0;
					if (i) return this;
					for (i = !0; r > n; n++) l.tweens[n].run(1);
					return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
				}
			}),
			c = l.props;
		for (R(c, l.opts.specialEasing); a > o; o++)
			if (r = ir[o].call(l, e, c, l.opts)) return r;
		return B(l, c), ut.isFunction(l.opts.start) && l.opts.start.call(e, l), ut.fx.timer(ut.extend(u, {
			elem: e,
			anim: l,
			queue: l.opts.queue
		})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
	}

	function R(e, t) {
		var n, r, i, o, a;
		for (i in e)
			if (r = ut.camelCase(i), o = t[r], n = e[i], ut.isArray(n) && (o = n[1], n = e[i] = n[0]), i !== r && (e[r] = n, delete e[i]), a = ut.cssHooks[r], a && "expand" in a) {
				n = a.expand(n), delete e[r];
				for (i in n) i in e || (e[i] = n[i], t[i] = o)
			} else t[r] = o
	}

	function W(e, t, n) {
		var r, i, o, a, s, u, l, c, f, p = this,
			d = e.style,
			h = {},
			g = [],
			m = e.nodeType && T(e);
		n.queue || (c = ut._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, f = c.empty.fire, c.empty.fire = function () {
			c.unqueued || f()
		}), c.unqueued++, p.always(function () {
			p.always(function () {
				c.unqueued--, ut.queue(e, "fx").length || c.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === ut.css(e, "display") && "none" === ut.css(e, "float") && (ut.support.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", ut.support.shrinkWrapBlocks || p.always(function () {
			d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
		}));
		for (i in t)
			if (a = t[i], tr.exec(a)) {
				if (delete t[i], u = u || "toggle" === a, a === (m ? "hide" : "show")) continue;
				g.push(i)
			}
		if (o = g.length) {
			s = ut._data(e, "fxshow") || ut._data(e, "fxshow", {}), "hidden" in s && (m = s.hidden), u && (s.hidden = !m), m ? ut(e).show() : p.done(function () {
				ut(e).hide()
			}), p.done(function () {
				var t;
				ut._removeData(e, "fxshow");
				for (t in h) ut.style(e, t, h[t])
			});
			for (i = 0; o > i; i++) r = g[i], l = p.createTween(r, m ? s[r] : 0), h[r] = s[r] || ut.style(e, r), r in s || (s[r] = l.start, m && (l.end = l.start, l.start = "width" === r || "height" === r ? 1 : 0))
		}
	}

	function $(e, t, n, r, i) {
		return new $.prototype.init(e, t, n, r, i)
	}

	function I(e, t) {
		var n, r = {
				height: e
			},
			i = 0;
		for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Cn[i], r["margin" + n] = r["padding" + n] = e;
		return t && (r.opacity = r.width = e), r
	}

	function z(e) {
		return ut.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
	}
	var X, U, V = typeof t,
		Y = e.document,
		J = e.location,
		G = e.jQuery,
		Q = e.$,
		K = {},
		Z = [],
		et = "1.9.1",
		tt = Z.concat,
		nt = Z.push,
		rt = Z.slice,
		it = Z.indexOf,
		ot = K.toString,
		at = K.hasOwnProperty,
		st = et.trim,
		ut = function (e, t) {
			return new ut.fn.init(e, t, U)
		},
		lt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		ct = /\S+/g,
		ft = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		pt = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		dt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		ht = /^[\],:{}\s]*$/,
		gt = /(?:^|:|,)(?:\s*\[)+/g,
		mt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		yt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		vt = /^-ms-/,
		bt = /-([\da-z])/gi,
		xt = function (e, t) {
			return t.toUpperCase()
		},
		wt = function (e) {
			(Y.addEventListener || "load" === e.type || "complete" === Y.readyState) && (Tt(), ut.ready())
		},
		Tt = function () {
			Y.addEventListener ? (Y.removeEventListener("DOMContentLoaded", wt, !1), e.removeEventListener("load", wt, !1)) : (Y.detachEvent("onreadystatechange", wt), e.detachEvent("onload", wt))
		};
	ut.fn = ut.prototype = {
		jquery: et,
		constructor: ut,
		init: function (e, n, r) {
			var i, o;
			if (!e) return this;
			if ("string" == typeof e) {
				if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : pt.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
				if (i[1]) {
					if (n = n instanceof ut ? n[0] : n, ut.merge(this, ut.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : Y, !0)), dt.test(i[1]) && ut.isPlainObject(n))
						for (i in n) ut.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
					return this
				}
				if (o = Y.getElementById(i[2]), o && o.parentNode) {
					if (o.id !== i[2]) return r.find(e);
					this.length = 1, this[0] = o
				}
				return this.context = Y, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ut.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ut.makeArray(e, this))
		},
		selector: "",
		length: 0,
		size: function () {
			return this.length
		},
		toArray: function () {
			return rt.call(this)
		},
		get: function (e) {
			return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
		},
		pushStack: function (e) {
			var t = ut.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function (e, t) {
			return ut.each(this, e, t)
		},
		ready: function (e) {
			return ut.ready.promise().done(e), this
		},
		slice: function () {
			return this.pushStack(rt.apply(this, arguments))
		},
		first: function () {
			return this.eq(0)
		},
		last: function () {
			return this.eq(-1)
		},
		eq: function (e) {
			var t = this.length,
				n = +e + (0 > e ? t : 0);
			return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
		},
		map: function (e) {
			return this.pushStack(ut.map(this, function (t, n) {
				return e.call(t, n, t)
			}))
		},
		end: function () {
			return this.prevObject || this.constructor(null)
		},
		push: nt,
		sort: [].sort,
		splice: [].splice
	}, ut.fn.init.prototype = ut.fn, ut.extend = ut.fn.extend = function () {
		var e, n, r, i, o, a, s = arguments[0] || {},
			u = 1,
			l = arguments.length,
			c = !1;
		for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || ut.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++)
			if (null != (o = arguments[u]))
				for (i in o) e = s[i], r = o[i], s !== r && (c && r && (ut.isPlainObject(r) || (n = ut.isArray(r))) ? (n ? (n = !1, a = e && ut.isArray(e) ? e : []) : a = e && ut.isPlainObject(e) ? e : {}, s[i] = ut.extend(c, a, r)) : r !== t && (s[i] = r));
		return s
	}, ut.extend({
		noConflict: function (t) {
			return e.$ === ut && (e.$ = Q), t && e.jQuery === ut && (e.jQuery = G), ut
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function (e) {
			e ? ut.readyWait++ : ut.ready(!0)
		},
		ready: function (e) {
			if (e === !0 ? !--ut.readyWait : !ut.isReady) {
				if (!Y.body) return setTimeout(ut.ready);
				ut.isReady = !0, e !== !0 && --ut.readyWait > 0 || (X.resolveWith(Y, [ut]), ut.fn.trigger && ut(Y).trigger("ready").off("ready"))
			}
		},
		isFunction: function (e) {
			return "function" === ut.type(e)
		},
		isArray: Array.isArray || function (e) {
			return "array" === ut.type(e)
		},
		isWindow: function (e) {
			return null != e && e == e.window
		},
		isNumeric: function (e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type: function (e) {
			return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? K[ot.call(e)] || "object" : typeof e
		},
		isPlainObject: function (e) {
			if (!e || "object" !== ut.type(e) || e.nodeType || ut.isWindow(e)) return !1;
			try {
				if (e.constructor && !at.call(e, "constructor") && !at.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (n) {
				return !1
			}
			var r;
			for (r in e);
			return r === t || at.call(e, r)
		},
		isEmptyObject: function (e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		error: function (e) {
			throw new Error(e)
		},
		parseHTML: function (e, t, n) {
			if (!e || "string" != typeof e) return null;
			"boolean" == typeof t && (n = t, t = !1), t = t || Y;
			var r = dt.exec(e),
				i = !n && [];
			return r ? [t.createElement(r[1])] : (r = ut.buildFragment([e], t, i), i && ut(i).remove(), ut.merge([], r.childNodes))
		},
		parseJSON: function (t) {
			return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ut.trim(t), t && ht.test(t.replace(mt, "@").replace(yt, "]").replace(gt, ""))) ? new Function("return " + t)() : void ut.error("Invalid JSON: " + t)
		},
		parseXML: function (n) {
			var r, i;
			if (!n || "string" != typeof n) return null;
			try {
				e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
			} catch (o) {
				r = t
			}
			return r && r.documentElement && !r.getElementsByTagName("parsererror").length || ut.error("Invalid XML: " + n), r
		},
		noop: function () {},
		globalEval: function (t) {
			t && ut.trim(t) && (e.execScript || function (t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function (e) {
			return e.replace(vt, "ms-").replace(bt, xt)
		},
		nodeName: function (e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function (e, t, r) {
			var i, o = 0,
				a = e.length,
				s = n(e);
			if (r) {
				if (s)
					for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
				else
					for (o in e)
						if (i = t.apply(e[o], r), i === !1) break
			} else if (s)
				for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
			else
				for (o in e)
					if (i = t.call(e[o], o, e[o]), i === !1) break; return e
		},
		trim: st && !st.call("﻿ ") ? function (e) {
			return null == e ? "" : st.call(e)
		} : function (e) {
			return null == e ? "" : (e + "").replace(ft, "")
		},
		makeArray: function (e, t) {
			var r = t || [];
			return null != e && (n(Object(e)) ? ut.merge(r, "string" == typeof e ? [e] : e) : nt.call(r, e)), r
		},
		inArray: function (e, t, n) {
			var r;
			if (t) {
				if (it) return it.call(t, e, n);
				for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
					if (n in t && t[n] === e) return n
			}
			return -1
		},
		merge: function (e, n) {
			var r = n.length,
				i = e.length,
				o = 0;
			if ("number" == typeof r)
				for (; r > o; o++) e[i++] = n[o];
			else
				for (; n[o] !== t;) e[i++] = n[o++];
			return e.length = i, e
		},
		grep: function (e, t, n) {
			var r, i = [],
				o = 0,
				a = e.length;
			for (n = !!n; a > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]);
			return i
		},
		map: function (e, t, r) {
			var i, o = 0,
				a = e.length,
				s = n(e),
				u = [];
			if (s)
				for (; a > o; o++) i = t(e[o], o, r), null != i && (u[u.length] = i);
			else
				for (o in e) i = t(e[o], o, r), null != i && (u[u.length] = i);
			return tt.apply([], u)
		},
		guid: 1,
		proxy: function (e, n) {
			var r, i, o;
			return "string" == typeof n && (o = e[n], n = e, e = o), ut.isFunction(e) ? (r = rt.call(arguments, 2), i = function () {
				return e.apply(n || this, r.concat(rt.call(arguments)))
			}, i.guid = e.guid = e.guid || ut.guid++, i) : t
		},
		access: function (e, n, r, i, o, a, s) {
			var u = 0,
				l = e.length,
				c = null == r;
			if ("object" === ut.type(r)) {
				o = !0;
				for (u in r) ut.access(e, n, u, r[u], !0, a, s)
			} else if (i !== t && (o = !0, ut.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) {
				return c.call(ut(e), n)
			})), n))
				for (; l > u; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
			return o ? e : c ? n.call(e) : l ? n(e[0], r) : a
		},
		now: function () {
			return (new Date).getTime()
		}
	}), ut.ready.promise = function (t) {
		if (!X)
			if (X = ut.Deferred(), "complete" === Y.readyState) setTimeout(ut.ready);
			else if (Y.addEventListener) Y.addEventListener("DOMContentLoaded", wt, !1), e.addEventListener("load", wt, !1);
		else {
			Y.attachEvent("onreadystatechange", wt), e.attachEvent("onload", wt);
			var n = !1;
			try {
				n = null == e.frameElement && Y.documentElement
			} catch (r) {}
			n && n.doScroll && ! function i() {
				if (!ut.isReady) {
					try {
						n.doScroll("left")
					} catch (e) {
						return setTimeout(i, 50)
					}
					Tt(), ut.ready()
				}
			}()
		}
		return X.promise(t)
	}, ut.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
		K["[object " + t + "]"] = t.toLowerCase()
	}), U = ut(Y);
	var Nt = {};
	ut.Callbacks = function (e) {
		e = "string" == typeof e ? Nt[e] || r(e) : ut.extend({}, e);
		var n, i, o, a, s, u, l = [],
			c = !e.once && [],
			f = function (t) {
				for (i = e.memory && t, o = !0, s = u || 0, u = 0, a = l.length, n = !0; l && a > s; s++)
					if (l[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
						i = !1;
						break
					}
				n = !1, l && (c ? c.length && f(c.shift()) : i ? l = [] : p.disable())
			},
			p = {
				add: function () {
					if (l) {
						var t = l.length;
						! function r(t) {
							ut.each(t, function (t, n) {
								var i = ut.type(n);
								"function" === i ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
							})
						}(arguments), n ? a = l.length : i && (u = t, f(i))
					}
					return this
				},
				remove: function () {
					return l && ut.each(arguments, function (e, t) {
						for (var r;
							(r = ut.inArray(t, l, r)) > -1;) l.splice(r, 1), n && (a >= r && a--, s >= r && s--)
					}), this
				},
				has: function (e) {
					return e ? ut.inArray(e, l) > -1 : !(!l || !l.length)
				},
				empty: function () {
					return l = [], this
				},
				disable: function () {
					return l = c = i = t, this
				},
				disabled: function () {
					return !l
				},
				lock: function () {
					return c = t, i || p.disable(), this
				},
				locked: function () {
					return !c
				},
				fireWith: function (e, t) {
					return t = t || [], t = [e, t.slice ? t.slice() : t], !l || o && !c || (n ? c.push(t) : f(t)), this
				},
				fire: function () {
					return p.fireWith(this, arguments), this
				},
				fired: function () {
					return !!o
				}
			};
		return p
	}, ut.extend({
		Deferred: function (e) {
			var t = [
					["resolve", "done", ut.Callbacks("once memory"), "resolved"],
					["reject", "fail", ut.Callbacks("once memory"), "rejected"],
					["notify", "progress", ut.Callbacks("memory")]
				],
				n = "pending",
				r = {
					state: function () {
						return n
					},
					always: function () {
						return i.done(arguments).fail(arguments), this
					},
					then: function () {
						var e = arguments;
						return ut.Deferred(function (n) {
							ut.each(t, function (t, o) {
								var a = o[0],
									s = ut.isFunction(e[t]) && e[t];
								i[o[1]](function () {
									var e = s && s.apply(this, arguments);
									e && ut.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					promise: function (e) {
						return null != e ? ut.extend(e, r) : r
					}
				},
				i = {};
			return r.pipe = r.then, ut.each(t, function (e, o) {
				var a = o[2],
					s = o[3];
				r[o[1]] = a.add, s && a.add(function () {
					n = s
				}, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
					return i[o[0] + "With"](this === i ? r : this, arguments), this
				}, i[o[0] + "With"] = a.fireWith
			}), r.promise(i), e && e.call(i, i), i
		},
		when: function (e) {
			var t, n, r, i = 0,
				o = rt.call(arguments),
				a = o.length,
				s = 1 !== a || e && ut.isFunction(e.promise) ? a : 0,
				u = 1 === s ? e : ut.Deferred(),
				l = function (e, n, r) {
					return function (i) {
						n[e] = this, r[e] = arguments.length > 1 ? rt.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
					}
				};
			if (a > 1)
				for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && ut.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
			return s || u.resolveWith(r, o), u.promise()
		}
	}), ut.support = function () {
		var t, n, r, i, o, a, s, u, l, c, f = Y.createElement("div");
		if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*"), r = f.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
		o = Y.createElement("select"), s = o.appendChild(Y.createElement("option")), i = f.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
			getSetAttribute: "t" !== f.className,
			leadingWhitespace: 3 === f.firstChild.nodeType,
			tbody: !f.getElementsByTagName("tbody").length,
			htmlSerialize: !!f.getElementsByTagName("link").length,
			style: /top/.test(r.getAttribute("style")),
			hrefNormalized: "/a" === r.getAttribute("href"),
			opacity: /^0.5/.test(r.style.opacity),
			cssFloat: !!r.style.cssFloat,
			checkOn: !!i.value,
			optSelected: s.selected,
			enctype: !!Y.createElement("form").enctype,
			html5Clone: "<:nav></:nav>" !== Y.createElement("nav").cloneNode(!0).outerHTML,
			boxModel: "CSS1Compat" === Y.compatMode,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			boxSizingReliable: !0,
			pixelPosition: !1
		}, i.checked = !0, t.noCloneChecked = i.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
		try {
			delete f.test
		} catch (p) {
			t.deleteExpando = !1
		}
		i = Y.createElement("input"), i.setAttribute("value", ""), t.input = "" === i.getAttribute("value"), i.value = "t", i.setAttribute("type", "radio"), t.radioValue = "t" === i.value, i.setAttribute("checked", "t"), i.setAttribute("name", "t"), a = Y.createDocumentFragment(), a.appendChild(i), t.appendChecked = i.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, f.attachEvent && (f.attachEvent("onclick", function () {
			t.noCloneEvent = !1
		}), f.cloneNode(!0).click());
		for (c in {
			submit: !0,
			change: !0,
			focusin: !0
		}) f.setAttribute(u = "on" + c, "t"), t[c + "Bubbles"] = u in e || f.attributes[u].expando === !1;
		return f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === f.style.backgroundClip, ut(function () {
			var n, r, i, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				a = Y.getElementsByTagName("body")[0];
			a && (n = Y.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = f.getElementsByTagName("td"), i[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", t.reliableHiddenOffsets = l && 0 === i[0].offsetHeight, f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === f.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== a.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || {
				width: "4px"
			}).width, r = f.appendChild(Y.createElement("div")), r.style.cssText = f.style.cssText = o, r.style.marginRight = r.style.width = "0", f.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof f.style.zoom !== V && (f.innerHTML = "", f.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== f.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = f = i = r = null)
		}), n = o = a = s = r = i = null, t
	}();
	var Ct = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		kt = /([A-Z])/g;
	ut.extend({
		cache: {},
		expando: "jQuery" + (et + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function (e) {
			return e = e.nodeType ? ut.cache[e[ut.expando]] : e[ut.expando], !!e && !s(e)
		},
		data: function (e, t, n) {
			return i(e, t, n)
		},
		removeData: function (e, t) {
			return o(e, t)
		},
		_data: function (e, t, n) {
			return i(e, t, n, !0)
		},
		_removeData: function (e, t) {
			return o(e, t, !0)
		},
		acceptData: function (e) {
			if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
			var t = e.nodeName && ut.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t
		}
	}), ut.fn.extend({
		data: function (e, n) {
			var r, i, o = this[0],
				s = 0,
				u = null;
			if (e === t) {
				if (this.length && (u = ut.data(o), 1 === o.nodeType && !ut._data(o, "parsedAttrs"))) {
					for (r = o.attributes; s < r.length; s++) i = r[s].name, i.indexOf("data-") || (i = ut.camelCase(i.slice(5)), a(o, i, u[i]));
					ut._data(o, "parsedAttrs", !0)
				}
				return u
			}
			return "object" == typeof e ? this.each(function () {
				ut.data(this, e)
			}) : ut.access(this, function (n) {
				return n === t ? o ? a(o, e, ut.data(o, e)) : null : void this.each(function () {
					ut.data(this, e, n)
				})
			}, null, n, arguments.length > 1, null, !0)
		},
		removeData: function (e) {
			return this.each(function () {
				ut.removeData(this, e)
			})
		}
	}), ut.extend({
		queue: function (e, t, n) {
			var r;
			return e ? (t = (t || "fx") + "queue", r = ut._data(e, t), n && (!r || ut.isArray(n) ? r = ut._data(e, t, ut.makeArray(n)) : r.push(n)), r || []) : void 0
		},
		dequeue: function (e, t) {
			t = t || "fx";
			var n = ut.queue(e, t),
				r = n.length,
				i = n.shift(),
				o = ut._queueHooks(e, t),
				a = function () {
					ut.dequeue(e, t)
				};
			"inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
		},
		_queueHooks: function (e, t) {
			var n = t + "queueHooks";
			return ut._data(e, n) || ut._data(e, n, {
				empty: ut.Callbacks("once memory").add(function () {
					ut._removeData(e, t + "queue"), ut._removeData(e, n)
				})
			})
		}
	}), ut.fn.extend({
		queue: function (e, n) {
			var r = 2;
			return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? ut.queue(this[0], e) : n === t ? this : this.each(function () {
				var t = ut.queue(this, e, n);
				ut._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ut.dequeue(this, e)
			})
		},
		dequeue: function (e) {
			return this.each(function () {
				ut.dequeue(this, e)
			})
		},
		delay: function (e, t) {
			return e = ut.fx ? ut.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
				var r = setTimeout(t, e);
				n.stop = function () {
					clearTimeout(r)
				}
			})
		},
		clearQueue: function (e) {
			return this.queue(e || "fx", [])
		},
		promise: function (e, n) {
			var r, i = 1,
				o = ut.Deferred(),
				a = this,
				s = this.length,
				u = function () {
					--i || o.resolveWith(a, [a])
				};
			for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) r = ut._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u));
			return u(), o.promise(n)
		}
	});
	var Et, St, At = /[\t\r\n]/g,
		jt = /\r/g,
		Dt = /^(?:input|select|textarea|button|object)$/i,
		Lt = /^(?:a|area)$/i,
		Ht = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
		qt = /^(?:checked|selected)$/i,
		Mt = ut.support.getSetAttribute,
		_t = ut.support.input;
	ut.fn.extend({
		attr: function (e, t) {
			return ut.access(this, ut.attr, e, t, arguments.length > 1)
		},
		removeAttr: function (e) {
			return this.each(function () {
				ut.removeAttr(this, e)
			})
		},
		prop: function (e, t) {
			return ut.access(this, ut.prop, e, t, arguments.length > 1)
		},
		removeProp: function (e) {
			return e = ut.propFix[e] || e, this.each(function () {
				try {
					this[e] = t, delete this[e]
				} catch (n) {}
			})
		},
		addClass: function (e) {
			var t, n, r, i, o, a = 0,
				s = this.length,
				u = "string" == typeof e && e;
			if (ut.isFunction(e)) return this.each(function (t) {
				ut(this).addClass(e.call(this, t, this.className))
			});
			if (u)
				for (t = (e || "").match(ct) || []; s > a; a++)
					if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : " ")) {
						for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
						n.className = ut.trim(r)
					}
			return this
		},
		removeClass: function (e) {
			var t, n, r, i, o, a = 0,
				s = this.length,
				u = 0 === arguments.length || "string" == typeof e && e;
			if (ut.isFunction(e)) return this.each(function (t) {
				ut(this).removeClass(e.call(this, t, this.className))
			});
			if (u)
				for (t = (e || "").match(ct) || []; s > a; a++)
					if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : "")) {
						for (o = 0; i = t[o++];)
							for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
						n.className = e ? ut.trim(r) : ""
					}
			return this
		},
		toggleClass: function (e, t) {
			var n = typeof e,
				r = "boolean" == typeof t;
			return this.each(ut.isFunction(e) ? function (n) {
				ut(this).toggleClass(e.call(this, n, this.className, t), t)
			} : function () {
				if ("string" === n)
					for (var i, o = 0, a = ut(this), s = t, u = e.match(ct) || []; i = u[o++];) s = r ? s : !a.hasClass(i), a[s ? "addClass" : "removeClass"](i);
				else(n === V || "boolean" === n) && (this.className && ut._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ut._data(this, "__className__") || "")
			})
		},
		hasClass: function (e) {
			for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
				if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(At, " ").indexOf(t) >= 0) return !0;
			return !1
		},
		val: function (e) {
			var n, r, i, o = this[0]; {
				if (arguments.length) return i = ut.isFunction(e), this.each(function (n) {
					var o, a = ut(this);
					1 === this.nodeType && (o = i ? e.call(this, n, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ut.isArray(o) && (o = ut.map(o, function (e) {
						return null == e ? "" : e + ""
					})), r = ut.valHooks[this.type] || ut.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o))
				});
				if (o) return r = ut.valHooks[o.type] || ut.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(jt, "") : null == n ? "" : n)
			}
		}
	}), ut.extend({
		valHooks: {
			option: {
				get: function (e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text
				}
			},
			select: {
				get: function (e) {
					for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++)
						if (n = r[u], !(!n.selected && u !== i || (ut.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ut.nodeName(n.parentNode, "optgroup"))) {
							if (t = ut(n).val(), o) return t;
							a.push(t)
						}
					return a
				},
				set: function (e, t) {
					var n = ut.makeArray(t);
					return ut(e).find("option").each(function () {
						this.selected = ut.inArray(ut(this).val(), n) >= 0
					}), n.length || (e.selectedIndex = -1), n
				}
			}
		},
		attr: function (e, n, r) {
			var i, o, a, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === V ? ut.prop(e, n, r) : (o = 1 !== s || !ut.isXMLDoc(e), o && (n = n.toLowerCase(), i = ut.attrHooks[n] || (Ht.test(n) ? St : Et)), r === t ? i && o && "get" in i && null !== (a = i.get(e, n)) ? a : (typeof e.getAttribute !== V && (a = e.getAttribute(n)), null == a ? t : a) : null !== r ? i && o && "set" in i && (a = i.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""), r) : void ut.removeAttr(e, n))
		},
		removeAttr: function (e, t) {
			var n, r, i = 0,
				o = t && t.match(ct);
			if (o && 1 === e.nodeType)
				for (; n = o[i++];) r = ut.propFix[n] || n, Ht.test(n) ? !Mt && qt.test(n) ? e[ut.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : ut.attr(e, n, ""), e.removeAttribute(Mt ? n : r)
		},
		attrHooks: {
			type: {
				set: function (e, t) {
					if (!ut.support.radioValue && "radio" === t && ut.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function (e, n, r) {
			var i, o, a, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !ut.isXMLDoc(e), a && (n = ut.propFix[n] || n, o = ut.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
		},
		propHooks: {
			tabIndex: {
				get: function (e) {
					var n = e.getAttributeNode("tabindex");
					return n && n.specified ? parseInt(n.value, 10) : Dt.test(e.nodeName) || Lt.test(e.nodeName) && e.href ? 0 : t
				}
			}
		}
	}), St = {
		get: function (e, n) {
			var r = ut.prop(e, n),
				i = "boolean" == typeof r && e.getAttribute(n),
				o = "boolean" == typeof r ? _t && Mt ? null != i : qt.test(n) ? e[ut.camelCase("default-" + n)] : !!i : e.getAttributeNode(n);
			return o && o.value !== !1 ? n.toLowerCase() : t
		},
		set: function (e, t, n) {
			return t === !1 ? ut.removeAttr(e, n) : _t && Mt || !qt.test(n) ? e.setAttribute(!Mt && ut.propFix[n] || n, n) : e[ut.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, _t && Mt || (ut.attrHooks.value = {
		get: function (e, n) {
			var r = e.getAttributeNode(n);
			return ut.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t
		},
		set: function (e, t, n) {
			return ut.nodeName(e, "input") ? void(e.defaultValue = t) : Et && Et.set(e, t, n)
		}
	}), Mt || (Et = ut.valHooks.button = {
		get: function (e, n) {
			var r = e.getAttributeNode(n);
			return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t
		},
		set: function (e, n, r) {
			var i = e.getAttributeNode(r);
			return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
		}
	}, ut.attrHooks.contenteditable = {
		get: Et.get,
		set: function (e, t, n) {
			Et.set(e, "" === t ? !1 : t, n)
		}
	}, ut.each(["width", "height"], function (e, t) {
		ut.attrHooks[t] = ut.extend(ut.attrHooks[t], {
			set: function (e, n) {
				return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
			}
		})
	})), ut.support.hrefNormalized || (ut.each(["href", "src", "width", "height"], function (e, n) {
		ut.attrHooks[n] = ut.extend(ut.attrHooks[n], {
			get: function (e) {
				var r = e.getAttribute(n, 2);
				return null == r ? t : r
			}
		})
	}), ut.each(["href", "src"], function (e, t) {
		ut.propHooks[t] = {
			get: function (e) {
				return e.getAttribute(t, 4)
			}
		}
	})), ut.support.style || (ut.attrHooks.style = {
		get: function (e) {
			return e.style.cssText || t
		},
		set: function (e, t) {
			return e.style.cssText = t + ""
		}
	}), ut.support.optSelected || (ut.propHooks.selected = ut.extend(ut.propHooks.selected, {
		get: function (e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	})), ut.support.enctype || (ut.propFix.enctype = "encoding"), ut.support.checkOn || ut.each(["radio", "checkbox"], function () {
		ut.valHooks[this] = {
			get: function (e) {
				return null === e.getAttribute("value") ? "on" : e.value
			}
		}
	}), ut.each(["radio", "checkbox"], function () {
		ut.valHooks[this] = ut.extend(ut.valHooks[this], {
			set: function (e, t) {
				return ut.isArray(t) ? e.checked = ut.inArray(ut(e).val(), t) >= 0 : void 0
			}
		})
	});
	var Ft = /^(?:input|select|textarea)$/i,
		Ot = /^key/,
		Bt = /^(?:mouse|contextmenu)|click/,
		Pt = /^(?:focusinfocus|focusoutblur)$/,
		Rt = /^([^.]*)(?:\.(.+)|)$/;
	ut.event = {
			global: {},
			add: function (e, n, r, i, o) {
				var a, s, u, l, c, f, p, d, h, g, m, y = ut._data(e);
				if (y) {
					for (r.handler && (l = r, r = l.handler, o = l.selector), r.guid || (r.guid = ut.guid++), (s = y.events) || (s = y.events = {}), (f = y.handle) || (f = y.handle = function (e) {
						return typeof ut === V || e && ut.event.triggered === e.type ? t : ut.event.dispatch.apply(f.elem, arguments)
					}, f.elem = e), n = (n || "").match(ct) || [""], u = n.length; u--;) a = Rt.exec(n[u]) || [], h = m = a[1], g = (a[2] || "").split(".").sort(), c = ut.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = ut.event.special[h] || {}, p = ut.extend({
						type: h,
						origType: m,
						data: i,
						handler: r,
						guid: r.guid,
						selector: o,
						needsContext: o && ut.expr.match.needsContext.test(o),
						namespace: g.join(".")
					}, l), (d = s[h]) || (d = s[h] = [], d.delegateCount = 0, c.setup && c.setup.call(e, i, g, f) !== !1 || (e.addEventListener ? e.addEventListener(h, f, !1) : e.attachEvent && e.attachEvent("on" + h, f))), c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), o ? d.splice(d.delegateCount++, 0, p) : d.push(p), ut.event.global[h] = !0;
					e = null
				}
			},
			remove: function (e, t, n, r, i) {
				var o, a, s, u, l, c, f, p, d, h, g, m = ut.hasData(e) && ut._data(e);
				if (m && (c = m.events)) {
					for (t = (t || "").match(ct) || [""], l = t.length; l--;)
						if (s = Rt.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
							for (f = ut.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = c[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length; o--;) a = p[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, f.remove && f.remove.call(e, a));
							u && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || ut.removeEvent(e, d, m.handle), delete c[d])
						} else
							for (d in c) ut.event.remove(e, d + t[l], n, r, !0);
					ut.isEmptyObject(c) && (delete m.handle, ut._removeData(e, "events"))
				}
			},
			trigger: function (n, r, i, o) {
				var a, s, u, l, c, f, p, d = [i || Y],
					h = at.call(n, "type") ? n.type : n,
					g = at.call(n, "namespace") ? n.namespace.split(".") : [];
				if (u = f = i = i || Y, 3 !== i.nodeType && 8 !== i.nodeType && !Pt.test(h + ut.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), h = g.shift(), g.sort()), s = h.indexOf(":") < 0 && "on" + h, n = n[ut.expando] ? n : new ut.Event(h, "object" == typeof n && n), n.isTrigger = !0, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : ut.makeArray(r, [n]), c = ut.event.special[h] || {}, o || !c.trigger || c.trigger.apply(i, r) !== !1)) {
					if (!o && !c.noBubble && !ut.isWindow(i)) {
						for (l = c.delegateType || h, Pt.test(l + h) || (u = u.parentNode); u; u = u.parentNode) d.push(u), f = u;
						f === (i.ownerDocument || Y) && d.push(f.defaultView || f.parentWindow || e)
					}
					for (p = 0;
						(u = d[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? l : c.bindType || h, a = (ut._data(u, "events") || {})[n.type] && ut._data(u, "handle"), a && a.apply(u, r), a = s && u[s], a && ut.acceptData(u) && a.apply && a.apply(u, r) === !1 && n.preventDefault();
					if (n.type = h, !(o || n.isDefaultPrevented() || c._default && c._default.apply(i.ownerDocument, r) !== !1 || "click" === h && ut.nodeName(i, "a") || !ut.acceptData(i) || !s || !i[h] || ut.isWindow(i))) {
						f = i[s], f && (i[s] = null), ut.event.triggered = h;
						try {
							i[h]()
						} catch (m) {}
						ut.event.triggered = t, f && (i[s] = f)
					}
					return n.result
				}
			},
			dispatch: function (e) {
				e = ut.event.fix(e);
				var n, r, i, o, a, s = [],
					u = rt.call(arguments),
					l = (ut._data(this, "events") || {})[e.type] || [],
					c = ut.event.special[e.type] || {};
				if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
					for (s = ut.event.handlers.call(this, e, l), n = 0;
						(o = s[n++]) && !e.isPropagationStopped();)
						for (e.currentTarget = o.elem, a = 0;
							(i = o.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((ut.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
					return c.postDispatch && c.postDispatch.call(this, e), e.result
				}
			},
			handlers: function (e, n) {
				var r, i, o, a, s = [],
					u = n.delegateCount,
					l = e.target;
				if (u && l.nodeType && (!e.button || "click" !== e.type))
					for (; l != this; l = l.parentNode || this)
						if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
							for (o = [], a = 0; u > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? ut(r, this).index(l) >= 0 : ut.find(r, this, null, [l]).length), o[r] && o.push(i);
							o.length && s.push({
								elem: l,
								handlers: o
							})
						}
				return u < n.length && s.push({
					elem: this,
					handlers: n.slice(u)
				}), s
			},
			fix: function (e) {
				if (e[ut.expando]) return e;
				var t, n, r, i = e.type,
					o = e,
					a = this.fixHooks[i];
				for (a || (this.fixHooks[i] = a = Bt.test(i) ? this.mouseHooks : Ot.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ut.Event(o), t = r.length; t--;) n = r[t], e[n] = o[n];
				return e.target || (e.target = o.srcElement || Y), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
			},
			props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function (e, t) {
					return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function (e, n) {
					var r, i, o, a = n.button,
						s = n.fromElement;
					return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || Y, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
				}
			},
			special: {
				load: {
					noBubble: !0
				},
				click: {
					trigger: function () {
						return ut.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
					}
				},
				focus: {
					trigger: function () {
						if (this !== Y.activeElement && this.focus) try {
							return this.focus(), !1
						} catch (e) {}
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function () {
						return this === Y.activeElement && this.blur ? (this.blur(), !1) : void 0
					},
					delegateType: "focusout"
				},
				beforeunload: {
					postDispatch: function (e) {
						e.result !== t && (e.originalEvent.returnValue = e.result)
					}
				}
			},
			simulate: function (e, t, n, r) {
				var i = ut.extend(new ut.Event, n, {
					type: e,
					isSimulated: !0,
					originalEvent: {}
				});
				r ? ut.event.trigger(i, null, t) : ut.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
			}
		}, ut.removeEvent = Y.removeEventListener ? function (e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n, !1)
		} : function (e, t, n) {
			var r = "on" + t;
			e.detachEvent && (typeof e[r] === V && (e[r] = null), e.detachEvent(r, n))
		}, ut.Event = function (e, t) {
			return this instanceof ut.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? u : l) : this.type = e, t && ut.extend(this, t), this.timeStamp = e && e.timeStamp || ut.now(), void(this[ut.expando] = !0)) : new ut.Event(e, t)
		}, ut.Event.prototype = {
			isDefaultPrevented: l,
			isPropagationStopped: l,
			isImmediatePropagationStopped: l,
			preventDefault: function () {
				var e = this.originalEvent;
				this.isDefaultPrevented = u, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
			},
			stopPropagation: function () {
				var e = this.originalEvent;
				this.isPropagationStopped = u, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
			},
			stopImmediatePropagation: function () {
				this.isImmediatePropagationStopped = u, this.stopPropagation()
			}
		}, ut.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		}, function (e, t) {
			ut.event.special[e] = {
				delegateType: t,
				bindType: t,
				handle: function (e) {
					var n, r = this,
						i = e.relatedTarget,
						o = e.handleObj;
					return (!i || i !== r && !ut.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
				}
			}
		}), ut.support.submitBubbles || (ut.event.special.submit = {
			setup: function () {
				return ut.nodeName(this, "form") ? !1 : void ut.event.add(this, "click._submit keypress._submit", function (e) {
					var n = e.target,
						r = ut.nodeName(n, "input") || ut.nodeName(n, "button") ? n.form : t;
					r && !ut._data(r, "submitBubbles") && (ut.event.add(r, "submit._submit", function (e) {
						e._submit_bubble = !0
					}), ut._data(r, "submitBubbles", !0))
				})
			},
			postDispatch: function (e) {
				e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ut.event.simulate("submit", this.parentNode, e, !0))
			},
			teardown: function () {
				return ut.nodeName(this, "form") ? !1 : void ut.event.remove(this, "._submit")
			}
		}), ut.support.changeBubbles || (ut.event.special.change = {
			setup: function () {
				return Ft.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ut.event.add(this, "propertychange._change", function (e) {
					"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
				}), ut.event.add(this, "click._change", function (e) {
					this._just_changed && !e.isTrigger && (this._just_changed = !1), ut.event.simulate("change", this, e, !0)
				})), !1) : void ut.event.add(this, "beforeactivate._change", function (e) {
					var t = e.target;
					Ft.test(t.nodeName) && !ut._data(t, "changeBubbles") && (ut.event.add(t, "change._change", function (e) {
						!this.parentNode || e.isSimulated || e.isTrigger || ut.event.simulate("change", this.parentNode, e, !0)
					}), ut._data(t, "changeBubbles", !0))
				})
			},
			handle: function (e) {
				var t = e.target;
				return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
			},
			teardown: function () {
				return ut.event.remove(this, "._change"), !Ft.test(this.nodeName)
			}
		}), ut.support.focusinBubbles || ut.each({
			focus: "focusin",
			blur: "focusout"
		}, function (e, t) {
			var n = 0,
				r = function (e) {
					ut.event.simulate(t, e.target, ut.event.fix(e), !0)
				};
			ut.event.special[t] = {
				setup: function () {
					0 === n++ && Y.addEventListener(e, r, !0)
				},
				teardown: function () {
					0 === --n && Y.removeEventListener(e, r, !0)
				}
			}
		}), ut.fn.extend({
			on: function (e, n, r, i, o) {
				var a, s;
				if ("object" == typeof e) {
					"string" != typeof n && (r = r || n, n = t);
					for (a in e) this.on(a, n, r, e[a], o);
					return this
				}
				if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = l;
				else if (!i) return this;
				return 1 === o && (s = i, i = function (e) {
					return ut().off(e), s.apply(this, arguments)
				}, i.guid = s.guid || (s.guid = ut.guid++)), this.each(function () {
					ut.event.add(this, e, i, r, n)
				})
			},
			one: function (e, t, n, r) {
				return this.on(e, t, n, r, 1)
			},
			off: function (e, n, r) {
				var i, o;
				if (e && e.preventDefault && e.handleObj) return i = e.handleObj, ut(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
				if ("object" == typeof e) {
					for (o in e) this.off(o, n, e[o]);
					return this
				}
				return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = l), this.each(function () {
					ut.event.remove(this, e, r, n)
				})
			},
			bind: function (e, t, n) {
				return this.on(e, null, t, n)
			},
			unbind: function (e, t) {
				return this.off(e, null, t)
			},
			delegate: function (e, t, n, r) {
				return this.on(t, e, n, r)
			},
			undelegate: function (e, t, n) {
				return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
			},
			trigger: function (e, t) {
				return this.each(function () {
					ut.event.trigger(e, t, this)
				})
			},
			triggerHandler: function (e, t) {
				var n = this[0];
				return n ? ut.event.trigger(e, t, n, !0) : void 0
			}
		}),
		function (e, t) {
			function n(e) {
				return ht.test(e + "")
			}

			function r() {
				var e, t = [];
				return e = function (n, r) {
					return t.push(n += " ") > C.cacheLength && delete e[t.shift()], e[n] = r
				}
			}

			function i(e) {
				return e[P] = !0, e
			}

			function o(e) {
				var t = L.createElement("div");
				try {
					return e(t)
				} catch (n) {
					return !1
				} finally {
					t = null
				}
			}

			function a(e, t, n, r) {
				var i, o, a, s, u, l, c, d, h, g;
				if ((t ? t.ownerDocument || t : R) !== L && D(t), t = t || L, n = n || [], !e || "string" != typeof e) return n;
				if (1 !== (s = t.nodeType) && 9 !== s) return [];
				if (!q && !r) {
					if (i = gt.exec(e))
						if (a = i[1]) {
							if (9 === s) {
								if (o = t.getElementById(a), !o || !o.parentNode) return n;
								if (o.id === a) return n.push(o), n
							} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && O(t, o) && o.id === a) return n.push(o), n
						} else {
							if (i[2]) return Q.apply(n, K.call(t.getElementsByTagName(e), 0)), n;
							if ((a = i[3]) && W.getByClassName && t.getElementsByClassName) return Q.apply(n, K.call(t.getElementsByClassName(a), 0)), n
						}
					if (W.qsa && !M.test(e)) {
						if (c = !0, d = P, h = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
							for (l = f(e), (c = t.getAttribute("id")) ? d = c.replace(vt, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;) l[u] = d + p(l[u]);
							h = dt.test(e) && t.parentNode || t, g = l.join(",")
						}
						if (g) try {
							return Q.apply(n, K.call(h.querySelectorAll(g), 0)), n
						} catch (m) {} finally {
							c || t.removeAttribute("id")
						}
					}
				}
				return x(e.replace(at, "$1"), t, n, r)
			}

			function s(e, t) {
				var n = t && e,
					r = n && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
				if (r) return r;
				if (n)
					for (; n = n.nextSibling;)
						if (n === t) return -1;
				return e ? 1 : -1
			}

			function u(e) {
				return function (t) {
					var n = t.nodeName.toLowerCase();
					return "input" === n && t.type === e
				}
			}

			function l(e) {
				return function (t) {
					var n = t.nodeName.toLowerCase();
					return ("input" === n || "button" === n) && t.type === e
				}
			}

			function c(e) {
				return i(function (t) {
					return t = +t, i(function (n, r) {
						for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
					})
				})
			}

			function f(e, t) {
				var n, r, i, o, s, u, l, c = X[e + " "];
				if (c) return t ? 0 : c.slice(0);
				for (s = e, u = [], l = C.preFilter; s;) {
					(!n || (r = st.exec(s))) && (r && (s = s.slice(r[0].length) || s), u.push(i = [])), n = !1, (r = lt.exec(s)) && (n = r.shift(), i.push({
						value: n,
						type: r[0].replace(at, " ")
					}), s = s.slice(n.length));
					for (o in C.filter)!(r = pt[o].exec(s)) || l[o] && !(r = l[o](r)) || (n = r.shift(), i.push({
						value: n,
						type: o,
						matches: r
					}), s = s.slice(n.length));
					if (!n) break
				}
				return t ? s.length : s ? a.error(e) : X(e, u).slice(0)
			}

			function p(e) {
				for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
				return r
			}

			function d(e, t, n) {
				var r = t.dir,
					i = n && "parentNode" === r,
					o = I++;
				return t.first ? function (t, n, o) {
					for (; t = t[r];)
						if (1 === t.nodeType || i) return e(t, n, o)
				} : function (t, n, a) {
					var s, u, l, c = $ + " " + o;
					if (a) {
						for (; t = t[r];)
							if ((1 === t.nodeType || i) && e(t, n, a)) return !0
					} else
						for (; t = t[r];)
							if (1 === t.nodeType || i)
								if (l = t[P] || (t[P] = {}), (u = l[r]) && u[0] === c) {
									if ((s = u[1]) === !0 || s === N) return s === !0
								} else if (u = l[r] = [c], u[1] = e(t, n, a) || N, u[1] === !0) return !0
				}
			}

			function h(e) {
				return e.length > 1 ? function (t, n, r) {
					for (var i = e.length; i--;)
						if (!e[i](t, n, r)) return !1;
					return !0
				} : e[0]
			}

			function g(e, t, n, r, i) {
				for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
				return a
			}

			function m(e, t, n, r, o, a) {
				return r && !r[P] && (r = m(r)), o && !o[P] && (o = m(o, a)), i(function (i, a, s, u) {
					var l, c, f, p = [],
						d = [],
						h = a.length,
						m = i || b(t || "*", s.nodeType ? [s] : s, []),
						y = !e || !i && t ? m : g(m, p, e, s, u),
						v = n ? o || (i ? e : h || r) ? [] : a : y;
					if (n && n(y, v, s, u), r)
						for (l = g(v, d), r(l, [], s, u), c = l.length; c--;)(f = l[c]) && (v[d[c]] = !(y[d[c]] = f));
					if (i) {
						if (o || e) {
							if (o) {
								for (l = [], c = v.length; c--;)(f = v[c]) && l.push(y[c] = f);
								o(null, v = [], l, u)
							}
							for (c = v.length; c--;)(f = v[c]) && (l = o ? Z.call(i, f) : p[c]) > -1 && (i[l] = !(a[l] = f))
						}
					} else v = g(v === a ? v.splice(h, v.length) : v), o ? o(null, a, v, u) : Q.apply(a, v)
				})
			}

			function y(e) {
				for (var t, n, r, i = e.length, o = C.relative[e[0].type], a = o || C.relative[" "], s = o ? 1 : 0, u = d(function (e) {
					return e === t
				}, a, !0), l = d(function (e) {
					return Z.call(t, e) > -1
				}, a, !0), c = [
					function (e, n, r) {
						return !o && (r || n !== j) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
					}
				]; i > s; s++)
					if (n = C.relative[e[s].type]) c = [d(h(c), n)];
					else {
						if (n = C.filter[e[s].type].apply(null, e[s].matches), n[P]) {
							for (r = ++s; i > r && !C.relative[e[r].type]; r++);
							return m(s > 1 && h(c), s > 1 && p(e.slice(0, s - 1)).replace(at, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && p(e))
						}
						c.push(n)
					}
				return h(c)
			}

			function v(e, t) {
				var n = 0,
					r = t.length > 0,
					o = e.length > 0,
					s = function (i, s, u, l, c) {
						var f, p, d, h = [],
							m = 0,
							y = "0",
							v = i && [],
							b = null != c,
							x = j,
							w = i || o && C.find.TAG("*", c && s.parentNode || s),
							T = $ += null == x ? 1 : Math.random() || .1;
						for (b && (j = s !== L && s, N = n); null != (f = w[y]); y++) {
							if (o && f) {
								for (p = 0; d = e[p++];)
									if (d(f, s, u)) {
										l.push(f);
										break
									}
								b && ($ = T, N = ++n)
							}
							r && ((f = !d && f) && m--, i && v.push(f))
						}
						if (m += y, r && y !== m) {
							for (p = 0; d = t[p++];) d(v, h, s, u);
							if (i) {
								if (m > 0)
									for (; y--;) v[y] || h[y] || (h[y] = G.call(l));
								h = g(h)
							}
							Q.apply(l, h), b && !i && h.length > 0 && m + t.length > 1 && a.uniqueSort(l)
						}
						return b && ($ = T, j = x), v
					};
				return r ? i(s) : s
			}

			function b(e, t, n) {
				for (var r = 0, i = t.length; i > r; r++) a(e, t[r], n);
				return n
			}

			function x(e, t, n, r) {
				var i, o, a, s, u, l = f(e);
				if (!r && 1 === l.length) {
					if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && !q && C.relative[o[1].type]) {
						if (t = C.find.ID(a.matches[0].replace(xt, wt), t)[0], !t) return n;
						e = e.slice(o.shift().value.length)
					}
					for (i = pt.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !C.relative[s = a.type]);)
						if ((u = C.find[s]) && (r = u(a.matches[0].replace(xt, wt), dt.test(o[0].type) && t.parentNode || t))) {
							if (o.splice(i, 1), e = r.length && p(o), !e) return Q.apply(n, K.call(r, 0)), n;
							break
						}
				}
				return S(e, l)(r, t, q, n, dt.test(e)), n
			}

			function w() {}
			var T, N, C, k, E, S, A, j, D, L, H, q, M, _, F, O, B, P = "sizzle" + -new Date,
				R = e.document,
				W = {},
				$ = 0,
				I = 0,
				z = r(),
				X = r(),
				U = r(),
				V = typeof t,
				Y = 1 << 31,
				J = [],
				G = J.pop,
				Q = J.push,
				K = J.slice,
				Z = J.indexOf || function (e) {
					for (var t = 0, n = this.length; n > t; t++)
						if (this[t] === e) return t;
					return -1
				},
				et = "[\\x20\\t\\r\\n\\f]",
				tt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
				nt = tt.replace("w", "w#"),
				rt = "([*^$|!~]?=)",
				it = "\\[" + et + "*(" + tt + ")" + et + "*(?:" + rt + et + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + nt + ")|)|)" + et + "*\\]",
				ot = ":(" + tt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + it.replace(3, 8) + ")*)|.*)\\)|)",
				at = new RegExp("^" + et + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et + "+$", "g"),
				st = new RegExp("^" + et + "*," + et + "*"),
				lt = new RegExp("^" + et + "*([\\x20\\t\\r\\n\\f>+~])" + et + "*"),
				ct = new RegExp(ot),
				ft = new RegExp("^" + nt + "$"),
				pt = {
					ID: new RegExp("^#(" + tt + ")"),
					CLASS: new RegExp("^\\.(" + tt + ")"),
					NAME: new RegExp("^\\[name=['\"]?(" + tt + ")['\"]?\\]"),
					TAG: new RegExp("^(" + tt.replace("w", "w*") + ")"),
					ATTR: new RegExp("^" + it),
					PSEUDO: new RegExp("^" + ot),
					CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et + "*(even|odd|(([+-]|)(\\d*)n|)" + et + "*(?:([+-]|)" + et + "*(\\d+)|))" + et + "*\\)|)", "i"),
					needsContext: new RegExp("^" + et + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et + "*((?:-\\d)?\\d*)" + et + "*\\)|)(?=[^-]|$)", "i")
				},
				dt = /[\x20\t\r\n\f]*[+~]/,
				ht = /^[^{]+\{\s*\[native code/,
				gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				mt = /^(?:input|select|textarea|button)$/i,
				yt = /^h\d$/i,
				vt = /'|\\/g,
				bt = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
				xt = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
				wt = function (e, t) {
					var n = "0x" + t - 65536;
					return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
				};
			try {
				K.call(R.documentElement.childNodes, 0)[0].nodeType
			} catch (Tt) {
				K = function (e) {
					for (var t, n = []; t = this[e++];) n.push(t);
					return n
				}
			}
			E = a.isXML = function (e) {
				var t = e && (e.ownerDocument || e).documentElement;
				return t ? "HTML" !== t.nodeName : !1
			}, D = a.setDocument = function (e) {
				var r = e ? e.ownerDocument || e : R;
				return r !== L && 9 === r.nodeType && r.documentElement ? (L = r, H = r.documentElement, q = E(r), W.tagNameNoComments = o(function (e) {
					return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
				}), W.attributes = o(function (e) {
					e.innerHTML = "<select></select>";
					var t = typeof e.lastChild.getAttribute("multiple");
					return "boolean" !== t && "string" !== t
				}), W.getByClassName = o(function (e) {
					return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
				}), W.getByName = o(function (e) {
					e.id = P + 0, e.innerHTML = "<a name='" + P + "'></a><div name='" + P + "'></div>", H.insertBefore(e, H.firstChild);
					var t = r.getElementsByName && r.getElementsByName(P).length === 2 + r.getElementsByName(P + 0).length;
					return W.getIdNotName = !r.getElementById(P), H.removeChild(e), t
				}), C.attrHandle = o(function (e) {
					return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== V && "#" === e.firstChild.getAttribute("href")
				}) ? {} : {
					href: function (e) {
						return e.getAttribute("href", 2)
					},
					type: function (e) {
						return e.getAttribute("type")
					}
				}, W.getIdNotName ? (C.find.ID = function (e, t) {
					if (typeof t.getElementById !== V && !q) {
						var n = t.getElementById(e);
						return n && n.parentNode ? [n] : []
					}
				}, C.filter.ID = function (e) {
					var t = e.replace(xt, wt);
					return function (e) {
						return e.getAttribute("id") === t
					}
				}) : (C.find.ID = function (e, n) {
					if (typeof n.getElementById !== V && !q) {
						var r = n.getElementById(e);
						return r ? r.id === e || typeof r.getAttributeNode !== V && r.getAttributeNode("id").value === e ? [r] : t : []
					}
				}, C.filter.ID = function (e) {
					var t = e.replace(xt, wt);
					return function (e) {
						var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
						return n && n.value === t
					}
				}), C.find.TAG = W.tagNameNoComments ? function (e, t) {
					return typeof t.getElementsByTagName !== V ? t.getElementsByTagName(e) : void 0
				} : function (e, t) {
					var n, r = [],
						i = 0,
						o = t.getElementsByTagName(e);
					if ("*" === e) {
						for (; n = o[i++];) 1 === n.nodeType && r.push(n);
						return r
					}
					return o
				}, C.find.NAME = W.getByName && function (e, t) {
					return typeof t.getElementsByName !== V ? t.getElementsByName(name) : void 0
				}, C.find.CLASS = W.getByClassName && function (e, t) {
					return typeof t.getElementsByClassName === V || q ? void 0 : t.getElementsByClassName(e)
				}, _ = [], M = [":focus"], (W.qsa = n(r.querySelectorAll)) && (o(function (e) {
					e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || M.push("\\[" + et + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || M.push(":checked")
				}), o(function (e) {
					e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && M.push("[*^$]=" + et + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), M.push(",.*:")
				})), (W.matchesSelector = n(F = H.matchesSelector || H.mozMatchesSelector || H.webkitMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && o(function (e) {
					W.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), _.push("!=", ot)
				}), M = new RegExp(M.join("|")), _ = new RegExp(_.join("|")), O = n(H.contains) || H.compareDocumentPosition ? function (e, t) {
					var n = 9 === e.nodeType ? e.documentElement : e,
						r = t && t.parentNode;
					return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
				} : function (e, t) {
					if (t)
						for (; t = t.parentNode;)
							if (t === e) return !0;
					return !1
				}, B = H.compareDocumentPosition ? function (e, t) {
					var n;
					return e === t ? (A = !0, 0) : (n = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & n || e.parentNode && 11 === e.parentNode.nodeType ? e === r || O(R, e) ? -1 : t === r || O(R, t) ? 1 : 0 : 4 & n ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
				} : function (e, t) {
					var n, i = 0,
						o = e.parentNode,
						a = t.parentNode,
						u = [e],
						l = [t];
					if (e === t) return A = !0, 0;
					if (!o || !a) return e === r ? -1 : t === r ? 1 : o ? -1 : a ? 1 : 0;
					if (o === a) return s(e, t);
					for (n = e; n = n.parentNode;) u.unshift(n);
					for (n = t; n = n.parentNode;) l.unshift(n);
					for (; u[i] === l[i];) i++;
					return i ? s(u[i], l[i]) : u[i] === R ? -1 : l[i] === R ? 1 : 0
				}, A = !1, [0, 0].sort(B), W.detectDuplicates = A, L) : L
			}, a.matches = function (e, t) {
				return a(e, null, null, t)
			}, a.matchesSelector = function (e, t) {
				if ((e.ownerDocument || e) !== L && D(e), t = t.replace(bt, "='$1']"), !(!W.matchesSelector || q || _ && _.test(t) || M.test(t))) try {
					var n = F.call(e, t);
					if (n || W.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
				} catch (r) {}
				return a(t, L, null, [e]).length > 0
			}, a.contains = function (e, t) {
				return (e.ownerDocument || e) !== L && D(e), O(e, t)
			}, a.attr = function (e, t) {
				var n;
				return (e.ownerDocument || e) !== L && D(e), q || (t = t.toLowerCase()), (n = C.attrHandle[t]) ? n(e) : q || W.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
			}, a.error = function (e) {
				throw new Error("Syntax error, unrecognized expression: " + e)
			}, a.uniqueSort = function (e) {
				var t, n = [],
					r = 1,
					i = 0;
				if (A = !W.detectDuplicates, e.sort(B), A) {
					for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
					for (; i--;) e.splice(n[i], 1)
				}
				return e
			}, k = a.getText = function (e) {
				var t, n = "",
					r = 0,
					i = e.nodeType;
				if (i) {
					if (1 === i || 9 === i || 11 === i) {
						if ("string" == typeof e.textContent) return e.textContent;
						for (e = e.firstChild; e; e = e.nextSibling) n += k(e)
					} else if (3 === i || 4 === i) return e.nodeValue
				} else
					for (; t = e[r]; r++) n += k(t);
				return n
			}, C = a.selectors = {
				cacheLength: 50,
				createPseudo: i,
				match: pt,
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function (e) {
						return e[1] = e[1].replace(xt, wt), e[3] = (e[4] || e[5] || "").replace(xt, wt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
					},
					CHILD: function (e) {
						return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || a.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && a.error(e[0]), e
					},
					PSEUDO: function (e) {
						var t, n = !e[5] && e[2];
						return pt.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && ct.test(n) && (t = f(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
					}
				},
				filter: {
					TAG: function (e) {
						return "*" === e ? function () {
							return !0
						} : (e = e.replace(xt, wt).toLowerCase(), function (t) {
							return t.nodeName && t.nodeName.toLowerCase() === e
						})
					},
					CLASS: function (e) {
						var t = z[e + " "];
						return t || (t = new RegExp("(^|" + et + ")" + e + "(" + et + "|$)")) && z(e, function (e) {
							return t.test(e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "")
						})
					},
					ATTR: function (e, t, n) {
						return function (r) {
							var i = a.attr(r, e);
							return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
						}
					},
					CHILD: function (e, t, n, r, i) {
						var o = "nth" !== e.slice(0, 3),
							a = "last" !== e.slice(-4),
							s = "of-type" === t;
						return 1 === r && 0 === i ? function (e) {
							return !!e.parentNode
						} : function (t, n, u) {
							var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling",
								m = t.parentNode,
								y = s && t.nodeName.toLowerCase(),
								v = !u && !s;
							if (m) {
								if (o) {
									for (; g;) {
										for (f = t; f = f[g];)
											if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
										h = g = "only" === e && !h && "nextSibling"
									}
									return !0
								}
								if (h = [a ? m.firstChild : m.lastChild], a && v) {
									for (c = m[P] || (m[P] = {}), l = c[e] || [], d = l[0] === $ && l[1], p = l[0] === $ && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();)
										if (1 === f.nodeType && ++p && f === t) {
											c[e] = [$, d, p];
											break
										}
								} else if (v && (l = (t[P] || (t[P] = {}))[e]) && l[0] === $) p = l[1];
								else
									for (;
										(f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++p || (v && ((f[P] || (f[P] = {}))[e] = [$, p]), f !== t)););
								return p -= i, p === r || p % r === 0 && p / r >= 0
							}
						}
					},
					PSEUDO: function (e, t) {
						var n, r = C.pseudos[e] || C.setFilters[e.toLowerCase()] || a.error("unsupported pseudo: " + e);
						return r[P] ? r(t) : r.length > 1 ? (n = [e, e, "", t], C.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, n) {
							for (var i, o = r(e, t), a = o.length; a--;) i = Z.call(e, o[a]), e[i] = !(n[i] = o[a])
						}) : function (e) {
							return r(e, 0, n)
						}) : r
					}
				},
				pseudos: {
					not: i(function (e) {
						var t = [],
							n = [],
							r = S(e.replace(at, "$1"));
						return r[P] ? i(function (e, t, n, i) {
							for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
						}) : function (e, i, o) {
							return t[0] = e, r(t, null, o, n), !n.pop()
						}
					}),
					has: i(function (e) {
						return function (t) {
							return a(e, t).length > 0
						}
					}),
					contains: i(function (e) {
						return function (t) {
							return (t.textContent || t.innerText || k(t)).indexOf(e) > -1
						}
					}),
					lang: i(function (e) {
						return ft.test(e || "") || a.error("unsupported lang: " + e), e = e.replace(xt, wt).toLowerCase(),
							function (t) {
								var n;
								do
									if (n = q ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
								while ((t = t.parentNode) && 1 === t.nodeType);
								return !1
							}
					}),
					target: function (t) {
						var n = e.location && e.location.hash;
						return n && n.slice(1) === t.id
					},
					root: function (e) {
						return e === H
					},
					focus: function (e) {
						return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
					},
					enabled: function (e) {
						return e.disabled === !1
					},
					disabled: function (e) {
						return e.disabled === !0
					},
					checked: function (e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && !!e.checked || "option" === t && !!e.selected
					},
					selected: function (e) {
						return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
					},
					empty: function (e) {
						for (e = e.firstChild; e; e = e.nextSibling)
							if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
						return !0
					},
					parent: function (e) {
						return !C.pseudos.empty(e)
					},
					header: function (e) {
						return yt.test(e.nodeName)
					},
					input: function (e) {
						return mt.test(e.nodeName)
					},
					button: function (e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					text: function (e) {
						var t;
						return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
					},
					first: c(function () {
						return [0]
					}),
					last: c(function (e, t) {
						return [t - 1]
					}),
					eq: c(function (e, t, n) {
						return [0 > n ? n + t : n]
					}),
					even: c(function (e, t) {
						for (var n = 0; t > n; n += 2) e.push(n);
						return e
					}),
					odd: c(function (e, t) {
						for (var n = 1; t > n; n += 2) e.push(n);
						return e
					}),
					lt: c(function (e, t, n) {
						for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
						return e
					}),
					gt: c(function (e, t, n) {
						for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
						return e
					})
				}
			};
			for (T in {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) C.pseudos[T] = u(T);
			for (T in {
				submit: !0,
				reset: !0
			}) C.pseudos[T] = l(T);
			S = a.compile = function (e, t) {
				var n, r = [],
					i = [],
					o = U[e + " "];
				if (!o) {
					for (t || (t = f(e)), n = t.length; n--;) o = y(t[n]), o[P] ? r.push(o) : i.push(o);
					o = U(e, v(i, r))
				}
				return o
			}, C.pseudos.nth = C.pseudos.eq, C.filters = w.prototype = C.pseudos, C.setFilters = new w, D(), a.attr = ut.attr, ut.find = a, ut.expr = a.selectors, ut.expr[":"] = ut.expr.pseudos, ut.unique = a.uniqueSort, ut.text = a.getText, ut.isXMLDoc = a.isXML, ut.contains = a.contains
		}(e);
	var Wt = /Until$/,
		$t = /^(?:parents|prev(?:Until|All))/,
		It = /^.[^:#\[\.,]*$/,
		zt = ut.expr.match.needsContext,
		Xt = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	ut.fn.extend({
		find: function (e) {
			var t, n, r, i = this.length;
			if ("string" != typeof e) return r = this, this.pushStack(ut(e).filter(function () {
				for (t = 0; i > t; t++)
					if (ut.contains(r[t], this)) return !0
			}));
			for (n = [], t = 0; i > t; t++) ut.find(e, this[t], n);
			return n = this.pushStack(i > 1 ? ut.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
		},
		has: function (e) {
			var t, n = ut(e, this),
				r = n.length;
			return this.filter(function () {
				for (t = 0; r > t; t++)
					if (ut.contains(this, n[t])) return !0
			})
		},
		not: function (e) {
			return this.pushStack(f(this, e, !1))
		},
		filter: function (e) {
			return this.pushStack(f(this, e, !0))
		},
		is: function (e) {
			return !!e && ("string" == typeof e ? zt.test(e) ? ut(e, this.context).index(this[0]) >= 0 : ut.filter(e, this).length > 0 : this.filter(e).length > 0)
		},
		closest: function (e, t) {
			for (var n, r = 0, i = this.length, o = [], a = zt.test(e) || "string" != typeof e ? ut(e, t || this.context) : 0; i > r; r++)
				for (n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
					if (a ? a.index(n) > -1 : ut.find.matchesSelector(n, e)) {
						o.push(n);
						break
					}
					n = n.parentNode
				}
			return this.pushStack(o.length > 1 ? ut.unique(o) : o)
		},
		index: function (e) {
			return e ? "string" == typeof e ? ut.inArray(this[0], ut(e)) : ut.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function (e, t) {
			var n = "string" == typeof e ? ut(e, t) : ut.makeArray(e && e.nodeType ? [e] : e),
				r = ut.merge(this.get(), n);
			return this.pushStack(ut.unique(r))
		},
		addBack: function (e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), ut.fn.andSelf = ut.fn.addBack, ut.each({
		parent: function (e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function (e) {
			return ut.dir(e, "parentNode")
		},
		parentsUntil: function (e, t, n) {
			return ut.dir(e, "parentNode", n)
		},
		next: function (e) {
			return c(e, "nextSibling")
		},
		prev: function (e) {
			return c(e, "previousSibling")
		},
		nextAll: function (e) {
			return ut.dir(e, "nextSibling")
		},
		prevAll: function (e) {
			return ut.dir(e, "previousSibling")
		},
		nextUntil: function (e, t, n) {
			return ut.dir(e, "nextSibling", n)
		},
		prevUntil: function (e, t, n) {
			return ut.dir(e, "previousSibling", n)
		},
		siblings: function (e) {
			return ut.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function (e) {
			return ut.sibling(e.firstChild)
		},
		contents: function (e) {
			return ut.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ut.merge([], e.childNodes)
		}
	}, function (e, t) {
		ut.fn[e] = function (n, r) {
			var i = ut.map(this, t, n);
			return Wt.test(e) || (r = n), r && "string" == typeof r && (i = ut.filter(r, i)), i = this.length > 1 && !Xt[e] ? ut.unique(i) : i, this.length > 1 && $t.test(e) && (i = i.reverse()), this.pushStack(i)
		}
	}), ut.extend({
		filter: function (e, t, n) {
			return n && (e = ":not(" + e + ")"), 1 === t.length ? ut.find.matchesSelector(t[0], e) ? [t[0]] : [] : ut.find.matches(e, t)
		},
		dir: function (e, n, r) {
			for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !ut(o).is(r));) 1 === o.nodeType && i.push(o), o = o[n];
			return i
		},
		sibling: function (e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	var Ut = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Vt = / jQuery\d+="(?:null|\d+)"/g,
		Yt = new RegExp("<(?:" + Ut + ")[\\s/>]", "i"),
		Jt = /^\s+/,
		Gt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Qt = /<([\w:]+)/,
		Kt = /<tbody/i,
		Zt = /<|&#?\w+;/,
		en = /<(?:script|style|link)/i,
		tn = /^(?:checkbox|radio)$/i,
		nn = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rn = /^$|\/(?:java|ecma)script/i,
		on = /^true\/(.*)/,
		an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		sn = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: ut.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		un = p(Y),
		ln = un.appendChild(Y.createElement("div"));
	sn.optgroup = sn.option, sn.tbody = sn.tfoot = sn.colgroup = sn.caption = sn.thead, sn.th = sn.td, ut.fn.extend({
		text: function (e) {
			return ut.access(this, function (e) {
				return e === t ? ut.text(this) : this.empty().append((this[0] && this[0].ownerDocument || Y).createTextNode(e))
			}, null, e, arguments.length)
		},
		wrapAll: function (e) {
			if (ut.isFunction(e)) return this.each(function (t) {
				ut(this).wrapAll(e.call(this, t))
			});
			if (this[0]) {
				var t = ut(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function (e) {
			return this.each(ut.isFunction(e) ? function (t) {
				ut(this).wrapInner(e.call(this, t))
			} : function () {
				var t = ut(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function (e) {
			var t = ut.isFunction(e);
			return this.each(function (n) {
				ut(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function () {
			return this.parent().each(function () {
				ut.nodeName(this, "body") || ut(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function () {
			return this.domManip(arguments, !0, function (e) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
			})
		},
		prepend: function () {
			return this.domManip(arguments, !0, function (e) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
			})
		},
		before: function () {
			return this.domManip(arguments, !1, function (e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function () {
			return this.domManip(arguments, !1, function (e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function (e, t) {
			for (var n, r = 0; null != (n = this[r]); r++)(!e || ut.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || ut.cleanData(b(n)), n.parentNode && (t && ut.contains(n.ownerDocument, n) && m(b(n, "script")), n.parentNode.removeChild(n)));
			return this
		},
		empty: function () {
			for (var e, t = 0; null != (e = this[t]); t++) {
				for (1 === e.nodeType && ut.cleanData(b(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && ut.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone: function (e, t) {
			return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
				return ut.clone(this, e, t)
			})
		},
		html: function (e) {
			return ut.access(this, function (e) {
				var n = this[0] || {},
					r = 0,
					i = this.length;
				if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Vt, "") : t;
				if (!("string" != typeof e || en.test(e) || !ut.support.htmlSerialize && Yt.test(e) || !ut.support.leadingWhitespace && Jt.test(e) || sn[(Qt.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(Gt, "<$1></$2>");
					try {
						for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (ut.cleanData(b(n, !1)), n.innerHTML = e);
						n = 0
					} catch (o) {}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function (e) {
			var t = ut.isFunction(e);
			return t || "string" == typeof e || (e = ut(e).not(this).detach()), this.domManip([e], !0, function (e) {
				var t = this.nextSibling,
					n = this.parentNode;
				n && (ut(this).remove(), n.insertBefore(e, t))
			})
		},
		detach: function (e) {
			return this.remove(e, !0)
		},
		domManip: function (e, n, r) {
			e = tt.apply([], e);
			var i, o, a, s, u, l, c = 0,
				f = this.length,
				p = this,
				m = f - 1,
				y = e[0],
				v = ut.isFunction(y);
			if (v || !(1 >= f || "string" != typeof y || ut.support.checkClone) && nn.test(y)) return this.each(function (i) {
				var o = p.eq(i);
				v && (e[0] = y.call(this, i, n ? o.html() : t)), o.domManip(e, n, r)
			});
			if (f && (l = ut.buildFragment(e, this[0].ownerDocument, !1, this), i = l.firstChild, 1 === l.childNodes.length && (l = i), i)) {
				for (n = n && ut.nodeName(i, "tr"), s = ut.map(b(l, "script"), h), a = s.length; f > c; c++) o = l, c !== m && (o = ut.clone(o, !0, !0), a && ut.merge(s, b(o, "script"))), r.call(n && ut.nodeName(this[c], "table") ? d(this[c], "tbody") : this[c], o, c);
				if (a)
					for (u = s[s.length - 1].ownerDocument, ut.map(s, g), c = 0; a > c; c++) o = s[c], rn.test(o.type || "") && !ut._data(o, "globalEval") && ut.contains(u, o) && (o.src ? ut.ajax({
						url: o.src,
						type: "GET",
						dataType: "script",
						async: !1,
						global: !1,
						"throws": !0
					}) : ut.globalEval((o.text || o.textContent || o.innerHTML || "").replace(an, "")));
				l = i = null
			}
			return this
		}
	}), ut.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (e, t) {
		ut.fn[e] = function (e) {
			for (var n, r = 0, i = [], o = ut(e), a = o.length - 1; a >= r; r++) n = r === a ? this : this.clone(!0), ut(o[r])[t](n), nt.apply(i, n.get());
			return this.pushStack(i)
		}
	}), ut.extend({
		clone: function (e, t, n) {
			var r, i, o, a, s, u = ut.contains(e.ownerDocument, e);
			if (ut.support.html5Clone || ut.isXMLDoc(e) || !Yt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ln.innerHTML = e.outerHTML, ln.removeChild(o = ln.firstChild)), !(ut.support.noCloneEvent && ut.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ut.isXMLDoc(e)))
				for (r = b(o), s = b(e), a = 0; null != (i = s[a]); ++a) r[a] && v(i, r[a]);
			if (t)
				if (n)
					for (s = s || b(e), r = r || b(o), a = 0; null != (i = s[a]); a++) y(i, r[a]);
				else y(e, o);
			return r = b(o, "script"), r.length > 0 && m(r, !u && b(e, "script")), r = s = i = null, o
		},
		buildFragment: function (e, t, n, r) {
			for (var i, o, a, s, u, l, c, f = e.length, d = p(t), h = [], g = 0; f > g; g++)
				if (o = e[g], o || 0 === o)
					if ("object" === ut.type(o)) ut.merge(h, o.nodeType ? [o] : o);
					else if (Zt.test(o)) {
				for (s = s || d.appendChild(t.createElement("div")), u = (Qt.exec(o) || ["", ""])[1].toLowerCase(), c = sn[u] || sn._default, s.innerHTML = c[1] + o.replace(Gt, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
				if (!ut.support.leadingWhitespace && Jt.test(o) && h.push(t.createTextNode(Jt.exec(o)[0])), !ut.support.tbody)
					for (o = "table" !== u || Kt.test(o) ? "<table>" !== c[1] || Kt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;) ut.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
				for (ut.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
				s = d.lastChild
			} else h.push(t.createTextNode(o));
			for (s && d.removeChild(s), ut.support.appendChecked || ut.grep(b(h, "input"), x), g = 0; o = h[g++];)
				if ((!r || -1 === ut.inArray(o, r)) && (a = ut.contains(o.ownerDocument, o), s = b(d.appendChild(o), "script"), a && m(s), n))
					for (i = 0; o = s[i++];) rn.test(o.type || "") && n.push(o);
			return s = null, d
		},
		cleanData: function (e, t) {
			for (var n, r, i, o, a = 0, s = ut.expando, u = ut.cache, l = ut.support.deleteExpando, c = ut.event.special; null != (n = e[a]); a++)
				if ((t || ut.acceptData(n)) && (i = n[s], o = i && u[i])) {
					if (o.events)
						for (r in o.events) c[r] ? ut.event.remove(n, r) : ut.removeEvent(n, r, o.handle);
					u[i] && (delete u[i], l ? delete n[s] : typeof n.removeAttribute !== V ? n.removeAttribute(s) : n[s] = null, Z.push(i))
				}
		}
	});
	var cn, fn, pn, dn = /alpha\([^)]*\)/i,
		hn = /opacity\s*=\s*([^)]*)/,
		gn = /^(top|right|bottom|left)$/,
		mn = /^(none|table(?!-c[ea]).+)/,
		yn = /^margin/,
		vn = new RegExp("^(" + lt + ")(.*)$", "i"),
		bn = new RegExp("^(" + lt + ")(?!px)[a-z%]+$", "i"),
		xn = new RegExp("^([+-])=(" + lt + ")", "i"),
		wn = {
			BODY: "block"
		},
		Tn = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Nn = {
			letterSpacing: 0,
			fontWeight: 400
		},
		Cn = ["Top", "Right", "Bottom", "Left"],
		kn = ["Webkit", "O", "Moz", "ms"];
	ut.fn.extend({
		css: function (e, n) {
			return ut.access(this, function (e, n, r) {
				var i, o, a = {},
					s = 0;
				if (ut.isArray(n)) {
					for (o = fn(e), i = n.length; i > s; s++) a[n[s]] = ut.css(e, n[s], !1, o);
					return a
				}
				return r !== t ? ut.style(e, n, r) : ut.css(e, n)
			}, e, n, arguments.length > 1)
		},
		show: function () {
			return N(this, !0)
		},
		hide: function () {
			return N(this)
		},
		toggle: function (e) {
			var t = "boolean" == typeof e;
			return this.each(function () {
				(t ? e : T(this)) ? ut(this).show(): ut(this).hide()
			})
		}
	}), ut.extend({
		cssHooks: {
			opacity: {
				get: function (e, t) {
					if (t) {
						var n = pn(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": ut.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function (e, n, r, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, a, s, u = ut.camelCase(n),
					l = e.style;
				if (n = ut.cssProps[u] || (ut.cssProps[u] = w(l, u)), s = ut.cssHooks[n] || ut.cssHooks[u], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
				if (a = typeof r, "string" === a && (o = xn.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(ut.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || ut.cssNumber[u] || (r += "px"), ut.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try {
					l[n] = r
				} catch (c) {}
			}
		},
		css: function (e, n, r, i) {
			var o, a, s, u = ut.camelCase(n);
			return n = ut.cssProps[u] || (ut.cssProps[u] = w(e.style, u)), s = ut.cssHooks[n] || ut.cssHooks[u], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = pn(e, n, i)), "normal" === a && n in Nn && (a = Nn[n]), "" === r || r ? (o = parseFloat(a), r === !0 || ut.isNumeric(o) ? o || 0 : a) : a
		},
		swap: function (e, t, n, r) {
			var i, o, a = {};
			for (o in t) a[o] = e.style[o], e.style[o] = t[o];
			i = n.apply(e, r || []);
			for (o in t) e.style[o] = a[o];
			return i
		}
	}), e.getComputedStyle ? (fn = function (t) {
		return e.getComputedStyle(t, null)
	}, pn = function (e, n, r) {
		var i, o, a, s = r || fn(e),
			u = s ? s.getPropertyValue(n) || s[n] : t,
			l = e.style;
		return s && ("" !== u || ut.contains(e.ownerDocument, e) || (u = ut.style(e, n)), bn.test(u) && yn.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u
	}) : Y.documentElement.currentStyle && (fn = function (e) {
		return e.currentStyle
	}, pn = function (e, n, r) {
		var i, o, a, s = r || fn(e),
			u = s ? s[n] : t,
			l = e.style;
		return null == u && l && l[n] && (u = l[n]), bn.test(u) && !gn.test(n) && (i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u
	}), ut.each(["height", "width"], function (e, t) {
		ut.cssHooks[t] = {
			get: function (e, n, r) {
				return n ? 0 === e.offsetWidth && mn.test(ut.css(e, "display")) ? ut.swap(e, Tn, function () {
					return E(e, t, r)
				}) : E(e, t, r) : void 0
			},
			set: function (e, n, r) {
				var i = r && fn(e);
				return C(e, n, r ? k(e, t, r, ut.support.boxSizing && "border-box" === ut.css(e, "boxSizing", !1, i), i) : 0)
			}
		}
	}), ut.support.opacity || (ut.cssHooks.opacity = {
		get: function (e, t) {
			return hn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function (e, t) {
			var n = e.style,
				r = e.currentStyle,
				i = ut.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				o = r && r.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === ut.trim(o.replace(dn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = dn.test(o) ? o.replace(dn, i) : o + " " + i)
		}
	}), ut(function () {
		ut.support.reliableMarginRight || (ut.cssHooks.marginRight = {
			get: function (e, t) {
				return t ? ut.swap(e, {
					display: "inline-block"
				}, pn, [e, "marginRight"]) : void 0
			}
		}), !ut.support.pixelPosition && ut.fn.position && ut.each(["top", "left"], function (e, t) {
			ut.cssHooks[t] = {
				get: function (e, n) {
					return n ? (n = pn(e, t), bn.test(n) ? ut(e).position()[t] + "px" : n) : void 0
				}
			}
		})
	}), ut.expr && ut.expr.filters && (ut.expr.filters.hidden = function (e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ut.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ut.css(e, "display"))
	}, ut.expr.filters.visible = function (e) {
		return !ut.expr.filters.hidden(e)
	}), ut.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (e, t) {
		ut.cssHooks[e + t] = {
			expand: function (n) {
				for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Cn[r] + t] = o[r] || o[r - 2] || o[0];
				return i
			}
		}, yn.test(e) || (ut.cssHooks[e + t].set = C)
	});
	var En = /%20/g,
		Sn = /\[\]$/,
		An = /\r?\n/g,
		jn = /^(?:submit|button|image|reset|file)$/i,
		Dn = /^(?:input|select|textarea|keygen)/i;
	ut.fn.extend({
		serialize: function () {
			return ut.param(this.serializeArray())
		},
		serializeArray: function () {
			return this.map(function () {
				var e = ut.prop(this, "elements");
				return e ? ut.makeArray(e) : this
			}).filter(function () {
				var e = this.type;
				return this.name && !ut(this).is(":disabled") && Dn.test(this.nodeName) && !jn.test(e) && (this.checked || !tn.test(e))
			}).map(function (e, t) {
				var n = ut(this).val();
				return null == n ? null : ut.isArray(n) ? ut.map(n, function (e) {
					return {
						name: t.name,
						value: e.replace(An, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(An, "\r\n")
				}
			}).get()
		}
	}), ut.param = function (e, n) {
		var r, i = [],
			o = function (e, t) {
				t = ut.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if (n === t && (n = ut.ajaxSettings && ut.ajaxSettings.traditional), ut.isArray(e) || e.jquery && !ut.isPlainObject(e)) ut.each(e, function () {
			o(this.name, this.value)
		});
		else
			for (r in e) j(r, e[r], n, o);
		return i.join("&").replace(En, "+")
	}, ut.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
		ut.fn[t] = function (e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), ut.fn.hover = function (e, t) {
		return this.mouseenter(e).mouseleave(t || e)
	};
	var Ln, Hn, qn = ut.now(),
		Mn = /\?/,
		_n = /#.*$/,
		Fn = /([?&])_=[^&]*/,
		On = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Bn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		Pn = /^(?:GET|HEAD)$/,
		Rn = /^\/\//,
		Wn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		$n = ut.fn.load,
		In = {},
		zn = {},
		Xn = "*/".concat("*");
	try {
		Hn = J.href
	} catch (Un) {
		Hn = Y.createElement("a"), Hn.href = "", Hn = Hn.href
	}
	Ln = Wn.exec(Hn.toLowerCase()) || [], ut.fn.load = function (e, n, r) {
		if ("string" != typeof e && $n) return $n.apply(this, arguments);
		var i, o, a, s = this,
			u = e.indexOf(" ");
		return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), ut.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ut.ajax({
			url: e,
			type: a,
			dataType: "html",
			data: n
		}).done(function (e) {
			o = arguments, s.html(i ? ut("<div>").append(ut.parseHTML(e)).find(i) : e)
		}).complete(r && function (e, t) {
			s.each(r, o || [e.responseText, t, e])
		}), this
	}, ut.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
		ut.fn[t] = function (e) {
			return this.on(t, e)
		}
	}), ut.each(["get", "post"], function (e, n) {
		ut[n] = function (e, r, i, o) {
			return ut.isFunction(r) && (o = o || i, i = r, r = t), ut.ajax({
				url: e,
				type: n,
				dataType: o,
				data: r,
				success: i
			})
		}
	}), ut.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: Hn,
			type: "GET",
			isLocal: Bn.test(Ln[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Xn,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": e.String,
				"text html": !0,
				"text json": ut.parseJSON,
				"text xml": ut.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function (e, t) {
			return t ? H(H(e, ut.ajaxSettings), t) : H(ut.ajaxSettings, e)
		},
		ajaxPrefilter: D(In),
		ajaxTransport: D(zn),
		ajax: function (e, n) {
			function r(e, n, r, i) {
				var o, f, v, b, w, N = n;
				2 !== x && (x = 2, u && clearTimeout(u), c = t, s = i || "", T.readyState = e > 0 ? 4 : 0, r && (b = q(p, T, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (ut.lastModified[a] = w), w = T.getResponseHeader("etag"), w && (ut.etag[a] = w)), 204 === e ? (o = !0, N = "nocontent") : 304 === e ? (o = !0, N = "notmodified") : (o = M(p, b), N = o.state, f = o.data, v = o.error, o = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || N) + "", o ? g.resolveWith(d, [f, N, T]) : g.rejectWith(d, [T, N, v]), T.statusCode(y), y = t, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [T, p, o ? f : v]), m.fireWith(d, [T, N]), l && (h.trigger("ajaxComplete", [T, p]), --ut.active || ut.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (n = e, e = t), n = n || {};
			var i, o, a, s, u, l, c, f, p = ut.ajaxSetup({}, n),
				d = p.context || p,
				h = p.context && (d.nodeType || d.jquery) ? ut(d) : ut.event,
				g = ut.Deferred(),
				m = ut.Callbacks("once memory"),
				y = p.statusCode || {},
				v = {},
				b = {},
				x = 0,
				w = "canceled",
				T = {
					readyState: 0,
					getResponseHeader: function (e) {
						var t;
						if (2 === x) {
							if (!f)
								for (f = {}; t = On.exec(s);) f[t[1].toLowerCase()] = t[2];
							t = f[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function () {
						return 2 === x ? s : null
					},
					setRequestHeader: function (e, t) {
						var n = e.toLowerCase();
						return x || (e = b[n] = b[n] || e, v[e] = t), this
					},
					overrideMimeType: function (e) {
						return x || (p.mimeType = e), this
					},
					statusCode: function (e) {
						var t;
						if (e)
							if (2 > x)
								for (t in e) y[t] = [y[t], e[t]];
							else T.always(e[T.status]);
						return this
					},
					abort: function (e) {
						var t = e || w;
						return c && c.abort(t), r(0, t), this
					}
				};
			if (g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, p.url = ((e || p.url || Hn) + "").replace(_n, "").replace(Rn, Ln[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ut.trim(p.dataType || "*").toLowerCase().match(ct) || [""], null == p.crossDomain && (i = Wn.exec(p.url.toLowerCase()), p.crossDomain = !(!i || i[1] === Ln[1] && i[2] === Ln[2] && (i[3] || ("http:" === i[1] ? 80 : 443)) == (Ln[3] || ("http:" === Ln[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = ut.param(p.data, p.traditional)), L(In, p, n, T), 2 === x) return T;
			l = p.global, l && 0 === ut.active++ && ut.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Pn.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (Mn.test(a) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = Fn.test(a) ? a.replace(Fn, "$1_=" + qn++) : a + (Mn.test(a) ? "&" : "?") + "_=" + qn++)), p.ifModified && (ut.lastModified[a] && T.setRequestHeader("If-Modified-Since", ut.lastModified[a]), ut.etag[a] && T.setRequestHeader("If-None-Match", ut.etag[a])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType), T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Xn + "; q=0.01" : "") : p.accepts["*"]);
			for (o in p.headers) T.setRequestHeader(o, p.headers[o]);
			if (p.beforeSend && (p.beforeSend.call(d, T, p) === !1 || 2 === x)) return T.abort();
			w = "abort";
			for (o in {
				success: 1,
				error: 1,
				complete: 1
			}) T[o](p[o]);
			if (c = L(zn, p, n, T)) {
				T.readyState = 1, l && h.trigger("ajaxSend", [T, p]), p.async && p.timeout > 0 && (u = setTimeout(function () {
					T.abort("timeout")
				}, p.timeout));
				try {
					x = 1, c.send(v, r)
				} catch (N) {
					if (!(2 > x)) throw N;
					r(-1, N)
				}
			} else r(-1, "No Transport");
			return T
		},
		getScript: function (e, n) {
			return ut.get(e, t, n, "script")
		},
		getJSON: function (e, t, n) {
			return ut.get(e, t, n, "json")
		}
	}), ut.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function (e) {
				return ut.globalEval(e), e
			}
		}
	}), ut.ajaxPrefilter("script", function (e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), ut.ajaxTransport("script", function (e) {
		if (e.crossDomain) {
			var n, r = Y.head || ut("head")[0] || Y.documentElement;
			return {
				send: function (t, i) {
					n = Y.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) {
						(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
					}, r.insertBefore(n, r.firstChild)
				},
				abort: function () {
					n && n.onload(t, !0)
				}
			}
		}
	});
	var Vn = [],
		Yn = /(=)\?(?=&|$)|\?\?/;
	ut.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var e = Vn.pop() || ut.expando + "_" + qn++;
			return this[e] = !0, e
		}
	}), ut.ajaxPrefilter("json jsonp", function (n, r, i) {
		var o, a, s, u = n.jsonp !== !1 && (Yn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Yn.test(n.data) && "data");
		return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ut.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Yn, "$1" + o) : n.jsonp !== !1 && (n.url += (Mn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () {
			return s || ut.error(o + " was not called"), s[0]
		}, n.dataTypes[0] = "json", a = e[o], e[o] = function () {
			s = arguments
		}, i.always(function () {
			e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Vn.push(o)), s && ut.isFunction(a) && a(s[0]), s = a = t
		}), "script") : void 0
	});
	var Jn, Gn, Qn = 0,
		Kn = e.ActiveXObject && function () {
			var e;
			for (e in Jn) Jn[e](t, !0)
		};
	ut.ajaxSettings.xhr = e.ActiveXObject ? function () {
		return !this.isLocal && _() || F()
	} : _, Gn = ut.ajaxSettings.xhr(), ut.support.cors = !!Gn && "withCredentials" in Gn, Gn = ut.support.ajax = !!Gn, Gn && ut.ajaxTransport(function (n) {
		if (!n.crossDomain || ut.support.cors) {
			var r;
			return {
				send: function (i, o) {
					var a, s, u = n.xhr();
					if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields)
						for (s in n.xhrFields) u[s] = n.xhrFields[s];
					n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (s in i) u.setRequestHeader(s, i[s])
					} catch (l) {}
					u.send(n.hasContent && n.data || null), r = function (e, i) {
						var s, l, c, f;
						try {
							if (r && (i || 4 === u.readyState))
								if (r = t, a && (u.onreadystatechange = ut.noop, Kn && delete Jn[a]), i) 4 !== u.readyState && u.abort();
								else {
									f = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (f.text = u.responseText);
									try {
										c = u.statusText
									} catch (p) {
										c = ""
									}
									s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = f.text ? 200 : 404
								}
						} catch (d) {
							i || o(-1, d)
						}
						f && o(s, c, f, l)
					}, n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Qn, Kn && (Jn || (Jn = {}, ut(e).unload(Kn)), Jn[a] = r), u.onreadystatechange = r) : r()
				},
				abort: function () {
					r && r(t, !0)
				}
			}
		}
	});
	var Zn, er, tr = /^(?:toggle|show|hide)$/,
		nr = new RegExp("^(?:([+-])=|)(" + lt + ")([a-z%]*)$", "i"),
		rr = /queueHooks$/,
		ir = [W],
		or = {
			"*": [
				function (e, t) {
					var n, r, i = this.createTween(e, t),
						o = nr.exec(t),
						a = i.cur(),
						s = +a || 0,
						u = 1,
						l = 20;
					if (o) {
						if (n = +o[2], r = o[3] || (ut.cssNumber[e] ? "" : "px"), "px" !== r && s) {
							s = ut.css(i.elem, e, !0) || n || 1;
							do u = u || ".5", s /= u, ut.style(i.elem, e, s + r); while (u !== (u = i.cur() / a) && 1 !== u && --l)
						}
						i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n
					}
					return i
				}
			]
		};
	ut.Animation = ut.extend(P, {
		tweener: function (e, t) {
			ut.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for (var n, r = 0, i = e.length; i > r; r++) n = e[r], or[n] = or[n] || [], or[n].unshift(t)
		},
		prefilter: function (e, t) {
			t ? ir.unshift(e) : ir.push(e)
		}
	}), ut.Tween = $, $.prototype = {
		constructor: $,
		init: function (e, t, n, r, i, o) {
			this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ut.cssNumber[n] ? "" : "px")
		},
		cur: function () {
			var e = $.propHooks[this.prop];
			return e && e.get ? e.get(this) : $.propHooks._default.get(this)
		},
		run: function (e) {
			var t, n = $.propHooks[this.prop];
			return this.pos = t = this.options.duration ? ut.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : $.propHooks._default.set(this), this
		}
	}, $.prototype.init.prototype = $.prototype, $.propHooks = {
		_default: {
			get: function (e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ut.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			set: function (e) {
				ut.fx.step[e.prop] ? ut.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ut.cssProps[e.prop]] || ut.cssHooks[e.prop]) ? ut.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
		set: function (e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, ut.each(["toggle", "show", "hide"], function (e, t) {
		var n = ut.fn[t];
		ut.fn[t] = function (e, r, i) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(I(t, !0), e, r, i)
		}
	}), ut.fn.extend({
		fadeTo: function (e, t, n, r) {
			return this.filter(T).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function (e, t, n, r) {
			var i = ut.isEmptyObject(e),
				o = ut.speed(t, n, r),
				a = function () {
					var t = P(this, ut.extend({}, e), o);
					a.finish = function () {
						t.stop(!0)
					}, (i || ut._data(this, "finish")) && t.stop(!0)
				};
			return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
		},
		stop: function (e, n, r) {
			var i = function (e) {
				var t = e.stop;
				delete e.stop, t(r)
			};
			return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
				var t = !0,
					n = null != e && e + "queueHooks",
					o = ut.timers,
					a = ut._data(this);
				if (n) a[n] && a[n].stop && i(a[n]);
				else
					for (n in a) a[n] && a[n].stop && rr.test(n) && i(a[n]);
				for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
				(t || !r) && ut.dequeue(this, e)
			})
		},
		finish: function (e) {
			return e !== !1 && (e = e || "fx"), this.each(function () {
				var t, n = ut._data(this),
					r = n[e + "queue"],
					i = n[e + "queueHooks"],
					o = ut.timers,
					a = r ? r.length : 0;
				for (n.finish = !0, ut.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
				delete n.finish
			})
		}
	}), ut.each({
		slideDown: I("show"),
		slideUp: I("hide"),
		slideToggle: I("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function (e, t) {
		ut.fn[e] = function (e, n, r) {
			return this.animate(t, e, n, r)
		}
	}), ut.speed = function (e, t, n) {
		var r = e && "object" == typeof e ? ut.extend({}, e) : {
			complete: n || !n && t || ut.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !ut.isFunction(t) && t
		};
		return r.duration = ut.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ut.fx.speeds ? ut.fx.speeds[r.duration] : ut.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
			ut.isFunction(r.old) && r.old.call(this), r.queue && ut.dequeue(this, r.queue)
		}, r
	}, ut.easing = {
		linear: function (e) {
			return e
		},
		swing: function (e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, ut.timers = [], ut.fx = $.prototype.init, ut.fx.tick = function () {
		var e, n = ut.timers,
			r = 0;
		for (Zn = ut.now(); r < n.length; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1);
		n.length || ut.fx.stop(), Zn = t
	}, ut.fx.timer = function (e) {
		e() && ut.timers.push(e) && ut.fx.start()
	}, ut.fx.interval = 13, ut.fx.start = function () {
		er || (er = setInterval(ut.fx.tick, ut.fx.interval))
	}, ut.fx.stop = function () {
		clearInterval(er), er = null
	}, ut.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, ut.fx.step = {}, ut.expr && ut.expr.filters && (ut.expr.filters.animated = function (e) {
		return ut.grep(ut.timers, function (t) {
			return e === t.elem
		}).length
	}), ut.fn.offset = function (e) {
		if (arguments.length) return e === t ? this : this.each(function (t) {
			ut.offset.setOffset(this, e, t)
		});
		var n, r, i = {
				top: 0,
				left: 0
			},
			o = this[0],
			a = o && o.ownerDocument;
		if (a) return n = a.documentElement, ut.contains(n, o) ? (typeof o.getBoundingClientRect !== V && (i = o.getBoundingClientRect()), r = z(a), {
			top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
			left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
		}) : i
	}, ut.offset = {
		setOffset: function (e, t, n) {
			var r = ut.css(e, "position");
			"static" === r && (e.style.position = "relative");
			var i, o, a = ut(e),
				s = a.offset(),
				u = ut.css(e, "top"),
				l = ut.css(e, "left"),
				c = ("absolute" === r || "fixed" === r) && ut.inArray("auto", [u, l]) > -1,
				f = {},
				p = {};
			c ? (p = a.position(), i = p.top, o = p.left) : (i = parseFloat(u) || 0, o = parseFloat(l) || 0), ut.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + i), null != t.left && (f.left = t.left - s.left + o), "using" in t ? t.using.call(e, f) : a.css(f)
		}
	}, ut.fn.extend({
		position: function () {
			if (this[0]) {
				var e, t, n = {
						top: 0,
						left: 0
					},
					r = this[0];
				return "fixed" === ut.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ut.nodeName(e[0], "html") || (n = e.offset()), n.top += ut.css(e[0], "borderTopWidth", !0), n.left += ut.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - ut.css(r, "marginTop", !0),
					left: t.left - n.left - ut.css(r, "marginLeft", !0)
				}
			}
		},
		offsetParent: function () {
			return this.map(function () {
				for (var e = this.offsetParent || Y.documentElement; e && !ut.nodeName(e, "html") && "static" === ut.css(e, "position");) e = e.offsetParent;
				return e || Y.documentElement
			})
		}
	}), ut.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function (e, n) {
		var r = /Y/.test(n);
		ut.fn[e] = function (i) {
			return ut.access(this, function (e, i, o) {
				var a = z(e);
				return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : void(a ? a.scrollTo(r ? ut(a).scrollLeft() : o, r ? o : ut(a).scrollTop()) : e[i] = o)
			}, e, i, arguments.length, null)
		}
	}), ut.each({
		Height: "height",
		Width: "width"
	}, function (e, n) {
		ut.each({
			padding: "inner" + e,
			content: n,
			"": "outer" + e
		}, function (r, i) {
			ut.fn[i] = function (i, o) {
				var a = arguments.length && (r || "boolean" != typeof i),
					s = r || (i === !0 || o === !0 ? "margin" : "border");
				return ut.access(this, function (n, r, i) {
					var o;
					return ut.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? ut.css(n, r, s) : ut.style(n, r, i, s)
				}, n, a ? i : t, a, null)
			}
		})
	}), e.jQuery = e.$ = ut, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
		return ut
	})
}(window);
(function () {
	function n(t, r, e) {
		if (t === r) return 0 !== t || 1 / t == 1 / r;
		if (null == t || null == r) return t === r;
		if (t._chain && (t = t._wrapped), r._chain && (r = r._wrapped), t.isEqual && j.isFunction(t.isEqual)) return t.isEqual(r);
		if (r.isEqual && j.isFunction(r.isEqual)) return r.isEqual(t);
		var u = o.call(t);
		if (u != o.call(r)) return !1;
		switch (u) {
		case "[object String]":
			return t == "" + r;
		case "[object Number]":
			return t != +t ? r != +r : 0 == t ? 1 / t == 1 / r : t == +r;
		case "[object Date]":
		case "[object Boolean]":
			return +t == +r;
		case "[object RegExp]":
			return t.source == r.source && t.global == r.global && t.multiline == r.multiline && t.ignoreCase == r.ignoreCase
		}
		if ("object" != typeof t || "object" != typeof r) return !1;
		for (var i = e.length; i--;)
			if (e[i] == t) return !0;
		e.push(t);
		var i = 0,
			a = !0;
		if ("[object Array]" == u) {
			if (i = t.length, a = i == r.length)
				for (; i-- && (a = i in t == i in r && n(t[i], r[i], e)););
		} else {
			if ("constructor" in t != "constructor" in r || t.constructor != r.constructor) return !1;
			for (var c in t)
				if (j.has(t, c) && (i++, !(a = j.has(r, c) && n(t[c], r[c], e)))) break;
			if (a) {
				for (c in r)
					if (j.has(r, c) && !i--) break;
				a = !i
			}
		}
		return e.pop(), a
	}
	var t = this,
		r = t._,
		e = {},
		u = Array.prototype,
		i = Object.prototype,
		a = u.slice,
		c = u.unshift,
		o = i.toString,
		l = i.hasOwnProperty,
		f = u.forEach,
		s = u.map,
		p = u.reduce,
		h = u.reduceRight,
		g = u.filter,
		v = u.every,
		d = u.some,
		m = u.indexOf,
		y = u.lastIndexOf,
		i = Array.isArray,
		b = Object.keys,
		x = Function.prototype.bind,
		j = function (n) {
			return new I(n)
		};
	"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : t._ = j, j.VERSION = "1.3.3";
	var _ = j.each = j.forEach = function (n, t, r) {
		if (null != n)
			if (f && n.forEach === f) n.forEach(t, r);
			else if (n.length === +n.length)
			for (var u = 0, i = n.length; i > u && !(u in n && t.call(r, n[u], u, n) === e); u++);
		else
			for (u in n)
				if (j.has(n, u) && t.call(r, n[u], u, n) === e) break
	};
	j.map = j.collect = function (n, t, r) {
		var e = [];
		return null == n ? e : s && n.map === s ? n.map(t, r) : (_(n, function (n, u, i) {
			e[e.length] = t.call(r, n, u, i)
		}), n.length === +n.length && (e.length = n.length), e)
	}, j.reduce = j.foldl = j.inject = function (n, t, r, e) {
		var u = arguments.length > 2;
		if (null == n && (n = []), p && n.reduce === p) return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
		if (_(n, function (n, i, a) {
			u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
		}), !u) throw new TypeError("Reduce of empty array with no initial value");
		return r
	}, j.reduceRight = j.foldr = function (n, t, r, e) {
		var u = arguments.length > 2;
		if (null == n && (n = []), h && n.reduceRight === h) return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
		var i = j.toArray(n).reverse();
		return e && !u && (t = j.bind(t, e)), u ? j.reduce(i, t, r, e) : j.reduce(i, t)
	}, j.find = j.detect = function (n, t, r) {
		var e;
		return A(n, function (n, u, i) {
			return t.call(r, n, u, i) ? (e = n, !0) : void 0
		}), e
	}, j.filter = j.select = function (n, t, r) {
		var e = [];
		return null == n ? e : g && n.filter === g ? n.filter(t, r) : (_(n, function (n, u, i) {
			t.call(r, n, u, i) && (e[e.length] = n)
		}), e)
	}, j.reject = function (n, t, r) {
		var e = [];
		return null == n ? e : (_(n, function (n, u, i) {
			t.call(r, n, u, i) || (e[e.length] = n)
		}), e)
	}, j.every = j.all = function (n, t, r) {
		var u = !0;
		return null == n ? u : v && n.every === v ? n.every(t, r) : (_(n, function (n, i, a) {
			return (u = u && t.call(r, n, i, a)) ? void 0 : e
		}), !!u)
	};
	var A = j.some = j.any = function (n, t, r) {
		t || (t = j.identity);
		var u = !1;
		return null == n ? u : d && n.some === d ? n.some(t, r) : (_(n, function (n, i, a) {
			return u || (u = t.call(r, n, i, a)) ? e : void 0
		}), !!u)
	};
	j.include = j.contains = function (n, t) {
		var r = !1;
		return null == n ? r : m && n.indexOf === m ? -1 != n.indexOf(t) : r = A(n, function (n) {
			return n === t
		})
	}, j.invoke = function (n, t) {
		var r = a.call(arguments, 2);
		return j.map(n, function (n) {
			return (j.isFunction(t) ? t || n : n[t]).apply(n, r)
		})
	}, j.pluck = function (n, t) {
		return j.map(n, function (n) {
			return n[t]
		})
	}, j.max = function (n, t, r) {
		if (!t && j.isArray(n) && n[0] === +n[0]) return Math.max.apply(Math, n);
		if (!t && j.isEmpty(n)) return -1 / 0;
		var e = {
			computed: -1 / 0
		};
		return _(n, function (n, u, i) {
			u = t ? t.call(r, n, u, i) : n, u >= e.computed && (e = {
				value: n,
				computed: u
			})
		}), e.value
	}, j.min = function (n, t, r) {
		if (!t && j.isArray(n) && n[0] === +n[0]) return Math.min.apply(Math, n);
		if (!t && j.isEmpty(n)) return 1 / 0;
		var e = {
			computed: 1 / 0
		};
		return _(n, function (n, u, i) {
			u = t ? t.call(r, n, u, i) : n, u < e.computed && (e = {
				value: n,
				computed: u
			})
		}), e.value
	}, j.shuffle = function (n) {
		var t, r = [];
		return _(n, function (n, e) {
			t = Math.floor(Math.random() * (e + 1)), r[e] = r[t], r[t] = n
		}), r
	}, j.sortBy = function (n, t, r) {
		var e = j.isFunction(t) ? t : function (n) {
			return n[t]
		};
		return j.pluck(j.map(n, function (n, t, u) {
			return {
				value: n,
				criteria: e.call(r, n, t, u)
			}
		}).sort(function (n, t) {
			var r = n.criteria,
				e = t.criteria;
			return void 0 === r ? 1 : void 0 === e ? -1 : e > r ? -1 : r > e ? 1 : 0
		}), "value")
	}, j.groupBy = function (n, t) {
		var r = {},
			e = j.isFunction(t) ? t : function (n) {
				return n[t]
			};
		return _(n, function (n, t) {
			var u = e(n, t);
			(r[u] || (r[u] = [])).push(n)
		}), r
	}, j.sortedIndex = function (n, t, r) {
		r || (r = j.identity);
		for (var e = 0, u = n.length; u > e;) {
			var i = e + u >> 1;
			r(n[i]) < r(t) ? e = i + 1 : u = i
		}
		return e
	}, j.toArray = function (n) {
		return n ? j.isArray(n) || j.isArguments(n) ? a.call(n) : n.toArray && j.isFunction(n.toArray) ? n.toArray() : j.values(n) : []
	}, j.size = function (n) {
		return j.isArray(n) ? n.length : j.keys(n).length
	}, j.first = j.head = j.take = function (n, t, r) {
		return null == t || r ? n[0] : a.call(n, 0, t)
	}, j.initial = function (n, t, r) {
		return a.call(n, 0, n.length - (null == t || r ? 1 : t))
	}, j.last = function (n, t, r) {
		return null == t || r ? n[n.length - 1] : a.call(n, Math.max(n.length - t, 0))
	}, j.rest = j.tail = function (n, t, r) {
		return a.call(n, null == t || r ? 1 : t)
	}, j.compact = function (n) {
		return j.filter(n, function (n) {
			return !!n
		})
	}, j.flatten = function (n, t) {
		return j.reduce(n, function (n, r) {
			return j.isArray(r) ? n.concat(t ? r : j.flatten(r)) : (n[n.length] = r, n)
		}, [])
	}, j.without = function (n) {
		return j.difference(n, a.call(arguments, 1))
	}, j.uniq = j.unique = function (n, t, r) {
		var r = r ? j.map(n, r) : n,
			e = [];
		return n.length < 3 && (t = !0), j.reduce(r, function (r, u, i) {
			return (t ? j.last(r) === u && r.length : j.include(r, u)) || (r.push(u), e.push(n[i])), r
		}, []), e
	}, j.union = function () {
		return j.uniq(j.flatten(arguments, !0))
	}, j.intersection = j.intersect = function (n) {
		var t = a.call(arguments, 1);
		return j.filter(j.uniq(n), function (n) {
			return j.every(t, function (t) {
				return j.indexOf(t, n) >= 0
			})
		})
	}, j.difference = function (n) {
		var t = j.flatten(a.call(arguments, 1), !0);
		return j.filter(n, function (n) {
			return !j.include(t, n)
		})
	}, j.zip = function () {
		for (var n = a.call(arguments), t = j.max(j.pluck(n, "length")), r = Array(t), e = 0; t > e; e++) r[e] = j.pluck(n, "" + e);
		return r
	}, j.indexOf = function (n, t, r) {
		if (null == n) return -1;
		var e;
		if (r) return r = j.sortedIndex(n, t), n[r] === t ? r : -1;
		if (m && n.indexOf === m) return n.indexOf(t);
		for (r = 0, e = n.length; e > r; r++)
			if (r in n && n[r] === t) return r;
		return -1
	}, j.lastIndexOf = function (n, t) {
		if (null == n) return -1;
		if (y && n.lastIndexOf === y) return n.lastIndexOf(t);
		for (var r = n.length; r--;)
			if (r in n && n[r] === t) return r;
		return -1
	}, j.range = function (n, t, r) {
		arguments.length <= 1 && (t = n || 0, n = 0);
		for (var r = arguments[2] || 1, e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e); e > u;) i[u++] = n, n += r;
		return i
	};
	var w = function () {};
	j.bind = function (n, t) {
		var r, e;
		if (n.bind === x && x) return x.apply(n, a.call(arguments, 1));
		if (!j.isFunction(n)) throw new TypeError;
		return e = a.call(arguments, 2), r = function () {
			if (!(this instanceof r)) return n.apply(t, e.concat(a.call(arguments)));
			w.prototype = n.prototype;
			var u = new w,
				i = n.apply(u, e.concat(a.call(arguments)));
			return Object(i) === i ? i : u
		}
	}, j.bindAll = function (n) {
		var t = a.call(arguments, 1);
		return 0 == t.length && (t = j.functions(n)), _(t, function (t) {
			n[t] = j.bind(n[t], n)
		}), n
	}, j.memoize = function (n, t) {
		var r = {};
		return t || (t = j.identity),
			function () {
				var e = t.apply(this, arguments);
				return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
			}
	}, j.delay = function (n, t) {
		var r = a.call(arguments, 2);
		return setTimeout(function () {
			return n.apply(null, r)
		}, t)
	}, j.defer = function (n) {
		return j.delay.apply(j, [n, 1].concat(a.call(arguments, 1)))
	}, j.throttle = function (n, t) {
		var r, e, u, i, a, c, o = j.debounce(function () {
			a = i = !1
		}, t);
		return function () {
			return r = this, e = arguments, u || (u = setTimeout(function () {
				u = null, a && n.apply(r, e), o()
			}, t)), i ? a = !0 : c = n.apply(r, e), o(), i = !0, c
		}
	}, j.debounce = function (n, t, r) {
		var e;
		return function () {
			var u = this,
				i = arguments;
			r && !e && n.apply(u, i), clearTimeout(e), e = setTimeout(function () {
				e = null, r || n.apply(u, i)
			}, t)
		}
	}, j.once = function (n) {
		var t, r = !1;
		return function () {
			return r ? t : (r = !0, t = n.apply(this, arguments))
		}
	}, j.wrap = function (n, t) {
		return function () {
			var r = [n].concat(a.call(arguments, 0));
			return t.apply(this, r)
		}
	}, j.compose = function () {
		var n = arguments;
		return function () {
			for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)];
			return t[0]
		}
	}, j.after = function (n, t) {
		return 0 >= n ? t() : function () {
			return --n < 1 ? t.apply(this, arguments) : void 0
		}
	}, j.keys = b || function (n) {
		if (n !== Object(n)) throw new TypeError("Invalid object");
		var t, r = [];
		for (t in n) j.has(n, t) && (r[r.length] = t);
		return r
	}, j.values = function (n) {
		return j.map(n, j.identity)
	}, j.functions = j.methods = function (n) {
		var t, r = [];
		for (t in n) j.isFunction(n[t]) && r.push(t);
		return r.sort()
	}, j.extend = function (n) {
		return _(a.call(arguments, 1), function (t) {
			for (var r in t) n[r] = t[r]
		}), n
	}, j.pick = function (n) {
		var t = {};
		return _(j.flatten(a.call(arguments, 1)), function (r) {
			r in n && (t[r] = n[r])
		}), t
	}, j.defaults = function (n) {
		return _(a.call(arguments, 1), function (t) {
			for (var r in t) null == n[r] && (n[r] = t[r])
		}), n
	}, j.clone = function (n) {
		return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n
	}, j.tap = function (n, t) {
		return t(n), n
	}, j.isEqual = function (t, r) {
		return n(t, r, [])
	}, j.isEmpty = function (n) {
		if (null == n) return !0;
		if (j.isArray(n) || j.isString(n)) return 0 === n.length;
		for (var t in n)
			if (j.has(n, t)) return !1;
		return !0
	}, j.isElement = function (n) {
		return !(!n || 1 != n.nodeType)
	}, j.isArray = i || function (n) {
		return "[object Array]" == o.call(n)
	}, j.isObject = function (n) {
		return n === Object(n)
	}, j.isArguments = function (n) {
		return "[object Arguments]" == o.call(n)
	}, j.isArguments(arguments) || (j.isArguments = function (n) {
		return !(!n || !j.has(n, "callee"))
	}), j.isFunction = function (n) {
		return "[object Function]" == o.call(n)
	}, j.isString = function (n) {
		return "[object String]" == o.call(n)
	}, j.isNumber = function (n) {
		return "[object Number]" == o.call(n)
	}, j.isFinite = function (n) {
		return j.isNumber(n) && isFinite(n)
	}, j.isNaN = function (n) {
		return n !== n
	}, j.isBoolean = function (n) {
		return n === !0 || n === !1 || "[object Boolean]" == o.call(n)
	}, j.isDate = function (n) {
		return "[object Date]" == o.call(n)
	}, j.isRegExp = function (n) {
		return "[object RegExp]" == o.call(n)
	}, j.isNull = function (n) {
		return null === n
	}, j.isUndefined = function (n) {
		return void 0 === n
	}, j.has = function (n, t) {
		return l.call(n, t)
	}, j.noConflict = function () {
		return t._ = r, this
	}, j.identity = function (n) {
		return n
	}, j.times = function (n, t, r) {
		for (var e = 0; n > e; e++) t.call(r, e)
	}, j.escape = function (n) {
		return ("" + n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
	}, j.result = function (n, t) {
		if (null == n) return null;
		var r = n[t];
		return j.isFunction(r) ? r.call(n) : r
	}, j.mixin = function (n) {
		_(j.functions(n), function (t) {
			N(t, j[t] = n[t])
		})
	};
	var E = 0;
	j.uniqueId = function (n) {
		var t = E++;
		return n ? n + t : t
	}, j.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var O, F = /.^/,
		k = {
			"\\": "\\",
			"'": "'",
			r: "\r",
			n: "\n",
			t: "	",
			u2028: "\u2028",
			u2029: "\u2029"
		};
	for (O in k) k[k[O]] = O;
	var q = /\\|'|\r|\n|\t|\u2028|\u2029/g,
		S = /\\(\\|'|r|n|t|u2028|u2029)/g,
		R = function (n) {
			return n.replace(S, function (n, t) {
				return k[t]
			})
		};
	j.template = function (n, t, r) {
		r = j.defaults(r || {}, j.templateSettings), n = "__p+='" + n.replace(q, function (n) {
			return "\\" + k[n]
		}).replace(r.escape || F, function (n, t) {
			return "'+\n_.escape(" + R(t) + ")+\n'"
		}).replace(r.interpolate || F, function (n, t) {
			return "'+\n(" + R(t) + ")+\n'"
		}).replace(r.evaluate || F, function (n, t) {
			return "';\n" + R(t) + "\n;__p+='"
		}) + "';\n", r.variable || (n = "with(obj||{}){\n" + n + "}\n");
		var n = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + n + "return __p;\n",
			e = new Function(r.variable || "obj", "_", n);
		return t ? e(t, j) : (t = function (n) {
			return e.call(this, n, j)
		}, t.source = "function(" + (r.variable || "obj") + "){\n" + n + "}", t)
	}, j.chain = function (n) {
		return j(n).chain()
	};
	var I = function (n) {
		this._wrapped = n
	};
	j.prototype = I.prototype;
	var M = function (n, t) {
			return t ? j(n).chain() : n
		},
		N = function (n, t) {
			I.prototype[n] = function () {
				var n = a.call(arguments);
				return c.call(n, this._wrapped), M(t.apply(j, n), this._chain)
			}
		};
	j.mixin(j), _("pop,push,reverse,shift,sort,splice,unshift".split(","), function (n) {
		var t = u[n];
		I.prototype[n] = function () {
			var r = this._wrapped;
			t.apply(r, arguments);
			var e = r.length;
			return ("shift" == n || "splice" == n) && 0 === e && delete r[0], M(r, this._chain)
		}
	}), _(["concat", "join", "slice"], function (n) {
		var t = u[n];
		I.prototype[n] = function () {
			return M(t.apply(this._wrapped, arguments), this._chain)
		}
	}), I.prototype.chain = function () {
		return this._chain = !0, this
	}, I.prototype.value = function () {
		return this._wrapped
	}
}).call(this);
var Cookies = {
	get: function (e) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
	},
	set: function (e, n, o) {
		var t, r, c, s;
		if (o || (o = {}), t = null != o.expires ? o.expires : o.maxAge, r = o.path, c = o.domain, s = o.secure, !e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
		var i = "";
		if (t) switch (t.constructor) {
		case Number:
			i = 1 / 0 === t ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + t;
			break;
		case String:
			i = "; expires=" + t;
			break;
		case Date:
			i = "; expires=" + t.toUTCString()
		}
		return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(n) + i + (c ? "; domain=" + c : "") + (r ? "; path=" + r : "") + (s ? "; secure" : ""), !0
	},
	expire: function (e, n) {
		var o, t;
		return n || (n = {}), o = n.path, t = n.domain, e && Cookies.exists(e) ? (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (t ? "; domain=" + t : "") + (o ? "; path=" + o : ""), !0) : !1
	},
	exists: function (e) {
		return new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
	},
	keys: function () {
		for (var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), n = 0; n < e.length; n++) e[n] = decodeURIComponent(e[n]);
		return e
	}
};
! function (e) {
	function t() {
		var t = r(this);
		return isNaN(t.datetime) || e(this).text(a(t.datetime)), this
	}

	function r(t) {
		if (t = e(t), !t.data("timeago")) {
			t.data("timeago", {
				datetime: i.datetime(t)
			});
			var r = e.trim(t.text());
			r.length > 0 && t.attr("title", r)
		}
		return t.data("timeago")
	}

	function a(e) {
		return i.inWords(n(e))
	}

	function n(e) {
		return (new Date).getTime() - e.getTime()
	}
	e.timeago = function (t) {
		return a(t instanceof Date ? t : "string" == typeof t ? e.timeago.parse(t) : e.timeago.datetime(t))
	};
	var i = e.timeago;
	e.extend(e.timeago, {
		settings: {
			refreshMillis: 6e4,
			allowFuture: !1,
			strings: {
				prefixAgo: null,
				prefixFromNow: null,
				suffixAgo: "ago",
				suffixFromNow: "from now",
				seconds: "less than a minute",
				minute: "a minute",
				minutes: "%d minutes",
				hour: "an hour",
				hours: "%d hours",
				day: "a day",
				days: "%d days",
				month: "a month",
				months: "%d months",
				year: "a year",
				years: "%d years",
				numbers: []
			}
		},
		inWords: function (t) {
			function r(r, n) {
				var i = e.isFunction(r) ? r(n, t) : r,
					o = a.numbers && a.numbers[n] || n;
				return i.replace(/%d/i, o)
			}
			var a = this.settings.strings,
				n = a.prefixAgo,
				i = a.suffixAgo;
			this.settings.allowFuture && (0 > t && (n = a.prefixFromNow, i = a.suffixFromNow), t = Math.abs(t));
			var o = t / 1e3,
				s = o / 60,
				u = s / 60,
				m = u / 24,
				d = m / 365,
				f = 45 > o && r(a.seconds, Math.round(o)) || 90 > o && r(a.minute, 1) || 45 > s && r(a.minutes, Math.round(s)) || 90 > s && r(a.hour, 1) || 24 > u && r(a.hours, Math.round(u)) || 48 > u && r(a.day, 1) || 30 > m && r(a.days, Math.floor(m)) || 60 > m && r(a.month, 1) || 365 > m && r(a.months, Math.floor(m / 30)) || 2 > d && r(a.year, 1) || r(a.years, Math.floor(d));
			return e.trim([n, f, i].join(" "))
		},
		parse: function (t) {
			var r = e.trim(t);
			return r = r.replace(/\.\d\d\d+/, ""), r = r.replace(/-/, "/").replace(/-/, "/"), r = r.replace(/T/, " ").replace(/Z/, " UTC"), r = r.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(r)
		},
		datetime: function (t) {
			var r = "time" === e(t).get(0).tagName.toLowerCase(),
				a = e(t).attr(r ? "datetime" : "title");
			return i.parse(a)
		}
	}), e.fn.timeago = function () {
		var e = this;
		e.each(t);
		var r = i.settings;
		return r.refreshMillis > 0 && setInterval(function () {
			e.each(t)
		}, r.refreshMillis), e
	}, document.createElement("abbr"), document.createElement("time")
}(jQuery);
var dateFormat = function () {
	var t = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		e = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		a = /[^-+\dA-Z]/g,
		m = function (t, e) {
			for (t = String(t), e = e || 2; t.length < e;) t = "0" + t;
			return t
		};
	return function (d, n, r) {
		var y = dateFormat;
		if (1 != arguments.length || "[object String]" != Object.prototype.toString.call(d) || /\d/.test(d) || (n = d, d = void 0), d = d ? new Date(d) : new Date, isNaN(d)) throw SyntaxError("invalid date");
		n = String(y.masks[n] || n || y.masks["default"]), "UTC:" == n.slice(0, 4) && (n = n.slice(4), r = !0);
		var s = r ? "getUTC" : "get",
			i = d[s + "Date"](),
			o = d[s + "Day"](),
			u = d[s + "Month"](),
			M = d[s + "FullYear"](),
			l = d[s + "Hours"](),
			T = d[s + "Minutes"](),
			h = d[s + "Seconds"](),
			c = d[s + "Milliseconds"](),
			g = r ? 0 : d.getTimezoneOffset(),
			S = {
				d: i,
				dd: m(i),
				ddd: y.i18n.dayNames[o],
				dddd: y.i18n.dayNames[o + 7],
				m: u + 1,
				mm: m(u + 1),
				mmm: y.i18n.monthNames[u],
				mmmm: y.i18n.monthNames[u + 12],
				yy: String(M).slice(2),
				yyyy: M,
				h: l % 12 || 12,
				hh: m(l % 12 || 12),
				H: l,
				HH: m(l),
				M: T,
				MM: m(T),
				s: h,
				ss: m(h),
				l: m(c, 3),
				L: m(c > 99 ? Math.round(c / 10) : c),
				t: 12 > l ? "a" : "p",
				tt: 12 > l ? "am" : "pm",
				T: 12 > l ? "A" : "P",
				TT: 12 > l ? "AM" : "PM",
				Z: r ? "UTC" : (String(d).match(e) || [""]).pop().replace(a, ""),
				o: (g > 0 ? "-" : "+") + m(100 * Math.floor(Math.abs(g) / 60) + Math.abs(g) % 60, 4),
				S: ["th", "st", "nd", "rd"][i % 10 > 3 ? 0 : (i % 100 - i % 10 != 10) * i % 10]
			};
		return n.replace(t, function (t) {
			return t in S ? S[t] : t.slice(1, t.length - 1)
		})
	}
}();
dateFormat.masks = {
	"default": "ddd mmm dd yyyy HH:MM:ss",
	shortDate: "m/d/yy",
	mediumDate: "mmm d, yyyy",
	longDate: "mmmm d, yyyy",
	fullDate: "dddd, mmmm d, yyyy",
	shortTime: "h:MM TT",
	mediumTime: "h:MM:ss TT",
	longTime: "h:MM:ss TT Z",
	isoDate: "yyyy-mm-dd",
	isoTime: "HH:MM:ss",
	isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
}, dateFormat.i18n = {
	dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, Date.prototype.format = function (t, e) {
	return dateFormat(this, t, e)
};
var hljs = new function () {
	function e(e) {
		return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
	}

	function t(e) {
		return e.nodeName.toLowerCase()
	}

	function r(e, t) {
		var r = e && e.exec(t);
		return r && 0 == r.index
	}

	function i(e) {
		return Array.prototype.map.call(e.childNodes, function (e) {
			return 3 == e.nodeType ? f.useBR ? e.nodeValue.replace(/\n/g, "") : e.nodeValue : "br" == t(e) ? "\n" : i(e)
		}).join("")
	}

	function n(e) {
		var t = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);
		return t = t.map(function (e) {
			return e.replace(/^language-/, "")
		}), t.filter(function (e) {
			return S(e) || "no-highlight" == e
		})[0]
	}

	function a(e, t) {
		var r = {};
		for (var i in e) r[i] = e[i];
		if (t)
			for (var i in t) r[i] = t[i];
		return r
	}

	function o(e) {
		var r = [];
		return function i(e, n) {
			for (var a = e.firstChild; a; a = a.nextSibling) 3 == a.nodeType ? n += a.nodeValue.length : "br" == t(a) ? n += 1 : 1 == a.nodeType && (r.push({
				event: "start",
				offset: n,
				node: a
			}), n = i(a, n), r.push({
				event: "stop",
				offset: n,
				node: a
			}));
			return n
		}(e, 0), r
	}

	function s(r, i, n) {
		function a() {
			return r.length && i.length ? r[0].offset != i[0].offset ? r[0].offset < i[0].offset ? r : i : "start" == i[0].event ? r : i : r.length ? r : i
		}

		function o(r) {
			function i(t) {
				return " " + t.nodeName + '="' + e(t.value) + '"'
			}
			u += "<" + t(r) + Array.prototype.map.call(r.attributes, i).join("") + ">"
		}

		function s(e) {
			u += "</" + t(e) + ">"
		}

		function l(e) {
			("start" == e.event ? o : s)(e.node)
		}
		for (var c = 0, u = "", d = []; r.length || i.length;) {
			var p = a();
			if (u += e(n.substr(c, p[0].offset - c)), c = p[0].offset, p == r) {
				d.reverse().forEach(s);
				do l(p.splice(0, 1)[0]), p = a(); while (p == r && p.length && p[0].offset == c);
				d.reverse().forEach(o)
			} else "start" == p[0].event ? d.push(p[0].node) : d.pop(), l(p.splice(0, 1)[0])
		}
		return u + e(n.substr(c))
	}

	function l(e) {
		function t(e) {
			return e && e.source || e
		}

		function r(r, i) {
			return RegExp(t(r), "m" + (e.cI ? "i" : "") + (i ? "g" : ""))
		}

		function i(n, o) {
			function s(t, r) {
				e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function (e) {
					var r = e.split("|");
					l[r[0]] = [t, r[1] ? Number(r[1]) : 1]
				})
			}
			if (!n.compiled) {
				if (n.compiled = !0, n.k = n.k || n.bK, n.k) {
					var l = {};
					"string" == typeof n.k ? s("keyword", n.k) : Object.keys(n.k).forEach(function (e) {
						s(e, n.k[e])
					}), n.k = l
				}
				n.lR = r(n.l || /\b[A-Za-z0-9_]+\b/, !0), o && (n.bK && (n.b = n.bK.split(" ").join("|")), n.b || (n.b = /\B|\b/), n.bR = r(n.b), n.e || n.eW || (n.e = /\B|\b/), n.e && (n.eR = r(n.e)), n.tE = t(n.e) || "", n.eW && o.tE && (n.tE += (n.e ? "|" : "") + o.tE)), n.i && (n.iR = r(n.i)), void 0 === n.r && (n.r = 1), n.c || (n.c = []);
				var c = [];
				n.c.forEach(function (e) {
					e.v ? e.v.forEach(function (t) {
						c.push(a(e, t))
					}) : c.push("self" == e ? n : e)
				}), n.c = c, n.c.forEach(function (e) {
					i(e, n)
				}), n.starts && i(n.starts, o);
				var u = n.c.map(function (e) {
					return e.bK ? "\\.?\\b(" + e.b + ")\\b\\.?" : e.b
				}).concat([n.tE]).concat([n.i]).map(t).filter(Boolean);
				n.t = u.length ? r(u.join("|"), !0) : {
					exec: function () {
						return null
					}
				}, n.continuation = {}
			}
		}
		i(e)
	}

	function c(t, i, n, a) {
		function o(e, t) {
			for (var i = 0; i < t.c.length; i++)
				if (r(t.c[i].bR, e)) return t.c[i]
		}

		function s(e, t) {
			return r(e.eR, t) ? e : e.eW ? s(e.parent, t) : void 0
		}

		function d(e, t) {
			return !n && r(t.iR, e)
		}

		function p(e, t) {
			var r = v.cI ? t[0].toLowerCase() : t[0];
			return e.k.hasOwnProperty(r) && e.k[r]
		}

		function m(e, t, r, i) {
			var n = i ? "" : f.classPrefix,
				a = '<span class="' + n,
				o = r ? "" : "</span>";
			return a += e + '">', a + t + o
		}

		function g() {
			var t = e(M);
			if (!N.k) return t;
			var r = "",
				i = 0;
			N.lR.lastIndex = 0;
			for (var n = N.lR.exec(t); n;) {
				r += t.substr(i, n.index - i);
				var a = p(N, n);
				a ? (F += a[1], r += m(a[0], n[0])) : r += n[0], i = N.lR.lastIndex, n = N.lR.exec(t)
			}
			return r + t.substr(i)
		}

		function b() {
			if (N.sL && !y[N.sL]) return e(M);
			var t = N.sL ? c(N.sL, M, !0, N.continuation.top) : u(M);
			return N.r > 0 && (F += t.r), "continuous" == N.subLanguageMode && (N.continuation.top = t.top), m(t.language, t.value, !1, !0)
		}

		function h() {
			return void 0 !== N.sL ? b() : g()
		}

		function C(t, r) {
			var i = t.cN ? m(t.cN, "", !0) : "";
			t.rB ? (x += i, M = "") : t.eB ? (x += e(r) + i, M = "") : (x += i, M = r), N = Object.create(t, {
				parent: {
					value: N
				}
			})
		}

		function D(t, r) {
			if (M += t, void 0 === r) return x += h(), 0;
			var i = o(r, N);
			if (i) return x += h(), C(i, r), i.rB ? 0 : r.length;
			var n = s(N, r);
			if (n) {
				var a = N;
				a.rE || a.eE || (M += r), x += h();
				do N.cN && (x += "</span>"), F += N.r, N = N.parent; while (N != n.parent);
				return a.eE && (x += e(r)), M = "", n.starts && C(n.starts, ""), a.rE ? 0 : r.length
			}
			if (d(r, N)) throw new Error('Illegal lexeme "' + r + '" for mode "' + (N.cN || "<unnamed>") + '"');
			return M += r, r.length || 1
		}
		var v = S(t);
		if (!v) throw new Error('Unknown language: "' + t + '"');
		l(v);
		for (var N = a || v, x = "", P = N; P != v; P = P.parent) P.cN && (x = m(P.cN, x, !0));
		var M = "",
			F = 0;
		try {
			for (var L, k, B = 0;;) {
				if (N.t.lastIndex = B, L = N.t.exec(i), !L) break;
				k = D(i.substr(B, L.index - B), L[0]), B = L.index + k
			}
			D(i.substr(B));
			for (var P = N; P.parent; P = P.parent) P.cN && (x += "</span>");
			return {
				r: F,
				value: x,
				language: t,
				top: N
			}
		} catch (T) {
			if (-1 != T.message.indexOf("Illegal")) return {
				r: 0,
				value: e(i)
			};
			throw T
		}
	}

	function u(t, r) {
		r = r || f.languages || Object.keys(y);
		var i = {
				r: 0,
				value: e(t)
			},
			n = i;
		return r.forEach(function (e) {
			if (S(e)) {
				var r = c(e, t, !1);
				r.language = e, r.r > n.r && (n = r), r.r > i.r && (n = i, i = r)
			}
		}), n.language && (i.second_best = n), i
	}

	function d(e) {
		return f.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, t) {
			return t.replace(/\t/g, f.tabReplace)
		})), f.useBR && (e = e.replace(/\n/g, "<br>")), e
	}

	function p(e) {
		var t = i(e),
			r = n(e);
		if ("no-highlight" != r) {
			var a = r ? c(r, t, !0) : u(t),
				l = o(e);
			if (l.length) {
				var p = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
				p.innerHTML = a.value, a.value = s(l, o(p), t)
			}
			a.value = d(a.value), e.innerHTML = a.value, e.className += " hljs " + (!r && a.language || ""), e.result = {
				language: a.language,
				re: a.r
			}, a.second_best && (e.second_best = {
				language: a.second_best.language,
				re: a.second_best.r
			})
		}
	}

	function m(e) {
		f = a(f, e)
	}

	function g() {
		if (!g.called) {
			g.called = !0;
			var e = document.querySelectorAll("pre code");
			Array.prototype.forEach.call(e, p)
		}
	}

	function b() {
		addEventListener("DOMContentLoaded", g, !1), addEventListener("load", g, !1)
	}

	function h(e, t) {
		var r = y[e] = t(this);
		r.aliases && r.aliases.forEach(function (t) {
			C[t] = e
		})
	}

	function S(e) {
		return y[e] || y[C[e]]
	}
	var f = {
			classPrefix: "hljs-",
			tabReplace: null,
			useBR: !1,
			languages: void 0
		},
		y = {},
		C = {};
	this.highlight = c, this.highlightAuto = u, this.fixMarkup = d, this.highlightBlock = p, this.configure = m, this.initHighlighting = g, this.initHighlightingOnLoad = b, this.registerLanguage = h, this.getLanguage = S, this.inherit = a, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", this.BE = {
		b: "\\\\[\\s\\S]",
		r: 0
	}, this.ASM = {
		cN: "string",
		b: "'",
		e: "'",
		i: "\\n",
		c: [this.BE]
	}, this.QSM = {
		cN: "string",
		b: '"',
		e: '"',
		i: "\\n",
		c: [this.BE]
	}, this.CLCM = {
		cN: "comment",
		b: "//",
		e: "$"
	}, this.CBLCLM = {
		cN: "comment",
		b: "/\\*",
		e: "\\*/"
	}, this.HCM = {
		cN: "comment",
		b: "#",
		e: "$"
	}, this.NM = {
		cN: "number",
		b: this.NR,
		r: 0
	}, this.CNM = {
		cN: "number",
		b: this.CNR,
		r: 0
	}, this.BNM = {
		cN: "number",
		b: this.BNR,
		r: 0
	}, this.REGEXP_MODE = {
		cN: "regexp",
		b: /\//,
		e: /\/[gim]*/,
		i: /\n/,
		c: [this.BE, {
			b: /\[/,
			e: /\]/,
			r: 0,
			c: [this.BE]
		}]
	}, this.TM = {
		cN: "title",
		b: this.IR,
		r: 0
	}, this.UTM = {
		cN: "title",
		b: this.UIR,
		r: 0
	}
};
hljs.registerLanguage("bash", function (e) {
	var t = {
			cN: "variable",
			v: [{
				b: /\$[\w\d#@][\w\d_]*/
			}, {
				b: /\$\{(.*?)\}/
			}]
		},
		r = {
			cN: "string",
			b: /"/,
			e: /"/,
			c: [e.BE, t, {
				cN: "variable",
				b: /\$\(/,
				e: /\)/,
				c: [e.BE]
			}]
		},
		i = {
			cN: "string",
			b: /'/,
			e: /'/
		};
	return {
		l: /-?[a-z\.]+/,
		k: {
			keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec",
			literal: "true false",
			built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",
			operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
		},
		c: [{
				cN: "shebang",
				b: /^#![^\n]+sh\s*$/,
				r: 10
			}, {
				cN: "function",
				b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
				rB: !0,
				c: [e.inherit(e.TM, {
					b: /\w[\w\d_]*/
				})],
				r: 0
			},
			e.HCM, e.NM, r, i, t
		]
	}
}), hljs.registerLanguage("erlang", function (e) {
	var t = "[a-z'][a-zA-Z0-9_']*",
		r = "(" + t + ":" + t + "|" + t + ")",
		i = {
			keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun let not of orelse|10 query receive rem try when xor",
			literal: "false true"
		},
		n = {
			cN: "comment",
			b: "%",
			e: "$",
			r: 0
		},
		a = {
			cN: "number",
			b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
			r: 0
		},
		o = {
			b: "fun\\s+" + t + "/\\d+"
		},
		s = {
			b: r + "\\(",
			e: "\\)",
			rB: !0,
			r: 0,
			c: [{
				cN: "function_name",
				b: r,
				r: 0
			}, {
				b: "\\(",
				e: "\\)",
				eW: !0,
				rE: !0,
				r: 0
			}]
		},
		l = {
			cN: "tuple",
			b: "{",
			e: "}",
			r: 0
		},
		c = {
			cN: "variable",
			b: "\\b_([A-Z][A-Za-z0-9_]*)?",
			r: 0
		},
		u = {
			cN: "variable",
			b: "[A-Z][a-zA-Z0-9_]*",
			r: 0
		},
		d = {
			b: "#" + e.UIR,
			r: 0,
			rB: !0,
			c: [{
				cN: "record_name",
				b: "#" + e.UIR,
				r: 0
			}, {
				b: "{",
				e: "}",
				r: 0
			}]
		},
		p = {
			bK: "fun receive if try case",
			e: "end",
			k: i
		};
	p.c = [n, o, e.inherit(e.ASM, {
		cN: ""
	}), p, s, e.QSM, a, l, c, u, d];
	var m = [n, o, p, s, e.QSM, a, l, c, u, d];
	s.c[1].c = m, l.c = m, d.c[1].c = m;
	var g = {
		cN: "params",
		b: "\\(",
		e: "\\)",
		c: m
	};
	return {
		k: i,
		i: "(</|\\*=|\\+=|-=|/=|/\\*|\\*/|\\(\\*|\\*\\))",
		c: [{
				cN: "function",
				b: "^" + t + "\\s*\\(",
				e: "->",
				rB: !0,
				i: "\\(|#|//|/\\*|\\\\|:|;",
				c: [g, e.inherit(e.TM, {
					b: t
				})],
				starts: {
					e: ";|\\.",
					k: i,
					c: m
				}
			},
			n, {
				cN: "pp",
				b: "^-",
				e: "\\.",
				r: 0,
				eE: !0,
				rB: !0,
				l: "-" + e.IR,
				k: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior",
				c: [g]
			},
			a, e.QSM, d, c, u, l
		]
	}
}), hljs.registerLanguage("cs", function (e) {
	var t = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";
	return {
		k: t,
		c: [{
				cN: "comment",
				b: "///",
				e: "$",
				rB: !0,
				c: [{
					cN: "xmlDocTag",
					b: "///|<!--|-->"
				}, {
					cN: "xmlDocTag",
					b: "</?",
					e: ">"
				}]
			},
			e.CLCM, e.CBLCLM, {
				cN: "preprocessor",
				b: "#",
				e: "$",
				k: "if else elif endif define undef warning error line region endregion pragma checksum"
			}, {
				cN: "string",
				b: '@"',
				e: '"',
				c: [{
					b: '""'
				}]
			},
			e.ASM, e.QSM, e.CNM, {
				bK: "protected public private internal",
				e: /[{;=]/,
				k: t,
				c: [{
					bK: "class namespace interface",
					starts: {
						c: [e.TM]
					}
				}, {
					b: e.IR + "\\s*\\(",
					rB: !0,
					c: [e.TM]
				}]
			}
		]
	}
}), hljs.registerLanguage("brainfuck", function () {
	var e = {
		cN: "literal",
		b: "[\\+\\-]",
		r: 0
	};
	return {
		c: [{
				cN: "comment",
				b: "[^\\[\\]\\.,\\+\\-<> \r\n]",
				rE: !0,
				e: "[\\[\\]\\.,\\+\\-<> \r\n]",
				r: 0
			}, {
				cN: "title",
				b: "[\\[\\]]",
				r: 0
			}, {
				cN: "string",
				b: "[\\.,]",
				r: 0
			}, {
				b: /\+\+|\-\-/,
				rB: !0,
				c: [e]
			},
			e
		]
	}
}), hljs.registerLanguage("ruby", function (e) {
	var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
		r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
		i = {
			cN: "yardoctag",
			b: "@[A-Za-z]+"
		},
		n = {
			cN: "comment",
			v: [{
				b: "#",
				e: "$",
				c: [i]
			}, {
				b: "^\\=begin",
				e: "^\\=end",
				c: [i],
				r: 10
			}, {
				b: "^__END__",
				e: "\\n$"
			}]
		},
		a = {
			cN: "subst",
			b: "#\\{",
			e: "}",
			k: r
		},
		o = {
			cN: "string",
			c: [e.BE, a],
			v: [{
				b: /'/,
				e: /'/
			}, {
				b: /"/,
				e: /"/
			}, {
				b: "%[qw]?\\(",
				e: "\\)"
			}, {
				b: "%[qw]?\\[",
				e: "\\]"
			}, {
				b: "%[qw]?{",
				e: "}"
			}, {
				b: "%[qw]?<",
				e: ">",
				r: 10
			}, {
				b: "%[qw]?/",
				e: "/",
				r: 10
			}, {
				b: "%[qw]?%",
				e: "%",
				r: 10
			}, {
				b: "%[qw]?-",
				e: "-",
				r: 10
			}, {
				b: "%[qw]?\\|",
				e: "\\|",
				r: 10
			}, {
				b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
			}]
		},
		s = {
			cN: "params",
			b: "\\(",
			e: "\\)",
			k: r
		},
		l = [o, n, {
			cN: "class",
			bK: "class module",
			e: "$|;",
			i: /=/,
			c: [e.inherit(e.TM, {
					b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
				}), {
					cN: "inheritance",
					b: "<\\s*",
					c: [{
						cN: "parent",
						b: "(" + e.IR + "::)?" + e.IR
					}]
				},
				n
			]
		}, {
			cN: "function",
			bK: "def",
			e: " |$|;",
			r: 0,
			c: [e.inherit(e.TM, {
				b: t
			}), s, n]
		}, {
			cN: "constant",
			b: "(::)?(\\b[A-Z]\\w*(::)?)+",
			r: 0
		}, {
			cN: "symbol",
			b: ":",
			c: [o, {
				b: t
			}],
			r: 0
		}, {
			cN: "symbol",
			b: e.UIR + "(\\!|\\?)?:",
			r: 0
		}, {
			cN: "number",
			b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
			r: 0
		}, {
			cN: "variable",
			b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
		}, {
			b: "(" + e.RSR + ")\\s*",
			c: [n, {
				cN: "regexp",
				c: [e.BE, a],
				i: /\n/,
				v: [{
					b: "/",
					e: "/[a-z]*"
				}, {
					b: "%r{",
					e: "}[a-z]*"
				}, {
					b: "%r\\(",
					e: "\\)[a-z]*"
				}, {
					b: "%r!",
					e: "![a-z]*"
				}, {
					b: "%r\\[",
					e: "\\][a-z]*"
				}]
			}],
			r: 0
		}];
	return a.c = l, s.c = l, {
		k: r,
		c: l
	}
}), hljs.registerLanguage("rust", function (e) {
	var t = {
			cN: "number",
			b: "\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)",
			r: 0
		},
		r = "assert bool break char check claim comm const cont copy dir do drop else enum extern export f32 f64 fail false float fn for i16 i32 i64 i8 if impl int let log loop match mod move mut priv pub pure ref return self static str struct task true trait type u16 u32 u64 u8 uint unsafe use vec while";
	return {
		k: r,
		i: "</",
		c: [e.CLCM, e.CBLCLM, e.inherit(e.QSM, {
			i: null
		}), e.ASM, t, {
			cN: "function",
			bK: "fn",
			e: "(\\(|<)",
			c: [e.UTM]
		}, {
			cN: "preprocessor",
			b: "#\\[",
			e: "\\]"
		}, {
			bK: "type",
			e: "(=|<)",
			c: [e.UTM],
			i: "\\S"
		}, {
			bK: "trait enum",
			e: "({|<)",
			c: [e.UTM],
			i: "\\S"
		}]
	}
}), hljs.registerLanguage("diff", function () {
	return {
		c: [{
			cN: "chunk",
			r: 10,
			v: [{
				b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
			}, {
				b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
			}, {
				b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
			}]
		}, {
			cN: "header",
			v: [{
				b: /Index: /,
				e: /$/
			}, {
				b: /=====/,
				e: /=====$/
			}, {
				b: /^\-\-\-/,
				e: /$/
			}, {
				b: /^\*{3} /,
				e: /$/
			}, {
				b: /^\+\+\+/,
				e: /$/
			}, {
				b: /\*{5}/,
				e: /\*{5}$/
			}]
		}, {
			cN: "addition",
			b: "^\\+",
			e: "$"
		}, {
			cN: "deletion",
			b: "^\\-",
			e: "$"
		}, {
			cN: "change",
			b: "^\\!",
			e: "$"
		}]
	}
}), hljs.registerLanguage("haml", function () {
	return {
		cI: !0,
		c: [{
			cN: "doctype",
			b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
			r: 10
		}, {
			cN: "comment",
			b: "^\\s*(!=#|=#|-#|/).*$",
			r: 0
		}, {
			b: "^\\s*(-|=|!=)(?!#)",
			starts: {
				e: "\\n",
				sL: "ruby"
			}
		}, {
			cN: "tag",
			b: "^\\s*%",
			c: [{
				cN: "title",
				b: "\\w+"
			}, {
				cN: "value",
				b: "[#\\.]\\w+"
			}, {
				b: "{\\s*",
				e: "\\s*}",
				eE: !0,
				c: [{
					b: ":\\w+\\s*=>",
					e: ",\\s+",
					rB: !0,
					eW: !0,
					c: [{
						cN: "symbol",
						b: ":\\w+"
					}, {
						cN: "string",
						b: '"',
						e: '"'
					}, {
						cN: "string",
						b: "'",
						e: "'"
					}, {
						b: "\\w+",
						r: 0
					}]
				}]
			}, {
				b: "\\(\\s*",
				e: "\\s*\\)",
				eE: !0,
				c: [{
					b: "\\w+\\s*=",
					e: "\\s+",
					rB: !0,
					eW: !0,
					c: [{
						cN: "attribute",
						b: "\\w+",
						r: 0
					}, {
						cN: "string",
						b: '"',
						e: '"'
					}, {
						cN: "string",
						b: "'",
						e: "'"
					}, {
						b: "\\w+",
						r: 0
					}]
				}]
			}]
		}, {
			cN: "bullet",
			b: "^\\s*[=~]\\s*",
			r: 0
		}, {
			b: "#{",
			starts: {
				e: "}",
				sL: "ruby"
			}
		}]
	}
}), hljs.registerLanguage("javascript", function (e) {
	return {
		aliases: ["js"],
		k: {
			keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
			literal: "true false null undefined NaN Infinity",
			built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
		},
		c: [{
				cN: "pi",
				b: /^\s*('|")use strict('|")/,
				r: 10
			},
			e.ASM, e.QSM, e.CLCM, e.CBLCLM, e.CNM, {
				b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
				k: "return throw case",
				c: [e.CLCM, e.CBLCLM, e.REGEXP_MODE, {
					b: /</,
					e: />;/,
					r: 0,
					sL: "xml"
				}],
				r: 0
			}, {
				cN: "function",
				bK: "function",
				e: /\{/,
				c: [e.inherit(e.TM, {
					b: /[A-Za-z$_][0-9A-Za-z$_]*/
				}), {
					cN: "params",
					b: /\(/,
					e: /\)/,
					c: [e.CLCM, e.CBLCLM],
					i: /["'\(]/
				}],
				i: /\[|%/
			}, {
				b: /\$[(.]/
			}, {
				b: "\\." + e.IR,
				r: 0
			}
		]
	}
}), hljs.registerLanguage("lua", function (e) {
	var t = "\\[=*\\[",
		r = "\\]=*\\]",
		i = {
			b: t,
			e: r,
			c: ["self"]
		},
		n = [{
			cN: "comment",
			b: "--(?!" + t + ")",
			e: "$"
		}, {
			cN: "comment",
			b: "--" + t,
			e: r,
			c: [i],
			r: 10
		}];
	return {
		l: e.UIR,
		k: {
			keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
			built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
		},
		c: n.concat([{
				cN: "function",
				bK: "function",
				e: "\\)",
				c: [e.inherit(e.TM, {
					b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
				}), {
					cN: "params",
					b: "\\(",
					eW: !0,
					c: n
				}].concat(n)
			},
			e.CNM, e.ASM, e.QSM, {
				cN: "string",
				b: t,
				e: r,
				c: [i],
				r: 10
			}
		])
	}
}), hljs.registerLanguage("xml", function () {
	var e = "[A-Za-z0-9\\._:-]+",
		t = {
			b: /<\?(php)?(?!\w)/,
			e: /\?>/,
			sL: "php",
			subLanguageMode: "continuous"
		},
		r = {
			eW: !0,
			i: /</,
			r: 0,
			c: [t, {
				cN: "attribute",
				b: e,
				r: 0
			}, {
				b: "=",
				r: 0,
				c: [{
					cN: "value",
					v: [{
						b: /"/,
						e: /"/
					}, {
						b: /'/,
						e: /'/
					}, {
						b: /[^\s\/>]+/
					}]
				}]
			}]
		};
	return {
		aliases: ["html"],
		cI: !0,
		c: [{
				cN: "doctype",
				b: "<!DOCTYPE",
				e: ">",
				r: 10,
				c: [{
					b: "\\[",
					e: "\\]"
				}]
			}, {
				cN: "comment",
				b: "<!--",
				e: "-->",
				r: 10
			}, {
				cN: "cdata",
				b: "<\\!\\[CDATA\\[",
				e: "\\]\\]>",
				r: 10
			}, {
				cN: "tag",
				b: "<style(?=\\s|>|$)",
				e: ">",
				k: {
					title: "style"
				},
				c: [r],
				starts: {
					e: "</style>",
					rE: !0,
					sL: "css"
				}
			}, {
				cN: "tag",
				b: "<script(?=\\s|>|$)",
				e: ">",
				k: {
					title: "script"
				},
				c: [r],
				starts: {
					e: "</script>",
					rE: !0,
					sL: "javascript"
				}
			}, {
				b: "<%",
				e: "%>",
				sL: "vbscript"
			},
			t, {
				cN: "pi",
				b: /<\?\w+/,
				e: /\?>/,
				r: 10
			}, {
				cN: "tag",
				b: "</?",
				e: "/?>",
				c: [{
						cN: "title",
						b: "[^ /><]+",
						r: 0
					},
					r
				]
			}
		]
	}
}), hljs.registerLanguage("markdown", function () {
	return {
		c: [{
			cN: "header",
			v: [{
				b: "^#{1,6}",
				e: "$"
			}, {
				b: "^.+?\\n[=-]{2,}$"
			}]
		}, {
			b: "<",
			e: ">",
			sL: "xml",
			r: 0
		}, {
			cN: "bullet",
			b: "^([*+-]|(\\d+\\.))\\s+"
		}, {
			cN: "strong",
			b: "[*_]{2}.+?[*_]{2}"
		}, {
			cN: "emphasis",
			v: [{
				b: "\\*.+?\\*"
			}, {
				b: "_.+?_",
				r: 0
			}]
		}, {
			cN: "blockquote",
			b: "^>\\s+",
			e: "$"
		}, {
			cN: "code",
			v: [{
				b: "`.+?`"
			}, {
				b: "^( {4}|	)",
				e: "$",
				r: 0
			}]
		}, {
			cN: "horizontal_rule",
			b: "^[-\\*]{3,}",
			e: "$"
		}, {
			b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",
			rB: !0,
			c: [{
				cN: "link_label",
				b: "\\[",
				e: "\\]",
				eB: !0,
				rE: !0,
				r: 0
			}, {
				cN: "link_url",
				b: "\\]\\(",
				e: "\\)",
				eB: !0,
				eE: !0
			}, {
				cN: "link_reference",
				b: "\\]\\[",
				e: "\\]",
				eB: !0,
				eE: !0
			}],
			r: 10
		}, {
			b: "^\\[.+\\]:",
			e: "$",
			rB: !0,
			c: [{
				cN: "link_reference",
				b: "\\[",
				e: "\\]",
				eB: !0,
				eE: !0
			}, {
				cN: "link_url",
				b: "\\s",
				e: "$"
			}]
		}]
	}
}), hljs.registerLanguage("css", function (e) {
	var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
		r = {
			cN: "function",
			b: t + "\\(",
			e: "\\)",
			c: ["self", e.NM, e.ASM, e.QSM]
		};
	return {
		cI: !0,
		i: "[=/|']",
		c: [e.CBLCLM, {
			cN: "id",
			b: "\\#[A-Za-z0-9_-]+"
		}, {
			cN: "class",
			b: "\\.[A-Za-z0-9_-]+",
			r: 0
		}, {
			cN: "attr_selector",
			b: "\\[",
			e: "\\]",
			i: "$"
		}, {
			cN: "pseudo",
			b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
		}, {
			cN: "at_rule",
			b: "@(font-face|page)",
			l: "[a-z-]+",
			k: "font-face page"
		}, {
			cN: "at_rule",
			b: "@",
			e: "[{;]",
			c: [{
				cN: "keyword",
				b: /\S+/
			}, {
				b: /\s/,
				eW: !0,
				eE: !0,
				r: 0,
				c: [r, e.ASM, e.QSM, e.NM]
			}]
		}, {
			cN: "tag",
			b: t,
			r: 0
		}, {
			cN: "rules",
			b: "{",
			e: "}",
			i: "[^\\s]",
			r: 0,
			c: [e.CBLCLM, {
				cN: "rule",
				b: "[^\\s]",
				rB: !0,
				e: ";",
				eW: !0,
				c: [{
					cN: "attribute",
					b: "[A-Z\\_\\.\\-]+",
					e: ":",
					eE: !0,
					i: "[^\\s]",
					starts: {
						cN: "value",
						eW: !0,
						eE: !0,
						c: [r, e.NM, e.QSM, e.ASM, e.CBLCLM, {
							cN: "hexcolor",
							b: "#[0-9A-Fa-f]+"
						}, {
							cN: "important",
							b: "!important"
						}]
					}
				}]
			}]
		}]
	}
}), hljs.registerLanguage("lisp", function (e) {
	var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*",
		r = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?",
		i = {
			cN: "shebang",
			b: "^#!",
			e: "$"
		},
		n = {
			cN: "literal",
			b: "\\b(t{1}|nil)\\b"
		},
		a = {
			cN: "number",
			v: [{
				b: r,
				r: 0
			}, {
				b: "#b[0-1]+(/[0-1]+)?"
			}, {
				b: "#o[0-7]+(/[0-7]+)?"
			}, {
				b: "#x[0-9a-f]+(/[0-9a-f]+)?"
			}, {
				b: "#c\\(" + r + " +" + r,
				e: "\\)"
			}]
		},
		o = e.inherit(e.QSM, {
			i: null
		}),
		s = {
			cN: "comment",
			b: ";",
			e: "$"
		},
		l = {
			cN: "variable",
			b: "\\*",
			e: "\\*"
		},
		c = {
			cN: "keyword",
			b: "[:&]" + t
		},
		u = {
			b: "\\(",
			e: "\\)",
			c: ["self", n, o, a]
		},
		d = {
			cN: "quoted",
			c: [a, o, l, c, u],
			v: [{
				b: "['`]\\(",
				e: "\\)"
			}, {
				b: "\\(quote ",
				e: "\\)",
				k: {
					title: "quote"
				}
			}]
		},
		p = {
			cN: "list",
			b: "\\(",
			e: "\\)"
		},
		m = {
			eW: !0,
			r: 0
		};
	return p.c = [{
			cN: "title",
			b: t
		},
		m
	], m.c = [d, p, n, a, o, s, l, c], {
		i: /\S/,
		c: [a, i, n, o, s, d, p]
	}
}), hljs.registerLanguage("profile", function (e) {
	return {
		c: [e.CNM, {
				cN: "built_in",
				b: "{",
				e: "}$",
				eB: !0,
				eE: !0,
				c: [e.ASM, e.QSM],
				r: 0
			}, {
				cN: "filename",
				b: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
				e: ":",
				eE: !0
			}, {
				cN: "header",
				b: "(ncalls|tottime|cumtime)",
				e: "$",
				k: "ncalls tottime|10 cumtime|10 filename",
				r: 10
			}, {
				cN: "summary",
				b: "function calls",
				e: "$",
				c: [e.CNM],
				r: 10
			},
			e.ASM, e.QSM, {
				cN: "function",
				b: "\\(",
				e: "\\)$",
				c: [e.UTM],
				r: 0
			}
		]
	}
}), hljs.registerLanguage("http", function () {
	return {
		i: "\\S",
		c: [{
			cN: "status",
			b: "^HTTP/[0-9\\.]+",
			e: "$",
			c: [{
				cN: "number",
				b: "\\b\\d{3}\\b"
			}]
		}, {
			cN: "request",
			b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
			rB: !0,
			e: "$",
			c: [{
				cN: "string",
				b: " ",
				e: " ",
				eB: !0,
				eE: !0
			}]
		}, {
			cN: "attribute",
			b: "^\\w",
			e: ": ",
			eE: !0,
			i: "\\n|\\s|=",
			starts: {
				cN: "string",
				e: "$"
			}
		}, {
			b: "\\n\\n",
			starts: {
				sL: "",
				eW: !0
			}
		}]
	}
}), hljs.registerLanguage("java", function (e) {
	var t = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";
	return {
		k: t,
		i: /<\//,
		c: [{
				cN: "javadoc",
				b: "/\\*\\*",
				e: "\\*/",
				c: [{
					cN: "javadoctag",
					b: "(^|\\s)@[A-Za-z]+"
				}],
				r: 10
			},
			e.CLCM, e.CBLCLM, e.ASM, e.QSM, {
				bK: "protected public private",
				e: /[{;=]/,
				k: t,
				c: [{
					cN: "class",
					bK: "class interface",
					eW: !0,
					i: /[:"<>]/,
					c: [{
							bK: "extends implements",
							r: 10
						},
						e.UTM
					]
				}, {
					b: e.UIR + "\\s*\\(",
					rB: !0,
					c: [e.UTM]
				}]
			},
			e.CNM, {
				cN: "annotation",
				b: "@[A-Za-z]+"
			}
		]
	}
}), hljs.registerLanguage("fsharp", function (e) {
	return {
		k: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
		c: [{
				cN: "string",
				b: '@"',
				e: '"',
				c: [{
					b: '""'
				}]
			}, {
				cN: "string",
				b: '"""',
				e: '"""'
			}, {
				cN: "comment",
				b: "\\(\\*",
				e: "\\*\\)"
			}, {
				cN: "class",
				bK: "type",
				e: "\\(|=|$",
				c: [e.UTM]
			}, {
				cN: "annotation",
				b: "\\[<",
				e: ">\\]"
			}, {
				cN: "attribute",
				b: "\\B('[A-Za-z])\\b",
				c: [e.BE]
			},
			e.CLCM, e.inherit(e.QSM, {
				i: null
			}), e.CNM
		]
	}
}), hljs.registerLanguage("mathematica", function (e) {
	return {
		aliases: ["mma"],
		l: "(\\$|\\b)" + e.IR + "\\b",
		k: "AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine Transparent UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian XMLElement XMLObject Xnor Xor Yellow YuleDissimilarity ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform $Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber",
		c: [{
				cN: "comment",
				b: /\(\*/,
				e: /\*\)/
			},
			e.ASM, e.QSM, e.CNM, {
				cN: "list",
				b: /\{/,
				e: /\}/,
				i: /:/
			}
		]
	}
}), hljs.registerLanguage("php", function (e) {
	var t = {
			cN: "variable",
			b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
		},
		r = {
			cN: "preprocessor",
			b: /<\?(php)?|\?>/
		},
		i = {
			cN: "string",
			c: [e.BE, r],
			v: [{
					b: 'b"',
					e: '"'
				}, {
					b: "b'",
					e: "'"
				},
				e.inherit(e.ASM, {
					i: null
				}), e.inherit(e.QSM, {
					i: null
				})
			]
		},
		n = {
			v: [e.BNM, e.CNM]
		};
	return {
		cI: !0,
		k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
		c: [e.CLCM, e.HCM, {
				cN: "comment",
				b: "/\\*",
				e: "\\*/",
				c: [{
						cN: "phpdoc",
						b: "\\s@[A-Za-z]+"
					},
					r
				]
			}, {
				cN: "comment",
				b: "__halt_compiler.+?;",
				eW: !0,
				k: "__halt_compiler",
				l: e.UIR
			}, {
				cN: "string",
				b: "<<<['\"]?\\w+['\"]?$",
				e: "^\\w+;",
				c: [e.BE]
			},
			r, t, {
				cN: "function",
				bK: "function",
				e: /[;{]/,
				i: "\\$|\\[|%",
				c: [e.UTM, {
					cN: "params",
					b: "\\(",
					e: "\\)",
					c: ["self", t, e.CBLCLM, i, n]
				}]
			}, {
				cN: "class",
				bK: "class interface",
				e: "{",
				i: /[:\(\$"]/,
				c: [{
						bK: "extends implements",
						r: 10
					},
					e.UTM
				]
			}, {
				bK: "namespace",
				e: ";",
				i: /[\.']/,
				c: [e.UTM]
			}, {
				bK: "use",
				e: ";",
				c: [e.UTM]
			}, {
				b: "=>"
			},
			i, n
		]
	}
}), hljs.registerLanguage("haskell", function (e) {
	var t = {
			cN: "comment",
			v: [{
				b: "--",
				e: "$"
			}, {
				b: "{-",
				e: "-}",
				c: ["self"]
			}]
		},
		r = {
			cN: "pragma",
			b: "{-#",
			e: "#-}"
		},
		i = {
			cN: "preprocessor",
			b: "^#",
			e: "$"
		},
		n = {
			cN: "type",
			b: "\\b[A-Z][\\w']*",
			r: 0
		},
		a = {
			cN: "container",
			b: "\\(",
			e: "\\)",
			i: '"',
			c: [r, t, i, {
					cN: "type",
					b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
				},
				e.inherit(e.TM, {
					b: "[_a-z][\\w']*"
				})
			]
		},
		o = {
			cN: "container",
			b: "{",
			e: "}",
			c: a.c
		};
	return {
		k: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
		c: [{
				cN: "module",
				b: "\\bmodule\\b",
				e: "where",
				k: "module where",
				c: [a, t],
				i: "\\W\\.|;"
			}, {
				cN: "import",
				b: "\\bimport\\b",
				e: "$",
				k: "import|0 qualified as hiding",
				c: [a, t],
				i: "\\W\\.|;"
			}, {
				cN: "class",
				b: "^(\\s*)?(class|instance)\\b",
				e: "where",
				k: "class family instance where",
				c: [n, a, t]
			}, {
				cN: "typedef",
				b: "\\b(data|(new)?type)\\b",
				e: "$",
				k: "data family type newtype deriving",
				c: [r, t, n, a, o]
			}, {
				cN: "default",
				bK: "default",
				e: "$",
				c: [n, a, t]
			}, {
				cN: "infix",
				bK: "infix infixl infixr",
				e: "$",
				c: [e.CNM, t]
			}, {
				cN: "foreign",
				b: "\\bforeign\\b",
				e: "$",
				k: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
				c: [n, e.QSM, t]
			}, {
				cN: "shebang",
				b: "#!\\/usr\\/bin\\/env runhaskell",
				e: "$"
			},
			r, t, i, e.QSM, e.CNM, n, e.inherit(e.TM, {
				b: "^[_a-z][\\w']*"
			}), {
				b: "->|<-"
			}
		]
	}
}), hljs.registerLanguage("python", function (e) {
	var t = {
			cN: "prompt",
			b: /^(>>>|\.\.\.) /
		},
		r = {
			cN: "string",
			c: [e.BE],
			v: [{
					b: /(u|b)?r?'''/,
					e: /'''/,
					c: [t],
					r: 10
				}, {
					b: /(u|b)?r?"""/,
					e: /"""/,
					c: [t],
					r: 10
				}, {
					b: /(u|r|ur)'/,
					e: /'/,
					r: 10
				}, {
					b: /(u|r|ur)"/,
					e: /"/,
					r: 10
				}, {
					b: /(b|br)'/,
					e: /'/
				}, {
					b: /(b|br)"/,
					e: /"/
				},
				e.ASM, e.QSM
			]
		},
		i = {
			cN: "number",
			r: 0,
			v: [{
				b: e.BNR + "[lLjJ]?"
			}, {
				b: "\\b(0o[0-7]+)[lLjJ]?"
			}, {
				b: e.CNR + "[lLjJ]?"
			}]
		},
		n = {
			cN: "params",
			b: /\(/,
			e: /\)/,
			c: ["self", t, i, r]
		},
		a = {
			e: /:/,
			i: /[${=;\n]/,
			c: [e.UTM, n]
		};
	return {
		k: {
			keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
			built_in: "Ellipsis NotImplemented"
		},
		i: /(<\/|->|\?)/,
		c: [t, i, r, e.HCM, e.inherit(a, {
			cN: "function",
			bK: "def",
			r: 10
		}), e.inherit(a, {
			cN: "class",
			bK: "class"
		}), {
			cN: "decorator",
			b: /@/,
			e: /$/
		}, {
			b: /\b(print|exec)\(/
		}]
	}
}), hljs.registerLanguage("smalltalk", function (e) {
	var t = "[a-z][a-zA-Z0-9_]*",
		r = {
			cN: "char",
			b: "\\$.{1}"
		},
		i = {
			cN: "symbol",
			b: "#" + e.UIR
		};
	return {
		k: "self super nil true false thisContext",
		c: [{
				cN: "comment",
				b: '"',
				e: '"'
			},
			e.ASM, {
				cN: "class",
				b: "\\b[A-Z][A-Za-z0-9_]*",
				r: 0
			}, {
				cN: "method",
				b: t + ":",
				r: 0
			},
			e.CNM, i, r, {
				cN: "localvars",
				b: "\\|[ ]*" + t + "([ ]+" + t + ")*[ ]*\\|",
				rB: !0,
				e: /\|/,
				i: /\S/,
				c: [{
					b: "(\\|[ ]*)?" + t
				}]
			}, {
				cN: "array",
				b: "\\#\\(",
				e: "\\)",
				c: [e.ASM, r, e.CNM, i]
			}
		]
	}
}), hljs.registerLanguage("tex", function () {
	var e = {
			cN: "command",
			b: "\\\\[a-zA-Zа-яА-я]+[\\*]?"
		},
		t = {
			cN: "command",
			b: "\\\\[^a-zA-Zа-яА-я0-9]"
		},
		r = {
			cN: "special",
			b: "[{}\\[\\]\\&#~]",
			r: 0
		};
	return {
		c: [{
				b: "\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
				rB: !0,
				c: [e, t, {
					cN: "number",
					b: " *=",
					e: "-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?",
					eB: !0
				}],
				r: 10
			},
			e, t, r, {
				cN: "formula",
				b: "\\$\\$",
				e: "\\$\\$",
				c: [e, t, r],
				r: 0
			}, {
				cN: "formula",
				b: "\\$",
				e: "\\$",
				c: [e, t, r],
				r: 0
			}, {
				cN: "comment",
				b: "%",
				e: "$",
				r: 0
			}
		]
	}
}), hljs.registerLanguage("sql", function (e) {
	return {
		cI: !0,
		i: /[<>]/,
		c: [{
				cN: "operator",
				b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)",
				e: ";",
				eW: !0,
				k: {
					keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database",
					aggregate: "count sum min max avg"
				},
				c: [{
						cN: "string",
						b: "'",
						e: "'",
						c: [e.BE, {
							b: "''"
						}]
					}, {
						cN: "string",
						b: '"',
						e: '"',
						c: [e.BE, {
							b: '""'
						}]
					}, {
						cN: "string",
						b: "`",
						e: "`",
						c: [e.BE]
					},
					e.CNM
				]
			},
			e.CBLCLM, {
				cN: "comment",
				b: "--",
				e: "$"
			}
		]
	}
}), hljs.registerLanguage("handlebars", function () {
	var e = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";
	return {
		cI: !0,
		sL: "xml",
		subLanguageMode: "continuous",
		c: [{
			cN: "expression",
			b: "{{",
			e: "}}",
			c: [{
				cN: "begin-block",
				b: "#[a-zA-Z- .]+",
				k: e
			}, {
				cN: "string",
				b: '"',
				e: '"'
			}, {
				cN: "end-block",
				b: "\\/[a-zA-Z- .]+",
				k: e
			}, {
				cN: "variable",
				b: "[a-zA-Z-.]+",
				k: e
			}]
		}]
	}
}), hljs.registerLanguage("ini", function (e) {
	return {
		cI: !0,
		i: /\S/,
		c: [{
			cN: "comment",
			b: ";",
			e: "$"
		}, {
			cN: "title",
			b: "^\\[",
			e: "\\]"
		}, {
			cN: "setting",
			b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
			e: "$",
			c: [{
				cN: "value",
				eW: !0,
				k: "on off true false yes no",
				c: [e.QSM, e.NM],
				r: 0
			}]
		}]
	}
}), hljs.registerLanguage("perl", function (e) {
	var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
		r = {
			cN: "subst",
			b: "[$@]\\{",
			e: "\\}",
			k: t
		},
		i = {
			b: "->{",
			e: "}"
		},
		n = {
			cN: "variable",
			v: [{
				b: /\$\d/
			}, {
				b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
			}, {
				b: /[\$\%\@\*][^\s\w{]/,
				r: 0
			}]
		},
		a = {
			cN: "comment",
			b: "^(__END__|__DATA__)",
			e: "\\n$",
			r: 5
		},
		o = [e.BE, r, n],
		s = [n, e.HCM, a, {
				cN: "comment",
				b: "^\\=\\w",
				e: "\\=cut",
				eW: !0
			},
			i, {
				cN: "string",
				c: o,
				v: [{
					b: "q[qwxr]?\\s*\\(",
					e: "\\)",
					r: 5
				}, {
					b: "q[qwxr]?\\s*\\[",
					e: "\\]",
					r: 5
				}, {
					b: "q[qwxr]?\\s*\\{",
					e: "\\}",
					r: 5
				}, {
					b: "q[qwxr]?\\s*\\|",
					e: "\\|",
					r: 5
				}, {
					b: "q[qwxr]?\\s*\\<",
					e: "\\>",
					r: 5
				}, {
					b: "qw\\s+q",
					e: "q",
					r: 5
				}, {
					b: "'",
					e: "'",
					c: [e.BE]
				}, {
					b: '"',
					e: '"'
				}, {
					b: "`",
					e: "`",
					c: [e.BE]
				}, {
					b: "{\\w+}",
					c: [],
					r: 0
				}, {
					b: "-?\\w+\\s*\\=\\>",
					c: [],
					r: 0
				}]
			}, {
				cN: "number",
				b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
				r: 0
			}, {
				b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
				k: "split return print reverse grep",
				r: 0,
				c: [e.HCM, a, {
					cN: "regexp",
					b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
					r: 10
				}, {
					cN: "regexp",
					b: "(m|qr)?/",
					e: "/[a-z]*",
					c: [e.BE],
					r: 0
				}]
			}, {
				cN: "sub",
				bK: "sub",
				e: "(\\s*\\(.*?\\))?[;{]",
				r: 5
			}, {
				cN: "operator",
				b: "-\\w\\b",
				r: 0
			}
		];
	return r.c = s, i.c = s, {
		k: t,
		c: s
	}
}), hljs.registerLanguage("scala", function (e) {
	var t = {
			cN: "annotation",
			b: "@[A-Za-z]+"
		},
		r = {
			cN: "string",
			b: 'u?r?"""',
			e: '"""',
			r: 10
		};
	return {
		k: "type yield lazy override def with val var false true sealed abstract private trait object null if for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws",
		c: [{
				cN: "javadoc",
				b: "/\\*\\*",
				e: "\\*/",
				c: [{
					cN: "javadoctag",
					b: "@[A-Za-z]+"
				}],
				r: 10
			},
			e.CLCM, e.CBLCLM, r, e.ASM, e.QSM, {
				cN: "class",
				b: "((case )?class |object |trait )",
				e: "({|$)",
				i: ":",
				k: "case class trait object",
				c: [{
						bK: "extends with",
						r: 10
					},
					e.UTM, {
						cN: "params",
						b: "\\(",
						e: "\\)",
						c: [e.ASM, e.QSM, r, t]
					}
				]
			},
			e.CNM, t
		]
	}
}), hljs.registerLanguage("cmake", function (e) {
	return {
		cI: !0,
		k: {
			keyword: "add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_subdirectory add_test aux_source_directory break build_command cmake_minimum_required cmake_policy configure_file create_test_sourcelist define_property else elseif enable_language enable_testing endforeach endfunction endif endmacro endwhile execute_process export find_file find_library find_package find_path find_program fltk_wrap_ui foreach function get_cmake_property get_directory_property get_filename_component get_property get_source_file_property get_target_property get_test_property if include include_directories include_external_msproject include_regular_expression install link_directories load_cache load_command macro mark_as_advanced message option output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return separate_arguments set set_directory_properties set_property set_source_files_properties set_target_properties set_tests_properties site_name source_group string target_link_libraries try_compile try_run unset variable_watch while build_name exec_program export_library_dependencies install_files install_programs install_targets link_libraries make_directory remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or",
			operator: "equal less greater strless strgreater strequal matches"
		},
		c: [{
				cN: "envvar",
				b: "\\${",
				e: "}"
			},
			e.HCM, e.QSM, e.NM
		]
	}
}), hljs.registerLanguage("ocaml", function (e) {
	return {
		k: {
			keyword: "and as assert asr begin class constraint do done downto else end exception external false for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new object of open or private rec ref sig struct then to true try type val virtual when while with parser value",
			built_in: "bool char float int list unit array exn option int32 int64 nativeint format4 format6 lazy_t in_channel out_channel string"
		},
		i: /\/\//,
		c: [{
				cN: "string",
				b: '"""',
				e: '"""'
			}, {
				cN: "comment",
				b: "\\(\\*",
				e: "\\*\\)",
				c: ["self"]
			}, {
				cN: "class",
				bK: "type",
				e: "\\(|=|$",
				c: [e.UTM]
			}, {
				cN: "annotation",
				b: "\\[<",
				e: ">\\]"
			},
			e.CBLCLM, e.inherit(e.ASM, {
				i: null
			}), e.inherit(e.QSM, {
				i: null
			}), e.CNM
		]
	}
}), hljs.registerLanguage("objectivec", function (e) {
	var t = {
			keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required",
			literal: "false true FALSE TRUE nil YES NO NULL",
			built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
		},
		r = /[a-zA-Z@][a-zA-Z0-9_]*/,
		i = "@interface @class @protocol @implementation";
	return {
		k: t,
		l: r,
		i: "</",
		c: [e.CLCM, e.CBLCLM, e.CNM, e.QSM, {
			cN: "string",
			b: "'",
			e: "[^\\\\]'",
			i: "[^\\\\][^']"
		}, {
			cN: "preprocessor",
			b: "#import",
			e: "$",
			c: [{
				cN: "title",
				b: '"',
				e: '"'
			}, {
				cN: "title",
				b: "<",
				e: ">"
			}]
		}, {
			cN: "preprocessor",
			b: "#",
			e: "$"
		}, {
			cN: "class",
			b: "(" + i.split(" ").join("|") + ")\\b",
			e: "({|$)",
			k: i,
			l: r,
			c: [e.UTM]
		}, {
			cN: "variable",
			b: "\\." + e.UIR,
			r: 0
		}]
	}
}), hljs.registerLanguage("coffeescript", function (e) {
	var t = {
			keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
			literal: "true false null undefined yes no on off",
			reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
			built_in: "npm require console print module exports global window document"
		},
		r = "[A-Za-z$_][0-9A-Za-z$_]*",
		i = e.inherit(e.TM, {
			b: r
		}),
		n = {
			cN: "subst",
			b: /#\{/,
			e: /}/,
			k: t
		},
		a = [e.BNM, e.inherit(e.CNM, {
			starts: {
				e: "(\\s*/)?",
				r: 0
			}
		}), {
			cN: "string",
			v: [{
				b: /'''/,
				e: /'''/,
				c: [e.BE]
			}, {
				b: /'/,
				e: /'/,
				c: [e.BE]
			}, {
				b: /"""/,
				e: /"""/,
				c: [e.BE, n]
			}, {
				b: /"/,
				e: /"/,
				c: [e.BE, n]
			}]
		}, {
			cN: "regexp",
			v: [{
				b: "///",
				e: "///",
				c: [n, e.HCM]
			}, {
				b: "//[gim]*",
				r: 0
			}, {
				b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"
			}]
		}, {
			cN: "property",
			b: "@" + r
		}, {
			b: "`",
			e: "`",
			eB: !0,
			eE: !0,
			sL: "javascript"
		}];
	return n.c = a, {
		k: t,
		c: a.concat([{
				cN: "comment",
				b: "###",
				e: "###"
			},
			e.HCM, {
				cN: "function",
				b: "(" + r + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",
				e: "[-=]>",
				rB: !0,
				c: [i, {
					cN: "params",
					b: "\\(",
					rB: !0,
					c: [{
						b: /\(/,
						e: /\)/,
						k: t,
						c: ["self"].concat(a)
					}]
				}]
			}, {
				cN: "class",
				bK: "class",
				e: "$",
				i: /[:="\[\]]/,
				c: [{
						bK: "extends",
						eW: !0,
						i: /[:="\[\]]/,
						c: [i]
					},
					i
				]
			}, {
				cN: "attribute",
				b: r + ":",
				e: ":",
				rB: !0,
				eE: !0,
				r: 0
			}
		])
	}
}), hljs.registerLanguage("nginx", function (e) {
	var t = {
			cN: "variable",
			v: [{
				b: /\$\d+/
			}, {
				b: /\$\{/,
				e: /}/
			}, {
				b: "[\\$\\@]" + e.UIR
			}]
		},
		r = {
			eW: !0,
			l: "[a-z/_]+",
			k: {
				built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
			},
			r: 0,
			i: "=>",
			c: [e.HCM, {
					cN: "string",
					c: [e.BE, t],
					v: [{
						b: /"/,
						e: /"/
					}, {
						b: /'/,
						e: /'/
					}]
				}, {
					cN: "url",
					b: "([a-z]+):/",
					e: "\\s",
					eW: !0,
					eE: !0
				}, {
					cN: "regexp",
					c: [e.BE, t],
					v: [{
						b: "\\s\\^",
						e: "\\s|{|;",
						rE: !0
					}, {
						b: "~\\*?\\s+",
						e: "\\s|{|;",
						rE: !0
					}, {
						b: "\\*(\\.[a-z\\-]+)+"
					}, {
						b: "([a-z\\-]+\\.)+\\*"
					}]
				}, {
					cN: "number",
					b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
				}, {
					cN: "number",
					b: "\\b\\d+[kKmMgGdshdwy]*\\b",
					r: 0
				},
				t
			]
		};
	return {
		c: [e.HCM, {
			b: e.UIR + "\\s",
			e: ";|{",
			rB: !0,
			c: [e.inherit(e.UTM, {
				starts: r
			})],
			r: 0
		}],
		i: "[^\\s\\}]"
	}
}), hljs.registerLanguage("erlang-repl", function (e) {
	return {
		k: {
			special_functions: "spawn spawn_link self",
			reserved: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
		},
		c: [{
				cN: "prompt",
				b: "^[0-9]+> ",
				r: 10
			}, {
				cN: "comment",
				b: "%",
				e: "$"
			}, {
				cN: "number",
				b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
				r: 0
			},
			e.ASM, e.QSM, {
				cN: "constant",
				b: "\\?(::)?([A-Z]\\w*(::)?)+"
			}, {
				cN: "arrow",
				b: "->"
			}, {
				cN: "ok",
				b: "ok"
			}, {
				cN: "exclamation_mark",
				b: "!"
			}, {
				cN: "function_or_atom",
				b: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
				r: 0
			}, {
				cN: "variable",
				b: "[A-Z][a-zA-Z0-9_']*",
				r: 0
			}
		]
	}
}), hljs.registerLanguage("r", function (e) {
	var t = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
	return {
		c: [e.HCM, {
			b: t,
			l: t,
			k: {
				keyword: "function if in break next repeat else for return switch while try tryCatch|10 stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...|10",
				literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
			},
			r: 0
		}, {
			cN: "number",
			b: "0[xX][0-9a-fA-F]+[Li]?\\b",
			r: 0
		}, {
			cN: "number",
			b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
			r: 0
		}, {
			cN: "number",
			b: "\\d+\\.(?!\\d)(?:i\\b)?",
			r: 0
		}, {
			cN: "number",
			b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
			r: 0
		}, {
			cN: "number",
			b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
			r: 0
		}, {
			b: "`",
			e: "`",
			r: 0
		}, {
			cN: "string",
			c: [e.BE],
			v: [{
				b: '"',
				e: '"'
			}, {
				b: "'",
				e: "'"
			}]
		}]
	}
}), hljs.registerLanguage("json", function (e) {
	var t = {
			literal: "true false null"
		},
		r = [e.QSM, e.CNM],
		i = {
			cN: "value",
			e: ",",
			eW: !0,
			eE: !0,
			c: r,
			k: t
		},
		n = {
			b: "{",
			e: "}",
			c: [{
				cN: "attribute",
				b: '\\s*"',
				e: '"\\s*:\\s*',
				eB: !0,
				eE: !0,
				c: [e.BE],
				i: "\\n",
				starts: i
			}],
			i: "\\S"
		},
		a = {
			b: "\\[",
			e: "\\]",
			c: [e.inherit(i, {
				cN: null
			})],
			i: "\\S"
		};
	return r.splice(r.length, 0, n, a), {
		c: r,
		k: t,
		i: "\\S"
	}
}), hljs.registerLanguage("django", function () {
	var e = {
		cN: "filter",
		b: /\|[A-Za-z]+\:?/,
		k: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone",
		c: [{
			cN: "argument",
			b: /"/,
			e: /"/
		}, {
			cN: "argument",
			b: /'/,
			e: /'/
		}]
	};
	return {
		cI: !0,
		sL: "xml",
		subLanguageMode: "continuous",
		c: [{
			cN: "template_comment",
			b: /\{%\s*comment\s*%}/,
			e: /\{%\s*endcomment\s*%}/
		}, {
			cN: "template_comment",
			b: /\{#/,
			e: /#}/
		}, {
			cN: "template_tag",
			b: /\{%/,
			e: /%}/,
			k: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor in ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup by as ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim",
			c: [e]
		}, {
			cN: "variable",
			b: /\{\{/,
			e: /}}/,
			c: [e]
		}]
	}
}), hljs.registerLanguage("apache", function (e) {
	var t = {
		cN: "number",
		b: "[\\$%]\\d+"
	};
	return {
		cI: !0,
		c: [e.HCM, {
			cN: "tag",
			b: "</?",
			e: ">"
		}, {
			cN: "keyword",
			b: /\w+/,
			r: 0,
			k: {
				common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
			},
			starts: {
				e: /$/,
				r: 0,
				k: {
					literal: "on off all"
				},
				c: [{
						cN: "sqbracket",
						b: "\\s\\[",
						e: "\\]$"
					}, {
						cN: "cbracket",
						b: "[\\$%]\\{",
						e: "\\}",
						c: ["self", t]
					},
					t, e.QSM
				]
			}
		}],
		i: /\S/
	}
}), hljs.registerLanguage("scss", function (e) {
	{
		var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
			r = {
				cN: "function",
				b: t + "\\(",
				e: "\\)",
				c: ["self", e.NM, e.ASM, e.QSM]
			},
			i = {
				cN: "hexcolor",
				b: "#[0-9A-Fa-f]+"
			};
		({
			cN: "attribute",
			b: "[A-Z\\_\\.\\-]+",
			e: ":",
			eE: !0,
			i: "[^\\s]",
			starts: {
				cN: "value",
				eW: !0,
				eE: !0,
				c: [r, i, e.NM, e.QSM, e.ASM, e.CBLCLM, {
					cN: "important",
					b: "!important"
				}]
			}
		})
	}
	return {
		cI: !0,
		i: "[=/|']",
		c: [e.CLCM, e.CBLCLM, {
			cN: "function",
			b: t + "\\(",
			e: "\\)",
			c: ["self", e.NM, e.ASM, e.QSM]
		}, {
			cN: "id",
			b: "\\#[A-Za-z0-9_-]+",
			r: 0
		}, {
			cN: "class",
			b: "\\.[A-Za-z0-9_-]+",
			r: 0
		}, {
			cN: "attr_selector",
			b: "\\[",
			e: "\\]",
			i: "$"
		}, {
			cN: "tag",
			b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
			r: 0
		}, {
			cN: "pseudo",
			b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
		}, {
			cN: "pseudo",
			b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
		}, {
			cN: "attribute",
			b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
			i: "[^\\s]"
		}, {
			cN: "value",
			b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
		}, {
			cN: "value",
			b: ":",
			e: ";",
			c: [i, e.NM, e.QSM, e.ASM, {
				cN: "important",
				b: "!important"
			}]
		}, {
			cN: "at_rule",
			b: "@",
			e: "[{;]",
			k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
			c: [r, e.QSM, e.ASM, i, e.NM, {
				cN: "preprocessor",
				b: "\\s[A-Za-z0-9_.-]+",
				r: 0
			}]
		}]
	}
}), hljs.registerLanguage("applescript", function (e) {
	var t = e.inherit(e.QSM, {
			i: ""
		}),
		r = {
			cN: "params",
			b: "\\(",
			e: "\\)",
			c: ["self", e.CNM, t]
		},
		i = [{
				cN: "comment",
				b: "--",
				e: "$"
			}, {
				cN: "comment",
				b: "\\(\\*",
				e: "\\*\\)",
				c: ["self", {
					b: "--",
					e: "$"
				}]
			},
			e.HCM
		];
	return {
		k: {
			keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the then third through thru timeout times to transaction try until where while whose with without",
			constant: "AppleScript false linefeed return pi quote result space tab true",
			type: "alias application boolean class constant date file integer list number real record string text",
			command: "activate beep count delay launch log offset read round run say summarize write",
			property: "character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
		},
		c: [t, e.CNM, {
			cN: "type",
			b: "\\bPOSIX file\\b"
		}, {
			cN: "command",
			b: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
		}, {
			cN: "constant",
			b: "\\b(text item delimiters|current application|missing value)\\b"
		}, {
			cN: "keyword",
			b: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"
		}, {
			cN: "property",
			b: "\\b(POSIX path|(date|time) string|quoted form)\\b"
		}, {
			cN: "function_start",
			bK: "on",
			i: "[${=;\\n]",
			c: [e.UTM, r]
		}].concat(i),
		i: "//"
	}
}), hljs.registerLanguage("cpp", function (e) {
	var t = {
		keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",
		built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"
	};
	return {
		aliases: ["c"],
		k: t,
		i: "</",
		c: [e.CLCM, e.CBLCLM, e.QSM, {
				cN: "string",
				b: "'\\\\?.",
				e: "'",
				i: "."
			}, {
				cN: "number",
				b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
			},
			e.CNM, {
				cN: "preprocessor",
				b: "#",
				e: "$",
				c: [{
						b: "include\\s*<",
						e: ">",
						i: "\\n"
					},
					e.CLCM
				]
			}, {
				cN: "stl_container",
				b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
				e: ">",
				k: t,
				r: 10,
				c: ["self"]
			}
		]
	}
}), hljs.registerLanguage("matlab", function (e) {
	var t = [e.CNM, {
		cN: "string",
		b: "'",
		e: "'",
		c: [e.BE, {
			b: "''"
		}]
	}];
	return {
		k: {
			keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",
			built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson"
		},
		i: '(//|"|#|/\\*|\\s+/\\w+)',
		c: [{
			cN: "function",
			bK: "function",
			e: "$",
			c: [e.UTM, {
				cN: "params",
				b: "\\(",
				e: "\\)"
			}, {
				cN: "params",
				b: "\\[",
				e: "\\]"
			}]
		}, {
			cN: "transposed_variable",
			b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
			e: "",
			r: 0
		}, {
			cN: "matrix",
			b: "\\[",
			e: "\\]'*[\\.']*",
			c: t,
			r: 0
		}, {
			cN: "cell",
			b: "\\{",
			e: "\\}'*[\\.']*",
			c: t,
			i: /:/
		}, {
			cN: "comment",
			b: "\\%",
			e: "$"
		}].concat(t)
	}
}), hljs.registerLanguage("makefile", function (e) {
	var t = {
		cN: "variable",
		b: /\$\(/,
		e: /\)/,
		c: [e.BE]
	};
	return {
		c: [e.HCM, {
			b: /^\w+\s*\W*=/,
			rB: !0,
			r: 0,
			starts: {
				cN: "constant",
				e: /\s*\W*=/,
				eE: !0,
				starts: {
					e: /$/,
					r: 0,
					c: [t]
				}
			}
		}, {
			cN: "title",
			b: /^[\w]+:\s*$/
		}, {
			cN: "phony",
			b: /^\.PHONY:/,
			e: /$/,
			k: ".PHONY",
			l: /[\.\w]+/
		}, {
			b: /^\t+/,
			e: /$/,
			c: [e.QSM, t]
		}]
	}
}), hljs.registerLanguage("clojure", function (e) {
	var t = {
			built_in: "def cond apply if-not if-let if not not= = &lt; < > &lt;= <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
		},
		r = "[a-zA-Z_0-9\\!\\.\\?\\-\\+\\*\\/\\<\\=\\>\\&\\#\\$';]+",
		i = "[\\s:\\(\\{]+\\d+(\\.\\d+)?",
		n = {
			cN: "number",
			b: i,
			r: 0
		},
		a = e.inherit(e.QSM, {
			i: null
		}),
		o = {
			cN: "comment",
			b: ";",
			e: "$",
			r: 0
		},
		s = {
			cN: "collection",
			b: "[\\[\\{]",
			e: "[\\]\\}]"
		},
		l = {
			cN: "comment",
			b: "\\^" + r
		},
		c = {
			cN: "comment",
			b: "\\^\\{",
			e: "\\}"
		},
		u = {
			cN: "attribute",
			b: "[:]" + r
		},
		d = {
			cN: "list",
			b: "\\(",
			e: "\\)"
		},
		p = {
			eW: !0,
			k: {
				literal: "true false nil"
			},
			r: 0
		},
		m = {
			k: t,
			l: r,
			cN: "title",
			b: r,
			starts: p
		};
	return d.c = [{
			cN: "comment",
			b: "comment"
		},
		m, p
	], p.c = [d, a, l, c, o, u, s, n], s.c = [d, a, l, o, u, s, n], {
		i: /\S/,
		c: [o, d, {
			cN: "prompt",
			b: /^=> /,
			starts: {
				e: /\n\n|\Z/
			}
		}]
	}
}), hljs.registerLanguage("go", function (e) {
	var t = {
		keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer",
		constant: "true false iota nil",
		typename: "bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
		built_in: "append cap close complex copy imag len make new panic print println real recover delete"
	};
	return {
		aliases: ["golang"],
		k: t,
		i: "</",
		c: [e.CLCM, e.CBLCLM, e.QSM, {
				cN: "string",
				b: "'",
				e: "[^\\\\]'"
			}, {
				cN: "string",
				b: "`",
				e: "`"
			}, {
				cN: "number",
				b: "[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?",
				r: 0
			},
			e.CNM
		]
	}
});
var Inflector;
Inflector = function () {
	function e(i) {
		return this instanceof e ? void(this.value = i) : new e(i)
	}
	var i, n, t = Array.prototype.slice;
	return n = {
		uncountable_words: ["equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "moose", "deer", "news"],
		plural_rules: [
			[new RegExp("(m)an$", "gi"), "$1en"],
			[new RegExp("(pe)rson$", "gi"), "$1ople"],
			[new RegExp("(child)$", "gi"), "$1ren"],
			[new RegExp("^(ox)$", "gi"), "$1en"],
			[new RegExp("(ax|test)is$", "gi"), "$1es"],
			[new RegExp("(octop|vir)us$", "gi"), "$1i"],
			[new RegExp("(alias|status|by)$", "gi"), "$1es"],
			[new RegExp("(bu)s$", "gi"), "$1ses"],
			[new RegExp("(buffal|tomat|potat)o$", "gi"), "$1oes"],
			[new RegExp("([ti])um$", "gi"), "$1a"],
			[new RegExp("sis$", "gi"), "ses"],
			[new RegExp("(?:([^f])fe|([lr])f)$", "gi"), "$1$2ves"],
			[new RegExp("(hive)$", "gi"), "$1s"],
			[new RegExp("([^aeiouy]|qu)y$", "gi"), "$1ies"],
			[new RegExp("(x|ch|ss|sh)$", "gi"), "$1es"],
			[new RegExp("(matr|vert|ind)ix|ex$", "gi"), "$1ices"],
			[new RegExp("([m|l])ouse$", "gi"), "$1ice"],
			[new RegExp("(quiz)$", "gi"), "$1zes"],
			[new RegExp("s$", "gi"), "s"],
			[new RegExp("$", "gi"), "s"]
		],
		singular_rules: [
			[new RegExp("(m)en$", "gi"), "$1an"],
			[new RegExp("(pe)ople$", "gi"), "$1rson"],
			[new RegExp("(child)ren$", "gi"), "$1"],
			[new RegExp("([ti])a$", "gi"), "$1um"],
			[new RegExp("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$", "gi"), "$1$2sis"],
			[new RegExp("(hive)s$", "gi"), "$1"],
			[new RegExp("(tive)s$", "gi"), "$1"],
			[new RegExp("(curve)s$", "gi"), "$1"],
			[new RegExp("([lr])ves$", "gi"), "$1f"],
			[new RegExp("([^fo])ves$", "gi"), "$1fe"],
			[new RegExp("([^aeiouy]|qu)ies$", "gi"), "$1y"],
			[new RegExp("(s)eries$", "gi"), "$1eries"],
			[new RegExp("(m)ovies$", "gi"), "$1ovie"],
			[new RegExp("(x|ch|ss|sh)es$", "gi"), "$1"],
			[new RegExp("([m|l])ice$", "gi"), "$1ouse"],
			[new RegExp("(bus)es$", "gi"), "$1"],
			[new RegExp("(o)es$", "gi"), "$1"],
			[new RegExp("(shoe)s$", "gi"), "$1"],
			[new RegExp("(cris|ax|test)es$", "gi"), "$1is"],
			[new RegExp("(octop|vir)i$", "gi"), "$1us"],
			[new RegExp("(alias|status)es$", "gi"), "$1"],
			[new RegExp("^(ox)en", "gi"), "$1"],
			[new RegExp("(vert|ind)ices$", "gi"), "$1ex"],
			[new RegExp("(matr)ices$", "gi"), "$1ix"],
			[new RegExp("(quiz)zes$", "gi"), "$1"],
			[new RegExp("s$", "gi"), ""]
		],
		non_titlecased_words: ["and", "or", "nor", "a", "an", "the", "so", "but", "to", "of", "at", "by", "from", "into", "on", "onto", "off", "out", "in", "over", "with", "for"],
		id_suffix: new RegExp("(_ids|_id)$", "g"),
		underbar: new RegExp("_", "g"),
		space_or_underbar: new RegExp("[ _]", "g"),
		uppercase: new RegExp("([A-Z])", "g"),
		underbar_prefix: new RegExp("^_"),
		apply_rules: function (e, i, n, t) {
			if (t) e = t;
			else {
				var r = n.indexOf(e.toLowerCase()) > -1;
				if (!r)
					for (var s = 0; s < i.length; s++)
						if (e.match(i[s][0])) {
							e = e.replace(i[s][0], i[s][1]);
							break
						}
			}
			return e
		}
	}, n.pluralize = function (e, i) {
		return this.apply_rules(e, this.plural_rules, this.uncountable_words, i)
	}, n.singularize = function (e, i) {
		return this.apply_rules(e, this.singular_rules, this.uncountable_words, i)
	}, n.camelize = function (e, i, n) {
		n || (e = e.toLowerCase());
		for (var t = e.split("/"), r = 0; r < t.length; r++) {
			for (var s = t[r].split("_"), o = i && r + 1 === t.length ? 1 : 0, g = o; g < s.length; g++) s[g] = s[g].charAt(0).toUpperCase() + s[g].substring(1);
			t[r] = s.join("")
		}
		return e = t.join("::")
	}, n.underscore = function (e) {
		for (var i = e.split("::"), n = 0; n < i.length; n++) i[n] = i[n].replace(this.uppercase, "_$1"), i[n] = i[n].replace(this.underbar_prefix, "");
		return e = i.join("/").toLowerCase()
	}, n.humanize = function (e, i) {
		return e = e.toLowerCase(), e = e.replace(this.id_suffix, ""), e = e.replace(this.underbar, " "), i || (e = this.capitalize(e)), e
	}, n.capitalize = function (e, i) {
		return i || (e = e.toLowerCase()), e = e.substring(0, 1).toUpperCase() + e.substring(1)
	}, n.decapitalize = function (e) {
		return e = e.substring(0, 1).toLowerCase() + e.substring(1)
	}, n.dasherize = function (e) {
		return e = e.replace(this.space_or_underbar, "-")
	}, n.titleize = function (e) {
		e = e.toLowerCase(), e = e.replace(this.underbar, " ");
		for (var i = e.split(" "), n = 0; n < i.length; n++) {
			for (var t = i[n].split("-"), r = 0; r < t.length; r++) this.non_titlecased_words.indexOf(t[r].toLowerCase()) < 0 && (t[r] = this.capitalize(t[r]));
			i[n] = t.join("-")
		}
		return e = i.join(" "), e = e.substring(0, 1).toUpperCase() + e.substring(1)
	}, n.demodulize = function (e) {
		var i = e.split("::");
		return e = i[i.length - 1]
	}, n.tableize = function (e) {
		return e = this.pluralize(this.underscore(e))
	}, n.classify = function (e) {
		return e = this.singularize(this.camelize(e))
	}, n.foreign_key = function (e, i) {
		return e = this.underscore(this.demodulize(e)) + (i ? "" : "_") + "id"
	}, n.ordinalize = function (e) {
		for (var i = e.split(" "), n = 0; n < i.length; n++) {
			var t = parseInt(i[n]);
			if (0 / 0 === t) {
				var r = i[n].substring(i[n].length - 2),
					s = i[n].substring(i[n].length - 1),
					o = "th";
				"11" != r && "12" != r && "13" != r && ("1" === s ? o = "st" : "2" === s ? o = "nd" : "3" === s && (o = "rd")), i[n] += o
			}
		}
		return e = i.join(" ")
	}, i = n, Object.keys(i).forEach(function (n) {
		return e[n] = i[n], e.prototype[n] = function () {
			return this.value = e[n].apply(e, [this.value].concat(t.call(arguments))), this
		}
	}), e.prototype.tap = function (e) {
		return e(this.value), this
	}, e.prototype.inspect = function () {
		return this + ""
	}, e.prototype.toString = function () {
		return this.value
	}, e.prototype.valueOf = function () {
		return this.value
	}, e
}();
! function (t) {
	"use strict";
	var e, i = function (t, e) {
			"undefined" == typeof e && (e = {}), this.init(t, e)
		},
		s = i.prototype,
		n = ["canvas", "vml"],
		a = ["oval", "spiral", "square", "rect", "roundRect"],
		h = /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
		r = -1 !== navigator.appVersion.indexOf("MSIE") && 8 === parseFloat(navigator.appVersion.split("MSIE")[1]) ? !0 : !1,
		o = !!document.createElement("canvas").getContext,
		c = 40,
		d = !0,
		u = function (t, e, i) {
			var s, n = document.createElement(t);
			for (s in i) n[s] = i[s];
			return "undefined" != typeof e && e.appendChild(n), n
		},
		l = function (t, e) {
			for (var i in e) t.style[i] = e[i];
			return t
		},
		f = function (t, e) {
			for (var i in e) t.setAttribute(i, e[i]);
			return t
		},
		p = function (t, e, i, s) {
			t.save(), t.translate(e, i), t.rotate(s), t.translate(-e, -i), t.beginPath()
		};
	s.init = function (t, s) {
		"boolean" == typeof s.safeVML && (d = s.safeVML);
		try {
			this.mum = void 0 !== t ? t : document.body
		} catch (a) {
			this.mum = document.body
		}
		if (s.id = "undefined" != typeof s.id ? s.id : "canvasLoader", this.cont = u("span", this.mum, {
			id: s.id
		}), this.cont.setAttribute("class", "canvas-loader"), o) e = n[0], this.can = u("canvas", this.cont), this.con = this.can.getContext("2d"), this.cCan = l(u("canvas", this.cont), {
			display: "none"
		}), this.cCon = this.cCan.getContext("2d");
		else {
			if (e = n[1], "undefined" == typeof i.vmlSheet) {
				document.getElementsByTagName("head")[0].appendChild(u("style")), i.vmlSheet = document.styleSheets[document.styleSheets.length - 1];
				var h, r = ["group", "oval", "roundrect", "fill"];
				for (h in r) i.vmlSheet.addRule(r[h], "behavior:url(#default#VML); position:absolute;")
			}
			this.vml = u("group", this.cont)
		}
		this.setColor(this.color), this.draw(), l(this.cont, {
			display: "none"
		})
	}, s.cont = {}, s.can = {}, s.con = {}, s.cCan = {}, s.cCon = {}, s.timer = {}, s.activeId = 0, s.diameter = 40, s.setDiameter = function (t) {
		this.diameter = Math.round(Math.abs(t)), this.redraw()
	}, s.getDiameter = function () {
		return this.diameter
	}, s.cRGB = {}, s.color = "#000000", s.setColor = function (t) {
		this.color = h.test(t) ? t : "#000000", this.cRGB = this.getRGB(this.color), this.redraw()
	}, s.getColor = function () {
		return this.color
	}, s.shape = a[0], s.setShape = function (t) {
		var e;
		for (e in a)
			if (t === a[e]) {
				this.shape = t, this.redraw();
				break
			}
	}, s.getShape = function () {
		return this.shape
	}, s.density = 40, s.setDensity = function (t) {
		this.density = d && e === n[1] ? Math.round(Math.abs(t)) <= c ? Math.round(Math.abs(t)) : c : Math.round(Math.abs(t)), this.density > 360 && (this.density = 360), this.activeId = 0, this.redraw()
	}, s.getDensity = function () {
		return this.density
	}, s.range = 1.3, s.setRange = function (t) {
		this.range = Math.abs(t), this.redraw()
	}, s.getRange = function () {
		return this.range
	}, s.speed = 2, s.setSpeed = function (t) {
		this.speed = Math.round(Math.abs(t))
	}, s.getSpeed = function () {
		return this.speed
	}, s.fps = 24, s.setFPS = function (t) {
		this.fps = Math.round(Math.abs(t)), this.reset()
	}, s.getFPS = function () {
		return this.fps
	}, s.getRGB = function (t) {
		return t = "#" === t.charAt(0) ? t.substring(1, 7) : t, {
			r: parseInt(t.substring(0, 2), 16),
			g: parseInt(t.substring(2, 4), 16),
			b: parseInt(t.substring(4, 6), 16)
		}
	}, s.draw = function () {
		var t, i, s, h, o, c, d, v, m, g, b, y, M, C = 0,
			w = this.density,
			I = Math.round(w * this.range),
			R = 0,
			S = 1e3,
			k = 0,
			T = this.cCon,
			P = this.diameter,
			B = .47;
		if (e === n[0])
			for (T.clearRect(0, 0, S, S), f(this.can, {
				width: P,
				height: P
			}), f(this.cCan, {
				width: P,
				height: P
			}); w > C;) {
				switch (m = I >= C ? 1 - (1 - R) / I * C : m = R, c = 270 - 360 / w * C, d = c / 180 * Math.PI, T.fillStyle = "rgba(" + this.cRGB.r + "," + this.cRGB.g + "," + this.cRGB.b + "," + m.toString() + ")", this.shape) {
				case a[0]:
				case a[1]:
					t = .07 * P, h = P * B + Math.cos(d) * (P * B - t) - P * B, o = P * B + Math.sin(d) * (P * B - t) - P * B, T.beginPath(), this.shape === a[1] ? T.arc(.5 * P + h, .5 * P + o, t * m, 0, 2 * Math.PI, !1) : T.arc(.5 * P + h, .5 * P + o, t, 0, 2 * Math.PI, !1);
					break;
				case a[2]:
					t = .12 * P, h = Math.cos(d) * (P * B - t) + .5 * P, o = Math.sin(d) * (P * B - t) + .5 * P, p(T, h, o, d), T.fillRect(h, o - .5 * t, t, t);
					break;
				case a[3]:
				case a[4]:
					i = .3 * P, s = .27 * i, h = Math.cos(d) * (s + .13 * (P - s)) + .5 * P, o = Math.sin(d) * (s + .13 * (P - s)) + .5 * P, p(T, h, o, d), this.shape === a[3] ? T.fillRect(h, o - .5 * s, i, s) : (v = .55 * s, T.moveTo(h + v, o - .5 * s), T.lineTo(h + i - v, o - .5 * s), T.quadraticCurveTo(h + i, o - .5 * s, h + i, o - .5 * s + v), T.lineTo(h + i, o - .5 * s + s - v), T.quadraticCurveTo(h + i, o - .5 * s + s, h + i - v, o - .5 * s + s), T.lineTo(h + v, o - .5 * s + s), T.quadraticCurveTo(h, o - .5 * s + s, h, o - .5 * s + s - v), T.lineTo(h, o - .5 * s + v), T.quadraticCurveTo(h, o - .5 * s, h + v, o - .5 * s))
				}
				T.closePath(), T.fill(), T.restore(), ++C
			} else {
				switch (l(this.cont, {
					width: P,
					height: P
				}), l(this.vml, {
					width: P,
					height: P
				}), this.shape) {
				case a[0]:
				case a[1]:
					y = "oval", t = .14 * S;
					break;
				case a[2]:
					y = "roundrect", t = .12 * S;
					break;
				case a[3]:
				case a[4]:
					y = "roundrect", t = .3 * S
				}
				for (i = s = t, h = .5 * S - s, o = .5 * -s; w > C;) {
					switch (m = I >= C ? 1 - (1 - R) / I * C : m = R, c = 270 - 360 / w * C, this.shape) {
					case a[1]:
						i = s = t * m, h = .5 * S - .5 * t - t * m * .5, o = .5 * (t - t * m);
						break;
					case a[0]:
					case a[2]:
						r && (o = 0, this.shape === a[2] && (h = .5 * S - .5 * s));
						break;
					case a[3]:
					case a[4]:
						i = .95 * t, s = .28 * i, r ? (h = 0, o = .5 * S - .5 * s) : (h = .5 * S - i, o = .5 * -s), k = this.shape === a[4] ? .6 : 0
					}
					b = f(l(u("group", this.vml), {
						width: S,
						height: S,
						rotation: c
					}), {
						coordsize: S + "," + S,
						coordorigin: .5 * -S + "," + .5 * -S
					}), g = l(u(y, b, {
						stroked: !1,
						arcSize: k
					}), {
						width: i,
						height: s,
						top: o,
						left: h
					}), M = u("fill", g, {
						color: this.color,
						opacity: m
					}), ++C
				}
			}
		this.tick(!0)
	}, s.clean = function () {
		if (e === n[0]) this.con.clearRect(0, 0, 1e3, 1e3);
		else {
			var t = this.vml;
			if (t.hasChildNodes())
				for (; t.childNodes.length >= 1;) t.removeChild(t.firstChild)
		}
	}, s.redraw = function () {
		this.clean(), this.draw()
	}, s.reset = function () {
		"number" == typeof this.timer && (this.hide(), this.show())
	}, s.tick = function (t) {
		var i = this.con,
			s = this.diameter;
		t || (this.activeId += 360 / this.density * this.speed), e === n[0] ? (i.clearRect(0, 0, s, s), p(i, .5 * s, .5 * s, this.activeId / 180 * Math.PI), i.drawImage(this.cCan, 0, 0, s, s), i.restore()) : (this.activeId >= 360 && (this.activeId -= 360), l(this.vml, {
			rotation: this.activeId
		}))
	}, s.show = function () {
		if ("number" != typeof this.timer) {
			var t = this;
			this.timer = self.setInterval(function () {
				t.tick()
			}, Math.round(1e3 / this.fps)), l(this.cont, {
				display: "block"
			})
		}
	}, s.hide = function () {
		"number" == typeof this.timer && (clearInterval(this.timer), delete this.timer, l(this.cont, {
			display: "none"
		}))
	}, s.kill = function () {
		var t = this.cont;
		"number" == typeof this.timer && this.hide(), e === n[0] ? (t.removeChild(this.can), t.removeChild(this.cCan)) : t.removeChild(this.vml);
		var i;
		for (i in this) delete this[i]
	}, t.CanvasLoader = i
}(window);
! function (e, t) {
	function n(e, t, n) {
		return e.addEventListener ? void e.addEventListener(t, n, !1) : void e.attachEvent("on" + t, n)
	}

	function r(e) {
		if ("keypress" == e.type) {
			var t = String.fromCharCode(e.which);
			return e.shiftKey || (t = t.toLowerCase()), t
		}
		return K[e.which] ? K[e.which] : q[e.which] ? q[e.which] : String.fromCharCode(e.which).toLowerCase()
	}

	function o(e, t) {
		return e.sort().join(",") === t.sort().join(",")
	}

	function i(e) {
		e = e || {};
		var t, n = !1;
		for (t in M) e[t] ? n = !0 : M[t] = 0;
		n || (j = !1)
	}

	function a(e, t, n, r, i, a) {
		var c, u, s = [],
			f = n.type;
		if (!L[e]) return [];
		for ("keyup" == f && h(e) && (t = [e]), c = 0; c < L[e].length; ++c)
			if (u = L[e][c], (r || !u.seq || M[u.seq] == u.level) && f == u.action && ("keypress" == f && !n.metaKey && !n.ctrlKey || o(t, u.modifiers))) {
				var l = !r && u.combo == i,
					p = r && u.seq == r && u.level == a;
				(l || p) && L[e].splice(c, 1), s.push(u)
			}
		return s
	}

	function c(e) {
		var t = [];
		return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), e.metaKey && t.push("meta"), t
	}

	function u(e) {
		return e.preventDefault ? void e.preventDefault() : void(e.returnValue = !1)
	}

	function s(e) {
		return e.stopPropagation ? void e.stopPropagation() : void(e.cancelBubble = !0)
	}

	function f(e, t, n, r) {
		D.stopCallback(t, t.target || t.srcElement, n, r) || e(t, n) === !1 && (u(t), s(t))
	}

	function l(e, t, n) {
		var r, o = a(e, t, n),
			c = {},
			u = 0,
			s = !1;
		for (r = 0; r < o.length; ++r) o[r].seq && (u = Math.max(u, o[r].level));
		for (r = 0; r < o.length; ++r)
			if (o[r].seq) {
				if (o[r].level != u) continue;
				s = !0, c[o[r].seq] = 1, f(o[r].callback, n, o[r].combo, o[r].seq)
			} else s || f(o[r].callback, n, o[r].combo);
		var l = "keypress" == n.type && S;
		n.type != j || h(e) || l || i(c), S = s && "keydown" == n.type
	}

	function p(e) {
		"number" != typeof e.which && (e.which = e.keyCode);
		var t = r(e);
		if (t) return "keyup" == e.type && N === t ? void(N = !1) : void D.handleKey(t, c(e), e)
	}

	function h(e) {
		return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e
	}

	function d() {
		clearTimeout(E), E = setTimeout(i, 1e3)
	}

	function y() {
		if (!C) {
			C = {};
			for (var e in K) e > 95 && 112 > e || K.hasOwnProperty(e) && (C[K[e]] = e)
		}
		return C
	}

	function v(e, t, n) {
		return n || (n = y()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), n
	}

	function m(e, t, n, o) {
		function a(t) {
			return function () {
				j = t, ++M[e], d()
			}
		}

		function c(t) {
			f(n, t, e), "keyup" !== o && (N = r(t)), setTimeout(i, 10)
		}
		M[e] = 0;
		for (var u = 0; u < t.length; ++u) {
			var s = u + 1 === t.length,
				l = s ? c : a(o || g(t[u + 1]).action);
			b(t[u], l, o, e, u)
		}
	}

	function k(e) {
		return "+" === e ? ["+"] : e.split("+")
	}

	function g(e, t) {
		var n, r, o, i = [];
		for (n = k(e), o = 0; o < n.length; ++o) r = n[o], T[r] && (r = T[r]), t && "keypress" != t && P[r] && (r = P[r], i.push("shift")), h(r) && i.push(r);
		return t = v(r, i, t), {
			key: r,
			modifiers: i,
			action: t
		}
	}

	function b(e, t, n, r, o) {
		A[e + ":" + n] = t, e = e.replace(/\s+/g, " ");
		var i, c = e.split(" ");
		return c.length > 1 ? void m(e, c, t, n) : (i = g(e, n), L[i.key] = L[i.key] || [], a(i.key, i.modifiers, {
			type: i.action
		}, r, e, o), void L[i.key][r ? "unshift" : "push"]({
			callback: t,
			modifiers: i.modifiers,
			action: i.action,
			seq: r,
			level: o,
			combo: e
		}))
	}

	function w(e, t, n) {
		for (var r = 0; r < e.length; ++r) b(e[r], t, n)
	}
	for (var C, E, K = {
		8: "backspace",
		9: "tab",
		13: "enter",
		16: "shift",
		17: "ctrl",
		18: "alt",
		20: "capslock",
		27: "esc",
		32: "space",
		33: "pageup",
		34: "pagedown",
		35: "end",
		36: "home",
		37: "left",
		38: "up",
		39: "right",
		40: "down",
		45: "ins",
		46: "del",
		91: "meta",
		93: "meta",
		224: "meta"
	}, q = {
		106: "*",
		107: "+",
		109: "-",
		110: ".",
		111: "/",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'"
	}, P = {
		"~": "`",
		"!": "1",
		"@": "2",
		"#": "3",
		$: "4",
		"%": "5",
		"^": "6",
		"&": "7",
		"*": "8",
		"(": "9",
		")": "0",
		_: "-",
		"+": "=",
		":": ";",
		'"': "'",
		"<": ",",
		">": ".",
		"?": "/",
		"|": "\\"
	}, T = {
		option: "alt",
		command: "meta",
		"return": "enter",
		escape: "esc",
		mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
	}, L = {}, A = {}, M = {}, N = !1, S = !1, j = !1, x = 1; 20 > x; ++x) K[111 + x] = "f" + x;
	for (x = 0; 9 >= x; ++x) K[x + 96] = x;
	n(t, "keypress", p), n(t, "keydown", p), n(t, "keyup", p);
	var D = {
		bindings: function () {
			return L
		},
		bind: function (e, t, n) {
			return e = e instanceof Array ? e : [e], w(e, t, n), this
		},
		unbind: function (e, t) {
			return D.bind(e, function () {}, t)
		},
		trigger: function (e, t) {
			return A[e + ":" + t] && A[e + ":" + t]({}, e), this
		},
		reset: function () {
			return L = {}, A = {}, this
		},
		stopCallback: function (e, t) {
			var n = t.tagName.toUpperCase();
			return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : "INPUT" == n || "SELECT" == n || "TEXTAREA" == n || t.isContentEditable
		},
		handleKey: l
	};
	e.Mousetrap = D, "function" == typeof define && define.amd && define(D)
}(window, document);
Mousetrap = function (n) {
	var a = {},
		r = n.stopCallback;
	return n.stopCallback = function (n, t, o, e) {
		return a[o] || a[e] ? !1 : r(n, t, o)
	}, n.bindGlobal = function (r, t, o) {
		if (n.bind(r, t, o), r instanceof Array)
			for (var e = 0; e < r.length; e++) a[r[e]] = !0;
		else a[r] = !0
	}, n
}(Mousetrap);
(function () {
	function e(e) {
		this.tokens = [], this.tokens.links = {}, this.options = e || a.defaults, this.rules = p.normal, this.options.gfm && (this.rules = this.options.tables ? p.tables : p.gfm)
	}

	function t(e, t) {
		if (this.options = t || a.defaults, this.links = e, this.rules = u.normal, this.renderer = this.options.renderer || new n, this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");
		this.options.gfm ? this.rules = this.options.breaks ? u.breaks : u.gfm : this.options.pedantic && (this.rules = u.pedantic)
	}

	function n(e) {
		this.options = e || {}
	}

	function r(e) {
		this.tokens = [], this.token = null, this.options = e || a.defaults, this.options.renderer = this.options.renderer || new n, this.renderer = this.options.renderer, this.renderer.options = this.options
	}

	function s(e, t) {
		return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
	}

	function i(e) {
		return e.replace(/&([#\w]+);/g, function (e, t) {
			return t = t.toLowerCase(), "colon" === t ? ":" : "#" === t.charAt(0) ? String.fromCharCode("x" === t.charAt(1) ? parseInt(t.substring(2), 16) : +t.substring(1)) : ""
		})
	}

	function l(e, t) {
		return e = e.source, t = t || "",
			function n(r, s) {
				return r ? (s = s.source || s, s = s.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(r, s), n) : new RegExp(e, t)
			}
	}

	function o() {}

	function h(e) {
		for (var t, n, r = 1; r < arguments.length; r++) {
			t = arguments[r];
			for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
		}
		return e
	}

	function a(t, n, i) {
		if (i || "function" == typeof n) {
			i || (i = n, n = null), n = h({}, a.defaults, n || {});
			var l, o, p = n.highlight,
				u = 0;
			try {
				l = e.lex(t, n)
			} catch (c) {
				return i(c)
			}
			o = l.length;
			var g = function () {
				var e, t;
				try {
					e = r.parse(l, n)
				} catch (s) {
					t = s
				}
				return n.highlight = p, t ? i(t) : i(null, e)
			};
			if (!p || p.length < 3) return g();
			if (delete n.highlight, !o) return g();
			for (; u < l.length; u++)! function (e) {
				return "code" !== e.type ? --o || g() : p(e.text, e.lang, function (t, n) {
					return null == n || n === e.text ? --o || g() : (e.text = n, e.escaped = !0, void(--o || g()))
				})
			}(l[u])
		} else try {
			return n && (n = h({}, a.defaults, n)), r.parse(e.lex(t, n), n)
		} catch (c) {
			if (c.message += "\nPlease report this to https://github.com/chjj/marked.", (n || a.defaults).silent) return "<p>An error occured:</p><pre>" + s(c.message + "", !0) + "</pre>";
			throw c
		}
	}
	var p = {
		newline: /^\n+/,
		code: /^( {4}[^\n]+\n*)+/,
		fences: o,
		hr: /^( *[-*_]){3,} *(?:\n+|$)/,
		heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
		nptable: o,
		lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
		blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
		list: /^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
		html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
		def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
		table: o,
		paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
		text: /^[^\n]+/
	};
	p.bullet = /(?:[*+-]|\d+\.)/, p.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, p.item = l(p.item, "gm")(/bull/g, p.bullet)(), p.list = l(p.list)(/bull/g, p.bullet)("hr", /\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)(), p._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", p.html = l(p.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, p._tag)(), p.paragraph = l(p.paragraph)("hr", p.hr)("heading", p.heading)("lheading", p.lheading)("blockquote", p.blockquote)("tag", "<" + p._tag)("def", p.def)(), p.normal = h({}, p), p.gfm = h({}, p.normal, {
		fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
		paragraph: /^/
	}), p.gfm.paragraph = l(p.paragraph)("(?!", "(?!" + p.gfm.fences.source.replace("\\1", "\\2") + "|" + p.list.source.replace("\\1", "\\3") + "|")(), p.tables = h({}, p.gfm, {
		nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
		table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	}), e.rules = p, e.lex = function (t, n) {
		var r = new e(n);
		return r.lex(t)
	}, e.prototype.lex = function (e) {
		return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0)
	}, e.prototype.token = function (e, t) {
		for (var n, r, s, i, l, o, h, a, u, e = e.replace(/^ +$/gm, ""); e;)
			if ((s = this.rules.newline.exec(e)) && (e = e.substring(s[0].length), s[0].length > 1 && this.tokens.push({
				type: "space"
			})), s = this.rules.code.exec(e)) e = e.substring(s[0].length), s = s[0].replace(/^ {4}/gm, ""), this.tokens.push({
				type: "code",
				text: this.options.pedantic ? s : s.replace(/\n+$/, "")
			});
			else if (s = this.rules.fences.exec(e)) e = e.substring(s[0].length), this.tokens.push({
			type: "code",
			lang: s[2],
			text: s[3]
		});
		else if (s = this.rules.heading.exec(e)) e = e.substring(s[0].length), this.tokens.push({
			type: "heading",
			depth: s[1].length,
			text: s[2]
		});
		else if (t && (s = this.rules.nptable.exec(e))) {
			for (e = e.substring(s[0].length), o = {
				type: "table",
				header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
				align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
				cells: s[3].replace(/\n$/, "").split("\n")
			}, a = 0; a < o.align.length; a++) o.align[a] = /^ *-+: *$/.test(o.align[a]) ? "right" : /^ *:-+: *$/.test(o.align[a]) ? "center" : /^ *:-+ *$/.test(o.align[a]) ? "left" : null;
			for (a = 0; a < o.cells.length; a++) o.cells[a] = o.cells[a].split(/ *\| */);
			this.tokens.push(o)
		} else if (s = this.rules.lheading.exec(e)) e = e.substring(s[0].length), this.tokens.push({
			type: "heading",
			depth: "=" === s[2] ? 1 : 2,
			text: s[1]
		});
		else if (s = this.rules.hr.exec(e)) e = e.substring(s[0].length), this.tokens.push({
			type: "hr"
		});
		else if (s = this.rules.blockquote.exec(e)) e = e.substring(s[0].length), this.tokens.push({
			type: "blockquote_start"
		}), s = s[0].replace(/^ *> ?/gm, ""), this.token(s, t), this.tokens.push({
			type: "blockquote_end"
		});
		else if (s = this.rules.list.exec(e)) {
			for (e = e.substring(s[0].length), i = s[2], this.tokens.push({
				type: "list_start",
				ordered: i.length > 1
			}), s = s[0].match(this.rules.item), n = !1, u = s.length, a = 0; u > a; a++) o = s[a], h = o.length, o = o.replace(/^ *([*+-]|\d+\.) +/, ""), ~o.indexOf("\n ") && (h -= o.length, o = this.options.pedantic ? o.replace(/^ {1,4}/gm, "") : o.replace(new RegExp("^ {1," + h + "}", "gm"), "")), this.options.smartLists && a !== u - 1 && (l = p.bullet.exec(s[a + 1])[0], i === l || i.length > 1 && l.length > 1 || (e = s.slice(a + 1).join("\n") + e, a = u - 1)), r = n || /\n\n(?!\s*$)/.test(o), a !== u - 1 && (n = "\n" === o.charAt(o.length - 1), r || (r = n)), this.tokens.push({
				type: r ? "loose_item_start" : "list_item_start"
			}), this.token(o, !1), this.tokens.push({
				type: "list_item_end"
			});
			this.tokens.push({
				type: "list_end"
			})
		} else if (s = this.rules.html.exec(e)) e = e.substring(s[0].length), this.tokens.push({
			type: this.options.sanitize ? "paragraph" : "html",
			pre: "pre" === s[1] || "script" === s[1] || "style" === s[1],
			text: s[0]
		});
		else if (t && (s = this.rules.def.exec(e))) e = e.substring(s[0].length), this.tokens.links[s[1].toLowerCase()] = {
			href: s[2],
			title: s[3]
		};
		else if (t && (s = this.rules.table.exec(e))) {
			for (e = e.substring(s[0].length), o = {
				type: "table",
				header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
				align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
				cells: s[3].replace(/(?: *\| *)?\n$/, "").split("\n")
			}, a = 0; a < o.align.length; a++) o.align[a] = /^ *-+: *$/.test(o.align[a]) ? "right" : /^ *:-+: *$/.test(o.align[a]) ? "center" : /^ *:-+ *$/.test(o.align[a]) ? "left" : null;
			for (a = 0; a < o.cells.length; a++) o.cells[a] = o.cells[a].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
			this.tokens.push(o)
		} else if (t && (s = this.rules.paragraph.exec(e))) e = e.substring(s[0].length), this.tokens.push({
			type: "paragraph",
			text: "\n" === s[1].charAt(s[1].length - 1) ? s[1].slice(0, -1) : s[1]
		});
		else if (s = this.rules.text.exec(e)) e = e.substring(s[0].length), this.tokens.push({
			type: "text",
			text: s[0]
		});
		else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
		return this.tokens
	};
	var u = {
		escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
		autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
		url: o,
		tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
		link: /^!?\[(inside)\]\(href\)/,
		reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
		nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
		strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
		em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
		code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
		br: /^ {2,}\n(?!\s*$)/,
		del: o,
		text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	};
	u._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, u._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, u.link = l(u.link)("inside", u._inside)("href", u._href)(), u.reflink = l(u.reflink)("inside", u._inside)(), u.normal = h({}, u), u.pedantic = h({}, u.normal, {
		strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
		em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	}), u.gfm = h({}, u.normal, {
		escape: l(u.escape)("])", "~|])")(),
		url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
		del: /^~~(?=\S)([\s\S]*?\S)~~/,
		text: l(u.text)("]|", "~]|")("|", "|https?://|")()
	}), u.breaks = h({}, u.gfm, {
		br: l(u.br)("{2,}", "*")(),
		text: l(u.gfm.text)("{2,}", "*")()
	}), t.rules = u, t.output = function (e, n, r) {
		var s = new t(n, r);
		return s.output(e)
	}, t.prototype.output = function (e) {
		for (var t, n, r, i, l = ""; e;)
			if (i = this.rules.escape.exec(e)) e = e.substring(i[0].length), l += i[1];
			else if (i = this.rules.autolink.exec(e)) e = e.substring(i[0].length), "@" === i[2] ? (n = this.mangle(":" === i[1].charAt(6) ? i[1].substring(7) : i[1]), r = this.mangle("mailto:") + n) : (n = s(i[1]), r = n), l += this.renderer.link(r, null, n);
		else if (i = this.rules.url.exec(e)) e = e.substring(i[0].length), n = s(i[1]), r = n, l += this.renderer.link(r, null, n);
		else if (i = this.rules.tag.exec(e)) e = e.substring(i[0].length), l += this.options.sanitize ? s(i[0]) : i[0];
		else if (i = this.rules.link.exec(e)) e = e.substring(i[0].length), l += this.outputLink(i, {
			href: i[2],
			title: i[3]
		});
		else if ((i = this.rules.reflink.exec(e)) || (i = this.rules.nolink.exec(e))) {
			if (e = e.substring(i[0].length), t = (i[2] || i[1]).replace(/\s+/g, " "), t = this.links[t.toLowerCase()], !t || !t.href) {
				l += i[0].charAt(0), e = i[0].substring(1) + e;
				continue
			}
			l += this.outputLink(i, t)
		} else if (i = this.rules.strong.exec(e)) e = e.substring(i[0].length), l += this.renderer.strong(this.output(i[2] || i[1]));
		else if (i = this.rules.em.exec(e)) e = e.substring(i[0].length), l += this.renderer.em(this.output(i[2] || i[1]));
		else if (i = this.rules.code.exec(e)) e = e.substring(i[0].length), l += this.renderer.codespan(s(i[2], !0));
		else if (i = this.rules.br.exec(e)) e = e.substring(i[0].length), l += this.renderer.br();
		else if (i = this.rules.del.exec(e)) e = e.substring(i[0].length), l += this.renderer.del(this.output(i[1]));
		else if (i = this.rules.text.exec(e)) e = e.substring(i[0].length), l += s(this.smartypants(i[0]));
		else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
		return l
	}, t.prototype.outputLink = function (e, t) {
		var n = s(t.href),
			r = t.title ? s(t.title) : null;
		return "!" !== e[0].charAt(0) ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, s(e[1]))
	}, t.prototype.smartypants = function (e) {
		return this.options.smartypants ? e.replace(/--/g, "—").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
	}, t.prototype.mangle = function (e) {
		for (var t, n = "", r = e.length, s = 0; r > s; s++) t = e.charCodeAt(s), Math.random() > .5 && (t = "x" + t.toString(16)), n += "&#" + t + ";";
		return n
	}, n.prototype.code = function (e, t, n) {
		if (this.options.highlight) {
			var r = this.options.highlight(e, t);
			null != r && r !== e && (n = !0, e = r)
		}
		return t ? '<pre><code class="' + this.options.langPrefix + s(t, !0) + '">' + (n ? e : s(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : s(e, !0)) + "\n</code></pre>"
	}, n.prototype.blockquote = function (e) {
		return "<blockquote>\n" + e + "</blockquote>\n"
	}, n.prototype.html = function (e) {
		return e
	}, n.prototype.heading = function (e, t, n) {
		return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n"
	}, n.prototype.hr = function () {
		return "<hr>\n"
	}, n.prototype.list = function (e, t) {
		var n = t ? "ol" : "ul";
		return "<" + n + ">\n" + e + "</" + n + ">\n"
	}, n.prototype.listitem = function (e) {
		return "<li>" + e + "</li>\n"
	}, n.prototype.paragraph = function (e) {
		return "<p>" + e + "</p>\n"
	}, n.prototype.table = function (e, t) {
		return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n"
	}, n.prototype.tablerow = function (e) {
		return "<tr>\n" + e + "</tr>\n"
	}, n.prototype.tablecell = function (e, t) {
		var n = t.header ? "th" : "td",
			r = t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">";
		return r + e + "</" + n + ">\n"
	}, n.prototype.strong = function (e) {
		return "<strong>" + e + "</strong>"
	}, n.prototype.em = function (e) {
		return "<em>" + e + "</em>"
	}, n.prototype.codespan = function (e) {
		return "<code>" + e + "</code>"
	}, n.prototype.br = function () {
		return "<br>"
	}, n.prototype.del = function (e) {
		return "<del>" + e + "</del>"
	}, n.prototype.link = function (e, t, n) {
		if (this.options.sanitize) {
			try {
				var r = decodeURIComponent(i(e)).replace(/[^\w:]/g, "").toLowerCase()
			} catch (s) {
				return ""
			}
			if (0 === r.indexOf("javascript:")) return ""
		}
		var l = '<a href="' + e + '"';
		return t && (l += ' title="' + t + '"'), l += ">" + n + "</a>"
	}, n.prototype.image = function (e, t, n) {
		var r = '<img src="' + e + '" alt="' + n + '"';
		return t && (r += ' title="' + t + '"'), r += ">"
	}, r.parse = function (e, t, n) {
		var s = new r(t, n);
		return s.parse(e)
	}, r.prototype.parse = function (e) {
		this.inline = new t(e.links, this.options, this.renderer), this.tokens = e.reverse();
		for (var n = ""; this.next();) n += this.tok();
		return n
	}, r.prototype.next = function () {
		return this.token = this.tokens.pop()
	}, r.prototype.peek = function () {
		return this.tokens[this.tokens.length - 1] || 0
	}, r.prototype.parseText = function () {
		for (var e = this.token.text;
			"text" === this.peek().type;) e += "\n" + this.next().text;
		return this.inline.output(e)
	}, r.prototype.tok = function () {
		switch (this.token.type) {
		case "space":
			return "";
		case "hr":
			return this.renderer.hr();
		case "heading":
			return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
		case "code":
			return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
		case "table":
			var e, t, n, r, s, i = "",
				l = "";
			for (n = "", e = 0; e < this.token.header.length; e++) r = {
				header: !0,
				align: this.token.align[e]
			}, n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
				header: !0,
				align: this.token.align[e]
			});
			for (i += this.renderer.tablerow(n), e = 0; e < this.token.cells.length; e++) {
				for (t = this.token.cells[e], n = "", s = 0; s < t.length; s++) n += this.renderer.tablecell(this.inline.output(t[s]), {
					header: !1,
					align: this.token.align[s]
				});
				l += this.renderer.tablerow(n)
			}
			return this.renderer.table(i, l);
		case "blockquote_start":
			for (var l = "";
				"blockquote_end" !== this.next().type;) l += this.tok();
			return this.renderer.blockquote(l);
		case "list_start":
			for (var l = "", o = this.token.ordered;
				"list_end" !== this.next().type;) l += this.tok();
			return this.renderer.list(l, o);
		case "list_item_start":
			for (var l = "";
				"list_item_end" !== this.next().type;) l += "text" === this.token.type ? this.parseText() : this.tok();
			return this.renderer.listitem(l);
		case "loose_item_start":
			for (var l = "";
				"list_item_end" !== this.next().type;) l += this.tok();
			return this.renderer.listitem(l);
		case "html":
			var h = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
			return this.renderer.html(h);
		case "paragraph":
			return this.renderer.paragraph(this.inline.output(this.token.text));
		case "text":
			return this.renderer.paragraph(this.parseText())
		}
	}, o.exec = o, a.options = a.setOptions = function (e) {
		return h(a.defaults, e), a
	}, a.defaults = {
		gfm: !0,
		tables: !0,
		breaks: !1,
		pedantic: !1,
		sanitize: !1,
		smartLists: !1,
		silent: !1,
		highlight: null,
		langPrefix: "lang-",
		smartypants: !1,
		headerPrefix: "",
		renderer: new n
	}, a.Parser = r, a.parser = r.parse, a.Renderer = n, a.Lexer = e, a.lexer = e.lex, a.InlineLexer = t, a.inlineLexer = t.output, a.parse = a, "object" == typeof exports ? module.exports = a : "function" == typeof define && define.amd ? define(function () {
		return a
	}) : this.marked = a
}).call(function () {
	return this || ("undefined" != typeof window ? window : global)
}());
(function () {
	var t = Array.prototype.slice;
	this.JsPath = function () {
		function n(t, e) {
			return n.setAt({}, t, e || {})
		}
		var e;
		return e = /^(string|number|boolean)$/, ["forEach", "indexOf", "join", "pop", "reverse", "shift", "sort", "splice", "unshift", "push"].forEach(function (e) {
			return n[e + "At"] = function () {
				var r, i, o, s;
				if (r = arguments[0], i = arguments[1], o = 3 <= arguments.length ? t.call(arguments, 2) : [], s = n.getAt(r, i), "function" == typeof (null != s ? s[e] : void 0)) return s[e].apply(s, o);
				throw new Error("Does not implement method " + e + " at " + i)
			}
		}), n.getAt = function (t, n) {
			var e;
			for (n = "function" == typeof n.split ? n.split(".") : n.slice(); null != t && (e = n.shift());) t = t[e];
			return t
		}, n.setAt = function (t, n, r) {
			var i, o, s, f;
			for (n = "function" == typeof n.split ? n.split(".") : n.slice(), o = n.pop(), s = [], f = t; i = n.shift();) {
				if (e.test(typeof f[i])) throw new Error("" + s.concat(i).join(".") + " is\nprimitive, and cannot be extended.");
				f = f[i] || (f[i] = {}), s.push(i)
			}
			return f[o] = r, t
		}, n.assureAt = function (t, n, e) {
			var r;
			return (r = this.getAt(t, n)) ? r : (this.setAt(t, n, e), e)
		}, n.deleteAt = function (t, n) {
			var r, i, o;
			for (n = "function" == typeof n.split ? n.split(".") : n.slice(), o = [], i = n.pop(); r = n.shift();) {
				if (e.test(typeof t[r])) throw new Error("" + o.concat(r).join(".") + " is\nprimitive; cannot drill any deeper.");
				if (!(t = t[r])) return !1;
				o.push(r)
			}
			return delete t[i]
		}, n
	}.call(this)
}).call(this);
! function (t, e) {
	"use strict";

	function n() {
		if (!i.READY) {
			i.event.determineEventTypes();
			for (var t in i.gestures) i.gestures.hasOwnProperty(t) && i.detection.register(i.gestures[t]);
			i.event.onTouch(i.DOCUMENT, i.EVENT_MOVE, i.detection.detect), i.event.onTouch(i.DOCUMENT, i.EVENT_END, i.detection.detect), i.READY = !0
		}
	}
	var i = function (t, e) {
		return new i.Instance(t, e || {})
	};
	i.defaults = {
		stop_browser_behavior: {
			userSelect: "none",
			touchAction: "none",
			touchCallout: "none",
			contentZooming: "none",
			userDrag: "none",
			tapHighlightColor: "rgba(0,0,0,0)"
		}
	}, i.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, i.HAS_TOUCHEVENTS = "ontouchstart" in t, i.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, i.NO_MOUSEEVENTS = i.HAS_TOUCHEVENTS && navigator.userAgent.match(i.MOBILE_REGEX), i.EVENT_TYPES = {}, i.DIRECTION_DOWN = "down", i.DIRECTION_LEFT = "left", i.DIRECTION_UP = "up", i.DIRECTION_RIGHT = "right", i.POINTER_MOUSE = "mouse", i.POINTER_TOUCH = "touch", i.POINTER_PEN = "pen", i.EVENT_START = "start", i.EVENT_MOVE = "move", i.EVENT_END = "end", i.DOCUMENT = document, i.plugins = {}, i.READY = !1, i.Instance = function (t, e) {
		var r = this;
		return n(), this.element = t, this.enabled = !0, this.options = i.utils.extend(i.utils.extend({}, i.defaults), e || {}), this.options.stop_browser_behavior && i.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), i.event.onTouch(t, i.EVENT_START, function (t) {
			r.enabled && i.detection.startDetect(r, t)
		}), this
	}, i.Instance.prototype = {
		on: function (t, e) {
			for (var n = t.split(" "), i = 0; i < n.length; i++) this.element.addEventListener(n[i], e, !1);
			return this
		},
		off: function (t, e) {
			for (var n = t.split(" "), i = 0; i < n.length; i++) this.element.removeEventListener(n[i], e, !1);
			return this
		},
		trigger: function (t, e) {
			var n = i.DOCUMENT.createEvent("Event");
			n.initEvent(t, !0, !0), n.gesture = e;
			var r = this.element;
			return i.utils.hasParent(e.target, r) && (r = e.target), r.dispatchEvent(n), this
		},
		enable: function (t) {
			return this.enabled = t, this
		}
	};
	var r = null,
		o = !1,
		s = !1;
	i.event = {
		bindDom: function (t, e, n) {
			for (var i = e.split(" "), r = 0; r < i.length; r++) t.addEventListener(i[r], n, !1)
		},
		onTouch: function (t, e, n) {
			var a = this;
			this.bindDom(t, i.EVENT_TYPES[e], function (c) {
				var u = c.type.toLowerCase();
				if (!u.match(/mouse/) || !s) {
					(u.match(/touch/) || u.match(/pointerdown/) || u.match(/mouse/) && 1 === c.which) && (o = !0), u.match(/touch|pointer/) && (s = !0);
					var h = 0;
					o && (i.HAS_POINTEREVENTS && e != i.EVENT_END ? h = i.PointerEvent.updatePointer(e, c) : u.match(/touch/) ? h = c.touches.length : s || (h = u.match(/up/) ? 0 : 1), h > 0 && e == i.EVENT_END ? e = i.EVENT_MOVE : h || (e = i.EVENT_END), h || null === r ? r = c : c = r, n.call(i.detection, a.collectEventData(t, e, c)), i.HAS_POINTEREVENTS && e == i.EVENT_END && (h = i.PointerEvent.updatePointer(e, c))), h || (r = null, o = !1, s = !1, i.PointerEvent.reset())
				}
			})
		},
		determineEventTypes: function () {
			var t;
			t = i.HAS_POINTEREVENTS ? i.PointerEvent.getEvents() : i.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], i.EVENT_TYPES[i.EVENT_START] = t[0], i.EVENT_TYPES[i.EVENT_MOVE] = t[1], i.EVENT_TYPES[i.EVENT_END] = t[2]
		},
		getTouchList: function (t) {
			return i.HAS_POINTEREVENTS ? i.PointerEvent.getTouchList() : t.touches ? t.touches : [{
				identifier: 1,
				pageX: t.pageX,
				pageY: t.pageY,
				target: t.target
			}]
		},
		collectEventData: function (t, e, n) {
			var r = this.getTouchList(n, e),
				o = i.POINTER_TOUCH;
			return (n.type.match(/mouse/) || i.PointerEvent.matchType(i.POINTER_MOUSE, n)) && (o = i.POINTER_MOUSE), {
				center: i.utils.getCenter(r),
				timeStamp: (new Date).getTime(),
				target: n.target,
				touches: r,
				eventType: e,
				pointerType: o,
				srcEvent: n,
				preventDefault: function () {
					this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
				},
				stopPropagation: function () {
					this.srcEvent.stopPropagation()
				},
				stopDetect: function () {
					return i.detection.stopDetect()
				}
			}
		}
	}, i.PointerEvent = {
		pointers: {},
		getTouchList: function () {
			var t = this,
				e = [];
			return Object.keys(t.pointers).sort().forEach(function (n) {
				e.push(t.pointers[n])
			}), e
		},
		updatePointer: function (t, e) {
			return t == i.EVENT_END ? this.pointers = {} : (e.identifier = e.pointerId, this.pointers[e.pointerId] = e), Object.keys(this.pointers).length
		},
		matchType: function (t, e) {
			if (!e.pointerType) return !1;
			var n = {};
			return n[i.POINTER_MOUSE] = e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == i.POINTER_MOUSE, n[i.POINTER_TOUCH] = e.pointerType == e.MSPOINTER_TYPE_TOUCH || e.pointerType == i.POINTER_TOUCH, n[i.POINTER_PEN] = e.pointerType == e.MSPOINTER_TYPE_PEN || e.pointerType == i.POINTER_PEN, n[t]
		},
		getEvents: function () {
			return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
		},
		reset: function () {
			this.pointers = {}
		}
	}, i.utils = {
		extend: function (t, n, i) {
			for (var r in n) t[r] !== e && i || (t[r] = n[r]);
			return t
		},
		hasParent: function (t, e) {
			for (; t;) {
				if (t == e) return !0;
				t = t.parentNode
			}
			return !1
		},
		getCenter: function (t) {
			for (var e = [], n = [], i = 0, r = t.length; r > i; i++) e.push(t[i].pageX), n.push(t[i].pageY);
			return {
				pageX: (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2,
				pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2
			}
		},
		getVelocity: function (t, e, n) {
			return {
				x: Math.abs(e / t) || 0,
				y: Math.abs(n / t) || 0
			}
		},
		getAngle: function (t, e) {
			var n = e.pageY - t.pageY,
				i = e.pageX - t.pageX;
			return 180 * Math.atan2(n, i) / Math.PI
		},
		getDirection: function (t, e) {
			var n = Math.abs(t.pageX - e.pageX),
				r = Math.abs(t.pageY - e.pageY);
			return n >= r ? t.pageX - e.pageX > 0 ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT : t.pageY - e.pageY > 0 ? i.DIRECTION_UP : i.DIRECTION_DOWN
		},
		getDistance: function (t, e) {
			var n = e.pageX - t.pageX,
				i = e.pageY - t.pageY;
			return Math.sqrt(n * n + i * i)
		},
		getScale: function (t, e) {
			return t.length >= 2 && e.length >= 2 ? this.getDistance(e[0], e[1]) / this.getDistance(t[0], t[1]) : 1
		},
		getRotation: function (t, e) {
			return t.length >= 2 && e.length >= 2 ? this.getAngle(e[1], e[0]) - this.getAngle(t[1], t[0]) : 0
		},
		isVertical: function (t) {
			return t == i.DIRECTION_UP || t == i.DIRECTION_DOWN
		},
		stopDefaultBrowserBehavior: function (t, e) {
			var n, i = ["webkit", "khtml", "moz", "ms", "o", ""];
			if (e && t.style) {
				for (var r = 0; r < i.length; r++)
					for (var o in e) e.hasOwnProperty(o) && (n = o, i[r] && (n = i[r] + n.substring(0, 1).toUpperCase() + n.substring(1)), t.style[n] = e[o]);
				"none" == e.userSelect && (t.onselectstart = function () {
					return !1
				})
			}
		}
	}, i.detection = {
		gestures: [],
		current: null,
		previous: null,
		stopped: !1,
		startDetect: function (t, e) {
			this.current || (this.stopped = !1, this.current = {
				inst: t,
				startEvent: i.utils.extend({}, e),
				lastEvent: !1,
				name: ""
			}, this.detect(e))
		},
		detect: function (t) {
			if (this.current && !this.stopped) {
				t = this.extendEventData(t);
				for (var e = this.current.inst.options, n = 0, r = this.gestures.length; r > n; n++) {
					var o = this.gestures[n];
					if (!this.stopped && e[o.name] !== !1 && o.handler.call(o, t, this.current.inst) === !1) {
						this.stopDetect();
						break
					}
				}
				return this.current && (this.current.lastEvent = t), t.eventType == i.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t
			}
		},
		stopDetect: function () {
			this.previous = i.utils.extend({}, this.current), this.current = null, this.stopped = !0
		},
		extendEventData: function (t) {
			var e = this.current.startEvent;
			if (e && (t.touches.length != e.touches.length || t.touches === e.touches)) {
				e.touches = [];
				for (var n = 0, r = t.touches.length; r > n; n++) e.touches.push(i.utils.extend({}, t.touches[n]))
			}
			var o = t.timeStamp - e.timeStamp,
				s = t.center.pageX - e.center.pageX,
				a = t.center.pageY - e.center.pageY,
				c = i.utils.getVelocity(o, s, a);
			return i.utils.extend(t, {
				deltaTime: o,
				deltaX: s,
				deltaY: a,
				velocityX: c.x,
				velocityY: c.y,
				distance: i.utils.getDistance(e.center, t.center),
				angle: i.utils.getAngle(e.center, t.center),
				direction: i.utils.getDirection(e.center, t.center),
				scale: i.utils.getScale(e.touches, t.touches),
				rotation: i.utils.getRotation(e.touches, t.touches),
				startEvent: e
			}), t
		},
		register: function (t) {
			var n = t.defaults || {};
			return n[t.name] === e && (n[t.name] = !0), i.utils.extend(i.defaults, n, !0), t.index = t.index || 1e3, this.gestures.push(t), this.gestures.sort(function (t, e) {
				return t.index < e.index ? -1 : t.index > e.index ? 1 : 0
			}), this.gestures
		}
	}, i.gestures = i.gestures || {}, i.gestures.Hold = {
		name: "hold",
		index: 10,
		defaults: {
			hold_timeout: 500,
			hold_threshold: 1
		},
		timer: null,
		handler: function (t, e) {
			switch (t.eventType) {
			case i.EVENT_START:
				clearTimeout(this.timer), i.detection.current.name = this.name, this.timer = setTimeout(function () {
					"hold" == i.detection.current.name && e.trigger("hold", t)
				}, e.options.hold_timeout);
				break;
			case i.EVENT_MOVE:
				t.distance > e.options.hold_threshold && clearTimeout(this.timer);
				break;
			case i.EVENT_END:
				clearTimeout(this.timer)
			}
		}
	}, i.gestures.Tap = {
		name: "tap",
		index: 100,
		defaults: {
			tap_max_touchtime: 250,
			tap_max_distance: 10,
			tap_always: !0,
			doubletap_distance: 20,
			doubletap_interval: 300
		},
		handler: function (t, e) {
			if (t.eventType == i.EVENT_END) {
				var n = i.detection.previous,
					r = !1;
				if (t.deltaTime > e.options.tap_max_touchtime || t.distance > e.options.tap_max_distance) return;
				n && "tap" == n.name && t.timeStamp - n.lastEvent.timeStamp < e.options.doubletap_interval && t.distance < e.options.doubletap_distance && (e.trigger("doubletap", t), r = !0), (!r || e.options.tap_always) && (i.detection.current.name = "tap", e.trigger(i.detection.current.name, t))
			}
		}
	}, i.gestures.Swipe = {
		name: "swipe",
		index: 40,
		defaults: {
			swipe_max_touches: 1,
			swipe_velocity: .7
		},
		handler: function (t, e) {
			if (t.eventType == i.EVENT_END) {
				if (e.options.swipe_max_touches > 0 && t.touches.length > e.options.swipe_max_touches) return;
				(t.velocityX > e.options.swipe_velocity || t.velocityY > e.options.swipe_velocity) && (e.trigger(this.name, t), e.trigger(this.name + t.direction, t))
			}
		}
	}, i.gestures.Drag = {
		name: "drag",
		index: 50,
		defaults: {
			drag_min_distance: 10,
			drag_max_touches: 1,
			drag_block_horizontal: !1,
			drag_block_vertical: !1,
			drag_lock_to_axis: !1,
			drag_lock_min_distance: 25
		},
		triggered: !1,
		handler: function (t, e) {
			if (i.detection.current.name != this.name && this.triggered) return e.trigger(this.name + "end", t), void(this.triggered = !1);
			if (!(e.options.drag_max_touches > 0 && t.touches.length > e.options.drag_max_touches)) switch (t.eventType) {
			case i.EVENT_START:
				this.triggered = !1;
				break;
			case i.EVENT_MOVE:
				if (t.distance < e.options.drag_min_distance && i.detection.current.name != this.name) return;
				i.detection.current.name = this.name, (i.detection.current.lastEvent.drag_locked_to_axis || e.options.drag_lock_to_axis && e.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);
				var n = i.detection.current.lastEvent.direction;
				t.drag_locked_to_axis && n !== t.direction && (t.direction = i.utils.isVertical(n) ? t.deltaY < 0 ? i.DIRECTION_UP : i.DIRECTION_DOWN : t.deltaX < 0 ? i.DIRECTION_LEFT : i.DIRECTION_RIGHT), this.triggered || (e.trigger(this.name + "start", t), this.triggered = !0), e.trigger(this.name, t), e.trigger(this.name + t.direction, t), (e.options.drag_block_vertical && i.utils.isVertical(t.direction) || e.options.drag_block_horizontal && !i.utils.isVertical(t.direction)) && t.preventDefault();
				break;
			case i.EVENT_END:
				this.triggered && e.trigger(this.name + "end", t), this.triggered = !1
			}
		}
	}, i.gestures.Transform = {
		name: "transform",
		index: 45,
		defaults: {
			transform_min_scale: .01,
			transform_min_rotation: 1,
			transform_always_block: !1
		},
		triggered: !1,
		handler: function (t, e) {
			if (i.detection.current.name != this.name && this.triggered) return e.trigger(this.name + "end", t), void(this.triggered = !1);
			if (!(t.touches.length < 2)) switch (e.options.transform_always_block && t.preventDefault(), t.eventType) {
			case i.EVENT_START:
				this.triggered = !1;
				break;
			case i.EVENT_MOVE:
				var n = Math.abs(1 - t.scale),
					r = Math.abs(t.rotation);
				if (n < e.options.transform_min_scale && r < e.options.transform_min_rotation) return;
				i.detection.current.name = this.name, this.triggered || (e.trigger(this.name + "start", t), this.triggered = !0), e.trigger(this.name, t), r > e.options.transform_min_rotation && e.trigger("rotate", t), n > e.options.transform_min_scale && (e.trigger("pinch", t), e.trigger("pinch" + (t.scale < 1 ? "in" : "out"), t));
				break;
			case i.EVENT_END:
				this.triggered && e.trigger(this.name + "end", t), this.triggered = !1
			}
		}
	}, i.gestures.Touch = {
		name: "touch",
		index: -1 / 0,
		defaults: {
			prevent_default: !1,
			prevent_mouseevents: !1
		},
		handler: function (t, e) {
			return e.options.prevent_mouseevents && t.pointerType == i.POINTER_MOUSE ? void t.stopDetect() : (e.options.prevent_default && t.preventDefault(), void(t.eventType == i.EVENT_START && e.trigger(this.name, t)))
		}
	}, i.gestures.Release = {
		name: "release",
		index: 1 / 0,
		handler: function (t, e) {
			t.eventType == i.EVENT_END && e.trigger(this.name, t)
		}
	}, "object" == typeof module && "object" == typeof module.exports ? module.exports = i : (t.Hammer = i, "function" == typeof t.define && t.define.amd && t.define("hammer", [], function () {
		return i
	}))
}(this);