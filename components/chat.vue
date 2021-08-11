<template>
  <ul
    class="overflow-y-auto overflow-x-hidden break-words"
    v-chat-scroll="{
      always: false,
      scrollonremoved: true,
    }"
  >
    <li v-for="message in messages" :key="message.id">
      <span class="font-bold" :style="{ color: message.color }">
        {{ message.author }}:
      </span>
      <span v-for="(part, partIndex) in message.parts" :key="partIndex">
        <span v-if="part.type === 'text'">{{ part.message }}</span>
        <emote-part v-if="part.type === 'emote'" :emote="part" />
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
import { Message } from '../types/message'

Vue.use(VueChatScroll)
const MaxMessagesCount = 100
export default Vue.extend({
  data() {
    return {
      messages: [] as Message[],
    }
  },
  created() {
    this.$nuxt.$on('message', (message: Message) => {
      this.messages.push(message)
      this.messages.splice(0, this.messages.length - MaxMessagesCount)
    })
  },
})
</script>
