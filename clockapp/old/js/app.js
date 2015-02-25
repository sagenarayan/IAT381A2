
//it doesn't get much easier than this;)
Draggable.create("#knob", {type: "rotation", throwProps: true, onThrowComplete:function (){
  alert(this.rotation)
}});

$("#rotation").click(function(){
  alert(document.getElementById("knob")._gsTransform.rotation)
})


/* note this file loads 

TweenMax.min.js
Draggable.min.js
ThrowPropsPlugin.min.js (Club GreenSock bonus plugin for velocity-based tweens)

More info on Club GreenSock and other bonus plugins
http://www.greensock.com/club

*/