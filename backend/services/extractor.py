import re


FIELD_PATTERNS = {
    "landowner_name": [
        r"(?:land\s*owner\s*name|landowner\s*name|owner\s*name|owner|name|नाम)\s*[:\-]?\s*(.+)"
    ],

    "father_guardian_name": [
        r"(?:father\s*/\s*guardian\s*name|father\s*name|guardian\s*name|father|guardian)\s*[:\-]?\s*(.+)"
    ],

    "survey_number": [
        r"(?:survey\s*(?:no|number)|सर्वे\s*क्रमांक)\s*[:\-]?\s*([A-Za-z0-9\/\-]+)"
    ],

    "khasra_number": [
        r"(?:khasra\s*(?:no|number)|खसरा)\s*[:\-]?\s*([A-Za-z0-9\/\-]+)"
    ],

    "khata_number": [
        r"(?:khata\s*(?:no|number)|खाता)\s*[:\-]?\s*([A-Za-z0-9\/\-]+)"
    ],

    "plot_area": [
        r"(?:plot\s*area|area|भूमि\s*क्षेत्रफल)\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?)\s*(hectare|hectares|ha|acre|acres|sq\.?\s*m)?"
    ],

    "village": [
        r"(?:village|ग्राम)\s*[:\-]?\s*(.+)"
    ],

    "tehsil": [
        r"(?:tehsil|तहसील)\s*[:\-]?\s*(.+)"
    ],

    "district": [
        r"(?:district|जिला)\s*[:\-]?\s*(.+)"
    ],

    "state": [
        r"(?:state|राज्य)\s*[:\-]?\s*(.+)"
    ],

    "land_classification": [
        r"(?:land\s*classification|classification|भूमि\s*वर्गीकरण)\s*[:\-]?\s*(.+)"
    ],

    "ownership_type": [
        r"(?:ownership\s*type|ownership|स्वामित्व\s*प्रकार)\s*[:\-]?\s*(.+)"
    ],

    "mutation_number": [
        r"(?:mutation\s*(?:no|number)|mutation|नामांतरण\s*(?:क्रमांक|नंबर)?)\s*[:\-]?\s*([A-Za-z0-9\/\-]+)"
    ],

    "mutation_date": [
        r"(?:mutation\s*date|नामांतरण\s*दिनांक)\s*[:\-]?\s*([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})"
    ],

    "registration_number": [
        r"(?:registration\s*(?:no|number)|registration|पंजीयन\s*(?:क्रमांक|नंबर)?)\s*[:\-]?\s*([A-Za-z0-9\/\-]+)"
    ],
}


def clean(value: str):
    value = re.sub(r"\s+", " ", value)
    return value.strip(" :-\t\r\n")


def extract_fields(text: str):

    result = {
        key: None
        for key in FIELD_PATTERNS
    }

    text = text.replace("\r", "\n")

    for field, patterns in FIELD_PATTERNS.items():

        for pattern in patterns:

            match = re.search(
                pattern,
                text,
                flags=re.IGNORECASE | re.MULTILINE
            )

            if match:

                value = match.group(1)

                if field == "plot_area":

                    number = match.group(1)
                    unit = match.group(2) or ""

                    value = f"{number} {unit}".strip()

                value = clean(value)

                if value:
                    result[field] = value

                break

    return result