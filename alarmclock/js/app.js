//"Mountain Time"
//Visual Alarm Clock By Sage and Seb

//PRELOADER/////////////////////////////////////
$(document).ready(function(){
    console.log("started");
});

$(window).load(function(){
	setTimeout(function(){ 
		console.log("loaded");
		$( "#loader" ).fadeOut( 3000, function() {
		});
	 }, 1000);
    
    $('#alarmList').removeClass("hide");
    $('#setAlarm').removeClass("hide");
});


//ALARM SCREEN//////////////////////////////////
var skydiscA1Rotation = Math.random()*360;
var skydiscA2Rotation = Math.random()*360;
var skydiscA3Rotation = Math.random()*360;

var currentAlarm = 0;

var a1Armed = true;
var a2Armed = true;
var a3Armed = true;

var alarm1 = document.getElementById("alarm1");
var hpA1 = new Hammer.Manager(alarm1);

hpA1.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
hpA1.add( new Hammer.Tap({ event: 'singletap' }) );

hpA1.get('doubletap').recognizeWith('singletap');
hpA1.get('singletap').requireFailure('doubletap');

hpA1.on("singletap", function(ev) {
    a1Armed = !a1Armed;
	if (a1Armed) {
		$('#a1Armed').css({ 
		 	'opacity': "0"
		});
	} else {
		$('#a1Armed').css({ 
		 	'opacity': "0.9"
		});
	}
});
hpA1.on("doubletap", function(ev) {
    skydiscRotation = skydiscA1Rotation;
	fadeSetAlarmIn();
	currentAlarm = 1;
});


var alarm2 = document.getElementById("alarm2");
var hpA2 = new Hammer.Manager(alarm2);

hpA2.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
hpA2.add( new Hammer.Tap({ event: 'singletap' }) );

hpA2.get('doubletap').recognizeWith('singletap');
hpA2.get('singletap').requireFailure('doubletap');

hpA2.on("singletap", function(ev) {
    a2Armed = !a2Armed;
	if (a2Armed) {
		$('#a2Armed').css({ 
		 	'opacity': "0"
		});
	} else {
		$('#a2Armed').css({ 
		 	'opacity': "0.9"
		});
	}
});
hpA2.on("doubletap", function(ev) {
    skydiscRotation = skydiscA2Rotation;
	fadeSetAlarmIn();
	currentAlarm = 2;
});


var alarm3 = document.getElementById("alarm3");
var hpA3 = new Hammer.Manager(alarm3);

hpA3.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
hpA3.add( new Hammer.Tap({ event: 'singletap' }) );

hpA3.get('doubletap').recognizeWith('singletap');
hpA3.get('singletap').requireFailure('doubletap');

hpA3.on("singletap", function(ev) {
    a3Armed = !a3Armed;
	if (a3Armed) {
		$('#a3Armed').css({ 
		 	'opacity': "0"
		});
	} else {
		$('#a3Armed').css({ 
		 	'opacity': "0.9"
		});
	}
});
hpA3.on("doubletap", function(ev) {
    skydiscRotation = skydiscA3Rotation;
	fadeSetAlarmIn();
	currentAlarm = 3;
});


function fadeSetAlarmIn() {
	$('#setAlarm').removeClass("fadeOut");
	$('#setAlarm').addClass("animate fadeIn");
	$('#setAlarm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', showSetAlarm);
	$('#setAlarm').css({ 
	 	'visibility': "visible"
	});
	$('#skydisc-hammer-pad').css({ 
	 	'visibility': "visible"
	});
	$('#skydisc').css({ 
	 	'visibility': "visible",
	});
	$('#stars').css({ 
	 	'visibility': "visible",
	});
	$('#scenery').css({ 
	 	'visibility': "visible",
	});
	$('#sun').css({ 
	 	'visibility': "visible",
	});
	$('#moon').css({ 
	 	'visibility': "visible",
	});
	// console.log("fadeIn");
}

function showSetAlarm() {
	$('#setAlarm').css({ 
	 	'opacity': "1"
	});
}

//SCENERY///////////////////////////////////////
var sceneryArray = new Array();
for (var i = 0; i < 20; i++) {
	sceneryArray[i] = "img/scenery/scenery-" + i + ".png";
}
//END SCENERY///////////////////////////////////


//SKYDISC///////////////////////////////////////
window.onload = init;

