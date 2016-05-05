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
	var searchValue=document.getElementById("search-value");
	var onclickSearch=document.getElementById("onclick-search");
	//存放用户输入的数组
	var charData=[];
	//处理点击事件
	// aButtonOnclick.addEventListener('click',function(e){
	// 	console.log(e);
		// var target=e.target;
		// if (target.t) {}
	// 	if (e.target.) {}
	// },false);
	function render(str){
		// oContent.innerHTML='';
		// for(var i=0;i<charData.length;i++){
		// 	//处理稀疏数组的情况
		// 	if (charData[i]===undefined) {continue;}//跳过undefined和不存在的元素

		// 	var oDiv=document.createElement("div");
		// 	oDiv.innerHTML=charData[i];
		// 	// oSpan.backgroundColor="green";
		// 	oContent.appendChild(oDiv);
		// }
		oContent.innerHTML=charData.map(function(d){
			if (str!=null&&str.length>0) {
				d=d.replace(new RegExp(str,"g"),"<span class='select'>"+str+"</span>");//找出数组中的每个元素（字符串中）跟str匹配然后用字符串<span>来替代它;这里的想法很奇妙，找出数组里面的元素改变里面的数组，反正数组的元素也是字符串。
			}
			console.log(oContent.innerHTML);
			return '<div>'+d+'</div>';


		}).join('');//让每次数组里面的元素返回来的时候赋予oContent.innerHTML的时候将数组变成字符串连接；
		console.log(charData);

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
	function searchChange(){
		search();

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
		var leftInValue=oInput.value;
		var positonLeftIn='left';
		adj(leftInValue,'left');
		// console.log(returnArr);
		// console.log(leftInValue);
		// charData.unshift(returnArr);
		console.log(charData);
		console.log(charData.length);
	}
	//右侧进入时的函数
	function rightIn(){

		var rightInValue=oInput.value;
		var positonRightIn='right';
		var returnArr=adj(rightInValue,'right');
		// console.log(rightInValue);
		// charData.push(returnArr);
		console.log(charData);


	}
	function adj(value,positon){

		var str=oInput.value.trim();
		var arrWord=str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);//除去除了0-9a-zA-Z和中文的，其他的遇到就切成数组里面的一个元素;
		console.log(arrWord);
		console.log(arrWord.length);
		var afterArr=arrWord.filter(function(e){
			console.log(e);
			if (e!=null &&e.length>0) {
				if (positon=='left') {
					charData.unshift(e);
				}
				else if (positon=='right') {

					charData.push(e);
				}
				
				return true;
			}
			else{
				return false;
			}			
		})//split() 方法用于把一个字符串分割成字符串数组。除了0-90-9a-zA-Z和中文，其他的都切成数组。
		// console.log(afterArr);
		// return afterArr;
	}
	function search(){

		onclickSearch.onclick=function(){

			var str=searchValue.value.trim();
			render(str);
		}
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
		searchChange();
		deleteElement();
	}
	init();
}

