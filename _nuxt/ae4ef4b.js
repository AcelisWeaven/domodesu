(window.webpackJsonp=window.webpackJsonp||[]).push([[10,3,4,5],{264:function(t,e,n){"use strict";n.r(e);n(55);var r=n(1).a.extend({props:{emote:Object,size:{type:String,default:"1"}},computed:{cssProps:function(){var t={height:"".concat(this.sizeInPx,"px"),"min-width":"".concat(this.sizeInPx,"px")};return"twitch"===this.emote.source&&(t.width="".concat(this.sizeInPx,"px")),t},sizeInPx:function(){return"1"===this.size?28:"2"===this.size?56:112},url:function(){return"twitch"===this.emote.source?"https://static-cdn.jtvnw.net/emoticons/v2/".concat(this.emote.id,"/default/light/").concat(this.size,".0"):"ffz"===this.emote.source?"https://cdn.frankerfacez.com/emote/".concat(this.emote.id,"/").concat("3"===this.size?"4":this.size):"https://cdn.betterttv.net/emote/".concat(this.emote.id,"/").concat(this.size,"x")}}}),o=n(40),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("img",{staticClass:"inline object-contain",style:t.cssProps,attrs:{src:t.url,alt:t.emote.text,title:t.emote.text}})}),[],!1,null,null,null);e.default=component.exports},266:function(t,e,n){"use strict";var r=n(3),o=n(43),c=n(22),l=n(15),f=n(9),m=n(5),d=n(274),v=n(134),h=n(275),x=n(276),_=n(73),y=n(277),w=[],O=w.sort,j=m((function(){w.sort(void 0)})),E=m((function(){w.sort(null)})),C=v("sort"),k=!m((function(){if(_)return _<70;if(!(h&&h>3)){if(x)return!0;if(y)return y<603;var code,t,e,n,r="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(n=0;n<47;n++)w.push({k:t+n,v:e})}for(w.sort((function(a,b){return b.v-a.v})),n=0;n<w.length;n++)t=w[n].k.charAt(0),r.charAt(r.length-1)!==t&&(r+=t);return"DGBEFHACIJK"!==r}}));r({target:"Array",proto:!0,forced:j||!E||!C||!k},{sort:function(t){void 0!==t&&o(t);var e=c(this);if(k)return void 0===t?O.call(e):O.call(e,t);var n,r,m=[],v=l(e.length);for(r=0;r<v;r++)r in e&&m.push(e[r]);for(n=(m=d(m,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:f(e)>f(n)?1:-1}}(t))).length,r=0;r<n;)e[r]=m[r++];for(;r<v;)delete e[r++];return e}})},269:function(t,e,n){var content=n(288);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(76).default)("467fd147",content,!0,{sourceMap:!1})},274:function(t,e){var n=Math.floor,r=function(t,e){var l=t.length,f=n(l/2);return l<8?o(t,e):c(r(t.slice(0,f),e),r(t.slice(f),e),e)},o=function(t,e){for(var element,n,r=t.length,i=1;i<r;){for(n=i,element=t[i];n&&e(t[n-1],element)>0;)t[n]=t[--n];n!==i++&&(t[n]=element)}return t},c=function(t,e,n){for(var r=t.length,o=e.length,c=0,l=0,f=[];c<r||l<o;)c<r&&l<o?f.push(n(t[c],e[l])<=0?t[c++]:e[l++]):f.push(c<r?t[c++]:e[l++]);return f};t.exports=r},275:function(t,e,n){var r=n(56).match(/firefox\/(\d+)/i);t.exports=!!r&&+r[1]},276:function(t,e,n){var r=n(56);t.exports=/MSIE|Trident/.test(r)},277:function(t,e,n){var r=n(56).match(/AppleWebKit\/(\d+)\./);t.exports=!!r&&+r[1]},285:function(t,e){},287:function(t,e,n){"use strict";n(269)},288:function(t,e,n){var r=n(75)((function(i){return i[1]}));r.push([t.i,"/*purgecss start ignore*/\n.cell-move[data-v-2a25cf7c]{\n  transition:transform .1s\n}\n.emote-appear[data-v-2a25cf7c]{\n  -webkit-animation:emoteAppear-data-v-2a25cf7c .8s cubic-bezier(.4,0,.2,1);\n          animation:emoteAppear-data-v-2a25cf7c .8s cubic-bezier(.4,0,.2,1)\n}\n@-webkit-keyframes emoteAppear-data-v-2a25cf7c{\n0%{\n    transform:scale(1) rotate(0deg)\n}\n80%{\n    transform:scale(.6) rotate(8deg)\n}\n90%{\n    transform:scale(1.1) rotate(4deg)\n}\nto{\n    transform:scale(1) rotate(0deg)\n}\n}\n@keyframes emoteAppear-data-v-2a25cf7c{\n0%{\n    transform:scale(1) rotate(0deg)\n}\n80%{\n    transform:scale(.6) rotate(8deg)\n}\n90%{\n    transform:scale(1.1) rotate(4deg)\n}\nto{\n    transform:scale(1) rotate(0deg)\n}\n}\n.counter-appear[data-v-2a25cf7c]{\n  -webkit-animation:counterAppear-data-v-2a25cf7c .5s cubic-bezier(.4,0,.2,1);\n          animation:counterAppear-data-v-2a25cf7c .5s cubic-bezier(.4,0,.2,1)\n}\n@-webkit-keyframes counterAppear-data-v-2a25cf7c{\n0%{\n    transform:scale(1.2)\n}\nto{\n    transform:scale(1)\n}\n}\n@keyframes counterAppear-data-v-2a25cf7c{\n0%{\n    transform:scale(1.2)\n}\nto{\n    transform:scale(1)\n}\n}\n\n/*purgecss end ignore*/",""]),r.locals={},t.exports=r},289:function(t,e,n){t.exports=function(){"use strict";var t=function(t,e){"function"==typeof t.scroll?t.scroll({top:t.scrollHeight,behavior:e?"smooth":"instant"}):t.scrollTop=t.scrollHeight},e={bind:function(e,n){var r=!1;e.addEventListener("scroll",(function(t){(r=e.scrollTop+e.clientHeight+1<e.scrollHeight)&&0===e.scrollTop&&e.dispatchEvent(new Event("v-chat-scroll-top-reached"))})),new MutationObserver((function(o){var c=n.value||{};if(!1!==c.enabled){var l=!1===c.always&&r,f=o[o.length-1].addedNodes.length,m=o[o.length-1].removedNodes.length;if(c.scrollonremoved){if(l||1!=f&&1!=m)return}else if(l||1!=f)return;var d=c.smooth;!f&&1===m&&c.scrollonremoved&&"smoothonremoved"in c&&(d=c.smoothonremoved),t(e,d)}})).observe(e,{childList:!0,subtree:!0})},inserted:function(e,n){var r=n.value||{};t(e,!r.notSmoothOnInit&&r.smooth)}},n={install:function(t,n){t.directive("chat-scroll",e)}};return"undefined"!=typeof window&&window.Vue&&window.Vue.use(n),n}()},318:function(t,e,n){"use strict";n.r(e);n(33),n(37),n(55),n(42),n(266),n(41),n(38);var r=n(1),o=r.a.extend({data:function(){return{emotes:{}}},created:function(){var t=this;this.$nuxt.$on("message",(function(e){e.parts.filter((function(p){return"emote"===p.type})).forEach((function(e){var n,o="".concat(e.source,"-").concat(e.id);void 0===t.emotes[o]&&r.a.set(t.emotes,o,{emote:e,occurrences:[]}),null===(n=t.emotes[o])||void 0===n||n.occurrences.push(Date.now())}))}))},computed:{mostUsed:function(){var t=this,e=Date.now();return Object.keys(this.emotes).map((function(n){var r,o,c;return{emote:null===(r=t.emotes[n])||void 0===r?void 0:r.emote,count:null===(o=t.emotes[n])||void 0===o?void 0:o.occurrences.filter((function(t){return e-t<6e4})).length,total:null===(c=t.emotes[n])||void 0===c?void 0:c.occurrences.length}})).filter((function(t){return t.count>0})).sort((function(a,b){return b.count-a.count})).slice(0,15)}}}),c=(n(287),n(40)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v("Most used emotes in the past minute")]),t._v(" "),n("p",[n("transition-group",{staticClass:"container",attrs:{name:"cell",tag:"div"}},t._l(t.mostUsed,(function(e){return n("span",{key:e.emote.source+"_"+e.emote.id,staticClass:"inline-flex items-baseline mr-4 relative"},[n("span",{key:e.emote.source+"_"+e.emote.id+"_emote_"+e.total,staticClass:"emote-appear"},[n("emote-part",{attrs:{emote:e.emote,size:"2"}})],1),t._v(" "),n("span",{key:e.emote.source+"_"+e.emote.id+"_counter_"+e.total,staticClass:"\n            absolute\n            -bottom-1\n            -right-1\n            px-2\n            bg-blue-400\n            text-white\n            font-thin\n            text-sm\n            rounded-full\n            counter-appear\n          "},[t._v("\n          "+t._s(e.count)+"\n        ")])])})),0)],1)])}),[],!1,null,"2a25cf7c",null);e.default=component.exports;installComponents(component,{EmotePart:n(264).default})},319:function(t,e,n){"use strict";n.r(e);var r=n(260),o=(n(55),n(1).a.extend({data:function(){return{subscriptions:[],ignoreNextSubs:{}}},created:function(){var t=this;this.$nuxt.$on("subscription",(function(e){t.subscriptions=[{type:"subscription",info:e}].concat(Object(r.a)(t.subscriptions))})).$on("subscriptionGift",(function(e){t.ignoreNextSubs[e.from]>0?t.ignoreNextSubs[e.from]-=1:t.subscriptions=[{type:"subscriptionGift",info:e}].concat(Object(r.a)(t.subscriptions))})).$on("subscriptionGiftCommunity",(function(e){t.ignoreNextSubs[e.from]=e.count,t.subscriptions=[{type:"subscriptionGiftCommunity",info:e}].concat(Object(r.a)(t.subscriptions))}))}})),c=n(40),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v("Subscriptions")]),t._v(" "),n("div",t._l(t.subscriptions,(function(e,r){return n("div",{key:r+"_"+e.type,staticClass:"inline-flex"},["subscription"===e.type?n("span",{staticClass:"border-2 border-blue-700 rounded-md px-3 py-1 mr-2 mb-2"},[n("strong",[t._v(t._s(e.info.user))]),t._v(" "),n("span",{staticClass:"text-xs"},[t._v("\n          "+t._s(e.info.months)+"\n          "+t._s(e.info.months>1?"months":"month")+"\n        ")])]):t._e(),t._v(" "),"subscriptionGift"===e.type?n("span",{staticClass:"border-2 border-pink-700 rounded-md px-3 py-1 mr-2 mb-1"},[t._v("\n        🎁 "),n("strong",[t._v(t._s(e.info.from))]),t._v(" →\n        "),n("strong",[t._v(t._s(e.info.to))]),t._v(" "),n("span",{staticClass:"text-xs"},[t._v("\n          "+t._s(e.info.months)+"\n          "+t._s(e.info.months>1?"months":"month")+"\n        ")])]):t._e(),t._v(" "),"subscriptionGiftCommunity"===e.type?n("span",{staticClass:"border-2 border-purple-700 rounded-md px-3 py-1 mr-2 mb-1"},[t._v("\n        🎉 "),n("strong",[t._v(t._s(e.info.from))]),t._v(" gifted\n        "+t._s(e.info.count)+"\n        "+t._s(e.info.count>1?"subs":"sub")+"\n      ")]):t._e()])})),0)])}),[],!1,null,null,null);e.default=component.exports},320:function(t,e,n){"use strict";n.r(e);n(190);var r=n(1),o=n(289),c=n.n(o);r.a.use(c.a);var l=r.a.extend({data:function(){return{messages:[]}},created:function(){var t=this;this.$nuxt.$on("message",(function(e){t.messages.push(e),t.messages.splice(0,t.messages.length-100)}))}}),f=n(40),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{directives:[{name:"chat-scroll",rawName:"v-chat-scroll",value:{always:!1,scrollonremoved:!0},expression:"{\n    always: false,\n    scrollonremoved: true,\n  }"}],staticClass:"overflow-y-auto overflow-x-hidden break-words"},t._l(t.messages,(function(e){return n("li",{key:e.id},[n("span",{staticClass:"font-bold",style:{color:e.color}},[t._v("\n      "+t._s(e.author)+":\n    ")]),t._v(" "),t._l(e.parts,(function(e,r){return n("span",{key:r},["text"===e.type?n("span",[t._v(t._s(e.message))]):t._e(),t._v(" "),"emote"===e.type?n("emote-part",{attrs:{emote:e}}):t._e()],1)}))],2)})),0)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{EmotePart:n(264).default})},455:function(t,e,n){n(456)},456:function(t,e,n){"use strict";var r=n(3),o=n(136),c=n(20),l=n(15),f=n(9),m=n(43),d=n(7),v=n(45),h=n(100),x=n(101),_=n(23),y=n(5),w=n(4),O=n(99),j=n(102),E=n(31),C=n(30),k=w("matchAll"),T="RegExp String",$="RegExp String Iterator",I=E.set,S=E.getterFor($),z=RegExp.prototype,A=z.exec,P="".matchAll,R=!!P&&!y((function(){"a".matchAll(/./)})),N=o((function(t,e,n,r){I(this,{type:$,regexp:t,string:e,global:n,unicode:r,done:!1})}),T,(function(){var t=S(this);if(t.done)return{value:void 0,done:!0};var e=t.regexp,n=t.string,r=function(t,e){var n,r=t.exec;if("function"==typeof r){if("object"!=typeof(n=r.call(t,e)))throw TypeError("Incorrect exec result");return n}return A.call(t,e)}(e,n);return null===r?{value:void 0,done:t.done=!0}:t.global?(""===f(r[0])&&(e.lastIndex=j(n,l(e.lastIndex),t.unicode)),{value:r,done:!1}):(t.done=!0,{value:r,done:!1})})),V=function(t){var e,n,r,o,c,m,v=d(this),h=f(t);return e=O(v,RegExp),void 0===(n=v.flags)&&v instanceof RegExp&&!("flags"in z)&&(n=x.call(v)),r=void 0===n?"":f(n),o=new e(e===RegExp?v.source:v,r),c=!!~r.indexOf("g"),m=!!~r.indexOf("u"),o.lastIndex=l(v.lastIndex),new N(o,h,c,m)};r({target:"String",proto:!0,forced:R},{matchAll:function(t){var e,n,r,o=c(this);if(null!=t){if(h(t)&&!~f(c("flags"in z?t.flags:x.call(t))).indexOf("g"))throw TypeError("`.matchAll` does not allow non-global regexes");if(R)return P.apply(o,arguments);if(void 0===(n=t[k])&&C&&"RegExp"==v(t)&&(n=V),null!=n)return m(n).call(t,o)}else if(R)return P.apply(o,arguments);return e=f(o),r=new RegExp(t,"g"),C?V.call(r,e):r[k](e)}}),C||k in z||_(z,k,V)},457:function(t,e,n){"use strict";n.r(e);n(38),n(35),n(37),n(58),n(59);var r=n(6),o=n(260),c=n(26),l=n(18),f=(n(44),n(57),n(72),n(41),n(55),n(33),n(266),n(135),n(1)),m=n(291);function d(t,e){if(0===e.length)return t.filter((function(t){return!("text"===t.type&&""===t.message)}));var n=e.shift(),r=t.shift(),c=r.message.substring(0,n.start),l=r.message.substring(n.end+1);return d([{type:"text",message:c},{type:"emote",id:n.id,source:"twitch",text:r.message.substring(n.start,n.end+1)},{type:"text",message:l}].concat(Object(o.a)(t)),e)}n(455),n(191),n(60);function v(t){return t.replace(/[.*+:?^${}()|[\]\\]/g,"\\$&")}function h(t,e,n){if(0===e.length)return t.filter((function(t){return!("text"===t.type&&""===t.message)}));var r=e.shift(),c=t.shift(),l=c.message.substring(0,r.index),f=c.message.substring(r.index+r[0].length+1),m=n[r[0]];return h([{type:"text",message:l},{type:"emote",id:m.id,source:m.source,text:r[0]},{type:"text",message:f}].concat(Object(o.a)(t)),e,n)}function x(t,e,n){var r=[];return t.forEach((function(t){if("text"!==t.type)r.push(t);else{var c=t,l=Object(o.a)(c.message.matchAll(n)),f=h([c],l.sort((function(a,b){return b.index-a.index})),e);r=[].concat(Object(o.a)(r),Object(o.a)(f))}})),r}function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var w=f.a.extend({data:function(){return{streamer:null,chat:null,betterTTVEmotes:[]}},created:function(){var t=this,e=this.$route.query.streamer;e||this.$router.push("/"),this.chat=new m.a({log:{enabled:!1}});var n=this.$auth.strategy.token.get().replace("Bearer ","");new m.c({token:n,clientId:"j4v0ozgahoc5t71kit5w8scuj5paw6"}).api.get("users",{search:{login:e}}).then((function(e){var data=e.data,n=Object(l.a)(data,1);t.streamer=n[0],t.createWebsocket(),t.fetchBetterTTVEmotes()}))},methods:{fetchBetterTTVEmotes:function(){var t,e,n=this,r=this.$axios.$get("https://api.betterttv.net/3/cached/emotes/global"),c=this.$axios.$get("https://api.betterttv.net/3/cached/frankerfacez/users/twitch/".concat(null===(t=this.streamer)||void 0===t?void 0:t.id)),l=this.$axios.$get("https://api.betterttv.net/3/cached/users/twitch/".concat(null===(e=this.streamer)||void 0===e?void 0:e.id)),f=function(t,source){return t.map((function(t){return y(y({},t),{},{source:source})}))};r.then((function(t){n.betterTTVEmotes=[].concat(Object(o.a)(n.betterTTVEmotes),Object(o.a)(f(t,"bttv")))})),c.then((function(t){n.betterTTVEmotes=[].concat(Object(o.a)(n.betterTTVEmotes),Object(o.a)(f(t,"ffz")))})),l.then((function(t){n.betterTTVEmotes=[].concat(Object(o.a)(n.betterTTVEmotes),Object(o.a)(f([].concat(Object(o.a)(t.sharedEmotes),Object(o.a)(t.channelEmotes)),"bttv")))})),[r,c,l].forEach((function(p){return p.catch((function(){}))}))},parseMessageEmotes:function(t,e){var n=[{type:"text",message:t}];return n=function(t,e){var n=Object.assign.apply(Object,[{}].concat(Object(o.a)(e.map((function(t){return Object(c.a)({},t.code,{id:t.id,source:t.source})})))));return x(t,n,new RegExp("\\b(".concat(Object.keys(n).map(v).join("|"),")\\b"),"g"))}(n=d(n,e=e.sort((function(a,b){return b.start-a.start}))),this.betterTTVEmotes)},createWebsocket:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c,l,f,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===(n=t.chat)||void 0===n?void 0:n.connect();case 2:return e.next=4,null===(r=t.chat)||void 0===r?void 0:r.join("#".concat(null===(o=t.streamer)||void 0===o?void 0:o.login));case 4:null===(c=t.chat)||void 0===c||c.on(m.b.PRIVATE_MESSAGE,(function(e){var text=e.message,n=e.tags,r=n.emotes,o={id:n.id,author:n.displayName,color:n.color,parts:t.parseMessageEmotes(text,r)};t.$nuxt.$emit("message",o)})),null===(d=null===(f=null===(l=t.chat)||void 0===l?void 0:l.on(m.b.SUBSCRIPTION,(function(e){t.$nuxt.$emit("subscription",{user:e.username,months:parseInt(e.parameters.cumulativeMonths,10)})})))||void 0===f?void 0:f.on(m.b.SUBSCRIPTION_GIFT,(function(e){t.$nuxt.$emit("subscriptionGift",{from:e.username,to:e.parameters.recipientUserName,months:e.parameters.months})})))||void 0===d||d.on(m.b.SUBSCRIPTION_GIFT_COMMUNITY,(function(e){t.$nuxt.$emit("subscriptionGiftCommunity",{from:e.username,count:e.parameters.massGiftCount})}));case 6:case"end":return e.stop()}}),e)})))()}},destroyed:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===(n=t.chat)||void 0===n?void 0:n.disconnect();case 2:case"end":return e.stop()}}),e)})))()}}),O=n(40),component=Object(O.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex flex-col h-screen max-h-screen py-8 px-16 lg:px-16"},[n("div",[t.streamer?n("h1",{staticClass:"text-xl"},[n("span",{staticClass:"font-semibold"},[t._v(t._s(t.streamer.displayName))]),t._v("'s chat\n      "),n("a",{staticClass:"px-5 py-3 text-sm text-purple-700",attrs:{href:"https://twitch.tv/"+t.streamer.login,target:"_blank"}},[t._v("\n        View on Twitch\n        "),n("font-awesome-icon",{attrs:{icon:["fab","twitch"]}})],1)]):t._e()]),t._v(" "),n("div",{staticClass:"flex flex-auto min-h-0"},[n("div",{staticClass:"w-2/3 flex flex-col flex-auto"},[n("most-used-emotes",{staticClass:"h-1/2"}),t._v(" "),n("subscriptions",{staticClass:"h-1/2"})],1),t._v(" "),n("chat",{staticClass:"w-1/3"})],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{MostUsedEmotes:n(318).default,Subscriptions:n(319).default,Chat:n(320).default})}}]);