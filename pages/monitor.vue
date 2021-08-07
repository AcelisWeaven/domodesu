<template>
  <div class="flex flex-col h-screen max-h-screen py-8 px-16 lg:px-16">
    <div>
      <h1 class="text-xl">
        <span class="font-semibold">{{ streamer }}</span
        >'s chat
        <a
          :href="'https://twitch.tv/' + streamer.toLowerCase()"
          target="_blank"
          class="text-sm text-purple-700"
          >View on Twitch</a
        >
      </h1>
    </div>
    <div class="flex flex-auto min-h-0">
      <most-used-emotes class="flex-auto w-2/3"></most-used-emotes>
      <chat class="w-1/3" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Chat, Events, UserStateTags, EmoteTag } from 'twitch-js'
import { Message, MessagePart, MessageTextPart } from '../types/message'
import applyTwitchEmotes from '../utils/applyTwitchEmotes'

export default Vue.extend({
  data() {
    return {
      streamer: null as string | null,
      chat: null as Chat | null,
    }
  },
  created() {
    this.streamer = <string | null>this.$route.query.streamer

    if (!this.streamer) this.$router.push('/')

    this.chat = new Chat({})
    this.createWebsocket()
  },
  methods: {
    parseMessageEmotes(message: string, emotes: EmoteTag[]): MessagePart[] {
      emotes = emotes.sort((a, b) => b.start - a.start)
      let parts = [<MessageTextPart>{ type: 'text', message }] as MessagePart[]
      parts = applyTwitchEmotes(parts, emotes)
      // TODO: BetterTTV emotes integration @see https://gist.github.com/chuckxD/377211b3dd3e8ca8dc505500938555eb
      return parts
    },
    async createWebsocket() {
      await this.chat?.connect()
      await this.chat?.join(`#${this.streamer}`)

      this.chat?.on(Events.PRIVATE_MESSAGE, (privateMessage) => {
        const text = privateMessage.message
        const tags = <UserStateTags>privateMessage.tags
        const { emotes } = tags
        const message = <Message>{
          id: tags.id,
          author: tags.displayName,
          color: tags.color,
          parts: this.parseMessageEmotes(text, emotes),
        }
        this.$nuxt.$emit('message', message)
      })
    },
  },
  async destroyed() {
    await this.chat?.disconnect()
  },
})
</script>
