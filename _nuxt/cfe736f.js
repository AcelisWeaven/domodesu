(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{257:function(n,t,o){"use strict";o.d(t,"a",(function(){return f}));var r=o(122);var e=o(135),c=o(87);function f(n){return function(n){if(Array.isArray(n))return Object(r.a)(n)}(n)||Object(e.a)(n)||Object(c.a)(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},316:function(n,t,o){"use strict";o.r(t);var r=o(257),e=(o(55),o(1).a.extend({data:function(){return{subscriptions:[]}},created:function(){var n=this;this.$nuxt.$on("subscription",(function(t){n.subscriptions=[{type:"subscription",info:t}].concat(Object(r.a)(n.subscriptions))})).$on("subscriptionGift",(function(t){n.subscriptions=[{type:"subscriptionGift",info:t}].concat(Object(r.a)(n.subscriptions))})).$on("subscriptionGiftCommunity",(function(t){n.subscriptions=[{type:"subscriptionGiftCommunity",info:t}].concat(Object(r.a)(n.subscriptions))}))}})),c=o(39),component=Object(c.a)(e,(function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("div",[o("p",[n._v("Subscriptions")]),n._v(" "),o("div",n._l(n.subscriptions,(function(t){return o("div",{staticClass:"inline-flex"},["subscription"===t.type?o("span",{staticClass:"border-2 border-blue-300 rounded-md px-3 py-1 mr-2"},[o("strong",[n._v(n._s(t.info.user))]),n._v(" "),o("span",{staticClass:"text-xs"},[n._v("\n          "+n._s(t.info.months)+"\n          "+n._s(t.info.months>1?"months":"month")+"\n        ")])]):n._e(),n._v(" "),"subscriptionGift"===t.type?o("span",{staticClass:"border-2 border-green-300 rounded-md px-3 py-1 mr-2"},[n._v("\n        🎁 "),o("strong",[n._v(n._s(t.info.from))]),n._v(" →\n        "),o("strong",[n._v(n._s(t.info.to))]),n._v(" "),o("span",{staticClass:"text-xs"},[n._v("\n          "+n._s(t.info.months)+"\n          "+n._s(t.info.months>1?"months":"month")+"\n        ")])]):n._e(),n._v(" "),"subscriptionGiftCommunity"===t.type?o("span",{staticClass:"border-2 border-purple-300 rounded-md px-3 py-1 mr-2"},[n._v("\n        🎉 "),o("strong",[n._v(n._s(t.info.from))]),n._v(" gifted\n        "+n._s(t.info.count)+"\n        "+n._s(t.info.count>1?"subs":"sub")+"\n        to community\n      ")]):n._e()])})),0)])}),[],!1,null,null,null);t.default=component.exports}}]);