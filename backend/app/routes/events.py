from fastapi import APIRouter, Request
from ..services.events import log_event

router = APIRouter()

@router.post("/visit")
async def track_visit(request: Request):
    """Log a site visit event."""
    client_host = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    
    await log_event(
        event_type="site_visit",
        metadata={
            "ip": client_host,
            "user_agent": user_agent
        }
    )
    return {"status": "ok"}
