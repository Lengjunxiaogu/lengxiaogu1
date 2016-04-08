/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 //使用trim()函数删除字符转左右两侧的空格
function trim(str){
 	return str.replace(/(^\s*)|(\s*$)/g,"");
 }

function addAqiData() {
	/*var city1=city.value.trim();
	var aqi_value1=aqi_value.value.trim();
	*/
	var city = document.getElementById("aqi-city-input").value;
	var aqi_value = document.getElementById("aqi-value-input").value;
	city=trim(city);
	aqi_value=trim(aqi_value);
	//添加正则表达式来判断输入城市是否满足条件
	var reg1=/^[a-zA-Z\u4e00-\u9fa5]{1,20}$/;
	var reg2=/[0-9]$/;
	var isRight1=reg1.test(city);
	var isRight2=reg2.test(aqi_value);
	if (city.length==0 || aqi_value.length==0){
		alert("输入不能为空！");
	}else if(!isRight1 || !isRight2){
		alert("城市名必须为中英文字符，空气质量指数必须为整数！")
	}else{
		aqiData[city]=aqi_value;
	}

}

/**
 * 渲染aqi-table表格
 */


function renderAqiList() {
	if (aqiData.length==0){
		return;
	}

	var temp= "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var x in aqiData){
		temp += "<tr><td>"+x+"</td>"+"<td>"+aqiData[x]+"</td>"+"<td>"+"<button data-city='"+x+"' >"+"删除"+"</button>"+"</td></tr>"
		//temp += "<tr><td>"+x+"</td>"+"<td>"+aqiData[x]+"</td>"+"<td>"+"<button onclick='"function(){delBtnHandle(this);}"' >"+"删除"+"</button>"+"</td></tr>"
	}
	//防止重复添加
	document.getElementById("aqi-table").innerHTML= x ? temp :"";
}

/**
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
function delBtnHandle(city) {
  // do sth.
 /*var trobj=obj.parentNode.parentNode.firstChild;
  var city=trobj.innerHTML;
  delete aqiData[city];
*/

 delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn_add=document.getElementById("add-btn");
  btn_add.onclick=addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
/* var aq_table=document.getElementById("aqi-table");
  var btn_del=aq_table.getElementsByTagName("button");
 	btn_del.onclick=function(){delBtnHandle(this);};
 	*/


	document.getElementById("aqi-table").addEventListener("click", function(event){ 
         if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city); 
     }) 



}

init();