<template>
  <div>
    <p>Subscriptions</p>
    <div>
      <div
        class="inline-flex"
        v-for="(container, index) in subscriptions"
        :key="index + '_' + container.type"
      >
        <span
          class="border-2 border-blue-700 rounded-md px-3 py-1 mr-2 mb-2"
          v-if="container.type === 'subscription'"
        >
          <strong>{{ container.info.user }}</strong>
          <span class="text-xs">
            {{ container.info.months }}
            {{ container.info.months > 1 ? 'months' : 'month' }}
          </span>
        </span>
        <span
          class="border-2 border-pink-700 rounded-md px-3 py-1 mr-2 mb-1"
          v-if="container.type === 'subscriptionGift'"
        >
          🎁 <strong>{{ container.info.from }}</strong> →
          <strong>{{ container.info.to }}</strong>
          <span class="text-xs">
            {{ container.info.months }}
            {{ container.info.months > 1 ? 'months' : 'month' }}
          </span>
        </span>
        <span
          class="border-2 border-purple-700 rounded-md px-3 py-1 mr-2 mb-1"
          v-if="container.type === 'subscriptionGiftCommunity'"
        >
          🎉 <strong>{{ container.info.from }}</strong> gifted
          {{ container.info.count }}
          {{ container.info.count > 1 ? 'subs' : 'sub' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Subscription,
  SubscriptionGift,
  SubscriptionGiftCommunity,
} from '../types/subscription'

interface SubscriptionContainer {
  type: 'subscription' | 'subscriptionGift' | 'subscriptionGiftCommunity'
  info: Subscription | SubscriptionGift | SubscriptionGiftCommunity
}

export default Vue.extend({
  data() {
    return {
      subscriptions: [] as SubscriptionContainer[],
      ignoreNextSubs: {} as Record<string, number>,
    }
  },
  created() {
    if (process.server) return

    this.$nuxt
      .$on('subscription', (subscription: Subscription) => {
        this.subscriptions = [
          {
            type: 'subscription',
            info: subscription,
          },
          ...this.subscriptions,
        ]
      })
      .$on('subscriptionGift', (subscriptionGift: SubscriptionGift) => {
        if (this.ignoreNextSubs[subscriptionGift.from] > 0) {
          // this gift is part of a community gift, we can ignore the next subs
          this.ignoreNextSubs[subscriptionGift.from] -= 1
          return
        }

        this.subscriptions = [
          {
            type: 'subscriptionGift',
            info: subscriptionGift,
          },
          ...this.subscriptions,
        ]
      })
      .$on(
        'subscriptionGiftCommunity',
        (subscriptionGiftCommunity: SubscriptionGiftCommunity) => {
          this.ignoreNextSubs[subscriptionGiftCommunity.from] =
            subscriptionGiftCommunity.count
          this.subscriptions = [
            {
              type: 'subscriptionGiftCommunity',
              info: subscriptionGiftCommunity,
            },
            ...this.subscriptions,
          ]
        }
      )
  },
})
</script>
