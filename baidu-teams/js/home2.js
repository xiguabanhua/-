/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-05 15:00:38
 * @version $Id$
 */
/*图片轮播开始*/
//取li元素
var featuredWorks= document.getElementById("featured-works");
console.log(featuredWorks);
var oSpan= featuredWorks.getElementsByTagName("span");
console.log(oSpan); 
var oUl=oSpan[1].getElementsByTagName("ul")[0];
var oLi=oUl.getElementsByTagName("li");
console.log(oLi);
//取左切换按钮
var circleLeft=oSpan[0].getElementsByTagName("i")[0];
//取右切换按钮
var circleRight=oSpan[2].getElementsByTagName("i")[0];
//取下面的鼠标移动事件的i元素
var oDiv=featuredWorks.getElementsByTagName("div")[0];
var oI=oDiv.getElementsByTagName('i');
console.log(oI);
//点击左按钮实现图片的切换
// circleRight.onclick=function(){
// 	for(var i=0;i<oLi.length;i++){
// 		if(oLi[i].style.display='block'&&i<oLi.length-1){
// 			oLi[i+1].style.display='block';
// 			var j=i;
// 			for(var k=0;k<oLi.length;k++){
// 				if(k==j){oLi[k].style.display='block';}
// 				else{oLi[k].style.display='none';}
// 			}

// 		}
// 		else{
// 			oLi[0].style.display='block';
// 			for(var k=1;k<oLi.length;k++){
// 				oLi[k].style.display='none';
// 			}
// 		}
// 	}
// }

	var nowPos= 0;//全局变量
	circleRight.onclick=function(){
		//先关闭轮播
		clearInterval(timer);

		if(nowPos==oLi.length-1){nowPos= -1;}
		for(var i=0;i<oLi.length;i++){
			oLi[i].style.display='none';
			oI[i].style.color='#ccc';
		}
		nowPos++;
		oLi[nowPos].style.display='block';
		oI[nowPos].style.color= '#42b078';
		//开启轮播
		timer=setInterval(changePhoto,2000);

	};
//点击右按钮实现图片的切换
	circleLeft.onclick=function(){
		clearInterval(timer);
		if(nowPos==0){nowPos=oLi.length;}
		for(var i=oLi.length-1;i>=0;i--){
			oLi[i].style.display='none';
			oI[i].style.color='#ccc';
		}
		nowPos--;
		// alert(nowPos);
		oLi[nowPos].style.display='block';
		oI[nowPos].style.color= '#42b078';
		//开启轮播
		timer=setInterval(changePhoto,2000);
	};
//0.35s轮播
var transImg =nowPos;
//切换图片函数
function changePhoto(){
	if(transImg==oLi.length){transImg=0;}
	for(var i=0;i<oLi.length;i++){
		oLi[i].style.display='none';
		oI[i].style.color='#ccc';
	}
	oLi[transImg].style.display='block';
	oI[transImg].style.color= '#42b078';
	transImg++;
}
//开启定时器
var timer=setInterval(changePhoto,1000);
console.log(transImg);

//鼠标移到下面的圆圈切换图片
// for(var i=0;i<oI.length;i++){
// 	this.onmouseover=function(){
// 		for(var i=0;i<oLi.length;i++){
// 		oLi[i].style.display='none';
// 		oI[i].style.color='#ccc';
// 		}
// 	}
// 	// this.style.display='block';
// 	console.log(this);
// 	// this.style.color= '#42b078';
// }
/*图片轮播结束*/


/*仿拉钩网的移入移出效果*/
var ourServices=document.getElementById("our-services");
var servicesUl=ourServices.getElementsByTagName("ul");
var servicesLi=servicesUl[0].getElementsByTagName("li");

// var servicesUl=ourServices.querySelector("ul");
// var servicesLi=servicesUl.querySelector("li");
console.log(servicesLi);

// function move(obj){
// 	clearInterval(obj.timer);
// 	obj.timer=setInterval(function(){
// 		if((obj.style.top==(0+'px'))||(obj.style.left==(0+'px'))){
// 				clearInterval(obj.timer);
// 		}
// 		else{
// 				obj.style.left=(parseInt(getComputerStyle(obj,false).left)+10)+'px';
// 		}
// 	},1000/30)

