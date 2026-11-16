// Blanks from "new reg form 26.pdf" (CIMPAR New Patient Registration Form).
// Labels are also the Smartsheet column titles.

const CONDITIONS = [
  "Angina",
  "Heart Attack",
  "Bleeding Disorders",
  "Anxiety or panic disorder",
  "Multiple Sclerosis",
  "Bowel/Bladder Abnormalities",
  "Arthritis (RA, OA)",
  "Osteoporosis",
  "Cancer",
  "Asthma",
  "Parkinson's Disease",
  "Dizzy or Fainting",
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Peripheral Vascular Disease",
  "Epilepsy or Seizure Disorder",
  "Congestive Heart Disease",
  "Stroke or TIA",
  "Fracture",
  "Degenerative Disc Disease (back disease, spinal stenosis, severe chronic back pain)",
  "Upper Gastrointestinal Disease (Ulcer, hernia, reflux)",
  "Hepatitis A, B, C",
  "Depression",
  "Visual Impairment (cataracts, glaucoma, macular degeneration)",
  "High Blood Pressure",
  "Diabetes (T1, T2)",
  "Allergies",
  "High Cholesterol",
  "Emphysema",
  "Headache (migraine, tension)",
  "Immunosuppressant Condition",
  "Hearing Impairment",
  "Back Injury",
  "Kidney Problems",
  "Liver/Gallbladder Problem",
  "Metal Implants",
  "Pacemaker",
];

