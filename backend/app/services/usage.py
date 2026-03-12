from ..database import get_db
from bson import ObjectId

async def increment_user_usage(user_id: str, usage_type: str):
    """
    Increments a specific usage counter for a user.
    Types: 'resume_evaluations', 'jd_scans_used', 'fix_it_used', 'cover_letters_generated'
    """
    db = get_db()
    await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$inc": {f"usage.{usage_type}": 1}}
    )

async def update_ai_usage(user_id: str, input_tokens: int, output_tokens: int):
    """
    Updates AI usage statistics and estimates cost.
    cost_per_1k_tokens = 0.000015
    """
    cost_per_1k = 0.000015
    estimated_cost = (input_tokens + output_tokens) / 1000 * cost_per_1k
    
    db = get_db()
    await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {
            "$inc": {
                "ai_usage.total_api_calls": 1,
                "ai_usage.total_input_tokens": input_tokens,
                "ai_usage.total_output_tokens": output_tokens,
                "ai_usage.estimated_cost": estimated_cost
            }
        }
    )
