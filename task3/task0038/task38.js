//建立个人成绩对象
function Students(name,chinese,math,english){
	this.name=name;
	this.chinese=chinese;
	this.math=math;
	this.english=english;
	this.total=chinese+math+english;
}

/* 我可以这样获取Students对象的属性
var n=new Students("小明",80,90,70);
var m=n["name"];
*/

data=[];
data[0]=new Students("小明",80,90,70);
data[1]=new Students("小红", 90, 60, 90);
data[2]=new Students("小亮", 60, 100, 70);
data[3]=new Students("小王", 75, 81, 83);
data[3]=new Students("小张", 88, 79, 98);

var tbody=document.getElementById('tbody');
var thed=document.getElementById('thed');

//显示数据
function display(data){
	tbody.innerHTML="";
	var str="";
	for(var i=0;i<data.length;i++){
		str=str+'<tr><td>'+data[i].name+'</td><td>'+data[i].chinese+'</td><td>'+data[i].math+'</td><td>'+data[i].english+'</td><td>'+data[i].total+'</td></tr>';
	}
	tbody.innerHTML=str;
}




function upSorted(data,obj){
	data.sort(function(pre,next){
		var mm=pre[obj];
		return pre[obj]-next[obj];
	});
	return data;

}

function downSorted(data,obj){
	data.sort(function(pre,next){
		return next[obj]-pre[obj];
	});
	return data;
}

//使用时间委托
function delClick(){
	var flag={
		"chinese": true,
		"math": true,
		"english": true,
		"total": true
	};

	thed.onclick=function(e){
		//事件兼容性考虑
		e=e || event;
		var target =e.target || e.srcElement;
		if(flag[target.id] === true){
			upSorted(data,target.id);
			display(data);
			flag[target.id]=false;
		}else{
			downSorted(data,target.id);
			display(data);
			flag[target.id]=true;
		}

	}
}
display(data);
delClick();