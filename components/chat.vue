<template>
  <ul>
    <li v-for="message in messages" :key="message.id">
      <span class="font-bold" :style="{ color: message.color }">
        {{ message.author }}:
      </span>
      <span v-for="(part, partIndex) in message.parts" :key="partIndex">
        <span v-if="part.type === 'text'">{{ part.message }}</span>
        <img
          class="inline"
          v-if="part.type === 'emote'"
          :src="
            'https://static-cdn.jtvnw.net/emoticons/v2/' +
            part.id +
            '/default/light/1.0'
          "
        />
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Message } from '../types/message'

export default Vue.extend({
  data() {
    return {
      messages: [] as Message[],
    }
  },
  created() {
    this.$nuxt.$on('message', (message: Message) => {
      this.messages = [message, ...this.messages]
    })
  },
})
</script>
