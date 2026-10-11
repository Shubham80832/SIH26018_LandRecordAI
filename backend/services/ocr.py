
import os
import shutil
import pytesseract


# Tesseract executable locate karo.
tesseract_path = (
    os.getenv("TESSERACT_CMD")
    or shutil.which("tesseract")
)

# Windows local setup
if not tesseract_path and os.name == "nt":
    possible_paths = [
        r"C:\Program Files\Tesseract-OCR\tesseract.exe\tesseract.exe",
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
    ]

    for path in possible_paths:
        if os.path.isfile(path):
            tesseract_path = path
            break

# Agar executable nahi mila toh clear error do.
if not tesseract_path:
    raise RuntimeError(
        "Tesseract OCR executable nahi mila. "
        "TESSERACT_CMD environment variable configure karein."
    )

pytesseract.pytesseract.tesseract_cmd = tesseract_path


def run_ocr(image_path: str, language: str = "eng"):
    config = "--oem 3 --psm 6"

    text = pytesseract.image_to_string(
        image_path,
        lang=language,
        config=config
    )

    return text.strip()