//定义对象，来存储table中每个问卷的信息
//使用构造函数来定义对象
function rl(data){
	this.data=data;
	this.choosenode=[];   //存放选中的tr节点
	this.choosedata=[];   //存放选中的tr节点对应的该问卷的内容
}

//定义rl的方法
rl.prototype={
	init: function(){
		for(var i=0;i<data.length;i++){
			var tr=document.createElement("tr");
			var state;
			var color;
			if(data[i].state=="0"){
				state="发表中";
				color="red";
			}else if(data[i].state=="1"){
				state="未发表";
				color="";

			}else{
				state="已过期"
				color="#ccc";
			}
		tr.innerHTML='<td><input class="radio" type="checkbox" name="questionnaire" /></td><td>'+data[i].title+'</td><td>'+data[i].times+'</td><td style="color:'+color+';">'+state+
		'</td><td><input class="btn_edit checked_before" type="button" value="编辑" /><input class="btn_delete checked_before" type="button" value="删除" /><input class="btn_checked checked_before" type="button" value="查看数据" /></td>'+
		'<td>&nbsp;</td>'
		$("tbody").append(tr);

		}

	},

	check_chose: function(){
		this.chosedata=[];
		this.chosenode=[];
		var tr=$("table tbody").find("tr");
		var step=0;
		for(var i=0;i<tr.length;i++){
			//判断该条问卷是否被选中,若被选中择需要改变相应的样式信息
			//alert(tr[i].children[0].children[0].checked);
			//在jQuery1.6的版本：checked属性在页面初始化的时候已经初始化好了，不会随着状态的变化而变化。
			//解决方法：使用prop
			//alert($(tr[i]).find("td input").eq(0).prop("checked"));
			if($(tr[i]).find("td input").eq(0).prop("checked")){
				//增加样式设置：根据当前问卷的状态设置按钮的颜色
				//发表中的状态：可查看数据和删除; 未发表：编辑和删除;结束状态：删除和查看数据
				if(data[i].state=="0"){
					$(".btn_edit").eq(i).attr("class","btn_edit checked_after");
					$(".btn_delete").eq(i).attr("class","btn_delete checked_after");
					$(".btn_checked").eq(i).attr("class","btn_checked checked_after");
				}else if(data[i].state=="1"){
					$(".btn_edit").eq(i).attr("class","btn_edit checked_after");
					$(".btn_delete").eq(i).attr("class","btn_delete checked_after");
				}else{
					$(".btn_delete").eq(i).attr("class","btn_delete checked_after");
					$(".btn_checked").eq(i).attr("class","btn_checked checked_after");
				}				
				
				this.chosedata[step]=data[i];
				this.chosenode[step]=tr[i];
                step++;
			}else{
				$(".btn_edit").eq(i).attr("class","btn_edit checked_before");
				$(".btn_delete").eq(i).attr("class","btn_delete checked_before");
				$(".btn_checked").eq(i).attr("class","btn_checked checked_before");

			}
		}
		//若没有问卷被选中，则调整复选框chose_All的状态
		if(step==0){
			$(".select_All").find("input[type=checkbox]").eq(0).prop("checked",false);
			$(".select_All").find("input[type=button]").eq(0).attr("class","checked_before");
		}else if(step==tr.length){
			$(".select_All").find("input[type=checkbox]").eq(0).prop("checked",true);
			$(".select_All").find("input[type=button]").eq(0).attr("class","checked_after");
		}
		console.log(this.chosedata);
		console.log(this.chosedata.length);
		console.log(this.chosenode);
	},

	choseall: function(){
		this.chosenode=[];
		this.chosedata=[];
		var tr=$("table tbody").find("tr");
		//当全选按钮选中状态为false时，让数据存储器清零
		if($(".select_All").find("input[type=checkbox]").eq(0).prop("checked")==false){
			this.chosenode=[];
			this.chosedata=[];
			for(var i=0;i<tr.length;i++){
				$(tr[i]).find("input[type=checkbox]").eq(0).prop("checked",false);
				$(".btn_edit").eq(i).attr("class","btn_edit checked_before");
				$(".btn_delete").eq(i).attr("class","btn_delete checked_before");
				$(".btn_checked").eq(i).attr("class","btn_checked checked_before");
			}
			console.log(this.chosedata);
		}else{
			for(var i=0;i<tr.length;i++){
				this.chosedata[i]=data[i];
				this.chosenode[i]=tr[i];
				$(tr[i]).find("input[type=checkbox]").eq(0).prop("checked",true);
				if(data[i].state=="0"){
					$(".btn_edit").eq(i).attr("class","btn_edit checked_after");
					$(".btn_delete").eq(i).attr("class","btn_delete checked_after");
					$(".btn_checked").eq(i).attr("class","btn_checked checked_after");
				}else if(data[i].state=="1"){
					$(".btn_edit").eq(i).attr("class","btn_edit checked_after");
					$(".btn_delete").eq(i).attr("class","btn_delete checked_after");
				}else{
					$(".btn_delete").eq(i).attr("class","btn_delete checked_after");
					$(".btn_checked").eq(i).attr("class","btn_checked checked_after");
				}
			}
			console.log(this.chosedata);

		}
	},

	//删除按钮操作
	del: function(e){
		if(confirm("确定删除该项？")){
			var tr=$("table tbody").find("tr");
			//确定当前的事件源是哪个tr
			for(var i=0;i<tr.length;i++){
				if(e.target.parentNode.parentNode===tr[i]){
					tr[i].parentElement.removeChild(tr[i]);
					//同时删除该节点在data中的位置
					this.data.splice(i,1);
					//便于测试
					console.log(this.data);
					console.log(this.data.length);
				}
			}
		}
		changedata(1);
	},

	//删除全部的按钮操作
	del_all: function(){
		if(this.chosedata.length>0){
			for(var i=this.chosedata.length-1;i>=0;i--){
				for(var j=0;j<this.data.length;j++){
					//找到对应的内容，data中相应的数据
					if(this.chosedata[i] == this.data[j]){
						this.data.splice(j,1);
					}
				}
				this.chosedata.splice(i,1);
				//$(this.chosenode[i]).remove();
				var tbody=document.getElementsByTagName('tbody')[0];
				tbody.removeChild(this.chosenode[i]);
				this.chosenode.splice(i,1);
			}
		}
		changedata(1);
	}
};

