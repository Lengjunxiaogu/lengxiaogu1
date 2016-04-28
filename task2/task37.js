

//获取三个按键
var btn1=document.getElementById('btn1');
var btn2=document.getElementById('btn2');
var btn3=document.getElementById('btn3');

//建立浮出层对象
function Popup(){
	this.pic=null;
	this.mask=null;
	this.setting={
		title: "添加标题",
		width: 500,
		height: 500,
		position: "left",
		isDrag: false,
		isMask: false
	}

};

Popup.prototype.json={};

window.onload=function(){
	btn1.onclick=function(){
		var pic=new Popup();
		pic.init({
			isNow: 0,
			title: "两只老虎",
			width: 300,
			height: 300,
			position: "center",
			isDrag: true,
			isMask: true
		});

	}
}

Popup.prototype.init=function(json){
	extend(this.setting,json);
	if(this.json[json.isNow] === undefined){
		this.json[json.isNow]=true;
	}

	if(this.json[json.isNow]){
		this.aqiRender();     //添加浮动层

		if(this.setting.isMask){
			this.aqiMask();   //添加遮蔽罩
		}

		this.aqiClickClose();

		if(this.setting.isDrag){  
			this.aqiDrag();  //添加拖动
		}

		this.json[json.isNow]=false;
	}
}


function extend(cur,other){
	for(var attr in other){
		cur[attr]=other[attr];
	}
}

Popup.prototype.aqiRender=function(){
	var _this=this;
	this.pic=document.createElement("div");
	this.pic.className="pic";
	this.pic.style.width=this.setting.width + "px";
	this.pic.style.height=this.setting.height + "px";
	//设置浮出层窗口的位置
	if(this.setting.position === "left"){
		this.pic.style.left=(window.screen.width - this.setting.width) + 'px';
		this.pic.style.top=(window.screen.height - this.setting.height) + 'px';
	}

	if(this.setting.position === "center"){
		this.pic.style.left=(window.screen.width-this.setting.width)/2 + 'px';
		this.pic.style.top=(window.screen.height-this.setting.height)/2 + 'px';
	}

	if(this.setting.position === "top"){
		this.pic.style.left=0 + 'px';
		this.pic.style.top=0 + 'px';
	}
	this.pic.innerHTML='<div class="header">'+this.setting.title+'</div><div class="content" style="height:'+(this.setting.height-130)+'px'+'"></div><div class="footer"><input id="btn4" type="button" value="确认" /><input id="btn5" type="button" value="取消" /></div>';
	document.body.appendChild(this.pic);
}

Popup.prototype.aqiMask=function(){
	this.mask=document.createElement("div");
	this.mask.className="mask";
	document.body.appendChild(this.mask);
}

Popup.prototype.aqiDrag=function(){
	var _this=this;
	this.pic.onmousedown=function(e){
		var ev= e || event;
		var x=ev.clientX - _this.pic.offsetLeft;
		var y=ev.clientY - _this.pic.offsetTop;

		document.onmousemove=function(e){
			var ev=e || event;
			var ox=ev.clientX - x;
			var oy=ev.clientY - y;
			if(ox < 0){
				ox=0;
			}else if(ox>(document.body.scrollWidth - _this.setting.width)){
				ox=document.body.scrollWidth - _this.setting.width;
			}

			if(oy < 0){
				oy=0;
			}else if(oy>(document.body.scrollHeight - _this.setting.height)){
				oy=document.body.scrollHeight - _this.setting.height;
			}

			_this.pic.style.left=ox + 'px';
			_this.pic.style.top=oy + 'px';
		};

		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
		return false;

	}
}

Popup.prototype.aqiClickClose=function(){
	var _this=this;
	var confirm=document.getElementById('btn4');
	var cancle=document.getElementById('btn5');
	confirm.onclick=function(){
		_this.aqiClose();
	}

	if(this.mask){
		this.mask.onclick=function(){
			_this.aqiClose();			
		}
		
	}
}

Popup.prototype.aqiClose=function(){
	document.body.removeChild(this.pic);
	if(this.mask){
		document.body.removeChild(this.mask);
	}

	this.json[this.setting.isNow]=true;
}