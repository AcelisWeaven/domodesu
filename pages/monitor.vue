<template>
  <div class="my-8 mx-16 lg:mx-16">
    <h1 class="text-xl">
      <span class="font-semibold">{{ streamer }}</span
      >'s chat
    </h1>
    <a :href="'https://twitch.tv/' + streamer.toLowerCase()" target="_blank"
      >View on Twitch</a
    >

    <chat />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Chat, Events, UserStateTags, EmoteTag } from 'twitch-js'
import {
  Message,
  MessageEmotePart,
  MessagePart,
  MessageTextPart,
} from '../types/message'

// TODO: BetterTTV emotes integration @see https://gist.github.com/chuckxD/377211b3dd3e8ca8dc505500938555eb
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
    parseMessageEmotes(message: string, emotes: EmoteTag[]) {
      emotes = emotes.sort((a, b) => b.start - a.start)
      const parts = [<MessageTextPart>{ type: 'text', message }]
      return this.applyEmotes(parts, emotes)
    },
    applyEmotes(parts: MessagePart[], emotes: EmoteTag[]): MessagePart[] {
      if (emotes.length === 0) {
        // processing is done, let's remove the empty text chunks
        return parts.filter(
          (part) =>
            !(part.type === 'text' && (<MessageTextPart>part).message === '')
        )
      }

      const emoteToApply = <EmoteTag>emotes.shift()
      const messageToSplit = <MessageTextPart>parts.shift()
      const beforeString = messageToSplit.message.substring(
        0,
        emoteToApply.start
      )
      const endString = messageToSplit.message.substring(emoteToApply.end + 1)
      return this.applyEmotes(
        [
          <MessageTextPart>{ type: 'text', message: beforeString },
          <MessageEmotePart>{ type: 'emote', id: emoteToApply.id },
          <MessageTextPart>{ type: 'text', message: endString },
          ...parts,
        ],
        emotes
      )
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
