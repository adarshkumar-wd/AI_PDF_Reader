from fastapi import APIRouter, HTTPException, UploadFile, File
from app.services.pdf_reader import extract_text_from_pdf

router = APIRouter()

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    file_content = await extract_text_from_pdf(file)

    # print("my contant" , file_content)
    
    if not file_content:
        raise HTTPException(status_code=500, detail="Failed to extract text from PDF")

    return {"filename": file.filename, "content_type": file.content_type , "content": file_content}