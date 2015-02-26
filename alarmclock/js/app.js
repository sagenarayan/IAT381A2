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
var skydiscWidth = $('#skydisc').width();
var skydiscHeight = $('#skydisc').height();
if (skydiscWidth > skydiscHeight) {
	$('#skydisc').css({
	    'height': skydiscWidth + 'px'
	});
} else {
	$('#skydisc').css({
	    'width': skydiscHeight + 'px'
	});
}

var skydiscRotation = 0;
var skydisc = document.getElementById("skydisc");
var sd = new Hammer(skydisc);

sd.on("panleft", function(ev) {
	skydiscRotation--;
	console.log(skydiscRotation);
	skydisc.style.transform ="rotate("+skydiscRotation+"deg)";

	// if (skydiscRotation < (-10)) {
	// 	$('#tree').addClass("hatch");
	// 	console.log("test");
	// }

	if (skydiscRotation < 10) {
		$('#bird').removeClass("hatch");
		console.log("gone");
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

		if (skydiscRotation < 10) {
		$('#bird').removeClass("hatch");
		console.log("gone");
	}

});
// END SKYDISC/////////////////////////////////


