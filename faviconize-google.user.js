// ==UserScript==
// @name           Faviconize Google (nested icons)
// @namespace      http://userscripts.ru/js/faviconize-google/
// @description    Adds favicons to each link offered by Google search results.
//                 Based on FaviconizeGoogle script by joeytwiddle (http://userscripts.org/scripts/show/48636).
// @include        http://www.google.*/search?*
// ==/UserScript==


(function(){
  
  var links = document.querySelectorAll('#res .w0 a.l');

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

  GM_addStyle(
    ".favicon {padding-right:4px; vertical-align:middle; border:none;}\
     .l .favicon {margin-left:-26px; padding-right:9px;}\
     li.g {position:relative; padding-left:20px}"
  );

  for (var i=0; i<links.length; i++) {
    var host = links[i].href.replace(/^https?:\/\//,'').replace(/\/.*$/,'');
    var img = document.createElement('IMG');
    img.src = 'http://www.google.com/s2/favicons?domain=' + host;
    img.width = '16';
    img.height = '16';
    img.className = 'favicon';
    links[i].insertBefore(img, links[i].firstChild);
  }

})();