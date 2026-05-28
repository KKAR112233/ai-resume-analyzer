from fastapi import FastAPI, UploadFile
import pdfplumber

app = FastAPI()

@app.post("/read-pdf")
async def read_pdf(file: UploadFile):

    with open(file.filename, "wb") as f:
        f.write(await file.read())

    text = ""

    with pdfplumber.open(file.filename) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text

    return {
        "text": text
    }