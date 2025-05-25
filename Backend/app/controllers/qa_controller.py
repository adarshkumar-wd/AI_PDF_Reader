from fastapi import APIRouter, HTTPException
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI