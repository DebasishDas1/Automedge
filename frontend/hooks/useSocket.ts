import { useEffect } from "react"
import { useConversationStore } from "@/lib/zustand/conversationStore"

export const useSocket = (userId: string) => {
  const addMessage = useConversationStore((s) => s.addMessage)

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${userId}`)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === "new_message") {
        addMessage(data.data)
      }
    }

    ws.onclose = () => {
      console.log("WebSocket disconnected")
    }

    return () => ws.close()
  }, [userId])
}