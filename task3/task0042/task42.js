
//获取当前日期
var nowDate=new Date();
var nYear=nowDate.getFullYear();
var nMonth=nowDate.getMonth();
var nday=nowDate.getDate();
//设置存放日期段的数组
var chooseDays=[];

//定义calendar函数
$.calendar=function(selector,num){
	//首先在html文件中建立两个选择框，放入的是年和月
	var s1=selector+" .monthYearSelect";
	var s2=selector+" .daysSelect";
	$(s1).remove();
	$(s2).remove();
	//$(".monthYearSelect,.daysSelect").remove();
	$(selector).append( 
			'<div class="monthYearSelect">'+ 
 				'<select id="year'+num+'"></select>'+ 
 				'<select id="month'+num+'"></select>'+ 
			'</div>'+ 
 			'<div class="daysSelect">'+ 
				'<table>'+ 
					'<thead></thead>'+ 
					'<tbody></tbody>'+ 
				'</table>'+ 
			'</div>' 
 		); 

	for(var i=-10;i<=10;i++){
		var yearElem=document.createElement('option');
		yearElem.value=(nYear+i)+'年';
		yearElem.innerHTML=(nYear+i)+'年';
		if((nYear+i) == nYear){
			$(yearElem).attr('selected','selected');
		}
		var syear='#year'+num;
		$(syear).append(yearElem);
	}

		//为月添加选择框选项
	for(var i=0;i<12;i++){
		var monthElem=document.createElement('option');
		monthElem.value=(i+1)+'月';
		monthElem.innerHTML=(i+1)+'月';
		if(i==(nMonth+num-1)){
			$(monthElem).attr('selected','selected');
		}

		var smonth="#month"+num;
		$(smonth).append(monthElem);
	}

		//显示日期标题
	var weekdays=['日','一','二','三','四','五','六'];
	var sth=selector+" thead";
	for(var i=0;i<7;i++){
		$(sth).append('<th>'+weekdays[i]+'</th>');
	}

	addDateInfo(selector,nYear,nMonth+num-1,num);

	$(smonth).on('change',function(e){
		var month=parseInt(this.selectedOptions[0].value.split("月")[0]);
		var yearid_cur='year'+num;
		var year=parseInt(document.getElementById(yearid_cur).selectedOptions[0].value.split("年")[0]);
		addDateInfo(selector,year,month-1,num);
	})
	$(syear).on('change',function(e){
		var year=parseInt(this.selectedOptions[0].value.split("年")[0]);
		var monthid_cur='month'+num;
		var month=parseInt(document.getElementById(monthid_cur).selectedOptions[0].value.split("月")[0]);
		addDateInfo(selector,year,month-1,num);
	})

}



