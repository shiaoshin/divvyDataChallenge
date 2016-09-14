/*Divvy Data Challenge*/
function easeInOutBack(t, b, c, d, s) {
	// t: current time, b: begInnIng value, c: change In value, d: duration
	if (s == undefined) s = 1.3; 
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}

$(function(){

	////Initialize////
	var hScroll;
	var pageW;
	var ratio;
	var calcEase;
	arrDisplay();
	$(window).scrollLeft("0");
	$("#ref1,#ref2,#ref3").hide();
	
	////Arrow display////
	function arrDisplay(){
		ratio = getRatio();
		if(ratio < 15){
			$("#leftArrow").hide();
		}else if(ratio > 75){
			$("#rightArrow").hide();
		}else{
			$("#rightArrow").show();
			$("#leftArrow").show();
		}
	}
	
	////Turn mouse scroll into horizontal////
	$("body, html").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 50);
		event.preventDefault();
	});
	
	////Track horizontal movement////
	$(window).scroll(function(){
		arrDisplay();
		ratio = getRatio();
		$("#display").html(ratio+"%");
		
		//move da bike, & da intro back//
		$("#bike").css({"left":ratio*1.1+"vw"});
		
		//move theme//
		theme(ratio);
		
		//limit scroll//
		if(ratio>=80){$(window).scrollLeft(80*pageW/100)};
	});
	
	////Ratio Transition////
	function theme(ratio){
		if(ratio<16){
			calcEase = easeInOutBack(ratio,40,55,16,1.1);
			$(".introduction").css({"top":calcEase+"vh","background-position":"center "+(40-calcEase)+"vh"});
		}
		if(ratio>10 && ratio<16){
			calcEase = easeInOutBack(ratio-10,85,-55,6);
			$(".financial").css({"top":calcEase+"vh"});
		}
		if(ratio>16 && ratio<24){$(".financial").css({"top":"30vh"})};
		if(ratio>24 && ratio<30){
			calcEase = easeInOutBack(ratio-24,30,55,6);
			$(".financial").css({"top":calcEase+"vh"});
		}
		
		if(ratio>30 && ratio<36){
			calcEase = easeInOutBack(ratio-30,85,-55,6);
			$(".health").css({"top":calcEase+"vh"});
		}
		if(ratio>36 && ratio<44){$(".health").css({"top":"30vh"})};
		if(ratio>44 && ratio<50){
			calcEase = easeInOutBack(ratio-44,30,55,6);
			$(".health").css({"top":calcEase+"vh"});
		}
		
		if(ratio>50 && ratio<56){
			calcEase = easeInOutBack(ratio-50,85,-55,6);
			$(".environment").css({"top":calcEase+"vh"});
		}
		if(ratio>56 && ratio<64){$(".environment").css({"top":"30vh"})};
		if(ratio>64 && ratio<70){
			calcEase = easeInOutBack(ratio-64,30,55,6);
			$(".environment").css({"top":calcEase+"vh"});
		}
		if(ratio >=19 && ratio <39){
			$("#ref2,#ref3").fadeOut(300,function(){
				$("#ref1").fadeIn(300);
			});
		}else if(ratio >=39 && ratio <59){
			$("#ref1,#ref3").fadeOut(300,function(){
				$("#ref2").fadeIn(300);
			});
		}else if(ratio >=59 && ratio <79){
			$("#ref1,#ref2").fadeOut(300,function(){
				$("#ref3").fadeIn(300);
			});	
		}else{
			$("#ref1,#ref2,#ref3").fadeOut(300);
		}
	}
	
	////Get position/////
	function getRatio(){
		hScroll = $(window).scrollLeft();
		pageW = $(".row").width();
		return Math.round(hScroll/pageW*1000)/10;
	}
	
	////Arrow buttons////
	$("#leftArrow").click(function(){
		if(getRatio()%20 == 0){
			var targetPos = 20*(Math.floor(getRatio()/20)-1);
		}else{
			var targetPos = 20*(Math.floor(getRatio()/20));
		}
		slider(targetPos);
	});
	$("#rightArrow").click(function(){
		if(getRatio()%20 == 0){
			var targetPos = 20*(Math.ceil(getRatio()/20)+1);
		}else{
			var targetPos = 20*(Math.ceil(getRatio()/20));
		}
		slider(targetPos);
	});
	
	////Nav buttons////
	
	$("#nav1").click(function(){slider(0)});
	$("#nav2").click(function(){slider(20)});
	$("#nav3").click(function(){slider(40)});
	$("#nav4").click(function(){slider(60)});
	$("#nav5").click(function(){slider(80)});
	
	////Side Transitions////
	var dt = 0.1;
	var incre;
	function slider(goal){
		$("#leftArrow,#rightArrow").css("visibility","hidden");
		var current = getRatio();
		var steps = Math.round(Math.abs(goal-current)/dt);
		var step = 0;
		//alert("current: "+current+"\n goal: "+goal+"\n steps: "+steps+"\n increment: "+(easeInOutBack(0,current,(goal-current),steps)/steps));
		var sliding = setInterval(function(){
			if(step == steps){
				$(window).scrollLeft(goal*pageW/100);
				clearInterval(sliding);
				$("#leftArrow,#rightArrow").css("visibility","visible");
				arrDisplay();
			}else{
				incre = easeInOutBack(step,current,(goal-current),steps,0);
				$(window).scrollLeft(incre*pageW/100);
				step++;
			}
		},3);
	}
});