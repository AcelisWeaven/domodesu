<template>
  <div>
    <p>Most used emotes in the past minute</p>
    <p>
      <transition-group name="cell" tag="div" class="container">
        <span
          class="inline-flex items-baseline mr-4 relative"
          v-for="emoteInfo in mostUsed"
          :key="emoteInfo.emote.source + '_' + emoteInfo.emote.id"
        >
          <span
            class="emote-appear"
            :key="
              emoteInfo.emote.source +
              '_' +
              emoteInfo.emote.id +
              '_emote_' +
              emoteInfo.total
            "
          >
            <emote-part :emote="emoteInfo.emote" size="2" />
          </span>
          <span
            class="
              absolute
              -bottom-1
              -right-1
              px-2
              bg-blue-400
              text-white
              font-thin
              text-sm
              rounded-full
              counter-appear
            "
            :key="
              emoteInfo.emote.source +
              '_' +
              emoteInfo.emote.id +
              '_counter_' +
              emoteInfo.total
            "
          >
            {{ emoteInfo.count }}
          </span>
        </span>
      </transition-group>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.cell-move {
  transition: transform 100ms;
}

.emote-appear {
  animation: emoteAppear 800ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes emoteAppear {
  from {
    transform: scale(1) rotate(0deg);
  }
  80% {
    transform: scale(0.6) rotate(8deg);
  }
  90% {
    transform: scale(1.1) rotate(4deg);
  }
  to {
    transform: scale(1) rotate(0deg);
  }
}
.counter-appear {
  animation: counterAppear 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes counterAppear {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Message, MessageEmotePart } from '../types/message'

interface EmoteStats {
  emote: MessageEmotePart
  occurrences: number[]
}

interface EmoteCount {
  emote: MessageEmotePart
  count: number
  total: number
}

export default Vue.extend({
  data() {
    return {
      emotes: {} as Record<string, undefined | EmoteStats>,
    }
  },
  created() {
    this.$nuxt.$on('message', (message: Message) => {
      message.parts
        .filter((p): p is MessageEmotePart => p.type === 'emote')
        .forEach((emote: MessageEmotePart) => {
          const emoteKey = `${emote.source}-${emote.id}`
          if (this.emotes[emoteKey] === undefined)
            Vue.set(this.emotes, emoteKey, <EmoteStats>{
              emote,
              occurrences: [],
            })
          this.emotes[emoteKey]?.occurrences.push(Date.now())
        })
    })
  },
  computed: {
    mostUsed(): EmoteCount[] {
      const now = Date.now()
      const delay = 60 * 1000 // 1 minute
      return Object.keys(this.emotes)
        .map(
          (key) =>
            <EmoteCount>{
              emote: this.emotes[key]?.emote,
              count: this.emotes[key]?.occurrences.filter(
                (o) => now - o < delay
              ).length,
              total: this.emotes[key]?.occurrences.length,
            }
        )
        .filter((e) => e.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 15)
    },
  },
})
</script>
