
//对事件的兼容性处理
function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent(type,handler);
	}else{
		element['on'+type]=handler;
	}
}

//初始化存储表单选中情况


//样式生成器
function style_produce(n){
	var test_All=[];
	var div=document.getElementById('forms');
	var forms1=document.getElementById('forms1');
	var forms2=document.getElementById('forms2');
	var forms3=document.getElementById('forms3');
	var forms4=document.getElementById('forms4');
	var ul=document.createElement("ul");
	div.appendChild(ul);
	var test_name=null;
	var test_code=null;
	var test_recode=null;
	var test_email=null;
	var test_phone=null;

	if(forms1.checked){
		produceName(n,ul);
		test_All.push(test_name);
	}
	if(forms2.checked){
		producePassword(n,ul);
		produceConfirmPassword(n,ul);
		test_All.push(test_code);
		test_All.push(test_recode);
	}
	if(forms3.checked){
		produceEmail(n,ul);
		test_All.push(test_email);
	}
	if(forms4.checked){
		producePhone(n,ul);
		test_All.push(test_phone);
	}
	if(test_All.length==0){
		alert("请选择要添加的表单");
	}else{
		var btn=document.createElement("input");
		btn.setAttribute("type","button");
		btn.setAttribute("value","提交");
		btn.className="btn";
		div.appendChild(btn);
		addHandler(btn, "click", function(){
			for(var i=0;i<test_All.length;i++){
				if(!test_All[i]){
					alert("格式错误");
					return;
				}
				alert("格式正确");
			}
		})
	}
} 


function reminder(obj){
	var parent=obj.parentNode;
	var p=parent.getElementsByTagName('p');
	switch(obj.name){
		case "name":
			p[0].innerHTML="必填,长度为4~16个字符";
			break;
		case "code":
			p[0].innerHTML="必填,英文数字混合，6~11个字符";
			break;
		case "re_code":
			p[0].innerHTML="再次输入密码";
			break;
		case "mail":
			p[0].innerHTML="必填";
			break;
		case "phone":
			p[0].innerHTML="长度为11个数字";
			break;

	}
}


function produceName(n,obj){
	var li=document.createElement("li");
	var span=document.createElement("span");
	var input=document.createElement("input");
	var p=document.createElement("p");
	span.innerHTML="姓名";
	input.setAttribute("type","text");
	input.setAttribute("name","name");
	if(n==2){
		p.style.display="inline-block";
		p.style.fontSize=10 +"px";
	}else{
		p.style.paddingLeft=100 + "px";
	}
	addHandler(input, "focus", function(){
		reminder(this);
	});
	addHandler(input, "blur", function(){
		check(this);
	});
	li.appendChild(span);
	li.appendChild(input);
	li.appendChild(p);
	obj.appendChild(li);
}

function producePassword(n,obj){
	var li=document.createElement("li");
	var span=document.createElement("span");
	var input=document.createElement("input");
	var p=document.createElement("p");
	span.innerHTML="密码";
	input.setAttribute("type","text");
	input.setAttribute("name","code");
	if(n==2){
		p.style.display="inline-block";
		p.style.fontSize=10 +"px";
	}else{
		p.style.paddingLeft=100 + "px";
	}
	addHandler(input, "focus", function(){
		reminder(this);
	});
	addHandler(input, "blur", function(){
		check(this);
	});
	li.appendChild(span);
	li.appendChild(input);
	li.appendChild(p);
	obj.appendChild(li);
}

function produceConfirmPassword(n,obj){
	var li=document.createElement("li");
	var span=document.createElement("span");
	var input=document.createElement("input");
	var p=document.createElement("p");
	span.innerHTML="确认密码";
	input.setAttribute("type","text");
	input.setAttribute("name","re_code");
	if(n==2){
		p.style.display="inline-block";
		p.style.fontSize=10 +"px";
	}else{
		p.style.paddingLeft=100 + "px";
	}
	addHandler(input, "focus", function(){
		reminder(this);
	});
	addHandler(input, "blur", function(){
		check(this);
	});
	li.appendChild(span);
	li.appendChild(input);
	li.appendChild(p);
	obj.appendChild(li);	
}

function produceEmail(n,obj){
	var li=document.createElement("li");
	var span=document.createElement("span");
	var input=document.createElement("input");
	var p=document.createElement("p");
	span.innerHTML="邮箱";
	input.setAttribute("type","text");
	input.setAttribute("name","mail");
	if(n==2){
		p.style.display="inline-block";
		p.style.fontSize=10 +"px";
	}else{
		p.style.paddingLeft=100 + "px";
	}
	addHandler(input, "focus", function(){
		reminder(this);
	});
	addHandler(input, "blur", function(){
		check(this);
	});
	li.appendChild(span);
	li.appendChild(input);
	li.appendChild(p);
	obj.appendChild(li);
}

