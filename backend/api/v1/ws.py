from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from core.realtime.manager import manager

router = APIRouter()


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(user_id, websocket)

    try:
        while True:
            data = await websocket.receive_text()
            # Optional: handle incoming events from frontend
            print(f"Received from {user_id}: {data}")

    except WebSocketDisconnect:
        manager.disconnect(user_id)