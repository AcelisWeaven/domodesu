(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{259:function(t,e,c){"use strict";c.r(e);c(55);var n=c(1).a.extend({props:{emote:Object,size:{type:String,default:"1"}},computed:{cssProps:function(){var t={height:"".concat(this.sizeInPx,"px")};return"twitch"===this.emote.source&&(t.width="".concat(this.sizeInPx,"px")),t},sizeInPx:function(){return"1"===this.size?28:"2"===this.size?56:112},url:function(){return"twitch"===this.emote.source?"https://static-cdn.jtvnw.net/emoticons/v2/".concat(this.emote.id,"/default/light/").concat(this.size,".0"):"ffz"===this.emote.source?"https://cdn.frankerfacez.com/emote/".concat(this.emote.id,"/").concat("3"===this.size?"4":this.size):"https://cdn.betterttv.net/emote/".concat(this.emote.id,"/").concat(this.size,"x")}}}),o=c(39),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("img",{staticClass:"inline object-contain",style:t.cssProps,attrs:{src:t.url,alt:t.emote.text,title:t.emote.text}})}),[],!1,null,null,null);e.default=component.exports}}]);