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


	if (skydiscRotation < (0)) {
		$('#tree').addClass("hatch");
		console.log("test");
	}

	if (skydiscRotation < 10) {
		$('#bird').removeClass("hatch");
		console.log("gone");
<<<<<<< HEAD
=======
	}

	if (skydiscRotation < (-10)) {
		$('#tree').addClass("hatch");

>>>>>>> fab7c91e35c88eb8345e32de35f933b99e671d3d
	}



});

sd.on("panright", function(ev) {
	skydiscAcceleration += skydiscAccelerationRate;
	rotateSkydisc();

	if (skydiscRotation > 10) {
		$('#bird').addClass("hatch");
	}

		if (skydiscRotation < 10) {
		$('#bird').removeClass("hatch");
		console.log("gone");
	}

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

	var sceneryIndex = Math.floor(skydiscRotation/18);
	$("#scenery").attr("src", sceneryArray[sceneryIndex]);
// 	$("#clone_el").css("z-index",2);
// ele = $("#clone_el").clone().css({position:"relative","top":"-"+$("#clone_el").eq(0).height()+"px","z-index":"1"}).attr("src","/path/to/new/src");
// $("#clone_el").after(ele).fadeOut();

	// console.log(skydiscRotation + " " + skydiscAcceleration);
}

 function rotateSkydisc() {
// 	skydisc.style.transform ="rotate("+skydiscRotation+"deg)";
 }
// END SKYDISC/////////////////////////////////


