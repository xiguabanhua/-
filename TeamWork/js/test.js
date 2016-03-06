var VVG = {}; //命名空间 
VVG.DOM = { 
$: function(id) { //创建方便的选择符 
return typeof id == "string" ? document.getElementById(id) : id; 
}, 
bindEvent: function(node, type, func) { //事件绑定方法 
if (node.addEventListener) { 
node.addEventListener(type, func, false); 
} else if (node.attachEvent) { 
node.attachEvent("on" + type, func); 
} else { 
node["on" + type] = func; 
} 
}, 
getEvent: function(event) { //获取事件 
return event ? event : window.event; 
}, 
getTarget: function(event) { //获取事件目标 
return event.target || event.srcElement; 
} 
} 
var DragDrop = function() { //新建一个返回对象的函数 
var box = VVG.DOM.$("box"); //获取外围BOX 
var dragBox = VVG.DOM.$("dragBox");//获取需要拖动的BOX 
var dragging = null; //初始化对象 
function drag(event) { //事件执行函数 
event = VVG.DOM.getEvent(event); 
var target = VVG.DOM.getTarget(event); 
switch (event.type) {//判断事件类型 
case "mousedown": 
if(target.id == "dragBox"){ //当事件对象的ID等于要拖动的BOX的ID时 
dragging = target; //赋值到拖动目标 
} 
break; 
case "mousemove": 
if(dragging){ //当有拖动目标时执行 
sTop = document.documentElement.scrollTop || document.body.scrollTop; //当有滚动条的时候卷去页面的高度 
dragging.style.left = (event.clientX - box.offsetLeft - dragBox.offsetWidth/2) + "px"; 
dragging.style.top = (event.clientY + sTop - box.offsetTop - dragBox.offsetHeight/2 ) + "px"; 
var left = parseInt(dragging.style.left); 
var top = parseInt(dragging.style.top); 
//console.log("left:"+left+"-----top:"+top + "-------sTop:"+sTop); 
// 比较坐标是否超出外围的BOX 
if(left < 0){ 
dragging.style.left = 0 +"px"; 
} 
if(top < 0){ 
dragging.style.top = 0+"px"; 
} 
if(left > box.offsetWidth - dragBox.offsetWidth){ 
dragging.style.left = (box.offsetWidth - dragBox.offsetWidth - 2 )+"px"; 
} 
if(top > box.offsetHeight - dragBox.offsetHeight){ 
dragging.style.top =( box.offsetHeight - dragBox.offsetHeight - 2 )+"px"; 
} 
} 
break; 
case "mouseup": 
// 清空拖动目标 
dragging = null; 
break; 
} 
}; 
return { 
dragStart: function() { 
// 绑定事件 
VVG.DOM.bindEvent(document, "mousedown", drag); 
VVG.DOM.bindEvent(document, "mousemove", drag); 
VVG.DOM.bindEvent(document, "mouseup", drag); 
} 
} 
}(); 
DragDrop.dragStart(); 
