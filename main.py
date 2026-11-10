from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from typing import Any
import json

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

client = MongoClient("mongodb://192.168.1.134:27017/")
db = client["cv"]

def serialize(doc: Any) -> Any:
    if isinstance(doc, list):
        return [serialize(d) for d in doc]
    if isinstance(doc, dict):
        return {k: serialize(v) for k, v in doc.items() if k != "_id"}
    if isinstance(doc, ObjectId):
        return str(doc)
    return doc

@app.get("/items")
def get_items():
    return serialize(list(db.items.find()))

@app.post("/items")
def add_item(item: dict):
    db.items.insert_one(item)
    return {"ok": True}

@app.delete("/items/{title}")
def delete_item(title: str):
    r = db.items.delete_one({"title": title})
    if r.deleted_count == 0:
        raise HTTPException(404, "Not found")
    return {"ok": True}

@app.get("/health")
def health():
    return {"ok": True}
