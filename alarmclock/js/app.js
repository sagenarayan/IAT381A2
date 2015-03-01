// SAMPLE CODE//////////////////////////////////
// var myElement = document.getElementById('myElement');

// // create a simple instance
// // by default, it only adds horizontal recognizers
// var mc = new Hammer(myElement);

// // listen to events...
// mc.on("panleft panright tap press", function(ev) {
//     myElement.textContent = ev.type +" gesture detected.";
// });
// END SAMPLE CODE//////////////////////////////


$(document).ready(function() {
	// setTimeout(function(){
	// $('body').addClass('visible');
	console.log("ready");
	// }, 3000);
});

// var supportsOrientationChange = "onorientationchange" in window,
//     orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

// window.addEventListener(orientationEvent, function() {
// 	window.scrollTo(0, 1);
// }, false);


//ALARM SCREEN//////////////////////////////////
var skydiscA1Rotation = Math.random()*360;
var skydiscA2Rotation = Math.random()*360;
var skydiscA3Rotation = Math.random()*360;

$("#alarm1").click(function() {
	skydiscRotation = skydiscA1Rotation;
	$('#setAlarm').addClass("animate fadeIn");
	$('#setAlarm').css({ 
	 	'visibility': "visible"
	});
});

$("#alarm2").click(function() {
	skydiscRotation = skydiscA2Rotation;
	$('#setAlarm').addClass("animate fadeIn");
	$('#setAlarm').css({ 
	 	'visibility': "visible"
	});
});

$("#alarm3").click(function() {
	skydiscRotation = skydiscA3Rotation;
	$('#setAlarm').addClass("animate fadeIn");
	$('#setAlarm').css({ 
	 	'visibility': "visible"
	});
});
////////////////////////////////////////////////

//SCENERY///////////////////////////////////////
var sceneryArray = new Array();
for (var i = 0; i < 20; i++) {
	sceneryArray[i] = "img/scenery/scenery-" + i + ".png";
}
//END SCENERY///////////////////////////////////


//SKYDISC///////////////////////////////////////
// $(window).resize(function () {
// 	var skydiscWidth = $('#skydisc').width();
// 	var skydiscHeight = $('#skydisc').height();
// 	if (skydiscWidth > skydiscHeight) {
// 		$('#skydisc').css({
// 			// "width": window.innerWidth
// 		    'height': skydiscWidth + 'px'
		    
// 		});
// 	} else {
// 		$('#skydisc').css({
// 			// "height": window.innerHeight
// 		    'width': skydiscHeight + 'px'

// 		});
// 	}
// });

window.onload = init;

window.setInterval(update, 1000/30);
 
function init() {
  disableDraggingFor(document.getElementById("skydisc-hammer-pad"));
}
 
function disableDraggingFor(element) {
  // this works for FireFox and WebKit in future according to http://help.dottoro.com/lhqsqbtn.php
  element.draggable = false;
  // this works for older web layout engines
  element.onmousedown = function(event) {
    event.preventDefault();
    return false;
  };
}


var skydiscRotation = 0;
var skydiscAcceleration = 0;
var skydiscFriction = 0.92;
var skydiscAccelerationRate = 0.2;
var skydisc = document.getElementById("skydisc");
var skydiscHammerPad = document.getElementById("skydisc-hammer-pad");
var sd = new Hammer(skydiscHammerPad);

sd.on("panleft", function(ev) {
	skydiscAcceleration -= skydiscAccelerationRate;
	rotateSkydisc();
});

sd.on("panright", function(ev) {
	skydiscAcceleration += skydiscAccelerationRate;
	rotateSkydisc();
});

