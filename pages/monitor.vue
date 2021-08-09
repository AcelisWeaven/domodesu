<template>
  <div class="flex flex-col h-screen max-h-screen py-8 px-16 lg:px-16">
    <div>
      <h1 class="text-xl" v-if="streamer">
        <span class="font-semibold">{{ streamer.displayName }}</span
        >'s chat
        <a
          :href="'https://twitch.tv/' + streamer.login"
          target="_blank"
          class="text-sm text-purple-700"
          >View on Twitch</a
        >
      </h1>
    </div>
    <div class="flex flex-auto min-h-0">
      <div class="w-2/3 flex flex-col flex-auto">
        <most-used-emotes class="h-1/2"></most-used-emotes>
        <subscriptions class="h-1/2"></subscriptions>
      </div>
      <chat class="w-1/3" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TwitchJs, { Chat, Events, UserStateTags, EmoteTag } from 'twitch-js'
import { Message, MessagePart, MessageTextPart } from '../types/message'
import applyTwitchEmotes from '../utils/applyTwitchEmotes'
import { TwitchUserProfile } from '../types/twitch'
import applyBetterTTVEmotes from '../utils/applyBetterTTVEmotes'
import { BetterTTVChannel, BetterTTVEmote } from '../types/betterTTV'
import {
  Subscription,
  SubscriptionGift,
  SubscriptionGiftCommunity,
} from '../types/subscription'

export default Vue.extend({
  data() {
    return {
      streamer: null as TwitchUserProfile | null,
      chat: null as Chat | null,
      betterTTVEmotes: [] as BetterTTVEmote[],
    }
  },
  created() {
    const streamerLogin = <string | null>this.$route.query.streamer

    if (!streamerLogin) this.$router.push('/')

    this.chat = new Chat({
      log: {
        enabled: false,
      },
    })

    const token = (<any>this.$auth.strategy).token.get().replace('Bearer ', '')
    const twitchJs = new TwitchJs({
      token,
      clientId: process.env.twitchClientId,
    })
    twitchJs.api
      .get('users', {
        search: {
          login: streamerLogin,
        },
      })
      .then(({ data }: { data: TwitchUserProfile[] }) => {
        ;[this.streamer] = data
        this.createWebsocket()
        this.fetchBetterTTVEmotes()
      })
  },
  methods: {
    fetchBetterTTVEmotes() {
      const globalBTTVEmotesPromise = this.$axios.$get(
        'https://api.betterttv.net/3/cached/emotes/global'
      ) as Promise<BetterTTVEmote[]>
      const frankerfacezEmotesPromise = this.$axios.$get(
        `https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${this.streamer?.id}`
      ) as Promise<BetterTTVEmote[]>
      const channelBTTVEmotesPromise = this.$axios.$get(
        `https://api.betterttv.net/3/cached/users/twitch/${this.streamer?.id}`
      ) as Promise<BetterTTVChannel>
      const setEmoteSource = (
        emotes: BetterTTVEmote[],
        source: 'bttv' | 'ffz'
      ): BetterTTVEmote[] => emotes.map((e) => ({ ...e, source }))

      globalBTTVEmotesPromise.then((globalEmotes) => {
        this.betterTTVEmotes = [
          ...this.betterTTVEmotes,
          ...setEmoteSource(globalEmotes, 'bttv'),
        ]
      })
      frankerfacezEmotesPromise.then((frankerfacezEmotes) => {
        this.betterTTVEmotes = [
          ...this.betterTTVEmotes,
          ...setEmoteSource(frankerfacezEmotes, 'ffz'),
        ]
      })
      channelBTTVEmotesPromise.then((channelInfo) => {
        this.betterTTVEmotes = [
          ...this.betterTTVEmotes,
          ...setEmoteSource(
            [...channelInfo.sharedEmotes, ...channelInfo.channelEmotes],
            'bttv'
          ),
        ]
      })

      // ignore errors silently (user may not use BTTV)
      ;[
        globalBTTVEmotesPromise,
        frankerfacezEmotesPromise,
        channelBTTVEmotesPromise,
      ].forEach((p) => p.catch(() => {}))
    },
    parseMessageEmotes(
      message: string,
      twitchEmotes: EmoteTag[]
    ): MessagePart[] {
      twitchEmotes = twitchEmotes.sort((a, b) => b.start - a.start)
      let parts = [<MessageTextPart>{ type: 'text', message }] as MessagePart[]
      parts = applyTwitchEmotes(parts, twitchEmotes)
      parts = applyBetterTTVEmotes(parts, this.betterTTVEmotes)
      return parts
    },
    async createWebsocket() {
      await this.chat?.connect()
      await this.chat?.join(`#${this.streamer?.login}`)

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
      this.chat
        ?.on(Events.SUBSCRIPTION, (userStateMessage: any) => {
          this.$nuxt.$emit('subscription', <Subscription>{
            user: userStateMessage.username,
            months: parseInt(userStateMessage.parameters.cumulativeMonths, 10),
          })
        })
        ?.on(Events.SUBSCRIPTION_GIFT, (userStateMessage: any) => {
          this.$nuxt.$emit('subscriptionGift', <SubscriptionGift>{
            from: userStateMessage.username,
            to: userStateMessage.parameters.recipientUserName,
            months: userStateMessage.parameters.months,
          })
        })
        ?.on(Events.SUBSCRIPTION_GIFT_COMMUNITY, (userStateMessage: any) => {
          this.$nuxt.$emit('subscriptionGift', <SubscriptionGiftCommunity>{
            from: userStateMessage.username,
            count: userStateMessage.parameters.massGiftCount,
          })
        })
    },
  },
  async destroyed() {
    await this.chat?.disconnect()
  },
})
</script>
