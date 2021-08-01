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
}

export interface Message {
  index: number
  author: string
  color: string
  parts: (MessageTextPart | MessageEmotePart)[]
}
