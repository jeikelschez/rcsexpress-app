/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[13],{398:function(Ca,ua,r){function pa(ca){ca.Ea();ca.advance();var ia=ca.current.textContent;ca.Pa();return ia}function ja(ca){var ia=[];for(ca.Ea();ca.advance();){var ea=ca.Ia();"field"===ea?ia.push(String(ca.fa("name"))):Object(b.j)("unrecognised field list element: "+ea)}ca.Pa();return ia}function ka(ca,ia){return ia?"false"!==ca:"true"===ca}function fa(ca,ia){var ea=ca.Ia();switch(ea){case "javascript":return{name:"JavaScript",
javascript:ca.current.textContent};case "uri":return{name:"URI",uri:ca.fa("uri")};case "goto":ea=null;ca.Ea();if(ca.advance()){var ma=ca.fa("fit");ea={page:ca.fa("page"),fit:ma};if("0"===ea.page)Object(b.j)("null page encountered in dest");else switch(ia=ia(Number(ea.page)),ma){case "Fit":case "FitB":break;case "FitH":case "FitBH":ea.top=ia.la({x:0,y:ca.fa("top")||0}).y;break;case "FitV":case "FitBV":ea.left=ia.la({x:ca.fa("left")||0,y:0}).x;break;case "FitR":ma=ia.la({x:ca.fa("left")||0,y:ca.fa("top")||
0});ia=ia.la({x:ca.fa("right")||0,y:ca.fa("bottom")||0});ia=new x.d(ma.x,ma.y,ia.x,ia.y);ea.top=ia.y1;ea.left=ia.x1;ea.bottom=ia.y2;ea.right=ia.x2;break;case "XYZ":ma=ia.la({x:ca.fa("left")||0,y:ca.fa("top")||0});ea.top=ma.y;ea.left=ma.x;ea.zoom=ca.fa("zoom")||0;break;default:Object(b.j)("unknown dest fit: "+ma)}ea={name:"GoTo",dest:ea}}else Object(b.j)("missing dest in GoTo action");ca.Pa();return ea;case "submit-form":ea={name:"SubmitForm",url:ca.fa("url"),format:ca.fa("format"),method:ca.fa("method")||
"POST",exclude:ka(ca.fa("exclude"),!1)};ia=ca.fa("flags");ea.flags=ia?ia.split(" "):[];for(ca.Ea();ca.advance();)switch(ia=ca.Ia(),ia){case "fields":ea.fields=ja(ca);break;default:Object(b.j)("unrecognised submit-form child: "+ia)}ca.Pa();return ea;case "reset-form":ea={name:"ResetForm",exclude:ka(ca.fa("exclude"),!1)};for(ca.Ea();ca.advance();)switch(ia=ca.Ia(),ia){case "fields":ea.fields=ja(ca);break;default:Object(b.j)("unrecognised reset-form child: "+ia)}ca.Pa();return ea;case "hide":ea={name:"Hide",
hide:ka(ca.fa("hide"),!0)};for(ca.Ea();ca.advance();)switch(ia=ca.Ia(),ia){case "fields":ea.fields=ja(ca);break;default:Object(b.j)("unrecognised hide child: "+ia)}ca.Pa();return ea;case "named":return{name:"Named",action:ca.fa("name")};default:Object(b.j)("Encountered unexpected action type: "+ea)}return null}function da(ca,ia,ea){var ma={};for(ca.Ea();ca.advance();){var na=ca.Ia();switch(na){case "action":na=ca.fa("trigger");if(ia?-1!==ia.indexOf(na):1){ma[na]=[];for(ca.Ea();ca.advance();){var qa=
fa(ca,ea);Object(n.isNull)(qa)||ma[na].push(qa)}ca.Pa()}else Object(b.j)("encountered unexpected trigger on field: "+na);break;default:Object(b.j)("encountered unknown action child: "+na)}}ca.Pa();return ma}function ba(ca){return new z.a(ca.fa("r")||0,ca.fa("g")||0,ca.fa("b")||0,ca.fa("a")||1)}function w(ca,ia){var ea=ca.fa("name"),ma=ca.fa("type")||"Type1",na=ca.fa("size"),qa=ia.la({x:0,y:0});na=ia.la({x:Number(na),y:0});ia=qa.x-na.x;qa=qa.y-na.y;ea={name:ea,type:ma,size:Math.sqrt(ia*ia+qa*qa)||
0,strokeColor:[0,0,0],fillColor:[0,0,0]};for(ca.Ea();ca.advance();)switch(ma=ca.Ia(),ma){case "stroke-color":ea.strokeColor=ba(ca);break;case "fill-color":ea.fillColor=ba(ca);break;default:Object(b.j)("unrecognised font child: "+ma)}ca.Pa();return ea}function y(ca){var ia=[];for(ca.Ea();ca.advance();){var ea=ca.Ia();switch(ea){case "option":ea=ia;var ma=ea.push;var na=ca;na={value:na.fa("value"),displayValue:na.fa("display-value")||void 0};ma.call(ea,na);break;default:Object(b.j)("unrecognised options child: "+
ea)}}ca.Pa();return ia}function h(ca,ia){var ea=ca.fa("name"),ma={type:ca.fa("type"),quadding:ca.fa("quadding")||"Left-justified",maxLen:ca.fa("max-len")||-1},na=ca.fa("flags");Object(n.isString)(na)&&(ma.flags=na.split(" "));for(ca.Ea();ca.advance();)switch(na=ca.Ia(),na){case "actions":ma.actions=da(ca,["C","F","K","V"],function(){return ia});break;case "default-value":ma.defaultValue=pa(ca);break;case "font":ma.font=w(ca,ia);break;case "options":ma.options=y(ca);break;default:Object(b.j)("unknown field child: "+
na)}ca.Pa();return new window.Annotations.ga.na(ea,ma)}function e(ca,ia){switch(ca.type){case "Tx":try{if(Object(la.c)(ca.actions))return new f.a.DatePickerWidgetAnnotation(ca,ia)}catch(ea){Object(b.j)(ea)}return new f.a.TextWidgetAnnotation(ca,ia);case "Ch":return ca.flags.get(aa.WidgetFlags.COMBO)?new f.a.ChoiceWidgetAnnotation(ca,ia):new f.a.ListWidgetAnnotation(ca,ia);case "Btn":return ca.flags.get(aa.WidgetFlags.PUSH_BUTTON)?new f.a.PushButtonWidgetAnnotation(ca,ia):ca.flags.get(aa.WidgetFlags.RADIO)?
new f.a.RadioButtonWidgetAnnotation(ca,ia):new f.a.CheckButtonWidgetAnnotation(ca,ia);case "Sig":return new f.a.SignatureWidgetAnnotation(ca,ia);default:Object(b.j)("Unrecognised field type: "+ca.type)}return null}function a(ca,ia,ea,ma){var na=[],qa={};ca.Ea();var ra=[],sa={},va=[];Object(ha.a)(function(){if(ca.advance()){var ta=ca.Ia();switch(ta){case "calculation-order":ra="calculation-order"===ca.Ia()?ja(ca):[];break;case "document-actions":sa=da(ca,["Init","Open"],ia);break;case "pages":ta=[];
for(ca.Ea();ca.advance();){var Ea=ca.Ia();switch(Ea){case "page":Ea=ta;var Ga=Ea.push,La=ca,Pa=ia,Fa={number:La.fa("number")};for(La.Ea();La.advance();){var Ma=La.Ia();switch(Ma){case "actions":Fa.actions=da(La,["O","C"],Pa);break;default:Object(b.j)("unrecognised page child: "+Ma)}}La.Pa();Ga.call(Ea,Fa);break;default:Object(b.j)("unrecognised page child: "+Ea)}}ca.Pa();va=ta;break;case "field":Ea=h(ca,ia(1));qa[Ea.name]=Ea;break;case "widget":ta={border:{style:"Solid",width:1},backgroundColor:[],
fieldName:ca.fa("field"),page:ca.fa("page"),index:ca.fa("index")||0,rotation:ca.fa("rotation")||0,flags:[],isImporting:!0};(Ea=ca.fa("appearance"))&&(ta.appearance=Ea);(Ea=ca.fa("flags"))&&(ta.flags=Ea.split(" "));for(ca.Ea();ca.advance();)switch(Ea=ca.Ia(),Ea){case "rect":Ga=ca;La=ia(Number(ta.page));Ea=La.la({x:Ga.fa("x1")||0,y:Ga.fa("y1")||0});Ga=La.la({x:Ga.fa("x2")||0,y:Ga.fa("y2")||0});Ea=new x.d(Ea.x,Ea.y,Ga.x,Ga.y);Ea.normalize();ta.rect={x1:Ea.x1,y1:Ea.y1,x2:Ea.x2,y2:Ea.y2};break;case "border":Ea=
ca;Ga={style:Ea.fa("style")||"Solid",width:Ea.fa("width")||1,color:[0,0,0]};for(Ea.Ea();Ea.advance();)switch(La=Ea.Ia(),La){case "color":Ga.color=ba(Ea);break;default:Object(b.j)("unrecognised border child: "+La)}Ea.Pa();ta.border=Ga;break;case "background-color":ta.backgroundColor=ba(ca);break;case "actions":ta.actions=da(ca,"E X D U Fo Bl PO PC PV PI".split(" "),ia);break;case "appearances":Ea=ca;Ga=Object(la.b)(ta,"appearances");for(Ea.Ea();Ea.advance();)if(La=Ea.Ia(),"appearance"===La){La=Ea.fa("name");
Pa=Object(la.b)(Ga,La);La=Ea;for(La.Ea();La.advance();)switch(Fa=La.Ia(),Fa){case "Normal":Object(la.b)(Pa,"Normal").data=La.current.textContent;break;default:Object(b.j)("unexpected appearance state: ",Fa)}La.Pa()}else Object(b.j)("unexpected appearances child: "+La);Ea.Pa();break;case "extra":Ea=ca;Ga=ia;La={};for(Ea.Ea();Ea.advance();)switch(Pa=Ea.Ia(),Pa){case "font":La.font=w(Ea,Ga(1));break;default:Object(b.j)("unrecognised extra child: "+Pa)}Ea.Pa();Ea=La;Ea.font&&(ta.font=Ea.font);break;case "captions":Ga=
ca;Ea={};(La=Ga.fa("Normal"))&&(Ea.Normal=La);(La=Ga.fa("Rollover"))&&(Ea.Rollover=La);(Ga=Ga.fa("Down"))&&(Ea.Down=Ga);ta.captions=Ea;break;default:Object(b.j)("unrecognised widget child: "+Ea)}ca.Pa();(Ea=qa[ta.fieldName])?(ta=e(Ea,ta),na.push(ta)):Object(b.j)("ignoring widget with no corresponding field data: "+ta.fieldName);break;default:Object(b.j)("Unknown element encountered in PDFInfo: "+ta)}return!0}return!1},function(){ca.Pa();ea({calculationOrder:ra,widgets:na,fields:qa,documentActions:sa,
pages:va,custom:[]})},ma)}r.r(ua);r.d(ua,"parse",function(){return a});var b=r(2),n=r(0);r.n(n);var f=r(106),x=r(3),z=r(17),ha=r(19),la=r(93),aa=r(30)}}]);}).call(this || window)
