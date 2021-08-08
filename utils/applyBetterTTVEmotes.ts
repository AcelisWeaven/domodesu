import {
  MessageEmotePart,
  MessagePart,
  MessageTextPart,
} from '../types/message'
import { BetterTTVEmote } from '../types/betterTTV'

// BetterTTV emotes integration
// @see https://gist.github.com/chuckxD/377211b3dd3e8ca8dc505500938555eb
function escape(string: string): string {
  return string.replace(/[.*+:?^${}()|[\]\\]/g, '\\$&')
}

interface EmoteInfo {
  id: string
  source: 'bttv' | 'ffz'
}

function createEmotesParts(
  parts: MessagePart[],
  matches: RegExpExecArray[],
  emoteCodeToId: Record<string, EmoteInfo>
): MessagePart[] {
  if (matches.length === 0) {
    // processing is done, let's remove the empty text chunks
    return parts.filter(
      (part) =>
        !(part.type === 'text' && (<MessageTextPart>part).message === '')
    )
  }

  const emoteToApply = <RegExpExecArray>matches.shift()
  const messageToSplit = <MessageTextPart>parts.shift()
  const beforeString = messageToSplit.message.substring(0, emoteToApply.index)
  const endString = messageToSplit.message.substring(
    emoteToApply.index + emoteToApply[0].length + 1
  )
  const emoteInfo = emoteCodeToId[emoteToApply[0]]

  return createEmotesParts(
    [
      <MessageTextPart>{ type: 'text', message: beforeString },
      <MessageEmotePart>{
        type: 'emote',
        id: emoteInfo.id,
        source: emoteInfo.source,
        text: emoteToApply[0],
      },
      <MessageTextPart>{ type: 'text', message: endString },
      ...parts,
    ],
    matches,
    emoteCodeToId
  )
}

function applyEmotes(
  parts: MessagePart[],
  emoteCodeToId: Record<string, EmoteInfo>,
  allEmotesRegex: RegExp
): MessagePart[] {
  let parsedParts = [] as MessagePart[]

  parts.forEach((part) => {
    if (part.type !== 'text') {
      parsedParts.push(part)
    } else {
      const textPart = <MessageTextPart>part
      // Regarding the cast, @see https://github.com/microsoft/TypeScript/issues/36788
      const matches = <RegExpExecArray[]>[
        ...textPart.message.matchAll(allEmotesRegex),
      ]

      const splitParts = createEmotesParts(
        [textPart],
        matches.sort((a, b) => b.index - a.index),
        emoteCodeToId
      )
      parsedParts = [...parsedParts, ...splitParts]
    }
  })
  return parsedParts
}

export default function applyBetterTTVEmotes(
  parts: MessagePart[],
  emotes: BetterTTVEmote[]
): MessagePart[] {
  const emoteCodeToId = Object.assign(
    {},
    ...emotes.map((e) => ({
      [e.code]: {
        id: e.id,
        source: e.source,
      },
    }))
  )
  const allEmotesRegex = new RegExp(
    `\\b(${Object.keys(emoteCodeToId).map(escape).join('|')})\\b`,
    'g'
  )

  return applyEmotes(parts, emoteCodeToId, allEmotesRegex)
}
