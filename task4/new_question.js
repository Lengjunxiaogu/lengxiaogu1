
//以下使用了jquery

//添加单选题
function addradio(selector){
	var $div=document.createElement("div");
	//获取当前content_question
	var len=$(selector).children().length+1;
	$div.className="ansers";
	$div.id=len;
	var str="";
	str+='<div class="ansers_header"><span>Q'+len+'</span><input type="text" value="这是一个问题" /></div>';
	str+='<div class="question_ansers"><ul><li><input class="radio" name="'+len+'" type="radio" /><input type="text" value="选项一" /></li>'
		+'<li><input class="radio" name="'+len+'" type="radio" /><input type="text" value="选项二" /></li>'
		+'<li><input class="radio" name="'+len+'" type="radio" /><input type="text" value="选项三" /></li>'
		+'<li><input class="radio" name="'+len+'" type="radio" /><input type="text" value="选项四" /></li>'+'</ul></div>';
	str+='<div class="ansers_actions right"><span class="move_up">上移</span><span class="move_down">下移</span><span class="clones">复制</span><span class="delete">删除</span></div>';
	$div.innerHTML=str;
	$(selector).append($div);
}

//添加多选题
function addcheckbox(selector){
	var $div=document.createElement("div");
	//获取当前content_question
	var len=$(selector).children().length+1;
	$div.className="ansers";
	$div.id=len;
	var str="";
	str+='<div class="ansers_header"><span>Q'+len+'</span><input type="text" value="这是一个问题" /></div>';
	str+='<div class="question_ansers"><ul><li><input class="radio" name="'+len+'" type="checkbox" /><input type="text" value="选项一" /></li>'
		+'<li><input class="radio" name="'+len+'" type="checkbox" /><input type="text" value="选项二" /></li>'
		+'<li><input class="radio" name="'+len+'" type="checkbox" /><input type="text" value="选项三" /></li>'
		+'<li><input class="radio" name="'+len+'" type="checkbox" /><input type="text" value="选项四" /></li>'+'</ul></div>';
	str+='<div class="ansers_actions right"><span class="move_up">上移</span><span class="move_down">下移</span><span class="clones">复制</span><span class="delete">删除</span></div>';
	$div.innerHTML=str;
	$(selector).append($div);
}

//添加文本题
function addTextarea(selector){
	var $div=document.createElement("div");
	//获取当前content_question
	var len=$(selector).children().length+1;
	$div.className="ansers";
	$div.id=len;
	var str="";
	str+='<div class="ansers_header"><span>Q'+len+'</span><input type="text" value="这是文本题题目" />'+
	'<div class="right"><input type="checkbox" />是否必答</div>'+
	'</div>';
	str+='<div class="question_ansers"><textarea rows="5" cols="60"></textarea></div>';
	str+='<div class="ansers_actions right"><span class="move_up">上移</span><span class="move_down">下移</span><span class="clones">复制</span><span class="delete">删除</span></div>';
	$div.innerHTML=str;
	$(selector).append($div);	
}



//点击添加新问题按钮进行添加事件

$("#btn_add_question").bind("click",function(){
	$(".choose_question").css("display","flex");

})

//对三个不同种类的添加问题按钮绑定点击事件
$("#btn_new_addradio").bind("click",function(){

	//调用添加单选按钮的函数
	addradio("#content_question");

})
$("#btn_new_addcheckbox").bind("click",function(){

	//调用添加复选框按钮的函数
	addcheckbox("#content_question");

})
$("#btn_new_addtextarea").bind("click",function(){

	//调用添加文本框的函数
	addTextarea("#content_question");

})

//接下来是对上移，下移，复制和删除这几个按钮添加事件
//注意：对于js动态生成的元素，注册(绑定)的事件失效的解决(on)
//上移
$(document).on("click",".move_up",function(){

	//若当前问题不是第一个问题则对其进行上移
	//使用了jQuery的detach()：移除被选函数，包括其所有的文本和子节点，但他与remove()不同：会保留其所有的绑定事件和附加的数据
	 //然后使用before()方法将其插放到其前一个div.ansers之前
	  if ($(this).closest("div.ansers").prev("div.ansers").length!=0){ 
	     $(this).closest("div.ansers").fadeOut(function () { 
	         $(this).prev().before($(this).detach()); 
	         $(this).fadeIn(); 
	         setid(); 

	     });           
	   } 
})

