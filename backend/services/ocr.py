import pytesseract

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe\tesseract.exe"
)


def run_ocr(image_path: str, language: str = "eng"):

    config = "--oem 3 --psm 6"

    text = pytesseract.image_to_string(
        image_path,
        lang=language,
        config=config
    )

    return text.strip()