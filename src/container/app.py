from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def ready():
    return {
        "status": 200,
        "message": "success"
    }

@app.post("/")
async def lambda_handler(info : Request):
    eventBody = await info.json()
    return {
        "status": 200,
        "body": json.dumps(eventBody)
    }

if __name__ == '__main__':
    uvicorn.run(app, port=80, host='0.0.0.0')