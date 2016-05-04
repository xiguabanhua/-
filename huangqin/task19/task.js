/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-25 00:11:24
 * @version $Id$

 快排的可视化是这样子实现的：先把数据charData付给副本tempCharData,然后tempCharData进行快排递归，每次值交换的时候把值的下标记录下来，顺便记录一个每一次的基准，然后用动画，把每一次的交换的下标延迟出来就是可视化了，
 */
window.onload=function(){

	var oInput=document.getElementById("number");
	var oContent=document.getElementById("content");
	// var aButtonOnclick=document.getElementById("button-onclick");
	var oleftIn=document.getElementById("left-in");
	var orightIn=document.getElementById("right-in");
	var oleftOut=document.getElementById("left-out");
	var orightOut=document.getElementById("right-out");
	var orandom=document.getElementById("random");
	var oquickSort=document.getElementById("quicksort");
	var otime=document.getElementById("time");

	//存放用户输入的数组
	var charData=[];
	var tempCharData=[];//在快速排序中的作为charData的副本
	var delayArr=[];
	//处理点击事件
	// aButtonOnclick.addEventListener('click',function(e){
	// 	console.log(e);
		// var target=e.target;
		// if (target.t) {}
	// 	if (e.target.) {}
	// },false);
	function render(list,standard){

		oContent.innerHTML='';
		for(var i=0;i<list.length;i++){
			//处理稀疏数组的情况
			if (list[i]==undefined) {continue;}//跳过undefined和不存在的元素

			var oSpan=document.createElement("span");
			oSpan.innerHTML=list[i];
			oSpan.style.width=20+'px';
			// console.log(oSpan.style.width);
			oSpan.style.height=(parseFloat(list[i])*5)+'px';
			oSpan.style.lineHeight=(parseFloat(list[i])*5)+'px';
			// console.log(oSpan.style.height);
			oSpan.style.backgroundColor="green";
			// oSpan.backgroundColor="green";
			if (standard!==undefined) {
				if (i==standard) {
					oSpan.style.backgroundColor="yellow";
				}
				if(list[i]<list[standard]){
					oSpan.style.backgroundColor="gray";
				}
				if (list[i]>list[standard]) {
					oSpan.style.backgroundColor="red";
				}

			}
			oContent.appendChild(oSpan);
		}
	}
	function leftChange(){
		oleftIn.onclick=function(){
			leftIn();
			console.log(charData);
			render(charData);
		}
		oleftOut.onclick=function(){
			leftOut();
			render(charData);
		}
	}
	function rightChange(){
		orightIn.onclick=function(){
			rightIn();
			render(charData);
		}
		orightOut.onclick=function(){
			rightOut();
			render(charData);
		}
	}
	function randomChange(){
		orandom.onclick=function(){
			// alert("哈哈哈");
			randomValue();
			render(charData);
			// deleteElement();
		}
	}
	function sortChange(){
		oquickSort.onclick=function(){
			delayArr=[];//每次点击排序，就把记录下标进行动画的数组清空
			tempCharData=charData.slice(0);//slice只有一个参数时返回数组将包含从开始位置到数组结尾的所有元素
			// charData=quickSort(charData,0,charData.length-1);
			// console.log(charData);
			console.log(tempCharData);
			console.log(quickSort(tempCharData,0,charData.length-1));
			// render();
			myAnimation(charData,delayArr);
		}
	}
	function deleteElement(){
		oContent.addEventListener('click',function(e){

			if (e.target.nodeName==='SPAN') {
				console.log(e.target);
				var deleteNode=e.target.innerText;
				console.log(deleteNode);
				console.log(charData);
				for(var j=0;j<charData.length;j++){
					if (deleteNode==charData[j]) {//不要用衡等，因为这里面的类型不一样，数字跟字符串
						delete (charData[j]);
						console.log(charData.length);
						console.log(charData);
						render(charData);
						return;
					}

				}
			}
			// console.log(e);
		},false);
	}

	//快速排序需要借助缓存的思想
	// function quickSort(arr){
	// 	//检查数组的元素个数，如果小于等于1，就返回
	// 	var arrChar=[];
	// 	arrChar=arr;
	// 	if (arrChar.length<=1) {return arr;}
	// 	var pivoIndex=arrChar[Math.floor(arrChar.length/2)];
	// 	// var pivot=arrChar.splice(pivoIndex,1)[0];

	// 	var left=[];

	// 	var right=[];

	// 	var equal=[];

	// 	for(var i=0;i<arrChar.length;i++){
	// 		if (arrChar[i]<pivoIndex) {
	// 			left.push(arrChar[i]);
	// 		}
	// 		else if(arrChar[i]>pivoIndex){
	// 			right.push(arrChar[i]);
	// 		}
	// 		else{
	// 			equal.push(arrChar[i]);
	// 		}
	// 	}
	// 	arr=quickSort(left).concat(equal,quickSort(right));
	// 	console.log(arr);
	// 	return arr;

	// }
	//左侧进入时的函数
	function leftIn(){
		var leftInValue=oInput.value;
		console.log(leftInValue);
		if (adjLength()) {return;}//判断长度是否超过60
		if (adj(leftInValue)) {//判断值是否为10~100
			return;
		}
		console.log(leftInValue);
		charData.unshift(leftInValue);
	}
	//右侧进入时的函数
	function rightIn(){

		var rightInValue=oInput.value;
		if (adjLength()) {return;}
		if (adj(rightInValue)) {
			return;
		}
		console.log(rightInValue);
		charData.push(rightInValue);
		// console.log(charData);

	}
	//随机生成30个数
	function randomValue(){
		charData=[];
		tempCharData=[];
		delayArr=[];
		for(var i=0;i<30;i++){
			charData.push(parseInt(10+Math.random()*90));//Math.random()随机数是0到1;
			console.log(charData);
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
	//判断限制输入的数字在10-100
	function adj(str){
		var number=parseFloat(str);
		console.log(number);
		if ((number<10||number>100)||(isNaN(number))) {//
			alert("您输入的值越界了或者输入值为空");
			return true;
		}
		
	}
	//判断队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
	function adjLength(){
		var i=1;
		console.log(charData.length);
		for(var index in charData){
			if (charData[index]==undefined) {
				continue;
			}
			i++;
			if (i>30) {
				alert("您输入显示的数值已经超过60个了，请删掉一些再输入");
				return true;
			}
		}
		console.log(i);
		return;
	}

	//快速排序不需要借助缓存的思想
	function quickSort(list,start,end){
		if (list.length<=1) {
			return ;
		}

		var base=partition(list,start,end);
		if (base>start) {
			quickSort(list,start,base-1);
		}
		if(base<end){
			quickSort(list,base+1,end);

		}
		return list;
	}
	//返回记录小于基准的最后一个数
	function partition(list,start,end){
		var index=start;//第一次递归基准
		var small=start;
		for(var j=start+1;j<=end;j++){

			if(list[j]>list[index]){
				continue;
			}
			small++;
			if(small!=j){

				swap(list,small,j);
				delayArrFun(index,small,j);
				console.log(delayArr);
				console.log(tempCharData);
			}
		}
	
		swap(list,small,index);
		delayArrFun(index,small,index);
		console.log(tempCharData);
		return small;		

	}
	//交换函数
	function swap(list,index1,index2){
		var temp=list[index1];
		list[index1]=list[index2];
		list[index2]=temp;
	}
	//延迟函数数组
	function delayArrFun(standard,changeIndex1,changeIndex2){
		delayArr.push(standard);
		delayArr.push(changeIndex1);
		delayArr.push(changeIndex2);
		console.log(delayArr);

	}
	//序列动画
	function myAnimation(list,delayList){
		var speed=otime.value;
		var timer=null;
		console.log(speed);
		for(var i=0;i<delayList.length;i+=3){
			(function(a){
				timer=setTimeout(function(){
					swap(list,delayList[a+1],delayList[a+2]);
					console.log(list);
					render(list,delayList[a]);
				},speed*a);
			})(i);
		}
		clearTimeout(timer);
	}

	//最终渲染的函数，初始化函数
	function init(){
		leftChange();
		rightChange();
		randomChange();
		sortChange();
		deleteElement();
	}
	init();
}


