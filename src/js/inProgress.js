function isFunction(v){return (typeof v === 'function');}
function isObject(v){return (typeof v === 'object');}
function isUndefined(v){return (typeof v === 'undefined');}
function isNumber(v){return (typeof v === 'number');}
function isString(v){return (typeof v === 'string');}
function isSymbol(v){return (typeof v === 'symbol');}
function typeOf(v){return typeof v;}

var $ = function(e) {
	var nl = document.querySelectorAll(e);
	if(typeof e === 'string') nl._filter = e;
	return nl;
};
NodeList.prototype.filter = function(e){
	if(!e) return null;
	if ((typeof e === 'string') && this._filter) return $(`${this._filter} ${e}`);
	return e;
};

NodeList.prototype.closest=function(e){
	if (!e || typeof e !== 'string') return null;
	if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
	if (!Element.prototype.closest) Element.prototype.closest = function(selector) {
		var el = this;
		while (el) {
			if (el.matches(selector)) {
				return el;
			}
			el = el.parentElement;
		}
	};
	var parents = [];
	this.forEach(function(i){
		parents.push(i.closest(e));
	});
	return parents;
};

//$('div').filter('a');
NodeList.prototype.attr=function(a,v){
	if(!a || typeof a !== 'string') return null;
	return this.forEach(function(e){e.setAttribute(a,v)});
	return this[0].getAttribute(a);
};
$('a span').attr('class');

NodeList.prototype.on=function(ev,f,c){
	if((!ev || typeof ev !== 'string') && !f || typeof f !== 'function') return null;
	c = c || null;
	this.forEach(function(e){e.addEventListener(ev,f,c)});
	return this;
};
NodeList.prototype.off=function(ev,f){
	if((!ev || typeof ev !== 'string') && !f || typeof f !== 'function') return null;
	this.forEach(function(e){e.removeEventListener(ev,f)});
	return this;
};


/*
// function event
self = {

    // Add a callback or a collection of callbacks to the list
    add: function() {
        if ( list ) {

            // If we have memory from a past run, we should fire after adding
            if ( memory && !firing ) {
                firingIndex = list.length - 1;
                queue.push( memory );
            }

            ( function add( args ) {
                jQuery.each( args, function( _, arg ) {
                    if ( isFunction( arg ) ) {
                        if ( !options.unique || !self.has( arg ) ) {
                            list.push( arg );
                        }
                    } else if ( arg && arg.length && toType( arg ) !== "string" ) {

                        // Inspect recursively
                        add( arg );
                    }
                } );
            } )( arguments );

            if ( memory && !firing ) {
                fire();
            }
        }
        return this;
    }
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}



    // Implementation
    on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
*/