// Text from new reg form 26.pdf, in the same order as the packet.
const CLINIC_LINES = [
  { p: "101 Madison St. Suite 300. Oak Park, IL 60302" },
  { p: "Ph: (708) 486-2700  |  Fax: (708) 486-2702" },
];

const HIPAA_TEXT = [
  ...CLINIC_LINES,
  { h: "CIMPAR Primary Care Clinic" },
  { h: "Purpose of This Notice" },
  { p: "This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully." },
  { h: "Your Information. Your Rights. Our Responsibilities." },
  { h: "Your Rights:" },
  { ul: [
    "Get an electronic or paper copy of your medical record: You can ask to see or get an electronic or paper copy of your medical record and other health information we have about you. We will provide a copy or a summary of your health information, usually within 30 days of your request. We may charge a reasonable, cost-based fee.",
    "Ask us to correct your medical record: You can ask us to correct health information about you that you think is incorrect or incomplete. We may say \"no\" to your request, but we'll tell you why in writing within 60 days.",
    "Request confidential communications: You can ask us to contact you in a specific way (for example, home or office phone) or to send mail to a different address. We will say \"yes\" to all reasonable requests.",
    "Ask us to limit what we use or share: You can ask us not to use or share certain health information for treatment, payment, or our operations. We are not required to agree to your request, and we may say \"no\" if it would affect your care.",
    "Get a list of those with whom we've shared information: You can ask for a list (accounting) of the times we've shared your health information for six years prior to the date you ask, who we shared it with, and why.",
    "Get a copy of this privacy notice: You can ask for a paper copy of this notice at any time, even if you have agreed to receive the notice electronically. We will provide you with a paper copy promptly.",
    "Choose someone to act for you: If you have given someone medical power of attorney or if someone is your legal guardian, that person can exercise your rights and make choices about your health information.",
    "File a complaint if you feel your rights are violated: You can complain if you feel we have violated your rights by contacting us using the information on this form. You can also file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights by sending a letter to 200 Independence Avenue, S.W., Washington, D.C. 20201, calling 1-877-696-6775, or visiting www.hhs.gov/ocr/privacy/hipaa/complaints/.",
  ] },
  { h: "Your Choices:" },
  { p: "For certain health information, you can tell us your choices about what we share. If you have a clear preference for how we share your information in the situations described below, talk to us. Tell us what you want us to do, and we will follow your instructions." },
  { p: "In these cases, you have both the right and choice to tell us to:" },
  { ul: [
    "Share information with your family, close friends, or others involved in your care",
    "Share information in a disaster relief situation",
    "Include your information in a hospital directory",
    "Contact you for fundraising efforts",
  ] },
  { p: "If you cannot tell us your preference, for example, if you are unconscious, we may go ahead and share your information if we believe it is in your best interest. We may also share your information when needed to lessen a serious and imminent threat to health or safety." },
  { p: "In these cases, we never share your information unless you give us written permission:" },
  { ul: [
    "Marketing purposes",
    "Sale of your information",
  ] },
  { h: "Our Uses and Disclosures:" },
  { ul: [
    "Treat you: We can use your health information and share it with other professionals who are treating you.",
    "Run our organization: We can use and share your health information to run our practice, improve your care, and contact you when necessary.",
    "Bill for your services: We can use and share your health information to bill and get payment from health plans or other entities.",
    "Help with public health and safety issues: We can share health information about you for certain situations such as preventing disease, helping with product recalls, reporting adverse reactions to medications, reporting suspected abuse, neglect, or domestic violence, preventing or reducing a serious threat to anyone's health or safety.",
    "Do research: We can use or share your information for health research.",
    "Comply with the law: We will share information about you if state or federal laws require it, including with the Department of Health and Human Services if it wants to see that we're complying with federal privacy law.",
    "Respond to organ and tissue donation requests: We can share health information about you with organ procurement organizations.",
    "Work with a medical examiner or funeral director: We can share health information with a coroner, medical examiner, or funeral director when an individual dies.",
    "Address workers' compensation, law enforcement, and other government requests: We can use or share health information about you for workers' compensation claims, law enforcement purposes, or with a law enforcement official, with health oversight agencies for activities authorized by law, and for special government functions such as military, national security, and presidential protective services.",
    "Respond to lawsuits and legal actions: We can share health information about you in response to a court or administrative order, or in response to a subpoena.",
  ] },
  { h: "Our Responsibilities:" },
  { ul: [
    "We are required by law to maintain the privacy and security of your protected health information. We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information. We must follow the duties and privacy practices described in this notice and give you a copy of it.",
    "We will not use or share your information other than as described here unless you tell us we can in writing. If you tell us we can, you may change your mind at any time. Let us know in writing if you change your mind.",
  ] },
  { p: "For more information, see: www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html" },
];

