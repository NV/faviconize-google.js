// ==UserScript==
// @name         Faviconize Google (nested icons)
// @namespace    http://userscripts.ru/js/faviconize-google/
// @description  Adds favicons to each link offered by Google search results.
// @include      http://www.google.*/search?*
// @include      http://www.google.*/webhp*
// @include      http://www.google.*/#*
// @include      http://groups.google.*/groups/search?* 
// @copyright    2009+, Nikita Vasilyev (http://userscripts.org/scripts/show/58177)
// @version      1.5
// @licence      Apache 2.0
// ==/UserScript==


(function(){

  var FAVICON_GRABBER = 'http://www.google.com/s2/favicons?domain='; // 'http://favicon.yandex.net/favicon/'
  var CSS = ".favicon {padding-right:4px; vertical-align:middle; border:none;}\
     #res .favicon {left:0; position:absolute; top:2px; z-index:9}\
     li.g, div.g {position:relative; padding-left:20px}";
  var QUERY = '#res li.g h3 a, #res > div.g > a';

  var links = document.querySelectorAll(QUERY);

  /**
   * Add favicons to links
   * @param links NodeList or Array of Elements
   */
  function add_favicons_to(links) {
    for (var i=0; i<links.length; i++) {
      if (links[i].firstChild.tagName != 'IMG') {
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

  add_favicons_to(links);

  if (typeof GM_addStyle == 'undefined') {
    /**
     * @param css String like '* {color:red}'
     */
    function GM_addStyle(css) {
      var head = document.getElementsByTagName('head')[0];
      if (head) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
      }
    }
  }

  GM_addStyle(CSS);

  /**
   * Must match:
   *   http://www.google.com/#hl=en&source=hp&q=js
   *   http://www.google.com/webhp?hl=en#hl=en&source=hp&q=js
   */
  if (/google.\w+\/(webhp.*)?(#.*)?$/.test(location.href)) {
    document.body.addEventListener('DOMNodeInserted', function(event){
      if (event.relatedNode.id == 'rso') {
        links = document.querySelectorAll(QUERY);
        add_favicons_to(links);
      }
    }, false);
  }
  
})();
