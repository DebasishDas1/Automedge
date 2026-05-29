from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from tools.conversation_tool import ConversationTool

router = APIRouter()


@router.get("/")
async def list_conversations(db: AsyncSession = Depends(get_db)):
    return await ConversationTool.list_conversations(db)


@router.get("/{conversation_id}/messages")
async def get_messages(conversation_id: str, db: AsyncSession = Depends(get_db)):
    return await ConversationService.get_messages(db, conversation_id)


@router.post("/{conversation_id}/messages")
async def send_message(conversation_id: str, payload: dict, db: AsyncSession = Depends(get_db)):
    return await ConversationService.create_message(
        db,
        conversation_id,
        payload["sender"],
        payload["content"]
    )