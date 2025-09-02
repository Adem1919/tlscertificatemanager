# generate_embeddings_faiss.py
import pandas as pd
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle

# 1️⃣ Load your CSV
csv_file = "../../../../../resources/dataset.csv"
df = pd.read_csv(csv_file)

questions = df['Question'].tolist()
answers = df['Answer'].tolist()

# 2️⃣ Load a sentence-transformers model
# You can change the model name if you want higher quality (e.g., "all-mpnet-base-v2")
model = SentenceTransformer("all-MiniLM-L6-v2")

# 3️⃣ Generate embeddings for each question
embeddings = model.encode(questions, convert_to_numpy=True, dtype=np.float32)

# 4️⃣ Create FAISS index
dimension = embeddings.shape[1]  # embedding size
index = faiss.IndexFlatL2(dimension)  # L2 distance
index.add(embeddings)

# 5️⃣ Save FAISS index and answers
faiss.write_index(index, "faq_index.faiss")
with open("faq_answers.pkl", "wb") as f:
    pickle.dump(answers, f)

print("✅ FAISS index and answers saved locally. Ready for testing!")
