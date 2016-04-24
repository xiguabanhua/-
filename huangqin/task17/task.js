window.onload=function(){
	// @charset "UTF-8";
	/**
	 * 
	 * @authors Your Name (you@example.org)
	 * @date    2016-04-12 21:07:24
	 * @version $Id$
	 */

	/* 数据格式演示
	var aqiSourceData = {
	  "北京": {
	    "2016-01-01": 10,
	    "2016-01-02": 10,
	    "2016-01-03": 10,
	    "2016-01-04": 10
	  }
	};
	*/
	var formGraTime=document.getElementById("form-gra-time");
	var input=formGraTime.querySelectorAll("label input");
	var citySelect=document.getElementById("city-select");
	var aqiChatWrap=document.querySelector(".aqi-chart-wrap");
	// // 以下两个函数用于随机模拟生成测试数据
	function getDateStr(dat) {
	  var y = dat.getFullYear();
	  var m = dat.getMonth() + 1;
	  m = m < 10 ? '0' + m : m;
	  var d = dat.getDate();
	  d = d < 10 ? '0' + d : d;
	  return y + '-' + m + '-' + d;
	}
	function randomBuildData(seed) {
	  var returnData = {};
	  var dat = new Date("2016-01-01");
	  var datStr = '';
	  for (var i = 1; i < 92; i++) {
	    datStr = getDateStr(dat);
	    returnData[datStr] = Math.ceil(Math.random() * seed);
	    dat.setDate(dat.getDate() + 1);
	  }
	  return returnData;
	}

	var aqiSourceData = {
	  "北京": randomBuildData(500),
	  "上海": randomBuildData(300),
	  "广州": randomBuildData(200),
	  "深圳": randomBuildData(100),
	  "成都": randomBuildData(300),
	  "西安": randomBuildData(500),
	  "福州": randomBuildData(100),
	  "厦门": randomBuildData(100),
	  "沈阳": randomBuildData(500)
	};

	// 用于渲染图表的数据
	var chartData = {};

	// 记录当前页面的表单选项
	var pageState = {
	  nowSelectCity: "北京",
	  nowGraTime: "day"
	}
	/**
	 * 渲染图表
	 */
	function renderChart() {

		aqiChatWrap.innerHTML='';

		// var H2=document.createElement("h2");
		// H2.innerHTML=pageState.nowSelectCity+"的"+pageState.nowGraTime+"空气质量图";
		// aqiChatWrap.appendChild(H2);
		var backgroundColorSelect=["#BCD0C5","#528870","#91BFBF","#FDECD0"];
		for(var i in chartData){
				
			var oSpan=document.createElement("span");
			oSpan.style.width=20+'px';
			console.log(oSpan.style.width);
			oSpan.style.height=chartData[i];
			oSpan.title=i.toString()+' : '+chartData[i];

			if (chartData[i]>=400) {
				oSpan.style.backgroundColor=backgroundColorSelect[3];
			}
			else if (chartData[i]>=300) {
				oSpan.style.backgroundColor=backgroundColorSelect[2];
			}
			else if (chartData[i]>=200) {
				oSpan.style.backgroundColor=backgroundColorSelect[1];
			}
			else{
				oSpan.style.backgroundColor=backgroundColorSelect[0];
			}
		
			aqiChatWrap.appendChild(oSpan);
		}
	}
	/**
	 * 日、周、月的radio事件点击时的处理函数
	 */
	function graTimeChange() {
	  // 确定是否选项发生了变化 
	  formGraTime.addEventListener('click',function(e){
	  	 // console.log(e);
	  	 if(e.target.nodeName==='INPUT'){

	  	 	pageState.nowGraTime=e.target.defaultValue;
	  	 }
	  	// console.log(pageState.nowGraTime);
	  	 // 设置对应数据
	  	initAqiChartData();
	  },false);

	  // 调用图表渲染函数
	  renderChart();
	}

	// graTimeChange();
	/**
	 * select发生变化时的处理函数
	 */
	function citySelectChange() {
	  // 确定是否选项发生了变化 
	  // 设置对应数据
	  initAqiChartData();
	  // 调用图表渲染函数
	  renderChart();
	}

	/**
	 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
	 */
	function initGraTimeForm() {

		graTimeChange();
	}

	/**
	 * 初始化城市Select下拉选择框中的选项
	 */
	function initCitySelector() {
	  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	  aOption=citySelect.querySelectorAll("option");
	  var cityList='';
	  console.log(aqiSourceData);
	  for(var i in aqiSourceData){
	  	cityList+='<option>'+ i +'</option>';
	  }
	  	// console.log(cityList);
	  citySelect.innerHTML=cityList;

	  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	  citySelect.onchange=function(e){
	  	console.log(e);
	  	pageState.nowSelectCity=e.srcElement.value;
	  	console.log(pageState.nowSelectCity);
	  	citySelectChange();
	  	// alert('hahaha');
	  }

	}
	// initCitySelector(); 
	/**
	 * 初始化图表需要的数据格式
	 */
	function initAqiChartData() {
	  // 将原始的源数据处理成图表需要的数据格式
	  chartData={};
	  var nowCityData={};
	  nowCityData=aqiSourceData[pageState.nowSelectCity];//此处处理得非常漂亮
	  var GraTime=pageState.nowGraTime;
	  switch(GraTime){
	  	case "day":
	  		chartData={};
	  		console.log("day1");
	  		chartData=nowCityData;
	  		renderChart();
	  		break;
	  	case "week":
	  		console.log("week1");
	  		 var count=0,i=1,j=0;
	  		for(var x in nowCityData){
	  			j++;//这里计算不是整数周的
	  			count+=nowCityData[x];
	  			chartData["第"+i+"周"]=Math.floor(count/j);
	  			// console.log(new Date(x).getDay());
	  			if(new Date(x).getDay()=='6'){
	  				console.log(j);
	  				i++;
	  				j=0;
	  				// console.log(count);
	  				count=0;
	  				// console.log(chartData);
	  			}
	  			
	  		}
	  		// console.log(count);
	  		renderChart();
	  		break;
	  	case "month":
	  		console.log("month");
	  		var count=0,i,j=0;	

	  		for(var x in nowCityData){
	  			i=new Date(x).getMonth()+1;
	  			if (new Date(x).getMonth()+1!==i) {
	  				i++;
	  				j=0;
	  				count=0;
	  			}

	  			count+=nowCityData[x];
	  			j++;	
	  			chartData["第"+i+"月"]=Math.floor(count/j);
	  			console.log(chartData);
	  		}
	  		renderChart();
	  		break;
	  	default:
	  		break;
	  }
	  // 处理好的数据存到 chartData 中
	  
	}
	// initAqiChartData();
	/**
	 * 初始化函数
	 */
	function init() {
	  initGraTimeForm()
	  initCitySelector();
	  initAqiChartData();
	}

	init();
}