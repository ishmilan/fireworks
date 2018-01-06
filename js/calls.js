document.getElementById("menuButton").onclick=muestraMenu;
document.getElementById("footerButton").onclick=muestraFooter;
function muestraMenu() {
	display('menu');
}
function muestraFooter() {
	display('footer');
}
document.getElementById("btn-icomoon").onclick=muestraIcomoon;
document.getElementById("btn-feather").onclick=muestraFeather;
document.getElementById("btn-glyphicon").onclick=muestraGlyphicon;
document.getElementById("btn-fontawesome").onclick=muestraFontawesome;
function muestraIcomoon() {
	toggle('#container-icomoon','hidden');
}
function muestraFeather() {
	toggle('#container-feather','hidden');
}
function muestraGlyphicon() {
	toggle('#container-glyphicons','hidden');
}
function muestraFontawesome() {
	toggle('#container-fontawesome','hidden');
}
imgTransition("imgContainer01",2);
imgTransition("imgContainer02",3);
