var $ = function(id) { //创建方便的选择符 
return typeof id == "string" ? document.getElementById(id) : id; 
};

window.onload = function  () {
	dragStart();
	boxClose();
	boxOpen();
	bindChoose();
	initMap();
}



var getEvent=function(event) { //获取事件 
return event ? event : window.event; 
};
var getTarget= function(event) { //获取事件目标 
return event.target || event.srcElement; 
} ;
var bindEvent= function(node, type, func) { //事件绑定方法 
	if (node.addEventListener) { 
			node.addEventListener(type, func, false); 
		} 
	else if (node.attachEvent) { 
		node.attachEvent("on" + type, func); 
		} 
	else { 
		node["on" + type] = func; 
		} 
	}


// 拖动进度条
var dragging = null; //初始化对象 


function drag(event) {
	event = getEvent(event);
	var target = getTarget(event);
	var windowSize = window.innerWidth;

	switch(event.type){
		case "mousedown":
			if(target.id == "dragBox"||target.id == "dragBox1"){
				dragging = target;
			}
			break;

		case "mousemove":
			if(dragging){
				if (windowSize<=1280) {
					dragging.style.left = (event.clientX-220+document.body.scrollLeft) + "px";
					var left = parseInt(dragging.style.left);
				}
				else{
					dragging.style.left = (event.clientX-250+document.body.scrollLeft) + "px";
					var left = parseInt(dragging.style.left);
				};
				
				if(dragging.id=="dragBox")
					{	
						$("moneyArea").style.width=left+"px";
						$("money").innerHTML = "$"+Math.round(left/440*5000);
					}
					else{
						$("timeArea").style.width=left+"px";
						$("time").innerHTML = Math.round(left/440*48)+"WEEKS";
					}
				if(left<=0)
				{
					dragging.style.left = "0px";
					if(dragging.id=="dragBox")
					{	
						$("moneyArea").style.width="0px";
						$("money").innerHTML = "$100";
					}else{
						$("timeArea").style.width="0px";
						$("time").innerHTML = "4WEEKS";
					}
	
				}
				if(left>=420)
				{
					dragging.style.left = "415px";
					if(dragging.id=="dragBox")
					{	
						$("moneyArea").style.width="415px";
						$("money").innerHTML = "$5000+";
					}
					else{
						$("timeArea").style.width="415px";
						$("time").innerHTML = "48WEEKS+";
					}
				}
			}
			break;
		case "mouseup":
			dragging = null; 
			break; 
	}
};

 dragStart = function() {
	bindEvent(document, "mousedown", drag); 
	bindEvent(document, "mousemove", drag); 
	bindEvent(document, "mouseup", drag);
}

// 预算栏关闭开启
var boxClose = function () {
	$("closeBtn").onclick = function(){
		$("estimteBox").className="p-estimate closing";
		setTimeout("showBoxIn()", 1000);
		
	};
}
var boxOpen = function () {
	$("showBox").onclick = function(){
		$("estimteBox").className="p-estimate opening";
		$("showBox").style.display="none";
	}
}
var showBoxIn = function(){
	$("showBox").style.display="block";
}

// 业务选取

var bindChoose = function () {
	var area = document.getElementById('chooseArea').getElementsByTagName('i');
	for (var i = 5; i >= 0; i--) {
		bindEvent(area[i],"click",chooseBus); 
	};
}

var chooseBus = function(event){
	var target = getTarget(event);
	console.log(target.className.indexOf("picked")!=-1);
	if (target.className.indexOf("picked")!=-1) {
		target.innerHTML="&#xe600;";
		target.className="iconfont";
	}
	else{
		target.innerHTML="&#xe601;";
		target.className="iconfont picked";
	};
	
}

// 地圖
  //创建和初始化地图函数：
    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
    }
    
    //创建地图函数：
    function createMap(){
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(113.432891,23.064174);//定义一个中心点坐标
        map.centerAndZoom(point,14);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    //地图控件添加函数：
    function addMapControl(){
                //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_TOP_LEFT,isOpen:0});
    map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
    }
    
    
   //创建和初始化地图