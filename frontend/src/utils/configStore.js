const STORAGE_KEY_SERVICES = "era_services_catalog_v1";
const STORAGE_KEY_STATEMENTS = "era_transparency_statements_v1";

export const DEFAULT_SERVICES = [
  {
    id: 1,
    name: "Electronic tax declaration & payment support (eTax)",
    amharic: "በኤ-ታክስ ማስታወቅና ክፍያ ድጋፍ",
    office: "104",
    standard: "2 working days",
  },
  {
    id: 2,
    name: "Manual tax declaration & payment",
    amharic: "በማኑዋል ሥርዓት ታክስ ማስታወቅና ክፍያ",
    office: "104",
    standard: "10 min – 1h 30m",
  },
  {
    id: 3,
    name: "Clearance for license renewal / tenders / bank loans",
    amharic: "የክሊራንስ አገልግሎት (ፈቃድ አድ��ስ…)",
    office: "105",
    standard: "30 min",
  },
  {
    id: 4,
    name: "Clearance for closure / ownership transfer / name or address change",
    amharic: "ድርጅት መዝጋት / ባለቤትነት መቀየር / ስም-አድራሻ ለውጥ",
    office: "105",
    standard: "1 hour",
  },
  {
    id: 5,
    name: "Sales receipt permit, return & cancellation",
    amharic: "የሽያጭ ደረሰኝ ፈቃድ/መመለስ/መሻር",
    office: "203",
    standard: "10 min – 1 hour",
  },
  {
    id: 6,
    name: "Cash register usage & support",
    amharic: "የሽያጭ መመዝገቢያ መሳሪያ አጠቃቀም እና ድጋፍ",
    office: "203",
    standard: "10 min – 45 working days",
  },
  {
    id: 7,
    name: "Record & archive: income/expense letters",
    amharic: "በሪከርድ እና ማህደር ገቢ-ወጪ ደብዳቤ",
    office: "—",
    standard: "10 – 20 min",
  },
  {
    id: 8,
    name: "Information & taxpayer education",
    amharic: "መረጃና የታክስ ትምህርት",
    office: "105",
    standard: "10 min – 8 hours",
  },
  {
    id: 9,
    name: "Service audit / business closure, sale or capital asset transfer",
    amharic: "የአገልግሎት ኦዲት / ንብረት ሽያጭ/ስጦታ",
    office: "Ground",
    standard: "—",
  },
  {
    id: 10,
    name: "Tax calculation service",
    amharic: "የታክስ ስሌት አገልግሎት",
    office: "203",
    standard: "Up to 20 min",
  },
  {
    id: 11,
    name: "Tax audit service",
    amharic: "የታክስ ኦዲት አገልግሎት",
    office: "108 & 3rd floor",
    standard: "1 – 16 working days",
  },
  {
    id: 12,
    name: "Tax fraud audit service",
    amharic: "የታክስ ማጭበርበር ኦዲት",
    office: "409",
    standard: "1 – 30 working days",
  },
  {
    id: 13,
    name: "Tax refund service",
    amharic: "የታክስ ተመላሽ",
    office: "Ground",
    standard: "10 – 30 working days",
  },
  {
    id: 14,
    name: "Taxpayer registration",
    amharic: "የግብር ከፋይ ምዝገባ",
    office: "105",
    standard: "30 – 45 min",
  },
  {
    id: 15,
    name: "Taxpayer TIN cancellation (upon request)",
    amharic: "መለያ ቁጥር ስረዛ",
    office: "105",
    standard: "1 hour",
  },
  {
    id: 16,
    name: "VAT registration (upon request)",
    amharic: "የተጨማሪ እሴት ታክስ ምዝገባ",
    office: "105",
    standard: "1 – 30 min",
  },
  {
    id: 17,
    name: "Tax debt rescheduling agreement (upon use)",
    amharic: "የታክስ ዕዳ ክፍያ ማራዘሚያ ጊዜ ስምምነት",
    office: "205",
    standard: "40 min – 5 working days",
  },
  {
    id: 18,
    name: "Appeal response for tax decisions",
    amharic: "በታክስ ው���ኔ ቅሬታ ምላሽ",
    office: "Oromia Building",
    standard: "30 – 180 working days",
  },
];

export const DEFAULT_STATEMENTS = [
  "Service procedures are brief and clear / የቅ/ጽ/ቤት አገልግሎት ለመስጠት የዘረጋቸው አሰራሮች አጭር እና ግልፅ ናቸው፡፡",
  "Decisions and services are lawful and fair / የቅ/ጽ/ቤት የሚሰጣቸው ውሳኔዎች እና አገልግሎቶች ህግን የተከተሉና ፍትሃዊነትን የተላበሱ ናቸው፡፡",
  "Technology (e.g., SIGTAS) strongly supports service delivery / የቅ/ጽ/ቤት የቴክኖሎጂ ሥርዓት አገልግሎት ለማሳለጥ ከፍተኛ እገዛ አድርጓል፡፡",
  "Electronic methods (eTax) reduce taxpayer burden / ኢ-ታክስ ዘዴ ጫናን ያቀናል፡፡",
  "Staff serve with honesty, respect and accountability / ሠራተኞች በቅንነት እና በአክብሮት ይገለግላሉ፡፡",
  "Staff have adequate tax knowledge and experience / በታክስ ጉዳይ በቂ እውቀት አላቸው፡፡",
  "Staff provide prompt responses to inquiries / ፈጣን ምላሽ ይሰጣሉ፡፡",
  "Staff maintain proper professional conduct / ተገቢ ስነ-ምግባር ይጠብቃሉ፡፡",
  "Staff respect official working hours / የስራ ሰዓት ያከብራሉ፡፡",
  "Professionals/managers are accessible / ባለሙያ እና ኃላፊዎች ተደራሽ ናቸው፡፡",
  "Taxpayer education is provided adequately / የታክስ ትምህርት በቂ ነው፡፡",
  "Easy to reach the responsible person / ተጠያቂ አካል በቀላሉ ይደረሳል፡፡",
  "Management/staff show initiative / እንቅስቃሴ ያሳያሉ፡፡",
  "Free from corruption/unethical practices / ከሙስና የጸዱ ናቸው፡፡",
  "Premises are relatively convenient / ቦታ በአንጻራዊነት ምቹ ነው፡፡",
];

export function getServicesCatalog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SERVICES);
    if (!raw) return DEFAULT_SERVICES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) return parsed;
    return DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
}

export function setServicesCatalog(services) {
  const normalized = (Array.isArray(services) ? services : []).map(
    (s, idx) => ({
      id: Number(s.id ?? idx + 1),
      name: String(s.name || "").trim() || `Service #${idx + 1}`,
      amharic: String(s.amharic || s.am || "").trim(),
      office: String(s.office || "").trim(),
      standard: String(s.standard || "").trim(),
    })
  );
  localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(normalized));
}

export function getTransparencyStatements() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATEMENTS);
    if (!raw) return DEFAULT_STATEMENTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) return parsed;
    return DEFAULT_STATEMENTS;
  } catch {
    return DEFAULT_STATEMENTS;
  }
}

export function setTransparencyStatements(statements) {
  const normalized = (Array.isArray(statements) ? statements : [])
    .map((s) => String(s || "").trim())
    .filter(Boolean);
  localStorage.setItem(STORAGE_KEY_STATEMENTS, JSON.stringify(normalized));
}
