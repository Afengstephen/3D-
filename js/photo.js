window.onload = function(){
	var oImg = document.getElementsByTagName("img");
	var oWrap = document.getElementById("wrap");

	var Deg = 360 / oImg.length;  //每张图片获取到不同度数

	Array.prototype.forEach.call(oImg,function(el,index){   //oImg使用数组的forEach函数来循环
		el.style.transform = "rotateY("+Deg*index+"deg) translateZ(350px)";
		el.style.zIndex = -index;
		el.style.transition = "transform 1s "+index*0.1+"s";
	});

	// 点，拖，松
	/*
		需求：1、拖拽相册实际上是改变容器的选择度数，
			  2、度数的改变是鼠标的运动距离
			  3、改变后的度数是累积距离差的值
			  4、鼠标松开的时候，让其产生惯性
	*/
	var nowX, nowY,   //本次x，y的距离
		lastX, lastY, //上一次x，y的距离
		distanceX, distanceY,  //距离差
		roX = -10, roY = 0;  //总旋转度数
	var timer;
	document.onmousedown = function(ev){  //鼠标点击参数mouseEvent
		var ev = ev || window.event;  //获取event对象
		lastX = ev.clientX;
		lastY = ev.clientY;
		this.onmousemove = function(ev){
			nowX = ev.clientX;
			nowY = ev.clientY;

			distanceX = nowX - lastX;
			distanceY = nowY - lastY;

			roX = roX - distanceY * 0.1;
			roY = roY + distanceX * 0.1;

			oWrap.style.transform = "rotateX("+roX+"deg) rotateY("+roY+"deg)";

			lastX = nowX;
			lastY = nowY;
		}
		this.onmouseup = function(){
			this.onmousemove = null;   //松开的时候，取消拖拽

			timer = setInterval(function(){
				distanceX = distanceX * 0.98;
				distanceY = distanceY * 0.98;
				roX = roX - distanceY * 0.1;
				roY = roY + distanceX * 0.1;
				oWrap.style.transform = "rotateX("+roX+"deg) rotateY("+roY+"deg)";
			},1000/60)      //定时器产生鼠标松开时的惯性
			if(Math.abs(distanceX) < 0.1 && Math.abs(distanceY) < 0.1){
				clearInterval(timer);
			}

			this.onmouseup = null;
		}
	}
}