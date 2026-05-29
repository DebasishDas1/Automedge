"use client";

import { useSocket } from "@/hooks/useSocket";

export default function InboxPage() {
  useSocket("agent-123"); // temporary hardcoded user

  return <div>Inbox running...</div>;
}