const FINANCIAL_TEXT = [
  ...CLINIC_LINES,
  { h: "CIMPAR Primary Care Clinic" },
  { h: "1. Insurance Information" },
  { ul: [
    "We require patients to present valid insurance cards at each visit. It is the patient's responsibility to ensure we have the most current insurance information.",
    "Coverage: We participate with many insurance plans. Please check with our front office or your insurance company to confirm that we are in-network with your plan.",
    "Referrals and Authorizations: If your insurance requires a referral or prior authorization for services, it is your responsibility to obtain this from your primary care physician or insurance company before your appointment.",
  ] },
  { h: "2. Co-Payments, Deductibles, and Co-Insurance" },
  { ul: [
    "Co-Payments: Co-payments are due at the time of service (via cash, checks, or card).",
    "Deductibles and Co-Insurance: Patients are responsible for paying any deductibles and co-insurance amounts as dictated by their insurance plan. These payments may be collected at the time of service or billed to you after your insurance processes the claim.",
  ] },
  { h: "3. Self-Pay Patients" },
  { ul: [
    "Fee Schedule: For patients without insurance or those opting to pay out-of-pocket, a fee schedule is available upon request. Payment is expected at the time of service.",
    "Payment Plans: For those unable to pay in full at the time of service, payment plans can be arranged. Please speak with our billing office to discuss options.",
  ] },
  { h: "4. Outstanding Balances" },
  { ul: [
    "Billing Statements: Patients will receive statements for any balances not covered by insurance. Payments are due within 30 days of the statement date.",
    "Payment Arrangements: If you are unable to pay the full amount, please contact our billing office to discuss payment arrangements. Failure to make arrangements or to keep up with agreed payments may result in your account being sent to a collection agency.",
  ] },
  { h: "5. Missed Appointments and Late Cancellations" },
  { h: "No Show Policy:" },
  { ul: [
    "A \"No Show\" is defined as missing a scheduled appointment without prior notification.",
    "Patients who fail to show up for their appointment without calling to cancel or reschedule at least 24 hours in advance will be charged a $50 No Show fee.",
  ] },
  { h: "Late Arrival Policy:" },
  { ul: [
    "Patients are expected to arrive on time for their scheduled appointments.",
    "Arriving more than 30 minutes late for an appointment is considered a \"Late Arrival.\"",
    "Patients who arrive late may be asked to reschedule, and a $50 Late Cancellation fee will be applied if the appointment cannot be accommodated on the same day.",
  ] },
  { h: "Late Cancellation Policy:" },
  { ul: [
    "To avoid a cancellation fee, patients must cancel or reschedule their appointment at least 24 hours before the scheduled time. Cancellations made less than 24 hours before the appointment will incur a $50 Late Cancellation fee.",
  ] },
  { h: "Fee Details" },
  { ul: [
    "The $50 fee for No Shows, Late Arrivals, and Late Cancellations is not covered by insurance and must be paid by the patient.",
  ] },
  { h: "Communication of Policy" },
  { ul: [
    "This policy will be communicated to patients at the time of scheduling an appointment.",
    "A copy of this policy will be available on our website and at the front desk.",
  ] },
  { h: "Exceptions" },
  { ul: [
    "Exceptions to this policy may be made at the discretion of the office staff for emergencies or other extenuating circumstances.",
  ] },
];

const RELATED_TEXT = [
  ...CLINIC_LINES,
  { h: "Patient Acknowledgement of Related Entities" },
  { p: "CIMPAR S.C., CIMCONS LLC, CIMPAR Clinical Laboratories LLC (dba Reya Labs), CIMPAR Diagnostics LLC (dba Reya Imaging), CIMPAR At Home LLC (dba Reya At Home), CIMPAR Pharmacy LLC (dba Reya Pharmacy), CIMPAR Pharmacy Oak Park LLC (dba Reya Pharmacy #2), and Reya Medical Transport LLC (dba Reya Go) (\"CIMPAR/Reya Companies\" or \"CIMPAR/Reya Company\") and its health care providers are affiliated with each other and are related entities with the same directors and officers." },
  { p: "As a patient of a CIMPAR/Reya Company, you may be informed that you require health care services, and you may be referred to another CIMPAR/Reya Company. You have the right to choose to have your health care services performed at any facility and/or by any entity." },
  { p: "By reading and signing this Patient Acknowledgement of Related Entities, you acknowledge and understand that the CIMPAR/Reya Companies and its health care providers have disclosed their affiliations and related entity status to you, and you have chosen to receive your health care from the CIMPAR/Reya Companies." },
  { p: "Acknowledged and Accepted By:" },
];