window.setInterval(update, 1000/30);
 
function init() {
  disableDraggingFor(document.getElementById("skydisc-hammer-pad"));
}
 
function disableDraggingFor(element) {
  element.draggable = false;
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
});

sd.on("panright", function(ev) {
	skydiscAcceleration += skydiscAccelerationRate;
});

sd.on("doubletap", function(ev) {
	if (currentAlarm == 1) {
		skydiscA1Rotation = skydiscRotation;
	} else if (currentAlarm == 2) {
		skydiscA2Rotation = skydiscRotation;
	} else if (currentAlarm == 3) {
		skydiscA3Rotation = skydiscRotation;
	}

	updateAlarmScreen();

	
	$('#setAlarm').addClass("animate fadeOut");
	$('#setAlarm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', hideSetAlarm);
	
});

function hideSetAlarm() {
	$('#setAlarm').removeClass("fadeIn");
	$('#setAlarm').css({ 
	 	'visibility': "hidden",
	 	'opacity': "0"
	});
	$('#skydisc-hammer-pad').css({ 
	 	'visibility': "hidden",
	});
	$('#skydisc').css({ 
	 	'visibility': "hidden",
	});
	$('#stars').css({ 
	 	'visibility': "hidden",
	});
	$('#scenery').css({ 
	 	'visibility': "hidden",
	});
	$('#sun').css({ 
	 	'visibility': "hidden",
	});
	$('#moon').css({ 
	 	'visibility': "hidden",
	});
}

function update() {
	// console.log("updating");
	if ((skydiscAcceleration > 0 && skydiscAcceleration < 0.05) || (skydiscAcceleration < 0 && skydiscAcceleration > -0.05)) {
		skydiscAcceleration = 0;
		// console.log("end rotation");
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
	 	'margin-top': sunHeightPercentage * ($(window).height() * 0.01) + ($(window).height() / 100)
	 });
	 

	 //Move Moon
	 var moonHeightPercentage = ((-15)*Math.sin((skydiscRotationShifted/90) -0.5)) + 15;
	 $('#moon').css({ 
	 	'margin-left': ((skydiscRotationShifted - 120)/2)/100 * $(window).width() + $(window).width()/20,
	 	'margin-top': moonHeightPercentage * ($(window).height() * 0.01) + ($(window).height() / 70)
	 });

	 //CHECK TIME
	 var secondsString = (((skydiscRotation - 12 + 360)%360)*240).toString();
	 console.log(secondsString.toHHMMSS());
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
	 	'margin-top': sunHeightA1Percentage * ($(window).height() * 0.01) + ($(window).height() / 100)
	 });

	var moonHeightPercentage = ((-15)*Math.sin((skydiscA1RotationShifted/90) -0.5)) + 15;
	$('#moonA1').css({ 
		'margin-left': ((skydiscA1RotationShifted - 120)/2)/100 * $(window).width() + $(window).width()/20,
		'margin-top': moonHeightPercentage * ($(window).height() * 0.01) + ($(window).height() / 70)
	});

	// console.log($(window).width()/3);

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
	 	'margin-top': sunHeightA2Percentage * ($(window).height() * 0.01) + ($(window).height() / 100)
	 });

	var moonHeightPercentage = ((-15)*Math.sin((skydiscA2RotationShifted/90) -0.5)) + 15;
	$('#moonA2').css({ 
		'margin-left': ((skydiscA2RotationShifted - 120)/2)/100 * $(window).width() + $(window).width()/20 - $(window).width()/3,
		'margin-top': moonHeightPercentage * ($(window).height() * 0.01) + ($(window).height() / 70)
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
	 	'margin-top': sunHeightA3Percentage * ($(window).height() * 0.01) + ($(window).height() / 100)
	 });

	var moonHeightPercentage = ((-15)*Math.sin((skydiscA3RotationShifted/90) -0.5)) + 15;
	$('#moonA3').css({ 
		'margin-left': ((skydiscA3RotationShifted - 120)/2)/100 * $(window).width() + $(window).width()/20 - ($(window).width()/3)*2,
		'margin-top': moonHeightPercentage * ($(window).height() * 0.01) + ($(window).height() / 70)
	});

}
// END SKYDISC/////////////////////////////////

//CREDIT: http://stackoverflow.com/a/6313008
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

