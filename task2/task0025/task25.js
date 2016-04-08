
var interval=null;

//初始化函数
function reSet(){
	var lis =document.getElementsByTagName('li');
	for(var i=0;i<lis.length;i++){
		lis[i].getElementsByTagName('p')[0].style.backgroundColor="#fff";
	}
}

function Changebg(data){
	var btn_text=document.getElementById('btn_text').value;
	if(btn_text==""){
		var count=0;
		var len=data.length;
		data[count].style.background="blue";
		interval=setInterval(function(){
			if(count<len-1){
				count++;
				data[count-1].style.background="#fff";
				data[count].style.background="blue";
			}else{
				data[count].style.background="#fff";
				clearInterval(interval);

			}


		},1000);
	}else{
		var count=0;
		var len=data.length;
		//对div中的内容进行处理啊，若直接用innerHTML获取的是div中包含的所有的内容，包括其
		//内部的div子标签，所以使用其第一个子节点，然后用正则表达式消除掉其中的换行符，得到文本
		var text=data[count].firstChild.nodeValue.replace(/\W/g,"");
		if(text==btn_text){
			data[count].style.background="red";
			return;
		}
			
		data[count].style.background="blue";
		interval=setInterval(function(){
			if(count<len-1){
				count++;
				data[count-1].style.background="#fff";
				var text=data[count].firstChild.nodeValue.replace(/\W/g,"");
				if(text==btn_text){
					data[count].style.background="red";
					clearInterval(interval);
					return;
				}
				data[count].style.background="blue";
			}else{
				clearInterval(interval);
				data[count].style.background="#fff";
				alert("没有找到匹配的文字");
			}


		},1000);
	}


}


function travesel(name){
	reSet();
	var data=[];
	var root=document.getElementById('Super');
	switch(name){
		case "depth":
			depthTravel(root,data);
			break;
		case "breadth":
			var node=[];
			node.push(root);
			beadthTravel(node,data);
			break;
	}
	Changebg(data);

}


//深度优先搜索（递归循环，遍历所有节点直到该节点没有孩子节点为止）
function depthTravel(node,data){
	if(node){
		data.push(node);
		var childs=node.children;
		for(var i=0;i<childs.length;i++){
			depthTravel(childs[i],data);
		}
	}
	return data;
}

function beadthTravel(node,data){
	if(node.length>=1){
		var curr_child = [];
		for(var i=0;i<node.length;i++){
			data.push(node[i]);
			for(var j=0;j<node[i].children.length;j++){
				curr_child.push(node[i].children[j]);
			}
		}
		beadthTravel(curr_child,data);
	}
	return data;

}


//对每个li添加监听事件，若点击该li,则改变其背景图片（注意事件冒泡）
var deleteNode=null;
var addNewNode=[];

 wrap_lis=document.getElementById('wrap').getElementsByTagName('li');
for(var i=0;i<wrap_lis.length;i++){
	wrap_lis[i].addEventListener("click", function(e){ 
		
		reSet();
		//获取该li元素的class名
		var classname=this.className;
		var lis_child=this.getElementsByTagName('ul');
		this.getElementsByTagName('p')[0].style.backgroundColor="#EEE777";
         if(classname === "on"){
         	//改变该li的class值，下述改变class的方法是兼容性最好的方法
         	this.className="off";
         	 if(lis_child.length>=1){
         		lis_child[0].style.display="none";
         	}
         }else{
         	this.className="on";
         	 if(lis_child.length>=1){
         		lis_child[0].style.display="block";
         	}
         }        
         deleteNode=this;
         //阻止事件冒泡(因为点击子节点后，由于冒泡的原因，其父亲节点会一层层的被触发)
         e.stopPropagation();

     },false)
	
}
//删除操作
function deleteThis(){
	if(deleteNode === null){
		alert("请先选中文件夹再尝试");
	}else{
		deleteNode.parentNode.removeChild(deleteNode);
	}
	
}
//插入节点操作操作
function addThis(){
	var btn_input=document.getElementById('btn_input').value;
	if(btn_input == ""){
		alert("请输入新增节点的内容");
		return;
	}
	if(deleteNode === null ){
		alert("请选中增加节点的父节点");
		return;
	}
	var node_ul=deleteNode.getElementsByTagName('ul');
	
	var new_addNode=document.createElement("li");
	new_addNode.className="on";

	new_addNode.addEventListener("click", function(e){ 
		
		reSet();
		//获取该li元素的class名
		var classname=this.className;
		var lis_child=this.getElementsByTagName('ul');
		this.getElementsByTagName('p')[0].style.backgroundColor="#EEE777";
         if(classname === "on"){
         	//改变该li的class值，下述改变class的方法是兼容性最好的方法
         	this.className="off";
         	 if(lis_child.length>=1){
         		lis_child[0].style.display="none";
         	}
         }else{
         	this.className="on";
         	 if(lis_child.length>=1){
         		lis_child[0].style.display="block";
         	}
         }        
         deleteNode=this;
         //阻止事件冒泡(因为点击子节点后，由于冒泡的原因，其父亲节点会一层层的被触发)
         e.stopPropagation();

     },false)


	//设置新添加的li标签的class标签
	
	var new_p=document.createElement("p");
	new_p.innerHTML=btn_input;
	new_addNode.appendChild(new_p);
	if(node_ul.length>=1){
		node_ul[0].appendChild(new_addNode);
		
	}else{
		var new_ul=document.createElement("ul");
		new_ul.appendChild(new_addNode);
		deleteNode.appendChild(new_ul);
	}
	addNewNode.push(new_addNode);
	
	//更新点击事件（不清楚为什么要更新）
	/*var wrap_lis=document.getElementById('wrap').getElementsByTagName('li');
	for(var i=0;i<wrap_lis.length;i++){
		wrap_lis[i].addEventListener("click", function(e){ 
				//reSet();
			//获取该li元素的class名
			for(var j=0;j<addNewNode.length;j++){
				if(this == addNewNode[j] && kk == 1){
				var classname=this.className;
				var lis_child=this.getElementsByTagName('ul');
				this.getElementsByTagName('p')[0].style.backgroundColor="#EEE777";
		         if(classname === "on"){
		         	//改变该li的class值，下述改变class的方法是兼容性最好的方法
		         	this.className="off";
		         	 if(lis_child.length>=1){
		         		lis_child[0].style.display="none";
		         	}
		         }else{
		         	this.className="on";
		         	 if(lis_child.length>=1){
		         		lis_child[0].style.display="block";
		         	}
		         }        
		         deleteNode=this;
		         
		         kk=0;
		         return;
		         }
			}
			
		         //阻止事件冒泡(因为点击子节点后，由于冒泡的原因，其父亲节点会一层层的被触发)
		         
			e.stopPropagation();
			
		

	     },false)
		kk=1;
	
	}*/
	deleteNode=null;
	reSet();
}

function mySearch(){
	var text=document.getElementById('btn_input').value;
	if(text == ""){
		alert("请输入查找内容");
		return;
	}
	for(var i=0;i<wrap_lis.length;i++){
		var p_text=wrap_lis[i].getElementsByTagName('p')[0].innerHTML;
		if(p_text == text){
			wrap_lis[i].getElementsByTagName('p')[0].style.backgroundColor="#80BAF3";
		}

	}
}



