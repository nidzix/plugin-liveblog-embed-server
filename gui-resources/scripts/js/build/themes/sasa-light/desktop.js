liveblog.define("plugins",{}),liveblog.define("plugins/pagination",["plugins","lib/utils"],function(e,t){return e.pagination=function(){t.dispatcher.once("initialize.posts-view",function(e){e.collection.clearPaginationParams(),liveblog.limit&&(e.collection.syncParams.pagination.limit=parseInt(liveblog.limit,10)),e.flags.loadingNextPage=!1,e.updateNextPageOffset=function(){this.collection.syncParams.pagination.offset=this.collection.length},e.topPage=function(){return delete this.collection.syncParams.pagination["order.end"],this.collection.syncParams.pagination.offset=0,this.collection.fetchPage({reset:!0})},e.nextPage=function(){if(!this.flags.loadingNextPage&&this.hasNextPage()){t.dispatcher.trigger("loading.posts-view",this),this.flags.loadingNextPage=!0,this.updateNextPageOffset();var e=this;return this.collection.fetchPage().done(function(){e.flags.loadingNextPage=!1,t.dispatcher.trigger("loaded.posts-view",e)})}},e.hasNextPage=function(){return this.collection.length<this.collection.filterProps.total},e.hasTopPage=function(){return this.flags.hasTopPage?!0:!1}})},e.pagination}),liveblog.define("lib/helpers/twitter",[],function(){var e={link:{anchor:function(e){return e.replace(/[äéöüßÄÖÜA-Za-z]+:\/\/[äéöüßÄÖÜA-Za-z0-9-_]+\.[äéöüßÄÖÜA-Za-z0-9-_:%&\?\/.=]+/g,function(e){return e=e.link(e),e=e.replace('href="','target="_blanka" href="')})},user:function(e){return e.replace(/[@]+[äéöüßÄÖÜA-Za-z0-9-_]+/g,function(e){var t=e.replace("@","");return e=e.link("http://twitter.com/"+t),e=e.replace('href="','target="_blankb" onclick="loadProfile(\''+t+'\');return(false);"  href="')})},tag:function(e){return e.replace(/[#]+[äéöüßÄÖÜA-Za-z0-9-_]+/g,function(e){var t=e.replace("#","%23");return e=e.link("http://twitter.com/search?q="+t),e=e.replace('href="','target="_blank" href="')})},all:function(e){return e=this.anchor(e),e=this.user(e),e=this.tag(e)}}};return e}),liveblog.define("tmpl!themeBase/plugins/after-button-pagination",["dust"],function(e){return function(){function t(e,t){return t=t.shiftBlocks(u),e.partial(n,t,null)}function n(e,t){return t=t.shiftBlocks(u),e.reference(t.get(["baseItem"],!1),t,"h")}function i(e,t){return t=t.shiftBlocks(u),e.write("load-next")}function o(e,t){return t=t.shiftBlocks(u),e.block(t.getBlock("loadNext"),t,{block:s},null).block(t.getBlock("loadingNext"),t,{block:r},null)}function s(e,t){return t=t.shiftBlocks(u),e}function r(e,t){return t=t.shiftBlocks(u),e}function a(e,t){return t=t.shiftBlocks(u),e.write('<a class="load-more">').helper("i18n",t,{},{msgid:"Load more posts ..."}).write("</a>")}function l(e,t){return t=t.shiftBlocks(u),e.write('<span class="loading-image"></span>')}function c(e,t){return t=t.shiftBlocks(u),e.write('data-gimme="posts.nextPage"')}e.register("themeBase/plugins/after-button-pagination",t);var u={itemClass:i,main:o,loadNext:a,loadingNext:l,additionalAttributes:c};return t}(),{render:function(t,n){return e.render("themeBase/plugins/after-button-pagination",t,n)}}}),liveblog.define("tmpl!themeBase/plugins/before-button-pagination",["dust"],function(e){return function(){function t(e,t){return t=t.shiftBlocks(u),e.partial(n,t,null)}function n(e,t){return t=t.shiftBlocks(u),e.reference(t.get(["baseItem"],!1),t,"h")}function i(e,t){return t=t.shiftBlocks(u),e.write("load-next")}function o(e,t){return t=t.shiftBlocks(u),e.block(t.getBlock("loadNext"),t,{block:s},null).block(t.getBlock("loadingNext"),t,{block:r},null)}function s(e,t){return t=t.shiftBlocks(u),e}function r(e,t){return t=t.shiftBlocks(u),e}function a(e,t){return t=t.shiftBlocks(u),e.write('<a class="load-more">Load top posts</a>')}function l(e,t){return t=t.shiftBlocks(u),e.write('<span class="loading-image"></span>')}function c(e,t){return t=t.shiftBlocks(u),e.write('data-gimme="posts.beforePage"')}e.register("themeBase/plugins/before-button-pagination",t);var u={itemClass:i,main:o,loadNext:a,loadingNext:l,additionalAttributes:c};return t}(),{render:function(t,n){return e.render("themeBase/plugins/before-button-pagination",t,n)}}}),liveblog.define("plugins/button-pagination",["backbone","plugins","plugins/pagination","dust","lib/utils","lib/helpers/display-toggle","tmpl!themeBase/item/base","tmpl!themeBase/plugins/after-button-pagination","tmpl!themeBase/plugins/before-button-pagination"],function(e,t,n,i,o,s){return delete t.pagination,t["button-pagination"]=function(t){n(t),o.dispatcher.on("initialize.blog-view",function(e){e.clientEvents({'click [data-gimme="posts.to-top"]':"toTop"}),e.toTop=function(){var e=this,t=e.el.offset();window.scrollTo(t.left,t.top)}}),o.dispatcher.once("add-all.posts-view",function(t){var n={};n.baseItem=i.themed("themeBase/item/base"),0===t.$('[data-gimme="posts.beforePage"]').length&&i.renderThemed("themeBase/plugins/before-button-pagination",n,function(n,i){var o=e.$(i);s(o,!1),t.$el.prepend(o)}),0===t.$('[data-gimme="posts.nextPage"]').length&&i.renderThemed("themeBase/plugins/after-button-pagination",n,function(n,i){var o=e.$(i);s(o,!1),t.$el.append(o)})}),o.dispatcher.once("add-all.posts-view",function(e){e.checkNextPage(),e.checkTopPage()}),o.dispatcher.once("initialize.posts-view",function(e){e.clientEvents({'click [data-gimme="posts.nextPage"]':"buttonNextPage",'click [data-gimme="posts.beforePage"]':"buttonTopPage"}),e.checkTopPage=function(){s(this.$('[data-gimme="posts.beforePage"]'),this.hasTopPage())},e.checkNextPage=function(){s(this.$('[data-gimme="posts.nextPage"]'),this.hasNextPage()),o.dispatcher.trigger("pagination-next-updated.posts-view",this)},e.buttonNextPage=function(){e.flags.buttonNextPage=!0;var t=e.$('[data-gimme="posts.nextPage"]');t.addClass("loading"),e.nextPage().done(function(){e.flags.buttonNextPage=!1,t.removeClass("loading"),e.checkNextPage()})},e.buttonTopPage=function(){var t=e.$('[data-gimme="posts.beforePage"]');t.addClass("loading"),e.flags.topPage=!1,e.topPage().done(function(){t.removeClass("loading"),s(t,!1),e.checkNextPage()})}})},t["button-pagination"]}),liveblog.define("tmpl!themeBase/plugins/pending-items-message",["dust"],function(e){return function(){function t(e){return e.write('<a data-gimme="posts.pending-message" class="new-posts-label"></a>')}return e.register("themeBase/plugins/pending-items-message",t),t}(),{render:function(t,n){return e.render("themeBase/plugins/pending-items-message",t,n)}}}),liveblog.define("plugins/pending-messages",["lib/gettext","plugins","lib/utils","dust","tmpl!themeBase/item/base","tmpl!themeBase/plugins/pending-items-message"],function(e,t,n,i){return t.pendingMessages=function(){var t={};n.dispatcher.once("initialize.blog-view",function(e){t=e}),n.dispatcher.once("after-render.blog-view",function(e){i.renderThemed("themeBase/plugins/pending-items-message",{},function(t,n){e.$('[data-gimme="posts.pending-message-placeholder"]').html(n)})}),n.isClient&&(n.dispatcher.once("initialize.posts-view",function(e){e.pauseAutoRender=function(){this.flags.autoRender=!1},e.resumeAutoRender=function(){this.flags.autoRender=!0},t.$el.on("click",'[data-gimme="posts.pending-message"]',function(){e.renderPending()})}),n.dispatcher.on("update-pending.posts-view",function(n){var i="",o=n.pendingCounter;o>0&&(i=e.sprintf(e.ngettext("one new post","%(count)s new posts",o),{count:o})),t.$('[data-gimme="posts.pending-message"]').html(i).toggle(o>0)}))},t.pendingMessages}),liveblog.define("config/scroll-pagination-plugin",{scrollHeight:500,nextPageTriggerOffset:-200}),function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},t=[].slice;!function(e,t){return"function"==typeof liveblog.define&&liveblog.define.amd?liveblog.define("waypoints",["jquery"],function(n){return t(n,e)}):t(e.jQuery,e)}(this,function(n,i){var o,s,r,a,l,c,u,p,m,g,d,h,f,b,v,w;return o=n(i),p=e.call(i,"ontouchstart")>=0,a={horizontal:{},vertical:{}},l=1,u={},c="waypoints-context-id",d="resize.waypoints",h="scroll.waypoints",f=1,b="waypoints-waypoint-ids",v="waypoint",w="waypoints",s=function(){function e(e){var t=this;this.$element=e,this.element=e[0],this.didResize=!1,this.didScroll=!1,this.id="context"+l++,this.oldScroll={x:e.scrollLeft(),y:e.scrollTop()},this.waypoints={horizontal:{},vertical:{}},this.element[c]=this.id,u[this.id]=this,e.bind(h,function(){var e;return t.didScroll||p?void 0:(t.didScroll=!0,e=function(){return t.doScroll(),t.didScroll=!1},i.setTimeout(e,n[w].settings.scrollThrottle))}),e.bind(d,function(){var e;return t.didResize?void 0:(t.didResize=!0,e=function(){return n[w]("refresh"),t.didResize=!1},i.setTimeout(e,n[w].settings.resizeThrottle))})}return e.prototype.doScroll=function(){var e,t=this;return e={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}},!p||e.vertical.oldScroll&&e.vertical.newScroll||n[w]("refresh"),n.each(e,function(e,i){var o,s,r;return r=[],s=i.newScroll>i.oldScroll,o=s?i.forward:i.backward,n.each(t.waypoints[e],function(e,t){var n,o;return i.oldScroll<(n=t.offset)&&n<=i.newScroll?r.push(t):i.newScroll<(o=t.offset)&&o<=i.oldScroll?r.push(t):void 0}),r.sort(function(e,t){return e.offset-t.offset}),s||r.reverse(),n.each(r,function(e,t){return t.options.continuous||e===r.length-1?t.trigger([o]):void 0})}),this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.refresh=function(){var e,t,i,o=this;return i=n.isWindow(this.element),t=this.$element.offset(),this.doScroll(),e={horizontal:{contextOffset:i?0:t.left,contextScroll:i?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:i?0:t.top,contextScroll:i?0:this.oldScroll.y,contextDimension:i?n[w]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}},n.each(e,function(e,t){return n.each(o.waypoints[e],function(e,i){var o,s,r,a,l;return o=i.options.offset,r=i.offset,s=n.isWindow(i.element)?0:i.$element.offset()[t.offsetProp],n.isFunction(o)?o=o.apply(i.element):"string"==typeof o&&(o=parseFloat(o),i.options.offset.indexOf("%")>-1&&(o=Math.ceil(t.contextDimension*o/100))),i.offset=s-t.contextOffset+t.contextScroll-o,i.options.onlyOnScroll&&null!=r||!i.enabled?void 0:null!==r&&r<(a=t.oldScroll)&&a<=i.offset?i.trigger([t.backward]):null!==r&&r>(l=t.oldScroll)&&l>=i.offset?i.trigger([t.forward]):null===r&&t.oldScroll>=i.offset?i.trigger([t.forward]):void 0})})},e.prototype.checkEmpty=function(){return n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)?(this.$element.unbind([d,h].join(" ")),delete u[this.id]):void 0},e}(),r=function(){function e(e,t,i){var o,s;i=n.extend({},n.fn[v].defaults,i),"bottom-in-view"===i.offset&&(i.offset=function(){var e;return e=n[w]("viewportHeight"),n.isWindow(t.element)||(e=t.$element.height()),e-n(this).outerHeight()}),this.$element=e,this.element=e[0],this.axis=i.horizontal?"horizontal":"vertical",this.callback=i.handler,this.context=t,this.enabled=i.enabled,this.id="waypoints"+f++,this.offset=null,this.options=i,t.waypoints[this.axis][this.id]=this,a[this.axis][this.id]=this,o=null!=(s=this.element[b])?s:[],o.push(this.id),this.element[b]=o}return e.prototype.trigger=function(e){return this.enabled?(null!=this.callback&&this.callback.apply(this.element,e),this.options.triggerOnce?this.destroy():void 0):void 0},e.prototype.disable=function(){return this.enabled=!1},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0},e.prototype.destroy=function(){return delete a[this.axis][this.id],delete this.context.waypoints[this.axis][this.id],this.context.checkEmpty()},e.getWaypointsByElement=function(e){var t,i;return(i=e[b])?(t=n.extend({},a.horizontal,a.vertical),n.map(i,function(e){return t[e]})):[]},e}(),g={init:function(e,t){var i;return null==t&&(t={}),null==(i=t.handler)&&(t.handler=e),this.each(function(){var e,i,o,a;return e=n(this),o=null!=(a=t.context)?a:n.fn[v].defaults.context,n.isWindow(o)||(o=e.closest(o)),o=n(o),i=u[o[0][c]],i||(i=new s(o)),new r(e,i,t)}),n[w]("refresh"),this},disable:function(){return g._invoke.call(this,"disable")},enable:function(){return g._invoke.call(this,"enable")},destroy:function(){return g._invoke.call(this,"destroy")},prev:function(e,t){return g._traverse.call(this,e,t,function(e,t,n){return t>0?e.push(n[t-1]):void 0})},next:function(e,t){return g._traverse.call(this,e,t,function(e,t,n){return t<n.length-1?e.push(n[t+1]):void 0})},_traverse:function(e,t,o){var s,r;return null==e&&(e="vertical"),null==t&&(t=i),r=m.aggregate(t),s=[],this.each(function(){var t;return t=n.inArray(this,r[e]),o(s,t,r[e])}),this.pushStack(s)},_invoke:function(e){return this.each(function(){var t;return t=r.getWaypointsByElement(this),n.each(t,function(t,n){return n[e](),!0})}),this}},n.fn[v]=function(){var e,i;return i=arguments[0],e=2<=arguments.length?t.call(arguments,1):[],g[i]?g[i].apply(this,e):n.isFunction(i)?g.init.apply(this,arguments):n.isPlainObject(i)?g.init.apply(this,[null,i]):n.error(i?"The "+i+" method does not exist in jQuery Waypoints.":"jQuery Waypoints needs a callback function or handler option.")},n.fn[v].defaults={context:i,continuous:!0,enabled:!0,horizontal:!1,offset:0,triggerOnce:!1},m={refresh:function(){return n.each(u,function(e,t){return t.refresh()})},viewportHeight:function(){var e;return null!=(e=i.innerHeight)?e:o.height()},aggregate:function(e){var t,i,o;return t=a,e&&(t=null!=(o=u[n(e)[0][c]])?o.waypoints:void 0),t?(i={horizontal:[],vertical:[]},n.each(i,function(e,o){return n.each(t[e],function(e,t){return o.push(t)}),o.sort(function(e,t){return e.offset-t.offset}),i[e]=n.map(o,function(e){return e.element}),i[e]=n.unique(i[e])}),i):[]},above:function(e){return null==e&&(e=i),m._filter(e,"vertical",function(e,t){return t.offset<=e.oldScroll.y})},below:function(e){return null==e&&(e=i),m._filter(e,"vertical",function(e,t){return t.offset>e.oldScroll.y})},left:function(e){return null==e&&(e=i),m._filter(e,"horizontal",function(e,t){return t.offset<=e.oldScroll.x})},right:function(e){return null==e&&(e=i),m._filter(e,"horizontal",function(e,t){return t.offset>e.oldScroll.x})},enable:function(){return m._invoke("enable")},disable:function(){return m._invoke("disable")},destroy:function(){return m._invoke("destroy")},extendFn:function(e,t){return g[e]=t},_invoke:function(e){var t;return t=n.extend({},a.vertical,a.horizontal),n.each(t,function(t,n){return n[e](),!0})},_filter:function(e,t,i){var o,s;return(o=u[n(e)[0][c]])?(s=[],n.each(o.waypoints[t],function(e,t){return i(o,t)?s.push(t):void 0}),s.sort(function(e,t){return e.offset-t.offset}),n.map(s,function(e){return e.element})):[]}},n[w]=function(){var e,n;return n=arguments[0],e=2<=arguments.length?t.call(arguments,1):[],m[n]?m[n].apply(null,e):m.aggregate.call(null,n)},n[w].settings={resizeThrottle:100,scrollThrottle:30},o.load(function(){return n[w]("refresh")})})}.call(this),liveblog.define("plugins/scroll-pagination",["plugins","plugins/button-pagination","plugins/pending-messages","config/scroll-pagination-plugin","lib/utils"],function(e,t,n,i,o){return delete e["button-pagination"],delete e["pending-messages"],e["scroll-pagination"]=function(e){t(e),n(e),o.dispatcher.once("add-all.posts-view",function(e){e.$el.css("overflow-y","auto").css("overflow-x","auto").css("height",i.scrollHeight+"px")}),o.isClient&&(o.dispatcher.on("initialize.blog-view",function(e){liveblog.require(["waypoints"],function(){s(e)})}),o.dispatcher.on("pagination-next-updated.posts-view",function(e){e.hasNextPage()&&r(e,e.$('[data-gimme="posts.nextPage"]'))}),o.dispatcher.once("pagination-next-updated.posts-view",function(e){a(e)}));var s=function(e){e.clientEvents({'click [data-gimme="posts.to-top"]':"toTop",'click [data-gimme="posts.pending-message"]':"toTop"}),e.toTop=function(e){e.preventDefault(),this.$('[data-gimme="posts.list"]').scrollTop(0)}},r=function(e,t){t.waypoint(function(){e.buttonNextPage()},{continuous:!1,triggerOnce:!0,offset:"100%",context:e.el})},a=function(e){var t=e.$('[data-gimme="posts.beforePage"]');t.waypoint(function(n){"down"===n&&(e.pauseAutoRender(),t.waypoint("destroy"),l(e))},{continuous:!1,offset:i.nextPageTriggerOffset,context:e.el})},l=function(e){var t=e.firstPost().$el;t.waypoint(function(n){"up"===n&&(e.renderPending(),e.resumeAutoRender(),t.waypoint("destroy"),a(e))},{continuous:!1,offset:-1,context:e.el})}},e["scroll-pagination"]}),liveblog.require.config({paths:{twitterWidgets:"//platform.twitter.com/widgets"},shim:{twitterWidgets:{exports:"twttr"}}}),liveblog.define("plugins/twitter-widgets",["underscore","backbone","plugins","dust","lib/utils"],function(e,t,n,i,o){return n["twitter-widgets"]=function(){if(o.isClient){o.dispatcher.on("before-render.post-view",function(e){"themeBase/item/source/twitter"===e.itemName()&&(e.parentView()._twitterPosts||(e.parentView()._twitterPosts=[]),e.parentView()._twitterPosts.push(e))}),o.dispatcher.on("add-all.posts-view",function(e){t(e)});var t=function(t){t._twitterPosts&&liveblog.require(["twitterWidgets","waypoints"],function(n){n.ready(function(){e.each(t._twitterPosts,function(e){e.$el.waypoint(function(){var t=e.model.get("Meta").id_str;n.widgets.createTweet(t,e.$el.find(".post-content-full").get(0),function(){e.$el.find(".post-core-content").remove()},{cards:"all"})},{triggerOnce:!0,offset:"120%",context:t.el})}),t._twitterPosts=[]})},function(){})}}},n["twitter-widgets"]}),liveblog.define("lib/helpers/escape-RegExp",[],function(){var e=function(e){return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")};return e}),liveblog.define("plugins/post-hash",["plugins","lib/utils","lib/helpers/escape-RegExp"],function(e,t,n){e["post-hash"]=function(){var e,i="liveblog.item.id",o=liveblog.hashmark?liveblog.hashmark:"?";e=t.isClient?window.location.href:liveblog.locationHref||"/",t.dispatcher.on("initialize.post-view",function(t){t.permalink=function(s){var r=s&&s.hashMark?s.hashMark:o,a=!1,l=i+"="+parseFloat(t.model.get("Order"));if(-1===e.indexOf(r))a=e+r+l;else if(-1!==e.indexOf(i+"=")){var c=new RegExp(n(i)+"=[^&#]*");a=e.replace(c,l)}else a=e+"&"+l;return a}}),t.dispatcher.on("initialize.posts-view",function(t){var n=e.indexOf(i+"=");-1!==n&&(t.collection.syncParams.pagination["order.end"]=parseFloat(e.substr(n+i.length+1)),t.flags.hasTopPage=!0,t.flags.autoRender=!1)})}}),liveblog.define("lib/helpers/visibility-toggle",[],function(){var e=function(e,t){var n="";return n=void 0!==t?t?"visible":"hidden":"visible"===e.css("visibility")?"hidden":"visible",e.css("visibility",n),"visible"===n?!0:!1};return e}),liveblog.define("tmpl!themeBase/plugins/permanent-link",["dust"],function(e){return function(){function t(e){return e.write('<a data-gimme="post.permalink" href="#" rel="bookmark" class="permalink">#</a><input data-gimme="post.share-permalink" type="text" style="visibility:hidden; z-index: 9000" value="">')}return e.register("themeBase/plugins/permanent-link",t),t}(),{render:function(t,n){return e.render("themeBase/plugins/permanent-link",t,n)}}}),liveblog.define("plugins/permanent-link",["plugins","lib/utils","dust","lib/helpers/visibility-toggle","tmpl!themeBase/item/base","tmpl!themeBase/plugins/permanent-link"],function(e,t,n,i){return t.isClient?(e.permalink=function(){t.dispatcher.on("after-render.post-view",function(e){n.renderThemed("themeBase/plugins/permanent-link",{},function(t,n){e.$('[data-gimme="post.permanent-link-placeholder"]').html(n)});var t="";e.permalink&&"function"==typeof e.permalink&&(t=e.permalink(),e.$('[data-gimme="post.share-permalink"]').val(t),e.$('[data-gimme="post.permalink"]').attr("href",t))}),t.dispatcher.on("initialize.post-view",function(e){e.clientEvents({'click [data-gimme="post.permalink"]':"permalinkAction"}),e.permalinkAction=function(e){e.preventDefault();var t=this.$(e.target).siblings('[data-gimme="post.share-permalink"]');if(i(t)){var n=this.$('[data-gimme^="post.share"][data-gimme!="post.share-permalink"]');i(n,!1),t.trigger("focus")}},e.clientEvents({'click [data-gimme="post.share-permalink"]':"permalinkInput",'focus [data-gimme="post.share-permalink"]':"permalinkInput"}),e.permalinkInput=function(t){e.$(t.target).select()},e.delegateEvents()})},e.permalink):void 0}),liveblog.define("lib/helpers/fixed-encodeURIComponent",[],function(){return function(e){return encodeURIComponent(e).replace(/'/g,"%27").replace(/!/g,"%21").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/~/g,"%7E")}}),liveblog.define("config/social-share-plugin",{urls:{pin:"//pinterest.com/pin/create/button/?url=%s&media=%s&description=%s",twt:"//twitter.com/home?status=%s %s: %s",lin:"//www.linkedin.com/shareArticle?mini=true&url=%s&title=%s&summary=%s",ggl:"//plus.google.com/share?url=%s&t=",email:"mailto:?to=&subject=%s&body=%s",fb:"//www.facebook.com/sharer.php?s=100&p[title]=%s&p[summary]=%s&p[url]=%s%s",fbImageComp:"&p[images][%s]=%s"},shareWindowSize:{pin:{h:400,w:700},twt:{h:400,w:570},lin:{h:400,w:570},ggl:{h:400,w:570},email:{h:1024,w:768},fb:{h:400,w:570}}}),liveblog.define("tmpl!themeBase/plugins/social-share-anchor",["dust"],function(e){return function(){function t(e,t){return e.write('<a data-gimme="post.social" href="#" class="sf-share">').helper("i18n",t,{},{msgid:"Share"}).write("</a>")}return e.register("themeBase/plugins/social-share-anchor",t),t}(),{render:function(t,n){return e.render("themeBase/plugins/social-share-anchor",t,n)}}}),liveblog.define("tmpl!themeBase/plugins/social-share",["dust"],function(e){return function(){function t(e,t){return e.write('<div data-gimme="post.share-social" class="share-box" style="visibility:hidden"><a href="#" class=\'social facebook\' target=\'_blank\' title="').helper("i18n",t,{},{msgid:"Share this post on Facebook"}).write('" data-gimme="fb"></a><a href="#" class=\'social twitter\' target=\'_blank\' title="').helper("i18n",t,{},{msgid:"Share this post on Twitter"}).write('" data-gimme="twt"></a><a href="#" class=\'social linkedin\' title="').helper("i18n",t,{},{msgid:"Share this post on Linkedin"}).write('" data-gimme="lin"></a>').section(t.get(["showPin"],!1),t,{block:n},null).write('<a href="#" class=\'social google\' title="').helper("i18n",t,{},{msgid:"Share this post on Google+"}).write('" data-gimme="ggl"></a><a href="').reference(t.get(["emailurl"],!1),t,"h").write("\" class='social email' title=\"").helper("i18n",t,{},{msgid:"Share this post via Email"}).write('" target="_blank"></a></div>')}function n(e,t){return e.write('<a href="#" class=\'social pinterest\' title="').helper("i18n",t,{},{msgid:"Share this post on Pinterest"}).write('" data-gimme="pin"></a>')}return e.register("themeBase/plugins/social-share",t),t}(),{render:function(t,n){return e.render("themeBase/plugins/social-share",t,n)}}}),liveblog.define("plugins/social-share",["backbone","underscore","plugins","lib/utils","dust","lib/gettext","lib/helpers/fixed-encodeURIComponent","lib/helpers/visibility-toggle","config/social-share-plugin","tmpl!themeBase/plugins/social-share-anchor","tmpl!themeBase/plugins/social-share"],function(e,t,n,i,o,s,r,a,l){i.isClient&&(n["social-share"]=function(){i.dispatcher.on("after-render.post-view",function(e){o.renderThemed("themeBase/plugins/social-share-anchor",{},function(t,n){e.$('[data-gimme="post.social-share-placeholder"]').html(n)})}),i.dispatcher.on("initialize.post-view",function(e){e.clientEvents({'click [data-gimme="post.social"]':"share"}),e.share=function(e){e.preventDefault();var t=this,i=n(t);t.socialShareUrls=c(i),o.renderThemed("themeBase/plugins/social-share",u(i),function(e,n){t.$('[data-gimme="post.social-share-placeholder"]').append(n)}),p(t);var s=t.$('[data-gimme="post.share-social"]'),r=t.$('[data-gimme^="post.share"]');"hidden"===s.css("visibility")&&a(r,!1),a(s)},e.openShareWindow=function(e){e.preventDefault();var t=this.$(e.target).data("gimme"),n=l.shareWindowSize[t].h,i=l.shareWindowSize[t].w,o=this.socialShareUrls[t],s="resizable, height="+n+", width="+i,r=window.open(o,"",s);return r.focus(),!1}});var n=function(t){var n=t.parentView().parentView().model,i=r(n.get("Title")),o=r(t.$(".result-content .result-text:last").text()),a="";t.permalink&&"function"==typeof t.permalink&&(a=r(t.permalink()));var c=t.$(".result-content img:first").attr("src");c||(c=e.$("img:first").attr("src"));var u="";t.$(".result-content img").each(function(t){u+=s.sprintf(l.fbURLImageComp,[t,e.$(this).attr("src")])});var p={pin:[a,c,i],twt:[s.gettext("Now reading"),i,a],lin:[a,i,o],ggl:[a],email:[s.gettext("Check out this Live Blog"),a],fb:[i,o,a,u]};return p},c=function(e){var n={};return delete e.email,t.each(e,function(t,i){n[i]=s.sprintf(l.urls[i],e[i])}),n},u=function(e){var t={};return t.emailurl=s.sprintf(l.urls.email,e.email),t},p=function(e){var n={};t.each(e.socialShareUrls,function(e,t){n['click [data-gimme="'+t+'"]']="openShareWindow"}),e.clientEvents(n),e.delegateEvents()}})}),liveblog.define("plugins/wrappup-toggle",["backbone","underscore","plugins","lib/utils","dust"],function(e,t,n,i){var o={hide:"slideUp",show:"slideDown"};i.isClient&&i.dispatcher.once("initialize.posts-view",function(e){e.clientEvents({'click [data-gimme="post.wrapup"]':"wrapupToggle"}),e.wrapupToggle=function(t){var n=e.$(t.target).closest('[data-gimme="post.wrapup"]'),i=n.attr("data-wrapup-open");n.hasClass(i)?(n.removeClass(i),n.nextUntil('[data-gimme="post.wrapup"],[data-gimme="posts.nextPage"]')[o.hide]()):(n.addClass(i),n.nextUntil('[data-gimme="post.wrapup"],[data-gimme="posts.nextPage"]')[o.show]())}})}),liveblog.define("models/comment",["underscore","backbone-custom","models/base-model","collections/posts","lib/utils"],function(e,t,n){return n.extend({setUrlRoot:function(e){this.urlRoot=e}})}),liveblog.define("plugins/user-comments-popup",["underscore","backbone-custom","views/base-view","lib/helpers/display-toggle","models/comment"],function(e,t,n,i,o){return n.extend({messageDisplayTime:5e3,initialize:function(){this.clientEvents({'click [data-gimme="blog.comment"]':"togglePopup","click #comment-message-btn":"showAfterMessage","click .button.cancel":"togglePopup","click .button.send":"send"}),this.popup=this.$('[data-gimme="blog.comment-box-holder"]'),i(this.popup,!1),this.popup_message=this.$('[data-gimme="blog.comment-box-message"]'),i(this.popup_message,!1),this.username=this.$('[data-gimme="blog.comment-nickname"]'),this.text=this.$('[data-gimme="blog.comment-text"]'),this.resetInput(),this.backdropel=this.$('[data-gimme="blog.comment-backdrop"]'),this.backdropel.data("show-status",0),this.lbpostlist=this.backdropel.parent()},togglePopup:function(e){var t=this,n=t.backdropel.data("show-status");switch(e.preventDefault(),n){case 0:i(t.popup,!0),t.backdropel.data("show-status",1),i(t.backdropel,!0),t.lbpostlist.addClass("comment-active"),t.blogview.stopPoller();break;case 1:t.backdropel.data("show-status",0).hide(),i(t.popup_message,!1),t.resetInput(),t.lbpostlist.removeClass("comment-active"),i(t.popup,!1),t.blogview.starPoller();break;case 2:i(t.popup_message,!1),t.resetInput(),t.lbpostlist.removeClass("comment-active"),i(t.popup,!1),t.blogview.starPoller()}},send:function(e){e.preventDefault();var t=this;if(this.isValid()){var n=new o,i={UserName:this.username.val(),CommentText:this.text.val()};n.setUrlRoot(this.model.get("CommentPost").href),n.save(i,{success:function(){t.showAfterMessage(e),t.resetInput()},error:function(){t.showAfterMessage(e),t.resetInput()},crossDomain:!0,type:"post"})}},resetInput:function(){this.username.val(""),this.text.val(""),i(this.$(".error"),!1)},showAfterMessage:function(){var e=this;e.backdropel.data("show-status",2),i(e.backdropel,!0),i(e.popup),e.backdropel.data("show-status",1),i(this.popup_message,!0),setTimeout(function(){i(e.popup_message,!1),e.backdropel.data("show-status",0),i(e.backdropel,!1),e.blogview.starPoller()},e.messageDisplayTime)},isValid:function(){return this.username.val()?i(this.username.next(".error"),!1):i(this.username.next(".error"),!0),this.text.val()?i(this.text.next(".error"),!1):i(this.text.next(".error"),!0),0===this.$(".error:visible").length}})}),liveblog.define("tmpl!themeBase/plugins/user-comment-message",["dust"],function(e){return function(){function t(e,t){return e.write('<div class="comment-box-message" data-gimme="blog.comment-box-message"><div class="content ">').helper("i18n",t,{},{msgid:"Your message was sent for approval"}).write("</div></div>")}return e.register("themeBase/plugins/user-comment-message",t),t}(),{render:function(t,n){return e.render("themeBase/plugins/user-comment-message",t,n)}}}),liveblog.define("tmpl!themeBase/plugins/user-comment-backdrop",["dust"],function(e){return function(){function t(e){return e.write('<div class="comment-backdrop" id="backdrop" data-gimme="blog.comment-backdrop"></div>')}return e.register("themeBase/plugins/user-comment-backdrop",t),t}(),{render:function(t,n){return e.render("themeBase/plugins/user-comment-backdrop",t,n)}}}),liveblog.define("tmpl!themeBase/plugins/user-comment-action",["dust"],function(e){return function(){function t(e,t){return e.write('<a data-gimme="blog.comment" href="#" class="comment button" ').section(t.get(["UserComments"],!1),t,{"else":n,block:i},null).write(">").helper("i18n",t,{},{msgid:"comment"}).write("</a>")}function n(e){return e.write(' style="display:none" ')}function i(e){return e.write(' style="display:block" ')}return e.register("themeBase/plugins/user-comment-action",t),t}(),{render:function(t,n){return e.render("themeBase/plugins/user-comment-action",t,n)}}}),liveblog.define("tmpl!themeBase/plugins/user-comment",["dust"],function(e){return function(){function t(e,t){return e.write('<div class="comment-box" data-gimme="blog.comment-box-holder"><form name="comment"><div class="content"><input type="text" placeholder="').helper("i18n",t,{},{msgid:"Nickname"}).write('" id="comment-nickname" data-gimme="blog.comment-nickname"><div class="error">').helper("i18n",t,{},{msgid:"Please fill in your Nickname."}).write('</div><textarea placeholder="').helper("i18n",t,{},{msgid:"Your Comment"}).write('" id="comment-text" data-gimme="blog.comment-text"></textarea><div class="error">').helper("i18n",t,{},{msgid:"Please fill in your Comment text."}).write('</div><div id="comment-token" data-public-key="6Le3_OISAAAAAFHYywwPBTceM563QA62HOSvxz4B"></div><div class="error">').helper("i18n",t,{},{msgid:"Please fill in text from image."}).write('</div><button type="submit" class="button send">').helper("i18n",t,{},{msgid:"Send"}).write('</button><button type="reset" class="button cancel">').helper("i18n",t,{},{msgid:"Cancel"}).write("</button></div></form></div>")}return e.register("themeBase/plugins/user-comment",t),t}(),{render:function(t,n){return e.render("themeBase/plugins/user-comment",t,n)}}}),liveblog.define("plugins/user-comments",["plugins","plugins/user-comments-popup","lib/utils","dust","lib/helpers/display-toggle","tmpl!themeBase/plugins/user-comment-message","tmpl!themeBase/plugins/user-comment-backdrop","tmpl!themeBase/plugins/user-comment-action","tmpl!themeBase/plugins/user-comment"],function(e,t,n,i,o){return e["user-comments"]=function(e){n.dispatcher.on("config-update.blog-view",function(e){o(e.$('[data-gimme="blog.comment"]'),e.model.get("EmbedConfig").UserComments)}),n.dispatcher.on("conditional-render.blog-view",function(s){if(i.renderThemed("themeBase/plugins/user-comment-action",{UserComments:s.model.get("EmbedConfig").UserComments},function(e,t){s.$('[data-gimme="blog.comment-action"]').html(t)}),o(s.$('[data-gimme="blog.comment"]'),e.UserComments),i.renderThemed("themeBase/plugins/user-comment",{},function(e,t){s.$('[data-gimme="blog.comment-box"]').html(t)}),i.renderThemed("themeBase/plugins/user-comment-message",{},function(e,t){s.$('[data-gimme="blog.comment-box-message"]').html(t)}),i.renderThemed("themeBase/plugins/user-comment-backdrop",{},function(e,t){s.$('[data-gimme="blog.comment-box-backdrop"]').html(t)
}),n.isClient){new t({el:s.el,blogview:s,model:s.model})}})},e["user-comments"]}),liveblog.define("tmpl!theme/container",["dust"],function(e){return function(){function t(e,t){return t=t.shiftBlocks(r),e.partial("themeBase/container",t,null)}function n(e,t){return t=t.shiftBlocks(r),e.write('<div class="liveblog-header">').block(t.getBlock("header"),t,{block:i},null).write("</div>")}function i(e,t){return t=t.shiftBlocks(r),e.block(t.getBlock("blogMedia"),t,{block:o},null)}function o(e,t){return t=t.shiftBlocks(r),e}function s(e,t){return t=t.shiftBlocks(r),e}e.register("theme/container",t);var r={headerContainer:n,contentBottomContainer:s};return t}(),{render:function(t,n){return e.render("theme/container",t,n)}}}),liveblog.define("tmpl!theme/item/base",["dust"],function(e){return function(){function t(e,t){return t=t.shiftBlocks(l),e.partial("themeBase/item/base",t,null)}function n(e,t){return t=t.shiftBlocks(l),e}function i(e,t){return t=t.shiftBlocks(l),e.block(t.getBlock("postDateContainer"),t,{block:o},null).block(t.getBlock("userAvatar"),t,{block:s},null).block(t.getBlock("userNameContainer"),t,{block:r},null).write('<a class="logo-badge" href="#" title="by STT"></a>').block(t.getBlock("shareContainer"),t,{block:a},null)}function o(e,t){return t=t.shiftBlocks(l),e}function s(e,t){return t=t.shiftBlocks(l),e}function r(e,t){return t=t.shiftBlocks(l),e}function a(e,t){return t=t.shiftBlocks(l),e}e.register("theme/item/base",t);var l={headerContainer:n,contentSide:i};return t}(),{render:function(t,n){return e.render("theme/item/base",t,n)}}}),liveblog.define("themeFile",["css!theme/liveblog","plugins/scroll-pagination","plugins/twitter-widgets","plugins/post-hash","plugins/permanent-link","plugins/social-share","plugins/wrappup-toggle","plugins/user-comments","tmpl!theme/container","tmpl!theme/item/base"],function(){return{plugins:["scroll-pagination","twitter-widgets","post-hash","permanent-link","social-share","wrappup-toggle","user-comments"]}});