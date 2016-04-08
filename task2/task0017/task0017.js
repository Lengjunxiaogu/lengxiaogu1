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

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  //月的默认值为0-11（一-十二月）
  var m = dat.getMonth() + 1;
  //调整月/日的显示为两位，若小于10则前面补0
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  //随机产生三个月的测试数据
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
 var color_set=["#C66","#9F0","#CCC","#F6C","#CF3",
 "#39C","#396","#9C9",'#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

function renderChart(Data,n) {
  var chart_wrap=document.getElementById('chart-wrap');
  chart_wrap.innerHTML="";
  var len=Data.length;
  var count=0;
  for(var i in Data){
    var div=document.createElement("div");
    div.style.height=Data[i] + "px";
    div.style.width=n + "px";
    //为div添加title属性，显示每个div的title值
    div.setAttribute("title",i+" "+Data[i]);
    div.style.background=color_set[count];
    count++;
    if(count>=12){count=0;}
    chart_wrap.appendChild(div);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(obj) {
  // 确定是否选项发生了变化 
  if(obj.value != pageState.nowGraTime){
    pageState.nowGraTime=obj.value;
    initAqiChartData();
  }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(x) {
  // 确定是否选项发生了变化 
    if(x.value!=pageState.nowSelectCity){
      pageState.nowSelectCity=x.value;
      initAqiChartData();
    }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
var form_time=document.getElementById("form-gra-time");
//记录当前被按下的radio键
function initGraTimeForm() {
  //为每个按钮绑定点击事件
  var form_input=form_time.getElementsByTagName("input");
  for(var i=0;i<form_input.length;i++){
    form_input[i].addEventListener("click",function(){
      graTimeChange(this);
    },false);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city_select=document.getElementById('city-select');
  var citys_option=city_select.getElementsByTagName('option');
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  for(var i=0;i<citys_option.length;i++){
    citys_option[i].addEventListener("click",function(){
      citySelectChange(this);
    },false);
  }

}

/*处理周的函数*/
function weekCal(Data){
  var weekdata={};
  var count=0;
  var weekcount=1;
  var sum=0;
  for(var x in Data){
    sum=sum+Data[x];
    count++;
    if(count>=7){
      count=0;
      sum=Math.floor(sum/7);
      var str="第"+weekcount+"周";
      weekcount++;
      weekdata[str]=sum;
    }
    var str="第"+weekcount+"周";
    weekdata[str]=Math.floor(sum/count);
  }
  return weekdata;

}

function yearCal(Data){
  var yeardata={};
  var count=0;
  var weekcount=1;
  var sum=0;
  for(var x in Data){
    sum=sum+Data[x];
    count++;
    if(count>=31){
      count=0;
      sum=Math.floor(sum/31);
      var str="第"+weekcount+"月";
      weekcount++;
      yeardata[str]=sum;
    }
    var str="第"+weekcount+"月";
    yeardata[str]=Math.floor(sum/count);
  }
  return yeardata;
}


/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData={};

  switch(pageState.nowGraTime){
    case "day":
      chartData=aqiSourceData[pageState.nowSelectCity];
      renderChart(chartData,10);
      break;
    case "week":
      chartData=weekCal(aqiSourceData[pageState.nowSelectCity]);
      renderChart(chartData,30);
      break;
    case "month":
      chartData=yearCal(aqiSourceData[pageState.nowSelectCity]);
      renderChart(chartData,50);
      break;

  }




}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
