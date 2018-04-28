var FAVICON_GRABBER = 'https://www.google.com/s2/favicons?domain='; // 'http://favicon.yandex.net/favicon/'
var QUERY = '#res div.g h3 > a';

/**
 * @param {NodeList} links
 */
function add_favicons_to(links) {
	for (var i = 0; i < links.length; ++i) {
		if (links[i].firstChild.className === 'favicon')
			continue;

		var host = (links[i].getAttribute('data-href') || links[i].href).replace(/.*https?:\/\//, '').replace(/\/.*$/,'');
		var img = links[i].insertBefore(document.createElement('img'), links[i].firstChild);
		img.className = 'favicon';
		img.src = FAVICON_GRABBER + host;
		img.width = '16';
		img.height = '16';
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

document.addEventListener('DOMNodeInserted', debounce(function handleNewFavicons(event){
		if (event.target.className !== 'favicon')
			add_favicons_to(document.querySelectorAll(QUERY));
	}, 500)
, false);