import { create } from "zustand"

type Message = {
  conversation_id: string
  sender: string
  content: string
  created_at: string
}

type Store = {
  messages: Record<string, Message[]>
  addMessage: (msg: Message) => void
}

export const useConversationStore = create<Store>((set) => ({
  messages: {},

  addMessage: (msg) =>
    set((state) => {
      const conv = state.messages[msg.conversation_id] || []
      return {
        messages: {
          ...state.messages,
          [msg.conversation_id]: [...conv, msg],
        },
      }
    }),
}))