# faiss_service.py
from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import faiss
import pickle

# Load model, FAISS index, and answers
model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("faq_index.faiss")
with open("faq_answers.pkl", "rb") as f:
    answers = pickle.load(f)

# FastAPI app
app = FastAPI()

class QueryRequest(BaseModel):
    question: str
    top_k: int = 1

@app.post("/query")
def query(req: QueryRequest):
    # Encode question
    embedding = model.encode([req.question], convert_to_numpy=True)
    # Search FAISS
    distances, indices = index.search(embedding, req.top_k)
    # Collect results
    results = [{"answer": answers[i], "distance": float(d)} for i, d in zip(indices[0], distances[0])]
    return {"results": results}
