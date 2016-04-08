
	
function Myinsert(n){
	var show_data=document.getElementById('show_data');
    var divs = show_data.getElementsByTagName("div");
	var tex =document.getElementById('text').value;
	if(isNaN(tex) || tex==""){
		alert("请输入数字！");
		return;
	}
	tex=parseInt(tex);
	if(tex<10 || tex>100 ){
		alert("请输入10-100之间的数字！");
		return;
	}
	if(divs.length==60){
		alert("最多可添加60个元素，已满！");
		return;
	}
	if(n==1){
		var div_data=document.createElement("div");
		div_data.style.width='20px';
		div_data.style.height=tex+"px";
		div_data.style.backgroundColor='#FD0003';
		div_data.style.marginRight='5px';
		show_data.insertBefore(div_data,divs[0]);
	}else if(n==2){
		var div_data=document.createElement("div");
		div_data.style.width='20px';
		div_data.style.height=tex+"px";
		div_data.style.backgroundColor='#FD0003';
		div_data.style.marginRight='5px';
		show_data.appendChild(div_data);
	}
}

function Mypop(n){
	var divs = show_data.getElementsByTagName("div");
	if(divs.length==0){
		return;
	}
	if(n==1){
		show_data.removeChild(divs[0]);
	}else if(n==2){
		show_data.removeChild(divs[divs.length-1]);
	}
}

function Mysort(){
	var arry=[];
	var divs = show_data.getElementsByTagName("div");
	for(var i=0;i<divs.length;i++){
		arry[i] = parseInt(divs[i].offsetHeight);
	}
	//排序：使用sort方法按照数值从小到大排序
	arry.sort(function(pre,next){
    return pre-next;
    })
	show_data.innerHTML="";
	for(var i=0;i<arry.length;i++){
		var div_data=document.createElement("div");
		div_data.style.width='20px';
		div_data.style.height=arry[i]+"px";
		div_data.style.backgroundColor='#FD0003';
		div_data.style.marginRight='5px';
		show_data.appendChild(div_data);
	}
}