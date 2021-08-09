<template>
  <div>
    <p>Subscriptions</p>
    <div>
      <div class="inline-flex" v-for="container in subscriptions">
        <span
          class="border-2 border-blue-300 rounded-md px-3 py-1 mr-2"
          v-if="container.type === 'subscription'"
        >
          <strong>{{ container.info.user }}</strong>
          <span class="text-xs">
            {{ container.info.months }}
            {{ container.info.months > 1 ? 'months' : 'month' }}
          </span>
        </span>
        <span
          class="border-2 border-green-300 rounded-md px-3 py-1 mr-2"
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
          class="border-2 border-purple-300 rounded-md px-3 py-1 mr-2"
          v-if="container.type === 'subscriptionGiftCommunity'"
        >
          🎉 <strong>{{ container.info.from }}</strong> gifted
          {{ container.info.count }}
          {{ container.info.count > 1 ? 'subs' : 'sub' }}
          to community
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
