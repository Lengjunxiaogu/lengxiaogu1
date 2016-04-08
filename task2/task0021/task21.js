


function MyinsertTag(){
	var text1=document.getElementById('text1').value;
	var lis=document.getElementsByTagName('li');
	var ul1_info=document.getElementById('ul1_info');
	
	//对输入单词进行切分，通过正则表达式
	var reg=/[\n\r\t\s,，]+/g;
	text1=text1.replace(reg,"");
	Myadd(ul1_info,lis,text1);
	document.getElementById('text1').value="";
}
function MyinsertArea(){
	var text2=document.getElementById('text2').value;
	var ul2_info=document.getElementById('ul2_info');
	var lis=ul2_info.getElementsByTagName('li');

	var reg1=/[\n\r\t\s,，;；、]+/g;
	var str=text2.split(reg1);
	for(var i = 0;i <str.length; i++){
		Myadd(ul2_info,lis,str[i]);
	}
}

function Myadd(ul,lis,text){
		//判断当前值是否重复，若重复则不添加
	if(text==""){
		return;
	}
 	for(var i=0;i<lis.length;i++){
 		if(lis[i].innerHTML==text){
 			return;
 		}
 	}
 	//当多于十个tag时，按录入顺序删除最前面的
 	if(lis.length==10){
 		Mypop(lis[0]);
 	}
 	var li=document.createElement("li");
	li.innerHTML=text;
	//添加三个event时间，可能这样实现不好
	li.onclick=function(){Mypop(this)};
	li.onmouseover=function(){ChangeStyle1(this)};
	li.onmouseout=function(){ChangeStyle2(this)};
	ul.appendChild(li);	
}

	  			
//删除li标签
function Mypop(obj){
	var trobj = obj.parentNode;
	trobj.removeChild(obj);
}
function ChangeStyle1(obj){
	var str = obj.innerHTML;
	obj.innerHTML="点击删除" + str;
}
function ChangeStyle2(obj){
	var str = obj.innerHTML.replace("点击删除","");
	obj.innerHTML=str;
}

/*
function MyCheck(){
	var list=document.getElementsByTagName('li');
	var text1=document.getElementById('text1').value;
	//生成一个正则表达式对象
	var regs=new RegExp(text1);
	for(var i=0;i<list.length;i++){
		var str=list[i].innerHTML;
		var isRight= regs.test(str);
		if(isRight){
			list[i].style.color='#000';
		}
	}
}*/

window.onload=function(){
	document.getElementById('text1').addEventListener("keydown",function(e){
		if(e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 188){ MyinsertTag();}
	},false);
	document.getElementById('btn1').addEventListener("click",MyinsertArea,false);
}
	