function update() {
	// console.log("updating");
	if ((skydiscAcceleration > 0 && skydiscAcceleration < 0.05) || (skydiscAcceleration < 0 && skydiscAcceleration > -0.05)) {
		skydiscAcceleration = 0;
		console.log("end rotation");
	} else {
		skydiscAcceleration *= skydiscFriction;
	}

	skydiscRotation += skydiscAcceleration;
	skydisc.style.transform ="rotate("+skydiscRotation+"deg)";
	skydisc.style.transform ="-webkit-rotate("+skydiscRotation+"deg)";
	skydisc.style.transform ="-moz-rotate("+skydiscRotation+"deg)";

	if (skydiscRotation >= 360) {
		skydiscRotation -= 360;
	} else if (skydiscRotation < 0) {
		skydiscRotation += 360;
	}

	if (skydiscAcceleration > 10) {
		skydiscAcceleration = 10;
	}

	var skydiscRotationShifted = skydiscRotation + 180;
	if (skydiscRotationShifted >= 360) {
	 	skydiscRotationShifted -= 360;
	}

	//Change Scenery
	var sceneryIndex = Math.floor(skydiscRotation/18);
	$("#scenery").attr("src", sceneryArray[sceneryIndex]);

	//Stars
	var starHeightPercentage = ((-5)*Math.sin((skydiscRotationShifted/180) - 0.5));
	$('#stars').css({ 
		'opacity': (Math.abs(skydiscRotation - 180)-90)/90,
		'margin-left': skydiscRotationShifted - ($(window).width()/4),	//(skydiscRotationShifted)/($(window).width()/22) - 25 + "%",
		'margin-top': -skydiscRotationShifted/2 //+ ($(window).width()/16)
	});
	
	//Move Sun
	var sunHeightPercentage = ((-15)*Math.sin((skydiscRotation/90) -0.5)) + 10;
	 $('#sun').css({ 
	 	'margin-left': ((skydiscRotation - 120)/2)/100 * $(window).width() + $(window).width()/20,// + "%",
	 	'margin-top': sunHeightPercentage * ($(window).width() * 0.01)
	 });
	 

	 //Move Moon
	 var moonHeightPercentage = ((-15)*Math.sin((skydiscRotationShifted/90) -0.5)) + 15;
	 $('#moon').css({ 
	 	'margin-left': ((skydiscRotationShifted - 120)/2)/100 * $(window).width() + $(window).width()/20,
	 	'margin-top': moonHeightPercentage * ($(window).width() * 0.01)
	 });

	 console.log(moonHeightPercentage);

	//Owl
	if (skydiscRotation > 315 || skydiscRotation < 45) {
		$('#owl').addClass("hatch");
		$('#owl').removeClass("fadeOut");
	} else {
		$('#owl').removeClass("hatch");
		$('#owl').addClass("fadeOut");
	}

	 // console.log((skydiscRotationShifted - 100)/2);

// 	$("#clone_el").css("z-index",2);
// ele = $("#clone_el").clone().css({position:"relative","top":"-"+$("#clone_el").eq(0).height()+"px","z-index":"1"}).attr("src","/path/to/new/src");
// $("#clone_el").after(ele).fadeOut();

	// console.log(skydiscRotation + " " + skydiscAcceleration);
}

updateAlarmScreen();

