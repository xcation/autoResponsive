/*! autoResponsive - v1.1 - 2013-07-06 8:51:48 PM
* Copyright (c) 2013 xudafeng; Licensed  */
KISSY.add("gallery/autoResponsive/1.1/plugin/drag",function(e){"use strict";function n(){}var t=(e.Event,e.DD),i=t.DraggableDelegate,r=t.Droppable;return e.augment(n,{init:function(){e.log("drag init!")},_bindDrop:function(e){var n=this;"on"==n.drag&&new r({node:e}).on("dropenter",function(e){D.insertAfter(e.drag.get("node"),e.drop.get("node")),n.owner.render()})},_bindBrag:function(){var e=this;"on"==e.drag&&new i({container:e.container,selector:e.selector,move:!0}).on("dragstart",function(e){var n=e.drag.get("node")[0];this.p={left:n.offsetLeft,top:n.offsetTop}}).on("drag",function(){}).on("dragend",function(e){D.css(e.drag.get("node"),this.p)})}}),n},{requires:["event","dd"]});