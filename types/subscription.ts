export interface Subscription {
  user: string
  months: number
}

export interface SubscriptionGift {
  from: string
  to: string
  months: number
}

export interface SubscriptionGiftCommunity {
  from: string
  count: number
}
