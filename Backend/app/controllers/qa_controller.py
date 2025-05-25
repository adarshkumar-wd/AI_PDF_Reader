from transformers import pipeline
from langchain.llms import HuggingFacePipeline
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain.chains.question_answering import load_qa_chain
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
import os

class QuestionRequest(BaseModel):
    question: str

router = APIRouter()

# Load FAISS index
vector_store = FAISS.load_local(
    "faiss_index",
    HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"),
    allow_dangerous_deserialization=True
)

# Load transformers pipeline locally
qa_pipeline = pipeline(
    "text2text-generation",  # for models like T5
    model="google/flan-t5-small",  # or any other local-compatible model
    tokenizer="google/flan-t5-base"
)

# Wrap with LangChain
llm = HuggingFacePipeline(pipeline=qa_pipeline)

# Load QA Chain
qa_chain = load_qa_chain(llm, chain_type="stuff")

@router.post("/ask-question")
async def ask_question(data: QuestionRequest):
    try:
        docs = vector_store.similarity_search(data.question, k=3)
        response = qa_chain.run(input_documents=docs, question=data.question)
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
