"use strict";
var fw = {};
fw.setCookie = function(name, value, exdays){
	if(!(name && value)) return false;
	if(!exdays) exdays=1;
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function display(item1){
	if (document.getElementById(item1).style.display == "block"){
		document.getElementById(item1).style.display = "none";
	} else {
		document.getElementById(item1).style.display = "block";
	}
};
function toggle(element,nameOfClass){
	if(!(element && nameOfClass)) return false;
	var e = document.querySelectorAll(element);
	if(!e) return false;
	var length = e.length;
	for (var i = 0; i < length; i++) {
		e[i].classList.toggle(nameOfClass);
	}
	return true;
}
function imgTransition(id,time){
	var slideIndex =0;
	slideImg();
	function slideImg() {
		var imgs = document.getElementById(id).getElementsByTagName('img');
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.display = "none";
		}
		slideIndex++;
		if (slideIndex > imgs.length) {slideIndex = 1}
		imgs[slideIndex-1].style.display = "block";
		setTimeout(slideImg,time*1000);
	}
};
window.addEventListener("load",function(){
	var close = document.querySelectorAll("[data-close]");
	for (var i = 0; i < close.length; i++) {
		close[i].addEventListener("click",function(){
			this.parentNode.style.display="none";
		});
	}
});
