function isFunction(v){return (typeof v === 'function');}
function isObject(v){return (typeof v === 'object');}
function isUndefined(v){return (typeof v === 'undefined');}
function isNumber(v){return (typeof v === 'number');}
function isString(v){return (typeof v === 'string');}
function isSymbol(v){return (typeof v === 'symbol');}
function typeOf(v){return typeof v;}

var $ = function(e){
	var nl = document.querySelectorAll(e);
	if(typeof e === 'string') nl._filter = e;
	return nl;
};

NodeList.prototype.filter=function(e){
	if(!e) return null;
	if ((typeof e === 'string') && this._filter) return $(`${this._filter} ${e}`);
	return e;
}
//$('div').filter('a');
NodeList.prototype.attr=function(a,v){
	if(!a || typeof a !== 'string') return null;
	return this.forEach(function(e){e.setAttribute(a,v)});
	return this[0].getAttribute(a);
}
$('a span').attr('class');

NodeList.prototype.on=function(ev,f,c){
	if((!ev || typeof ev !== 'string') && !f || typeof f !== 'function') return null;
	c = c || null;
	this.forEach(function(e){e.addEventListener(ev,f,c)});
	return this;
}
NodeList.prototype.off=function(ev,f){
	if((!ev || typeof ev !== 'string') && !f || typeof f !== 'function') return null;
	this.forEach(function(e){e.removeEventListener(ev,f)});
	return this;
}
