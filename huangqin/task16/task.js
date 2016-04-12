/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-08 12:50:31
 * @version $Id$
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 window.onload=function(){
	var aqiData = {};
	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		var aqiCityInput=document.querySelector("#aqi-city-input").value.trim();
		var aqiValueInput=document.querySelector("#aqi-value-input").value.trim();
		if(!(aqiCityInput.match(/^[A-Za-z\u4e00-\u9fa5]+$/))){//这里的+$是什么意思？
			alert("城市名必须为中英文字符");
		}
		if(!(aqiValueInput.match(/^[\d]+$/))){
			alert("空气质量指数必须为整数");
			return;
		}
		aqiData[aqiCityInput]=parseInt(aqiValueInput);
		console.log(aqiData);

	}

	/**
	 * 渲染aqi-table表格
	 */
	var aqiTable=document.getElementById("aqi-table");
	function renderAqiList() {

		aqiTable.innerHTML="";
		console.log(aqiTable);
		var oTr=document.createElement("tr");
			var oTd_1=document.createElement("td");
			var oTd_2=document.createElement("td");
			var oTd_3=document.createElement("td");
			console.log(aqiTable.children.length);
			if (aqiTable.children.length===0) {
				oTd_1.innerHTML="城市";
				oTd_2.innerText="空气质量";
				oTd_3.innerText="操作";
				oTr.appendChild(oTd_1);
				oTr.appendChild(oTd_2);
				oTr.appendChild(oTd_3);
				aqiTable.appendChild(oTr);
			}
			console.log(oTr);
			console.log(aqiTable);
		for(var x in aqiData){
			var oTr=document.createElement("tr");
			var oTd_1=document.createElement("td");
			var oTd_2=document.createElement("td");
			var oTd_3=document.createElement("td");
			oTd_1.innerText=x;
			oTd_2.innerText=aqiData[x];
			oTd_3.innerHTML="<a href='javascript:;'>删除</a>";
			oTr.appendChild(oTd_1);
			oTr.appendChild(oTd_2);
			oTr.appendChild(oTd_3);
			aqiTable.appendChild(oTr);
			console.log(aqiTable);

		}


	}

	/**？》《
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
	  addAqiData();
	  renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(target) {
	  // do sth.
		// var aLink=document.querySelectorAll("#aqi-table tr td a");
		// console.log(aLink);
		alert("111");
		var tr=target.parentElement.parentElement;
		console.log(tr);
		var strCity=tr.children[0].innerHTML;
		delete aqiData[strCity];
	  	renderAqiList();
	}

	function init() {

	  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	  var addBtn=document.getElementById("add-btn");
	  // addBtn.addEventListener("click",function(e){
	  // 			addAqiData();
	  // 	},false)
	  addBtn.onclick=addBtnHandle;
	  aqiTable.addEventListener('click',function(e){
	  	console.log(e);
	  	if(e.target.nodeName='A'){
	  		delBtnHandle(e.target);
	  		console.log(e);
	  	}

	  })
	  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

	 
	 }
	init();
}