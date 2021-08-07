import { EmoteTag } from 'twitch-js'
import {
  MessageEmotePart,
  MessagePart,
  MessageTextPart,
} from '../types/message'

export default function applyTwitchEmotes(
  parts: MessagePart[],
  emotes: EmoteTag[]
): MessagePart[] {
  if (emotes.length === 0) {
    // processing is done, let's remove the empty text chunks
    return parts.filter(
      (part) =>
        !(part.type === 'text' && (<MessageTextPart>part).message === '')
    )
  }

  const emoteToApply = <EmoteTag>emotes.shift()
  const messageToSplit = <MessageTextPart>parts.shift()
  const beforeString = messageToSplit.message.substring(0, emoteToApply.start)
  const endString = messageToSplit.message.substring(emoteToApply.end + 1)
  return applyTwitchEmotes(
    [
      <MessageTextPart>{ type: 'text', message: beforeString },
      <MessageEmotePart>{
        type: 'emote',
        id: emoteToApply.id,
        source: 'twitch',
        text: messageToSplit.message.substring(
          emoteToApply.start,
          emoteToApply.end + 1
        ),
      },
      <MessageTextPart>{ type: 'text', message: endString },
      ...parts,
    ],
    emotes
  )
}
