from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle

# Load the trained model
with open("ipc_model.pkl", "rb") as file:
    model = pickle.load(file)

app = FastAPI()

# Enable CORS to allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, change to frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

class InputData(BaseModel):
    input: str

@app.post("/predict")
def predict(data: InputData):
    try:
        prediction = model.predict([data.input])  # Ensure correct preprocessing
        return {"output": prediction[0]}
    except Exception as e:
        return {"error": str(e)}

# Run with: uvicorn server:app --reload
