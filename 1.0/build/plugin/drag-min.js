/*! autoResponsive - v1.0 - 2013-07-03 1:00:05 PM
* Copyright (c) 2013 xudafeng; Licensed  */
KISSY.add("gallery/autoResponsive/1.0/plugin/drag",function(e){"use strict";function t(){}var n=(e.Event,e.DD),i=n.DraggableDelegate,r=n.Droppable;return e.augment(t,{init:function(){e.log("drag init!")},_bindDrop:function(e){var t=this;"on"==t.drag&&new r({node:e}).on("dropenter",function(e){D.insertAfter(e.drag.get("node"),e.drop.get("node")),t._self.render()})},_bindBrag:function(){var e=this;"on"==e.drag&&new i({container:e.container,selector:e.selector,move:!0}).on("dragstart",function(e){var t=e.drag.get("node")[0];this.p={left:t.offsetLeft,top:t.offsetTop}}).on("drag",function(){}).on("dragend",function(e){D.css(e.drag.get("node"),this.p)})}}),t},{requires:["event","dd"]});