function addDateInfo(selector,year,month,syear,smonth){
	//显示当前年月的日期
	//获取当前月的天数
	//读取当前日期,当前年月日
	var str=selector+" .daysSelect table tbody tr";
	$(str).remove();
	var daysAll_cur=new Date(year,month+1,0).getDate();
	var starDay_cur=new Date(year,month,1).getDay();
	//获取上月的总天数
	var daysAll_pre=new Date(year,month,0).getDate();

	//为年选择框添加选项		
	//显示日期
	var stbody=selector+" tbody";
	var str=stbody+ " tr";
	$(stbody).append('<tr></tr>');
	for(var i=(daysAll_pre-starDay_cur+1);i<=daysAll_pre;i++){
		$(str).append('<td class="premonth">'+i+'</td>');
	}
	
	for(var i=1;i<=daysAll_cur;i++){
		if(i==nday){
			$(str).append('<td class="curmonth nowday">'+i+'</td>');
		}else{
			$(str).append('<td class="curmonth">'+i+'</td>');
		}
	}
	for(var i=1;i<=(42-starDay_cur-daysAll_cur);i++){
		$(str).append('<td class="premonth">'+i+'</td>');
	}
	var scurmonth=selector+" .curmonth";
	$(scurmonth).bind("click",function(e){
		//var curcalElem=e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
		//var currYear=curcalElem.getElementsByTagName('select')[0].selectedOptions[0].value;
		//var currMonth=curcalElem.getElementsByTagName('select')[1].selectedOptions[0].value;
		//var currDate = e.target.innerHTML + '日'; 
		//e.target.style.background="#0966a8";
		//document.getElementById('input').value = currYear +""+currMonth+""+currDate; 
		//$(".monthYearSelect,.daysSelect").remove(); 
		//$('#cal_div').css("display","none");

		//进行时间段添加操作
		//若数组已满，则将最早添加的日期删除，然后加入新点击的日期
		if(chooseDays.length==2){
			chooseDays[0].style.background="";
			chooseDays[0]=chooseDays[1];			
			chooseDays[1]=e.target;
			chooseDays[0].style.background="#0966a8";
			chooseDays[1].style.background="#0966a8";
		}else{
			e.target.style.background="#0966a8";
			chooseDays.push(e.target);
		}

	})


	//为按钮btn1和btn2添加点击监听事件
$(".btn1").bind("click",function(){
	//若数组中的时间段是两个数，则比较当前日期的大小，显示在input中
	var input=document.getElementById('input');
	if(chooseDays.length==2){
		var date_1=chooseDays[0].parentNode.parentNode.parentNode.parentNode.parentNode;;
		var date_2=chooseDays[1].parentNode.parentNode.parentNode.parentNode.parentNode;;
		var curYear_1=parseInt(date_1.getElementsByTagName('select')[0].selectedOptions[0].value.split('年')[0]);
		var curYear_2=parseInt(date_2.getElementsByTagName('select')[0].selectedOptions[0].value.split('年')[0]);
		var curMonth_1=parseInt(date_1.getElementsByTagName('select')[1].selectedOptions[0].value.split('月')[0]);
		var curMonth_2=parseInt(date_2.getElementsByTagName('select')[1].selectedOptions[0].value.split('月')[0]);
		var curDate_1 = parseInt(chooseDays[0].innerHTML); 
		var curDate_2 = parseInt(chooseDays[1].innerHTML); 
		//比较两个数的大小
		if(curYear_1>curYear_2){
			input.value=curYear_2+'-'+curMonth_2+'-'+curDate_2+' to '+curYear_1+'-'+curMonth_1+'-'+curDate_1;
		}else if(curYear_1==curYear_2){
			if(curMonth_1>curMonth_2){
				input.value=curYear_2+'-'+curMonth_2+'-'+curDate_2+' to '+curYear_1+'-'+curMonth_1+'-'+curDate_1;
			}else if(curMonth_1==curMonth_2){
				 if(curDate_1>curDate_2){
				 	input.value=curYear_2+'-'+curMonth_2+'-'+curDate_2+' to '+curYear_1+'-'+curMonth_1+'-'+curDate_1;
				 }else{
				 	input.value=curYear_1+'-'+curMonth_1+'-'+curDate_1+' to '+curYear_2+'-'+curMonth_2+'-'+curDate_2;
				 }	
			}else{
				input.value=curYear_1+'-'+curMonth_1+'-'+curDate_1+' to '+curYear_2+'-'+curMonth_2+'-'+curDate_2;
			}
		}else{
			input.value=curYear_1+'-'+curMonth_1+'-'+curDate_1+' to '+curYear_2+'-'+curMonth_2+'-'+curDate_2;
		}
		$("#cal_div").css("display","none");
		chooseDays=[];
		return;
	}
	return;
})

$(".btn2").bind("click",function(){
	$("#cal_div").css("display","none");
	chooseDays=[];
})
}






//对input标签绑定监听事件,并且对
$("#input").bind("focus",function(){
	$('.calElem1,.calElem2,.btn1,.btn2').remove();
	$("#cal_div").css("display","block");
	var calElem1=document.createElement('div');
	calElem1.className="calElem1";
	var calElem2=document.createElement('div');
	calElem2.className="calElem2";
	$("#cal_div").append(calElem1);
	$("#cal_div").append(calElem2);
	//添加按钮
	var btn1=document.createElement('input');
	btn1.className="btn1";
	btn1.type="button";
	btn1.value="确认";
	$("#cal_div").append(btn1);
	var btn2=document.createElement('input');
	btn2.className="btn2";
	btn2.type="button";
	btn2.value="取消";
	$("#cal_div").append(btn2);

	$.calendar(".calElem1",1);
	$.calendar(".calElem2",2);
})