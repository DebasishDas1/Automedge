import uuid
from sqlalchemy import Column, String, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from core.database import Base


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lead_id = Column(UUID(as_uuid=True), nullable=True)
    channel = Column(String, nullable=False)  # facebook, instagram, email, whatsapp
    assigned_agent_id = Column(UUID(as_uuid=True), nullable=True)
    status = Column(String, default="open")
    last_message_at = Column(DateTime, default=datetime.utcnow)


class Message(Base):
    __tablename__ = "messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id"))
    sender = Column(String, nullable=False)  # user | agent | ai
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)