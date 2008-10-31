// ==UserScript==
// @name           Twitter4Japanese
// @namespace      http://d.hatena.ne.jp/sugarbabe335/
// @include        http://twitter.com/*
// ==/UserScript==
(function(){
		var ad=document.getElementById('side_ad_base');
		var side=document.getElementById('side');
		var base=document.getElementById('side_base');		
		//base.removeChild(ad);
		base.insertBefore(side,ad);
})();
