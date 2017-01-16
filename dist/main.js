!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";document.addEventListener("DOMContentLoaded",function(){function e(){var e=60*parseInt(w.innerText),t=e+parseInt(B.innerText);return t}function t(e){var t=e%60,n=(e-t)/60;return[n,t]}function r(e,t){e.toString().length<2?w.innerText="0"+e:w.innerText=e,B.innerText=("0"+t).substr(-2,2)}function i(){var n=e()+60,i=t(n);r(i[0],i[1])}function o(){var n=e();if(n>=60){n-=60;var i=t(n);r(i[0],i[1])}}function a(){var n=e()+5,i=t(n);r(i[0],i[1])}function s(){var n=e();if(n>0){n-=5;var i=t(n);r(i[0],i[1])}}function c(){if(e()>0){for(var n=0;n<T.length;n++)T[n].classList.add("inactive");L.classList.add("active"),S.classList.add("active"),p.removeEventListener("click",i),v.removeEventListener("click",o),b.removeEventListener("click",a),h.removeEventListener("click",s),y.removeEventListener("click",l),k.removeEventListener("click",d),m.removeEventListener("click",c),"work"===S.dataset.id?(C=w.innerText,R=B.innerText):(E=w.innerText,M=B.innerText),U=setInterval(function(){var n=e()-1,i=t(n);r(i[0],i[1]),0===n&&(clearInterval(U),q.play())},1e3)}}function l(){"break"===S.dataset.id&&(S.dataset.id="work",S.innerText="Work",E=w.innerText,M=B.innerText,w.innerText=C,B.innerText=R)}function d(){"work"===S.dataset.id&&(S.dataset.id="break",S.innerText="Break",C=w.innerText,R=B.innerText,w.innerText=E,B.innerText=M)}function u(){p.addEventListener("click",i),v.addEventListener("click",o),b.addEventListener("click",a),h.addEventListener("click",s),m.addEventListener("click",c),y.addEventListener("click",l),k.addEventListener("click",d)}n(5),n(6);var f=document.getElementById("app"),p=f.querySelector("#increaseMinBtn"),v=f.querySelector("#decreaseMinBtn"),b=f.querySelector("#increaseSecBtn"),h=f.querySelector("#decreaseSecBtn"),m=f.querySelector("#startBtn"),g=f.querySelector("#resetBtn"),x=f.querySelector("#defaultBtn"),y=f.querySelector("#workBtn"),k=f.querySelector("#breakBtn"),L=f.querySelector("#timer"),w=f.querySelector("#timerMin"),B=f.querySelector("#timerSec"),S=f.querySelector("#timerTitle"),T=f.querySelectorAll(".jsButton"),q=new Audio("sounds/alarm.mp3"),E="05",M="00",C="20",R="00",U="";g.addEventListener("click",function(){for(var e=0;e<T.length;e++)T[e].classList.remove("inactive");L.classList.remove("active"),S.classList.remove("active"),u(),clearInterval(U),q.pause(),"work"===S.dataset.id?r(C,R):r(E,M)}),x.addEventListener("click",function(){for(var e=0;e<T.length;e++)T[e].classList.remove("inactive");L.classList.remove("active"),S.classList.remove("active"),u(),clearInterval(U),q.pause(),"work"===S.dataset.id?r(20,0):r(5,0)}),u()})},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=p[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(l(r.parts[o],t))}else{for(var a=[],o=0;o<r.parts.length;o++)a.push(l(r.parts[o],t));p[r.id]={id:r.id,refs:1,parts:a}}}}function i(e){for(var t=[],n={},r=0;r<e.length;r++){var i=e[r],o=i[0],a=i[1],s=i[2],c=i[3],l={css:a,media:s,sourceMap:c};n[o]?n[o].parts.push(l):t.push(n[o]={id:o,parts:[l]})}return t}function o(e,t){var n=h(),r=x[x.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",o(e,t),t}function c(e){var t=document.createElement("link");return t.rel="stylesheet",o(e,t),t}function l(e,t){var n,r,i;if(t.singleton){var o=g++;n=m||(m=s(t)),r=d.bind(null,n,o,!1),i=d.bind(null,n,o,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(t),r=f.bind(null,n),i=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),r=u.bind(null,n),i=function(){a(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}function d(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function u(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t){var n=t.css,r=t.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var i=new Blob([n],{type:"text/css"}),o=e.href;e.href=URL.createObjectURL(i),o&&URL.revokeObjectURL(o)}var p={},v=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},b=v(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=v(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,g=0,x=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=b()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return r(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var s=n[a],c=p[s.id];c.refs--,o.push(c)}if(e){var l=i(e);r(l,t)}for(var a=0;a<o.length;a++){var c=o[a];if(0===c.refs){for(var d=0;d<c.parts.length;d++)c.parts[d]();delete p[c.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,'abbr,address,article,aside,audio,b,blockquote,body,body div,caption,cite,code,dd,del,details,dfn,dl,dt,em,fieldset,figure,footer,form,h1,h2,h3,h4,h5,h6,header,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,p,pre,q,samp,section,small,span,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font-weight:400;vertical-align:baseline;background:transparent}article,aside,details,figure,footer,header,nav,section,summary{display:block}html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}embed,img,object{max-width:100%}html{overflow-y:scroll}ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:"";content:none}a{margin:0;padding:0;font-size:100%;vertical-align:baseline;background:transparent}del{text-decoration:line-through}abbr[title],dfn[title]{border-bottom:1px dotted #000;cursor:help}table{border-collapse:separate;border-spacing:0}th{font-weight:700;vertical-align:bottom}td{font-weight:400;vertical-align:top}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}input,select{vertical-align:middle}pre{white-space:pre;white-space:pre-wrap;white-space:pre-line;word-wrap:break-word}input[type=radio]{vertical-align:text-bottom}input[type=checkbox]{vertical-align:bottom}.ie7 input[type=checkbox]{vertical-align:baseline}.ie6 input{vertical-align:text-bottom}input,select,textarea{font:99% sans-serif}table{font-size:inherit;font:100%}small{font-size:85%}strong{font-weight:700}td,td img{vertical-align:top}sub,sup{font-size:75%;line-height:0;position:relative}sup{top:-.5em}sub{bottom:-.25em}code,kbd,pre,samp{font-family:monospace,sans-serif}.clickable,button,input[type=button],input[type=file],input[type=submit],label{cursor:pointer}button,input,select,textarea{margin:0}button,input[type=button]{width:auto;overflow:visible}.ie7 img{-ms-interpolation-mode:bicubic}.clearfix:after{content:" ";display:block;clear:both}',""])},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,"body{background-color:#9d2d30;font-family:Orbitron,sans-serif}.app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:300px;margin:5% auto 0;border:2px solid #c34d4b;border-radius:3px;padding:10px;text-align:center;cursor:default}.timer{font-size:42px;color:#c34d4b}.timer span{font-weight:800}.button{border:2px solid #fff;border-radius:3px;display:inline-block;cursor:pointer;color:#fff}.timerTitle{font-size:32px;color:#c34d4b;font-weight:800}.decreaseMinBtn,.decreaseSecBtn,.increaseMinBtn,.increaseSecBtn{border:1px solid transparent;margin:10px 23px;width:50px;font-size:28px}.decreaseMinBtn:hover,.decreaseSecBtn:hover,.increaseMinBtn:hover,.increaseSecBtn:hover{border-color:#fff}.startBtn{width:200px;font-size:22px;padding:10px;margin:15px auto 0;display:block}.breakBtn,.defaultBtn,.resetBtn,.workBtn{width:90px;margin:20px 10px;padding:5px}.breakBtn:hover,.defaultBtn:hover,.resetBtn:hover,.startBtn:hover,.workBtn:hover{background-color:#fff;color:#9d2d30}.inactive,.inactive:hover{border-color:#c34d4b;color:#be2d30}.inactive:hover{background-color:#9d2d30}.active{color:#fff}",""])},function(e,t,n){var r=n(3);"string"==typeof r&&(r=[[e.id,r,""]]);n(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.id,r,""]]);n(2)(r,{});r.locals&&(e.exports=r.locals)}]);