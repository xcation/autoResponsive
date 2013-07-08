/*! autoResponsive - v1.1 - 2013-07-08 10:42:40 AM
* Copyright (c) 2013 xudafeng; Licensed  */
KISSY.add("gallery/autoResponsive/1.1/plugin/loader",function(t){"use strict";function e(e){var i=this;e={load:"function"==typeof e.load?e.load:function(){t.log("AutoResponsive.Loader::constructor: the load function in user's config is undefined!","warn")},diff:e.diff||0,mod:"manual"==e.mod?"manual":"auto",qpt:15},i.config=e}function i(e,i,n,r){var o,a={},s=[],u=n.config,l=u.qpt||15;return a.start=function(){s=s.concat(t.makeArray(e));var u=function(){for(var t=+new Date;s.length>0&&50>new Date-t;){var c=s.splice(0,l);i.call(n,c)}return s.length>0?(o=setTimeout(u,25),void 0):(r&&r.call(n,e),a.stop(),a=null,void 0)};u()},a.stop=function(){o&&(clearTimeout(o),s=[])},a}var n=t.DOM,r=t.all,o=window,a=r(o),s=50;return t.augment(e,t.EventTarget,{init:function(e){var i=this,n=i.config,r=n.mod;i.owner=e,i.__bindMethods(),"manual"===r||(i.__onScroll=t.buffer(i.__doScroll,s,i),i.__onScroll(),i.start())},__doScroll:function(){var e=this,i=e.owner,r=e.config;if(t.log("AutoResponsive.Loader::__doScroll..."),!e.__loading){if(i.isAdjusting())return e.__onScroll(),void 0;var o=t.get(i.get("container"));if(o.offsetWidth){var s=n.offset(o).top,u=r.diff,l=i.getMinColHeight(),c=a.scrollTop(),f=a.height();u+c+f>=s+l&&e.load()}}},load:function(){function e(t,e){n.__loading=0,n.__addItems(t,function(){e&&e.call(n),n.__doScroll()})}function i(){n.stop()}var n=this,r=n.config,o=r.load;t.log("AutoResponsive.Loader::loading..."),n.__loading=1,o&&o(e,i)},__addItems:function(t,e){var n=this;i(t,n.__appendItems,n,function(){e&&e.call(n),n.fire("autoresponsive.loader.complete",{items:t})}).start()},__appendItems:function(e){var i=this,n=i.owner;e=t.makeArray(e),n.append(e)},__bindMethods:function(){var t=this,e=t.owner,i={min:0,max:0};e.on("afterSort",function(t){i=t.autoResponsive.curMinMaxColHeight}),e.getMaxColHeight=function(){return i.max},e.getMinColHeight=function(){return i.min}},start:function(){this.resume()},stop:function(){this.pause()},pause:function(){this.__destroyed||(a.detach("scroll",this.__onScroll),this.__onScroll.stop())},resume:function(){var t=this;t.__destroyed||(a.on("scroll",t.__onScroll),t.__started=1)},destroy:function(){this.__destroyed=1}}),e},{requires:["dom","event"]});