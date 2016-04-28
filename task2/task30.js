
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
var test_name=null;
var test_code=null;
var test_recode=null;
var test_email=null;
var test_phone=null;

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





//初始化函数
function init(){
	var forms=document.getElementById('forms');
	var inputs=forms.getElementsByTagName('input');
	for(var i=0;i<inputs.length;i++){
		/*inputs[i].addEventListener("focus",function(e){
			reminder(this);
		},false);*/
		addHandler(inputs[i], "focus",function(){
			reminder(this);
		});
		addHandler(inputs[i],"blur",function(){
			check(this);
		})
	}
	var btn=document.getElementById('btn');
	addHandler(btn, "click", function(){
		if(test_name && test_code && test_recode && test_email && test_phone){
			alert("输入正确");
		}else{
			alert("输入有误");
		}
	})

}



init();