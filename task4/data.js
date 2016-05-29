//缓存数据处理

var storage=window.localStorage;
var data=[];

//清除缓存
console.log("按z键可以清空localstorage")
if(!storage.a){
	alert("按下z键清除storage");
	storage.a=-1;
}
document.onkeydown=function(event){
	var e=event||window.event;
	if(e.keyCode==90){
		storage.clear();
	}
}


changedata(0);
//处理数据的交换形式
function changedata(n){
//n=0:将storage转换成data
//n=1:将data装换成storage
	if(n==0 && storage.questions){
		var a=JSON.parse(storage.questions);
		time(a);
		storage.questions=JSON.stringify(a);
		data=JSON.parse(storage.questions);
	}else if(n==1){
		storage.questions=JSON.stringify(data);
		time(data);
	}else if(n==0 && !storage.questions){
		storage.questions=JSON.stringify(data);
		time(data);
	}
	console.log(data);
	console.log(storage.questions);

}




//保存时间
function time(d){
	var dd=new Date();
	var dn=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate());
	for(var i=0;i<d.length;i++){
		var dt=new Date(d[i].times);
		if(dt.getTime()<dn.getTime()){
			d[i].state="2";
		}
	}
}