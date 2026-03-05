from ..database import get_db
from datetime import datetime


async def log_event(event_type: str, user_id: str = None, metadata: dict = None):
    """Log a site event for admin analytics."""
    db = get_db()
    if db is None:
        return

    event = {
        "event_type": event_type,
        "user_id": user_id,
        "metadata": metadata or {},
        "timestamp": datetime.utcnow(),
    }
    await db.site_events.insert_one(event)
