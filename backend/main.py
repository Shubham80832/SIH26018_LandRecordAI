from pathlib import Path
import shutil
import uuid

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from backend.services.document import pdf_to_images, prepare_image
from backend.services.ocr import run_ocr
from backend.services.extractor import extract_fields
from backend.services.validator import validate_record

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"
PROCESSED_DIR = BASE_DIR / "processed"
STATIC_DIR = BASE_DIR / "static"

UPLOAD_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)

app = FastAPI(
    title="SIH 26018 - Land Record AI",
    version="0.1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff"}

@app.get("/", response_class=HTMLResponse)
def home():
    return (STATIC_DIR / "index.html").read_text(encoding="utf-8")

@app.post("/api/process")
async def process_document(file: UploadFile = File(...)):
    extension = Path(file.filename or "").suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, JPG, JPEG, PNG, BMP, TIF and TIFF files are supported."
        )

    job_id = uuid.uuid4().hex[:10]
    input_path = UPLOAD_DIR / f"{job_id}{extension}"

    with input_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    job_dir = PROCESSED_DIR / job_id
    job_dir.mkdir(parents=True, exist_ok=True)

    try:
        if extension == ".pdf":
            image_paths = pdf_to_images(str(input_path), str(job_dir))
        else:
            image_paths = [str(input_path)]

        all_text = []

        for index, image_path in enumerate(image_paths, start=1):
            processed_path = job_dir / f"processed_{index}.png"
            prepare_image(image_path, str(processed_path))
            text = run_ocr(str(processed_path), language="eng")
            all_text.append(text)

        combined_text = "\n\n".join(all_text)
        fields = extract_fields(combined_text)
        validation = validate_record(fields)

        return {
            "job_id": job_id,
            "filename": file.filename,
            "pages_processed": len(image_paths),
            "ocr_text": combined_text,
            "fields": fields,
            "validation": validation
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=(
                "Processing failed. Make sure Tesseract OCR is installed and "
                f"available in PATH. Technical detail: {exc}"
            )
        )
