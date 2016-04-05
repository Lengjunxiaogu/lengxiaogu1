
var interval=null;

//初始化函数
function reSet(){
	var divs =document.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++){
		divs[i].style.background="#fff";
	}
	clearInterval(interval);
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

