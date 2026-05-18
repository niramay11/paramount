import csv
import json
import os

BASE = os.path.join(os.path.dirname(__file__), '..', '..')

CATEGORIES = [
    {
        "id": "blood",
        "name": "Blood Tests",
        "file": "TEST DIRECTORY(BLOOD TD).csv",
        "colOrder": "blood",  # Code, Test Name, Test panels, ...
    },
    {
        "id": "gastro",
        "name": "Gastroenterology",
        "file": "TEST DIRECTORY(GASTRO TD).csv",
        "colOrder": "standard",  # Code, Test panels, Test Name, ...
    },
    {
        "id": "infectious",
        "name": "Infectious Disease",
        "file": "TEST DIRECTORY(Infectious TD).csv",
        "colOrder": "standard",
    },
    {
        "id": "oral",
        "name": "Oral Toxicology",
        "file": "TEST DIRECTORY(Oral TD).csv",
        "colOrder": "standard",
    },
    {
        "id": "podiatry",
        "name": "Podiatry & Wound",
        "file": "TEST DIRECTORY(Podiatry TD).csv",
        "colOrder": "standard",
    },
    {
        "id": "urine",
        "name": "Urine Toxicology",
        "file": "TEST DIRECTORY(Urine TD).csv",
        "colOrder": "standard",
    },
    {
        "id": "womens",
        "name": "Women's Health",
        "file": "TEST DIRECTORY(Womens TD).csv",
        "colOrder": "standard",
    },
]

SECTION_HEADERS = {
    "HEMATOLOGY", "CHEMISTRY", "IMMUNOASSAY", "IMMUNOLOGY",
    "COAGULATION", "MOLECULAR TESTING", "OTHER", "PHLEBOTOMY"
}

def clean(val):
    if val is None:
        return ""
    return val.strip().replace("â", "-").replace("â", "'").replace("�", "")

def parse_blood(filepath):
    sections = []
    current_section = {"id": "panels", "name": "Panels", "tests": []}
    current_test = None

    with open(filepath, encoding='utf-8-sig', errors='replace') as f:
        reader = csv.reader(f)
        headers = next(reader)

        for row in reader:
            if len(row) < 3:
                continue
            code = clean(row[0])
            test_name = clean(row[1])  # individual test name
            panel_name = clean(row[2])  # panel group name
            specimen_tube = clean(row[3]) if len(row) > 3 else ""
            patient_prep = clean(row[4]) if len(row) > 4 else ""
            min_vol = clean(row[5]) if len(row) > 5 else ""
            spec_prep = clean(row[6]) if len(row) > 6 else ""
            storage = clean(row[7]) if len(row) > 7 else ""
            stability = clean(row[8]) if len(row) > 8 else ""
            rejection = clean(row[9]) if len(row) > 9 else ""
            special_notes = clean(row[11]) if len(row) > 11 else ""
            approved_for = clean(row[12]) if len(row) > 12 else ""
            performing_lab = clean(row[13]) if len(row) > 13 else ""
            cpt_codes = clean(row[14]) if len(row) > 14 else ""
            tat = clean(row[15]) if len(row) > 15 else ""
            methodology = clean(row[16]) if len(row) > 16 else ""

            # Section header row (e.g. "HEMATOLOGY")
            if code and code.upper() in SECTION_HEADERS:
                if current_test:
                    current_section["tests"].append(current_test)
                    current_test = None
                sections.append(current_section)
                current_section = {"id": code.lower(), "name": code.title(), "tests": []}
                continue

            # Skip empty rows
            if not code and not test_name and not panel_name:
                continue

            # A test row
            if code:
                if current_test:
                    current_section["tests"].append(current_test)
                name = panel_name if panel_name else test_name
                current_test = {
                    "id": code,
                    "code": code,
                    "name": name,
                    "subTests": [],
                    "specimenTube": specimen_tube,
                    "patientPreparation": patient_prep,
                    "minimumVolume": min_vol,
                    "specimenPreparation": spec_prep,
                    "storageTransport": storage,
                    "stability": stability,
                    "rejectionCriteria": rejection,
                    "specialNotes": special_notes,
                    "approvedFor": approved_for,
                    "performingLab": performing_lab,
                    "cptCodes": cpt_codes,
                    "tatForResult": tat,
                    "methodology": methodology,
                }
            elif test_name and current_test:
                current_test["subTests"].append(test_name)

    if current_test:
        current_section["tests"].append(current_test)
    sections.append(current_section)

    return [s for s in sections if s["tests"]]


