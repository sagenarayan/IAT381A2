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
 
function init() {
  disableDraggingFor(document.getElementById("skydisc"));
  // disableDraggingFor(document.getElementById("element name"));
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
var skydisc = document.getElementById("skydisc");
var sd = new Hammer(skydisc);

sd.on("panleft", function(ev) {
	skydiscRotation--;
	console.log(skydiscRotation);
	skydisc.style.transform ="rotate("+skydiscRotation+"deg)";

	if (skydiscRotation < (-10)) {
		$('#tree').addClass("hatch");
		console.log("test");
	}
});

sd.on("panright", function(ev) {
	skydiscRotation++;
	console.log(skydiscRotation);
	skydisc.style.transform ="rotate("+skydiscRotation+"deg)";

	if (skydiscRotation > 10) {
		$('#bird').addClass("hatch");
		console.log("test");
	}
});
// END SKYDISC/////////////////////////////////


