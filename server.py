"""Local patient intake portal.

Stores each intake as JSON on this computer. If SMARTSHEET_ACCESS_TOKEN and
SMARTSHEET_SHEET_ID are set, new and updated intakes are also appended to that
sheet. Column titles in the sheet should match the form labels (plus
"Intake ID" and "Submitted at").

This project is separate from the DTC site. Run: python server.py
"""

from __future__ import annotations

import json
import os
import threading
import uuid
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent
STATIC = ROOT / "static"
DATA = ROOT / "data"
INTAKES_PATH = DATA / "intakes.json"
PORT = int(os.environ.get("PORT", "8787"))
HOST = os.environ.get("HOST", "0.0.0.0")
LOCK = threading.Lock()
MAX_BODY = 1_000_000

FORM_SOURCE = "new reg form 26.pdf"

# Labels the Smartsheet columns should use. Kept in sync with static/app.js.
COLUMN_LABELS = {
    "patientName": "Name",
    "dateOfBirth": "Date of birth",
    "gender": "Gender",
    "address": "Address",
    "city": "City",
    "state": "State",
    "zip": "Zip",
    "phoneNumber": "Phone number",
    "cell": "Cell",
    "email": "Email",
    "emergencyName": "Emergency contact name",
    "emergencyRelationship": "Emergency contact relationship",
    "emergencyPhone": "Emergency contact phone",
    "insuranceCompany": "Insurance company",
    "insuranceId": "ID#",
    "insuranceGroup": "Group",
    "policyHolder": "Policy holder",
    "policyHolderDob": "Policy holder DOB",
    "policyHolderEmployer": "Policy holder employer",
    "relationshipToPatient": "Relationship to patient",
    "conditions": "Medical history",
    "pharmacyName": "Pharmacy name",
    "pharmacyAddress": "Pharmacy address",
    "pharmacyPhone": "Pharmacy phone",
    "medicationAllergies": "Allergies to medications",
    "allergyReaction": "Reaction",
    "medications": "Current medications",
    "surgeryType": "Type of surgery",
    "surgeryDate": "Surgery date",
    "additionalSurgeries": "Additional surgical procedures",
    "motherHistory": "Mother medical history",
    "fatherHistory": "Father medical history",
    "additionalFamilyHistory": "Additional family history",
    "hipaaAcknowledged": "HIPAA privacy notice acknowledgment",
    "consentToTreatment": "Consent for treatment",
    "parentGuardianName": "Parent/guardian name",
    "childName": "Child name",
    "assignmentOfBenefits": "Assignment of benefits",
    "financialPolicyAgreed": "Financial policy agreement",
    "responsibleForCharges": "Responsible for charges not covered",
    "releaseOfInformation": "Release of information",
    "preferredCommunication": "Preferred method of communication",
    "telehealthConsent": "Telehealth consent",
    "consentPatientName": "Consent patient name",
    "consentDateOfBirth": "Consent date of birth",
    "consentSignature": "Consent signature",
    "consentDate": "Consent date",
    "financialPatientName": "Financial policy patient name",
    "financialDateOfBirth": "Financial policy date of birth",
    "financialSignature": "Financial policy signature",
    "financialDate": "Financial policy date",
    "relatedEntitiesSignature": "Related entities signature",
    "relatedEntitiesName": "Related entities patient name",
    "relatedEntitiesDate": "Related entities date",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def load_intakes() -> list:
    if not INTAKES_PATH.exists():
        return []
    try:
        data = json.loads(INTAKES_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []
    return data if isinstance(data, list) else []


def write_intakes(items: list) -> None:
    DATA.mkdir(exist_ok=True)
    INTAKES_PATH.write_text(json.dumps(items, indent=2), encoding="utf-8")


BOOL_FIELDS = {
    "hipaaAcknowledged",
    "consentToTreatment",
    "assignmentOfBenefits",
    "financialPolicyAgreed",
    "responsibleForCharges",
    "releaseOfInformation",
    "telehealthConsent",
}
DATE_FIELDS = {
    "dateOfBirth",
    "policyHolderDob",
    "consentDateOfBirth",
    "consentDate",
    "financialDateOfBirth",
    "financialDate",
    "relatedEntitiesDate",
}


def sharepoint_column(key: str) -> str:
    return key[:1].upper() + key[1:]


def sharepoint_url() -> str:
    return os.environ.get("SHAREPOINT_INTAKE_URL", "").strip()


def sharepoint_body(record: dict) -> dict:
    fields = record.get("fields") or {}
    body = {
        "Title": str(fields.get("patientName") or "").strip() or "Patient intake",
        "IntakeId": record.get("id") or "",
        "Form": record.get("form") or FORM_SOURCE,
        "SubmittedAt": record.get("createdAt") or "",
    }
    for key in COLUMN_LABELS:
        column = sharepoint_column(key)
        value = fields.get(key)
        if key in BOOL_FIELDS:
            body[column] = bool(value)
        elif key in DATE_FIELDS:
            text = str(value or "").strip()
            if text:
                body[column] = text
        else:
            body[column] = cell_value(value)
    return body


def sync_sharepoint(record: dict) -> dict:
    url = sharepoint_url()
    if not url.startswith("https://"):
        return {"status": "skipped", "detail": "SharePoint is not configured."}
    request = Request(
        url,
        data=json.dumps(sharepoint_body(record)).encode("utf-8"),
        method="POST",
    )
    request.add_header("Content-Type", "application/json")
    try:
        with urlopen(request, timeout=60) as response:
            response.read()
            status = response.status
    except HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        detail = " ".join(detail.split())[:240]
        return {"status": "error", "detail": f"SharePoint rejected the intake ({error.code}). {detail}"}
    except (URLError, TimeoutError) as error:
        return {"status": "error", "detail": f"Could not reach SharePoint: {error}"}
    if status not in (200, 202):
        return {"status": "error", "detail": f"SharePoint returned status {status}."}
    return {"status": "synced", "detail": "Item created in the Patient Intake list."}


def smartsheet_settings() -> tuple[str, str]:
    token = os.environ.get("SMARTSHEET_ACCESS_TOKEN", "").strip()
    sheet_id = os.environ.get("SMARTSHEET_SHEET_ID", "").strip()
    return token, sheet_id


def smartsheet_request(url: str, token: str, method: str = "GET", payload: dict | None = None) -> dict:
    body = None if payload is None else json.dumps(payload).encode("utf-8")
    request = Request(url, data=body, method=method)
    request.add_header("Authorization", f"Bearer {token}")
    request.add_header("Content-Type", "application/json")
    with urlopen(request, timeout=20) as response:
        raw = response.read().decode("utf-8")
    return json.loads(raw) if raw else {}


def cell_value(value) -> str:
    if isinstance(value, list):
        parts = []
        for item in value:
            if isinstance(item, dict):
                line = " | ".join(
                    str(item.get(key, "")).strip()
                    for key in ("name", "dose", "frequency")
                    if str(item.get(key, "")).strip()
                )
                if line:
                    parts.append(line)
            elif str(item).strip():
                parts.append(str(item).strip())
        return "; ".join(parts)
    if isinstance(value, bool):
        return "Yes" if value else "No"
    if value is None:
        return ""
    return str(value).strip()


def sync_smartsheet(record: dict) -> dict:
    token, sheet_id = smartsheet_settings()
    if not token or not sheet_id:
        return {"status": "skipped", "detail": "Smartsheet is not configured."}

    try:
        columns = smartsheet_request(
            f"https://api.smartsheet.com/2.0/sheets/{sheet_id}/columns",
            token,
        ).get("data", [])
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
        return {"status": "error", "detail": f"Could not read Smartsheet columns: {error}"}

    by_title = {str(column.get("title", "")).strip().lower(): column.get("id") for column in columns}
    cells = []
    missing = []

    def add_cell(title: str, value) -> None:
        text = cell_value(value)
        if not text:
            return
        column_id = by_title.get(title.strip().lower())
        if column_id is None:
            missing.append(title)
            return
        cells.append({"columnId": column_id, "value": text})

    add_cell("Intake ID", record.get("id"))
    add_cell("Submitted at", record.get("createdAt"))
    add_cell("Form", record.get("form") or FORM_SOURCE)
    fields = record.get("fields") or {}
    for key, label in COLUMN_LABELS.items():
        add_cell(label, fields.get(key))

    if not cells:
        return {
            "status": "error",
            "detail": "No Smartsheet columns matched the intake labels.",
            "unmatched": missing,
        }

    try:
        smartsheet_request(
            f"https://api.smartsheet.com/2.0/sheets/{sheet_id}/rows",
            token,
            method="POST",
            payload={"toBottom": True, "rows": [{"toBottom": True, "cells": cells}]},
        )
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
        return {"status": "error", "detail": f"Could not add the Smartsheet row: {error}", "unmatched": missing}

    detail = "Row added to Smartsheet."
    if missing:
        detail += " Unmatched columns: " + ", ".join(missing)
    return {"status": "synced", "detail": detail, "unmatched": missing}


def clean_fields(raw) -> dict:
    if not isinstance(raw, dict):
        raise ValueError("Intake fields must be an object.")
    cleaned = {}
    for key, value in raw.items():
        name = str(key)[:80]
        if isinstance(value, bool):
            cleaned[name] = value
        elif isinstance(value, list):
            if name == "medications":
                medications = []
                for item in value[:12]:
                    if isinstance(item, dict):
                        medication = {
                            "name": str(item.get("name", ""))[:500].strip(),
                            "dose": str(item.get("dose", ""))[:500].strip(),
                            "frequency": str(item.get("frequency", ""))[:500].strip(),
                        }
                    else:
                        medication = {"name": str(item)[:500].strip(), "dose": "", "frequency": ""}
                    if medication["name"] or medication["dose"] or medication["frequency"]:
                        medications.append(medication)
                cleaned[name] = medications
            else:
                cleaned[name] = [str(item)[:500] for item in value[:80]]
        elif value is None:
            cleaned[name] = ""
        else:
            cleaned[name] = str(value)[:5000]
    if not cleaned.get("patientName", "").strip():
        raise ValueError("Patient name is required.")
    if not cleaned.get("dateOfBirth", "").strip():
        raise ValueError("Date of birth is required.")
    return cleaned


def public_record(record: dict) -> dict:
    fields = record.get("fields") or {}
    return {
        "id": record.get("id"),
        "form": record.get("form") or FORM_SOURCE,
        "createdAt": record.get("createdAt"),
        "updatedAt": record.get("updatedAt"),
        "sharepoint": record.get("sharepoint") or {"status": "skipped", "detail": ""},
        "smartsheet": record.get("smartsheet") or {"status": "skipped", "detail": ""},
        "summary": {
            "name": str(fields.get("patientName", "")).strip(),
            "dateOfBirth": fields.get("dateOfBirth", ""),
            "phone": fields.get("phoneNumber") or fields.get("cell") or "",
            "email": fields.get("email", ""),
        },
        "fields": fields,
    }


class IntakeHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC), **kwargs)

    def log_message(self, fmt: str, *args) -> None:
        print(f"[{self.log_date_time_string()}] {fmt % args}")

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self) -> None:
        path = self.path.split("?", 1)[0]
        if path == "/health":
            self.send_json(200, {"ok": True})
            return
        if path == "/api/status":
            token, sheet_id = smartsheet_settings()
            self.send_json(
                200,
                {
                    "smartsheetConfigured": bool(token and sheet_id),
                    "sharepointConfigured": sharepoint_url().startswith("https://"),
                },
            )
            return
        if path == "/api/intakes":
            with LOCK:
                items = [public_record(item) for item in load_intakes()]
            items.sort(key=lambda item: item.get("createdAt") or "", reverse=True)
            self.send_json(200, {"intakes": items})
            return
        if path.startswith("/api/intakes/"):
            intake_id = path.removeprefix("/api/intakes/")
            with LOCK:
                found = next((item for item in load_intakes() if item.get("id") == intake_id), None)
            if found is None:
                self.send_json(404, {"error": "Intake not found."})
                return
            self.send_json(200, {"intake": public_record(found)})
            return
        if path == "/":
            self.path = "/index.html"
        super().do_GET()

    def do_POST(self) -> None:
        path = self.path.split("?", 1)[0]
        if path != "/api/intakes":
            self.send_json(404, {"error": "Not found."})
            return
        self.save_intake(None)

    def do_PUT(self) -> None:
        path = self.path.split("?", 1)[0]
        if not path.startswith("/api/intakes/"):
            self.send_json(404, {"error": "Not found."})
            return
        self.save_intake(path.removeprefix("/api/intakes/"))

    def do_DELETE(self) -> None:
        path = self.path.split("?", 1)[0]
        if not path.startswith("/api/intakes/"):
            self.send_json(404, {"error": "Not found."})
            return
        intake_id = path.removeprefix("/api/intakes/")
        with LOCK:
            items = load_intakes()
            remaining = [item for item in items if item.get("id") != intake_id]
            if len(remaining) == len(items):
                self.send_json(404, {"error": "Intake not found."})
                return
            write_intakes(remaining)
        self.send_json(200, {"ok": True})

    def save_intake(self, intake_id: str | None) -> None:
        try:
            payload = self.read_json()
            fields = clean_fields(payload.get("fields"))
        except ValueError as error:
            self.send_json(400, {"error": str(error)})
            return
        except json.JSONDecodeError:
            self.send_json(400, {"error": "Request body must be JSON."})
            return

        with LOCK:
            items = load_intakes()
            if intake_id is None:
                record = {
                    "id": uuid.uuid4().hex[:12],
                    "form": FORM_SOURCE,
                    "createdAt": now_iso(),
                    "updatedAt": now_iso(),
                    "fields": fields,
                }
                record["sharepoint"] = sync_sharepoint(record)
                record["smartsheet"] = sync_smartsheet(record)
                items.append(record)
            else:
                record = next((item for item in items if item.get("id") == intake_id), None)
                if record is None:
                    self.send_json(404, {"error": "Intake not found."})
                    return
                record["fields"] = fields
                record["form"] = FORM_SOURCE
                record["updatedAt"] = now_iso()
                record["sharepoint"] = sync_sharepoint(record)
                record["smartsheet"] = sync_smartsheet(record)
            write_intakes(items)
        self.send_json(200, {"intake": public_record(record)})

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length < 0 or length > MAX_BODY:
            raise ValueError("Intake is too large.")
        raw = self.rfile.read(length) if length else b"{}"
        data = json.loads(raw.decode("utf-8"))
        if not isinstance(data, dict):
            raise ValueError("Request body must be an object.")
        return data

    def send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    DATA.mkdir(exist_ok=True)
    server = ThreadingHTTPServer((HOST, PORT), IntakeHandler)
    shown_host = "127.0.0.1" if HOST in {"0.0.0.0", "::"} else HOST
    print(f"Patient intake portal: http://{shown_host}:{PORT}")
    if sharepoint_url().startswith("https://"):
        print("SharePoint sync is on.")
    else:
        print("SharePoint sync is off until SHAREPOINT_INTAKE_URL is set.")
    token, sheet_id = smartsheet_settings()
    if token and sheet_id:
        print("Smartsheet sync is on.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