function updateAlarmScreen() {
	var skydiscA1RotationShifted = skydiscA1Rotation + 180;
	if (skydiscA1RotationShifted >= 360) {
	 	skydiscA1RotationShifted -= 360;
	}

	var skydisc1 = document.getElementById("skydiscA1");
	skydisc1.style.transform ="rotate("+skydiscA1Rotation+"deg)";
	skydisc1.style.transform ="-webkit-rotate("+skydiscA1Rotation+"deg)";
	skydisc1.style.transform ="-moz-rotate("+skydiscA1Rotation+"deg)";

	var sceneryIndex = Math.floor(skydiscA1Rotation/18);
	$("#alarm1").attr("background", "url(" + sceneryArray[sceneryIndex] + ")");
	$('#alarm1').css({ 
	 	'background-image': "url(" + sceneryArray[sceneryIndex] + ")"
	 });

	var starHeightPercentage = ((-5)*Math.sin(((skydiscA1RotationShifted)/180) - 0.5));
	$('#starsA1').css({ 
		'opacity': (Math.abs(skydiscA1Rotation - 180)-90)/90,
		'margin-left': (skydiscA1RotationShifted) - ($(window).width()/4),// - ($(window).width()/3),
		'margin-top': (-skydiscA1RotationShifted / 2) //+ ($(window).width()/16)
	});

	var sunHeightA1Percentage = ((-15)*Math.sin((skydiscA1Rotation/90) -0.5)) + 10;
	 $('#sunA1').css({ 
	 	'margin-left': ((skydiscA1Rotation - 120)/2)/100 * $(window).width() + $(window).width()/20,// + "%",
	 	'margin-top': sunHeightA1Percentage * ($(window).width() * 0.01)
	 });

	var moonHeightPercentage = ((-15)*Math.sin((skydiscA1RotationShifted/90) -0.5)) + 15;
	$('#moonA1').css({ 
		'margin-left': ((skydiscA1RotationShifted - 120)/2)/100 * $(window).width() + $(window).width()/20,
		'margin-top': moonHeightPercentage * ($(window).width() * 0.01)
	});

	console.log($(window).width()/3);


	var skydiscA2RotationShifted = skydiscA2Rotation + 180;
	if (skydiscA2RotationShifted >= 360) {
	 	skydiscA2RotationShifted -= 360;
	}

	var skydisc2 = document.getElementById("skydiscA2");
	skydisc2.style.transform ="rotate("+skydiscA2Rotation+"deg)";
	skydisc2.style.transform ="-webkit-rotate("+skydiscA2Rotation+"deg)";
	skydisc2.style.transform ="-moz-rotate("+skydiscA2Rotation+"deg)";

	var sceneryIndex = Math.floor(skydiscA2Rotation/18);
	$("#alarm2").attr("background", "url(" + sceneryArray[sceneryIndex] + ")");
	$('#alarm2').css({ 
	 	'background-image': "url(" + sceneryArray[sceneryIndex] + ")"
	 });

	var starHeightPercentage = ((-5)*Math.sin(((skydiscA2RotationShifted)/180) - 0.5));
	$('#starsA2').css({ 
		'opacity': (Math.abs(skydiscA2Rotation - 180)-90)/90,
		'margin-left': (skydiscA2RotationShifted) - ($(window).width()/4) -  ($(window).width()/3),// - ($(window).width()/3),
		'margin-top': (-skydiscA2RotationShifted / 2) //+ ($(window).width()/16)
	});

	var sunHeightA2Percentage = ((-15)*Math.sin((skydiscA2Rotation/90) -0.5)) + 10;
	 $('#sunA2').css({ 
	 	'margin-left': ((skydiscA2Rotation - 120)/2)/100 * $(window).width() + $(window).width()/20 - $(window).width()/3,// + "%",
	 	'margin-top': sunHeightA2Percentage * ($(window).width() * 0.01)
	 });

	var moonHeightPercentage = ((-15)*Math.sin((skydiscA2RotationShifted/90) -0.5)) + 15;
	$('#moonA2').css({ 
		'margin-left': ((skydiscA2RotationShifted - 120)/2)/100 * $(window).width() + $(window).width()/20 - $(window).width()/3,
		'margin-top': moonHeightPercentage * ($(window).width() * 0.01)
	});


	var skydiscA3RotationShifted = skydiscA3Rotation + 180;
	if (skydiscA3RotationShifted >= 360) {
	 	skydiscA3RotationShifted -= 360;
	}

	var skydisc3 = document.getElementById("skydiscA3");
	skydisc3.style.transform ="rotate("+skydiscA3Rotation+"deg)";
	skydisc3.style.transform ="-webkit-rotate("+skydiscA3Rotation+"deg)";
	skydisc3.style.transform ="-moz-rotate("+skydiscA3Rotation+"deg)";

	var sceneryIndex = Math.floor(skydiscA3Rotation/18);
	$("#alarm3").attr("background", "url(" + sceneryArray[sceneryIndex] + ")");
	$('#alarm3').css({ 
	 	'background-image': "url(" + sceneryArray[sceneryIndex] + ")"
	 });

	var starHeightPercentage = ((-5)*Math.sin(((skydiscA3RotationShifted)/180) - 0.5));
	$('#starsA3').css({ 
		'opacity': (Math.abs(skydiscA3Rotation - 180)-90)/90,
		'margin-left': (skydiscA3RotationShifted) - ($(window).width()/4) - 2*($(window).width()/3),// - ($(window).width()/3),
		'margin-top': (-skydiscA3RotationShifted / 2) //+ ($(window).width()/16)
	});

	var sunHeightA3Percentage = ((-15)*Math.sin((skydiscA3Rotation/90) -0.5)) + 10;
	 $('#sunA3').css({ 
	 	'margin-left': ((skydiscA3Rotation - 120)/2)/100 * $(window).width() + $(window).width()/20 - ($(window).width()/3)*2,// + (2*$(window).width()/3),// + "%",
	 	'margin-top': sunHeightA3Percentage * ($(window).width() * 0.01)
	 });

	var moonHeightPercentage = ((-15)*Math.sin((skydiscA3RotationShifted/90) -0.5)) + 15;
	$('#moonA3').css({ 
		'margin-left': ((skydiscA3RotationShifted - 120)/2)/100 * $(window).width() + $(window).width()/20 - ($(window).width()/3)*2,
		'margin-top': moonHeightPercentage * ($(window).width() * 0.01)
	});

}

 function rotateSkydisc() {
// 	skydisc.style.transform ="rotate("+skydiscRotation+"deg)";
 }
// END SKYDISC/////////////////////////////////


