import re

REQUIRED_FIELDS = [
    "landowner_name",
    "village",
    "district"
]

def validate_record(record):
    errors = []
    warnings = []

    for field in REQUIRED_FIELDS:
        if not record.get(field):
            errors.append(f"Missing required field: {field}")

    for field in ["survey_number", "khasra_number", "khata_number"]:
        value = record.get(field)
        if value and not re.match(r"^[A-Za-z0-9\/\-\s]+$", value):
            warnings.append(f"Unusual format in {field}")

    area = record.get("plot_area")
    if area:
        number = re.search(r"\d+(?:\.\d+)?", area)
        if number and float(number.group()) <= 0:
            errors.append("Plot area must be greater than zero.")

    filled = sum(1 for value in record.values() if value)
    completeness = round((filled / len(record)) * 100, 1) if record else 0

    # MVP confidence: completeness minus penalties.
    confidence = completeness
    confidence -= min(len(errors) * 15, 45)
    confidence -= min(len(warnings) * 5, 15)
    confidence = max(0, min(100, round(confidence, 1)))

    if confidence >= 85:
        status = "HIGH"
    elif confidence >= 60:
        status = "MEDIUM"
    else:
        status = "LOW"

    return {
        "errors": errors,
        "warnings": warnings,
        "completeness": completeness,
        "confidence": confidence,
        "status": status
    }
