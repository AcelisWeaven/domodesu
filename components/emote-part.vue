<template>
  <img
    class="inline object-contain"
    :style="sizes"
    :src="
      'https://static-cdn.jtvnw.net/emoticons/v2/' +
      emote.id +
      '/default/light/' +
      size
    "
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { MessageEmotePart } from '../types/message'

export default Vue.extend({
  props: {
    emote: Object as () => MessageEmotePart,
    size: {
      type: String as () => '1.0' | '2.0' | '3.0',
      default: '1.0',
    },
  },
  computed: {
    sizes(): Record<string, string> {
      return {
        width: `${this.sizeInPx}px`,
        height: `${this.sizeInPx}px`,
      }
    },
    sizeInPx(): number {
      if (this.size === '1.0') return 28
      if (this.size === '2.0') return 56
      return 112
    },
  },
})
</script>
