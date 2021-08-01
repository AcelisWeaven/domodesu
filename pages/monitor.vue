<template>
  <div class="my-8 mx-16 lg:mx-16">
    <h1 class="text-xl">
      <span class="font-semibold">{{ streamer }}</span
      >'s chat
    </h1>
    <ul>
      <li v-for="message in messages" :key="message.index">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Chat, Events, UserStateTags, EmoteTag } from 'twitch-js'

interface MessagePart {
  type: string
}
interface MessageTextPart extends MessagePart {
  type: 'text'
  message: string
}
interface MessageEmotePart extends MessagePart {
  type: 'emote'
  id: string
}

interface Message {
  index: number
  author: string
  color: string
  parts: MessagePart[]
}

// TODO: BetterTTV emotes integration @see https://gist.github.com/chuckxD/377211b3dd3e8ca8dc505500938555eb
export default Vue.extend({
  data() {
    return {
      streamer: null as string | null,
      chat: null as Chat | null,
      messages: [] as Message[],
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
        const { message, tags } = privateMessage
        const { emotes } = <UserStateTags>tags
        this.messages = [
          <Message>{
            index: this.messages.length,
            author: tags.displayName,
            color: (<UserStateTags>tags).color,
            parts: this.parseMessageEmotes(message, emotes),
          },
          ...this.messages,
        ]
      })
    },
  },
  async destroyed() {
    await this.chat?.disconnect()
  },
})
</script>