def parse_standard(filepath, cat_id):
    sections = []
    current_section = {"id": cat_id, "name": "", "tests": []}
    current_test = None

    with open(filepath, encoding='utf-8-sig', errors='replace') as f:
        reader = csv.reader(f)
        headers = next(reader)

        for row in reader:
            if len(row) < 3:
                continue
            code = clean(row[0])
            panel_name = clean(row[1])  # Test panels
            test_name = clean(row[2])   # Test Name
            specimen_tube = clean(row[3]) if len(row) > 3 else ""
            patient_prep = clean(row[4]) if len(row) > 4 else ""
            min_vol = clean(row[5]) if len(row) > 5 else ""
            spec_prep = clean(row[6]) if len(row) > 6 else ""
            storage = clean(row[7]) if len(row) > 7 else ""
            stability = clean(row[8]) if len(row) > 8 else ""
            rejection = clean(row[9]) if len(row) > 9 else ""
            special_notes = clean(row[10]) if len(row) > 10 else ""
            approved_for = clean(row[11]) if len(row) > 11 else ""
            performing_lab = clean(row[12]) if len(row) > 12 else ""
            cpt_codes = clean(row[13]) if len(row) > 13 else ""
            tat = clean(row[14]) if len(row) > 14 else ""
            methodology = clean(row[15]) if len(row) > 15 else ""

            if not code and not panel_name and not test_name:
                continue

            if code:
                if current_test:
                    current_section["tests"].append(current_test)
                name = panel_name if panel_name else test_name
                first_sub = test_name if panel_name and test_name else ""
                current_test = {
                    "id": code,
                    "code": code,
                    "name": name,
                    "subTests": [first_sub] if first_sub else [],
                    "specimenTube": specimen_tube,
                    "patientPreparation": patient_prep,
                    "minimumVolume": min_vol,
                    "specimenPreparation": spec_prep,
                    "storageTransport": storage,
                    "stability": stability,
                    "rejectionCriteria": rejection,
                    "specialNotes": special_notes,
                    "approvedFor": approved_for,
                    "performingLab": performing_lab,
                    "cptCodes": cpt_codes,
                    "tatForResult": tat,
                    "methodology": methodology,
                }
            elif test_name and current_test:
                current_test["subTests"].append(test_name)

    if current_test:
        current_section["tests"].append(current_test)
    if current_section["tests"]:
        sections.append(current_section)

    return sections


def main():
    all_categories = []

    for cat in CATEGORIES:
        filepath = os.path.join(BASE, cat["file"])
        if not os.path.exists(filepath):
            print(f"File not found: {filepath}")
            continue

        if cat["colOrder"] == "blood":
            sections = parse_blood(filepath)
        else:
            sections = parse_standard(filepath, cat["id"])
            if sections:
                sections[0]["name"] = cat["name"]

        all_categories.append({
            "id": cat["id"],
            "name": cat["name"],
            "sections": sections,
        })

    output_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'test-directory.json')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_categories, f, indent=2, ensure_ascii=False)

    total = sum(
        sum(len(s["tests"]) for s in cat["sections"])
        for cat in all_categories
    )
    print(f"Generated test-directory.json with {total} tests across {len(all_categories)} categories")


if __name__ == "__main__":
    main()
