/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[10],{392:function(Ca,ua,r){r.r(ua);var pa=r(1),ja=r(215);Ca=r(384);r(32);r=r(316);var ka=function(fa){function da(ba,w){var y=fa.call(this,ba,w)||this;y.url=ba;y.range=w;y.status=ja.a.NOT_STARTED;return y}Object(pa.c)(da,fa);da.prototype.start=function(){var ba=document.createElement("IFRAME");ba.setAttribute("src",this.url);document.documentElement.appendChild(ba);ba.parentNode.removeChild(ba);this.status=ja.a.STARTED;this.sz()};
return da}(Ca.ByteRangeRequest);Ca=function(fa){function da(ba,w,y,h){ba=fa.call(this,ba,w,y,h)||this;ba.mv=ka;return ba}Object(pa.c)(da,fa);da.prototype.st=function(ba,w){return ba+"#"+w.start+"&"+(w.stop?w.stop:"")};return da}(Ca["default"]);Object(r.a)(Ca);Object(r.b)(Ca);ua["default"]=Ca}}]);}).call(this || window)
