var circle=function(){
	var width,height,canvas,circle_canvas,circles=[],options={
		color:'255,255,255,',
		size:30,
		direction:'top'
	};

 	var setting=function(opts){
 		var opt_set=document.querySelectorAll('.opt_set');
 		for (var i = 0; i < opt_set.length; i++) {
 			opt_set[i].addEventListener('change',function(){
	 			options.color=document.querySelector('#color').value;
	 			options.size=document.querySelector('#size').value;
	 			options.direction=document.querySelector('#pos').value;
	 		});
 		}
 	}

 	var circle_position=function(){
 		var new_circel,cx,cy;
	 	switch(options.direction){
	 		case 'bottom':
	 			cx=Math.random()*width;
				cy=height+Math.random()*100;
	 			break;
	 		case 'top':
	 			cx=Math.random()*width;
				cy=Math.random()*-100;
				break;
			case 'left':
				cx=Math.random()*-100;
				cy=Math.random()*height;
				break;
			case 'right':
				cx=width+Math.random()*100;
				cy=Math.random()*height;
				break;
	 	}
	 	new_circel={
 			x:cx, //X坐标
 			y:cy, //Y坐标
 			a:0.1+Math.random()*0.3, //透明度
 			w:0.1+Math.random()*0.3, //半径
 			v:Math.random(), //坐标变化步进值
 			c:randomColor({format: 'rgba'}) //颜色
 		};

	 	return new_circel;
 	}

 	var create_circel=function(){
 		var circel_num=width;
 		if(options.direction=='left'||options.direction=='right'){
 			circel_num=height
 		}
 		for (var i = 0; i < circel_num*0.5; i++) {
	 		circles.push(circle_position());
 		}
 	}

 	var draw_circel=function(){
 		circle_canvas.clearRect(0,0,width,height);
 		for (var i = 0; i < circles.length; i++) {
 			if(circles[i].a<=0){
 				circles[i]=circle_position();
 			}
 			switch(options.direction){
 				case 'bottom':
 					circles[i].y-=circles[i].v;
 					break;
 				case 'top':
 					circles[i].y+=circles[i].v;
 					break;
 				case 'left':
 					circles[i].x+=circles[i].v;
 					break;
 				case 'right':
 					circles[i].x-=circles[i].v;
 					break;
 			}

 			circles[i].a-=0.0005;
 			circle_canvas.beginPath();
 			circle_canvas.arc(circles[i].x,circles[i].y,circles[i].w*options.size,0,2*Math.PI,false);
 			if(options.color=='blink'){
 				circle_canvas.fillStyle=randomColor({format: 'rgba'});
 			}else if(options.color=='random'){
 				circle_canvas.fillStyle=(circles[i].c).replace(/0\.\d*/,circles[i].a);
 			}else{
 				circle_canvas.fillStyle='rgba('+options.color+circles[i].a+')';
 			}
 			circle_canvas.fill();
 		}
 		requestAnimationFrame(draw_circel);
 	}

 	var pageload=function(){
 		width=window.innerWidth;
 		height=window.innerHeight;
 		canvas=document.querySelector('#circle_canvas');
 		canvas.width=width;
 		canvas.height=height;

 		circle_canvas=canvas.getContext('2d');
 		window.addEventListener('resize', resize);
 		setting();
 	}

 	var resize=function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

	return {
		init:function(opts){
			pageload();
			create_circel();
			draw_circel();
		}
	}
}()
circle.init();