from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Configure Gemini API
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-pro-exp-03-25")

app = FastAPI()

# Enable CORS for React (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    input: str

BASE_PROMPT = """
You are a legal assistant trained in Indian law. Analyze the following crime scenario and identify the applicable Indian Penal Code (IPC) sections.

Scenario:
{}

Provide only a list of relevant IPC sections along with their short and simple descriptions. Keep it concise and avoid any extra explanation or punctuation. Output must be in the form of Section name : section Discription
"""

@app.post("/predict")
async def predict(data: InputData):
    try:
        prompt_text = BASE_PROMPT.format(data.input)
        response = model.generate_content(prompt_text)
        result = response.text.strip()
        return {"output": result}
    except Exception as e:
        return {"output": f"Enter Vaild Data"}
        # return {"output": f"Error: {str(e)}"}
        

# Run
# uvicorn server1:app --reload