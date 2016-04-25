/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-25 00:11:24
 * @version $Id$
 */
window.onload=function(){

	var oInput=document.getElementById("number");
	var oContent=document.getElementById("content");
	// var aButtonOnclick=document.getElementById("button-onclick");
	var oleftIn=document.getElementById("left-in");
	var orightIn=document.getElementById("right-in");
	var oleftOut=document.getElementById("left-out");
	var orightOut=document.getElementById("right-out");
	//存放用户输入的数组
	var charData=[];
	//处理点击事件
	// aButtonOnclick.addEventListener('click',function(e){
	// 	console.log(e);
		// var target=e.target;
		// if (target.t) {}
	// 	if (e.target.) {}
	// },false);
	function render(){
		oContent.innerHTML='';
		for(var i=0;i<charData.length;i++){
			//处理稀疏数组的情况
			if (charData[i]===undefined) {continue;}//跳过undefined和不存在的元素

			var oSpan=document.createElement("span");
			oSpan.innerHTML=charData[i];
			// oSpan.backgroundColor="green";
			oContent.appendChild(oSpan);
		}
	}
	function leftChange(){
		oleftIn.onclick=function(){
			leftIn();
			render();
		}
		oleftOut.onclick=function(){
			leftOut();
			render();
		}
	}
	function rightChange(){
		orightIn.onclick=function(){
			rightIn();
			render();
		}
		orightOut.onclick=function(){
			rightOut();
			render();
		}
	}
	function deleteElement(){
		oContent.addEventListener('click',function(e){

			if (e.target.nodeName==='SPAN') {
				console.log(e.target);
				var deleteNode=e.target.innerText;
				console.log(deleteNode);
				for(var i=0;i<charData.length;i++){
					if (deleteNode===charData[i]) {
						delete (charData[i]);
						console.log(charData.length);
						console.log(charData);
						render();
						return;
					}

				}
			}
			// console.log(e);
		},false);
	}
	//左侧进入时的函数
	function leftIn(){
		var rightInValue=oInput.value;
		console.log(rightInValue);
		charData.unshift(rightInValue);
	}
	//右侧进入时的函数
	function rightIn(){

		var leftInValue=oInput.value;
		console.log(leftInValue);
		charData.push(leftInValue);
		console.log(charData);

	}

	//左侧出的函数
	function leftOut(){
		if (charData[0]===undefined) {
			alert("已经没有值可以删了！,请再添加值再玩");
			return;
		}
		alert("您要删除的值是"+charData.shift());
		console.log(charData);

	}
	//右侧出的函数
	function rightOut(){
		if (charData[0]===undefined) {
			alert("已经没有值可以删了！,请再添加值再玩");
			return;
		}
		alert("您要删除的值是"+charData.pop());
		console.log(charData);
	}

	//最终渲染的函数，初始化函数
	function init(){
		leftChange();
		rightChange();
		deleteElement();
	}
	init();
}

