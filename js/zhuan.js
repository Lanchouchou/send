var result_angle =  [{a:0,p:0.2,t:1},{a:40,p:0.1,t:2},{a:80,p:0.1,t:3},{a:120,p:0.3,t:4},{a:160,p:0.1,t:5},{a:200,p:0.1,t:6},{a:240,p:0.1,t:7},{a:280,p:0.1,t:8},{a:320,p:0.1,t:9}];
var rotation={
	rotate_angle:0,//转盘旋转角度
	n:3,//转动次数
	flag_click:true,//转盘旋转过程中不能再次触发
	starsNum : 16, //转盘边缘小黄点个数
	starsPostion : [[50, 0.5], [70, 6], [84.5, 18], [92.5, 32], [95.5, 50], [91, 68], [81.5, 81.5], [68, 91], [50, 95.5], [32, 92.5], [16, 83], [6, 70], [0.5, 50], [3.5, 32], [14, 15], [27, 5.5]], //小圆点坐标
	//计算并排列小圆点
	showStars : function () {
		for(var i=0; i < this.starsNum; i++) {
			var oStar = document.createElement('div');

			if(i%2 == 0) { //奇数的圆点增加高亮的效果(外阴影)
				oStar.style.boxShadow = '0 0 5px #fff';
			}	
			oStar.className = 'stars';
			oStar.style.left = this.starsPostion[i][0] + '%';
			oStar.style.top = this.starsPostion[i][1] + '%';
			$('.big-border').append(oStar);
		}
	},
	rotate:function(during_time){
		var self=this;
		var rand_num=Math.ceil(Math.random()*100);//用来判断随机数
		var result_index;// 最终要旋转到哪一块，对应result_angle的下标
		var start_pos = end_pos = 0; // 判断的角度值起始位置和结束位置
		for(var i in result_angle){
			start_pos = end_pos + 1; // 区块的起始值
			end_pos = end_pos + 100 * result_angle[i].p; // 区块的结束值
			
			if(rand_num >= start_pos && rand_num <= end_pos){ // 如果随机数落在当前区块，那么获取到最终要旋转到哪一块
				result_index = i;
				break;
			}
		}
		var rand_circle = Math.ceil(Math.random() * 2) + 20; // 附加多转几圈，2-3
		self.rotate_angle =  self.rotate_angle - rand_circle * 360 - result_angle[result_index].a - self.rotate_angle % 360;
		self.flag_click=false;//旋转结束前不允许在触发
		$('.big-border').css({
				'transform': 'rotate('+self.rotate_angle+'deg)',
				'-ms-transform': 'rotate('+self.rotate_angle+'deg)',
				'-webkit-transform': 'rotate('+self.rotate_angle+'deg)',
				'-moz-transform': 'rotate('+self.rotate_angle+'deg)',
				'-o-transform': 'rotate('+self.rotate_angle+'deg)',
				'transition': 'transform ease-in '+self.during_time+'s',
				'-moz-transition': '-moz-transform ease-in '+during_time+'s',
				'-webkit-transition': '-webkit-transform ease-in '+self.during_time+'s',
				'-o-transition': '-o-transform ease-in '+during_time+'s'
			});
		setTimeout(function(){ 
			self.flag_click = true;
			$(".count").html(result_angle[result_index].t);
			$(".theForm").show();	
		},5000);
	}
}
$(function(){
	rotation.showStars();
	$(".g9").css('height',$(".g9").width());
	$(".small-border").css('height',$(".small-border").width());
	$(".g9").css({'transform': 'rotate(-20deg)'});
	$(".middle").click(function(){
		if(rotation.n>0){
			rotation.rotate(5);
			rotation.n--;
		}else if(rotation.n<=0){
			$(".times").show();
		}
		$(".Time").html(rotation.n);
	})
	$(".close").click(function(){
		$(".dialog").hide();
	})
})
