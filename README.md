# SIH 26018 - Intelligent Land Record Digitization and Validation System

MVP v1:
1. Upload a PDF/JPG/PNG land record
2. Convert PDF pages to images
3. Preprocess images with OpenCV
4. Run OCR with Tesseract
5. Extract basic land-record fields
6. Validate extracted values
7. Calculate a simple confidence score
8. Display the result in a browser

## Requirements

- Python 3.10+
- Tesseract OCR installed separately
- Windows users: install Tesseract OCR and make sure `tesseract.exe` is in PATH.

## Run

```powershell
cd SIH26018_LandRecordAI
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:
http://127.0.0.1:8000

## Current architecture

Upload -> PDF/Image processing -> OpenCV preprocessing -> OCR -> Field extraction -> Validation -> Confidence -> UI

## Important

This is an MVP. It is not a production government land-record system yet.
The next versions should add multilingual/handwritten OCR, MySQL/PostgreSQL, human verification workflow, duplicate detection, authentication/RBAC, audit logs, GIS, APIs, and model-feedback learning.
