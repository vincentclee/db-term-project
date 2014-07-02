! function t(e, n, i) {
	function o(r, a) {
		if (!n[r]) {
			if (!e[r]) {
				var l = "function" == typeof require && require;
				if (!a && l) return l(r, !0);
				if (s) return s(r, !0);
				throw new Error("Cannot find module '" + r + "'")
			}
			var u = n[r] = {
				exports: {}
			};
			e[r][0].call(u.exports, function (t) {
				var n = e[r][1][t];
				return o(n ? n : t)
			}, u, u.exports, t, e, n, i)
		}
		return n[r].exports
	}
	for (var s = "function" == typeof require && require, r = 0; r < i.length; r++) o(i[r]);
	return o
}({
	1: [
		function (t, e) {
			function n(t) {
				return '"' + t.replace(/"/, '\\"') + '"'
			}

			function i(t) {
				if ("string" != typeof t) throw Error("Invalid request opion. attribute must be a non-zero length string.");
				if (t = t.trim(), !t) throw Error("Invalid request opion. attribute must be a non-zero length string.");
				if (!t.match(w)) throw Error("Invalid request option. invalid attribute name: " + t);
				return t
			}

			function o(t) {
				if (!t.trim().length) throw Error("Invalid request option: elementAttributes must contain at least one attribute.");
				for (var e = {}, n = {}, o = t.split(/\s+/), s = 0; s < o.length; s++) {
					var r = o[s];
					if (r) {
						var r = i(r),
							a = r.toLowerCase();
						if (e[a]) throw Error("Invalid request option: observing multiple case variations of the same attribute is not supported.");
						n[r] = !0, e[a] = !0
					}
				}
				return Object.keys(n)
			}

			function s(t) {
				var e = {};
				return t.forEach(function (t) {
					t.qualifiers.forEach(function (t) {
						e[t.attrName] = !0
					})
				}), Object.keys(e)
			}
			var r, a = this.__extends || function (t, e) {
				function n() {
					this.constructor = t
				}
				for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
				n.prototype = e.prototype, t.prototype = new n
			};
			if (r = "undefined" != typeof WebKitMutationObserver ? WebKitMutationObserver : MutationObserver, void 0 === r) throw console.error("DOM Mutation Observers are required."), console.error("https://developer.mozilla.org/en-US/docs/DOM/MutationObserver"), Error("DOM Mutation Observers are required");
			var l, u = function () {
				function t() {
					this.nodes = [], this.values = []
				}
				return t.prototype.isIndex = function (t) {
					return +t === t >>> 0
				}, t.prototype.nodeId = function (e) {
					var n = e[t.ID_PROP];
					return n || (n = e[t.ID_PROP] = t.nextId_++), n
				}, t.prototype.set = function (t, e) {
					var n = this.nodeId(t);
					this.nodes[n] = t, this.values[n] = e
				}, t.prototype.get = function (t) {
					var e = this.nodeId(t);
					return this.values[e]
				}, t.prototype.has = function (t) {
					return this.nodeId(t) in this.nodes
				}, t.prototype.delete = function (t) {
					var e = this.nodeId(t);
					delete this.nodes[e], this.values[e] = void 0
				}, t.prototype.keys = function () {
					var t = [];
					for (var e in this.nodes) this.isIndex(e) && t.push(this.nodes[e]);
					return t
				}, t.ID_PROP = "__mutation_summary_node_map_id__", t.nextId_ = 1, t
			}();
			! function (t) {
				t[t.STAYED_OUT = 0] = "STAYED_OUT", t[t.ENTERED = 1] = "ENTERED", t[t.STAYED_IN = 2] = "STAYED_IN", t[t.REPARENTED = 3] = "REPARENTED", t[t.REORDERED = 4] = "REORDERED", t[t.EXITED = 5] = "EXITED"
			}(l || (l = {}));
			var c = function () {
					function t(t, e, n, i, o, s, r, a) {
						"undefined" == typeof e && (e = !1), "undefined" == typeof n && (n = !1), "undefined" == typeof i && (i = !1), "undefined" == typeof o && (o = null), "undefined" == typeof s && (s = !1), "undefined" == typeof r && (r = null), "undefined" == typeof a && (a = null), this.node = t, this.childList = e, this.attributes = n, this.characterData = i, this.oldParentNode = o, this.added = s, this.attributeOldValues = r, this.characterDataOldValue = a, this.isCaseInsensitive = this.node.nodeType === Node.ELEMENT_NODE && this.node instanceof HTMLElement && this.node.ownerDocument instanceof HTMLDocument
					}
					return t.prototype.getAttributeOldValue = function (t) {
						return this.attributeOldValues ? (this.isCaseInsensitive && (t = t.toLowerCase()), this.attributeOldValues[t]) : void 0
					}, t.prototype.getAttributeNamesMutated = function () {
						var t = [];
						if (!this.attributeOldValues) return t;
						for (var e in this.attributeOldValues) t.push(e);
						return t
					}, t.prototype.attributeMutated = function (t, e) {
						this.attributes = !0, this.attributeOldValues = this.attributeOldValues || {}, t in this.attributeOldValues || (this.attributeOldValues[t] = e)
					}, t.prototype.characterDataMutated = function (t) {
						this.characterData || (this.characterData = !0, this.characterDataOldValue = t)
					}, t.prototype.removedFromParent = function (t) {
						this.childList = !0, this.added || this.oldParentNode ? this.added = !1 : this.oldParentNode = t
					}, t.prototype.insertedIntoParent = function () {
						this.childList = !0, this.added = !0
					}, t.prototype.getOldParent = function () {
						if (this.childList) {
							if (this.oldParentNode) return this.oldParentNode;
							if (this.added) return null
						}
						return this.node.parentNode
					}, t
				}(),
				p = function () {
					function t() {
						this.added = new u, this.removed = new u, this.maybeMoved = new u, this.oldPrevious = new u, this.moved = void 0
					}
					return t
				}(),
				h = function (t) {
					function e(e, n) {
						t.call(this), this.rootNode = e, this.reachableCache = void 0, this.wasReachableCache = void 0, this.anyParentsChanged = !1, this.anyAttributesChanged = !1, this.anyCharacterDataChanged = !1;
						for (var i = 0; i < n.length; i++) {
							var o = n[i];
							switch (o.type) {
							case "childList":
								this.anyParentsChanged = !0;
								for (var s = 0; s < o.removedNodes.length; s++) {
									var r = o.removedNodes[s];
									this.getChange(r).removedFromParent(o.target)
								}
								for (var s = 0; s < o.addedNodes.length; s++) {
									var r = o.addedNodes[s];
									this.getChange(r).insertedIntoParent()
								}
								break;
							case "attributes":
								this.anyAttributesChanged = !0;
								var a = this.getChange(o.target);
								a.attributeMutated(o.attributeName, o.oldValue);
								break;
							case "characterData":
								this.anyCharacterDataChanged = !0;
								var a = this.getChange(o.target);
								a.characterDataMutated(o.oldValue)
							}
						}
					}
					return a(e, t), e.prototype.getChange = function (t) {
						var e = this.get(t);
						return e || (e = new c(t), this.set(t, e)), e
					}, e.prototype.getOldParent = function (t) {
						var e = this.get(t);
						return e ? e.getOldParent() : t.parentNode
					}, e.prototype.getIsReachable = function (t) {
						if (t === this.rootNode) return !0;
						if (!t) return !1;
						this.reachableCache = this.reachableCache || new u;
						var e = this.reachableCache.get(t);
						return void 0 === e && (e = this.getIsReachable(t.parentNode), this.reachableCache.set(t, e)), e
					}, e.prototype.getWasReachable = function (t) {
						if (t === this.rootNode) return !0;
						if (!t) return !1;
						this.wasReachableCache = this.wasReachableCache || new u;
						var e = this.wasReachableCache.get(t);
						return void 0 === e && (e = this.getWasReachable(this.getOldParent(t)), this.wasReachableCache.set(t, e)), e
					}, e.prototype.reachabilityChange = function (t) {
						return this.getIsReachable(t) ? this.getWasReachable(t) ? 2 : 1 : this.getWasReachable(t) ? 5 : 0
					}, e
				}(u),
				d = function () {
					function t(t, e, n, i, o) {
						this.rootNode = t, this.mutations = e, this.selectors = n, this.calcReordered = i, this.calcOldPreviousSibling = o, this.treeChanges = new h(t, e), this.entered = [], this.exited = [], this.stayedIn = new u, this.visited = new u, this.childListChangeMap = void 0, this.characterDataOnly = void 0, this.matchCache = void 0, this.processMutations()
					}
					return t.prototype.processMutations = function () {
						if (this.treeChanges.anyParentsChanged || this.treeChanges.anyAttributesChanged)
							for (var t = this.treeChanges.keys(), e = 0; e < t.length; e++) this.visitNode(t[e], void 0)
					}, t.prototype.visitNode = function (t, e) {
						if (!this.visited.has(t)) {
							this.visited.set(t, !0);
							var n = this.treeChanges.get(t),
								i = e;
							if ((n && n.childList || void 0 == i) && (i = this.treeChanges.reachabilityChange(t)), 0 !== i) {
								if (this.matchabilityChange(t), 1 === i) this.entered.push(t);
								else if (5 === i) this.exited.push(t), this.ensureHasOldPreviousSiblingIfNeeded(t);
								else if (2 === i) {
									var o = 2;
									n && n.childList && (n.oldParentNode !== t.parentNode ? (o = 3, this.ensureHasOldPreviousSiblingIfNeeded(t)) : this.calcReordered && this.wasReordered(t) && (o = 4)), this.stayedIn.set(t, o)
								}
								if (2 !== i)
									for (var s = t.firstChild; s; s = s.nextSibling) this.visitNode(s, i)
							}
						}
					}, t.prototype.ensureHasOldPreviousSiblingIfNeeded = function (t) {
						if (this.calcOldPreviousSibling) {
							this.processChildlistChanges();
							var e = t.parentNode,
								n = this.treeChanges.get(t);
							n && n.oldParentNode && (e = n.oldParentNode);
							var i = this.childListChangeMap.get(e);
							i || (i = new p, this.childListChangeMap.set(e, i)), i.oldPrevious.has(t) || i.oldPrevious.set(t, t.previousSibling)
						}
					}, t.prototype.getChanged = function (t, e, n) {
						this.selectors = e, this.characterDataOnly = n;
						for (var i = 0; i < this.entered.length; i++) {
							var o = this.entered[i],
								s = this.matchabilityChange(o);
							(1 === s || 2 === s) && t.added.push(o)
						}
						for (var r = this.stayedIn.keys(), i = 0; i < r.length; i++) {
							var o = r[i],
								s = this.matchabilityChange(o);
							if (1 === s) t.added.push(o);
							else if (5 === s) t.removed.push(o);
							else if (2 === s && (t.reparented || t.reordered)) {
								var a = this.stayedIn.get(o);
								t.reparented && 3 === a ? t.reparented.push(o) : t.reordered && 4 === a && t.reordered.push(o)
							}
						}
						for (var i = 0; i < this.exited.length; i++) {
							var o = this.exited[i],
								s = this.matchabilityChange(o);
							(5 === s || 2 === s) && t.removed.push(o)
						}
					}, t.prototype.getOldParentNode = function (t) {
						var e = this.treeChanges.get(t);
						if (e && e.childList) return e.oldParentNode ? e.oldParentNode : null;
						var n = this.treeChanges.reachabilityChange(t);
						if (0 === n || 1 === n) throw Error("getOldParentNode requested on invalid node.");
						return t.parentNode
					}, t.prototype.getOldPreviousSibling = function (t) {
						var e = t.parentNode,
							n = this.treeChanges.get(t);
						n && n.oldParentNode && (e = n.oldParentNode);
						var i = this.childListChangeMap.get(e);
						if (!i) throw Error("getOldPreviousSibling requested on invalid node.");
						return i.oldPrevious.get(t)
					}, t.prototype.getOldAttribute = function (t, e) {
						var n = this.treeChanges.get(t);
						if (!n || !n.attributes) throw Error("getOldAttribute requested on invalid node.");
						var i = n.getAttributeOldValue(e);
						if (void 0 === i) throw Error("getOldAttribute requested for unchanged attribute name.");
						return i
					}, t.prototype.attributeChangedNodes = function (t) {
						if (!this.treeChanges.anyAttributesChanged) return {};
						var e, n;
						if (t) {
							e = {}, n = {};
							for (var i = 0; i < t.length; i++) {
								var o = t[i];
								e[o] = !0, n[o.toLowerCase()] = o
							}
						}
						for (var s = {}, r = this.treeChanges.keys(), i = 0; i < r.length; i++) {
							var a = r[i],
								l = this.treeChanges.get(a);
							if (l.attributes && 2 === this.treeChanges.reachabilityChange(a) && 2 === this.matchabilityChange(a))
								for (var u = a, c = l.getAttributeNamesMutated(), p = 0; p < c.length; p++) {
									var o = c[p];
									if (!e || e[o] || l.isCaseInsensitive && n[o]) {
										var h = l.getAttributeOldValue(o);
										h !== u.getAttribute(o) && (n && l.isCaseInsensitive && (o = n[o]), s[o] = s[o] || [], s[o].push(u))
									}
								}
						}
						return s
					}, t.prototype.getOldCharacterData = function (t) {
						var e = this.treeChanges.get(t);
						if (!e || !e.characterData) throw Error("getOldCharacterData requested on invalid node.");
						return e.characterDataOldValue
					}, t.prototype.getCharacterDataChanged = function () {
						if (!this.treeChanges.anyCharacterDataChanged) return [];
						for (var t = this.treeChanges.keys(), e = [], n = 0; n < t.length; n++) {
							var i = t[n];
							if (2 === this.treeChanges.reachabilityChange(i)) {
								var o = this.treeChanges.get(i);
								o.characterData && i.textContent != o.characterDataOldValue && e.push(i)
							}
						}
						return e
					}, t.prototype.computeMatchabilityChange = function (t, e) {
						this.matchCache || (this.matchCache = []), this.matchCache[t.uid] || (this.matchCache[t.uid] = new u);
						var n = this.matchCache[t.uid],
							i = n.get(e);
						return void 0 === i && (i = t.matchabilityChange(e, this.treeChanges.get(e)), n.set(e, i)), i
					}, t.prototype.matchabilityChange = function (t) {
						var e = this;
						if (this.characterDataOnly) switch (t.nodeType) {
						case Node.COMMENT_NODE:
						case Node.TEXT_NODE:
							return 2;
						default:
							return 0
						}
						if (!this.selectors) return 2;
						if (t.nodeType !== Node.ELEMENT_NODE) return 0;
						for (var n = t, i = this.selectors.map(function (t) {
							return e.computeMatchabilityChange(t, n)
						}), o = 0, s = 0; 2 !== o && s < i.length;) {
							switch (i[s]) {
							case 2:
								o = 2;
								break;
							case 1:
								o = 5 === o ? 2 : 1;
								break;
							case 5:
								o = 1 === o ? 2 : 5
							}
							s++
						}
						return o
					}, t.prototype.getChildlistChange = function (t) {
						var e = this.childListChangeMap.get(t);
						return e || (e = new p, this.childListChangeMap.set(t, e)), e
					}, t.prototype.processChildlistChanges = function () {
						function t(t, e) {
							!t || i.oldPrevious.has(t) || i.added.has(t) || i.maybeMoved.has(t) || e && (i.added.has(e) || i.maybeMoved.has(e)) || i.oldPrevious.set(t, e)
						}
						if (!this.childListChangeMap) {
							this.childListChangeMap = new u;
							for (var e = 0; e < this.mutations.length; e++) {
								var n = this.mutations[e];
								if ("childList" == n.type && (2 === this.treeChanges.reachabilityChange(n.target) || this.calcOldPreviousSibling)) {
									for (var i = this.getChildlistChange(n.target), o = n.previousSibling, s = 0; s < n.removedNodes.length; s++) {
										var r = n.removedNodes[s];
										t(r, o), i.added.has(r) ? i.added.delete(r) : (i.removed.set(r, !0), i.maybeMoved.delete(r)), o = r
									}
									t(n.nextSibling, o);
									for (var s = 0; s < n.addedNodes.length; s++) {
										var r = n.addedNodes[s];
										i.removed.has(r) ? (i.removed.delete(r), i.maybeMoved.set(r, !0)) : i.added.set(r, !0)
									}
								}
							}
						}
					}, t.prototype.wasReordered = function (t) {
						function e(t) {
							if (!t) return !1;
							if (!r.maybeMoved.has(t)) return !1;
							var e = r.moved.get(t);
							return void 0 !== e ? e : (a.has(t) ? e = !0 : (a.set(t, !0), e = i(t) !== n(t)), a.has(t) ? (a.delete(t), r.moved.set(t, e)) : e = r.moved.get(t), e)
						}

						function n(t) {
							var i = l.get(t);
							if (void 0 !== i) return i;
							for (i = r.oldPrevious.get(t); i && (r.removed.has(i) || e(i));) i = n(i);
							return void 0 === i && (i = t.previousSibling), l.set(t, i), i
						}

						function i(t) {
							if (c.has(t)) return c.get(t);
							for (var n = t.previousSibling; n && (r.added.has(n) || e(n));) n = n.previousSibling;
							return c.set(t, n), n
						}
						if (!this.treeChanges.anyParentsChanged) return !1;
						this.processChildlistChanges();
						var o = t.parentNode,
							s = this.treeChanges.get(t);
						s && s.oldParentNode && (o = s.oldParentNode);
						var r = this.childListChangeMap.get(o);
						if (!r) return !1;
						if (r.moved) return r.moved.get(t);
						r.moved = new u;
						var a = new u,
							l = new u,
							c = new u;
						return r.maybeMoved.keys().forEach(e), r.moved.get(t)
					}, t
				}(),
				f = function () {
					function t(t, e) {
						var n = this;
						if (this.projection = t, this.added = [], this.removed = [], this.reparented = e.all || e.element ? [] : void 0, this.reordered = e.all ? [] : void 0, t.getChanged(this, e.elementFilter, e.characterData), e.all || e.attribute || e.attributeList) {
							var i = e.attribute ? [e.attribute] : e.attributeList,
								o = t.attributeChangedNodes(i);
							e.attribute ? this.valueChanged = o[e.attribute] || [] : (this.attributeChanged = o, e.attributeList && e.attributeList.forEach(function (t) {
								n.attributeChanged.hasOwnProperty(t) || (n.attributeChanged[t] = [])
							}))
						}
						if (e.all || e.characterData) {
							var s = t.getCharacterDataChanged();
							e.characterData ? this.valueChanged = s : this.characterDataChanged = s
						}
						this.reordered && (this.getOldPreviousSibling = t.getOldPreviousSibling.bind(t))
					}
					return t.prototype.getOldParentNode = function (t) {
						return this.projection.getOldParentNode(t)
					}, t.prototype.getOldAttribute = function (t, e) {
						return this.projection.getOldAttribute(t, e)
					}, t.prototype.getOldCharacterData = function (t) {
						return this.projection.getOldCharacterData(t)
					}, t.prototype.getOldPreviousSibling = function (t) {
						return this.projection.getOldPreviousSibling(t)
					}, t
				}(),
				m = /[a-zA-Z_]+/,
				g = /[a-zA-Z0-9_\-]+/,
				v = function () {
					function t() {}
					return t.prototype.matches = function (t) {
						if (null === t) return !1;
						if (void 0 === this.attrValue) return !0;
						if (!this.contains) return this.attrValue == t;
						for (var e = t.split(" "), n = 0; n < e.length; n++)
							if (this.attrValue === e[n]) return !0;
						return !1
					}, t.prototype.toString = function () {
						return "class" === this.attrName && this.contains ? "." + this.attrValue : "id" !== this.attrName || this.contains ? this.contains ? "[" + this.attrName + "~=" + n(this.attrValue) + "]" : "attrValue" in this ? "[" + this.attrName + "=" + n(this.attrValue) + "]" : "[" + this.attrName + "]" : "#" + this.attrValue
					}, t
				}(),
				y = function () {
					function t() {
						this.uid = t.nextUid++, this.qualifiers = []
					}
					return Object.defineProperty(t.prototype, "caseInsensitiveTagName", {
						get: function () {
							return this.tagName.toUpperCase()
						},
						enumerable: !0,
						configurable: !0
					}), Object.defineProperty(t.prototype, "selectorString", {
						get: function () {
							return this.tagName + this.qualifiers.join("")
						},
						enumerable: !0,
						configurable: !0
					}), t.prototype.isMatching = function (e) {
						return e[t.matchesSelector](this.selectorString)
					}, t.prototype.wasMatching = function (t, e, n) {
						if (!e || !e.attributes) return n;
						var i = e.isCaseInsensitive ? this.caseInsensitiveTagName : this.tagName;
						if ("*" !== i && i !== t.tagName) return !1;
						for (var o = [], s = !1, r = 0; r < this.qualifiers.length; r++) {
							var a = this.qualifiers[r],
								l = e.getAttributeOldValue(a.attrName);
							o.push(l), s = s || void 0 !== l
						}
						if (!s) return n;
						for (var r = 0; r < this.qualifiers.length; r++) {
							var a = this.qualifiers[r],
								l = o[r];
							if (void 0 === l && (l = t.getAttribute(a.attrName)), !a.matches(l)) return !1
						}
						return !0
					}, t.prototype.matchabilityChange = function (t, e) {
						var n = this.isMatching(t);
						return n ? this.wasMatching(t, e, n) ? 2 : 1 : this.wasMatching(t, e, n) ? 5 : 0
					}, t.parseSelectors = function (e) {
						function n() {
							o && (s && (o.qualifiers.push(s), s = void 0), a.push(o)), o = new t
						}

						function i() {
							s && o.qualifiers.push(s), s = new v
						}
						for (var o, s, r, a = [], l = /\s/, u = "Invalid or unsupported selector syntax.", c = 1, p = 2, h = 3, d = 4, f = 5, y = 6, w = 7, b = 8, _ = 9, C = 10, D = 11, O = 12, k = 13, V = 14, x = c, I = 0; I < e.length;) {
							var S = e[I++];
							switch (x) {
							case c:
								if (S.match(m)) {
									n(), o.tagName = S, x = p;
									break
								}
								if ("*" == S) {
									n(), o.tagName = "*", x = h;
									break
								}
								if ("." == S) {
									n(), i(), o.tagName = "*", s.attrName = "class", s.contains = !0, x = d;
									break
								}
								if ("#" == S) {
									n(), i(), o.tagName = "*", s.attrName = "id", x = d;
									break
								}
								if ("[" == S) {
									n(), i(), o.tagName = "*", s.attrName = "", x = y;
									break
								}
								if (S.match(l)) break;
								throw Error(u);
							case p:
								if (S.match(g)) {
									o.tagName += S;
									break
								}
								if ("." == S) {
									i(), s.attrName = "class", s.contains = !0, x = d;
									break
								}
								if ("#" == S) {
									i(), s.attrName = "id", x = d;
									break
								}
								if ("[" == S) {
									i(), s.attrName = "", x = y;
									break
								}
								if (S.match(l)) {
									x = V;
									break
								}
								if ("," == S) {
									x = c;
									break
								}
								throw Error(u);
							case h:
								if ("." == S) {
									i(), s.attrName = "class", s.contains = !0, x = d;
									break
								}
								if ("#" == S) {
									i(), s.attrName = "id", x = d;
									break
								}
								if ("[" == S) {
									i(), s.attrName = "", x = y;
									break
								}
								if (S.match(l)) {
									x = V;
									break
								}
								if ("," == S) {
									x = c;
									break
								}
								throw Error(u);
							case d:
								if (S.match(m)) {
									s.attrValue = S, x = f;
									break
								}
								throw Error(u);
							case f:
								if (S.match(g)) {
									s.attrValue += S;
									break
								}
								if ("." == S) {
									i(), s.attrName = "class", s.contains = !0, x = d;
									break
								}
								if ("#" == S) {
									i(), s.attrName = "id", x = d;
									break
								}
								if ("[" == S) {
									i(), x = y;
									break
								}
								if (S.match(l)) {
									x = V;
									break
								}
								if ("," == S) {
									x = c;
									break
								}
								throw Error(u);
							case y:
								if (S.match(m)) {
									s.attrName = S, x = w;
									break
								}
								if (S.match(l)) break;
								throw Error(u);
							case w:
								if (S.match(g)) {
									s.attrName += S;
									break
								}
								if (S.match(l)) {
									x = b;
									break
								}
								if ("~" == S) {
									s.contains = !0, x = _;
									break
								}
								if ("=" == S) {
									s.attrValue = "", x = D;
									break
								}
								if ("]" == S) {
									x = h;
									break
								}
								throw Error(u);
							case b:
								if ("~" == S) {
									s.contains = !0, x = _;
									break
								}
								if ("=" == S) {
									s.attrValue = "", x = D;
									break
								}
								if ("]" == S) {
									x = h;
									break
								}
								if (S.match(l)) break;
								throw Error(u);
							case _:
								if ("=" == S) {
									s.attrValue = "", x = D;
									break
								}
								throw Error(u);
							case C:
								if ("]" == S) {
									x = h;
									break
								}
								if (S.match(l)) break;
								throw Error(u);
							case D:
								if (S.match(l)) break;
								if ('"' == S || "'" == S) {
									r = S, x = k;
									break
								}
								s.attrValue += S, x = O;
								break;
							case O:
								if (S.match(l)) {
									x = C;
									break
								}
								if ("]" == S) {
									x = h;
									break
								}
								if ("'" == S || '"' == S) throw Error(u);
								s.attrValue += S;
								break;
							case k:
								if (S == r) {
									x = C;
									break
								}
								s.attrValue += S;
								break;
							case V:
								if (S.match(l)) break;
								if ("," == S) {
									x = c;
									break
								}
								throw Error(u)
							}
						}
						switch (x) {
						case c:
						case p:
						case h:
						case f:
						case V:
							n();
							break;
						default:
							throw Error(u)
						}
						if (!a.length) throw Error(u);
						return a
					}, t.nextUid = 1, t.matchesSelector = function () {
						var t = document.createElement("div");
						return "function" == typeof t.webkitMatchesSelector ? "webkitMatchesSelector" : "function" == typeof t.mozMatchesSelector ? "mozMatchesSelector" : "function" == typeof t.msMatchesSelector ? "msMatchesSelector" : "matchesSelector"
					}(), t
				}(),
				w = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:\.]*)$/,
				b = function () {
					function t(e) {
						var n = this;
						this.connected = !1, this.options = t.validateOptions(e), this.observerOptions = t.createObserverOptions(this.options.queries), this.root = this.options.rootNode, this.callback = this.options.callback, this.elementFilter = Array.prototype.concat.apply([], this.options.queries.map(function (t) {
							return t.elementFilter ? t.elementFilter : []
						})), this.elementFilter.length || (this.elementFilter = void 0), this.calcReordered = this.options.queries.some(function (t) {
							return t.all
						}), this.queryValidators = [], t.createQueryValidator && (this.queryValidators = this.options.queries.map(function (e) {
							return t.createQueryValidator(n.root, e)
						})), this.observer = new r(function (t) {
							n.observerCallback(t)
						}), this.reconnect()
					}
					return t.createObserverOptions = function (t) {
						function e(t) {
							if (!i.attributes || n) {
								if (i.attributes = !0, i.attributeOldValue = !0, !t) return void(n = void 0);
								n = n || {}, t.forEach(function (t) {
									n[t] = !0, n[t.toLowerCase()] = !0
								})
							}
						}
						var n, i = {
							childList: !0,
							subtree: !0
						};
						return t.forEach(function (t) {
							if (t.characterData) return i.characterData = !0, void(i.characterDataOldValue = !0);
							if (t.all) return e(), i.characterData = !0, void(i.characterDataOldValue = !0);
							if (t.attribute) return void e([t.attribute.trim()]);
							var n = s(t.elementFilter).concat(t.attributeList || []);
							n.length && e(n)
						}), n && (i.attributeFilter = Object.keys(n)), i
					}, t.validateOptions = function (e) {
						for (var n in e)
							if (!(n in t.optionKeys)) throw Error("Invalid option: " + n);
						if ("function" != typeof e.callback) throw Error("Invalid options: callback is required and must be a function");
						if (!e.queries || !e.queries.length) throw Error("Invalid options: queries must contain at least one query request object.");
						for (var s = {
							callback: e.callback,
							rootNode: e.rootNode || document,
							observeOwnChanges: !!e.observeOwnChanges,
							oldPreviousSibling: !!e.oldPreviousSibling,
							queries: []
						}, r = 0; r < e.queries.length; r++) {
							var a = e.queries[r];
							if (a.all) {
								if (Object.keys(a).length > 1) throw Error("Invalid request option. all has no options.");
								s.queries.push({
									all: !0
								})
							} else if ("attribute" in a) {
								var l = {
									attribute: i(a.attribute)
								};
								if (l.elementFilter = y.parseSelectors("*[" + l.attribute + "]"), Object.keys(a).length > 1) throw Error("Invalid request option. attribute has no options.");
								s.queries.push(l)
							} else if ("element" in a) {
								var u = Object.keys(a).length,
									l = {
										element: a.element,
										elementFilter: y.parseSelectors(a.element)
									};
								if (a.hasOwnProperty("elementAttributes") && (l.attributeList = o(a.elementAttributes), u--), u > 1) throw Error("Invalid request option. element only allows elementAttributes option.");
								s.queries.push(l)
							} else {
								if (!a.characterData) throw Error("Invalid request option. Unknown query request.");
								if (Object.keys(a).length > 1) throw Error("Invalid request option. characterData has no options.");
								s.queries.push({
									characterData: !0
								})
							}
						}
						return s
					}, t.prototype.createSummaries = function (t) {
						if (!t || !t.length) return [];
						for (var e = new d(this.root, t, this.elementFilter, this.calcReordered, this.options.oldPreviousSibling), n = [], i = 0; i < this.options.queries.length; i++) n.push(new f(e, this.options.queries[i]));
						return n
					}, t.prototype.checkpointQueryValidators = function () {
						this.queryValidators.forEach(function (t) {
							t && t.recordPreviousState()
						})
					}, t.prototype.runQueryValidators = function (t) {
						this.queryValidators.forEach(function (e, n) {
							e && e.validate(t[n])
						})
					}, t.prototype.changesToReport = function (t) {
						return t.some(function (t) {
							var e = ["added", "removed", "reordered", "reparented", "valueChanged", "characterDataChanged"];
							if (e.some(function (e) {
								return t[e] && t[e].length
							})) return !0;
							if (t.attributeChanged) {
								var n = Object.keys(t.attributeChanged),
									i = n.some(function (e) {
										return !!t.attributeChanged[e].length
									});
								if (i) return !0
							}
							return !1
						})
					}, t.prototype.observerCallback = function (t) {
						this.options.observeOwnChanges || this.observer.disconnect();
						var e = this.createSummaries(t);
						this.runQueryValidators(e), this.options.observeOwnChanges && this.checkpointQueryValidators(), this.changesToReport(e) && this.callback(e), !this.options.observeOwnChanges && this.connected && (this.checkpointQueryValidators(), this.observer.observe(this.root, this.observerOptions))
					}, t.prototype.reconnect = function () {
						if (this.connected) throw Error("Already connected");
						this.observer.observe(this.root, this.observerOptions), this.connected = !0, this.checkpointQueryValidators()
					}, t.prototype.takeSummaries = function () {
						if (!this.connected) throw Error("Not connected");
						var t = this.createSummaries(this.observer.takeRecords());
						return this.changesToReport(t) ? t : void 0
					}, t.prototype.disconnect = function () {
						var t = this.takeSummaries();
						return this.observer.disconnect(), this.connected = !1, t
					}, t.NodeMap = u, t.parseElementFilter = y.parseSelectors, t.optionKeys = {
						callback: !0,
						queries: !0,
						rootNode: !0,
						oldPreviousSibling: !0,
						observeOwnChanges: !0
					}, t
				}();
			e.exports = b
		}, {}
	],
	2: [
		function (t, e, n) {
			! function (t) {
				"function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof n ? e.exports = t : t(jQuery)
			}(function (t) {
				function e(e) {
					var r = e || window.event,
						a = l.call(arguments, 1),
						u = 0,
						p = 0,
						h = 0,
						d = 0,
						f = 0,
						m = 0;
					if (e = t.event.fix(r), e.type = "mousewheel", "detail" in r && (h = -1 * r.detail), "wheelDelta" in r && (h = r.wheelDelta), "wheelDeltaY" in r && (h = r.wheelDeltaY), "wheelDeltaX" in r && (p = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (p = -1 * h, h = 0), u = 0 === h ? p : h, "deltaY" in r && (h = -1 * r.deltaY, u = h), "deltaX" in r && (p = r.deltaX, 0 === h && (u = -1 * p)), 0 !== h || 0 !== p) {
						if (1 === r.deltaMode) {
							var g = t.data(this, "mousewheel-line-height");
							u *= g, h *= g, p *= g
						} else if (2 === r.deltaMode) {
							var v = t.data(this, "mousewheel-page-height");
							u *= v, h *= v, p *= v
						}
						if (d = Math.max(Math.abs(h), Math.abs(p)), (!s || s > d) && (s = d, i(r, d) && (s /= 40)), i(r, d) && (u /= 40, p /= 40, h /= 40), u = Math[u >= 1 ? "floor" : "ceil"](u / s), p = Math[p >= 1 ? "floor" : "ceil"](p / s), h = Math[h >= 1 ? "floor" : "ceil"](h / s), c.settings.normalizeOffset && this.getBoundingClientRect) {
							var y = this.getBoundingClientRect();
							f = e.clientX - y.left, m = e.clientY - y.top
						}
						return e.deltaX = p, e.deltaY = h, e.deltaFactor = s, e.offsetX = f, e.offsetY = m, e.deltaMode = 0, a.unshift(e, u, p, h), o && clearTimeout(o), o = setTimeout(n, 200), (t.event.dispatch || t.event.handle).apply(this, a)
					}
				}

				function n() {
					s = null
				}

				function i(t, e) {
					return c.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 === 0
				}
				var o, s, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
					a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
					l = Array.prototype.slice;
				if (t.event.fixHooks)
					for (var u = r.length; u;) t.event.fixHooks[r[--u]] = t.event.mouseHooks;
				var c = t.event.special.mousewheel = {
					version: "3.1.11",
					setup: function () {
						if (this.addEventListener)
							for (var n = a.length; n;) this.addEventListener(a[--n], e, !1);
						else this.onmousewheel = e;
						t.data(this, "mousewheel-line-height", c.getLineHeight(this)), t.data(this, "mousewheel-page-height", c.getPageHeight(this))
					},
					teardown: function () {
						if (this.removeEventListener)
							for (var n = a.length; n;) this.removeEventListener(a[--n], e, !1);
						else this.onmousewheel = null;
						t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
					},
					getLineHeight: function (e) {
						var n = t(e)["offsetParent" in t.fn ? "offsetParent" : "parent"]();
						return n.length || (n = t("body")), parseInt(n.css("fontSize"), 10)
					},
					getPageHeight: function (e) {
						return t(e).height()
					},
					settings: {
						adjustOldDeltas: !0,
						normalizeOffset: !0
					}
				};
				t.fn.extend({
					mousewheel: function (t) {
						return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
					},
					unmousewheel: function (t) {
						return this.unbind("mousewheel", t)
					}
				})
			})
		}, {}
	],
	3: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../inputs/inputview.coffee"), e.exports = n = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.mouseDown = function () {
					return this.focus()
				}, e.prototype.setDomElement = function () {
					return this.domElement = $("<div class='kdautocompletewrapper clearfix'><input type='text' placeholder='" + this.getOptions().placeholder + "' class='kdinput text'/></div>")
				}, e.prototype.setDomId = function () {
					return this.$input().attr("id", this.getDomId()), this.$input().attr("name", this.getName()), this.$input().data("data-id", this.getId())
				}, e.prototype.setDefaultValue = function (t) {
					return this.inputDefaultValue = t, this.setValue(t)
				}, e.prototype.$input = function () {
					return this.$("input").eq(0)
				}, e.prototype.getValue = function () {
					return this.$input().val()
				}, e.prototype.setValue = function (t) {
					return this.$input().val(t)
				}, e.prototype.bindEvents = function () {
					return e.__super__.bindEvents.call(this, this.$input())
				}, e.prototype.blur = function () {
					return this.unsetClass("focus"), !0
				}, e.prototype.focus = function () {
					return this.setClass("focus"), e.__super__.focus.apply(this, arguments)
				}, e.prototype.keyDown = function () {
					return KD.getSingleton("windowController").setKeyView(this), !0
				}, e.prototype.getLeftOffset = function () {
					return this.$input().prev().width()
				}, e.prototype.destroyDropdown = function () {
					return null != this.dropdown && this.dropdown.destroy(), this.dropdownPrefix = "", this.dropdown = null
				}, e.prototype.setPlaceHolder = function (t) {
					return this.$input()[0].setAttribute("placeholder", t)
				}, e.prototype.setFocus = function () {
					return e.__super__.setFocus.apply(this, arguments), this.$input().trigger("focus")
				}, e.prototype.setBlur = function () {
					return e.__super__.setBlur.apply(this, arguments), this.$input().trigger("blur")
				}, e
			}(i)
		}, {
			"./../inputs/inputview.coffee": 46
		}
	],
	4: [
		function (t, e) {
			var n, i, o, s, r, a, l, u, c = {}.hasOwnProperty,
				p = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) c.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				h = [].slice;
			u = t("./../../core/viewcontroller.coffee"), a = t("./../list/listviewcontroller.coffee"), r = t("./../inputs/labelview.coffee"), l = t("./../notifications/notificationview.coffee"), n = t("./autocomplete.coffee"), s = t("./autocompletelist.coffee"), o = t("./autocompletefetchingitem.coffee"), e.exports = i = function (t) {
				function e(t, i) {
					var s;
					null == t && (t = {}), t = $.extend({
						view: s = t.view || new n({
							name: t.name,
							placeholder: t.placeholder || "",
							label: t.label || new r({
								title: t.name
							})
						}),
						itemClass: KDAutoCompleteListItemView,
						selectedItemClass: KDAutoCompletedItem,
						nothingFoundItemClass: KDAutoCompleteNothingFoundItem,
						fetchingItemClass: o,
						listWrapperCssClass: "",
						minSuggestionLength: 2,
						selectedItemsLimit: null,
						itemDataPath: "",
						separator: ",",
						wrapper: "parent",
						submitValuesAsText: !1,
						defaultValue: []
					}, t), e.__super__.constructor.call(this, t, i), s.on("focus", this.bound("updateDropdownContents")), this.lastPrefix = null, this.selectedItemData = [], this.hiddenInputs = {}, this.selectedItemCounter = 0, this.readyToShowDropDown = !0
				}
				return p(e, t), e.prototype.reset = function () {
					var t, e, n, i, o;
					for (e = this.itemWrapper.getSubViews().slice(), o = [], n = 0, i = e.length; i > n; n++) t = e[n], o.push(this.removeFromSubmitQueue(t));
					return o
				}, e.prototype.loadView = function (t) {
					return this.createDropDown(), this.getAutoCompletedItemParent(), this.setDefaultValue(), t.on("keyup", this.utils.debounce(300, this.bound("keyUpOnInputView"))), t.on("keydown", function (t) {
						return function (e) {
							return t.keyDownOnInputView(e)
						}
					}(this))
				}, e.prototype.setDefaultValue = function (t) {
					var e, n, i, o, s, r, a;
					for (r = this.getOptions(), e = r.defaultValue, i = r.itemDataPath, t || (t = e), a = [], o = 0, s = t.length; s > o; o++) n = t[o], a.push(this.addItemToSubmitQueue(this.getView(), n));
					return a
				}, e.prototype.keyDownOnInputView = function (t) {
					var e;
					switch (e = this.getView(), t.which) {
					case 13:
					case 9:
						return "" !== e.getValue() && t.shiftKey !== !0 ? (this.submitAutoComplete(e.getValue()), t.stopPropagation(), t.preventDefault(), this.readyToShowDropDown = !1, !1) : !0;
					case 27:
						this.hideDropdown();
						break;
					case 38:
						if (this.dropdown.getView().$().is(":visible")) return this.dropdown.getListView().goUp(), t.stopPropagation(), t.preventDefault(), !1;
						break;
					case 40:
						if (this.dropdown.getView().$().is(":visible")) return this.dropdown.getListView().goDown(), t.stopPropagation(), t.preventDefault(), !1;
						break;
					default:
						this.readyToShowDropDown = !0
					}
					return !1
				}, e.prototype.getPrefix = function () {
					var t, e, n;
					return n = this.getOptions().separator, t = this.getView().getValue().split(n), e = t[t.length - 1]
				}, e.prototype.createDropDown = function (t) {
					var e, n, i;
					return null == t && (t = []), this.dropdownPrefix = "", this.dropdownListView = e = new s({
						itemClass: this.getOptions().itemClass
					}, {
						items: t
					}), e.on("ItemsDeselected", function (t) {
						return function () {
							var e;
							return e = t.getView(), e.$input().trigger("focus")
						}
					}(this)), e.on("KDAutoCompleteSubmit", this.bound("submitAutoComplete")), i = KD.getSingleton("windowController"), this.dropdown = new a({
						view: e
					}), n = this.dropdown.getView(), n.on("ReceivedClickElsewhere", function (t) {
						return function () {
							return t.hideDropdown()
						}
					}(this)), n.setClass("kdautocomplete hidden " + this.getOptions().listWrapperCssClass), n.appendToDomBody()
				}, e.prototype.hideDropdown = function () {
					var t;
					return t = this.dropdown.getView(), t.$().fadeOut(75)
				}, e.prototype.showDropdown = function () {
					var t, e, n, i;
					if (this.readyToShowDropDown) return i = KD.getSingleton("windowController"), t = this.dropdown.getView(), t.unsetClass("hidden"), e = this.getView(), n = e.$().offset(), n.top += e.getHeight(), t.$().css(n), t.$().fadeIn(75), i.addLayer(t)
				}, e.prototype.refreshDropDown = function (t) {
					var e, n, i, o, s, r, a, l;
					return null == t && (t = []), r = this.dropdown.getListView(), this.dropdown.removeAllItems(), r.userInput = this.dropdownPrefix, i = RegExp("^" + this.dropdownPrefix.replace(/[^\s\w]/, "") + "$", "i"), n = [], o = [], l = this.getOptions(), s = l.itemDataPath, e = l.allowNewSuggestions, a = l.minSuggestionLength, t.forEach(function (t) {
						return function (e) {
							var r;
							return t.isItemAlreadySelected(e) ? void 0 : (r = JsPath.getAt(e, s), i.test(r) ? n.push(e) : o.push(e))
						}
					}(this)), this.dropdownPrefix.length >= a && e && !n.length && this.dropdown.getListView().addItemView(this.getNoItemFoundView()), t = n.concat(o), this.dropdown.instantiateListItems(t), this.dropdown.getListView().goDown()
				}, e.prototype.submitAutoComplete = function () {
					var t, e;
					return e = this.getView(), null === this.getOptions().selectedItemsLimit || this.getOptions().selectedItemsLimit > this.selectedItemCounter ? (t = this.dropdown.getListView().getActiveItem(), t.item && this.appendAutoCompletedItem(), this.addItemToSubmitQueue(t.item), this.emit("ItemListChanged", this.selectedItemCounter)) : (e.setValue(""), KD.getSingleton("windowController").setKeyView(null), new l({
						type: "mini",
						title: "You can add up to " + this.getOptions().selectedItemsLimit + " items!",
						duration: 4e3
					})), this.hideDropdown()
				}, e.prototype.getAutoCompletedItemParent = function () {
					var t;
					return t = this.getOptions().outputWrapper, this.itemWrapper = t instanceof KDView ? t : this.getView()
				}, e.prototype.isItemAlreadySelected = function (t) {
					var e, n, i, o, s, r, a, l, u, c, p;
					for (c = this.getOptions(), o = c.itemDataPath, n = c.customCompare, i = c.isCaseSensitive, a = JsPath.getAt(t, o), p = this.getSelectedItemData(), l = 0, u = p.length; u > l; l++)
						if (r = p[l], null != n) {
							if (e = n(t, r)) return !0
						} else if (s = JsPath.getAt(r, o), i || (a = a.toLowerCase(), s = s.toLowerCase()), a === s) return !0;
					return !1
				}, e.prototype.addHiddenInputItem = function (t, e) {
					return this.itemWrapper.addSubView(this.hiddenInputs[t] = new KDInputView({
						type: "hidden",
						name: t,
						defaultValue: e
					}))
				}, e.prototype.removeHiddenInputItem = function (t) {
					return delete this.hiddenInputs[t]
				}, e.prototype.addSelectedItem = function (t, e) {
					var n, i;
					return i = this.getOptions().selectedItemClass, this.itemWrapper.addSubView(n = new i({
						cssClass: "kdautocompletedlistitem",
						delegate: this,
						name: t
					}, e)), n.setPartial("<span class='close-icon'></span>")
				}, e.prototype.getSelectedItemData = function () {
					return this.selectedItemData
				}, e.prototype.addSelectedItemData = function (t) {
					return this.getSelectedItemData().push(t)
				}, e.prototype.removeSelectedItemData = function (t) {
					var e, n, i, o, s;
					for (i = this.getSelectedItemData(), e = o = 0, s = i.length; s > o; e = ++o)
						if (n = i[e], n === t) return void i.splice(e, 1)
				}, e.prototype.getCollectionPath = function () {
					var t, e, n, i, o, s;
					if (n = this.getOptions().name, !n) throw new Error("No name!");
					return s = n.split("."), i = 2 <= s.length ? h.call(s, 0, o = s.length - 1) : (o = 0, []), e = s[o++], t = Inflector.pluralize(e), i.push(t), i.join(".")
				}, e.prototype.addSuggestion = function (t) {
					return this.emit("AutocompleteSuggestionWasAdded", t)
				}, e.prototype.addItemToSubmitQueue = function (t, e) {
					var n, i, o, s, r, a, l, u, c;
					return e || (e = null != t ? t.getData() : void 0), e || (null != t ? t.getOptions().userInput : void 0) ? (c = this.getOptions(), a = c.name, o = c.itemDataPath, i = c.form, u = c.submitValuesAsText, e ? r = u ? JsPath.getAt(e, o) : e : (r = t.getOptions().userInput, e = JsPath(o, r)), this.isItemAlreadySelected(e) ? !1 : (l = this.getCollectionPath(), s = "" + a + "-" + this.selectedItemCounter++, i ? (n = i.getCustomData(l) || [], n.push(u ? r : ("function" == typeof r.getId ? r.getId() : void 0) ? {
						constructorName: r.constructor.name,
						id: r.getId(),
						title: r.title
					} : {
						$suggest: r
					}), i.addCustomData(l, n), t.getOptions().userInput === !0 && this.selectedItemCounter++) : this.addHiddenInputItem(l, r), this.addSelectedItemData(e), this.addSelectedItem(s, e), this.getView().setValue(this.dropdownPrefix = ""))) : void 0
				}, e.prototype.removeFromSubmitQueue = function (t, e) {
					var n, i, o, s, r;
					return r = this.getOptions(), o = r.itemDataPath, i = r.form, e || (e = t.getData()), s = this.getCollectionPath(), i ? (n = JsPath.getAt(i.getCustomData(), s), n = n.filter(function (t) {
						var n;
						return n = "function" == typeof e.getId ? e.getId() : void 0, null == n ? t.$suggest !== e.title : t.id !== n
					}), JsPath.setAt(i.getCustomData(), s, n)) : this.removeHiddenInputItem(s), this.removeSelectedItemData(e), this.selectedItemCounter--, t.destroy(), this.emit("ItemListChanged", this.selectedItemCounter)
				}, e.prototype.appendAutoCompletedItem = function () {
					return this.getView().setValue(""), this.getView().$input().trigger("focus")
				}, e.prototype.updateDropdownContents = function () {
					var t;
					return t = this.getView(), "" === t.getValue() && this.hideDropdown(), "" !== t.getValue() && this.dropdownPrefix !== t.getValue() && this.dropdown.getView().$().not(":visible") ? (this.dropdownPrefix = t.getValue(), this.fetch(function (t) {
						return function (e) {
							return t.refreshDropDown(e), t.showDropdown()
						}
					}(this))) : void 0
				}, e.prototype.keyUpOnInputView = function (t) {
					var e;
					if (9 !== (e = t.keyCode) && 38 !== e && 40 !== e) return this.updateDropdownContents(), !1
				}, e.prototype.fetch = function (t) {
					var e, n;
					return e = {}, this.getOptions().fetchInputName ? e[this.getOptions().fetchInputName] = this.getView().getValue() : e = {
						inputValue: this.getView().getValue()
					}, this.dropdownPrefix = this.getView().getValue(), (n = this.getOptions().dataSource)(e, t)
				}, e.prototype.showFetching = function () {
					var t, e, n;
					return t = this.getOptions().fetchingItemClass, (null != (n = this.dropdown.getListView().items) ? n[0] : void 0) instanceof o ? void 0 : (e = new t, this.dropdown.getListView().items.length ? this.dropdown.getListView().addItemView(e, 0) : this.dropdown.getListView().addItemView(e))
				}, e.prototype.getNoItemFoundView = function (t) {
					var e, n;
					return e = this.getOptions().nothingFoundItemClass, n = new e({
						delegate: this.dropdown.getListView(),
						userInput: t || this.getView().getValue()
					})
				}, e.prototype.showNoDataFound = function () {
					var t;
					return t = this.getNoItemFoundView(), this.dropdown.removeAllItems(), this.dropdown.getListView().addItemView(t), this.showDropdown()
				}, e.prototype.destroy = function () {
					return this.dropdown.getView().destroy(), e.__super__.destroy.apply(this, arguments)
				}, e
			}(u)
		}, {
			"./../../core/viewcontroller.coffee": 109,
			"./../inputs/labelview.coffee": 47,
			"./../list/listviewcontroller.coffee": 55,
			"./../notifications/notificationview.coffee": 61,
			"./autocomplete.coffee": 3,
			"./autocompletefetchingitem.coffee": 6,
			"./autocompletelist.coffee": 7
		}
	],
	5: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t) {
					null == t && (t = {}), t.cssClass = this.utils.curry("kdautocompletedlistitem", t.cssClass), e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.click = function (t) {
					return $(t.target).is("span.close-icon") && this.getDelegate().removeFromSubmitQueue(this), this.getDelegate().getView().$input().trigger("focus")
				}, e.prototype.viewAppended = function () {
					return this.setPartial(this.partial())
				}, e.prototype.partial = function () {
					return this.getDelegate().getOptions().itemClass.prototype.partial(this.getData())
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	6: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./autocompleteunselecteableitem.coffee"), e.exports = n = function (t) {
				function e(t) {
					null == t && (t = {}), t.cssClass = this.utils.curry("kdautocompletelistitem fetching", t.cssClass), e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.partial = function () {
					return "Fetching in process..."
				}, e
			}(i)
		}, {
			"./autocompleteunselecteableitem.coffee": 10
		}
	],
	7: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../list/listview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					e.__super__.constructor.call(this, t, n), this.setClass("kdautocompletelist")
				}
				return s(e, t), e.prototype.goDown = function () {
					var t, e, n;
					return t = this.getActiveItem(), null == t.index ? null != (n = this.items[0]) ? n.makeItemActive() : void 0 : (e = this.items[t.index + 1], null != e ? e.makeItemActive() : void 0)
				}, e.prototype.goUp = function () {
					var t;
					return t = this.getActiveItem(), null != t.index ? null != this.items[t.index - 1] ? this.items[t.index - 1].makeItemActive() : this.emit("ItemsDeselected") : this.items[0].makeItemActive()
				}, e.prototype.getActiveItem = function () {
					var t, e, n, i, o, s;
					for (t = {
						index: null,
						item: null
					}, s = this.items, e = i = 0, o = s.length; o > i; e = ++i)
						if (n = s[e], n.active) {
							t.item = n, t.index = e;
							break
						}
					return t
				}, e
			}(i)
		}, {
			"./../list/listview.coffee": 54
		}
	],
	8: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../list/listitemview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("kdautocompletelistitem", t.cssClass), t.bind = "mouseenter mouseleave", e.__super__.constructor.call(this, t, n), this.active = !1
				}
				return s(e, t), e.prototype.viewAppended = function () {
					return this.updatePartial(this.partial(this.data))
				}, e.prototype.mouseEnter = function () {
					return this.makeItemActive()
				}, e.prototype.mouseLeave = function () {
					return this.makeItemInactive()
				}, e.prototype.makeItemActive = function () {
					var t, e, n, i;
					for (i = this.getDelegate().items, e = 0, n = i.length; n > e; e++) t = i[e], t.makeItemInactive();
					return this.active = !0, this.setClass("active")
				}, e.prototype.makeItemInactive = function () {
					return this.active = !1, this.unsetClass("active")
				}, e.prototype.click = function () {
					var t;
					return t = this.getDelegate(), t.emit("KDAutoCompleteSubmit", this, this.data), !1
				}, e.prototype.partial = function () {
					return "<div class='autocomplete-item clearfix'>Default item</div>"
				}, e
			}(i)
		}, {
			"./../list/listitemview.coffee": 53
		}
	],
	9: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./autocompleteunselecteableitem.coffee"), e.exports = n = function (t) {
				function e(t) {
					null == t && (t = {}), t.cssClass = this.utils.curry("kdautocompletelistitem no-result", t.cssClass), e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.partial = function () {
					return "Nothing found"
				}, e
			}(i)
		}, {
			"./autocompleteunselecteableitem.coffee": 10
		}
	],
	10: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../list/listitemview.coffee"), e.exports = n = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.click = function () {
					return !1
				}, e.prototype.keyUp = function () {
					return !1
				}, e.prototype.keyDown = function () {
					return !1
				}, e.prototype.makeItemActive = function () {}, e.prototype.destroy = function () {
					return e.__super__.destroy.call(this, !1)
				}, e
			}(i)
		}, {
			"./../list/listitemview.coffee": 53
		}
	],
	11: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../list/listview.coffee"), o = t("./multiplelistitemview.coffee"), e.exports = i = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return r(e, t), e.prototype.setDomElement = function () {
					return this.domElement = $("<p class='search-tags clearfix'></p>")
				}, e.prototype.addItems = function (t) {
					var e, n, i, s, r;
					for (r = [], i = 0, s = t.length; s > i; i++) e = t[i], n = new o({
						delegate: this
					}, e), r.push(this.addItemView(n));
					return r
				}, e.prototype.removeListItem = function (t) {
					return e.__super__.removeListItem.call(this, t), this.getDelegate().inputRemoveValue(t.getData())
				}, e
			}(n)
		}, {
			"./../list/listview.coffee": 54,
			"./multiplelistitemview.coffee": 13
		}
	],
	12: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				l = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			o = t("./simpleautocomplete.coffee"), s = t("./multipleinputlistview.coffee"), n = t("./../inputs/inputview.coffee"), e.exports = i = function (t) {
				function e(t) {
					this._values = [], t = $.extend({
						icon: "noicon",
						title: ""
					}, t), e.__super__.constructor.call(this, t)
				}
				return a(e, t), e.prototype.focus = function () {
					return KD.getSingleton("windowController").setKeyView(this)
				}, e.prototype.viewAppended = function () {
					return this.list = new s({
						delegate: this
					}), this.addSubView(this.list)
				}, e.prototype.$input = function () {
					return this.$().find("input.main").eq(0)
				}, e.prototype.getValues = function () {
					return this._values
				}, e.prototype.addItemToSubmitQueue = function () {
					return e.__super__.addItemToSubmitQueue.apply(this, arguments), this.inputAddCurrentValue()
				}, e.prototype.keyUp = function (t) {
					return 13 === t.keyCode && this.inputAddCurrentValue(), e.__super__.keyUp.apply(this, arguments)
				}, e.prototype.inputRemoveValue = function (t) {
					var e;
					return e = this._values.indexOf(t), e > -1 && this._values.splice(e, 1), this._inputChanged()
				}, e.prototype.clear = function () {
					return this._values = [], this.removeAllItems(), this._inputChanged()
				}, e.prototype.inputAddCurrentValue = function () {
					var t;
					return t = this.$input().val(), t = $.trim(t), l.call(this._values, t) >= 0 || "" === t ? void 0 : (this._values.push(t), this.$input().val(""), this.list.addItems([t]), this._inputChanged())
				}, e.prototype._inputChanged = function () {
					var t, e, i, o, s, r, a, l, u, c, p;
					for (this._hiddenInputs || (this._hiddenInputs = []), c = this._hiddenInputs, r = 0, l = c.length; l > r; r++) e = c[r], e.destroy();
					for (i = this.getOptions().name, p = this._values, t = a = 0, u = p.length; u > a; t = ++a) s = p[t], o = new n({
						type: "hidden",
						name: i + ("[" + t + "]"),
						defaultValue: s
					}), this._hiddenInputs.push(o), this.addSubView(o);
					return this.emit("MultipleInputChanged", {
						values: this.getValue()
					})
				}, e.prototype.click = function (t) {
					return $(t.target).hasClass("addNewItem") ? this.inputAddCurrentValue() : void 0
				}, e.prototype.setDomId = function () {
					return this.$input().attr("id", this.getDomId()), this.$input().data("data-id", this.getId())
				}, e.prototype.setDomElement = function () {
					return this.domElement = $("<div class='filter kdview'> <h2>" + this.getOptions().title + "</h2> <div class='clearfix'> <span class='" + this.getOptions().icon + "'></span> <input type='text' class='main'> <a href='#' class='addNewItem'>+</a> </div> </div>")
				}, e
			}(o)
		}, {
			"./../inputs/inputview.coffee": 46,
			"./multipleinputlistview.coffee": 11,
			"./simpleautocomplete.coffee": 16
		}
	],
	13: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../list/listitemview.coffee"), e.exports = i = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.click = function (t) {
					return $(t.target).hasClass("removeIcon") ? this.getDelegate().removeListItem(this) : void 0
				}, e.prototype.setDomElement = function () {
					return this.domElement = $("<span />")
				}, e.prototype.partial = function () {
					return "" + this.getData() + " <cite class='removeIcon'>x</cite>"
				}, e
			}(n)
		}, {
			"./../list/listitemview.coffee": 53
		}
	],
	14: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./multipleinputview.coffee"), e.exports = i = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.keyUp = function (t) {
					return 13 === t.keyCode ? this.inputAddCurrentValue() : void 0
				}, e.prototype.setDomElement = function (t) {
					var e;
					return e = this.getOptions().placeholder, this.domElement = $("<div class='" + t + "'><input type='text' class='main' placeholder='" + (e || "") + "' /></div>")
				}, e.prototype.addItemToSubmitQueue = function () {
					return !1
				}, e
			}(n)
		}, {
			"./multipleinputview.coffee": 12
		}
	],
	15: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../../core/view.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), i = {
						cssClass: "common-view input-with-extras"
					}, t = $.extend(i, t), e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e.prototype.viewAppended = function () {
					var t, e, n, i, o, s;
					return s = this.options, n = s.icon, i = s.input, t = s.button, n && (this.setClass("with-icon"), o = {
						tagName: "span",
						cssClass: "icon " + n
					}, this.addSubView(this.icon = new KDCustomHTMLView(o))), i && this.addSubView(this.input = new KDNoAutocompleteInputView(i)), t ? (e = {
						callback: function (t) {
							return function (e) {
								return e.preventDefault(), e.stopPropagation(), t.input.inputAddCurrentValue()
							}
						}(this)
					}, t = $.extend(e, t), this.addSubView(this.button = new KDButtonView(t))) : void 0
				}, e
			}(n)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	16: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./autocomplete.coffee"), e.exports = i = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.addItemToSubmitQueue = function (t) {
					var e;
					return e = JsPath.getAt(t.getData(), this.getOptions().itemDataPath), this.setValue(e)
				}, e.prototype.keyUp = function (t) {
					return 13 !== t.keyCode ? e.__super__.keyUp.apply(this, arguments) : void 0
				}, e.prototype.showNoDataFound = function () {
					return this.dropdown.removeAllItems(), this.hideDropdown()
				}, e
			}(n)
		}, {
			"./autocomplete.coffee": 3
		}
	],
	17: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			s = t("./../../core/view.coffee"), i = t("./buttonview"), o = t("../forms/formview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i, s, r, a, l, u;
					for (null == t && (t = {}), t.cssClass = KD.utils.curry("formline button-field clearfix", t.cssClass), e.__super__.constructor.call(this, t, n), this.buttons = {}, r = t.buttons, u = o.sanitizeFormOptions(r), a = 0, l = u.length; l > a; a++) s = u[a], i = this.createButton(s), this.addSubView(i), this.buttons[s.key] = i
				}
				return a(e, t), e.prototype._itemClass = i, e.prototype.createButton = function (t) {
					var e, n;
					return t || (t = {}), t.itemClass || (t.itemClass = this._itemClass), n = $.extend({}, t), delete n.itemClass, e = new t.itemClass(n)
				}, e
			}(s)
		}, {
			"../forms/formview.coffee": 34,
			"./../../core/view.coffee": 108,
			"./buttonview": 20
		}
	],
	18: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), i = t.cssClass, i = i ? " " + i : "", t.cssClass = "kdbuttongroup" + i, t.buttons || (t.buttons = {}), e.__super__.constructor.call(this, t, n), this.buttons = {}, this.createButtons(t.buttons)
				}
				return s(e, t), e.prototype.createButtons = function (t) {
					var e, n, i, s;
					s = [];
					for (i in t) o.call(t, i) && (n = t[i], e = n.buttonClass || KDButtonView, n.title = i, n.style = "", this.addSubView(this.buttons[i] = new e(n)), s.push(this.buttons[i].on("click", function (t) {
						return function (e) {
							return t.buttonReceivedClick(t.buttons[i], e)
						}
					}(this))));
					return s
				}, e.prototype.buttonReceivedClick = function (t) {
					var e, n, i;
					i = this.buttons;
					for (n in i) o.call(i, n) && (e = i[n], e.unsetClass("toggle"));
					return t.setClass("toggle")
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	19: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../contextmenu/contextmenu.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = this.utils.curry("kdbuttonmenu", t.cssClass), t.listViewClass || (t.listViewClass = JContextMenuTreeView), e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e.prototype.viewAppended = function () {
					return e.__super__.viewAppended.apply(this, arguments), this.setPartial("<div class='chevron-ghost-wrapper'><span class='chevron-ghost'></span></div>"), this.positionContextMenu()
				}, e.prototype.positionContextMenu = KD.utils.debounce(10, function () {
					var t, e, n, i, o, s, r, a, l;
					return t = this.getDelegate(), o = $(window).height(), s = $(window).scrollTop(), e = t.getHeight(), n = t.getWidth(), l = t.getY() + e, r = this.getHeight(), a = this.getWidth(), i = l + r > o + s ? (l = t.getY() - r, this.setClass("top-menu"), {
						top: "100%",
						height: e
					}) : {
						top: -(e + 1),
						height: e
					}, this.$(".chevron-ghost-wrapper").css(i), this.$().css({
						top: l,
						left: t.getX() + n - a
					})
				}), e
			}(i)
		}, {
			"./../contextmenu/contextmenu.coffee": 23
		}
	],
	20: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./../../core/view.coffee"), i = t("./../loader/loaderview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.callback || (t.callback = noop), t.title || (t.title = ""), t.type || (t.type = "button"), t.cssClass || (t.cssClass = t.style || (t.style = "clean-gray")), null == t.icon && (t.icon = !1), null == t.iconOnly && (t.iconOnly = !1), t.iconClass || (t.iconClass = ""), null == t.disabled && (t.disabled = !1), t.hint || (t.hint = null), null == t.loader && (t.loader = !1), e.__super__.constructor.call(this, t, n), this.setClass(t.style), this.setCallback(t.callback), this.setTitle(t.title), t.iconClass && this.setIconClass(t.iconClass), (t.icon || t.iconOnly) && this.showIcon(), t.iconOnly && this.setIconOnly(t.iconOnly), t.disabled && this.disable(), t.focus && this.once("viewAppended", this.bound("setFocus")), t.loader && this.once("viewAppended", this.bound("setLoader"))
				}
				return r(e, t), e.prototype.setFocus = function () {
					return this.$().trigger("focus")
				}, e.prototype.setDomElement = function (t) {
					var e, n, i, o, s, r, a, l;
					if (a = this.getOptions(), i = a.lazyDomId, o = a.tagName, i)
						for (e = document.getElementById(i), l = ("kdview " + t).split(" "), s = 0, r = l.length; r > s; s++) n = l[s], n.length && e.classList.add(n);
					return null == e && (i && warn("No lazy DOM Element found with given id " + i + "."), e = "<button type='" + this.getOptions().type + "' class='kdbutton " + t + "' id='" + this.getId() + "'>\n  <span class='icon hidden'></span>\n  <span class='button-title'>Title</span>\n</button>"), this.domElement = $(e)
				}, e.prototype.setTitle = function (t) {
					return this.buttonTitle = t, this.$(".button-title").html(t)
				}, e.prototype.getTitle = function () {
					return this.buttonTitle
				}, e.prototype.setCallback = function (t) {
					return this.buttonCallback = t
				}, e.prototype.getCallback = function () {
					return this.buttonCallback
				}, e.prototype.showIcon = function () {
					return this.setClass("with-icon"), this.$("span.icon").removeClass("hidden")
				}, e.prototype.hideIcon = function () {
					return this.unsetClass("with-icon"), this.$("span.icon").addClass("hidden")
				}, e.prototype.setIconClass = function (t) {
					return this.$(".icon").attr("class", "icon"), this.$(".icon").addClass(t)
				}, e.prototype.setIconOnly = function () {
					var t;
					return this.unsetClass("with-icon"), this.$().addClass("icon-only"), t = this.$("span.icon"), this.$().html(t)
				}, e.prototype.setLoader = function () {
					var t, e, n, o, s, r, a, l;
					return this.setClass("w-loader"), t = this.getOptions().loader, e = this.getHeight() / 2, this.loader = new i({
						size: {
							width: null != (n = t.diameter) ? n : e
						},
						loaderOptions: {
							color: t.color || "#ffffff",
							shape: t.shape || "spiral",
							diameter: null != (o = t.diameter) ? o : e,
							density: null != (s = t.density) ? s : 30,
							range: null != (r = t.range) ? r : .4,
							speed: null != (a = t.speed) ? a : 1.5,
							FPS: null != (l = t.FPS) ? l : 24
						}
					}), this.addSubView(this.loader, null, !0), this.loader.$().css({
						position: "absolute",
						left: t.left || "50%",
						top: t.top || "50%",
						marginTop: -(t.diameter / 2),
						marginLeft: -(t.diameter / 2)
					}), this.loader.hide()
				}, e.prototype.showLoader = function () {
					var t, e, n;
					return n = this.getOptions(), t = n.icon, e = n.iconOnly, this.setClass("loading"), this.loader.show(), t && !e ? this.hideIcon() : void 0
				}, e.prototype.hideLoader = function () {
					var t, e, n, i;
					return n = this.getOptions(), t = n.icon, e = n.iconOnly, this.unsetClass("loading"), null != (i = this.loader) && i.hide(), t && !e ? this.showIcon() : void 0
				}, e.prototype.disable = function () {
					return this.$().attr("disabled", !0)
				}, e.prototype.enable = function () {
					return this.$().attr("disabled", !1)
				}, e.prototype.focus = function () {
					return this.$().trigger("focus")
				}, e.prototype.blur = function () {
					return this.$().trigger("blur")
				}, e.prototype.click = function (t) {
					var e;
					return (null != (e = this.loader) ? e.active : void 0) ? this.utils.stopDOMEvent() : (this.loader && !this.loader.active && this.showLoader(), "button" === this.getOption("type") && this.utils.stopDOMEvent(), this.getCallback().call(this, t), !1)
				}, e.prototype.triggerClick = function () {
					return this.doOnSubmit()
				}, e
			}(o)
		}, {
			"./../../core/view.coffee": 108,
			"./../loader/loaderview.coffee": 56
		}
	],
	21: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./buttonview.coffee"), e.exports = i = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e.prototype.setDomElement = function (t) {
					return null == t && (t = ""), this.domElement = $("<div class='kdbuttonwithmenu-wrapper " + t + "'>\n  <button class='kdbutton " + t + " with-icon with-menu' id='" + this.getId() + "'>\n    <span class='icon hidden'></span>\n  </button>\n  <span class='chevron-separator'></span>\n  <span class='chevron'></span>\n</div>"), this.$button = this.$("button").first(), this.domElement
				}, e.prototype.setIconOnly = function () {
					var t;
					return this.$().addClass("icon-only").removeClass("with-icon"), t = this.$("span.icon,span.chevron"), this.$().html(t)
				}, e.prototype.click = function (t) {
					return $(t.target).is(".chevron") ? (this.contextMenu(t), !1) : this.getCallback().call(this, t)
				}, e.prototype.contextMenu = function (t) {
					return this.createContextMenu(t), !1
				}, e.prototype.createContextMenu = function (t) {
					var e, n, i, s, r;
					return r = this.getOptions(), this.buttonMenu = new(r.buttonMenuClass || JButtonMenu)({
						cssClass: r.style,
						ghost: this.$(".chevron").clone(),
						event: t,
						delegate: this,
						treeItemClass: r.treeItemClass,
						itemChildClass: r.itemChildClass,
						itemChildOptions: r.itemChildOptions
					}, function () {
						var t, a, l;
						if ("function" == typeof r.menu) return r.menu();
						if (r.menu instanceof Array) {
							for (e = {}, l = r.menu, t = 0, a = l.length; a > t; t++) {
								n = l[t];
								for (i in n) o.call(n, i) && (s = n[i], null != i && null != s && (e[i] = s))
							}
							return e
						}
						return r.menu
					}()), this.buttonMenu.on("ContextMenuItemReceivedClick", function (t) {
						return function () {
							return t.buttonMenu.destroy()
						}
					}(this))
				}, e.prototype.setTitle = function (t) {
					return this.$button.append(t)
				}, e.prototype.setButtonStyle = function (t) {
					var e, n, i, o;
					for (n = this.constructor.styles, i = 0, o = n.length; o > i; i++) e = n[i], this.$().removeClass(e), this.$button.removeClass(e);
					return this.$button.addClass(t), this.$().addClass(t)
				}, e.prototype.setIconOnly = function () {
					var t;
					return this.$button.addClass("icon-only").removeClass("with-icon"), t = this.$("span.icon"), this.$button.html(t)
				}, e.prototype.disable = function () {
					return this.$button.attr("disabled", !0)
				}, e.prototype.enable = function () {
					return this.$button.attr("disabled", !1)
				}, e
			}(n)
		}, {
			"./buttonview.coffee": 20
		}
	],
	22: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./buttonview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					null == t && (t = {}), t = $.extend({
						dataPath: null,
						defaultState: null,
						states: []
					}, t), e.__super__.constructor.call(this, t, n), this.setState(t.defaultState)
				}
				return s(e, t), e.prototype.getStateIndex = function (t) {
					var e, n, i, o, s;
					if (i = this.getOptions().states, !t) return 0;
					for (e = o = 0, s = i.length; s > o; e = ++o)
						if (n = i[e], t === n.title) return e
				}, e.prototype.decorateState = function () {
					return this.setTitle(this.state.title), null != this.state.iconClass && this.setIconClass(this.state.iconClass), null != this.state.cssClass || null != this.lastUsedCssClass ? (null != this.lastUsedCssClass && this.unsetClass(this.lastUsedCssClass), this.setClass(this.state.cssClass), this.lastUsedCssClass = this.state.cssClass) : delete this.lastUsedCssClass
				}, e.prototype.getState = function () {
					return this.state
				}, e.prototype.setState = function (t) {
					var e, n;
					return n = this.getOptions().states, this.stateIndex = e = this.getStateIndex(t), this.state = n[e], this.decorateState(t), this.setCallback(n[e].callback.bind(this, this.toggleState.bind(this)))
				}, e.prototype.toggleState = function (t) {
					var e, n;
					return n = this.getOptions().states, e = n[this.stateIndex + 1] || n[0], t ? "AccessDenied" !== t.name && warn(t.message || "There was an error, couldn't switch to " + e.title + " state!") : this.setState(e.title), "function" == typeof this.hideLoader ? this.hideLoader() : void 0
				}, e
			}(n)
		}, {
			"./buttonview.coffee": 20
		}
	],
	23: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			s = t("./../../core/view.coffee"), o = t("./../../core/customhtmlview.coffee"), n = t("./contextmenutreeviewcontroller.coffee"), e.exports = i = function (t) {
				function e(t, i) {
					var o, s, r, a;
					null == t && (t = {}), t.cssClass = this.utils.curry("kdcontextmenu", t.cssClass), t.menuMaxWidth || (t.menuMaxWidth = "auto"), t.menuMinWidth || (t.menuMinWidth = "auto"), t.menuWidth || (t.menuWidth = 172), t.offset || (t.offset = {}), (s = t.offset).left || (s.left = 0), (r = t.offset).top || (r.top = 0), null == t.arrow && (t.arrow = !1), null == t.sticky && (t.sticky = !1), e.__super__.constructor.call(this, t, i), this.topMargin = 0, this.leftMargin = 0, o = this.getOptions(), this.sticky = o.sticky, KD.getSingleton("windowController").addLayer(this), this.on("ReceivedClickElsewhere", function (t) {
						return function () {
							return t.sticky ? void 0 : t.destroy()
						}
					}(this)), i && (this.treeController = new n({
						type: o.type,
						view: o.view,
						delegate: this,
						treeItemClass: o.treeItemClass,
						listViewClass: o.listViewClass,
						itemChildClass: o.itemChildClass,
						itemChildOptions: o.itemChildOptions,
						addListsCollapsed: o.addListsCollapsed,
						putDepthInfo: o.putDepthInfo,
						lazyLoad: null != (a = o.lazyLoad) ? a : !1
					}, i), this.addSubView(this.treeController.getView()), this.treeController.getView().on("ReceivedClickElsewhere", function (t) {
						return function () {
							return t.sticky ? void 0 : t.destroy()
						}
					}(this)), this.treeController.on("NodeExpanded", this.bound("positionSubMenu"))), t.arrow && this.on("viewAppended", this.bound("addArrow")), this.appendToDomBody()
				}
				return a(e, t), e.prototype.changeStickyState = function (t) {
					return this.sticky = t
				}, e.prototype.childAppended = function () {
					return e.__super__.childAppended.apply(this, arguments), this.positionContextMenu(), this.getOption("deferPositioning") ? KD.utils.defer(function (t) {
						return function () {
							return t.positionContextMenu()
						}
					}(this)) : this.positionContextMenu()
				}, e.prototype.addArrow = function () {
					var t, e, n;
					return t = this.getOptions().arrow, t.placement || (t.placement = "top"), null == t.margin && (t.margin = 0), t.margin += "top" === (n = t.placement) || "bottom" === n ? this.leftMargin : this.topMargin, this.arrow = new o({
						tagName: "span",
						cssClass: "arrow " + t.placement
					}), this.arrow.$().css(function () {
						switch (t.placement) {
						case "top":
							return e = {}, t.margin > 0 ? e.left = t.margin : e.right = -t.margin, e;
						case "bottom":
							return e = {}, t.margin > 0 ? e.left = t.margin : e.right = -t.margin, e;
						case "right":
							return e = {}, t.margin > 0 ? e.top = t.margin : e.bottom = -t.margin, e;
						case "left":
							return e = {}, t.margin > 0 ? e.top = t.margin : e.bottom = -t.margin, e;
						default:
							return {}
						}
					}()), this.addSubView(this.arrow)
				}, e.prototype.positionContextMenu = KD.utils.debounce(10, function () {
					var t, e, n, i, o, s, r, a, l, u, c, p, h, d;
					return p = this.getOptions(), t = p.event || {}, s = KD.getSingleton("mainView"), o = s.getHeight(), r = s.getWidth(), c = p.menuWidth, a = p.menuHeight, l = p.menuMaxWidth, u = p.menuMinWidth, null == a && (a = this.getHeight()), null == c && (c = this.getWidth()), d = (p.y || t.pageY || 0) + p.offset.top, i = (p.x || t.pageX || 0) + p.offset.left, n = d, e = i, d + a > o && (d = o - a + p.offset.top), i + c > r && (i = r - c + p.offset.left), this.topMargin = n - d, this.leftMargin = e - i, h = {
						width: "" + c + "px",
						top: d,
						left: i
					}, l && (h.maxWidth = "" + l + "px"), u && (h.minWidth = "" + u + "px"), this.getDomElement().css(h)
				}), e.prototype.positionSubMenu = function (t) {
					var e, n, i, o, s, r;
					return r = t.getData(), e = r.children, s = r.id, e && (n = this.treeController.listControllers[s].getView(), i = n.getY() + n.getHeight(), i > window.innerHeight && n.$().css("bottom", 0), o = n.getX() + n.getWidth(), o > window.innerWidth) ? (n.$().css("left", -n.getWidth()), n.setClass("left-aligned")) : void 0
				}, e
			}(s)
		}, {
			"./../../core/customhtmlview.coffee": 97,
			"./../../core/view.coffee": 108,
			"./contextmenutreeviewcontroller.coffee": 26
		}
	],
	24: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./../../core/view.coffee"), i = t("./../tree/treeitemview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == n && (n = {}), t.type = "contextitem", t.cssClass || (t.cssClass = "default"), e.__super__.constructor.call(this, t, n), this.unsetClass("jtreeitem"), n && (("divider" === n.type || "separator" === n.type) && this.setClass("separator"), n.cssClass && this.setClass(n.cssClass), "customView" === n.type && this.addCustomView(n), n.disabled && this.setClass("disabled"))
				}
				return r(e, t), e.prototype.viewAppended = function () {
					return this.customView ? void 0 : e.__super__.viewAppended.call(this)
				}, e.prototype.mouseDown = function () {
					return !0
				}, e.prototype.addCustomView = function (t) {
					return this.setClass("custom-view"), this.unsetClass("default"), this.customView = t.view || new o, delete t.view, this.addSubView(this.customView)
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108,
			"./../tree/treeitemview.coffee": 86
		}
	],
	25: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../tree/treeview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == n && (n = {}), t.type || (t.type = "contextmenu"), null == t.animated && (t.animated = !1), t.cssClass || (t.cssClass = "default"), e.__super__.constructor.call(this, t, n), this.unsetClass("jtreeview")
				}
				return s(e, t), e
			}(i)
		}, {
			"./../tree/treeview.coffee": 87
		}
	],
	26: [
		function (t, e) {
			var n, i, o, s, r, a = {}.hasOwnProperty,
				l = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) a.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			r = t("./../../core/view.coffee"), s = t("./../tree/treeviewcontroller.coffee"), n = t("./contextmenuitem.coffee"), i = t("./contextmenutreeview.coffee"), e.exports = o = function (t) {
				function e(t, o) {
					var s;
					null == t && (t = {}), s = t, s.view || (s.view = new r({
						cssClass: "context-list-wrapper"
					})), s.type || (s.type = "contextmenu"), s.treeItemClass || (s.treeItemClass = n), s.listViewClass || (s.listViewClass = i), null == s.addListsCollapsed && (s.addListsCollapsed = !0), null == s.putDepthInfo && (s.putDepthInfo = !0), e.__super__.constructor.call(this, s, o), this.expandedNodes = []
				}
				var o, s, u;
				return l(e, t), u = 0, s = function () {
					return ++u
				}, o = e.convertToArray = function (t, e) {
					var n, i, r, l, u, c, p;
					null == e && (e = null), c = [];
					for (p in t) a.call(t, p) && (u = t[p], r = null, 0 !== p.indexOf("customView") ? u.children ? (r = s(), u.title = p, u.id = r, u.parentId = e, c.push(u), n = o(u.children, r), c = c.concat(n), u.separator && (i = {
						type: "separator",
						parentId: e
					}, c.push(i))) : (u.title = p, u.parentId = e, c.push(u), u.separator && (i = {
						type: "separator",
						parentId: e
					}, c.push(i))) : (l = {
						type: "customView",
						parentId: e,
						view: u
					}, c.push(l)));
					return c
				}, e.prototype.loadView = function () {
					return e.__super__.loadView.apply(this, arguments), this.getOptions().lazyLoad ? void 0 : this.selectFirstNode()
				}, e.prototype.initTree = function (t) {
					return t.length || this.setData(t = o(t)), e.__super__.initTree.call(this, t)
				}, e.prototype.repairIds = function (t) {
					return "divider" === t.type && (t.type = "separator"), e.__super__.repairIds.apply(this, arguments)
				}, e.prototype.expand = function (t) {
					return e.__super__.expand.apply(this, arguments), this.emit("NodeExpanded", t), t.expanded ? this.expandedNodes.push(t) : void 0
				}, e.prototype.organizeSelectedNodes = function (t, n, i) {
					var o, s;
					return null == i && (i = {}), s = n[0], this.expandedNodes.length && (o = s.getData().depth, this.expandedNodes.forEach(function (t) {
						return function (e) {
							var n;
							return n = e.getData().depth, n >= o ? t.collapse(e) : void 0
						}
					}(this))), e.__super__.organizeSelectedNodes.apply(this, arguments)
				}, e.prototype.dblClick = function () {}, e.prototype.mouseEnter = function (t, e) {
					var n;
					return this.mouseEnterTimeOut && clearTimeout(this.mouseEnterTimeOut), n = t.getData(), "separator" !== n.type ? (this.selectNode(t, e), this.mouseEnterTimeOut = setTimeout(function (e) {
						return function () {
							return e.expand(t)
						}
					}(this), 150)) : void 0
				}, e.prototype.click = function (t, e) {
					var n, i;
					return i = t.getData(), "separator" === i.type || i.disabled ? void 0 : (this.toggle(t), n = this.getDelegate(), i.callback && "function" == typeof i.callback && i.callback.call(n, t, e), n.emit("ContextMenuItemReceivedClick", t), e.stopPropagation(), !1)
				}, e.prototype.performDownKey = function (t, n) {
					var i, o;
					return i = e.__super__.performDownKey.call(this, t, n), i && (o = i.getData(), "separator" === o.type) ? this.performDownKey(i, n) : void 0
				}, e.prototype.performUpKey = function (t, n) {
					var i, o;
					return i = e.__super__.performUpKey.call(this, t, n), i && (o = i.getData(), "separator" === o.type && this.performUpKey(i, n)), i
				}, e.prototype.performRightKey = function (t, n) {
					return e.__super__.performRightKey.apply(this, arguments), this.performDownKey(t, n)
				}, e.prototype.performLeftKey = function (t, n) {
					var i;
					return i = e.__super__.performLeftKey.call(this, t, n), i && this.collapse(i), i
				}, e.prototype.performEscapeKey = function () {
					return KD.getSingleton("windowController").revertKeyView(), this.getDelegate().destroy()
				}, e.prototype.performEnterKey = function (t, e) {
					var n;
					return KD.getSingleton("windowController").revertKeyView(), n = this.getDelegate(), n.emit("ContextMenuItemReceivedClick", t), n.destroy(), e.stopPropagation(), e.preventDefault(), !1
				}, e
			}(s)
		}, {
			"./../../core/view.coffee": 108,
			"./../tree/treeviewcontroller.coffee": 88,
			"./contextmenuitem.coffee": 24,
			"./contextmenutreeview.coffee": 25
		}
	],
	27: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/customhtmlview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == n && (n = {}), t.tagName = "ul", null == t.initialValue && (t.initialValue = 0), e.__super__.constructor.call(this, t, n), this.currentValue = t.initialValue, this.createDigit()
				}
				return s(e, t), e.prototype.createDigit = function () {
					return this.addSubView(this.digit = new i({
						tagName: "li",
						cssClass: "real",
						partial: '<span class="top">' + this.getOption("initialValue") + '</span>\n<span class="bottom">' + this.getOption("initialValue") + "</span>"
					})), this.addSubView(this.fakeDigit = new i({
						tagName: "li",
						cssClass: "fake",
						partial: '<span class="top">' + this.getOption("initialValue") + '</span>\n<span class="bottom">' + this.getOption("initialValue") + "</span>"
					})), this.setValue(this.getOption("initialValue"))
				}, e.prototype.setValue = function (t) {
					return t !== this.currentValue ? (this.currentValue = t, this.digit.updatePartial('<span class="top">' + t + '</span>\n<span class="bottom">' + t + "</span>"), this.setClass("animate"), KD.utils.wait(500, function (e) {
						return function () {
							return e.fakeDigit.updatePartial('<span class="top">' + t + '</span>\n<span class="bottom">' + t + "</span>"), e.unsetClass("animate")
						}
					}(this))) : void 0
				}, e
			}(i)
		}, {
			"./../../core/customhtmlview.coffee": 97
		}
	],
	28: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./../../core/view.coffee"), n = t("./counterdigitview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == n && (n = {}), null == t.style && (t.style = "dark"), null == t.from && (t.from = 5e3), null == t.to && (t.to = 1e4), null == t.interval && (t.interval = 1e3), null == t.step && (t.step = 1), null == t.autoStart && (t.autoStart = !0), t.direction = t.from < t.to ? "up" : "down", null == t.digits && (t.digits = "up" === t.direction ? t.to.toString().length : t.from.toString().length), t.cssClass = KD.utils.curry("" + t.style + " " + t.direction + " kd-counter", t.cssClass), e.__super__.constructor.call(this, t, n), this.digitsList = [], this.currentValue = t.from, this.createCounter(), t.autoStart && this.start()
				}
				return r(e, t), e.prototype.createCounter = function () {
					var t, e, i, o, s, r;
					for (s = this.getOptions(), e = s.from, t = s.digits, r = [], i = o = 0; t >= 0 ? t > o : o > t; i = t >= 0 ? ++o : --o) r.push(this.digitsList.push(this.addSubView(new n({
						initialValue: e.toString()[i]
					}))));
					return r
				}, e.prototype.setValue = function (t) {
					var e, n, i, o;
					if (t !== this.currentValue) {
						for (this.currentValue = t, t = t.toString(), o = [], e = n = 0, i = t.length; i >= 0 ? i > n : n > i; e = i >= 0 ? ++n : --n) o.push(this.digitsList[e].setValue(t[e]));
						return o
					}
				}, e.prototype.start = function () {
					var t;
					return t = this.getOption("interval"), this.counterInterval = KD.utils.repeat(t, function (t) {
						return function () {
							var e;
							return e = "up" === t.getOption("direction") ? t.currentValue + t.getOption("step") : t.currentValue - t.getOption("step"), t.setValue(e), t.currentValue = e
						}
					}(this))
				}, e
			}(o)
		}, {
			"./../../core/view.coffee": 108,
			"./counterdigitview.coffee": 27
		}
	],
	29: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("kddia-container", t.cssClass), t.draggable && "object" != typeof t.draggable && (t.draggable = {}), null == t.itemClass && (t.itemClass = KDDiaObject), e.__super__.constructor.call(this, t, n), this.scale = 1, this.dias = {}
				}
				return s(e, t), e.prototype.mouseDown = function () {
					var t, n;
					return e.__super__.mouseDown.apply(this, arguments), this.emit("HighlightDia", function () {
						var e, i;
						e = this.dias, i = [];
						for (n in e) t = e[n], i.push(t);
						return i
					}.call(this))
				}, e.prototype.addDia = function (t, e) {
					return null == e && (e = {}), this.addSubView(t), t.on("DiaObjectClicked", function (e) {
						return function () {
							return e.emit("HighlightDia", t)
						}
					}(this)), t.on("RemoveMyConnections", function (e) {
						return function () {
							return delete e.dias[t.getId()]
						}
					}(this)), this.dias[t.getId()] = t, this.emit("NewDiaObjectAdded", this, t), null != e.x && t.setX(e.x), null != e.y && t.setY(e.y), t
				}, e.prototype.addItem = function (t, e) {
					var n;
					return null == e && (e = {}), n = this.getOption("itemClass"), this.addDia(new n(e, t))
				}, e.prototype.removeAllItems = function () {
					var t, e, n, i;
					n = this.dias, i = [];
					for (e in n) t = n[e], i.push("function" == typeof t.destroy ? t.destroy() : void 0);
					return i
				}, e.prototype.setScale = function (t) {
					var e, n, i, o, s;
					if (null == t && (t = 1), t !== this.scale) {
						for (i = ["webkitTransform", "MozTransform", "transform"], e = {}, o = 0, s = i.length; s > o; o++) n = i[o], e[n] = "scale(" + t + ")";
						return this.setStyle(e), this.scale = t
					}
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	30: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				r = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, i) {
					var o;
					null == t && (t = {}), t.type || (t.type = "left"), o = t.type, r.call(n, o) < 0 && (warn("Unknown joint type '" + t.type + "', falling back to 'left'"), t.type = "left"), null == t["static"] && (t["static"] = !1), null == t.size && (t.size = 10), t.cssClass = KD.utils.curry("kddia-joint " + t.type, t.cssClass), e.__super__.constructor.call(this, t, i), this.connections = {}, this.type = this.getOption("type"), this.size = this.getOption("size")
				}
				var n;
				return s(e, t), n = ["left", "right", "top", "bottom"], e.prototype.viewAppended = function () {
					return e.__super__.viewAppended.apply(this, arguments), this.domElement.attr("dia-id", this.getDiaId())
				}, e.prototype.getDiaId = function () {
					return "dia-" + this.parent.getId() + "-joint-" + this.type
				}, e.prototype.getPos = function () {
					return this.parent.getJointPos(this)
				}, e.prototype.click = function (t) {
					return this.inDeleteMode() && this.emit("DeleteRequested", this.parent, this.type), this.utils.stopDOMEvent(t)
				}, e.prototype.mouseDown = function (t) {
					return this.inDeleteMode() ? void 0 : (this.utils.stopDOMEvent(t), this.parent.emit("JointRequestsLine", this), !1)
				}, e.prototype.inDeleteMode = function () {
					return this.hasClass("deleteMode")
				}, e.prototype.showDeleteButton = function () {
					return this.isStatic() ? void 0 : this.setClass("deleteMode")
				}, e.prototype.hideDeleteButton = function () {
					return this.unsetClass("deleteMode")
				}, e.prototype.isStatic = function () {
					return this.getOption("static")
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	31: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				r = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i, o, s;
					t.cssClass = KD.utils.curry("kddia-object", t.cssClass), null == t.draggable && ("object" != typeof t.draggable && (t.draggable = {}), (i = t.draggable).containment || (i.containment = {}), (o = t.draggable.containment).view || (o.view = "parent"), null == (s = t.draggable.containment).padding && (s.padding = {
						top: 1,
						right: 1,
						bottom: 1,
						left: 1
					})), t.bind = KD.utils.curry("mouseleave", t.bind), null == t.joints && (t.joints = ["left", "right"]), null == t.jointItemClass && (t.jointItemClass = KDDiaJoint), t.allowedConnections || (t.allowedConnections = {}), t.staticJoints || (t.staticJoints = []), e.__super__.constructor.call(this, t, n), this.joints = {}, this.allowedConnections = this.getOption("allowedConnections"), this.domElement.attr("dia-id", "dia-" + this.getId()), this.wc = KD.getSingleton("windowController"), this.on("KDObjectWillBeDestroyed", function (t) {
						return function () {
							return t.emit("RemoveMyConnections")
						}
					}(this)), this.once("viewAppended", function (t) {
						return function () {
							var e, n, i, o;
							for (o = t.getOption("joints"), n = 0, i = o.length; i > n; n++) e = o[n], t.addJoint(e);
							return t.parent.on("UnhighlightDias", function () {
								var n, i, o;
								t.unsetClass("highlight"), i = t.joints, o = [];
								for (n in i) e = i[n], o.push(e.hideDeleteButton());
								return o
							})
						}
					}(this))
				}
				return s(e, t), e.prototype.mouseDown = function (t) {
					return this.emit("DiaObjectClicked"), this._mouseDown = !0, this.wc.once("ReceivedMouseUpElsewhere", function (t) {
						return function () {
							return t._mouseDown = !1
						}
					}(this)), this.getOption("draggable") ? void 0 : this.utils.stopDOMEvent(t)
				}, e.prototype.mouseLeave = function (t) {
					var e, n;
					if (this._mouseDown) return e = this.getBounds(), n = null, e.w = e.w * this.parent.scale, e.h = e.h * this.parent.scale, t.pageX >= e.x + e.w && (n = this.joints.right), t.pageX <= e.x && (n = this.joints.left), t.pageY >= e.y + e.h && (n = this.joints.bottom), t.pageY <= e.y && (n = this.joints.top), n ? this.emit("JointRequestsLine", n) : void 0
				}, e.prototype.addJoint = function (t) {
					var e, n, i, o, s;
					return null != this.joints[t] && (warn("KDDiaObject: Tried to add same joint! Destroying old one. "), "function" == typeof (o = this.joints[t]).destroy && o.destroy()), s = this.getOptions(), n = s.jointItemClass, i = s.staticJoints, this.addSubView(e = new n({
						type: t,
						"static": r.call(i, t) >= 0
					})), this.joints[t] = e
				}, e.prototype.getJointPos = function (t) {
					var e, n, i, o, s, r, a, l, u, c, p, h, d, f;
					return "string" == typeof t && (t = this.joints[t]), t ? (c = [this.parent.getElement(), this.getElement(), t.getElement()], r = c[0], a = c[1], i = c[2], p = [r.offsetLeft + a.offsetLeft, r.offsetTop + a.offsetTop], l = p[0], u = p[1], h = [i.offsetLeft, i.offsetTop], o = h[0], s = h[1], f = "left" === (d = t.type) || "right" === d ? [10, 4] : [4, 10], e = f[0], n = f[1], {
						x: l + o + e,
						y: u + s + n
					}) : {
						x: 0,
						y: 0
					}
				}, e.prototype.getDiaId = function () {
					return this.domElement.attr("dia-id")
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	32: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				a = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			o = t("./../../core/view.coffee"), n = t("./../../core/customhtmlview.coffee"), e.exports = i = function (t) {
				function e(t) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("kddia-scene", t.cssClass), t.bind = KD.utils.curry("mousemove", t.bind), t.lineCap || (t.lineCap = "round"), null == t.lineWidth && (t.lineWidth = 2), t.lineColor || (t.lineColor = "#ccc"), t.lineColorActive || (t.lineColorActive = "orange"), null == t.lineDashes && (t.lineDashes = []), t.fakeLineColor || (t.fakeLineColor = "green"), null == t.fakeLineDashes && (t.fakeLineDashes = []), null == t.curveDistance && (t.curveDistance = 50), e.__super__.constructor.apply(this, arguments), this.containers = [], this.connections = [], this.activeDias = [], this.activeJoints = [], this.fakeConnections = []
				}
				return r(e, t), e.prototype.diaAdded = function (t, e) {
					return e.on("JointRequestsLine", this.bound("handleLineRequest")), e.on("DragInAction", function (t) {
						return function () {
							return t.highlightLines(e)
						}
					}(this)), e.on("RemoveMyConnections", function (t) {
						return function () {
							return t.disconnectAllConnections(e)
						}
					}(this))
				}, e.prototype.addContainer = function (t, e) {
					var n, i, o, s, r;
					return null == e && (e = {}), this.addSubView(t), t.on("NewDiaObjectAdded", this.bound("diaAdded")), t.on("DragInAction", this.bound("updateScene")), t.on("UpdateScene", this.bound("updateScene")), t.on("HighlightDia", this.bound("highlightLines")), this.containers.push(t), n = null != (i = t.getOption("draggable")) && null != (o = i.containment) ? o.padding : void 0, n && (e.x = Math.max(n, null != (s = e.x) ? s : 0), e.y = Math.max(n, null != (r = e.y) ? r : 0)), null != e.x && t.setX(e.x), null != e.y && t.setY(e.y), this.createCanvas()
				}, e.prototype.drawFakeLine = function (t) {
					var e, n, i, o, s;
					return null == t && (t = {}), o = t.sx, s = t.sy, e = t.ex, n = t.ey, this.cleanup(this.fakeCanvas), this.fakeContext.beginPath(), this.fakeContext.moveTo(o, s), this.fakeContext.lineTo(e, n), this.fakeContext.lineCap = this.getOption("lineCap"), this.fakeContext.lineWidth = this.getOption("lineWidth"), this.fakeContext.strokeStyle = this._trackJoint.parent.getOption("colorTag") || this.getOption("fakeLineColor"), i = this.getOption("fakeLineDashes"), i.length > 0 && this.fakeContext.setLineDash(i), this.fakeContext.stroke()
				}, e.prototype.click = function (t) {
					return t.target === t.currentTarget ? this.highlightLines() : void 0
				}, e.prototype.mouseMove = function (t) {
					var e, n, i, o, s;
					if (this._trackJoint) return s = this._trackJoint.getPos(), i = s.x, o = s.y, e = i + (t.clientX - this._trackJoint.getX()), n = o + (t.clientY - this._trackJoint.getY()), this.drawFakeLine({
						sx: i,
						sy: o,
						ex: e,
						ey: n
					})
				}, e.prototype.mouseUp = function (t) {
					var e, n, i, o;
					if (this._trackJoint && (o = $(t.target).closest(".kddia-object").attr("dia-id"), n = this._trackJoint.getDiaId(), delete this._trackJoint, this.cleanup(this.fakeCanvas), o)) return e = this.getDia(n), i = this.getDia(o), i.joint || (i.joint = this.guessJoint(i, e)), i.joint ? this.connect(e, i) : void 0
				}, e.prototype.guessJoint = function (t, e) {
					return "right" === e.joint && null != t.dia.joints.left ? "left" : "left" === e.joint && null != t.dia.joints.right ? "right" : void 0
				}, e.prototype.getDia = function (t) {
					var e, n, i, o, s, r, a, l, u;
					if (s = t.match(/dia\-((.*)\-joint\-(.*)|(.*))/).filter(function (t) {
						return !!t
					}), !s) return null;
					for (l = s.slice(-2), o = l[0], i = l[1], o === i && (i = null), u = this.containers, r = 0, a = u.length; a > r && (e = u[r], !(n = e.dias[o])); r++);
					return {
						dia: n,
						joint: i,
						container: e
					}
				}, e.prototype.highlightLines = function (t, e) {
					var n, i, o, s, r, l, u, c, p, h, d, f, m, g, v;
					for (null == t && (t = []), null == e && (e = !0), Array.isArray(t) || (t = [t]), this.activeDias = t, f = this.activeJoints, l = 0, p = f.length; p > l; l++) o = f[l], o.off("DeleteRequested");
					for (m = this.containers, u = 0, h = m.length; h > u; u++) i = m[u], i.emit("UnhighlightDias");
					if (this.activeJoints = [], e && this.updateScene(), 1 === this.activeDias.length) {
						for (t = t.first, g = this.connections, v = [], c = 0, d = g.length; d > c; c++) n = g[c], s = n.source, r = n.target, v.push(s.dia === t || r.dia === t ? [s, r].forEach(function (e) {
							return function (n) {
								return n.dia.setClass("highlight"), n.dia !== t && (o = n.dia.joints[n.joint], a.call(e.activeJoints, o) < 0) ? (o.showDeleteButton(), o.on("DeleteRequested", e.bound("disconnect")), e.activeJoints.push(o)) : void 0
							}
						}(this)) : void 0);
						return v
					}
				}, e.prototype.handleLineRequest = function (t) {
					return this._trackJoint = t
				}, e.prototype.findTargetConnection = function (t, e) {
					var n, i, o, s, r, a;
					for (o = function () {
						return function (n) {
							return t === n.dia && e === n.joint
						}
					}(this), n = this.activeDias.first, a = this.connections, s = 0, r = a.length; r > s; s++)
						if (i = a[s], (o(i.source) || o(i.target)) && (i.source.dia === n || i.target.dia === n)) return i
				}, e.prototype.disconnect = function (t, e) {
					var n, i;
					if (1 === this.activeDias.length) return i = this.findTargetConnection(t, e), this.connections = function () {
						var t, e, o, s;
						for (o = this.connections, s = [], t = 0, e = o.length; e > t; t++) n = o[t], n !== i && s.push(n);
						return s
					}.call(this), this.highlightLines(this.activeDias)
				}, e.prototype.disconnectAllConnections = function (t) {
					var e, n, i, o, s, r, a, l;
					for (n = [], a = this.connections, s = 0, r = a.length; r > s; s++) e = a[s], i = e.source, o = e.target, (l = t.getDiaId()) !== i.dia.getDiaId() && l !== o.dia.getDiaId() && n.push(e);
					return this.connections = n, this.highlightLines()
				}, e.prototype.allowedToConnect = function (t, e) {
					var n, i, o, s, r, l, u, c;
					if (!t || !e) return !1;
					if ((null != (r = t.dia) ? r.id : void 0) === (null != (l = e.dia) ? l.id : void 0)) return !1;
					for (i = s = 0; 1 >= s; i = ++s) {
						if (null != t.dia.allowedConnections && Object.keys(t.dia.allowedConnections).length > 0) {
							if (n = t.dia.allowedConnections, o = n[e.dia.constructor.name], !o) return !1;
							if (u = t.joint, a.call(o, u) >= 0) return !1
						}
						c = [e, t], t = c[0], e = c[1]
					}
					return !0
				}, e.prototype.connect = function (t, e, n) {
					return null == n && (n = !0), this.allowedToConnect(t, e) ? (this.emit("ConnectionCreated", t, e), this.connections.push({
						source: t,
						target: e
					}), this.highlightLines(e.dia, n)) : void 0
				}, e.prototype.resetScene = function () {
					return this.fakeConnections = [], this.updateScene()
				}, e.prototype.updateScene = function () {
					var t, e, n, i, o, s, r, a;
					for (this.cleanup(this.realCanvas), s = this.connections, e = 0, i = s.length; i > e; e++) t = s[e], this.drawConnectionLine(t);
					for (r = this.fakeConnections, a = [], n = 0, o = r.length; o > n; n++) t = r[n], a.push(this.drawConnectionLine(t));
					return a
				}, e.prototype.drawConnectionLine = function (t) {
					var e, n, i, o, s, r, l, u, c, p, h, d, f, m, g, v, y, w, b, _, C;
					return u = t.source, d = t.target, r = t.options, u || d ? (r || (r = {}), e = this.getOption("lineColorActive"), s = this.getOption("lineDashes"), o = this.getOption("lineColor"), this.realContext.beginPath(), g = u.dia, n = a.call(this.activeDias, g) >= 0 ? u : (v = d.dia, a.call(this.activeDias, v) >= 0 ? d : void 0), n && (o = r.lineColor || n.dia.getOption("colorTag") || e, s = r.lineDashes || n.dia.getOption("lineDashes") || s), l = u.dia.getJointPos(u.joint), h = d.dia.getJointPos(d.joint), this.realContext.strokeStyle = o, s.length > 0 && this.realContext.setLineDash(s), this.realContext.moveTo(l.x, l.y), i = this.getOption("curveDistance"), y = [0, 0, 0, 0], c = y[0], p = y[1], f = y[2], m = y[3], "top" === (w = u.joint) || "bottom" === w ? p = "top" === u.joint ? -i : i : ("left" === (b = u.joint) || "right" === b) && (c = "left" === u.joint ? -i : i), "top" === (_ = d.joint) || "bottom" === _ ? m = "top" === d.joint ? -i : i : ("left" === (C = d.joint) || "right" === C) && (f = "left" === d.joint ? -i : i), this.realContext.bezierCurveTo(l.x + c, l.y + p, h.x + f, h.y + m, h.x, h.y), this.realContext.lineWidth = this.getOption("lineWidth"), this.realContext.stroke()) : void 0
				}, e.prototype.addFakeConnection = function (t) {
					return this.drawConnectionLine(t), this.fakeConnections.push(t)
				}, e.prototype.createCanvas = function () {
					var t, e;
					return null != (t = this.realCanvas) && t.destroy(), null != (e = this.fakeCanvas) && e.destroy(), this.addSubView(this.realCanvas = new n({
						tagName: "canvas",
						attributes: this.getSceneSize()
					})), this.realContext = this.realCanvas.getElement().getContext("2d"), null == this.realContext.setLineDash && (this.realContext.setLineDash = noop), this.addSubView(this.fakeCanvas = new n({
						tagName: "canvas",
						cssClass: "fakeCanvas",
						attributes: this.getSceneSize()
					})), this.fakeContext = this.fakeCanvas.getElement().getContext("2d")
				}, e.prototype.setScale = function (t) {
					var e, n, i, o;
					for (null == t && (t = 1), o = this.containers, n = 0, i = o.length; i > n; n++) e = o[n], e.setScale(t);
					return this.updateScene()
				}, e.prototype.cleanup = function (t) {
					return t.setAttributes(this.getSceneSize())
				}, e.prototype.parentDidResize = function () {
					return e.__super__.parentDidResize.apply(this, arguments), _.throttle(function (t) {
						return function () {
							return t.updateScene()
						}
					}(this))()
				}, e.prototype.getSceneSize = function () {
					return {
						width: this.getWidth(),
						height: this.getHeight()
					}
				}, e.prototype.dumpScene = function () {
					return log(this.containers, this.connections)
				}, e.prototype.reset = function (t) {
					return null == t && (t = !0), this.connections = [], this.fakeConnections = [], t ? this.updateScene() : void 0
				}, e
			}(o)
		}, {
			"./../../core/customhtmlview.coffee": 97,
			"./../../core/view.coffee": 108
		}
	],
	33: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			s = t("./../../core/view.coffee"), o = t("./../overlay/overlayview.coffee"), n = t("./../buttons/buttonview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("kddialogview", t.cssClass), null == t.offset && (t.offset = !0), t.container || (t.container = null), t.buttons || (t.buttons = {
						Cancel: {
							style: "clean-red",
							callback: this.bound("hide")
						}
					}), e.__super__.constructor.call(this, t, n), this.bindTransitionEnd(), this.setButtons()
				}
				return a(e, t), e.prototype.show = function () {
					return KD.utils.defer(function (t) {
						return function () {
							var e, n;
							return null != (n = t.overlay) && n.destroy(), e = t.getOptions().container, t.overlay = new o({
								click: t.bound("hide"),
								container: e
							}), t.setClass("in")
						}
					}(this))
				}, e.prototype.hide = function () {
					return this.once("transitionend", function (t) {
						return function () {
							return t.overlay.destroy(), t.destroy()
						}
					}(this)), this.unsetClass("in")
				}, e.prototype.setButtons = function () {
					var t, e, n, i;
					n = this.getOptions().buttons, this.buttons = {}, this.buttonHolder = new s({
						cssClass: "kddialog-buttons clearfix"
					}), this.addSubView(this.buttonHolder), i = [];
					for (e in n) r.call(n, e) && (t = n[e], i.push(this.createButton(e, t)));
					return i
				}, e.prototype.createButton = function (t, e) {
					var i;
					return this.buttonHolder.addSubView(i = new n({
						title: t,
						loader: e.loader,
						style: e.style,
						callback: e.callback
					})), this.buttons[t] = i
				}, e
			}(s)
		}, {
			"./../../core/view.coffee": 108,
			"./../buttons/buttonview.coffee": 20,
			"./../overlay/overlayview.coffee": 62
		}
	],
	34: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				r = [].slice;
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.tagName = "form", t.cssClass = KD.utils.curry("kdformview", t.cssClass), t.callback || (t.callback = noop), t.customData || (t.customData = {}), t.bind || (t.bind = "submit"), e.__super__.constructor.call(this, t, n), this.unsetClass("kdview"), this.valid = null, this.setCallback(t.callback), this.customData = {}
				}
				return s(e, t), e.findChildInputs = function (t) {
					var n, i;
					return n = [], i = t.getSubViews(), i.length > 0 && i.forEach(function (t) {
						return t instanceof KDInputView && n.push(t), n = n.concat(e.findChildInputs(t))
					}), n
				}, e.sanitizeFormOptions = function (t) {
					var e, n, i;
					i = [];
					for (e in t) n = t[e], null == n.title && (n.title = e), n.key = e, i.push(n);
					return i
				}, e.prototype.childAppended = function (t) {
					return "function" == typeof t.associateForm && t.associateForm(this), t instanceof KDInputView && this.emit("inputWasAdded", t), e.__super__.childAppended.apply(this, arguments)
				}, e.prototype.getCustomData = function (t) {
					return t ? JsPath.getAt(this.customData, t) : this.customData
				}, e.prototype.addCustomData = function (t, e) {
					var n, i;
					if ("string" == typeof t) return JsPath.setAt(this.customData, t, e);
					i = [];
					for (n in t) o.call(t, n) && (e = t[n], i.push(JsPath.setAt(this.customData, n, e)));
					return i
				}, e.prototype.removeCustomData = function (t) {
					var e, n, i, o;
					return "string" == typeof t && (t = t.split(".")), i = 2 <= t.length ? r.call(t, 0, o = t.length - 1) : (o = 0, []), n = t[o++], e = !isNaN(+n), e ? JsPath.spliceAt(this.customData, i, n) : JsPath.deleteAt(this.customData, t)
				}, e.prototype.serializeFormData = function (t) {
					var e, n, i, o;
					for (null == t && (t = {}), o = this.getDomElement().serializeArray(), n = 0, i = o.length; i > n; n++) e = o[n], t[e.name] = e.value;
					return t
				}, e.prototype.getData = function () {
					var t;
					return t = $.extend({}, this.getCustomData()), this.serializeFormData(t), t
				}, e.prototype.getFormData = function () {
					var t, n;
					return n = e.findChildInputs(this), t = this.getCustomData() || {}, n.forEach(function (e) {
						return e.getName() ? t[e.getName()] = e.getValue() : void 0
					}), t
				}, e.prototype.focusFirstElement = function () {
					return e.findChildInputs(this)[0].$().trigger("focus")
				}, e.prototype.setCallback = function (t) {
					return this.formCallback = t
				}, e.prototype.getCallback = function () {
					return this.formCallback
				}, e.prototype.reset = function () {
					return this.getElement().reset()
				}, e.prototype.submit = function (t) {
					var n, i, o, s, r, a;
					return t && (t.stopPropagation(), t.preventDefault()), n = this, o = e.findChildInputs(n), a = 0, s = [], r = [], i = this.getCustomData() || {}, this.once("FormValidationFinished", function (e) {
						var o;
						return null == e && (e = !0), n.valid = e, e ? (null != (o = n.getCallback()) && o.call(n, i, t), n.emit("FormValidationPassed")) : n.emit("FormValidationFailed")
					}), o.forEach(function (t) {
						var e, n, o;
						return e = t.getOptions(), e.validate || e.required ? s.push(t) : (n = t.getName(), o = t.getValue(), n ? i[n] = o : void 0)
					}), s.forEach(function (e) {
						return function () {
							return e.once("ValidationResult", function (t) {
								var o, l, u, c;
								if (a++, t && r.push(e), s.length === a) {
									if (r.length === s.length)
										for (u = 0, c = r.length; c > u; u++) o = r[u], i[o.getName()] = o.getValue();
									else l = !1;
									return n.emit("FormValidationFinished", l)
								}
							})
						}(), e.validate(null, t)
					}), 0 === s.length ? n.emit("FormValidationFinished") : void 0
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	35: [
		function (t, e) {
			var n, i, o, s, r, a, l = {}.hasOwnProperty,
				u = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) l.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			a = t("./../../core/view.coffee"), i = t("./../../core/customhtmlview.coffee"), o = t("./formview.coffee"), n = t("./../buttons/buttonbar.coffee"), r = t("./../inputs/labelview.coffee"), e.exports = s = function (t) {
				function e() {
					var t, n, i;
					e.__super__.constructor.apply(this, arguments), this.setClass("with-fields"), this.inputs = {}, this.fields = {}, i = this.getOptions(), n = i.fields, t = i.buttons, n && this.createFields(o.sanitizeFormOptions(n)), t && (this.createButtons(t), this.buttons = this.buttonField.buttons)
				}
				return u(e, t), e.prototype.createFields = function (t) {
					var e, n, i, o;
					for (o = [], n = 0, i = t.length; i > n; n++) e = t[n], o.push(this.addSubView(this.createField(e)));
					return o
				}, e.prototype.createButtons = function (t) {
					return this.addSubView(this.buttonField = new n({
						buttons: t
					}))
				}, e.prototype.createField = function (t, e, n) {
					var o, s, r, u, c, p, h, d, f, m;
					if (null == n && (n = !1), u = t.itemClass, d = t.title, u || (u = KDInputView), t.cssClass || (t.cssClass = ""), t.name || (t.name = d), e || (e = new a({
						cssClass: "formline " + KD.utils.slugify(t.name) + " " + t.cssClass
					})), t.label && e.addSubView(p = t.label = this.createLabel(t)), n ? e.addSubView(s = this.createInput(u, t)) : (e.addSubView(r = new i({
						cssClass: "input-wrapper"
					})), r.addSubView(s = this.createInput(u, t))), t.hint && r.addSubView(o = new i({
						partial: t.hint,
						tagName: "cite",
						cssClass: "hint"
					})), this.fields[d] = e, t.nextElement) {
						f = t.nextElement;
						for (c in f) h = f[c], h.title || (h.title = c), this.createField(h, r || e, !0)
					}
					if (t.nextElementFlat) {
						m = t.nextElementFlat;
						for (c in m) l.call(m, c) && (h = m[c], h.title || (h.title = c), this.createField(h, e))
					}
					return e
				}, e.prototype.createLabel = function (t) {
					return new r({
						title: t.label,
						cssClass: this.utils.slugify(t.label)
					})
				}, e.prototype.createInput = function (t, e) {
					var n, i;
					return n = e.data, n && delete e.data, this.inputs[e.title] = i = new t(e, n), i
				}, e
			}(o)
		}, {
			"./../../core/customhtmlview.coffee": 97,
			"./../../core/view.coffee": 108,
			"./../buttons/buttonbar.coffee": 17,
			"./../inputs/labelview.coffee": 47,
			"./formview.coffee": 34
		}
	],
	36: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					t = null != t ? t : {}, t.type = null != (i = t.type) ? i : "default", e.__super__.constructor.call(this, t, n), null != t.title && (this.lazy ? this.updateTitle(t.title) : this.setTitle(t.title))
				}
				return s(e, t), e.prototype.setTitle = function (t) {
					return this.getDomElement().append("<span>" + t + "</span>")
				}, e.prototype.updateTitle = function (t) {
					return this.$().find("span").html(t)
				}, e.prototype.setDomElement = function (t) {
					var n;
					return null == t && (t = ""), n = this.getOptions().type, this.setOption("tagName", function () {
						switch (n) {
						case "big":
							return "h1";
						case "medium":
							return "h2";
						case "small":
							return "h3";
						default:
							return "h4"
						}
					}()), e.__super__.setDomElement.call(this, this.utils.curry("kdheaderview", t))
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	37: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./../../core/view.coffee"), i = t("./../../core/customhtmlview.coffee"), n = t("./../buttons/buttonview.coffee"), e.exports = s = function (t) {
				function e(t, s) {
					null == t && (t = {}), t.cssClass || (t.cssClass = "kdwebcamview"), null == t.screenFlash && (t.screenFlash = !0), null == t.hideControls && (t.hideControls = !1), t.snapTitle || (t.snapTitle = "Snap Photo"), t.resnapTitle || (t.resnapTitle = "Resnap"), t.saveTitle || (t.saveTitle = "Save"), null == t.countdown && (t.countdown = 3), e.__super__.constructor.call(this, t, s), this.attachEvents(), this.video = new i({
						tagName: "video",
						attributes: {
							autoplay: !0
						}
					}), this.picture = new i({
						tagName: "canvas"
					}), this.button = t.hideControls ? new o({
						cssClass: "hidden"
					}) : new n({
						title: t.snapTitle,
						cssClass: "snap-button hidden",
						callback: this.bound("countDown")
					}), this.retake = t.hideControls ? new o({
						cssClass: "hidden"
					}) : new n({
						title: t.resnapTitle,
						cssClass: "snap-button retake hidden",
						callback: function (t) {
							return function () {
								return t.resetView()
							}
						}(this)
					}), this.save = t.hideControls ? new o({
						cssClass: "hidden"
					}) : new n({
						title: t.saveTitle,
						cssClass: "snap-button save hidden",
						callback: function (t) {
							return function () {
								return t.resetView(), t.video.setClass("invisible"), t.button.hide(), t.emit("save")
							}
						}(this)
					})
				}
				return a(e, t), e.prototype.attachEvents = function () {
					var t;
					return t = this.getOptions().snapTitle, this.on("KDObjectWillBeDestroyed", function (t) {
						return function () {
							return t.unsetVideoStream()
						}
					}(this)), this.on("viewAppended", function (t) {
						return function () {
							return t.context = t.picture.getElement().getContext("2d"), t.getUserMedia()
						}
					}(this)), this.on("error", function () {
						return this.emit("forbidden")
					}), this.on("snap", function (t) {
						return function () {
							return t.video.setClass("invisible")
						}
					}(this)), this.on("countDownEnd", function (e) {
						return function () {
							return e.button.hide(), e.retake.show(), e.save.show(), e.takePicture(), e.button.setTitle(t)
						}
					}(this))
				}, e.prototype.resetView = function () {
					return this.button.show(), this.retake.hide(), this.save.hide(), this.reset()
				}, e.prototype.reset = function () {
					return this.video.unsetClass("invisible")
				}, e.prototype.countDown = function () {
					var t, e, n, i;
					return e = this.getOptions().countdown, e > 0 ? (n = function (t) {
						return function () {
							return t.button.setTitle(e), e--
						}
					}(this), t = this.utils.repeat(1e3, n), n(), i = this.utils.wait(1e3 * (e + 1), function (e) {
						return function () {
							return e.utils.killRepeat(t), e.utils.killWait(i), e.emit("countDownEnd")
						}
					}(this))) : this.emit("countDownEnd")
				}, e.prototype.autoResize = function () {
					var t, e;
					return e = this.video.getElement(), t = {
						width: e.clientWidth,
						height: e.clientHeight
					}, this.picture.setAttributes(t), this.setSize(t)
				}, e.prototype.unsetVideoStream = function () {
					var t, n;
					return t = this.video.getElement(), t.pause(), e.setVideoStreamVendor(t, ""), null != (n = this.localMediaStream) ? n.stop() : void 0
				}, e.prototype.setVideoStream = function (t) {
					var n;
					return n = this.video.getElement(), e.setVideoStreamVendor(n, t), n.play(), n.addEventListener("playing", function (t) {
						return function () {
							return t.show(), t.button.show(), t.autoResize(), t.emit("allowed")
						}
					}(this))
				}, e.setVideoStreamVendor = function (t, e) {
					return void 0 !== t.mozSrcObject ? t.mozSrcObject = e : t.src = e
				}, e.getUserMediaVendor = function () {
					return navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
				}, e.getURLVendor = function () {
					return window.URL || window.webkitURL || window.mozURL
				}, e.prototype.getUserMedia = function () {
					var t;
					return t = function (t) {
						return function (e) {
							return t.emit("error", e)
						}
					}(this), navigator.getUserMedia = e.getUserMediaVendor(), window.URL = e.getURLVendor(), navigator.getUserMedia ? navigator.getUserMedia({
						video: !0
					}, function (t) {
						return function (e) {
							return t.localMediaStream = e, t.setVideoStream(window.URL && window.URL.createObjectURL(e) || e)
						}
					}(this), t) : t({
						notSupported: !0
					})
				}, e.prototype.flash = function () {
					var t;
					return t = new o({
						cssClass: "kdwebcamview-flash"
					}), t.appendToDomBody(), KD.utils.defer(function () {
						return t.setClass("flashed"), KD.utils.wait(500, function () {
							return t.destroy()
						})
					})
				}, e.prototype.takePicture = function () {
					var t, e, n;
					return n = this.video.getElement(), t = this.picture.getElement(), e = this.getOptions().screenFlash, e && this.flash(), this.autoResize(), this.context.drawImage(n, 0, 0, n.clientWidth, n.clientHeight), this.emit("snap", t.toDataURL(), t)
				}, e.prototype.viewAppended = function () {
					var t, n, i, o, s;
					for (e.__super__.viewAppended.call(this), o = [this.button, this.save, this.retake, this.video, this.picture], s = [], n = 0, i = o.length; i > n; n++) t = o[n], s.push(this.addSubView(t));
					return s
				}, e
			}(o)
		}, {
			"./../../core/customhtmlview.coffee": 97,
			"./../../core/view.coffee": 108,
			"./../buttons/buttonview.coffee": 20
		}
	],
	38: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./inputview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), t.type || (t.type = "checkbox"), null == t.attributes && (t.attributes = {}), null == (i = t.attributes).checked && (i.checked = t.defaultValue || !1), e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e
			}(i)
		}, {
			"./inputview.coffee": 46
		}
	],
	39: [
		function (t, e) {
			var n, i, o, s = function (t, e) {
					return function () {
						return t.apply(e, arguments)
					}
				},
				r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./../../core/view.coffee"), i = t("./../notifications/notificationview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), this.keyDown = s(this.keyDown, this), this.input = s(this.input, this), this.click = s(this.click, this), t.cssClass = KD.utils.curry("kdcontenteditableview", t.cssClass), t.bind = KD.utils.curry("click input keydown paste drop", t.bind), t.type || (t.type = "text"), null == t.multiline && (t.multiline = !1), t.placeholder || (t.placeholder = ""), null == t.tabNavigation && (t.tabNavigation = !1), e.__super__.constructor.call(this, t, n), null != (i = this.getDelegate()) && i.on("EditingModeToggled", function (t) {
						return function (e) {
							return t.setEditingMode(e)
						}
					}(this)), this.validationNotifications = {}
				}
				return a(e, t), e.prototype.viewAppended = function () {
					return this.setEditingMode(!1), e.__super__.viewAppended.apply(this, arguments)
				}, e.prototype.getEditableElement = function () {
					return this.editableElement || (this.getData() ? this.editableElement = this.getElement().children[0] : (this.editableElement = document.createElement("div"), this.getDomElement().append(this.editableElement))), this.editableElement
				}, e.prototype.getEditableDomElement = function () {
					return this.editableDomElement || (this.editableDomElement = $(this.getEditableElement())), this.editableDomElement
				}, e.prototype.setEditingMode = function (t) {
					return this.editingMode = t, this.getEditableElement().setAttribute("contenteditable", t), "" === this.getValue() ? this.editingMode && this.getOptions().placeholder ? this.setPlaceholder() : this.unsetPlaceholder() : void 0
				}, e.prototype.getValue = function (t) {
					var e, n, i, o, s;
					switch (s = this.getOptions(), i = s.type, n = s.placeholder, e = this.getEditableElement(), t && (i = t), i) {
					case "text":
						o = e.textContent;
						break;
					case "html":
						o = e.innerHTML
					}
					return o === Encoder.htmlDecode(n) ? "" : o.trim()
				}, e.prototype.setContent = function (t) {
					var e, n;
					if (n = this.getOptions().type, e = this.getEditableElement(), t) switch (n) {
					case "text":
						return e.textContent = t;
					case "html":
						return e.innerHTML = t
					} else if (this.editingMode && "" === t) return this.setPlaceholder()
				}, e.prototype.focus = function () {
					var t, e;
					return 0 === this.getValue().length && this.unsetPlaceholder(), this.focused || this.getEditableDomElement().trigger("focus"), t = KD.getSingleton("windowController"), t.addLayer(this), this.focused || this.once("ReceivedClickElsewhere", this.bound("blur")), this.focused = !0, "function" == typeof (e = this.getOptions()).focus ? e.focus() : void 0
				}, e.prototype.blur = function () {
					return this.focused = !1, 0 === this.getValue("text").length ? this.setPlaceholder() : "html" !== this.getOptions().type && this.setContent(this.getValue()), this.emit("BlurHappened")
				}, e.prototype.click = function () {
					return this.editingMode && !this.focused ? this.focus() : void 0
				}, e.prototype.input = function (t) {
					return this.emit("ValueChanged", t)
				}, e.prototype.keyDown = function (t) {
					var e, n, i, o, s, r, a, l;
					switch (r = this.getOptions(), i = r.tabNavigation, n = r.multiline, o = r.validate, t.which) {
					case 9:
						i && this.utils.stopDOMEvent(t);
						break;
					case 13:
						this.utils.stopDOMEvent(t)
					}
					switch (t.which) {
					case 9:
						if (!i) break;
						this.blur(), this.emit(t.shiftKey ? "PreviousTabStop" : "NextTabStop");
						break;
					case 13:
						this.getOptions().multiline ? this.appendNewline() : this.emit("EnterPressed")
					}
					return s = this.getValue(), e = (null != (a = this.getOptions().validate) && null != (l = a.rules) ? l.maxLength : void 0) || 0, 13 === t.which || e > 0 && s.length === e ? t.preventDefault() : 0 === s.length && (this.unsetPlaceholder(), t.target !== this.getEditableElement()) ? this.focus() : void 0
				}, e.prototype.paste = function (t) {
					var e;
					return t.preventDefault(), e = t.originalEvent.clipboardData.getData("text/plain"), document.execCommand("insertText", !1, e)
				}, e.prototype.drop = function (t) {
					var e, n, i, o, s, r, a, l;
					return t.preventDefault(), r = t.originalEvent.dataTransfer.getData("text/plain"), a = t.originalEvent, e = a.clientX, n = a.clientY, "" === this.getValue() && (s = 0, this.unsetPlaceholder()), l = document.caretRangeFromPoint(e, n), i = l.commonAncestorContainer, s = l.startOffset, o = l.endOffset, this.utils.replaceRange(i, r, s)
				}, e.prototype.setPlaceholder = function () {
					var t;
					return this.setClass("placeholder"), t = this.getOptions().placeholder, t ? this.setContent(t) : void 0
				}, e.prototype.unsetPlaceholder = function () {
					var t, e, n, i;
					return this.unsetClass("placeholder"), t = "", e = this.getOptions().defaultValue, i = this.getValue(), t = this.editingMode ? i || "" : i || e || "", n = this.getEditableDomElement(), n.text(""), n.append(document.createTextNode(t))
				}, e.prototype.validate = function (t) {
					var e, n, i, o, s, a, l;
					o = !0, l = (null != (a = this.getOptions().validate) ? a.rules : void 0) || {};
					for (n in l)
						if (r.call(l, n) && (i = l[n], s = KDInputValidator["rule" + n.capitalize()], s && (e = s(this, t)))) {
							o = !1, this.notify(e, {
								title: e,
								type: "mini",
								cssClass: "error",
								duration: 2500
							});
							break
						}
					return o
				}, e.prototype.notify = function (t, e) {
					var n;
					return this.validationNotifications[t] = n = new i(e), n.on("KDObjectWillBeDestroyed", function (e) {
						return function () {
							return t = n.getOptions().title, delete e.validationNotifications[t]
						}
					}(this))
				}, e.prototype.appendNewline = function () {
					var t, e, n, i, o, s;
					for (o = window.getSelection(), t = o.baseNode.length === o.focusOffset ? 1 : 0, i = o.getRangeAt(0), e = s = 0; t >= 0 ? t >= s : s >= t; e = t >= 0 ? ++s : --s) i.insertNode(n = document.createElement("br"));
					return this.utils.selectEnd(n)
				}, e.prototype.viewAppended = function () {
					return e.__super__.viewAppended.apply(this, arguments), this.editingMode || 0 !== this.getValue().length ? void 0 : this.unsetPlaceholder()
				}, e
			}(o)
		}, {
			"./../../core/view.coffee": 108,
			"./../notifications/notificationview.coffee": 61
		}
	],
	40: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./inputview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), null == t.delimiter && (t.delimiter = ","), null == t.usePadding && (t.usePadding = !0), i = t.defaultValue, null != (null != i ? i.join : void 0) && (t.defaultValue = this.join(i, t)), e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e.prototype.change = function () {
					return this.setValue(this.getValue())
				}, e.prototype.getPadding = function (t) {
					return null == t && (t = this.getOptions()), t.usePadding ? " " : ""
				}, e.prototype.split = function (t, e) {
					return null == e && (e = this.getOptions()), this.utils.splitTrim(t, e.delimiter)
				}, e.prototype.join = function (t, e) {
					return null == e && (e = this.getOptions()), t.join("" + e.delimiter + this.getPadding(e))
				}, e.prototype.getValue = function () {
					return this.split(e.__super__.getValue.apply(this, arguments))
				}, e.prototype.setValue = function (t) {
					return e.__super__.setValue.call(this, null != t.join ? this.join(t) : t)
				}, e
			}(i)
		}, {
			"./inputview.coffee": 46
		}
	],
	41: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./inputview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), t.type || (t.type = "textarea"), t.button || (t.button = null), null == t.showButton && (t.showButton = !1), t.label || (t.label = null), t.placeholder || (t.placeholder = ""), t.callback || (t.callback = null), t.togglerPartials || (t.togglerPartials = ["quick update disabled", "quick update enabled"]), e.__super__.constructor.call(this, t, n), this.setClass("hitenterview"), this.button = null != (i = this.getOptions().button) ? i : null, this.enableEnterKey(), null != t.label && this.setToggler(), this.getOptions().showButton && this.disableEnterKey(), this.on("ValidationPassed", function (t) {
						return function () {
							var e;
							return t.blur(), null != (e = t.getOptions().callback) ? e.call(t, t.getValue()) : void 0
						}
					}(this))
				}
				return s(e, t), e.prototype.enableEnterKey = function () {
					return this.setClass("active"), this.button && this.hideButton(), null != this.inputEnterToggler && this.inputEnterToggler.$().html(this.getOptions().togglerPartials[1]), this.enterKeyEnabled = !0
				}, e.prototype.disableEnterKey = function () {
					return this.unsetClass("active"), this.button && this.showButton(), null != this.inputEnterToggler && this.inputEnterToggler.$().html(this.getOptions().togglerPartials[0]), this.enterKeyEnabled = !1
				}, e.prototype.setToggler = function () {
					var t;
					return t = this.getOptions(), this.inputEnterToggler = new KDCustomHTMLView({
						tagName: "a",
						cssClass: "hitenterview-toggle",
						partial: t.showButton ? t.togglerPartials[0] : t.togglerPartials[1],
						click: this.bound("toggleEnterKey")
					}), this.inputLabel.addSubView(this.inputEnterToggler)
				}, e.prototype.hideButton = function () {
					return this.button.hide()
				}, e.prototype.showButton = function () {
					return this.button.show()
				}, e.prototype.toggleEnterKey = function () {
					return this.enterKeyEnabled ? this.disableEnterKey() : this.enableEnterKey()
				}, e.prototype.keyDown = function (t) {
					return 13 === t.which && (t.altKey || t.shiftKey) !== !0 && this.enterKeyEnabled ? (t.preventDefault(), this.emit("EnterPerformed"), this.validate(), !1) : 27 === t.which ? this.emit("EscapePerformed") : void 0
				}, e
			}(i)
		}, {
			"./inputview.coffee": 46
		}
	],
	42: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./inputradiogroup.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.checkboxes || (t.checkboxes = []), t.radios || (t.radios = t.checkboxes), t.type || (t.type = "checkbox"), e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e.prototype.click = function (t) {
					return "LABEL" !== t.target.tagName ? this.setValue(this.getValue()) : void 0
				}, e.prototype.getValue = function () {
					var t, e, n, i, o;
					for (e = [], o = this.getDomElement().find("input:checked"), n = 0, i = o.length; i > n; n++) t = o[n], e.push($(t).val());
					return e
				}, e.prototype.setValue = function (t) {
					var e, n, i, o;
					if (this.$("input").prop("checked", !1), this.$(".kd-radio-holder").removeClass("active"), t instanceof Array) {
						for (o = [], n = 0, i = t.length; i > n; n++) e = t[n], o.push(this._setValue(e));
						return o
					}
					return this._setValue(t)
				}, e.prototype._setValue = function (t) {
					return this.$("input[value='" + t + "']").prop("checked", !0), t ? this.$(".kd-radio-holder.role-" + t).addClass("active") : void 0
				}, e
			}(i)
		}, {
			"./inputradiogroup.coffee": 43
		}
	],
	43: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./inputview.coffee"), e.exports = n = function (t) {
				function e(t) {
					t.type || (t.type = "radio"), null == t.hideRadios && (t.hideRadios = !1), null == t.showIcons && (t.showIcons = !1), t.cssClassPrefix || (t.cssClassPrefix = ""), e.__super__.constructor.call(this, t), this._currentValue = this.getOption("defaultValue")
				}
				return s(e, t), e.prototype.setDomElement = function () {
					var t, e, n, i, o, s, r, a, l, u;
					for (o = this.getOptions(), this.domElement = $("<fieldset class='" + this.utils.curry("radiogroup kdinput", o.cssClass) + "'></fieldset>"), u = o.radios, n = a = 0, l = u.length; l > a; n = ++a) r = u[n], null == r.visible && (r.visible = !0), r.callback || (r.callback = function () {}), t = r.disabled ? "disabled " : "", e = $("<div/>", {
						"class": "kd-" + this.getType() + "-holder " + t + o.cssClassPrefix + this.utils.slugify(r.value)
					}), s = $("<input/>", {
						type: this.getType(),
						name: o.name,
						value: r.value,
						"class": "no-kdinput" + (o.hideRadios ? " hidden" : ""),
						id: "" + this.getId() + "_" + this.getType() + "_" + n,
						change: r.callback
					}), r.disabled && s[0].setAttribute("disabled", "disabled"), i = $("<label/>", {
						"for": "" + this.getId() + "_" + this.getType() + "_" + n,
						html: r.title,
						"class": o.cssClassPrefix + this.utils.slugify(r.value)
					}), e.append(s), o.showIcons && e.append($("<span/>", {
						"class": "icon"
					})), e.append(i), this.domElement.append(e), r.visible || e.hide();
					return this.domElement
				}, e.prototype.click = function (t) {
					var e;
					return e = $(t.target).closest(".kd-" + this.getType() + "-holder").find("input"), e.length < 1 ? void 0 : "disabled" === e[0].getAttribute("disabled") ? !1 : this.setValue(e[0].getAttribute("value"))
				}, e.prototype.setDefaultValue = function (t) {
					return this.inputDefaultValue = t, this.setValue(t, !0)
				}, e.prototype.getValue = function () {
					return this.$("input[checked=checked]").val()
				}, e.prototype.setValue = function (t, e) {
					var n;
					return null == e && (e = !1), this.$("input").attr("checked", !1), n = this.$("input[value='" + t + "']"), n.attr("checked", "checked"), n.prop("checked", !0), null == t || t === this._currentValue || e || this.emit("change", t), this._currentValue = t, this.$(".kd-radio-holder").removeClass("active"), null != t && "" !== t ? this.$(".kd-radio-holder." + t).addClass("active") : void 0
				}, e.prototype.getInputElements = function () {
					return this.getDomElement().find("input")
				}, e
			}(i)
		}, {
			"./inputview.coffee": 46
		}
	],
	44: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./inputview.coffee"), e.exports = n = function (t) {
				function e(t) {
					null == t && (t = {}), t.type = "switch", e.__super__.constructor.call(this, t), this.setPartial("<input class='checkbox hidden no-kdinput' type='checkbox' name='" + this.getName() + "'/>")
				}
				return s(e, t), e.prototype.setDomElement = function () {
					return this.domElement = $("<span class='kdinput kdinputswitch off'></span>")
				}, e.prototype.setDefaultValue = function (t) {
					switch (t) {
					case !0:
					case "on":
					case "true":
					case "yes":
					case 1:
						return this._setDefaultValue(!0);
					default:
						return this._setDefaultValue(!1)
					}
				}, e.prototype.getDefaultValue = function () {
					return this.inputDefaultValue
				}, e.prototype.getValue = function () {
					return this.getDomElement().find("input").eq(0).is(":checked")
				}, e.prototype.setValue = function (t) {
					switch (t) {
					case !0:
						return this.switchAnimateOn();
					case !1:
						return this.switchAnimateOff()
					}
				}, e.prototype._setDefaultValue = function (t) {
					return setTimeout(function (e) {
						return function () {
							return t = !!t, t ? (e.inputDefaultValue = !0, e.getDomElement().find("input").eq(0).attr("checked", !0), e.getDomElement().removeClass("off").addClass("on")) : (e.inputDefaultValue = !1, e.getDomElement().find("input").eq(0).attr("checked", !1), e.getDomElement().removeClass("on").addClass("off"))
						}
					}(this), 0)
				}, e.prototype.switchAnimateOff = function () {
					var t, e;
					if (this.getValue()) return t = 0, e = setInterval(function (n) {
						return function () {
							return n.getDomElement().css("background-position", "left -" + 20 * t + "px"), 6 === t && (clearInterval(e), n.getDomElement().find("input").eq(0).attr("checked", !1), n.getDomElement().removeClass("on").addClass("off"), n.switchStateChanged()), t++
						}
					}(this), 20)
				}, e.prototype.switchAnimateOn = function () {
					var t, e;
					if (!this.getValue()) return t = 6, e = setInterval(function (n) {
						return function () {
							return n.getDomElement().css("background-position", "left -" + 20 * t + "px"), 0 === t && (clearInterval(e), n.getDomElement().find("input").eq(0).attr("checked", !0), n.getDomElement().removeClass("off").addClass("on"), n.switchStateChanged()), t--
						}
					}(this), 20)
				}, e.prototype.switchStateChanged = function () {
					return null != this.getCallback() ? this.getCallback().call(this, this.getValue()) : void 0
				}, e.prototype.mouseDown = function () {
					switch (this.getValue()) {
					case !0:
						this.setValue(!1);
						break;
					case !1:
						this.setValue(!0)
					}
					return !1
				}, e
			}(i)
		}, {
			"./inputview.coffee": 46
		}
	],
	45: [
		function (t, e) {
			var n;
			e.exports = n = function () {
				function t() {}
				return t.ruleRequired = function (t, e) {
					var n, i, o, s;
					if (9 !== (null != e ? e.which : void 0)) return o = $.trim(t.getValue()), i = t.getOptions().validate, n = o.length > 0, n ? null : (null != (s = i.messages) ? s.required : void 0) || "Field is required"
				}, t.ruleEmail = function (t, e) {
					var n, i, o, s;
					if (9 !== (null != e ? e.which : void 0)) return o = $.trim(t.getValue()), i = t.getOptions().validate, n = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(o), n ? null : (null != (s = i.messages) ? s.email : void 0) || "Please enter a valid email address"
				}, t.ruleMinLength = function (t, e) {
					var n, i, o, s, r;
					if (9 !== (null != e ? e.which : void 0)) return s = $.trim(t.getValue()), o = t.getOptions().validate, i = o.rules.minLength, n = s.length >= i, n ? null : (null != (r = o.messages) ? r.minLength : void 0) || "Please enter a value that has " + i + " characters or more"
				}, t.ruleMaxLength = function (t, e) {
					var n, i, o, s, r;
					if (9 !== (null != e ? e.which : void 0)) return s = $.trim(t.getValue()), o = t.getOptions().validate, i = o.rules.maxLength, n = s.length <= i, n ? null : (null != (r = o.messages) ? r.maxLength : void 0) || "Please enter a value that has " + i + " characters or less"
				}, t.ruleRangeLength = function (t, e) {
					var n, i, o, s, r;
					if (9 !== (null != e ? e.which : void 0)) return s = $.trim(t.getValue()), o = t.getOptions().validate, i = o.rules.rangeLength, n = s.length <= i[1] && s.length >= i[0], n ? null : (null != (r = o.messages) ? r.rangeLength : void 0) || "Please enter a value that has more than " + i[0] + " and less than " + i[1] + " characters"
				}, t.ruleMatch = function (t, e) {
					var n, i, o, s, r, a;
					if (9 !== (null != e ? e.which : void 0)) return r = $.trim(t.getValue()), s = t.getOptions().validate, i = s.rules.match, o = $.trim(i.getValue()), n = r === o, n ? null : (null != (a = s.messages) ? a.match : void 0) || "Values do not match"
				}, t.ruleCreditCard = function (t, e) {
					var n, i, o, s, r;
					if (9 !== (null != e ? e.which : void 0)) return s = $.trim(t.getValue().replace(/-|\s/g, "")), i = t.getOptions().validate, n = /(^4[0-9]{12}(?:[0-9]{3})?$)|(^5[1-5][0-9]{14}$)|(^3[47][0-9]{13}$)|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/.test(s), n ? (o = /^4[0-9]{12}(?:[0-9]{3})?$/.test(s) ? "Visa" : /^5[1-5][0-9]{14}$/.test(s) ? "MasterCard" : /^3[47][0-9]{13}$/.test(s) ? "Amex" : /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(s) ? "Diners" : /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(s) ? "Discover" : /^(?:2131|1800|35\d{3})\d{11}$/.test(s) ? "JCB" : !1, t.emit("CreditCardTypeIdentified", o), null) : (null != (r = i.messages) ? r.creditCard : void 0) || "Please enter a valid credit card number"
				}, t.ruleJSON = function (t, e) {
					var n, i, o, s, r;
					if (9 !== (null != e ? e.which : void 0)) {
						s = $.trim(t.getValue()), o = t.getOptions().validate, n = !0;
						try {
							s && JSON.parse(s)
						} catch (a) {
							i = a, error(i, n), n = !1
						}
						return n ? null : (null != (r = o.messages) ? r.JSON : void 0) || "a valid JSON is required"
					}
				}, t.ruleRegExp = function (t, e) {
					var n, i, o, s, r;
					if (9 !== (null != e ? e.which : void 0)) return s = $.trim(t.getValue()), o = t.getOptions().validate, i = o.rules.regExp, n = i.test(s), n ? null : (null != (r = o.messages) ? r.regExp : void 0) || "Validation failed"
				}, t.ruleUri = function (t, e) {
					var n, i, o, s, r;
					if (9 !== (null != e ? e.which : void 0)) return i = /^([a-z0-9+.-]+):(?:\/\/(?:((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*)@)?((?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*)(?::(\d*))?(\/(?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*)?|(\/?(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*)?)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:)?$/i, s = $.trim(t.getValue()), o = t.getOptions().validate, n = i.test(s), n ? null : (null != (r = o.messages) ? r.uri : void 0) || "Not a valid URI"
				}, t
			}()
		}, {}
	],
	46: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				a = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			o = t("./../../core/view.coffee"), n = t("./inputvalidator.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), t.type || (t.type = "text"), t.name || (t.name = ""), t.label || (t.label = null), t.cssClass || (t.cssClass = ""), t.callback || (t.callback = null), null == t.defaultValue && (t.defaultValue = ""), t.placeholder || (t.placeholder = ""), null == t.disabled && (t.disabled = !1), t.selectOptions || (t.selectOptions = null), t.validate || (t.validate = null), null == t.decorateValidation && (t.decorateValidation = !0), t.hint || (t.hint = null), null == t.autogrow && (t.autogrow = !1), null == t.enableTabKey && (t.enableTabKey = !1), t.bind || (t.bind = ""), t.forceCase || (t.forceCase = null), t.bind += " blur change focus", this.setType(t.type), e.__super__.constructor.call(this, t, n), i = this.getOptions(), this.validationNotifications = {}, this.valid = !0, this.inputCallback = null, this.setName(i.name), this.setLabel(), this.setCallback(), this.setDefaultValue(i.defaultValue), this.setPlaceHolder(i.placeholder), i.disabled && this.makeDisabled(), null != i.selectOptions && "function" != typeof i.selectOptions && this.setSelectOptions(i.selectOptions), i.autogrow && this.setAutoGrow(), i.enableTabKey && this.enableTabKey(), i.forceCase && this.setCase(i.forceCase), i.required && ! function (t) {
						return null == t.rules && (t.rules = {}), null == t.messages && (t.messages = {}), t.rules.required = !0, t.messages.required = i.required
					}(null != i.validate ? i.validate : i.validate = {}), i.validate && this.setValidation(i.validate), this.bindValidationEvents(), "select" === i.type && i.selectOptions && this.on("viewAppended", function (e) {
						return function () {
							var n;
							if (t = e.getOptions(), "function" == typeof t.selectOptions) return n = e.bound("setSelectOptions"), t.selectOptions.call(e, n);
							if (t.selectOptions.length) {
								if (!t.defaultValue) return e.setValue(t.selectOptions[0].value)
							} else if (!t.defaultValue) return e.setValue(t.selectOptions[Object.keys(t.selectOptions)[0]][0].value)
						}
					}(this)), t.autogrow && this.once("focus", function (t) {
						return function () {
							return t.initialHeight ? void 0 : t.initialHeight = t.$().height()
						}
					}(this))
				}
				return r(e, t), e.prototype.setDomElement = function (t) {
					var e;
					return null == t && (t = ""), e = "name='" + this.options.name + "'", this.domElement = function () {
						switch (this.getType()) {
						case "text":
							return $("<input " + e + " type='text' class='kdinput text " + t + "'/>");
						case "password":
							return $("<input " + e + " type='password' class='kdinput text " + t + "'/>");
						case "hidden":
							return $("<input " + e + " type='hidden' class='kdinput hidden " + t + "'/>");
						case "checkbox":
							return $("<input " + e + " type='checkbox' class='kdinput checkbox " + t + "'/>");
						case "textarea":
							return $("<textarea " + e + " class='kdinput text " + t + "'></textarea>");
						case "select":
							return $("<select " + e + " class='kdinput select " + t + "'/>");
						case "range":
							return $("<input " + e + " type='range' class='kdinput range " + t + "'/>");
						default:
							return $("<input " + e + " type='" + this.getType() + "' class='kdinput " + this.getType() + " " + t + "'/>")
						}
					}.call(this)
				}, e.prototype.bindValidationEvents = function () {
					return this.on("ValidationError", this.bound("giveValidationFeedback")), this.on("ValidationPassed", this.bound("giveValidationFeedback")), this.on("focus", this.bound("clearValidationFeedback"))
				}, e.prototype.setLabel = function (t) {
					return null == t && (t = this.getOptions().label), t ? (this.inputLabel = t, this.inputLabel.$()[0].setAttribute("for", this.getName()), this.inputLabel.$().bind("click", function (t) {
						return function () {
							return t.$().trigger("focus"), t.$().trigger("click")
						}
					}(this))) : void 0
				}, e.prototype.getLabel = function () {
					return this.inputLabel
				}, e.prototype.setCallback = function () {
					return this.inputCallback = this.getOptions().callback
				}, e.prototype.getCallback = function () {
					return this.inputCallback
				}, e.prototype.setType = function (t) {
					this.inputType = null != t ? t : "text"
				}, e.prototype.getType = function () {
					return this.inputType
				}, e.prototype.setName = function (t) {
					this.inputName = t
				}, e.prototype.getName = function () {
					return this.inputName
				}, e.prototype.setFocus = function () {
					return KD.getSingleton("windowController").setKeyView(this), this.$().trigger("focus")
				}, e.prototype.setBlur = function () {
					return KD.getSingleton("windowController").setKeyView(null), this.$().trigger("blur")
				}, e.prototype.setSelectOptions = function (t) {
					var e, n, i, o, r, a, l, u;
					if (t.length)
						if (t.length)
							for (a = 0, u = t.length; u > a; a++) i = t[a], this.$().append("<option value='" + i.value + "'>" + i.title + "</option>");
						else warn("no valid options specified for the input:", this);
					else
						for (n in t)
							if (s.call(t, n))
								for (o = t[n], e = $("<optgroup label='" + n + "'/>"), this.$().append(e), r = 0, l = o.length; l > r; r++) i = o[r], e.append("<option value='" + i.value + "'>" + i.title + "</option>"); return this.$().val(this.getDefaultValue())
				}, e.prototype.setDefaultValue = function (t) {
					return null != t || "" === t ? (e.prototype.setValue.call(this, t), this.inputDefaultValue = t) : void 0
				}, e.prototype.getDefaultValue = function () {
					return this.inputDefaultValue
				}, e.prototype.setPlaceHolder = function (t) {
					return this.$().is("input") || this.$().is("textarea") ? (this.$().attr("placeholder", t), this.options.placeholder = t) : void 0
				}, e.prototype.makeDisabled = function () {
					return this.getDomElement().attr("disabled", "disabled")
				}, e.prototype.makeEnabled = function () {
					return this.getDomElement().removeAttr("disabled")
				}, e.prototype.getValue = function () {
					var t, e;
					return "checkbox" === this.getOption("type") ? e = this.$().is(":checked") : (e = this.getDomElement().val(), t = this.getOptions().forceCase, t && (e = "uppercase" === t.toLowerCase() ? e.toUpperCase() : e.toLowerCase())), e
				}, e.prototype.setValue = function (t) {
					var e, n, i;
					return e = this.$(), n = e[0], "checkbox" === (i = this.getOption("type")) || "radio" === i ? t ? n.setAttribute("checked", "checked") : n.removeAttribute("checked") : e.val(t)
				}, e.prototype.setCase = function () {
					var t;
					return t = function (t) {
						return function () {
							var e, n, i, o, s;
							return e = t.getDomElement(), n = e[0], s = t.getValue(), s !== e.val() ? (o = n.selectionStart, i = n.selectionEnd, t.setValue(s), n.setSelectionRange ? n.setSelectionRange(o, i) : void 0) : void 0
						}
					}(this), this.on("keyup", t), this.on("blur", t)
				}, e.prototype.unsetValidation = function () {
					return this.setValidation({})
				}, e.prototype.setValidation = function (t) {
					var e, n, i, o, r, l;
					this.valid = !1, this.currentRuleset = t, this.validationCallbacks || (this.validationCallbacks = {}), this.createRuleChain(t), l = this.validationCallbacks;
					for (i in l)
						if (s.call(l, i))
							for (n = l[i], o = 0, r = n.length; r > o; o++) e = n[o], this.off(i, e);
					return this.ruleChain.forEach(function (e) {
						return function (n) {
							var i, o, s;
							return o = t.events && t.events[n] ? t.events[n] : t.event ? t.event : void 0, o ? ((s = e.validationCallbacks)[o] || (s[o] = []), e.validationCallbacks[o].push(i = function (t) {
								return a.call(e.ruleChain, n) >= 0 ? e.validate(n, t) : void 0
							}), e.on(o, i)) : void 0
						}
					}(this))
				}, e.prototype.validate = function (t, e) {
					var i, o, r, a, l, u;
					null == e && (e = {}), this.ruleChain || (this.ruleChain = []), this.validationResults || (this.validationResults = {}), l = t ? [t] : this.ruleChain, a = this.currentRuleset || this.getOptions().validate, this.ruleChain.length > 0 ? l.forEach(function (t) {
						return function (i) {
							var o;
							return null != n["rule" + i.capitalize()] ? (o = n["rule" + i.capitalize()](t, e), t.setValidationResult(i, o)) : "function" == typeof a.rules[i] ? a.rules[i](t, e) : void 0
						}
					}(this)) : this.valid = !0, i = !0, u = this.validationResults;
					for (r in u) s.call(u, r) && (o = u[r], o && (i = !1));
					return this.valid = i ? !0 : !1, this.valid && this.emit("ValidationPassed"), this.emit("ValidationResult", this.valid), this.valid
				}, e.prototype.createRuleChain = function (t) {
					var e, n, i, o, r, a, l;
					for (n = t.rules, this.validationResults || (this.validationResults = {}), this.ruleChain = "object" == typeof n ? function () {
						var t;
						t = [];
						for (e in n) s.call(n, e) && (i = n[e], t.push(e));
						return t
					}() : [n], a = this.ruleChain, l = [], o = 0, r = a.length; r > o; o++) e = a[o], l.push(this.validationResults[e] = null);
					return l
				}, e.prototype.setValidationResult = function (t, e, n) {
					return null == n && (n = !0), e ? (this.validationResults[t] = e, this.getOptions().validate.notifications && n && this.showValidationError(e), this.emit("ValidationError", e), this.valid = !1) : (this.validationResults[t] = null, this.valid = !_.values(this.validationResults).map(function (t) {
						return Boolean(t)
					}).indexOf(!0) > -1)
				}, e.prototype.showValidationError = function (t) {
					var e, n, i, o, s, r;
					return null != (s = this.validationNotifications[t]) && s.destroy(), r = this.getOption("validate"), e = r.container, i = r.notifications, "tooltip" === (null != i ? i.type : void 0) ? (this.tooltip && (o = "- " + t + "<br>" + this.tooltip.getOption("title")), this.unsetTooltip(), i = {
						cssClass: i.cssClass || "input-validation",
						delegate: i.delegate || this,
						title: i.title || o || t,
						placement: i.placement || "right",
						direction: i.direction || "left",
						forcePosition: !0
					}, this.validationNotifications[t] = n = this.setTooltip(i), n.show()) : i && (this.validationNotifications[t] = n = new KDNotificationView({
						container: e,
						title: t,
						type: "growl",
						cssClass: "mini",
						duration: 2500
					})), n.on("KDObjectWillBeDestroyed", function (e) {
						return function () {
							return t = n.getOptions().title, delete e.validationNotifications[t]
						}
					}(this))
				}, e.prototype.clearValidationFeedback = function () {
					return this.unsetClass("validation-error validation-passed"), this.emit("ValidationFeedbackCleared")
				}, e.prototype.giveValidationFeedback = function (t) {
					return this.getOption("decorateValidation") ? t ? this.setClass("validation-error") : (this.setClass("validation-passed"), this.unsetClass("validation-error")) : void 0
				}, e.prototype.setCaretPosition = function (t) {
					return this.selectRange(t, t)
				}, e.prototype.getCaretPosition = function () {
					var t, e, n, i;
					return t = this.$()[0], t.selectionStart ? t.selectionStart : document.selection ? (t.focus(), (e = document.selection.createRange()) ? (i = t.createTextRange(), n = i.duplicate(), i.moveToBookmark(e.getBookmark()), n.setEndPoint("EndToStart", i), n.text.length) : 0) : 0
				}, e.prototype.selectAll = function () {
					return this.getDomElement().select()
				}, e.prototype.selectRange = function (t, e) {
					var n, i;
					return n = this.$()[0], n.setSelectionRange ? (n.focus(), n.setSelectionRange(t, e)) : n.createTextRange ? (i = n.createTextRange(), i.collapse(!0), i.moveEnd("character", e), i.moveStart("character", t), i.select()) : void 0
				}, e.prototype.setAutoGrow = function () {
					var t;
					return t = this.$(), t.css("overflow", "hidden"), this.setClass("autogrow"), this._clone = $("<div/>", {
						"class": "invisible"
					}), this.on("focus", function (e) {
						return function () {
							return e._clone.appendTo("body"), e._clone.css({
								height: "auto",
								zIndex: 1e5,
								width: t.css("width"),
								boxSizing: t.css("box-sizing"),
								borderTop: t.css("border-top"),
								borderRight: t.css("border-right"),
								borderBottom: t.css("border-bottom"),
								borderLeft: t.css("border-left"),
								minHeight: t.css("minHeight"),
								maxHeight: t.css("maxHeight"),
								paddingTop: t.css("padding-top"),
								paddingRight: t.css("padding-right"),
								paddingBottom: t.css("padding-bottom"),
								paddingLeft: t.css("padding-left"),
								wordBreak: t.css("wordBreak"),
								fontSize: t.css("fontSize"),
								fontWeight: t.css("fontWeight"),
								lineHeight: t.css("lineHeight"),
								whiteSpace: "pre-line"
							})
						}
					}(this)), this.on("blur", function (t) {
						return function () {
							return t._clone.detach(), t.$()[0].style.height = "none"
						}
					}(this)), this.on("keyup", function (t) {
						return function () {
							return t.resize()
						}
					}(this))
				}, e.prototype.resize = function () {
					var t, e, n;
					if (this._clone) return document.body.contains(this._clone[0]) || this._clone.appendTo("body"), this._clone.html(Encoder.XSSEncode(this.getValue())), this._clone.append(document.createElement("br")), e = this._clone.height(), "border-box" === this.$().css("boxSizing") && (n = parseInt(this._clone.css("paddingTop"), 10) + parseInt(this._clone.css("paddingBottom"), 10), t = parseInt(this._clone.css("borderTopWidth"), 10) + parseInt(this._clone.css("borderBottomWidth"), 10), e = e + t + n), this.setHeight(this.initialHeight ? Math.max(this.initialHeight, e) : e)
				}, e.prototype.enableTabKey = function () {
					return this.inputTabKeyEnabled = !0
				}, e.prototype.disableTabKey = function () {
					return this.inputTabKeyEnabled = !1
				}, e.prototype.change = function () {}, e.prototype.keyUp = function () {
					return !0
				}, e.prototype.keyDown = function (t) {
					return this.inputTabKeyEnabled && this.checkTabKey(t), !0
				}, e.prototype.focus = function () {
					return this.setKeyView(), !0
				}, e.prototype.blur = function () {
					return KD.getSingleton("windowController").revertKeyView(this), !0
				}, e.prototype.mouseDown = function () {
					return this.setFocus(), !1
				}, e.prototype.checkTabKey = function (t) {
					var e, n, i, o, s, r, a, l;
					return a = "  ", l = a.length, r = t.target, s = r.selectionStart, i = r.selectionEnd, 9 === t.which ? (t.preventDefault(), s !== i && -1 !== r.value.slice(s, i).indexOf("n") ? (n = r.value.slice(0, s), o = r.value.slice(s, i).replace(/n/g, "n" + a), e = r.value.slice(i, r.value.length), r.value = n.concat(a).concat(o).concat(e), r.selectionStart = s + a.length, r.selectionEnd = i + a.length) : (r.value = r.value.slice(0, s).concat(a).concat(r.value.slice(s, r.value.length)), s === i ? r.selectionStart = r.selectionEnd = s + a.length : (r.selectionStart = s + a.length, r.selectionEnd = i + a.length))) : 8 === t.which && r.value.slice(s - l, s) === a ? (t.preventDefault(), r.value = r.value.slice(0, s - l).concat(r.value.slice(s, r.value.length)), r.selectionStart = r.selectionEnd = s - a.length) : 46 === t.which && r.value.slice(i, i + l) === a ? (t.preventDefault(), r.value = r.value.slice(0, s).concat(r.value.slice(s + l, r.value.length)), r.selectionStart = r.selectionEnd = s) : 37 === t.which && r.value.slice(s - l, s) === a ? (t.preventDefault(), r.selectionStart = r.selectionEnd = s - l) : 39 === t.which && r.value.slice(s, s + l) === a ? (t.preventDefault(), r.selectionStart = r.selectionEnd = s + l) : void 0
				}, e
			}(o)
		}, {
			"./../../core/view.coffee": 108,
			"./inputvalidator.coffee": 45
		}
	],
	47: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t) {
					null != (null != t ? t.title : void 0) && this.setTitle(t.title), e.__super__.constructor.call(this, t)
				}
				return s(e, t), e.prototype.setDomElement = function (t) {
					return this.domElement = $("<label class='kdlabel " + t + "'>" + this.getTitle() + "</label>")
				}, e.prototype.setTitle = function (t) {
					return this.labelTitle = t || ""
				}, e.prototype.updateTitle = function (t) {
					return this.setTitle(t), this.$().html(t)
				}, e.prototype.getTitle = function () {
					return this.labelTitle
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	48: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				r = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			n = t("./inputview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == t.disabled && (t.disabled = !1), t.size || (t.size = "small"), t.labels || (t.labels = ["ON", "OFF"]), t.titles || (t.titles = t.labels), null == t.multiple && (t.multiple = !1), t.defaultValue || (t.defaultValue = t.multiple ? t.labels[0] : void 0), !t.multiple && Array.isArray(t.defaultValue) && (t.defaultValue = t.defaultValue[0]), e.__super__.constructor.call(this, t, n), this.setClass(t.size), this.setPartial("<input class='hidden no-kdinput' name='" + this.getName() + "'/>"), this.oldValue = null, t.multiple && (this.currentValue = []), this.setDisabled(t.disabled)
				}
				var n;
				return s(e, t), e.prototype.setDomElement = function (t) {
					var e, n, i, o, s, r, a, l, u, c, p, h;
					for (h = this.getOptions(), u = h.titles, a = h.labels, l = h.name, i = h.defaultValue, this.inputName = l, r = "", o = c = 0, p = a.length; p > c; o = ++c) s = a[o], e = s === i ? " active" : "", n = "multiple-choice-" + s + e, r += "<a href='#' name='" + s + "' class='" + n + "' title='" + (u[o] || "Select " + s) + "'>" + s + "</a>";
					return this.domElement = $("<div class='kdinput on-off multiple-choice " + t + "'>\n  " + r + "\n</div> ")
				}, e.prototype.getDefaultValue = function () {
					return this.getOptions().defaultValue
				}, e.prototype.getValue = function () {
					return this.currentValue
				}, n = function (t, e) {
					return r.call(t.currentValue, e) >= 0 ? (t.$("a[name$='" + e + "']").removeClass("active"), t.currentValue.splice(t.currentValue.indexOf(e), 1)) : (t.$("a[name$='" + e + "']").addClass("active"), t.currentValue.push(e))
				}, e.prototype.setDisabled = function (t) {
					return null == t && (t = !0), this._disabled = t
				}, e.prototype.setValue = function (t, e) {
					var i, o, s, r;
					if (null == e && (e = !0), i = this.getOptions().multiple) {
						if (this.oldValue = null != (r = [
							function () {
								var t, e, n, i;
								for (n = this.currentValue, i = [], t = 0, e = n.length; e > t; t++) o = n[t], i.push(o);
								return i
							}.call(this)
						]) ? r.first : void 0, Array.isArray(t) ? [
							function () {
								var e, i, o;
								for (o = [], e = 0, i = t.length; i > e; e++) s = t[e], o.push(n(this, s));
								return o
							}.call(this)
						] : n(this, t), e) return this.switchStateChanged()
					} else if (this.$("a").removeClass("active"), this.$("a[name='" + t + "']").addClass("active"), this.oldValue = this.currentValue, this.currentValue = t, this.currentValue !== this.oldValue && e) return this.switchStateChanged()
				}, e.prototype.switchStateChanged = function () {
					return this._disabled ? void 0 : null != this.getCallback() ? this.getCallback().call(this, this.getValue()) : void 0
				}, e.prototype.fallBackToOldState = function () {
					var t;
					return t = this.getOptions().multiple, t && (this.currentValue = [], this.$("a").removeClass("active")), this.setValue(this.oldValue, !1)
				}, e.prototype.mouseDown = function (t) {
					return this._disabled ? void 0 : $(t.target).is("a") ? this.setValue(t.target.name) : void 0
				}, e
			}(n)
		}, {
			"./inputview.coffee": 46
		}
	],
	49: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./inputview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.type = "switch", t.title || (t.title = ""), t.size || (t.size = "small"), t.labels || (t.labels = ["ON", "OFF"]), null == t.defaultValue && (t.defaultValue = !1), e.__super__.constructor.call(this, t, n), this.setClass(t.size), this.setPartial("<input class='checkbox hidden no-kdinput' type='checkbox' name='" + this.getName() + "'/>"), this.setDefaultValue(t.defaultValue)
				}
				return s(e, t), e.prototype.setDomElement = function (t) {
					var e, n, i, o;
					return o = this.getOptions(), i = o.title, e = o.labels, n = o.name, "" !== i && (i = "<span>" + i + "</span>"), this.inputName = n, this.domElement = $("<div class='kdinput on-off off " + t + "'>\n  " + i + "\n  <a href='#' class='on' title='turn on'>" + e[0] + "</a><a href='#' class='off' title='turn off'>" + e[1] + "</a>\n</div> ")
				}, e.prototype.getValue = function () {
					return "checked" === this.$("input").attr("checked")
				}, e.prototype.setValue = function (t, e) {
					switch (null == e && (e = !0), t) {
					case !0:
						return this.setOn(e);
					case !1:
						return this.setOff(e)
					}
				}, e.prototype.setDefaultValue = function (t) {
					switch (t) {
					case !0:
					case "on":
					case "true":
					case "yes":
					case 1:
						return this.setValue(!0, !1);
					default:
						return this.setValue(!1, !1)
					}
				}, e.prototype.setOff = function (t) {
					return null == t && (t = !0), this.getValue() || !t ? (this.$("input").attr("checked", !1), this.$("a.on").removeClass("active"), this.$("a.off").addClass("active"), t ? this.switchStateChanged() : void 0) : void 0
				}, e.prototype.setOn = function (t) {
					return null == t && (t = !0), this.getValue() && t ? void 0 : (this.$("input").attr("checked", !0), this.$("a.off").removeClass("active"), this.$("a.on").addClass("active"), t ? this.switchStateChanged() : void 0)
				}, e.prototype.switchStateChanged = function () {
					return this.emit("SwitchStateChanged", this.getValue()), null != this.getCallback() ? this.getCallback().call(this, this.getValue()) : void 0
				}, e.prototype.click = KD.utils.stopDOMEvent, e.prototype.mouseDown = function (t) {
					return $(t.target).is("a.on") ? this.setValue(!0) : $(t.target).is("a.off") ? this.setValue(!1) : void 0
				}, e
			}(n)
		}, {
			"./inputview.coffee": 46
		}
	],
	50: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./inputview.coffee"), e.exports = i = function (t) {
				function e(t) {
					null == t && (t = {}), t.type = "select", e.__super__.constructor.call(this, t)
				}
				return s(e, t), e.prototype.setDomElement = function (t) {
					var e;
					return this.inputName = this.getOption("name"), e = "name='" + this.options.name + "'", this.domElement = $("<div class='kdselectbox " + t + "'>\n  <select " + e + "></select>\n  <span class='title'></span>\n  <span class='arrows'></span>\n</div>\""), this._$select = this.$("select").eq(0), this._$title = this.$("span.title").eq(0), this.domElement
				}, e.prototype.bindEvents = function () {
					return this._$select.bind("blur change focus", function (t) {
						return function (e) {
							var n;
							return "change" === e.type && "function" == typeof (n = t.getCallback()) && n(t.getValue()), t.emit(e.type, e, t.getValue()), t.handleEvent(e)
						}
					}(this)), e.__super__.bindEvents.apply(this, arguments)
				}, e.prototype.setDefaultValue = function (t) {
					return "" !== t && this.getDomElement().val(t), this._$select.val(t), this._$title.text(this._$select.find('option[value="' + t + '"]').text()), this.inputDefaultValue = t
				}, e.prototype.getDefaultValue = function () {
					return this.inputDefaultValue
				}, e.prototype.getValue = function () {
					return this._$select.val()
				}, e.prototype.setValue = function (t) {
					return this._$select.val(t), this.change()
				}, e.prototype.makeDisabled = function () {
					return this.setClass("disabled"), this._$select.attr("disabled", "disabled")
				}, e.prototype.makeEnabled = function () {
					return this.unsetClass("disabled"), this._$select.removeAttr("disabled")
				}, e.prototype.setSelectOptions = function (t) {
					var e, n, i, s, r, a, l, u, c, p;
					if (n = null, t.length)
						if (t.length)
							for (u = 0, p = t.length; p > u; u++) s = t[u], this._$select.append("<option value='" + s.value + "'>" + s.title + "</option>"), n || (n = s);
						else warn("no valid options specified for the input:", this);
					else
						for (i in t)
							if (o.call(t, i))
								for (r = t[i], e = $("<optgroup label='" + i + "'/>"), this._$select.append(e), l = 0, c = r.length; c > l; l++) s = r[l], n || (n = s), e.append("<option value='" + s.value + "'>" + s.title + "</option>"); return a = this.getDefaultValue() || (null != n ? n.value : void 0) || "", this._$select.val(a + ""), this._$title.text(this._$select.find('option[value="' + a + '"]').text())
				}, e.prototype.removeSelectOptions = function () {
					return this._$select.find("optgroup").remove(), this._$select.find("option").remove()
				}, e.prototype.change = function () {
					return this._$title.text(this._$select.find('option[value="' + this.getValue() + '"]').text())
				}, e.prototype.focus = function () {
					return this.setClass("focus")
				}, e.prototype.blur = function () {
					return this.unsetClass("focus")
				}, e
			}(n)
		}, {
			"./inputview.coffee": 46
		}
	],
	51: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./contenteditableview.coffee"), i = t("./../contextmenu/contextmenu.coffee"), e.exports = o = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("kdtokenizedinputview", t.cssClass), t.bind = KD.utils.curry("keyup", t.bind), t.rules || (t.rules = {}), t.layer || (t.layer = {}), e.__super__.constructor.call(this, t, n), this.tokenViews = {}
				}
				return r(e, t), e.prototype.getValue = function (t) {
					var e, n, i, o, s, r, a;
					for (null == t && (t = {}), i = "", r = this.getEditableElement().childNodes, o = 0, s = r.length; s > o; o++) e = r[o], "div" === (null != (a = e.tagName) ? a.toLowerCase() : void 0) && (i += "\n"), n = this.getValueOfNode(e), "\n" !== n && (i += n);
					return i === Encoder.htmlDecode(this.getOptions().placeholder) ? "" : i
				}, e.prototype.getValueOfNode = function (t) {
					var e;
					switch (e = "", t.nodeType) {
					case Node.TEXT_NODE:
						"" !== t.textContent && (e += t.textContent);
						break;
					case Node.ELEMENT_NODE:
						e += this.getValueOfElement(t)
					}
					return e
				}, e.prototype.getValueOfElement = function (t) {
					var e, n, i, o, s, r, a, l;
					if (n = null != (a = t.dataset) ? a.key : void 0, n && (o = this.getValueOfTokenElement(n)), o) return o;
					switch (i = t.tagName.toLowerCase()) {
					case "br":
						return "\n";
					default:
						for (o = "", l = t.childNodes, s = 0, r = l.length; r > s; s++) e = l[s], o += this.getValueOfNode(e);
						return o || ""
					}
				}, e.prototype.getValueOfTokenElement = function (t) {
					var e;
					return e = this.getTokenView(t), t && e ? e.encodeValue() : void 0
				}, e.prototype.getTokens = function () {
					return this.findTokensInElement(this.getEditableElement())
				}, e.prototype.findTokensInElement = function (t) {
					var e, n, i, o, s, r, a, l, u, c;
					for (o = [], u = t.childNodes, a = 0, l = u.length; l > a; a++) switch (e = u[a], e.nodeType) {
					case Node.ELEMENT_NODE:
						(i = null != (c = e.dataset) ? c.key : void 0) ? (r = this.getTokenView(i), s = r.getOptions().type, n = r.getData(), o.push({
							type: s,
							data: n
						})) : o = o.concat(this.findTokensInElement(e))
					}
					return o
				}, e.prototype.getTokenView = function (t) {
					return this.tokenViews[t]
				}, e.prototype.matchPrefix = function () {
					var t, e, n, i, o, s, r, a, l;
					if (!this.tokenInput && (i = this.utils.getSelectionRange())) {
						if (n = i.commonAncestorContainer, 1 === (null != (r = n.children) ? r.length : void 0)) return n.textContent === n.children[0].textContent;
						s = i.startOffset - 1, t = n.textContent[s], a = this.getOptions().rules, l = [];
						for (e in a) o = a[e], t === o.prefix ? (this.activeRule = o, this.tokenInput = document.createElement("span"), this.tokenInput.textContent = o.prefix, this.utils.replaceRange(n, this.tokenInput, s, s + o.prefix.length), l.push(this.utils.selectText(this.tokenInput, o.prefix.length))) : l.push(void 0);
						return l
					}
				}, e.prototype.matchToken = function () {
					var t, e;
					return this.tokenInput.parentNode ? (this.sanitizeInput(), e = this.tokenInput.textContent.substring(this.activeRule.prefix.length), e.trim() ? (t = this.activeRule.dataSource)(e, this.bound("showMenu")) : 0 !== e.length ? this.cancel() : void 0) : this.cancel()
				}, e.prototype.sanitizeInput = function () {}, e.prototype.showMenu = function (t, e) {
					var n, o;
					return null != (o = this.menu) && o.destroy(), this.blur(), this.tokenInput && e.length ? (n = this.tokenInput.getBoundingClientRect(), t.x = n.left, t.y = n.top + parseInt(window.getComputedStyle(this.tokenInput).lineHeight, 10), this.menu = new i(t, e), this.menu.on("ContextMenuItemReceivedClick", this.bound("menuItemClicked"))) : void 0
				}, e.prototype.hideMenu = function () {
					var t;
					return null != (t = this.menu) && t.destroy(), this.menu = null, this.activeRule = null, this.tokenInput = null
				}, e.prototype.menuItemClicked = function (t, e) {
					return this.addToken(t.data, e), this.hideMenu()
				}, e.prototype.addToken = function (t, e) {
					var n, i, o, s, r, a, l;
					return null == e && (e = this.getOptions().tokenViewClass), l = this.activeRule, a = l.type, i = l.prefix, n = l.pistachio, r = new e({
						type: a,
						prefix: i,
						pistachio: n
					}, t), o = r.getElement(), s = "" + r.getId() + "-" + r.getKey(), this.tokenViews[s] = r, r.setAttributes({
						"data-key": s
					}), this.tokenInput.parentElement.insertBefore(o, this.tokenInput), r.emit("viewAppended"), this.tokenInput.nextSibling.textContent = " ", this.utils.selectText(this.tokenInput.nextSibling, 1), this.tokenInput.remove(), this.emit("TokenAdded", a, t)
				}, e.prototype.keyDown = function (t) {
					switch (t.which) {
					case 9:
					case 13:
					case 27:
					case 38:
					case 40:
						this.menu && (this.menu.treeController.keyEventHappened(t), this.utils.stopDOMEvent(t));
						break;
					default:
						e.__super__.keyDown.call(this, t)
					}
					switch (t.which) {
					case 27:
						if (this.tokenInput) return this.cancel()
					}
				}, e.prototype.keyUp = function (t) {
					switch (e.__super__.keyUp.apply(this, arguments), t.which) {
					case 9:
					case 13:
					case 27:
					case 38:
					case 40:
						break;
					default:
						if (t.altKey || t.ctrlKey || t.metaKey) return;
						return this.activeRule ? this.matchToken() : this.matchPrefix()
					}
				}, e.prototype.cancel = function () {
					var t;
					return this.tokenInput.parentNode && (t = document.createTextNode(this.tokenInput.textContent), this.tokenInput.parentElement.insertBefore(t, this.tokenInput), this.tokenInput.nextSibling.remove(), this.tokenInput.remove(), this.utils.selectEnd(t)), this.hideMenu()
				}, e.prototype.reset = function () {
					var t, e, n, i;
					this.setPlaceholder(), this.blur(), n = this.tokenViews, i = [];
					for (t in n) s.call(n, t) && (e = n[t], e.destroy(), i.push(delete this.tokenViews[t]));
					return i
				}, e.prototype.viewAppended = function () {
					return e.__super__.viewAppended.apply(this, arguments), this.setEditingMode(!0)
				}, e
			}(n)
		}, {
			"./../contextmenu/contextmenu.coffee": 23,
			"./contenteditableview.coffee": 39
		}
	],
	52: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./inputview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					var i;
					t = null != t ? t : {}, t.type = "textarea", t.preview = null != (i = t.preview) ? i : !1, e.__super__.constructor.call(this, t, n), this.setClass("monospace")
				}
				return s(e, t), e.prototype.setWMD = function () {
					var t;
					return t = this.getOptions().preview, this.getDomElement().wmd({
						preview: t
					}), t ? this.getDomElement().after("<h3 class='wmd-preview-title'>Preview:</h3>") : void 0
				}, e
			}(n)
		}, {
			"./inputview.coffee": 46
		}
	],
	53: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i, o;
					null == t && (t = {}), t.type = null != (i = t.type) ? i : "default", t.cssClass = "kdlistitemview kdlistitemview-" + t.type + " " + (null != (o = t.cssClass) ? o : ""), t.bind || (t.bind = "mouseenter mouseleave"), t.childClass || (t.childClass = null), t.childOptions || (t.childOptions = {}), null == t.selectable && (t.selectable = !0), e.__super__.constructor.call(this, t, n), this.content = {}
				}
				return s(e, t), e.prototype.viewAppended = function () {
					var t, e, n;
					return n = this.getOptions(), t = n.childClass, e = n.childOptions, t ? this.addSubView(this.child = new t(e, this.getData())) : this.setPartial(this.partial(this.data))
				}, e.prototype.partial = function () {
					return "<div class='kdlistitemview-default-content'> <p>This is a default partial of <b>KDListItemView</b>, you need to override this partial to have your custom content here.</p> </div>"
				}, e.prototype.dim = function () {
					return this.setClass("dimmed")
				}, e.prototype.undim = function () {
					return this.unsetClass("dimmed")
				}, e.prototype.highlight = function () {
					return this.undim(), this.setClass("selected")
				}, e.prototype.removeHighlight = function () {
					return this.undim(), this.unsetClass("selected")
				}, e.prototype.getItemDataId = function () {
					var t;
					return ("function" == typeof (t = this.getData()).getId ? t.getId() : void 0) || this.getData().id || this.getData()._id
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	54: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.type || (t.type = "default"), null == t.lastToFirst && (t.lastToFirst = !1), t.cssClass = null != t.cssClass ? "kdlistview kdlistview-" + t.type + " " + t.cssClass : "kdlistview kdlistview-" + t.type, this.items || (this.items = []), e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e.prototype.empty = function () {
					var t, e, n, i, o;
					for (o = this.items, t = n = 0, i = o.length; i > n; t = ++n) e = o[t], null != e && e.destroy();
					return this.items = []
				}, e.prototype.keyDown = function (t) {
					return t.stopPropagation(), t.preventDefault(), this.emit("KeyDownOnList", t)
				}, e.prototype.addItem = function (t, e, n) {
					var i, o, s, r, a, l;
					return a = this.getOptions(), i = a.itemChildClass, o = a.itemChildOptions, null != e && "number" != typeof e ? (r = e, e = null) : r = this.getOptions().itemOptions, r = ("function" == typeof this.customizeItemOptions ? this.customizeItemOptions(r, t) : void 0) || r || {}, r.delegate || (r.delegate = this), r.childClass || (r.childClass = i), r.childOptions || (r.childOptions = o), s = new(null != (l = this.getOptions().itemClass) ? l : KDListItemView)(r, t), this.addItemView(s, e, n), s
				}, e.prototype.removeItem = function (t, e, n) {
					var i, o, s, r, a;
					if (null != n) this.emit("ItemIsBeingDestroyed", {
						view: this.items[n],
						index: n
					}), o = this.items.splice(n, 1), o[0].destroy();
					else
						for (a = this.items, i = s = 0, r = a.length; r > s; i = ++s)
							if (o = a[i], t === o || e === o.getData()) return this.emit("ItemIsBeingDestroyed", {
								view: o,
								index: i
							}), this.items.splice(i, 1), void o.destroy()
				}, e.prototype.removeItemByData = function (t) {
					return this.removeItem(null, t)
				}, e.prototype.removeItemByIndex = function (t) {
					return this.removeItem(null, null, t)
				}, e.prototype.destroy = function (t, n, i) {
					var o, s, r, a;
					for (null == t && (t = !1), null == n && (n = "slideUp"), null == i && (i = 100), a = this.items, s = 0, r = a.length; r > s; s++) o = a[s], o.destroy();
					return e.__super__.destroy.call(this)
				}, e.prototype.addItemView = function (t, e, n) {
					var i;
					return this.emit("ItemWasAdded", t, e), null != e ? (i = this.getOptions().lastToFirst ? this.items.length - e - 1 : e, this.items.splice(i, 0, t), this.appendItemAtIndex(t, e, n)) : (this.items[this.getOptions().lastToFirst ? "unshift" : "push"](t), this.appendItem(t, n)), t
				}, e.prototype.appendItem = function (t, e) {
					var n;
					return t.setParent(this), n = this.doIHaveToScroll(), null != e ? (t.$().hide(), this.$()[this.getOptions().lastToFirst ? "prepend" : "append"](t.$()), t.$()[e.type](e.duration, function () {
						return function () {
							return t.emit("introEffectCompleted")
						}
					}(this))) : this.$()[this.getOptions().lastToFirst ? "prepend" : "append"](t.$()), n && this.scrollDown(), this.parentIsInDom && t.emit("viewAppended"), null
				}, e.prototype.appendItemAtIndex = function (t, e, n) {
					var i;
					return t.setParent(this), i = this.getOptions().lastToFirst ? this.items.length - e - 1 : e, null != n ? (t.$().hide(), 0 === e && this.$()[this.getOptions().lastToFirst ? "append" : "prepend"](t.$()), e > 0 && this.items[i - 1].$()[this.getOptions().lastToFirst ? "before" : "after"](t.$()), t.$()[n.type](n.duration, function () {
						return function () {
							return t.emit("introEffectCompleted")
						}
					}(this))) : (0 === e && this.$()[this.getOptions().lastToFirst ? "append" : "prepend"](t.$()), e > 0 && this.items[i - 1].$()[this.getOptions().lastToFirst ? "before" : "after"](t.$())), this.parentIsInDom && t.emit("viewAppended"), null
				}, e.prototype.getItemIndex = function (t) {
					var e, n, i, o, s;
					for (s = this.items, e = i = 0, o = s.length; o > i; e = ++i)
						if (n = s[e], n === t) return e;
					return -1
				}, e.prototype.moveItemToIndex = function (t, e) {
					var n, i, o;
					return n = this.getItemIndex(t), 0 > n ? (warn("Item doesn't exists", t), this.items) : (e = Math.max(0, Math.min(this.items.length - 1, e)), e >= this.items.length - 1 ? (o = this.items.last, o.$().after(t.$())) : (i = e > n ? 1 : 0, o = this.items[e + i], o.$().before(t.$())), this.items.splice(n, 1), this.items.splice(e, 0, t), this.items)
				}, e.prototype.scrollDown = function () {
					return clearTimeout(this._scrollDownTimeout), this._scrollDownTimeout = setTimeout(function (t) {
						return function () {
							var e, n, i;
							return e = t.$().closest(".kdscrollview"), i = e.find("> .kdview"), n = i.height(), e.animate({
								scrollTop: n
							}, {
								duration: 200,
								queue: !1
							})
						}
					}(this), 50)
				}, e.prototype.doIHaveToScroll = function () {
					var t;
					return t = this.$().closest(".kdscrollview"), this.getOptions().autoScroll ? t.length && t[0].scrollHeight <= t.height() ? !0 : this.isScrollAtBottom() : !1
				}, e.prototype.isScrollAtBottom = function () {
					var t, e, n, i, o;
					return e = this.$().closest(".kdscrollview"), o = e.find("> .kdview"), t = e.scrollTop(), i = o.height(), n = e.height(), i - n === t ? !0 : !1
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	55: [
		function (t, e) {
			var n, i, o, s, r, a, l = {}.hasOwnProperty,
				u = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) l.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				c = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			r = t("./../../core/view.coffee"), a = t("./../../core/viewcontroller.coffee"), s = t("./../scrollview/scrollview.coffee"), n = t("./../list/listview.coffee"), o = t("./../loader/loaderview.coffee"), e.exports = i = function (t) {
				function e(t, i) {
					var o, a, l;
					null == t && (t = {}), null == t.wrapper && (t.wrapper = !0), null == t.scrollView && (t.scrollView = !0), null == t.keyNav && (t.keyNav = !1), null == t.multipleSelection && (t.multipleSelection = !1), null == t.selection && (t.selection = !1), null == t.ownScrollBars && (t.ownScrollBars = !1), null == t.startWithLazyLoader && (t.startWithLazyLoader = !1), t.itemChildClass || (t.itemChildClass = null), t.itemChildOptions || (t.itemChildOptions = {}), t.noItemFoundWidget || (t.noItemFoundWidget = null), t.noMoreItemFoundWidget || (t.noMoreItemFoundWidget = null), this.itemsOrdered || (this.itemsOrdered = []), this.itemsIndexed = {}, this.selectedItems = [], this.lazyLoader = null, t.view ? this.setListView(o = t.view) : (l = t.viewOptions || {}, l.lastToFirst || (l.lastToFirst = t.lastToFirst), l.itemClass || (l.itemClass = t.itemClass), l.itemOptions || (l.itemOptions = t.itemOptions), l.itemChildClass || (l.itemChildClass = t.itemChildClass), l.itemChildOptions || (l.itemChildOptions = t.itemChildOptions), this.setListView(o = new n(l))), t.scrollView && (this.scrollView = new s({
						lazyLoadThreshold: t.lazyLoadThreshold,
						ownScrollBars: t.ownScrollBars
					})), t.view = t.wrapper ? new r({
						cssClass: "listview-wrapper"
					}) : o, e.__super__.constructor.call(this, t, i), a = this.getOptions().noItemFoundWidget, o.on("ItemWasAdded", function (t) {
						return function (e, n) {
							return t.registerItem(e, n), a ? t.hideNoItemWidget() : void 0
						}
					}(this)), o.on("ItemIsBeingDestroyed", function (t) {
						return function (e) {
							return t.unregisterItem(e), a ? t.showNoItemWidget() : void 0
						}
					}(this)), t.keyNav && o.on("KeyDownOnList", function (t) {
						return function (e) {
							return t.keyDownPerformed(o, e)
						}
					}(this))
				}
				return u(e, t), e.prototype.loadView = function (t) {
					var e, n;
					return e = this.getOptions(), e.scrollView && (t.addSubView(this.scrollView), this.scrollView.addSubView(this.getListView()), e.startWithLazyLoader && this.showLazyLoader(!1), this.scrollView.on("LazyLoadThresholdReached", this.bound("showLazyLoader"))), e.noItemFoundWidget && this.putNoItemView(), this.instantiateListItems((null != (n = this.getData()) ? n.items : void 0) || []), KD.getSingleton("windowController").on("ReceivedMouseUpElsewhere", function (t) {
						return function (e) {
							return t.mouseUpHappened(e)
						}
					}(this))
				}, e.prototype.instantiateListItems = function (t) {
					var e, n;
					return n = function () {
						var n, i, o;
						for (o = [], n = 0, i = t.length; i > n; n++) e = t[n], o.push(this.getListView().addItem(e));
						return o
					}.call(this), this.emit("AllItemsAddedToList"), n
				}, e.prototype.itemForId = function (t) {
					return this.itemsIndexed[t]
				}, e.prototype.getItemsOrdered = function () {
					return this.itemsOrdered
				}, e.prototype.getItemCount = function () {
					return this.itemsOrdered.length
				}, e.prototype.setListView = function (t) {
					return this.listView = t
				}, e.prototype.getListView = function () {
					return this.listView
				}, e.prototype.forEachItemByIndex = function (t, e) {
					var n;
					return e || (n = [t, e], e = n[0], t = n[1]), Array.isArray(t) || (t = [t]), t.forEach(function (t) {
						return function (n) {
							var i;
							return i = t.itemsIndexed[n], null != i ? e(i) : void 0
						}
					}(this))
				}, e.prototype.putNoItemView = function () {
					var t;
					return t = this.getOptions().noItemFoundWidget, this.getListView().addSubView(this.noItemView = t)
				}, e.prototype.showNoItemWidget = function () {
					var t;
					return 0 === this.itemsOrdered.length && null != (t = this.noItemView) ? t.show() : void 0
				}, e.prototype.hideNoItemWidget = function () {
					var t;
					return null != (t = this.noItemView) ? t.hide() : void 0
				}, e.prototype.showNoMoreItemWidget = function () {
					var t;
					return t = this.getOptions().noMoreItemFoundWidget, t ? this.scrollView.addSubView(t) : void 0
				}, e.prototype.addItem = function (t, e, n) {
					return this.getListView().addItem(t, e, n)
				}, e.prototype.removeItem = function (t, e, n) {
					return this.getListView().removeItem(t, e, n)
				}, e.prototype.registerItem = function (t, e) {
					var n, i;
					return i = this.getOptions(), null != e ? (n = this.getOptions().lastToFirst ? this.getListView().items.length - e - 1 : e, this.itemsOrdered.splice(n, 0, t)) : this.itemsOrdered[this.getOptions().lastToFirst ? "unshift" : "push"](t), null != t.getData() && (this.itemsIndexed[t.getItemDataId()] = t), i.selection && t.on("click", function (e) {
						return function (n) {
							return e.selectItem(t, n)
						}
					}(this)), i.keyNav || i.multipleSelection ? (t.on("mousedown", function (e) {
						return function (n) {
							return e.mouseDownHappenedOnItem(t, n)
						}
					}(this)), t.on("mouseenter", function (e) {
						return function (n) {
							return e.mouseEnterHappenedOnItem(t, n)
						}
					}(this))) : void 0
				}, e.prototype.unregisterItem = function (t) {
					var e, n, i;
					return this.emit("UnregisteringItem", t), n = t.index, i = t.view, e = this.getOptions().lastToFirst ? this.getListView().items.length - n - 1 : n, this.itemsOrdered.splice(e, 1), null != i.getData() ? delete this.itemsIndexed[i.getItemDataId()] : void 0
				}, e.prototype.replaceAllItems = function (t) {
					return this.removeAllItems(), this.instantiateListItems(t)
				}, e.prototype.removeAllItems = function () {
					var t, e;
					return t = this.itemsOrdered, this.itemsOrdered.length = 0, this.itemsIndexed = {}, e = this.getListView(), e.items.length && e.empty(), t
				}, e.prototype.moveItemToIndex = function (t, e) {
					return e = Math.max(0, Math.min(this.itemsOrdered.length - 1, e)), this.itemsOrdered = this.getListView().moveItemToIndex(t, e).slice()
				}, e.prototype.mouseDownHappenedOnItem = function (t, e) {
					return this.getOptions().keyNav && KD.getSingleton("windowController").setKeyView(this.getListView()), this.lastEvent = e, c.call(this.selectedItems, t) < 0 ? (this.mouseDown = !0, this.mouseDownTempItem = t, this.mouseDownTimer = setTimeout(function (n) {
						return function () {
							return n.mouseDown = !1, n.mouseDownTempItem = null, n.selectItem(t, e)
						}
					}(this), 300)) : (this.mouseDown = !1, this.mouseDownTempItem = null)
				}, e.prototype.mouseUpHappened = function () {
					return clearTimeout(this.mouseDownTimer), this.mouseDown = !1, this.mouseDownTempItem = null
				}, e.prototype.mouseEnterHappenedOnItem = function (t, e) {
					return clearTimeout(this.mouseDownTimer), this.mouseDown ? (e.metaKey || e.ctrlKey || e.shiftKey || this.deselectAllItems(), this.selectItemsByRange(this.mouseDownTempItem, t)) : this.emit("MouseEnterHappenedOnItem", t)
				}, e.prototype.keyDownPerformed = function (t, e) {
					switch (e.which) {
					case 40:
					case 38:
						return this.selectItemBelowOrAbove(e), this.emit("KeyDownOnListHandled", this.selectedItems)
					}
				}, e.prototype.selectItem = function (t, e) {
					var n, i, o, s, r;
					return null == e && (e = {}), null != t ? (this.lastEvent = e, s = t.getOptions().selectable, o = this.getOptions().multipleSelection, i = e.metaKey, n = e.ctrlKey, r = e.shiftKey, o || this.deselectAllItems(), s && !(i || n || r) && this.deselectAllItems(), e.shiftKey && this.selectedItems.length > 0 ? this.selectItemsByRange(this.selectedItems[0], t) : c.call(this.selectedItems, t) < 0 ? this.selectSingleItem(t) : this.deselectSingleItem(t), this.selectedItems) : void 0
				}, e.prototype.selectItemBelowOrAbove = function (t) {
					var e, n, i, o;
					if (n = 40 === t.which ? "down" : "up", e = 40 === t.which ? 1 : -1, o = this.itemsOrdered.indexOf(this.selectedItems[0]), i = this.itemsOrdered.indexOf(this.selectedItems[this.selectedItems.length - 1]), this.itemsOrdered[o + e]) {
						if (!(t.metaKey || t.ctrlKey || t.shiftKey)) return this.selectItem(this.itemsOrdered[o + e]);
						if (-1 !== this.selectedItems.indexOf(this.itemsOrdered[i + e])) {
							if (this.itemsOrdered[i]) return this.deselectSingleItem(this.itemsOrdered[i])
						} else if (this.itemsOrdered[i + e]) return this.selectSingleItem(this.itemsOrdered[i + e])
					}
				}, e.prototype.selectNextItem = function (t) {
					var e;
					return t || (t = this.selectedItems[0]), e = this.itemsOrdered.indexOf(t), this.selectItem(this.itemsOrdered[e + 1])
				}, e.prototype.selectPrevItem = function (t) {
					var e;
					return t || (t = this.selectedItems[0]), e = this.itemsOrdered.indexOf(t), this.selectItem(this.itemsOrdered[e + -1])
				}, e.prototype.deselectAllItems = function () {
					var t, e, n, i, o, s;
					for (o = this.selectedItems, s = [], n = 0, i = o.length; i > n; n++) e = o[n], e.removeHighlight(), t = this.selectedItems.concat([]), this.selectedItems = [], this.getListView().unsetClass("last-item-selected"), s.push(this.itemDeselectionPerformed(t));
					return s
				}, e.prototype.deselectSingleItem = function (t) {
					return t.removeHighlight(), this.selectedItems.splice(this.selectedItems.indexOf(t), 1), t === this.itemsOrdered[this.itemsOrdered.length - 1] && this.getListView().unsetClass("last-item-selected"), this.itemDeselectionPerformed([t])
				}, e.prototype.selectSingleItem = function (t) {
					return !t.getOption("selectable") || c.call(this.selectedItems, t) >= 0 ? void 0 : (t.highlight(), this.selectedItems.push(t), t === this.itemsOrdered[this.itemsOrdered.length - 1] && this.getListView().setClass("last-item-selected"), this.itemSelectionPerformed())
				}, e.prototype.selectAllItems = function () {
					var t, e, n, i, o;
					for (i = this.itemsOrdered, o = [], e = 0, n = i.length; n > e; e++) t = i[e], o.push(this.selectSingleItem(t));
					return o
				}, e.prototype.selectItemsByRange = function (t, e) {
					var n, i, o, s, r;
					for (n = [this.itemsOrdered.indexOf(t), this.itemsOrdered.indexOf(e)], n.sort(function (t, e) {
						return t - e
					}), o = this.itemsOrdered.slice(n[0], n[1] + 1), s = 0, r = o.length; r > s; s++) i = o[s], this.selectSingleItem(i);
					return this.itemSelectionPerformed()
				}, e.prototype.itemSelectionPerformed = function () {
					return this.emit("ItemSelectionPerformed", this, {
						event: this.lastEvent,
						items: this.selectedItems
					})
				}, e.prototype.itemDeselectionPerformed = function (t) {
					return this.emit("ItemDeselectionPerformed", this, {
						event: this.lastEvent,
						items: t
					})
				}, e.prototype.showLazyLoader = function (t) {
					var e, n, i, s;
					return null == t && (t = !0), this.noItemView && this.getOptions().noItemFoundWidget && this.hideNoItemWidget(), this.lazyLoader ? void 0 : (n = this.getOptions().lazyLoaderOptions, n || (n = {}), n.itemClass || (n.itemClass = KDCustomHTMLView), null == n.partial && (n.partial = ""), n.cssClass = KD.utils.curry("lazy-loader", n.cssClass), n.spinnerOptions || (n.spinnerOptions = {
						size: {
							width: 32
						}
					}), e = n.itemClass, i = n.spinnerOptions, delete n.itemClass, s = this.scrollView || this.getView(), s.addSubView(this.lazyLoader = new e(n)), this.lazyLoader.addSubView(this.lazyLoader.spinner = new o(i)), this.lazyLoader.spinner.show(), t && this.emit("LazyLoadThresholdReached"), KD.utils.defer(function (t) {
						return function () {
							var e;
							return null != (e = t.scrollView) ? e.stopScrolling = !0 : void 0
						}
					}(this)))
				}, e.prototype.hideLazyLoader = function () {
					return KD.utils.wait(300, function (t) {
						return function () {
							var e;
							return null != (e = t.scrollView) ? e.stopScrolling = !1 : void 0
						}
					}(this)), this.noItemView && this.getOptions().noItemFoundWidget && this.showNoItemWidget(), this.lazyLoader ? (this.lazyLoader.spinner.hide(), this.lazyLoader.destroy(), this.lazyLoader = null) : void 0
				}, e
			}(a)
		}, {
			"./../../core/view.coffee": 108,
			"./../../core/viewcontroller.coffee": 109,
			"./../list/listview.coffee": 54,
			"./../loader/loaderview.coffee": 56,
			"./../scrollview/scrollview.coffee": 69
		}
	],
	56: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					i = t || {}, i.loaderOptions || (i.loaderOptions = {}), i.size || (i.size = {}), t = {
						tagName: i.tagName || "span",
						bind: i.bind || "mouseenter mouseleave",
						showLoader: i.showLoader || !1,
						size: {
							width: i.size.width || 24,
							height: i.size.height || 24
						},
						loaderOptions: {
							color: i.loaderOptions.color || "#000000",
							shape: i.loaderOptions.shape || "rect",
							diameter: i.loaderOptions.diameter || 20,
							density: i.loaderOptions.density || 12,
							range: i.loaderOptions.range || 1,
							speed: i.loaderOptions.speed || 1,
							FPS: i.loaderOptions.FPS || 24
						}
					}, t.loaderOptions.diameter = t.size.height = t.size.width, t.cssClass = i.cssClass ? "" + i.cssClass + " kdloader" : "kdloader", e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e.prototype.viewAppended = function () {
					var t, e, n, i, s;
					this.canvas = new CanvasLoader(this.getElement(), {
						id: "cl_" + this.id
					}), s = this.getOptions(), t = s.loaderOptions, n = s.showLoader;
					for (e in t) o.call(t, e) && (i = t[e], this.canvas["set" + e.capitalize()](i));
					return n ? this.show() : void 0
				}, e.prototype.show = function () {
					return e.__super__.show.apply(this, arguments), this.active = !0, this.canvas ? this.canvas.show() : void 0
				}, e.prototype.hide = function () {
					return e.__super__.hide.apply(this, arguments), this.active = !1, this.canvas ? this.canvas.hide() : void 0
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	57: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./modalview.coffee"), o = t("./../overlay/overlayview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), e.__super__.constructor.call(this, t, n), $(window).off("keydown.modal")
				}
				return r(e, t), e.prototype.putOverlay = function () {
					return this.overlay = new o({
						isRemovable: !1
					}), this.overlay.on("click", function (t) {
						return function () {
							return t.doBlockingAnimation()
						}
					}(this))
				}, e.prototype.doBlockingAnimation = function () {
					return this.setClass("blocking-animation"), KD.utils.wait(200, function (t) {
						return function () {
							return t.unsetClass("blocking-animation")
						}
					}(this))
				}, e.prototype.setDomElement = function (t) {
					return this.domElement = $("<div class='kdmodal " + t + "'>\n  <div class='kdmodal-shadow'>\n    <div class='kdmodal-inner'>\n      <div class='kdmodal-title'></div>\n      <div class='kdmodal-content'></div>\n    </div>\n  </div>\n</div>")
				}, e.prototype.click = function () {}, e
			}(i)
		}, {
			"./../overlay/overlayview.coffee": 62,
			"./modalview.coffee": 58
		}
	],
	58: [
		function (t, e) {
			var n, i, o, s, r, a = {}.hasOwnProperty,
				l = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) a.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			r = t("./../../core/view.coffee"), s = t("./../overlay/overlayview.coffee"), n = t("./../buttons/buttonview.coffee"), o = t("./modalviewstack.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), null == t.overlay && (t.overlay = !1), null == t.overlayClick && (t.overlayClick = !0), t.height || (t.height = "auto"), null == t.width && (t.width = 600), t.position || (t.position = {}), t.title || (t.title = null), t.subtitle || (t.subtitle = null), t.content || (t.content = null), t.buttons || (t.buttons = null), null == t.fx && (t.fx = !1), t.view || (t.view = null), null == t.draggable && (t.draggable = {
						handle: ".kdmodal-title"
					}), null == t.resizable && (t.resizable = !1), null == t.appendToDomBody && (t.appendToDomBody = !0), t.helpContent || (t.helpContent = null), t.helpTitle || (t.helpTitle = "Need help?"), null == t.cancelable && (t.cancelable = !0), e.__super__.constructor.call(this, t, n), this.setClass("initial"), t.overlay && this.putOverlay(t.overlay), t.fx && this.setClass("fx"), t.title && this.setTitle(t.title), t.subtitle && this.setSubtitle(t.subtitle), t.content && this.setContent(t.content), t.view && this.addSubView(t.view), t.cancel && this.on("ModalCancelled", t.cancel), this.on("viewAppended", function (t) {
						return function () {
							return t.utils.wait(500, function () {
								return t.unsetClass("initial")
							})
						}
					}(this)), this.getOptions().appendToDomBody && this.appendToDomBody(), this.setModalWidth(t.width), t.height && this.setModalHeight(t.height), t.buttons && (this.buttonHolder = new r({
						cssClass: "kdmodal-buttons clearfix"
					}), this.addSubView(this.buttonHolder, ".kdmodal-inner"), this.setButtons(t.buttons), i = this.$(".kdmodal-inner").width(), this.buttonHolder.setWidth(i)), this.display(), this._windowDidResize(), $(window).one("keydown.modal", function (t) {
						return function (e) {
							return 27 === e.which ? t.cancel() : void 0
						}
					}(this)), this.on("childAppended", this.setPositions.bind(this)), this.listenWindowResize()
				}
				return l(e, t), e.prototype.setDomElement = function (t) {
					var e, n, i, o;
					return o = this.getOptions(), n = o.helpContent, i = o.helpTitle, e = n ? "<span class='showHelp'>" + i + "</span>" : "", this.domElement = $("<div class='kdmodal " + t + "'>\n  <div class='kdmodal-inner'>\n    " + e + "\n    <span class='close-icon closeModal' title='Close [ESC]'></span>\n    <div class='kdmodal-title hidden'></div>\n    <div class='kdmodal-content'></div>\n  </div>\n</div>")
				}, e.prototype.addSubView = function (t, n) {
					return null == n && (n = ".kdmodal-content"), 0 === this.$(n).length && (n = null), e.__super__.addSubView.call(this, t, n)
				}, e.prototype.setButtons = function (t, e) {
					var n, i, o, s, r, l;
					null == e && (e = !1), this.buttons || (this.buttons = {}), this.setClass("with-buttons"), s = null, e && this.destroyButtons();
					for (o in t) a.call(t, o) && (i = t[o], null == s && (s = o), n = this.createButton(i.title || o, i), this.buttons[o] = n, i.focus && (r = !0));
					return !r && s && null != (l = this.buttons[s]) ? l.setFocus() : void 0
				}, e.prototype.destroyButtons = function () {
					var t, e, n, i;
					n = this.buttons, i = [];
					for (e in n) a.call(n, e) && (t = n[e], i.push(t.destroy()));
					return i
				}, e.prototype.click = function (t) {
					var n;
					return $(t.target).is(".closeModal") && this.cancel(), $(t.target).is(".showHelp") && (n = this.getOptions().helpContent) ? (n = KD.utils.applyMarkdown(n), new e({
						cssClass: "help-dialog",
						overlay: !0,
						content: "<div class='modalformline'><p>" + n + "</p></div>"
					})) : void 0
				}, e.prototype.setTitle = function (t) {
					return this.$().find(".kdmodal-title").removeClass("hidden").html("<span class='title'>" + t + "</span>"), this.modalTitle = t
				}, e.prototype.setSubtitle = function (t) {
					return this.$().find(".kdmodal-title").append("<span class='subtitle'>" + t + "</span>"), this.modalSubtitle = t
				}, e.prototype.setModalHeight = function (t) {
					return "auto" === t ? (this.$().css("height", "auto"), this.modalHeight = this.getHeight()) : (this.$().height(t), this.modalHeight = t)
				}, e.prototype.setModalWidth = function (t) {
					return this.modalWidth = t, this.$().width(t)
				}, e.prototype.setPositions = function () {
					return this.utils.defer(function (t) {
						return function () {
							var e, n, i, o, s, r, a, l;
							return l = t.getOptions().position, r = l.top, s = l.right, e = l.bottom, i = l.left, o = {}, n = $(window).height(), a = $(window).width(), o.top = Math.round(null != r ? r : n / 2 - t.getHeight() / 2), o.left = Math.round(null != i ? i : a / 2 - t.modalWidth / 2), s && (o.left = Math.round(a - t.modalWidth - s - 20)), o.opacity = 1, t.$().css(o)
						}
					}(this))
				}, e.prototype._windowDidResize = function () {
					var t;
					return this.setPositions(), t = window.innerHeight, this.$(".kdmodal-content").css({
						maxHeight: t - 120
					}), this.getOptions().position.top ? void 0 : this.setY(Math.round((t - this.getHeight()) / 2))
				}, e.prototype.putOverlay = function () {
					var t;
					return t = this.getOptions().overlayClick, this.overlay = new s({
						isRemovable: t
					}), t ? this.overlay.once("click", this.bound("destroy")) : void 0
				}, e.prototype.createButton = function (t, e) {
					var i, o;
					return e.title = t, e.delegate = this, o = e.itemClass, delete e.itemClass, this.buttonHolder.addSubView(i = new(o || n)(e)), i.on("KDModalShouldClose", function (t) {
						return function () {
							return t.emit("KDModalShouldClose")
						}
					}(this)), i
				}, e.prototype.setContent = function (t) {
					return this.modalContent = t, this.getDomElement().find(".kdmodal-content").html(t)
				}, e.prototype.display = function () {
					return this.getOptions().fx ? this.utils.defer(function (t) {
						return function () {
							return t.setClass("active")
						}
					}(this)) : void 0
				}, e.prototype.cancel = function () {
					return this.getOptions().cancelable ? (this.emit("ModalCancelled"), this.destroy()) : void 0
				}, e.prototype.destroy = function () {
					var t, e;
					return $(window).off("keydown.modal"), t = r.prototype.destroy.bind(this), this.options.fx ? (this.unsetClass("active"), setTimeout(t, 300)) : (this.getDomElement().hide(), t()), null != (e = this.overlay) && e.destroy(), this.emit("KDModalViewDestroyed", this)
				}, e.createStack = function (t) {
					return this.stack || (this.stack = new o(t))
				}, e.addToStack = function (t) {
					return this.stack.addModal(t)
				}, e.destroyStack = function () {
					return this.stack.destroy(), delete this.stack
				}, e.confirm = function (t) {
					var e, n, i, o, s, r, a;
					return s = function () {
						return o.destroy()
					}, r = t.ok, e = t.cancel, a = t.title, n = t.content, i = t.description, r && "function" != typeof r || (r = {
						callback: r
					}), e && "function" != typeof e || (e = {
						callback: e
					}), o = new this({
						title: a || "You must confirm this action",
						content: n || (i ? "<div class='modalformline'>\n  <p>" + i + "</p>\n</div>" : void 0),
						overlay: !0,
						buttons: {
							OK: {
								title: r.title,
								style: r.style || "modal-clean-red",
								callback: r.callback || s
							},
							cancel: {
								title: e.title,
								style: e.style || "modal-cancel",
								callback: e.callback || s
							}
						}
					}), t.subView && o.addSubView(t.subView), o
				}, e
			}(r)
		}, {
			"./../../core/view.coffee": 108,
			"./../buttons/buttonview.coffee": 20,
			"./../overlay/overlayview.coffee": 62,
			"./modalviewstack.coffee": 59
		}
	],
	59: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/object.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == t.lastToFirst && (t.lastToFirst = !1), e.__super__.constructor.call(this, t, n), this.modals = []
				}
				return s(e, t), e.prototype.addModal = function (t) {
					var e;
					return t instanceof KDModalView ? (t.on("KDObjectWillBeDestroyed", function (t) {
						return function () {
							return t.next()
						}
					}(this)), e = this.getOptions().lastToFirst, this.modals.push(t), KD.utils.defer(function (n) {
						return function () {
							return t.hide(), e ? (n.modals.forEach(function (t) {
								return t.hide()
							}), n.modals.last.show()) : n.modals.first.show()
						}
					}(this)), t) : warn("You can only add KDModalView instances to the modal stack.")
				}, e.prototype.next = function () {
					var t, e, n;
					return t = this.getOptions().lastToFirst, t ? (this.modals.pop(), null != (e = this.modals.last) ? e.show() : void 0) : (this.modals.shift(), null != (n = this.modals.first) ? n.show() : void 0)
				}, e.prototype.destroy = function () {
					return this.modals.forEach(function (t) {
						return KD.utils.defer(function () {
							return t.destroy()
						})
					}), this.modals = [], e.__super__.destroy.apply(this, arguments)
				}, e
			}(i)
		}, {
			"./../../core/object.coffee": 104
		}
	],
	60: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./modalview.coffee"), o = t("./../tabs/tabviewwithforms"), e.exports = i = function (t) {
				function e(t, n) {
					this.modalButtons = [], e.__super__.constructor.call(this, t, n), this.addSubView(this.modalTabs = new o(t.tabs))
				}
				return r(e, t), e.prototype.aggregateFormData = function () {
					var t, e, n;
					return t = function () {
						var t, i;
						t = this.modalTabs.forms, i = [];
						for (n in t) s.call(t, n) && (e = t[n], i.push({
							name: n,
							data: e.getData()
						}));
						return i
					}.call(this), t.reduce(function (t, e) {
						var n, i, o;
						o = e.data;
						for (n in o) s.call(o, n) && (i = o[n], n in t && console.warn("Property " + n + " will be overwitten!"), t[n] = i);
						return t
					}, {})
				}, e
			}(n)
		}, {
			"./../tabs/tabviewwithforms": 83,
			"./modalview.coffee": 58
		}
	],
	61: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./../../core/view.coffee"), n = t("./../loader/loaderview.coffee"), e.exports = i = function (t) {
				function e(t) {
					e.__super__.constructor.call(this, t), t = this.notificationSetDefaults(t), this.notificationSetType(t.type), null != t.title && this.notificationSetTitle(t.title), null != t.content && this.notificationSetContent(t.content), null != t.duration && this.notificationSetTimer(t.duration), null != t.overlay && this.notificationSetOverlay(t.overlay), null != t.followUps && this.notificationSetFollowUps(t.followUps), null != t.showTimer && this.notificationShowTimer(), this.notificationSetCloseHandle(t.closeManually), t.loader && this.once("viewAppended", this.bound("setLoader")), this.notificationDisplay()
				}
				return r(e, t), e.prototype.setDomElement = function (t) {
					return null == t && (t = ""), this.domElement = $("<div class='kdnotification " + t + "'> <a class='kdnotification-close hidden'></a> <div class='kdnotification-timer hidden'></div> <div class='kdnotification-title'></div> <div class='kdnotification-content hidden'></div> </div>")
				}, e.prototype.destroy = function () {
					return this.notificationCloseHandle.unbind(".notification"), null != this.notificationOverlay && this.notificationOverlay.remove(), e.__super__.destroy.call(this), this.notificationStopTimer(), this.notificationRepositionOtherNotifications()
				}, e.prototype.viewAppended = function () {
					return this.notificationSetPositions()
				}, e.prototype.notificationSetDefaults = function (t) {
					return null == t.duration && (t.duration = 1500), (t.duration > 2999 || 0 === t.duration) && null == t.closeManually && (t.closeManually = !0), t
				}, e.prototype.notificationSetTitle = function (t) {
					return t instanceof o ? (this.notificationTitle && this.notificationTitle instanceof o && this.notificationTitle.destroy(), this.addSubView(t, ".kdnotification-title")) : this.$().find(".kdnotification-title").html(t), this.notificationTitle = t
				}, e.prototype.notificationSetType = function (t) {
					return null == t && (t = "main"), this.notificationType = t
				}, e.prototype.notificationSetPositions = function () {
					var t, e, n, i, o, s, r, a, l, u, c, p;
					switch (this.setClass(this.notificationType), i = $("body").find(".kdnotification." + this.notificationType), this.getOptions().container ? (r = this.getOptions().container.getHeight(), a = this.getOptions().container.getWidth()) : (a = window.innerWidth, r = window.innerHeight), this.notificationType) {
					case "tray":
						for (t = 8, e = l = 0, c = i.length; c > l; e = ++l) n = i[e], 0 !== e && (t += $(n).outerHeight(!1) + 8);
						o = {
							bottom: t,
							right: 8,
							paddingRight: this.options.content && this.options.title ? 10 : 25
						};
						break;
					case "growl":
						for (s = 63, e = u = 0, p = i.length; p > u; e = ++u) n = i[e], 0 !== e && (s += $(n).outerHeight(!1) + 8);
						o = {
							top: s,
							right: 8
						};
						break;
					case "mini":
						o = {
							top: 0,
							left: a / 2 - this.getDomElement().width() / 2
						};
						break;
					case "sticky":
						o = {
							top: 0,
							left: a / 2 - this.getDomElement().width() / 2
						};
						break;
					default:
						o = {
							top: r / 2 - this.getDomElement().height() / 2,
							left: a / 2 - this.getDomElement().width() / 2
						}
					}
					return this.getDomElement().css(o)
				}, e.prototype.notificationRepositionOtherNotifications = function () {
					var t, e, n, i, o, s, r, a, l, u, c, p, h, d, f;
					for (l = $("body").find(".kdnotification." + this.notificationType), n = function () {
						var e, n, o;
						for (o = [], i = e = 0, n = l.length; n > e; i = ++e) t = l[i], o.push($(t).outerHeight(!1));
						return o
					}(), f = [], i = u = 0, p = l.length; p > u; i = ++u) switch (t = l[i], this.notificationType) {
					case "tray":
					case "growl":
						for (s = 0, a = "tray" === this.notificationType ? "bottom" : "top", d = n.slice(0, +i + 1 || 9e9), o = c = 0, h = d.length; h > c; o = ++c) e = d[o], 0 !== o ? s += e : s = 8;
						r = {}, r[a] = s + 8 * i, f.push($(t).css(r));
						break;
					default:
						f.push(void 0)
					}
					return f
				}, e.prototype.notificationSetCloseHandle = function (t) {
					return null == t && (t = !1), this.notificationCloseHandle = this.getDomElement().find(".kdnotification-close"), t && this.notificationCloseHandle.removeClass("hidden"), this.notificationCloseHandle.bind("click.notification", function (t) {
						return function () {
							return t.destroy()
						}
					}(this)), $(window).bind("keydown.notification", function (t) {
						return function (e) {
							return 27 === e.which ? t.destroy() : void 0
						}
					}(this))
				}, e.prototype.notificationSetTimer = function (t) {
					return 0 !== t ? (this.notificationTimerDiv = this.getDomElement().find(".kdnotification-timer"), this.notificationTimerDiv.text(Math.floor(t / 1e3)), this.notificationTimeout = setTimeout(function (t) {
						return function () {
							return t.getDomElement().fadeOut(200, function () {
								return t.destroy()
							})
						}
					}(this), t), this.notificationInterval = setInterval(function (t) {
						return function () {
							var e;
							return e = parseInt(t.notificationTimerDiv.text(), 10) - 1, t.notificationTimerDiv.text(e)
						}
					}(this), 1e3)) : void 0
				}, e.prototype.notificationSetFollowUps = function (t) {
					var e;
					return Array.isArray(t) || (t = [t]), e = 0, t.forEach(function (t) {
						return function (n) {
							var i;
							return e += null != (i = n.duration) ? i : 1e4, t.utils.wait(e, function () {
								return n.title && t.notificationSetTitle(n.title), n.content && t.notificationSetContent(n.content), t.notificationSetPositions()
							})
						}
					}(this))
				}, e.prototype.notificationShowTimer = function () {
					return this.notificationTimerDiv.removeClass("hidden"), this.getDomElement().bind("mouseenter", function (t) {
						return function () {
							return t.notificationStopTimer()
						}
					}(this)), this.getDomElement().bind("mouseleave", function (t) {
						return function () {
							var e;
							return e = 1e3 * parseInt(t.notificationTimerDiv.text(), 10), t.notificationSetTimer(e)
						}
					}(this))
				}, e.prototype.notificationStopTimer = function () {
					return clearTimeout(this.notificationTimeout), clearInterval(this.notificationInterval)
				}, e.prototype.notificationSetOverlay = function (t) {
					return null == t.transparent && (t.transparent = !0), null == t.destroyOnClick && (t.destroyOnClick = !0), this.notificationOverlay = $("<div/>", {
						"class": "kdoverlay transparent"
					}), this.notificationOverlay.hide(), t.transparent || this.notificationOverlay.removeClass("transparent"), this.notificationOverlay.appendTo("body"), this.notificationOverlay.fadeIn(200), this.notificationOverlay.bind("click", function (e) {
						return function () {
							return t.destroyOnClick ? e.destroy() : void 0
						}
					}(this))
				}, e.prototype.notificationGetOverlay = function () {
					return this.notificationOverlay
				}, e.prototype.setLoader = function () {
					var t, e, i, o, s, r;
					return this.setClass("w-loader"), e = this.getOptions().loader, t = {
						tray: 25,
						growl: 30,
						mini: 18,
						sticky: 25
					}, e.diameter = t[this.notificationType] || 30, this.loader = new n({
						size: {
							width: e.diameter
						},
						loaderOptions: {
							color: e.color || "#ffffff",
							shape: e.shape || "spiral",
							diameter: e.diameter,
							density: null != (i = e.density) ? i : 30,
							range: null != (o = e.range) ? o : .4,
							speed: null != (s = e.speed) ? s : 1.5,
							FPS: null != (r = e.FPS) ? r : 24
						}
					}), this.addSubView(this.loader, null, !0), this.setCss("paddingLeft", 2 * e.diameter), this.loader.setStyle({
						position: "absolute",
						left: e.left || Math.floor(e.diameter / 2),
						top: e.top || "50%",
						marginTop: -(e.diameter / 2)
					}), this.loader.show()
				}, e.prototype.showLoader = function () {
					return this.setClass("loading"), this.loader.show()
				}, e.prototype.hideLoader = function () {
					return this.unsetClass("loading"), this.loader.hide()
				}, e.prototype.notificationSetContent = function (t) {
					return this.notificationContent = t, this.getDomElement().find(".kdnotification-content").removeClass("hidden").html(t)
				}, e.prototype.notificationDisplay = function () {
					return this.getOptions().container ? this.getOptions().container.addSubView(this) : this.appendToDomBody()
				}, e
			}(o)
		}, {
			"./../../core/view.coffee": 108,
			"./../loader/loaderview.coffee": 56
		}
	],
	62: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == t.isRemovable && (t.isRemovable = !0), null == t.animated && (t.animated = !1), null == t.color && (t.color = !1), null == t.transparent && (t.transparent = !1), null == t.opacity && (t.opacity = .5), null == t.appendToDomBody && (t.appendToDomBody = !0), t.cssClass = KD.utils.curry("kdoverlay", t.cssClass), e.__super__.constructor.call(this, t, n), t.animated && this.setClass("animated"), t.transparent && this.setClass("transparent"), t.color && this.setStyle({
						backgroundColor: t.color,
						opacity: t.opacity
					}), t.container instanceof i ? (t.container.addSubView(this), this.setCss("position", "absolute")) : t.appendToDomBody && this.appendToDomBody(), t.animated ? (this.utils.defer(function (t) {
						return function () {
							return t.setClass("in")
						}
					}(this)), this.utils.wait(300, function (t) {
						return function () {
							return t.emit("OverlayAdded", t)
						}
					}(this))) : this.emit("OverlayAdded", this), t.isRemovable && (t.animated ? this.once("click", function (t) {
						return function () {
							return t.unsetClass("in"), t.utils.wait(300, function () {
								return t.remove()
							})
						}
					}(this)) : this.once("click", function (t) {
						return function () {
							return t.remove()
						}
					}(this)))
				}
				return s(e, t), e.prototype.remove = function () {
					return this.emit("OverlayWillBeRemoved"), this.destroy(), this.emit("OverlayRemoved", this)
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	63: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("kdspotlightview", t.cssClass), null == t.margin && (t.margin = 50), null == t.radial && (t.radial = !0), null == t.isRemovable && (t.isRemovable = !0), e.__super__.constructor.call(this, t, n), t.radial || this.setClass("shadow"), this.createElements(), this.appendToDomBody()
				}
				return s(e, t), e.prototype.createElements = function () {
					var t, e, n, o, s, r, a, l, u, c;
					n = this.getOptions().isRemovable, u = this.getBoundaries(), c = [];
					for (s in u) t = u[s], l = t.width, e = t.height, r = t.top, o = t.left, l > 0 && e > 0 ? (a = new i({
						cssClass: KD.utils.curry("kdoverlay", s),
						size: {
							width: l,
							height: e
						},
						position: {
							top: r,
							left: o
						}
					}), n && a.on("click", function (t) {
						return function () {
							return t.destroy(), t.emit("OverlayDestroyed")
						}
					}(this)), c.push(this.addSubView(a))) : c.push(void 0);
					return c
				}, e.prototype.getBoundaries = function () {
					var t, e, n, i, o, s, r, a, l, u, c, p, h;
					return a = this.getOptions().radial, n = this.getDelegate(), l = n.getY(), o = n.getX(), c = n.getWidth(), i = n.getHeight(), r = this.getOption("margin"), h = window.innerWidth, p = window.innerHeight, a && (c = i = Math.min(c, i)), u = l - r, s = o - r, t = p - (l + i + r), e = {
						top: {
							top: 0,
							left: 0,
							width: h,
							height: u
						},
						left: {
							top: u,
							left: 0,
							width: s,
							height: p - l + r
						},
						bottom: {
							top: l + i + r,
							left: s,
							width: h - o + r,
							height: t
						},
						right: {
							top: u,
							left: o + c + r,
							width: h - (o + c + r),
							height: p - (t + u)
						},
						main: {
							top: u,
							left: s,
							width: c + r + r,
							height: i + r + r
						}
					}
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	64: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../../core/customhtmlview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("progressbar-container", t.cssClass), null == t.determinate && (t.determinate = !0), null == t.initial && (t.initial = !1), null == t.title && (t.title = ""), e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e.prototype.viewAppended = function () {
					var t, e, n;
					return n = this.getOptions(), t = n.initial, e = n.title, this.createBar(), this.updateBar(t || 1, "%", e)
				}, e.prototype.createBar = function (t, e) {
					return null == e && (e = this.getOptions().title), this.addSubView(this.bar = new n({
						cssClass: "bar"
					})), this.addSubView(this.spinner = new n({
						cssClass: "bar spinner hidden"
					})), this.addSubView(this.darkLabel = new n({
						tagName: "span",
						cssClass: "dark-label"
					})), this.bar.addSubView(this.lightLabel = new n({
						tagName: "span",
						cssClass: "light-label"
					})), this.lightLabel.setWidth(this.getWidth())
				}, e.prototype.updateBar = function (t, e, n) {
					var i;
					return null == e && (e = "%"), null == n && (n = this.getOptions().title), i = this.getOptions().determinate, i ? (this.bar.show(), this.spinner.hide(), this.bar.setWidth(t, e), this.darkLabel.updatePartial("" + n + "&nbsp;"), this.lightLabel.updatePartial("" + n + "&nbsp;")) : (this.bar.hide(), this.spinner.show())
				}, e
			}(n)
		}, {
			"./../../core/customhtmlview.coffee": 97
		}
	],
	65: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			t("jquery-mousewheel")($), n = t("./../../core/customhtmlview"), s = t("./scrolltrack"), o = t("./customscrollviewinner"), e.exports = i = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), null == t.bind && (t.bind = "mouseenter mouseleave"), t.cssClass = KD.utils.curry("kdcustomscrollview", t.cssClass), null == t.mouseWheelSpeed && (t.mouseWheelSpeed = 3), e.__super__.constructor.call(this, t, n), i = this.getOptions().mouseWheelSpeed, this.wrapper = new o({
						tagName: "main",
						mouseWheelSpeed: i
					}), this.verticalTrack = new s({
						delegate: this.wrapper
					}), this.horizontalTrack = new s({
						delegate: this.wrapper,
						type: "horizontal"
					}), this.wrapper.verticalThumb = this.verticalTrack.thumb, this.wrapper.horizontalThumb = this.horizontalTrack.thumb, this.wrapper.on("ScrollTrackShown", function (t) {
						return function (e) {
							return t.setClass("has-" + e)
						}
					}(this)), this.wrapper.on("ScrollTrackHidden", function (t) {
						return function (e) {
							return t.unsetClass("has-" + e)
						}
					}(this)), this.on("mouseenter", this.bound("showTracks")), this.on("mouseleave", this.bound("hideTracks"))
				}
				var n;
				return a(e, t), e.prototype.viewAppended = function () {
					return this.addSubView(this.wrapper), this.addSubView(this.verticalTrack), this.addSubView(this.horizontalTrack), this.wrapper.observeMutations(), this.wrapper.on("MutationHappened", this.verticalTrack.thumb.bound("handleMutation")), this.wrapper.on("MutationHappened", this.horizontalTrack.thumb.bound("handleMutation"))
				}, n = null, e.prototype.hideTracks = function () {
					return n = KD.utils.wait(1e3, function (t) {
						return function () {
							return t.verticalTrack.setClass("out"), t.horizontalTrack.setClass("out")
						}
					}(this))
				}, e.prototype.showTracks = function () {
					return n && KD.utils.killWait(n), this.verticalTrack.unsetClass("out"), this.horizontalTrack.unsetClass("out")
				}, e
			}(n)
		}, {
			"./../../core/customhtmlview": 97,
			"./customscrollviewinner": 66,
			"./scrolltrack": 68,
			"jquery-mousewheel": 2
		}
	],
	66: [
		function (t, e) {
			var n, i, o, s, r, a = {}.hasOwnProperty,
				l = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) a.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			t("jquery-mousewheel")($), n = t("./../../core/customhtmlview"), r = t("./scrollview"), o = t("./scrollthumb"), s = t("./scrolltrack"), e.exports = i = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return l(e, t), e.prototype.scroll = function (t) {
					return this.verticalThumb.beingDragged || this.horizontalThumb.beingDragged ? KD.utils.stopDOMEvent(t) : void 0
				}, e.prototype.mouseWheel = function (t) {
					var n, i, o, s, r, a, l, u;
					return e.__super__.mouseWheel.apply(this, arguments), u = t._delta, n = t.deltaFactor, u ? (s = n || this.getOptions().mouseWheelSpeed, a = u.deltaX, l = u.deltaY, i = 0 !== a && this.getScrollWidth() > this.getWidth() ? this._scrollHorizontally({
						speed: s,
						velocity: a
					}) : !1, o = 0 !== l && this.getScrollHeight() > this.getHeight() ? this._scrollVertically({
						speed: s,
						velocity: l
					}) : !1, r = Math.abs(a) > Math.abs(l) ? i : o, !r) : void 0
				}, e.prototype._scrollVertically = function () {
					var t;
					return t = 0,
						function (e) {
							var n, i, o, s, r, a;
							return s = e.speed, a = e.velocity, r = a * s, n = this.getScrollTop(), i = n - r, o = a > 0 ? t > i : i > t, this.setScrollTop(t = i), o
						}
				}(), e.prototype._scrollHorizontally = function () {
					var t;
					return t = 0,
						function (e) {
							var n, i, o, s, r, a;
							return s = e.speed, a = e.velocity, r = a * s, n = this.getScrollLeft(), i = n + r, o = 0 > a ? t >= i : i >= t, this.setScrollLeft(t = i), o
						}
				}(), e
			}(r)
		}, {
			"./../../core/customhtmlview": 97,
			"./scrollthumb": 67,
			"./scrolltrack": 68,
			"./scrollview": 69,
			"jquery-mousewheel": 2
		}
	],
	67: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), t.type || (t.type = "vertical"), t.cssClass = KD.utils.curry("kdscrollthumb", t.cssClass), null == t.draggable && (t.draggable = {
						axis: "vertical" === t.type ? "y" : "x",
						containment: this
					}), e.__super__.constructor.call(this, t, n), i = this.getOptions(), this.type = i.type, this.track = i.track, this.view = this.track.getDelegate(), this.on("viewAppended", this.bound("calculateSize")), this.on("DragInAction", this.bound("handleDrag")), this.view.on("scroll", this.bound("calculatePosition")), this.listenWindowResize()
				}
				return s(e, t), e.prototype.resetSizes = function () {
					return this.size = null, this.trackSize = null, this.scrollSize = null
				}, e.prototype.handleMutation = function () {
					return this.scrollSize = null, this.calculateSize()
				}, e.prototype.handleDrag = function () {
					var t, e, n, i, o;
					return i = this.getSize(), e = this.getOffset(), o = this.getTrackSize(), t = o - i, n = Math.min(Math.max(0, e / t), 1), this.isVertical() ? this.view.setScrollTop((this.view.getScrollHeight() - o) * n) : this.view.setScrollLeft((this.view.getScrollWidth() - o) * n)
				}, e.prototype.isVertical = function () {
					return "vertical" === this.type
				}, e.prototype.getTrackSize = function () {
					return this.trackSize ? this.trackSize : this.isVertical() ? this.track.getHeight() : this.track.getWidth()
				}, e.prototype.setSize = function (t) {
					return this.isVertical() ? this.setHeight(t) : this.setWidth(t), this.size = t
				}, e.prototype.getSize = function () {
					return this.size ? this.size : this.isVertical() ? this.getHeight() : this.getWidth()
				}, e.prototype.setOffset = function (t) {
					return this.setStyle(this.isVertical() ? {
						top: t
					} : {
						left: t
					})
				}, e.prototype.getOffset = function () {
					return this.isVertical() ? this.getY() - this.track.getY() : this.getX() - this.track.getX()
				}, e.prototype.getScrollOffset = function () {
					return this.isVertical() ? this.view.getScrollTop() : this.view.getScrollLeft()
				}, e.prototype.getScrollSize = function () {
					return this.scrollSize ? this.scrollSize : this.isVertical() ? this.view.getScrollHeight() : this.view.getScrollWidth()
				}, e.prototype.calculateSize = function () {
					return this.trackSize = this.getTrackSize(), this.scrollSize = this.getScrollSize(), this.trackSize >= this.scrollSize ? this.track.hide() : this.track.show(), this.setSize(this.trackSize * this.trackSize / this.scrollSize)
				}, e.prototype.calculatePosition = function () {
					var t;
					return t = this.getScrollOffset() / this.getScrollSize(), this.setOffset(this.getTrackSize() * t)
				}, e.prototype._windowDidResize = function () {
					return this.resetSizes()
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	68: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.type || (t.type = "vertical"), t.cssClass = KD.utils.curry("kdscrolltrack " + t.type, t.cssClass), e.__super__.constructor.call(this, t, n), this.type = this.getOptions().type, this.thumb = new KDScrollThumb({
						cssClass: "kdscrollthumb",
						type: this.type,
						track: this
					})
				}
				return s(e, t), e.prototype.viewAppended = function () {
					return e.__super__.viewAppended.call(this), this.addSubView(this.thumb)
				}, e.prototype.show = function () {
					return this.getDelegate().emit("ScrollTrackShown", this.type), this.unsetClass("invisible")
				}, e.prototype.hide = function () {
					return this.getDelegate().emit("ScrollTrackHidden", this.type), this.setClass("invisible")
				}, e
			}(i)
		}, {
			"./../../core/view": 108
		}
	],
	69: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			t("jquery-mousewheel")($), i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.bind || (t.bind = "mouseenter"), t.cssClass = KD.utils.curry("kdscrollview", t.cssClass), e.__super__.constructor.call(this, t, n), this.stopScrolling = !1, this.on("click", function () {
						return KD.getSingleton("windowController").enableScroll()
					})
				}
				return s(e, t), e.prototype.bindEvents = function () {
					return this.$().bind("mousewheel scroll", function (t) {
						return function (e, n, i, o) {
							return n && (e._delta = {
								delta: n,
								deltaX: i,
								deltaY: o
							}), t.handleEvent(e)
						}
					}(this)), e.__super__.bindEvents.apply(this, arguments)
				}, e.prototype.hasScrollBars = function () {
					return this.getScrollHeight() > this.getHeight()
				}, e.prototype.getScrollHeight = function () {
					return this.getElement().scrollHeight
				}, e.prototype.getScrollWidth = function () {
					return this.getElement().scrollWidth
				}, e.prototype.getScrollTop = function () {
					return this.getElement().scrollTop
				}, e.prototype.getScrollLeft = function () {
					return this.getElement().scrollLeft
				}, e.prototype.setScrollHeight = function (t) {
					return this.getElement().scrollHeight = t
				}, e.prototype.setScrollWidth = function (t) {
					return this.getElement().scrollWidth = t
				}, e.prototype.setScrollTop = function (t) {
					return this.getElement().scrollTop = t
				}, e.prototype.setScrollLeft = function (t) {
					return this.getElement().scrollLeft = t
				}, e.prototype.scrollTo = function (t, e) {
					var n, i, o;
					return o = t.top, i = t.left, n = t.duration, o || (o = 0), i || (i = 0), n || (n = null), n ? this.$().animate({
						scrollTop: o,
						scrollLeft: i
					}, n, e) : (this.setScrollTop(o), this.setScrollLeft(i), "function" == typeof e ? e() : void 0)
				}, e.prototype.scrollToSubView = function (t) {
					var e, n, i, o, s, r;
					if (r = this.getY(), o = this.getHeight(), s = this.getScrollTop(), i = t.getY(), e = t.getHeight(), n = i - r + s, o > i - r + e && i - r >= 0);
					else {
						if (0 > i - r) return this.scrollTo({
							top: n
						});
						if (i - r + e > o) return this.scrollTo({
							top: n - o + e
						})
					}
				}, e.prototype.fractionOfHeightBelowFold = function (t) {
					var e, n, i, o, s;
					return n = t.view, o = n.getHeight(), i = n.$().offset().top, e = this.$().offset().top, s = i - e, (o + s - this.getHeight()) / this.getHeight()
				}, e.prototype.mouseWheel = function () {
					return this.stopScrolling ? !1 : void 0
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108,
			"jquery-mousewheel": 2
		}
	],
	70: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../../core/customhtmlview.coffee"), e.exports = i = function (t) {
				function e(t) {
					null == t && (t = {}), t.tagName = "a", t.cssClass = "handle", null == t.value && (t.value = 0), t.draggable = {
						axis: "x"
					}, e.__super__.constructor.call(this, t), this.value = this.getOption("value")
				}
				return s(e, t), e.prototype.attachEvents = function () {
					var t, e, n, i, o;
					return o = this.parent.getOptions(), e = o.maxValue, n = o.minValue, i = o.width, t = this.value, this.on("DragStarted", function () {
						return t = this.value
					}), this.on("DragInAction", function () {
						var o, s;
						return o = this.dragState.position.relative.x, s = (e - n) * o / i, this.setValue(t + s), this.parent.getOption("snapOnDrag") ? this.snap() : void 0
					}), this.on("DragFinished", function () {
						return this.parent.getOption("snap") ? this.snap() : void 0
					})
				}, e.prototype.getPosition = function () {
					var t, e, n, i, o, s;
					return s = this.parent.getOptions(), t = s.maxValue, e = s.minValue, o = this.parent.getWidth(), n = 100 * (this.value - e) / (t - e), i = o / 100 * n, "" + i + "px"
				}, e.prototype.setValue = function (t) {
					var e, n, i;
					return i = this.getOptions(), e = i.leftLimit, n = i.rightLimit, "number" == typeof n && (t = Math.min(t, n)), "number" == typeof e && (t = Math.max(t, e)), this.value = t, this.setX(this.getPosition()), this.parent.setValue(t, this, !1)
				}, e.prototype.getSnappedValue = function (t) {
					var e, n, i;
					return e = this.parent.getOptions().interval, t || (t = this.value), e ? (i = t % e, n = e / 2, t = function () {
						switch (!1) {
						case !(n >= i):
							return t - i;
						case !(i > n):
							return t + (e - i);
						default:
							return t
						}
					}()) : void 0
				}, e.prototype.snap = function () {
					var t, e;
					return t = this.parent.getOptions().interval, e = this.getSnappedValue(), t && this.parent.getOption("snap") && (this.setValue(e), this.parent.getOption("drawBar")) ? this.parent.drawBar() : void 0
				}, e.prototype.viewAppended = function () {
					return this.setX("" + this.getPosition()), this.attachEvents(), this.parent.getOption("snap") ? this.snap() : void 0
				}, e
			}(n)
		}, {
			"./../../core/customhtmlview.coffee": 97
		}
	],
	71: [
		function (t, e) {
			var n, i, o, s = function (t, e) {
					return function () {
						return t.apply(e, arguments)
					}
				},
				r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../../core/customhtmlview.coffee"), i = t("./sliderbarhandleview.coffee"), e.exports = o = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == n && (n = {}), this._createLabel = s(this._createLabel, this), t.cssClass = KD.utils.curry("sliderbar-container", t.cssClass), null == t.minValue && (t.minValue = 0), null == t.maxValue && (t.maxValue = 100), null == t.interval && (t.interval = !1), null == t.drawBar && (t.drawBar = !0), null == t.showLabels && (t.showLabels = !0), null == t.snap && (t.snap = !0), null == t.snapOnDrag && (t.snapOnDrag = !1), t.width || (t.width = 300), null == t.drawOpposite && (t.drawOpposite = !1), e.__super__.constructor.call(this, t, n), this.handles = [], this.labels = []
				}
				return a(e, t), e.prototype.createHandles = function () {
					var t, e, n, o, s, r;
					for (r = this.getOption("handles"), o = 0, s = r.length; s > o; o++) n = r[o], this.handles.push(this.addSubView(t = new i({
						value: n
					})));
					return e = function (t, e) {
						return t.options.value < e.options.value ? -1 : t.options.value > e.options.value ? 1 : 0
					}, this.handles.sort(e), this.setClass("labeled")
				}, e.prototype.drawBar = function () {
					var t, e, i, o, s, r, a, l, u;
					for (s = [], u = this.handles, a = 0, l = u.length; l > a; a++) e = u[a], s.push(e.getRelativeX());
					return o = s.length, i = (o > 1 ? parseInt(s.first) : void 0) || 0, r = parseInt(s.last), t = r - i, this.bar || this.addSubView(this.bar = new n({
						cssClass: "bar"
					})), this.bar.setWidth(t), this.bar.setX("" + i + "px")
				}, e.prototype.drawOppositeBar = function () {
					var t, e, i, o, s, r, a;
					for (i = [], a = this.handles, s = 0, r = a.length; r > s; s++) e = a[s], i.push(e.getRelativeX());
					return o = parseInt(i.last), t = this.getWidth() - o, this.oppositeBar || this.addSubView(this.oppositeBar = new n({
						cssClass: "opposite bar"
					})), this.oppositeBar.setWidth(t), this.oppositeBar.setX("" + o + "px")
				}, e.prototype._createLabel = function (t) {
					var e, i, o, s, r, a, l;
					return l = this.getOptions(), o = l.maxValue, s = l.minValue, e = l.interval, a = l.showLabels, r = 100 * (t - s) / (o - s), this.labels.push(this.addSubView(i = new n({
						cssClass: "sliderbar-label",
						partial: "" + t
					}))), i.setX("" + r + "%")
				}, e.prototype.addLabels = function () {
					var t, e, n, i, o, s, r, a, l, u, c;
					if (l = this.getOptions(), e = l.maxValue, n = l.minValue, t = l.interval, i = l.showLabels, Array.isArray(i)) {
						for (u = [], s = 0, a = i.length; a > s; s++) o = i[s], u.push(this._createLabel(o));
						return u
					}
					for (c = [], o = r = n; t > 0 ? e >= r : r >= e; o = r += t) c.push(this._createLabel(o));
					return c
				}, e.prototype.getValues = function () {
					var t, e, n, i, o;
					for (i = this.handles, o = [], e = 0, n = i.length; n > e; e++) t = i[e], o.push(t.getOptions().value);
					return o
				}, e.prototype.setValue = function (t, e, n) {
					return null == e && (e = this.handles.first), null == n && (n = !0), n && e.setValue(t), this.getOption("drawBar") && this.drawBar(), this.getOption("drawOpposite") && this.drawOppositeBar(), this.setLimits(), this.emit("ValueIsChanging", e.value), this.emit("ValueChanged", e)
				}, e.prototype.setLimits = function () {
					var t, e, n, i, o, s, r, a, l, u, c, p, h;
					if (l = this.getOptions(), i = l.maxValue, o = l.minValue, n = l.interval, 1 === this.handles.length) return this.handles.first.options.leftLimit = o, this.handles.first.options.rightLimit = i;
					for (u = this.handles, h = [], e = r = 0, a = u.length; a > r; e = ++r) t = u[e], s = t.getOptions(), s.leftLimit = (null != (c = this.handles[e - 1]) ? c.value : void 0) + n || o, h.push(s.rightLimit = (null != (p = this.handles[e + 1]) ? p.value : void 0) - n || i);
					return h
				}, e.prototype.attachEvents = function () {
					return this.on("click", function (t) {
						var e, n, i, o, s, r, a, l, u, c, p, h, d, f, m;
						for (f = this.getOptions(), r = f.maxValue, a = f.minValue, u = this.getWidth(), e = t.pageX - this.getBounds().x, n = (r - a) * e / u + a, c = this.handles.first.getSnappedValue(n), i = null, l = null, m = this.handles, h = 0, d = m.length; d > h; h++) s = m[h], p = s.value, o = Math.abs(n - p), (l > o || !l) && (l = o, i = s);
						return i.setValue(c)
					})
				}, e.prototype.viewAppended = function () {
					return this.setWidth(this.getOption("width")), this.createHandles(), this.setLimits(), this.getOption("drawBar") && this.drawBar(), this.getOption("drawOpposite") && this.drawOppositeBar(), this.getOption("showLabels") && this.addLabels(), this.attachEvents()
				}, e
			}(n)
		}, {
			"./../../core/customhtmlview.coffee": 97,
			"./sliderbarhandleview.coffee": 70
		}
	],
	72: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("kd-page", t.cssClass), e.__super__.constructor.call(this, t, n), this._currentCssClass = null
				}
				return s(e, t), e.prototype.move = function (t) {
					return t ? (this.unsetClass(this._currentCssClass), this._currentCssClass = t, this.setClass(t)) : void 0
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	73: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i, o, s, r, a, l, u, c;
					null == t && (t = {}), t.cssClass = KD.utils.curry("kd-slide", t.cssClass), null == t.animation && (t.animation = "move"), null == t.direction && (t.direction = "leftToRight"), null == t.touchEnabled && (t.touchEnabled = !0), e.__super__.constructor.call(this, t, n), this.pages = [], this._coordsY = [], this._currentX = 0, c = this.getOptions(), i = c.animation, o = c.direction, u = c.touchEnabled, a = [
						["" + i + "FromTop", "" + i + "FromBottom"],
						["" + i + "ToBottom", "" + i + "ToTop"]
					], r = [
						["" + i + "FromLeft", "" + i + "FromRight"],
						["" + i + "ToRight", "" + i + "ToLeft"]
					], "topToBottom" === o ? (this.xcoordAnimations = a, this.ycoordAnimations = r, l = ["nextSubPage", "previousSubPage", "nextPage", "previousPage"]) : (this.xcoordAnimations = r, this.ycoordAnimations = a, l = ["nextPage", "previousPage", "nextSubPage", "previousSubPage"]), u && (s = Hammer(this.getElement()), s.on("swipeleft", this.bound(l[0])), s.on("swiperight", this.bound(l[1])), s.on("swipeup", this.bound(l[2])), s.on("swipedown", this.bound(l[3])), s.on("touchmove", function (t) {
						return t.preventDefault()
					}))
				}
				var n, i, o;
				return s(e, t), o = [1, 2], n = o[0], i = o[1], e.prototype.addPage = function (t) {
					return this.addSubView(t), 0 === this.pages.length && (t.setClass("current"), this.currentPage = t), this.pages.push([t]), this._coordsY.push(0)
				}, e.prototype.addSubPage = function (t) {
					var e;
					return this.addSubView(t), e = this.pages.last, e.push(t)
				}, e.prototype.nextPage = function () {
					return this.jump(this._currentX + 1, n)
				}, e.prototype.previousPage = function () {
					return this.jump(this._currentX - 1, n)
				}, e.prototype.nextSubPage = function () {
					return this.jump(this._coordsY[this._currentX] + 1, i)
				}, e.prototype.previousSubPage = function () {
					return this.jump(this._coordsY[this._currentX] - 1, i)
				}, e.prototype.jump = function (t, e, i) {
					var o, s, r, a, l, u, c, p;
					return null == e && (e = 1), null == i && (i = noop), e === n ? (c = [this.pages, this._currentX], u = c[0], o = c[1]) : (p = [this.pages[this._currentX], this._coordsY[this._currentX]], u = p[0], o = p[1]), u.length <= 1 || (a = Math.min(u.length - 1, Math.max(0, t)), o === a) ? void 0 : (r = o > a ? 0 : 1, e === n ? (s = u[o][this._coordsY[o]], l = u[a][this._coordsY[a]], this._currentX = a, l.move(this.xcoordAnimations[0][r]), s.move(this.xcoordAnimations[1][r])) : (s = u[o], l = u[a], this._coordsY[this._currentX] = a, l.move(this.ycoordAnimations[0][r]), s.move(this.ycoordAnimations[1][r])), this.emit("CurrentPageChanged", {
						x: this._currentX,
						y: this._coordsY[this._currentX]
					}), l.setClass("current"), this.currentPage = l, this.utils.wait(600, function () {
						return s.unsetClass("current"), i()
					}))
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	74: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./../../core/view.coffee"), i = t("./splitview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass || (t.cssClass = "kdsplitcomboview"), e.__super__.constructor.call(this, t, n), this.init(t)
				}
				return r(e, t), e.prototype.init = function (t) {
					return this.addSubView(this.createSplitView(t.direction, t.sizes, t.views))
				}, e.prototype.createSplitView = function (t, e, n) {
					var o, s, r, a, l, u;
					for (a = [], s = l = 0, u = n.length; u > l; s = ++l) o = n[s], "split" === o.type ? (r = o.options, a.push(this.createSplitView(r.direction, r.sizes, o.views))) : a.push(o);
					return new i({
						type: t,
						sizes: e,
						views: a
					})
				}, e
			}(o)
		}, {
			"./../../core/view.coffee": 108,
			"./splitview.coffee": 77
		}
	],
	75: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../scrollview/scrollview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), null == t.fixed && (t.fixed = !1), t.minimum || (t.minimum = null), t.maximum || (t.maximum = null), t.view || (t.view = null), e.__super__.constructor.call(this, t, n), this.isVertical = "vertical" === this.getOptions().type.toLowerCase(), this.isFixed = this.getOptions().fixed, i = this.options, this.size = i.size, this.minimum = i.minimum, this.maximum = i.maximum
				}
				return s(e, t), e.prototype._getIndex = function () {
					return this.parent.getPanelIndex(this)
				}, e.prototype._getSize = function () {
					return this.isVertical ? this.getWidth() : this.getHeight()
				}, e.prototype._setSize = function (t) {
					return this._wouldResize(t) ? (0 > t && (t = 0), this.isVertical ? this.setWidth(t) : this.setHeight(t), this.parent.sizes[this._getIndex()] = this.size = t, this.parent.emit("PanelDidResize", {
						panel: this
					}), this.emit("PanelDidResize", {
						newSize: t
					}), t) : !1
				}, e.prototype._wouldResize = function (t) {
					return null == this.minimum && (this.minimum = -1), null == this.maximum && (this.maximum = 99999), t > this.minimum && t < this.maximum ? !0 : (t < this.minimum ? this.parent._panelReachedMinimum(this._getIndex()) : t > this.maximum && this.parent._panelReachedMaximum(this._getIndex()), !1)
				}, e.prototype._setOffset = function (t) {
					return 0 > t && (t = 0), this.$().css(this.isVertical ? {
						left: t
					} : {
						top: t
					}), this.parent.panelsBounds[this._getIndex()] = t
				}, e.prototype._getOffset = function () {
					return this.isVertical ? this.getRelativeX() : this.getRelativeY()
				}, e.prototype._animateTo = function (t, e, n) {
					var i, o, s, r, a;
					return "undefined" == typeof n && "function" == typeof e && (n = e), n || (n = noop), r = this, o = r.parent.options.duration, i = function () {
						var t;
						return t = r._getSize(), r.parent.sizes[r.index] = r.size = t, r.parent.emit("PanelDidResize", {
							panel: r
						}), r.emit("PanelDidResize", {
							newSize: t
						}), n.call(r)
					}, a = {}, 0 > t && (t = 0), r.isVertical ? (a.width = t, null != e && (a.left = e)) : (a.height = t, null != e && (a.top = e)), s = {
						duration: o,
						complete: i
					}, r.$().stop(), r.$().animate(a, s)
				}, e
			}(n)
		}, {
			"./../scrollview/scrollview.coffee": 69
		}
	],
	76: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i, o;
					null == t && (t = {}), this.isVertical = "vertical" === t.type.toLowerCase(), i = this.isVertical ? "x" : "y", null == t.draggable && (t.draggable = {
						axis: i
					}), e.__super__.constructor.call(this, t, n), o = this.getOptions(), this.panel0 = o.panel0, this.panel1 = o.panel1, this.on("DragFinished", this.dragFinished), this.on("DragInAction", this.dragInAction), this.on("DragStarted", this.dragStarted)
				}
				return s(e, t), e.prototype._setOffset = function (t) {
					return 0 > t && (t = 0), this.$().css(this.isVertical ? {
						left: t - 5
					} : {
						top: t - 5
					})
				}, e.prototype._getOffset = function () {
					return this.isVertical ? this.getRelativeX() : this.getRelativeY()
				}, e.prototype._animateTo = function (t) {
					var e;
					return e = this.parent.options.duration, this.isVertical ? (t -= this.getWidth() / 2, this.$().animate({
						left: t
					}, e)) : (t -= this.getHeight() / 2, this.$().animate({
						top: t
					}, e))
				}, e.prototype.dragFinished = function (t) {
					return this.parent._resizeDidStop(t)
				}, e.prototype.dragStarted = function () {
					return this.parent._resizeDidStart(), this.rOffset = this._getOffset(), this.p0Size = this.panel0._getSize(), this.p1Size = this.panel1._getSize(), this.p1Offset = this.panel1._getOffset()
				}, e.prototype.dragInAction = function (t, e) {
					var n, i, o, s;
					if (this.isVertical) {
						if (i = this.panel0._wouldResize(t + this.p0Size), i && (s = this.panel1._wouldResize(-t + this.p1Size)), this.dragIsAllowed = s ? (this.panel0._setSize(t + this.p0Size), this.panel1._setSize(-t + this.p1Size), !0) : (this._setOffset(this.panel1._getOffset()), !1), this.dragIsAllowed) return this.panel1._setOffset(t + this.p1Offset)
					} else if (i = this.panel0._wouldResize(e + this.p0Size), s = this.panel1._wouldResize(-e + this.p1Size), n = i && s ? this.panel0._setSize(e + this.p0Size) : !1, o = i && s ? this.panel1._setSize(-e + this.p1Size) : !1, n && o) return this.panel1._setOffset(e + this.p1Offset)
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	77: [
		function (t, e) {
			var n, i, o, s, r, a = {}.hasOwnProperty,
				l = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) a.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../../core/kd.coffee"), r = t("./../../core/view.coffee"), s = t("./splitpanel.coffee"), i = t("./splitresizer.coffee"), e.exports = o = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.type || (t.type = "vertical"), null == t.resizable && (t.resizable = !0), t.sizes || (t.sizes = ["50%", "50%"]), t.minimums || (t.minimums = null), t.maximums || (t.maximums = null), t.views || (t.views = null), t.fixed || (t.fixed = []), t.duration || (t.duration = 200), t.separator || (t.separator = null), null == t.colored && (t.colored = !1), null == t.animated && (t.animated = !0), t.type = t.type.toLowerCase(), e.__super__.constructor.call(this, t, n), this.setClass("kdsplitview kdsplitview-" + this.getOptions().type + " " + this.getOptions().cssClass), this.panels = [], this.panelsBounds = [], this.resizers = [], this.sizes = []
				}
				return l(e, t), e.prototype.viewAppended = function () {
					return this._sanitizeSizes(), this._createPanels(), this._calculatePanelBounds(), this._putPanels(), this._setPanelPositions(), this._putViews(), this.getOptions().resizable && this.panels.length && this._createResizers(), this.listenWindowResize()
				}, e.prototype._createPanels = function () {
					var t, e;
					return e = this.getOptions().sizes.length, this.panels = function () {
						var n, i;
						for (i = [], t = n = 0; e >= 0 ? e > n : n > e; t = e >= 0 ? ++n : --n) i.push(this._createPanel(t));
						return i
					}.call(this)
				}, e.prototype._createPanel = function (t) {
					var e, n, i, o, r, a;
					return a = this.getOptions(), r = a.type, e = a.fixed, i = a.minimums, n = a.maximums, o = new s({
						cssClass: "kdsplitview-panel panel-" + t,
						index: t,
						type: r,
						size: this._sanitizeSize(this.sizes[t]),
						fixed: null != e[t],
						minimum: i ? this._sanitizeSize(i[t]) : void 0,
						maximum: n ? this._sanitizeSize(n[t]) : void 0
					}), o.on("KDObjectWillBeDestroyed", function (t) {
						return function () {
							return t._panelIsBeingDestroyed(o)
						}
					}(this)), this.emit("SplitPanelCreated", o), o
				}, e.prototype._calculatePanelBounds = function () {
					var t, e, n, i;
					return this.panelsBounds = function () {
						var o, s, r, a, l;
						for (a = this.sizes, l = [], t = o = 0, r = a.length; r > o; t = ++o)
							if (i = a[t], 0 === t) l.push(0);
							else {
								for (e = 0, n = s = 0; t >= 0 ? t > s : s > t; n = t >= 0 ? ++s : --s) e += this.sizes[n];
								l.push(e)
							}
						return l
					}.call(this)
				}, e.prototype._putPanels = function () {
					var t, e, i, o, s;
					for (o = this.panels, s = [], e = 0, i = o.length; i > e; e++) t = o[e], this.addSubView(t), s.push(this.getOptions().colored ? t.$().css({
						backgroundColor: n.utils.getRandomRGB()
					}) : void 0);
					return s
				}, e.prototype._setPanelPositions = function () {
					var t, e, n, i, o;
					for (o = this.panels, t = n = 0, i = o.length; i > n; t = ++n) e = o[t], e._setSize(this.sizes[t]), e._setOffset(this.panelsBounds[t]);
					return !1
				}, e.prototype._panelIsBeingDestroyed = function (t) {
					var e, n;
					return e = this.getPanelIndex(t), n = this.getOptions(), this.panels = this.panels.slice(0, e).concat(this.panels.slice(e + 1)), this.sizes = this.sizes.slice(0, e).concat(this.sizes.slice(e + 1)), this.panelsBounds = this.panelsBounds.slice(0, e).concat(this.panelsBounds.slice(e + 1)), n.minimums.splice(e, 1), n.maximums.splice(e, 1), null != n.views[e] ? n.views.splice(e, 1) : void 0
				}, e.prototype._createResizers = function () {
					var t;
					return this.resizers = function () {
						var e, n, i;
						for (i = [], t = e = 1, n = this.sizes.length; n >= 1 ? n > e : e > n; t = n >= 1 ? ++e : --e) i.push(this._createResizer(t));
						return i
					}.call(this), this._repositionResizers()
				}, e.prototype._createResizer = function (t) {
					var e;
					return this.addSubView(e = new i({
						cssClass: "kdsplitview-resizer " + this.getOptions().type,
						type: this.getOptions().type,
						panel0: this.panels[t - 1],
						panel1: this.panels[t]
					})), e
				}, e.prototype._repositionResizers = function () {
					var t, e, n, i, o, s;
					for (o = this.resizers, s = [], t = n = 0, i = o.length; i > n; t = ++n) e = o[t], s.push(e._setOffset(this.panelsBounds[t + 1]));
					return s
				}, e.prototype._putViews = function () {
					var t, e, n, i, o, s, a;
					for (null == (n = this.getOptions()).views && (n.views = []), s = this.getOptions().views, a = [], t = i = 0, o = s.length; o > i; t = ++i) e = s[t], a.push(e instanceof r ? this.setView(e, t) : void 0);
					return a
				}, e.prototype._sanitizeSizes = function () {
					var t, e, n, i, o, s, r, a, l;
					return this._setMinsAndMaxs(), o = this.getOptions(), n = 0, l = 0, a = this._getSize(), e = function () {
						var e, i, a, u;
						for (a = o.sizes, u = [], t = e = 0, i = a.length; i > e; t = ++e) r = a[t], null === r ? (n++, u.push(null)) : (s = this._sanitizeSize(r), this._getLegitPanelSize(r, t), l += s, u.push(s));
						return u
					}.call(this), this.sizes = function () {
						var t, o, s;
						for (s = [], t = 0, o = e.length; o > t; t++) r = e[t], null === r ? (i = (a - l) / n, s.push(Math.round(i))) : s.push(Math.round(r));
						return s
					}(), this.sizes
				}, e.prototype._sanitizeSize = function (t) {
					var e;
					return "number" == typeof t || /px$/.test(t) ? parseInt(t, 10) : /%$/.test(t) ? (e = this._getSize(), e / 100 * parseInt(t, 10)) : void 0
				}, e.prototype._setMinsAndMaxs = function () {
					var t, e, n, i, o, s;
					for (null == (n = this.getOptions()).minimums && (n.minimums = []), null == (i = this.getOptions()).maximums && (i.maximums = []), e = this.getOptions().sizes.length || 2, s = [], t = o = 0; e >= 0 ? e > o : o > e; t = e >= 0 ? ++o : --o) this.getOptions().minimums[t] = this.getOptions().minimums[t] ? this._sanitizeSize(this.getOptions().minimums[t]) : -1, s.push(this.getOptions().maximums[t] = this.getOptions().maximums[t] ? this._sanitizeSize(this.getOptions().maximums[t]) : 99999);
					return s
				}, e.prototype._getSize = function () {
					return "vertical" === this.getOptions().type ? this.getWidth() : this.getHeight()
				}, e.prototype._setSize = function (t) {
					return "vertical" === this.getOptions().type ? this.setWidth(t) : this.setHeight(t)
				}, e.prototype._getParentSize = function () {
					var t, e;
					return e = this.getOptions().type, t = this.$().parent(), "vertical" === e ? t.width() : t.height()
				}, e.prototype._getLegitPanelSize = function (t, e) {
					return t = this.getOptions().minimums[e] > t ? this.getOptions().minimums[e] : this.getOptions().maximums[e] < t ? this.getOptions().maximums[e] : t
				}, e.prototype._resizePanels = function () {
					return this._sanitizeSizes()
				}, e.prototype._repositionPanels = function () {
					return this._calculatePanelBounds(), this._setPanelPositions()
				}, e.prototype._windowDidResize = function () {
					return this._setSize(this._getParentSize()), this._resizePanels(), this._repositionPanels(), this._setPanelPositions(), this.getOptions().resizable ? this._repositionResizers() : void 0
				}, e.prototype.mouseUp = function (t) {
					return this.$().unbind("mousemove.resizeHandle"), this._resizeDidStop(t)
				}, e.prototype._panelReachedMinimum = function (t) {
					return this.panels[t].emit("PanelReachedMinimum"), this.emit("PanelReachedMinimum", {
						panel: this.panels[t]
					})
				}, e.prototype._panelReachedMaximum = function (t) {
					return this.panels[t].emit("PanelReachedMaximum"), this.emit("PanelReachedMaximum", {
						panel: this.panels[t]
					})
				}, e.prototype._resizeDidStart = function (t) {
					return $("body").addClass("resize-in-action"), this.emit("ResizeDidStart", {
						orgEvent: t
					})
				}, e.prototype._resizeDidStop = function (t) {
					return this.emit("ResizeDidStop", {
						orgEvent: t
					}), this.utils.wait(300, function () {
						return $("body").removeClass("resize-in-action")
					})
				}, e.prototype.isVertical = function () {
					return "vertical" === this.getOptions().type
				}, e.prototype.getPanelIndex = function (t) {
					var e, n, i, o, s;
					for (s = this.panels, e = i = 0, o = s.length; o > i; e = ++i)
						if (n = s[e], n.getId() === t.getId()) return e
				}, e.prototype.hidePanel = function (t, e) {
					var n;
					return null == e && (e = noop), n = this.panels[t], n._lastSize = n._getSize(), this.resizePanel(0, t, function (i) {
						return function () {
							return e.call(i, {
								panel: n,
								index: t
							})
						}
					}(this))
				}, e.prototype.showPanel = function (t, e) {
					var n, i;
					return null == e && (e = noop), i = this.panels[t], n = i._lastSize || this.getOptions().sizes[t] || 200, i._lastSize = null, this.resizePanel(n, t, function () {
						return e.call(this, {
							panel: i,
							index: t
						})
					})
				}, e.prototype.resizePanel = function (t, e, n) {
					var i, o, s, r, a, l, u, c, p, h, d, f, m, g;
					if (null == t && (t = 0), null == e && (e = 0), null == n && (n = noop), this._resizeDidStart(), t = this._sanitizeSize(t), c = this.panels[e], i = !1, c.size === t) return this._resizeDidStop(), void n();
					if (p = this.panels.length - 1 !== e ? (r = e + 1, this.getOptions().resizable ? f = this.resizers[e] : void 0, this.panels[r]) : (i = !0, r = e - 1, this.getOptions().resizable ? f = this.resizers[r] : void 0, this.panels[r]), g = c.size + p.size, t > g) return !1;
					if (s = this._getLegitPanelSize(t, e), m = c.size - s, a = p.size + m, u = this._getLegitPanelSize(a, r), d = 0, h = function (t) {
						return function () {
							return d++, 2 === d ? (t._resizeDidStop(), n()) : void 0
						}
					}(this), i) {
						if (o = c._getOffset() + m, this.getOptions().animated) {
							if (c._animateTo(s, o, h), p._animateTo(u, h), f) return f._animateTo(o)
						} else if (c._setSize(s), c._setOffset(o), h(), p._setSize(u), h(), f) return f._setOffset(o)
					} else if (l = p._getOffset() - m, this.getOptions().animated) {
						if (c._animateTo(s, h), p._animateTo(u, l, h), f) return f._animateTo(l)
					} else if (c._setSize(s), h(), p._setSize(u, p._setOffset(l)), h(), f) return f._setOffset(l)
				}, e.prototype.splitPanel = function (t) {
					var e, n, i, o, s, r, a, l, u, c, p, h, d, f;
					for (s = {}, l = this.getOptions(), n = this.resizers[t] ? !1 : !0, p = this.panels[t], this.panels.splice(t + 1, 0, o = this._createPanel(t)), this.sizes.splice(t + 1, 0, this.sizes[t] / 2), this.sizes[t] = this.sizes[t] / 2, l.minimums.splice(t + 1, 0, s.minimum), l.maximums.splice(t + 1, 0, s.maximum), l.views.splice(t + 1, 0, s.view), l.sizes = this.sizes, this.subViews.push(o), o.setParent(this), p.$().after(o.$()), o.emit("viewAppended"), a = p._getSize() / 2, p._setSize(a), o._setSize(a), o._setOffset(p._getOffset() + a), this._calculatePanelBounds(), f = this.panels.slice(t + 1, this.panels.length), e = h = 0, d = f.length; d > h; e = ++h) c = f[e], c.index = i = t + 1 + e, c.unsetClass("panel-" + (t + e)).setClass("panel-" + i);
					return this.getOptions().resizable && (n ? (this.resizers.push(r = this._createResizer(t + 1)), r._setOffset(this.panelsBounds[t + 1])) : (u = this.resizers[t], u._setOffset(this.panelsBounds[t + 1]), u.panel0 = p, u.panel1 = o, this.resizers.splice(t + 1, 0, r = this._createResizer(t + 2)), r._setOffset(this.panelsBounds[t + 2]))), this.emit("panelSplitted", o), o
				}, e.prototype.removePanel = function (t) {
					var e, n, i, o;
					return e = this.panels.length, 1 === e ? (warn("this is the only panel left"), !1) : (n = this.panels[t], n.destroy(), 0 === t ? (i = this.resizers.shift(), i.destroy(), (o = this.resizers[0]) && (o.panel0 = this.panels[0], o.panel1 = this.panels[1])) : t === e - 1 ? (i = this.resizers.pop(), i.destroy(), (o = this.resizers[e - 2]) && (o.panel0 = this.panels[e - 2], o.panel1 = this.panels[e - 1])) : (i = this.resizers.splice(t - 1, 1)[0], i.destroy(), this.resizers[t - 1].panel0 = this.panels[t - 1], this.resizers[t - 1].panel1 = this.panels[t]), !0)
				}, e.prototype.setView = function (t, e) {
					return e > this.panels.length || !t ? void warn("Either 'view' or 'index' is missing at KDSplitView::setView!") : this.panels[e].addSubView(t)
				}, e
			}(r)
		}, {
			"./../../core/kd.coffee": 100,
			"./../../core/view.coffee": 108,
			"./splitpanel.coffee": 75,
			"./splitresizer.coffee": 76
		}
	],
	78: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), e.__super__.constructor.call(this, t, n), this.tabs = new i({
						cssClass: "kdtabhandle-tabs clearfix"
					})
				}
				return s(e, t), e.prototype.viewAppended = function () {
					return this.addSubView(this.tabs)
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	79: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../../core/customhtmlview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.cssClass = KD.utils.curry("kdtabhandle-movenav", t.cssClass), e.__super__.constructor.call(this, t, n), this._current = 0
				}
				return s(e, t), e.prototype.viewAppended = function () {
					return this.addSubView(this.left = new n({
						cssClass: "leftButton",
						click: function (t) {
							return function () {
								return t.move("right")
							}
						}(this)
					})), this.addSubView(this.right = new n({
						cssClass: "rightButton",
						click: function (t) {
							return function () {
								return t.move("left")
							}
						}(this)
					})), this.listenWindowResize()
				}, e.prototype._windowDidResize = function () {
					var t;
					return t = this.getDelegate(), t.getWidth() > t._tabsWidth + 50 ? (this.move("initial"), this.hide()) : this.show()
				}, e.prototype.move = function (t) {
					var e, n, i;
					switch (i = (e = this.getDelegate()).tabHandleContainer, n = e.getOption("maxHandleWidth"), t) {
					case "left":
						if (n * e.handles.length + 100 < i.getWidth() - this._current) return;
						this._current -= n;
						break;
					case "right":
						if (0 === this._current) return;
						this._current += n;
						break;
					case "initial":
						this._current = 0
					}
					return i.tabs.setCss("marginLeft", "" + this._current + "px")
				}, e
			}(n)
		}, {
			"./../../core/customhtmlview.coffee": 97
		}
	],
	80: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == t.hidden && (t.hidden = !1), t.title || (t.title = "Title"), null == t.pane && (t.pane = null), null == t.view && (t.view = null), null == t.sortable && (t.sortable = !1), null == t.closable && (t.closable = !0), null == t.addTitleAttribute && (t.addTitleAttribute = !0), t.sortable && (t.draggable = {
						axis: "x"
					}, this.dragStartPosX = null), e.__super__.constructor.call(this, t, n), this.on("DragStarted", function (t) {
						return function (e, n) {
							return t.startedDragFromCloseElement = $(e.target).hasClass("close-tab"), t.handleDragStart(e, n)
						}
					}(this)), this.on("DragInAction", function (t) {
						return function (e, n) {
							return t.startedDragFromCloseElement && (t.dragIsAllowed = !1), t.handleDragInAction(e, n)
						}
					}(this)), this.on("DragFinished", function (t) {
						return function (e) {
							return t.handleDragFinished(e), t.getDelegate().showPaneByIndex(t.index)
						}
					}(this))
				}
				return s(e, t), e.prototype.setDomElement = function (t) {
					var e, n, i, o, s, r, a;
					return null == t && (t = ""), a = this.getOptions(), o = a.hidden, n = a.closable, s = a.tagName, r = a.title, e = a.addTitleAttribute, t = o ? "" + t + " hidden" : t, i = n ? "<span class='close-tab'></span>" : "", r = e ? "title='" + r + "'" : "", this.domElement = $("<" + s + " " + r + " class='kdtabhandle " + t + "'>" + i + "</" + s + ">")
				}, e.prototype.viewAppended = function () {
					var t;
					return t = this.getOptions().view, t && t instanceof i ? this.addSubView(t) : this.setPartial(this.partial())
				}, e.prototype.partial = function () {
					return "<b>" + (this.getOptions().title || "Default Title") + "</b>"
				}, e.prototype.makeActive = function () {
					return this.getDomElement().addClass("active")
				}, e.prototype.makeInactive = function () {
					return this.getDomElement().removeClass("active")
				}, e.prototype.setTitle = function (t) {
					return this.setAttribute("title", t)
				}, e.prototype.isHidden = function () {
					return this.getOptions().hidden
				}, e.prototype.getWidth = function () {
					return this.$().outerWidth(!1) || 0
				}, e.prototype.cloneElement = function () {
					var t, e, n;
					if (!this.$cloned) return e = this.getOptions().pane, n = e.getDelegate(), t = n.tabHandleContainer, this.$cloned = this.$().clone(), t.$().append(this.$cloned), this.$cloned.css({
						marginLeft: -(n.handles.length - this.index) * this.getWidth()
					})
				}, e.prototype.updateClonedElementPosition = function (t) {
					return this.$cloned.css({
						left: t
					})
				}, e.prototype.reorderTabHandles = function (t) {
					var e, n, i, o;
					if (e = this.dragState.direction, o = this.getWidth(), "left" === e.current.x) {
						if (i = this.index - 1, n = -(o * this.draggedItemIndex - o * i - o / 2), n > t) return this.emit("HandleIndexHasChanged", this.index, "left"), this.index--
					} else if (i = this.index + 1, n = o * i - o * this.draggedItemIndex - o / 2, t > n) return this.emit("HandleIndexHasChanged", this.index, "right"), this.index++
				}, e.prototype.handleDragStart = function () {
					var t, e, n;
					return e = this.getOptions().pane, n = e.getDelegate(), t = n.handles, this.index = t.indexOf(this), this.draggedItemIndex = this.index
				}, e.prototype.handleDragInAction = function (t) {
					return this.dragIsAllowed ? -(this.draggedItemIndex * this.getWidth()) > t ? this.$().css({
						left: 0
					}) : (this.unsetClass("first"), this.cloneElement(t), this.$().css({
						opacity: 0
					}), this.updateClonedElementPosition(t), this.reorderTabHandles(t)) : void 0
				}, e.prototype.handleDragFinished = function () {
					return this.$cloned ? (this.$cloned.remove(), this.$().css({
						left: "",
						opacity: 1,
						marginLeft: ""
					}), this.targetTabHandle || 0 !== this.draggedItemIndex || this.$().css({
						left: 0
					}), this.targetTabHandle = null, this.$cloned = null) : void 0
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	81: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), null == t.hiddenHandle && (t.hiddenHandle = !1), t.name || (t.name = ""), i = "kdtabpaneview kdhiddentab " + KD.utils.slugify(t.name.toLowerCase()) + " clearfix", t.cssClass = KD.utils.curry(i, t.cssClass), e.__super__.constructor.call(this, t, n), this.name = t.name, this.lastScrollTops = {
						window: 0,
						parent: 0,
						self: 0,
						body: 0
					}, this.on("KDTabPaneActive", this.bound("setMainView")), this.on("KDTabPaneLazyViewAdded", this.bound("fireLazyCallback"))
				}
				return s(e, t), e.prototype.show = function () {
					var t;
					return this.setClass("active"), this.unsetClass("kdhiddentab"), this.getOption("detachable") && null != (t = this.parent) && t.getElement().appendChild(this.getElement()), this.active = !0, this.emit("KDTabPaneActive"), KD.utils.defer(function (t) {
						return function () {
							var e;
							return t.getElement().scrollTop = t.lastScrollTops.self, null != (e = t.parent) ? e.getElement().scrollTop = t.lastScrollTops.parent : void 0
						}
					}(this))
				}, e.prototype.hide = function () {
					var t, e;
					if (this.active) return this.lastScrollTops.parent = (null != (t = this.parent) ? t.getElement().scrollTop : void 0) || 0, this.lastScrollTops.self = this.getElement().scrollTop, this.setClass("kdhiddentab"), this.unsetClass("active"), this.active && this.getOption("detachable") && null != (e = this.parent) && e.getElement().removeChild(this.getElement()), this.active = !1, this.emit("KDTabPaneInactive")
				}, e.prototype.setTitle = function (t) {
					return this.getDelegate().setPaneTitle(this, t), this.name = t
				}, e.prototype.getHandle = function () {
					return this.getDelegate().getHandleByPane(this)
				}, e.prototype.hideTabCloseIcon = function () {
					return this.getDelegate().hideCloseIcon(this)
				}, e.prototype.setMainView = function (t) {
					var e, n, o, s, r;
					if (t || (r = this.getOptions(), t = r.view, s = r.viewOptions), !this.mainView && (t || s)) {
						if (t instanceof i) this.mainView = this.addSubView(t);
						else {
							if (!s) return warn("probably you set a weird lazy view!");
							o = s.viewClass, n = s.options, e = s.data, this.mainView = this.addSubView(new o(n, e))
						}
						return this.emit("KDTabPaneLazyViewAdded", this, this.mainView), this.mainView
					}
				}, e.prototype.getMainView = function () {
					return this.mainView
				}, e.prototype.destroyMainView = function () {
					return this.mainView.destroy(), delete this.mainView
				}, e.prototype.fireLazyCallback = function (t, e) {
					var n, i;
					return i = this.getOptions().viewOptions, i && (n = i.callback) ? n.call(this, t, e) : void 0
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	82: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../scrollview/scrollview.coffee"), i = t("./tabhandlecontainer.coffee"), o = t("./tabhandlemovenav.coffee"), e.exports = s = function (t) {
				function e(t, n) {
					var i;
					null == t && (t = {}), null == t.resizeTabHandles && (t.resizeTabHandles = !1), null == t.maxHandleWidth && (t.maxHandleWidth = 128), null == t.minHandleWidth && (t.minHandleWidth = 30), null == t.lastTabHandleMargin && (t.lastTabHandleMargin = 0), null == t.sortable && (t.sortable = !1), null == t.hideHandleContainer && (t.hideHandleContainer = !1), null == t.hideHandleCloseIcons && (t.hideHandleCloseIcons = !1), null == t.enableMoveTabHandle && (t.enableMoveTabHandle = !1), null == t.detachPanes && (t.detachPanes = !0), null == t.tabHandleContainer && (t.tabHandleContainer = null), t.tabHandleClass || (t.tabHandleClass = KDTabHandleView), t.paneData || (t.paneData = []), t.cssClass = KD.utils.curry("kdtabview", t.cssClass), this.handles = [], this.panes = [], this.selectedIndex = [], this.tabConstructor = null != (i = t.tabClass) ? i : KDTabPaneView, this.lastOpenPaneIndex = 0, e.__super__.constructor.call(this, t, n), this.activePane = null, this.handlesHidden = !1, this.blockTabHandleResize = !1, this.setTabHandleContainer(t.tabHandleContainer), t.enableMoveTabHandle && this.setTabHandleMoveNav(), t.hideHandleCloseIcons && this.hideHandleCloseIcons(), t.hideHandleContainer && this.hideHandleContainer(), this.on("PaneRemoved", function (t) {
						return function () {
							return t.resizeTabHandles()
						}
					}(this)), this.on("PaneAdded", function (t) {
						return function () {
							return t.blockTabHandleResize = !1, t.resizeTabHandles()
						}
					}(this)), this.on("PaneDidShow", this.bound("setActivePane")), t.paneData.length > 0 && this.on("viewAppended", function (e) {
						return function () {
							return e.createPanes(t.paneData)
						}
					}(this)), this.tabHandleContainer.on("mouseleave", function (t) {
						return function () {
							return t.blockTabHandleResize ? (t.blockTabHandleResize = !1, t.resizeTabHandles()) : void 0
						}
					}(this))
				}
				return a(e, t), e.prototype.createPanes = function (t) {
					var e, n, i, o;
					for (null == t && (t = this.getOptions().paneData), o = [], n = 0, i = t.length; i > n; n++) e = t[n], o.push(this.addPane(new this.tabConstructor(e, null)));
					return o
				}, e.prototype.addPane = function (t, e) {
					var n, i, o, s, r, a, l, u, c, p, h, d, f, m, g;
					return null == e && (e = !0), t instanceof KDTabPaneView ? (f = this.getOptions(), p = f.tabHandleClass, c = f.sortable, i = f.detachPanes, t.setOption("detachable", i), this.panes.push(t), m = t.getOptions(), l = m.name, d = m.title, o = m.hiddenHandle, h = m.tabHandleView, n = m.closable, s = m.lazy, this.addHandle(u = new p({
						pane: t,
						title: l || d,
						hidden: o,
						cssClass: KD.utils.slugify(l.toLowerCase()),
						view: h,
						closable: n,
						sortable: c,
						click: function (t) {
							return function (e) {
								return t.handleMouseDownDefaultAction(u, e)
							}
						}(this)
					})), t.tabHandle = u, this.appendPane(t), e && !s && this.showPane(t), this.emit("PaneAdded", t), g = this.getOptions(), a = g.minHandleWidth, r = g.maxHandleWidth, u.getDomElement().css({
						maxWidth: r,
						minWidth: a
					}), u.on("HandleIndexHasChanged", this.bound("resortTabHandles")), t) : (l = (null != (null != t ? t.constructor : void 0)).name, warn("You can't add " + (l ? l : void 0) + " as a pane, use KDTabPaneView instead"), !1)
				}, e.prototype.resortTabHandles = function (t, e) {
					var n, i, o, s, r;
					if (!(0 === t && "left" === e || t === this.handles.length - 1 && "right" === e || t >= this.handles.length || 0 > t)) return this.handles[0].unsetClass("first"), "right" === e ? (n = "insertAfter", r = t + 1) : (n = "insertBefore", r = t - 1), this.handles[t].$()[n](this.handles[r].$()), i = "left" === e ? t - 1 : t + 1, o = this.handles.splice(t, 1), s = this.panes.splice(t, 1), this.handles.splice(i, 0, o[0]), this.panes.splice(i, 0, s[0]), this.handles[0].setClass("first"), this.emit("TabsSorted")
				}, e.prototype.removePane = function (t) {
					var e, n, i, o, s;
					return t.emit("KDTabPaneDestroy"), i = this.getPaneIndex(t), o = this.getActivePane() === t, this.panes.splice(i, 1), t.destroy(), n = this.getHandleByIndex(i), this.handles.splice(i, 1), n.destroy(), o && ((s = this.getPaneByIndex(this.lastOpenPaneIndex)) ? this.showPane(s) : (e = this.getPaneByIndex(0)) && this.showPane(e)), this.emit("PaneRemoved")
				}, e.prototype.removePaneByName = function (t) {
					var e, n, i, o, s;
					for (o = this.panes, s = [], n = 0, i = o.length; i > n; n++) {
						if (e = o[n], e.name === t) {
							this.removePane(e);
							break
						}
						s.push(void 0)
					}
					return s
				}, e.prototype.appendHandleContainer = function () {
					return this.addSubView(this.tabHandleContainer)
				}, e.prototype.appendPane = function (t) {
					return t.setDelegate(this), this.addSubView(t)
				}, e.prototype.appendHandle = function (t) {
					var e, n, i;
					return this.handleHeight || (this.handleHeight = this.tabHandleContainer.getHeight()), t.setDelegate(this), this.tabHandleContainer.tabs.addSubView(t), i = this.getOptions(), e = i.enableMoveTabHandle, n = i.maxHandleWidth, e ? this._tabsWidth = this.handles.length * n : void 0
				}, e.prototype.addHandle = function (t) {
					var e;
					return t instanceof KDTabHandleView ? (this.handles.push(t), this.appendHandle(t), t.getOptions().hidden && t.setClass("hidden"), t) : (e = (null != (null != t ? t.constructor : void 0)).name, warn("You can't add " + (null != e ? e : void 0) + " as a pane, use KDTabHandleView instead"))
				}, e.prototype.removeHandle = function () {}, e.prototype.showPane = function (t) {
					var e, n, i;
					if (t && (e = this.getActivePane(), t !== e)) return e && (this.lastOpenPaneIndex = this.getPaneIndex(e)), this.hideAllPanes(), t.show(), i = this.getPaneIndex(t), n = this.getHandleByIndex(i), n.makeActive(), t.emit("PaneDidShow"), this.emit("PaneDidShow", t, i), t
				}, e.prototype.hideAllPanes = function () {
					var t, e, n, i, o, s, r, a, l;
					for (r = this.panes, n = 0, o = r.length; o > n; n++) e = r[n], e && e.hide();
					for (a = this.handles, l = [], i = 0, s = a.length; s > i; i++) t = a[i], t && l.push(t.makeInactive());
					return l
				}, e.prototype.hideHandleContainer = function () {
					return this.tabHandleContainer.hide(), this.handlesHidden = !0
				}, e.prototype.showHandleContainer = function () {
					return this.tabHandleContainer.show(), this.handlesHidden = !1
				}, e.prototype.toggleHandleContainer = function (t) {
					return null == t && (t = 0), this.tabHandleContainer.$().toggle(t)
				}, e.prototype.hideHandleCloseIcons = function () {
					return this.tabHandleContainer.$().addClass("hide-close-icons")
				}, e.prototype.showHandleCloseIcons = function () {
					return this.tabHandleContainer.$().removeClass("hide-close-icons")
				}, e.prototype.handleMouseDownDefaultAction = function (t, e) {
					var n, i, o, s, r, a;
					for (r = this.handles, a = [], i = o = 0, s = r.length; s > o; i = ++o) n = r[i], t === n && a.push(this.handleClicked(i, e));
					return a
				}, e.prototype.handleClicked = function (t, e) {
					var n;
					return n = this.getPaneByIndex(t), $(e.target).hasClass("close-tab") ? (this.blockTabHandleResize = !0, this.removePane(n), !1) : this.showPane(n)
				}, e.prototype.setTabHandleContainer = function (t) {
					return null != t ? (null != this.tabHandleContainer && this.tabHandleContainer.destroy(), this.tabHandleContainer = t) : (this.tabHandleContainer = new i, this.appendHandleContainer()), this.tabHandleContainer.setClass("kdtabhandlecontainer")
				}, e.prototype.getTabHandleContainer = function () {
					return this.tabHandleContainer
				}, e.prototype.setTabHandleMoveNav = function () {
					return this.tabHandleContainer.addSubView(new o({
						delegate: this
					}))
				}, e.prototype.checkPaneExistenceById = function (t) {
					var e, n, i, o, s;
					for (n = !1, s = this.panes, i = 0, o = s.length; o > i; i++) e = s[i], e.id === t && (n = !0);
					return n
				}, e.prototype.getPaneByName = function (t) {
					var e, n, i, o, s;
					for (n = !1, s = this.panes, i = 0, o = s.length; o > i; i++) e = s[i], e.name === t && (n = e);
					return n
				}, e.prototype.getPaneById = function (t) {
					var e, n, i, o, s;
					for (n = null, s = this.panes, i = 0, o = s.length; o > i; i++) e = s[i], e.id === t && (n = e);
					return n
				}, e.prototype.getActivePane = function () {
					return this.activePane
				}, e.prototype.getActivePaneIndex = function () {
					return this.getPaneIndex(this.getActivePane())
				}, e.prototype.setActivePane = function (t) {
					this.activePane = t
				}, e.prototype.getPaneByIndex = function (t) {
					return this.panes[t]
				}, e.prototype.getHandleByIndex = function (t) {
					return this.handles[t]
				}, e.prototype.getPaneIndex = function (t) {
					if (!t) throw new Error("no pane provided!");
					return this.panes.indexOf(t)
				}, e.prototype.showPaneByIndex = function (t) {
					return this.showPane(this.getPaneByIndex(t))
				}, e.prototype.showPaneByName = function (t) {
					return this.showPane(this.getPaneByName(t))
				}, e.prototype.showNextPane = function () {
					var t, e;
					return e = this.getActivePane(), t = this.getPaneIndex(e), this.showPane(this.getPaneByIndex(t + 1))
				}, e.prototype.showPreviousPane = function () {
					var t, e;
					return e = this.getActivePane(), t = this.getPaneIndex(e), this.showPane(this.getPaneByIndex(t - 1))
				}, e.prototype.setPaneTitle = function (t, e) {
					var n;
					return n = this.getHandleByPane(t), n.getDomElement().find("b").text(e), n.setAttribute("title", e)
				}, e.prototype.getHandleByPane = function (t) {
					var e, n;
					return n = this.getPaneIndex(t), e = this.getHandleByIndex(n)
				}, e.prototype.hideCloseIcon = function (t) {
					var e, n;
					return n = this.getPaneIndex(t), e = this.getHandleByIndex(n), e.getDomElement().addClass("hide-close-icon")
				}, e.prototype.getVisibleHandles = function () {
					return this.handles.filter(function (t) {
						return t.isHidden() === !1
					})
				}, e.prototype.getVisibleTabs = function () {
					return this.panes.filter(function (t) {
						return t.tabHandle.isHidden() === !1
					})
				}, e.prototype.resizeTabHandles = function () {
					var t, e, n, i, o, s, r, a, l, u, c, p, h, d;
					if (!(!this.getOptions().resizeTabHandles || this._tabHandleContainerHidden || this.blockTabHandleResize || (i = this.getOptions().lastTabHandleMargin, r = [], a = 0, o = this.tabHandleContainer.tabs.getElement().offsetWidth, 0 >= o))) {
						for (e = o - i, t = 100 - 100 * i / e, h = this.handles, l = 0, c = h.length; c > l; l++) n = h[l], n.isHidden() || (r.push(n), a += n.getElement().offsetWidth);
						for (s = (t / r.length).toFixed(2), d = [], u = 0, p = r.length; p > u; u++) n = r[u], d.push(n.setWidth(s, "%"));
						return d
					}
				}, e
			}(n)
		}, {
			"./../scrollview/scrollview.coffee": 69,
			"./tabhandlecontainer.coffee": 78,
			"./tabhandlemovenav.coffee": 79
		}
	],
	83: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./tabview.coffee"), i = t("./tabpaneview.coffee"), n = t("./../forms/formviewwithfields.coffee"), e.exports = s = function (t) {
				function e(t, i) {
					var o;
					null == t && (t = {}), null == t.navigable && (t.navigable = !0), null == t.goToNextFormOnSubmit && (t.goToNextFormOnSubmit = !0), e.__super__.constructor.call(this, t, i), this.forms = {}, this.hideHandleCloseIcons(), o = this.getOptions().forms, o && (this.createTabs(o = n.sanitizeFormOptions(o)), this.showPane(this.panes[0])), 1 === o.length && this.hideHandleContainer()
				}
				return a(e, t), e.prototype.handleClicked = function () {
					return this.getOptions().navigable ? e.__super__.handleClicked.apply(this, arguments) : void 0
				}, e.prototype.createTab = function (t, e) {
					var n, o;
					return this.addPane(o = new i({
						name: t.title
					}), t.shouldShow), n = t.callback, t.callback = function (t) {
						return function (i) {
							var o;
							return t.getOptions().goToNextFormOnSubmit && t.showNextPane(), "function" == typeof n && n(i), o = t.getOptions().forms, o && e === Object.keys(o).length - 1 ? t.fireFinalCallback() : void 0
						}
					}(this), this.createForm(t, o), o
				}, e.prototype.createTabs = function (t) {
					return t.forEach(function (t) {
						return function (e, n) {
							return t.createTab(e, n)
						}
					}(this))
				}, e.prototype.createForm = function (t, e) {
					var i;
					return e.addSubView(i = new n(t)), this.forms[t.title] = e.form = i, i
				}, e.prototype.getFinalData = function () {
					var t, e, n, i, o;
					for (t = {}, o = this.panes, n = 0, i = o.length; i > n; n++) e = o[n], t = $.extend(e.form.getData(), t);
					return t
				}, e.prototype.fireFinalCallback = function () {
					var t, e;
					return t = this.getFinalData(), "function" == typeof (e = this.getOptions()).callback ? e.callback(t) : void 0
				}, e
			}(o)
		}, {
			"./../forms/formviewwithfields.coffee": 35,
			"./tabpaneview.coffee": 81,
			"./tabview.coffee": 82
		}
	],
	84: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.tagName = "time", e.__super__.constructor.call(this, t, n), e.on("OneMinutePassed", function (t) {
						return function () {
							return t.updatePartial($.timeago(t.getData()))
						}
					}(this))
				}
				return s(e, t), e.registerStaticEmitter(), KD.utils.repeat(6e4, function () {
					return e.emit("OneMinutePassed")
				}), e.prototype.setData = function () {
					return e.__super__.setData.apply(this, arguments), this.parent ? this.updatePartial($.timeago(this.getData())) : void 0
				}, e.prototype.viewAppended = function () {
					return this.setPartial($.timeago(this.getData()))
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	85: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../../core/view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					t.bind || (t.bind = "mouseenter mouseleave"), null == t.sticky && (t.sticky = !1), t.cssClass = KD.utils.curry("kdtooltip", t.cssClass), e.__super__.constructor.call(this, t, n), this.visible = !1, this.parentView = this.getDelegate(), this.wrapper = new i({
						cssClass: "wrapper"
					}), this.getOptions().animate ? this.setClass("out") : this.hide(), this.addListeners(), KD.singletons.windowController.on("ScrollHappened", this.bound("hide")), this.once("viewAppended", function (t) {
						return function () {
							var e;
							return e = t.getOptions(), null != e.view ? t.setView(e.view) : (t.setClass("just-text"), t.setTitle(e.title, e)), t.parentView.emit("TooltipReady"), t.addSubView(t.wrapper), t.visible = !0
						}
					}(this))
				}
				var n, o, r, a, l;
				return s(e, t), e.prototype.show = function () {
					var t;
					return (t = this.getOptions().selector) ? void 0 : (this.display(), e.__super__.show.apply(this, arguments), this.visible = !0)
				}, e.prototype.hide = function () {
					return this.visible ? (e.__super__.hide.apply(this, arguments), this.getDomElement().remove(), KD.singletons.windowController.removeLayer(this), this.visible = !1) : void 0
				}, e.prototype.update = function (t, e) {
					return null == t && (t = this.getOptions()), null == e && (e = null), e ? this.setView(e) : (t.selector || (t.selector = null), t.title || (t.title = ""), this.getOptions().title = t.title, this.setTitle(t.title), this.display(this.getOptions())), this.visible = !0
				}, e.prototype.addListeners = function () {
					var t, e, n, i, o, s;
					for (t = this.getOptions().events, s = this.bound("show"), n = this.bound("hide"), i = 0, o = t.length; o > i; i++) e = t[i], this.parentView.bindEvent(e);
					return this.parentView.on("mouseenter", s), this.parentView.on("mouseleave", n), this.on("ReceivedClickElsewhere", n), this.once("KDObjectWillBeDestroyed", function (t) {
						return function () {
							return t.parentView.off("mouseenter", s), t.parentView.off("mouseleave", n)
						}
					}(this))
				}, e.prototype.setView = function (t) {
					var e, n, i;
					if (t) return null != this.wrapper.view && this.wrapper.view.destroy(), t.constructorName ? (i = t.options, n = t.data, e = t.constructorName, this.childView = new e(i, n)) : this.wrapper.addSubView(t)
				}, e.prototype.getView = function () {
					return this.childView
				}, e.prototype.destroy = function () {
					return this.parentView.tooltip = null, delete this.parentView.tooltip, e.__super__.destroy.apply(this, arguments)
				}, e.prototype.translateCompassDirections = function (t) {
					var e, i;
					return i = t.placement, e = t.gravity, t.placement = l[i], t.direction = n(t.placement, e), t
				}, e.prototype.display = function (t) {
					return null == t && (t = this.getOptions()), this.appendToDomBody(), KD.singletons.windowController.addLayer(this), t.gravity && (t = this.translateCompassDirections(t)), t.gravity = null, t.animate && this.setClass("in"), this.utils.defer(function (e) {
						return function () {
							return e.setPositions(t)
						}
					}(this)), this.visible = !0
				}, e.prototype.getCorrectPositionCoordinates = function (t, e, n) {
					var i, s, r, l, u, c, p, h, d, f, m, g;
					if (null == t && (t = {}), null == n && (n = noop), i = this.$(), p = this.parentView.$(t.selector), r = {
						container: {
							height: i.height(),
							width: i.width()
						},
						selector: {
							offset: p.offset(),
							height: p.height(),
							width: p.width()
						}
					}, c = e.placement, l = e.direction, u = this.getOptions().forcePosition, f = o(a(r, c, l), r.container.width, r.container.height), !u && Object.keys(f).length > 0)
						for (d = [
							["top", "right"],
							["right", "top"],
							["right", "bottom"],
							["bottom", "right"],
							["top", "left"],
							["top", "center"],
							["right", "center"],
							["bottom", "center"],
							["bottom", "left"],
							["left", "bottom"],
							["left", "center"],
							["left", "top"]
						], m = 0, g = d.length; g > m; m++)
							if (h = d[m], 0 === Object.keys(o(a(r, h[0], h[1]), r.container.width, r.container.height)).length) {
								c = h[0], l = h[1];
								break
							}
					return s = {
						coords: a(r, c, l),
						placement: c,
						direction: l
					}, n(s), s
				}, e.prototype.setPositions = function (t, e) {
					var n, i, o, s, r, a, l, u, c, p, h, d, f;
					for (null == t && (t = this.getOptions()), null == e && (e = !1), e && this.setClass("animate-movement"), r = t.placement || "top", i = t.direction || "right", s = Number === typeof t.offset ? {
						top: t.offset,
						left: 0
					} : t.offset, i = ("top" !== r && "bottom" !== r || "top" !== i && "bottom" !== i) && ("left" !== r && "right" !== r || "left" !== i && "right" !== i) ? i : "center", h = this.getCorrectPositionCoordinates(t, {
						placement: r,
						direction: i
					}), n = h.coords, r = h.placement, i = h.direction, d = ["top", "bottom", "left", "right"], l = 0, c = d.length; c > l; l++) a = d[l], r === a ? this.setClass("placement-" + a) : this.unsetClass("placement-" + a);
					for (f = ["top", "bottom", "left", "right", "center"], u = 0, p = f.length; p > u; u++) o = f[u], i === o ? this.setClass("direction-" + o) : this.unsetClass("direction-" + o);
					return this.$().css({
						left: n.left + s.left,
						top: n.top + s.top
					}), this.utils.wait(500, function (t) {
						return function () {
							return t.unsetClass("animate-movement")
						}
					}(this))
				}, e.prototype.setTitle = function (t, e) {
					return null == e && (e = {}), this.wrapper.updatePartial(e.html !== !1 ? t : Encoder.htmlEncode(t))
				}, n = function (t, e) {
					return "top" === t || "bottom" === t ? /e/.test(e) ? "left" : /w/.test(e) ? "right" : "center" : "left" === t || "right" === t ? /n/.test(e) ? "top" : /s/.test(e) ? "bottom" : t : void 0
				}, l = {
					top: "top",
					above: "top",
					below: "bottom",
					bottom: "bottom",
					left: "left",
					right: "right"
				}, o = function (t, e, n) {
					var i;
					return i = {}, t.left < 0 && (i.left = -t.left), t.top < 0 && (i.top = -t.top), t.left + e > window.innerWidth && (i.right = t.left + e - window.innerWidth), t.top + n > window.innerHeight && (i.bottom = t.top + n - window.innerHeight), i
				}, r = function (t, e, n) {
					var i;
					return null == n && (n = !1), i = t.selector[e] - t.container[e], n ? i / 2 : i
				}, a = function (t, e, n) {
					var i, o, s, a, l, u, c;
					return i = {
						top: t.selector.offset.top,
						left: t.selector.offset.left
					}, c = /o/.test(e) ? ["height", "width", "top", "left", "right"] : ["width", "height", "left", "top", "bottom"], l = c[0], o = c[1], u = c[2], s = c[3], a = c[4], i[u] += e.length < 5 ? -(t.container[l] + 10) : t.selector[l] + 10, n !== a && (i[s] += r(t, o, "center" === n)), i
				}, e
			}(i)
		}, {
			"./../../core/view.coffee": 108
		}
	],
	86: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../list/listitemview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i, o, s;
					null == t && (t = {}), null == n && (n = {}), t.tagName || (t.tagName = "li"), t.type || (t.type = "jtreeitem"), t.bind || (t.bind = "mouseenter contextmenu dragstart dragenter dragleave dragend dragover drop"), t.childClass || (t.childClass = null), t.childOptions || (t.childOptions = {}), e.__super__.constructor.call(this, t, n), this.setClass("jtreeitem"), this.expanded = !1, s = this.getOptions(), i = s.childClass, o = s.childOptions, i && (this.child = new i(o, this.getData()))
				}
				return s(e, t), e.prototype.viewAppended = function () {
					return this.getOptions().childClass ? this.addSubView(this.child) : this.updatePartial("<span class='arrow'></span>\n" + this.getData().title)
				}, e.prototype.toggle = function () {
					return this.expanded ? this.collapse() : this.expand()
				}, e.prototype.expand = function () {
					return this.expanded = !0, this.setClass("expanded")
				}, e.prototype.collapse = function () {
					return this.expanded = !1, this.unsetClass("expanded")
				}, e.prototype.decorateSubItemsState = function (t) {
					return null == t && (t = !0), t ? this.setClass("has-sub-items") : this.unsetClass("has-sub-items")
				}, e
			}(i)
		}, {
			"./../list/listitemview.coffee": 53
		}
	],
	87: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../list/listview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t && (t = {}), null == t.animated && (t.animated = !1), e.__super__.constructor.call(this, t, n), this.setClass("jtreeview expanded")
				}
				return s(e, t), e.prototype.toggle = function (t) {
					return this.expanded ? this.collapse(t) : this.expand(t)
				}, e.prototype.expand = function (t) {
					return this.getOptions().animated ? this.$().slideDown(150, function (e) {
						return function () {
							return e.setClass("expanded"), "function" == typeof t ? t() : void 0
						}
					}(this)) : (this.show(), this.setClass("expanded"), "function" == typeof t ? t() : void 0)
				}, e.prototype.collapse = function (t) {
					return this.getOptions().animated ? this.$().slideUp(100, function (e) {
						return function () {
							return e.unsetClass("expanded"), "function" == typeof t ? t() : void 0
						}
					}(this)) : (this.hide(), this.unsetClass("expanded"), "function" == typeof t ? t() : void 0)
				}, e.prototype.mouseDown = function () {
					return KD.getSingleton("windowController").setKeyView(this), !1
				}, e.prototype.keyDown = function (t) {
					return this.emit("KeyDownOnTreeView", t)
				}, e.prototype.destroy = function () {
					return KD.getSingleton("windowController").revertKeyView(this), e.__super__.destroy.apply(this, arguments)
				}, e.prototype.appendItemAtIndex = function (t, e) {
					var n, i;
					return t.setParent(this), n = !0, 0 >= e ? this.$().prepend(t.$()) : e > 0 && ((null != (i = this.items[e - 1]) ? i.$().hasClass("has-sub-items") : void 0) ? this.items[e - 1].$().next().after(t.$()) : null != this.items[e - 1] ? this.items[e - 1].$().after(t.$()) : (warn("Out of bound"), n = !1)), this.parentIsInDom && n && t.emit("viewAppended"), null
				}, e
			}(i)
		}, {
			"./../list/listview.coffee": 54
		}
	],
	88: [
		function (t, e) {
			var n, i, o, s, r = {}.hasOwnProperty,
				a = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) r.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				l = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			s = t("./../../core/viewcontroller.coffee"), o = t("./../scrollview/scrollview.coffee"), i = t("./../list/listviewcontroller.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var s;
					null == t && (t = {}), s = t, s.view || (s.view = new o({
						cssClass: "jtreeview-wrapper"
					})), s.listViewControllerClass || (s.listViewControllerClass = i), s.treeItemClass || (s.treeItemClass = JTreeItemView), s.listViewClass || (s.listViewClass = JTreeView), s.itemChildClass || (s.itemChildClass = null), s.itemChildOptions || (s.itemChildOptions = {}), s.nodeIdPath || (s.nodeIdPath = "id"), s.nodeParentIdPath || (s.nodeParentIdPath = "parentId"), null == s.contextMenu && (s.contextMenu = !1), null == s.multipleSelection && (s.multipleSelection = !1), null == s.addListsCollapsed && (s.addListsCollapsed = !1), null == s.sortable && (s.sortable = !1), null == s.putDepthInfo && (s.putDepthInfo = !0), null == s.addOrphansToRoot && (s.addOrphansToRoot = !0), null == s.dragdrop && (s.dragdrop = !1), e.__super__.constructor.call(this, s, n), this.listData = {}, this.listControllers = {}, this.nodes = {}, this.indexedNodes = [], this.selectedNodes = []
				}
				var n, s, u;
				return a(e, t), u = function () {
					return {
						37: "left",
						38: "up",
						39: "right",
						40: "down",
						8: "backspace",
						9: "tab",
						13: "enter",
						27: "escape"
					}
				}, s = null, n = function () {
					return s = document.createElement("img"), s.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAYCAMAAAAs/jgVAAAA0lBMVEX///+It9YAAAD///8AAACIt9aIt9aIt9aIt9aIt9aIt9YAAAD///+It9aIt9aIt9aIt9aIt9aIt9aIt9bT09OIt9aIt9aIt9b///+It9bv9fr+/v79/f2QvNn4+PioyuHA2enP4u/09PS41Obf7PTn8ff6+vr29vb3+vygxd78/Pz19fX7+/vs7OzY2NjR0dGwz+Tv7+/T09Pz8/PX19fQ0NCYwdvx8fHLy8vq6urZ2dnX5/H5+fny8vLOzs739/fPz8/W1tbu7u7w8PDH3ezd3d0P0SzzAAAAGHRSTlMAACZqGJkG2/k2rkZV4bG0V9gDaYBabJYxtX/TAAACLElEQVR4Xu3V127bMBQG4NT1SOw4s0kP59Ce3iN7tu//Sj2i0iiKE8AB7Juiv0SIFAR9OAQJ7mwy/9NsvElz61yDA4cEgGWQZA0Evm0xyAFAYkVMr/nCtU8PjsnGcnxw2n7lGMsSnmSMAX9slNxRh2w4naMXjrGEByzgCWPsqtdE7qT7ARDrOuCqL4LdE8tlyCCHWMZmjw3kWuSDuJ5V4K9iKl7BWl7LcgHnXOLFecAHV8jtkU841wqrHGbhreHtWS6QN5nMbiR2BjPkfhaAoh7QEQVfKFqMkNMAoEAp3wNwC05FQGNbXQwAeuEX7z2DXVP0NIAv6uUhl8gslFKGmUzkbIBcx3L4/XUUC+q+crYg5NDSkTBaRIpo33J2qj1NYhCeL2IwRFMBC6Lqy8VWJ8MwxSuUQTgpuN2SI0Tbf6xyKETKaAVFKs4OlWc/Kt4ZX5NadgvuPrxPp+E0xWc4mX2Bi4FgKi6ytVQcESZafMAtnWWKDdnhBLlOnYshJteW+2Vqk0ko8qOSG1FCDJKjihMuIXS0Mpnj6e341sE2HTuWa9U5YgCM5eJyqUQeYCHIxRRAl5ygoIUP4FVcOdSUeAbv16WSPz/l+WWePz3nl/PhpxthjV22zkZo9i4e7i7u5tgeLn4P7TbfDme3+f4PJ0wdZ+o4aegs5wXX7m6D67aRe18ecpizPtlw+mf2RHhfnuWwwPPDDYr9w/PyAFo9z7d8vGJ5399kf+cfyh+807YxJJdmLQAAAABJRU5ErkJggg==", s.width = 110
				}(), e.prototype.loadView = function () {
					return this.initTree(this.getData()), this.setKeyView(), this.setMainListeners(), this.registerBoundaries()
				}, e.prototype.registerBoundaries = function () {
					return this.boundaries = {
						top: this.getView().getY(),
						left: this.getView().getX(),
						width: this.getView().getWidth(),
						height: this.getView().getHeight()
					}
				}, e.prototype.initTree = function (t) {
					return this.removeAllNodes(), this.addNodes(t)
				}, e.prototype.logTreeStructure = function () {
					var t, e, n, i, o;
					n = this.getOptions(), i = this.indexedNodes, o = [];
					for (t in i) r.call(i, t) && (e = i[t], o.push(log(t, this.getNodeId(e), this.getNodePId(e), e.depth)));
					return o
				}, e.prototype.getNodeId = function (t) {
					return t[this.getOptions().nodeIdPath]
				}, e.prototype.getNodePId = function (t) {
					return t[this.getOptions().nodeParentIdPath]
				}, e.prototype.getPathIndex = function (t) {
					var e, n, i, o, s;
					for (s = this.indexedNodes, e = i = 0, o = s.length; o > i; e = ++i)
						if (n = s[e], this.getNodeId(n) === t) return e;
					return -1
				}, e.prototype.repairIds = function (t) {
					var e, n, i;
					return n = this.getOptions(), e = n.nodeIdPath, i = n.nodeParentIdPath, t[e] || (t[e] = this.utils.getUniqueId()), t[e] = "" + this.getNodeId(t), t[i] = this.getNodePId(t) ? "" + this.getNodePId(t) : "0", this.nodes[this.getNodeId(t)] = {}, n.putDepthInfo && (t.depth = this.nodes[t[i]] ? this.nodes[t[i]].getData().depth + 1 : 0), "0" === t[i] || this.nodes[t[i]] || (n.addOrphansToRoot ? t[i] = "0" : t = !1), t
				}, e.prototype.isNodeVisible = function (t) {
					var e, n;
					return e = t.getData(), n = this.nodes[this.getNodePId(e)], n ? n.expanded ? this.isNodeVisible(n) : !1 : !0
				}, e.prototype.areSibling = function (t, e) {
					var n, i;
					return n = this.getNodePId(t.getData()), i = this.getNodePId(e.getData()), n === i
				}, e.prototype.setFocusState = function () {
					var t;
					return t = this.getView(), KD.getSingleton("windowController").addLayer(t), t.unsetClass("dim")
				}, e.prototype.setBlurState = function () {
					var t;
					return t = this.getView(), KD.getSingleton("windowController").removeLayer(t), t.setClass("dim")
				}, e.prototype.addNode = function (t) {
					var e, n, i;
					if (!this.nodes[this.getNodeId(t)] && (t = this.repairIds(t))) return l.call(this.getData(), t) < 0 && this.getData().push(t), this.registerListData(t), i = this.getNodePId(t), null != this.listControllers[i] ? e = this.listControllers[i].getListView() : (e = this.createList(i).getListView(), this.addSubList(this.nodes[i], i)), n = e.addItem(t), this.emit("NodeWasAdded", n), this.addIndexedNode(t), n
				}, e.prototype.addNodes = function (t) {
					var e, n, i, o;
					for (o = [], n = 0, i = t.length; i > n; n++) e = t[n], o.push(this.addNode(e));
					return o
				}, e.prototype.removeNode = function (t) {
					var e, n, i, o, s, r, a, l;
					for (i = null, l = this.getData(), e = r = 0, a = l.length; a > r; e = ++r) n = l[e], this.getNodeId(n) === t && (this.removeIndexedNode(n), i = e);
					return null != i ? (o = this.getData().splice(i, 1)[0], this.removeChildNodes(t), s = this.getNodePId(o), this.listControllers[s].getListView().removeItem(this.nodes[t]), delete this.nodes[t]) : void 0
				}, e.prototype.removeNodeView = function (t) {
					return this.removeNode(this.getNodeId(t.getData()))
				}, e.prototype.removeAllNodes = function () {
					var t, e, n;
					n = this.listControllers;
					for (t in n) r.call(n, t) && (e = n[t], e.itemsOrdered.forEach(this.bound("removeNodeView")), null != e && e.getView().destroy(), delete this.listControllers[t], delete this.listData[t]);
					return this.nodes = {}, this.listData = {}, this.indexedNodes = [], this.selectedNodes = [], this.listControllers = {}
				}, e.prototype.removeChildNodes = function (t) {
					var e, n, i, o, s, r, a, l, u, c;
					for (n = [], u = this.getData(), i = s = 0, a = u.length; a > s; i = ++s) o = u[i], this.getNodePId(o) === t && n.push(this.getNodeId(o));
					for (r = 0, l = n.length; l > r; r++) e = n[r], this.removeNode(e);
					return null != (c = this.listControllers[t]) && c.getView().destroy(), delete this.listControllers[t], delete this.listData[t]
				}, e.prototype.nodeWasAdded = function (t) {
					var e, n, i;
					return n = t.getData(), this.getOptions().dragdrop && t.$().attr("draggable", "true"), e = n.id, i = n.parentId, this.nodes[this.getNodeId(n)] = t, this.nodes[this.getNodePId(n)] && (this.getOptions().addListsCollapsed || this.expand(this.nodes[this.getNodePId(n)]), this.nodes[this.getNodePId(n)].decorateSubItemsState()), this.listControllers[e] ? this.addSubList(t, e) : void 0
				}, e.prototype.getChildNodes = function (t) {
					var e;
					return e = [], this.indexedNodes.forEach(function (n) {
						return function (i, o) {
							return n.getNodePId(i) === n.getNodeId(t) ? e.push({
								node: i,
								index: o
							}) : void 0
						}
					}(this)), e.length ? e : !1
				}, e.prototype.getPreviousNeighbor = function (t) {
					var e, n, i;
					return i = t, e = this.getChildNodes(t), e && (n = e.last, i = this.getPreviousNeighbor(n.node)), i
				}, e.prototype.addIndexedNode = function (t, e) {
					var n, i, o;
					return e >= 0 ? void this.indexedNodes.splice(e + 1, 0, t) : (i = this.nodes[this.getNodePId(t)], i ? (o = this.getPreviousNeighbor(i.getData()), n = this.indexedNodes.indexOf(o), this.indexedNodes.splice(n + 1, 0, t)) : this.indexedNodes.push(t))
				}, e.prototype.removeIndexedNode = function (t) {
					var e;
					return l.call(this.indexedNodes, t) >= 0 && (e = this.indexedNodes.indexOf(t), this.indexedNodes.splice(e, 1), this.nodes[this.getNodePId(t)] && !this.getChildNodes(this.nodes[this.getNodePId(t)].getData())) ? this.nodes[this.getNodePId(t)].decorateSubItemsState(!1) : void 0
				}, e.prototype.registerListData = function (t) {
					var e, n;
					return e = this.getNodePId(t), (n = this.listData)[e] || (n[e] = []), this.listData[e].push(t)
				}, e.prototype.createList = function (t, e) {
					var n, i, o;
					return n = this.getOptions(), this.listControllers[t] = new n.listViewControllerClass({
						id: "" + this.getId() + "_" + t,
						wrapper: !1,
						scrollView: !1,
						selection: null != (i = n.selection) ? i : !1,
						multipleSelection: null != (o = n.multipleSelection) ? o : !1,
						view: new n.listViewClass({
							tagName: "ul",
							type: n.type,
							itemClass: n.treeItemClass,
							itemChildClass: n.itemChildClass,
							itemChildOptions: n.itemChildOptions
						})
					}, {
						items: e
					}), this.setListenersForList(t), this.listControllers[t]
				}, e.prototype.addSubList = function (t, e) {
					var n, i;
					return i = this.getOptions(), n = this.listControllers[e].getView(), t ? (t.$().after(n.$()), n.parentIsInDom = !0, n.emit("viewAppended"), i.addListsCollapsed ? this.collapse(t) : this.expand(t)) : this.getView().addSubView(n)
				}, e.prototype.setMainListeners = function () {
					return KD.getSingleton("windowController").on("ReceivedMouseUpElsewhere", function (t) {
						return function (e) {
							return t.mouseUp(e)
						}
					}(this)), this.getView().on("ReceivedClickElsewhere", function (t) {
						return function () {
							return t.setBlurState()
						}
					}(this))
				}, e.prototype.setListenersForList = function (t) {
					return this.listControllers[t].getView().on("ItemWasAdded", function (t) {
						return function (e, n) {
							return t.setItemListeners(e, n)
						}
					}(this)), this.listControllers[t].on("ItemSelectionPerformed", function (t) {
						return function (e, n) {
							var i, o;
							return i = n.event, o = n.items, t.organizeSelectedNodes(e, o, i)
						}
					}(this)), this.listControllers[t].on("ItemDeselectionPerformed", function (t) {
						return function (e, n) {
							var i, o;
							return i = n.event, o = n.items, t.deselectNodes(e, o, i)
						}
					}(this)), this.listControllers[t].getListView().on("KeyDownOnTreeView", function (t) {
						return function (e) {
							return t.keyEventHappened(e)
						}
					}(this))
				}, e.prototype.setItemListeners = function (t) {
					var e;
					return t.on("viewAppended", this.nodeWasAdded.bind(this, t)), e = ["dblclick", "click", "mousedown", "mouseup", "mouseenter", "mousemove"], this.getOptions().contextMenu && e.push("contextmenu"), this.getOptions().dragdrop && (e = e.concat(["dragstart", "dragenter", "dragleave", "dragend", "dragover", "drop"])), t.on(e, function (e) {
						return function (n) {
							return e.mouseEventHappened(t, n)
						}
					}(this))
				}, e.prototype.organizeSelectedNodes = function (t, e, n) {
					var i, o, s, r;
					for (null == n && (n = {}), (n.metaKey || n.ctrlKey || n.shiftKey) && this.getOptions().multipleSelection || this.deselectAllNodes(t), r = [], o = 0, s = e.length; s > o; o++) i = e[o], r.push(l.call(this.selectedNodes, i) < 0 ? this.selectedNodes.push(i) : void 0);
					return r
				}, e.prototype.deselectNodes = function (t, e) {
					var n, i, o, s;
					for (s = [], i = 0, o = e.length; o > i; i++) n = e[i], s.push(l.call(this.selectedNodes, n) >= 0 ? this.selectedNodes.splice(this.selectedNodes.indexOf(n), 1) : void 0);
					return s
				}, e.prototype.deselectAllNodes = function (t) {
					var e, n, i;
					i = this.listControllers;
					for (e in i) r.call(i, e) && (n = i[e], n !== t && n.deselectAllItems());
					return this.selectedNodes = []
				}, e.prototype.selectNode = function (t, e, n) {
					var i;
					return null == n && (n = !0), t ? (n && this.setFocusState(), i = this.listControllers[this.getNodePId(t.getData())], i ? i.selectItem(t, e) : void 0) : void 0
				}, e.prototype.deselectNode = function (t, e) {
					return this.listControllers[this.getNodePId(t.getData())].deselectSingleItem(t, e)
				}, e.prototype.selectFirstNode = function () {
					return this.selectNode(this.nodes[this.getNodeId(this.indexedNodes[0])])
				}, e.prototype.selectNodesByRange = function (t, e) {
					var n, i, o, s, r, a;
					for (n = [this.indexedNodes.indexOf(t.getData()), this.indexedNodes.indexOf(e.getData())], n.sort(function (t, e) {
						return t - e
					}), i = this.indexedNodes.slice(n[0], n[1] + 1), a = [], s = 0, r = i.length; r > s; s++) o = i[s], a.push(this.selectNode(this.nodes[this.getNodeId(o)], {
						shiftKey: !0
					}));
					return a
				}, e.prototype.toggle = function (t) {
					return t.expanded ? this.collapse(t) : this.expand(t)
				}, e.prototype.expand = function (t) {
					var e, n;
					return e = t.getData(), t.expand(), null != (n = this.listControllers[this.getNodeId(e)]) ? n.getView().expand() : void 0
				}, e.prototype.collapse = function (t) {
					var e, n;
					return e = t.getData(), null != (n = this.listControllers[this.getNodeId(e)]) ? n.getView().collapse(function () {
						return function () {
							return t.collapse()
						}
					}(this)) : void 0
				}, e.prototype.showDragOverFeedback = function () {
					return _.throttle(function (t) {
						var e, n, i;
						return e = t.getData(), "file" !== e.type ? t.setClass("drop-target") : (null != (n = this.nodes[e.parentPath]) && n.setClass("drop-target"), null != (i = this.listControllers[e.parentPath]) && i.getListView().setClass("drop-target")), t.setClass("items-hovering")
					}, 100)
				}(), e.prototype.clearDragOverFeedback = function () {
					return _.throttle(function (t) {
						var e, n, i;
						return e = t.getData(), "file" !== e.type ? t.unsetClass("drop-target") : (null != (n = this.nodes[e.parentPath]) && n.unsetClass("drop-target"), null != (i = this.listControllers[e.parentPath]) && i.getListView().unsetClass("drop-target")), t.unsetClass("items-hovering")
					}, 100)
				}(), e.prototype.clearAllDragFeedback = function () {
					return this.utils.wait(101, function (t) {
						return function () {
							var e, n, i, o, s, a;
							t.getView().$(".drop-target").removeClass("drop-target"), t.getView().$(".items-hovering").removeClass("items-hovering"), o = t.listControllers;
							for (i in o) r.call(o, i) && (e = o[i], e.getListView().unsetClass("drop-target"));
							s = t.nodes, a = [];
							for (i in s) r.call(s, i) && (n = s[i], a.push(n.unsetClass("items-hovering drop-target")));
							return a
						}
					}(this))
				}, e.prototype.mouseEventHappened = function (t, e) {
					switch (e.type) {
					case "mouseenter":
						return this.mouseEnter(t, e);
					case "dblclick":
						return this.dblClick(t, e);
					case "click":
						return this.click(t, e);
					case "mousedown":
						return this.mouseDown(t, e);
					case "mouseup":
						return this.mouseUp(t, e);
					case "mousemove":
						return this.mouseMove(t, e);
					case "contextmenu":
						return this.contextMenu(t, e);
					case "dragstart":
						return this.dragStart(t, e);
					case "dragenter":
						return this.dragEnter(t, e);
					case "dragleave":
						return this.dragLeave(t, e);
					case "dragover":
						return this.dragOver(t, e);
					case "dragend":
						return this.dragEnd(t, e);
					case "drop":
						return this.drop(t, e)
					}
				}, e.prototype.dblClick = function (t) {
					return this.toggle(t)
				}, e.prototype.click = function (t, e) {
					return /arrow/.test(e.target.className) ? (this.toggle(t), this.selectedItems) : (this.lastEvent = e, (e.metaKey || e.ctrlKey || e.shiftKey) && this.getOptions().multipleSelection || this.deselectAllNodes(), null != t && (e.shiftKey && this.selectedNodes.length > 0 && this.getOptions().multipleSelection ? this.selectNodesByRange(this.selectedNodes[0], t) : this.selectNode(t, e)), this.selectedItems)
				}, e.prototype.contextMenu = function () {}, e.prototype.mouseDown = function (t, e) {
					return this.lastEvent = e, l.call(this.selectedNodes, t) < 0 ? (this.mouseIsDown = !0, this.cancelDrag = !0, this.mouseDownTempItem = t, this.mouseDownTimer = setTimeout(function (n) {
						return function () {
							return n.mouseIsDown = !1, n.cancelDrag = !1, n.mouseDownTempItem = null, n.selectNode(t, e)
						}
					}(this), 1e3)) : (this.mouseIsDown = !1, this.mouseDownTempItem = null)
				}, e.prototype.mouseUp = function () {
					return clearTimeout(this.mouseDownTimer), this.mouseIsDown = !1, this.cancelDrag = !1, this.mouseDownTempItem = null
				}, e.prototype.mouseEnter = function (t, e) {
					return clearTimeout(this.mouseDownTimer), this.mouseIsDown && this.getOptions().multipleSelection ? (this.cancelDrag = !0, (e.metaKey || e.ctrlKey || e.shiftKey) && this.getOptions().multipleSelection || this.deselectAllNodes(), this.selectNodesByRange(this.mouseDownTempItem, t)) : void 0
				}, e.prototype.dragStart = function (t, e) {
					var n, i, o;
					return this.cancelDrag ? (e.preventDefault(), e.stopPropagation(), !1) : (this.dragIsActive = !0, n = e.originalEvent, n.dataTransfer.effectAllowed = "copyMove", o = function () {
						var t, e, n, o;
						for (n = this.selectedNodes, o = [], t = 0, e = n.length; e > t; t++) i = n[t], o.push(this.getNodeId(i.getData()));
						return o
					}.call(this), n.dataTransfer.setData("Text", o.join()), this.selectedNodes.length > 1 && n.dataTransfer.setDragImage(s, -10, 0), t.setClass("drag-started"))
				}, e.prototype.dragEnter = function (t, e) {
					return this.emit("dragEnter", t, e)
				}, e.prototype.dragLeave = function (t, e) {
					return this.clearAllDragFeedback(), this.emit("dragLeave", t, e)
				}, e.prototype.dragOver = function (t, e) {
					return this.emit("dragOver", t, e)
				}, e.prototype.dragEnd = function (t, e) {
					return this.dragIsActive = !1, t.unsetClass("drag-started"), this.clearAllDragFeedback(), this.emit("dragEnd", t, e)
				}, e.prototype.drop = function (t, e) {
					return this.dragIsActive = !1, e.preventDefault(), e.stopPropagation(), this.emit("drop", t, e), !1
				}, e.prototype.setKeyView = function () {
					return this.listControllers[0] ? KD.getSingleton("windowController").setKeyView(this.listControllers[0].getListView()) : void 0
				}, e.prototype.keyEventHappened = function (t) {
					var e, n, i, o;
					if (e = u()[t.which], i = this.selectedNodes[0], this.emit("keyEventPerformedOnTreeView", t), i) switch (e) {
					case "down":
					case "up":
						if (t.preventDefault(), n = this["perform" + e.capitalize() + "Key"](i, t)) return "function" == typeof (o = this.getView()).scrollToSubView ? o.scrollToSubView(n) : void 0;
						break;
					case "left":
						return this.performLeftKey(i, t);
					case "right":
						return this.performRightKey(i, t);
					case "backspace":
						return this.performBackspaceKey(i, t);
					case "enter":
						return this.performEnterKey(i, t);
					case "escape":
						return this.performEscapeKey(i, t);
					case "tab":
						return !1
					}
				}, e.prototype.performDownKey = function (t, e) {
					var n, i, o;
					return this.selectedNodes.length > 1 && (t = this.selectedNodes[this.selectedNodes.length - 1], (e.metaKey || e.ctrlKey || e.shiftKey) && this.getOptions().multipleSelection || (this.deselectAllNodes(), this.selectNode(t))), o = t.getData(), n = this.indexedNodes.indexOf(o) + 1, this.indexedNodes[n] ? (i = this.nodes[this.getNodeId(this.indexedNodes[n])], this.isNodeVisible(i) ? l.call(this.selectedNodes, i) >= 0 ? this.deselectNode(this.nodes[this.getNodeId(o)]) : (this.selectNode(i, e), i) : this.performDownKey(i, e)) : void 0
				}, e.prototype.performUpKey = function (t, e) {
					var n, i, o;
					return this.selectedNodes.length > 1 && (t = this.selectedNodes[this.selectedNodes.length - 1], (e.metaKey || e.ctrlKey || e.shiftKey) && this.getOptions().multipleSelection || (this.deselectAllNodes(), this.selectNode(t))), o = t.getData(), n = this.indexedNodes.indexOf(o) - 1, this.indexedNodes[n] && (i = this.nodes[this.getNodeId(this.indexedNodes[n])], this.isNodeVisible(i) ? l.call(this.selectedNodes, i) >= 0 ? this.deselectNode(this.nodes[this.getNodeId(o)]) : this.selectNode(i, e) : this.performUpKey(i, e)), i
				}, e.prototype.performRightKey = function (t) {
					return this.expand(t)
				}, e.prototype.performLeftKey = function (t) {
					var e, n;
					return e = t.getData(), this.nodes[this.getNodePId(e)] && (n = this.nodes[this.getNodePId(e)], this.selectNode(n)), n
				}, e.prototype.performBackspaceKey = function () {}, e.prototype.performEnterKey = function () {}, e.prototype.performEscapeKey = function () {}, e
			}(s)
		}, {
			"./../../core/viewcontroller.coffee": 109,
			"./../list/listviewcontroller.coffee": 55,
			"./../scrollview/scrollview.coffee": 69
		}
	],
	89: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			o = t("./../../core/view.coffee"), n = t("./../../core/customhtmlview.coffee"), e.exports = i = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return r(e, t), e.prototype.dragEnter = function (t) {
					return t.preventDefault(), t.stopPropagation(), this.setClass("hover")
				}, e.prototype.dragOver = function (t) {
					return t.preventDefault(), t.stopPropagation(), this.setClass("hover")
				}, e.prototype.dragLeave = function (t) {
					return t.preventDefault(), t.stopPropagation(), this.unsetClass("hover")
				}, e.prototype.drop = function (t) {
					var e, n, i, o, s;
					for (t.preventDefault(), t.stopPropagation(), this.unsetClass("hover"), i = t.originalEvent, n = i.dataTransfer.files, o = 0, s = n.length; s > o; o++) e = n[o], this.getDelegate().fileDropped(e);
					return !1
				}, e.prototype.viewAppended = function () {
					var t, e;
					return e = this.getOptions().title, t = this.getDelegate().getOptions(), this.setPartial("<span>" + e + "</span>"), this.addSubView(new n({
						cssClass: "info",
						tagName: "span",
						tooltip: {
							title: "Max. File Amount: <b>" + t.limit + "</b> files<br/>Max. File Size: <b>" + t.fileMaxSize + "</b> kbytes<br/>Max. Total Size: <b>" + t.totalMaxSize + "</b> kbytes",
							placement: "above",
							offset: 0,
							delayIn: 300,
							html: !0,
							animate: !0,
							selector: null,
							partial: "i"
						}
					}))
				}, e
			}(o)
		}, {
			"./../../core/customhtmlview.coffee": 97,
			"./../../core/view.coffee": 108
		}
	],
	90: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../list/listitemview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					e.__super__.constructor.call(this, t, n), this.setClass("kdfileuploadlistitem clearfix"), this.active = !1
				}
				return s(e, t), e.prototype.click = function (t) {
					return $(t.target).is("span.iconic.x") ? this.emit("removeFile", {
						orgEvent: t
					}) : void 0
				}, e.prototype.viewAppended = function () {
					return this.$().append(this.partial(this.data))
				}, e.prototype.partial = function (t) {
					return $("<span class='file-title'>" + t.name + "</span> <span class='file-size'>" + (t.size / 1024).toFixed(2) + "kb</span> <span class='x'></span>")
				}, e
			}(i)
		}, {
			"./../list/listitemview.coffee": 53
		}
	],
	91: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../list/listview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					null == t.itemClass && (t.itemClass = KDFileUploadItemView), e.__super__.constructor.call(this, t, n), this.setClass("kdfileuploadlist"), this.itemsByName = {}
				}
				return s(e, t), e.prototype.addItem = function (t) {
					var e;
					return e = new(this.getOptions().itemClass)({
						delegate: this
					}, t), this.getDelegate().on("removeFile", this.getDelegate().removeFile), this.addItemView(e), this.itemsByName[t.name] = e
				}, e
			}(i)
		}, {
			"./../list/listview.coffee": 54
		}
	],
	92: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./../list/listitemview.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					e.__super__.constructor.call(this, t, n), this.setClass("kdfileuploadthumbitem clearfix"), this.active = !1
				}
				return s(e, t), e.prototype.click = function (t) {
					return $(t.target).is("span.iconic.x") ? this.emit("removeFile", {
						orgEvent: t
					}) : void 0
				}, e.prototype.viewAppended = function () {
					return this.$().append(this.partial(this.data))
				}, e.prototype.partial = function (t) {
					var e, n;
					return n = /image.*/, e = t.type.match(n) ? window.URL.createObjectURL(t) : "./a/images/icon.file.png", $("<img class='thumb' src='" + e + "'/> <p class='meta'> <span class='file-title'>" + t.name + "</span> <span class='file-size'>" + (t.size / 1024).toFixed(2) + "kb</span> <span class='close-icon'></span> </p>")
				}, e
			}(i)
		}, {
			"./../list/listitemview.coffee": 53
		}
	],
	93: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./fileuploadlistview.coffee"), e.exports = i = function (t) {
				function e(t, n) {
					null == t.itemClass && (t.itemClass = KDFileUploadThumbItemView), e.__super__.constructor.call(this, t, n), this.setClass("kdfileuploadthumblist")
				}
				return s(e, t), e
			}(n)
		}, {
			"./fileuploadlistview.coffee": 91
		}
	],
	94: [
		function (t, e) {
			var n, i, o, s, r, a, l, u, c = {}.hasOwnProperty,
				p = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) c.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			u = t("./../../core/view.coffee"), r = t("./../list/listviewcontroller.coffee"), l = t("./../notifications/notificationview.coffee"), n = t("./fileuploadarea.coffee"), i = t("./fileuploadlistview.coffee"), o = t("./fileuploadthumblistview.coffee"), a = t("./multipartuploader.coffee"), e.exports = s = function (t) {
				function e(t, n) {
					null != window.FileReader ? (null == t.limit && (t.limit = 20), null == t.fileMaxSize && (t.fileMaxSize = 4096), null == t.filetotalSize && (t.filetotalSize = 4096), null == t.extensions && (t.extensions = null), null == t.preview && (t.preview = "list"), null == t.title && (t.title = "Drop your files here!"), null == t.onlyOne && (t.onlyOne = !1), e.__super__.constructor.call(this, t, n), this.listController = null, this.addDropArea(), this.addList(), this.files = {}, this.totalSizeToUpload = 0, this.setClass("kdfileupload")) : (e.__super__.constructor.call(this, t, n), this.setPartial("<p class='warning info'><strong>Oops sorry,</strong> file upload is only working on Chrome, Firefox and Opera at the moment. We're working on a fix.</p>"))
				}
				return p(e, t), e.prototype.addDropArea = function () {
					return this.dropArea = new n({
						title: this.getOptions().title,
						bind: "drop dragenter dragleave dragover dragstart dragend",
						cssClass: "kdfileuploadarea",
						delegate: this
					}), this.addSubView(this.dropArea)
				}, e.prototype.addList = function () {
					return this.fileList = function () {
						switch (this.getOptions().preview) {
						case "thumbs":
							return this.addThumbnailList();
						default:
							return this.addFileList()
						}
					}.call(this), this.listController = new r({
						view: this.fileList
					}), this.addSubView(this.listController.getView())
				}, e.prototype.addFileList = function () {
					return new i({
						delegate: this
					})
				}, e.prototype.addThumbnailList = function () {
					return new o({
						delegate: this
					})
				}, e.prototype.fileDropped = function (t) {
					var e;
					return e = new a({
						url: "/Upload",
						file: t
					}), e.send(), e.once("FileReadComplete", function (e) {
						return function (n) {
							return e.emit("FileReadComplete", {
								file: t,
								progressEvent: n
							}), e.fileReadComplete(t, n)
						}
					}(this)), e.once("FileUploadSuccess", function (e) {
						return function (n) {
							return e.fileUploadComplete(t, n)
						}
					}(this)), e.once("FileUploadError", this.bound("handleUploadError"))
				}, e.prototype.handleUploadError = function () {}, e.prototype.fileUploadComplete = function (t, e) {
					var n;
					return null != (n = this.fileList.itemsByName[t.name]) && n.setClass("uploaded"), this.emit("FileUploadComplete", e)
				}, e.prototype.fileReadComplete = function (t, e) {
					return t.data = e.target.result, this.putFileInQueue(t)
				}, e.prototype.putFileInQueue = function (t) {
					return this.getOptions().onlyOne && (this.files = {}, this.fileList.empty()), !this.isDuplicate(t) && this.checkLimits(t) ? (this.files[t.name] = t, this.fileList.addItem(t), !0) : !1
				}, e.prototype.removeFile = function (t) {
					var e;
					return e = t.getData(), delete this.files[e.name], this.fileList.removeItem(t)
				}, e.prototype.isDuplicate = function (t) {
					return null != this.files[t.name] ? (this.notify("File is already in queue!"), !0) : !1
				}, e.prototype.checkLimits = function (t) {
					return this.checkFileAmount() && this.checkFileSize(t) && this.checkTotalSize(t)
				}, e.prototype.checkFileAmount = function () {
					var t, e, n, i, o;
					n = this.getOptions().limit, t = 1, o = this.files;
					for (i in o) c.call(o, i) && (e = o[i], t++);
					return t > n ? (this.notify("Total number of allowed file is " + n), !1) : !0
				}, e.prototype.checkTotalSize = function (t) {
					var e, n, i, o;
					n = this.getOptions().totalMaxSize, i = t.size, o = this.files;
					for (e in o) c.call(o, e) && (t = o[e], i += t.size);
					return i / 1024 > n ? (this.notify("Total allowed filesize is " + n + " kilobytes"), !1) : !0
				}, e.prototype.checkFileSize = function (t) {
					var e;
					return e = this.getOptions().fileMaxSize, t.size / 1024 > e ? (this.notify("Maximum allowed filesize is " + e + " kilobytes"), !1) : !0
				}, e.prototype.notify = function (t) {
					return new l({
						title: t,
						duration: 2e3,
						type: "tray"
					})
				}, e
			}(u)
		}, {
			"./../../core/view.coffee": 108,
			"./../list/listviewcontroller.coffee": 55,
			"./../notifications/notificationview.coffee": 61,
			"./fileuploadarea.coffee": 89,
			"./fileuploadlistview.coffee": 91,
			"./fileuploadthumblistview.coffee": 93,
			"./multipartuploader.coffee": 95
		}
	],
	95: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			n = t("./../../core/eventemitter.coffee"), e.exports = i = function (t) {
				function e(t) {
					var n;
					if (this.url = t.url, this.file = t.file, n = t.id, !("FileReader" in window)) throw new Error("FileReader API not found!");
					e.__super__.constructor.call(this), this.id = null != n ? n : "file"
				}
				var n;
				return s(e, t), n = "gc0p4Jq0M2Yt08jU534c0p", e.prototype.makeMultipartItem = function (t, e) {
					return "--" + n + '\r\n Content-Disposition: form-data; name="' + t + '"\r\n\r\n ' + e + "\r\n"
				}, e.prototype.serializedToMultipart = function (t) {
					var e;
					return function () {
						var n, i, o;
						for (o = [], n = 0, i = t.length; i > n; n++) e = t[n], o.push(this.makeMultipartItem(e.name, e.value));
						return o
					}.call(this).join("")
				}, e.prototype.fileToMultipart = function (t) {
					var e, i;
					return e = new FileReader, this.file ? (i = function (t) {
						return function (e) {
							return "--" + n + '\r\n Content-Disposition: form-data; name="' + t.id + '"; filename="' + t.file.name + '"\r\n Content-Type: ' + t.file.type + "\r\n\r\n " + e + "\r\n --" + n + "--\r\n"
						}
					}(this), e.onload = function (e) {
						return function (n) {
							return n.loaded === n.total ? (e.emit("FileReadComplete", n), t(i(n.currentTarget.result))) : void 0
						}
					}(this), e.readAsBinaryString(this.file)) : t("")
				}, e.prototype.send = function () {
					var t, e, i;
					return e = new FileReader, i = new XMLHttpRequest, t = "", i.open("POST", this.url, !0), i.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + n), i.onreadystatechange = function (t) {
						return function () {
							return 4 === i.readyState ? i.status >= 200 && i.status < 400 ? t.emit("FileUploadSuccess", JSON.parse(i.responseText)) : t.emit("FileUploadError", i) : void 0
						}
					}(this), t += this.serializedToMultipart([{
						name: "" + this.id + "-size",
						value: this.file.size
					}]), this.fileToMultipart(function (e) {
						var n, o, s, r, a;
						for (t += e, r = s = t.length, n = new ArrayBuffer(r), a = new Uint8Array(n); s--;) a[s] = 255 & t.charCodeAt(s);
						return o = new Blob([a]), i.send(o)
					}), this
				}, e
			}(n)
		}, {
			"./../../core/eventemitter.coffee": 98
		}
	],
	96: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./object.coffee"), e.exports = n = function (t) {
				function e() {
					return e.__super__.constructor.apply(this, arguments)
				}
				return s(e, t), e
			}(i)
		}, {
			"./object.coffee": 104
		}
	],
	97: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./view.coffee"), e.exports = n = function (t) {
				function e(t, n) {
					var i, o;
					null == t && (t = {}), "string" == typeof t && (this.tagName = t), null == this.tagName && (this.tagName = null != (i = t.tagName) ? i : "div"), "a" === this.tagName && null == (null != (o = t.attributes) ? o.href : void 0) && (t.attributes || (t.attributes = {}), t.attributes.href = "#"), e.__super__.constructor.call(this, t, n)
				}
				return s(e, t), e.prototype.setDomElement = function () {
					var t;
					return e.__super__.setDomElement.apply(this, arguments), this.unsetClass("kdview"), t = this.getElement(), t.classList.length ? void 0 : t.removeAttribute("class")
				}, e
			}(i)
		}, {
			"./view.coffee": 108
		}
	],
	98: [
		function (t, e) {
			var n, i = [].slice;
			e.exports = n = function () {
				function t(t) {
					var e;
					null == t && (t = {}), e = t.maxListeners, this._e = {}, this._maxListeners = e > 0 ? e : 10
				}
				var e, n, o, s;
				return t.registerStaticEmitter = function () {
					return this._e = {}
				}, o = function (t, e, n) {
					return null == t[e] && (t[e] = []), t[e].push(n)
				}, s = function (t, e, n) {
					var i;
					return e && "*" !== e ? n && t[e] ? (i = t[e].indexOf(n), i >= 0 ? t[e].splice(i, 1) : void 0) : t[e] = [] : t = {}
				}, n = function (t, e, n) {
					var i, s, r, a;
					if (null == e) throw new Error("Try passing an event, genius!");
					if (null == n) throw new Error("Try passing a listener, genius!");
					if (Array.isArray(e)) {
						for (a = [], s = 0, r = e.length; r > s; s++) i = e[s], a.push(o(t, i, n));
						return a
					}
					return o(t, e, n)
				}, e = function (t, e, n) {
					var i, o, r, a;
					if (Array.isArray(e)) {
						for (a = [], o = 0, r = e.length; r > o; o++) i = e[o], a.push(s(t, i, n));
						return a
					}
					return s(t, e, n)
				}, t.emit = function () {
					var t, e, n, o, s, r, a;
					if (null == this._e) throw new Error("Static events are not enabled for this constructor.");
					for (e = arguments[0], t = 2 <= arguments.length ? i.call(arguments, 1) : [], o = null != (s = this._e)[e] ? s[e] : s[e] = [], r = 0, a = o.length; a > r; r++) n = o[r], n.apply(null, t);
					return this
				}, t.on = function (t, e) {
					if ("function" != typeof e) throw new Error("listener is not a function");
					if (null == this._e) throw new Error("Static events are not enabled for this constructor.");
					return this.emit("newListener", e), n(this._e, t, e), this
				}, t.off = function (t, n) {
					return this.emit("listenerRemoved", t, n), e(this._e, t, n), this
				}, t.prototype.emit = function () {
					var t, e, n, o;
					return e = arguments[0], t = 2 <= arguments.length ? i.call(arguments, 1) : [], null == (o = this._e)[e] && (o[e] = []), n = [], n = n.concat(this._e[e].slice(0)), n.forEach(function (e) {
						return function (n) {
							return n.apply(e, t)
						}
					}(this)), this
				}, t.prototype.on = function (t, e) {
					if ("function" != typeof e) throw new Error("listener is not a function");
					return this.emit("newListener", t, e), n(this._e, t, e), this
				}, t.prototype.off = function (t, n) {
					return this.emit("listenerRemoved", t, n), e(this._e, t, n), this
				}, t.prototype.once = function (t, e) {
					var n;
					return n = function (i) {
						return function () {
							var o;
							return o = [].slice.call(arguments), i.off(t, n), e.apply(i, o)
						}
					}(this), this.on(t, n), this
				}, t
			}()
		}, {}
	],
	99: [
		function (t, e) {
			var n, i = {}.hasOwnProperty,
				o = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var o in e) i.call(e, o) && (t[o] = e[o]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				s = [].slice;
			n = t("./eventemitter.coffee"), e.exports = n.Wildcard = function (t) {
				function e(t) {
					null == t && (t = {}), e.__super__.constructor.apply(this, arguments), this._delim = t.delimiter || "."
				}
				var n, i, r, a;
				return o(e, t), a = "*", i = "_listeners", e.prototype.setMaxListeners = function (t) {
					return this._maxListeners = t
				}, n = function (t, e, o) {
					var s, r, l, u;
					return null == o && (o = 0), s = [], o === e.length && (l = t[i]), u = t[a], r = t[e[o]], null != l && (s = s.concat(l)), null != u && (s = s.concat(n(u, e, o + 1))), null != r && (s = s.concat(n(r, e, o + 1))), s
				}, r = function (t, e, n, o) {
					var s, a, l, u;
					return null == o && (o = 0), s = e[o], u = t[s], null != u ? r(u, e, n, o + 1) : void(t[i] = null != n && null != (l = t[i]) ? function () {
						var t, e, i;
						for (i = [], t = 0, e = l.length; e > t; t++) a = l[t], a !== n && i.push(a);
						return i
					}() : [])
				}, e.prototype.emit = function () {
					var t, e, i, o, r, a, l;
					for (t = arguments[0], r = 2 <= arguments.length ? s.call(arguments, 1) : [], this.hasOwnProperty("event") && (o = this.event), this.event = t, i = n(this._e, t.split(this._delim)), a = 0, l = i.length; l > a; a++) e = i[a], e.apply(this, r);
					return null != o ? this.event = o : delete this.event, this
				}, e.prototype.off = function (t, e) {
					return r(this._e, (null != t ? t : "*").split(this._delim), e), this
				}, e.prototype.on = function (t, e) {
					var n, o, s, r, a, l;
					if ("function" != typeof e) throw new Error("listener is not a function");
					for (this.emit("newListener", t, e), o = t.split("."), r = this._e, a = 0, l = o.length; l > a; a++) n = o[a], r = null != r[n] ? r[n] : r[n] = {};
					return s = null != r[i] ? r[i] : r[i] = [], s.push(e), this
				}, e
			}(n)
		}, {
			"./eventemitter.coffee": 98
		}
	],
	100: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty;
			if (o = window.utils = t("./utils.coffee"), t("./support"), window.KD || (window.KD = {}), i = window.noop = function () {}, KD.log = window.log = console.log.bind(console), KD.warn = window.warn = console.warn.bind(console), KD.error = window.error = console.error.bind(console), null == window.event) try {
				Object.defineProperty(window, "event", {
					get: function () {
						return KD.warn('Global "event" property is accessed. Did you forget a parameter in a DOM event handler?')
					}
				})
			} catch (r) {
				n = r, log("we fail silently!", n)
			}
			window.KD = $.extend(window.KD, function () {
				var t;
				return t = function (t, e, n) {
					var i, o;
					return i = null != (o = this.classes[t]) ? o : this.classes["KD" + t], null != i ? new i(e, n) : void 0
				}, {
					create: t,
					"new": t,
					debugStates: {},
					instances: {},
					singletons: {},
					subscriptions: [],
					classes: {},
					utils: o,
					lastFuncCall: null,
					instancesToBeTested: {},
					registerInstance: function (t) {
						return this.instances[t.id] && warn("Instance being overwritten!!", t), this.instances[t.id] = t
					},
					unregisterInstance: function (t) {
						return delete this.instances[t]
					},
					deleteInstance: function (t) {
						return this.unregisterInstance(t)
					},
					extend: function (t) {
						var e, n, i;
						i = [];
						for (e in t) {
							if (n = t[e], this[e]) throw new Error("" + e + " is already registered");
							i.push(this[e] = n)
						}
						return i
					},
					registerSingleton: function (t, e, n) {
						var i;
						return null == n && (n = !1), null != (i = KD.singletons[t]) ? n ? (warn('singleton overriden! KD.singletons["' + t + '"]'), "function" == typeof i.destroy && i.destroy(), KD.singletons[t] = e) : (error('KD.singletons["' + t + '"] singleton exists! if you want to override set override param to true]'), KD.singletons[t]) : KD.singletons[t] = e
					},
					getSingleton: function (t) {
						return null != KD.singletons[t] ? KD.singletons[t] : (warn('"' + t + "\" singleton doesn't exist!"), null)
					},
					getAllKDInstances: function () {
						return KD.instances
					},
					getKDViewInstanceFromDomElement: function (t) {
						return this.instances[t.getAttribute("data-id")]
					},
					exportKDFramework: function () {
						var t, e;
						e = KD.classes;
						for (t in e) s.call(e, t) && (window[t] = KD.classes[t]);
						return KD.exportKDFramework = function () {
							return "Already exported."
						}, "KDFramework loaded successfully."
					},
					registerInstanceForTesting: function (t) {
						var e;
						return e = t.getOption("testPath"), this.instancesToBeTested[e] = t, t.on("KDObjectWillBeDestroyed", function (t) {
							return function () {
								return delete t.instancesToBeTested[e]
							}
						}(this))
					},
					getInstanceForTesting: function (t) {
						return this.instancesToBeTested[t]
					}
				}
			}()), e.exports = KD
		}, {
			"./support": 106,
			"./utils.coffee": 107
		}
	],
	101: [
		function (t, e) {
			var n = {};
			n.dom = n.dom || {},
				function (t) {
					{
						var e, i = t.document,
							o = function (t, e) {
								var n = t[e];
								return "object" == typeof n && null !== n
							},
							s = function (t, e) {
								var n = t[e],
									i = typeof n;
								return "function" == i || "object" == i && null !== n || "unknown" == i
							},
							r = function () {
								for (var t = arguments.length; t--;)
									if (!n.dom[arguments[t]]) return !1;
								return !0
							},
							a = o(i, "documentElement") && i.documentElement,
							l = !!Function.prototype.call;
						!(!a || !o(a, "style"))
					}
					e = function (t) {
						for (var e = [], n = 0, i = t.length; i > n; n++) e[n] = t[n];
						return e
					};
					var u;
					a && s(a, "removeEventListener") && (u = function (t, e, n) {
						t.removeEventListener(e, n, !1)
					});
					var c;
					a && s(a, "addEventListener") && (c = function (t) {
						var e = t.target;
						return 1 != e.nodeType && (e = e.parentNode), e
					});
					var p;
					a && s(a, "addEventListener") && (p = function (t, e, n) {
						var i = function (e) {
							n.call(t, e)
						};
						return t.addEventListener(e, i, !1), i
					});
					var h;
					i && s(i, "querySelectorAll") && e && (h = function (t, n) {
						return e((n || document).querySelectorAll(t))
					});
					var d;
					i && s(i, "querySelector") && (d = function (t, e) {
						return (e || document).querySelector(t)
					});
					var f;
					f = function (t, e) {
						for (var n = !1, i = 0, o = e.length; o > i; i++)
							if (e[i] === t) {
								n = !0;
								break
							}
						return n
					};
					var m;
					l && Function.prototype.bind && (m = function (t) {
						return t.bind.apply(t, Array.prototype.slice.call(arguments, 1))
					});
					var g;
					u && (g = function (t, e, n) {
						return u(t, e, n)
					});
					var v;
					p && c && l && (v = function (t, e, n, i) {
						var o = function (e) {
							var o = i(t, c(e));
							o && n.call(o, e, o, t)
						};
						return p(t, e, o)
					});
					var y;
					y = function (t) {
						var e = (t.tagName || t.nodeName).toLowerCase();
						return e.indexOf("html:") > -1 ? e.substring(5) : e
					};
					var w;
					a && o(a, "parentNode") && (w = function (t) {
						var e = t.parentNode,
							n = null;
						return e && (e.tagName || 1 == e.nodeType) && (n = e), n
					});
					var b;
					f && h && (b = function (t, e) {
						return f(t, h(e))
					});
					var _;
					a && "undefined" != typeof a.parentNode && (_ = function (t, e) {
						for (var n = e.parentNode; n && n != t;) n = n.parentNode;
						return n == t
					});
					var C;
					p && m && c && l && (C = function (t, e, n, i, o) {
						var s = m(function (e) {
							var s = i(t, c(e));
							s && n.call(o, e, s)
						}, o);
						return p(t, e, s)
					});
					var D;
					a && o(a, "classList") && s(a.classList, "contains") && (D = function (t, e) {
						return t.classList.contains(e)
					});
					var O;
					window && s(window, "addEventListener") && (O = function (t, e) {
						var n = function (t) {
							e.call(window, t)
						};
						return window.addEventListener(t, n, !1), n
					});
					var k;
					"number" == typeof window.pageXOffset && "number" == typeof window.pageYOffset && (k = function () {
						return [window.pageXOffset, window.pageYOffset]
					});
					var V;
					a && s(a, "getBoundingClientRect") && (V = function (t) {
						var e = t.getBoundingClientRect();
						return [e.left, e.top]
					});
					var x;
					s(document, "getElementById") && (x = function (t, e) {
						return (e || document).getElementById(t)
					});
					var I;
					g && (I = function (t, e, n) {
						return g(t, e, n)
					});
					var S;
					s(t, "scrollTo") && (S = function (t, e) {
						window.scrollTo(t, e)
					});
					var E;
					E = function (t, e) {
						t.value = e
					};
					var P;
					"number" == typeof t.innerWidth && (P = function (t) {
						return t || (t = window), [t.innerWidth, t.innerHeight]
					});
					var T;
					a && s(a, "addEventListener") && (T = function (t) {
						var e = t.relatedTarget;
						return 1 != e.nodeType && (e = e.parentNode), e
					});
					var L;
					window && s(window, "removeEventListener") && (L = function (t, e) {
						return window.removeEventListener(t, e)
					});
					var A;
					u && (A = function (t, e, n) {
						return u(t, e, n)
					});
					var N;
					v && y && (N = function (t, e, n, i) {
						var o = function (t, e) {
							var i, o;
							if (y(e) === n) i = e;
							else
								for (o = w(e); null !== o && o !== t;) {
									if (y(o) === n) {
										i = o;
										break
									}
									o = w(o)
								}
							return i
						};
						return v(t, e, i, o)
					});
					var z;
					f && v && h && _ && (z = function (t, e, n, i) {
						function o(t) {
							var e, i, o = h(n),
								s = 0;
							if (f(t, o)) return t;
							for (e = o.length; e > s; s++)
								if (i = o[s], _(i, t)) return i
						}
						return v(t, e, i, o)
					});
					var K;
					C && h && _ && (K = function (t, e, n, i, o) {
						var s = function (t, e) {
							if (b(e, n)) return e;
							for (var i = jessie.query(n), o = 0; o < i.length; o++)
								if (_(i[o], e)) return i[o]
						};
						return C(t, e, i, s, o)
					});
					var F;
					C && D && w && (F = function (t, e, n, i, o) {
						var s = function (t, e) {
							var i = e;
							for (t === i && (i = null); i && i !== t && !D(i, n);) i = w(i), t === i && (i = null);
							return i
						};
						return C(t, e, i, s, o)
					});
					var $;
					a && s(a, "addEventListener") && ($ = function (t) {
						t.stopPropagation()
					});
					var M;
					a && s(a, "addEventListener") && (M = function (t) {
						t.preventDefault()
					});
					var R;
					i && s(i, "addEventListener") && p && (R = function (t, e) {
						return p(document, t, e)
					});
					var H;
					O && m && (H = function (t, e, n) {
						var i = m(e, n);
						return O(t, i)
					});
					var B;
					m && p && (B = function (t, e, n, i) {
						var o = m(n, i);
						return i = null, p(t, e, o)
					});
					var W;
					a && "string" == typeof a.textContent ? W = function (t, e) {
						t.textContent = e
					} : a && "string" == typeof a.innerText && (W = function (t, e) {
						t.innerText = e
					});
					var j;
					a && o(a, "style") && (j = function () {
						var t = "number" == typeof a.style.top ? 0 : "px";
						return function (e, n, i) {
							null !== n && n >= 0 && (e.style.height = n + t), null !== i && i >= 0 && (e.style.width = i + t)
						}
					}());
					var q;
					a && o(a, "style") && (q = function () {
						var t = "number" == typeof a.style.top ? 0 : "px";
						return function (e, n, i) {
							null !== n && (e.style.left = n + t), null !== i && (e.style.top = i + t)
						}
					}());
					var U;
					a && "string" == typeof a.innerHTML && (U = function (t, e) {
						t.innerHTML = e
					});
					var X;
					a && o(a, "classList") && s(a.classList, "remove") && (X = function (t, e) {
						return t.classList.remove(e)
					});
					var J;
					a && s(a, "removeChild") && (J = function (t, e) {
						return t.removeChild(e)
					});
					var Y;
					a && s(a, "insertAdjacentHTML") && (Y = function (t, e) {
						t.insertAdjacentHTML("afterBegin", e)
					});
					var Q;
					a && "string" == typeof a.textContent ? Q = function (t) {
						return t.textContent
					} : a && "string" == typeof a.innerText && (Q = function (t) {
						return t.innerText
					});
					var G;
					o(i, "defaultView") && s(i.defaultView, "getComputedStyle") && (G = function (t, e) {
						return document.defaultView.getComputedStyle(t, null)[e]
					});
					var Z;
					V && k && (Z = function (t) {
						var e = V(t),
							n = k(),
							i = e[0] + n[0],
							o = e[1] + n[1];
						return [i, o]
					});
					var te;
					a && "number" == typeof a.offsetWidth && (te = function (t) {
						return [t.offsetHeight, t.offsetWidth]
					});
					var ee;
					a && "number" == typeof a.clientWidth && (ee = function (t) {
						return [t.clientHeight, t.clientWidth]
					});
					var ne;
					a && "string" == typeof a.innerHTML && (ne = function (t) {
						return t.innerHTML
					});
					var ie;
					i && s(i, "getElementsByTagName") && e && (ie = function (t, n) {
						return e((t || document).getElementsByTagName(n))
					});
					var oe;
					i && s(i, "getElementsByClassName") && e && (oe = function (t, n) {
						return e((t || document).getElementsByClassName(n))
					});
					var se;
					w && y && (se = function (t, e) {
						for (t = w(t); t && e && y(t) != e;) t = w(t);
						return t
					});
					var re;
					a && "string" == typeof a.className && w && D && (re = function (t, e) {
						for (t = w(t); t && !D(t, e);) t = w(t);
						return t
					});
					var ae;
					a && o(a, "style") && (ae = function (t, e) {
						if ("string" != typeof e.style[t]) {
							var n = ["Moz", "O", "Khtml", "Webkit", "Ms"],
								i = n.length;
							for (t = t.charAt(0).toUpperCase() + t.substring(1); i--;)
								if ("undefined" != typeof e.style[n[i] + t]) return n[i] + t;
							return null
						}
						return t
					});
					var le;
					i && s(i, "createElement") && (le = function (t, e) {
						return (e || document).createElement(t)
					});
					var ue;
					U && le && (ue = function (t, e) {
						var n;
						return elTemp = le("div", e), elTemp && (U(t), n = elTemp.childNodes, elTemp = null), n
					});
					var ce;
					a && s(a, "insertAdjacentHTML") && (ce = function (t, e) {
						t.insertAdjacentHTML("beforeEnd", e)
					});
					var pe;
					a && s(a, "appendChild") && (pe = function (t, e) {
						return t.appendChild(e)
					});
					var he;
					a && o(a, "classList") && s(a.classList, "add") && (he = function (t, e) {
						return t.classList.add(e)
					}), n.dom.isHostMethod = s, n.dom.isHostObjectProperty = o, n.dom.areFeatures = r, n.dom.toArray = e, n.dom.detachListener = u, n.dom.getEventTarget = c, n.dom.attachListener = p, n.dom.query = h, n.dom.queryOne = d, n.dom.isNodeInNodeList = f, n.dom.bind = m, n.dom.undelegateListener = g, n.dom.delegateListener = v, n.dom.getElementTagName = y, n.dom.getElementParentElement = w, n.dom.isInQuery = b, n.dom.isDescendant = _, n.dom.delegateBoundListener = C, n.dom.hasClass = D, n.dom.attachWindowListener = O, n.dom.getViewportScrollPosition = k, n.dom.getPositionRelativeToViewport = V, n.dom.getElement = x, n.dom.undelegateQueryListener = I, n.dom.setViewportScrollPosition = S, n.dom.setInputValue = E, n.dom.getViewportSize = P, n.dom.getEventTargetRelated = T, n.dom.detachWindowListener = L, n.dom.detachBoundListener = A, n.dom.delegateTagNameListener = N, n.dom.delegateQueryListener = z, n.dom.delegateBoundQueryListener = K, n.dom.delegateBoundClassNameListener = F, n.dom.cancelPropagation = $, n.dom.cancelDefault = M, n.dom.attachDocumentListener = R, n.dom.attachBoundWindowListener = H, n.dom.attachBoundListener = B, n.dom.setText = W, n.dom.setSize = j, n.dom.setPosition = q, n.dom.setHtml = U, n.dom.removeClass = X, n.dom.removeChild = J, n.dom.prependHtml = Y, n.dom.getText = Q, n.dom.getStyleComputed = G, n.dom.getPositionRelativeToDocument = Z, n.dom.getOuterSize = te, n.dom.getInnerSize = ee, n.dom.getHtml = ne, n.dom.getDescendantsByTagName = ie, n.dom.getDescendantsByClassName = oe, n.dom.getAncestorByTagName = se, n.dom.getAncestorByClassName = re, n.dom.findProprietaryStyle = ae, n.dom.createElement = le, n.dom.htmlToNodes = ue, n.dom.appendHtml = ce, n.dom.appendChild = pe, n.dom.addClass = he, i = a = null
				}(window), e.exports = n.dom
		}, {}
	],
	102: [
		function (t, e) {
			var n, i = {}.hasOwnProperty;
			e.exports = n = function () {
				function t() {
					this.maps = {}, this.isListening = !1
				}
				var e;
				return e = function (t) {
					return function () {
						var e, n;
						return e = this.isListening, e && this.reset(), n = t.apply(this, arguments), e && this.listen(), n
					}
				}, t.prototype.addComboMap = e(function (t, e) {
					var n, i, o, s;
					return n = null != (i = this.maps)[o = null != (s = null != e ? e : t.priority) ? s : 0] ? i[o] : i[o] = [], n.push(t), this
				}), t.prototype.removeComboMap = e(function (t) {
					var e, n, o;
					o = this.maps;
					for (n in o) i.call(o, n) && (e = o[n], this.maps[n] = e.filter(function (e) {
						return e !== t
					}));
					return this
				}), t.prototype.listen = function () {
					var e, n;
					return this.isActive() ? this : (null != (n = t.currentListener) && n.reset(), e = {}, this.combos(function (t, n, i) {
						var o;
						return null == n && (n = {
							global: !0
						}), e[t] ? void 0 : (e[t] = !0, o = n.global ? "bindGlobal" : "bind", Mousetrap[o](t, i))
					}), t.currentListener = this, this.isListening = !0, this)
				}, t.prototype.reset = function () {
					return this.isActive() ? (Mousetrap.reset(), this.isListening = !1, t.currentListener = null, this) : this
				}, t.prototype.getCombos = function () {
					return Object.keys(this.maps).sort(function (t, e) {
						return e - t
					}).map(function (t) {
						return function (e) {
							return t.maps[e]
						}
					}(this)).reduce(function (t, e) {
						return t.concat(e)
					}, [])
				}, t.prototype.combos = function (t) {
					return this.getCombos().forEach(function (e) {
						return e.eachCombo(t)
					}), this
				}, t.prototype.isActive = function () {
					return this.isListening && this === t.currentListener
				}, t.current = function () {
					return null != this.currentListener ? this.currentListener : (this.currentListener = new this, this.currentListener.listen(), this.currentListener)
				}, t
			}()
		}, {}
	],
	103: [
		function (t, e) {
			var n, i = {}.hasOwnProperty;
			e.exports = n = function () {
				function t(t) {
					var e, n, o;
					if (this.combos = {}, null != t && (n = t.combos, this.priority = t.priority), null != n)
						for (e in n) i.call(n, e) && (o = n[e], this.addCombo(e, null, o))
				}
				return t.prototype.addCombo = function (t, e, n) {
					var i;
					return null == n && (i = [e, n], n = i[0], e = i[1]), this.combos[t] = {
						listener: n,
						options: e
					}, this
				}, t.prototype.removeCombo = function (t) {
					return this.combos[t] = null, this
				}, t.prototype.eachCombo = function (t, e) {
					var n, o, s, r, a;
					r = this.combos;
					for (n in r) i.call(r, n) && (a = r[n], s = a.options, o = a.listener, t.call(e, n, s, o))
				}, t
			}()
		}, {}
	],
	104: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				a = [].slice;
			n = t("./kd.coffee"), i = t("./eventemitter.coffee"), e.exports = o = function (t) {
				function e(t, i) {
					null == t && (t = {}), this.id || (this.id = t.id || n.utils.getUniqueId()), this.setOptions(t), i && this.setData(i), t.delegate && this.setDelegate(t.delegate), this.registerKDObjectInstance(), e.__super__.constructor.apply(this, arguments), t.testPath && n.registerInstanceForTesting(this), this.on("error", error), this.once("ready", function (t) {
						return function () {
							return t.readyState = o
						}
					}(this))
				}
				var i, o, s;
				return r(e, t), s = [0, 1], i = s[0], o = s[1], e.prototype.utils = n.utils, e.prototype.bound = function (t) {
					var e;
					if ("function" != typeof this[t]) throw new Error("bound: unknown method! " + t);
					return e = "__bound__" + t, e in this || Object.defineProperty(this, e, {
						value: this[t].bind(this)
					}), this[e]
				}, e.prototype.lazyBound = function () {
					var t, e, n;
					return t = arguments[0], e = 2 <= arguments.length ? a.call(arguments, 1) : [], (n = this[t]).bind.apply(n, [this].concat(a.call(e)))
				}, e.prototype.forwardEvent = function (t, e, n) {
					return null == n && (n = ""), t.on(e, this.lazyBound("emit", n + e))
				}, e.prototype.forwardEvents = function (t, e, n) {
					var i, o, s, r;
					for (null == n && (n = ""), r = [], o = 0, s = e.length; s > o; o++) i = e[o], r.push(this.forwardEvent(t, i, n));
					return r
				}, e.prototype.ready = function (t) {
					return ("undefined" != typeof Promise && null !== Promise ? Promise.prototype.nodeify : void 0) ? new Promise(function (t) {
						return function (e) {
							return t.readyState === o && e(), t.once("ready", e)
						}
					}(this)).nodeify(t) : this.readyState === o ? this.utils.defer(t) : this.once("ready", t)
				}, e.prototype.registerSingleton = n.registerSingleton, e.prototype.getSingleton = n.getSingleton, e.prototype.getInstance = function (t) {
					var e;
					return null != (e = n.getAllKDInstances()[t]) ? e : null
				}, e.prototype.registerKDObjectInstance = function () {
					return n.registerInstance(this)
				}, e.prototype.setData = function (t) {
					this.data = t
				}, e.prototype.getData = function () {
					return this.data
				}, e.prototype.setOptions = function (t) {
					this.options = null != t ? t : {}
				}, e.prototype.setOption = function (t, e) {
					return this.options[t] = e
				}, e.prototype.unsetOption = function (t) {
					return this.options[t] ? delete this.options[t] : void 0
				}, e.prototype.getOptions = function () {
					return this.options
				}, e.prototype.getOption = function (t) {
					var e;
					return null != (e = this.options[t]) ? e : null
				}, e.prototype.changeId = function (t) {
					return n.deleteInstance(t), this.id = t, n.registerInstance(this)
				}, e.prototype.getId = function () {
					return this.id
				}, e.prototype.setDelegate = function (t) {
					this.delegate = t
				}, e.prototype.getDelegate = function () {
					return this.delegate
				}, e.prototype.destroy = function () {
					return this.isDestroyed = !0, this.emit("KDObjectWillBeDestroyed"), n.deleteInstance(this.id)
				}, e.prototype.chainNames = function (t) {
					return t.chain, t.newLink, "" + t.chain + "." + t.newLink
				}, e
			}(i)
		}, {
			"./eventemitter.coffee": 98,
			"./kd.coffee": 100
		}
	],
	105: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				a = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				},
				l = [].slice;
			i = t("./object.coffee"), n = t("./../components/notifications/notificationview.coffee"), e.exports = o = function (t) {
				function e(t) {
					e.__super__.constructor.call(this), this.tree = {}, this.routes = {}, this.visitedRoutes = [], t && this.addRoutes(t), KD.utils.defer(function (t) {
						return function () {
							return e.emit("RouterIsReady", t)
						}
					}(this))
				}
				var i, o, u, c, p;
				return r(e, t), o = window.history, u = "ಠ_ಠ", e.registerStaticEmitter(), i = function (t) {
					var e;
					if (null != (null != t ? t.bongo_ : void 0) && null != t.getId) return {
						constructorName: null != (e = t.bongo_) ? e.constructorName : void 0,
						id: t.getId()
					}
				}, c = function (t, e) {
					return null == (null != t ? t.constructorName : void 0) || null == t.id ? e(null) : KD.remote.cacheable(t.constructorName, t.id, e)
				}, e.prototype.listen = function () {
					var t;
					return location.hash.length && (t = location.hash.substr(1), this.userRoute = t, this.utils.defer(function (e) {
						return function () {
							return e.handleRoute(t, {
								shouldPushState: !0,
								replaceState: !0
							})
						}
					}(this))), this.startListening()
				}, e.prototype.popState = function (t) {
					return c(t.state, function (t) {
						return function (e, n) {
							return e ? KD.showError(e) : t.handleRoute("" + location.pathname + location.search, {
								shouldPushState: !1,
								state: n
							})
						}
					}(this))
				}, e.prototype.clear = function (t, e) {
					return null == t && (t = "/"), null == e && (e = !0), delete this.userRoute, this.handleRoute(t, {
						replaceState: e
					})
				}, e.prototype.back = function () {
					return this.visitedRoutes.length <= 1 ? this.clear() : o.back()
				}, e.prototype.startListening = function () {
					return this.isListening ? !1 : (this.isListening = !0, window.addEventListener("popstate", this.bound("popState")), !0)
				}, e.prototype.stopListening = function () {
					return this.isListening ? (this.isListening = !1, window.removeEventListener("popstate", this.bound("popState")), !0) : !1
				}, e.handleNotFound = function (t) {
					return console.trace(), log("The route " + Encoder.XSSEncode(t) + " was not found!")
				}, e.prototype.getCurrentPath = function () {
					return this.currentPath
				}, e.prototype.handleNotFound = function (t) {
					var e;
					return e = /<|>/.test(t) ? "Invalid route!" : "404 Not found! " + Encoder.XSSEncode(t), delete this.userRoute, this.clear(), log("The route " + t + " was not found!"), new n({
						title: e
					})
				}, p = function (t, e) {
					return "/" + t.slice(0, e).concat(t.slice(e + 1)).join("/")
				}, e.prototype.addRoute = function (t, e) {
					var n, i, o, s, r, l;
					for (this.routes[t] = e, s = this.tree, t = t.split("/"), t.shift(), i = r = 0, l = t.length; l > r; i = ++r) n = t[i], o = n.length - 1, "?" === n.charAt(o) && (this.addRoute(p(t, i), e), n = n.substr(0, o)), /^:/.test(n) ? (s[":"] || (s[":"] = {
						name: n.substr(1)
					}), s = s[":"]) : (s[n] || (s[n] = {}), s = s[n]);
					return s[u] || (s[u] = []), a.call(s[u], e) < 0 ? s[u].push(e) : void 0
				}, e.prototype.addRoutes = function (t) {
					var e, n, i;
					i = [];
					for (n in t) s.call(t, n) && (e = t[n], i.push(this.addRoute(n, e)));
					return i
				}, e.prototype.handleRoute = function (t, e) {
					var n, s, r, a, c, p, h, d, f, m, g, v, y, w, b, _, C, D, O, k, V, x, I;
					if (null == e && (e = {}), /<|>/.test(t)) return this.handleRoute("/Activity");
					if (0 === t.indexOf("!") && (t = t.slice(1)), this.visitedRoutes.last !== t && this.visitedRoutes.push(t), I = (null != (x = null != t ? t : "function" == typeof this.getDefaultRoute ? this.getDefaultRoute() : void 0) ? x : "/").split("?"), s = I[0], v = 2 <= I.length ? l.call(I, 1) : [], v = this.utils.parseQuery(v.join("&")), b = e.shouldPushState, y = e.replaceState, _ = e.state, C = e.suppressListeners, null == b && (b = !0), h = i(_), p = this.tree, f = {}, s = s.split("/"), s.shift(), s = s.filter(Boolean), m = "/" + s.join("/"), g = this.utils.stringifyQuery(v), g.length && (m += "?" + g), !C && b && !y && m === this.currentPath) return void this.emit("AlreadyHere", m);
					for (this.currentPath = m, b && (c = y ? "replaceState" : "pushState", o[c](h, m, m)), D = 0, k = s.length; k > D; D++) n = s[D], p[n] ? p = p[n] : (d = p[":"], null != d ? (f[d.name] = n, p = d) : this.handleNotFound(s.join("/")));
					if (w = {
						params: f,
						query: v
					}, this.emit("RouteInfoHandled", {
						params: f,
						query: v,
						path: m
					}), !C && (a = p[u], null != a ? a.length : void 0))
						for (O = 0, V = a.length; V > O; O++) r = a[O], r.call(this, w, _, m);
					return this
				}, e.prototype.handleQuery = function (t) {
					var e;
					return "string" != typeof t && (t = this.utils.stringifyQuery(t)), t.length ? (e = "" + this.currentPath + "?" + t, this.handleRoute(e)) : void 0
				}, e
			}(i)
		}, {
			"./../components/notifications/notificationview.coffee": 61,
			"./object.coffee": 104
		}
	],
	106: [
		function () {
			var t, e, n, i, o, s, r;
			(t = Function.prototype).bind || (t.bind = function (t) {
					var e;
					return 1 < arguments.length ? (e = [].slice.call(arguments, 1), function (n) {
						return function () {
							return n.apply(t, arguments.length ? e.concat([].slice.call(arguments)) : e)
						}
					}(this)) : function (e) {
						return function () {
							return arguments.length ? e.apply(t, arguments) : e.call(t)
						}
					}(this)
				}), null == window.URL && (window.URL = null != (e = window.webkitURL) ? e : null), null == window.BlobBuilder && (window.BlobBuilder = null != (n = null != (i = window.WebKitBlobBuilder) ? i : window.MozBlobBuilder) ? n : null), null == window.requestFileSystem && (window.requestFileSystem = null != (o = window.webkitRequestFileSystem) ? o : null), null == window.requestAnimationFrame && (window.requestAnimationFrame = null != (s = null != (r = window.webkitRequestAnimationFrame) ? r : window.mozRequestAnimationFrame) ? s : null), String.prototype.capitalize = function () {
					return this.charAt(0).toUpperCase() + this.slice(1)
				}, String.prototype.trim = function () {
					return this.replace(/^\s+|\s+$/g, "")
				},
				function (t, e) {
					var n;
					return n = e.defineProperty, "last" in t || n(t, "last", {
						get: function () {
							return this[this.length - 1]
						}
					}), "first" in t || n(t, "first", {
						get: function () {
							return this[0]
						}
					})
				}(Array.prototype, Object)
		}, {}
	],
	107: [
		function (t, e) {
			var n, i = [].slice;
			e.exports = {
				idCounter: 0,
				extend: function () {
					var t, e, n, o, s, r, a;
					for (o = arguments[0], n = 2 <= arguments.length ? i.call(arguments, 1) : [], r = 0, a = n.length; a > r; r++) {
						e = n[r];
						for (t in e) s = e[t], o[t] = s
					}
					return o
				},
				dict: Object.create.bind(null, null, Object.create(null)),
				getNearestElementByTagName: function (t, e) {
					for (; null != t && !this.elementHasTag(t, e);) t = t.parentNode;
					return t
				},
				elementShow: function (t) {
					return null != t ? t.classList.remove("hidden") : void 0
				},
				elementHide: function (t) {
					return null != t ? t.classList.add("hidden") : void 0
				},
				elementHasTag: function (t, e) {
					var n;
					return Boolean((null != (n = t.tagName) ? n.toLowerCase() : void 0) === e.toLowerCase())
				},
				elementIsVisible: function (t) {
					var e, n, i, o, s, r, a;
					if (t.offsetWidth <= 0 || t.offsetHeight <= 0) return !1;
					for (e = document.documentElement.clientHeight, a = t.getClientRects(), s = function (e) {
						var n, i;
						return n = (e.left + e.right) / 2, i = (e.top + e.bottom) / 2, document.elementFromPoint(n, i) === t
					}, n = 0, o = a.length; o > n;) {
						if (r = a[n], i = r.top > 0 ? r.top <= e : r.bottom > 0 && r.bottom <= e, i && s(r)) return !0;
						n++
					}
					return !1
				},
				formatPlural: function (t, e, n) {
					return null == n && (n = !0), "" + (n ? "" + (t || 0) + " " : "") + (1 === t ? e : Inflector.pluralize(e))
				},
				formatIndefiniteArticle: function (t) {
					var e;
					return "a" === (e = t[0].toLowerCase()) || "e" === e || "i" === e || "o" === e || "u" === e ? "an " + t : "a " + t
				},
				getSelection: function () {
					return window.getSelection()
				},
				getSelectionRange: function () {
					var t;
					return t = this.getSelection(), "None" !== t.type ? t.getRangeAt(0) : void 0
				},
				getCursorNode: function () {
					return this.getSelectionRange().commonAncestorContainer
				},
				addRange: function (t) {
					var e;
					return e = window.getSelection(), e.removeAllRanges(), e.addRange(t)
				},
				selectText: function (t, e, n) {
					var i, o;
					return null == n && (n = e), document.body.createTextRange ? (i = document.body.createTextRange(), i.moveToElementText(t), i.select()) : window.getSelection ? (o = window.getSelection(), i = document.createRange(), i.selectNodeContents(t), null != e && i.setStart(t, e), null != n && i.setEnd(t, n), o.removeAllRanges(), o.addRange(i)) : void 0
				},
				selectEnd: function (t, e) {
					return e || (e = document.createRange()), t || (t = this.getSelection().focusNode), t ? (e.setStartAfter(t), e.collapse(!1), this.addRange(e)) : void 0
				},
				replaceRange: function (t, e, n, i, o) {
					var s, r;
					return null == i && (i = n), null == o && (o = !0), r = document.createTextNode(" "), s = new Range, null != n ? (s.setStart(t, n), s.setEnd(t, i)) : s.selectNode(t), s.deleteContents(), s.insertNode(e), this.selectEnd(e, s), o ? (s.insertNode(r), this.selectEnd(r, s)) : void 0
				},
				getCallerChain: function (t, e) {
					var n, i;
					for (n = t.callee.caller, i = [n]; e-- && (n = null != n ? n.caller : void 0);) i.push(n);
					return i
				},
				createCounter: n = function (t) {
					return null == t && (t = 0),
						function () {
							return t++
						}
				},
				getUniqueId: function (t) {
					return function () {
						return "kd-" + t()
					}
				}(n()),
				getRandomNumber: function (t, e) {
					var n;
					return null == t && (t = 1e6), null == e && (e = 0), n = Math.floor(Math.random() * t + 1), n > e ? n : n + e
				},
				uniqueId: function (t) {
					var e;
					return e = this.idCounter++, null != t ? "" + t + e : e
				},
				getRandomRGB: function () {
					var t;
					return t = this.getRandomNumber, "rgb(" + t(255) + "," + t(255) + "," + t(255) + ")"
				},
				getRandomHex: function () {
					var t;
					for (t = (10066329 * Math.random() << 0).toString(16); t.length < 6;) t += "0";
					return "#" + t
				},
				curry: function (t, e) {
					return t + (e ? " " + e : "")
				},
				parseQuery: function () {
					var t, e, n, i;
					return e = /([^&=]+)=?([^&]*)/g, i = /\+/g, t = function (t) {
						return decodeURIComponent(t.replace(i, " "))
					}, n = function (n) {
						var i, o;
						for (null == n && (n = location.search.substring(1)), o = {}; i = e.exec(n);) o[t(i[1])] = t(i[2]);
						return o
					}
				}(),
				stringifyQuery: function () {
					var t, e, n;
					return e = /\s/g, t = function (t) {
						return encodeURIComponent(t.replace(e, "+"))
					}, n = function (e) {
						return Object.keys(e).map(function (n) {
							return "" + t(n) + "=" + t(e[n])
						}).join("&").trim()
					}
				}(),
				capAndRemovePeriods: function (t) {
					var e, n;
					return n = function () {
						var n, i, o, s;
						for (o = t.split("."), s = [], n = 0, i = o.length; i > n; n++) e = o[n], s.push(e.capitalize());
						return s
					}(), n.join("")
				},
				slugify: function (t) {
					var e;
					return null == t && (t = ""), e = String(t).toLowerCase().replace(/^\s+|\s+$/g, "").replace(/[_|\s]+/g, "-").replace(/[^a-z0-9-]+/g, "").replace(/[-]+/g, "-").replace(/^-+|-+$/g, "")
				},
				stripTags: function (t) {
					return t.replace(/<(?:.|\n)*?>/gm, "")
				},
				decimalToAnother: function (t, e) {
					var n, i, o, s, r, a, l, u;
					for (o = [], s = l = 0; 10 >= l; s = ++l) o[s + 1] = s;
					for (r = "", n = t; n >= e;) i = n % e, n = Math.floor(n / e), r += o[i + 1];
					for (r += o[n + 1], t = r.length, a = "", s = u = 0; t >= 0 ? t > u : u > t; s = t >= 0 ? ++u : --u) a += r.substring(t - s - 1, t - s);
					return r = a
				},
				applyMarkdown: function (t, e) {
					return null == e && (e = {}), t ? (null == e.gfm && (e.gfm = !0), null == e.pedantic && (e.pedantic = !1), null == e.sanitize && (e.sanitize = !0), null == e.highlight && (e.highlight = function (t, e) {
						return hljs.getLanguage(e) ? hljs.highlight(e, t).value : t
					}), marked(Encoder.htmlDecode(t), e)) : null
				},
				enterFullscreen: function () {
					var t;
					return t = function (t) {
							return t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : void 0
						},
						function (e) {
							return null == e && (e = document.documentElement), t(e)
						}
				}(),
				exitFullscreen: function () {
					return document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : void 0
				},
				isFullscreen: function () {
					return document.fullscreenElement || document.mozFullScreenElement || document.webkitIsFullScreen
				},
				createExternalLink: function (t) {
					var e;
					return e = document.createElement("a"), e.href = t.indexOf("http") > -1 ? t : "http://" + t, e.target = "_blank", document.body.appendChild(e), e.click(), document.body.removeChild(e)
				},
				wait: function (t, e) {
					return "function" == typeof t && (e = t, t = 0), setTimeout(e, t)
				},
				killWait: function (t) {
					return t && clearTimeout(t), null
				},
				repeat: function (t, e) {
					return "function" == typeof t && (e = t, t = 500), setInterval(e, t)
				},
				killRepeat: function (t) {
					return clearInterval(t)
				},
				defer: function (t) {
					return ("undefined" != typeof window && null !== window ? window.postMessage : void 0) && window.addEventListener ? (window.addEventListener("message", function (e) {
						return e.source === window && "kd-tick" === e.data && (e.stopPropagation(), t.length > 0) ? t.shift()() : void 0
					}, !0), function (e) {
						return t.push(e), window.postMessage("kd-tick", "*")
					}) : function (t) {
						return setTimeout(t, 1)
					}
				}([]),
				getCancellableCallback: function (t) {
					var e, n;
					return e = !1, n = function () {
						var n;
						return n = 1 <= arguments.length ? i.call(arguments, 0) : [], e ? void 0 : t.apply(null, n)
					}, n.cancel = function () {
						return e = !0
					}, n
				},
				getTimedOutCallback: function (t, e, n) {
					var o, s, r, a;
					return null == n && (n = 5e3), o = !1, a = function () {
						var e;
						return e = 1 <= arguments.length ? i.call(arguments, 0) : [], clearTimeout(r), o ? void 0 : t.apply(null, e)
					}, s = function () {
						var t;
						return t = 1 <= arguments.length ? i.call(arguments, 0) : [], o || e.apply(null, t), o = !0
					}, r = setTimeout(s, n), a
				},
				getTimedOutCallbackOne: function (t) {
					var e, n, o, s, r, a, l, u, c;
					return null == t && (t = {}), c = t.name || "undefined", u = t.timeout || 1e4, r = t.onSuccess || function () {}, a = t.onTimeout || function () {}, s = t.onResult || function () {}, l = !1, o = function (t) {
						return function () {
							var e;
							return e = 1 <= arguments.length ? i.call(arguments, 0) : [], clearTimeout(n), t.updateLogTimer(c, n, Date.now()), l ? s.apply(null, e) : r.apply(null, e)
						}
					}(this), e = function (t) {
						return function () {
							var e;
							return e = 1 <= arguments.length ? i.call(arguments, 0) : [], l = !0, t.updateLogTimer(c, n), a.apply(null, e)
						}
					}(this), n = setTimeout(e, u), this.logTimer(c, n, Date.now()), o.cancel = function () {
						return clearTimeout(n)
					}, o
				},
				logTimer: function (t, e, n) {
					var i;
					return log("logTimer name:" + t), (i = this.timers)[t] || (i[t] = {}), this.timers[t][e] = {
						start: n,
						status: "started"
					}
				},
				updateLogTimer: function (t, e, n) {
					var i, o, s, r;
					return r = this.timers[t][e], s = n ? "ended" : "failed", o = r.start, i = n - o, r = {
						start: o,
						end: n,
						status: s,
						elapsed: i
					}, this.timers[t][e] = r, log("updateLogTimer name:" + t + ", status:" + s + " elapsed:" + i)
				},
				timers: {},
				stopDOMEvent: function (t) {
					return t ? (t.preventDefault(), t.stopPropagation(), !1) : !1
				},
				utf8Encode: function (t) {
					var e, n, i;
					for (t = t.replace(/\r\n/g, "\n"), i = "", n = 0; n < t.length;) e = t.charCodeAt(n), 128 > e ? i += String.fromCharCode(e) : e > 127 && 2048 > e ? (i += String.fromCharCode(e >> 6 | 192), i += String.fromCharCode(63 & e | 128)) : (i += String.fromCharCode(e >> 12 | 224), i += String.fromCharCode(e >> 6 & 63 | 128), i += String.fromCharCode(63 & e | 128)), n++;
					return i
				},
				utf8Decode: function (t) {
					var e, n, i, o, s, r;
					for (r = "", s = 0, e = n = i = 0; s < t.length;) e = t.charCodeAt(s), 128 > e ? (r += String.fromCharCode(e), s++) : e > 191 && 224 > e ? (i = t.charCodeAt(s + 1), r += String.fromCharCode((31 & e) << 6 | 63 & i), s += 2) : (i = t.charCodeAt(s + 1), o = t.charCodeAt(s + 2), r += String.fromCharCode((15 & e) << 12 | (63 & i) << 6 | 63 & o), s += 3);
					return r
				},
				runXpercent: function (t) {
					var e;
					return e = Math.floor(100 * Math.random()), t >= e
				},
				shortenUrl: function (t, e) {
					var n;
					return n = $.ajax("https://www.googleapis.com/urlshortener/v1/url", {
						type: "POST",
						contentType: "application/json",
						data: JSON.stringify({
							longUrl: t
						}),
						timeout: 4e3,
						dataType: "json"
					}), n.done(function () {
						return function (n) {
							return e((null != n ? n.id : void 0) || t, n)
						}
					}(this)), n.error(function (n) {
						var i, o, s;
						return o = n.status, s = n.statusText, i = n.responseText, error("URL shorten error, returning self as fallback.", o, s, i), e(t)
					})
				},
				formatBytesToHumanReadable: function (t, e) {
					var n, i, o, s;
					if (null == e && (e = 2), n = "", 0 > t && (n = "-", t *= -1), i = 1024, s = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], o = -1, i > t) return "" + t + " B";
					for (;;)
						if (t /= i, ++o, !(t >= i)) break;
					return "" + n + t.toFixed(e) + " " + s[o]
				},
				splitTrim: function (t, e, n) {
					var i, o;
					return null == e && (e = ","), null == n && (n = !0), i = null != (o = null != t ? t.split(e).map(function (t) {
						return t.trim()
					}) : void 0) ? o : [], n && (i = i.filter(Boolean)), i
				},
				arrayToObject: function (t, e) {
					var n, i, o, s;
					for (n = {}, o = 0, s = t.length; s > o; o++) i = t[o], null != i[e] && (n[i[e]] = i);
					return n
				},
				partition: function (t, e) {
					var n, i, o, s;
					for (i = [
						[],
						[]
					], o = 0, s = t.length; s > o; o++) n = t[o], i[+!e(n)].push(n);
					return i
				},
				throttle: function (t, e) {
					var n, i, o, s, r, a, l;
					return "number" == typeof e && (l = [e, t], t = l[0], e = l[1]), i = n = r = s = o = null, a = KD.utils.debounce(t, function () {
							return o = s = !1
						}),
						function () {
							var l;
							return i = this, n = arguments, l = function () {
								return r = null, o && e.apply(i, n), a()
							}, r || (r = setTimeout(l, t)), s ? o = !0 : e.apply(i, n), a(), s = !0
						}
				},
				debounce: function (t, e) {
					var n, i;
					return "number" == typeof e && (i = [e, t], t = i[0], e = i[1]), n = null,
						function () {
							var i, o, s;
							return o = this, i = arguments, s = function () {
								return n = null, e.apply(o, i)
							}, clearTimeout(n), n = setTimeout(s, t)
						}
				}
			}
		}, {}
	],
	108: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				r = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				},
				a = [].slice;
			n = t("./object.coffee"), e.exports = i = function (e) {
				function n(t, e) {
					var i;
					null == t && (t = {}), i = t, i.tagName || (i.tagName = "div"), i.domId || (i.domId = null), i.cssClass || (i.cssClass = ""), i.parent || (i.parent = null), i.partial || (i.partial = null), i.delegate || (i.delegate = null), i.bind || (i.bind = ""), i.draggable || (i.draggable = null), i.droppable || (i.droppable = null), i.size || (i.size = null), i.position || (i.position = null), i.attributes || (i.attributes = null), i.prefix || (i.prefix = ""), i.suffix || (i.suffix = ""), i.tooltip || (i.tooltip = null), i.resizable || (i.resizable = null), n.__super__.constructor.call(this, i, e), null != e && "function" == typeof e.on && e.on("update", this.bound("render")), this.domId = t.domId, this.parent = t.parent, this.subViews = [], this.defaultInit(t, e), this.devHacks()
				}
				var i, l, u, c, p;
				return s(n, e), i = Object.defineProperty, l = function (t) {
					return warn("" + t + " is deprecated from KDView if you need it override in your subclass")
				}, u = /^((dbl)?click|key(up|down|press)|mouse(up|down|over|enter|leave|move)|drag(start|end|enter|leave|over)|blur|change|focus|drop|contextmenu|scroll|paste|error|load)$/, c = function () {
					return {
						dblclick: "dblClick",
						keyup: "keyUp",
						keydown: "keyDown",
						keypress: "keyPress",
						mouseup: "mouseUp",
						mousedown: "mouseDown",
						mouseenter: "mouseEnter",
						mouseleave: "mouseLeave",
						mousemove: "mouseMove",
						mousewheel: "mouseWheel",
						wheel: "mouseWheel",
						mouseover: "mouseOver",
						contextmenu: "contextMenu",
						dragstart: "dragStart",
						dragenter: "dragEnter",
						dragleave: "dragLeave",
						dragover: "dragOver",
						paste: "paste",
						transitionend: "transitionEnd"
					}
				}, p = function (t) {
					var e, n, i;
					i = t.overridden;
					for (n in i) o.call(i, n) && (e = i[n], t.overrider[n] || (t.overrider[n] = e));
					return t.overrider
				}, n.prototype.appendToDomBody = function () {
					return this.parentIsInDom = !0, this.lazy ? void 0 : ($("body").append(this.$()), this.utils.defer(function (t) {
						return function () {
							return t.emit("viewAppended")
						}
					}(this)))
				}, n.appendToDOMBody = function (t) {
					return console.warn("KDView.appendToDOMBody is deprecated; use #appendToDomBody instead"), t.appendToDomBody()
				}, n.prototype.defaultInit = function (t) {
					return this.setDomElement(t.cssClass), this.setDataId(), t.domId && this.setDomId(t.domId), t.attributes && this.setAttributes(t.attributes), t.size && this.setSize(t.size), t.position && this.setPosition(t.position), t.partial && this.updatePartial(t.partial), t.draggable && this.setClass("kddraggable"), this.addEventHandlers(t), t.lazyLoadThreshold && this.setLazyLoader(t.lazyLoadThreshold), t.tooltip && this.setTooltip(t.tooltip), t.draggable && this.setDraggable(t.draggable), this.bindEvents(), this.on("childAppended", this.childAppended.bind(this)), this.on("viewAppended", function (t) {
						return function () {
							var e, n, i, s, r, a, l, u;
							if (t.setViewReady(), t.viewAppended(), t.childAppended(t), t.parentIsInDom = !0, n = function (t) {
								return t.parentIsInDom || (t.parentIsInDom = !0, t.lazy) ? void 0 : t.emit("viewAppended")
							}, s = t.getSubViews(), Array.isArray(s)) {
								for (l = [], r = 0, a = s.length; a > r; r++) e = s[r], l.push(n(e));
								return l
							}
							if (null != s && "object" == typeof s) {
								u = [];
								for (i in s) o.call(s, i) && (e = s[i], u.push(n(e)));
								return u
							}
						}
					}(this))
				}, n.prototype.getDomId = function () {
					return this.domElement.attr("id")
				}, n.prototype.setDomElement = function (t) {
					var e, n, i, o, s, r, a, l;
					for (null == t && (t = ""), a = this.getOptions(), e = a.domId, o = a.tagName, e && (n = document.getElementById(e)), this.lazy = null == n ? (n = document.createElement(o), e ? n.id = e : void 0, !1) : !0, l = ("kdview " + t).split(" "), s = 0, r = l.length; r > s; s++) i = l[s], i.length && n.classList.add(i);
					return this.domElement = $(n), this.lazy ? this.utils.defer(function (t) {
						return function () {
							return t.emit("viewAppended")
						}
					}(this)) : void 0
				}, n.prototype.setDomId = function (t) {
					return this.domElement.attr("id", t)
				}, n.prototype.setData = function (t) {
					var e, i;
					return null != (e = this.data) && "function" == typeof e.off && e.off("update", this.bound("render")), n.__super__.setData.call(this, t), null != (i = this.data) && "function" == typeof i.on && i.on("update", this.bound("render")), this.parentIsInDom ? this.render() : void 0
				}, n.prototype.setDataId = function () {
					return this.domElement.data("data-id", this.getId())
				}, n.prototype.getAttribute = function (t) {
					return this.getElement().getAttribute(t)
				}, n.prototype.setAttribute = function (t, e) {
					return this.getElement().setAttribute(t, e)
				}, n.prototype.setAttributes = function (t) {
					var e, n, i;
					i = [];
					for (e in t) o.call(t, e) && (n = t[e], i.push(this.setAttribute(e, n)));
					return i
				}, n.prototype.isInDom = function () {
					var t;
					return t = function (t) {
							var e;
							for (e = t; e.parentNode;) e = e.parentNode;
							return e
						},
						function () {
							return null != t(this.$()[0]).body
						}
				}(), Object.defineProperty(n.prototype, "$$", {
					get: n.prototype.$
				}), Object.defineProperty(n.prototype, "el", {
					get: n.prototype.getElement
				}), n.prototype.getDomElement = function () {
					return this.domElement
				}, n.prototype.getElement = function () {
					return this.getDomElement()[0]
				}, n.prototype.getTagName = function () {
					return this.options.tagName || "div"
				}, n.prototype.$ = function (t) {
					return t ? this.getDomElement().find(t) : this.getDomElement()
				}, n.prototype.append = function (t, e) {
					return this.$(e).append(t.$()), this.parentIsInDom && t.emit("viewAppended"), this
				}, n.prototype.appendTo = function (t, e) {
					return this.$().appendTo(t.$(e)), this.parentIsInDom && this.emit("viewAppended"), this
				}, n.prototype.appendToSelector = function (t) {
					return $(t).append(this.$()), this.emit("viewAppended")
				}, n.prototype.prepend = function (t, e) {
					return this.$(e).prepend(t.$()), this.parentIsInDom && t.emit("viewAppended"), this
				}, n.prototype.prependTo = function (t, e) {
					return this.$().prependTo(t.$(e)), this.parentIsInDom && this.emit("viewAppended"), this
				}, n.prototype.prependToSelector = function (t) {
					return $(t).prepend(this.$()), this.emit("viewAppended")
				}, n.prototype.setPartial = function (t, e) {
					return this.$(e).append(t), this
				}, n.prototype.updatePartial = function (t, e) {
					return this.$(e).html(t)
				}, n.prototype.clear = function () {
					return this.getElement().innerHTML = ""
				}, n.setElementClass = function (t, e, n) {
					var i, o, s, r, a;
					for (r = n.split(" "), a = [], o = 0, s = r.length; s > o; o++) i = r[o], "" !== i && a.push(t.classList[e](i));
					return a
				}, n.prototype.setCss = function (t, e) {
					return this.$().css(t, e)
				}, n.prototype.setStyle = function (t) {
					var e, n, i;
					i = [];
					for (e in t) o.call(t, e) && (n = t[e], i.push(this.$().css(e, n)));
					return i
				}, n.prototype.setClass = function (t) {
					return t ? (n.setElementClass(this.getElement(), "add", t), this) : void 0
				}, n.prototype.unsetClass = function (t) {
					return t ? (n.setElementClass(this.getElement(), "remove", t), this) : void 0
				}, n.prototype.toggleClass = function (t) {
					return this.$().toggleClass(t), this
				}, n.prototype.hasClass = function (t) {
					return this.getElement().classList.contains(t)
				}, n.prototype.getBounds = function () {
					var t;
					return t = {
						x: this.getX(),
						y: this.getY(),
						w: this.getWidth(),
						h: this.getHeight(),
						n: this.constructor.name
					}
				}, n.prototype.setRandomBG = function () {
					return this.getDomElement().css("background-color", KD.utils.getRandomRGB())
				}, n.prototype.hide = function () {
					return this.setClass("hidden")
				}, n.prototype.show = function () {
					return this.unsetClass("hidden")
				}, n.prototype.setSize = function (t) {
					return null != t.width && this.setWidth(t.width), null != t.height ? this.setHeight(t.height) : void 0
				}, n.prototype.setPosition = function () {
					var t;
					return t = this.getOptions().position, t.position = "absolute", this.$().css(t)
				}, n.prototype.getWidth = function () {
					return this.$().outerWidth(!1)
				}, n.prototype.setWidth = function (t, e) {
					return null == e && (e = "px"), this.getElement().style.width = "" + t + e, this.emit("ViewResized", {
						newWidth: t,
						unit: e
					})
				}, n.prototype.getHeight = function () {
					return this.getDomElement().outerHeight(!1)
				}, n.prototype.setHeight = function (t, e) {
					return null == e && (e = "px"), this.getElement().style.height = "" + t + e, this.emit("ViewResized", {
						newHeight: t,
						unit: e
					})
				}, n.prototype.setX = function (t) {
					return this.$().css({
						left: t
					})
				}, n.prototype.setY = function (t) {
					return this.$().css({
						top: t
					})
				}, n.prototype.getX = function () {
					return this.$().offset().left
				}, n.prototype.getY = function () {
					return this.$().offset().top
				}, n.prototype.getRelativeX = function () {
					return this.$().position().left
				}, n.prototype.getRelativeY = function () {
					return this.$().position().top
				}, n.prototype.destroyChild = function (t) {
					var e;
					return null != this[t] ? ("function" == typeof (e = this[t]).destroy && e.destroy(), delete this[t], !0) : !1
				}, n.prototype.attach = function (t) {
					return this.getElement().appendChild(t.getElement())
				}, n.prototype.detach = function () {
					var t;
					return null != (t = this.parent) ? t.getElement().removeChild(this.getElement()) : void 0
				}, n.prototype.destroy = function () {
					var t, e;
					return this.getSubViews().length > 0 && this.destroySubViews(), (null != (e = this.parent) ? e.subViews : void 0) && (t = this.parent.subViews.indexOf(this)) >= 0 && (this.parent.subViews.splice(t, 1), this.unsetParent()), this.getDomElement().remove(), null != this.$overlay && this.removeOverlay(), n.__super__.destroy.apply(this, arguments)
				}, n.prototype.destroySubViews = function () {
					var t, e, n, i;
					for (i = this.getSubViews().slice(), e = 0, n = i.length; n > e; e++) t = i[e], "function" == typeof t.destroy && t.destroy()
				}, n.prototype.addSubView = function (t, e, n) {
					if (null == t) throw new Error("no subview was specified");
					return this.subViews.push(t), t.setParent(this), t.parentIsInDom = this.parentIsInDom, t.lazy || (n ? this.prepend(t, e) : this.append(t, e)), t.on("ViewResized", function () {
						return t.parentDidResize()
					}), null != this.template && this.template.addSymbol(t), t
				}, n.prototype.removeSubView = function (t) {
					return t.destroy()
				}, n.prototype.getSubViews = function () {
					var t;
					return t = this.subViews, null != this.items && (t = t.concat([].slice.call(this.items))), t
				}, n.prototype.setParent = function (t) {
					return null != this.parent ? error("View already has a parent", this, this.parent) : i ? i(this, "parent", {
						value: t,
						configurable: !0
					}) : this.parent = t
				}, n.prototype.unsetParent = function () {
					return delete this.parent
				}, n.prototype.embedChild = function (t, e, n) {
					return this.addSubView(e, "#" + t, !1), n ? void 0 : this.$("#" + t).replaceWith(e.$())
				}, n.prototype.render = function (t) {
					return null != this.template ? this.template.update(t) : void 0
				}, n.prototype.addEventHandlers = function (t) {
					var e, n, i;
					i = [];
					for (n in t) o.call(t, n) && (e = t[n], i.push(u.test(n) && "function" == typeof e ? this.on(n, e) : void 0));
					return i
				}, n.prototype.parentDidResize = function (t, e) {
					var n, i, o, s, r;
					if (this.getSubViews()) {
						for (s = this.getSubViews(), r = [], i = 0, o = s.length; o > i; i++) n = s[i], r.push(n.parentDidResize(t, e));
						return r
					}
				}, n.prototype.setLazyLoader = function (t) {
					var e;
					return null == t && (t = .75), /\bscroll\b/.test(this.getOptions().bind) || (this.getOptions().bind += " scroll"), e = this, this.on("scroll", function () {
						var n;
						return n = 0,
							function () {
								var i, o, s, r, a;
								return o = e.$()[0], r = o.scrollHeight, a = o.scrollTop, i = t > 1 ? (r - t) / r : t, s = (a + e.getHeight()) / r, s > i && s > n && this.emit("LazyLoadThresholdReached", {
									ratio: s
								}), n = s
							}
					}())
				}, n.prototype.bindEvents = function (t) {
					var e, n, i, o;
					return t || (t = this.getDomElement()), e = "mousedown mouseup click dblclick", o = this.getOptions().bind, i = function () {
						var t, s;
						if (o) {
							for (i = e.trim().split(" "), o = o.trim().split(" "), t = 0, s = o.length; s > t; t++) n = o[t], r.call(i, n) < 0 && i.push(n);
							return i.join(" ")
						}
						return e
					}(), t.bind(i, function (t) {
						return function (e) {
							var n;
							return n = t.handleEvent(e), n || e.stopPropagation(), !0
						}
					}(this)), i
				}, n.prototype.bindTransitionEnd = function () {
					var t, e, n, i, s;
					t = document.createElement("fakeelement"), i = {
						OTransition: "oTransitionEnd",
						MozTransition: "transitionend",
						webkitTransition: "webkitTransitionEnd"
					}, n = "transitionend";
					for (e in i)
						if (o.call(i, e) && (s = i[e], e in t.style)) {
							n = s;
							break
						}
					return this.bindEvent(n), "transitionend" !== n ? this.on(n, this.emit.bind(this, "transitionend")) : void 0
				}, n.prototype.bindEvent = function (t, e) {
					var n;
					return e || (n = [t, this.$()], e = n[0], t = n[1]), t.bind(e, function (t) {
						return function (e) {
							var n;
							return n = t.handleEvent(e), n || e.stopPropagation(), !0
						}
					}(this))
				}, n.prototype.handleEvent = function (t) {
					var e, n;
					return e = c()[t.type] || t.type, n = null != this[e] ? this[e](t) : !0, n !== !1 && this.emit(t.type, t), n
				}, n.prototype.scroll = function () {
					return !0
				}, n.prototype.load = function () {
					return !0
				}, n.prototype.error = function () {
					return !0
				}, n.prototype.keyUp = function () {
					return !0
				}, n.prototype.keyDown = function () {
					return !0
				}, n.prototype.keyPress = function () {
					return !0
				}, n.prototype.dblClick = function () {
					return !0
				}, n.prototype.click = function () {
					return !0
				}, n.prototype.contextMenu = function () {
					return !0
				}, n.prototype.mouseMove = function () {
					return !0
				}, n.prototype.mouseEnter = function () {
					return !0
				}, n.prototype.mouseLeave = function () {
					return !0
				}, n.prototype.mouseUp = function () {
					return !0
				}, n.prototype.mouseOver = function () {
					return !0
				}, n.prototype.mouseWheel = function () {
					return !0
				}, n.prototype.mouseDown = function () {
					return this.unsetKeyView(), !0
				}, n.prototype.paste = function () {
					return !0
				}, n.prototype.dragEnter = function (t) {
					return t.preventDefault(), t.stopPropagation()
				}, n.prototype.dragOver = function (t) {
					return t.preventDefault(), t.stopPropagation()
				}, n.prototype.dragLeave = function (t) {
					return t.preventDefault(), t.stopPropagation()
				}, n.prototype.drop = function (t) {
					return t.preventDefault(), t.stopPropagation()
				}, n.prototype.submit = function () {
					return !1
				}, n.prototype.setEmptyDragState = function (t) {
					var e;
					return null == t && (t = !1), t && this.dragState && (e = this.$(), e.css("left", 0), e.css("top", 0)), this.dragState = {
						containment: null,
						handle: null,
						axis: null,
						direction: {
							current: {
								x: null,
								y: null
							},
							global: {
								x: null,
								y: null
							}
						},
						position: {
							relative: {
								x: 0,
								y: 0
							},
							initial: {
								x: 0,
								y: 0
							},
							global: {
								x: 0,
								y: 0
							}
						},
						meta: {
							top: 0,
							right: 0,
							bottom: 0,
							left: 0
						}
					}
				}, n.prototype.setDraggable = function (t) {
					var e;
					return null == t && (t = {}), t === !0 && (t = {}), this.setEmptyDragState(), e = t.handle instanceof n ? t.handle : this, this.on("DragFinished", function (t) {
						return function () {
							return t.beingDragged = !1
						}
					}(this)), e.on("mousedown", function (e) {
						return function (i) {
							var s, r, a, l, u, c, p, h, d, f;
							if ("string" != typeof t.handle || 0 !== $(i.target).closest(t.handle).length) {
								if (e.dragIsAllowed = !0, e.setEmptyDragState(), u = e.dragState, t.containment) {
									if (u.containment = {}, u.containment.m = {
										w: e.getWidth(),
										h: e.getHeight()
									}, f = t.containment.view, s = "string" == typeof f ? e[f].getBounds() : f instanceof n ? f.getBounds() : e.parent.getBounds(), u.containment.viewBounds = s, h = {
										top: 0,
										right: 0,
										bottom: 0,
										left: 0
									}, c = t.containment.padding, "number" == typeof c)
										for (p in h) o.call(h, p) && (d = h[p], d = c);
									else "object" == typeof c && KD.utils.extend(h, c);
									u.containment.padding = h
								}
								return u.handle = t.handle, u.axis = t.axis, a = u.meta, r = e.getElement(), a.top = parseInt(r.style.top, 10) || 0, a.right = parseInt(r.style.right, 10) || 0, a.bottom = parseInt(r.style.bottom, 10) || 0, a.left = parseInt(r.style.left, 10) || 0, l = e.dragState.position, l.initial.x = i.pageX, l.initial.y = i.pageY, KD.getSingleton("windowController").setDragView(e), e.emit("DragStarted", i, e.dragState), i.stopPropagation(), i.preventDefault(), !1
							}
						}
					}(this))
				}, n.prototype.drag = function (t, e) {
					var n, i, o, s, r, a, l, u, c, p, h, d, f, m, g, v, y, w, b, _, C, D, O, k;
					return k = this.dragState, s = k.directionX, r = k.directionY, n = k.axis, i = k.containment, D = e.x, O = e.y, d = this.dragState.position, f = d.relative, p = d.initial, c = d.global, l = this.dragState.direction, u = l.global, a = l.current, n = this.getOptions().draggable.axis, m = n ? Math.abs("x" === n ? D : O) : Math.max(Math.abs(D), Math.abs(O)), this.dragIsAllowed = this.beingDragged = !(20 > m && !this.beingDragged), D > f.x ? a.x = "right" : D < f.x && (a.x = "left"), O > f.y ? a.y = "bottom" : O < f.y && (a.y = "top"), c.x = p.x + D, c.y = p.y + O, u.x = D > 0 ? "right" : "left", u.y = O > 0 ? "bottom" : "top", this.dragIsAllowed && (g = this.$(), h = this.dragState.meta, _ = h.right && !h.left ? "right" : "left", C = h.bottom && !h.top ? "bottom" : "top", y = "left" === _ ? h.left + f.x : h.right - f.x, w = "top" === C ? h.top + f.y : h.bottom - f.y, i && (v = i.m, b = i.viewBounds, o = i.padding, y <= o.left && (y = o.left), w <= o.top && (w = o.top), y + v.w >= b.w - o.right && (y = b.w - v.w - o.right), w + v.h >= b.h - o.bottom && (w = b.h - v.h - o.bottom)), "y" !== n && g.css(_, y), "x" !== n && g.css(C, w)), f.x = D, f.y = O, this.emit("DragInAction", D, O)
				}, n.prototype.viewAppended = function () {}, n.prototype.childAppended = function (t) {
					var e;
					return null != (e = this.parent) ? e.emit("childAppended", t) : void 0
				}, n.prototype.setViewReady = function () {
					return this.viewIsReady = !0
				}, n.prototype.isViewReady = function () {
					return this.viewIsReady || !1
				}, n.prototype.observeMutations = function () {
					var e, n, i;
					return n = t("./../../libs/mutation-summary.js"), e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, i = new n({
						callback: function (t) {
							return function (e) {
								return t.emit.apply(t, ["MutationHappened"].concat(a.call(e)))
							}
						}(this),
						rootNode: this.getElement(),
						queries: [{
							all: !0
						}]
					})
				}, n.prototype.putOverlay = function (e) {
					var n;
					return null == e && (e = {}), e.delegate = this, n = t("./../components/overlay/overlayview.coffee"), this.overlay = new n(e)
				}, n.prototype.removeOverlay = function () {
					var t;
					return null != (t = this.overlay) ? t.destroy() : void 0
				}, n.prototype.unsetTooltip = function (t) {
					var e;
					return null == t && (t = {}), null != (e = this.tooltip) && e.destroy(), delete this.tooltip
				}, n.prototype.setTooltip = function (e) {
					var n, i;
					return null == e && (e = {}), i = {
						above: "s",
						below: "n",
						left: "e",
						right: "w"
					}, e.title || (e.title = ""), e.cssClass || (e.cssClass = ""), e.placement || (e.placement = "top"), e.direction || (e.direction = "center"), e.offset || (e.offset = {
						top: 0,
						left: 0
					}), e.delayIn || (e.delayIn = 0), e.delayOut || (e.delayOut = 0), null == e.html && (e.html = !0), null == e.animate && (e.animate = !1), e.selector || (e.selector = null), e.gravity || (e.gravity = i[e.placement]), e.fade || (e.fade = e.animate), e.fallback || (e.fallback = e.title), e.view || (e.view = null), null == e.sticky && (e.sticky = !1), e.delegate || (e.delegate = this), e.events || (e.events = ["mouseenter", "mouseleave", "mousemove"]), this.unsetTooltip(), n = t("./../components/tooltip/tooltip.coffee"), this.tooltip = new n(e, {})
				}, n.prototype.getTooltip = function () {
					return this.tooltip
				}, n.prototype._windowDidResize = function () {}, n.prototype.listenWindowResize = function (t) {
					return null == t && (t = !0), t ? KD.getSingleton("windowController").registerWindowResizeListener(this) : KD.getSingleton("windowController").unregisterWindowResizeListener(this)
				}, n.prototype.notifyResizeListeners = function () {
					return KD.getSingleton("windowController").notifyWindowResizeListeners()
				}, n.prototype.setKeyView = function () {
					return KD.getSingleton("windowController").setKeyView(this)
				}, n.prototype.unsetKeyView = function () {
					return KD.getSingleton("windowController").setKeyView(null)
				}, n.prototype.activateKeyView = function () {
					return "function" == typeof this.emit ? this.emit("KDViewBecameKeyView") : void 0
				}, n.prototype.devHacks = function () {
					return this.on("click", function (t) {
						return function (e) {
							return e ? e.metaKey && e.altKey && e.ctrlKey ? (log(t.getData()), "function" == typeof e.stopPropagation && e.stopPropagation(), "function" == typeof e.preventDefault && e.preventDefault(), !1) : e.altKey && (e.metaKey || e.ctrlKey) ? (log(t), !1) : void 0 : void 0
						}
					}(this))
				}, n
			}(n)
		}, {
			"./../../libs/mutation-summary.js": 1,
			"./../components/overlay/overlayview.coffee": 62,
			"./../components/tooltip/tooltip.coffee": 85,
			"./object.coffee": 104
		}
	],
	109: [
		function (t, e) {
			var n, i, o, s = {}.hasOwnProperty,
				r = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) s.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				};
			i = t("./view.coffee"), n = t("./controller.coffee"), e.exports = o = function (t) {
				function e(t, n) {
					null == t && (t = {}), t.view || (t.view = new i), e.__super__.constructor.call(this, t, n), this.getOptions().view && this.setView(this.getOptions().view)
				}
				return r(e, t), e.prototype.loadView = function () {}, e.prototype.getView = function () {
					return this.mainView
				}, e.prototype.setView = function (t) {
					var e;
					return this.mainView = t, this.emit("ControllerHasSetItsView"), e = this.loadView.bind(this, t), t.isViewReady() ? e() : (t.once("viewAppended", e), t.once("KDObjectWillBeDestroyed", function (t) {
						return function () {
							return KD.utils.defer(t.bound("destroy"))
						}
					}(this)))
				}, e
			}(n)
		}, {
			"./controller.coffee": 96,
			"./view.coffee": 108
		}
	],
	110: [
		function (t, e) {
			var n, i, o = {}.hasOwnProperty,
				s = function (t, e) {
					function n() {
						this.constructor = t
					}
					for (var i in e) o.call(e, i) && (t[i] = e[i]);
					return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
				},
				r = [].indexOf || function (t) {
					for (var e = 0, n = this.length; n > e; e++)
						if (e in this && this[e] === t) return e;
					return -1
				};
			n = t("./controller.coffee"), e.exports = i = function (t) {
					function e(t, n) {
						this.windowResizeListeners = {}, this.keyEventsToBeListened = ["keydown", "keyup", "keypress"], this.currentCombos = {}, this.keyView = null, this.dragView = null, this.scrollingEnabled = !0, this.layers = [], this.unloadListeners = {}, this.focusListeners = [], this.bindEvents(), e.__super__.constructor.call(this, t, n)
					}
					var n, i, a, l, u;
					return s(e, t), e.keyViewHistory = [], l = -1 === navigator.userAgent.indexOf("Mac OS X") ? "ctrl" : "command", n = function (t, e, n) {
						return null == n && (n = !0), window.addEventListener(t, e, n)
					}, a = function () {
						var t, e, n, i;
						if (e = ["webkit", "moz", "o"], "hidden" in document) return "hidden";
						for (n = 0, i = e.length; i > n; n++)
							if (t = e[n], t + "Hidden" in document) return "" + t + "Hidden";
						return ""
					}, i = function () {
						return "" + a().replace(/[Hh]idden/, "") + "visibilitychange"
					}, e.prototype.addLayer = function (t) {
						return r.call(this.layers, t) < 0 ? (this.layers.push(t), t.on("KDObjectWillBeDestroyed", function (e) {
							return function () {
								return e.removeLayer(t)
							}
						}(this))) : void 0
					}, e.prototype.removeLayer = function (t) {
						var e;
						return r.call(this.layers, t) >= 0 ? (e = this.layers.indexOf(t), this.layers.splice(e, 1)) : void 0
					}, e.prototype.bindEvents = function () {
						var t, e, o, s, r;
						for (r = this.keyEventsToBeListened, o = 0, s = r.length; s > o; o++) t = r[o], addEventListener(t, this.bound("key"));
						return addEventListener("resize", this.bound("notifyWindowResizeListeners")), document.addEventListener("scroll", function (t) {
							return function () {
								var e, n;
								return n = null, e = document.body, _.throttle(function (e) {
									return t.emit("ScrollHappened", e)
								}, 50)
							}
						}(this)(), !1), n("dragenter", function (t) {
							return function (e) {
								return t.dragInAction ? void 0 : (t.emit("DragEnterOnWindow", e), t.setDragInAction(!0))
							}
						}(this)), n("dragleave", function (t) {
							return function (e) {
								var n, i;
								return 0 < (n = e.clientX) && n < t.winWidth && 0 < (i = e.clientY) && i < t.winHeight ? void 0 : (t.emit("DragExitOnWindow", e), t.setDragInAction(!1))
							}
						}(this)), n("drop", function (t) {
							return function (e) {
								return t.emit("DragExitOnWindow", e), t.emit("DropOnWindow", e), t.setDragInAction(!1)
							}
						}(this)), e = this.layers, n("mousedown", function (t) {
							return function (n) {
								var i;
								return i = e.last, i && 0 === $(n.target).closest(null != i ? i.$() : void 0).length ? (i.emit("ReceivedClickElsewhere", n), t.removeLayer(i)) : void 0
							}
						}(this)), n("mouseup", function (t) {
							return function (e) {
								return t.dragView && t.unsetDragView(e), t.emit("ReceivedMouseUpElsewhere", e)
							}
						}(this)), n("mousemove", function (t) {
							return function (e) {
								return t.dragView ? t.redirectMouseMoveEvent(e) : void 0
							}
						}(this)), n("click", function (t) {
							var e, n, i, o;
							if (i = KD.utils.getNearestElementByTagName(t.target, "a"), 0 === (null != i && null != (o = i.target) ? o.length : void 0)) {
								if (e = i.getAttribute("href"), n = 0 === (null != e ? e.indexOf("http") : void 0)) return i.target = "_blank";
								if (t.preventDefault(), e && !/^#/.test(e)) return KD.getSingleton("router").handleRoute(e)
							}
						}, !1), window.addEventListener("beforeunload", this.bound("beforeUnload")), document.addEventListener(i(), function (t) {
							return function (e) {
								return t.focusChange(e, t.isFocused())
							}
						}(this))
					}, e.prototype.addUnloadListener = function (t, e) {
						var n;
						return (n = this.unloadListeners)[t] || (n[t] = []), this.unloadListeners[t].push(e)
					}, e.prototype.clearUnloadListeners = function (t) {
						return t ? this.unloadListeners[t] = [] : this.unloadListeners = {}
					}, e.prototype.isFocused = function () {
						return !Boolean(document[a()])
					}, e.prototype.addFocusListener = function (t) {
						return this.focusListeners.push(t)
					}, e.prototype.focusChange = function (t, e) {
						var n, i, o, s, r;
						if (t) {
							for (s = this.focusListeners, r = [], i = 0, o = s.length; o > i; i++) n = s[i], r.push(n(e, t));
							return r
						}
					}, e.prototype.beforeUnload = function (t) {
						var e, n, i, s, r, a, l;
						if (t) {
							l = this.unloadListeners;
							for (e in l)
								if (o.call(l, e))
									for (i = l[e], r = 0, a = i.length; a > r; r++)
										if (n = i[r], n() === !1) return s = "window" !== e ? " on " + e : "", "Please make sure that you saved all your work" + s + "."
						}
					}, e.prototype.setDragInAction = function (t) {
						return this.dragInAction = null != t ? t : !1, $("body")[this.dragInAction ? "addClass" : "removeClass"]("dragInAction")
					}, e.prototype.setMainView = function (t) {
						this.mainView = t
					}, e.prototype.getMainView = function () {
						return this.mainView
					}, e.prototype.revertKeyView = function (t) {
						return t ? t === this.keyView && this.keyView !== this.oldKeyView ? this.setKeyView(this.oldKeyView) : void 0 : void warn("you must pass the view as a param, which doesn't want to be keyview anymore!")
					}, u = function (t) {
						var e, n, i;
						i = {};
						for (n in t) o.call(t, n) && (e = t[n], /\bsuper(\+|\s)/.test(n) && (n = n.replace(/super/g, l)), i[n] = e);
						return i
					}, e.prototype.viewHasKeyCombos = function (t) {
						var e, n, i, s, r, a, l, u, c;
						if (t) {
							for (r = t.getOptions(), i = {}, u = this.keyEventsToBeListened, a = 0, l = u.length; l > a; a++)
								if (s = u[a], "object" == typeof r[s]) {
									c = r[s];
									for (n in c) o.call(c, n) && (e = c[n], i[n] = e)
								}
							return Object.keys(i).length > 0 ? i : !1
						}
					}, e.prototype.registerKeyCombos = function (t) {
						var e;
						return e = this.viewHasKeyCombos(t), null != e ? (this.comboMap = new KDKeyboardMap({
							combos: e
						}), KDKeyboardListener.current().addComboMap(this.comboMap)) : void 0
					}, e.prototype.unregisterKeyCombos = function () {
						return KDKeyboardListener.current().removeComboMap(this.comboMap), this.keyView ? this.keyView.unsetClass("mousetrap") : void 0
					}, e.prototype.setKeyView = function (t) {
						return null != t && "function" == typeof t.activateKeyView && t.activateKeyView(), t !== this.keyView ? (this.unregisterKeyCombos(), this.oldKeyView = this.keyView, this.keyView = t, this.registerKeyCombos(t), this.constructor.keyViewHistory.push(t), null != t && "function" == typeof t.activateKeyView && t.activateKeyView(), this.emit("WindowChangeKeyView", t)) : void 0
					}, e.prototype.setDragView = function (t) {
						return this.setDragInAction(!0), this.dragView = t
					}, e.prototype.unsetDragView = function (t) {
						return this.setDragInAction(!1), this.dragView.emit("DragFinished", t), this.dragView = null
					}, e.prototype.redirectMouseMoveEvent = function (t) {
						var e, n, i, o, s, r, a;
						return a = this.dragView, s = t.pageX, r = t.pageY, n = a.dragState.position.initial, i = n.x, o = n.y, e = {
							x: s - i,
							y: r - o
						}, a.drag(t, e)
					}, e.prototype.getKeyView = function () {
						return this.keyView
					}, e.prototype.key = function (t) {
						var e;
						return this.emit(t.type, t), null != (e = this.keyView) ? e.handleEvent(t) : void 0
					}, e.prototype.enableScroll = function () {
						return this.scrollingEnabled = !0
					}, e.prototype.disableScroll = function () {
						return this.scrollingEnabled = !1
					}, e.prototype.registerWindowResizeListener = function (t) {
						return this.windowResizeListeners[t.id] = t, t.on("KDObjectWillBeDestroyed", function (e) {
							return function () {
								return delete e.windowResizeListeners[t.id]
							}
						}(this))
					}, e.prototype.unregisterWindowResizeListener = function (t) {
						return delete this.windowResizeListeners[t.id]
					}, e.prototype.setWindowProperties = function () {
						return this.winWidth = window.innerWidth, this.winHeight = window.innerHeight
					}, e.prototype.notifyWindowResizeListeners = function (t, e, n) {
						var i;
						return null == e && (e = !1), null == n && (n = 17), t || (t = {
							type: "resize"
						}), i = function (e) {
							return function () {
								var n, i, s, r;
								s = e.windowResizeListeners, r = [];
								for (i in s) o.call(s, i) && (n = s[i], n._windowDidResize && r.push(n._windowDidResize(t)));
								return r
							}
						}(this), e ? (KD.utils.killWait(this.resizeNotifiersTimer), this.resizeNotifiersTimer = KD.utils.wait(n, i)) : i()
					}, e
				}(n),
				function () {
					var e;
					return e = t("./kd.coffee"), e.registerSingleton("windowController", new i)
				}()
		}, {
			"./controller.coffee": 96,
			"./kd.coffee": 100
		}
	],
	111: [
		function (t) {
			var e, n;
			t("./lib.includes.coffee"), n = t("./core/utils.coffee"), e = t("./core/kd.coffee"), e.dom = t("./core/kd.dom.js"), e.classes = {}, e.classes.KDFileUploadListItemView = t("./components/upload/fileuploadlistitemview.coffee"), e.classes.KDFileUploadThumbItemView = t("./components/upload/fileuploadthumbitemview.coffee"), e.classes.KDFileUploadView = t("./components/upload/fileuploadview.coffee"), e.classes.KDFileUploadArea = t("./components/upload/fileuploadarea.coffee"), e.classes.KDFileUploadListView = t("./components/upload/fileuploadlistview.coffee"), e.classes.KDFileUploadThumbListView = t("./components/upload/fileuploadthumblistview.coffee"), e.classes.KDMultipartUploader = t("./components/upload/multipartuploader.coffee"), e.classes.KDDiaJoint = t("./components/dia/diajoint.coffee"), e.classes.KDDiaObject = t("./components/dia/diaobject.coffee"), e.classes.KDDiaScene = t("./components/dia/diascene.coffee"), e.classes.KDDiaContainer = t("./components/dia/diacontainer.coffee"), e.classes.KDLoaderView = t("./components/loader/loaderview.coffee"), e.classes.KDSelectBox = t("./components/inputs/selectbox.coffee"), e.classes.KDContentEditableView = t("./components/inputs/contenteditableview.coffee"), e.classes.KDInputValidator = t("./components/inputs/inputvalidator.coffee"), e.classes.KDDelimitedInputView = t("./components/inputs/delimitedinputview.coffee"), e.classes.KDInputSwitch = t("./components/inputs/inputswitch.coffee"), e.classes.KDHitEnterInputView = t("./components/inputs/hitenterinputview.coffee"), e.classes.KDLabelView = t("./components/inputs/labelview.coffee"), e.classes.KDInputView = t("./components/inputs/inputview.coffee"), e.classes.KDTokenizedInput = t("./components/inputs/tokenizedinputview.coffee"), e.classes.KDCheckBox = t("./components/inputs/checkbox.coffee"), e.classes.KDInputCheckboxGroup = t("./components/inputs/inputcheckboxgroup.coffee"), e.classes.KDOnOffSwitch = t("./components/inputs/onoffswitch.coffee"), e.classes.KDWmdInput = t("./components/inputs/wmdinput.coffee"), e.classes.KDMultipleChoice = t("./components/inputs/multiplechoice.coffee"), e.classes.KDInputRadioGroup = t("./components/inputs/inputradiogroup.coffee"), e.classes.KDModalViewWithForms = t("./components/modals/modalviewwithforms.coffee"), e.classes.KDBlockingModalView = t("./components/modals/blockingmodalview.coffee"), e.classes.KDModalViewStack = t("./components/modals/modalviewstack.coffee"), e.classes.KDModalView = t("./components/modals/modalview.coffee"), e.classes.KDListView = t("./components/list/listview.coffee"), e.classes.KDListItemView = t("./components/list/listitemview.coffee"), e.classes.KDListViewController = t("./components/list/listviewcontroller.coffee"), e.classes.KDTabHandleMoveNav = t("./components/tabs/tabhandlemovenav.coffee"), e.classes.KDTabPaneView = t("./components/tabs/tabpaneview.coffee"), e.classes.KDTabHandleView = t("./components/tabs/tabhandleview.coffee"), e.classes.KDTabViewWithForms = t("./components/tabs/tabviewwithforms.coffee"), e.classes.KDTabView = t("./components/tabs/tabview.coffee"), e.classes.KDTabHandleContainer = t("./components/tabs/tabhandlecontainer.coffee"), e.classes.KDTooltip = t("./components/tooltip/tooltip.coffee"), e.classes.KDNotificationView = t("./components/notifications/notificationview.coffee"), e.classes.JContextMenuItem = t("./components/contextmenu/contextmenuitem.coffee"), e.classes.KDContextMenu = t("./components/contextmenu/contextmenu.coffee"), e.classes.JContextMenuTreeViewController = t("./components/contextmenu/contextmenutreeviewcontroller.coffee"), e.classes.JContextMenuTreeView = t("./components/contextmenu/contextmenutreeview.coffee"), e.classes.KDCustomScrollViewWrapper = t("./components/scrollview/customscrollviewinner.coffee"), e.classes.KDScrollView = t("./components/scrollview/scrollview.coffee"), e.classes.KDScrollThumb = t("./components/scrollview/scrollthumb.coffee"), e.classes.KDScrollTrack = t("./components/scrollview/scrolltrack.coffee"), e.classes.KDCustomScrollView = t("./components/scrollview/customscrollview.coffee"), e.classes.KDSliderBarView = t("./components/sliderbar/sliderbarview.coffee"), e.classes.KDSliderBarHandleView = t("./components/sliderbar/sliderbarhandleview.coffee"), e.classes.KDAutoCompleteListView = t("./components/autocomplete/autocompletelist.coffee"), e.classes.KDAutoCompleteController = t("./components/autocomplete/autocompletecontroller.coffee"), e.classes.KDAutoCompleteFetchingItem = t("./components/autocomplete/autocompletefetchingitem.coffee"), e.classes.KDAutoCompletedItem = t("./components/autocomplete/autocompleteditems.coffee"), e.classes.KDAutocompleteUnselecteableItem = t("./components/autocomplete/autocompleteunselecteableitem.coffee"), e.classes.NoAutocompleteMultipleListView = t("./components/autocomplete/noautocompletemultiplelistview.coffee"), e.classes.KDSimpleAutocomplete = t("./components/autocomplete/simpleautocomplete.coffee"), e.classes.KDMultipleInputView = t("./components/autocomplete/multipleinputview.coffee"), e.classes.KDAutoCompleteNothingFoundItem = t("./components/autocomplete/autocompletenothingfounditem.coffee"), e.classes.KDAutoComplete = t("./components/autocomplete/autocomplete.coffee"), e.classes.MultipleInputListView = t("./components/autocomplete/multipleinputlistview.coffee"), e.classes.MultipleListItemView = t("./components/autocomplete/multiplelistitemview.coffee"), e.classes.KDAutoCompleteListItemView = t("./components/autocomplete/autocompletelistitem.coffee"), e.classes.NoAutocompleteInputView = t("./components/autocomplete/noautocompleteinputview.coffee"), e.classes.KDFormViewWithFields = t("./components/forms/formviewwithfields.coffee"), e.classes.KDFormView = t("./components/forms/formview.coffee"), e.classes.KDDialogView = t("./components/dialog/dialogview.coffee"), e.classes.KDHeaderView = t("./components/header/headerview.coffee"), e.classes.KDSlidePageView = t("./components/slideshow/slidepageview.coffee"), e.classes.KDSlideShowView = t("./components/slideshow/slideshowview.coffee"), e.classes.KDCounterView = t("./components/counter/counterview.coffee"), e.classes.KDCounterDigitView = t("./components/counter/counterdigitview.coffee"), e.classes.KDSplitComboView = t("./components/split/splitcomboview.coffee"), e.classes.KDSplitResizer = t("./components/split/splitresizer.coffee"), e.classes.KDSplitView = t("./components/split/splitview.coffee"), e.classes.KDSplitViewPanel = t("./components/split/splitpanel.coffee"), e.classes.KDTimeAgoView = t("./components/time/timeagoview.coffee"), e.classes.JTreeView = t("./components/tree/treeview.coffee"), e.classes.JTreeViewController = t("./components/tree/treeviewcontroller.coffee"), e.classes.JTreeItemView = t("./components/tree/treeitemview.coffee"), e.classes.KDProgressBarView = t("./components/progressbar/progressbarview.coffee"), e.classes.KDSpotlightView = t("./components/overlay/spotlightview.coffee"), e.classes.KDOverlayView = t("./components/overlay/overlayview.coffee"), e.classes.KDButtonView = t("./components/buttons/buttonview.coffee"), e.classes.JButtonMenu = t("./components/buttons/buttonmenu.coffee"), e.classes.KDButtonBar = t("./components/buttons/buttonbar.coffee"), e.classes.KDButtonViewWithMenu = t("./components/buttons/buttonviewwithmenu.coffee"), e.classes.KDButtonGroupView = t("./components/buttons/buttongroupview.coffee"), e.classes.KDToggleButton = t("./components/buttons/togglebutton.coffee"), e.classes.KDWebcamView = t("./components/image/webcamview.coffee"), e.classes.KDWindowController = t("./core/windowcontroller.coffee"), e.classes.KDEventEmitter = t("./core/eventemitter.coffee"), e.classes.KDCustomHTMLView = t("./core/customhtmlview.coffee"), e.classes.KDRouter = t("./core/router.coffee"), e.classes.KDEventEmitter.Wildcard = t("./core/eventemitterwildcard.coffee"), e.classes.KDView = t("./core/view.coffee"), e.classes.KDObject = t("./core/object.coffee"), e.classes.KDViewController = t("./core/viewcontroller.coffee"), e.classes.KDController = t("./core/controller.coffee"), e.classes.KDKeyboardListener = t("./core/keyboard/listener.coffee"), e.classes.KDKeyboardMap = t("./core/keyboard/map.coffee"), e.exportKDFramework()
		}, {
			"./components/autocomplete/autocomplete.coffee": 3,
			"./components/autocomplete/autocompletecontroller.coffee": 4,
			"./components/autocomplete/autocompleteditems.coffee": 5,
			"./components/autocomplete/autocompletefetchingitem.coffee": 6,
			"./components/autocomplete/autocompletelist.coffee": 7,
			"./components/autocomplete/autocompletelistitem.coffee": 8,
			"./components/autocomplete/autocompletenothingfounditem.coffee": 9,
			"./components/autocomplete/autocompleteunselecteableitem.coffee": 10,
			"./components/autocomplete/multipleinputlistview.coffee": 11,
			"./components/autocomplete/multipleinputview.coffee": 12,
			"./components/autocomplete/multiplelistitemview.coffee": 13,
			"./components/autocomplete/noautocompleteinputview.coffee": 14,
			"./components/autocomplete/noautocompletemultiplelistview.coffee": 15,
			"./components/autocomplete/simpleautocomplete.coffee": 16,
			"./components/buttons/buttonbar.coffee": 17,
			"./components/buttons/buttongroupview.coffee": 18,
			"./components/buttons/buttonmenu.coffee": 19,
			"./components/buttons/buttonview.coffee": 20,
			"./components/buttons/buttonviewwithmenu.coffee": 21,
			"./components/buttons/togglebutton.coffee": 22,
			"./components/contextmenu/contextmenu.coffee": 23,
			"./components/contextmenu/contextmenuitem.coffee": 24,
			"./components/contextmenu/contextmenutreeview.coffee": 25,
			"./components/contextmenu/contextmenutreeviewcontroller.coffee": 26,
			"./components/counter/counterdigitview.coffee": 27,
			"./components/counter/counterview.coffee": 28,
			"./components/dia/diacontainer.coffee": 29,
			"./components/dia/diajoint.coffee": 30,
			"./components/dia/diaobject.coffee": 31,
			"./components/dia/diascene.coffee": 32,
			"./components/dialog/dialogview.coffee": 33,
			"./components/forms/formview.coffee": 34,
			"./components/forms/formviewwithfields.coffee": 35,
			"./components/header/headerview.coffee": 36,
			"./components/image/webcamview.coffee": 37,
			"./components/inputs/checkbox.coffee": 38,
			"./components/inputs/contenteditableview.coffee": 39,
			"./components/inputs/delimitedinputview.coffee": 40,
			"./components/inputs/hitenterinputview.coffee": 41,
			"./components/inputs/inputcheckboxgroup.coffee": 42,
			"./components/inputs/inputradiogroup.coffee": 43,
			"./components/inputs/inputswitch.coffee": 44,
			"./components/inputs/inputvalidator.coffee": 45,
			"./components/inputs/inputview.coffee": 46,
			"./components/inputs/labelview.coffee": 47,
			"./components/inputs/multiplechoice.coffee": 48,
			"./components/inputs/onoffswitch.coffee": 49,
			"./components/inputs/selectbox.coffee": 50,
			"./components/inputs/tokenizedinputview.coffee": 51,
			"./components/inputs/wmdinput.coffee": 52,
			"./components/list/listitemview.coffee": 53,
			"./components/list/listview.coffee": 54,
			"./components/list/listviewcontroller.coffee": 55,
			"./components/loader/loaderview.coffee": 56,
			"./components/modals/blockingmodalview.coffee": 57,
			"./components/modals/modalview.coffee": 58,
			"./components/modals/modalviewstack.coffee": 59,
			"./components/modals/modalviewwithforms.coffee": 60,
			"./components/notifications/notificationview.coffee": 61,
			"./components/overlay/overlayview.coffee": 62,
			"./components/overlay/spotlightview.coffee": 63,
			"./components/progressbar/progressbarview.coffee": 64,
			"./components/scrollview/customscrollview.coffee": 65,
			"./components/scrollview/customscrollviewinner.coffee": 66,
			"./components/scrollview/scrollthumb.coffee": 67,
			"./components/scrollview/scrolltrack.coffee": 68,
			"./components/scrollview/scrollview.coffee": 69,
			"./components/sliderbar/sliderbarhandleview.coffee": 70,
			"./components/sliderbar/sliderbarview.coffee": 71,
			"./components/slideshow/slidepageview.coffee": 72,
			"./components/slideshow/slideshowview.coffee": 73,
			"./components/split/splitcomboview.coffee": 74,
			"./components/split/splitpanel.coffee": 75,
			"./components/split/splitresizer.coffee": 76,
			"./components/split/splitview.coffee": 77,
			"./components/tabs/tabhandlecontainer.coffee": 78,
			"./components/tabs/tabhandlemovenav.coffee": 79,
			"./components/tabs/tabhandleview.coffee": 80,
			"./components/tabs/tabpaneview.coffee": 81,
			"./components/tabs/tabview.coffee": 82,
			"./components/tabs/tabviewwithforms.coffee": 83,
			"./components/time/timeagoview.coffee": 84,
			"./components/tooltip/tooltip.coffee": 85,
			"./components/tree/treeitemview.coffee": 86,
			"./components/tree/treeview.coffee": 87,
			"./components/tree/treeviewcontroller.coffee": 88,
			"./components/upload/fileuploadarea.coffee": 89,
			"./components/upload/fileuploadlistitemview.coffee": 90,
			"./components/upload/fileuploadlistview.coffee": 91,
			"./components/upload/fileuploadthumbitemview.coffee": 92,
			"./components/upload/fileuploadthumblistview.coffee": 93,
			"./components/upload/fileuploadview.coffee": 94,
			"./components/upload/multipartuploader.coffee": 95,
			"./core/controller.coffee": 96,
			"./core/customhtmlview.coffee": 97,
			"./core/eventemitter.coffee": 98,
			"./core/eventemitterwildcard.coffee": 99,
			"./core/kd.coffee": 100,
			"./core/kd.dom.js": 101,
			"./core/keyboard/listener.coffee": 102,
			"./core/keyboard/map.coffee": 103,
			"./core/object.coffee": 104,
			"./core/router.coffee": 105,
			"./core/utils.coffee": 107,
			"./core/view.coffee": 108,
			"./core/viewcontroller.coffee": 109,
			"./core/windowcontroller.coffee": 110,
			"./lib.includes.coffee": 112
		}
	],
	112: [
		function (t, e) {
			e.exports = ["./libs/docwritenoop.js", "./libs/encode.js", "./libs/jquery-1.9.1.js", "./libs/underscore-min.1.3.js", "./libs/cookies.js", "./libs/jquery-timeago.js", "./libs/date.format.js", "./libs/highlight.pack.js", "./libs/inflector.js", "./libs/canvas-loader.js", "./libs/mousetrap.js", "./libs/mousetrap-global-bind.js", "./libs/marked.js", "./libs/jspath.js", "./libs/hammer.js"]
		}, {}
	]
}, {}, [111]);