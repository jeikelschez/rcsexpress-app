/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[14],{401:function(Ca,ua,r){r.r(ua);var pa=r(413),ja=r(105),ka=r(37),fa=r(67);Ca=function(){function da(){this.fb=this.Md=this.xb=this.Kb=null;this.fe=!1}da.prototype.clear=function(){Object(ka.b)(this.Kb);this.xb="";Object(ka.b)(this.Md);Object(ka.b)(this.fb);this.fe=!1};da.prototype.Gc=function(){this.Kb=[];this.Md=[];this.fb=[];this.fe=!1};da.prototype.jx=function(ba){for(var w="",y=0,h,e,a;y<ba.length;)h=ba.charCodeAt(y),9===
h?(w+=String.fromCharCode(10),y++):128>h?(w+=String.fromCharCode(h),y++):191<h&&224>h?(e=ba.charCodeAt(y+1),w+=String.fromCharCode((h&31)<<6|e&63),y+=2):(e=ba.charCodeAt(y+1),a=ba.charCodeAt(y+2),w+=String.fromCharCode((h&15)<<12|(e&63)<<6|a&63),y+=3);return w};da.prototype.initData=function(ba){this.Kb=[];this.Md=[];this.fb=[];this.fe=!1;try{var w=new fa.a(ba);this.xb="";w.Ea();if(!w.advance())return;var y=w.current.textContent;this.xb=y=this.jx(y);Object(ka.b)(this.Md);w.advance();y=w.current.textContent;
for(var h=y.split(","),e=Object(ja.a)(h);e.yk();){var a=e.current;try{var b=parseInt(a.trim(),10);this.Md.push(b)}catch(aa){}}Object(ka.b)(this.Kb);w.advance();y=w.current.textContent;h=y.split(",");for(var n=Object(ja.a)(h);n.yk();){a=n.current;try{b=parseFloat(a.trim()),this.Kb.push(b)}catch(aa){}}Object(ka.b)(this.fb);w.advance();y=w.current.textContent;h=y.split(",");ba=[];w=[];y=0;for(var f=Object(ja.a)(h);f.yk();){a=f.current;switch(a){case "Q":y=1;break;case "R":y=2;break;case "S":y=3;break;
default:y=0}if(y)ba.push(0),w.push(y);else try{b=parseFloat(a.trim()),ba.push(b),w.push(y)}catch(aa){return}}y=0;var x=ba.length;e=f=a=h=void 0;for(var z=n=0,ha=0;ha<x;){var la=w[ha];if(0<la)y=la,++ha,3===y&&(n=ba[ha],z=ba[ha+1],ha+=2);else if(1===y)for(b=0;8>b;++b)this.fb.push(ba[ha++]);else 2===y?(h=ba[ha++],a=ba[ha++],f=ba[ha++],e=ba[ha++],this.fb.push(h),this.fb.push(a),this.fb.push(f),this.fb.push(a),this.fb.push(f),this.fb.push(e),this.fb.push(h),this.fb.push(e)):3===y&&(h=ba[ha++],a=n,f=ba[ha++],
e=z,this.fb.push(h),this.fb.push(a),this.fb.push(f),this.fb.push(a),this.fb.push(f),this.fb.push(e),this.fb.push(h),this.fb.push(e))}}catch(aa){return}this.xb.length&&this.xb.length===this.Md.length&&8*this.xb.length===this.fb.length&&(this.fe=!0)};da.prototype.ready=function(){return this.fe};da.prototype.Wt=function(){var ba=new pa.a;if(!this.Kb.length)return ba.dg(this.Kb,-1,this.xb,this.fb,0),ba;ba.dg(this.Kb,1,this.xb,this.fb,1);return ba};da.prototype.De=function(){return this.fb};da.prototype.getData=
function(){return{m_Struct:this.Kb,m_Str:this.xb,m_Offsets:this.Md,m_Quads:this.fb,m_Ready:this.fe}};return da}();ua["default"]=Ca},413:function(Ca,ua,r){var pa=r(76),ja=r(46),ka=r(428);Ca=function(){function fa(){this.td=0;this.eb=this.wa=this.te=null;this.jc=0;this.sd=null}fa.prototype.Gc=function(){this.td=-1;this.jc=0;this.sd=[]};fa.prototype.dg=function(da,ba,w,y,h){this.td=ba;this.jc=h;this.sd=[];this.te=da;this.wa=w;this.eb=y};fa.prototype.Xb=function(da){return this.td===da.td};fa.prototype.Pi=
function(){return Math.abs(this.te[this.td])};fa.prototype.uk=function(){return 0<this.te[this.td]};fa.prototype.Zf=function(){var da=this.uk()?6:10,ba=new ka.a;ba.dg(this.te,this.td+da,this.td,this.wa,this.eb,1);return ba};fa.prototype.NO=function(da){if(0>da||da>=this.Pi())return da=new ka.a,da.dg(this.te,-1,-1,this.wa,this.eb,0),da;var ba=this.uk()?6:10,w=this.uk()?5:11,y=new ka.a;y.dg(this.te,this.td+ba+w*da,this.td,this.wa,this.eb,1+da);return y};fa.prototype.Wl=function(){var da=this.td+parseInt(this.te[this.td+
1],10);if(da>=this.te.length)return da=new fa,da.dg(this.te,-1,this.wa,this.eb,0),da;var ba=new fa;ba.dg(this.te,da,this.wa,this.eb,this.jc+1);return ba};fa.prototype.getBBox=function(da){if(this.uk())da.x1=this.te[this.td+2+0],da.y1=this.te[this.td+2+1],da.x2=this.te[this.td+2+2],da.y2=this.te[this.td+2+3];else{for(var ba=1.79769E308,w=pa.a.MIN,y=1.79769E308,h=pa.a.MIN,e=0;4>e;++e){var a=this.te[this.td+2+2*e],b=this.te[this.td+2+2*e+1];ba=Math.min(ba,a);w=Math.max(w,a);y=Math.min(y,b);h=Math.max(h,
b)}da.x1=ba;da.y1=y;da.x2=w;da.y2=h}};fa.prototype.jz=function(){if(this.sd.length)return this.sd[0];var da=new ja.a,ba=new ja.a,w=new ka.a;w.Gc();var y=this.Zf(),h=new ka.a;h.Gc();for(var e=this.Zf();!e.Xb(w);e=e.ag())h=e;w=Array(8);e=Array(8);y.be(0,w);da.x=(w[0]+w[2]+w[4]+w[6])/4;da.y=(w[1]+w[3]+w[5]+w[7])/4;h.be(h.Oi()-1,e);ba.x=(e[0]+e[2]+e[4]+e[6])/4;ba.y=(e[1]+e[3]+e[5]+e[7])/4;.01>Math.abs(da.x-ba.x)&&.01>Math.abs(da.y-ba.y)&&this.sd.push(0);da=Math.atan2(ba.y-da.y,ba.x-da.x);da*=180/3.1415926;
0>da&&(da+=360);this.sd.push(da);return 0};return fa}();ua.a=Ca},428:function(Ca,ua,r){var pa=r(413),ja=r(85),ka=r(76);Ca=function(){function fa(){this.Ij=this.Yc=0;this.eb=this.wa=this.Kb=null;this.jc=0}fa.prototype.Gc=function(){this.Ij=this.Yc=-1;this.jc=0};fa.prototype.dg=function(da,ba,w,y,h,e){this.Yc=ba;this.Ij=w;this.Kb=da;this.wa=y;this.eb=h;this.jc=e};fa.prototype.Xb=function(da){return this.Yc===da.Yc};fa.prototype.Oi=function(){return parseInt(this.Kb[this.Yc],10)};fa.prototype.Jh=function(){return parseInt(this.Kb[this.Yc+
2],10)};fa.prototype.cg=function(){return parseInt(this.Kb[this.Yc+1],10)};fa.prototype.uk=function(){return 0<this.Kb[this.Ij]};fa.prototype.x5=function(){return Math.abs(this.Kb[this.Ij])};fa.prototype.ag=function(){var da=this.uk(),ba=da?5:11;if(this.Yc>=this.Ij+(da?6:10)+(this.x5()-1)*ba)return ba=new fa,ba.dg(this.Kb,-1,-1,this.wa,this.eb,0),ba;da=new fa;da.dg(this.Kb,this.Yc+ba,this.Ij,this.wa,this.eb,this.jc+1);return da};fa.prototype.S4=function(da){var ba=this.Oi();return 0>da||da>=ba?-1:
parseInt(this.Kb[this.Yc+1],10)+da};fa.prototype.be=function(da,ba){da=this.S4(da);if(!(0>da)){var w=new pa.a;w.dg(this.Kb,this.Ij,this.wa,this.eb,0);if(w.uk()){var y=new ja.a;w.getBBox(y);w=y.y1<y.y2?y.y1:y.y2;y=y.y1>y.y2?y.y1:y.y2;da*=8;ba[0]=this.eb[da];ba[1]=w;ba[2]=this.eb[da+2];ba[3]=ba[1];ba[4]=this.eb[da+4];ba[5]=y;ba[6]=this.eb[da+6];ba[7]=ba[5]}else for(da*=8,w=0;8>w;++w)ba[w]=this.eb[da+w]}};fa.prototype.Ad=function(da){var ba=new pa.a;ba.dg(this.Kb,this.Ij,this.wa,this.eb,0);if(ba.uk()){var w=
this.Kb[this.Yc+3],y=this.Kb[this.Yc+4];if(w>y){var h=w;w=y;y=h}h=new ja.a;ba.getBBox(h);ba=h.y1<h.y2?h.y1:h.y2;h=h.y1>h.y2?h.y1:h.y2;da[0]=w;da[1]=ba;da[2]=y;da[3]=ba;da[4]=y;da[5]=h;da[6]=w;da[7]=h}else for(w=this.Yc+3,y=0;8>y;++y)da[y]=this.Kb[w+y]};fa.prototype.getBBox=function(da){var ba=new pa.a;ba.dg(this.Kb,this.Ij,this.wa,this.eb,0);if(ba.uk()){var w=this.Kb[this.Yc+3],y=this.Kb[this.Yc+4];if(w>y){var h=w;w=y;y=h}h=new ja.a;ba.getBBox(h);ba=h.y1<h.y2?h.y1:h.y2;h=h.y1>h.y2?h.y1:h.y2;da[0]=
w;da[1]=ba;da[2]=y;da[3]=h}else{w=1.79769E308;y=ka.a.MIN;ba=1.79769E308;h=ka.a.MIN;for(var e=this.Yc+3,a=0;4>a;++a){var b=this.Kb[e+2*a],n=this.Kb[e+2*a+1];w=Math.min(w,b);y=Math.max(y,b);ba=Math.min(ba,n);h=Math.max(h,n)}da[0]=w;da[1]=ba;da[2]=y;da[3]=h}};return fa}();ua.a=Ca}}]);}).call(this || window)
