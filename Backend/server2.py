from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle

with open("ipc_model.pkl", "rb") as file:
    model = pickle.load(file)

app = FastAPI()

# Enable CORS to allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow all origins, change to frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

class InputData(BaseModel):
    input: str

@app.post("/fir")
def predict(data: InputData):
    try:
        prediction = model.predict([data.input])  # Ensure correct preprocessing
        return {"output": prediction[0]}
    except Exception as e:
        return {"error": str(e)}

# Run
# uvicorn server2:app --reload