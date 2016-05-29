//查看当前问卷对应的数据统计情况，数据统计结果是随机选择的

//设置单选题的内容
function setradio(selector){
	var $div=document.createElement("div");
	var len=$(selector).children().length+1;
	$div.className="view_questions";
	var str="";
	str+='<div class="left view_ansers">'+'<span class="view_order">Q'+len+'</span>'+
	'<span>这是第一个问题</span>'+
	'<ul><li>选项一</li><li>选项二</li><li>选项三</li><li>选项四</li></ul></div><div class="right figure"><span>数据占比</span>'+
	'<ul><li><div></div><span></span></li><li><div></div><span></span></li><li><div></div><span></span></li><li><div></div><span></span></li></ul></div>';
	$div.innerHTML=str;
	$(selector).append($div);

}

//设置多选框的内容
function setcheckbox(selector){
	var $div=document.createElement("div");
	var len=$(selector).children().length+1;
	$div.className="view_questions";
	var str="";
	str+='<div class="left view_ansers"><span class="view_order">Q'+len+'</span><span>这是第一个问题</span>'+
	'<ul><li>选项一</li><li>选项二</li><li>选项三</li><li>选项四</li></ul></div><div class="right figure"><span>数据占比</span>'+
	'<ul><li id="q'+len+'"></li></ul></div>';
	$div.innerHTML=str;
	$(selector).append($div);

}

function setTextarea(selector){
	var $div=document.createElement("div");
	var len=$(selector).children().length+1;
	$div.className="view_questions";
	var str="";
	str+='<div class="left view_ansers"><span class="view_order">Q'+len+'</span><span>这是第一个问题</span>'+
	'</div><div class="right figure"><span>有效回答占比</span>'+
	'<ul><li><div></div><span></span></li></ul></div>';
	$div.innerHTML=str;
	$(selector).append($div);

}

//画图代码
function setRadioFigure(selector,num){
	//首先生成四个随机数，满足总和为100
	var a1=Math.floor((Math.random())*100);
	var a2=Math.floor((Math.random())*(100-a1));
	var a3=Math.floor((Math.random())*(100-a1-a2));
	var a4=100-a1-a2-a3;
	var a=[a1,a2,a3,a4];
	//填充对应的颜色，并可以设置动画效果
	for(var i=0;i<4;i++){
		var $div=document.createElement("div");
		$div.classaName="view_show";
		$div.style.background="#E77408";
		$div.style.height="10px";
		$div.style.width=a[i]*2+'px';
		$div.style.border="none";
		//$div.style.display="inline-block";
		$(selector).eq(num).find("ul li").eq(i).find("div").eq(0).append($div);
		$(selector).eq(num).find("ul li").eq(i).find("span").eq(0).html(a[i]+"%");

	}

}

//画饼状图
function setCheckboxFigure(selector,num){

	var width=100;
	var height=100;
	//首先生成四个随机数，满足总和为100
	var a1=Math.floor((Math.random())*100);
	var a2=Math.floor((Math.random())*(100-a1));
	var a3=Math.floor((Math.random())*(100-a1-a2));
	var a4=100-a1-a2-a3;
	var dataset=[a1,a2,a3,a4];
	//填充对应的颜色，并可以设置动画效果
	var svg=d3.select("#q"+(num+1))
						.append("svg")
						.attr("width",width)
						.attr("height",height);
	var pie=d3.layout.pie();
	var piedata=pie(dataset);
	var outerRadius=50;
	var innerRadius=0;
	var arc=d3.svg.arc()
					.innerRadius(innerRadius)
					.outerRadius(outerRadius);
	var color=d3.scale.category10();
	var arcs=svg.selectAll("g")
					.data(piedata)
					.enter()
					.append("g")
					.attr("transform","translate("+(width/2)+","+(width/2)+")");
	arcs.append("path")
	       .attr("fill",function(d,i){
	       		return color(i);
	       })
	       .attr("d",function(d){
	       		return arc(d);
	       });
	arcs.append("text")
			.attr("transform",function(d){
				return "translate("+arc.centroid(d)+")";
			})
			.attr("text-anchor","middle")
			.text(function(d,i){
				return (i+1);
			});
	console.log(dataset);
	console.log(piedata);


	

}

function setTextareaFigure(selector,num){
	//首先生成四个随机数，满足总和为100
	var a=Math.floor((Math.random())*100);
	//填充对应的颜色，并可以设置动画效果
	var $div=document.createElement("div");
	$div.style.background="#E77408";
	$div.style.height="10px";
	$div.style.width=a*2+'px';
	$div.style.border="none";
	$(selector).eq(num).find("ul li").eq(0).find("div").eq(0).append($div);
	$(selector).eq(num).find("ul li").eq(0).find("span").eq(0).html(a+"%");


}




//首先将放在localStorage中的内容展示到view.html页面上
$(window).ready(function(){
	$("#view_title").find("h2").eq(0).html(data[storage.index].title);
	for(var i=0;i<data[storage.index].questions.length;i++){
		if(data[storage.index].questions[i].mytype=="radios"){
			//对于单选题添加其页面内容，以及其对应的图信息
			setradio(".view_content");
			//修改文本中的内容
			$(".view_ansers").eq(i).find("span").eq(1).text(data[storage.index].questions[i].text);
			for(var j=0;j<data[storage.index].questions[i].option.length;j++){
				$(".view_ansers").eq(i).find("ul li").eq(j).text(data[storage.index].questions[i].option[j]);
			}
			//画图
			setRadioFigure(".figure",i);
		}else if(data[storage.index].questions[i].mytype=="checkbox"){
			setcheckbox(".view_content");
			//修改文本中的内容
			$(".view_ansers").eq(i).find("span").eq(1).html(data[storage.index].questions[i].text);
			for(var j=0;j<data[storage.index].questions[i].option.length;j++){
				$(".view_ansers").eq(i).find("ul li").eq(j).html(data[storage.index].questions[i].option[j]);
			}
			setCheckboxFigure(".figure",i);
		}else{
			setTextarea(".view_content");
			//修改文本中的内容
			$(".view_ansers").eq(i).find("span").eq(1).html(data[storage.index].questions[i].text);
			setTextareaFigure(".figure",i);
		}
	}

})