//下移
$(document).on("click",".move_down",function(){
	if($(this).closest("div.ansers").next("div.ansers").length!=0){
		$(this).closest("div.ansers").fadeOut(function(){
			$(this).next().after($(this).detach());
			$(this).fadeIn();
			setid();
		})
	}
})
//删除
$(document).on("click",".delete",function(){
	$(this).closest("div.ansers").remove();
	setid();
})
//复制
$(document).on("click",".clones",function(){
	$(this).closest("div.ansers").after($(this).closest("div.ansers").clone());
	$(this).next().fadeIn();
	setid();
})







//重新设置每个ansers的id值序列
function setid(){
	var $ansers=$("#content_question div.ansers");
	for(var i=0;i<$ansers.length;i++){
		var $num=i+1;
		$ansers[i].id=$num;
		$($ansers.eq(i)).find("div.ansers_header").children(":eq(0)").html("Q"+$num);
		if($($ansers.eq(i)).find("div.question_ansers>ul").length>0){
			var $li=$($ansers.eq(i)).find("div.question_ansers>ul>li");
			for(var j=0;j<$li.length;j++){
				$($li.eq(j)).children(":eq(0)").attr("name",$num);
			}
		}

	}
}



//以下代码是存储当前网页的内容到localStorage中
$(window).ready(function(){
	if(storage.new=="edit"){
		//通过当前访问的放入缓存的问卷表对应的index，来找到其在data中的位置
		$("#title").val(data[storage.index].title);
		for(var i=0;i<data[storage.index].questions.length;i++){
			//判断当前question是属于哪一项，为单选框，多选框，文本框，对应不同的框
			//写不同的html样式
			if(data[storage.index].questions[i].mytype=="radios"){
				//添加单选框的内容
				addradio("#content_question");
				$(".ansers").eq(i).find(".ansers_header input").val(data[storage.index].questions[i].text);
				for(var j=0;j<data[storage.index].questions[i].option.length;j++){
					$(".ansers").eq(i).find("input[type=text]").eq(j).val(data[storage.index].questions[i].option[j]);
				}
			}else if(data[storage.index].questions[i].mytype=="checkbox"){
				//添加复选框的内容
				addcheckbox("#content_question");
				$(".ansers").eq(i).find(".ansers_header input").val(data[storage.index].questions[i].text);
				for(var j=0;j<data[storage.index].questions[i].option.length;j++){
					$(".ansers").eq(i).find("input[type=text]").eq(j).val(data[storage.index].questions[i].option[j]);
				}
			}else{
				//添加文本框的内容
				addTextarea("#content_question");
				$(".ansers").eq(i).find(".ansers_header input").eq(0).val(data[storage.index].questions[i].text);
				//设置复选框（是否必答）为选中
				if(data[storage.index].questions[i].checkbox == "true"){
					$(".ansers").eq(i).find("input[type=checkbox]").eq(0).attr("checked",true);
				}

			}
		}
		//设置当前的时间
		$("#new_footer_calendar").val(data[storage.index].times);
		//存储修改后的数据
		var newdata={};
		$("#save_new_question").click(function(){
			if(confirm("是否保存？")){
				if($(".ansers").length<=0){
					alert("请至少添加一个问题！");
					return false;
				}else if($("#new_footer_calendar").val()==""){
					alert("请填写合适的日期！");
					return false;
				}else{
					var nowdate=new Date();
					//比较当前时间与设定时间之间的大小
					var dn=new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate());
					var dt=new Date($("new_footer_calendar").val());
					if(dt.getTime()<dn.getTime()){
						alert("请修改合理的截止时间");
						return false;
					}

				}
				//将该网页内容html,存储为对象的形式，然后放入缓存localStorage中，并放入data
				//存储玩完数据后跳转到主页面
				do_data();
				newdata.state="1";
				data[storage.index]=newdata;
				changedata(1);
				location.href="index_1.html";

			}
		})
		$("#publish_new_question").click(function(){
			if(confirm("是否发表？")){
				if($(".ansers").length<=0){
					alert("请至少添加一个问题！");
					return false;
				}else if($("#new_footer_calendar").val()==""){
					alert("请填写合理的日期！");
					return false;
				}else{
					var nowdate=new Date();
					//比较当前时间与设定时间之间的大小
					var dn=new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate());
					var dt=new Date($("new_footer_calendar").val());
					if(dt.getTime()<dn.getTime()){
						alert("请修改合理的截止时间");
						return false;
					}
				}

				do_data();
				newdata.state="0";				
				data[storage.index]=newdata;
				changedata(1);
				location.href="index_1.html";
			}
		})
	}else if(storage.new=="new"){
		var newdata={};
		//data是一个全局变量
		var length=data.length;
		$("#save_new_question").click(function(){
			if(confirm("是否保存？")){
				if($(".ansers").length<=0){
					alert("请至少添加一个问题！");
					return false;
				}else if($("#new_footer_calendar").val()==""){
					alert("请填写合适的日期！");
					return false;
				}else{
					var nowdate=new Date();
					//比较当前时间与设定时间之间的大小
					var dn=new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate());
					var dt=new Date($("new_footer_calendar").val());
					if(dt.getTime()<dn.getTime()){
						alert("请修改合理的截止时间");
						return false;
					}

				}
				//将该网页内容html,存储为对象的形式，然后放入缓存localStorage中，并放入data
				//存储玩完数据后跳转到主页面
				do_data();
				newdata.state="1";
				data[length]=newdata;
				changedata(1);
				location.href="index_1.html";

			}
		})
		$("#publish_new_question").click(function(){
			if(confirm("是否发表？")){
				if($(".ansers").length<=0){
					alert("请至少添加一个问题！");
					return false;
				}else if($("#new_footer_calendar").val()==""){
					alert("请填写合理的日期！");
					return false;
				}else{
					var nowdate=new Date();
					//比较当前时间与设定时间之间的大小
					var dn=new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate());
					var dt=new Date($("new_footer_calendar").val());
					if(dt.getTime()<dn.getTime()){
						alert("请修改合理的截止时间");
						return false;
					}
				}

				do_data();
				newdata.state="0";				
				data[length]=newdata;
				changedata(1);
				location.href="index_1.html";
			}
		})
	}

			//将网页内容转换为对象，放入newdata中
		function do_data(){
			newdata={};
			newdata.questions=[];
			newdata.title=$("#title").val();
			newdata.times=$("#new_footer_calendar").val();
			for(var i=0;i<$(".ansers").length;i++){
				if($(".ansers").eq(i).find("input[type=radio]").length>1){
					if(!newdata.questions[i]){
						newdata.questions[i]={};
					}
					newdata.questions[i].text=$(".ansers_header").eq(i).find("input[type=text]").eq(0).val();
					newdata.questions[i].mytype="radios";
					newdata.questions[i].option=[];
					for(var j=0;j<$(".ansers").eq(i).find("input[type=radio]").length;j++){
						newdata.questions[i].option[j]=$(".question_ansers").eq(i).find("input[type=text]").eq(j).val();
					}
				}else if($(".ansers").eq(i).find("input[type=checkbox]").length>1){
					if(!newdata.questions[i]){
						newdata.questions[i]={};
					}
					newdata.questions[i].text=$(".ansers_header").eq(i).find("input[type=text]").eq(0).val();
					newdata.questions[i].mytype="checkbox";
					newdata.questions[i].option=[];
					for(var j=0;j<$(".ansers").eq(i).find("input[type=checkbox]").length;j++){
						newdata.questions[i].option[j]=$(".question_ansers").eq(i).find("input[type=text]").eq(j).val();
					}
				}else if($(".ansers").eq(i).find("textarea").length>0){
					if(!newdata.questions[i]){
						newdata.questions[i]={};
					}
					newdata.questions[i].text=$(".ansers_header").eq(i).find("input[type=text]").eq(0).val();
					newdata.questions[i].mytype="text";
					if($(".ansers").eq(i).find("input[type=checkbox]").eq(0).checked){
						newdata.questions[i].checkbox="true";
					}else{
						newdata.questions[i].checkbox="false";
					}
				}
			}

		}

});




