export interface BetterTTVEmote {
  id: string
  code: string
  userId: string
  source: 'bttv' | 'ffz'
}
export interface BetterTTVChannel {
  id: string
  channelEmotes: BetterTTVEmote[]
  sharedEmotes: BetterTTVEmote[]
}
