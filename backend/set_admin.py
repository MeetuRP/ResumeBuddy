from pymongo.synchronous.mongo_client import MongoClient
from bson import ObjectId

client = MongoClient("mongodb://localhost:27017")
db = client["resume_analyzer"]
users_col = db["users"]

# Set is_admin for the user
oid = ObjectId("69a6c5153d6e083416112fe9")
users_col.update_one(
    filter={"_id": oid},
    update={"$set": {"is_admin": True}},
)
user = users_col.find_one({"_id": oid})
print(f"User: {user.get('email')}, is_admin: {user.get('is_admin')}")
client.close()
