(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{274:function(e,t){},276:function(e,t,n){"use strict";var r=n(2),l=n(72).find,o=n(131),c="find",d=!0;c in[]&&Array(1).find((function(){d=!1})),r({target:"Array",proto:!0,forced:d},{find:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}}),o(c)},304:function(e,t,n){"use strict";n.r(t);var r=n(260),l=(n(56),n(73),n(40),n(11),n(37),n(55),n(33),n(276),n(1)),o=n(277),c=l.a.extend({data:function(){return{followedStreams:[],followedUsers:[],refreshInterval:null,profilePictures:[],api:null,isSyncing:!1}},created:function(){var e=this.$auth.strategy.token.get().replace("Bearer ",""),t=new o.c({token:e,clientId:"your-twitch-client-id"});this.api=t.api,this.refresh()},destroyed:function(){null!==this.refreshInterval&&window.clearInterval(this.refreshInterval)},methods:{refresh:function(){var e,t,n=this;this.isSyncing||(this.isSyncing=!0,null===(e=this.api)||void 0===e||e.get("streams/followed",{search:{user_id:null===(t=this.$auth.user)||void 0===t?void 0:t.id}}).then((function(e){var t,r;n.followedStreams=e.data.map((function(s){return{id:s.userId,thumbnail:s.thumbnailUrl.replace("{width}","404").replace("{height}","227"),isLive:!0,displayName:s.userName,viewerCount:s.viewerCount}})),null===(t=n.api)||void 0===t||t.get("users/follows",{search:{from_id:null===(r=n.$auth.user)||void 0===r?void 0:r.id}}).then((function(e){n.followedUsers=e.data.filter((function(u){return!n.followedStreams.some((function(s){return s.displayName===u.toName}))})).map((function(u){return{id:u.toId,isLive:!1,displayName:u.toName,viewerCount:0}})),n.refreshProfilePictures()})).finally((function(){n.isSyncing=!1}))})).catch((function(){n.isSyncing=!1})))},refreshProfilePictures:function(){var e,t=this,n=[].concat(Object(r.a)(this.followedStreams),Object(r.a)(this.followedUsers)).map((function(e){return e.id})).filter((function(e){return!t.profilePictures.some((function(p){return p.id===e}))}));0!==n.length&&(null===(e=this.api)||void 0===e||e.get("users",{search:{id:n}}).then((function(e){e.data.forEach((function(e){t.profilePictures.push({id:e.id,picture:e.profileImageUrl})}))})))},getUserPicture:function(e){var t;return null===(t=this.profilePictures.find((function(p){return p.id===e})))||void 0===t?void 0:t.picture}}}),d=n(39),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("div",{staticClass:"text-center mb-4"},[n("div",{staticClass:"text-xl"},[e._v("Select a channel")]),e._v(" "),n("div",{staticClass:"font-bold text-sm tracking-wider uppercase"},[e._v("\n        "+e._s(e.followedStreams.length)+" online\n        "),n("button",{staticClass:"hover:text-purple-700",on:{click:e.refresh}},[n("font-awesome-icon",{class:{"fa-spin":e.isSyncing,"text-purple-500":e.isSyncing},attrs:{icon:"sync-alt"}})],1),e._v("\n        / "+e._s(e.followedUsers.length)+" offline\n      ")])]),e._v(" "),n("div",{staticClass:"\n        grid\n        gap-4\n        grid-cols-1\n        sm:grid-cols-2\n        md:grid-cols-3\n        lg:grid-cols-4\n      "},e._l(e.followedStreams,(function(t){return n("nuxt-link",{key:t.displayName,staticClass:"\n          flex flex-col\n          items-center\n          rounded-lg\n          shadow-lg\n          overflow-hidden\n          cursor-pointer\n          hover:opacity-80\n        ",attrs:{to:"/monitor?streamer="+t.displayName}},[t.thumbnail?n("img",{staticClass:"w-full",attrs:{src:t.thumbnail,width:"404",height:"227"}}):e._e(),e._v(" "),n("div",{staticClass:"flex items-center w-full"},[e.getUserPicture(t.id)?n("img",{staticClass:"mr-4 inline-flex flex-grow-0 h-16 w-16 bg-gray-100",attrs:{src:e.getUserPicture(t.id)}}):n("span",{staticClass:"mr-4 inline-flex h-16 w-16 bg-gray-100"}),e._v(" "),n("div",{staticClass:"flex flex-col"},[n("div",[t.isLive?n("span",{staticClass:"inline-flex relative h-3 w-3 mr-1"},[n("span",{staticClass:"\n                    animate-ping\n                    absolute\n                    inline-flex\n                    h-full\n                    w-full\n                    rounded-full\n                    bg-red-400\n                    opacity-75\n                  "}),e._v(" "),n("span",{staticClass:"relative inline-flex rounded-full h-3 w-3 bg-red-500"})]):e._e(),e._v(" "),n("span",{staticClass:"text-xl font-semibold"},[e._v("\n                "+e._s(t.displayName)+"\n              ")])]),e._v(" "),t.viewerCount>0?n("span",{staticClass:"font-light"},[e._v("\n              "+e._s(t.viewerCount)+" viewers\n            ")]):e._e()])])])})),1)]),e._v(" "),n("div",{staticClass:"my-8"},[n("div",{staticClass:"\n        grid\n        gap-4\n        grid-cols-1\n        md:grid-cols-2\n        lg:grid-cols-3\n        xl:grid-cols-4\n      "},e._l(e.followedUsers,(function(t){return n("nuxt-link",{key:t.displayName,staticClass:"\n          flex flex-row\n          items-center\n          rounded-lg\n          shadow-lg\n          overflow-hidden\n          cursor-pointer\n          hover:opacity-80\n        ",attrs:{to:"/monitor?streamer="+t.displayName}},[e.getUserPicture(t.id)?n("img",{staticClass:"inline h-16 w-16",attrs:{src:e.getUserPicture(t.id)}}):n("div",{staticClass:"h-16 w-16 bg-gray-100"}),e._v(" "),n("div",{staticClass:"my-2 mx-4"},[n("span",{staticClass:"text-xl font-semibold"},[e._v("\n            "+e._s(t.displayName)+"\n          ")])])])})),1)])])}),[],!1,null,null,null);t.default=component.exports}}]);