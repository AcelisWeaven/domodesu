(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{300:function(t,e,n){"use strict";n.r(e);var r=n(266),o=(n(55),n(1).a.extend({data:function(){return{messages:[]}},created:function(){var t=this;this.$nuxt.$on("message",(function(e){t.messages=[e].concat(Object(r.a)(t.messages))}))}})),c=n(39),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",t._l(t.messages,(function(e){return n("li",{key:e.id},[n("span",{staticClass:"font-bold",style:{color:e.color}},[t._v("\n      "+t._s(e.author)+":\n    ")]),t._v(" "),t._l(e.parts,(function(e,r){return n("span",{key:r},["text"===e.type?n("span",[t._v(t._s(e.message))]):t._e(),t._v(" "),"emote"===e.type?n("img",{staticClass:"inline",attrs:{src:"https://static-cdn.jtvnw.net/emoticons/v2/"+e.id+"/default/light/1.0"}}):t._e()])}))],2)})),0)}),[],!1,null,null,null);e.default=component.exports},439:function(t,e){},444:function(t,e,n){"use strict";n.r(e);var r=n(6),o=n(266),c=(n(41),n(302),n(37),n(55),n(132),n(1)),l=n(442),m=c.a.extend({data:function(){return{streamer:null,chat:null}},created:function(){this.streamer=this.$route.query.streamer,this.streamer||this.$router.push("/"),this.chat=new l.a({}),this.createWebsocket()},methods:{parseMessageEmotes:function(t,e){e=e.sort((function(a,b){return b.start-a.start}));var n=[{type:"text",message:t}];return this.applyEmotes(n,e)},applyEmotes:function(t,e){if(0===e.length)return t.filter((function(t){return!("text"===t.type&&""===t.message)}));var n=e.shift(),r=t.shift(),c=r.message.substring(0,n.start),l=r.message.substring(n.end+1);return this.applyEmotes([{type:"text",message:c},{type:"emote",id:n.id},{type:"text",message:l}].concat(Object(o.a)(t)),e)},createWebsocket:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===(n=t.chat)||void 0===n?void 0:n.connect();case 2:return e.next=4,null===(r=t.chat)||void 0===r?void 0:r.join("#".concat(t.streamer));case 4:null===(o=t.chat)||void 0===o||o.on(l.b.PRIVATE_MESSAGE,(function(e){var text=e.message,n=e.tags,r=n.emotes,o={id:n.id,author:n.displayName,color:n.color,parts:t.parseMessageEmotes(text,r)};t.$nuxt.$emit("message",o)}));case 5:case"end":return e.stop()}}),e)})))()}},destroyed:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===(n=t.chat)||void 0===n?void 0:n.disconnect();case 2:case"end":return e.stop()}}),e)})))()}}),d=n(39),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my-8 mx-16 lg:mx-16"},[n("h1",{staticClass:"text-xl"},[n("span",{staticClass:"font-semibold"},[t._v(t._s(t.streamer))]),t._v("'s chat\n  ")]),t._v(" "),n("chat")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Chat:n(300).default})}}]);