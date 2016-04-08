


var interval;
//依次改变div的背景颜色
function Changebg(data){
	var count=0;
	var length=data.length;
	data[count++].style.background = 'blue';
	interval = setInterval(function(){
		if(count<length){
			data[count-1].style.background = 'white';
			data[count++].style.background = 'blue';
		}else{
			clearInterval(interval);
			data[count-1].style.background = 'white';
		}
	},1000)

	

}





function traverse(type) {
	//存放遍历后的节点的顺序
	var data=[];
	var root=document.getElementById('root');
	switch(type){

		case("pre"):
			pre_traverse(root,data);
			break;
		case("mid"):
			mid_traverse(root,data);
			break;
		case("aft"):
			aft_traverse(root,data);
			break;
	}
	//遍历结束后，调用改变背景颜色的函数
	Changebg(data);
}

//前序遍历
function pre_traverse(node,data){
	if(node){
		data.push(node);
		//children返回的是直系子节点
		pre_traverse(node.children[0],data);
		pre_traverse(node.children[1],data);
	}
	return data;
}

//中序遍历
function mid_traverse(node,data){
	if(node){
		mid_traverse(node.children[0],data);
		data.push(node);
		mid_traverse(node.children[1],data);
	}
	return data;
}

//后序遍历
function aft_traverse(node,data){
	if(node){
		aft_traverse(node.children[0],data);
		aft_traverse(node.children[1],data);
		data.push(node);
	}
	return data;
}