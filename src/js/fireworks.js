import '../sass/main.scss';
'use strict';
/*GET EVENT CLICK OR TAP FOR IPHONES*/
var click = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) ? 'touchstart' : 'click';
window.addEventListener('load', function () {
    f.load();
});


var f = {};
/*FUNCTION INITIALIZE*/
f.load = function (callback) {
    f.include();
    var close = document.querySelectorAll('[data-close]');
    if (close && close.length > 0)
        for (var i = 0; i < close.length; i++)
            close[i].addEventListener(click, function () {
                if (this.parentNode.parentNode.classList.contains('modal'))
                    f.toggleClass(this.parentNode.parentNode, 'show');
                else
                    this.parentNode.style.display = 'none';
            });
    var modals = document.querySelectorAll('.modal');
    if (modals && modals.length > 0)
        for (var i = 0; i < modals.length; i++)
            modals[i].addEventListener(click, function (e) {
                if (e.target == this) f.toggleClass(this, 'show');
            }, true);
    var dropdowns = document.querySelectorAll('.dropdown');
    if (dropdowns && dropdowns.length > 0)
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].querySelector('button').addEventListener(click, function () {
                f.toggleClass(this.parentNode.querySelector('.dropdown-menu'), 'visible');
            });
        }
    var dropups = document.querySelectorAll('.dropup-hover');
    if (dropups && dropups.length > 0)
        for (var i = 0; i < dropups.length; i++) {
            dropups[i].querySelector('button').addEventListener('mouseover', function () {
                this.parentNode.querySelector('.dropup-menu').style.setProperty('top',
                    '-' + this.parentNode.querySelector('.dropup-menu').clientHeight + 'px');
            });
        }
    dropups = document.querySelectorAll('.dropup');
    if (dropups && dropups.length > 0)
        for (var i = 0; i < dropups.length; i++) {
            dropups[i].querySelector('button').addEventListener(click, function () {
                f.toggleClass(this.parentNode.querySelector('.dropup-menu'), 'visible');
                f.css(this.parentNode.querySelector('.dropup-menu'), 'top',
                    '-' + this.parentNode.querySelector('.dropup-menu').clientHeight + 'px');
            });
        }
    var toggles = document.querySelectorAll('.navbar-toggler');
    if (toggles && toggles.length > 0)
        for (var i = 0; i < toggles.length; i++) {
            toggles[i].addEventListener(click, function () {
                f.toggleClass(this.parentNode.querySelector('.navbar-nav'), 'visible');
            });
        }
    var slideshows = document.querySelectorAll('.slideshow');
    if (slideshows && slideshows.length > 0)
        for (var i = 0; i < slideshows.length; i++) {
            if (slideshows[i].classList.contains('play')) f.carousel(slideshows[i], 2000);
            var prev = slideshows[i].querySelector('.control.prev');
            if (prev) prev.addEventListener(click, function () {
                var items = this.parentNode.querySelectorAll('.slide-item');
                var indexItem = 0;
                var l = items.length;
                for (var i = 0; i < l; i++)
                    if (items[i].classList.contains('active')) {
                        indexItem = i - 1;
                        items[i].classList.remove('active');
                    }
                if (indexItem == -1) indexItem = l - 1;
                items[indexItem].classList.add('active');
            });
            var next = slideshows[i].querySelector('.control.next');
            if (next) next.addEventListener(click, function () {
                var items = this.parentNode.querySelectorAll('.slide-item');
                var indexItem = 0;
                var l = items.length;
                for (var i = 0; i < l; i++)
                    if (items[i].classList.contains('active')) {
                        indexItem = i + 1;
                        items[i].classList.remove('active');
                    }
                if (indexItem == l) indexItem = 0;
                items[indexItem].classList.add('active');
            });
            var play = slideshows[i].querySelector('.control.play');
            if (play) play.addEventListener(click, function () {
                var time = this.parentNode.getAttribute('data-time');
                if (!time) time = 2000;
                this.parentNode.classList.toggle('play');
            });
            var indicators = slideshows[i].querySelectorAll('.slide-indicators .indicator');
            if (indicators && indicators.length > 0)
                for (var j = 0; j < indicators.length; j++) {
                    indicators[j].setAttribute('data-slide-to', j);
                    indicators[j].addEventListener(click, function () {
                        var goTo = this.getAttribute('data-slide-to');
                        var items = this.parentNode.parentNode.querySelectorAll('.slide-item');
                        var l = items.length;
                        for (var i = 0; i < l; i++)
                            if (items[i].classList.contains('active')) {
                                items[i].classList.remove('active');
                                this.parentNode.querySelectorAll('.indicator')[i].classList.remove('active');
                            }
                        this.classList.add('active');
                        items[goTo].classList.add('active');
                    })
                }
        }
    if (callback) callback();
};
/*FUNCTION FOR SLIDESHOW*/
f.carousel = function (slideshow, time) {
    if (slideshow.classList.contains('play')) {
        var items = slideshow.querySelectorAll('.slide-item');
        var indicators = slideshow.querySelectorAll('.indicator');
        var indexItem = 0;
        var l = items.length;
        for (var i = 0; i < l; i++) {
            if (items[i].classList.contains('active')) indexItem = i + 1;
            if (indicators && indicators.length > 0) indicators[i].classList.remove('active');
            items[i].classList.remove('active');
        }
        if (indexItem == l) indexItem = 0;
        items[indexItem].classList.add('active');
        if (indicators && indicators.length > 0) indicators[indexItem].classList.add('active');
        if (time && time != 0) {
            if (time == 'default') time = 2000;
            slideshow.setAttribute('data-time', time);
            setTimeout(function () {
                f.carousel(slideshow, time);
            }, time);
        }
    }
};
/*FUNCTIONS FOR GET & SET COOKIES*/
f.setCookie = function (name, val, exdays) {
    if (!(name && val)) return false;
    if (!exdays) exdays = 1;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + val + ';' + expires + ';path=/';
};
f.getCookie = function (name) {
    if (!name) return false;
    name = name + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    var l = cookieArray.length;
    for (var i = 0; i < l; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ')
            cookie = cookie.substring(1);
        if (cookie.indexOf(name) == 0) return cookie.substring(name.length, cookie.length);
    }
    return '';
};
/*FUNCTION FOR SELECT ELEMENTS*/
f.select = function (element) {
    if (!element) return null;
    if (element !== null && typeof element === 'object') {
        var l = element.length;
        if (l) return element;
        else return [element];
    } else return document.querySelectorAll(element);
}
/*TODO select parent, childs & return the element*/
/*TODO attr*/
/*FUNCTION FOR STYLE CSS*/
f.css = function (element, prop, val) {
    if (!(element && prop)) return false;
    var e = f.select(element);
    if (!val) return e[0].style.getPropertyValue(prop);
    var l = e.length;
    for (var i = 0; i < l; i++) {
        e[i].style.setProperty(prop, val);
    }
    return e;
};
/*FUNCTION SHOW, HIDE & TOGGLE*/
f.show = function (element) {
    var ret = f.css(element, 'display', 'block');
    return ret;
};
f.hide = function (element) {
    var ret = f.css(element, 'display', 'none');
    return ret;
};
f.toggleShow = function (element) {
    if (!element) return false;
    var e = f.select(element);
    var l = e.length;
    for (var i = 0; i < l; i++)
        if (e[i].style.getPropertyValue('display') == 'none') e[i].style.setProperty('display', 'block');
        else e[i].style.setProperty('display', 'none');
    return e;
};
/*FUNCTIONS FOR ADD, REMOVE & TOGGLE CLASS*/
f.addClass = function (element, c) {
    if (!(element && c)) return false;
    var e = f.select(element);
    var l = e.length;
    for (var i = 0; i < l; i++)
        e[i].classList.add(c);
    return e;
};
f.removeClass = function (element, c) {
    if (!(element && c)) return false;
    var e = f.select(element);
    var l = e.length;
    for (var i = 0; i < l; i++)
        e[i].classList.remove(c);
    return e;
};
f.toggleClass = function (element, c, forceGroup) {
    if (!(element && c)) return false;
    var e = f.select(element);
    var l = e.length;
    if (!forceGroup)
        for (var i = 0; i < l; i++)
            e[i].classList.toggle(c);
    else {
        if (e[0].classList.contains(c))
            for (var i = 0; i < l; i++)
                e[i].classList.remove(c);
        else
            for (var i = 0; i < l; i++)
                e[i].classList.add(c);
    }
    return e;
};
/*FUNCTION FILTER: DISPLAY ONLY MATCHED ELEMENTS*/
f.filter = function (element, filter) {
    var a, b, c, i, l1, ii, l2, iii, l3, found;
    a = f.select(element);
    l1 = a.length;
    filter = filter.toLowerCase();
    for (i = 0; i < l1; i++) {
        b = f.select(element + ' > *');
        l2 = b.length;
        for (ii = 0; ii < l2; ii++) {
            found = false;
            if (b[ii].innerHTML.toLowerCase().indexOf(filter) > -1) found = true;
            c = b[ii].getElementsByTagName('*');
            l3 = c.length;
            for (iii = 0; iii < l3; iii++)
                if (c[iii].innerHTML.toLowerCase().indexOf(filter) > -1) found = true;
            if (found) b[ii].style.display = '';
            else b[ii].style.display = 'none';
        }
    }
};
/*FUNCTION INCLUDE: INCLUDE EXTERNAL CONTENT IN DOM */
f.include = function (callback) {
    var all = document.querySelectorAll('[data-include]');
    var l = all.length;
    for (var i = 0; i < l; i++) {
        var element = all[i];
        var file = element.getAttribute('data-include');
        if (file) {
            var xhttp;
            if (window.XMLHttpRequest) xhttp = new XMLHttpRequest();
            else xhttp = new ActiveXObject('Microsoft.XMLHTTP');
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) element.innerHTML = this.responseText;
                    if (this.status == 404) element.innerHTML = '(Error 404:Page not found)';
                    element.removeAttribute('data-include');
                    f.include(callback);
                }
            }
            xhttp.open('GET', file, true);
            xhttp.send();
        }
    }
    if (callback) callback();
};
/*FUNCTION MD5*/
f.md5 = function (string) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = '',
            WordToHexValue_temp = '',
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = '0' + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}
//TODO make recursive methods like jquerys
