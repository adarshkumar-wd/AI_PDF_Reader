import fitz  # PyMuPDF
from fastapi import UploadFile

async def extract_text_from_pdf(file: UploadFile) -> str:
    # Read the file content directly from memory
    file_bytes = await file.read()

    # print("file_byte :::::   --" , file_bytes)

    # Open the file as a stream using PyMuPDF
    doc = fitz.open(stream=file_bytes, filetype="pdf")

    all_text = ""
    for page in doc:
        all_text += page.get_text()

    doc.close()
    return all_text
