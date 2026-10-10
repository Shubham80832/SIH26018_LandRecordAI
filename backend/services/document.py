from pathlib import Path
import fitz
import cv2
import numpy as np

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff"}


def pdf_to_images(pdf_path: str, output_dir: str):
    """
    Convert PDF pages into high-resolution PNG images.
    Higher DPI improves OCR accuracy.
    """
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    doc = fitz.open(pdf_path)
    paths = []

    # 300 DPI equivalent
    zoom = 300 / 72
    matrix = fitz.Matrix(zoom, zoom)

    for page_number, page in enumerate(doc, start=1):
        pix = page.get_pixmap(
            matrix=matrix,
            alpha=False
        )

        output = Path(output_dir) / f"page_{page_number}.png"
        pix.save(str(output))
        paths.append(str(output))

    doc.close()

    return paths


def prepare_image(image_path: str, output_path: str):
    """
    Prepare document image for OCR.
    """

    image = cv2.imread(image_path)

    if image is None:
        raise ValueError(
            f"Could not read image: {image_path}"
        )

    # 1. Grayscale
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # 2. Upscale
    gray = cv2.resize(
        gray,
        None,
        fx=2,
        fy=2,
        interpolation=cv2.INTER_CUBIC
    )

    # 3. Light noise reduction
    gray = cv2.GaussianBlur(
        gray,
        (3, 3),
        0
    )

    # 4. Otsu threshold
    _, processed = cv2.threshold(
        gray,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )

    cv2.imwrite(
        output_path,
        processed
    )

    print(f"Processed image saved at: {output_path}")

    return output_path