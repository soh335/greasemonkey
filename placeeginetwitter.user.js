// ==UserScript==
// @name           placeEgineTwitter
// @namespace      http://d.hatena.ne.jp/sugarbabe335/
// @include        http://twitter.com/home
// @include        http://twitter.com/
// ==/UserScript==

(function(){

 var newe = document.createElement("div");
 var button = document.getElementById("doingForm");
 var div = document.getElementById("content");
 newe.innerHTML = '<div style="color: black;" align="center"><a href="http://www.placeengine.com"><img alt="PlaceEngine" style="border:0;" src="http://www.placeengine.com/images/small_bt3.png"></a> <input src="http://www.placeengine.com/images/small_bt2.png" type="image" onclick=\'registerLocation()\' /><input id="getLocation" src="http://www.placeengine.com/images/wide_bt1.png" type="image" /> <span id="pestatus"></span></div>';
 GM_log(button);
 button.parentNode.insertBefore(newe,button.nextSibling);
 var g = document.getElementById("getLocation")
 g.addEventListener("click",getLocation,true);
 

var appk = "1J68cf6.KxmG8iAbp78T.707HiwfWG6ia6til2NAt50Uw89fSpDDa1BddERijvigMpuIj2MBkDIQmxFM4SEl-imErly.UFZdR-bdILCtGMv9-SXTRHq-r8oEhwXjKFoVEUTH3Fex7vW92mZJPzckeZrlaCJPP0UUr7q9sY9pjBtxP93FKlZewmgm99Ixc3ofkCyS.XLtIJoU2yELB0xQIoN5te7MQG322acivavHqzQhhskgCaMQDGZXfn2U2j7qb-sX2FDewa5m.eSl83QqPi-cIRsmLDGlRYS04avP-Qj6jQi-SHBBNzotW7shwrVc4k2m1C5FPFv8HpeJ1v3AzA__,aHR0cDovL3R3aXR0ZXIuY29tLw__,dHdpdHRlcl9wbGFjZWVuZ2luZQ__";

function registerLocation(){
    GM_log("hoge");
}

function getLocation(){
    GM_log("getLocation");
    var rtagd = "http://127.0.0.1:5448";
    var host = "http://www.placeengine.com/api";
    var rtag = null;
    var numap = null;
    var response = null;
    var t = null;
    //電測情報を送る
    var url = rtagd+"/rtagjs?t="+ ( new Date().getTime())+appk;
    //GM_log("access"+url);
    GM_xmlhttpRequest({
        method:"get",
        url:url,
        onload:function(req){
            var res = req.responseText;
            GM_log("access");
            GM_log(res);
            var v = res.substring(9,res.length-2).split(",");
            rtag = v[0].substring(1,v[0].length-1);
            numap = parseInt(v[1]);
            t = new Date().getTime();
            GM_log("rtag is: "+rtag);
            GM_log("numap is: "+numap);
            
            //電測情報から位置情報を得る
            GM_xmlhttpRequest({
                method:"get",
                url:"http://www.placeengine.com/api/loc?t=" + t + "&rtag=" + rtag + "&appk=" + appk + "&fmt=json",
                onload:function(req){
                    var res = req.responseText;
                    GM_log(res);
                    var ar = eval(res);
                    var hash = ar[3];
                    var textarea = document.getElementsByTagName("textarea");
                    var value = document.createTextNode("L:"+hash.addr+" "+hash.floor);
                    textarea[0].appendChild(value);
                }
                
            });
        }
    });
}

})();