var new_rl=new rl(data);
//调用初始化函数
new_rl.init();

//对选择所有事件的处理
$(".select_All").find("input[type=checkbox]").on("click",function(){
	new_rl.choseall();
	new_rl.check_chose();

});

//对删除所有事件的处理
$(".select_All").find("input[type=button]").on("click",function(){
	new_rl.del_all();
});

//对每个tr(问卷)的选择事件处理
/*$("tbody").find(".radio").on("click",function(){
	new_rl.check_chose();
});*/
$(document).on("click",".radio",function(){
	new_rl.check_chose();
})

//对删除事件的处理
$("tbody").find(".btn_delete").on("click",function(e){
	//获取其父节点tr
	var $tr=$(this).parent().parent();
	//若该问卷没有被选中则不响应事件
	if($($tr).find("input[type=checkbox]").eq(0).prop("checked")==false){
		return false;
	}
	new_rl.del(e);
})

//对编辑事件的处理
$("tbody").find(".btn_edit").on("click",function(e){
	var $tr=$(this).parent().parent();
	if($($tr).find("input[type=checkbox]").eq(0).prop("checked")==false){
		return false;
	}

	//找到该事件源的编号
	for(var i=0; i<$("tbody tr").length;i++){
		if($("tbody tr").eq(i).html()==$($tr).html()){
			//若该问卷为发表状态，则不能被编辑
			if($("tbody tr").eq(i).find("td").eq(3).text()=="已过期"){
				alert("已过期的问卷不能被编辑！");
				return false;
			}
			storage.new="edit";
			storage.index=i;
			location.href="new.html";
		}

	}
});

//对查看事件的处理
$("tbody").find(".btn_checked").on("click",function(e){
	var $tr=$(this).parent().parent();
	if($($tr).find("input[type=checkbox]").eq(0).prop("checked")==false){
		return false;
	}

	for(var i=0;i<$("tbody tr").length;i++){
		if($("tbody tr").eq(i).html()==$($tr).html()){
			if($("tbody tr").eq(i).find("td").eq(3).text=='未发表'){
				alert("未发表的问卷不能查看数据！");
				return false;
			}
			storage.index=i;
			location.href="view.html";
		}
	}
});
//对新建事件的绑定
$("#btn_newquestionnaire").click(function(){
	storage.new="new";
	location.href="new.html";
})