// }
for(var i=0;i<servicesLi.length;i++){
	servicesLi[i].onmouseenter=function(e){
		// alert(typeof(e));//e是鼠标事件，this是鼠标事件对应的对象DOM元素
	 	console.log(e);
	 	// alert(e.pageX);
	 	console.log(this);    
	 	// alert(this.offsetWidth);
	 	//位置坐标a
	 	var a=e.pageX-this.offsetLeft;
	 	console.log("a="+a);
	 	//位置坐标离右的距离
	 	var x=this.offsetWidth-a;
	 	console.log("x="+x);
	 	//位置坐标b
	 	var b=e.pageY-this.offsetTop;
	 	console.log("pageY="+e.pageY);
	 	// console.log("offsetRight="+this.offsetRight);
	 	console.log("b="+b);
	 	
	 	console.log("x="+x);
	 	//位置离下的距离
	 	var y=this.offsetHeight-b;
	 	console.log("y="+y);
	 	var oLiSpan=this.children[1];
	 	console.log(oLiSpan);

	 	if(Math.abs(x-a)/Math.abs(y-b)>(this.offsetWidth/this.offsetHeight)){
	 		if(a<this.offsetWidth/2){
	 			// alert("从左进");
	 			// oLiSpan.style.top=0+'px';
	 			oLiSpan.style.left=(-this.offsetWidth)+'px';
	 			// move(oLiSpan,{left:-146,top:0});
	 			startMove(oLiSpan, 'left', 0);
	 		}
	 		else{
	 			// alert("从右进");
	 			// oLiSpan.style.top=0+'px';
	 			oLiSpan.style.left=(this.offsetWidth)+'px';
	 			// move();
	 		}
	 		// move();
	 		oLiSpan.style.top=0;
	 		startMove(oLiSpan,'left',0);
	 	}
	 	else{
	 		if(b<this.offsetHeight/2){
	 			// alert("从上进");
	 			// this.style.top=(-this.offsetHeight)+'px';
	 			oLiSpan.style.top=(-this.offsetHeight)+'px';
	 			oLiSpan.style.left=0+'px';
	 			// move();

	 		}
	 		else{
	 			// alert("从下进");
	 			oLiSpan.style.top=(this.offsetHeight)+'px';
	 			oLiSpan.style.left=0+'px';
	 			// move();

	 		}
	 		oLiSpan.style.left=0;
	 		startMove(oLiSpan,'top',0);
	 	}	
	}
}
for(var i=0;i<servicesLi.length;i++){
	servicesLi[i].onmouseleave=function(ev){
		var oLiSpan=this.children[1];
		var oEvent = ev || event;
					if(oEvent.pageX <= this.offsetLeft){
						startMove(oLiSpan, 'left', -oLiSpan.offsetWidth);
					} else if (oEvent.pageX >= this.offsetLeft+this.offsetWidth) {
						startMove(oLiSpan, 'left', oLiSpan.offsetWidth);
					} else if (oEvent.pageY <= this.offsetTop) {
						startMove(oLiSpan, 'top', -oLiSpan.offsetHeight);
					} else if(oEvent.pageY>=this.offsetTop+this.offsetHeight){
						startMove(oLiSpan, 'top', oLiSpan.offsetHeight);
					}
				}
}
//获取元素style
		function getStyle(obj, name) {
			if(obj.currentStyle) {
				return obj.currentStyle[name];
			} else {
				return getComputedStyle(obj, false)[name];
			}
		}


function startMove(obj, attr, iTarget) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				var cur = 0;
				if (attr == 'opacity') {
					cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
				} else {
					cur = parseInt(getStyle(obj, attr));
				}

				var speed = (iTarget - cur) / 6;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

				if (cur == iTarget) {
					clearInterval(obj.timer);
				} else {
					if (attr == 'opacity') {
						obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
						obj.style.opacity = (cur + speed) / 100;
					} else {
						obj.style[attr] = cur+speed + 'px';
					}
				}
			}, 30);
		}

/*仿拉勾网的移入移出效果结束*/
