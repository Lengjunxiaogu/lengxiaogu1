//定义calendar函数


$.calendar=function(selector){
	//首先在html文件中建立两个选择框，放入的是年和月
	$(".monthYearSelect,.daysSelect").remove();
	$(selector).append( 
			'<div class="monthYearSelect">'+ 
 				'<select id="year"></select>'+ 
 				'<select id="month"></select>'+ 
			'</div>'+ 
 			'<div class="daysSelect">'+ 
				'<table>'+ 
					'<thead></thead>'+ 
					'<tbody></tbody>'+ 
				'</table>'+ 
			'</div>' 
 		); 

	var nowDate=new Date();
	var nYear=nowDate.getFullYear();
	var nMonth=nowDate.getMonth();
	var nday=nowDate.getDate();
	for(var i=-10;i<=10;i++){
		var yearElem=document.createElement('option');
		yearElem.value=(nYear+i)+'年';
		yearElem.innerHTML=(nYear+i)+'年';
		if((nYear+i) == nYear){
			$(yearElem).attr('selected','selected');
		}
		$("#year").append(yearElem);
	}

		//为月添加选择框选项
	for(var i=0;i<12;i++){
		var monthElem=document.createElement('option');
		monthElem.value=(i+1)+'月';
		monthElem.innerHTML=(i+1)+'月';
		if(i==nMonth){
			$(monthElem).attr('selected','selected');
		}
		$('#month').append(monthElem);
	}

		//显示日期标题
	var weekdays=['日','一','二','三','四','五','六'];
	for(var i=0;i<7;i++){
		$('thead').append('<th>'+weekdays[i]+'</th>');
	}

	addDateInfo(nYear,nMonth);

	$("#month").on('change',function(e){
		var month=parseInt(this.selectedOptions[0].value.split("月")[0]);
		var year=parseInt(document.getElementById('year').selectedOptions[0].value.split("年")[0]);
		addDateInfo(year,month-1);
	})
	$("#year").on('change',function(e){
		var month=parseInt(this.selectedOptions[0].value.split("年")[0]);
		var year=parseInt(document.getElementById('month').selectedOptions[0].value.split("月")[0]);
		addDateInfo(year,month-1);
	})


	function addDateInfo(year,month){
		//显示当前年月的日期
		//获取当前月的天数
		//读取当前日期,当前年月日
		$(".daysSelect table tbody tr").remove();
		var daysAll_cur=new Date(year,month+1,0).getDate();
		var starDay_cur=new Date(year,month,1).getDay();
		//获取上月的总天数
		var daysAll_pre=new Date(year,month,0).getDate();

		//为年选择框添加选项		
		//显示日期
		$('tbody').append('<tr></tr>');
		for(var i=(daysAll_pre-starDay_cur+1);i<=daysAll_pre;i++){
			$('tbody tr').append('<td class="premonth">'+i+'</td>');
		}
		
		for(var i=1;i<=daysAll_cur;i++){
			if(i==nday){
				$('tbody tr').append('<td class="curmonth nowday">'+i+'</td>');
			}else{
				$('tbody tr').append('<td class="curmonth">'+i+'</td>');
			}
		}
		for(var i=1;i<=(42-starDay_cur-daysAll_cur);i++){
			$('tbody tr').append('<td class="premonth">'+i+'</td>');
		}

		$(".curmonth").bind("click",function(e){
			var currYear = document.getElementById("year").selectedOptions[0].value; 
			var currMonth = document.getElementById("month").selectedOptions[0].value; 
			var currDate = e.target.innerHTML + '日'; 
			document.getElementById('input').value = currYear +""+currMonth+""+currDate; 
			$(".monthYearSelect,.daysSelect").remove(); 
			$('#cal_div').css("display","none");

		})

	}



}


//对input标签绑定监听事件
$("#input").bind("focus",function(){
	$("#cal_div").css("display","block");
	$.calendar("#cal_div");
})