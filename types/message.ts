export interface MessagePart {
  type: string
}

export interface MessageTextPart extends MessagePart {
  type: 'text'
  message: string
}

export interface MessageEmotePart extends MessagePart {
  type: 'emote'
  id: string
  source: 'twitch'
  text: string
}

export interface Message {
  id: string
  author: string
  color: string
  parts: (MessageTextPart | MessageEmotePart)[]
}
