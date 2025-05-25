from fastapi import APIRouter, HTTPException, UploadFile, File

router = APIRouter()

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    return {"filename": file.filename, "content_type": file.content_type}