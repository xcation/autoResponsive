/*! autoResponsive - v1.1 - 2013-07-12 5:04:02 PM
* Copyright (c) 2013 xudafeng; Licensed  */
KISSY.add("gallery/autoResponsive/1.1/config",function(){"use strict";function e(){return{container:{value:t},selector:{value:t},filter:{value:t},fixedSelector:{value:t},priority:{value:t},gridWidth:{value:10},unitMargin:{value:{x:0,y:0}},closeAnim:{value:!1},duration:{value:1},easing:{value:"easeNone"},direction:{value:"left"},random:{value:!1},sortBy:{value:t},autoHeight:{value:!0},closeResize:{value:!1},autoInit:{value:!0},plugins:{value:[]},suspend:{value:!0},cache:{value:!1},resizeFrequency:{value:200},whensRecountUnitWH:{value:[]},delayOnResize:-1}}var t="";return e}),KISSY.add("gallery/autoResponsive/1.1/anim",function(e){"use strict";function t(e){this.cfg=e,this._init()}var i=e.DOM,n=e.Anim,r=11>e.UA.ie,o=["-webkit-","-moz-","-ms-","-o-",""],s=r?"fixedAnim":"css3Anim";return e.augment(t,{_init:function(){this[s]()},cssPrefixes:function(e,t){for(var i={},n=0,r=o.length;r>n;n++)i[o[n]+e]=t;return i},css3Anim:function(){var t=this.cfg;i.css(t.elm,this.cssPrefixes("transform","translate("+("right"!==t.direction?t.x:t.owner.gridSort.containerWH-t.elm.__width-t.x)+"px,"+t.y+"px) ")),t.owner.fire("afterUnitSort",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}}),e.log("css3 anim success")},fixedAnim:function(){var t=this.cfg,i={top:t.y};return t.closeAnim?(this.noneAnim(),void 0):(i["right"==t.direction?"right":"left"]=t.x,new n(t.elm,i,t.duration,t.easing,function(){t.owner.fire("afterUnitSort",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}})}).run(),e.log("kissy anim success"),void 0)},noneAnim:function(){var t=this.cfg;i.css(t.elm,{left:t.x,top:t.y}),t.owner.fire("afterUnitSort",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}}),e.log("maybe your anim is closed")}}),t},{requires:["dom","anim"]}),KISSY.add("gallery/autoResponsive/1.1/linkedlist",function(e){"use strict";function t(e){var t=this;t.length=0,t.head=null,t.tail=null,t.type=e.type||!0,t.query=[],t.init()}return e.augment(t,{init:function(){e.augment(Array,{shuffle:function(){for(var e,t,i=this.length;i;e=parseInt(Math.random()*i),t=this[--i],this[i]=this[e],this[e]=t);return this}})},add:function(e){var t=this;if(t.type)return t.query.push(e),void 0;var i={value:e,next:null,prev:null};0==t.length?t.head=t.tail=i:(t.tail.next=i,i.prev=t.tail,t.tail=i),t.length++},remove:function(e){var t=this;if(e>t.length-1||0>e)return null;var i=t.head,n=0;if(0==e)t.head=i.next,null==t.head?t.tail=null:t.head.previous=null;else if(e==t.length-1)i=t.tail,t.tail=i.prev,t.tail.next=null;else{for(;e>n++;)i=i.next;i.prev.next=i.next,i.next.prev=i.prev}t.length--},get:function(e){var t=this;return t.type?t.query[e]:t.node(e).value},node:function(e){var t=this;if(e>t.length-1||0>e)return null;for(var i=t.head,n=0;e>n++;)i=i.next;return i},update:function(e,t){var i=this;return i.type?(i.query[e]=t,void 0):(i.node(e).value=t,void 0)},size:function(){return this.query.length||this.length}}),t}),KISSY.add("gallery/autoResponsive/1.1/gridsort",function(e,t,i){"use strict";function n(){}var r=e.DOM,o="";return n.prototype={init:function(t,i){this.cfg=t,t.owner=i;var n=e.query(t.selector,t.container);switch(t.sortBy){case o:case"grid":default:this._gridSort(n);break;case"cell":this._cellSort(n)}},_gridSort:function(e){var t=this.cfg,i=this._getCols();this._setFrame(),t.random&&(e=e.shuffle()),t.owner.fire("beforeSort",{autoResponsive:{elms:e}});var n=[];t.filter!==o&&n.push("_filter"),t.priority!==o&&n.push("_priority");var r=n.length,s=e.length,a=t.cache?t.owner._lastPos:0;if(0==r)for(var u=a;s>u;u++)this._render(i,e[u]);else{var l=[];n.push("_tail");for(var c=a;s>c;c++)for(var f,h=0;r+1>h;h++){if(f=this[n[h]](l,c,e[c]),"number"==typeof f){l.splice(f,0,c);break}if("boolean"==typeof f&&f)break}for(var d=0,g=l.length;g>d;d++)this._render(i,e[l[d]])}t.owner._lastPos=s;var v=this._getMinMaxColHeight();t.owner.fire("afterSort",{autoResponsive:{elms:e,curMinMaxColHeight:v,frame:t.owner.frame}}),this.setHeight(v.max)},_getCols:function(){var e=this.cfg;if(this.containerWH=r.outerWidth(e.container),e.owner.curQuery&&e.cache)return e.owner.curQuery;for(var t=new i({}),n=0,o=Math.ceil(this.containerWH/e.gridWidth);o>n;n++)t.add(0);return e.owner.curQuery=t},_setFrame:function(){this.cfg.owner.frame++},_filter:function(e,t,i){var n=this.cfg;return r.show(i),r.hasClass(i,n.filter)?(r.hide(i),!0):!1},_priority:function(e,t,i){if(void 0==e._priorityInsertPos){e._priorityInsertPos=0;var n=this.cfg;return r.hasClass(i,n.priority)?e._priorityInsertPos++:this._priority(e,t,i)}},_tail:function(){return 1/0},_render:function(e,t){var i=this,n=i.cfg;n.owner.fire("beforeUnitSort",{autoResponsive:{elm:t,frame:n.owner.frame}});var r=i.coordinate(e,t);i.asyncize(function(){i.callAnim(t,r)})},coordinate:function(e,t){var i=this.cfg,n=i.isRecountUnitWH;return(n||!t.__width)&&(t.__width=r.outerWidth(t),t.__height=r.outerHeight(t)),this._autoFit(e,t.__width,t.__height)},_autoFit:function(e,t,i){for(var n=this.cfg,r=Math.ceil((t+n.unitMargin.x)/n.gridWidth),o=this._getCur(r,e),s=o[0],a=r+o[0],u=o[1]+i+n.unitMargin.y;a>s;s++)e.update(s,u);return[o[0]*n.gridWidth+n.unitMargin.x,o[1]+n.unitMargin.y]},_getCur:function(e,t){return this._skipALG(e,t)},_stepALG:function(e,t){for(var i=[null,1/0],n=0,r=t.size();r-e+1>n;n++){for(var o=0,s=n;n+e>s;s++)t.get(s)>o&&(o=t.get(s));i[1]>o&&(i=[n,o])}return i},_skipALG:function(e,t){for(var i=1/0,n=0,r=0,o=t.size();o-e+1>n;n++){for(var s,a=-1/0,u=0;e>u;u++)if(s=t.get(n+u),s>=i){if(n+=u+1,n>o-e){a=i;break}u=-1,a=-1/0}else s>a&&(a=s);i>a&&(i=a,r=n)}return[r,i]},asyncize:function(e){var t=this,i=t.cfg;i.owner.get("suspend")?setTimeout(function(){e.call(t)},0):e.call(t)},callAnim:function(e,i){var n=this.cfg;new t({elm:e,x:i[0],y:i[1],closeAnim:n.closeAnim,duration:n.duration,easing:n.easing,direction:n.direction,frame:n.owner.frame,owner:n.owner})},_getMinMaxColHeight:function(){var e=this.cfg,t=1/0,i=e.owner.curQuery.query,n=Math.max.apply(Math,i);if(0==n)t=0;else for(var r=0,o=i.length;o>r;r++)0!=i[r]&&t>i[r]&&(t=i[r]);return{min:t,max:n}},setHeight:function(e){var t=this.cfg;t.autoHeight&&r.height(t.container,e+t.unitMargin.y)},_cellSort:function(t){var i=this,n=[];e.each(t,function(){e.log("star from here!"),n.push(i._getCells())})},_getCells:function(){return this._getCols()}},n},{requires:["./anim","./linkedlist","dom"]}),KISSY.add("gallery/autoResponsive/1.1/base",function(e,t,i,n){"use strict";function r(){return r.superclass.constructor.apply(this,arguments),e.get(this.get("container"))?(this.fire("beforeInit",{autoResponsive:this}),this.get("autoInit")&&this.init(),this.fire("afterInit",{autoResponsive:this}),void 0):(e.log("can not init, lack of container!"),void 0)}var o=e.DOM,s=e.Event,a=window;return e.extend(r,n,{init:function(){this._bindEvent(),this.initPlugins(),this.render(),e.log("AutoResponsive init!")},initPlugins:function(){this.api={};for(var t,i=0,n=this.get("plugins"),r=n.length;r>i;i++)t=n[i],t.init(this),e.mix(this.api,t.api)},render:function(){var t=this.getAttrVals(),n=this.get("whensRecountUnitWH");t.isRecountUnitWH=!!n.length,this.frame=this.frame||0,arguments[0]&&e.each(arguments[0],function(e,i){t[i]=e}),e.mix(t,this.api),this.gridSort=this.gridSort||new i,this.gridSort.init(t,this)},_bind:function(t){var i=this,n=i.get("whensRecountUnitWH");i.get("closeResize")||s.on(a,"resize",function(){t.call(i,{isRecountUnitWH:e.inArray("resize",n)})})},_bindEvent:function(){var t=this;t._bind(e.buffer(function(){var e=t.get("delayOnResize");t.fire("beforeResize"),-1!==e?setTimeout(function(){t.render(arguments)},e):t.render(arguments),t.fire("resize")},t.get("resizeFrequency"),t))},adjust:function(t){var i=this.get("whensRecountUnitWH");this.__isAdjusting=1,this.render({isRecountUnitWH:t||e.inArray("adjust",i)}),this.__isAdjusting=0,e.log("adjust success")},isAdjusting:function(){return this.__isAdjusting||0},priority:function(e){this.render({priority:e})},filter:function(e){this.render({filter:e})},margin:function(e){this.render({unitMargin:e})},direction:function(e){this.render({direction:e})},random:function(){this.render({random:!0})},changeCfg:function(t){var i=this;e.each(t,function(e,t){i.set(t,e)})},append:function(e){o.append(e,this.get("container")),this.render({cache:!0})},prepend:function(e){o.prepend(e,this.get("container")),this.render()}},{ATTRS:new t}),r},{requires:["./config","./gridsort","base","dom","event"]});