const FORM = [
  {
    id: "patient",
    title: "New Patient Registration Form",
    prose: CLINIC_LINES,
    fields: [
      { key: "patientName", label: "Name", type: "text", required: true, autoComplete: "name" },
      { key: "dateOfBirth", label: "Date of birth", type: "date", required: true, autoComplete: "bday" },
      { key: "gender", label: "Gender", type: "text" },
      { key: "address", label: "Address", type: "text", wide: true, autoComplete: "street-address" },
      { key: "city", label: "City", type: "text", autoComplete: "address-level2" },
      { key: "state", label: "State", type: "text", autoComplete: "address-level1" },
      { key: "zip", label: "Zip", type: "text", autoComplete: "postal-code" },
      { key: "phoneNumber", label: "Phone number", type: "tel", autoComplete: "tel" },
      { key: "cell", label: "Cell", type: "tel" },
      { key: "email", label: "Email", type: "email", wide: true, autoComplete: "email" },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Contact",
    fields: [
      { key: "emergencyName", label: "Name", type: "text" },
      { key: "emergencyRelationship", label: "Relationship", type: "text" },
      { key: "emergencyPhone", label: "Phone number", type: "tel" },
    ],
  },
  {
    id: "insurance",
    title: "Insurance Information",
    fields: [
      { key: "insuranceCompany", label: "Insurance company", type: "text", wide: true },
      { key: "insuranceId", label: "ID#", type: "text" },
      { key: "insuranceGroup", label: "Group", type: "text" },
      { key: "policyHolder", label: "Policy holder", type: "text", wide: true },
      { key: "policyHolderDob", label: "Policy holder DOB", type: "date" },
      { key: "policyHolderEmployer", label: "Policy holder employer", type: "text" },
      { key: "relationshipToPatient", label: "Relationship to patient", type: "text" },
    ],
  },
  {
    id: "history",
    title: "Medical History",
    note: "Please check the box if you have or have had the following:",
    fields: [
      { key: "conditions", label: "Conditions", type: "checkboxes", options: CONDITIONS, columns: true, wide: true },
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    fields: [
      { key: "pharmacyName", label: "Pharmacy name", type: "text" },
      { key: "pharmacyAddress", label: "Address", type: "text" },
      { key: "pharmacyPhone", label: "Phone", type: "tel" },
    ],
  },
  {
    id: "allergies",
    title: "Allergies",
    fields: [
      { key: "medicationAllergies", label: "Allergies to medications", type: "textarea", wide: true },
      { key: "allergyReaction", label: "Reaction", type: "text", wide: true },
    ],
  },
  {
    id: "medications",
    title: "Current Medication List (Include Over the Counter or Vitamins)",
    fields: [
      { key: "medications", label: "Medications", type: "medications", wide: true },
    ],
  },
  {
    id: "surgery",
    title: "Surgical History",
    fields: [
      { key: "surgeryType", label: "Type of surgery", type: "text", wide: true },
      { key: "surgeryDate", label: "Date (month and/or year)", type: "text" },
      { key: "additionalSurgeries", label: "Additional surgical procedures", type: "textarea", wide: true },
    ],
  },
  {
    id: "family",
    title: "Family History",
    fields: [
      { key: "motherHistory", label: "Mother- Medical History", type: "textarea", wide: true },
      { key: "fatherHistory", label: "Father- Medical History", type: "textarea", wide: true },
      { key: "additionalFamilyHistory", label: "Additional Family History", type: "textarea", wide: true },
    ],
  },
  {
    id: "hipaa",
    title: "HIPAA Privacy Notice Acknowledgment Form",
    prose: HIPAA_TEXT,
    fields: [],
  },
  {
    id: "consent",
    title: "Consent Forms",
    prose: CLINIC_LINES,
    fields: [
      { heading: "HIPAA Privacy Notice Acknowledgment:", key: "hipaaAcknowledged", label: "I acknowledge that I have received and reviewed the HIPAA Privacy Notice for CIMPAR Clinic.", type: "checkbox", wide: true, answer: "yesno" },
      { heading: "Consent for Treatment:", key: "consentToTreatment", label: "I hereby consent to receiving medical treatment from the providers at CIMPAR Clinic.", type: "checkbox", wide: true, answer: "yesno" },
      { before: "For minors: I, [Parent/Guardian Name], consent to medical treatment for my child, [Child's Name].", key: "parentGuardianName", label: "Parent/Guardian Name", type: "text", wide: true },
      { key: "childName", label: "Child's Name", type: "text" },
      { heading: "Assignment of Benefits:", key: "assignmentOfBenefits", label: "I authorize my insurance benefits to be paid directly to CIMPAR Primary Care Clinic.", type: "checkbox", wide: true, answer: "yesno" },
      { heading: "Financial Policy and Agreement:", key: "financialPolicyAgreed", label: "I have read and agree to the Financial Policies And Procedures of CIMPAR Primary Care Clinic.", type: "checkbox", wide: true, answer: "yesno" },
      { key: "responsibleForCharges", label: "I understand that I am responsible for all charges not covered by insurance.", type: "checkbox", wide: true, answer: "yesno" },
      { heading: "Release of Information:", key: "releaseOfInformation", label: "I authorize CIMPAR Primary Care Clinic to release my medical information to insurance companies, specialists, and other healthcare providers as necessary.", type: "checkbox", wide: true, answer: "yesno" },
      { heading: "Patient Communication Preferences:", key: "preferredCommunication", label: "Preferred Method of Communication (Phone or Email)", type: "text", wide: true },
      { heading: "Telehealth Consent:", key: "telehealthConsent", label: "I consent to participate in telehealth services provided by CIMPAR Primary Clinic. I understand the policies and procedures regarding telehealth.", type: "checkbox", wide: true, answer: "yesno" },
      { key: "consentPatientName", label: "Patient Name", type: "text" },
      { key: "consentDateOfBirth", label: "Date of Birth", type: "date" },
      { key: "consentSignature", label: "Signature", type: "text" },
      { key: "consentDate", label: "Date", type: "date" },
    ],
  },
  {
    id: "financial",
    title: "Financial Policy for Patients",
    prose: FINANCIAL_TEXT,
    fields: [
      { key: "financialPatientName", label: "Patient Name", type: "text" },
      { key: "financialDateOfBirth", label: "Date of Birth", type: "date" },
      { key: "financialSignature", label: "Signature", type: "text" },
      { key: "financialDate", label: "Date", type: "date" },
    ],
  },
  {
    id: "related",
    title: "Patient Acknowledgement of Related Entities",
    prose: RELATED_TEXT,
    fields: [
      { key: "relatedEntitiesSignature", label: "Patient's Signature", type: "text" },
      { key: "relatedEntitiesName", label: "Patient's Name", type: "text" },
      { key: "relatedEntitiesDate", label: "Date", type: "date" },
    ],
  },
];

const state = {
  view: "form",
  editingId: null,
  values: {},
  errors: {},
  intakes: [],
  active: null,
  query: "",
  smartsheetConfigured: false,
  sharepointConfigured: false,
  message: "",
};

const app = document.querySelector("#app");
document.querySelector("#tab-form").addEventListener("click", () => openNew());
document.querySelector("#tab-list").addEventListener("click", () => openList());

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (key === "className") node.className = value;
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (value === true) node.setAttribute(key, "");
    else if (value !== false && value != null) node.setAttribute(key, String(value));
  }
  for (const child of children || []) {
    if (child == null || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

function blankMeds(count) {
  return Array.from({ length: count }, () => ({ name: "", dose: "", frequency: "" }));
}

function setTabs() {
  document.querySelector("#tab-form").classList.toggle("is-active", state.view === "form");
  document.querySelector("#tab-list").classList.toggle("is-active", state.view !== "form");
  document.querySelector("#tab-form").textContent = state.editingId ? "Edit intake" : "New intake";
}

function banner() {
  const text = state.sharepointConfigured
    ? "Saving an intake also creates an item in the Patient Intake list on SharePoint."
    : "Intakes are saved in the portal. SharePoint turns on when the Power Automate link is added.";
  return el("p", { className: "banner" }, [text]);
}

function openNew() {
  state.view = "form";
  state.editingId = null;
  state.active = null;
  state.values = { medications: blankMeds(3) };
  state.errors = {};
  state.message = "";
  render();
}

function openList() {
  state.view = "list";
  state.message = "";
  render();
  loadIntakes();
}

async function loadIntakes() {
  const response = await fetch("/api/intakes");
  const data = await response.json();
  state.intakes = data.intakes || [];
  if (state.view === "list") render();
}

async function loadStatus() {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();
    state.smartsheetConfigured = Boolean(data.smartsheetConfigured);
    state.sharepointConfigured = Boolean(data.sharepointConfigured);
  } catch {
    state.message = "The portal server is not running. Start it with: python server.py";
  }
  render();
}

function render() {
  setTabs();
  app.replaceChildren();
  if (state.message) app.append(el("p", { className: "note" }, [state.message]));
  if (state.view === "form") app.append(renderForm());
  else if (state.view === "detail") app.append(renderDetail());
  else app.append(renderList());
}

function renderForm() {
  const root = el("div");
  root.append(banner());

  const form = el("form", { id: "intake-form", onSubmit: onSubmit });
  for (const section of FORM) {
    const card = el("section", { className: section.prose ? "card packet" : "card" }, [el("h2", {}, [section.title])]);
    if (section.prose) card.append(renderProse(section.prose));
    if (section.note) card.append(el("p", { className: "muted" }, [section.note]));
    if (section.fields.length) {
      const grid = el("div", { className: "grid" });
      for (const field of section.fields) grid.append(renderField(field));
      card.append(grid);
    }
    form.append(card);
  }

  form.append(el("div", { className: "actions" }, [
    el("button", { className: "btn", type: "submit" }, [state.editingId ? "Update intake" : "Save intake"]),
    el("button", { className: "btn-ghost", type: "button", onClick: openNew }, ["Clear"]),
  ]));
  root.append(form);
  return root;
}

function renderProse(blocks) {
  const wrap = el("div", { className: "prose" });
  for (const block of blocks) {
    if (block.h) wrap.append(el("h3", {}, [block.h]));
    else if (block.p) wrap.append(el("p", {}, [block.p]));
    else if (block.ul) wrap.append(el("ul", {}, block.ul.map((item) => el("li", {}, [item]))));
  }
  return wrap;
}

function renderField(field) {
  const value = state.values[field.key];
  const error = state.errors[field.key];
  const wrap = el("div", { className: field.wide ? "field wide" : "field" });
  if (field.heading) wrap.append(el("h3", { className: "field-heading" }, [field.heading]));
  if (field.before) wrap.append(el("p", { className: "prose-line" }, [field.before]));

  if (field.type === "checkbox") {
    wrap.append(el("label", { className: "check" }, [
      el("input", { type: "checkbox", name: field.key, checked: value ? "checked" : null }),
      el("span", {}, [field.label]),
    ]));
  } else if (field.type === "checkboxes") {
    wrap.append(el("span", {}, [field.label]));
    const box = el("div", { className: field.columns ? "checks cols" : "checks" });
    const selected = Array.isArray(value) ? value : [];
    for (const option of field.options) {
      box.append(el("label", { className: "check" }, [
        el("input", {
          type: "checkbox",
          name: field.key,
          value: option,
          checked: selected.includes(option) ? "checked" : null,
        }),
        option,
      ]));
    }
    wrap.append(box);
  } else if (field.type === "medications") {
    wrap.append(renderMedications(Array.isArray(value) && value.length ? value : blankMeds(3)));
  } else {
    wrap.append(el("label", {}, [
      el("span", {}, [
        field.label,
        field.required ? el("span", { className: "req" }, [" *"]) : null,
      ]),
      field.type === "textarea"
        ? el("textarea", { name: field.key, className: error ? "is-invalid" : "" }, [value || ""])
        : el("input", {
          type: field.type,
          name: field.key,
          value: value || "",
          autocomplete: field.autoComplete || "off",
          className: error ? "is-invalid" : "",
        }),
    ]));
  }

  if (error) wrap.append(el("span", { className: "field-error" }, [error]));
  return wrap;
}

function renderMedications(rows) {
  const table = el("div", { className: "med-table" });
  table.append(el("div", { className: "med-head" }, [
    el("span", {}, ["Medication name"]),
    el("span", {}, ["Dose"]),
    el("span", {}, ["Frequency"]),
    el("span", {}, [""]),
  ]));
  rows.forEach((row, index) => {
    table.append(el("div", { className: "med-row", "data-med-row": "" }, [
      el("input", { "data-med": "name", value: row.name || "", placeholder: "Medication name" }),
      el("input", { "data-med": "dose", value: row.dose || "", placeholder: "Dose" }),
      el("input", { "data-med": "frequency", value: row.frequency || "", placeholder: "Frequency" }),
      el("button", {
        type: "button",
        className: "btn-ghost",
        onClick: () => changeMedications((current) => {
          const next = current.filter((_, rowIndex) => rowIndex !== index);
          return next.length ? next : blankMeds(1);
        }),
      }, ["Remove"]),
    ]));
  });
  if (rows.length < 12) {
    table.append(el("button", {
      type: "button",
      className: "btn-ghost",
      onClick: () => changeMedications((current) => current.concat(blankMeds(1))),
    }, ["Add medication"]));
  }
  return table;
}

function changeMedications(mutator) {
  const form = document.querySelector("#intake-form");
  if (form) state.values = readForm(form);
  const current = Array.isArray(state.values.medications) ? state.values.medications : blankMeds(3);
  state.values.medications = mutator(current);
  const y = window.scrollY;
  render();
  window.scrollTo(0, y);
}

function readForm(form) {
  const data = {};
  for (const section of FORM) {
    for (const field of section.fields) {
      if (field.type === "checkbox") {
        const input = form.querySelector(`[name="${field.key}"]`);
        data[field.key] = Boolean(input && input.checked);
      } else if (field.type === "checkboxes") {
        data[field.key] = [...form.querySelectorAll(`[name="${field.key}"]:checked`)].map((node) => node.value);
      } else if (field.type === "medications") {
        data[field.key] = [...form.querySelectorAll("[data-med-row]")].map((row) => ({
          name: row.querySelector("[data-med='name']").value.trim(),
          dose: row.querySelector("[data-med='dose']").value.trim(),
          frequency: row.querySelector("[data-med='frequency']").value.trim(),
        }));
      } else {
        const input = form.querySelector(`[name="${field.key}"]`);
        data[field.key] = input ? input.value.trim() : "";
      }
    }
  }
  return data;
}

function applySignatureDefaults(data) {
  const copies = [
    ["consentPatientName", "patientName"],
    ["consentDateOfBirth", "dateOfBirth"],
    ["financialPatientName", "patientName"],
    ["financialDateOfBirth", "dateOfBirth"],
    ["relatedEntitiesName", "patientName"],
  ];
  for (const [dest, src] of copies) {
    if (!String(data[dest] || "").trim()) data[dest] = data[src] || "";
  }
  data.medications = (data.medications || []).filter((row) => row.name || row.dose || row.frequency);
  return data;
}

function validate(fields) {
  const errors = {};
  for (const section of FORM) {
    for (const field of section.fields) {
      if (!field.required) continue;
      if (!String(fields[field.key] || "").trim()) errors[field.key] = "This field is required.";
    }
  }
  return errors;
}

async function onSubmit(event) {
  event.preventDefault();
  const fields = applySignatureDefaults(readForm(event.currentTarget));
  state.values = fields;
  state.errors = validate(fields);
  if (Object.keys(state.errors).length) {
    state.message = "Name and date of birth are required.";
    render();
    const invalid = app.querySelector(".is-invalid, .field-error");
    if (invalid) invalid.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const url = state.editingId ? `/api/intakes/${state.editingId}` : "/api/intakes";
  const response = await fetch(url, {
    method: state.editingId ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  const data = await response.json();
  if (!response.ok) {
    state.message = data.error || "Could not save the intake.";
    render();
    return;
  }
  state.editingId = data.intake.id;
  state.active = data.intake;
  state.values = data.intake.fields;
  state.view = "detail";
  state.message = "";
  render();
}

function syncLabel(intake) {
  const sync = intake.sharepoint;
  if (sync && sync.status === "synced") return ["Sent to SharePoint", "ok"];
  if (sync && sync.status === "error") return ["SharePoint needs attention", "bad"];
  return ["Saved in the portal", "warn"];
}

function renderList() {
  const root = el("div");
  root.append(banner());
  const shown = state.intakes.filter((intake) => {
    const haystack = [
      intake.summary?.name,
      intake.summary?.phone,
      intake.summary?.email,
      intake.summary?.dateOfBirth,
    ].join(" ").toLowerCase();
    return haystack.includes(state.query.trim().toLowerCase());
  });

  root.append(el("div", { className: "toolbar" }, [
    el("h2", {}, ["Saved intakes"]),
    el("input", {
      type: "search",
      placeholder: "Search name, phone, or email",
      value: state.query,
      onInput: (event) => {
        state.query = event.target.value;
        render();
        const box = app.querySelector('input[type="search"]');
        if (box) {
          box.focus();
          const length = box.value.length;
          box.setSelectionRange(length, length);
        }
      },
    }),
  ]));

  if (!shown.length) {
    root.append(el("div", { className: "empty" }, [
      state.intakes.length ? "No intakes match that search." : "No intakes yet. Start with New intake.",
    ]));
    return root;
  }

  const list = el("div", { className: "list" });
  for (const intake of shown) {
    const [label, tone] = syncLabel(intake);
    list.append(el("button", {
      type: "button",
      className: "intake-row",
      onClick: () => showDetail(intake.id),
    }, [
      el("strong", {}, [intake.summary?.name || "Unnamed patient"]),
      el("span", { className: "muted" }, [intake.summary?.dateOfBirth || "No date of birth"]),
      el("span", { className: "muted" }, [intake.summary?.phone || "No phone"]),
      el("span", { className: tone === "ok" ? "pill" : `pill ${tone === "bad" ? "bad" : "warn"}` }, [label]),
    ]));
  }
  root.append(list);
  return root;
}

async function showDetail(id) {
  const response = await fetch(`/api/intakes/${id}`);
  const data = await response.json();
  if (!response.ok) {
    state.message = data.error || "Could not open that intake.";
    state.view = "list";
    render();
    return;
  }
  state.active = data.intake;
  state.view = "detail";
  state.message = "";
  render();
}

function renderDetail() {
  const intake = state.active;
  const root = el("div");
  if (!intake) {
    root.append(el("div", { className: "empty" }, ["Choose an intake from the saved list."]));
    return root;
  }

  const [label, tone] = syncLabel(intake);
  root.append(el("div", { className: "toolbar no-print" }, [
    el("div", {}, [
      el("h2", {}, [intake.summary?.name || "Intake"]),
      el("p", { className: "muted" }, [`${intake.form || "new reg form 26.pdf"} · ${intake.id} · saved ${formatWhen(intake.createdAt)}`]),
    ]),
    el("span", { className: tone === "ok" ? "pill" : `pill ${tone === "bad" ? "bad" : "warn"}` }, [label]),
  ]));

  if (intake.sharepoint?.detail) {
    root.append(el("p", { className: "note no-print" }, [intake.sharepoint.detail]));
  }

  for (const section of FORM) {
    const card = el("section", { className: section.prose ? "card packet" : "card" }, [
      el("h2", {}, [section.title]),
    ]);
    if (section.prose) card.append(renderProse(section.prose));
    if (section.note) card.append(el("p", { className: "muted" }, [section.note]));
    let wroteAnswer = false;
    for (const field of section.fields) {
      const text = displayValue(intake.fields?.[field.key], field);
      if (!text) continue;
      wroteAnswer = true;
      if (field.heading) card.append(el("h3", {}, [field.heading]));
      if (field.before) card.append(el("p", { className: "prose-line" }, [field.before]));
      card.append(el("p", { className: "answer" }, [
        el("strong", {}, [field.label + ": "]),
        text,
      ]));
    }
    if (!section.prose && !wroteAnswer) continue;
    root.append(card);
  }

  root.append(el("div", { className: "actions no-print" }, [
    el("button", { className: "btn", type: "button", onClick: () => editIntake(intake) }, ["Edit"]),
    el("button", { className: "btn-ghost", type: "button", onClick: () => window.print() }, ["Print"]),
    el("button", { className: "btn-ghost btn-danger", type: "button", onClick: () => removeIntake(intake.id) }, ["Delete"]),
    el("button", { className: "btn-ghost", type: "button", onClick: openList }, ["Back to list"]),
  ]));
  return root;
}

function displayValue(value, field) {
  if (field && field.answer === "yesno") return value === true ? "Yes" : "No";
  if (Array.isArray(value)) {
    if (value.some((item) => item && typeof item === "object")) {
      return value
        .map((item) => [item.name, item.dose, item.frequency].filter(Boolean).join(" — "))
        .filter(Boolean)
        .join("\n");
    }
    return value.filter(Boolean).join(", ");
  }
  if (value === true) return "Yes";
  if (value === false || value == null) return "";
  return String(value).trim();
}

function formatWhen(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function editIntake(intake) {
  const medications = Array.isArray(intake.fields?.medications) ? intake.fields.medications : [];
  state.view = "form";
  state.editingId = intake.id;
  state.values = { ...intake.fields, medications: medications.length ? medications : blankMeds(3) };
  state.errors = {};
  state.message = "";
  render();
}

async function removeIntake(id) {
  if (!window.confirm("Delete this intake from this computer?")) return;
  const response = await fetch(`/api/intakes/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const data = await response.json();
    state.message = data.error || "Could not delete the intake.";
    render();
    return;
  }
  state.active = null;
  openList();
}

loadStatus();
