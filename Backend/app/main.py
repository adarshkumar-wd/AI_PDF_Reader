from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import pdf_controller  
from app.controllers import qa_controller

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    pdf_controller.router,
    prefix="/api",
    tags=["upload files"],
)

app.include_router(
    qa_controller.router,
    prefix="/api",
    tags=["Questions"],
)

@app.get("/")
async def root():
    return {"message": "Hello, World!"}