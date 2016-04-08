

function Myinsert(n){
	var tex =document.getElementById('text').value;
	var lis=document.getElementsByTagName('li');
	var ul_info=document.getElementById('ul_info');
	//对输入单词进行切分，通过正则表达式
	var reg=/[\n\r\t\s,，、;；]+/g;
	var array=tex.split(reg);
	for(var i=0;i<array.length;i++){
		if(array[i]!=""){
			var li=document.createElement("li");
			 li.innerHTML=array[i];
			 if(n==1){
			    ul_info.insertBefore(li,lis[0]);
			 }else{
			    ul_info.appendChild(li);
			 }
			    
		}
			
	}
		
}

function Mypop(n){
	var lis=document.getElementsByTagName('li');
	if(lis.length==0){
		return;
	}
	if(n==1){
		ul_info.removeChild(lis[0]);
	}else if(n==2){
		ul_info.removeChild(lis[lis.length-1]);
	}
}

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
}