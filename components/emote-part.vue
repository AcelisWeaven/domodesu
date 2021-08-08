<template>
  <img class="inline object-contain" :style="cssProps" :src="url" />
</template>

<script lang="ts">
import Vue from 'vue'
import { MessageEmotePart } from '../types/message'

export default Vue.extend({
  props: {
    emote: Object as () => MessageEmotePart,
    size: {
      type: String as () => '1' | '2' | '3',
      default: '1',
    },
  },
  computed: {
    cssProps(): Record<string, string> {
      const props = {
        height: `${this.sizeInPx}px`,
      }
      if (this.emote.source === 'twitch') {
        props.width = `${this.sizeInPx}px`
      }
      return props
    },
    sizeInPx(): number {
      if (this.size === '1') return 28
      if (this.size === '2') return 56
      return 112
    },
    url(): string {
      if (this.emote.source === 'twitch')
        return `https://static-cdn.jtvnw.net/emoticons/v2/${this.emote.id}/default/light/${this.size}.0`
      if (this.emote.source === 'ffz')
        return `https://cdn.frankerfacez.com/emote/${this.emote.id}/${
          this.size === '3' ? '4' : this.size
        }`
      return `https://cdn.betterttv.net/emote/${this.emote.id}/${this.size}x`
    },
  },
})
</script>
