

var cal_div=document.getElementById('cal_div');
var tbody=document.getElementById('tbody');
var input=document.getElementById('new_footer_calendar');
var nowdate=document.getElementById('nowdate');
var preyear=document.getElementsByClassName('preyear')[0];
var premonth=document.getElementsByClassName('premonth')[0];
var nextyear=document.getElementsByClassName('nextyear')[0];
var nextmonth=document.getElementsByClassName('nextmonth')[0];
var year,month,day;

//事件绑定兼容函数
function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent(type,handler);
	}else{
		element['on'+type]=handler;
	}
}
//初始化事件时间显示


//建立一个日历函数
function drawDate(obj){
	//获取当前时间
	var nDate=new Date();
	var nYear=nDate.getFullYear();
	var nMonth=nDate.getMonth();
	var ndate=nDate.getDate();
	year=obj.getFullYear();
	month=obj.getMonth();
	day=obj.getDate();
	//设置标题显示时间
	nowdate.innerHTML=year+'年'+(month+1)+'月';
	//根据当前月的值来画table，显示出日历
	var weekStart=new Date(year,month,1).getDay();
	//获取当月天数，以当前月份的下一个月的第0天做为参数，使用getDate()获取的是本月的天数
	var days=new Date(year,month+1,0).getDate();
	var str="";
	var count=1;
	str=str+'<tr>';
	/*for(var i=0;i<weekStart;i++){
		str=str+'<td>&nbsp;</td>';
	}
	for(var i=weekStart;i<7;i++){
		str=str+'<td>'+count+'</td>';
		count=count+1;
	}
	str=str+'</tr>';*/
	for(var i=1;i<6;i++){
		str=str+'<tr>';
		for(j=0;j<7;j++){
			//判断选择的月份和时间是否小于当前时间，以此来对其设置不同的样式
			if((count-weekStart)>days || count-1<weekStart){
				str=str+'<td>&nbsp;</td>';
			}else{
				if(year<nYear){
					str=str+'<td class="notLive">'+(count-weekStart)+'</td>';
				}else if(year==nYear){
					if(month<nMonth){
						str=str+'<td class="notLive">'+(count-weekStart)+'</td>';
					}else if(month==nMonth){
						if((count-weekStart)<ndate){
							str=str+'<td class="notLive">'+(count-weekStart)+'</td>';	
						}else if((count-weekStart)==ndate){
							str=str+'<td class="nowday">'+(count-weekStart)+'</td>';
						}else{
							str=str+'<td class="Live">'+(count-weekStart)+'</td>';
						}
					}else{
						str=str+'<td class="Live">'+(count-weekStart)+'</td>';
					}
				}else{
					str=str+'<td class="Live">'+(count-weekStart)+'</td>';
				}
				
			}
			count=count+1;
			
		}
		str=str+'</tr>';
	}
	tbody.innerHTML=str;

	//为日期表格中的日期添加监听事件
	var tds=tbody.getElementsByTagName('td');
	for(var i=0;i<tds.length;i++){
		/*
		addHandler(tds[i], "mouseover", function(e){
			var s=this.className;
			this.className=s+' disabled';
		});
		addHandler(tds[i],'mouseout',function(e){
			this.className=this.className.replace('disabled','');
		});*/
		addHandler(tds[i], 'click', function(e){
			input.value=year+'-'+(month+1)+'-'+this.innerHTML;
			cal_div.style.display="none";
		})

	}

}

//对按键绑定点击事件，点击可改变
addHandler(preyear, "click", function(e){
		year = year - 1;
		drawDate(new Date(year,month,1));
		e.stopPropagation();
});
addHandler(premonth, "click", function(e){
		month = month - 1;
		drawDate(new Date(year,month,1));
		e.stopPropagation();
});
addHandler(nextyear, "click", function(e){
		year = year + 1;
		drawDate(new Date(year,month,1));
		e.stopPropagation();
});
addHandler(nextmonth, "click", function(e){
		month = month + 1;
		drawDate(new Date(year,month,1));
		e.stopPropagation();
});


function init(){
	//对输入input绑定focus事件
	addHandler(input, "focus", function(){
		cal_div.style.display="block";
		drawDate(new Date());
		
		
	});	

/*
	//鼠标若在对象区域外点击，则移除日期层
addHandler(document, 'click', function(e){
	var e=e || event;
	//获取鼠标的位置
	var x=e.clientX+document.body.scrollLeft;
	var y=e.clientY+document.body.scrollTop;
	//获取input的位置
	var inputx1=input.offsetLeft;
	var inputy1=input.offsetTop;
	var inputx2=inputx1+input.offsetWidth;
	var inputy2=inputy1+input.offsetHeight;
	//获取div的位置
	var divx1=cal_div.offsetLeft;
	var divy1=cal_div.offsetTop;
	var divx2=divx1+cal_div.offsetWidth;
	var divy2=divy1+cal_div.offsetHeight;
	if((x>inputx1 && x<inputx2 && y>inputy1 && y<inputy2) || (x>divx1 && x<divx2 && y>divy1 && y<divy2)){
		return;
	}
	cal_div.style.display="none";
	
});
*/		

}



init();