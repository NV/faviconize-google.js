var FAVICON_GRABBER = 'http://www.google.com/s2/favicons?domain='; // 'http://favicon.yandex.net/favicon/'
var QUERY = '#res li.g h3 a, #res > div.g > a';

/**
 * @param {NodeList} links
 */
function add_favicons_to(links) {
	for (var i=0; i<links.length; i++) {
		if (links[i].firstChild.className != 'favicon') {
			var host = links[i].href.replace(/.*https?:\/\//, '').replace(/\/.*$/,'');
			var img = document.createElement('IMG');
			img.src = FAVICON_GRABBER + host;
			img.width = '16';
			img.height = '16';
			img.className = 'favicon';
			links[i].insertBefore(img, links[i].firstChild);
		}
	}
}

add_favicons_to(document.querySelectorAll(QUERY));

/**
 * Debounce function from http://code.google.com/p/jquery-debounce/
 */
function debounce(fn, timeout, invokeAsap, context) {
	if (arguments.length == 3 && typeof invokeAsap != 'boolean') {
		context = invokeAsap;
		invokeAsap = false;
	}
	var timer;
	return function() {
		var args = arguments;
		if(invokeAsap && !timer) {
			fn.apply(context, args);
		}
		clearTimeout(timer);
		timer = setTimeout(function() {
			if(!invokeAsap) {
				fn.apply(context, args);
			}
			timer = null;
		}, timeout);
	};
}

document.body.addEventListener('DOMNodeInserted', debounce(function handleNewFavicons(event){
		if (event.target.className != 'favicon') {
			add_favicons_to(document.querySelectorAll(QUERY));
		}
	}, 500)
, false);