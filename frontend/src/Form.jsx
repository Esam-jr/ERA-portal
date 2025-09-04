import React, { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const genders = [
  { value: "male", label: "Male / ወንድ" },
  { value: "female", label: "Female / ሴት" },
];

const ages = [
  { value: "18_35", label: "18–35" },
  { value: "36_45", label: "36–45" },
  { value: "46_60", label: "46–60" },
  { value: "60_plus", label: "60+" },
];

const educationLevels = [
  { value: "upto12", label: "Up to Grade 12 / እስከ 12ኛ ክፍል" },
  { value: "tvet_cert", label: "TVET Certificate / ቴክኒክና ሙያ ሰርተፊኬት" },
  { value: "college_diploma", label: "College Diploma / ኮሌጅ ዲፕሎማ" },
  { value: "bachelor_plus", label: "First Degree+ / የመጀመሪያ ዲግሪ እና በላይ" },
];

const sectors = [
  { value: "manufacturing", label: "Manufacturing / አምራች" },
  { value: "service", label: "Service / አገልግሎት" },
  { value: "wholesale", label: "Wholesale / ጅምላ" },
  { value: "retail", label: "Retail / ችርቻሮ" },
  { value: "construction", label: "Construction / ኮንስትራክሽን" },
  { value: "agriculture", label: "Agriculture / ግብርና" },
  { value: "import_export", label: "Import & Export / አስመጪ እና ላኪ" },
  { value: "mining", label: "Mining / ማዕድን" },
  { value: "other", label: "Other / ሌላ" },
];

const legalStatuses = [
  { value: "gov_dev", label: "Gov’t Dev. Enterprise / የመንግስት ልማት ድርጅት" },
  { value: "plc", label: "PLC / ሀላፊነቱ የተወሰነ የግል ማህበር" },
  { value: "share_company", label: "Share Co. / አክሲዮን ማህበር" },
  { value: "partnership", label: "Partnership / የሽርክና ማህበር" },
  { value: "other", label: "Other / ሌላ" },
];

const yearsUsing = [
  { value: "lt2", label: "< 2 years / ከ2 ዓመት በታች" },
  { value: "2to5", label: "2–5 years / ከ2 እስከ 5 ዓመት" },
  {
    value: "5to9",
    label: "5–9 years / ከ5 ዓመት በላይ እስከ 9 ዓመት",
  },
  { value: "gt9", label: "> 9 years / ከ9 ዓመት በላይ" },
];

const timeVsStandard = [
  { value: "as_standard", label: "As per standard / በስታንዳርድ" },
  { value: "less", label: "Less than standard / ከስታንዳርድ በታች" },
  { value: "more", label: "More than standard / ከስታንዳርድ በላይ" },
];

const satisfaction5 = [
  { value: 1, label: "Very Low / በጣም ዝቅተኛ" },
  { value: 2, label: "Low / ዝቅተኛ" },
  { value: 3, label: "Neutral / ገለልተኛ" },
  { value: 4, label: "High / ከፍተኛ" },
  { value: 5, label: "Very High / በጣም ከፍተኛ" },
];

const likert5 = [
  { value: 1, label: "Strongly Disagree / በጣም አልስማማም" },
  { value: 2, label: "Disagree / አልስማማም" },
  { value: 3, label: "Neutral / ገለልተኛ" },
  { value: 4, label: "Agree / እስማማለሁ" },
  { value: 5, label: "Strongly Agree / በጣም እስማማለሁ" },
];

// Service catalog for Section Two (mirrors paper form)
const servicesCatalog = [
  {
    id: 1,
    name: "Electronic tax declaration & payment support (eTax)",
    am: "በኤ-ታክስ ማስታወቅና ክፍያ ድጋፍ",
    office: "104",
    standard: "2 working days",
  },
  {
    id: 2,
    name: "Manual tax declaration & payment",
    am: "በማኑዋል ሥርዓት ታክስ ማስታወቅና ክፍያ",
    office: "104",
    standard: "10 min – 1h 30m",
  },
  {
    id: 3,
    name: "Clearance for license renewal / tenders / bank loans",
    am: "የክሊራንስ አገልግሎት (ፈቃድ አድሳስ…)",
    office: "105",
    standard: "30 min",
  },
  {
    id: 4,
    name: "Clearance for closure / ownership transfer / name or address change",
    am: "ድርጅት መዝጋት / ባለቤትነት መቀየር / ስም-አድራሻ ለውጥ",
    office: "105",
    standard: "1 hour",
  },
  {
    id: 5,
    name: "Sales receipt permit, return & cancellation",
    am: "የሽያጭ ደረሰኝ ፈቃድ/መመለስ/መሻር",
    office: "203",
    standard: "10 min – 1 hour",
  },
  {
    id: 6,
    name: "Cash register usage & support",
    am: "የሽያጭ መመዝገቢያ መሳሪያ አጠቃቀም እና ድጋፍ",
    office: "203",
    standard: "10 min – 45 working days",
  },
  {
    id: 7,
    name: "Record & archive: income/expense letters",
    am: "በሪከርድ እና ማህደር ገቢ-ወጪ ደብዳቤ",
    office: "—",
    standard: "10 – 20 min",
  },
  {
    id: 8,
    name: "Information & taxpayer education",
    am: "መረጃና የታክስ ትምህርት",
    office: "105",
    standard: "10 min – 8 hours",
  },
  {
    id: 9,
    name: "Service audit / business closure, sale or capital asset transfer",
    am: "የአገልግሎት ኦዲት / ንብረት ሽያጭ/ስጦታ",
    office: "Ground",
    standard: "—",
  },
  {
    id: 10,
    name: "Tax calculation service",
    am: "የታክስ ስሌት አገልግሎት",
    office: "203",
    standard: "Up to 20 min",
  },
  {
    id: 11,
    name: "Tax audit service",
    am: "የታክስ ኦዲት አገልግሎት",
    office: "108 & 3rd floor",
    standard: "1 – 16 working days",
  },
  {
    id: 12,
    name: "Tax fraud audit service",
    am: "የታክስ ማጭበርበር ኦዲት",
    office: "409",
    standard: "1 – 30 working days",
  },
  {
    id: 13,
    name: "Tax refund service",
    am: "የታክስ ተመላሽ",
    office: "Ground",
    standard: "10 – 30 working days",
  },
  {
    id: 14,
    name: "Taxpayer registration",
    am: "የግብር ከፋይ ምዝገባ",
    office: "105",
    standard: "30 – 45 min",
  },
  {
    id: 15,
    name: "Taxpayer TIN cancellation (upon request)",
    am: "መለያ ቁጥር ስረዛ",
    office: "105",
    standard: "1 hour",
  },
  {
    id: 16,
    name: "VAT registration (upon request)",
    am: "የተጨማሪ እሴት ታክስ ምዝገባ",
    office: "105",
    standard: "1 – 30 min",
  },
  {
    id: 17,
    name: "Tax debt rescheduling agreement (upon use)",
    am: "የታክስ ዕዳ ክፍያ ማራዘሚያ ጊዜ ስምምነት",
    office: "205",
    standard: "40 min – 5 working days",
  },
  {
    id: 18,
    name: "Appeal response for tax decisions",
    am: "በታክስ ውሳኔ ቅሬታ ምላሽ",
    office: "Oromia Building",
    standard: "30 – 180 working days",
  },
];

const transparencyStatements = [
  "የቅ/ጽ/ቤት  አገልግሎት ለመስጠት የዘረጋቸው አሰራሮች አጭር እና ግልፅ ናቸው፡፡ / Service procedures are brief and clear.",
  "የቅ/ጽ/ቤት የሚሰጣቸው ውሳኔዎች እና አገልግሎቶች ህግን የተከተሉና ፍትሃዊነትን የተላበሱ ናቸው፡፡ / Decisions and services are lawful and fair.",
  "የቅ/ጽ/ቤት የሚጠቀምበት የቴክኖሎጂ ሥርዓት  (ለምሳሌ ሲግታስ) አገልግሎት ለማሳለጥ ከፍተኛ እገዛ አድርጓል፡፡ / Technology (e.g., SIGTAS) strongly supports service delivery.",
  "የቅ/ጽ/ቤት  ታክስን በኤሌክትሮኒክስ ዘዴ (በኢታክስ) የማሳወቅ እና የመክፈል ዘዴን ስራ ላይ በማዋሉ የታክስ ከፋዩን ጫና እያቃለለ ይገኛል (በኢታክስ ተጠቃሚዎች የሚሞላ)፡፡ / Electronic methods (eTax) reduce taxpayer burden.",
  "የቅ/ጽ/ቤት  ሠራተኞች በቅንነት፣ በአክብሮት እና በተጠያቂነት መንፈስ እያገለገሉ ናቸው፡፡ / Staff serve with honesty, respect and accountability.",
  "የቅ/ጽ/ቤት ሠራተኞች በታክስ ጉዳዮች ዙሪያ በቂ እውቀት እና ልምድ አላቸው፡፡ / Staff have adequate tax knowledge and experience.",
  "የቅ/ጽ/ቤት ሰራተኞች ከተገልጋዮች ለሚቀርቡ ጥያቄዎች ፈጣን ምላሽ ይሰጣሉ፡፡ / Staff provide prompt responses to inquiries.",
  "የቅ/ጽ/ቤት ሠራተኞች ተገቢውን ስነ - ምግባር በማሟላት (በአለባበስ፣ በጸጉር አያያዝ፣ ባጅ በመልበስ፣ ወዘተ.) አገልግሎት ይሰጣሉ፡፡ / Staff maintain proper professional conduct (appearance, badge, grooming).",
  "የቅ/ጽ/ቤት ሠራተኞች የመንግስት የስራ ሰዓት ያከብራሉ፡፡ / Staff respect official working hours.",
  "በደረጃው ያሉ የቅ/ጽ/ቤት ባለሙያዎች እና የስራ ኃላፊዎች መረጃዎችና ማብራሪያዎችን ለመስጠት ተደራሽና ፈቃደኛ  ናቸው፡፡Professionals/managers are accessible and willing to explain.",
  "የቅ/ጽ/ቤት የታክስ ከፋዮችን ክፍተት በመለየት በቂ ትምህርት እየሰጠ ይገኛል፡፡ / Taxpayer education is provided adequately by identifying gaps.",
  "የቅ/ጽ/ቤት ተገልጋዩ ጉዳዩ የሚመለከተውን አካል /ሰው/ በቀላሉ ማግኘት የሚያስችል አሠራር አለው፡፡ / It’s easy to reach the responsible person for a case.",
  "የቅ/ጽ/ቤት ኃላፊዎችና ሰራተኞች ተገልጋዩን ለማገዝ ተነሳሽነት አላቸው፡፡ / Management and staff show initiative to assist taxpayers.",
  "የቅ/ጽ/ቤት ኃላፊዎችና ሰራተኞች ከአድሏዊ አሰራርና ከሙስና የጸዱ ናቸው፡፡  / Management and staff are free from corruption/unethical practices.",
  "የቅ/ጽ/ቤት ተገልጋዮችን ለማስተናገድ የሚያስችል በአንጻራዊነት ምቹ የስራ ቦታ (ህንፃ፣ እንግዳ ማረፊያ፣ ፓርኪንግ፣ ወዘተ.) አለው፡፡Premises are relatively convenient (building, reception, parking, etc.).",
];

// ---------- Utils ----------
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ---------- Main Component ----------
export default function EraFeedbackForm() {
  const [step, setStep] = useState(1); // 1..4
  const [submitting, setSubmitting] = useState(false);

  // Section 1 — General info
  const [gen, setGen] = useState({
    gender: "",
    age: "",
    education: "",
    nationality: "ethiopian",
    nationalityOther: "",
    sector: "",
    sectorOther: "",
    legal: "",
    legalOther: "",
    years: "",
    role: "",
    roleOther: "",
    branchName: "",
  });

  // Section 2 — Per-service ratings
  const [svc, setSvc] = useState(() =>
    servicesCatalog.map((s) => ({
      id: s.id,
      timeVsStandard: "",
      satisfaction: 0,
    }))
  );

  // Section 3 — Likert
  const [likert, setLikert] = useState(() =>
    transparencyStatements.map(() => 0)
  );

  // Section 4 — Open feedback
  const [problems, setProblems] = useState(["", "", ""]);
  const [suggestions, setSuggestions] = useState(["", "", ""]);
  const [additionalComment, setAdditionalComment] = useState("");

  const progress = useMemo(() => (step / 4) * 100, [step]);

  const validateStep = () => {
    // light validation
    if (step === 1) {
      const required = [
        gen.gender,
        gen.age,
        gen.education,
        gen.sector,
        gen.legal,
        gen.years,
        gen.branchName,
      ];
      return required.every(Boolean);
    }
    if (step === 2) {
      // at least one service answered
      return svc.some((r) => r.timeVsStandard || r.satisfaction > 0);
    }
    if (step === 3) {
      // at least one statement rated
      return likert.some((v) => v > 0);
    }
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      section1: gen,
      section2: svc,
      section3: likert,
      section4: { problems, suggestions, additionalComment },
      submittedAt: new Date().toISOString(),
    };

    try {
      await axios.post("/api/feedback", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success("Thank you! Your feedback has been submitted.");

      // Reset form
      setStep(1);
      setGen({
        gender: "",
        age: "",
        education: "",
        nationality: "ethiopian",
        nationalityOther: "",
        sector: "",
        sectorOther: "",
        legal: "",
        legalOther: "",
        years: "",
        role: "",
        roleOther: "",
        branchName: "",
      });
      setSvc(
        servicesCatalog.map((s) => ({
          id: s.id,
          timeVsStandard: "",
          satisfaction: 0,
        }))
      );
      setLikert(transparencyStatements.map(() => 0));
      setProblems(["", "", ""]);
      setSuggestions(["", "", ""]);
      setAdditionalComment("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/75 border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Ethiopian Revenues and Customs Authority"
              className="h-10 w-10 object-contain"
            />
            <div>
              <Link to="/" className="font-bold text-lg hover:underline">
                ERA Feedback Portal / የግብር አገልግሎት መረጃ መሙያ
              </Link>
              <p className="text-xs text-gray-500">
                Customer Satisfaction & Service Standards Survey
              </p>
            </div>
          </div>
          <div className="w-44">
            <div
              className="h-2 bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full bg-blue-600"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] mt-1 text-right text-gray-500">
              Step {step} of 4
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <nav className="mb-6">
          <ol className="flex flex-wrap gap-2 text-sm">
            {[1, 2, 3, 4].map((i) => (
              <li key={i}>
                <button
                  className={cx(
                    "px-3 py-1 rounded-full",
                    i === step
                      ? "bg-blue-600 text-white"
                      : "bg-white border text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => setStep(i)}
                >
                  {i === 1 && "1. General / አጠቃላይ"}
                  {i === 2 && "2. Services / አገልግሎቶች"}
                  {i === 3 && "3. Transparency / ግልጽነት"}
                  {i === 4 && "4. Feedback / አስተያየት"}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {step === 1 && <Section1 gen={gen} setGen={setGen} />}

        {step === 2 && <Section2 svc={svc} setSvc={setSvc} />}

        {step === 3 && <Section3 likert={likert} setLikert={setLikert} />}

        {step === 4 && (
          <Section4
            problems={problems}
            setProblems={setProblems}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            additionalComment={additionalComment}
            setAdditionalComment={setAdditionalComment}
          />
        )}

        <footer className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            * Required fields must be completed before continuing.
          </p>
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                className={cx(
                  "px-4 py-2 rounded-lg text-white",
                  validateStep()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                )}
                disabled={!validateStep()}
                onClick={() => setStep((s) => s + 1)}
              >
                Continue
              </button>
            )}
            {step === 4 && (
              <button
                className={cx(
                  "px-4 py-2 rounded-lg text-white",
                  validateStep()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                )}
                disabled={submitting}
                onClick={handleSubmit}
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}

// ---------- Section 1 ----------
function Section1({ gen, setGen }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4 md:p-6 space-y-6">
      <header>
        <h2 className="text-xl font-semibold">
          Section 1 — General Information / ክፍል 1 አጠቃላይ መረጃ
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please complete the required fields. / እባክዎ አስፈላጊ መረጃዎችን ይሙሉ።
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <Fieldset label="Gender / ጾታ*">
          <RadioGroup
            name="gender"
            value={gen.gender}
            onChange={(v) => setGen((s) => ({ ...s, gender: v }))}
            options={genders}
          />
        </Fieldset>

        <Fieldset label="Age / ዕድሜ*">
          <Select
            value={gen.age}
            onChange={(v) => setGen((s) => ({ ...s, age: v }))}
            placeholder="Select age range"
            options={ages}
          />
        </Fieldset>

        <Fieldset label="Education Level / የትምህርት ደረጃ*">
          <Select
            value={gen.education}
            onChange={(v) => setGen((s) => ({ ...s, education: v }))}
            placeholder="Select education"
            options={educationLevels}
          />
        </Fieldset>

        <Fieldset label="Nationality / ዜግነት">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="nationality"
                className="h-4 w-4"
                checked={gen.nationality === "ethiopian"}
                onChange={() =>
                  setGen((s) => ({ ...s, nationality: "ethiopian" }))
                }
              />
              <span>Ethiopian / ኢትዮጵያዊ</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="nationality"
                className="h-4 w-4"
                checked={gen.nationality === "other"}
                onChange={() => setGen((s) => ({ ...s, nationality: "other" }))}
              />
              <span>Other / ሌላ</span>
            </label>
          </div>
          {gen.nationality === "other" && (
            <input
              type="text"
              className="mt-2 w-full rounded-lg border px-3 py-2"
              placeholder="Please specify"
              value={gen.nationalityOther}
              onChange={(e) =>
                setGen((s) => ({ ...s, nationalityOther: e.target.value }))
              }
            />
          )}
        </Fieldset>

        <Fieldset label="Sector / የስራ መስክ*">
          <Select
            value={gen.sector}
            onChange={(v) => setGen((s) => ({ ...s, sector: v }))}
            placeholder="Select sector"
            options={sectors}
          />
          {gen.sector === "other" && (
            <input
              type="text"
              className="mt-2 w-full rounded-lg border px-3 py-2"
              placeholder="Specify other"
              value={gen.sectorOther}
              onChange={(e) =>
                setGen((s) => ({ ...s, sectorOther: e.target.value }))
              }
            />
          )}
        </Fieldset>

        <Fieldset label="Legal Status / የህጋዊ ሰውነት*">
          <Select
            value={gen.legal}
            onChange={(v) => setGen((s) => ({ ...s, legal: v }))}
            placeholder="Select legal status"
            options={legalStatuses}
          />
          {gen.legal === "other" && (
            <input
              type="text"
              className="mt-2 w-full rounded-lg border px-3 py-2"
              placeholder="Specify other"
              value={gen.legalOther}
              onChange={(e) =>
                setGen((s) => ({ ...s, legalOther: e.target.value }))
              }
            />
          )}
        </Fieldset>

        <Fieldset label="How long using services? / ምን ያህል ጊዜ?*">
          <Select
            value={gen.years}
            onChange={(v) => setGen((s) => ({ ...s, years: v }))}
            placeholder="Select duration"
            options={yearsUsing}
          />
        </Fieldset>

        <Fieldset label="Role in organization / ኃላፊነት">
          <Select
            value={gen.role}
            onChange={(v) => setGen((s) => ({ ...s, role: v }))}
            placeholder="Select role"
            options={[
              { value: "owner", label: "Owner / ባለቤት" },
              {
                value: "owner_manager",
                label: "Owner & Manager / ባለቤት እና ስራ አስኪያጅ",
              },
              {
                value: "hired_manager",
                label: "Hired Manager / ተቀጣሪ ስራ አስኪያጅ",
              },
              { value: "agent", label: "Agent / ወኪል" },
              { value: "employee", label: "Employee / ሰራተኛ" },
              { value: "other", label: "Other / ሌላ" },
            ]}
          />
          {gen.role === "other" && (
            <input
              type="text"
              className="mt-2 w-full rounded-lg border px-3 py-2"
              placeholder="Specify other"
              value={gen.roleOther}
              onChange={(e) =>
                setGen((s) => ({ ...s, roleOther: e.target.value }))
              }
            />
          )}
        </Fieldset>

        <Fieldset label="Branch office where you pay tax / የታክስ ቅ/ጽ/ቤት ስም*">
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="e.g., Adama Branch"
            value={gen.branchName}
            onChange={(e) =>
              setGen((s) => ({ ...s, branchName: e.target.value }))
            }
          />
        </Fieldset>
      </div>
    </div>
  );
}

// ---------- Section 2 ----------
function Section2({ svc, setSvc }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4 md:p-6 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">
          Section 2 — Service Standards & Satisfaction / ክፍል 2 አገልግሎት ስታንዳርድ እና
          እርካታ
        </h2>
        <p className="text-sm text-gray-500">
          For any services you used, indicate time vs. standard and satisfaction
          level. / የተጠቀሙትን አገልግሎቶች ብቻ ይሙሉ።
        </p>
      </header>

      <div className="grid gap-4">
        {servicesCatalog.map((s, idx) => (
          <article key={s.id} className="rounded-xl border p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h3 className="font-medium text-gray-900">
                  {idx + 1}. {s.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {s.am} • Office {s.office} • Standard: {s.standard}
                </p>
              </div>
            </div>

            <div className="mt-3 grid md:grid-cols-2 gap-4">
              <Fieldset label="Time vs. standard / ጊዜ ከስታንዳርድ ጋር">
                <RadioGroup
                  name={`time-${s.id}`}
                  value={svc[idx].timeVsStandard}
                  onChange={(v) =>
                    setSvc((arr) =>
                      arr.map((r, i) =>
                        i === idx ? { ...r, timeVsStandard: v } : r
                      )
                    )
                  }
                  options={timeVsStandard}
                />
              </Fieldset>

              <Fieldset label="Satisfaction / የእርካታ ደረጃ">
                <RadioGroup
                  name={`sat-${s.id}`}
                  value={svc[idx].satisfaction}
                  onChange={(v) =>
                    setSvc((arr) =>
                      arr.map((r, i) =>
                        i === idx ? { ...r, satisfaction: Number(v) } : r
                      )
                    )
                  }
                  options={satisfaction5}
                />
              </Fieldset>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ---------- Section 3 ----------
function Section3({ likert, setLikert }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4 md:p-6 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">
          Section 3 — Transparency, Fairness & Workplace Convenience / ክፍል 3
          ግልጽነት ፍትሃዊነት ምቹነት
        </h2>
        <p className="text-sm text-gray-500">
          Use the 5‑point agreement scale. / በ5 ደረጃ ሚዛን ይምረጡ።
        </p>
      </header>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-medium w-[44%]">Statement</th>
              {likert5.map((o) => (
                <th
                  key={o.value}
                  className="text-center p-3 font-medium whitespace-nowrap"
                >
                  {o.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transparencyStatements.map((st, i) => (
              <tr key={i} className="border-t">
                <td className="p-3 align-top">
                  {i + 1}. {st}
                </td>
                {likert5.map((o) => (
                  <td key={o.value} className="p-3 text-center">
                    <input
                      type="radio"
                      name={`likert-${i}`}
                      className="h-4 w-4"
                      checked={likert[i] === o.value}
                      onChange={() =>
                        setLikert((arr) =>
                          arr.map((v, idx) => (idx === i ? o.value : v))
                        )
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {transparencyStatements.map((st, i) => (
          <div key={i} className="rounded-xl border p-4">
            <p className="text-sm font-medium mb-3">
              {i + 1}. {st}
            </p>
            <RadioGroup
              name={`likert-m-${i}`}
              value={likert[i]}
              onChange={(v) =>
                setLikert((arr) =>
                  arr.map((val, idx) => (idx === i ? Number(v) : val))
                )
              }
              options={likert5}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Section 4 ----------
function Section4({
  problems,
  setProblems,
  suggestions,
  setSuggestions,
  additionalComment,
  setAdditionalComment,
}) {
  const updateArray = (arr, setArr, idx, value) => {
    const next = [...arr];
    next[idx] = value;
    setArr(next);
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4 md:p-6 space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">
          Section 4 — General Feedback / ክፍል 4 አጠቃላይ አስተያየት
        </h2>
        <p className="text-sm text-gray-500">
          List main problems and suggestions. / ዋና ችግኝነቶችን እና ሀሳቦችን ይጻፉ።
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">
            Main problems observed / ዋና ችግኝነቶች
          </h3>
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              type="text"
              className="mb-2 w-full rounded-lg border px-3 py-2"
              placeholder={`Problem #${i + 1}`}
              value={problems[i]}
              onChange={(e) =>
                updateArray(problems, setProblems, i, e.target.value)
              }
            />
          ))}
        </div>
        <div>
          <h3 className="font-medium mb-2">
            Suggestions to improve / ለማሻሻል ሀሳቦች
          </h3>
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              type="text"
              className="mb-2 w-full rounded-lg border px-3 py-2"
              placeholder={`Suggestion #${i + 1}`}
              value={suggestions[i]}
              onChange={(e) =>
                updateArray(suggestions, setSuggestions, i, e.target.value)
              }
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Any additional comments? / ተጨማሪ አስተያየት
        </label>
        <textarea
          className="w-full min-h-[120px] rounded-lg border px-3 py-2"
          placeholder="Write here…"
          value={additionalComment}
          onChange={(e) => setAdditionalComment(e.target.value)}
        />
      </div>
    </div>
  );
}

// ---------- Reusable UI ----------
function Fieldset({ label, children }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-gray-700">{label}</legend>
      {children}
    </fieldset>
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      className="w-full rounded-lg border px-3 py-2 bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="grid gap-2">
      {options.map((o) => (
        <label key={o.value} className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            className="h-4 w-4"
            checked={String(value) === String(o.value)}
            onChange={() => onChange(o.value)}
          />
          <span className="text-sm">{o.label}</span>
        </label>
      ))}
    </div>
  );
}
