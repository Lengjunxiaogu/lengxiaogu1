

function Myinsert(n){
	var tex =document.getElementById('text').value;
	var lis=document.getElementsByTagName('li');
	var ul_info=document.getElementById('ul_info');
	if(isNaN(tex) || tex==""){
		alert("请输入数字！");
		return;
	}
	if(n==1){
		var li=document.createElement("li");
		li.innerHTML=tex;
		ul_info.insertBefore(li,lis[0]);
	}else if(n==2){
		var li=document.createElement("li");
		li.innerHTML=tex;
		ul_info.appendChild(li);
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