function producePhone(n,obj){
	var li=document.createElement("li");
	var span=document.createElement("span");
	var input=document.createElement("input");
	var p=document.createElement("p");
	span.innerHTML="手机";
	input.setAttribute("type","text");
	input.setAttribute("name","phone");
	if(n==2){
		p.style.display="inline-block";
		p.style.fontSize=10 +"px";
	}else{
		p.style.paddingLeft=100 + "px";
	}
	addHandler(input, "focus", function(){
		reminder(this);
	});
	addHandler(input, "blur", function(){
		check(this);
	});
	li.appendChild(span);
	li.appendChild(input);
	li.appendChild(p);
	obj.appendChild(li);	
}



function check(obj){
	var parent=obj.parentNode;
	var text=obj.value;
	var p=parent.getElementsByTagName('p')[0];
	switch(obj.name){
		case "name":
			check_name(obj,p,text);
			break;
		case "code":
			check_code(obj,p,text);
			break;
		case "re_code":
			check_recode(obj,p,text);
			break;
		case "mail":
			check_email(obj,p,text);
			break;
		case "phone":
			check_phone(obj,p,text);
			break;

	}
}

function check_name(input,p,text){

		if (text == ""){
			test_name=false;
			p.innerHTML = "姓名不能为空";
			p.style.color = "#DD000F";
			input.style.borderColor="#DD000F";
		}else{
			var len=0;
			for(var i=0;i<text.length;i++){
				if(text.charCodeAt(i)>127 || text.charCodeAt(i)==94){
					len +=2;
				}else{
					len++
				}
			}
			if(len>=4 && len <=16){
				p.innerHTML = "名称格式正确";
				p.style.color = "#52BE37";
				input.style.borderColor="#52BE37";
				test_name=true;
			}else{
				p.innerHTML = "名称格式错误";
				p.style.color = "#DD000F";
				input.style.borderColor="#DD000F";
				test_name=false;
			}
		}
}
function check_code(input,p,text){
	if (text == ""){
			test_code=false;
			p.innerHTML = "密码不能为空";
			p.style.color = "#DD000F";
			input.style.borderColor="#DD000F";
		}else{
			var reg=/^[a-zA-Z0-9]{6,11}$/;
			var isRight=reg.test(text);
			if(isRight){
				p.innerHTML = "密码可用正确";
				p.style.color = "#52BE37";
				input.style.borderColor="#52BE37";
				test_code=true;
			}else{
				p.innerHTML = "密码格式错误";
				p.style.color = "#DD000F";
				input.style.borderColor="#DD000F";
				test_code=false;
			}
	}
}
function check_recode(input,p,text){
	if (text == ""){
			test_recode=false;
			p.innerHTML = "密码不能为空";
			p.style.color = "#DD000F";
			input.style.borderColor="#DD000F";
		}else{
			var password=document.getElementById('password').value;
			if(password == ""){
				p.innerHTML = "请输入第一次密码";
				p.style.color = "#DD000F";
				input.style.borderColor="#DD000F";
				test_recode=false;
			}else{
				if(password == text){
					test_recode=true;
					p.innerHTML = "密码正确";
					p.style.color = "#52BE37";
					input.style.borderColor="#52BE37";
				}else{
					p.innerHTML = "密码输入错误";
					p.style.color = "#DD000F";
					input.style.borderColor="#DD000F";
					test_recode=false;
				}
			}
	}
}
function check_email(input,p,text){
		if (text == ""){
			test_email=false;
			p.innerHTML = "邮箱不能为空";
			p.style.color = "#DD000F";
			input.style.borderColor="#DD000F";
		}else{
			var apos=text.indexOf('@');
			var dotpos=text.indexOf('.');
			if(apos<1 || dotpos-apos<2){
				test_email=false;
				p.innerHTML = "邮箱格式错误";
				p.style.color = "#DD000F";
				input.style.borderColor="#DD000F";
			}else{
				p.innerHTML = "邮箱可用正确";
				p.style.color = "#52BE37";
				input.style.borderColor="#52BE37";
				test_email=true;
			}			
	}
}
function check_phone(input,p,text){
	if (text == ""){
			test_phone=false;
			p.innerHTML = "手机号不能为空";
			p.style.color = "#DD000F";
			input.style.borderColor="#DD000F";
		}else{
			var reg=/^[0-9]{11}$/;
			var isRight=reg.test(text);
			if(isRight){
				p.innerHTML = "可用";
				p.style.color = "#52BE37";
				input.style.borderColor="#52BE37";
				test_phone=true;
			}else{
				p.innerHTML = "输入错误";
				p.style.color = "#DD000F";
				input.style.borderColor="#DD000F";
				test_phone=false;
			}
	}
}

function init(){
	var btn=document.getElementById('btn');
	var style1=document.getElementById('style1');
	var style2=document.getElementById('style2');
	addHandler(btn, "click", function(){
		var div=document.getElementById('forms');
		div.innerHTML="";
		if(style1.checked){
			style_produce(1);
		}else if(style2.checked){
			style_produce(2);
		}else{
			alert("请选中样式！");
		}
	})

}


init();