from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from models.conversation import Conversation, Message
from datetime import datetime

# 🔌 import websocket manager
from core.realtime.manager import manager


class ConversationTool:

    @staticmethod
    async def list_conversations(db: AsyncSession):
        result = await db.execute(
            select(Conversation).order_by(Conversation.last_message_at.desc())
        )
        return result.scalars().all()

    @staticmethod
    async def get_messages(db: AsyncSession, conversation_id):
        result = await db.execute(
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
        )
        return result.scalars().all()

    @staticmethod
    async def create_message(db: AsyncSession, conversation_id, sender, content):
        try:
            # 🧱 Create message
            msg = Message(
                conversation_id=conversation_id,
                sender=sender,
                content=content,
            )

            db.add(msg)

            # 🧠 Update conversation timestamp
            await db.execute(
                update(Conversation)
                .where(Conversation.id == conversation_id)
                .values(last_message_at=datetime.utcnow())
            )

            await db.commit()
            await db.refresh(msg)

            # 🚀 Emit real-time event
            event = {
                "type": "new_message",
                "data": {
                    "id": str(msg.id),
                    "conversation_id": str(conversation_id),
                    "sender": sender,
                    "content": content,
                    "created_at": msg.created_at.isoformat(),
                },
            }

            await manager.broadcast(event)

            return msg

        except Exception as e:
            await db.rollback()
            raise e