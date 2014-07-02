var ActivityAppController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivityAppController = function (_super) {
	function ActivityAppController(options) {
		null == options && (options = {});
		options.view = new ActivityAppView({
			testPath: "activity-feed"
		});
		options.appInfo = {
			name: "Activity"
		};
		ActivityAppController.__super__.constructor.call(this, options);
		this.currentFeedFilter = "Public";
		this.currentActivityFilter = "Everything";
		this.appStorage = new AppStorage("Activity", "1.0");
		this.isLoading = !1;
		this.mainController = KD.getSingleton("mainController");
		this.lastTo = null;
		this.lastFrom = Date.now();
		this.lastQuery = null;
		KD.singletons.dock.getView().show();
		this.status = KD.getSingleton("status");
		this.status.on("reconnected", function (_this) {
			return function (conn) {
				return "internetDownForLongTime" === (null != conn ? conn.reason : void 0) ? _this.refresh() : void 0
			}
		}(this));
		this.on("activitiesCouldntBeFetched", function (_this) {
			return function () {
				var _ref;
				return null != (_ref = _this.listController) ? _ref.hideLazyLoader() : void 0
			}
		}(this))
	}
	var USEDFEEDS, clearQuotes, dash;
	__extends(ActivityAppController, _super);
	KD.registerAppClass(ActivityAppController, {
		name: "Activity",
		searchRoute: "/Activity?q=:text:",
		hiddenHandle: !0
	});
	dash = Bongo.dash;
	USEDFEEDS = [];
	ActivityAppController.clearQuotes = clearQuotes = function (activities) {
		var activity, activityId;
		return activities = function () {
			var _ref, _results;
			_results = [];
			for (activityId in activities)
				if (__hasProp.call(activities, activityId)) {
					activity = activities[activityId];
					activity.snapshot = null != (_ref = activity.snapshot) ? _ref.replace(/&quot;/g, '"') : void 0;
					_results.push(activity)
				}
			return _results
		}()
	};
	ActivityAppController.prototype.loadView = function () {
		return this.getView().feedWrapper.ready(function (_this) {
			return function () {
				_this.attachEvents(_this.getView().feedWrapper.controller);
				return _this.emit("ready")
			}
		}(this))
	};
	ActivityAppController.prototype.resetAll = function () {
		this.lastTo = null;
		this.lastFrom = Date.now();
		this.isLoading = !1;
		this.reachedEndOfActivities = !1;
		this.listController.resetList();
		return this.listController.removeAllItems()
	};
	ActivityAppController.prototype.search = function (text) {
		text = Encoder.XSSEncode(text);
		this.searchText = text;
		this.setWarning({
			text: text,
			loading: !0,
			type: "search"
		});
		return this.populateActivity({
			searchText: text
		})
	};
	ActivityAppController.prototype.bindLazyLoad = function () {
		return this.once("LazyLoadThresholdReached", this.bound("continueLoadingTeasers"))
	};
	ActivityAppController.prototype.continueLoadingTeasers = function () {
		var options;
		if (!this.isLoading) {
			this.clearPopulateActivityBindings();
			options = {
				to: this.lastFrom
			};
			this.searchText && (options.searchText = this.searchText);
			this.populateActivity(options);
			return KD.mixpanel("Scroll down feed, success")
		}
	};
	ActivityAppController.prototype.attachEvents = function (controller) {
		var activityController, appView;
		appView = this.getView();
		activityController = KD.getSingleton("activityController");
		activityController.on("Refresh", this.bound("refresh"));
		this.listController = controller;
		this.bindLazyLoad();
		return appView.activityHeader.feedFilterNav.on("FilterChanged", function (_this) {
			return function (filter) {
				_this.resetAll();
				_this.clearPopulateActivityBindings();
				"Public" === filter || "Followed" === filter ? _this.setFeedFilter(filter) : _this.setActivityFilter(filter);
				return _this.populateActivity()
			}
		}(this))
	};
	ActivityAppController.prototype.setFeedFilter = function (feedType) {
		return this.currentFeedFilter = feedType
	};
	ActivityAppController.prototype.getFeedFilter = function () {
		return this.currentFeedFilter
	};
	ActivityAppController.prototype.setActivityFilter = function (activityType) {
		return this.currentActivityFilter = activityType
	};
	ActivityAppController.prototype.getActivityFilter = function () {
		return this.currentActivityFilter
	};
	ActivityAppController.prototype.clearPopulateActivityBindings = function () {
		var eventSuffix;
		eventSuffix = "" + this.getFeedFilter() + "_" + this.getActivityFilter();
		this.off("followingFeedFetched_" + eventSuffix);
		return this.off("publicFeedFetched_" + eventSuffix)
	};
	ActivityAppController.prototype.handleQuery = function (query) {
		var options, search, tag;
		null == query && (query = {});
		if (query.tagged) {
			if (this.lastQuery && query.tagged === this.lastQuery.tagged) return;
			tag = KD.utils.slugify(KD.utils.stripTags(query.tagged));
			this.setWarning({
				text: tag,
				loading: !0
			});
			options = {
				filterByTag: tag
			}
		} else if (query.q) {
			if (this.lastQuery && query.q === this.lastQuery.q) return;
			search = KD.utils.stripTags(query.q);
			this.setWarning({
				text: search,
				loading: !0,
				type: "search"
			});
			options = {
				searchText: search
			}
		} else if (this.lastQuery && 0 === Object.keys(query).length && 0 === Object.keys(this.lastQuery).length) return;
		this.lastQuery = query;
		return this.ready(function (_this) {
			return function () {
				return _this.populateActivity(options)
			}
		}(this))
	};
	ActivityAppController.prototype.populateActivity = function (options, callback) {
		var fetch, filterByTag, groupsController, searchText, setFeedData, to, view;
		null == options && (options = {});
		null == callback && (callback = noop);
		if (!this.isLoading && !this.reachedEndOfActivities) {
			view = this.getView();
			this.listController.showLazyLoader(!1);
			view.unsetTopicTag();
			this.isLoading = !0;
			groupsController = KD.singletons.groupsController;
			filterByTag = options.filterByTag, to = options.to, searchText = options.searchText;
			setFeedData = function (_this) {
				return function (messages) {
					_this.isLoading = !1;
					_this.bindLazyLoad();
					_this.extractMessageTimeStamps(messages);
					_this.listController.listActivities(messages);
					return callback(messages)
				}
			}(this);
			fetch = function (_this) {
				return function () {
					var eventSuffix, group, groupObj, mydate, pinnedListController, pinnedListView, roles, togglePinnedList, _ref;
					groupObj = groupsController.getCurrentGroup();
					mydate = new Date((new Date).setSeconds(0) + 6e4).getTime();
					options = {
						to: options.to || mydate,
						group: {
							slug: (null != groupObj ? groupObj.slug : void 0) || "koding",
							id: groupObj.getId()
						},
						limit: KD.config.activityFetchCount,
						facets: _this.getActivityFilter(),
						withExempt: !1,
						slug: filterByTag,
						searchText: searchText
					};
					options.withExempt = null != KD.getSingleton("activityController").flags.showExempt;
					eventSuffix = "" + _this.getFeedFilter() + "_" + _this.getActivityFilter();
					roles = KD.config.roles;
					group = null != groupObj ? groupObj.slug : void 0;
					_ref = view.feedWrapper, togglePinnedList = _ref.togglePinnedList, pinnedListController = _ref.pinnedListController;
					pinnedListView = pinnedListController.getListView();
					togglePinnedList.hide();
					pinnedListView.hide();
					if (!to && (searchText || _this.searchText)) {
						_this.resetAll();
						_this.clearPopulateActivityBindings();
						_this.searchText = searchText
					}
					if (null != searchText || _this.searchText && to) {
						null == options.searchText && (options.searchText = _this.searchText);
						_this.once("searchFeedFetched_" + eventSuffix, setFeedData);
						_this.searchActivities(options);
						_this.setWarning({
							text: searchText,
							loading: !1,
							type: "search"
						})
					} else {
						if (!to && (filterByTag || _this._wasFilterByTag)) {
							_this.resetAll();
							_this.clearPopulateActivityBindings();
							_this._wasFilterByTag = filterByTag
						}
						if (null != filterByTag || _this._wasFilterByTag && to) {
							null == options.slug && (options.slug = _this._wasFilterByTag);
							_this.once("topicFeedFetched_" + eventSuffix, setFeedData);
							_this.fetchTopicActivities(options);
							_this.setWarning({
								text: options.slug
							});
							view.setTopicTag(options.slug)
						} else {
							if ("Public" !== _this.getFeedFilter()) {
								_this.once("followingFeedFetched_" + eventSuffix, setFeedData);
								_this.fetchFollowingActivities(options);
								return _this.setWarning()
							}
							_this.once("publicFeedFetched_" + eventSuffix, setFeedData);
							_this.fetchPublicActivities(options);
							_this.setWarning();
							if (pinnedListController.getItemCount()) {
								togglePinnedList.show();
								pinnedListView.show()
							}
						}
					}
				}
			}(this);
			return groupsController.ready(fetch)
		}
	};
	ActivityAppController.prototype.searchActivities = function (options) {
		var JNewStatusUpdate, eventSuffix;
		null == options && (options = {});
		options.to = this.lastTo;
		JNewStatusUpdate = KD.remote.api.JNewStatusUpdate;
		eventSuffix = "" + this.getFeedFilter() + "_" + this.getActivityFilter();
		return JNewStatusUpdate.search(options, function (_this) {
			return function (err, activities) {
				return err ? _this.emit("activitiesCouldntBeFetched", err) : _this.emit("searchFeedFetched_" + eventSuffix, activities)
			}
		}(this))
	};
	ActivityAppController.prototype.fetchTopicActivities = function (options) {
		var JNewStatusUpdate, eventSuffix;
		null == options && (options = {});
		options.to = this.lastTo;
		JNewStatusUpdate = KD.remote.api.JNewStatusUpdate;
		eventSuffix = "" + this.getFeedFilter() + "_" + this.getActivityFilter();
		return JNewStatusUpdate.fetchTopicFeed(options, function (_this) {
			return function (err, activities) {
				return err ? _this.emit("activitiesCouldntBeFetched", err) : _this.emit("topicFeedFetched_" + eventSuffix, activities)
			}
		}(this))
	};
	ActivityAppController.prototype.fetchPublicActivities = function (options) {
		var JNewStatusUpdate, eventSuffix, feedId, group, messages, prefetchedActivity;
		null == options && (options = {});
		options.to = this.lastTo;
		options.feedType = {
			$ne: "bug"
		};
		JNewStatusUpdate = KD.remote.api.JNewStatusUpdate;
		eventSuffix = "" + this.getFeedFilter() + "_" + this.getActivityFilter();
		if ("Public" === this.getFeedFilter() && "Everything" === this.getActivityFilter() && KD.prefetchedFeeds && !KD.whoami().isExempt) {
			group = KD.getSingleton("groupsController").getCurrentGroup();
			feedId = "" + group.slug + "-activity.main";
			prefetchedActivity = KD.prefetchedFeeds[feedId];
			if (prefetchedActivity && __indexOf.call(USEDFEEDS, feedId) < 0) {
				log("exhausting feed:", feedId);
				USEDFEEDS.push(feedId);
				messages = this.prepareCacheForListing(prefetchedActivity);
				this.emit("publicFeedFetched_" + eventSuffix, messages);
				return
			}
		}
		return JNewStatusUpdate.fetchGroupActivity(options, function (_this) {
			return function (err, messages) {
				return err ? _this.emit("activitiesCouldntBeFetched", err) : _this.emit("publicFeedFetched_" + eventSuffix, messages)
			}
		}(this))
	};
	ActivityAppController.prototype.prepareCacheForListing = function (cache) {
		return KD.remote.revive(cache)
	};
	ActivityAppController.prototype.fetchFollowingActivities = function (options) {
		var JNewStatusUpdate, eventSuffix;
		null == options && (options = {});
		JNewStatusUpdate = KD.remote.api.JNewStatusUpdate;
		options.to = this.followingLastTo || Date.now();
		eventSuffix = "" + this.getFeedFilter() + "_" + this.getActivityFilter();
		return JNewStatusUpdate.fetchFollowingFeed(options, function (_this) {
			return function (err, activities) {
				if (err) return _this.emit("activitiesCouldntBeFetched", err);
				if (Array.isArray(activities)) {
					activities = activities.reverse();
					activities.length > 0 && (_this.followingLastTo = activities.last.meta.createdAt)
				}
				return _this.emit("followingFeedFetched_" + eventSuffix, activities)
			}
		}(this))
	};
	ActivityAppController.prototype.setWarning = function (options) {
		var filterWarning, loading, text, type;
		null == options && (options = {});
		options.type || (options.type = "tag");
		text = options.text, loading = options.loading, type = options.type;
		filterWarning = this.getView().filterWarning;
		if (text) {
			if (loading) {
				filterWarning.warning.setPartial("Filtering activities by " + text + "...");
				return filterWarning.show()
			}
			return filterWarning.showWarning({
				text: text,
				type: type
			})
		}
		return filterWarning.hide()
	};
	ActivityAppController.prototype.setLastTimestamps = function (from, to) {
		if (from) {
			this.lastTo = to;
			return this.lastFrom = from
		}
		return this.reachedEndOfActivities = !0
	};
	ActivityAppController.prototype.extractMessageTimeStamps = function (messages) {
		var from, to;
		if (0 !== messages.length) {
			from = new Date(messages.last.meta.createdAt).getTime();
			to = new Date(messages.first.meta.createdAt).getTime();
			return this.setLastTimestamps(to, from)
		}
	};
	ActivityAppController.prototype.createContentDisplay = function (activity, callback) {
		var contentDisplay;
		null == callback && (callback = function () {});
		contentDisplay = this.createStatusUpdateContentDisplay(activity);
		return this.utils.defer(function () {
			return callback(contentDisplay)
		})
	};
	ActivityAppController.prototype.showContentDisplay = function (contentDisplay) {
		KD.singleton("display").emit("ContentDisplayWantsToBeShown", contentDisplay);
		return contentDisplay
	};
	ActivityAppController.prototype.createStatusUpdateContentDisplay = function (activity) {
		return this.showContentDisplay(new ContentDisplayStatusUpdate({
			title: "Status Update",
			type: "status"
		}, activity))
	};
	ActivityAppController.prototype.fetchActivitiesProfilePage = function (options, callback) {
		var appStorage, originId;
		originId = options.originId;
		options.to = options.to || this.profileLastTo || Date.now();
		if (KD.checkFlag("super-admin")) {
			appStorage = new AppStorage("Activity", "1.0");
			return appStorage.fetchStorage(function (_this) {
				return function () {
					options.withExempt = appStorage.getValue("showLowQualityContent") || !1;
					return _this.fetchActivitiesProfilePageWithExemptOption(options, callback)
				}
			}(this))
		}
		options.withExempt = !1;
		return this.fetchActivitiesProfilePageWithExemptOption(options, callback)
	};
	ActivityAppController.prototype.fetchActivitiesProfilePageWithExemptOption = function (options, callback) {
		var JNewStatusUpdate, eventSuffix;
		JNewStatusUpdate = KD.remote.api.JNewStatusUpdate;
		eventSuffix = "" + this.getFeedFilter() + "_" + this.getActivityFilter();
		return JNewStatusUpdate.fetchProfileFeed(options, function (_this) {
			return function (err, activities) {
				var lastOne;
				if (err) return _this.emit("activitiesCouldntBeFetched", err);
				if ((null != activities ? activities.length : void 0) > 0) {
					lastOne = activities.last.meta.createdAt;
					_this.profileLastTo = new Date(lastOne).getTime()
				}
				return callback(err, activities)
			}
		}(this))
	};
	ActivityAppController.prototype.getNewItemsCount = function (callback) {
		var _ref, _ref1;
		return "function" == typeof callback ? callback((null != (_ref = this.listController) && null != (_ref1 = _ref.activityHeader) ? _ref1.getNewItemsCount() : void 0) || 0) : void 0
	};
	ActivityAppController.prototype.refresh = function () {
		if (!this.isLoading) {
			this.resetAll();
			this.clearPopulateActivityBindings();
			return this.populateActivityWithTimeout()
		}
	};
	ActivityAppController.prototype.populateActivityWithTimeout = function () {
		return this.populateActivity({}, KD.utils.getTimedOutCallbackOne({
			name: "populateActivity",
			onTimeout: this.bound("recover"),
			timeout: 2e4
		}))
	};
	ActivityAppController.prototype.recover = function () {
		this.isLoading = !1;
		this.status.disconnect();
		return this.refresh()
	};
	ActivityAppController.prototype.resetProfileLastTo = function () {
		return this.profileLastTo = null
	};
	return ActivityAppController
}(AppController);
var ActivityAppView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivityAppView = function (_super) {
	function ActivityAppView(options, data) {
		var appStorageController, mainController, windowController, _ref1;
		null == options && (options = {});
		options.cssClass = "content-page activity";
		options.domId = "content-page-activity";
		ActivityAppView.__super__.constructor.call(this, options, data);
		entryPoint = KD.config.entryPoint;
		_ref1 = KD.singletons, windowController = _ref1.windowController, mainController = _ref1.mainController, appStorageController = _ref1.appStorageController;
		this.appStorage = appStorageController.storage("Activity", "1.0.1");
		this.appStorage.setValue("liveUpdates", !1);
		this.feedWrapper = new ActivityListContainer;
		this.inputWidget = new ActivityInputWidget;
		this.referalBox = new ReferalBox;
		this.topWidgetWrapper = new KDCustomHTMLView;
		this.leftWidgetWrapper = new KDCustomHTMLView;
		this.groupListBox = new UserGroupList;
		this.topicsBox = new ActiveTopics;
		this.usersBox = new ActiveUsers;
		this.groupCoverView = new FeedCoverPhotoView;
		this.groupDescription = new GroupDescription;
		this.groupMembers = new GroupMembers;
		mainController.ready(function (_this) {
			return function () {
				var widgetController;
				widgetController = KD.singletons.widgetController;
				return widgetController.showWidgets([{
					view: _this.topWidgetWrapper,
					key: "ActivityTop"
				}, {
					view: _this.leftWidgetWrapper,
					key: "ActivityLeft"
				}])
			}
		}(this));
		this.inputWidget.on("ActivitySubmitted", this.bound("activitySubmitted"));
		mainController.on("AccountChanged", this.bound("decorate"));
		mainController.on("JoinedGroup", function (_this) {
			return function () {
				return _this.inputWidget.show()
			}
		}(this));
		this.feedWrapper.ready(function (_this) {
			return function () {
				var feedFilterNav;
				_this.activityHeader = _this.feedWrapper.controller.activityHeader;
				_this.filterWarning = _this.feedWrapper.filterWarning;
				feedFilterNav = _this.activityHeader.feedFilterNav;
				return feedFilterNav.unsetClass("multiple-choice on-off")
			}
		}(this))
	}
	var canListMembers, entryPoint, headerHeight, isGroup, isKoding, isMember, isPrivateGroup, permissions, roles, _ref;
	__extends(ActivityAppView, _super);
	JView.mixin(ActivityAppView.prototype);
	headerHeight = 0;
	_ref = KD.config, entryPoint = _ref.entryPoint, permissions = _ref.permissions, roles = _ref.roles;
	isGroup = function () {
		return "group" === (null != entryPoint ? entryPoint.type : void 0)
	};
	isKoding = function () {
		return "koding" === (null != entryPoint ? entryPoint.slug : void 0)
	};
	isMember = function () {
		return __indexOf.call(roles, "member") >= 0
	};
	canListMembers = function () {
		return __indexOf.call(permissions, "list members") >= 0
	};
	isPrivateGroup = function () {
		return !isKoding() && isGroup()
	};
	ActivityAppView.prototype.viewAppended = function () {
		var appendAside;
		appendAside = function (_this) {
			return function (view) {
				return _this.addSubView(view, "aside")
			}
		}(this);
		JView.prototype.viewAppended.call(this);
		this.decorate();
		this.setLazyLoader(200);
		KD.isLoggedIn() && !isPrivateGroup() && appendAside(this.referalBox);
		isPrivateGroup() && appendAside(this.groupDescription);
		isPrivateGroup() && canListMembers() && appendAside(this.groupMembers);
		isKoding() && appendAside(this.groupListBox);
		appendAside(this.topicsBox);
		return canListMembers() ? appendAside(this.usersBox) : void 0
	};
	ActivityAppView.prototype.pistachio = function () {
		return "{{> this.groupCoverView}}\n<main>\n  {{> this.inputWidget}}\n  {{> this.feedWrapper}}\n  {{> this.topWidgetWrapper}}\n</main>\n<aside>\n  {{> this.leftWidgetWrapper}}\n</aside>"
	};
	ActivityAppView.prototype.activitySubmitted = function () {
		var appTop, duration, listTop;
		appTop = this.getElement().offsetTop;
		listTop = this.feedWrapper.listWrapper.getElement().offsetTop;
		duration = .3 * this.feedWrapper.pinnedListWrapper.getHeight();
		return $("html, body").animate({
			scrollTop: appTop + listTop + 10
		}, {
			duration: duration
		})
	};
	ActivityAppView.prototype.decorate = function () {
		var _ref1;
		_ref1 = KD.config, entryPoint = _ref1.entryPoint, roles = _ref1.roles;
		this.unsetClass("guest");
		isMember() || this.setClass("guest");
		KD.isLoggedIn() && this.setClass("loggedin");
		isMember() ? this.inputWidget.show() : this.inputWidget.hide();
		return this._windowDidResize()
	};
	ActivityAppView.prototype.setTopicTag = function (slug) {
		return slug ? KD.remote.api.JTag.one({
			slug: slug
		}, null, function (_this) {
			return function (err, tag) {
				return _this.inputWidget.input.setDefaultTokens({
					tags: [tag]
				})
			}
		}(this)) : void 0
	};
	ActivityAppView.prototype.unsetTopicTag = function () {
		return this.inputWidget.input.setDefaultTokens({
			tags: []
		})
	};
	return ActivityAppView
}(KDScrollView);
var ActivityListController, __bind = function (fn, me) {
		return function () {
			return fn.apply(me, arguments)
		}
	},
	__hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivityListController = function (_super) {
	function ActivityListController(options, data) {
		var groupController, viewOptions;
		null == options && (options = {});
		this.postIsCreated = __bind(this.postIsCreated, this);
		viewOptions = options.viewOptions || {};
		viewOptions.cssClass = KD.utils.curry("activity-related", viewOptions.cssClass);
		null == viewOptions.comments && (viewOptions.comments = !0);
		viewOptions.itemClass || (viewOptions.itemClass = options.itemClass);
		options.view || (options.view = new KDListView(viewOptions, data));
		null == options.startWithLazyLoader && (options.startWithLazyLoader = !0);
		options.lazyLoaderOptions = {
			partial: ""
		};
		null == options.showHeader && (options.showHeader = !0);
		null == options.noItemFoundWidget && (options.noItemFoundWidget = new KDCustomHTMLView({
			cssClass: "lazy-loader hidden",
			partial: "There is no activity."
		}));
		ActivityListController.__super__.constructor.call(this, options, data);
		this.resetList();
		this.hiddenItems = [];
		this._state = "public";
		groupController = KD.getSingleton("groupsController");
		groupController.on("PostIsCreated", this.bound("postIsCreated"))
	}
	var dash;
	__extends(ActivityListController, _super);
	dash = Bongo.dash;
	ActivityListController.prototype.postIsCreated = function (post) {
		var bugTag, instance, liveUpdate, subject, tag, _i, _len, _ref, _ref1;
		_ref = post.subject.tags;
		for (_i = 0, _len = _ref.length; _len > _i; _i++) {
			tag = _ref[_i];
			"bug" === tag.slug && (bugTag = tag)
		}
		subject = this.prepareSubject(post);
		instance = this.addItem(subject, 0);
		if (instance) {
			if (bugTag && !this.isMine(subject)) {
				instance.hide();
				this.hiddenItems.push(instance)
			}
			liveUpdate = "live" === (null != (_ref1 = this.activityHeader) ? _ref1.liveUpdateToggle.getState().title : void 0);
			if (!liveUpdate && !this.isMine(subject)) {
				instance.hide();
				this.hiddenItems.push(instance);
				if (!bugTag) return this.activityHeader.newActivityArrived()
			}
		}
	};
	ActivityListController.prototype.prepareSubject = function (post) {
		var subject;
		subject = post.subject;
		subject = KD.remote.revive(subject);
		this.bindItemEvents(subject);
		return subject
	};
	ActivityListController.prototype.resetList = function () {
		return this.lastItemTimeStamp = null
	};
	ActivityListController.prototype.loadView = function (mainView) {
		var data;
		data = this.getData();
		mainView.addSubView(this.activityHeader = new ActivityListHeader({
			cssClass: "feeder-header clearfix"
		}));
		this.getOptions().showHeader || this.activityHeader.hide();
		this.activityHeader.on("UnhideHiddenNewItems", function (_this) {
			return function () {
				return _this.unhideNewHiddenItems()
			}
		}(this));
		this.emit("ready");
		KD.getSingleton("activityController").clearNewItemsCount();
		return ActivityListController.__super__.loadView.apply(this, arguments)
	};
	ActivityListController.prototype.isMine = function (activity) {
		var id, _ref;
		id = KD.whoami().getId();
		return null != id && (id === activity.originId || id === (null != (_ref = activity.anchor) ? _ref.id : void 0))
	};
	ActivityListController.prototype.listActivities = function (activities) {
		var activityIds, queue;
		this.hideLazyLoader();
		if (activities.length > 0) {
			activityIds = [];
			queue = [];
			activities.forEach(function (_this) {
				return function (activity) {
					return queue.push(function () {
						_this.addItem(activity);
						activityIds.push(activity._id);
						return queue.fin()
					})
				}
			}(this));
			return dash(queue, function (_this) {
				return function () {
					var obj, objectTimestamp, _i, _len, _results;
					_this.checkIfLikedBefore(activityIds);
					_this.lastItemTimeStamp || (_this.lastItemTimeStamp = Date.now());
					_results = [];
					for (_i = 0, _len = activities.length; _len > _i; _i++) {
						obj = activities[_i];
						_this.bindItemEvents(obj);
						objectTimestamp = new Date(obj.meta.createdAt).getTime();
						_results.push(objectTimestamp < _this.lastItemTimeStamp ? _this.lastItemTimeStamp = objectTimestamp : void 0)
					}
					return _results
				}
			}(this))
		}
	};
	ActivityListController.prototype.checkIfLikedBefore = function (activityIds) {
		return KD.remote.api.CActivity.checkIfLikedBefore(activityIds, function (_this) {
			return function (err, likedIds) {
				var activity, likeView, _i, _len, _ref, _ref1, _ref2, _results;
				_ref = _this.getListView().items;
				_results = [];
				for (_i = 0, _len = _ref.length; _len > _i; _i++) {
					activity = _ref[_i];
					if (_ref1 = activity.data.getId().toString(), __indexOf.call(likedIds, _ref1) >= 0) {
						likeView = null != (_ref2 = activity.subViews.first.actionLinks) ? _ref2.likeView : void 0;
						if (likeView) {
							likeView.setClass("liked");
							_results.push(likeView._currentState = !0)
						} else _results.push(void 0)
					}
				}
				return _results
			}
		}(this))
	};
	ActivityListController.prototype.addItem = function (activity, index, animation) {
		var dataId, _ref;
		dataId = ("function" == typeof activity.getId ? activity.getId() : void 0) || activity._id || activity.id;
		if (null != dataId) {
			if (this.itemsIndexed[dataId]) return log("duplicate entry", null != (_ref = activity.bongo_) ? _ref.constructorName : void 0, dataId);
			this.itemsIndexed[dataId] = activity;
			return ActivityListController.__super__.addItem.call(this, activity, index, animation)
		}
	};
	ActivityListController.prototype.unhideNewHiddenItems = function () {
		this.hiddenItems.forEach(function (item) {
			return item.show()
		});
		this.hiddenItems = [];
		return "/Activity" !== KD.getSingleton("router").getCurrentPath() ? KD.getSingleton("activityController").clearNewItemsCount() : void 0
	};
	ActivityListController.prototype.instantiateListItems = function (items) {
		var item, newItems;
		newItems = ActivityListController.__super__.instantiateListItems.apply(this, arguments);
		this.checkIfLikedBefore(function () {
			var _i, _len, _results;
			_results = [];
			for (_i = 0, _len = items.length; _len > _i; _i++) {
				item = items[_i];
				_results.push(item.getId())
			}
			return _results
		}());
		return newItems
	};
	ActivityListController.prototype.bindItemEvents = function (item) {
		return item.on("TagsUpdated", function (tags) {
			return item.tags = KD.remote.revive(tags)
		})
	};
	return ActivityListController
}(KDListViewController);
var PinnedActivityListController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
PinnedActivityListController = function (_super) {
	function PinnedActivityListController(options, data) {
		var viewOptions;
		null == options && (options = {});
		viewOptions = options.viewOptions || {};
		viewOptions.cssClass = KD.utils.curry("pinned-activity-list", viewOptions.cssClass);
		options.viewOptions = viewOptions;
		options.startWithLazyLoader = !1;
		options.showHeader = !1;
		options.noItemFoundWidget = !1;
		PinnedActivityListController.__super__.constructor.call(this, options, data);
		this.getView().once("viewAppended", function (_this) {
			return function () {
				var feeds;
				if (KD.prefetchedFeeds) {
					feeds = KD.prefetchedFeeds["mostlikedactivity.main"] || [];
					if (feeds.length) return _this.instantiateListItems(KD.remote.revive(feeds));
					options = {
						sort: {
							"meta.likes": -1
						},
						limit: 5,
						from: Date.now() - 864e5
					};
					return KD.remote.api.JNewStatusUpdate.fetchGroupActivity(options, function (err, items) {
						if (err) return log("fetching pinned activity list failed", err);
						_this.instantiateListItems(items);
						return _this.emit("Loaded")
					})
				}
			}
		}(this))
	}
	__extends(PinnedActivityListController, _super);
	PinnedActivityListController.prototype.postIsCreated = function () {};
	return PinnedActivityListController
}(ActivityListController);
var CollageItemList, FeedCoverPhotoView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
FeedCoverPhotoView = function (_super) {
	function FeedCoverPhotoView(options, data) {
		var groupsController;
		null == options && (options = {});
		options.cssClass = "group-cover-view";
		FeedCoverPhotoView.__super__.constructor.call(this, options, data);
		groupsController = KD.singletons.groupsController;
		groupsController.ready(function (_this) {
			return function () {
				_this.group = groupsController.getCurrentGroup();
				"koding" !== _this.group.slug && _this.decorateHeader();
				return _this.group.on("update", function () {
					return "koding" !== _this.group.slug ? _this.decorateHeader() : void 0
				})
			}
		}(this))
	}
	var _notify;
	__extends(FeedCoverPhotoView, _super);
	_notify = function (msg) {
		return new KDNotificationView({
			title: msg || "There was an error, please try again later!"
		})
	};
	FeedCoverPhotoView.prototype.getResizedImage = function (imageToCrop) {
		var proxifyOptions;
		proxifyOptions = {
			crop: !0,
			width: 950,
			height: 315
		};
		return KD.utils.proxifyUrl(imageToCrop, proxifyOptions)
	};
	FeedCoverPhotoView.prototype.decorateHeader = function () {
		var resizedImg, _ref;
		if (!this.container) {
			this.container = new KDView({
				cssClass: "container",
				size: {
					height: 315
				}
			});
			resizedImg = this.getResizedImage(null != (_ref = this.group.customize) ? _ref.coverPhoto : void 0);
			this.coverView = new KDCustomHTMLView({
				tagName: "figure",
				attributes: {
					style: "background-image: url(" + resizedImg + ");"
				}
			});
			this.listController = new KDListViewController({
				startWithLazyLoader: !1,
				view: new KDListView({
					type: "collage",
					cssClass: "cover-list",
					itemClass: CollageItemList
				})
			});
			this.container.addSubView(this.getCoverUpdateButton());
			this.container.addSubView(this.coverView);
			this.container.addSubView(this.listController.getView());
			this.addSubView(this.container)
		}
		return this.toggle()
	};
	FeedCoverPhotoView.prototype.toggle = function () {
		var resizedImg, _ref, _ref1;
		if (null != (_ref = this.group.customize) ? _ref.coverPhoto : void 0) {
			this.listController.getView().hide();
			resizedImg = this.getResizedImage(null != (_ref1 = this.group.customize) ? _ref1.coverPhoto : void 0);
			this.coverView.setCss("background-image", "url(" + resizedImg + ")");
			return this.coverView.show()
		}
		this.coverView.hide();
		this.listController.getView().show();
		this.listController.removeAllItems();
		return this.group.fetchMembers({}, {
			limit: 20
		}, function (_this) {
			return function (err, accounts) {
				return _this.listController.instantiateListItems(accounts)
			}
		}(this))
	};
	FeedCoverPhotoView.prototype.getCoverUpdateButton = function () {
		return __indexOf.call(KD.config.roles, "admin") >= 0 ? new KDButtonView({
			style: "solid green small update-cover",
			icon: !0,
			type: "submit",
			title: "Update cover image",
			callback: function (_this) {
				return function () {
					var modal;
					return modal = new UploadImageModalView({
						cssClass: "group-cover-uploader",
						title: "Change Cover Photo",
						uploaderTitle: "Drag & drop image here! <small>Cover photos are 948 pixels wide and 315 pixels tall.</small>",
						width: 1004,
						image: {
							type: "coverPhoto",
							size: {
								width: 914,
								height: 315
							}
						},
						buttons: {
							uploadButton: {
								title: "Upload",
								cssClass: "modal-clean-green",
								callback: function () {
									return modal.upload(function (err) {
										return err ? _notify() : modal.destroy()
									})
								}
							},
							clear: {
								title: "Remove cover photo",
								cssClass: "modal-clean-red",
								callback: function () {
									return _this.group.modify({
										"customize.coverPhoto": ""
									}, function (err) {
										return err ? _notify() : modal.destroy()
									})
								}
							}
						}
					})
				}
			}(this)
		}) : new KDCustomHTMLView
	};
	return FeedCoverPhotoView
}(KDView);
CollageItemList = function (_super) {
	function CollageItemList(options, data) {
		null == options && (options = {});
		CollageItemList.__super__.constructor.call(this, options, data);
		this.avatar = new AvatarView({
			size: {
				width: 158,
				height: 158
			}
		}, this.getData())
	}
	__extends(CollageItemList, _super);
	JView.mixin(CollageItemList.prototype);
	CollageItemList.prototype.pistachio = function () {
		return "{{> this.avatar}}"
	};
	return CollageItemList
}(KDListItemView);
var ActivityActionLink, ActivityActionsView, ActivityCommentCount, ActivityCountLink, ActivityLikeCount, ActivityOpinionCount, ActivitySharePopup, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivitySharePopup = function (_super) {
	function ActivitySharePopup(options, data) {
		null == options && (options = {});
		options.cssClass = "share-popup";
		options.shortenText = !0;
		options.twitter = this.getTwitterOptions(options);
		options.newTab = this.getNewTabOptions(options);
		ActivitySharePopup.__super__.constructor.call(this, options, data)
	}
	__extends(ActivitySharePopup, _super);
	ActivitySharePopup.prototype.getTwitterOptions = function (options) {
		var body, data, hashTags, itemText, shareText, tag, tags, title, twitter;
		data = options.delegate.getData();
		tags = data.tags;
		if (tags) {
			hashTags = function () {
				var _i, _len, _results;
				_results = [];
				for (_i = 0, _len = tags.length; _len > _i; _i++) {
					tag = tags[_i];
					(null != tag ? tag.slug : void 0) && _results.push("#" + tag.slug)
				}
				return _results
			}();
			hashTags = _.unique(hashTags).join(" ");
			hashTags += " "
		} else hashTags = "";
		title = data.title, body = data.body;
		itemText = KD.utils.shortenText(title || body, {
			maxLength: 100,
			minLength: 100
		});
		shareText = "" + itemText + " " + hashTags + "- " + options.url;
		return twitter = {
			enabled: !0,
			text: shareText
		}
	};
	ActivitySharePopup.prototype.getNewTabOptions = function (options) {
		return {
			enabled: !0,
			url: options.url
		}
	};
	return ActivitySharePopup
}(SharePopup);
ActivityActionsView = function (_super) {
	function ActivityActionsView() {
		var activity;
		ActivityActionsView.__super__.constructor.apply(this, arguments);
		activity = this.getData();
		this.commentLink = new ActivityActionLink({
			partial: "Comment"
		});
		this.commentCount = new ActivityCommentCount({
			tooltip: {
				title: "Show all"
			},
			click: function (_this) {
				return function (event) {
					KD.utils.stopDOMEvent(event);
					return _this.getDelegate().emit("CommentCountClicked", _this)
				}
			}(this)
		}, activity);
		this.shareLink = new ActivityActionLink({
			partial: "Share",
			click: function (_this) {
				return function (event) {
					var data, shareUrl;
					KD.utils.stopDOMEvent(event);
					data = _this.getData();
					shareUrl = null != (null != data ? data.group : void 0) && "koding" !== data.group ? "" + KD.config.mainUri + "/" + data.group + "/Activity/" + data.slug : "" + KD.config.mainUri + "/Activity/" + data.slug;
					contextMenu = new KDContextMenu({
						cssClass: "activity-share-popup",
						type: "activity-share",
						delegate: _this,
						x: _this.shareLink.getX() + 25,
						y: _this.shareLink.getY() - 7,
						menuMaxWidth: 400,
						menuMinWidth: 192,
						lazyLoad: !0
					}, {
						customView: new ActivitySharePopup({
							delegate: _this,
							url: shareUrl
						})
					});
					return KD.mixpanel("Activity share, click")
				}
			}(this)
		});
		this.likeView = new LikeView({
			cssClass: "logged-in action-container",
			useTitle: !0,
			checkIfLikedBefore: !0
		}, activity);
		this.loader = new KDLoaderView({
			cssClass: "action-container",
			size: {
				width: 16
			},
			loaderOptions: {
				color: "#6B727B"
			}
		})
	}
	var contextMenu;
	__extends(ActivityActionsView, _super);
	JView.mixin(ActivityActionsView.prototype);
	JView.mixin(ActivityActionsView.prototype);
	contextMenu = null;
	ActivityActionsView.prototype.viewAppended = function () {
		ActivityActionsView.__super__.viewAppended.call(this);
		this.setClass("activity-actions");
		this.attachListeners();
		return this.loader.hide()
	};
	ActivityActionsView.prototype.pistachio = function () {
		return "{{> this.likeView}}\n<span class='logged-in action-container'>\n  {{> this.commentLink}}{{> this.commentCount}}\n</span>\n<span class='optional action-container'>\n  {{> this.shareLink}}\n</span>\n{{> this.loader}}"
	};
	ActivityActionsView.prototype.attachListeners = function () {
		var activity, commentList;
		activity = this.getData();
		commentList = this.getDelegate();
		commentList.on("BackgroundActivityStarted", this.loader.bound("show"));
		commentList.on("BackgroundActivityFinished", this.loader.bound("hide"));
		return this.commentLink.on("click", function (_this) {
			return function (event) {
				_this.utils.stopDOMEvent(event);
				return commentList.emit("CommentLinkReceivedClick", event, _this)
			}
		}(this))
	};
	return ActivityActionsView
}(JView);
ActivityActionLink = function (_super) {
	function ActivityActionLink(options, data) {
		options = $.extend({
			tagName: "a",
			cssClass: "action-link",
			attributes: {
				href: "#"
			}
		}, options);
		ActivityActionLink.__super__.constructor.call(this, options, data)
	}
	__extends(ActivityActionLink, _super);
	return ActivityActionLink
}(KDCustomHTMLView);
ActivityCountLink = function (_super) {
	function ActivityCountLink(options, data) {
		options = $.extend({
			tagName: "a",
			cssClass: "count",
			attributes: {
				href: "#"
			}
		}, options);
		ActivityCountLink.__super__.constructor.call(this, options, data)
	}
	__extends(ActivityCountLink, _super);
	JView.mixin(ActivityCountLink.prototype);
	ActivityCountLink.prototype.render = function () {
		ActivityCountLink.__super__.render.apply(this, arguments);
		return this.setCount(this.getData())
	};
	ActivityCountLink.prototype.viewAppended = function () {
		var activity;
		ActivityCountLink.__super__.viewAppended.call(this);
		activity = this.getData();
		return this.setCount(activity)
	};
	ActivityCountLink.prototype.pistachio = function () {
		return ""
	};
	return ActivityCountLink
}(JCustomHTMLView);
ActivityLikeCount = function (_super) {
	function ActivityLikeCount() {
		return ActivityLikeCount.__super__.constructor.apply(this, arguments)
	}
	__extends(ActivityLikeCount, _super);
	ActivityLikeCount.oldCount = 0;
	ActivityLikeCount.prototype.setCount = function (activity) {
		activity.meta.likes !== this.oldCount && this.emit("countChanged", activity.meta.likes);
		this.oldCount = activity.meta.likes;
		return 0 === activity.meta.likes ? this.hide() : this.show()
	};
	ActivityLikeCount.prototype.pistachio = function () {
		return "{{#(meta.likes)}}"
	};
	return ActivityLikeCount
}(ActivityCountLink);
ActivityCommentCount = function (_super) {
	function ActivityCommentCount() {
		return ActivityCommentCount.__super__.constructor.apply(this, arguments)
	}
	__extends(ActivityCommentCount, _super);
	ActivityCommentCount.prototype.setCount = function (activity) {
		0 === activity.repliesCount ? this.hide() : this.show();
		return this.emit("countChanged", activity.repliesCount)
	};
	ActivityCommentCount.prototype.pistachio = function () {
		return "{{#(repliesCount)}}"
	};
	return ActivityCommentCount
}(ActivityCountLink);
ActivityOpinionCount = function (_super) {
	function ActivityOpinionCount() {
		return ActivityOpinionCount.__super__.constructor.apply(this, arguments)
	}
	__extends(ActivityOpinionCount, _super);
	ActivityOpinionCount.prototype.setCount = function (activity) {
		0 === activity.opinionCount ? this.hide() : this.show();
		return this.emit("countChanged", activity.opinionCount)
	};
	ActivityOpinionCount.prototype.pistachio = function () {
		return "{{#(opinionCount)}}"
	};
	return ActivityOpinionCount
}(ActivityCountLink);
var ActivityListHeader, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityListHeader = function (_super) {
	function ActivityListHeader() {
		var mainController;
		ActivityListHeader.__super__.constructor.apply(this, arguments);
		mainController = KD.getSingleton("mainController");
		this.appStorage = new AppStorage("Activity", "1.0");
		this._newItemsCount = 0;
		this.showNewItemsInTitle = !1;
		this.showNewItemsLink = new KDCustomHTMLView({
			tagName: "a",
			attributes: {
				href: "#"
			},
			cssClass: "new-updates",
			tooltip: {
				title: "Click to see the new posts!"
			},
			partial: "0",
			click: function (_this) {
				return function (event) {
					KD.utils.stopDOMEvent(event);
					return _this.updateShowNewItemsLink(!0)
				}
			}(this)
		});
		this.showNewItemsLink.hide();
		this.liveUpdateToggle = new KDToggleButton({
			style: "live-updates",
			iconOnly: !0,
			defaultState: "lazy",
			tooltip: {
				title: "Live updates"
			},
			states: [{
				title: "lazy",
				iconClass: "broken",
				callback: function (_this) {
					return function (callback) {
						_this.updateShowNewItemsLink(!0);
						return _this.toggleLiveUpdates(!0, callback)
					}
				}(this)
			}, {
				title: "live",
				iconClass: "live",
				callback: function (_this) {
					return function (callback) {
						return _this.toggleLiveUpdates(!1, callback)
					}
				}(this)
			}]
		});
		this.feedFilterNav = new KDMultipleChoice({
			labels: ["Public", "Followed"],
			titles: ["Click to see the posts on public feed", "Click to see only the posts you follow"],
			cssClass: "feed-type-selection",
			defaultValue: "Public",
			callback: function (selection) {
				return this.emit("FilterChanged", selection)
			}
		});
		this.lowQualitySwitch = KD.checkFlag("super-admin") ? new KDOnOffSwitch({
			cssClass: "hidden",
			defaultValue: !1,
			inputLabel: "Show trolls: ",
			size: "tiny",
			callback: function (_this) {
				return function (state) {
					_this.appStorage.setValue("showLowQualityContent", state, function () {});
					KD.getSingleton("activityController").flags.showExempt = state;
					return KD.getSingleton("activityController").emit("Refresh")
				}
			}(this)
		}) : new KDCustomHTMLView;
		this.appStorage.fetchStorage(function (_this) {
			return function () {
				var flags, lowQualityContent, state, _base;
				state = _this.appStorage.getValue("liveUpdates") || !1;
				lowQualityContent = _this.appStorage.getValue("showLowQualityContent");
				flags = KD.getSingleton("activityController").flags;
				flags.liveUpdates = state;
				flags.showExempt = lowQualityContent || !1;
				_this.liveUpdateToggle.tooltip.setTitle("Live updates " + (state ? "on" : "off"));
				_this.liveUpdateToggle.setState(state ? "live" : "lazy");
				return "function" == typeof (_base = _this.lowQualitySwitch).setValue ? _base.setValue(lowQualityContent || !1) : void 0
			}
		}(this))
	}
	var __count;
	__extends(ActivityListHeader, _super);
	__count = 0;
	ActivityListHeader.prototype.toggleLiveUpdates = function (state, callback) {
		var activityController;
		this._togglePollForUpdates(state);
		this.appStorage.setValue("liveUpdates", state, function () {});
		this.updateShowNewItemsLink();
		activityController = KD.getSingleton("activityController");
		this.liveUpdateToggle.tooltip.setTitle("Live updates " + (state ? "on" : "off"));
		activityController.flags = {
			liveUpdates: state
		};
		activityController.emit("LiveStatusUpdateStateChanged", state);
		return callback()
	};
	ActivityListHeader.prototype._checkForUpdates = function (lastTs, lastCount, alreadyWarned) {
		var itFailed;
		itFailed = function () {
			if (!alreadyWarned) {
				console.warn("seems like live updates stopped coming");
				KD.logToExternal("realtime failure detected");
				return alreadyWarned = !0
			}
		};
		return function () {
			return KD.remote.api.CActivity.fetchLastActivityTimestamp(function () {
				return function (err, ts) {
					null != ts && lastTs !== ts && lastCount === __count && itFailed();
					lastTs = ts;
					return lastCount = __count
				}
			}(this))
		}
	}(null, null, !1);
	ActivityListHeader.prototype._togglePollForUpdates = function (i) {
		return function (state) {
			return state ? i = setInterval(this.bound("_checkForUpdates"), 6e4) : clearInterval(i)
		}
	}(null);
	ActivityListHeader.prototype.pistachio = function () {
		return KD.isLoggedIn() ? "{{> this.lowQualitySwitch}} {{> this.showNewItemsLink}} {{> this.liveUpdateToggle}} {{> this.feedFilterNav}}" : ""
	};
	ActivityListHeader.prototype.newActivityArrived = function () {
		__count++;
		this._newItemsCount++;
		return this.updateShowNewItemsLink()
	};
	ActivityListHeader.prototype.updateShowNewItemsLink = function (showNewItems) {
		null == showNewItems && (showNewItems = !1);
		if (this._newItemsCount > 0) {
			if ("live" === this.liveUpdateToggle.getState().title || showNewItems === !0) {
				this.emit("UnhideHiddenNewItems");
				this._newItemsCount = 0;
				return this.showNewItemsLink.hide()
			}
			this.showNewItemsLink.updatePartial("" + this._newItemsCount + " new item" + (this._newItemsCount > 1 ? "s" : ""));
			return this.showNewItemsLink.show()
		}
		return this.showNewItemsLink.hide()
	};
	ActivityListHeader.prototype.getNewItemsCount = function () {
		return this._newItemsCount
	};
	return ActivityListHeader
}(JView);
var ActivitySplitView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivitySplitView = function (_super) {
	function ActivitySplitView(options, data) {
		null == options && (options = {});
		options.sizes || (options.sizes = [139, null]);
		options.minimums || (options.minimums = [10, null]);
		null == options.resizable && (options.resizable = !1);
		ActivitySplitView.__super__.constructor.call(this, options, data)
	}
	__extends(ActivitySplitView, _super);
	ActivitySplitView.prototype.viewAppended = ContentPageSplitBelowHeader.prototype.viewAppended;
	ActivitySplitView.prototype.toggleFirstPanel = ContentPageSplitBelowHeader.prototype.toggleFirstPanel;
	ActivitySplitView.prototype.setRightColumnClass = ContentPageSplitBelowHeader.prototype.setRightColumnClass;
	ActivitySplitView.prototype._windowDidResize = function () {
		var header, parentHeight, updateWidgetHeight, welcomeHeaderHeight, widget, _ref;
		ActivitySplitView.__super__._windowDidResize.apply(this, arguments);
		_ref = this.getDelegate(), header = _ref.header, widget = _ref.widget;
		parentHeight = this.getDelegate().getHeight();
		welcomeHeaderHeight = header.$().is(":visible") ? header.getHeight() : 0;
		updateWidgetHeight = widget.$().is(":visible") ? widget.getHeight() : 0;
		null != widget && widget.$().css({
			top: welcomeHeaderHeight
		});
		return this.$().css({
			marginTop: updateWidgetHeight,
			height: parentHeight - welcomeHeaderHeight - updateWidgetHeight
		})
	};
	return ActivitySplitView
}(SplitView);
var ActivityItemChild, ActivityItemMenuItem, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityItemChild = function (_super) {
	function ActivityItemChild(options, data) {
		var commentSettings, currentGroup, deleteActivity, getContentGroupLinkPartial, list, origin, resetEditing, _ref;
		currentGroup = KD.getSingleton("groupsController").getCurrentGroup();
		getContentGroupLinkPartial = function (groupSlug, groupName) {
			return (null != currentGroup ? currentGroup.slug : void 0) === groupSlug ? "" : 'In <a href="' + groupSlug + '" target="' + groupSlug + '">' + groupName + "</a>"
		};
		this.contentGroupLink = new KDCustomHTMLView({
			tagName: "span",
			partial: getContentGroupLinkPartial(data.group, data.group)
		});
		(null != currentGroup ? currentGroup.slug : void 0) === data.group ? this.contentGroupLink.updatePartial(getContentGroupLinkPartial(currentGroup.slug, currentGroup.title)) : KD.remote.api.JGroup.one({
			slug: data.group
		}, function (_this) {
			return function (err, group) {
				return !err && group ? _this.contentGroupLink.updatePartial(getContentGroupLinkPartial(group.slug, group.title)) : void 0
			}
		}(this));
		origin = {
			constructorName: data.originType,
			id: data.originId
		};
		this.avatar = new AvatarView({
			size: {
				width: 70,
				height: 70
			},
			cssClass: "author-avatar",
			origin: origin,
			showStatus: !0
		});
		this.author = new ProfileLinkView({
			origin: origin
		});
		if ("JDiscussion" === (_ref = data.bongo_.constructorName) || "JTutorial" === _ref) {
			this.commentBox = new OpinionView({}, data);
			list = this.commentBox.opinionList
		} else {
			commentSettings = options.commentSettings || null;
			this.commentBox = new CommentView(commentSettings, data);
			list = this.commentBox.commentList
		}
		this.actionLinks = new ActivityActionsView({
			cssClass: "comment-header",
			delegate: list
		}, data);
		this.settingsButton = new ActivitySettingsView({
			itemView: this
		}, data);
		ActivityItemChild.__super__.constructor.call(this, options, data);
		data = this.getData();
		deleteActivity = function (_this) {
			return function (activityItem) {
				activityItem.destroy();
				return _this.emit("ActivityIsDeleted")
			}
		}(this);
		this.settingsButton.on("ActivityIsDeleted", function (_this) {
			return function () {
				var activityItem;
				activityItem = _this.getDelegate();
				return deleteActivity(activityItem)
			}
		}(this));
		resetEditing = function (_this) {
			return function () {
				_this.editWidget.destroy();
				return _this.editWidgetWrapper.setClass("hidden")
			}
		}(this);
		this.settingsButton.on("ActivityEditIsClicked", function (_this) {
			return function () {
				_this.editWidget = new ActivityEditWidget(null, data);
				_this.editWidget.on("Submit", resetEditing);
				_this.editWidget.on("Cancel", resetEditing);
				_this.editWidgetWrapper.addSubView(_this.editWidget, null, !0);
				return _this.editWidgetWrapper.unsetClass("hidden")
			}
		}(this));
		data.on("PostIsDeleted", function (_this) {
			return function () {
				var activityItem;
				activityItem = _this.getDelegate();
				return activityItem.isInDom() ? KD.whoami().getId() === data.getAt("originId") ? deleteActivity(activityItem) : activityItem.destroy() : void 0
			}
		}(this));
		data.watch("repliesCount", function (_this) {
			return function (count) {
				return count >= 0 ? _this.commentBox.decorateCommentedState() : void 0
			}
		}(this));
		KD.remote.cacheable(data.originType, data.originId, function (_this) {
			return function (err, account) {
				return account && KD.checkFlag("exempt", account) ? _this.setClass("exempt") : void 0
			}
		}(this))
	}
	__extends(ActivityItemChild, _super);
	ActivityItemChild.prototype.click = KD.utils.showMoreClickHandler;
	ActivityItemChild.prototype.viewAppended = function () {
		ActivityItemChild.__super__.viewAppended.apply(this, arguments);
		return this.getData().fake ? this.actionLinks.setClass("hidden") : void 0
	};
	return ActivityItemChild
}(KDView);
ActivityItemMenuItem = function (_super) {
	function ActivityItemMenuItem() {
		return ActivityItemMenuItem.__super__.constructor.apply(this, arguments)
	}
	__extends(ActivityItemMenuItem, _super);
	ActivityItemMenuItem.prototype.pistachio = function () {
		var slugifiedTitle, title;
		title = this.getData().title;
		slugifiedTitle = KD.utils.slugify(title);
		return '<i class="' + slugifiedTitle + ' icon"></i>' + title
	};
	return ActivityItemMenuItem
}(JView);
var DiscussionActivityActionsView, OpinionActivityActionsView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
DiscussionActivityActionsView = function (_super) {
	function DiscussionActivityActionsView() {
		var activity, view, _i, _len, _ref;
		DiscussionActivityActionsView.__super__.constructor.apply(this, arguments);
		activity = this.getData();
		this.opinionCountLink = new ActivityActionLink({
			partial: "Answer",
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return _this.emit("DiscussionActivityLinkClicked")
				}
			}(this)
		});
		this.commentLink = new ActivityActionLink({
			partial: "Comment",
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return _this.emit("DiscussionActivityCommentLinkClicked")
				}
			}(this)
		});
		0 === activity.opinionCount && this.opinionCountLink.hide();
		this.opinionCount = new ActivityOpinionCount({
			tooltip: {
				title: "Take me there!"
			},
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return _this.emit("DiscussionActivityLinkClicked")
				}
			}(this)
		}, activity);
		this.commentCount = new ActivityCommentCount({
			tooltip: {
				title: "Take me there!"
			},
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return _this.emit("DiscussionActivityCommentLinkClicked")
				}
			}(this)
		}, activity);
		_ref = [this.opinionCount, this.commentCount];
		for (_i = 0, _len = _ref.length; _len > _i; _i++) {
			view = _ref[_i];
			view.on("countChanged", function (count) {
				return count > 0 ? this.show() : this.hide()
			})
		}
		this.on("DiscussionActivityLinkClicked", function (_this) {
			return function () {
				var entryPoint;
				if (_this.parent instanceof ContentDisplayDiscussion) return _this.getDelegate().emit("OpinionLinkReceivedClick");
				entryPoint = KD.config.entryPoint;
				return KD.getSingleton("router").handleRoute("/Activity/" + _this.getData().slug, {
					state: _this.getData(),
					entryPoint: entryPoint
				})
			}
		}(this));
		this.on("DiscussionActivityCommentLinkClicked", function (_this) {
			return function () {
				var entryPoint;
				if (_this.parent instanceof ContentDisplayDiscussion) return _this.getDelegate().emit("CommentLinkReceivedClick");
				entryPoint = KD.config.entryPoint;
				return KD.getSingleton("router").handleRoute("/Activity/" + _this.getData().slug, {
					state: _this.getData(),
					entryPoint: entryPoint
				})
			}
		}(this))
	}
	__extends(DiscussionActivityActionsView, _super);
	DiscussionActivityActionsView.prototype.viewAppended = function () {
		this.setClass("activity-actions");
		this.setTemplate(this.pistachio());
		this.template.update();
		this.attachListeners();
		return this.loader.hide()
	};
	DiscussionActivityActionsView.prototype.attachListeners = function () {
		var activity, opinionList;
		activity = this.getData();
		opinionList = this.getDelegate();
		opinionList.on("BackgroundActivityStarted", function (_this) {
			return function () {
				return _this.loader.show()
			}
		}(this));
		return opinionList.on("BackgroundActivityFinished", function (_this) {
			return function () {
				return _this.loader.hide()
			}
		}(this))
	};
	DiscussionActivityActionsView.prototype.pistachio = function () {
		var _ref, _ref1;
		return "{{> this.loader}}\n{{> this.opinionCountLink}} {{> this.opinionCount}} " + ((null != (_ref = this.getData()) ? _ref.opinionCount : void 0) > 0 ? " ·" : "") + "\n{{> this.commentLink}} {{> this.commentCount}} " + ((null != (_ref1 = this.getData()) ? _ref1.repliesCount : void 0) > 0 ? " ·" : " ·") + "\n<span class='optional'>\n{{> this.shareLink}} ·\n</span>\n{{> this.likeView}}"
	};
	return DiscussionActivityActionsView
}(ActivityActionsView);
OpinionActivityActionsView = function (_super) {
	function OpinionActivityActionsView() {
		var activity, _ref;
		OpinionActivityActionsView.__super__.constructor.apply(this, arguments);
		activity = this.getData();
		this.commentLink = new ActivityActionLink({
			partial: "Comment"
		});
		null != (_ref = this.commentCount) && _ref.destroy();
		this.commentCount = new ActivityCommentCount({
			tooltip: {
				title: "Take me there!"
			},
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return _this.emit("DiscussionActivityLinkClicked")
				}
			}(this)
		}, activity);
		this.on("DiscussionActivityLinkClicked", function (_this) {
			return function () {
				var entryPoint;
				if (_this.parent instanceof ContentDisplayDiscussion) return _this.getDelegate().emit("OpinionLinkReceivedClick");
				entryPoint = KD.config.entryPoint;
				return KD.getSingleton("router").handleRoute("/Activity/" + _this.getData().slug, {
					state: _this.getData(),
					entryPoint: entryPoint
				})
			}
		}(this))
	}
	__extends(OpinionActivityActionsView, _super);
	OpinionActivityActionsView.prototype.viewAppended = function () {
		this.setClass("activity-actions");
		this.setTemplate(this.pistachio());
		this.template.update();
		this.attachListeners();
		return this.loader.hide()
	};
	OpinionActivityActionsView.prototype.attachListeners = function () {
		var activity;
		return activity = this.getData()
	};
	OpinionActivityActionsView.prototype.pistachio = function () {
		return "{{> this.loader}}\n{{> this.commentLink}}{{> this.commentCount}}\n<span class='optional'>\n{{> this.shareLink}} ·\n</span>\n{{> this.likeView}}"
	};
	return OpinionActivityActionsView
}(ActivityActionsView);
var TutorialActivityActionsView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
TutorialActivityActionsView = function (_super) {
	function TutorialActivityActionsView() {
		var activity;
		TutorialActivityActionsView.__super__.constructor.apply(this, arguments);
		activity = this.getData();
		this.opinionCountLink = new ActivityActionLink({
			partial: "Opinions",
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return _this.emit("TutorialActivityLinkClicked")
				}
			}(this)
		});
		0 === activity.opinionCount && this.opinionCountLink.hide();
		this.opinionCount = new ActivityOpinionCount({
			click: function (event) {
				return event.preventDefault()
			}
		}, activity);
		this.opinionCount.on("countChanged", function (_this) {
			return function (count) {
				return count > 0 ? _this.opinionCountLink.show() : _this.opinionCountLink.hide()
			}
		}(this));
		this.on("TutorialActivityLinkClicked", function (_this) {
			return function () {
				var entryPoint;
				if (_this.parent instanceof ContentDisplayTutorial) return _this.getDelegate().emit("OpinionLinkReceivedClick");
				entryPoint = KD.config.entryPoint;
				return KD.getSingleton("router").handleRoute("/Activity/" + _this.getData().slug, {
					state: _this.getData(),
					entryPoint: entryPoint
				})
			}
		}(this))
	}
	__extends(TutorialActivityActionsView, _super);
	TutorialActivityActionsView.prototype.viewAppended = function () {
		this.setClass("activity-actions");
		this.setTemplate(this.pistachio());
		this.template.update();
		this.attachListeners();
		return this.loader.hide()
	};
	TutorialActivityActionsView.prototype.attachListeners = function () {
		var activity, opinionList;
		activity = this.getData();
		opinionList = this.getDelegate();
		opinionList.on("BackgroundActivityStarted", function (_this) {
			return function () {
				return _this.loader.show()
			}
		}(this));
		return opinionList.on("BackgroundActivityFinished", function (_this) {
			return function () {
				return _this.loader.hide()
			}
		}(this))
	};
	TutorialActivityActionsView.prototype.pistachio = function () {
		var _ref;
		return "{{> this.loader}}\n{{> this.opinionCountLink}} {{> this.opinionCount}} " + ((null != (_ref = this.getData()) ? _ref.opinionCount : void 0) > 0 ? " ·" : "") + "\n<span class='optional'>\n{{> this.shareLink}} ·\n</span>\n{{> this.likeView}}"
	};
	return TutorialActivityActionsView
}(ActivityActionsView);
var NewMemberBucketData, NewMemberBucketItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
NewMemberBucketData = function (_super) {
	function NewMemberBucketData(data) {
		var key, val;
		for (key in data)
			if (__hasProp.call(data, key)) {
				val = data[key];
				this[key] = val
			}
		this.bongo_ = {};
		this.bongo_.constructorName = "NewMemberBucketData";
		NewMemberBucketData.__super__.constructor.apply(this, arguments)
	}
	__extends(NewMemberBucketData, _super);
	return NewMemberBucketData
}(KDObject);
NewMemberBucketItemView = function (_super) {
	function NewMemberBucketItemView(options, data) {
		options = $.extend(options, {
			cssClass: "new-member"
		});
		NewMemberBucketItemView.__super__.constructor.call(this, options, data);
		this.anchor = new ProfileLinkView({
			origin: data.anchor
		})
	}
	__extends(NewMemberBucketItemView, _super);
	NewMemberBucketItemView.prototype.render = function () {};
	NewMemberBucketItemView.prototype.addCommentBox = function () {};
	NewMemberBucketItemView.prototype.pistachio = function () {
		return "<span class='icon'></span>\n{{> this.anchor}}\n<span class='action'>became a member.</span>"
	};
	return NewMemberBucketItemView
}(JView);
var ActiveTopicItemView, ActivityTickerAppUserItem, ActivityTickerBaseItem, ActivityTickerCommentItem, ActivityTickerFollowItem, ActivityTickerItem, ActivityTickerLikeItem, ActivityTickerMemberItem, ActivityTickerStatusUpdateItem, ActivityTickerUserCommentItem, GroupListItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityTickerBaseItem = function (_super) {
	function ActivityTickerBaseItem(options, data) {
		null == options && (options = {});
		options.cssClass = KD.utils.curry("action", options.cssClass);
		ActivityTickerBaseItem.__super__.constructor.call(this, options, data)
	}
	__extends(ActivityTickerBaseItem, _super);
	ActivityTickerBaseItem.prototype.pistachio = function () {
		return ""
	};
	ActivityTickerBaseItem.prototype.itemLinkViewClassMap = {
		JAccount: ProfileLinkView,
		JNewApp: AppLinkView,
		JTag: TagLinkView,
		JGroup: GroupLinkView,
		JNewStatusUpdate: ActivityLinkView,
		JComment: ActivityLinkView
	};
	return ActivityTickerBaseItem
}(JView);
ActivityTickerFollowItem = function (_super) {
	function ActivityTickerFollowItem(options, data) {
		var source, target;
		null == options && (options = {});
		ActivityTickerFollowItem.__super__.constructor.call(this, options, data);
		source = data.source, target = data.target;
		this.avatar = new AvatarView({
			size: {
				width: 30,
				height: 30
			},
			cssClass: "avatarview"
		}, target);
		this.actor = new ProfileLinkView(null, target);
		this.object = new this.itemLinkViewClassMap[source.bongo_.constructorName](null, source)
	}
	__extends(ActivityTickerFollowItem, _super);
	ActivityTickerFollowItem.prototype.pistachio = function () {
		var target;
		target = this.getData().target;
		return target.getId() === KD.whoami().getId() ? "{{> this.avatar}} <div class='text-overflow'>You followed {{> this.object}}</div>" : "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} followed {{> this.object}}</div>"
	};
	return ActivityTickerFollowItem
}(ActivityTickerBaseItem);
ActivityTickerLikeItem = function (_super) {
	function ActivityTickerLikeItem(options, data) {
		var source, subject, target;
		null == options && (options = {});
		ActivityTickerLikeItem.__super__.constructor.call(this, options, data);
		source = data.source, target = data.target, subject = data.subject;
		this.avatar = new AvatarView({
			size: {
				width: 30,
				height: 30
			},
			cssClass: "avatarview"
		}, source);
		this.actor = new ProfileLinkView(null, source);
		this.origin = new ProfileLinkView(null, target);
		this.subj = new this.itemLinkViewClassMap[subject.bongo_.constructorName](null, subject)
	}
	__extends(ActivityTickerLikeItem, _super);
	ActivityTickerLikeItem.prototype.pistachio = function () {
		var activity, source, subject, target, _ref;
		_ref = this.getData(), source = _ref.source, target = _ref.target, subject = _ref.subject;
		activity = "liked";
		return source.getId() === KD.whoami().getId() ? source.getId() === target.getId() ? "{{> this.avatar}} <div class='text-overflow'>You " + activity + " your {{> this.subj}}</div>" : "{{> this.avatar}} <div class='text-overflow'>You " + activity + " {{> this.origin}}'s {{> this.subj}}</div>" : target.getId() === KD.whoami().getId() ? "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} " + activity + " your {{> this.subj}}</div>" : source.getId() === target.getId() ? "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} " + activity + " their {{> this.subj}}</div>" : "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} " + activity + " {{> this.origin}}'s {{> this.subj}}</div>"
	};
	return ActivityTickerLikeItem
}(ActivityTickerBaseItem);
ActivityTickerMemberItem = function (_super) {
	function ActivityTickerMemberItem(options, data) {
		var target;
		null == options && (options = {});
		ActivityTickerMemberItem.__super__.constructor.call(this, options, data);
		target = data.target;
		this.avatar = new AvatarView({
			size: {
				width: 30,
				height: 30
			},
			cssClass: "avatarview"
		}, target);
		this.actor = new ProfileLinkView(null, target)
	}
	__extends(ActivityTickerMemberItem, _super);
	ActivityTickerMemberItem.prototype.pistachio = function () {
		var target;
		target = this.getData().target;
		return target.getId() === KD.whoami().getId() ? "{{> this.avatar}} <div class='text-overflow'>You became a member</div>" : "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} became a member</div>"
	};
	return ActivityTickerMemberItem
}(ActivityTickerBaseItem);
ActivityTickerAppUserItem = function (_super) {
	function ActivityTickerAppUserItem(options, data) {
		var source, target;
		null == options && (options = {});
		ActivityTickerAppUserItem.__super__.constructor.call(this, options, data);
		source = data.source, target = data.target;
		this.avatar = new AvatarView({
			size: {
				width: 30,
				height: 30
			},
			cssClass: "avatarview"
		}, target);
		this.actor = new ProfileLinkView(null, target);
		this.object = new AppLinkView(null, source)
	}
	__extends(ActivityTickerAppUserItem, _super);
	ActivityTickerAppUserItem.prototype.pistachio = function () {
		var target;
		target = this.getData().target;
		return target.getId() === KD.whoami().getId() ? "{{> this.avatar}} <div class='text-overflow'>You installed {{> this.object}}</div>" : "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} installed {{> this.object}}</div>"
	};
	return ActivityTickerAppUserItem
}(ActivityTickerBaseItem);
ActivityTickerCommentItem = function (_super) {
	function ActivityTickerCommentItem(options, data) {
		var object, source, subject, target;
		null == options && (options = {});
		ActivityTickerCommentItem.__super__.constructor.call(this, options, data);
		source = data.source, target = data.target, object = data.object, subject = data.subject;
		this.avatar = new AvatarView({
			size: {
				width: 30,
				height: 30
			},
			cssClass: "avatarview"
		}, source);
		this.actor = new ProfileLinkView(null, source);
		this.origin = new ProfileLinkView(null, target);
		this.subj = new ActivityLinkView(null, object)
	}
	__extends(ActivityTickerCommentItem, _super);
	ActivityTickerCommentItem.prototype.pistachio = function () {
		var activity, source, subject, target, _ref;
		_ref = this.getData(), source = _ref.source, target = _ref.target, subject = _ref.subject;
		activity = "commented on";
		return target.getId() === KD.whoami().getId() ? "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} " + activity + " your {{> this.subj}}</div>" : source.getId() === target.getId() ? "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} " + activity + " their {{> this.subj}}</div>" : "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} " + activity + " {{> this.origin}}'s {{> this.subj}}</div>"
	};
	return ActivityTickerCommentItem
}(ActivityTickerBaseItem);
ActivityTickerStatusUpdateItem = function (_super) {
	function ActivityTickerStatusUpdateItem(options, data) {
		var source, target;
		null == options && (options = {});
		ActivityTickerStatusUpdateItem.__super__.constructor.call(this, options, data);
		source = data.source, target = data.target;
		this.avatar = new AvatarView({
			size: {
				width: 30,
				height: 30
			},
			cssClass: "avatarview"
		}, target);
		this.actor = new ProfileLinkView(null, target);
		this.subj = new ActivityLinkView(null, source)
	}
	__extends(ActivityTickerStatusUpdateItem, _super);
	ActivityTickerStatusUpdateItem.prototype.pistachio = function () {
		var source, target, _ref;
		_ref = this.getData(), source = _ref.source, target = _ref.target;
		return target.getId() === KD.whoami().getId() ? "{{> this.avatar}} <div class='text-overflow'>You posted {{> this.subj}}</div>" : "{{> this.avatar}} <div class='text-overflow'>{{> this.actor}} posted {{> this.subj}}</div>"
	};
	return ActivityTickerStatusUpdateItem
}(ActivityTickerBaseItem);
ActivityTickerUserCommentItem = function (_super) {
	function ActivityTickerUserCommentItem(options, data) {
		null == options && (options = {});
		ActivityTickerUserCommentItem.__super__.constructor.call(this, options, data);
		this.source = data.source, this.target = data.target;
		this.avatar = new AvatarView({
			size: {
				width: 30,
				height: 30
			},
			cssClass: "avatarview"
		}, this.target);
		this.origin = new ProfileLinkView(null, this.target);
		this.subj = new ActivityLinkView(null, this.source)
	}
	__extends(ActivityTickerUserCommentItem, _super);
	ActivityTickerUserCommentItem.prototype.pistachio = function () {
		return this.target.getId() === KD.whoami().getId() ? "{{> this.avatar}} <div class='text-overflow'>You commented on {{> this.subj}} </div>" : "{{> this.avatar}} <div class='text-overflow'> {{> this.origin}} commented on {{> this.subj}} </div>"
	};
	return ActivityTickerUserCommentItem
}(ActivityTickerBaseItem);
ActivityTickerItem = function (_super) {
	function ActivityTickerItem(options, data) {
		null == options && (options = {});
		options.type = "activity-ticker-item";
		ActivityTickerItem.__super__.constructor.call(this, options, data)
	}
	var itemClassMap;
	__extends(ActivityTickerItem, _super);
	itemClassMap = {
		JGroup_member_JAccount: ActivityTickerMemberItem,
		JAccount_like_JAccount: ActivityTickerLikeItem,
		JTag_follower_JAccount: ActivityTickerFollowItem,
		JAccount_follower_JAccount: ActivityTickerFollowItem,
		JNewApp_user_JAccount: ActivityTickerAppUserItem,
		JAccount_reply_JAccount: ActivityTickerCommentItem,
		JNewStatusUpdate_author_JAccount: ActivityTickerStatusUpdateItem,
		JNewStatusUpdate_commenter_JAccount: ActivityTickerUserCommentItem
	};
	ActivityTickerItem.prototype.viewAppended = function () {
		var data, itemClass;
		data = this.getData();
		itemClass = this.getClassName(data);
		return itemClass ? this.addSubView(new itemClass(null, data)) : this.hide()
	};
	ActivityTickerItem.prototype.getClassName = function (data) {
		var as, classKey, source, target, _ref, _ref1;
		as = data.as, source = data.source, target = data.target;
		classKey = "" + (null != source && null != (_ref = source.bongo_) ? _ref.constructorName : void 0) + "_" + as + "_" + (null != target && null != (_ref1 = target.bongo_) ? _ref1.constructorName : void 0);
		return itemClassMap[classKey]
	};
	return ActivityTickerItem
}(KDListItemView);
ActiveTopicItemView = function (_super) {
	function ActiveTopicItemView(options, data) {
		null == options && (options = {});
		options.type = "activity-ticker-item";
		ActiveTopicItemView.__super__.constructor.call(this, options, data);
		this.tag = new TagLinkView({}, data);
		this.followButton = new FollowButton({
			title: "follow",
			icon: !0,
			stateOptions: {
				unfollow: {
					title: "unfollow",
					cssClass: "following-topic"
				}
			},
			dataType: "JTag"
		}, data)
	}
	__extends(ActiveTopicItemView, _super);
	ActiveTopicItemView.prototype.viewAppended = function () {
		var tagInfo;
		this.addSubView(this.tag);
		this.addSubView(this.followButton);
		this.addSubView(tagInfo = new KDCustomHTMLView({
			cssClass: "tag-info clearfix"
		}));
		return this.getData().fetchLastInteractors({}, function (_this) {
			return function () {
				var followerCount, randomFollowers, tagInfoPartial, user, _i, _len;
				randomFollowers = arguments[1];
				for (_i = 0, _len = randomFollowers.length; _len > _i; _i++) {
					user = randomFollowers[_i];
					tagInfo.addSubView(new AvatarView({
						size: {
							width: 19,
							height: 19
						}
					}, user))
				}
				followerCount = _this.getData().counts.followers;
				tagInfoPartial = "new topic";
				followerCount > 0 && (tagInfoPartial = "+" + followerCount + " " + (1 === followerCount ? "is" : "are") + " following");
				return tagInfo.addSubView(new KDCustomHTMLView({
					tagName: "span",
					cssClass: "total-following",
					partial: tagInfoPartial
				}))
			}
		}(this))
	};
	return ActiveTopicItemView
}(KDListItemView);
GroupListItemView = function (_super) {
	function GroupListItemView(options, data) {
		null == options && (options = {});
		options.type = "activity-ticker-item";
		GroupListItemView.__super__.constructor.call(this, options, data);
		this.groupLink = new GroupLinkView(null, data)
	}
	__extends(GroupListItemView, _super);
	JView.mixin(GroupListItemView.prototype);
	GroupListItemView.prototype.pistachio = function () {
		return "{{> this.groupLink}}"
	};
	return GroupListItemView
}(KDListItemView);
var ReferalBox, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ReferalBox = function (_super) {
	function ReferalBox(options, data) {
		null == options && (options = {});
		options.cssClass = "referal-box";
		ReferalBox.__super__.constructor.call(this, options, data);
		this.modalLink = new KDCustomHTMLView({
			tagName: "a",
			attributes: {
				href: "#"
			},
			click: this.bound("showReferrerModal"),
			partial: "show more..."
		});
		this.redeemPointsModal = new KDCustomHTMLView({
			tagName: "a",
			attributes: {
				href: "#"
			},
			click: function (_this) {
				return function (e) {
					_this.showRedeemReferralPointModal();
					return e.stopPropagation()
				}
			}(this)
		});
		KD.getSingleton("vmController").on("ReferralCountUpdated", function (_this) {
			return function () {
				_this.updateReferralCountPartial();
				return _this.updateSizeBar()
			}
		}(this));
		this.updateReferralCountPartial();
		this.progressBar = new KDProgressBarView({
			title: "0 GB / 20 GB",
			determinate: !0
		})
	}
	__extends(ReferalBox, _super);
	ReferalBox.prototype.click = function () {
		return this.showReferrerModal()
	};
	ReferalBox.prototype.showRedeemReferralPointModal = function () {
		var appManager;
		KD.mixpanel("Referer Redeem Point modal, click");
		appManager = KD.getSingleton("appManager");
		return appManager.tell("Account", "showRedeemReferralPointModal")
	};
	ReferalBox.prototype.updateReferralCountPartial = function () {
		return KD.remote.api.JReferral.fetchRedeemableReferrals({
			type: "disk"
		}, function (_this) {
			return function (err, referals) {
				var text;
				if (referals && referals.length > 0) {
					text = "Congrats, your bonus is waiting for you!\nYou have " + referals.length + " referrals!";
					return _this.redeemPointsModal.updatePartial(text)
				}
			}
		}(this))
	};
	ReferalBox.prototype.updateSizeBar = function () {
		var vmc;
		this.progressBar.updateBar(0);
		vmc = KD.getSingleton("vmController");
		return vmc.fetchDefaultVmName(function (_this) {
			return function (name) {
				return vmc.fetchVmInfo(name, function (err, vmInfo) {
					var max, usagePercent, used;
					if (!err && (null != vmInfo ? vmInfo.diskSizeInMB : void 0)) {
						max = (null != vmInfo ? vmInfo.diskSizeInMB : void 0) || 4096;
						max = 1024 * max * 1024;
						usagePercent = max / 16e9 * 90;
						used = KD.utils.formatBytesToHumanReadable(max);
						return _this.progressBar.updateBar(usagePercent + 10, null, "" + used + " / 20 GB")
					}
				})
			}
		}(this))
	};
	ReferalBox.prototype.showReferrerModal = function (event) {
		var appManager;
		KD.utils.stopDOMEvent(event);
		KD.mixpanel("Referer modal, click");
		appManager = KD.getSingleton("appManager");
		return appManager.tell("Account", "showReferrerModal")
	};
	ReferalBox.prototype.pistachio = function () {
		return '<p>\n  <a href="http://blog.koding.com/2014/01/100tb-is-gone-in-1-day-crazy100tbweek-is-over/">\n    100TB is gone in 1 Day\n  </a>\n  <a href="https://twitter.com/search?q=%23Crazy100TBWeek">#Crazy100TBWeek</a>\n  is Over :( we will enable invitations again soon! Follow us on\n  <a href="http://twitter.com/koding">Twitter</a>, we might do some\n  more fun stuff soon :)\n  {{> this.redeemPointsModal}}\n</p>\n{{> this.progressBar}}'
	};
	return ReferalBox
}(JView);
var ActivityListContainer, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityListContainer = function (_super) {
	function ActivityListContainer(options, data) {
		null == options && (options = {});
		options.cssClass = "activity-content feeder-tabs";
		ActivityListContainer.__super__.constructor.call(this, options, data);
		this.pinnedListController = new PinnedActivityListController({
			delegate: this,
			itemClass: ActivityListItemView,
			viewOptions: {
				cssClass: "hidden"
			}
		});
		this.pinnedListWrapper = this.pinnedListController.getView();
		this.pinnedListController.on("Loaded", function (_this) {
			return function () {
				_this.togglePinnedList.show();
				return _this.pinnedListController.getListView().show()
			}
		}(this));
		this.togglePinnedList = new KDCustomHTMLView({
			cssClass: "toggle-pinned-list hidden"
		});
		this.togglePinnedList.addSubView(new KDCustomHTMLView({
			tagName: "span",
			cssClass: "title",
			partial: "Most Liked"
		}));
		this.controller = new ActivityListController({
			delegate: this,
			itemClass: ActivityListItemView,
			showHeader: !0
		});
		this.listWrapper = this.controller.getView();
		this.filterWarning = new FilterWarning;
		this.controller.ready(function (_this) {
			return function () {
				return _this.emit("ready")
			}
		}(this))
	}
	__extends(ActivityListContainer, _super);
	ActivityListContainer.prototype.setSize = function () {};
	ActivityListContainer.prototype.viewAppended = function () {
		ActivityListContainer.__super__.viewAppended.apply(this, arguments);
		return this.pinnedListController.getItemCount() ? this.togglePinnedList.show() : void 0
	};
	ActivityListContainer.prototype.pistachio = function () {
		return "{{> this.filterWarning}}\n{{> this.togglePinnedList}}\n{{> this.pinnedListWrapper}}\n{{> this.listWrapper}}"
	};
	return ActivityListContainer
}(JView);
var FilterWarning, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
FilterWarning = function (_super) {
	function FilterWarning() {
		FilterWarning.__super__.constructor.call(this, {
			cssClass: "filter-warning hidden"
		});
		this.warning = new KDCustomHTMLView;
		this.goBack = new KDButtonView({
			cssClass: "goback-button",
			callback: function () {
				return function () {
					return KD.singletons.router.handleRoute("/Activity")
				}
			}(this)
		})
	}
	__extends(FilterWarning, _super);
	FilterWarning.prototype.pistachio = function () {
		return "{{> this.warning}}\n{{> this.goBack}}"
	};
	FilterWarning.prototype.showWarning = function (_arg) {
		var partialText, text, type;
		text = _arg.text, type = _arg.type;
		partialText = function () {
			switch (type) {
			case "search":
				return 'Results for <strong>"' + text + '"</strong>';
			default:
				return "You are now looking at activities tagged with <strong>#" + text + "</strong>"
			}
		}();
		this.warning.updatePartial("" + partialText);
		return this.show()
	};
	return FilterWarning
}(JView);
var EmbedBox, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBox = function (_super) {
	function EmbedBox(options, data) {
		null == options && (options = {});
		options.cssClass = KD.utils.curry("link-embed-box", options.cssClass);
		EmbedBox.__super__.constructor.call(this, options, data)
	}
	__extends(EmbedBox, _super);
	EmbedBox.prototype.viewAppended = function () {
		var containerClass, data, embedOptions, embedType, _ref;
		if (data = this.getData()) {
			embedType = this.utils.getEmbedType(null != data && null != (_ref = data.link_embed) ? _ref.type : void 0) || "link";
			containerClass = function () {
				switch (embedType) {
				case "image":
					return EmbedBoxImageView;
				case "object":
					return EmbedBoxObjectView;
				default:
					return EmbedBoxLinkDisplayView
				}
			}();
			embedOptions = {
				cssClass: "link-embed clearfix",
				delegate: this
			};
			return this.addSubView(new containerClass(embedOptions, data))
		}
	};
	return EmbedBox
}(KDView);
var EmbedBoxWidget, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxWidget = function (_super) {
	function EmbedBoxWidget(options, data) {
		var _ref1, _ref2, _ref3, _ref4;
		null == options && (options = {});
		null == data && (data = {});
		options.cssClass = KD.utils.curry("link-embed-box", options.cssClass);
		EmbedBoxWidget.__super__.constructor.call(this, options, data);
		this.oembed = data.link_embed || {};
		this.url = null != (_ref1 = data.link_url) ? _ref1 : "";
		this.urls = [];
		this.locks = {};
		this.embedCache = {};
		this.imageIndex = 0;
		this.hasValidContent = !1;
		this.watchInput();
		this.settingsButton = new KDButtonView({
			cssClass: "hide-embed",
			icon: !0,
			iconOnly: !0,
			iconClass: "hide",
			title: "hide",
			callback: this.bound("resetEmbedAndHide")
		});
		this.embedType = (null != (_ref2 = data.link_embed) && null != (_ref3 = _ref2.object) ? _ref3.type : void 0) || (null != (_ref4 = data.link_embed) ? _ref4.type : void 0) || "link";
		this.embedLinks = new EmbedBoxLinksView({
			delegate: this
		});
		this.embedLinks.on("LinkAdded", function (_this) {
			return function (_arg) {
				var url;
				url = _arg.url;
				_this.show();
				return null == _this.getEmbedIndex() ? _this.setEmbedIndex(0) : void 0
			}
		}(this));
		this.embedLinks.on("LinkRemoved", function (_this) {
			return function (_arg) {
				var index, url;
				url = _arg.url, index = _arg.index;
				0 === _this.embedLinks.getLinkCount() && _this.hide();
				return index === _this.getEmbedIndex() ? console.log("we need to set a new embed index") : void 0
			}
		}(this));
		this.embedLinks.on("LinkSelected", function (_this) {
			return function (_arg) {
				var url;
				url = _arg.url;
				return _this.addEmbed(url)
			}
		}(this));
		this.embedLinks.on("LinksCleared", function (_this) {
			return function () {
				return _this.urls = []
			}
		}(this));
		this.embedLinks.hide();
		this.embedContainer = new KDView(options, data);
		this.hide()
	}
	var addClass, getDescendantsByClassName, _ref;
	__extends(EmbedBoxWidget, _super);
	_ref = KD.dom, addClass = _ref.addClass, getDescendantsByClassName = _ref.getDescendantsByClassName;
	JView.mixin(EmbedBoxWidget.prototype);
	EmbedBoxWidget.prototype.watchInput = function () {
		var input;
		input = this.getDelegate();
		input.on("keydown", function (_this) {
			return function (event) {
				var _ref1;
				return 9 === (_ref1 = event.which) || 13 === _ref1 || 32 === _ref1 ? _this.checkInputForUrls() : void 0
			}
		}(this));
		input.on("paste", this.bound("checkInputForUrls"));
		return input.on("change", this.bound("checkInputForUrls"))
	};
	EmbedBoxWidget.prototype.checkInputForUrls = function () {
		return this.utils.defer(function (_this) {
			return function () {
				var input, newUrl, newUrls, staleUrl, staleUrls, text, urls, _i, _j, _len, _len1;
				input = _this.getDelegate();
				text = input.getValue();
				urls = _.uniq(text.match(_this.utils.botchedUrlRegExp) || []);
				staleUrls = _.difference(_this.urls, urls);
				newUrls = _.difference(urls, _this.urls);
				for (_i = 0, _len = newUrls.length; _len > _i; _i++) {
					newUrl = newUrls[_i];
					_this.embedLinks.addLink(newUrl)
				}
				for (_j = 0, _len1 = staleUrls.length; _len1 > _j; _j++) {
					staleUrl = staleUrls[_j];
					_this.embedLinks.removeLink(staleUrl)
				}
				return _this.urls = urls
			}
		}(this))
	};
	EmbedBoxWidget.prototype.isLocked = function (url) {
		return url in this.locks
	};
	EmbedBoxWidget.prototype.addLock = function (url) {
		this.locks[url] = !0;
		return this
	};
	EmbedBoxWidget.prototype.removeLock = function (url) {
		delete this.locks[url];
		return this
	};
	EmbedBoxWidget.prototype.addEmbed = function (url) {
		this.loadEmbed(url);
		return this
	};
	EmbedBoxWidget.prototype.removeEmbed = function () {
		return console.log("need to remove this url")
	};
	EmbedBoxWidget.prototype.loadEmbed = function (url) {
		var cached;
		if (this.isLocked(url)) return this;
		this.addLock(url);
		cached = this.embedCache[url];
		null != cached ? this.utils.defer(function (_this) {
			return function () {
				_this.removeLock(url);
				return _this.handleEmbedlyResponse(url, cached.data, cached.options)
			}
		}(this)) : this.fetchEmbed(url, {}, function (_this) {
			return function (data, options) {
				_this.removeLock(url);
				_this.handleEmbedlyResponse(url, data, options);
				return _this.addToCache(url, data, options)
			}
		}(this));
		return this
	};
	EmbedBoxWidget.prototype.handleEmbedlyResponse = function (url, data, options) {
		if ("error" !== data.type) {
			this.populateEmbed(data, options);
			return this.show()
		}
		this.hide()
	};
	EmbedBoxWidget.prototype.addToCache = function (url, data, options) {
		return this.embedCache[url] = {
			data: data,
			options: options
		}
	};
	EmbedBoxWidget.prototype.setImageIndex = function (imageIndex) {
		this.imageIndex = imageIndex
	};
	EmbedBoxWidget.prototype.setEmbedIndex = function (embedIndex) {
		this.embedIndex = embedIndex;
		return this.embedLinks.setActiveLinkIndex(this.embedIndex)
	};
	EmbedBoxWidget.prototype.getEmbedIndex = function () {
		return this.embedIndex
	};
	EmbedBoxWidget.prototype.refreshEmbed = function () {
		return this.populateEmbed(this.oembed, this.url, {})
	};
	EmbedBoxWidget.prototype.resetEmbedAndHide = function () {
		this.resetEmbed();
		this.embedLinks.clearLinks();
		this.hasValidContent = !1;
		this.hide();
		return this.emit("EmbedIsHidden")
	};
	EmbedBoxWidget.prototype.resetEmbed = function () {
		var _ref1;
		this.oembed = {};
		this.url = "";
		null != (_ref1 = this.embedContainer) && _ref1.destroy();
		this.embedIndex = null;
		return this.imageIndex = 0
	};
	EmbedBoxWidget.prototype.getDataForSubmit = function () {
		var data, desiredFields, embedContent, key, value, wantedData, _i, _len, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
		if (_.isEmpty(this.oembed)) return {};
		data = this.oembed;
		embedContent = this.embedContainer.embedContent;
		wantedData = {};
		if (null != embedContent) {
			wantedData.title = (null != (_ref1 = embedContent.embedTitle) && null != (_ref2 = _ref1.titleInput) && "function" == typeof _ref2.getValue ? _ref2.getValue() : void 0) || "";
			wantedData.description = (null != (_ref3 = embedContent.embedDescription) && null != (_ref4 = _ref3.descriptionInput) && "function" == typeof _ref4.getValue ? _ref4.getValue() : void 0) || "";
			null == data.original_title && (wantedData.original_title = (null != (_ref5 = embedContent.embedTitle) ? _ref5.getOriginalValue() : void 0) || "");
			null == data.original_description && (wantedData.original_description = (null != (_ref6 = embedContent.embedDescription) ? _ref6.getOriginalValue() : void 0) || "")
		}
		data.images = data.images.filter(function (_this) {
			return function (image, i) {
				if (i !== _this.imageIndex) return !1;
				delete data.images[_this.imageIndex].colors;
				return !0
			}
		}(this));
		this.imageIndex = 0;
		desiredFields = ["url", "safe", "type", "provider_name", "error_type", "content", "error_message", "safe_type", "safe_message", "images"];
		for (_i = 0, _len = desiredFields.length; _len > _i; _i++) {
			key = desiredFields[_i];
			wantedData[key] = data[key]
		}
		for (key in wantedData) {
			value = wantedData[key];
			"string" == typeof value && (wantedData[key] = Encoder.htmlDecode(value))
		}
		return wantedData
	};
	EmbedBoxWidget.prototype.displayEmbedType = function (embedType, data) {
		var containerClass, embedOptions, _ref1;
		this.hasValidContent = !0;
		containerClass = function () {
			switch (embedType) {
			case "image":
				return EmbedBoxImageView;
			case "object":
				return EmbedBoxObjectView;
			default:
				return EmbedBoxLinkView
			}
		}();
		embedOptions = {
			cssClass: "link-embed clearfix",
			delegate: this
		};
		null != (_ref1 = this.embedContainer) && _ref1.destroy();
		this.embedContainer = new containerClass(embedOptions, data);
		this.addSubView(this.embedContainer);
		this.emit("EmbedIsShown");
		return this.show()
	};
	EmbedBoxWidget.prototype.populateEmbed = function (data, options) {
		var embedDiv, type;
		null == data && (data = {});
		null == options && (options = {});
		if (null != data) {
			this.oembed = data;
			this.url = data.url;
			if (null == data.safe || data.safe === !0 || "true" === data.safe) {
				if (!data.error_message) {
					type = data.type || "link";
					this.displayEmbedType(this.utils.getEmbedType(type), {
						link_embed: data,
						link_url: data.url,
						link_options: options
					});
					embedDiv = getDescendantsByClassName(this.getElement(), "embed")[0];
					return null != embedDiv ? addClass(embedDiv, "custom-" + type) : void 0
				}
				log("EmbedBoxWidget encountered an error!", data.error_type, data.error_message);
				this.hide()
			} else {
				log("There was unsafe content.", data, data.safe_type, data.safe_message);
				this.hide()
			}
		}
	};
	EmbedBoxWidget.prototype.fetchEmbed = function (url, options, callback) {
		var embedlyOptions;
		null == url && (url = "");
		null == options && (options = {});
		null == callback && (callback = noop);
		this.utils.webProtocolRegExp.test(url) || (url = "http://" + url);
		embedlyOptions = this.utils.extend({
			maxWidth: 530,
			maxHeight: 200,
			wmode: "transparent"
		}, options);
		return KD.remote.api.JNewStatusUpdate.fetchDataFromEmbedly(url, embedlyOptions, function () {
			return function (err, oembed) {
				return callback(oembed[0], embedlyOptions)
			}
		}(this))
	};
	EmbedBoxWidget.prototype.pistachio = function () {
		return "{{> this.settingsButton}}"
	};
	return EmbedBoxWidget
}(KDView);
var EmbedBoxObjectView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxObjectView = function (_super) {
	function EmbedBoxObjectView() {
		return EmbedBoxObjectView.__super__.constructor.apply(this, arguments)
	}
	__extends(EmbedBoxObjectView, _super);
	EmbedBoxObjectView.prototype.pistachio = function () {
		var objectHtml, _ref, _ref1;
		objectHtml = null != (_ref = this.getData().link_embed) && null != (_ref1 = _ref.object) ? _ref1.html : void 0;
		return '<div class="embed embed-object-view custom-object">\n  ' + Encoder.htmlDecode(objectHtml || "") + "\n</div>"
	};
	return EmbedBoxObjectView
}(JView);
var EmbedBoxImageView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxImageView = function (_super) {
	function EmbedBoxImageView(options, data) {
		var oembed, srcUrl, _ref, _ref1;
		null == options && (options = {});
		EmbedBoxImageView.__super__.constructor.call(this, data.link_options, data);
		oembed = this.getData().link_embed;
		srcUrl = this.utils.proxifyUrl(null != (_ref = oembed.images) && null != (_ref1 = _ref[0]) ? _ref1.url : void 0, {
			width: 728,
			height: 368,
			grow: !0,
			crop: !0
		});
		this.image = new KDCustomHTMLView({
			tagName: "img",
			attributes: {
				src: srcUrl,
				title: oembed.title || "",
				width: "100%"
			}
		});
		this.setClass("embed-image-view")
	}
	__extends(EmbedBoxImageView, _super);
	EmbedBoxImageView.prototype.pistachio = function () {
		var link_url;
		link_url = this.getData().link_url;
		return '<a href="' + (link_url || "#") + '" target="_blank">\n  {{> this.image}}\n</a>'
	};
	return EmbedBoxImageView
}(JView);
var EmbedBoxLinkViewDescription, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkViewDescription = function (_super) {
	function EmbedBoxLinkViewDescription(options, data) {
		var oembed, _ref1;
		null == options && (options = {});
		null == data && (data = {});
		options.cssClass = KD.utils.curry("description", options.cssClass);
		EmbedBoxLinkViewDescription.__super__.constructor.call(this, options, data);
		oembed = data.link_embed;
		(null != oembed && null != (_ref1 = oembed.description) ? _ref1.trim() : void 0) || this.hide();
		this.originalDescription = (null != oembed ? oembed.description : void 0) || "";
		this.descriptionInput = new KDInputView({
			type: "textarea",
			cssClass: "description-input hidden",
			name: "description_input",
			defaultValue: this.originalDescription,
			autogrow: !0,
			blur: function (_this) {
				return function () {
					var descriptionEl;
					_this.descriptionInput.hide();
					descriptionEl = _this.getDescriptionEl();
					setText(descriptionEl, Encoder.XSSEncode(_this.getValue()));
					return _this.utils.elementShow(descriptionEl)
				}
			}(this)
		})
	}
	var getDescendantsByClassName, setText, _ref;
	__extends(EmbedBoxLinkViewDescription, _super);
	JView.mixin(EmbedBoxLinkViewDescription.prototype);
	_ref = KD.dom, getDescendantsByClassName = _ref.getDescendantsByClassName, setText = _ref.setText;
	EmbedBoxLinkViewDescription.prototype.getDescriptionEl = function () {
		return getDescendantsByClassName(this.getElement(), "description")[0]
	};
	EmbedBoxLinkViewDescription.prototype.getValue = function () {
		return this.descriptionInput.getValue()
	};
	EmbedBoxLinkViewDescription.prototype.getOriginalValue = function () {
		return this.originalDescription
	};
	EmbedBoxLinkViewDescription.prototype.viewAppended = function () {
		return JView.prototype.viewAppended.call(this)
	};
	EmbedBoxLinkViewDescription.prototype.click = function () {};
	EmbedBoxLinkViewDescription.prototype.getDescription = function () {
		var value, _ref1;
		value = (null != (_ref1 = this.getData().link_embed) ? _ref1.description : void 0) || this.getData().description;
		null != value && (value = Encoder.XSSEncode(value));
		return value
	};
	EmbedBoxLinkViewDescription.prototype.pistachio = function () {
		return "{{> this.descriptionInput}}\n" + (this.getDescription() || "")
	};
	return EmbedBoxLinkViewDescription
}(KDView);
var EmbedBoxLinkDisplayView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkDisplayView = function (_super) {
	function EmbedBoxLinkDisplayView(options, data) {
		var _ref, _ref1;
		null == options && (options = {});
		EmbedBoxLinkDisplayView.__super__.constructor.call(this, options, data);
		this.embedImage = null != (null != data && null != (_ref = data.link_embed) && null != (_ref1 = _ref.images) ? _ref1[0] : void 0) ? new EmbedBoxLinkViewImage({
			cssClass: "preview-image",
			delegate: this
		}, data) : new KDCustomHTMLView("hidden");
		this.embedContent = new EmbedBoxLinkViewContent({
			cssClass: "preview-text",
			delegate: this
		}, data)
	}
	__extends(EmbedBoxLinkDisplayView, _super);
	EmbedBoxLinkDisplayView.prototype.pistachio = function () {
		return '<div class="embed embed-link-view custom-link clearfix">\n  {{> this.embedImage}}\n  {{> this.embedContent}}\n</div>'
	};
	return EmbedBoxLinkDisplayView
}(JView);
var EmbedBoxLinkViewImage, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkViewImage = function (_super) {
	function EmbedBoxLinkViewImage(options, data) {
		var altSuffix, oembed, _ref, _ref1, _ref2;
		null == options && (options = {});
		options.href = data.link_url || (null != (_ref = data.link_embed) ? _ref.url : void 0);
		options.target = "_blank";
		EmbedBoxLinkViewImage.__super__.constructor.call(this, options, data);
		oembed = this.getData().link_embed;
		this.imageLink = this.utils.proxifyUrl(null != (_ref1 = oembed.images) && null != (_ref2 = _ref1[0]) ? _ref2.url : void 0, {
			width: 144,
			height: 100,
			crop: !0,
			grow: !0
		});
		altSuffix = oembed.author_name ? " by " + oembed.author_name : "";
		this.imageAltText = oembed.title + altSuffix;
		this.imageView = new KDCustomHTMLView({
			tagName: "img",
			cssClass: "thumb",
			bind: "error",
			error: this.bound("hide"),
			attributes: {
				src: this.imageLink,
				alt: this.imageAltText,
				title: this.imageAltText
			}
		})
	}
	__extends(EmbedBoxLinkViewImage, _super);
	JView.mixin(EmbedBoxLinkViewImage.prototype);
	EmbedBoxLinkViewImage.prototype.setSrc = function (src) {
		return this.imageView.getElement().src = src
	};
	EmbedBoxLinkViewImage.prototype.viewAppended = function () {
		var link_embed, _ref, _ref1, _ref2;
		JView.prototype.viewAppended.call(this);
		link_embed = this.getData().link_embed;
		return null != link_embed && "video" === (null != (_ref = link_embed.object) ? _ref.type : void 0) ? this.videoPopup = new VideoPopup({
			delegate: this.imageView,
			title: link_embed.title || "Untitled Video",
			thumb: null != (_ref1 = link_embed.images) && null != (_ref2 = _ref1[0]) ? _ref2.url : void 0
		}, link_embed.object.html) : void 0
	};
	EmbedBoxLinkViewImage.prototype.pistachio = function () {
		return "{{> this.imageView}}"
	};
	return EmbedBoxLinkViewImage
}(CustomLinkView);
var EmbedBoxLinksView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinksView = function (_super) {
	function EmbedBoxLinksView(options, data) {
		null == options && (options = {});
		options.cssClass = "embed-links-container";
		EmbedBoxLinksView.__super__.constructor.call(this, options, data);
		this.linkListController = new KDListViewController({
			viewOptions: {
				cssClass: "embed-link-list layout-wrapper",
				delegate: this
			},
			itemClass: EmbedBoxLinksViewItem
		});
		this.linkListController.on("ItemSelectionPerformed", function (_this) {
			return function (controller, _arg) {
				var items;
				items = _arg.items;
				return items.forEach(function (item) {
					return _this.emit("LinkSelected", item.getData())
				})
			}
		}(this));
		this.linkList = this.linkListController.getView();
		this.hide()
	}
	__extends(EmbedBoxLinksView, _super);
	JView.mixin(EmbedBoxLinksView.prototype);
	EmbedBoxLinksView.prototype.clearLinks = function () {
		this.linkListController.removeAllItems();
		return this.emit("LinksCleared")
	};
	EmbedBoxLinksView.prototype.setActiveLinkIndex = function (index) {
		var item;
		item = this.linkListController.itemsOrdered[index];
		this.linkListController.deselectAllItems();
		return this.linkListController.selectSingleItem(item)
	};
	EmbedBoxLinksView.prototype.getLinkCount = function () {
		return this.linkListController.getItemCount()
	};
	EmbedBoxLinksView.prototype.addLink = function (url) {
		var data;
		data = {
			url: url
		};
		this.linkListController.addItem(data);
		this.linkListController.getItemCount() > 0 && this.show();
		return this.emit("LinkAdded", url, data)
	};
	EmbedBoxLinksView.prototype.removeLink = function (url) {
		return this.linkListController.itemsOrdered.forEach(function (_this) {
			return function (item, index) {
				var data;
				data = item.getData();
				if (data.url === url) {
					_this.linkListController.removeItem(item);
					return _this.emit("LinkRemoved", {
						url: url,
						index: index
					})
				}
			}
		}(this))
	};
	EmbedBoxLinksView.prototype.pistachio = function () {
		return "{{> this.linkList}}"
	};
	return EmbedBoxLinksView
}(KDView);
var EmbedBoxLinkViewImageSwitch, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkViewImageSwitch = function (_super) {
	function EmbedBoxLinkViewImageSwitch(options, data) {
		null == options && (options = {});
		EmbedBoxLinkViewImageSwitch.__super__.constructor.call(this, options, data);
		(null == data.link_embed.images || data.link_embed.images.length < 2) && this.hide();
		this.imageIndex = 0
	}
	var addClass, getDescendantsByClassName, hasClass, removeClass, setText, _ref;
	__extends(EmbedBoxLinkViewImageSwitch, _super);
	_ref = KD.dom, hasClass = _ref.hasClass, addClass = _ref.addClass, removeClass = _ref.removeClass, getDescendantsByClassName = _ref.getDescendantsByClassName, setText = _ref.setText;
	EmbedBoxLinkViewImageSwitch.prototype.getImageIndex = function () {
		return this.imageIndex
	};
	EmbedBoxLinkViewImageSwitch.prototype.setImageIndex = function (imageIndex) {
		this.imageIndex = imageIndex
	};
	EmbedBoxLinkViewImageSwitch.prototype.getButton = function (dir) {
		return getDescendantsByClassName(this.getElement(), dir)[0]
	};
	EmbedBoxLinkViewImageSwitch.prototype.disableButton = function (dir) {
		return addClass(this.getButton(dir), "disabled")
	};
	EmbedBoxLinkViewImageSwitch.prototype.enableButton = function (dir) {
		return removeClass(this.getButton(dir), "disabled")
	};
	EmbedBoxLinkViewImageSwitch.prototype.click = function (event) {
		var defaultImgSrc, fallBackImgSrc, imageIndex, imgSrc, oembed, pageNumber, proxiedImage, target, _ref1, _ref2;
		event.preventDefault();
		event.stopPropagation();
		oembed = this.getData().link_embed;
		if (null != (null != oembed ? oembed.images : void 0)) {
			target = event.target;
			if (hasClass(target, "preview-link-switch")) {
				imageIndex = this.getImageIndex();
				if (hasClass(target, "next") && oembed.images.length - 1 > imageIndex) {
					imageIndex++;
					this.setImageIndex(imageIndex);
					this.enableButton("previous")
				} else if (hasClass(target, "previous") && imageIndex > 0) {
					imageIndex--;
					this.setImageIndex(imageIndex);
					this.enableButton("next")
				}
				pageNumber = getDescendantsByClassName(this.getElement(), "thumb-nr")[0];
				setText(pageNumber, imageIndex + 1);
				if (imageIndex < oembed.images.length - 1) {
					imgSrc = null != (_ref1 = oembed.images[imageIndex]) ? _ref1.url : void 0;
					if (imgSrc) {
						proxiedImage = this.utils.proxifyUrl(imgSrc, {
							width: 144,
							height: 100,
							crop: !0,
							grow: !0
						});
						this.getDelegate().embedImage.setSrc(proxiedImage)
					} else {
						fallBackImgSrc = "https://koding.com/a/images/service_icons/Koding.png";
						this.getDelegate().embedImage.setSrc(fallBackImgSrc)
					}
					this.getDelegate().getDelegate().setImageIndex(imageIndex)
				} else {
					defaultImgSrc = null != (_ref2 = oembed.images[0]) ? _ref2.url : void 0;
					this.getDelegate().embedImage.setSrc(defaultImgSrc)
				}
				return 0 === imageIndex ? this.disableButton("previous") : imageIndex === oembed.images.length - 1 ? this.disableButton("next") : void 0
			}
		}
	};
	EmbedBoxLinkViewImageSwitch.prototype.pistachio = function () {
		var imageIndex, images, link_embed;
		imageIndex = this.getImageIndex();
		link_embed = this.getData().link_embed;
		images = link_embed.images;
		return '<a class="preview-link-switch previous ' + (0 === imageIndex ? "disabled" : "") + '"></a>\n<a class="preview-link-switch next ' + (imageIndex === images.length ? "disabled" : "") + '"></a>\n<div class="thumb-count">\n  <span class="thumb-nr">' + (imageIndex + 1 || "1") + '</span> of <span class="thumb-all">' + images.length + '</span>\n  <span class="thumb-text">Choose a thumbnail</span>\n</div>'
	};
	return EmbedBoxLinkViewImageSwitch
}(JView);
var EmbedBoxLinksViewItem, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinksViewItem = function (_super) {
	function EmbedBoxLinksViewItem(options, data) {
		null == options && (options = {});
		options = this.utils.extend({}, options, {
			cssClass: "embed-link-item",
			tooltip: {
				title: data.url,
				placement: "above",
				offset: 3,
				delayIn: 300,
				html: !0,
				animate: !0
			}
		});
		EmbedBoxLinksViewItem.__super__.constructor.call(this, options, data)
	}
	__extends(EmbedBoxLinksViewItem, _super);
	EmbedBoxLinksViewItem.prototype.partial = function () {
		var linkUrlShort;
		linkUrlShort = this.getData().url.replace(this.utils.webProtocolRegExp, "").replace(/\/.*/, "");
		return '<div class="embed-link-wrapper">\n  ' + linkUrlShort + "\n</div>"
	};
	return EmbedBoxLinksViewItem
}(KDListItemView);
var EmbedBoxLinkViewProvider, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkViewProvider = function (_super) {
	function EmbedBoxLinkViewProvider(options, data) {
		var _ref;
		EmbedBoxLinkViewProvider.__super__.constructor.call(this, options, data);
		null == (null != (_ref = data.link_embed) ? _ref.provider_name : void 0) && this.hide()
	}
	__extends(EmbedBoxLinkViewProvider, _super);
	EmbedBoxLinkViewProvider.prototype.pistachio = function () {
		var data, link_embed, provider_display, provider_link, provider_name, provider_url;
		data = this.getData();
		link_embed = data.link_embed, provider_name = data.provider_name, provider_url = data.provider_url, provider_display = data.provider_display;
		link_embed || (link_embed = {});
		provider_name || (provider_name = link_embed.provider_name || "");
		provider_url || (provider_url = link_embed.provider_url);
		provider_display || (provider_display = link_embed.provider_display || "");
		provider_link = provider_url ? "at <a href='" + provider_url + "' target='_blank'>" + provider_display + "</a>" : "";
		return "<strong>" + provider_name + "</strong>"
	};
	return EmbedBoxLinkViewProvider
}(JView);
var EmbedBoxLinkView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkView = function (_super) {
	function EmbedBoxLinkView(options, data) {
		var _ref, _ref1;
		null == options && (options = {});
		EmbedBoxLinkView.__super__.constructor.call(this, options, data);
		this.embedImage = null != (null != (_ref = data.link_embed) && null != (_ref1 = _ref.images) ? _ref1[0] : void 0) ? new EmbedBoxLinkViewImage({
			cssClass: "preview-image",
			delegate: this
		}, data) : new KDCustomHTMLView("hidden");
		this.embedContent = new EmbedBoxLinkViewContent({
			cssClass: "preview-text",
			delegate: this
		}, data);
		this.embedImageSwitch = new EmbedBoxLinkViewImageSwitch({
			cssClass: "preview-link-pager",
			delegate: this
		}, data)
	}
	__extends(EmbedBoxLinkView, _super);
	EmbedBoxLinkView.prototype.pistachio = function () {
		return '<div class="embed embed-link-view custom-link clearfix">\n  {{> this.embedImage}}\n  {{> this.embedContent}}\n  {{> this.embedImageSwitch}}\n</div>'
	};
	return EmbedBoxLinkView
}(JView);
var EmbedBoxLinkViewTitle, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkViewTitle = function (_super) {
	function EmbedBoxLinkViewTitle(options, data) {
		var oembed;
		null == options && (options = {});
		EmbedBoxLinkViewTitle.__super__.constructor.call(this, options, data);
		oembed = data.link_embed;
		this.originalTitle = null != oembed ? oembed.title : void 0;
		this.titleInput = new KDInputView({
			cssClass: "preview-title-input hidden",
			name: "preview-title-input",
			defaultValue: oembed.title || "",
			blur: function (_this) {
				return function () {
					_this.titleInput.hide();
					return _this.$("div.preview-title").html(_this.getValue()).show()
				}
			}(this)
		});
		this.editIndicator = new KDCustomHTMLView({
			tagName: "div",
			cssClass: "edit-indicator title-edit-indicator",
			partial: "edited",
			tooltip: {
				title: "Original Content was: " + (oembed.original_title || oembed.title || "")
			}
		});
		this.editIndicator.hide()
	}
	__extends(EmbedBoxLinkViewTitle, _super);
	EmbedBoxLinkViewTitle.prototype.hide = function () {
		EmbedBoxLinkViewTitle.__super__.hide.apply(this, arguments);
		return console.trace()
	};
	EmbedBoxLinkViewTitle.prototype.viewAppended = function () {
		var _ref;
		JView.prototype.viewAppended.call(this);
		return (null != (_ref = this.getData().link_embed) ? _ref.titleEdited : void 0) ? this.editIndicator.show() : void 0
	};
	EmbedBoxLinkViewTitle.prototype.getValue = function () {
		return this.titleInput.getValue()
	};
	EmbedBoxLinkViewTitle.prototype.getOriginalValue = function () {
		return this.originalTitle
	};
	EmbedBoxLinkViewTitle.prototype.click = function () {};
	EmbedBoxLinkViewTitle.prototype.pistachio = function () {
		var title, _ref;
		title = (null != (_ref = this.getData().link_embed) ? _ref.title : void 0) || this.getData().title || this.getData().link_url;
		return '{{> this.titleInput}}\n<div class="preview-title">\n  ' + title + "\n  {{> this.editIndicator}}\n</div>"
	};
	return EmbedBoxLinkViewTitle
}(JView);
var EmbedBoxLinkViewAuthor, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkViewAuthor = function (_super) {
	function EmbedBoxLinkViewAuthor(options, data) {
		var _ref;
		EmbedBoxLinkViewAuthor.__super__.constructor.call(this, options, data);
		null == (null != (_ref = data.link_embed) ? _ref.author_name : void 0) && this.hide()
	}
	__extends(EmbedBoxLinkViewAuthor, _super);
	JView.mixin(EmbedBoxLinkViewAuthor.prototype);
	EmbedBoxLinkViewAuthor.prototype.pistachio = function () {
		var _ref, _ref1;
		return 'written by <a href="' + ((null != (_ref = this.getData().link_embed) ? _ref.author_url : void 0) || this.getData().author_url || "#") + '" target="_blank">' + ((null != (_ref1 = this.getData().link_embed) ? _ref1.author_name : void 0) || this.getData().author_name) + "</a>"
	};
	return EmbedBoxLinkViewAuthor
}(KDView);
var EmbedBoxLinkViewContent, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
EmbedBoxLinkViewContent = function (_super) {
	function EmbedBoxLinkViewContent(options, data) {
		var contentOptions;
		null == options && (options = {});
		EmbedBoxLinkViewContent.__super__.constructor.call(this, options, data);
		contentOptions = {
			tagName: "a",
			cssClass: "preview-text-link",
			attributes: {
				href: data.link_url,
				target: "_blank"
			}
		};
		this.embedTitle = new EmbedBoxLinkViewTitle(contentOptions, data);
		this.embedProvider = new EmbedBoxLinkViewProvider({
			cssClass: "provider-info"
		}, data);
		this.embedDescription = new EmbedBoxLinkViewDescription(contentOptions, data)
	}
	__extends(EmbedBoxLinkViewContent, _super);
	EmbedBoxLinkViewContent.prototype.pistachio = function () {
		return "{{> this.embedTitle}}\n{{> this.embedDescription}}\n{{> this.embedProvider}}"
	};
	return EmbedBoxLinkViewContent
}(JView);
var SkillTagGroup, TagCloudListItemView, TagGroup, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
TagGroup = function (_super) {
	function TagGroup(options, data) {
		options = $.extend({
			cssClass: "tag-group"
		}, options);
		TagGroup.__super__.constructor.call(this, options, data)
	}
	__extends(TagGroup, _super);
	JView.mixin(TagGroup.prototype);
	TagGroup.prototype.viewAppended = function () {
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	TagGroup.prototype.fetchTags = function (stringTags, callback) {
		return this._fetchTags("some", stringTags, callback)
	};
	TagGroup.prototype._fetchTags = function (method, stringTags, callback) {
		return stringTags.length > 0 ? KD.remote.api.JTag[method]({
			title: {
				$in: stringTags
			}
		}, {
			sort: {
				title: 1
			}
		}, function () {
			return function (err, tags) {
				if (!err || tags) return callback(null, tags);
				callback(err);
				return warn("there was a problem fetching default tags!", err, tags)
			}
		}(this)) : warn("no tag info was given!")
	};
	return TagGroup
}(KDCustomHTMLView);
SkillTagGroup = function (_super) {
	function SkillTagGroup(options, data) {
		var controller, name;
		SkillTagGroup.__super__.constructor.call(this, options, data);
		this.skillTags = (this.getData() || []).skillTags;
		name = KD.utils.getFullnameFromAccount(this.getData(), !0);
		this.noTags = new KDCustomHTMLView({
			tagName: "span",
			cssClass: "noskilltags",
			partial: "" + name + " hasn't entered any skills yet."
		});
		controller = new KDListViewController({
			view: new KDListView({
				itemClass: TagCloudListItemView,
				cssClass: "skilltag-cloud",
				delegate: this
			})
		});
		controller.listView.on("TagWasClicked", function (_this) {
			return function () {
				return _this.emit("TagWasClicked")
			}
		}(this));
		this.listViewWrapper = controller.getView();
		0 !== this.skillTags.length && "No Tags" !== this.skillTags[0] && this.fetchTags(this.skillTags, function () {
			return function (err, tags) {
				return err ? void 0 : controller.instantiateListItems(tags)
			}
		}(this));
		this.getData().watch("skillTags", function () {
			return controller.replaceAllItems(this.skillTags)
		})
	}
	__extends(SkillTagGroup, _super);
	SkillTagGroup.prototype.fetchTags = function (stringTags, callback) {
		return this._fetchTags("fetchSkillTags", stringTags, callback)
	};
	SkillTagGroup.prototype.pistachio = function () {
		return this.skillTags.length && "No Tags" !== this.skillTags[0] ? "{{> this.listViewWrapper}}" : "{{> this.noTags}}"
	};
	return SkillTagGroup
}(TagGroup);
TagCloudListItemView = function (_super) {
	function TagCloudListItemView(options, data) {
		options = $.extend({
			tagName: "a",
			attributes: {
				href: "#"
			}
		}, options);
		TagCloudListItemView.__super__.constructor.call(this, options, data);
		this.setClass("ttag");
		this.unsetClass("kdview");
		this.unsetClass("kdlistitemview");
		this.unsetClass("kdlistitemview-default")
	}
	__extends(TagCloudListItemView, _super);
	JView.mixin(TagCloudListItemView.prototype);
	TagCloudListItemView.prototype.viewAppended = function () {
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	TagCloudListItemView.prototype.pistachio = function () {
		return TagCloudListItemView.__super__.pistachio.call(this, "{{#(title)}}")
	};
	TagCloudListItemView.prototype.click = function (e) {
		null != e && e.preventDefault();
		null != e && e.stopPropagation();
		return this.openTag(this.getData())
	};
	TagCloudListItemView.prototype.openTag = function (tag) {
		var entryPoint;
		entryPoint = KD.config.entryPoint;
		return KD.getSingleton("router").handleRoute("/Topics/" + tag.slug, {
			state: tag,
			entryPoint: entryPoint
		})
	};
	return TagCloudListItemView
}(KDListItemView);
var SuggestNewTagItem, TagAutoCompleteController, TagAutoCompleteItemView, TagAutoCompletedItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
TagAutoCompleteController = function (_super) {
	function TagAutoCompleteController(options) {
		options.nothingFoundItemClass || (options.nothingFoundItemClass = SuggestNewTagItem);
		null == options.allowNewSuggestions && (options.allowNewSuggestions = !0);
		TagAutoCompleteController.__super__.constructor.apply(this, arguments)
	}
	__extends(TagAutoCompleteController, _super);
	return TagAutoCompleteController
}(KDAutoCompleteController);
TagAutoCompleteItemView = function (_super) {
	function TagAutoCompleteItemView(options) {
		options.cssClass = "clearfix";
		TagAutoCompleteItemView.__super__.constructor.apply(this, arguments)
	}
	__extends(TagAutoCompleteItemView, _super);
	TagAutoCompleteItemView.prototype.pistachio = function () {
		return "<span class='ttag'>{{#(title)}}</span>"
	};
	TagAutoCompleteItemView.prototype.viewAppended = function () {
		TagAutoCompleteItemView.__super__.viewAppended.call(this);
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	TagAutoCompleteItemView.prototype.partial = function () {
		return ""
	};
	return TagAutoCompleteItemView
}(KDAutoCompleteListItemView);
TagAutoCompletedItemView = function (_super) {
	function TagAutoCompletedItemView(options, data) {
		options.cssClass = "clearfix";
		TagAutoCompletedItemView.__super__.constructor.apply(this, arguments);
		this.tag = new TagLinkView({
			clickable: !1
		}, data)
	}
	__extends(TagAutoCompletedItemView, _super);
	TagAutoCompletedItemView.prototype.pistachio = function () {
		return "{{> this.tag}}"
	};
	TagAutoCompletedItemView.prototype.viewAppended = function () {
		TagAutoCompletedItemView.__super__.viewAppended.call(this);
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	TagAutoCompletedItemView.prototype.partial = function () {
		return ""
	};
	return TagAutoCompletedItemView
}(KDAutoCompletedItem);
SuggestNewTagItem = function (_super) {
	function SuggestNewTagItem(options, data) {
		options.cssClass = "suggest clearfix";
		SuggestNewTagItem.__super__.constructor.call(this, options, data)
	}
	__extends(SuggestNewTagItem, _super);
	SuggestNewTagItem.prototype.partial = function () {
		return "Suggest <span class='ttag'>" + this.getOptions().userInput + "</span> as a new topic?"
	};
	return SuggestNewTagItem
}(KDAutoCompleteListItemView);
var CommentView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
CommentView = function (_super) {
	function CommentView(options, data) {
		var fixedHeight;
		CommentView.__super__.constructor.apply(this, arguments);
		this.setClass("comment-container");
		this.createSubViews(data);
		this.resetDecoration();
		this.attachListeners();
		fixedHeight = this.getOptions().fixedHeight;
		fixedHeight || (fixedHeight = !1);
		fixedHeight && this.setFixedHeight(fixedHeight)
	}
	__extends(CommentView, _super);
	CommentView.prototype.render = function () {
		return this.resetDecoration()
	};
	CommentView.prototype.setFixedHeight = function (maxHeight) {
		this.setClass("fixed-height");
		return this.commentList.$().css({
			maxHeight: maxHeight
		})
	};
	CommentView.prototype.createSubViews = function (data) {
		var reply, showMore, _i, _len, _ref;
		this.commentList = new KDListView({
			type: "comments",
			itemClass: CommentListItemView,
			delegate: this
		}, data);
		this.commentController = new CommentListViewController({
			view: this.commentList
		});
		this.addSubView(showMore = new CommentViewHeader({
			delegate: this.commentList
		}, data));
		this.addSubView(this.commentController.getView());
		this.addSubView(this.commentForm = new NewCommentForm({
			delegate: this.commentList
		}));
		this.commentList.on("ReplyLinkClicked", function (_this) {
			return function (username) {
				var input, value;
				input = _this.commentForm.commentInput;
				value = input.getValue();
				value = value.indexOf("@" + username) >= 0 ? value : 0 === value.length ? "@" + username + " " : "" + value + " @" + username + " ";
				input.setFocus();
				return input.setValue(value)
			}
		}(this));
		this.commentList.on("OwnCommentWasSubmitted", function () {
			var _ref;
			return null != (_ref = this.getDelegate()) ? _ref.emit("RefreshTeaser") : void 0
		});
		this.commentList.on("OwnCommentHasArrived", function () {
			var _ref;
			showMore.ownCommentArrived();
			return null != (_ref = this.getDelegate()) ? _ref.emit("RefreshTeaser") : void 0
		});
		this.commentList.on("CommentIsDeleted", function () {
			return showMore.ownCommentDeleted()
		});
		this.on("RefreshTeaser", function () {
			var _ref;
			return null != (_ref = this.parent) ? _ref.emit("RefreshTeaser") : void 0
		});
		if (data.replies) {
			_ref = data.replies;
			for (_i = 0, _len = _ref.length; _len > _i; _i++) {
				reply = _ref[_i];
				null != reply && null != reply.originId && null != reply.originType && this.commentList.addItem(reply)
			}
		} else this.commentController.fetchRelativeComments(null, data.meta.createdAt, !1, -1);
		return this.commentList.emit("BackgroundActivityFinished")
	};
	CommentView.prototype.attachListeners = function () {
		this.commentList.on("commentInputReceivedFocus", this.bound("decorateActiveCommentState"));
		this.commentList.on("CommentLinkReceivedClick", function (_this) {
			return function () {
				_this.commentForm.makeCommentFieldActive();
				return _this.commentForm.commentInput.setFocus()
			}
		}(this));
		this.commentList.on("CommentCountClicked", function (_this) {
			return function () {
				return _this.commentList.emit("AllCommentsLinkWasClicked")
			}
		}(this));
		return this.commentList.on("CommentViewShouldReset", this.bound("resetDecoration"))
	};
	CommentView.prototype.resetDecoration = function () {
		var post;
		post = this.getData();
		return 0 === post.repliesCount ? this.decorateNoCommentState() : this.decorateCommentedState()
	};
	CommentView.prototype.decorateNoCommentState = function () {
		this.unsetClass("active-comment");
		this.unsetClass("commented");
		return this.setClass("no-comment")
	};
	CommentView.prototype.decorateCommentedState = function () {
		this.unsetClass("active-comment");
		this.unsetClass("no-comment");
		return this.setClass("commented")
	};
	CommentView.prototype.decorateActiveCommentState = function () {
		this.unsetClass("no-comment");
		return this.setClass("active-comment")
	};
	CommentView.prototype.decorateItemAsLiked = function (likeObj) {
		var _ref;
		(null != likeObj && null != (_ref = likeObj.results) ? _ref.likeCount : void 0) > 0 ? this.setClass("liked") : this.unsetClass("liked");
		return this.ActivityActionsView.setLikedCount(likeObj)
	};
	return CommentView
}(KDView);
var CommentListViewController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
CommentListViewController = function (_super) {
	function CommentListViewController() {
		CommentListViewController.__super__.constructor.apply(this, arguments);
		this._hasBackgrounActivity = !1;
		this.startListeners()
	}
	__extends(CommentListViewController, _super);
	CommentListViewController.prototype.instantiateListItems = function (items, keepDeletedComments) {
		var comment, commentView, i, newItems, nextComment, skipComment, _i, _len;
		null == keepDeletedComments && (keepDeletedComments = !1);
		newItems = [];
		items.sort(function () {
			return function (a, b) {
				a = a.meta.createdAt;
				b = b.meta.createdAt;
				return b > a ? -1 : a > b ? 1 : 0
			}
		}(this));
		for (i = _i = 0, _len = items.length; _len > _i; i = ++_i) {
			comment = items[i];
			nextComment = items[i + 1];
			skipComment = !1;
			null != nextComment && comment.deletedAt && Date.parse(nextComment.meta.createdAt) > Date.parse(comment.deletedAt) && (skipComment = !0);
			!nextComment && comment.deletedAt && (skipComment = !0);
			keepDeletedComments && (skipComment = !1);
			if (!skipComment) {
				commentView = this.getListView().addItem(comment);
				newItems.push(commentView)
			}
		}
		return newItems
	};
	CommentListViewController.prototype.startListeners = function () {
		var listView;
		listView = this.getListView();
		listView.on("ItemWasAdded", function () {
			return function (view) {
				return view.on("CommentIsDeleted", function () {
					return listView.emit("CommentIsDeleted")
				})
			}
		}(this));
		listView.on("AllCommentsLinkWasClicked", function (_this) {
			return function () {
				var meta;
				if (!_this._hasBackgrounActivity) {
					_this.utils.wait(5e3, function () {
						return listView.emit("BackgroundActivityFinished")
					});
					meta = listView.getData().meta;
					listView.emit("BackgroundActivityStarted");
					_this._hasBackgrounActivity = !0;
					_this._removedBefore = !1;
					return _this.fetchRelativeComments(10, meta.createdAt)
				}
			}
		}(this));
		return listView.on("CommentSubmitted", function (reply) {
			var model;
			model = listView.getData();
			listView.emit("BackgroundActivityStarted");
			model.reply(reply, function () {
				return function (err, reply) {
					var _ref;
					if (null != (_ref = KD.getSingleton("activityController").flags) ? _ref.liveUpdates : void 0) listView.emit("OwnCommentWasSubmitted");
					else {
						listView.addItem(reply);
						listView.emit("OwnCommentHasArrived")
					}
					return listView.emit("BackgroundActivityFinished")
				}
			}(this));
			KD.mixpanel("Comment activity, success");
			return KD.getSingleton("badgeController").checkBadge({
				property: "comments",
				relType: "commenter",
				source: "JNewStatusUpdate",
				targetSelf: 1
			})
		})
	};
	CommentListViewController.prototype.fetchCommentsByRange = function (from, to, callback) {
		var message, query, _ref;
		callback || (_ref = [callback, to], to = _ref[0], callback = _ref[1]);
		query = {
			from: from,
			to: to
		};
		message = this.getListView().getData();
		return message.commentsByRange(query, function (_this) {
			return function (err, comments) {
				_this.getListView().emit("BackgroundActivityFinished");
				return callback(err, comments)
			}
		}(this))
	};
	CommentListViewController.prototype.fetchAllComments = function (skipCount, callback) {
		var listView, message;
		null == skipCount && (skipCount = 3);
		null == callback && (callback = noop);
		listView = this.getListView();
		listView.emit("BackgroundActivityStarted");
		message = this.getListView().getData();
		return message.restComments(skipCount, function () {
			return function (err, comments) {
				listView.emit("BackgroundActivityFinished");
				listView.emit("AllCommentsWereAdded");
				return callback(err, comments)
			}
		}(this))
	};
	CommentListViewController.prototype.fetchRelativeComments = function (_limit, _after, continuous, _sort) {
		var listView, message;
		null == _limit && (_limit = 10);
		null == continuous && (continuous = !0);
		null == _sort && (_sort = 1);
		listView = this.getListView();
		message = this.getListView().getData();
		return message.fetchRelativeComments({
			limit: _limit,
			after: _after,
			sort: _sort
		}, function (_this) {
			return function (err, comments) {
				var startTime;
				if (!_this._removedBefore) {
					_this.removeAllItems();
					_this._removedBefore = !0
				}
				_this.instantiateListItems(comments.slice(_limit - 10), !0);
				if (comments.length !== _limit) {
					listView = _this.getListView();
					listView.emit("BackgroundActivityFinished");
					listView.emit("AllCommentsWereAdded");
					return _this._hasBackgrounActivity = !1
				}
				startTime = comments[comments.length - 1].meta.createdAt;
				return continuous ? _this.fetchRelativeComments(++_limit, startTime, continuous, _sort) : void 0
			}
		}(this))
	};
	CommentListViewController.prototype.replaceAllComments = function (comments) {
		this.removeAllItems();
		return this.instantiateListItems(comments)
	};
	return CommentListViewController
}(KDListViewController);
var CommentViewHeader, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
CommentViewHeader = function (_super) {
	function CommentViewHeader(options, data) {
		var list, _ref;
		null == options && (options = {});
		options.cssClass = "show-more-comments in";
		options.itemTypeString = options.itemTypeString || "comments";
		CommentViewHeader.__super__.constructor.call(this, options, data);
		data = this.getData();
		this.maxCommentToShow = options.maxCommentToShow || 3;
		this.oldCount = data.repliesCount;
		this.newCount = 0;
		this.onListCount = data.repliesCount > this.maxCommentToShow ? this.maxCommentToShow : data.repliesCount;
		if (!(null != data.repliesCount && data.repliesCount > this.maxCommentToShow)) {
			this.onListCount = data.repliesCount;
			this.hide()
		}
		0 === data.repliesCount && this.hide();
		list = this.getDelegate();
		list.on("AllCommentsWereAdded", function (_this) {
			return function () {
				_this.newCount = 0;
				_this.onListCount = _this.getData().repliesCount;
				_this.updateNewCount();
				return _this.hide()
			}
		}(this));
		this.allItemsLink = new JCustomHTMLView({
			tagName: "a",
			cssClass: "all-count",
			pistachio: "View all {{#(repliesCount)}} " + this.getOptions().itemTypeString + "...",
			click: function (event) {
				KD.utils.stopDOMEvent(event);
				return list.emit("AllCommentsLinkWasClicked", this)
			}
		}, data);
		this.newItemsLink = new KDCustomHTMLView({
			tagName: "a",
			cssClass: "new-items",
			click: function (_this) {
				return function (event) {
					KD.utils.stopDOMEvent(event);
					return list.emit("AllCommentsLinkWasClicked", _this)
				}
			}(this)
		});
		this.liveUpdate = (null != (_ref = KD.getSingleton("activityController").flags) ? _ref.liveUpdates : void 0) || !1;
		KD.getSingleton("activityController").on("LiveStatusUpdateStateChanged", function (_this) {
			return function (newstate) {
				return _this.liveUpdate = newstate
			}
		}(this))
	}
	__extends(CommentViewHeader, _super);
	CommentViewHeader.prototype.ownCommentArrived = function () {
		var _ref;
		this.onListCount = null != (_ref = this.parent.commentController) && "function" == typeof _ref.getItemCount ? _ref.getItemCount() : void 0;
		this.newItemsLink.unsetClass("in");
		this.newCount > 0 && this.newCount--;
		return this.updateNewCount()
	};
	CommentViewHeader.prototype.ownCommentDeleted = function () {
		return this.newCount > 0 ? this.newCount++ : void 0
	};
	CommentViewHeader.prototype.render = function () {
		var _newCount, _ref, _ref1;
		(null != (_ref = this.parent) && null != (_ref1 = _ref.commentController) && "function" == typeof _ref1.getItemCount ? _ref1.getItemCount() : void 0) && (this.onListCount = this.parent.commentController.getItemCount());
		_newCount = this.getData().repliesCount;
		_newCount > this.maxCommentToShow && this.onListCount < _newCount && this.show();
		_newCount > this.oldCount ? this.newCount++ : _newCount < this.oldCount && this.newCount > 0 && this.newCount--;
		if (_newCount !== this.oldCount) {
			this.oldCount = _newCount;
			this.utils.defer(function (_this) {
				return function () {
					return _this.updateNewCount()
				}
			}(this))
		}
		return CommentViewHeader.__super__.render.apply(this, arguments)
	};
	CommentViewHeader.prototype.updateNewCount = function () {
		0 === this.oldCount && (this.newCount = 0);
		if (this.newCount > 0)
			if (this.liveUpdate) this.getDelegate().emit("AllCommentsLinkWasClicked");
			else {
				this.setClass("new");
				this.allItemsLink.hide();
				this.show();
				this.newItemsLink.updatePartial("" + KD.utils.formatPlural(this.newCount, "new comment") + "...");
				this.newItemsLink.setClass("in")
			} else {
			this.unsetClass("new");
			this.newItemsLink.unsetClass("in")
		}
		this.onListCount > this.oldCount && (this.onListCount = this.oldCount);
		this.onListCount === this.getData().repliesCount && (this.newCount = 0);
		return this.onListCount === this.oldCount && 0 === this.newCount ? this.hide() : this.show()
	};
	CommentViewHeader.prototype.hide = function () {
		this.unsetClass("in");
		return CommentViewHeader.__super__.hide.apply(this, arguments)
	};
	CommentViewHeader.prototype.show = function () {
		this.setClass("in");
		return CommentViewHeader.__super__.show.apply(this, arguments)
	};
	CommentViewHeader.prototype.pistachio = function () {
		return "{{> this.allItemsLink}}\n{{> this.newItemsLink}}"
	};
	return CommentViewHeader
}(JView);
var CommentListItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
CommentListItemView = function (_super) {
	function CommentListItemView(options, data) {
		var activity, canEditComments, deleterId, isActivityMine, isCommentMine, loggedInId, origin, originId, originType, settingsOptions, showSettingsMenu, _ref;
		options.type || (options.type = "comment");
		options.cssClass || (options.cssClass = "kdlistitemview kdlistitemview-comment");
		CommentListItemView.__super__.constructor.call(this, options, data);
		data = this.getData();
		originId = data.getAt("originId");
		originType = data.getAt("originType");
		deleterId = null != (_ref = data.getAt("deletedBy")) && "function" == typeof _ref.getId ? _ref.getId() : void 0;
		origin = {
			constructorName: originType,
			id: originId
		};
		this.avatar = new AvatarView({
			size: {
				width: options.avatarWidth || 40,
				height: options.avatarHeight || 40
			},
			origin: origin,
			showStatus: !0
		});
		this.author = new ProfileLinkView({
			origin: origin
		});
		this.body = this.getBody(data);
		this.editCommentWrapper = new KDCustomHTMLView({
			cssClass: "edit-comment-wrapper hidden"
		});
		this.editInfo = new KDCustomHTMLView({
			tagName: "span",
			cssClass: "hidden edited",
			partal: "edited"
		});
		data.getAt("editedAt") && this.editInfo.show();
		null != deleterId && deleterId !== originId && (this.deleter = new ProfileLinkView({}, data.getAt("deletedBy")));
		activity = this.getDelegate().getData();
		loggedInId = KD.whoami().getId();
		isCommentMine = loggedInId === data.originId;
		isActivityMine = loggedInId === activity.originId;
		canEditComments = __indexOf.call(KD.config.permissions, "edit comments") >= 0;
		settingsOptions = {};
		if (isCommentMine || isActivityMine || canEditComments) {
			settingsOptions["delete"] = !0;
			showSettingsMenu = !0
		}
		if (isCommentMine && __indexOf.call(KD.config.permissions, "edit own comments") >= 0 || canEditComments) {
			settingsOptions.edit = !0;
			showSettingsMenu = !0
		}
		this.settings = showSettingsMenu ? this.getSettings(data, settingsOptions) : new KDView;
		this.likeView = new LikeViewClean({
			tooltipPosition: "sw",
			checkIfLikedBefore: !0
		}, data);
		this.replyView = loggedInId !== data.originId ? new ActivityActionLink({
			cssClass: "action-link reply-link",
			partial: "Mention",
			click: function (_this) {
				return function (event) {
					_this.utils.stopDOMEvent(event);
					return KD.remote.cacheable(data.originType, data.originId, function (err, res) {
						return _this.getDelegate().emit("ReplyLinkClicked", res.profile.nickname)
					})
				}
			}(this)
		}) : new KDView({
			tagName: "span"
		});
		this.timeAgoView = new KDTimeAgoView({}, data.meta.createdAt);
		KD.checkFlag("exempt") || data.on("ContentMarkedAsLowQuality", this.bound("hide"));
		data.on("ContentUnmarkedAsLowQuality", this.bound("show"));
		this.on("CommentUpdated", this.bound("updateComment"));
		this.on("CommentUpdateCancelled", this.bound("cancelCommentUpdate"))
	}
	__extends(CommentListItemView, _super);
	JView.mixin(CommentListItemView.prototype);
	CommentListItemView.prototype.updateComment = function (comment) {
		var data;
		null == comment && (comment = "");
		if ("" !== comment.trim()) {
			data = this.getData();
			return data.modify(comment, function (_this) {
				return function (err) {
					if (!err) {
						data.body = comment;
						data.editedAt = new Date;
						return _this.hideEditCommentForm(data)
					}
					_this.hideEditCommentForm(data);
					new KDNotificationView({
						title: err.message
					})
				}
			}(this))
		}
	};
	CommentListItemView.prototype.cancelCommentUpdate = function () {
		return this.hideEditCommentForm(this.getData())
	};
	CommentListItemView.prototype.hideEditCommentForm = function (data) {
		this.settings.show();
		this.editComment.destroy();
		this.body.show();
		data.getAt("editedAt") && this.editInfo.show();
		return this.editCommentWrapper.hide()
	};
	CommentListItemView.prototype.showEditCommentForm = function (data) {
		this.settings.hide();
		this.body.hide();
		this.editInfo.hide();
		this.editComment = new EditCommentForm({
			cssClass: "edit-comment-box",
			editable: !0,
			delegate: this
		}, data);
		this.editCommentWrapper.addSubView(this.editComment);
		return this.editCommentWrapper.show()
	};
	CommentListItemView.prototype.getSettings = function (data, options) {
		var button;
		return button = new KDButtonViewWithMenu({
			cssClass: "activity-settings-menu",
			style: "comment-menu",
			itemChildClass: ActivityItemMenuItem,
			title: "",
			icon: !0,
			delegate: this,
			iconClass: "arrow",
			menu: this.settingsMenu(data, options),
			callback: function () {
				return function (event) {
					return button.contextMenu(event)
				}
			}(this)
		})
	};
	CommentListItemView.prototype.getBody = function (data) {
		return new JCustomHTMLView({
			cssClass: "comment-body-container",
			pistachio: "{p{this.utils.applyTextExpansions(#(body), true)}}"
		}, data)
	};
	CommentListItemView.prototype.render = function () {
		this.getData().getAt("deletedAt") && this.emit("CommentIsDeleted");
		this.updateTemplate();
		return CommentListItemView.__super__.render.apply(this, arguments)
	};
	CommentListItemView.prototype.viewAppended = function () {
		this.updateTemplate(!0);
		return this.template.update()
	};
	CommentListItemView.prototype.click = function (event) {
		var originId, originType, _ref;
		KD.utils.showMoreClickHandler(event);
		if ($(event.target).is("span.avatar a, a.user-fullname")) {
			_ref = this.getData(), originType = _ref.originType, originId = _ref.originId;
			return KD.remote.cacheable(originType, originId, function (err, origin) {
				return err ? void 0 : KD.getSingleton("router").handleRoute("/" + origin.profile.nickname, {
					state: origin
				})
			})
		}
	};
	CommentListItemView.prototype.confirmDeleteComment = function (data) {
		var modal, type;
		type = this.getOptions().type;
		return modal = new KDModalView({
			title: "Delete " + type,
			content: "<div class='modalformline'>Are you sure you want to delete this " + type + "?</div>",
			height: "auto",
			overlay: !0,
			buttons: {
				Delete: {
					style: "modal-clean-red",
					loader: {
						color: "#ffffff",
						diameter: 16
					},
					callback: function () {
						return function () {
							return data["delete"](function (err) {
								modal.buttons.Delete.hideLoader();
								modal.destroy();
								return err ? new KDNotificationView({
									type: "mini",
									cssClass: "error editor",
									title: "Error, please try again later!"
								}) : void 0
							})
						}
					}(this)
				},
				cancel: {
					style: "modal-cancel",
					callback: function () {
						return modal.destroy()
					}
				}
			}
		})
	};
	CommentListItemView.prototype.updateTemplate = function (force) {
		var pistachio, type;
		null == force && (force = !1);
		if (this.getData().getAt("deletedAt")) {
			type = this.getOptions().type;
			this.setClass("deleted");
			pistachio = this.deleter ? "<div class='item-content-comment clearfix'><span>{{> this.author}}'s " + type + " has been deleted by {{> this.deleter}}.</span></div>" : "<div class='item-content-comment clearfix'><span>{{> this.author}}'s " + type + " has been deleted.</span></div>";
			return this.setTemplate(pistachio)
		}
		return force ? this.setTemplate(this.pistachio()) : void 0
	};
	CommentListItemView.prototype.settingsMenu = function (data, options) {
		var menu;
		null == options && (options = {});
		menu = {};
		options.edit && (menu.Edit = {
			callback: function (_this) {
				return function () {
					return _this.showEditCommentForm(data)
				}
			}(this)
		});
		options["delete"] && (menu.Delete = {
			callback: function (_this) {
				return function () {
					return _this.confirmDeleteComment(data)
				}
			}(this)
		});
		return menu
	};
	CommentListItemView.prototype.pistachio = function () {
		return "{{> this.avatar}}\n<div class='comment-contents clearfix'>\n  {{> this.author}}\n  {{> this.body}}\n  {{> this.editCommentWrapper}}\n  {{> this.editInfo}}\n  {{> this.settings}}\n  {{> this.likeView}}\n  {{> this.replyView}}\n  {{> this.timeAgoView}}\n</div>"
	};
	return CommentListItemView
}(KDListItemView);
var EditCommentForm, NewCommentForm, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
NewCommentForm = function (_super) {
	function NewCommentForm(options, data) {
		var itemTypeString;
		null == options && (options = {});
		options.type || (options.type = "new-comment");
		options.cssClass || (options.cssClass = "item-add-comment-box");
		options.itemTypeString || (options.itemTypeString = "comment");
		options.editable || (options.editable = !1);
		NewCommentForm.__super__.constructor.call(this, options, data);
		itemTypeString = this.getOptions().itemTypeString;
		data = this.getData();
		this.commentInput = new KDHitEnterInputView({
			type: "textarea",
			delegate: this,
			placeholder: "Type your " + itemTypeString + " and hit enter...",
			autogrow: !0,
			validate: {
				rules: {
					required: !0,
					maxLength: 2e3
				},
				messages: {
					required: "Please type a " + itemTypeString + "..."
				}
			},
			callback: this.bound("commentInputReceivedEnter")
		});
		this.commentFormWrapper = new KDView({
			cssClass: "item-add-comment-form"
		});
		this.commentFormWrapper.addSubView(this.commentInput)
	}
	__extends(NewCommentForm, _super);
	NewCommentForm.prototype.viewAppended = function () {
		var commenterAvatar, editable;
		editable = this.getOptions().editable;
		editable || this.addSubView(commenterAvatar = new AvatarStaticView({
			size: {
				width: 35,
				height: 35
			}
		}, KD.whoami()));
		this.addSubView(this.commentFormWrapper);
		return this.attachListeners()
	};
	NewCommentForm.prototype.attachListeners = function () {
		this.commentInput.on("blur", this.bound("commentInputReceivedBlur"));
		return this.commentInput.on("focus", function (_this) {
			return function () {
				KD.mixpanel("Comment activity, focus");
				return _this.getDelegate().emit("commentInputReceivedFocus")
			}
		}(this))
	};
	NewCommentForm.prototype.makeCommentFieldActive = function () {
		this.getDelegate().emit("commentInputReceivedFocus");
		return KD.getSingleton("windowController").setKeyView(this.commentInput)
	};
	NewCommentForm.prototype.resetCommentField = function () {
		return this.getDelegate().emit("CommentViewShouldReset")
	};
	NewCommentForm.prototype.otherCommentInputReceivedFocus = function (instance) {
		var commentForm;
		if (instance !== this.commentInput) {
			commentForm = this.commentInput.getDelegate();
			if ("" === $.trim(this.commentInput.getValue())) return commentForm.resetCommentField()
		}
	};
	NewCommentForm.prototype.commentInputReceivedBlur = function () {
		return "" === this.commentInput.getValue() ? this.resetCommentField() : void 0
	};
	NewCommentForm.prototype.commentInputReceivedEnter = function () {
		return KD.requireMembership({
			callback: function (_this) {
				return function () {
					var editable, reply;
					editable = _this.getOptions().editable;
					reply = _this.commentInput.getValue();
					_this.commentInput.setValue("");
					_this.commentInput.resize();
					_this.commentInput.blur();
					_this.commentInput.$().blur();
					editable ? _this.getDelegate().emit("CommentUpdated", reply) : _this.getDelegate().emit("CommentSubmitted", reply);
					return KD.mixpanel("Comment activity, click", reply.length)
				}
			}(this),
			onFailMsg: "Login required to post a comment!",
			tryAgain: !0,
			groupName: this.getDelegate().getData().group
		})
	};
	return NewCommentForm
}(KDView);
EditCommentForm = function (_super) {
	function EditCommentForm(options, data) {
		null == options && (options = {});
		options.editable = !0;
		EditCommentForm.__super__.constructor.call(this, options, data);
		this.commentFormWrapper.addSubView(new JCustomHTMLView({
			cssClass: "cancel-description",
			pistachio: "Press Esc to cancel"
		}));
		this.commentInput.setValue(Encoder.htmlDecode(data.body));
		this.commentInput.on("EscapePerformed", this.bound("cancel"))
	}
	__extends(EditCommentForm, _super);
	EditCommentForm.prototype.cancel = function () {
		return this.getDelegate().emit("CommentUpdateCancelled")
	};
	EditCommentForm.prototype.viewAppended = function () {
		EditCommentForm.__super__.viewAppended.apply(this, arguments);
		return KD.utils.defer(function (_this) {
			return function () {
				_this.commentInput.setFocus();
				return _this.commentInput.resize()
			}
		}(this))
	};
	return EditCommentForm
}(NewCommentForm);
var ActivityInputView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivityInputView = function (_super) {
	function ActivityInputView(options, data) {
		null == options && (options = {});
		options.cssClass = KD.utils.curry("input-view", options.cssClass);
		options.type || (options.type = "html");
		null == options.multiline && (options.multiline = !0);
		options.placeholder || (options.placeholder = "What's new " + KD.whoami().profile.firstName + "?");
		options.tokenViewClass || (options.tokenViewClass = TokenView);
		options.rules || (options.rules = {
			tag: {
				type: "tag",
				prefix: "#",
				pistachio: "#{{#(title)}}",
				dataSource: this.bound("fetchTopics")
			}
		});
		ActivityInputView.__super__.constructor.call(this, options, data);
		this.defaultTokens = initializeDefaultTokens()
	}
	var TOKEN_LIMIT, fillTokenMap, initializeDefaultTokens;
	__extends(ActivityInputView, _super);
	TOKEN_LIMIT = 5;
	ActivityInputView.prototype.fetchTopics = function (inputValue) {
		return KD.getSingleton("appManager").tell("Topics", "fetchTopics", {
			inputValue: inputValue
		}, function (_this) {
			return function (tags, deletedTags) {
				var deletedMatches, infoItem, matches;
				null == tags && (tags = []);
				null == deletedTags && (deletedTags = []);
				matches = [];
				if (inputValue.length > 1 && !/^\W+$/.test(inputValue)) {
					matches = tags.filter(function (tag) {
						return tag.title === inputValue || __indexOf.call(tag.children, inputValue) >= 0
					});
					deletedMatches = deletedTags.filter(function (title) {
						return title === inputValue
					});
					if (!matches.length) {
						infoItem = deletedMatches.length ? {
							$deleted: inputValue
						} : {
							$suggest: inputValue
						};
						tags = [infoItem].concat(tags)
					}
				}
				return _this.showMenu({
					itemChildClass: TagContextMenuItem
				}, tags)
			}
		}(this))
	};
	ActivityInputView.prototype.menuItemClicked = function (item) {
		var tokenViewClass;
		item.data.$suggest && (tokenViewClass = SuggestedTokenView);
		return ActivityInputView.__super__.menuItemClicked.call(this, item, tokenViewClass)
	};
	ActivityInputView.prototype.setDefaultTokens = function (defaultTokens) {
		null == defaultTokens && (defaultTokens = {});
		this.defaultTokens = initializeDefaultTokens();
		return fillTokenMap(defaultTokens.tags, this.defaultTokens.tags)
	};
	initializeDefaultTokens = function () {
		return {
			tags: {}
		}
	};
	ActivityInputView.prototype.setContent = function (content, activity) {
		var tokens, _ref;
		tokens = this.defaultTokens || initializeDefaultTokens();
		(null != activity && null != (_ref = activity.tags) ? _ref.length : void 0) && fillTokenMap(activity.tags, tokens.tags);
		return ActivityInputView.__super__.setContent.call(this, this.renderTokens(content, tokens))
	};
	ActivityInputView.prototype.sanitizeInput = function () {
		var newval, prefix, value, words;
		prefix = this.activeRule.prefix;
		value = this.tokenInput.textContent.substring(prefix.length);
		words = value.split(/\W/, 3);
		if ("" !== words.join("")) {
			newval = prefix + words.join("-");
			this.tokenInput.textContent = newval;
			return this.utils.selectText(this.tokenInput, 1)
		}
	};
	ActivityInputView.prototype.selectToken = function () {
		var prefix, token, tokens, value, _i, _len;
		if (this.menu) {
			prefix = this.activeRule.prefix;
			value = this.tokenInput.textContent.substring(prefix.length).toLowerCase();
			tokens = this.menu.getData().filter(this.getTokenFilter());
			for (_i = 0, _len = tokens.length; _len > _i; _i++) {
				token = tokens[_i];
				if (value === token.title.toLowerCase()) {
					this.addToken(token, this.getOptions().tokenViewClass);
					this.hideMenu();
					return !0
				}
			}
		}
	};
	ActivityInputView.prototype.keyDown = function (event) {
		ActivityInputView.__super__.keyDown.apply(this, arguments);
		if (!event.isPropagationStopped()) {
			switch (event.which) {
			case 27:
				this.emit("Escape")
			}
			if (/\W/.test(String.fromCharCode(event.which))) {
				if (this.tokenInput && /^\W+$/.test(this.tokenInput.textContent)) return this.cancel();
				if (this.selectToken()) return KD.utils.stopDOMEvent(event)
			}
		}
	};
	ActivityInputView.prototype.keyUp = function () {
		return this.getTokens().length >= TOKEN_LIMIT ? void 0 : ActivityInputView.__super__.keyUp.apply(this, arguments)
	};
	ActivityInputView.prototype.focus = function () {
		var childNodes, content, value;
		if (!this.focused) {
			ActivityInputView.__super__.focus.apply(this, arguments);
			value = this.getValue();
			if (!value) {
				content = this.prefixDefaultTokens();
				if (!content) return;
				this.setContent(content);
				childNodes = this.getEditableElement().childNodes;
				return this.utils.selectEnd(childNodes[childNodes.length - 1])
			}
		}
	};
	ActivityInputView.prototype.prefixDefaultTokens = function () {
		var constructorName, content, key, prefix, token, tokens, type, _ref;
		content = "";
		_ref = this.defaultTokens;
		for (type in _ref)
			if (__hasProp.call(_ref, type)) {
				tokens = _ref[type];
				switch (type) {
				case "tags":
					prefix = "#";
					constructorName = "JTag";
					break;
				default:
					continue
				}
				for (key in tokens) {
					token = tokens[key];
					content += "|" + prefix + ":" + constructorName + ":" + token.getId() + "|&nbsp;"
				}
			}
		return content
	};
	ActivityInputView.prototype.renderTokens = function (content, tokens) {
		null == tokens && (tokens = {});
		return content.replace(/\|(.*?):(.*?):(.*?):(.*?)\|/g, function (_this) {
			return function (match, prefix, constructorName, id) {
				var data, itemClass, pistachio, tokenKey, tokenView, type;
				switch (prefix) {
				case "#":
					itemClass = TagLinkView;
					type = "tag";
					pistachio = "" + prefix + "{{#(title)}}";
					data = tokens.tags[id]
				}
				tokenView = new TokenView({
					itemClass: itemClass,
					prefix: prefix,
					type: type,
					pistachio: pistachio
				}, data);
				tokenKey = "" + tokenView.getId() + "-" + tokenView.getKey();
				_this.tokenViews[tokenKey] = tokenView;
				tokenView.setAttributes({
					"data-key": tokenKey
				});
				tokenView.emit("viewAppended");
				return tokenView.getElement().outerHTML
			}
		}(this))
	};
	ActivityInputView.prototype.getTokenFilter = function () {
		switch (this.activeRule.prefix) {
		case "#":
			return function (token) {
				return token instanceof KD.remote.api.JTag
			};
		default:
			return noop
		}
	};
	fillTokenMap = function (tokens, map) {
		return tokens.forEach(function (token) {
			return map[token.getId()] = token
		})
	};
	return ActivityInputView
}(KDTokenizedInput);
var ActivityEditWidget, ActivityInputWidget, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivityInputWidget = function (_super) {
	function ActivityInputWidget(options, data) {
		null == options && (options = {});
		options.cssClass = KD.utils.curry("activity-input-widget", options.cssClass);
		ActivityInputWidget.__super__.constructor.call(this, options, data);
		null == options.destroyOnSubmit && (options.destroyOnSubmit = !1);
		this.input = new ActivityInputView({
			defaultValue: options.defaultValue
		});
		this.input.on("Escape", this.bound("reset"));
		this.input.on("TokenAdded", function (_this) {
			return function (type, token) {
				if ("bug" === token.slug && "tag" === type) {
					_this.bugNotification.show();
					return _this.setClass("bug-tagged")
				}
			}
		}(this));
		this.input.on("keyup", function (_this) {
			return function () {
				var val;
				val = _this.input.getValue();
				_this.checkForCommonQuestions(val);
				if (-1 === val.indexOf("5051003840118f872e001b91")) {
					_this.unsetClass("bug-tagged");
					return _this.bugNotification.hide()
				}
			}
		}(this));
		this.on("ActivitySubmitted", function (_this) {
			return function () {
				_this.unsetClass("bug-tagged");
				return _this.bugNotification.once("transitionend", function () {
					return _this.bugNotification.hide()
				})
			}
		}(this));
		this.embedBox = new EmbedBoxWidget({
			delegate: this.input
		}, data);
		this.submitButton = new KDButtonView({
			type: "submit",
			cssClass: "solid green",
			iconOnly: !0,
			loader: !0,
			callback: this.bound("submit")
		});
		this.avatar = new AvatarView({
			size: {
				width: 35,
				height: 35
			}
		}, KD.whoami());
		this.bugNotification = new KDCustomHTMLView({
			cssClass: "bug-notification",
			partial: '<figure></figure>Posts tagged with <strong>#bug</strong>  will be moved to <a href="/Bugs" target="_blank">Bug Tracker</a>.'
		});
		this.bugNotification.hide();
		this.bugNotification.bindTransitionEnd();
		this.previewIcon = new KDCustomHTMLView({
			tagName: "span",
			cssClass: "preview-icon",
			tooltip: {
				title: "Markdown preview"
			},
			click: function (_this) {
				return function () {
					return _this.preview ? _this.hidePreview() : _this.showPreview()
				}
			}(this)
		});
		this.helpContainer = new KDCustomHTMLView({
			cssClass: "help-container hidden",
			partial: "Need help with:"
		});
		this.currentHelperNames = []
	}
	var daisy, dash, helpMap;
	__extends(ActivityInputWidget, _super);
	daisy = Bongo.daisy, dash = Bongo.dash;
	helpMap = {
		mysql: {
			niceName: "MySQL",
			tooltip: {
				title: "Open your terminal and type <code>help mysql</code>"
			}
		},
		phpmyadmin: {
			niceName: "phpMyAdmin",
			tooltip: {
				title: "Open your terminal and type <code>help phpmyadmin</code>"
			}
		},
		"vm size": {
			pattern: "vm\\ssize|vm\\sconfig",
			niceName: "VM config",
			tooltip: {
				title: "Open your terminal and type <code>help specs</code>"
			}
		},
		"vm down": {
			pattern: "vm\\sdown|vm\\snot\\sworking|vm\\sis\\snot\\sworking",
			niceName: "non-working VM",
			tooltip: {
				title: "You can go to your environments and try to restart your VM"
			}
		},
		help: {
			niceName: "Help!!!",
			tooltip: {
				title: "You don't need to type help in your post, just ask your question."
			}
		},
		wordpress: {
			niceName: "WordPress",
			link: "http://learn.koding.com/?s=wordpress"
		}
	};
	ActivityInputWidget.prototype.checkForCommonQuestions = KD.utils.throttle(200, function (val) {
		var item, keyword, match, matches, pattern, _i, _len, _results;
		this.hideAllHelpers();
		pattern = RegExp("" + function () {
			var _i, _len, _ref, _results;
			_ref = Object.keys(helpMap);
			_results = [];
			for (_i = 0, _len = _ref.length; _len > _i; _i++) {
				item = _ref[_i];
				_results.push(helpMap[item].pattern || item)
			}
			return _results
		}().join("|"), "gi");
		match = pattern.exec(val);
		matches = [];
		for (; null !== match;) {
			match && matches.push(match[0]);
			match = pattern.exec(val)
		}
		_results = [];
		for (_i = 0, _len = matches.length; _len > _i; _i++) {
			keyword = matches[_i];
			_results.push(this.addHelper(keyword))
		}
		return _results
	});
	ActivityInputWidget.prototype.addHelper = function (val) {
		var Klass, item, key, link, niceName, options, tooltip, _ref;
		this.helpContainer.show();
		if (!helpMap[val.toLowerCase()])
			for (key in helpMap)
				if (__hasProp.call(helpMap, key)) {
					item = helpMap[key];
					if (item.pattern && RegExp("" + item.pattern, "i").test(val)) {
						val = key;
						break
					}
				}
		if (!(__indexOf.call(this.currentHelperNames, val) >= 0)) {
			_ref = helpMap[val.toLowerCase()], niceName = _ref.niceName, link = _ref.link, tooltip = _ref.tooltip;
			Klass = KDCustomHTMLView;
			options = {
				tagName: "span",
				partial: niceName
			};
			if (tooltip) {
				options.tooltip = _.extend({}, tooltip);
				options.tooltip.cssClass = "activity-helper";
				options.tooltip.placement = "bottom"
			}
			if (link) {
				Klass = CustomLinkView;
				options.tagName = "a";
				options.title = niceName;
				options.href = link || "#";
				options.target = "/" !== (null != link ? link[0] : void 0) ? "_blank" : ""
			}
			this.helpContainer.addSubView(new Klass(options));
			return this.currentHelperNames.push(val)
		}
	};
	ActivityInputWidget.prototype.hideAllHelpers = function () {
		this.helpContainer.hide();
		this.helpContainer.destroySubViews();
		return this.currentHelperNames = []
	};
	ActivityInputWidget.prototype.submit = function (callback) {
		var JTag, activity, app, createdTags, data, dockItem, dockItems, feedType, queue, suggestedTags, tags, token, type, value, _i, _len, _ref, _ref1, _ref2, _ref3;
		if (!(value = this.input.getValue().trim())) return this.reset(!0);
		JTag = KD.remote.api.JTag;
		activity = this.getData();
		null != activity && (activity.tags = []);
		tags = [];
		suggestedTags = [];
		createdTags = {};
		feedType = "";
		app = this.getOptions().app;
		_ref = this.input.getTokens();
		for (_i = 0, _len = _ref.length; _len > _i; _i++) {
			token = _ref[_i];
			"bug" === (null != (_ref1 = token.data) && null != (_ref2 = _ref1.title) ? _ref2.toLowerCase() : void 0) && (feedType = "bug");
			data = token.data, type = token.type;
			if ("tag" === type)
				if (data instanceof JTag) {
					tags.push({
						id: data.getId()
					});
					null != activity && activity.tags.push(data)
				} else data.$suggest && (_ref3 = data.$suggest, __indexOf.call(suggestedTags, _ref3) < 0) && suggestedTags.push(data.$suggest)
		}
		queue = [
			function () {
				var tagCreateJobs;
				tagCreateJobs = suggestedTags.map(function (title) {
					return function () {
						return JTag.create({
							title: title
						}, function (err, tag) {
							if (err) return KD.showError(err);
							null != activity && activity.tags.push(tag);
							tags.push({
								id: tag.getId()
							});
							createdTags[title] = tag;
							return tagCreateJobs.fin()
						})
					}
				});
				return dash(tagCreateJobs, function () {
					return queue.next()
				})
			},
			function (_this) {
				return function () {
					var body, fn;
					body = _this.encodeTagSuggestions(value, createdTags);
					data = {
						group: KD.getSingleton("groupsController").getGroupSlug(),
						body: body,
						meta: {
							tags: tags
						},
						feedType: feedType
					};
					data.link_url = _this.embedBox.url || "";
					data.link_embed = _this.embedBox.getDataForSubmit() || {};
					_this.lockSubmit();
					fn = _this.bound(activity ? "update" : "create");
					return fn(data, function (err, activity) {
						var _ref4;
						_this.reset(!0);
						_this.embedBox.resetEmbedAndHide();
						_this.emit("Submit", err, activity);
						"function" == typeof callback && callback(err, activity);
						return KD.mixpanel("Status update create, success", {
							length: null != activity && null != (_ref4 = activity.body) ? _ref4.length : void 0
						})
					})
				}
			}(this)
		];
		"bug" === app && queue.unshift(function () {
			return function () {
				return KD.remote.api.JTag.one({
					slug: "bug"
				}, function (err, tag) {
					if (err) KD.showError(err);
					else {
						feedType = "bug";
						value += " " + KD.utils.tokenizeTag(tag);
						tags.push({
							id: tag.getId()
						})
					}
					return queue.next()
				})
			}
		}(this));
		daisy(queue);
		dockItems = KD.singletons.dock.getItems();
		dockItem = dockItems.filter(function (item) {
			return "Bugs" === item.data.title
		});
		"bug" === feedType && 0 === dockItem.length && KD.singletons.dock.addItem({
			title: "Bugs",
			path: "/Bugs",
			order: 60
		});
		return this.emit("ActivitySubmitted")
	};
	ActivityInputWidget.prototype.encodeTagSuggestions = function (str, tags) {
		return str.replace(/\|(.*?):\$suggest:(.*?)\|/g, function (match, prefix, title) {
			var tag;
			tag = tags[title];
			return tag ? "|" + prefix + ":JTag:" + tag.getId() + ":" + title + "|" : ""
		})
	};
	ActivityInputWidget.prototype.create = function (data, callback) {
		return KD.remote.api.JNewStatusUpdate.create(data, function (_this) {
			return function (err, activity) {
				err || _this.reset();
				"function" == typeof callback && callback(err, activity);
				KD.showError(err, {
					AccessDenied: {
						title: "You are not allowed to post activities",
						content: "This activity will only be visible to you",
						duration: 5e3
					},
					KodingError: "Something went wrong while creating activity"
				});
				return KD.getSingleton("badgeController").checkBadge({
					property: "statusUpdates",
					relType: "author",
					source: "JNewStatusUpdate",
					targetSelf: 1
				})
			}
		}(this))
	};
	ActivityInputWidget.prototype.update = function (data, callback) {
		var activity;
		activity = this.getData();
		return activity ? activity.modify(data, function (_this) {
			return function (err) {
				KD.showError(err);
				err || _this.reset();
				"function" == typeof callback && callback(err);
				return KD.mixpanel("Status update edit, success")
			}
		}(this)) : this.reset()
	};
	ActivityInputWidget.prototype.reset = function (lock) {
		null == lock && (lock = !0);
		this.input.setContent("");
		this.input.blur();
		this.embedBox.resetEmbedAndHide();
		return lock ? this.unlockSubmit() : KD.utils.wait(8e3, this.bound("unlockSubmit"))
	};
	ActivityInputWidget.prototype.lockSubmit = function () {
		this.submitButton.disable();
		return this.submitButton.showLoader()
	};
	ActivityInputWidget.prototype.unlockSubmit = function () {
		this.submitButton.enable();
		return this.submitButton.hideLoader()
	};
	ActivityInputWidget.prototype.showPreview = function () {
		var markedValue, tags, tagsExpanded, value;
		if (value = this.input.getValue().trim()) {
			markedValue = KD.utils.applyMarkdown(value);
			if (markedValue.trim() !== "<p>" + value + "</p>") {
				tags = this.input.getTokens().map(function (token) {
					return "tag" === token.type ? token.data : void 0
				});
				tagsExpanded = this.utils.expandTokens(markedValue, {
					tags: tags
				});
				if (this.preview) this.preview.updatePartial(tagsExpanded);
				else {
					this.preview = new KDCustomHTMLView({
						cssClass: "update-preview",
						partial: tagsExpanded,
						click: function (_this) {
							return function () {
								return _this.hidePreview()
							}
						}(this)
					});
					this.input.addSubView(this.preview)
				}
				return this.setClass("preview-active")
			}
		}
	};
	ActivityInputWidget.prototype.hidePreview = function () {
		this.preview.destroy();
		this.preview = null;
		return this.unsetClass("preview-active")
	};
	ActivityInputWidget.prototype.viewAppended = function () {
		this.addSubView(this.avatar);
		this.addSubView(this.input);
		this.addSubView(this.embedBox);
		this.addSubView(this.bugNotification);
		this.addSubView(this.helpContainer);
		this.input.addSubView(this.submitButton);
		this.input.addSubView(this.previewIcon);
		return KD.isLoggedIn() ? void 0 : this.hide()
	};
	return ActivityInputWidget
}(KDView);
ActivityEditWidget = function (_super) {
	function ActivityEditWidget(options, data) {
		null == options && (options = {});
		options.cssClass = KD.utils.curry("edit-widget", options.cssClass);
		options.destroyOnSubmit = !0;
		ActivityEditWidget.__super__.constructor.call(this, options, data);
		this.submitButton = new KDButtonView({
			type: "submit",
			cssClass: "solid green",
			iconOnly: !1,
			loader: !0,
			title: "Done editing",
			callback: this.bound("submit")
		});
		this.cancelButton = new KDButtonView({
			cssClass: "solid gray",
			title: "Cancel",
			callback: function (_this) {
				return function () {
					return _this.emit("Cancel")
				}
			}(this)
		})
	}
	__extends(ActivityEditWidget, _super);
	ActivityEditWidget.prototype.viewAppended = function () {
		var body, content, data, line, link, _i, _len, _ref;
		data = this.getData();
		body = data.body, link = data.link;
		content = "";
		_ref = body.split("\n");
		for (_i = 0, _len = _ref.length; _len > _i; _i++) {
			line = _ref[_i];
			content += "<div>" + Encoder.htmlEncode(line) + "&nbsp;</div>"
		}
		this.input.setContent(content, data);
		link && this.embedBox.loadEmbed(link.link_url);
		this.addSubView(this.input);
		this.addSubView(this.embedBox);
		this.input.addSubView(this.submitButton);
		return this.input.addSubView(this.cancelButton)
	};
	return ActivityEditWidget
}(ActivityInputWidget);
var ActivitySettingsView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivitySettingsView = function (_super) {
	function ActivitySettingsView(options, data) {
		var account, activityController, button;
		null == options && (options = {});
		null == data && (data = {});
		ActivitySettingsView.__super__.constructor.call(this, options, data);
		data = this.getData();
		account = KD.whoami();
		this.settings = data.originId === account.getId() || KD.checkFlag("super-admin") || KD.hasAccess("delete posts") ? button = new KDButtonViewWithMenu({
			cssClass: "activity-settings-menu",
			itemChildClass: ActivityItemMenuItem,
			title: "",
			icon: !0,
			delegate: this,
			iconClass: "arrow",
			menu: this.settingsMenu(data),
			style: "resurrection",
			callback: function () {
				return function (event) {
					return button.contextMenu(event)
				}
			}(this)
		}) : new KDCustomHTMLView({
			tagName: "span",
			cssClass: "hidden"
		});
		activityController = KD.getSingleton("activityController")
	}
	__extends(ActivitySettingsView, _super);
	ActivitySettingsView.prototype.settingsMenu = function (post) {
		var account, activityController, menu;
		account = KD.whoami();
		activityController = KD.getSingleton("activityController");
		menu = {};
		if (post.originId === account.getId()) {
			menu["Edit Post"] = {
				callback: function (_this) {
					return function () {
						return _this.emit("ActivityEditIsClicked")
					}
				}(this)
			};
			menu["Delete Post"] = {
				callback: function (_this) {
					return function () {
						return _this.confirmDeletePost(post)
					}
				}(this)
			}
		}
		if (KD.checkFlag("super-admin") || KD.hasAccess("delete posts")) {
			KD.checkFlag("exempt", account) ? menu["Unmark User as Troll"] = {
				callback: function () {
					return activityController.emit("ActivityItemUnMarkUserAsTrollClicked", post)
				}
			} : menu["Mark User as Troll"] = {
				callback: function () {
					return activityController.emit("ActivityItemMarkUserAsTrollClicked", post)
				}
			};
			menu["Delete Post"] = {
				callback: function (_this) {
					return function () {
						return _this.confirmDeletePost(post)
					}
				}(this)
			};
			menu["Edit Post"] = {
				callback: function (_this) {
					return function () {
						return _this.emit("ActivityEditIsClicked")
					}
				}(this)
			};
			menu["Block User"] = {
				callback: function () {
					return activityController.emit("ActivityItemBlockUserClicked", post.originId)
				}
			};
			menu["Add System Tag"] = {
				callback: function (_this) {
					return function () {
						return _this.selectSystemTag(post)
					}
				}(this)
			};
			menu.Impersonate = {
				callback: function () {
					return KD.remote.cacheable(post.originType, post.originId, function (err, owner) {
						return err ? KD.showError(err) : owner ? KD.impersonate(owner.profile.nickname) : KD.showError({
							message: "Account not found"
						})
					})
				}
			}
		}
		return menu
	};
	ActivitySettingsView.prototype.viewAppended = function () {
		return this.addSubView(this.settings)
	};
	ActivitySettingsView.prototype.confirmDeletePost = function (post) {
		var modal;
		modal = new KDModalView({
			title: "Delete post",
			content: "<div class='modalformline'>Are you sure you want to delete this post?</div>",
			height: "auto",
			overlay: !0,
			buttons: {
				Delete: {
					style: "modal-clean-red",
					loader: {
						color: "#ffffff",
						diameter: 16
					},
					callback: function (_this) {
						return function () {
							if (!post.fake) return post["delete"](function (err) {
								modal.buttons.Delete.hideLoader();
								modal.destroy();
								return err ? new KDNotificationView({
									type: "mini",
									cssClass: "error editor",
									title: "Error, please try again later!"
								}) : _this.emit("ActivityIsDeleted")
							});
							_this.emit("ActivityIsDeleted");
							modal.buttons.Delete.hideLoader();
							modal.destroy()
						}
					}(this)
				},
				Cancel: {
					style: "modal-cancel",
					title: "cancel",
					callback: function () {
						return modal.destroy()
					}
				}
			}
		});
		return modal.buttons.Delete.blur()
	};
	ActivitySettingsView.prototype.selectSystemTag = function (post) {
		var modal, postSystemTags, postUserTags, tag, _ref;
		postSystemTags = [];
		postUserTags = [];
		if ((null != (_ref = post.tags) ? _ref.length : void 0) > 0) {
			postSystemTags = function () {
				var _i, _len, _ref1, _results;
				_ref1 = post.tags;
				_results = [];
				for (_i = 0, _len = _ref1.length; _len > _i; _i++) {
					tag = _ref1[_i];
					"system-tag" === tag.category && _results.push(tag.slug)
				}
				return _results
			}();
			postUserTags = function () {
				var _i, _len, _ref1, _results;
				_ref1 = post.tags;
				_results = [];
				for (_i = 0, _len = _ref1.length; _len > _i; _i++) {
					tag = _ref1[_i];
					"user-tag" === tag.category && _results.push(tag.slug)
				}
				return _results
			}()
		}
		modal = new KDModalView({
			title: "Add tags to status update.",
			height: "auto",
			overlay: !1,
			buttons: {
				Cancel: {
					style: "modal-cancel",
					title: "cancel",
					callback: function () {
						return modal.destroy()
					}
				}
			}
		});
		this.changeLogTagSwitch = new KodingSwitch({
			cssClass: "dark",
			defaultValue: __indexOf.call(postSystemTags, "changelog") >= 0,
			callback: function (_this) {
				return function (state) {
					return _this.tagStateChanged(state, "changelog", post)
				}
			}(this)
		});
		this.bugTagSwitch = new KodingSwitch({
			cssClass: "dark",
			defaultValue: __indexOf.call(postUserTags, "bug") >= 0,
			callback: function (_this) {
				return function (state) {
					return _this.tagStateChanged(state, "bug", post)
				}
			}(this)
		});
		modal.addSubView(new KDLabelView({
			title: "ChangeLog"
		}));
		modal.addSubView(this.changeLogTagSwitch);
		modal.addSubView(new KDLabelView({
			title: "Bug"
		}));
		return modal.addSubView(this.bugTagSwitch)
	};
	ActivitySettingsView.prototype.tagStateChanged = function (state, tagto, post) {
		var JTag;
		JTag = KD.remote.api.JTag;
		return JTag.one({
			slug: tagto
		}, function (_this) {
			return function (err, tag) {
				return state ? _this.addTagToPost(post, tag) : _this.removeTagFromPost(post, tag)
			}
		}(this))
	};
	ActivitySettingsView.prototype.removeTagFromPost = function (activity, tagToRemove) {
		var body, index, options, stringToRemove, tags;
		if (!tagToRemove) return new KDNotificationView({
			title: "Tag not found!"
		});
		tags = activity.tags, body = activity.body;
		stringToRemove = this.utils.tokenizeTag(tagToRemove);
		body = body.replace(stringToRemove, "");
		index = tags.indexOf(tagToRemove);
		tags.splice(index, 1);
		options = {
			body: body,
			meta: {
				tags: tags
			}
		};
		"bug" === tagToRemove.title && (options.feedType = "");
		return activity.modify(options, function (err) {
			return err ? KD.showError(err) : void 0
		})
	};
	ActivitySettingsView.prototype.addTagToPost = function (activity, tagToAdd) {
		var body, newTags, options, tag, tags, _i, _len;
		if (!tagToAdd) return new KDNotificationView({
			title: "Tag not found!"
		});
		tags = activity.tags, body = activity.body;
		newTags = [];
		body += this.utils.tokenizeTag(tagToAdd);
		if ((null != tags ? tags.length : void 0) > 0)
			for (_i = 0, _len = tags.length; _len > _i; _i++) {
				tag = tags[_i];
				newTags.push({
					id: tag.getId()
				})
			}
		newTags.push({
			id: tagToAdd.getId()
		});
		options = {
			body: body,
			meta: {
				tags: newTags
			}
		};
		"bug" === tagToAdd.title && (options.feedType = "bug");
		return activity.modify(options, function (err) {
			return err ? KD.showError(err) : void 0
		})
	};
	return ActivitySettingsView
}(KDCustomHTMLView);
var ActivityUpdateWidgetController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityUpdateWidgetController = function (_super) {
	function ActivityUpdateWidgetController() {
		return ActivityUpdateWidgetController.__super__.constructor.apply(this, arguments)
	}
	var notifySubmissionStopped, stopSubmission, submissionStopped;
	__extends(ActivityUpdateWidgetController, _super);
	submissionStopped = !1;
	notifySubmissionStopped = function () {};
	stopSubmission = function () {};
	ActivityUpdateWidgetController.prototype.loadView = function (mainView) {
		var activityController, paneMap, switchForEditView, widgetController;
		activityController = KD.getSingleton("activityController");
		paneMap = [{
			name: "statusUpdatePane",
			paneName: "update",
			cssClass: "status-widget",
			constructorName: "JNewStatusUpdate",
			widgetName: "updateWidget",
			widgetType: ActivityStatusUpdateWidget
		}];
		widgetController = this;
		paneMap.forEach(function (_this) {
			return function (pane) {
				return _this[pane.name] = mainView.addWidgetPane({
					paneName: pane.paneName,
					mainContent: _this[pane.widgetName] = new pane.widgetType({
						pane: pane,
						cssClass: pane.cssClass || "" + pane.paneName + "-widget",
						callback: function (formData) {
							var _ref;
							if (submissionStopped) return notifySubmissionStopped();
							widgetController.widgetSubmit(formData, this.getOptions().pane.constructorName, stopSubmission);
							"JNewStatusUpdate" === (_ref = this.getOptions().pane.constructorName) && widgetController[this.getOptions().pane.widgetName].switchToSmallView();
							return mainView.resetWidgets()
						}
					})
				})
			}
		}(this));
		mainView.showPane("update");
		this.codeSnippetPane.on("PaneDidShow", function (_this) {
			return function () {
				return _this.codeWidget.widgetShown()
			}
		}(this));
		switchForEditView = function (_this) {
			return function (type, data, fake) {
				null == fake && (fake = !1);
				switch (type) {
				case "JNewStatusUpdate":
					mainView.showPane("update");
					return _this.updateWidget.switchToEditView(data, fake)
				}
			}
		}(this);
		this.on("editFromFakeData", function () {
			return function (fakeData) {
				return switchForEditView(fakeData.fakeType, fakeData, !0)
			}
		}(this));
		return KD.getSingleton("mainController").on("ActivityItemEditLinkClicked", function () {
			return function (activity) {
				KD.getSingleton("appManager").open("Activity");
				mainView.setClass("edit-mode");
				return switchForEditView(activity.bongo_.constructorName, activity)
			}
		}(this))
	};
	ActivityUpdateWidgetController.prototype.widgetSubmit = function (data, constructorName, callback) {
		var activity, field, key, updateTimeout, _ref, _ref1;
		for (key in data)
			if (__hasProp.call(data, key)) {
				field = data[key];
				_.isString(field) && (data[key] = field.replace(/&quot;/g, '"'))
			}
		KD.checkFlag("exempt") && null != (_ref = data.meta) && (_ref.tags = []);
		if (data.activity) {
			activity = data.activity;
			delete data.activity;
			return activity.modify(data, function () {
				return function (err, res) {
					"function" == typeof callback && callback(err, res);
					return new KDNotificationView(err ? {
						type: "mini",
						title: err.message
					} : {
						type: "mini",
						title: "Updated successfully"
					})
				}
			}(this))
		}
		updateTimeout = this.utils.wait(2e4, function (_this) {
			return function () {
				return _this.emit("OwnActivityHasFailed", data)
			}
		}(this));
		data.group = KD.getSingleton("groupsController").getGroupSlug();
		return null != (_ref1 = KD.remote.api[constructorName]) ? _ref1.create(data, function (_this) {
			return function (err, activity) {
				"function" == typeof callback && callback(err, activity);
				KD.showError(err, {
					AccessDenied: {
						title: "You are not allowed to create activities",
						content: "This activity will only be visible to you",
						duration: 5e3
					},
					KodingError: "Something went wrong while creating activity"
				});
				if (err) return _this.emit("OwnActivityHasFailed", data);
				_this.utils.killWait(updateTimeout);
				return _this.emit("OwnActivityHasArrived", activity)
			}
		}(this)) : void 0
	};
	return ActivityUpdateWidgetController
}(KDViewController);
var ActivityUpdateWidget, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityUpdateWidget = function (_super) {
	function ActivityUpdateWidget(options, data) {
		null == options && (options = {});
		options.domId = "activity-update-widget";
		options.cssClass = "activity-update-widget-wrapper";
		ActivityUpdateWidget.__super__.constructor.call(this, options, data);
		this.windowController = KD.getSingleton("windowController")
	}
	__extends(ActivityUpdateWidget, _super);
	ActivityUpdateWidget.prototype.setMainSections = function () {
		var widgetWrapper;
		this.updatePartial("");
		this.addSubView(widgetWrapper = new KDView({
			cssClass: "widget-holder clearfix"
		}));
		widgetWrapper.addSubView(this.widgetButton = new WidgetButton(this.widgetOptions()));
		widgetWrapper.addSubView(this.mainInputTabs = new KDTabView({
			height: "auto",
			cssClass: "update-widget-tabs"
		}));
		this.mainInputTabs.hideHandleContainer();
		this.on("WidgetTabChanged", function (_this) {
			return function () {
				return _this.windowController.addLayer(_this.mainInputTabs)
			}
		}(this));
		this.mainInputTabs.on("ResetWidgets", function (_this) {
			return function (isHardReset) {
				return _this.resetWidgets(isHardReset)
			}
		}(this));
		return this.mainInputTabs.on("ReceivedClickElsewhere", function (_this) {
			return function (event) {
				return $(event.target).closest(".activity-status-context").length > 0 || $(event.target).closest(".kdmodal").length > 0 ? void 0 : _this.resetWidgets()
			}
		}(this))
	};
	ActivityUpdateWidget.prototype.resetWidgets = function (isHardReset) {
		this.windowController.removeLayer(this.mainInputTabs);
		this.unsetClass("edit-mode");
		this.changeTab("update", "Status Update");
		return this.mainInputTabs.emit("MainInputTabsReset", isHardReset)
	};
	ActivityUpdateWidget.prototype.addWidgetPane = function (options) {
		var main, mainContent, paneName;
		paneName = options.paneName, mainContent = options.mainContent;
		this.mainInputTabs.addPane(main = new KDTabPaneView({
			name: paneName
		}));
		null != mainContent && main.addSubView(mainContent);
		return main
	};
	ActivityUpdateWidget.prototype.changeTab = function (tabName) {
		this.showPane(tabName);
		return this.emit("WidgetTabChanged", tabName)
	};
	ActivityUpdateWidget.prototype.showPane = function (paneName) {
		return this.mainInputTabs.showPane(this.mainInputTabs.getPaneByName(paneName))
	};
	ActivityUpdateWidget.prototype.viewAppended = function () {
		this.setMainSections();
		return ActivityUpdateWidget.__super__.viewAppended.apply(this, arguments)
	};
	ActivityUpdateWidget.prototype._windowDidResize = function () {
		var width;
		width = this.getWidth();
		return this.$(".form-headline, form.status-update-input").width(width - 185)
	};
	ActivityUpdateWidget.prototype.widgetOptions = function () {
		return {
			delegate: this,
			items: {
				"Status Update": {
					type: "update"
				},
				"Blog Post": {
					type: "blogpost"
				},
				"Code Snip": {
					type: "codesnip"
				},
				Discussion: {
					type: "discussion",
					disabled: !0
				},
				Tutorial: {
					type: "tutorial",
					disabled: !0
				}
			}
		}
	};
	return ActivityUpdateWidget
}(KDView);
var WidgetButton, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
WidgetButton = function (_super) {
	function WidgetButton(options) {
		options.cssClass = "update-type-select-icons";
		WidgetButton.__super__.constructor.call(this, options)
	}
	__extends(WidgetButton, _super);
	WidgetButton.prototype.viewAppended = function () {
		var content, delegate, icon, items, title, _ref, _results;
		_ref = this.getOptions(), items = _ref.items, delegate = _ref.delegate;
		_results = [];
		for (title in items)
			if (__hasProp.call(items, title)) {
				content = items[title];
				this.addSubView(icon = new KDCustomHTMLView({
					cssClass: "" + this.utils.slugify(content.type),
					type: content.type,
					title: title,
					click: function () {
						return delegate.changeTab(this.getOption("type"), this.getOption("title"))
					}
				}));
				_results.push(content.disabled ? icon.setClass("hidden") : void 0)
			}
		return _results
	};
	return WidgetButton
}(KDCustomHTMLView);
var ActivityWidgetFormView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityWidgetFormView = function (_super) {
	function ActivityWidgetFormView(options, data) {
		ActivityWidgetFormView.__super__.constructor.apply(this, arguments);
		this.labelAddTags = new KDLabelView({
			title: "Add Tags:"
		});
		this.selectedItemWrapper = new KDCustomHTMLView({
			tagName: "div",
			cssClass: "tags-selected-item-wrapper clearfix"
		});
		this.tagController = new TagAutoCompleteController({
			name: "meta.tags",
			type: "tags",
			itemClass: TagAutoCompleteItemView,
			selectedItemClass: TagAutoCompletedItemView,
			outputWrapper: this.selectedItemWrapper,
			selectedItemsLimit: 5,
			listWrapperCssClass: "tags",
			itemDataPath: "title",
			form: this,
			dataSource: function (_this) {
				return function (args, callback) {
					var blacklist, inputValue, updateWidget;
					inputValue = args.inputValue;
					updateWidget = _this.getDelegate();
					blacklist = function () {
						var _i, _len, _ref, _results;
						_ref = this.tagController.getSelectedItemData();
						_results = [];
						for (_i = 0, _len = _ref.length; _len > _i; _i++) {
							data = _ref[_i];
							"function" == typeof data.getId && _results.push(data.getId())
						}
						return _results
					}.call(_this);
					return KD.getSingleton("appManager").tell("Topics", "fetchTopics", {
						inputValue: inputValue,
						blacklist: blacklist
					}, callback)
				}
			}(this)
		});
		this.tagAutoComplete = this.tagController.getView()
	}
	__extends(ActivityWidgetFormView, _super);
	JView.mixin(ActivityWidgetFormView.prototype);
	return ActivityWidgetFormView
}(KDFormView);
var ActivityStatusUpdateWidget, InfoBox, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivityStatusUpdateWidget = function (_super) {
	function ActivityStatusUpdateWidget(options, data) {
		var decodedName, embedOptions, name;
		ActivityStatusUpdateWidget.__super__.constructor.apply(this, arguments);
		name = KD.utils.getFullnameFromAccount(KD.whoami(), !0);
		decodedName = Encoder.htmlDecode(name);
		this.smallInput = new KDInputView({
			testPath: "status-update-input",
			cssClass: "status-update-input warn-on-unsaved-data",
			placeholder: "What's new " + decodedName + "?",
			name: "dummy",
			style: "input-with-extras",
			focus: this.bound("switchToLargeView"),
			validate: {
				rules: {
					maxLength: 2e3
				}
			}
		});
		this.previousURL = "";
		this.requestEmbedLock = !1;
		this.initialRequest = !0;
		this.largeInput = new KDInputView({
			cssClass: "status-update-input warn-on-unsaved-data",
			type: "textarea",
			placeholder: "What's new " + decodedName + "?",
			name: "body",
			style: "input-with-extras",
			validate: {
				rules: {
					required: !0,
					maxLength: 3e3
				},
				messages: {
					required: "Please type a status message!"
				}
			},
			paste: this.bound("requestEmbed"),
			blur: function (_this) {
				return function () {
					return _this.utils.wait(1e3, function () {
						return _this.requestEmbed()
					})
				}
			}(this),
			keyup: function (_this) {
				return function (event) {
					var which;
					which = $(event.which)[0];
					return 32 === which || 9 === which ? _this.requestEmbed() : void 0
				}
			}(this)
		});
		this.cancelBtn = new KDButtonView({
			title: "Cancel",
			style: "modal-cancel",
			callback: function (_this) {
				return function () {
					_this.reset();
					return _this.parent.getDelegate().emit("ResetWidgets", !0)
				}
			}(this)
		});
		this.submitBtn = new KDButtonView({
			style: "clean-gray",
			title: "Submit",
			type: "submit"
		});
		embedOptions = $.extend({}, options, {
			delegate: this,
			hasConfig: !0
		});
		this.embedBox = new EmbedBox(embedOptions, data);
		this.embedUnhideLinkWrapper = new KDView({
			cssClass: "unhide-embed"
		});
		this.embedUnhideLinkWrapper.addSubView(this.embedUnhideLink = new KDCustomHTMLView({
			cssClass: "unhide-embed-link",
			tagName: "a",
			partial: "Re-enable embedding URLs",
			attributes: {
				href: ""
			},
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					event.stopPropagation();
					_this.embedBox.show();
					_this.requestEmbedLock = !1;
					_this.embedUnhideLinkWrapper.hide();
					return _this.embedBox.refreshEmbed()
				}
			}(this)
		}));
		this.embedUnhideLinkWrapper.hide();
		this.embedBox.on("EmbedIsHidden", function (_this) {
			return function () {
				_this.requestEmbedLock = !0;
				return _this.embedUnhideLinkWrapper.show()
			}
		}(this));
		this.embedBox.on("EmbedIsShown", function (_this) {
			return function () {
				_this.requestEmbedLock = !1;
				return _this.embedUnhideLinkWrapper.hide()
			}
		}(this));
		this.heartBox = new HelpBox({
			subtitle: "About Status Updates",
			tooltip: {
				title: "This is a public wall, here you can share anything with the Koding community."
			}
		});
		this.inputLinkInfoBox = new InfoBox({
			cssClass: "protocol-info-box",
			delegate: this
		});
		this.inputLinkInfoBox.hide();
		this.appStorage = new AppStorage("Activity", "1.0");
		this.updateCheckboxFromStorage();
		this.lastestStatusMessage = ""
	}
	__extends(ActivityStatusUpdateWidget, _super);
	ActivityStatusUpdateWidget.prototype.updateCheckboxFromStorage = function () {
		return this.appStorage.fetchValue("UrlSanitizerCheckboxIsChecked", function (_this) {
			return function (checked) {
				return _this.inputLinkInfoBox.setSwitchValue(checked)
			}
		}(this))
	};
	ActivityStatusUpdateWidget.prototype.sanitizeUrls = function (text) {
		return text.replace(/([a-zA-Z]+\:\/\/)?(\w+:\w+@)?[a-zA-Z\d\.-]+\.([a-zA-Z]{2,4}(:\d+)?)([\/\?]\S*)?\b/g, function (_this) {
			return function (url) {
				var test;
				test = /^([a-zA-Z]+\:\/\/)/.test(url);
				if (test === !1) {
					_this.inputLinkInfoBox.inputLinkInfoBoxPermaHide !== !0 && _this.inputLinkInfoBox.show();
					return _this.inputLinkInfoBox.getSwitchValue() === !0 ? "http://" + url : url
				}
				return url
			}
		}(this))
	};
	ActivityStatusUpdateWidget.prototype.requestEmbed = function () {
		this.largeInput.setValue(this.sanitizeUrls(this.largeInput.getValue()));
		if (this.requestEmbedLock !== !0) {
			this.requestEmbedLock = !0;
			return setTimeout(function (_this) {
				return function () {
					var firstUrl, _ref;
					firstUrl = _this.largeInput.getValue().match(/([a-zA-Z]+\:\/\/)?(\w+:\w+@)?[a-zA-Z\d\.-]+\.([a-zA-Z]{2,4}(:\d+)?)([\/\?]\S*)?\b/g);
					if (!firstUrl) return _this.requestEmbedLock = !1;
					_this.initialRequest = !1;
					_this.embedBox.embedLinks.setLinks(firstUrl);
					_this.embedBox.show();
					return _ref = _this.previousURL, __indexOf.call(firstUrl, _ref) >= 0 ? _this.requestEmbedLock = !1 : _this.embedBox.embedUrl(firstUrl[0], {
						maxWidth: 525
					}, function () {
						_this.requestEmbedLock = !1;
						return _this.previousURL = firstUrl[0]
					})
				}
			}(this), 50)
		}
	};
	ActivityStatusUpdateWidget.prototype.switchToSmallView = function () {
		this.parent && this.parent.setClass("no-shadow");
		this.largeInput.setHeight(68);
		this.$(">div.large-input, >div.formline").hide();
		this.smallInput.show();
		return this.smallInput.setValue(this.lastestStatusMessage)
	};
	ActivityStatusUpdateWidget.prototype.switchToLargeView = function () {
		var tabView;
		this.parent && this.parent.unsetClass("no-shadow");
		this.smallInput.hide();
		this.$(">div.large-input, >div.formline").show();
		this.utils.defer(function (_this) {
			return function () {
				_this.largeInput.$().trigger("focus");
				_this.largeInput.setHeight(109);
				return _this.largeInput.setValue(_this.lastestStatusMessage)
			}
		}(this));
		tabView = this.parent.getDelegate();
		return KD.getSingleton("windowController").addLayer(tabView)
	};
	ActivityStatusUpdateWidget.prototype.switchToEditView = function (activity, fake) {
		var body, bodyUrls, link, selected, tags;
		null == fake && (fake = !1);
		tags = activity.tags, body = activity.body, link = activity.link;
		this.tagController.reset();
		this.tagController.setDefaultValue(tags);
		if (fake) this.submitBtn.setTitle("Submit again");
		else {
			this.submitBtn.setTitle("Edit status update");
			this.addCustomData("activity", activity)
		}
		this.lastestStatusMessage = Encoder.htmlDecode(body);
		this.utils.selectText(this.largeInput.$()[0]);
		if (null != link && "" !== link.link_url) {
			bodyUrls = this.largeInput.getValue().match(/([a-zA-Z]+\:\/\/)?(\w+:\w+@)?([a-zA-Z\d.-]+\.[A-Za-z]{2,4})(:\d+)?(\/\S*)?/g);
			if (null != bodyUrls) {
				selected = bodyUrls.splice(bodyUrls.indexOf(link.link_url), 1);
				bodyUrls.unshift(selected[0]);
				this.embedBox.embedLinks.setLinks(bodyUrls)
			}
			this.previousURL = link.link_url;
			this.embedBox.oembed = link.link_embed;
			this.embedBox.url = link.link_url;
			this.embedBox.embedExistingData(link.link_embed, {}, function (_this) {
				return function () {
					_this.embedBox.show();
					return _this.embedUnhideLinkWrapper.hide()
				}
			}(this))
		} else this.embedBox.hide();
		return this.switchToLargeView()
	};
	ActivityStatusUpdateWidget.prototype.submit = function () {
		this.addCustomData("link_url", this.embedBox.url || "");
		this.addCustomData("link_embed", this.embedBox.getDataForSubmit() || {});
		this.once("FormValidationPassed", function (_this) {
			return function () {
				return _this.reset(!0)
			}
		}(this));
		ActivityStatusUpdateWidget.__super__.submit.apply(this, arguments);
		this.submitBtn.disable();
		return this.utils.wait(5e3, function (_this) {
			return function () {
				return _this.submitBtn.enable()
			}
		}(this))
	};
	ActivityStatusUpdateWidget.prototype.reset = function (isHardReset) {
		this.lastestStatusMessage = this.largeInput.getValue();
		if (isHardReset) {
			this.tagController.reset();
			this.submitBtn.setTitle("Submit");
			this.removeCustomData("activity");
			this.removeCustomData("link_url");
			this.removeCustomData("link_embed");
			this.embedBox.resetEmbedAndHide();
			this.previousURL = "";
			this.initialRequest = !0;
			this.inputLinkInfoBoxPermaHide = !1;
			this.inputLinkInfoBox.hide();
			this.updateCheckboxFromStorage()
		}
		ActivityStatusUpdateWidget.__super__.reset.apply(this, arguments);
		return this.largeInput.resize()
	};
	ActivityStatusUpdateWidget.prototype.viewAppended = function () {
		var tabView;
		this.setTemplate(this.pistachio());
		this.template.update();
		this.switchToSmallView();
		tabView = this.parent.getDelegate();
		return tabView.on("MainInputTabsReset", function (_this) {
			return function (isHardReset) {
				_this.reset(isHardReset);
				return _this.switchToSmallView()
			}
		}(this))
	};
	ActivityStatusUpdateWidget.prototype.pistachio = function () {
		return '<div class="small-input">{{> this.smallInput}}</div>\n<div class="large-input">\n  {{> this.largeInput}}\n  {{> this.inputLinkInfoBox}}\n  {{> this.embedUnhideLinkWrapper}}\n</div>\n{{> this.submitBtn}}'
	};
	return ActivityStatusUpdateWidget
}(ActivityWidgetFormView);
InfoBox = function (_super) {
	function InfoBox() {
		var stopSanitizingToolTip;
		InfoBox.__super__.constructor.apply(this, arguments);
		this.inputLinkInfoBoxPermaHide = !1;
		stopSanitizingToolTip = {
			title: "This feature automatically adds protocols to URLs detected in your message."
		};
		this.stopSanitizingLabel = new KDLabelView({
			title: "URL auto-completion",
			tooltip: stopSanitizingToolTip
		});
		this.stopSanitizingOnOffSwitch = new KDOnOffSwitch({
			label: this.stopSanitizingLabel,
			name: "stop-sanitizing",
			cssClass: "stop-sanitizing",
			tooltip: stopSanitizingToolTip,
			callback: function (_this) {
				return function (state) {
					return _this.getDelegate().appStorage.setValue("UrlSanitizerCheckboxIsChecked", state, function () {
						return state ? _this.getDelegate().largeInput.setValue(_this.getDelegate().sanitizeUrls(_this.getDelegate().largeInput.getValue())) : void 0
					})
				}
			}(this)
		});
		this.inputLinkInfoBoxCloseButton = new KDButtonView({
			name: "hide-info-box",
			cssClass: "hide-info-box",
			icon: !0,
			iconOnly: !0,
			iconClass: "hide",
			title: "Close",
			callback: function (_this) {
				return function () {
					_this.hide();
					return _this.inputLinkInfoBoxPermaHide = !0
				}
			}(this)
		})
	}
	__extends(InfoBox, _super);
	InfoBox.prototype.getSwitchValue = function () {
		return this.stopSanitizingOnOffSwitch.getValue()
	};
	InfoBox.prototype.setSwitchValue = function (value) {
		return this.stopSanitizingOnOffSwitch.setValue(value)
	};
	InfoBox.prototype.pistachio = function () {
		return '<p>For links, please provide a protocol such as\n  <abbr title="Hypertext Transfer Protocol">http://</abbr>\n</p>\n<div class="sanitizer-control">\n  {{> this.stopSanitizingLabel}}\n  {{> this.stopSanitizingOnOffSwitch}}\n</div>\n{{> this.inputLinkInfoBoxCloseButton}}'
	};
	return InfoBox
}(JView);
var ActivityCodeSnippetWidget, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityCodeSnippetWidget = function (_super) {
	function ActivityCodeSnippetWidget() {
		ActivityCodeSnippetWidget.__super__.constructor.apply(this, arguments);
		this.labelTitle = new KDLabelView({
			title: "Title:",
			cssClass: "first-label"
		});
		this.title = new KDInputView({
			name: "title",
			cssClass: "warn-on-unsaved-data",
			placeholder: "Give a title to your code snippet...",
			validate: {
				rules: {
					required: !0,
					maxLength: 140
				},
				messages: {
					required: "Code snippet title is required!"
				}
			}
		});
		this.labelDescription = new KDLabelView({
			title: "Description:"
		});
		this.description = new KDInputView({
			label: this.labelDescription,
			cssClass: "warn-on-unsaved-data",
			name: "body",
			placeholder: "What is your code about?",
			validate: {
				rules: {
					maxLength: 3e3
				}
			}
		});
		this.labelContent = new KDLabelView({
			title: "Code Snip:"
		});
		this.hiddenAceInputClone = new KDInputView({
			cssClass: "hidden invisible"
		});
		this.aceWrapper = new KDView;
		this.cancelBtn = new KDButtonView({
			title: "Cancel",
			style: "modal-cancel",
			callback: function (_this) {
				return function () {
					_this.reset();
					return _this.parent.getDelegate().emit("ResetWidgets")
				}
			}(this)
		});
		this.submitBtn = new KDButtonView({
			style: "clean-gray",
			title: "Share your Code Snippet",
			type: "submit"
		});
		this.heartBox = new HelpBox({
			subtitle: "About Code Sharing",
			tooltip: {
				title: "Easily share your code with other members of the Koding community. Once you share, user can easily open or save your code to their own environment."
			}
		});
		this.loader = new KDLoaderView({
			size: {
				width: 30
			},
			loaderOptions: {
				color: "#ffffff",
				shape: "spiral",
				diameter: 30,
				density: 30,
				range: .4,
				speed: 1,
				FPS: 24
			}
		});
		this.syntaxSelect = new KDSelectBox({
			name: "syntax",
			selectOptions: [],
			defaultValue: "javascript",
			callback: function (_this) {
				return function (value) {
					return _this.emit("codeSnip.changeSyntax", value)
				}
			}(this)
		});
		this.on("codeSnip.changeSyntax", function (_this) {
			return function (syntax) {
				_this.updateSyntaxTag(syntax);
				return _this.ace.setSyntax(syntax)
			}
		}(this))
	}
	var snippetCount;
	__extends(ActivityCodeSnippetWidget, _super);
	ActivityCodeSnippetWidget.prototype.updateSyntaxTag = function (syntax) {
		var item, oldSyntax, selectedItemsLimit, subViews, _i, _len;
		oldSyntax = this.ace.getSyntax();
		subViews = this.tagController.itemWrapper.getSubViews().slice();
		for (_i = 0, _len = subViews.length; _len > _i; _i++) {
			item = subViews[_i];
			if (item.getData().title === oldSyntax) {
				this.tagController.removeFromSubmitQueue(item);
				break
			}
		}
		selectedItemsLimit = this.tagController.getOptions().selectedItemsLimit;
		return this.tagController.selectedItemCounter < selectedItemsLimit ? this.tagController.addItemToSubmitQueue(this.tagController.getNoItemFoundView(syntax)) : void 0
	};
	ActivityCodeSnippetWidget.prototype.submit = function () {
		this.addCustomData("code", this.ace.getContents());
		this.once("FormValidationPassed", function (_this) {
			return function () {
				return _this.reset()
			}
		}(this));
		ActivityCodeSnippetWidget.__super__.submit.apply(this, arguments);
		this.submitBtn.disable();
		return this.utils.wait(8e3, function (_this) {
			return function () {
				return _this.submitBtn.enable()
			}
		}(this))
	};
	ActivityCodeSnippetWidget.prototype.reset = function () {
		this.submitBtn.setTitle("Share your Code Snippet");
		this.removeCustomData("activity");
		this.title.setValue("");
		this.description.setValue("");
		this.syntaxSelect.setValue("javascript");
		this.updateSyntaxTag("javascript");
		this.hiddenAceInputClone.setValue("");
		this.hiddenAceInputClone.unsetClass("warn-on-unsaved-data");
		return this.utils.defer(function (_this) {
			return function () {
				_this.tagController.reset();
				_this.ace.setContents("//your code snippet goes here...");
				return _this.ace.setSyntax("javascript")
			}
		}(this))
	};
	ActivityCodeSnippetWidget.prototype.switchToEditView = function (activity, fake) {
		var body, content, fillForm, syntax, tags, title, _ref, _ref1;
		null == fake && (fake = !1);
		if (fake) this.submitBtn.setTitle("Submit again");
		else {
			this.submitBtn.setTitle("Edit code snippet");
			this.addCustomData("activity", activity)
		}
		title = activity.title, body = activity.body, tags = activity.tags;
		_ref = activity.attachments[0], syntax = _ref.syntax, content = _ref.content;
		this.tagController.reset();
		this.tagController.setDefaultValue(tags || []);
		fillForm = function (_this) {
			return function () {
				_this.title.setValue(Encoder.htmlDecode(title));
				_this.description.setValue(Encoder.htmlDecode(body));
				_this.ace.setContents(Encoder.htmlDecode(Encoder.XSSEncode(content)));
				_this.hiddenAceInputClone.setValue(Encoder.htmlDecode(Encoder.XSSEncode(content)));
				_this.hiddenAceInputClone.setClass("warn-on-unsaved-data");
				return _this.syntaxSelect.setValue(Encoder.htmlDecode(syntax))
			}
		}(this);
		return (null != (_ref1 = this.ace) ? _ref1.editor : void 0) ? fillForm() : this.once("codeSnip.aceLoaded", function () {
			return function () {
				return fillForm()
			}
		}(this))
	};
	ActivityCodeSnippetWidget.prototype.widgetShown = function () {
		return this.ace ? this.refreshEditorView() : this.loadAce()
	};
	snippetCount = 0;
	ActivityCodeSnippetWidget.prototype.loadAce = function () {
		this.loader.show();
		this.aceWrapper.addSubView(this.ace = new Ace({}, FSHelper.createFileFromPath("localfile:/codesnippet" + snippetCount+++".txt")));
		this.aceDefaultContent = "//your code snippet goes here...";
		return this.ace.on("ace.ready", function (_this) {
			return function () {
				_this.loader.destroy();
				_this.ace.setShowGutter(!1);
				_this.ace.setContents(_this.aceDefaultContent);
				_this.ace.setTheme();
				_this.ace.setFontSize(12, !1);
				_this.ace.setSyntax("javascript");
				_this.ace.editor.getSession().on("change", function () {
					var _ref;
					_this.hiddenAceInputClone.setValue(Encoder.XSSEncode(_this.ace.getContents()));
					"" !== (_ref = _this.hiddenAceInputClone.getValue()) && _ref !== _this.aceDefaultContent ? _this.hiddenAceInputClone.setClass("warn-on-unsaved-data") : _this.hiddenAceInputClone.unsetClass("warn-on-unsaved-data");
					return _this.refreshEditorView()
				});
				return _this.emit("codeSnip.aceLoaded")
			}
		}(this))
	};
	ActivityCodeSnippetWidget.prototype.refreshEditorView = function () {
		var lineAmount, lines;
		lines = this.ace.editor.selection.doc.$lines;
		lineAmount = lines.length > 15 ? 15 : lines.length < 5 ? 5 : lines.length;
		return this.setAceHeightByLines(lineAmount)
	};
	ActivityCodeSnippetWidget.prototype.setAceHeightByLines = function (lineAmount) {
		var container, height, lineHeight;
		lineHeight = this.ace.editor.renderer.lineHeight;
		container = this.ace.editor.container;
		height = lineAmount * lineHeight;
		this.$(".code-snip-holder").height(height + 20);
		return this.ace.editor.resize()
	};
	ActivityCodeSnippetWidget.prototype.viewAppended = function () {
		this.setClass("update-options codesnip");
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	ActivityCodeSnippetWidget.prototype.pistachio = function () {
		return '<div class="form-actions-mask">\n  <div class="form-actions-holder">\n    <div class="formline">\n      {{> this.labelTitle}}\n      <div>\n        {{> this.title}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelDescription}}\n      <div>\n        {{> this.description}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelContent}}\n      <div class="code-snip-holder">\n        {{> this.loader}}\n        {{> this.aceWrapper}}\n        {{> this.hiddenAceInputClone}}\n        {{> this.syntaxSelect}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelAddTags}}\n      <div>\n        {{> this.tagAutoComplete}}\n        {{> this.selectedItemWrapper}}\n      </div>\n    </div>\n    <div class="formline submit">\n      <div class=\'formline-wrapper\'>\n        <div class="submit-box fr">\n          {{> this.submitBtn}}\n          {{> this.cancelBtn}}\n        </div>\n        {{> this.heartBox}}\n      </div>\n    </div>\n  </div>\n</div>'
	};
	return ActivityCodeSnippetWidget
}(ActivityWidgetFormView);
var ActivityTutorialWidget, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityTutorialWidget = function (_super) {
	function ActivityTutorialWidget(options, data) {
		var embedOptions;
		ActivityTutorialWidget.__super__.constructor.call(this, options, data);
		this.preview = options.preview || {};
		this.labelTitle = new KDLabelView({
			title: "New Tutorial",
			cssClass: "first-label"
		});
		this.labelEmbedLink = new KDLabelView({
			title: "Video URL:"
		});
		this.labelContent = new KDLabelView({
			title: "Content:"
		});
		this.inputDiscussionTitle = new KDInputView({
			name: "title",
			label: this.labelTitle,
			cssClass: "warn-on-unsaved-data",
			placeholder: "Give a title to your Tutorial...",
			validate: {
				rules: {
					required: !0
				},
				messages: {
					required: "Tutorial title is required!"
				}
			}
		});
		this.inputTutorialEmbedShowLink = new KDOnOffSwitch({
			cssClass: "show-tutorial-embed",
			defaultState: !1,
			callback: function (_this) {
				return function (state) {
					if (!state) return _this.embedBox.$().animate({
						top: "-400px"
					}, 300, function () {
						return _this.embedBox.hide()
					});
					if (_this.embedBox.hasValidContent) {
						_this.embedBox.show();
						return _this.embedBox.$().animate({
							top: "0px"
						}, 300)
					}
				}
			}(this)
		});
		this.inputTutorialEmbedLink = new KDInputView({
			name: "embed",
			label: this.labelEmbedLink,
			cssClass: "warn-on-unsaved-data tutorial-embed-link",
			placeholder: "Please enter a URL to a video...",
			keyup: function (_this) {
				return function () {
					return "" === _this.inputTutorialEmbedLink.getValue() ? _this.embedBox.resetEmbedAndHide() : void 0
				}
			}(this),
			paste: function (_this) {
				return function () {
					return _this.utils.defer(function () {
						var embedOptions, url;
						_this.inputTutorialEmbedLink.setValue(_this.sanitizeUrls(_this.inputTutorialEmbedLink.getValue()));
						url = _this.inputTutorialEmbedLink.getValue().trim();
						if (/^((http(s)?\:)?\/\/)/.test(url)) {
							embedOptions = {
								maxWidth: 540,
								maxHeight: 200
							};
							return _this.embedBox.embedUrl(url, embedOptions, function () {
								return _this.inputTutorialEmbedShowLink.getValue() === !1 ? _this.embedBox.hide() : void 0
							})
						}
					})
				}
			}(this)
		});
		embedOptions = $.extend({}, options, {
			delegate: this,
			hasConfig: !0,
			forceType: "object"
		});
		this.embedBox = new EmbedBox(embedOptions, data);
		this.inputContent = new KDInputViewWithPreview({
			label: this.labelContent,
			preview: this.preview,
			name: "body",
			cssClass: "discussion-body warn-on-unsaved-data",
			type: "textarea",
			autogrow: !0,
			placeholder: "Please enter your Tutorial content. (You can use markdown here)",
			validate: {
				rules: {
					required: !0
				},
				messages: {
					required: "Tutorial content is required!"
				}
			}
		});
		this.cancelBtn = new KDButtonView({
			title: "Cancel",
			style: "modal-cancel",
			callback: function (_this) {
				return function () {
					_this.reset();
					return _this.parent.getDelegate().emit("ResetWidgets")
				}
			}(this)
		});
		this.submitBtn = new KDButtonView({
			style: "clean-gray",
			title: "Post your Tutorial",
			type: "submit"
		});
		this.heartBox = new HelpBox({
			subtitle: "About Tutorials",
			tooltip: {
				title: "This is a public wall, here you can share your tutorials with the Koding community."
			}
		})
	}
	__extends(ActivityTutorialWidget, _super);
	ActivityTutorialWidget.prototype.sanitizeUrls = function (text) {
		return text.replace(/(([a-zA-Z]+\:)\/\/)?(\w+:\w+@)?([a-zA-Z\d.-]+\.[A-Za-z]{2,4})(:\d+)?(\/\S*)?/g, function () {
			return function (url) {
				var test;
				test = /^([a-zA-Z]+\:\/\/)/.test(url);
				return test ? url : "http://" + url
			}
		}(this))
	};
	ActivityTutorialWidget.prototype.submit = function () {
		this.once("FormValidationPassed", function (_this) {
			return function () {
				return _this.reset()
			}
		}(this));
		this.embedBox.hasValidContent && this.addCustomData("link", {
			link_url: this.embedBox.url,
			link_embed: this.embedBox.getDataForSubmit()
		});
		ActivityTutorialWidget.__super__.submit.apply(this, arguments);
		this.submitBtn.disable();
		return this.utils.wait(8e3, function (_this) {
			return function () {
				return _this.submitBtn.enable()
			}
		}(this))
	};
	ActivityTutorialWidget.prototype.reset = function () {
		this.submitBtn.setTitle("Post your Tutorial");
		this.removeCustomData("activity");
		this.inputDiscussionTitle.setValue("");
		this.inputContent.setValue("");
		this.inputContent.resize();
		this.inputTutorialEmbedShowLink.setValue(!1);
		this.embedBox.resetEmbedAndHide();
		this.utils.wait(2e3, function (_this) {
			return function () {
				return _this.tagController.reset()
			}
		}(this));
		return ActivityTutorialWidget.__super__.reset.apply(this, arguments)
	};
	ActivityTutorialWidget.prototype.viewAppended = function () {
		this.setClass("update-options discussion");
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	ActivityTutorialWidget.prototype.switchToEditView = function (activity, fake) {
		var body, fillForm, link, tags, title;
		null == fake && (fake = !1);
		if (fake) this.submitBtn.setTitle("Submit again");
		else {
			this.submitBtn.setTitle("Edit Tutorial");
			this.addCustomData("activity", activity)
		}
		title = activity.title, body = activity.body, tags = activity.tags, link = activity.link;
		this.tagController.reset();
		this.tagController.setDefaultValue(tags || []);
		fillForm = function (_this) {
			return function () {
				_this.inputDiscussionTitle.setValue(Encoder.htmlDecode(title));
				_this.inputContent.setValue(Encoder.htmlDecode(body));
				_this.inputTutorialEmbedLink.setValue(Encoder.htmlDecode(null != link ? link.link_url : void 0));
				return _this.inputContent.generatePreview()
			}
		}(this);
		return fillForm()
	};
	ActivityTutorialWidget.prototype.pistachio = function () {
		return '<div class="form-actions-mask">\n  <div class="form-actions-holder">\n    <div class="formline">\n      {{> this.labelTitle}}\n      <div>\n        {{> this.inputDiscussionTitle}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelEmbedLink}}\n      <div>\n        {{> this.inputTutorialEmbedLink}}\n        {{> this.inputTutorialEmbedShowLink}}\n        {{> this.embedBox}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelContent}}\n      <div>\n        {{> this.inputContent}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelAddTags}}\n      <div>\n        {{> this.tagAutoComplete}}\n        {{> this.selectedItemWrapper}}\n      </div>\n    </div>\n    <div class="formline submit">\n      <div class=\'formline-wrapper\'>\n        <div class="submit-box fr">\n          {{> this.submitBtn}}\n          {{> this.cancelBtn}}\n        </div>\n        {{> this.heartBox}}\n      </div>\n    </div>\n  </div>\n</div>'
	};
	return ActivityTutorialWidget
}(ActivityWidgetFormView);
var ActivityDiscussionWidget, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityDiscussionWidget = function (_super) {
	function ActivityDiscussionWidget(options, data) {
		ActivityDiscussionWidget.__super__.constructor.call(this, options, data);
		this.preview = options.preview || {};
		this.labelTitle = new KDLabelView({
			title: "New Discussion",
			cssClass: "first-label"
		});
		this.labelContent = new KDLabelView({
			title: "Content:"
		});
		this.inputDiscussionTitle = new KDInputView({
			name: "title",
			label: this.labelTitle,
			cssClass: "warn-on-unsaved-data",
			placeholder: "Give a title to what you want to start discussing...",
			validate: {
				rules: {
					required: !0
				},
				messages: {
					required: "Discussion title is required!"
				}
			}
		});
		this.inputContent = new KDInputViewWithPreview({
			label: this.labelContent,
			preview: this.preview,
			name: "body",
			cssClass: "discussion-body warn-on-unsaved-data",
			type: "textarea",
			autogrow: !0,
			placeholder: "What do you want to talk about? (You can use markdown here)",
			validate: {
				rules: {
					required: !0
				},
				messages: {
					required: "Discussion content is required!"
				}
			}
		});
		this.cancelBtn = new KDButtonView({
			title: "Cancel",
			style: "modal-cancel",
			callback: function (_this) {
				return function () {
					_this.reset();
					return _this.parent.getDelegate().emit("ResetWidgets")
				}
			}(this)
		});
		this.submitBtn = new KDButtonView({
			style: "clean-gray",
			title: "Start your discussion",
			type: "submit"
		});
		this.heartBox = new HelpBox({
			subtitle: "About Discussions",
			tooltip: {
				title: "This is a public wall, here you can discuss anything with the Koding community."
			}
		})
	}
	__extends(ActivityDiscussionWidget, _super);
	ActivityDiscussionWidget.prototype.submit = function () {
		this.once("FormValidationPassed", function (_this) {
			return function () {
				return _this.reset()
			}
		}(this));
		ActivityDiscussionWidget.__super__.submit.apply(this, arguments);
		this.submitBtn.disable();
		return this.utils.wait(8e3, function (_this) {
			return function () {
				return _this.submitBtn.enable()
			}
		}(this))
	};
	ActivityDiscussionWidget.prototype.reset = function () {
		this.submitBtn.setTitle("Start your discussion");
		this.removeCustomData("activity");
		this.inputDiscussionTitle.setValue("");
		this.inputContent.setValue("");
		this.inputContent.resize();
		this.utils.defer(function (_this) {
			return function () {
				return _this.tagController.reset()
			}
		}(this));
		return ActivityDiscussionWidget.__super__.reset.apply(this, arguments)
	};
	ActivityDiscussionWidget.prototype.viewAppended = function () {
		this.setClass("update-options discussion");
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	ActivityDiscussionWidget.prototype.switchToEditView = function (activity, fake) {
		var body, fillForm, tags, title;
		null == fake && (fake = !1);
		if (fake) this.submitBtn.setTitle("Submit again");
		else {
			this.submitBtn.setTitle("Edit Discussion");
			this.addCustomData("activity", activity)
		}
		title = activity.title, body = activity.body, tags = activity.tags;
		this.tagController.reset();
		this.tagController.setDefaultValue(tags || []);
		fillForm = function (_this) {
			return function () {
				_this.inputDiscussionTitle.setValue(Encoder.htmlDecode(title));
				return _this.inputContent.setValue(Encoder.htmlDecode(body))
			}
		}(this);
		return fillForm()
	};
	ActivityDiscussionWidget.prototype.pistachio = function () {
		return '<div class="form-actions-mask">\n  <div class="form-actions-holder">\n    <div class="formline">\n      {{> this.labelTitle}}\n      <div>\n        {{> this.inputDiscussionTitle}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelContent}}\n      <div>\n        {{> this.inputContent}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelAddTags}}\n      <div>\n        {{> this.tagAutoComplete}}\n        {{> this.selectedItemWrapper}}\n      </div>\n    </div>\n    <div class="formline submit">\n      <div class=\'formline-wrapper\'>\n        <div class="submit-box fr">\n          {{> this.submitBtn}}\n          {{> this.cancelBtn}}\n        </div>\n        {{> this.heartBox}}\n      </div>\n    </div>\n  </div>\n</div>'
	};
	return ActivityDiscussionWidget
}(ActivityWidgetFormView);
var ActivityBlogPostWidget, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityBlogPostWidget = function (_super) {
	function ActivityBlogPostWidget(options, data) {
		ActivityBlogPostWidget.__super__.constructor.call(this, options, data);
		this.preview = options.preview || {};
		this.labelTitle = new KDLabelView({
			title: "New Blog Post",
			cssClass: "first-label"
		});
		this.labelContent = new KDLabelView({
			title: "Content:"
		});
		this.inputDiscussionTitle = new KDInputView({
			name: "title",
			label: this.labelTitle,
			cssClass: "warn-on-unsaved-data",
			placeholder: "Give a title to what you want to your Blog Post...",
			validate: {
				rules: {
					required: !0
				},
				messages: {
					required: "Blog Post title is required!"
				}
			}
		});
		this.inputContent = new KDInputViewWithPreview({
			label: this.labelContent,
			preview: this.preview,
			name: "body",
			cssClass: "discussion-body warn-on-unsaved-data",
			type: "textarea",
			autogrow: !0,
			placeholder: "What do you want to talk about? (You can use markdown here)",
			validate: {
				rules: {
					required: !0
				},
				messages: {
					required: "Blog Post body is required!"
				}
			}
		});
		this.cancelBtn = new KDButtonView({
			title: "Cancel",
			style: "modal-cancel",
			callback: function (_this) {
				return function () {
					_this.reset();
					return _this.parent.getDelegate().emit("ResetWidgets")
				}
			}(this)
		});
		this.submitBtn = new KDButtonView({
			style: "clean-gray",
			title: "Post to your Blog",
			type: "submit"
		});
		this.heartBox = new HelpBox({
			subtitle: "About Blog Posts",
			tooltip: {
				title: "This is a public wall, here you can discuss anything with the Koding community."
			}
		})
	}
	__extends(ActivityBlogPostWidget, _super);
	ActivityBlogPostWidget.prototype.submit = function () {
		this.once("FormValidationPassed", function (_this) {
			return function () {
				return _this.reset()
			}
		}(this));
		ActivityBlogPostWidget.__super__.submit.apply(this, arguments);
		this.submitBtn.disable();
		return this.utils.wait(8e3, function (_this) {
			return function () {
				return _this.submitBtn.enable()
			}
		}(this))
	};
	ActivityBlogPostWidget.prototype.reset = function () {
		this.submitBtn.setTitle("Start your Blog Post");
		this.removeCustomData("activity");
		this.inputDiscussionTitle.setValue("");
		this.inputContent.setValue("");
		this.inputContent.resize();
		this.utils.defer(function (_this) {
			return function () {
				return _this.tagController.reset()
			}
		}(this));
		return ActivityBlogPostWidget.__super__.reset.apply(this, arguments)
	};
	ActivityBlogPostWidget.prototype.viewAppended = function () {
		this.setClass("update-options discussion");
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	ActivityBlogPostWidget.prototype.switchToEditView = function (activity, fake) {
		var body, fillForm, tags, title;
		null == fake && (fake = !1);
		if (fake) this.submitBtn.setTitle("Submit again");
		else {
			this.submitBtn.setTitle("Edit Blog Post");
			this.addCustomData("activity", activity)
		}
		title = activity.title, body = activity.body, tags = activity.tags;
		this.tagController.reset();
		this.tagController.setDefaultValue(tags || []);
		fillForm = function (_this) {
			return function () {
				_this.inputDiscussionTitle.setValue(Encoder.htmlDecode(title));
				return _this.inputContent.setValue(Encoder.htmlDecode(body))
			}
		}(this);
		return fillForm()
	};
	ActivityBlogPostWidget.prototype.pistachio = function () {
		return '<div class="form-actions-mask">\n  <div class="form-actions-holder">\n    <div class="formline">\n      {{> this.labelTitle}}\n      <div>\n        {{> this.inputDiscussionTitle}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelContent}}\n      <div>\n        {{> this.inputContent}}\n      </div>\n    </div>\n    <div class="formline">\n      {{> this.labelAddTags}}\n      <div>\n        {{> this.tagAutoComplete}}\n        {{> this.selectedItemWrapper}}\n      </div>\n    </div>\n    <div class="formline submit">\n      <div class=\'formline-wrapper\'>\n        <div class="submit-box fr">\n          {{> this.submitBtn}}\n          {{> this.cancelBtn}}\n        </div>\n        {{> this.heartBox}}\n      </div>\n    </div>\n  </div>\n</div>'
	};
	return ActivityBlogPostWidget
}(ActivityWidgetFormView);
var ActivityContentDisplay, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityContentDisplay = function (_super) {
	function ActivityContentDisplay(options, data) {
		var currentGroup, getContentGroupLinkPartial;
		null == options && (options = {});
		options.cssClass || (options.cssClass = "content-display activity-related " + options.type);
		ActivityContentDisplay.__super__.constructor.call(this, options, data);
		currentGroup = KD.getSingleton("groupsController").getCurrentGroup();
		getContentGroupLinkPartial = function (groupSlug, groupName) {
			return (null != currentGroup ? currentGroup.slug : void 0) === groupSlug ? "" : 'In <a href="' + groupSlug + '" target="' + groupSlug + '">' + groupName + "</a>"
		};
		this.contentGroupLink = new KDCustomHTMLView({
			tagName: "span",
			partial: getContentGroupLinkPartial(data.group, data.group)
		});
		(null != currentGroup ? currentGroup.slug : void 0) === data.group ? this.contentGroupLink.updatePartial(getContentGroupLinkPartial(currentGroup.slug, currentGroup.title)) : KD.remote.api.JGroup.one({
			slug: data.group
		}, function (_this) {
			return function (err, group) {
				return !err && group ? _this.contentGroupLink.updatePartial(getContentGroupLinkPartial(group.slug, group.title)) : void 0
			}
		}(this));
		this.header = new HeaderViewSection({
			type: "big",
			title: this.getOptions().title
		});
		this.back = new KDCustomHTMLView({
			tagName: "a",
			partial: "<span>&laquo;</span> Back",
			click: function (_this) {
				return function (event) {
					event.stopPropagation();
					event.preventDefault();
					KD.singleton("display").emit("ContentDisplayWantsToBeHidden", _this);
					return KD.singleton("router").back()
				}
			}(this)
		});
		KD.isLoggedIn() || (this.back = new KDCustomHTMLView)
	}
	__extends(ActivityContentDisplay, _super);
	JView.mixin(ActivityContentDisplay.prototype);
	return ActivityContentDisplay
}(KDScrollView);
var ContentDisplayStatusUpdate, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ContentDisplayStatusUpdate = function (_super) {
	function ContentDisplayStatusUpdate(options, data) {
		null == options && (options = {});
		null == data && (data = {});
		options.tooltip || (options.tooltip = {
			title: "Status Update",
			offset: 3,
			selector: "span.type-icon"
		});
		ContentDisplayStatusUpdate.__super__.constructor.call(this, options, data);
		this.activityItem = new StatusActivityItemView({
			delegate: this
		}, this.getData());
		this.activityItem.on("ActivityIsDeleted", function () {
			return KD.singleton("router").back()
		})
	}
	__extends(ContentDisplayStatusUpdate, _super);
	ContentDisplayStatusUpdate.prototype.viewAppended = function () {
		var activity, cb;
		cb = JView.prototype.viewAppended.bind(this);
		activity = this.getData();
		return /#\:JTag/.test(activity.body) ? activity.fetchTags(function () {
			return function (err, tags) {
				err || (activity.tags = tags);
				return cb()
			}
		}(this)) : cb()
	};
	ContentDisplayStatusUpdate.prototype.pistachio = function () {
		return "{{> this.activityItem}}"
	};
	return ContentDisplayStatusUpdate
}(ActivityContentDisplay);
var ActiveTopics, ActiveUsers, ActivityRightBase, GroupDescription, GroupMembers, GroupMembersListItemView, UserGroupList, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivityRightBase = function (_super) {
	function ActivityRightBase(options, data) {
		null == options && (options = {});
		ActivityRightBase.__super__.constructor.call(this, options, data);
		this.tickerController = new KDListViewController({
			startWithLazyLoader: !0,
			lazyLoaderOptions: {
				partial: ""
			},
			viewOptions: {
				tagName: options.viewTagName,
				type: "activities",
				cssClass: "activities",
				itemClass: this.itemClass
			}
		});
		this.tickerListView = this.tickerController.getView()
	}
	__extends(ActivityRightBase, _super);
	ActivityRightBase.prototype.renderItems = function (err, items) {
		var item, _i, _len, _results;
		null == items && (items = []);
		this.tickerController.hideLazyLoader();
		if (!err) {
			_results = [];
			for (_i = 0, _len = items.length; _len > _i; _i++) {
				item = items[_i];
				_results.push(this.tickerController.addItem(item))
			}
			return _results
		}
	};
	ActivityRightBase.prototype.pistachio = function () {
		return '<div class="right-block-box">\n  <h3>' + this.getOption("title") + "{{> this.showAllLink}}</h3>\n  {{> this.tickerListView}}\n</div>"
	};
	return ActivityRightBase
}(JView);
UserGroupList = function (_super) {
	function UserGroupList(options, data) {
		null == options && (options = {});
		options.cssClass = KD.utils.curry("user-group-list hidden", options.cssClass);
		options.title = "Your Groups";
		options.viewTagName = "ul";
		options.itemType = "activity-ticker-item";
		this.itemClass = PopupGroupListItem;
		UserGroupList.__super__.constructor.call(this, options, data);
		this.showAllLink = new KDCustomHTMLView
	}
	__extends(UserGroupList, _super);
	UserGroupList.prototype.viewAppended = function () {
		UserGroupList.__super__.viewAppended.apply(this, arguments);
		return KD.whoami().fetchGroups(function (_this) {
			return function (err, items) {
				var item;
				_this.renderItems(null, function () {
					var _i, _len, _results;
					_results = [];
					for (_i = 0, _len = items.length; _len > _i; _i++) {
						item = items[_i];
						"koding" !== item.group.slug && _results.push(item)
					}
					return _results
				}());
				if (items.length - 1) {
					_this.parent.emit("TopOffsetShouldBeFixed");
					return _this.show()
				}
			}
		}(this))
	};
	return UserGroupList
}(ActivityRightBase);
ActiveUsers = function (_super) {
	function ActiveUsers(options, data) {
		var entryPoint, group;
		null == options && (options = {});
		entryPoint = KD.config.entryPoint;
		group = "group" === (null != entryPoint ? entryPoint.type : void 0) ? entryPoint.slug : "koding";
		this.itemClass = MembersListItemView;
		options.title = "koding" === group ? "Active users" : "New Members";
		options.cssClass = "active-users";
		ActiveUsers.__super__.constructor.call(this, options, data);
		this.showAllLink = new KDCustomHTMLView({
			tagName: "a",
			partial: "show all",
			cssClass: "show-all-link hidden",
			click: function () {
				KD.singletons.router.handleRoute("/Members");
				return KD.mixpanel("Show all members, click")
			}
		}, data);
		"koding" === group ? KD.remote.api.ActiveItems.fetchUsers({}, this.bound("renderItems")) : KD.singletons.groupsController.ready(function (_this) {
			return function () {
				var currentGroup;
				currentGroup = KD.singletons.groupsController.getCurrentGroup();
				return currentGroup.fetchNewestMembers({}, {
					limit: 10
				}, _this.bound("renderItems"))
			}
		}(this))
	}
	__extends(ActiveUsers, _super);
	return ActiveUsers
}(ActivityRightBase);
ActiveTopics = function (_super) {
	function ActiveTopics(options, data) {
		var entryPoint, group;
		null == options && (options = {});
		this.itemClass = ActiveTopicItemView;
		options.title = "Popular topics";
		options.cssClass = "active-topics";
		ActiveTopics.__super__.constructor.call(this, options, data);
		this.showAllLink = new KDCustomHTMLView;
		entryPoint = KD.config.entryPoint;
		group = "group" === (null != entryPoint ? entryPoint.type : void 0) ? entryPoint.slug : "koding";
		this.showAllLink = new KDCustomHTMLView({
			tagName: "a",
			partial: "show all",
			cssClass: "show-all-link",
			click: function () {
				var route;
				route = "koding" === group ? "/Topics" : "/" + group + "/Topics";
				KD.singletons.router.handleRoute(route);
				return KD.mixpanel("Show all topics, click")
			}
		}, data);
		"koding" === group ? KD.remote.api.ActiveItems.fetchTopics({
			group: group
		}, this.bound("renderItems")) : KD.remote.api.JTag.some({
			group: group
		}, {
			limit: 16,
			sort: {
				"counts.followers": -1
			}
		}, function (_this) {
			return function (err, topics) {
				return err || 0 === topics.length ? _this.hide() : _this.renderItems(err, topics)
			}
		}(this))
	}
	__extends(ActiveTopics, _super);
	return ActiveTopics
}(ActivityRightBase);
GroupDescription = function (_super) {
	function GroupDescription(options, data) {
		var groupsController;
		null == options && (options = {});
		GroupDescription.__super__.constructor.call(this, options, data);
		groupsController = KD.singletons.groupsController;
		groupsController.ready(function (_this) {
			return function () {
				var body, edit, group, hasBody, isAdmin;
				group = groupsController.getCurrentGroup();
				_this.innerContaner = new KDCustomHTMLView({
					cssClass: "right-block-box"
				});
				body = group.body;
				null == body && (body = "");
				hasBody = Boolean(body.trim().length);
				isAdmin = __indexOf.call(KD.config.roles, "admin") >= 0;
				edit = new CustomLinkView({
					title: "Group settings",
					cssClass: isAdmin ? "show-all-link" : "show-all-link hidden",
					click: function (event) {
						KD.utils.stopDOMEvent(event);
						return isAdmin ? KD.singletons.router.handleRoute("/Dashboard") : void 0
					}
				});
				_this.titleView = new JCustomHTMLView({
					tagName: "h3",
					pistachioParams: {
						edit: edit
					},
					pistachio: "{{#(title)}} {{> edit}}"
				}, group);
				_this.bodyView = new JCustomHTMLView({
					tagName: "p",
					pistachio: "{{#(body) || ''}}",
					cssClass: "group-description"
				}, group);
				_this.innerContaner.addSubView(_this.titleView);
				_this.innerContaner.addSubView(_this.bodyView);
				_this.addSubView(_this.innerContaner);
				return __indexOf.call(KD.config.roles, "admin") >= 0 && !hasBody ? _this.bodyView.setPartial("You can have a short description for your group here") : void 0
			}
		}(this))
	}
	__extends(GroupDescription, _super);
	return GroupDescription
}(KDView);
GroupMembers = function (_super) {
	function GroupMembers(options, data) {
		var entryPoint, groupSlug, groupsController;
		null == options && (options = {});
		this.itemClass = GroupMembersListItemView;
		options.title = "Group members";
		options.cssClass = "group-members";
		GroupMembers.__super__.constructor.call(this, options, data);
		entryPoint = KD.config.entryPoint;
		groupSlug = "group" === (null != entryPoint ? entryPoint.type : void 0) ? entryPoint.slug : "koding";
		this.showAllLink = new KDCustomHTMLView({
			tagName: "a",
			partial: "See All",
			cssClass: "show-all-link",
			click: function () {
				KD.singletons.router.handleRoute("/" + groupSlug + "/Members");
				return KD.mixpanel("Show all members, click")
			}
		}, this.getData());
		groupsController = KD.singletons.groupsController;
		groupsController.ready(function (_this) {
			return function () {
				var group;
				group = groupsController.getCurrentGroup();
				return group.fetchMembers({}, {
					limit: 12
				}, function (err, members) {
					_this.renderItems(err, members);
					return members.length < 12 ? groupsController.on("MemberJoinedGroup", function (data) {
						var constructorName, id, _ref;
						_ref = data.member, constructorName = _ref.constructorName, id = _ref.id;
						return KD.remote.cacheable(constructorName, id, function (err, account) {
							return err || !account ? console.error("account is not found", err) : _this.tickerController.addItem(account)
						})
					}) : void 0
				})
			}
		}(this))
	}
	__extends(GroupMembers, _super);
	return GroupMembers
}(ActivityRightBase);
GroupMembersListItemView = function (_super) {
	function GroupMembersListItemView(options, data) {
		null == options && (options = {});
		GroupMembersListItemView.__super__.constructor.call(this, options, data);
		this.avatar = new AvatarView({
			size: {
				width: 60,
				height: 60
			},
			showStatus: !0
		}, this.getData());
		this.addSubView(this.avatar)
	}
	__extends(GroupMembersListItemView, _super);
	JView.mixin(GroupMembersListItemView.prototype);
	return GroupMembersListItemView
}(KDListItemView);
var ActivityTicker, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
ActivityTicker = function (_super) {
	function ActivityTicker(options, data) {
		var group;
		null == options && (options = {});
		options.cssClass = KD.utils.curry("activity-ticker", options.cssClass);
		ActivityTicker.__super__.constructor.call(this, options, data);
		this.filters = null;
		this.listController = new KDListViewController({
			lazyLoadThreshold: .99,
			lazyLoaderOptions: {
				partial: ""
			},
			viewOptions: {
				type: "activities",
				cssClass: "activities",
				itemClass: ActivityTickerItem
			}
		});
		this.showAllLink = new KDCustomHTMLView;
		this.listView = this.listController.getView();
		this.listController.on("LazyLoadThresholdReached", this.bound("continueLoading"));
		this.indexedItems = {};
		group = KD.getSingleton("groupsController");
		group.on("MemberJoinedGroup", this.bound("addJoin"));
		group.on("LikeIsAdded", this.bound("addLike"));
		group.on("FollowHappened", this.bound("addFollow"));
		group.on("PostIsCreated", this.bound("addActivity"));
		group.on("PostIsDeleted", this.bound("deleteActivity"));
		group.on("LikeIsRemoved", this.bound("removeLike"));
		this.listController.listView.on("ItemWasAdded", function (_this) {
			return function (view) {
				var itemId, viewData;
				if (viewData = view.getData()) {
					itemId = _this.getItemId(viewData);
					return _this.indexedItems[itemId] = view
				}
			}
		}(this));
		this.load({});
		this.once("viewAppended", function (_this) {
			return function () {
				return _this.$(".kdscrollview").height(window.innerHeight - 120)
			}
		}(this))
	}
	__extends(ActivityTicker, _super);
	ActivityTicker.prototype.settingsMenu = function () {
		var filterSelected, menu;
		filterSelected = function (_this) {
			return function (filters) {
				var tryCount;
				null == filters && (filters = []);
				_this.listController.removeAllItems();
				_this.indexedItems = {};
				tryCount = 0;
				return _this.load({
					filters: filters,
					tryCount: tryCount
				})
			}
		}(this);
		menu = {
			All: {
				callback: function () {
					return filterSelected()
				}
			},
			Follower: {
				callback: function () {
					return filterSelected(["follower"])
				}
			},
			Like: {
				callback: function () {
					return filterSelected(["like"])
				}
			},
			Member: {
				callback: function () {
					return filterSelected(["member"])
				}
			}
		};
		return menu
	};
	ActivityTicker.prototype.getConstructorName = function (obj) {
		return obj && obj.bongo_ && obj.bongo_.constructorName ? obj.bongo_.constructorName : null
	};
	ActivityTicker.prototype.fetchTags = function (data, callback) {
		return data ? data.tags ? callback(null, data.tags) : data.fetchTags(callback) : callback(null, null)
	};
	ActivityTicker.prototype.addActivity = function (data) {
		var as, origin, source, subject, target;
		origin = data.origin, subject = data.subject;
		if (!this.isFiltered("activity")) {
			if (!this.getConstructorName(origin) || !this.getConstructorName(subject)) return console.warn("data is not valid");
			source = KD.remote.revive(subject);
			target = KD.remote.revive(origin);
			as = "author";
			if (!target.isExempt && !this.checkGuestUser(origin)) return this.fetchTags(source, function (_this) {
				return function (err, tags) {
					if (err) return log("discarding event, invalid data");
					_this.bindItemEvents(source);
					source.tags = tags;
					return _this.addNewItem({
						source: source,
						target: target,
						as: as
					})
				}
			}(this))
		}
	};
	ActivityTicker.prototype.deleteActivity = function (data) {
		var as, origin, source, subject, target;
		origin = data.origin, subject = data.subject;
		if (!this.isFiltered("activity")) {
			if (!this.getConstructorName(origin) || !this.getConstructorName(subject)) return console.warn("data is not valid");
			source = KD.remote.revive(subject);
			target = KD.remote.revive(origin);
			as = "author";
			return this.removeItem({
				source: source,
				target: target,
				as: as
			})
		}
	};
	ActivityTicker.prototype.addJoin = function (data) {
		var constructorName, id, member;
		member = data.member;
		if (!this.isFiltered("member")) {
			if (!member) return console.warn("member is not defined in new member event");
			constructorName = member.constructorName, id = member.id;
			return KD.remote.cacheable(constructorName, id, function (_this) {
				return function (err, account) {
					return err || !account ? console.error("account is not found", err) : KD.getSingleton("groupsController").ready(function () {
						var source;
						source = KD.getSingleton("groupsController").getCurrentGroup();
						return _this.addNewItem({
							as: "member",
							target: account,
							source: source
						})
					})
				}
			}(this))
		}
	};
	ActivityTicker.prototype.checkGuestUser = function (account) {
		var accountNickname;
		return account.profile && (accountNickname = account.profile.nickname) && /^guest-/.test(accountNickname) ? !0 : !1
	};
	ActivityTicker.prototype.checkForValidAccount = function (account) {
		var isNotMe;
		if (!account) return !1;
		isNotMe = account.getId() !== KD.whoami().getId();
		return account.isExempt && isNotMe ? !1 : this.checkGuestUser(account) && isNotMe ? !1 : !0
	};
	ActivityTicker.prototype.addFollow = function (data) {
		var constructorName, follower, id, origin;
		follower = data.follower, origin = data.origin;
		if (!this.isFiltered("follower")) {
			if (!follower || !origin) return console.warn("data is not valid");
			constructorName = follower.constructorName, id = follower.id;
			return KD.remote.cacheable(constructorName, id, function (_this) {
				return function (err, source) {
					var _ref, _ref1;
					if (err || !source) return console.log("account is not found");
					_ref = data.origin, id = _ref._id, _ref1 = _ref.bongo_, constructorName = _ref1.constructorName;
					return KD.remote.cacheable(constructorName, id, function (err, target) {
						var eventObj;
						if (err || !target) return console.log("account is not found");
						eventObj = {
							source: target,
							target: source,
							as: "follower"
						};
						if (_this.checkForValidAccount(source) && _this.checkForValidAccount(target)) {
							"JTag" === constructorName && (eventObj = {
								source: target,
								target: source,
								as: "follower"
							});
							return _this.addNewItem(eventObj)
						}
					})
				}
			}(this))
		}
	};
	ActivityTicker.prototype.addLike = function (data) {
		var constructorName, id, liker, origin, subject;
		liker = data.liker, origin = data.origin, subject = data.subject;
		if (!this.isFiltered("like")) {
			if (!(subject && liker && origin)) return console.warn("data is not valid");
			constructorName = liker.constructorName, id = liker.id;
			return KD.remote.cacheable(constructorName, id, function (_this) {
				return function (err, source) {
					if (err || !source) return console.log("account is not found", err, liker);
					id = origin._id;
					return KD.remote.cacheable("JAccount", id, function (err, target) {
						if (err || !target) return console.log("account is not found", err, origin);
						constructorName = subject.constructorName, id = subject.id;
						return KD.remote.cacheable(constructorName, id, function (err, subject) {
							var eventObj;
							if (err || !subject) return console.log("subject is not found", err, data.subject);
							if (_this.checkForValidAccount(source) && _this.checkForValidAccount(target)) {
								eventObj = {
									source: source,
									target: target,
									subject: subject,
									as: "like"
								};
								return "JNewStatusUpdate" === subject.bongo_.constructorName ? _this.fetchTags(subject, function (err, tags) {
									if (err) return log("discarding event, invalid data");
									subject.tags = tags;
									return _this.addNewItem(eventObj)
								}) : _this.addNewItem(eventObj)
							}
						})
					})
				}
			}(this))
		}
	};
	ActivityTicker.prototype.removeLike = function (data) {
		var as, liker, origin, source, subject, target;
		origin = data.origin, subject = data.subject, liker = data.liker;
		if (!this.getConstructorName(origin) || !this.getConstructorName(subject)) return console.warn("data is not valid");
		source = KD.remote.revive(liker);
		target = KD.remote.revive(origin);
		subject = KD.remote.revive(subject);
		as = "like";
		return this.removeItem({
			source: source,
			target: target,
			as: as,
			subject: subject
		})
	};
	ActivityTicker.prototype.addComment = function (data) {
		var constructorName, id, origin, replier, reply, subject;
		origin = data.origin, reply = data.reply, subject = data.subject, replier = data.replier;
		if (!this.isFiltered("comment")) {
			if (!(subject && reply && replier && origin)) return console.warn("data is not valid");
			constructorName = replier.constructorName, id = replier.id;
			return KD.remote.cacheable(constructorName, id, function (_this) {
				return function (err, source) {
					if (err || !source) return console.log("account is not found", err, liker);
					id = origin._id;
					return KD.remote.cacheable("JAccount", id, function (err, target) {
						if (err || !target) return console.log("account is not found", err, origin);
						constructorName = subject.constructorName, id = subject.id;
						return KD.remote.cacheable(constructorName, id, function (err, subject) {
							if (err || !subject) return console.log("subject is not found", err, data.subject);
							constructorName = reply.constructorName, id = reply.id;
							return KD.remote.cacheable(constructorName, id, function (err, object) {
								var eventObj;
								if (err || !object) return console.log("reply is not found", err, data.reply);
								if (_this.checkForValidAccount(source) && _this.checkForValidAccount(target)) {
									eventObj = {
										source: source,
										target: target,
										subject: subject,
										object: object,
										as: "reply"
									};
									return _this.addNewItem(eventObj)
								}
							})
						})
					})
				}
			}(this))
		}
	};
	ActivityTicker.prototype.continueLoading = function (loadOptions) {
		null == loadOptions && (loadOptions = {});
		loadOptions["continue"] = this.filters;
		return this.load(loadOptions)
	};
	ActivityTicker.prototype.filterItem = function (item) {
		var actor, as, source, target;
		as = item.as, source = item.source, target = item.target;
		if (!(source && target && as)) return null;
		if (this.checkGuestUser(source) || this.checkGuestUser(target)) return null;
		if ("commenter" === as) return null;
		if ("JNewStatusUpdate" === this.getConstructorName(source) && "JAccount" === this.getConstructorName(target) && "follower" === as) return null;
		actor = "JAccount" === this.getConstructorName(target) ? target : source;
		return actor.isExempt ? null : item
	};
	ActivityTicker.prototype.tryLoadingAgain = function (loadOptions) {
		null == loadOptions && (loadOptions = {});
		if (null == loadOptions.tryCount) return warn("Current try count is not defined, discarding request");
		if (loadOptions.tryCount >= 10) return warn("Reached max re-tries for What is Happening widget");
		loadOptions.tryCount++;
		return this.load(loadOptions)
	};
	ActivityTicker.prototype.load = function (loadOptions) {
		var lastItem, lastItemTimestamp, timestamp;
		null == loadOptions && (loadOptions = {});
		loadOptions.tryCount = loadOptions.tryCount || 0;
		loadOptions.filters && (this.filters = loadOptions.filters);
		loadOptions["continue"] && (this.filters = loadOptions.filters = loadOptions["continue"]);
		lastItem = this.listController.getItemsOrdered().last;
		if (lastItem && (timestamp = lastItem.getData().timestamp)) {
			lastItemTimestamp = new Date(timestamp).getTime();
			loadOptions.from = lastItemTimestamp
		}
		return KD.remote.api.ActivityTicker.fetch(loadOptions, function (_this) {
			return function (err, items) {
				var item, _i, _len;
				null == items && (items = []);
				_this.listController.hideLazyLoader();
				if (err) {
					warn(err);
					return _this.tryLoadingAgain(loadOptions)
				}
				for (_i = 0, _len = items.length; _len > _i; _i++) {
					item = items[_i];
					if (_this.filterItem(item)) {
						_this.bindItemEvents(item.source);
						_this.addNewItem(item, _this.listController.getItemCount())
					}
				}
				return _this.listController.getItemCount() < 15 ? _this.tryLoadingAgain(loadOptions) : void 0
			}
		}(this))
	};
	ActivityTicker.prototype.pistachio = function () {
		return '<div class="activity-ticker right-block-box">\n  <h3>What\'s happening </h3>\n  {{> this.listView}}\n</div>'
	};
	ActivityTicker.prototype.addNewItem = function (newItem, index) {
		var itemId, viewItem;
		null == index && (index = 0);
		itemId = this.getItemId(newItem);
		if (this.indexedItems[itemId]) {
			viewItem = this.indexedItems[itemId];
			return this.listController.moveItemToIndex(viewItem, 0)
		}
		return null != index ? this.listController.addItem(newItem, index) : this.listController.addItem(newItem)
	};
	ActivityTicker.prototype.removeItem = function (item) {
		var itemId, viewItem;
		itemId = this.getItemId(item);
		if (this.indexedItems[itemId]) {
			viewItem = this.indexedItems[itemId];
			return this.listController.removeItem(viewItem)
		}
	};
	ActivityTicker.prototype.getItemId = function (item) {
		var as, source, subject, target, timestamp;
		source = item.source, target = item.target, subject = item.subject, as = item.as, timestamp = item.timestamp;
		return "like" === as ? "" + source.getId() + "_" + target.getId() + "_" + as + "_" + (null != subject ? subject.getId() : void 0) : "" + source.getId() + "_" + target.getId() + "_" + as + "_" + timestamp
	};
	ActivityTicker.prototype.isFiltered = function (filter) {
		return this.filters && this.filters.length && __indexOf.call(this.filters, filter) < 0 ? !0 : !1
	};
	ActivityTicker.prototype.bindItemEvents = function (item) {
		return "JNewStatusUpdate" === this.getConstructorName(item) ? item.on("TagsUpdated", function (tags) {
			return item.tags = KD.remote.revive(tags)
		}) : void 0
	};
	return ActivityTicker
}(ActivityRightBase);
var ContentDisplayAuthorAvatar, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ContentDisplayAuthorAvatar = function (_super) {
	function ContentDisplayAuthorAvatar(options) {
		options || (options = {});
		options.tagName = "span";
		ContentDisplayAuthorAvatar.__super__.constructor.apply(this, arguments)
	}
	__extends(ContentDisplayAuthorAvatar, _super);
	ContentDisplayAuthorAvatar.prototype.viewAppended = function () {
		var account;
		account = this.getData().account;
		return this.setPartial(this.partial(account))
	};
	ContentDisplayAuthorAvatar.prototype.click = function () {
		var account;
		account = this.getData().account;
		return KD.getSingleton("appManager").tell("Members", "createContentDisplay", account)
	};
	ContentDisplayAuthorAvatar.prototype.partial = function (account) {
		var fallbackUrl, hash, host;
		hash = account.profile.hash;
		host = "//" + location.host + "/";
		fallbackUrl = "url(http://www.gravatar.com/avatar/" + hash + "?size=40&d=" + encodeURIComponent(host + "/a/images/defaultavatar/default.avatar.40.png") + ")";
		return "<span href='' style='background-image:" + fallbackUrl + ';\'></span>\n<span class="author">AUTHOR</span>'
	};
	return ContentDisplayAuthorAvatar
}(KDCustomHTMLView);
var ContentDisplayMeta, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ContentDisplayMeta = function (_super) {
	function ContentDisplayMeta() {
		return ContentDisplayMeta.__super__.constructor.apply(this, arguments)
	}
	__extends(ContentDisplayMeta, _super);
	ContentDisplayMeta.prototype.viewAppended = function () {
		var account, activity, _ref;
		this.unsetClass("kdview");
		_ref = this.getData(), activity = _ref.activity, account = _ref.account;
		return this.setPartial(this.partial(activity, account))
	};
	ContentDisplayMeta.prototype.click = function (event) {
		var account;
		if ($(event.target).is("a")) {
			account = this.getData().account;
			return KD.getSingleton("appManager").tell("Members", "createContentDisplay", account)
		}
	};
	ContentDisplayMeta.prototype.partial = function (activity, account) {
		var dom, name;
		name = KD.utils.getFullnameFromAccount(account, !0);
		dom = $("<div>In " + activity.group + ' by <a href="#">' + name + "</a> <time class='timeago' datetime=\"" + new Date(activity.meta.createdAt).format("isoUtcDateTime") + '"></time></div>');
		dom.find("time.timeago").timeago();
		return dom
	};
	return ContentDisplayMeta
}(KDView);
var ContentDisplayTags, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ContentDisplayTags = function (_super) {
	function ContentDisplayTags() {
		return ContentDisplayTags.__super__.constructor.apply(this, arguments)
	}
	__extends(ContentDisplayTags, _super);
	ContentDisplayTags.prototype.tags = ["linux", "ubuntu", "gentoo", "arch", "debian", "distro", "macosx", "windows"];
	ContentDisplayTags.prototype.viewAppended = function () {
		var data;
		this.setData(this.tags);
		data = this.getData();
		return this.setPartial(this.partial(data))
	};
	ContentDisplayTags.prototype.partial = function (data) {
		var index, max, partial, tag, _i, _len;
		partial = "";
		max = utils.getRandomNumber(11);
		for (index = _i = 0, _len = data.length; _len > _i; index = ++_i) {
			tag = data[index];
			max > index && (partial += "<span class='tag'>" + tag + "</span>")
		}
		return partial
	};
	return ContentDisplayTags
}(KDView);
var ContentDisplayComments, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ContentDisplayComments = function (_super) {
	function ContentDisplayComments(options, data) {
		ContentDisplayComments.__super__.constructor.apply(this, arguments);
		this.commentView = new CommentView({}, data);
		this.activityActions = new ActivityActionsView({
			delegate: this.commentView.commentList,
			cssClass: "comment-header"
		}, data)
	}
	__extends(ContentDisplayComments, _super);
	ContentDisplayComments.prototype.pistachio = function () {
		return "{{> this.activityActions}}\n{{> this.commentView}}"
	};
	return ContentDisplayComments
}(JView);
var ContentDisplayScoreBoard, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ContentDisplayScoreBoard = function (_super) {
	function ContentDisplayScoreBoard() {
		return ContentDisplayScoreBoard.__super__.constructor.apply(this, arguments)
	}
	__extends(ContentDisplayScoreBoard, _super);
	ContentDisplayScoreBoard.prototype.viewAppended = function () {
		return this.setPartial(this.partial(this.getData()))
	};
	ContentDisplayScoreBoard.prototype.partial = function () {
		return "<p>8 <span>Responses</span></p>\n<p>45 <span>Likes</span></p>\n<p>1234 <span>Views</span></p>"
	};
	return ContentDisplayScoreBoard
}(KDView);
var ActivityListItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ActivityListItemView = function (_super) {
	function ActivityListItemView(options, data) {
		null == options && (options = {});
		options.type = "activity";
		ActivityListItemView.__super__.constructor.call(this, options, data)
	}
	var getActivityChildCssClass;
	__extends(ActivityListItemView, _super);
	getActivityChildCssClass = function () {
		return "system-message"
	};
	ActivityListItemView.prototype.viewAppended = function () {
		return this.addChildView(this.getData())
	};
	ActivityListItemView.prototype.addChildView = function (data, callback) {
		null == callback && (callback = function () {});
		if (null != data ? data.bongo_ : void 0) {
			this.addSubView(new StatusActivityItemView({
				delegate: this
			}, data));
			return callback()
		}
	};
	ActivityListItemView.prototype.partial = function () {
		return ""
	};
	ActivityListItemView.prototype.hide = function () {
		return this.setClass("hidden-item")
	};
	ActivityListItemView.prototype.show = function () {
		return this.unsetClass("hidden-item")
	};
	return ActivityListItemView
}(KDListItemView);
var StatusActivityItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
StatusActivityItemView = function (_super) {
	function StatusActivityItemView(options, data) {
		var embedOptions;
		null == options && (options = {});
		null == data && (data = {});
		options.cssClass || (options.cssClass = "activity-item status");
		options.tooltip || (options.tooltip = {
			title: "Status Update",
			selector: "span.type-icon",
			offset: {
				top: 3,
				left: -5
			}
		});
		StatusActivityItemView.__super__.constructor.call(this, options, data);
		embedOptions = {
			hasDropdown: !1,
			delegate: this
		};
		if (null != data.link) {
			this.embedBox = new EmbedBox(embedOptions, data.link);
			this.twoColumns && this.setClass("two-columns")
		} else this.embedBox = new KDCustomHTMLView;
		this.timeAgoView = new KDTimeAgoView({}, this.getData().meta.createdAt);
		this.editWidgetWrapper = new KDCustomHTMLView({
			cssClass: "edit-widget-wrapper hidden"
		})
	}
	__extends(StatusActivityItemView, _super);
	JView.mixin(StatusActivityItemView.prototype);
	StatusActivityItemView.prototype.formatContent = function (str) {
		null == str && (str = "");
		str = this.utils.applyMarkdown(str);
		str = this.utils.expandTokens(str, this.getData());
		return str
	};
	StatusActivityItemView.prototype.viewAppended = function () {
		if (this.getData().constructor !== KD.remote.api.CStatusActivity) {
			JView.prototype.viewAppended.call(this);
			this.setAnchors();
			return this.utils.defer(function (_this) {
				return function () {
					var predicate, _ref;
					predicate = null != (null != (_ref = _this.getData().link) ? _ref.link_url : void 0) && "" !== _this.getData().link.link_url;
					return predicate ? _this.embedBox.show() : _this.embedBox.hide()
				}
			}(this))
		}
	};
	StatusActivityItemView.prototype.setAnchors = function () {
		return this.$("article a").each(function (index, element) {
			var beginning, href, origin, rest;
			origin = window.location.origin;
			href = element.getAttribute("href");
			if (href) {
				beginning = href.substring(0, origin.length);
				rest = href.substring(origin.length + 1);
				if (beginning !== origin) return element.setAttribute("target", "_blank");
				element.setAttribute("href", "/" + rest);
				element.classList.add("internal");
				return rest.match(/^Teamwork/) ? element.classList.add("teamwork") : void 0
			}
		})
	};
	StatusActivityItemView.prototype.click = function (event) {
		var href, target;
		target = event.target;
		if ($(target).is("article a.internal")) {
			this.utils.stopDOMEvent(event);
			href = target.getAttribute("href");
			return target.classList.contains("teamwork") && KD.singleton("appManager").get("Teamwork") ? window.open("" + window.location.origin + href, "_blank") : KD.singleton("router").handleRoute(href)
		}
	};
	StatusActivityItemView.prototype.pistachio = function () {
		return "{{> this.avatar}}\n{{> this.settingsButton}}\n{{> this.author}}\n{{> this.editWidgetWrapper}}\n{article{this.formatContent(#(body))}}\n{{> this.embedBox}}\n<footer>\n  {{> this.actionLinks}}\n  {{> this.timeAgoView}}\n</footer>\n{{> this.commentBox}}"
	};
	return StatusActivityItemView
}(ActivityItemChild);
var MemberMailLink, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
MemberMailLink = function (_super) {
	function MemberMailLink(options, data) {
		options = $.extend({
			tagName: "a",
			attributes: {
				href: "#"
			}
		}, options);
		MemberMailLink.__super__.constructor.call(this, options, data)
	}
	__extends(MemberMailLink, _super);
	JView.mixin(MemberMailLink.prototype);
	MemberMailLink.prototype.pistachio = function () {
		var name;
		name = KD.utils.getFullnameFromAccount(this.getData(), !0);
		return "<cite/><span>Contact " + name + "</span>"
	};
	MemberMailLink.prototype.click = function (event) {
		var member, profile;
		event.preventDefault();
		profile = (member = this.getData()).profile;
		return KD.getSingleton("appManager").tell("Inbox", "createNewMessageModal", [member])
	};
	return MemberMailLink
}(KDCustomHTMLView);
var ExternalProfileView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ExternalProfileView = function (_super) {
	function ExternalProfileView(options, account) {
		var mainController, provider;
		options.tagName || (options.tagName = "a");
		options.provider || (options.provider = "");
		options.cssClass = KD.utils.curry("external-profile " + options.provider, options.cssClass);
		options.attributes = {
			href: "#"
		};
		ExternalProfileView.__super__.constructor.call(this, options, account);
		this.linked = !1;
		provider = this.getOptions().provider;
		mainController = KD.getSingleton("mainController");
		mainController.on("ForeignAuthSuccess." + provider, this.bound("setLinkedState"))
	}
	__extends(ExternalProfileView, _super);
	ExternalProfileView.prototype.viewAppended = function () {
		ExternalProfileView.__super__.viewAppended.apply(this, arguments);
		this.setTooltip({
			title: "Click to link your " + this.getOption("nicename") + " account"
		});
		return this.setLinkedState()
	};
	ExternalProfileView.prototype.setLinkedState = function () {
		var account, firstName, nicename, provider, _ref;
		if (this.parent) {
			account = this.parent.getData();
			firstName = account.profile.firstName;
			_ref = this.getOptions(), provider = _ref.provider, nicename = _ref.nicename;
			return account.fetchStorage("ext|profile|" + provider, function (_this) {
				return function (err, storage) {
					var urlLocation;
					if (err) return warn(err);
					if (storage && (urlLocation = _this.getOption("urlLocation"))) {
						_this.setData(storage);
						_this.$().detach();
						_this.$().prependTo(_this.parent.$(".external-profiles"));
						_this.linked = !0;
						_this.setClass("linked");
						_this.setAttributes({
							href: JsPath.getAt(storage.content, urlLocation),
							target: "_blank"
						});
						return _this.setTooltip(KD.isMine(account) ? {
							title: "Go to my " + nicename + " profile"
						} : {
							title: "Go to " + firstName + "'s " + nicename + " profile"
						})
					}
				}
			}(this))
		}
	};
	ExternalProfileView.prototype.click = function (event) {
		var provider;
		if (!this.linked) {
			provider = this.getOptions().provider;
			if (KD.isMine(this.parent.getData())) {
				KD.utils.stopDOMEvent(event);
				return KD.singletons.oauthController.openPopup(provider)
			}
		}
	};
	ExternalProfileView.prototype.pistachio = function () {
		return '<span class="icon"></span>'
	};
	return ExternalProfileView
}(JView);
var AvatarChangeHeaderView, AvatarChangeView, ProfileContentEditableView, ProfileView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__bind = function (fn, me) {
		return function () {
			return fn.apply(me, arguments)
		}
	};
AvatarChangeHeaderView = function (_super) {
	function AvatarChangeHeaderView(options, data) {
		null == options && (options = {});
		options.tagName = "article";
		options.cssClass = "avatar-change-header";
		AvatarChangeHeaderView.__super__.constructor.call(this, options, data)
	}
	__extends(AvatarChangeHeaderView, _super);
	AvatarChangeHeaderView.prototype.viewAppended = function () {
		var button, options, _i, _len, _ref, _ref1, _results;
		AvatarChangeHeaderView.__super__.viewAppended.apply(this, arguments);
		options = this.getOptions();
		options.title && this.addSubView(new KDCustomHTMLView({
			tagName: "strong",
			partial: options.title
		}));
		if ((null != (_ref = options.buttons) ? _ref.length : void 0) > 0) {
			_ref1 = options.buttons;
			_results = [];
			for (_i = 0, _len = _ref1.length; _len > _i; _i++) {
				button = _ref1[_i];
				_results.push(this.addSubView(button))
			}
			return _results
		}
	};
	return AvatarChangeHeaderView
}(JView);
AvatarChangeView = function (_super) {
	function AvatarChangeView(options, data) {
		var action, isDNDSupported, isVideoSupported, view, _ref, _ref1;
		null == options && (options = {});
		this.setAvatar = __bind(this.setAvatar, this);
		this.updateAvatarImage = __bind(this.updateAvatarImage, this);
		this.setAvatarPreviewImage = __bind(this.setAvatarPreviewImage, this);
		this.setAvatarImage = __bind(this.setAvatarImage, this);
		options.cssClass = "avatar-change-menu";
		AvatarChangeView.__super__.constructor.call(this, options, data);
		_ref = detectFeatures(), isVideoSupported = _ref.isVideoSupported, isDNDSupported = _ref.isDNDSupported;
		this.on("viewAppended", function (_this) {
			return function () {
				return _this.overlay = new KDOverlayView
			}
		}(this));
		this.on("KDObjectWillBeDestroyed", function (_this) {
			return function () {
				return _this.overlay.destroy()
			}
		}(this));
		this.avatarData = null;
		this.avatarPreviewData = null;
		this.webcamTip = new KDView({
			cssClass: "webcam-tip",
			partial: "<cite>Please allow Koding to access your camera.</cite>"
		});
		this.takePhotoButton = new CustomLinkView({
			cssClass: "take-photo hidden",
			title: "Take Photo"
		});
		this.photoRetakeButton = new KDButtonView({
			cssClass: "clean-gray confirm avatar-button",
			icon: !0,
			iconOnly: !0,
			iconClass: "cross",
			callback: function (_this) {
				return function () {
					_this.changeHeader("photo");
					_this.takePhotoButton.show();
					return _this.webcamView.reset()
				}
			}(this)
		});
		this.reuploadButton = new KDButtonView({
			cssClass: "clean-gray confirm avatar-button",
			icon: !0,
			iconOnly: !0,
			iconClass: "cross",
			callback: this.bound("showUploadView")
		});
		this.photoButton = new KDButtonView({
			cssClass: "clean-gray avatar-button",
			title: "Take Photo",
			disabled: !isVideoSupported,
			callback: this.bound("showPhotoView")
		});
		this.uploadButton = new KDButtonView({
			cssClass: "clean-gray avatar-button",
			disabled: !isDNDSupported,
			title: "Upload Image",
			callback: this.bound("showUploadView")
		});
		this.gravatarButton = new KDButtonView({
			cssClass: "clean-gray avatar-button",
			title: "Use Gravatar",
			callback: function (_this) {
				return function () {
					_this.avatarPreviewData = _this.avatar.getGravatarUri();
					_this.setAvatarPreviewImage();
					_this.unsetWide();
					return _this.changeHeader("gravatar")
				}
			}(this)
		});
		this.gravatarConfirmButton = new KDButtonView({
			cssClass: "clean-gray confirm avatar-button",
			icon: !0,
			iconOnly: !0,
			iconClass: "okay",
			callback: function (_this) {
				return function () {
					_this.emit("UseGravatar");
					return _this.changeHeader()
				}
			}(this)
		});
		this.avatarHolder = new KDCustomHTMLView({
			cssClass: "avatar-holder",
			tagName: "div"
		});
		this.avatarHolder.addSubView(this.avatar = new AvatarStaticView({
			size: {
				width: 300,
				height: 300
			}
		}, this.getData()));
		this.loader = new KDLoaderView({
			size: {
				width: 15
			},
			loaderOptions: {
				color: "#ffffff",
				shape: "spiral"
			}
		});
		this.cancelPhoto = this.getCancelView();
		this.headers = {
			actions: new AvatarChangeHeaderView({
				buttons: [this.photoButton, this.uploadButton, this.gravatarButton]
			}),
			gravatar: new AvatarChangeHeaderView({
				title: "Use Gravatar",
				buttons: [this.getCancelView(), this.gravatarConfirmButton]
			}),
			photo: new AvatarChangeHeaderView({
				title: "Take Photo",
				buttons: [this.cancelPhoto]
			}),
			upload: new AvatarChangeHeaderView({
				title: "Upload Image",
				buttons: [this.getCancelView()]
			}),
			phototaken: new AvatarChangeHeaderView({
				title: "Take Photo",
				buttons: [this.getCancelView(), this.photoRetakeButton, this.getConfirmView()]
			}),
			imagedropped: new AvatarChangeHeaderView({
				title: "Upload Image",
				buttons: [this.getCancelView(), this.reuploadButton, this.getConfirmView()]
			}),
			loading: new AvatarChangeHeaderView({
				title: "Uploading and resizing your avatar, please wait...",
				buttons: [this.loader]
			})
		};
		this.wrapper = new KDCustomHTMLView({
			tagName: "section",
			cssClass: "wrapper"
		});
		_ref1 = this.headers;
		for (action in _ref1) {
			view = _ref1[action];
			this.wrapper.addSubView(view)
		}
		this.on("LoadingEnd", function (_this) {
			return function () {
				return _this.changeHeader()
			}
		}(this));
		this.on("LoadingStart", function (_this) {
			return function () {
				_this.changeHeader("loading");
				return _this.unsetWide()
			}
		}(this));
		this.once("viewAppended", function (_this) {
			return function () {
				_this.slideDownAvatar();
				return _this.loader.show()
			}
		}(this))
	}
	var detectFeatures;
	__extends(AvatarChangeView, _super);
	detectFeatures = function () {
		var isDNDSupported, isVideoSupported;
		isVideoSupported = KDWebcamView.getUserMediaVendor();
		isDNDSupported = function () {
			var tester;
			tester = document.createElement("div");
			return "draggable" in tester || "ondragstart" in tester && "ondrop" in tester
		}();
		return {
			isVideoSupported: isVideoSupported,
			isDNDSupported: isDNDSupported
		}
	};
	AvatarChangeView.prototype.showUploadView = function () {
		this.avatarData = this.avatar.getAvatar();
		this.changeHeader("upload");
		this.resetView();
		this.unsetWide();
		this.avatar.hide();
		this.avatarHolder.addSubView(this.uploaderView = new DNDUploader({
			title: "Drag and drop your avatar here!",
			uploadToVM: !1,
			size: {
				height: 280
			}
		}));
		return this.uploaderView.on("dropFile", function (_this) {
			return function (_arg) {
				var content, origin;
				origin = _arg.origin, content = _arg.content;
				if ("external" === origin) {
					_this.resetView();
					_this.avatarPreviewData = "data:image/png;base64," + btoa(content);
					_this.changeHeader("imagedropped");
					return _this.setAvatarPreviewImage()
				}
			}
		}(this))
	};
	AvatarChangeView.prototype.showPhotoView = function () {
		var release;
		this.avatarData = this.avatar.getAvatar();
		this.changeHeader("photo");
		this.resetView();
		this.avatar.hide();
		this.avatarHolder.addSubView(this.webcamTip);
		this.setWide();
		this.cancelPhoto.disable();
		this.getDelegate().avatarMenu.changeStickyState(!0);
		release = function (_this) {
			return function () {
				_this.cancelPhoto.enable();
				return _this.getDelegate().avatarMenu.changeStickyState(!1)
			}
		}(this);
		this.avatarHolder.addSubView(this.webcamView = new KDWebcamView({
			hideControls: !0,
			countdown: 3,
			snapTitle: "Take Avatar Picture",
			size: {
				width: 300
			},
			click: function (_this) {
				return function () {
					_this.webcamView.takePicture();
					_this.takePhotoButton.hide();
					return _this.changeHeader("phototaken")
				}
			}(this)
		}));
		this.webcamView.addSubView(this.takePhotoButton);
		this.webcamView.on("snap", function (_this) {
			return function (data) {
				return _this.avatarPreviewData = data
			}
		}(this));
		this.webcamView.on("allowed", function (_this) {
			return function () {
				release();
				_this.webcamTip.destroy();
				return _this.takePhotoButton.show()
			}
		}(this));
		return this.webcamView.on("forbidden", function (_this) {
			return function () {
				release();
				return _this.webcamTip.updatePartial("<cite>\n  You disabled the camera for Koding.\n  <a href='https://support.google.com/chrome/answer/2693767?hl=en' target='_blank'>How to fix?</a>\n</cite>")
			}
		}(this))
	};
	AvatarChangeView.prototype.resetView = function () {
		var _ref, _ref1;
		null != (_ref = this.webcamView) && _ref.destroy();
		this.webcamTip.destroy();
		null != (_ref1 = this.uploaderView) && _ref1.destroy();
		this.unsetWide();
		return this.avatar.show()
	};
	AvatarChangeView.prototype.setWide = function () {
		this.avatarHolder.setClass("wide");
		return this.avatar.setSize({
			width: 300,
			height: 225
		})
	};
	AvatarChangeView.prototype.unsetWide = function () {
		this.avatarHolder.unsetClass("wide");
		return this.avatar.setSize({
			width: 300,
			height: 300
		})
	};
	AvatarChangeView.prototype.setAvatarImage = function () {
		return this.updateAvatarImage(this.avatarData)
	};
	AvatarChangeView.prototype.setAvatarPreviewImage = function () {
		this.avatarData = this.avatar.getAvatar();
		return this.updateAvatarImage(this.avatarPreviewData)
	};
	AvatarChangeView.prototype.updateAvatarImage = function (imageData) {
		this.avatar.setAvatar("" + imageData);
		return this.avatar.setSize({
			width: 300,
			height: 300
		})
	};
	AvatarChangeView.prototype.setAvatar = function () {
		this.setAvatarImage();
		this.avatar.show();
		return this.emit("UsePhoto", this.avatarData)
	};
	AvatarChangeView.prototype.getConfirmView = function () {
		return new KDButtonView({
			cssClass: "clean-gray confirm avatar-button",
			icon: !0,
			iconOnly: !0,
			iconClass: "okay",
			callback: function (_this) {
				return function () {
					_this.avatarData = _this.avatarPreviewData;
					_this.avatarPreviewData = null;
					return _this.setAvatar()
				}
			}(this)
		})
	};
	AvatarChangeView.prototype.getCancelView = function (callback) {
		return new KDButtonView({
			cssClass: "clean-gray cancel avatar-button",
			title: "Cancel",
			callback: function (_this) {
				return function () {
					_this.changeHeader("actions");
					_this.resetView();
					_this.avatarPreviewData = null;
					_this.setAvatarImage();
					return "function" == typeof callback ? callback() : void 0
				}
			}(this)
		})
	};
	AvatarChangeView.prototype.slideDownAvatar = function () {
		return this.avatarHolder.setClass("opened")
	};
	AvatarChangeView.prototype.slideUpAvatar = function () {
		return this.avatarHolder.unsetClass("opened")
	};
	AvatarChangeView.prototype.changeHeader = function (viewname) {
		var action, view, _ref, _ref1, _ref2;
		null == viewname && (viewname = "actions");
		_ref = this.headers;
		for (action in _ref) {
			view = _ref[action];
			null != (_ref1 = this.headers[action]) && _ref1.hide()
		}
		return null != (_ref2 = this.headers[viewname]) ? _ref2.show() : void 0
	};
	AvatarChangeView.prototype.pistachio = function () {
		return '<i class="arrow"></i>\n{{> this.wrapper}}\n{{> this.avatarHolder}}'
	};
	return AvatarChangeView
}(JView);
ProfileContentEditableView = function (_super) {
	function ProfileContentEditableView() {
		return ProfileContentEditableView.__super__.constructor.apply(this, arguments)
	}
	__extends(ProfileContentEditableView, _super);
	JView.mixin(ProfileContentEditableView.prototype);
	return ProfileContentEditableView
}(KDContentEditableView);
ProfileView = function (_super) {
	function ProfileView(options, data) {
		var avatarOptions, focus, mainController, nickname, save, userDomain, _ref;
		null == options && (options = {});
		options.bind = "mouseenter mouseleave";
		ProfileView.__super__.constructor.call(this, options, data);
		this.memberData = this.getData();
		mainController = KD.getSingleton("mainController");
		if (KD.checkFlag("exempt", this.memberData) && !KD.checkFlag("super-admin")) return KD.getSingleton("router").handleRoute("/Activity");
		this.firstName = new ProfileContentEditableView({
			tagName: "span",
			testPath: "profile-first-name",
			pistachio: "{{#(profile.firstName) || ''}}",
			cssClass: "firstName",
			placeholder: "First name",
			delegate: this,
			tabNavigation: !0,
			validate: {
				rules: {
					required: !0,
					maxLength: 25
				},
				messages: {
					required: "First name is required"
				}
			}
		}, this.memberData);
		this.lastName = new ProfileContentEditableView({
			tagName: "span",
			testPath: "profile-last-name",
			pistachio: "{{#(profile.lastName) || ''}}",
			cssClass: "lastName",
			placeholder: "Last name",
			delegate: this,
			tabNavigation: !0,
			validate: {
				rules: {
					maxLength: 25
				}
			}
		}, this.memberData);
		this.bio = new ProfileContentEditableView({
			testPath: "profile-bio",
			pistachio: "{{#(profile.about) || ''}}",
			cssClass: "bio",
			placeholder: KD.isMine(this.memberData) ? "You haven't entered anything in your bio yet. Why not add something now?" : "",
			delegate: this,
			tabNavigation: !0
		}, this.memberData);
		save = function () {
			this.getDelegate().save();
			return this.setEditingMode(!1)
		};
		focus = function (input) {
			input.setEditingMode(!0);
			return input.focus()
		};
		if (this.memberData.getId() === KD.whoami().getId()) {
			this.firstName.on("NextTabStop", function (_this) {
				return function () {
					return focus(_this.lastName)
				}
			}(this));
			this.firstName.on("PreviousTabStop", function (_this) {
				return function () {
					return focus(_this.bio)
				}
			}(this));
			this.lastName.on("NextTabStop", function (_this) {
				return function () {
					return focus(_this.bio)
				}
			}(this));
			this.lastName.on("PreviousTabStop", function (_this) {
				return function () {
					return focus(_this.firstName)
				}
			}(this));
			this.bio.on("NextTabStop", function (_this) {
				return function () {
					return focus(_this.firstName)
				}
			}(this));
			this.bio.on("PreviousTabStop", function (_this) {
				return function () {
					return focus(_this.lastName)
				}
			}(this));
			this.firstName.on("click", function () {
				return this.setEditingMode(!0)
			});
			this.lastName.on("click", function () {
				return this.setEditingMode(!0)
			});
			this.bio.on("click", function () {
				return this.setEditingMode(!0)
			});
			this.firstName.on("EnterPressed", save);
			this.lastName.on("EnterPressed", save);
			this.bio.on("EnterPressed", save);
			this.firstName.on("BlurHappened", save);
			this.lastName.on("BlurHappened", save);
			this.bio.on("BlurHappened", save)
		}
		avatarOptions = {
			showStatus: !0,
			size: {
				width: 81,
				height: 81
			},
			click: function (_this) {
				return function () {
					var pos, _ref;
					pos = {
						top: _this.avatar.getBounds().y - 8,
						left: _this.avatar.getBounds().x - 8
					};
					if (KD.isMine(_this.memberData)) {
						null != (_ref = _this.avatarMenu) && _ref.destroy();
						_this.avatarMenu = new KDContextMenu({
							menuWidth: 312,
							cssClass: "avatar-menu dark",
							delegate: _this.avatar,
							x: _this.avatar.getX() + 96,
							y: _this.avatar.getY() - 7
						}, {
							customView: _this.avatarChange = new AvatarChangeView({
								delegate: _this
							}, _this.memberData)
						});
						_this.avatarChange.on("UseGravatar", function () {
							return _this.avatarSetGravatar()
						});
						return _this.avatarChange.on("UsePhoto", function (dataURI) {
							var avatarBase64, _, _ref1;
							_ref1 = dataURI.split(","), _ = _ref1[0], avatarBase64 = _ref1[1];
							_this.avatar.setAvatar("url(" + dataURI + ")");
							_this.avatarChange.emit("LoadingStart");
							return _this.uploadAvatar(avatarBase64, function () {
								return _this.avatarChange.emit("LoadingEnd")
							})
						})
					}
					_this.modal = new KDModalView({
						cssClass: "avatar-container",
						width: 390,
						fx: !0,
						overlay: !0,
						draggable: !0,
						position: pos
					});
					return _this.modal.addSubView(_this.bigAvatar = new AvatarStaticView({
						size: {
							width: 300,
							height: 300
						}
					}, _this.memberData))
				}
			}(this)
		};
		KD.isMine(this.memberData) && (avatarOptions.tooltip = {
			title: "<p class='centertext'>Click avatar to edit</p>",
			placement: "below",
			arrow: {
				placement: "top"
			}
		});
		this.avatar = new AvatarStaticView(avatarOptions, this.memberData);
		userDomain = this.memberData.profile.nickname + "." + KD.config.userSitesDomain;
		this.userHomeLink = new JCustomHTMLView({
			tagName: "a",
			cssClass: "user-home-link",
			attributes: {
				href: "http://" + userDomain,
				target: "_blank"
			},
			pistachio: userDomain,
			click: function (_this) {
				return function (event) {
					return "online" !== _this.memberData.onlineStatus ? KD.utils.stopDOMEvent(event) : void 0
				}
			}(this)
		});
		this.followButton = KD.whoami().getId() === this.memberData.getId() ? new KDCustomHTMLView : new MemberFollowToggleButton({
			style: "solid"
		}, this.memberData);
		nickname = this.memberData.profile.nickname;
		this.followers = new JView({
			tagName: "a",
			attributes: {
				href: ""
			},
			pistachio: "<span>{{#(counts.followers)}}</span>Followers",
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return KD.getSingleton("router").handleRoute("/" + nickname + "?filter=followers", {
						state: _this.memberData
					})
				}
			}(this)
		}, this.memberData);
		this.following = new JView({
			tagName: "a",
			attributes: {
				href: ""
			},
			pistachio: "<span>{{#(counts.following)}}</span>Following",
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return KD.getSingleton("router").handleRoute("/" + nickname + "?filter=following", {
						state: _this.memberData
					})
				}
			}(this)
		}, this.memberData);
		this.likes = new JView({
			tagName: "a",
			attributes: {
				href: ""
			},
			pistachio: "<span>{{#(counts.likes)}}</span>Likes",
			click: function (_this) {
				return function (event) {
					event.preventDefault();
					return KD.getSingleton("router").handleRoute("/" + nickname + "?filter=likes", {
						state: _this.memberData
					})
				}
			}(this)
		}, this.memberData);
		this.sendMessageLink = new KDCustomHTMLView;
		KD.isMine(this.memberData) || (this.sendMessageLink = new MemberMailLink({}, this.memberData));
		if (this.sendMessageLink instanceof MemberMailLink) {
			this.sendMessageLink.on("AutoCompleteNeedsMemberData", function (_this) {
				return function (pubInst, event) {
					var blacklist, callback, inputValue;
					callback = event.callback, inputValue = event.inputValue, blacklist = event.blacklist;
					return _this.fetchAutoCompleteForToField(inputValue, blacklist, callback)
				}
			}(this));
			null != (_ref = this.sendMessageLink) && _ref.on("MessageShouldBeSent", function (_this) {
				return function (_arg) {
					var callback, formOutput;
					formOutput = _arg.formOutput, callback = _arg.callback;
					return _this.prepareMessage(formOutput, callback)
				}
			}(this))
		}
		this.trollSwitch = KD.checkFlag("super-admin" && !KD.isMine(this.memberData)) ? new KDCustomHTMLView({
			tagName: "a",
			partial: KD.checkFlag("exempt", this.memberData) ? "Unmark Troll" : "Mark as Troll",
			cssClass: "troll-switch",
			click: function (_this) {
				return function () {
					return KD.checkFlag("exempt", _this.memberData) ? mainController.unmarkUserAsTroll(_this.memberData) : mainController.markUserAsTroll(_this.memberData)
				}
			}(this)
		}) : new KDCustomHTMLView;
		this.userBadgesController = new KDListViewController({
			startWithLazyLoader: !1,
			view: new KDListView({
				cssClass: "badge-list",
				itemClass: UserBadgeView
			})
		});
		this.badgeHeader = new KDCustomHTMLView({
			tagName: "h3"
		});
		this.memberData.fetchMyBadges(function (_this) {
			return function (err, badges) {
				if (badges.length > 0) {
					_this.badgeHeader.setPartial("Badges");
					return _this.userBadgesController.instantiateListItems(badges)
				}
			}
		}(this));
		this.userBadgesView = this.userBadgesController.getView();
		this.badgeItemsList = new KDCustomHTMLView;
		this.thankButton = new KDCustomHTMLView;
		if (KD.hasAccess("assign badge")) {
			this.badgeItemsList = new UserPropertyList({}, {
				counts: this.memberData.counts
			});
			this.thankButton = new KDButtonView({
				cssClass: "solid green",
				title: "+1 rep",
				type: "submit",
				callback: function (_this) {
					return function () {
						return KD.whoami().likeMember(_this.memberData.profile.nickname, function (err) {
							if (err) return warn(err);
							KD.getSingleton("badgeController").checkBadge({
								source: "JAccount",
								property: "staffLikes",
								relType: "like",
								targetSelf: 1
							});
							_this.thankButton.disable();
							return _this.utils.wait(3e3, function () {
								return _this.thankButton.enable()
							})
						})
					}
				}(this)
			});
			this.thankButton.hide();
			this.badgeItemsList.hide();
			this.on("mouseenter", function (_this) {
				return function () {
					_this.thankButton.show();
					return _this.badgeItemsList.show()
				}
			}(this));
			this.on("mouseleave", function (_this) {
				return function () {
					_this.thankButton.hide();
					return _this.badgeItemsList.hide()
				}
			}(this))
		}
	}
	__extends(ProfileView, _super);
	ProfileView.prototype.viewAppended = function () {
		ProfileView.__super__.viewAppended.apply(this, arguments);
		this.createExternalProfiles();
		this.createBadges();
		return KD.utils.defer(function (_this) {
			return function () {
				if (KD.isMine(_this.memberData)) {
					_this.firstName.getValue() || _this.firstName.setPlaceholder();
					_this.lastName.getValue() || _this.lastName.setPlaceholder();
					return _this.bio.getValue() ? void 0 : _this.bio.setPlaceholder()
				}
			}
		}(this))
	};
	ProfileView.prototype.uploadAvatar = function (avatarData, callback) {
		return FSHelper.s3.upload("avatar.png", avatarData, "user", "", function (_this) {
			return function (err, url) {
				var resized;
				resized = KD.utils.proxifyUrl(url, {
					crop: !0,
					width: 300,
					height: 300
				});
				return _this.memberData.modify({
					"profile.avatar": [url, +new Date].join("?")
				}, callback)
			}
		}(this))
	};
	ProfileView.prototype.avatarSetGravatar = function (callback) {
		return this.memberData.modify({
			"profile.avatar": ""
		}, callback)
	};
	ProfileView.prototype.createExternalProfiles = function () {
		var appManager, externalProfiles, options, provider, view, _ref, _results;
		appManager = KD.getSingleton("appManager");
		externalProfiles = MembersAppController.externalProfiles;
		_results = [];
		for (provider in externalProfiles)
			if (__hasProp.call(externalProfiles, provider)) {
				options = externalProfiles[provider];
				null != (_ref = this["" + provider + "View"]) && _ref.destroy();
				this["" + provider + "View"] = view = new ExternalProfileView({
					provider: provider,
					nicename: options.nicename,
					urlLocation: options.urlLocation
				});
				_results.push(this.addSubView(view, ".external-profiles"))
			}
		return _results
	};
	ProfileView.prototype.createBadges = function () {};
	ProfileView.prototype.save = function () {
		var input, _i, _len, _ref;
		_ref = [this.firstName, this.lastName];
		for (_i = 0, _len = _ref.length; _len > _i; _i++) {
			input = _ref[_i];
			if (!input.validate()) return
		}
		return this.memberData.modify({
			"profile.firstName": this.firstName.getValue(),
			"profile.lastName": this.lastName.getValue(),
			"profile.about": this.bio.getValue()
		}, function () {
			return function (err) {
				var message, state;
				if (err) {
					state = "error";
					message = "There was an error updating your profile"
				} else {
					state = "success";
					message = "Your profile is updated"
				}
				return new KDNotificationView({
					title: message,
					type: "mini",
					cssClass: state,
					duration: 2500
				})
			}
		}(this))
	};
	ProfileView.prototype.cancel = function (event) {
		event && KD.utils.stopDOMEvent(event);
		return this.memberData.emit("update")
	};
	ProfileView.prototype.fetchAutoCompleteForToField = function (inputValue, blacklist, callback) {
		return KD.remote.api.JAccount.byRelevance(inputValue, {
			blacklist: blacklist
		}, function (err, accounts) {
			return callback(accounts)
		})
	};
	ProfileView.prototype.fetchAutoCompleteDataForTags = function (inputValue, blacklist, callback) {
		return KD.remote.api.JTag.byRelevanceForSkills(inputValue, {
			blacklist: blacklist
		}, function (err, tags) {
			return err ? log("there was an error fetching topics " + err.message) : "function" == typeof callback ? callback(tags) : void 0
		})
	};
	ProfileView.prototype.prepareMessage = function (formOutput, callback) {
		var body, recipients, subject, to;
		body = formOutput.body, subject = formOutput.subject, recipients = formOutput.recipients;
		to = recipients.join(" ");
		return this.sendMessage({
			to: to,
			body: body,
			subject: subject
		}, function (err, message) {
			new KDNotificationView({
				title: err ? "Failure!" : "Success!",
				duration: 1e3
			});
			message.mark("read");
			return "function" == typeof callback ? callback(err, message) : void 0
		})
	};
	ProfileView.prototype.sendMessage = function (messageDetails, callback) {
		return KD.isGuest() ? new KDNotificationView({
			title: "Sending private message for guests not allowed"
		}) : KD.remote.api.JPrivateMessage.create(messageDetails, callback)
	};
	ProfileView.prototype.putNick = function (nick) {
		return "@" + nick
	};
	ProfileView.prototype.updateUserHomeLink = function () {
		var _ref;
		if (this.userHomeLink) {
			if ("online" === this.memberData.onlineStatus) {
				this.userHomeLink.unsetClass("offline");
				return null != (_ref = this.userHomeLink.tooltip) ? _ref.destroy() : void 0
			}
			this.userHomeLink.setClass("offline");
			return this.userHomeLink.setTooltip({
				title: "" + this.memberData.profile.nickname + "'s VM is offline",
				placement: "right"
			})
		}
	};
	ProfileView.prototype.render = function () {
		this.updateUserHomeLink();
		return ProfileView.__super__.render.apply(this, arguments)
	};
	ProfileView.prototype.pistachio = function () {
		var account, amountOfDays, onlineStatus;
		account = this.getData();
		amountOfDays = Math.floor((new Date - new Date(account.meta.createdAt)) / 864e5);
		onlineStatus = account.onlineStatus ? "online" : "offline";
		return '<div class="users-profile clearfix">\n  {{> this.avatar}}\n  <h3 class="full-name">{{> this.firstName}} {{> this.lastName}}</h3>\n  {{> this.bio}}\n  {{> this.followButton}}\n  <div class="profilestats">\n    {{> this.followers}}\n    {{> this.following}}\n    {{> this.likes}}\n  </div>\n</div>\n<div class="user-badges">\n  {{> this.badgeHeader}}\n  {{> this.userBadgesView}}\n</div>\n{{> this.badgeItemsList}}\n{{> this.thankButton}}'
	};
	return ProfileView
}(JView);
var UserBadgeView, UserPropertyList, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
UserBadgeView = function (_super) {
	function UserBadgeView(options, data) {
		var description, iconURL, title, _ref;
		null == options && (options = {});
		UserBadgeView.__super__.constructor.call(this, options, data);
		_ref = this.getData(), iconURL = _ref.iconURL, description = _ref.description, title = _ref.title;
		this.badgeIcon = new KDCustomHTMLView({
			tagName: "img",
			size: {
				width: 70,
				height: 70
			},
			attributes: {
				src: iconURL,
				title: description || ""
			}
		});
		this.title = new KDCustomHTMLView({
			partial: title
		})
	}
	__extends(UserBadgeView, _super);
	UserBadgeView.prototype.viewAppended = function () {
		this.addSubView(this.badgeIcon);
		return this.addSubView(this.title)
	};
	return UserBadgeView
}(KDListItemView);
UserPropertyList = function (_super) {
	function UserPropertyList(options, data) {
		null == options && (options = {});
		options.type = "user-properties";
		UserPropertyList.__super__.constructor.call(this, options, data)
	}
	__extends(UserPropertyList, _super);
	JView.mixin(UserPropertyList.prototype);
	UserPropertyList.prototype.pistachio = function () {
		return ' <h3>User Properties <span>(staff only)<span></h3>\n <div class="badge-property">\n  <p>Likes count : {span.number{#(counts.likes) || 0}}</p>\n  <p>Topic count : {span.number{#(counts.topics) || 0}}</p>\n  <p>Follower count : {span.number{#(counts.followers) || 0}}</p>\n  <p>Comments count : {span.number{#(counts.comments) || 0}}</p>\n  <p>Following count : {span.number{#(counts.following) || 0}}</p>\n  <p>Invitations count : {span.number{#(counts.invitations) || 0}}</p>\n  <p>Staff Likes count : {span.number{#(counts.staffLikes) || 0}}</p>\n  <p>Referred User count : {span.number{#(counts.referredUsers) || 0}}</p>\n  <p>Status updates count : {span.number{#(counts.statusUpdates) || 0}}</p>\n  <p>Last Login : {span.number{#(counts.lastLoginDate) || 0}}</p>\n</div>'
	};
	return UserPropertyList
}(KDListView);
var MembersListItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
MembersListItemView = function (_super) {
	function MembersListItemView(options, data) {
		var avatarSize;
		null == options && (options = {});
		options.type = "member";
		null == options.avatar && (options.avatar = {
			size: {
				width: 30,
				height: 30
			}
		});
		MembersListItemView.__super__.constructor.call(this, options, data);
		data = this.getData();
		avatarSize = this.getOption("avatar").size;
		this.avatar = new AvatarView({
			size: {
				width: avatarSize.width,
				height: avatarSize.height
			},
			cssClass: "avatarview",
			showStatus: !0
		}, data);
		this.actor = new ProfileLinkView({}, data);
		this.followersAndFollowing = new JCustomHTMLView({
			cssClass: "user-numbers",
			pistachio: "{{#(counts.followers)}} followers {{#(counts.following)}} following"
		}, data);
		data.getId() !== KD.whoami().getId() && (this.followButton = new FollowButton({
			title: "follow",
			icon: !0,
			stateOptions: {
				unfollow: {
					title: "unfollow",
					cssClass: "following-account"
				}
			},
			dataType: "JAccount"
		}, data))
	}
	__extends(MembersListItemView, _super);
	MembersListItemView.prototype.viewAppended = function () {
		this.addSubView(this.avatar);
		this.followButton && this.addSubView(this.followButton);
		this.addSubView(this.actor);
		return this.addSubView(this.followersAndFollowing)
	};
	return MembersListItemView
}(KDListItemView);
var GroupMembersPageListItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
GroupMembersPageListItemView = function (_super) {
	function GroupMembersPageListItemView(options, data) {
		null == options && (options = {});
		options.cssClass = "clearfix";
		options.avatar = {
			size: {
				width: 50,
				height: 50
			}
		};
		GroupMembersPageListItemView.__super__.constructor.call(this, options, data);
		if (data.getId() !== KD.whoami().getId()) {
			this.followButton = new FollowButton({
				style: "solid green medium",
				title: "follow",
				cssClass: "follow-button",
				stateOptions: {
					unfollow: {
						title: "following",
						cssClass: "solid light-gray medium"
					},
					following: {
						title: "unfollow",
						cssClass: "solid red medium"
					},
					follow: {
						title: "follow",
						cssClass: "solid green medium"
					}
				},
				dataType: "JAccount"
			}, data);
			this.followButton.unsetClass("follow-btn")
		}
	}
	__extends(GroupMembersPageListItemView, _super);
	return GroupMembersPageListItemView
}(MembersListItemView);
var NewMemberActivityListItem, NewMemberListItem, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
NewMemberActivityListItem = function (_super) {
	function NewMemberActivityListItem(options, data) {
		null == options && (options = {});
		options.avatarSizes = [30, 30];
		NewMemberActivityListItem.__super__.constructor.call(this, options, data)
	}
	__extends(NewMemberActivityListItem, _super);
	NewMemberActivityListItem.prototype.pistachio = function () {
		return "<span>{{> this.avatar}}</span>\n<div class='member-details'>\n  <header class='personal'>\n    <h3>{{> this.profileLink}}</h3>\n  </header>\n  <p>{{this.utils.applyTextExpansions(#(profile.about), true)}}</p>\n  <footer>\n    <span class='button-container'>{{> this.followButton}}</span>\n  </footer>\n</div>"
	};
	return NewMemberActivityListItem
}(MembersListItemView);
NewMemberListItem = function (_super) {
	function NewMemberListItem(options, data) {
		null == options && (options = {});
		options.tagName = "li";
		NewMemberListItem.__super__.constructor.call(this, options, data)
	}
	__extends(NewMemberListItem, _super);
	NewMemberListItem.prototype.fetchUserDetails = function () {
		return KD.remote.cacheable("JAccount", this.getData().id, function (_this) {
			return function (err, res) {
				return _this.addSubView(new NewMemberActivityListItem({}, res))
			}
		}(this))
	};
	NewMemberListItem.prototype.viewAppended = function () {
		this.setTemplate(this.pistachio());
		this.template.update();
		return this.fetchUserDetails()
	};
	NewMemberListItem.prototype.pistachio = function () {
		return ""
	};
	return NewMemberListItem
}(KDListItemView);
var MemberActivityListController, MembersAppController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
MembersAppController = function (_super) {
	function MembersAppController(options, data) {
		null == options && (options = {});
		options.view = new KDView({
			cssClass: "content-page members"
		});
		options.appInfo = {
			name: "Members"
		};
		this.appManager = KD.getSingleton("appManager");
		MembersAppController.__super__.constructor.call(this, options, data);
		this.once("MemberListLoaded", function () {
			return KD.mixpanel("Load member list, success")
		})
	}
	var externalProfiles;
	__extends(MembersAppController, _super);
	KD.registerAppClass(MembersAppController, {
		name: "Members",
		routes: {
			"/:name?/Members": function (_arg) {
				var appManager, params, query, router, _ref;
				params = _arg.params, query = _arg.query;
				_ref = KD.singletons, router = _ref.router, appManager = _ref.appManager;
				return KD.getSingleton("groupsController").ready(function () {
					var group;
					group = KD.getGroup();
					return KD.getSingleton("appManager").tell("Members", "createContentDisplay", group, function (contentDisplay) {
						return contentDisplay.emit("handleQuery", {
							filter: "members"
						})
					})
				})
			}
		},
		hiddenHandle: !0
	});
	externalProfiles = KD.config.externalProfiles;
	MembersAppController.prototype.createContentDisplay = function (model, callback) {
		var JAccount, contentDisplay, type;
		null == callback && (callback = function () {});
		KD.singletons.appManager.setFrontApp(this);
		JAccount = KD.remote.api.JAccount;
		type = model instanceof JAccount ? "profile" : "members";
		contentDisplay = new KDView({
			cssClass: "member content-display",
			type: type
		});
		contentDisplay.on("handleQuery", function (_this) {
			return function (query) {
				return _this.ready(function () {
					var _ref;
					return null != (_ref = _this.feedController) && "function" == typeof _ref.handleQuery ? _ref.handleQuery(query) : void 0
				})
			}
		}(this));
		contentDisplay.once("KDObjectWillBeDestroyed", function () {
			return KD.singleton("appManager").tell("Activity", "resetProfileLastTo")
		});
		return KD.getSingleton("groupsController").ready(function (_this) {
			return function () {
				contentDisplay.$("div.lazy").remove();
				"profile" === type ? _this.createProfileView(contentDisplay, model) : _this.createGroupMembersView(contentDisplay);
				_this.showContentDisplay(contentDisplay);
				return _this.utils.defer(function () {
					return callback(contentDisplay)
				})
			}
		}(this))
	};
	MembersAppController.prototype.createProfileView = function (contentDisplay, model) {
		return this.prepareProfileView(model, function (_this) {
			return function (profileView) {
				contentDisplay.addSubView(profileView);
				return _this.prepareFeederView(model, function (feederView) {
					contentDisplay.addSubView(feederView);
					return contentDisplay.setCss({
						minHeight: window.innerHeight
					})
				})
			}
		}(this))
	};
	MembersAppController.prototype.createGroupMembersView = function (contentDisplay) {
		contentDisplay.addSubView(new HeaderViewSection({
			title: "Members",
			type: "big"
		}));
		return this.prepareFeederView(KD.whoami(), function (feederView) {
			contentDisplay.addSubView(feederView);
			return contentDisplay.setCss({
				minHeight: window.innerHeight
			})
		})
	};
	MembersAppController.prototype.prepareFeederView = function (account, callback) {
		var auxVerb, owner, windowController;
		windowController = KD.getSingleton("windowController");
		if (KD.isMine(account)) {
			owner = "you";
			auxVerb = {
				have: "have",
				be: "are"
			}
		} else {
			owner = KD.utils.getFullnameFromAccount(account);
			auxVerb = {
				have: "has",
				be: "is"
			}
		}
		return KD.getSingleton("appManager").tell("Feeder", "createContentFeedController", {
			itemClass: ActivityListItemView,
			listControllerClass: MemberActivityListController,
			listCssClass: "activity-related",
			limitPerPage: 8,
			useHeaderNav: !0,
			delegate: this,
			creator: account,
			filter: {
				statuses: {
					noItemFoundText: "" + owner + " " + auxVerb.have + " not shared any posts yet.",
					dataSource: function () {
						return function (selector, options, callback) {
							null == options && (options = {});
							options.originId = account.getId();
							return KD.getSingleton("appManager").tell("Activity", "fetchActivitiesProfilePage", options, callback)
						}
					}(this)
				},
				followers: {
					loggedInOnly: !0,
					itemClass: GroupMembersPageListItemView,
					listControllerClass: KDListViewController,
					listCssClass: "member-related",
					noItemFoundText: "No one is following " + owner + " yet.",
					dataSource: function () {
						return function (selector, options, callback) {
							options.groupId || (options.groupId = KD.getGroup().getId());
							return account.fetchFollowersWithRelationship(selector, options, callback)
						}
					}(this)
				},
				following: {
					loggedInOnly: !0,
					itemClass: GroupMembersPageListItemView,
					listControllerClass: KDListViewController,
					listCssClass: "member-related",
					noItemFoundText: "" + owner + " " + auxVerb.be + " not following anyone.",
					dataSource: function () {
						return function (selector, options, callback) {
							options.groupId || (options.groupId = KD.getGroup().getId());
							return account.fetchFollowingWithRelationship(selector, options, callback)
						}
					}(this)
				},
				likes: {
					loggedInOnly: !0,
					noItemFoundText: "" + owner + " " + auxVerb.have + " not liked any posts yet.",
					dataSource: function (selector, options, callback) {
						selector = {
							sourceName: {
								$in: ["JNewStatusUpdate"]
							}
						};
						return account.fetchLikedContents(options, selector, callback)
					}
				},
				members: {
					noItemFoundText: "There is no member.",
					itemClass: GroupMembersPageListItemView,
					listControllerClass: KDListViewController,
					listCssClass: "member-related",
					title: "",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							var group;
							group = KD.getGroup();
							return group.fetchMembers(selector, options, function (err, res) {
								err || _this.emit("MemberListLoaded");
								return callback(err, res)
							})
						}
					}(this)
				}
			},
			sort: {
				modifiedAt: {
					title: "Latest activity",
					direction: -1
				},
				"counts.followers": {
					title: "Most followers",
					direction: -1
				},
				"counts.following": {
					title: "Most following",
					direction: -1
				},
				"timestamp|new": {
					title: "Latest activity",
					direction: -1
				},
				"timestamp|old": {
					title: "Most activity",
					direction: 1
				}
			}
		}, function (_this) {
			return function (controller) {
				_this.feedController = controller;
				callback(controller.getView());
				return _this.emit("ready")
			}
		}(this))
	};
	MembersAppController.prototype.prepareProfileView = function (member, callback) {
		var options;
		options = {
			cssClass: "profilearea clearfix"
		};
		KD.isMine(member) ? options.cssClass = KD.utils.curry("own-profile", options.cssClass) : KD.isMine(member) || (options.bind = "mouseenter");
		return callback(new ProfileView(options, member))
	};
	MembersAppController.prototype.showContentDisplay = function (contentDisplay) {
		KD.singleton("display").emit("ContentDisplayWantsToBeShown", contentDisplay);
		return contentDisplay
	};
	MembersAppController.prototype.fetchFeedForHomePage = function (callback) {
		var options, selector;
		options = {
			limit: 6,
			skip: 0,
			sort: {
				"meta.modifiedAt": -1
			}
		};
		selector = {};
		return KD.remote.api.JAccount.someWithRelationship(selector, options, callback)
	};
	MembersAppController.prototype.fetchSomeMembers = function (options, callback) {
		var selector;
		null == options && (options = {});
		options.limit || (options.limit = 6);
		options.skip || (options.skip = 0);
		options.sort || (options.sort = {
			"meta.modifiedAt": -1
		});
		selector = options.selector || {};
		console.log({
			selector: selector
		});
		options.selector && delete options.selector;
		return KD.remote.api.JAccount.byRelevance(selector, options, callback)
	};
	MembersAppController.prototype.fetchExternalProfiles = function (account, callback) {
		var whitelist;
		whitelist = Object.keys(externalProfiles).slice().map(function (a) {
			return "ext|profile|" + a
		});
		return account.fetchStorages(whitelist, callback)
	};
	return MembersAppController
}(AppController);
MemberActivityListController = function (_super) {
	function MemberActivityListController() {
		return MemberActivityListController.__super__.constructor.apply(this, arguments)
	}
	__extends(MemberActivityListController, _super);
	MemberActivityListController.prototype.addItem = function (activity, index, animation) {
		return activity.originId === this.getOptions().creator.getId() ? MemberActivityListController.__super__.addItem.call(this, activity, index, animation) : void 0
	};
	return MemberActivityListController
}(ActivityListController);
var TopicsAppController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
TopicsAppController = function (_super) {
	function TopicsAppController(options, data) {
		null == options && (options = {});
		options.view = new TopicsMainView({
			cssClass: "content-page topics"
		});
		options.appInfo = {
			name: "Topics"
		};
		TopicsAppController.__super__.constructor.call(this, options, data);
		this.listItemClass = TopicsListItemView;
		this.controllers = {};
		this._searchValue = ""
	}
	__extends(TopicsAppController, _super);
	KD.registerAppClass(TopicsAppController, {
		name: "Topics",
		route: "/:name?/Topics",
		searchRoute: "/Topics?q=:text:",
		hiddenHandle: !0
	});
	TopicsAppController.prototype.createFeed = function (view, loadFeed) {
		var JTag;
		null == loadFeed && (loadFeed = !1);
		JTag = KD.remote.api.JTag;
		return KD.getSingleton("appManager").tell("Feeder", "createContentFeedController", {
			feedId: "topics.main",
			itemClass: this.listItemClass,
			limitPerPage: 20,
			useHeaderNav: !0,
			delegate: this,
			noItemFoundText: "There are no topics.",
			help: {
				subtitle: "Learn About Topics",
				tooltip: {
					title: '<p class="bigtwipsy">Topic Tags organize content that users share on Koding. Follow the topics you are interested in and we\'ll include the tagged items in your activity feed.</p>',
					placement: "above"
				}
			},
			filter: {
				everything: {
					title: "All topics",
					optional_title: this._searchValue ? "<span class='optional_title'></span>" : null,
					dataSource: function (_this) {
						return function (selector, options, callback) {
							if (_this._searchValue) {
								_this.setCurrentViewHeader("Searching for <strong>" + _this._searchValue + "</strong>...");
								return JTag.byRelevance(_this._searchValue, options, callback)
							}
							return JTag.some(selector, options, callback)
						}
					}(this),
					dataError: function () {
						return log("Seems something broken:", arguments)
					}
				},
				following: {
					loggedInOnly: !0,
					title: "Following",
					noItemFoundText: "There are no topics that you follow.",
					dataSource: function () {
						return function (selector, options, callback) {
							return KD.whoami().fetchTopics(selector, options, function (err, items) {
								var ids, item, _i, _len;
								ids = [];
								for (_i = 0, _len = items.length; _len > _i; _i++) {
									item = items[_i];
									item.followee = !0;
									ids.push(item._id)
								}
								callback(err, items);
								return err ? void 0 : callback(null, null, ids)
							})
						}
					}(this)
				}
			},
			sort: {
				"counts.followers": {
					title: "Most popular",
					direction: -1
				},
				"meta.modifiedAt": {
					title: "Latest activity",
					direction: -1
				},
				"counts.post": {
					title: "Most activity",
					direction: -1
				}
			}
		}, function (_this) {
			return function (controller) {
				_this.feedController = controller;
				view.addSubView(_this._lastSubview = controller.getView());
				controller.on("FeederListViewItemCountChanged", function (count) {
					return _this._searchValue ? _this.setCurrentViewHeader(count) : void 0
				});
				loadFeed && controller.loadFeed();
				_this.emit("ready");
				return KD.mixpanel("Load topic list, success")
			}
		}(this))
	};
	TopicsAppController.prototype.loadView = function (mainView, firstRun, loadFeed) {
		var canModerateTags, permissions;
		null == firstRun && (firstRun = !0);
		null == loadFeed && (loadFeed = !1);
		if (firstRun) {
			this.on("searchFilterChanged", function (_this) {
				return function (value) {
					var _base;
					if (value !== _this._searchValue) {
						_this._searchValue = Encoder.XSSEncode(value);
						"function" == typeof (_base = _this._lastSubview).destroy && _base.destroy();
						return _this.loadView(mainView, !1, !0)
					}
				}
			}(this));
			mainView.createCommons()
		}
		permissions = KD.config.permissions;
		canModerateTags = __indexOf.call(permissions, "edit tags") >= 0 || __indexOf.call(permissions, "delete tags") >= 0 || __indexOf.call(permissions, "create synonym tags") >= 0;
		if (canModerateTags) {
			this.listItemClass = TopicsListItemViewEditable;
			if (firstRun) {
				KD.getSingleton("mainController").on("TopicItemEditClicked", function (_this) {
					return function (topicItem) {
						return _this.updateTopic(topicItem)
					}
				}(this));
				KD.getSingleton("mainController").on("TopicItemDeleteClicked", function (_this) {
					return function (topicItem) {
						return _this.deleteTopic(topicItem)
					}
				}(this));
				KD.getSingleton("mainController").on("TopicItemSetParentClicked", function (_this) {
					return function (topicItem) {
						return _this.setSynonymTopic(topicItem)
					}
				}(this))
			}
		}
		return this.createFeed(mainView, loadFeed)
	};
	TopicsAppController.prototype.openTopic = function (topic) {
		var entryPoint;
		entryPoint = KD.config.entryPoint;
		return KD.getSingleton("router").handleRoute("/Topics/" + topic.slug, {
			state: topic,
			entryPoint: entryPoint
		})
	};
	TopicsAppController.prototype.deleteTopic = function (topicItem) {
		var modal, topic;
		topic = topicItem.getData();
		return modal = new KDModalView({
			title: "Delete Topic",
			content: "<div class='modalformline'>Are you sure you want to delete this topic? (This will also delete all the child topics!)</div>",
			overlay: !0,
			buttons: {
				Delete: {
					style: "modal-clean-red",
					loader: {
						color: "#ffffff",
						diameter: 16
					},
					callback: function () {
						return function () {
							return topic["delete"](function (err) {
								topicItem.followButton.hide();
								modal.destroy();
								return new KDNotificationView({
									title: err ? err.message : "Deleted!"
								})
							})
						}
					}(this)
				},
				Cancel: {
					style: "modal-cancel",
					title: "cancel",
					callback: function () {
						return modal.destroy()
					}
				}
			}
		})
	};
	TopicsAppController.prototype.setSynonymTopic = function (topicItem) {
		var fields, inputs, modal, parent, topic, userRequestLineEdit, _ref;
		topic = topicItem.getData();
		parent = topic.synonym;
		modal = new KDModalViewWithForms({
			title: "Set Parent Topic for " + topic.title,
			height: "auto",
			cssClass: "compose-message-modal",
			width: 779,
			overlay: !0,
			tabs: {
				navigable: !0,
				goToNextFormOnSubmit: !1,
				forms: {
					synonym: {
						buttons: {
							Confirm: {
								style: "modal-clean-green",
								type: "submit",
								loader: {
									color: "#444444",
									diameter: 12
								}
							},
							Cancel: {
								style: "modal-clean-gray",
								title: "Cancel",
								callback: function () {
									return modal.destroy()
								}
							}
						},
						fields: {
							Synonym: {
								label: "Parent",
								type: "hidden"
							}
						},
						callback: function () {
							return function (formData) {
								var options, showStatus, synonym, _ref;
								showStatus = function (status) {
									modal.modalTabs.forms.synonym.buttons.Confirm.hideLoader();
									return new KDNotificationView({
										title: status
									})
								};
								if (!(null != (_ref = formData.synonyms) ? _ref.length : void 0)) return showStatus("You must choose parent topic first");
								synonym = formData.synonyms[0];
								options = synonym.$suggest ? {
									title: synonym.$suggest.trim()
								} : {
									id: synonym.id
								};
								return topic.createSynonym(options, function (err) {
									var status;
									status = err ? err.message : "Parent Topic is set successfully";
									showStatus(status);
									topicItem.followButton.hide();
									return modal.destroy()
								})
							}
						}(this)
					}
				}
			}
		});
		_ref = modal.modalTabs.forms.synonym, fields = _ref.fields, inputs = _ref.inputs;
		this.synonymController = new TagAutoCompleteController({
			form: modal.modalTabs.forms.synonym,
			width: 300,
			name: "synonym",
			itemClass: TagAutoCompleteItemView,
			itemDataPath: "title",
			selectedItemClass: TagAutoCompletedItemView,
			submitValueAsText: !0,
			selectedItemsLimit: 1,
			dataSource: function (_this) {
				return function (args, callback) {
					var inputValue;
					inputValue = args.inputValue;
					return KD.singleton("appManager").tell("Topics", "fetchTopics", {
						inputValue: inputValue
					}, function (tags, deletedTags) {
						null == tags && (tags = []);
						null == deletedTags && (deletedTags = []);
						return tags ? callback(tags) : _this.synonymController.showNoDataFound()
					})
				}
			}(this)
		});
		fields.Synonym.addSubView(userRequestLineEdit = this.synonymController.getView());
		return parent ? this.synonymController.addItemToSubmitQueue(new TagAutoCompleteItemView({}, parent), parent) : void 0
	};
	TopicsAppController.prototype.updateTopic = function (topicItem) {
		var controller, modal, topic;
		topic = topicItem.data;
		controller = this;
		return modal = new KDModalViewWithForms({
			title: "Update topic " + topic.title,
			height: "auto",
			cssClass: "compose-message-modal",
			width: 779,
			overlay: !0,
			tabs: {
				navigable: !0,
				goToNextFormOnSubmit: !1,
				forms: {
					update: {
						title: "Update Topic Details",
						callback: function (_this) {
							return function (formData) {
								formData.slug = _this.utils.slugify(formData.slug.trim().toLowerCase());
								return topic.modify(formData, function (err) {
									new KDNotificationView({
										title: err ? err.message : "Updated successfully"
									});
									return modal.destroy()
								})
							}
						}(this),
						buttons: {
							Update: {
								style: "modal-clean-green",
								type: "submit",
								loader: {
									color: "#444444",
									diameter: 12
								}
							},
							Cancel: {
								style: "modal-clean-gray",
								title: "Cancel",
								callback: function () {
									return modal.destroy()
								}
							}
						},
						fields: {
							Title: {
								label: "Title",
								itemClass: KDInputView,
								name: "title",
								defaultValue: topic.title
							},
							Slug: {
								label: "Slug",
								itemClass: KDInputView,
								name: "slug",
								defaultValue: topic.slug
							},
							Details: {
								label: "Details",
								type: "textarea",
								itemClass: KDInputView,
								name: "body",
								defaultValue: topic.body || ""
							}
						}
					}
				}
			}
		})
	};
	TopicsAppController.prototype.fetchSomeTopics = function (options, callback) {
		var selector;
		null == options && (options = {});
		options.limit || (options.limit = 6);
		options.skip || (options.skip = 0);
		options.sort || (options.sort = {
			"counts.followers": -1
		});
		selector = options.selector;
		options.selector && delete options.selector;
		return selector ? KD.remote.api.JTag.byRelevance(selector, options, callback) : KD.remote.api.JTag.some({}, options, callback)
	};
	TopicsAppController.prototype.setCurrentViewHeader = function (count) {
		var result, title;
		if ("number" != typeof count) {
			this.getView().$(".feeder-header span.optional_title").html(count);
			return !1
		}
		count >= 20 && (count = "20+");
		0 === count && (count = "No");
		result = "" + count + " result" + (1 !== count ? "s" : "");
		title = "" + result + " found for <strong>" + this._searchValue + "</strong>";
		return this.getView().$(".feeder-header").html(title)
	};
	TopicsAppController.prototype.createContentDisplay = function (topic, callback) {
		var contentDisplay, controller;
		controller = new ContentDisplayControllerTopic(null, topic);
		contentDisplay = controller.getView();
		contentDisplay.on("handleQuery", function () {
			return function (query) {
				return controller.ready(function () {
					var _ref;
					return null != (_ref = controller.feedController) && "function" == typeof _ref.handleQuery ? _ref.handleQuery(query) : void 0
				})
			}
		}(this));
		this.showContentDisplay(contentDisplay);
		return this.utils.defer(function () {
			return callback(contentDisplay)
		})
	};
	TopicsAppController.prototype.showContentDisplay = function (contentDisplay) {
		return KD.singleton("display").emit("ContentDisplayWantsToBeShown", contentDisplay)
	};
	TopicsAppController.prototype.fetchTopics = function (_arg, callback) {
		var blacklist, inputValue;
		inputValue = _arg.inputValue, blacklist = _arg.blacklist;
		return KD.remote.api.JTag.byRelevance(inputValue, {
			blacklist: blacklist
		}, function (err, _arg1) {
			var deletedTags, tags;
			tags = _arg1.tags, deletedTags = _arg1.deletedTags;
			return err ? warn("there was an error fetching topics " + err.message) : "function" == typeof callback ? callback(tags, deletedTags) : void 0
		})
	};
	TopicsAppController.prototype.handleQuery = function (query) {
		return this.ready(function (_this) {
			return function () {
				var q;
				q = query.q;
				if (q) return _this.emit("searchFilterChanged", q);
				_this.emit("searchFilterChanged", "");
				return TopicsAppController.__super__.handleQuery.call(_this, query)
			}
		}(this))
	};
	return TopicsAppController
}(AppController);
var TopicsMainView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
TopicsMainView = function (_super) {
	function TopicsMainView(options, data) {
		null == options && (options = {});
		null == options.ownScrollBars && (options.ownScrollBars = !0);
		TopicsMainView.__super__.constructor.call(this, options, data)
	}
	__extends(TopicsMainView, _super);
	TopicsMainView.prototype.createCommons = function () {
		return this.addSubView(this.header = new HeaderViewSection)
	};
	return TopicsMainView
}(KDView);
var ModalTopicsListItem, TopicsListItemView, TopicsListItemViewEditable, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
TopicsListItemView = function (_super) {
	function TopicsListItemView(options, data) {
		null == options && (options = {});
		options.type = "topics";
		TopicsListItemView.__super__.constructor.call(this, options, data);
		data = this.getData();
		this.titleLink = new JCustomHTMLView({
			tagName: "a",
			pistachio: "{{#(title)}}",
			click: function () {
				return function (event) {
					KD.singletons.router.handleRoute("/Activity?tagged=" + data.slug);
					return KD.utils.stopDOMEvent(event)
				}
			}(this)
		}, data);
		this.settingsButton = options.editable ? new KDButtonViewWithMenu({
			cssClass: "edit-topic transparent",
			icon: !0,
			delegate: this,
			iconClass: "arrow",
			menu: this.getSettingsMenu(),
			callback: function (_this) {
				return function (event) {
					return _this.settingsButton.contextMenu(event)
				}
			}(this)
		}) : new KDCustomHTMLView({
			tagName: "span",
			cssClass: "hidden"
		});
		this.followButton = "synonym" !== data.status && "deleted" !== data.status ? new FollowButton({
			cssClass: "solid green",
			errorMessages: {
				KodingError: "Something went wrong while follow",
				AccessDenied: "You are not allowed to follow topics"
			},
			stateOptions: {
				unfollow: {
					cssClass: "following-btn"
				}
			},
			dataType: "JTag"
		}, data) : new KDCustomHTMLView({
			tagName: "span",
			cssClass: "hidden"
		});
		this.synonymInfo = new KDCustomHTMLView({
			tagName: "span",
			cssClass: "hidden"
		})
	}
	__extends(TopicsListItemView, _super);
	JView.mixin(TopicsListItemView.prototype);
	TopicsListItemView.prototype.getSettingsMenu = function () {
		var canCreateSynonymTags, canDeleteTags, canEditTags, mainController, menu, permissions;
		permissions = KD.config.permissions;
		canEditTags = __indexOf.call(permissions, "edit tags") >= 0;
		canDeleteTags = __indexOf.call(permissions, "delete tags") >= 0;
		canCreateSynonymTags = __indexOf.call(permissions, "create synonym tags") >= 0;
		menu = {};
		mainController = KD.singleton("mainController");
		canEditTags && (menu.Edit = {
			callback: function (_this) {
				return function () {
					return mainController.emit("TopicItemEditClicked", _this)
				}
			}(this)
		});
		canDeleteTags && (menu.Delete = {
			callback: function (_this) {
				return function () {
					return mainController.emit("TopicItemDeleteClicked", _this)
				}
			}(this)
		});
		canCreateSynonymTags && (menu["Set Parent"] = {
			callback: function (_this) {
				return function () {
					return mainController.emit("TopicItemSetParentClicked", _this)
				}
			}(this)
		});
		return menu
	};
	TopicsListItemView.prototype.titleReceivedClick = function () {
		return this.emit("LinkClicked")
	};
	TopicsListItemView.prototype.viewAppended = function () {
		var data;
		this.setClass("topic-item");
		data = this.getData();
		"synonym" === data.status && data.fetchSynonym(function (_this) {
			return function (err, synonym) {
				var _ref;
				if (err) return warn("synonym is not valid");
				if (synonym) {
					data.synonym = synonym;
					return _this.addSubView(new KDCustomHTMLView({
						tagName: "span",
						cssClass: "synonym",
						partial: "Parent: " + (null != (_ref = data.synonym) ? _ref.title : void 0)
					}))
				}
			}
		}(this));
		this.setTemplate(this.pistachio());
		return this.template.update()
	};
	TopicsListItemView.prototype.setFollowerCount = function (count) {
		return this.$(".followers a").html(count)
	};
	TopicsListItemView.prototype.expandItem = function () {
		var $clone, $item, $parent, list, pos;
		if (this._trimmedBody) {
			list = this.getDelegate();
			$item = this.$();
			$parent = list.$();
			this.$clone = $clone = $item.clone();
			pos = $item.position();
			pos.height = $item.outerHeight(!1);
			$clone.addClass("clone");
			$clone.css(pos);
			$clone.css({
				"background-color": "white"
			});
			$clone.find(".topictext article").html(this.getData().body);
			$parent.append($clone);
			$clone.addClass("expand");
			return $clone.on("mouseleave", function (_this) {
				return function () {
					return _this.collapseItem()
				}
			}(this))
		}
	};
	TopicsListItemView.prototype.collapseItem = function () {
		!this._trimmedBody
	};
	TopicsListItemView.prototype.pistachio = function () {
		var body;
		body = this.getData().body || "";
		return '{{> this.settingsButton}}\n<header>\n  {h3{> this.titleLink}} <span class="stats">{{#(status) || \'\'}}</span>\n  {{> this.synonymInfo}}\n</header>\n<div class="stats">\n  <a href="#">{{#(counts.post) || 0}}</a> Posts\n  <a href="#">{{#(counts.followers) || 0}}</a> Followers\n</div>\n{article{#(body) || ""}}\n{{> this.followButton}}'
	};
	return TopicsListItemView
}(KDListItemView);
ModalTopicsListItem = function (_super) {
	function ModalTopicsListItem(options, data) {
		ModalTopicsListItem.__super__.constructor.call(this, options, data);
		this.titleLink = new TagLinkView({
			expandable: !1,
			click: function (_this) {
				return function () {
					return _this.getDelegate().emit("CloseTopicsModal")
				}
			}(this)
		}, data)
	}
	__extends(ModalTopicsListItem, _super);
	ModalTopicsListItem.prototype.pistachio = function () {
		return '<div class="topictext">\n  <div class="topicmeta">\n    <div class="button-container">{{> this.followButton}}</div>\n    {{> this.titleLink}}\n    <div class="stats">\n      <p class="posts">\n        <span class="icon"></span>{{#(counts.post) || 0}} Posts\n      </p>\n      <p class="fers">\n        <span class="icon"></span>{{#(counts.followers) || 0}} Followers\n      </p>\n    </div>\n  </div>\n</div>'
	};
	return ModalTopicsListItem
}(TopicsListItemView);
TopicsListItemViewEditable = function (_super) {
	function TopicsListItemViewEditable(options, data) {
		null == options && (options = {});
		options.editable = !0;
		options.type = "topics";
		TopicsListItemViewEditable.__super__.constructor.call(this, options, data)
	}
	__extends(TopicsListItemViewEditable, _super);
	return TopicsListItemViewEditable
}(TopicsListItemView);
var ContentDisplayControllerTopic, TopicView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ContentDisplayControllerTopic = function (_super) {
	function ContentDisplayControllerTopic(options, data) {
		var mainView;
		null == options && (options = {});
		options.view = mainView = new KDView({
			cssClass: "topic content-display"
		});
		ContentDisplayControllerTopic.__super__.constructor.call(this, options, data)
	}
	__extends(ContentDisplayControllerTopic, _super);
	ContentDisplayControllerTopic.prototype.loadView = function (mainView) {
		var backLink, subHeader, topic, topicView;
		topic = this.getData();
		mainView.addSubView(subHeader = new KDCustomHTMLView({
			tagName: "h2",
			cssClass: "sub-header"
		}));
		backLink = new KDCustomHTMLView({
			tagName: "a",
			partial: "<span>&laquo;</span> Back",
			click: function () {
				return function (event) {
					event.stopPropagation();
					event.preventDefault();
					return KD.singleton("display").emit("ContentDisplayWantsToBeHidden", mainView)
				}
			}(this)
		});
		KD.isLoggedIn() && subHeader.addSubView(backLink);
		topicView = this.addTopicView(topic);
		return KD.getSingleton("appManager").tell("Feeder", "createContentFeedController", {
			feedId: "topics." + topic.slug,
			itemClass: ActivityListItemView,
			listCssClass: "activity-related",
			noItemFoundText: "There is no activity related with <strong>" + topic.title + "</strong>.",
			limitPerPage: 5,
			filter: {
				content: {
					title: "Everything",
					dataSource: function (selector, options, callback) {
						return topic.fetchContentTeasers(options, function (err, teasers) {
							return callback(err, teasers)
						})
					}
				},
				statusupdates: {
					title: "Status Updates",
					dataSource: function (selector, options, callback) {
						selector = {
							targetName: "JNewStatusUpdate"
						};
						return topic.fetchContentTeasers(options, selector, function (err, teasers) {
							return callback(err, teasers)
						})
					}
				},
				codesnippets: {
					title: "Code Snippets",
					dataSource: function (selector, options, callback) {
						selector = {
							targetName: "JCodeSnip"
						};
						return topic.fetchContentTeasers(options, selector, function (err, teasers) {
							return callback(err, teasers)
						})
					}
				}
			},
			sort: {
				"timestamp|new": {
					title: "Latest activity",
					direction: -1
				},
				"timestamp|old": {
					title: "Most activity",
					direction: 1
				}
			}
		}, function (_this) {
			return function (controller) {
				_this.feedController = controller;
				mainView.addSubView(controller.getView());
				return _this.emit("ready")
			}
		}(this))
	};
	ContentDisplayControllerTopic.prototype.addTopicView = function (topic) {
		var topicContentDisplay, topicView;
		topicContentDisplay = this.getView();
		topicContentDisplay.addSubView(topicView = new TopicView({
			cssClass: "profilearea clearfix",
			delegate: topicContentDisplay
		}, topic));
		return topicView
	};
	return ContentDisplayControllerTopic
}(KDViewController);
TopicView = function (_super) {
	function TopicView(options, data) {
		this.followButton = new FollowButton({
			errorMessages: {
				KodingError: "Something went wrong while follow",
				AccessDenied: "You are not allowed to follow topics"
			},
			stateOptions: {
				unfollow: {
					cssClass: "following-topic"
				}
			},
			dataType: "JTag"
		}, data);
		TopicView.__super__.constructor.apply(this, arguments)
	}
	__extends(TopicView, _super);
	TopicView.prototype.pistachio = function () {
		return "<div class=\"profileleft\">\n  <span>\n    <a class='profile-avatar' href='#'>{{#(image) || \"upload an image\"}}</a>\n  </span>\n  {{> this.followButton}}\n</div>\n\n<section>\n  <div class=\"profileinfo\">\n    {h3{#(title)}}\n\n    <div class=\"profilestats\">\n      <div class=\"posts\">\n        <a href='#'><cite/>{{this.utils.formatPlural(#(counts.post), 'Post')}}</a>\n      </div>\n      <div class=\"fers\">\n        <a href='#'><cite/>{{this.utils.formatPlural(#(counts.followers), 'Follower')}}</a>\n      </div>\n    </div>\n  </div>\n\n  <div class='profilebio'>\n    {p{#(body)}}\n  </div>\n\n  <div class=\"skilltags\">\n  </div>\n\n</section>"
	};
	return TopicView
}(JView);
var TopicSplitViewController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
TopicSplitViewController = function (_super) {
	function TopicSplitViewController(options, data) {
		null == options && (options = {});
		options = $.extend({
			view: new ContentPageSplitBelowHeader({
				sizes: [139, null],
				minimums: [10, null],
				resizable: !1
			})
		}, options);
		TopicSplitViewController.__super__.constructor.call(this, options, data)
	}
	__extends(TopicSplitViewController, _super);
	TopicSplitViewController.prototype.loadView = function (topicSplit) {
		log(topicSplit);
		return topicSplit._windowDidResize()
	};
	return TopicSplitViewController
}(KDViewController);
var ContentDisplayControllerApps, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
ContentDisplayControllerApps = function (_super) {
	function ContentDisplayControllerApps(options, data) {
		var mainView;
		null == options && (options = {});
		options.view || (options.view = mainView = new KDView({
			cssClass: "content-page appstore singleapp"
		}));
		ContentDisplayControllerApps.__super__.constructor.call(this, options, data)
	}
	__extends(ContentDisplayControllerApps, _super);
	ContentDisplayControllerApps.prototype.loadView = function (mainView) {
		var appView;
		return mainView.addSubView(appView = new AppDetailsView({
			cssClass: "app-details",
			delegate: mainView
		}, this.getData()))
	};
	return ContentDisplayControllerApps
}(KDViewController);
var AppsListItemView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
AppsListItemView = function (_super) {
	function AppsListItemView(options, data) {
		null == options && (options = {});
		options.type = "appstore";
		AppsListItemView.__super__.constructor.call(this, options, data);
		this.thumbnail = new KDView({
			cssClass: "thumbnail",
			partial: "<span class='logo'>" + data.name[0] + "</span>"
		});
		this.thumbnail.setCss("backgroundColor", KD.utils.getColorFromString(data.name));
		this.runButton = new KDButtonView({
			cssClass: "run",
			title: "run",
			callback: function (_this) {
				return function () {
					KodingAppsController.runExternalApp(_this.getData());
					return KD.mixpanel("App run, click")
				}
			}(this)
		});
		this.statusWidget = new KDView({
			cssClass: KD.utils.curry("status-widget", data.status),
			tooltip: {
				title: {
					"github-verified": "Public",
					"not-verified": "Private",
					verified: "Verified"
				}[data.status]
			}
		});
		this.kiteButton = new KDButtonView({
			cssClass: "run",
			title: "details",
			callback: function (_this) {
				return function () {
					var authorNick, name, _ref;
					_ref = _this.getData().manifest, name = _ref.name, authorNick = _ref.authorNick;
					return KD.getSingleton("router").handleRoute("/Kites/" + authorNick + "/" + name)
				}
			}(this)
		})
	}
	__extends(AppsListItemView, _super);
	JView.mixin(AppsListItemView.prototype);
	AppsListItemView.prototype.render = function () {
		return this.template.update()
	};
	AppsListItemView.prototype.pistachio = function () {
		var authorNick, data, isKite, name, route, template, title, _ref;
		data = this.getData();
		isKite = data instanceof KD.remote.api.JKite;
		route = isKite ? "Kites" : "Apps";
		_ref = data.manifest, authorNick = _ref.authorNick, title = _ref.title, name = data.name;
		template = '<figure>\n  {{> this.thumbnail}}\n</figure>\n{{> this.statusWidget}}\n<div class="appmeta clearfix">\n  <a href="/' + route + "/" + authorNick + "/" + name + '">\n    <h3>' + (title || name) + "</h3>\n    <cite></cite>\n  </a>\n  <h4>{{#(manifest.author)}}</h4>\n  <div class=\"appdetails\">\n    <article>{{this.utils.shortenText(#(manifest.description))}}</article>\n  </div>\n</div>\n<div class='bottom'>";
		if (isKite) {
			this.statusWidget = new KDCustomHTMLView;
			template += "{{> this.kiteButton}}"
		} else template += "{{> this.runButton}}";
		return template + "</div>"
	};
	return AppsListItemView
}(KDListItemView);
var AppDetailsView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
AppDetailsView = function (_super) {
	function AppDetailsView() {
		var app, authorNick, baseUrl, icns, identifier, proxyUrl, readmeUrl, readmeView, repoUrl, repository, version, _ref, _ref1, _ref2;
		AppDetailsView.__super__.constructor.apply(this, arguments);
		this.app = app = this.getData();
		_ref = app.manifest, identifier = _ref.identifier, version = _ref.version, authorNick = _ref.authorNick;
		this.appLogo = new KDView({
			cssClass: "app-logo",
			partial: "<span class='logo'>" + app.name[0] + "</span>"
		});
		this.statusWidget = new KDView({
			cssClass: KD.utils.curry("status-widget", app.status),
			tooltip: {
				title: {
					"github-verified": "Public",
					"not-verified": "Private",
					verified: "Verified"
				}[app.status]
			}
		});
		this.appLogo.addSubView(this.statusWidget);
		this.appLogo.setCss("backgroundColor", KD.utils.getColorFromString(app.name));
		this.actionButtons = new KDView({
			cssClass: "action-buttons"
		});
		this.removeButton = new KDButtonView({
			title: "Delete",
			style: "delete",
			callback: function (_this) {
				return function () {
					var modal;
					return modal = new KDModalView({
						title: "Delete " + Encoder.XSSEncode(app.manifest.name),
						content: "<div class='modalformline'>Are you sure you want to delete\n<strong>" + Encoder.XSSEncode(app.manifest.name) + "</strong>\napplication?</div>",
						height: "auto",
						overlay: !0,
						buttons: {
							Delete: {
								style: "modal-clean-red",
								loader: {
									color: "#ffffff",
									diameter: 16
								},
								callback: function () {
									return app["delete"](function (err) {
										modal.buttons.Delete.hideLoader();
										modal.destroy();
										if (err) {
											new KDNotificationView({
												type: "mini",
												cssClass: "error editor",
												title: "Error, please try again later!"
											});
											return warn(err)
										}
										_this.emit("AppDeleted", app);
										return _this.destroy()
									})
								}
							},
							cancel: {
								style: "modal-cancel",
								callback: function () {
									return modal.destroy()
								}
							}
						}
					})
				}
			}(this)
		});
		(KD.checkFlag("super-admin") || app.originId === KD.whoami().getId()) && this.actionButtons.addSubView(this.removeButton);
		this.approveButton = new KDToggleButton({
			style: "approve",
			dataPath: "approved",
			defaultState: "verified" === app.status ? "Disapprove" : "Approve",
			states: [{
				title: "Approve",
				callback: function (_this) {
					return function (callback) {
						return _this.approveApp(app, !0, callback)
					}
				}(this)
			}, {
				title: "Disapprove",
				callback: function (_this) {
					return function (callback) {
						return _this.approveApp(app, !1, callback)
					}
				}(this)
			}]
		}, app);
		KD.checkFlag("super-admin") && this.actionButtons.addSubView(this.approveButton);
		this.actionButtons.addSubView(this.runButton = new KDButtonView({
			title: "Run",
			style: "run",
			callback: function () {
				return KodingAppsController.runExternalApp(app)
			}
		}));
		_ref1 = app.manifest, icns = _ref1.icns, identifier = _ref1.identifier, version = _ref1.version, authorNick = _ref1.authorNick;
		this.updatedTimeAgo = new KDTimeAgoView({}, this.getData().meta.createdAt);
		this.slideShow = new KDCustomHTMLView({
			tagName: "ul",
			partial: function () {
				var slide, slides, tmpl, _i, _len;
				slides = app.manifest.screenshots || [];
				tmpl = "";
				for (_i = 0, _len = slides.length; _len > _i; _i++) {
					slide = slides[_i];
					tmpl += '<li><img src="' + KD.appsUri + "/" + authorNick + "/" + identifier + "/" + version + "/" + slide + '" /></li>'
				}
				return tmpl
			}()
		});
		this.detailsView = new KDView({
			cssClass: "app-extras"
		});
		if ("verified" === (_ref2 = app.status) || "github-verified" === _ref2) {
			repository = app.manifest.repository;
			repoUrl = repository.replace(/^git\:\/\//, "https://");
			proxyUrl = repository.replace(/^git\:\/\/github.com/, KD.config.appsUri);
			baseUrl = "" + proxyUrl + "/" + (app.manifest.commitId || "master");
			readmeUrl = "" + baseUrl + "/README.md";
			this.githubMenu = new KDButtonViewWithMenu({
				itemChildClass: LinkMenuItemView,
				cssClass: "github-menu",
				style: "resurrection",
				menu: {
					Repository: {
						link: repoUrl
					},
					Issues: {
						link: "" + repoUrl + "/issues"
					},
					Commits: {
						link: "" + repoUrl + "/commits/" + (app.manifest.commitId || "master")
					},
					Wiki: {
						link: "" + repoUrl + "/wiki"
					}
				}
			});
			this.detailsView.addSubView(readmeView = new KDView({
				cssClass: "readme",
				partial: "<p>Fetching readme...</p>"
			}));
			$.ajax({
				url: readmeUrl,
				timeout: 5e3,
				success: function (content, status) {
					if ("success" === status) {
						readmeView.setClass("has-markdown");
						return readmeView.updatePartial(KD.utils.applyMarkdown(content))
					}
				},
				error: function () {
					warn(arguments);
					return readmeView.updatePartial("<p>README.md not found on " + repository + "</p>")
				}
			})
		} else this.githubMenu = new KDView
	}
	__extends(AppDetailsView, _super);
	JView.mixin(AppDetailsView.prototype);
	AppDetailsView.prototype.approveApp = function (app, state, callback) {
		var modal, style, text;
		if (state) {
			text = "approve";
			style = "modal-clean-green"
		} else {
			text = "disapprove";
			style = "modal-clean-red"
		}
		return modal = KDModalView.confirm({
			title: "Are you sure?",
			description: "Are you sure you want to " + text + " this application?",
			ok: {
				style: style,
				title: text.capitalize(),
				callback: function () {
					return app.approve(state, function (err) {
						err && warn(err);
						modal.destroy();
						return "function" == typeof callback ? callback(err) : void 0
					})
				}
			}
		})
	};
	AppDetailsView.prototype.pistachio = function () {
		var desc, manifest, name, _ref;
		_ref = this.getData(), name = _ref.name, manifest = _ref.manifest;
		desc = (null != manifest ? manifest.description : void 0) || "";
		name = (null != manifest ? manifest.title : void 0) || name;
		return '\n{{> this.appLogo}}\n\n<div class="app-info">\n  <h3><a href="/' + this.getData().slug + '">' + name + '</a></h3>\n  <h4>{{#(manifest.author)}}</h4>\n\n  <div class="appdetails">\n    <article>' + desc + '</article>\n  </div>\n\n</div>\n<div class="installerbar">\n\n  <div class="versionstats updateddate">\n    Version {{#(manifest.version) || "---"}}\n    <p>Released {{> this.updatedTimeAgo}}</p>\n    {{> this.githubMenu}}\n  </div>\n\n  {{> this.actionButtons}}\n\n</div>\n\n{{> this.detailsView}}\n'
	};
	return AppDetailsView
}(KDScrollView);
var CreateKiteModal, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
CreateKiteModal = function (_super) {
	function CreateKiteModal(options, data) {
		null == options && (options = {});
		options.title = "Create New Kite";
		options.overlay = !0;
		options.content = "";
		options.cssClass = "create-kite-modal";
		options.width = 760;
		options.height = "auto";
		options.tabs = {
			navigable: !1,
			forms: {
				Details: {
					buttons: {
						Next: {
							title: "Next",
							style: "modal-clean-gray",
							loader: {
								color: "#444444"
							},
							callback: function (_this) {
								return function () {
									return _this.handleDetailsForm()
								}
							}(this)
						},
						Cancel: {
							title: "Cancel",
							style: "modal-cancel",
							callback: function (_this) {
								return function () {
									return _this.destroy()
								}
							}(this)
						}
					},
					fields: {
						nameField: {
							label: "Name",
							name: "name",
							placeholder: "Name of your Kite",
							validate: {
								rules: {
									required: !0
								},
								messages: {
									required: "Please enter a kite name"
								}
							}
						},
						descriptionField: {
							label: "Description",
							name: "description",
							placeholder: "Description of your Kite",
							validate: {
								rules: {
									required: !0
								},
								messages: {
									required: "Please enter a kite name"
								}
							}
						}
					}
				},
				Documentation: {
					buttons: {
						Next: {
							title: "Next",
							style: "modal-clean-gray",
							type: "submit",
							loader: {
								color: "#444444"
							},
							callback: function () {
								return this.hideLoader()
							}
						},
						Cancel: {
							title: "Cancel",
							style: "modal-cancel",
							callback: function (_this) {
								return function () {
									return _this.destroy()
								}
							}(this)
						}
					},
					fields: {
						markdownWidget: {
							itemClass: MarkdownWidget,
							preview: !0
						}
					}
				},
				Pricing: {
					fields: {
						container: {
							itemClass: KDView,
							cssClass: "pricing-items"
						}
					},
					buttons: {
						Save: {
							title: "Save",
							style: "modal-clean-gray",
							type: "submit",
							loader: {
								color: "#444444"
							},
							callback: this.bound("save")
						},
						Cancel: {
							title: "Cancel",
							style: "modal-cancel",
							callback: function (_this) {
								return function () {
									return _this.destroy()
								}
							}(this)
						}
					}
				}
			}
		};
		CreateKiteModal.__super__.constructor.call(this, options, data);
		this.pricingForms = [];
		this.modalTabs.forms.Pricing.addSubView(new KDButtonView({
			title: "ADD NEW",
			cssClass: "solid green small add-pricing",
			callback: this.bound("createPricingView")
		}));
		this.createPricingView()
	}
	__extends(CreateKiteModal, _super);
	CreateKiteModal.prototype.createPricingView = function () {
		var pricingForm;
		pricingForm = new KitePricingFormView;
		this.modalTabs.forms.Pricing.fields.container.addSubView(pricingForm);
		return this.pricingForms.push(pricingForm)
	};
	CreateKiteModal.prototype.save = function () {
		var description, form, kite, markdownWidget, name, plans, _ref;
		_ref = this.modalTabs.forms.Details.getFormData(), name = _ref.name, description = _ref.description;
		markdownWidget = this.modalTabs.forms.Documentation.inputs.markdownWidget;
		plans = function () {
			var _i, _len, _ref1, _results;
			_ref1 = this.pricingForms;
			_results = [];
			for (_i = 0, _len = _ref1.length; _len > _i; _i++) {
				form = _ref1[_i];
				_results.push(form.getFormData())
			}
			return _results
		}.call(this);
		kite = {
			name: name,
			manifest: {
				description: description,
				name: name,
				readme: markdownWidget.getRawValue()
			}
		};
		return KD.remote.api.JKite.create(kite, function (_this) {
			return function (err, kite) {
				var dash, queue;
				if (err) return KD.showError(err);
				dash = Bongo.dash;
				queue = plans.map(function (plan) {
					return function () {
						return kite.createPlan(plan, function (err) {
							return err ? queue.fin(err) : queue.fin()
						})
					}
				});
				return dash(queue, function (err) {
					if (err) return KD.showError(err);
					_this.emit("KiteCreated");
					return _this.destroy()
				})
			}
		}(this))
	};
	CreateKiteModal.prototype.handleDetailsForm = function () {
		var Details, desc, descriptionField, name, nameField, nick, query, _ref;
		Details = this.modalTabs.forms.Details;
		_ref = Details.inputs, nameField = _ref.nameField, descriptionField = _ref.descriptionField;
		if (nameField.validate() && descriptionField.validate()) {
			name = nameField.getValue();
			desc = descriptionField.getValue();
			nick = KD.nick();
			query = {
				"manifest.name": name,
				"manifest.authorNick": nick
			};
			return KD.remote.api.JKite.list(query, {}, function (_this) {
				return function (err, kite) {
					var markdownWidget;
					Details.buttons.Next.hideLoader();
					if (null != kite ? kite.length : void 0) return new KDNotificationView({
						container: _this,
						duration: 4e3,
						type: "mini",
						cssClass: "error kite-exist",
						title: "This kite name exists"
					});
					_this.modalTabs.showNextPane();
					markdownWidget = _this.modalTabs.forms.Documentation.inputs.markdownWidget;
					markdownWidget.setValue("" + name + "\n=======\n" + desc);
					return markdownWidget.preview()
				}
			}(this))
		}
		return Details.buttons.Next.hideLoader()
	};
	return CreateKiteModal
}(KDModalViewWithForms);
var KitePricingFormView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
KitePricingFormView = function (_super) {
	function KitePricingFormView(options, data) {
		null == options && (options = {});
		options.cssClass = "kite-pricing-view";
		options.fields = {
			planId: {
				label: "Plan Id",
				name: "userTag",
				cssClass: "thin half",
				nextElement: {
					planName: {
						label: "Plan Name",
						name: "title",
						cssClass: "thin half"
					}
				}
			},
			planprice: {
				label: "Plan Price",
				name: "feeAmount",
				cssClass: "thin half",
				nextElement: {
					planRecurring: {
						cssClass: "thin half",
						label: "Recurring",
						type: "select",
						itemClass: KDSelectBox,
						name: "planRecurring",
						defaultValue: "free",
						selectOptions: [{
							title: "Free",
							value: "free"
						}, {
							title: "Monthly",
							value: "monthly"
						}, {
							title: "Yearly",
							value: "yearly"
						}]
					}
				}
			},
			planDescription: {
				label: "Plan Description",
				name: "description",
				type: "textarea"
			}
		};
		KitePricingFormView.__super__.constructor.call(this, options, data)
	}
	__extends(KitePricingFormView, _super);
	return KitePricingFormView
}(KDFormViewWithFields);
var MarkdownWidget, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
MarkdownWidget = function (_super) {
	function MarkdownWidget(options, data) {
		var _ref;
		null == options && (options = {});
		options.cssClass = KD.utils.curry("md-widget", options.widgetClass);
		MarkdownWidget.__super__.constructor.call(this, options, data);
		this.input = new KDInputView({
			type: "textarea",
			autogrow: !0,
			cssClass: KD.utils.curry("md-input", options.inputCssClass),
			bind: "keyup",
			keyup: function (_this) {
				return function () {
					return _this.previewToggle.getValue() ? _this.preview() : void 0
				}
			}(this)
		});
		this.previewToggle = new KodingSwitch({
			size: "tiny",
			cssClass: "preview-toggle",
			defaultValue: null != (_ref = options.preview) ? _ref : !1,
			callback: function (_this) {
				return function () {
					return _this.preview()
				}
			}(this)
		});
		this.toggleLabel = new KDCustomHTMLView({
			tagName: "span",
			cssClass: "toggle-label",
			partial: "Live Preview"
		});
		this.helpLink = new KDCustomHTMLView({
			tagName: "a",
			attributes: {
				href: "http://daringfireball.net/projects/markdown/syntax",
				target: "_blank"
			},
			partial: "Need help?",
			cssClass: "help-link"
		});
		this.previewArea = new KDCustomHTMLView({
			cssClass: "preview-area"
		});
		this.previewLabel = new KDCustomHTMLView({
			tagName: "p",
			cssClass: "preview-label",
			partial: "Preview will be available here"
		});
		this.previewArea.addSubView(this.previewLabel)
	}
	__extends(MarkdownWidget, _super);
	MarkdownWidget.prototype.createMarkdownPreview = function () {
		var _ref;
		null != (_ref = this.markdownPreview) && _ref.destroy();
		this.markdownPreview = new KDCustomHTMLView({
			cssClass: "md-preview",
			partial: KD.utils.applyMarkdown(this.input.getValue())
		});
		return this.previewArea.addSubView(this.markdownPreview)
	};
	MarkdownWidget.prototype.preview = function () {
		this.previewLabel.hide();
		return this.createMarkdownPreview()
	};
	MarkdownWidget.prototype.setValue = function (value) {
		return this.input.setValue(value)
	};
	MarkdownWidget.prototype.getMarkdown = function () {
		return KD.utils.applyMarkdown(this.input.getValue())
	};
	MarkdownWidget.prototype.getRawValue = function () {
		return this.input.getValue()
	};
	MarkdownWidget.prototype.viewAppended = function () {
		var defaultValue;
		MarkdownWidget.__super__.viewAppended.apply(this, arguments);
		defaultValue = this.getOptions().defaultValue;
		return defaultValue ? this.setValue(defaultValue) : void 0
	};
	MarkdownWidget.prototype.pistachio = function () {
		return '{{> this.input}}\n<div class="tools">\n  {{> this.helpLink}}\n  {{> this.toggleLabel}}\n  {{> this.previewToggle}}\n</div>\n{{> this.previewArea}}'
	};
	return MarkdownWidget
}(JView);
var AppsMainView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
AppsMainView = function (_super) {
	function AppsMainView(options, data) {
		null == options && (options = {});
		null == options.ownScrollBars && (options.ownScrollBars = !0);
		AppsMainView.__super__.constructor.call(this, options, data)
	}
	__extends(AppsMainView, _super);
	AppsMainView.prototype.createCommons = function () {
		return this.addSubView(new HeaderViewSection({
			type: "big",
			title: "App Catalog"
		}))
	};
	return AppsMainView
}(KDView);
var AppsAppController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
AppsAppController = function (_super) {
	function AppsAppController(options, data) {
		null == options && (options = {});
		options.view = new AppsMainView({
			cssClass: "content-page appstore"
		});
		options.appInfo = {
			name: "Apps"
		};
		AppsAppController.__super__.constructor.call(this, options, data);
		this._verifiedOnly = !0
	}
	var getAppInstance;
	__extends(AppsAppController, _super);
	getAppInstance = function (route, callback) {
		var app, username, _ref;
		_ref = route.params, app = _ref.app, username = _ref.username;
		return app ? KD.remote.api.JNewApp.one({
			slug: "" + username + "/Apps/" + app
		}, callback) : callback(null)
	};
	KD.registerAppClass(AppsAppController, {
		name: "Apps",
		hiddenHandle: !0,
		searchRoute: "/Apps?q=:text:",
		behaviour: "application",
		version: "1.0",
		preCondition: {
			condition: function (options, cb) {
				return cb(KD.isLoggedIn())
			},
			failure: function () {
				KD.singletons.appManager.open("Apps", {
					conditionPassed: !0
				});
				return KD.showEnforceLoginModal()
			}
		}
	});
	AppsAppController.prototype.loadView = function (mainView, firstRun, loadFeed) {
		null == firstRun && (firstRun = !0);
		null == loadFeed && (loadFeed = !1);
		if (firstRun) {
			this.on("searchFilterChanged", function (_this) {
				return function (value) {
					var _base;
					if (value !== _this._searchValue) {
						_this._searchValue = Encoder.XSSEncode(value);
						"function" == typeof (_base = _this._lastSubview).destroy && _base.destroy();
						return _this.loadView(mainView, !1, !0)
					}
				}
			}(this));
			mainView.createCommons()
		}
		return this.createFeed(mainView, loadFeed)
	};
	AppsAppController.prototype.doQuery = function (selector, options, callback) {
		if (selector["manifest.authorNick"] === KD.nick()) this.changeVerifiedSwitchVisibilty("hide");
		else {
			this.changeVerifiedSwitchVisibilty("show");
			this._verifiedOnly && (selector.status = "verified")
		}
		return KD.remote.api.JNewApp.some(selector, options, callback)
	};
	AppsAppController.prototype.changeVerifiedSwitchVisibilty = function (methodName) {
		var _ref, _ref1;
		null != (_ref = this.verifiedSwitch) && _ref[methodName]();
		return null != (_ref1 = this.verifiedSwitchLabel) ? _ref1[methodName]() : void 0
	};
	AppsAppController.prototype.doKiteQuery = function (selector, options, callback) {
		return KD.remote.api.JKite.list(selector, options, callback)
	};
	AppsAppController.prototype.createFeed = function (view, loadFeed) {
		var options;
		null == loadFeed && (loadFeed = !1);
		options = {
			feedId: "apps.main",
			itemClass: AppsListItemView,
			limitPerPage: 12,
			delegate: this,
			useHeaderNav: !0,
			filter: {
				allApps: {
					title: "All Apps",
					noItemFoundText: "There is no application yet",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							var JNewApp;
							JNewApp = KD.remote.api.JNewApp;
							return _this._searchValue ? JNewApp.byRelevance(_this._searchValue, options, callback) : _this.doQuery(selector, options, callback)
						}
					}(this)
				},
				myApps: {
					title: "My Apps",
					noItemFoundText: "You don't have any apps yet",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							selector["manifest.authorNick"] = KD.nick();
							return _this.doQuery(selector, options, callback)
						}
					}(this)
				},
				webApps: {
					title: "Web Apps",
					noItemFoundText: "There is no web apps yet",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							selector["manifest.category"] = "web-app";
							return _this.doQuery(selector, options, callback)
						}
					}(this)
				},
				kodingAddOns: {
					title: "Add-ons",
					noItemFoundText: "There is no add-ons yet",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							selector["manifest.category"] = "add-on";
							return _this.doQuery(selector, options, callback)
						}
					}(this)
				},
				serverStacks: {
					title: "Server Stacks",
					noItemFoundText: "There is no server-stacks yet",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							selector["manifest.category"] = "server-stack";
							return _this.doQuery(selector, options, callback)
						}
					}(this)
				},
				frameworks: {
					title: "Frameworks",
					noItemFoundText: "There is no frameworks yet",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							selector["manifest.category"] = "framework";
							return _this.doQuery(selector, options, callback)
						}
					}(this)
				},
				kites: {
					title: "Kites",
					noItemFoundText: "There are no kites yet",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							return _this.doKiteQuery(selector, options, callback)
						}
					}(this)
				},
				miscellaneous: {
					title: "Miscellaneous",
					noItemFoundText: "There is no miscellaneous app yet",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							selector["manifest.category"] = "misc";
							return _this.doQuery(selector, options, callback)
						}
					}(this)
				}
			},
			sort: {
				"meta.modifiedAt": {
					title: "Latest activity",
					direction: -1
				}
			}
		};
		KD.checkFlag("super-admin") ? options.filter.waitsForApprove = {
			title: "New Apps",
			dataSource: function () {
				return function (selector, options, callback) {
					return KD.remote.api.JNewApp.some_(selector, options, callback)
				}
			}(this)
		} : delete options.filter.kites;
		return KD.getSingleton("appManager").tell("Feeder", "createContentFeedController", options, function (_this) {
			return function (controller) {
				var facets, feed, kiteButton, reloadButton;
				_this.verifiedSwitchLabel = new KDLabelView({
					cssClass: "verified-switch-label",
					title: "Verified applications only"
				});
				_this.verifiedSwitch = new KodingSwitch({
					cssClass: "verified-switch tiny",
					defaultValue: _this._verifiedOnly,
					callback: function (state) {
						_this._verifiedOnly = state;
						return _this.feedController.reload()
					}
				});
				_this._lastQuery = {};
				reloadButton = new KDButtonView({
					style: "refresh-button transparent",
					title: "",
					icon: !0,
					iconOnly: !0,
					callback: function () {
						return _this.feedController.handleQuery(_this._lastQuery, {
							force: !0
						})
					}
				});
				kiteButton = new KDButtonView({
					title: "Create New Kite",
					cssClass: "solid mini green kite-button",
					callback: function () {
						var kiteModal;
						kiteModal = new CreateKiteModal;
						return kiteModal.once("KiteCreated", function () {
							return _this.feedController.reload()
						})
					}
				});
				facets = controller.facetsController.getView();
				facets.addSubView(reloadButton);
				facets.addSubView(kiteButton);
				feed = controller.getView();
				feed.addSubView(_this.verifiedSwitchLabel);
				feed.addSubView(_this.verifiedSwitch);
				view.addSubView(_this._lastSubview = feed);
				_this.feedController = controller;
				loadFeed && controller.loadFeed();
				_this.emit("ready");
				kiteButton.hide();
				return controller.on("FilterChanged", function (name) {
					if ("kites" === name) {
						_this.changeVerifiedSwitchVisibilty("hide");
						return kiteButton.show()
					}
					_this.changeVerifiedSwitchVisibilty("show");
					return kiteButton.hide()
				})
			}
		}(this))
	};
	AppsAppController.prototype.handleQuery = function (query) {
		return this.ready(function (_this) {
			return function () {
				(null != query.q || _this._searchValue) && _this.emit("searchFilterChanged", query.q || "");
				_this.feedController.handleQuery(query);
				return _this._lastQuery = query
			}
		}(this))
	};
	AppsAppController.prototype.handleRoute = function (route) {
		return getAppInstance(route, function (_this) {
			return function (err, app) {
				return !err && app ? _this.showContentDisplay(app) : void 0
			}
		}(this))
	};
	AppsAppController.prototype.showAppDetailsModal = function (app) {
		var appView;
		if (this.modal) {
			this.modal.off("KDObjectWillBeDestroyed");
			this.modal.destroy()
		}
		appView = new AppDetailsView({
			cssClass: "app-details"
		}, app);
		this.modal = new KDModalView({
			view: appView
		});
		return this.modal.on("KDObjectWillBeDestroyed", function (_this) {
			return function () {
				_this.modal = null;
				return KD.singletons.router.clear("/Apps")
			}
		}(this))
	};
	AppsAppController.prototype.showContentDisplay = function (content) {
		var contentDisplay, controller;
		controller = new ContentDisplayControllerApps(null, content);
		contentDisplay = controller.getView();
		KD.singleton("display").emit("ContentDisplayWantsToBeShown", contentDisplay);
		return contentDisplay
	};
	AppsAppController.prototype.search = function (text) {
		return this.emit("searchFilterChanged", text)
	};
	return AppsAppController
}(AppController);
var BugReportController, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
BugReportController = function (_super) {
	function BugReportController(options, data) {
		null == options && (options = {});
		options.view = new BugReportMainView({
			cssClass: "content-page bugreports activity",
			delegate: this
		});
		options.appInfo = {
			name: "Bugs"
		};
		BugReportController.__super__.constructor.call(this, options, data);
		this.lastTo;
		this.lastFrom;
		this.on("LazyLoadThresholdReached", function (_this) {
			return function () {
				var _ref;
				return null != (_ref = _this.feedController) ? _ref.loadFeed() : void 0
			}
		}(this));
		this.getView().on("ChangeFilterClicked", function (_this) {
			return function (filterName) {
				return _this.feedController.selectFilter(filterName)
			}
		}(this))
	}
	__extends(BugReportController, _super);
	KD.registerAppClass(BugReportController, {
		name: "Bugs",
		route: "/:name?/Bugs",
		version: "1.0"
	});
	BugReportController.prototype.loadView = function (mainView) {
		return this.createFeed(mainView)
	};
	BugReportController.prototype.createFeed = function (view) {
		var options;
		options = {
			feedId: "apps.bugreport",
			itemClass: BugStatusItemList,
			limitPerPage: 20,
			useHeaderNav: !0,
			filter: {
				all: {
					title: "Reported Bugs",
					noItemFoundText: "There is no reported bugs",
					dataSource: function (_this) {
						return function (selector, options, callback) {
							options.tag = "bug";
							options.tagType = "user-tag";
							return _this.fetch(selector, options, callback)
						}
					}(this)
				}
			},
			sort: {
				"meta.modifiedAt": {
					title: "Latest Bugs",
					direction: -1
				}
			}
		};
		return KD.getSingleton("appManager").tell("Feeder", "createContentFeedController", options, function (_this) {
			return function (controller) {
				view.mainBlock.addSubView(controller.getView());
				_this.feedController = controller;
				_this.feedController.on("FilterChanged", function () {
					return delete _this.lastTo
				});
				return _this.emit("ready")
			}
		}(this))
	};
	BugReportController.prototype.fetch = function (selector, options, callback) {
		var JNewStatusUpdate;
		JNewStatusUpdate = KD.remote.api.JNewStatusUpdate;
		selector = {
			feedType: "bug",
			limit: options.limit,
			to: this.lastTo
		};
		return JNewStatusUpdate.fetchGroupActivity(selector, function (_this) {
			return function (err, activities) {
				null == activities && (activities = []);
				_this.extractMessageTimeStamps(activities);
				null != activities && activities.map(function (activity) {
					return activity.on("TagsUpdated", function (tags) {
						return activity.tags = KD.remote.revive(tags)
					})
				});
				return callback(err, activities)
			}
		}(this))
	};
	BugReportController.prototype.setLastTimestamps = function (from, to) {
		if (from) {
			this.lastTo = to;
			return this.lastFrom = from
		}
		return this.reachedEndOfActivities = !0
	};
	BugReportController.prototype.extractMessageTimeStamps = function (messages) {
		var from, to;
		if (0 !== messages.length) {
			from = new Date(messages.last.meta.createdAt).getTime();
			to = new Date(messages.first.meta.createdAt).getTime();
			return this.setLastTimestamps(to, from)
		}
	};
	return BugReportController
}(AppController);
var BugReportMainView, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	};
BugReportMainView = function (_super) {
	function BugReportMainView(options, data) {
		var filterOptions, groupController;
		null == options && (options = {});
		BugReportMainView.__super__.constructor.call(this, options, data);
		this.filterMenu = new KDCustomHTMLView({
			cssClass: "bug-status right-block-box"
		});
		filterOptions = [{
			title: "all",
			value: "all"
		}, {
			title: "fixed",
			value: "fixed"
		}, {
			title: "changelog",
			value: "changelog"
		}];
		this.filterMenu.addSubView(new KDCustomHTMLView({
			tagName: "a",
			cssClass: "bug-status-title",
			partial: "Bug Reports",
			click: function (_this) {
				return function () {
					return _this.emit("ChangeFilterClicked", "all")
				}
			}(this)
		}));
		this.inputWidget = new ActivityInputWidget({
			app: "bug"
		});
		this.inputWidget.on("Submit", function (_this) {
			return function (err, activity) {
				var lists;
				if (err) return err;
				lists = _this.getDelegate().feedController.resultsController.listControllers;
				return lists.all.addItem(activity, 0)
			}
		}(this));
		groupController = KD.getSingleton("groupsController");
		groupController.on("PostIsCreated", function (_this) {
			return function (post) {
				var lists, subject;
				subject = _this.prepareSubject(post);
				if ("bug" === subject.feedType) {
					lists = _this.getDelegate().feedController.resultsController.listControllers;
					return lists.all.addItem(subject, 0)
				}
			}
		}(this))
	}
	__extends(BugReportMainView, _super);
	BugReportMainView.prototype.prepareSubject = function (post) {
		var subject;
		subject = post.subject;
		return KD.remote.revive(subject)
	};
	BugReportMainView.prototype.viewAppended = function () {
		this.mainBlock = new KDCustomHTMLView({
			tagName: "main"
		});
		this.sideBlock = new KDCustomHTMLView({
			tagName: "aside"
		});
		this.addSubView(this.mainBlock);
		this.addSubView(this.sideBlock);
		this.mainBlock.addSubView(this.inputWidget);
		return this.sideBlock.addSubView(this.filterMenu)
	};
	return BugReportMainView
}(KDScrollView);
var BugStatusItemList, __hasProp = {}.hasOwnProperty,
	__extends = function (child, parent) {
		function ctor() {
			this.constructor = child
		}
		for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
		ctor.prototype = parent.prototype;
		child.prototype = new ctor;
		child.__super__ = parent.prototype;
		return child
	},
	__indexOf = [].indexOf || function (item) {
		for (var i = 0, l = this.length; l > i; i++)
			if (i in this && this[i] === item) return i;
		return -1
	};
BugStatusItemList = function (_super) {
	function BugStatusItemList(options, data) {
		var state, tag, _i, _len, _ref, _ref1;
		null == options && (options = {});
		BugStatusItemList.__super__.constructor.call(this, options, data);
		this.bugTags = ["valid", "fixed", "not reproducible", "invalid", "in progress"];
		if (data.tags) {
			_ref = data.tags;
			for (_i = 0, _len = _ref.length; _len > _i; _i++) {
				tag = _ref[_i];
				(_ref1 = tag.title, __indexOf.call(this.bugTags, _ref1) >= 0) && (state = tag.title)
			}
		}
		this.bugstatus = new KDMultipleChoice({
			cssClass: "clean-gray editor-button control-button bug",
			labels: this.bugTags,
			multiple: !1,
			defaultValue: state,
			size: "tiny",
			disabled: !KD.hasAccess("edit posts"),
			callback: function (_this) {
				return function (value) {
					return _this.changeBugStatus(value)
				}
			}(this),
			click: function (event) {
				KD.hasAccess("edit posts") || new KDNotificationView({
					title: "Only Koding staff can set this"
				});
				return KD.utils.stopDOMEvent(event)
			}
		});
		data.on("TagsUpdated", function (_this) {
			return function (tags) {
				var _j, _len1;
				for (_j = 0, _len1 = tags.length; _len1 > _j; _j++) {
					tag = tags[_j];
					"system-tag" === tag.category && (state = tag.title)
				}
				return _this.bugstatus.setValue(state)
			}
		}(this));
		KD.utils.defer(function (_this) {
			return function () {
				return _this.addSubView(_this.bugstatus)
			}
		}(this))
	}
	__extends(BugStatusItemList, _super);
	JView.mixin(BugStatusItemList.prototype);
	BugStatusItemList.prototype.getItemDataId = function () {
		var _base;
		return ("function" == typeof (_base = this.getData()).getId ? _base.getId() : void 0) || this.getData().id || this.getData()._id
	};
	BugStatusItemList.prototype.changeBugStatus = function (status) {
		return KD.remote.api.JTag.fetchSystemTags({}, {
			limit: 50
		}, function (_this) {
			return function (err, systemTags) {
				var activity, body, index, isSame, newTags, options, statusTags, stringToAdd, stringToRemove, tag, tagToAdd, tagToRemove, _i, _j, _k, _len, _len1, _len2, _ref;
				if (err || systemTags.length < 1) return new KDNotificationView({
					title: err || "no system tag found."
				});
				activity = _this.getData();
				body = activity.body;
				statusTags = activity.tags;
				newTags = [];
				for (_i = 0, _len = statusTags.length; _len > _i; _i++) {
					tag = statusTags[_i];
					(_ref = tag.title, __indexOf.call(_this.bugTags, _ref) >= 0) && "system-tag" === tag.category && (tagToRemove = tag)
				}
				for (_j = 0, _len1 = systemTags.length; _len1 > _j; _j++) {
					tag = systemTags[_j];
					tag.title === status && (tagToAdd = tag)
				}
				if (!tagToAdd) return new KDNotificationView({
					title: "Tag not found!"
				});
				if (tagToRemove) {
					isSame = tagToRemove.title === tagToAdd.title;
					index = statusTags.indexOf(tagToRemove);
					statusTags.splice(index, 1);
					stringToRemove = _this.utils.tokenizeTag(tagToRemove);
					stringToAdd = "|#:JTag:" + tagToAdd.getId() + "|";
					if (isSame) {
						stringToAdd = "";
						_this.bugstatus.setValue("", !1)
					} else stringToAdd = "|#:JTag:" + tagToAdd.getId() + "|";
					body = body.replace(stringToRemove, stringToAdd)
				} else {
					stringToAdd = _this.utils.tokenizeTag(tagToAdd);
					body += " " + stringToAdd
				}
				isSame || newTags.push({
					id: tagToAdd.getId()
				});
				for (_k = 0, _len2 = statusTags.length; _len2 > _k; _k++) {
					tag = statusTags[_k];
					newTags.push({
						id: tag.getId()
					})
				}
				options = {
					body: body,
					meta: {
						tags: newTags
					}
				};
				return activity.modify(options, function (err) {
					return err ? log(err) : void 0
				})
			}
		}(this))
	};
	return BugStatusItemList
}(StatusActivityItemView);
//# sourceMappingURL=/a/js/__social.js.map