function display(item1){
	if (document.getElementById(item1).style.display == "block"){
		document.getElementById(item1).style.display = "none";
	} else {
		document.getElementById(item1).style.display = "block";
	}
};
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