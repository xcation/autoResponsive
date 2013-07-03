/*! autoResponsive - v1.0 - 2013-07-03 1:29:55 PM
* Copyright (c) 2013 xudafeng; Licensed  */
KISSY.add("gallery/autoResponsive/1.0/config",function(){"use strict";function e(){return{container:{value:t},selector:{value:t},filter:{value:t},fixedSelector:{value:t},priority:{value:t},colWidth:{value:10},colMargin:{value:{x:0,y:0}},animate:{value:!0},duration:{value:1},easing:{value:"easeNone"},direction:{value:"left"},random:{value:!1},sort:{value:t},layout:{value:t},autoHeight:{value:!0},resize:{value:!0},init:{value:!0},plugin:{value:[]},async:{value:!1},cache:!1,resizeFrequency:200}}var t="";return e}),KISSY.add("gallery/autoResponsive/1.0/anim",function(e){"use strict";function t(t){var n=this;e.mix(n,t),n.notSupport=11>e.UA.ie||"right"==n.direction,n._init()}var n=e.DOM,i=e.Anim,r=" ";return e.augment(t,{_init:function(){var e=this;return e.animate?(e.notSupport?e.fixedAnim():e.css3Anim(),void 0):(e.noneAnim(),void 0)},cssPrefixes:function(t,n){var i={};return e.each("-webkit- -moz- -o- -ms-  ".split(r),function(e){i[e+t]=n}),i},css3Anim:function(){var t=this;n.css(t.elm,e.merge(t.cssPrefixes("transform","translate("+t.x+"px,"+t.y+"px) "),t.cssPrefixes("transition-duration",t.duration+"s"))),t._self.fire("afterElemSort",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t._self.frame}})},fixedAnim:function(){var e=this,t={top:e.y},n="left";"right"==e.direction&&(n="right"),t[n]=e.x,new i(e.elm,t,e.duration,e.easing,function(){e._self.fire("afterElemSort",{autoResponsive:{elm:e.elm,position:{x:e.x,y:e.y},frame:e._self.frame}})}).run()},noneAnim:function(){var e=this;n.css(e.elm,{left:e.x,top:e.y}),e._self.fire("afterElemSort",{autoResponsive:{elm:e.elm,position:{x:e.x,y:e.y},frame:e._self.frame}})}}),t},{requires:["dom","anim"]}),KISSY.add("gallery/autoResponsive/1.0/linkedlist",function(e){"use strict";function t(e){var t=this;t.length=0,t.head=null,t.tail=null,t.type=e.type||!0,t.query=[],t.init()}return e.augment(t,{init:function(){e.augment(Array,{shuffle:function(){for(var e,t,n=this.length;n;e=parseInt(Math.random()*n),t=this[--n],this[n]=this[e],this[e]=t);return this}})},add:function(e){var t=this;if(t.type)return t.query.push(e),void 0;var n={value:e,next:null,prev:null};0==t.length?t.head=t.tail=n:(t.tail.next=n,n.prev=t.tail,t.tail=n),t.length++},remove:function(e){var t=this;if(e>t.length-1||0>e)return null;var n=t.head,i=0;if(0==e)t.head=n.next,null==t.head?t.tail=null:t.head.previous=null;else if(e==t.length-1)n=t.tail,t.tail=n.prev,t.tail.next=null;else{for(;e>i++;)n=n.next;n.prev.next=n.next,n.next.prev=n.prev}t.length--},get:function(e){var t=this;return t.type?t.query[e]:t.node(e).value},node:function(e){var t=this;if(e>t.length-1||0>e)return null;for(var n=t.head,i=0;e>i++;)n=n.next;return n},update:function(e,t){var n=this;return n.type?(n.query[e]=t,void 0):(n.node(e).value=t,void 0)}}),t}),KISSY.add("gallery/autoResponsive/1.0/gridsort",function(e,t,n){"use strict";function i(t,n){var i=this;e.mix(i,e.merge(t,{_self:n})),i.doneQuery=[],i._init()}var r=e.DOM,a="";return e.augment(i,{_init:function(){var t=this,n=e.query(t.selector,t.container);switch(t.layout){case a:case"grid":default:t._gridSort(n);break;case"cell":t._cellSort(n)}},_filter:function(e){var t=this;if(t.filter!=a)return r.show(e),r.hasClass(e,t.filter)?(r.hide(e),!0):void 0},coordinate:function(e,t){return this._autoFit(e,r.outerWidth(t),r.outerHeight(t))},callAnim:function(e,n){var i=this;new t({elm:e,x:n[0],y:n[1],animate:i.animate,duration:i.duration,easing:i.easing,direction:i.direction,frame:i._self.frame,_self:i._self})},_cache:function(e){var t=this,n=!1;return t.priority==a?n:(t.cacheQuery||(t.cacheQuery=[]),r.hasClass(e,t.priority)||(n=!0,t.cacheQuery.push(e)),n)},clearCache:function(e,t){var n=this;n.cacheQuery&&(n.cacheQuery=[]),n._self.curQuery=e,n._self.itemLength=t.length},asyncize:function(e){var t=this;t._self.get("async")?setTimeout(function(){e.call(t)},0):e.call(t)},_gridSort:function(t){var n=this,i=0,a=n._getCols();n._setFrame(),n.random&&(t=t.shuffle()),n._self.fire("beforeSort",{autoResponsive:{elms:t}}),e.each(t,function(e,t){if(!(n.cache&&n._self.itemLength>t||n._filter(e)||n._cache(e))){n._self.fire("beforeElemSort",{autoResponsive:{elm:e,frame:n._self.frame}});var o=n.coordinate(a,e);o[1]+r.outerHeight(e)>i&&(i=o[1]+r.outerHeight(e)),n.asyncize(function(){n.callAnim(e,o)})}}),e.each(n.cacheQuery,function(e){n._self.fire("beforeElemSort",{autoResponsive:{elm:e,frame:n._self.frame}});var t=n.coordinate(a,e);t[1]+r.outerHeight(e)>i&&(i=t[1]+r.outerHeight(e)),n.asyncize(function(){n.callAnim(e,t)})}),n.clearCache(a,t),n._self.fire("afterSort",{autoResponsive:{elms:t,curColHeights:n._getMinMaxHeight(),frame:n._self.frame}}),n.setHeight(i)},_getMinMaxHeight:function(){var e=this;return e.doneQuery},_setFrame:function(){var e=this;e._self.frame++},_cellSort:function(t){var n=this,i=[];e.each(t,function(){e.log("star from here!"),i.push(n._getCells())})},_getCells:function(){return this._getCols()},_getCols:function(){var e=this;if(e._self.curQuery&&e.cache)return e._self.curQuery;for(var t=new n({}),i=0;Math.ceil(r.outerWidth(e.container)/e.colWidth)>i;i++)t.add(0);return t},_getCur:function(t,n){var i=[null,1/0],r=n.query.length?n.query:n;return e.each(r,function(e,a){var o=[];if(!(a+t>=r.length)){for(var u=a;a+t>u;u++)o.push(n.get(u));i[1]>Math.max.apply(Math,o)&&(i=[a,Math.max.apply(Math,o)])}}),i},_autoFit:function(e,t,n){for(var i=this,r=Math.ceil((t+i.colMargin.x)/i.colWidth),a=i._getCur(r,e),o=a[0];r+a[0]>o;o++)e.update(o,a[1]+n+i.colMargin.y);return i.doneQuery.push(a[1]+n+i.colMargin.y),[a[0]*i.colWidth+i.colMargin.x,a[1]+i.colMargin.y]},setHeight:function(e){var t=this;t.autoHeight&&r.height(t.container,e+t.colMargin.y)}}),i},{requires:["./anim","./linkedlist","dom"]}),KISSY.add("gallery/autoResponsive/1.0/base",function(e,t,n,i){"use strict";function r(){var t=this;return r.superclass.constructor.apply(t,arguments),e.get(t.get("container"))?(t.fire("beforeInit",{autoResponsive:t}),t.get("init")&&t.init(),t.fire("afterInit",{autoResponsive:t}),void 0):(e.log("can not init,lack container!"),void 0)}var a=e.DOM,o=e.Event,u=window;return e.extend(r,i,{init:function(){var t=this;t._bindEvent(),t.initPlugin(),t.render(),e.log("init!")},initPlugin:function(){var t=this;t.api={},e.each(t.get("plugin"),function(n){n.init(t),e.mix(t.api,n.api)})},render:function(){var t=this,i=t.getAttrVals();t.frame=t.frame||0,arguments[0]&&e.each(arguments[0],function(e,t){i[t]=e}),e.mix(i,t.api),new n(i,t)},_bind:function(e){var t=this;t.get("resize")&&o.on(u,"resize",function(){e.call(t)})},_bindEvent:function(){var t=this;t._bind(e.throttle(function(){t.render(),t.fire("resize")},t.get("resizeFrequency"),t))},adjust:function(){var e=this;e.render()},priority:function(e){var t=this;t.render({priority:e})},filter:function(e){var t=this;t.render({filter:e})},margin:function(e){var t=this;t.render({colMargin:e})},direction:function(e){var t=this;t.render({direction:e})},random:function(){var e=this;e.render({random:!0})},option:function(e){var t=this;t.render(e)},append:function(e){var t=this;a.append(e,t.get("container")),t.render({cache:!0})},prepend:function(e){var t=this;a.prepend(e,t.get("container")),t.render()}},{ATTRS:new t}),r},{requires:["./config","./gridsort","base","dom","event"]});