import { Feedback } from "../models/Feedback.js";
function sanitizeFeedbackPayload(body) {
  const b = body || {};
  const s1 = b.section1 || {};
  const trim = (v) => (typeof v === "string" ? v.trim() : undefined);

  // Section 2: filter valid entries
  const s2 = (Array.isArray(b.section2) ? b.section2 : [])
    .map((r) => ({
      serviceId: Number(r.id || r.serviceId),
      timeVsStandard: trim(r.timeVsStandard),
      satisfaction: r.satisfaction ? Number(r.satisfaction) : undefined,
    }))
    .filter(
      (r) =>
        r.serviceId &&
        (r.timeVsStandard || (r.satisfaction && r.satisfaction > 0))
    );

  // Section 3: transparency ratings
  const s3 = (Array.isArray(b.section3) ? b.section3 : [])
    .map((r) => ({
      rating: Number(r.rating),
      reason: trim(r.reason),
    }))
    .filter((r) => Number.isFinite(r.rating) && r.rating >= 1 && r.rating <= 5);

  // Section 4: feedback cleanup
  const s4raw = b.section4 || {};
  const cleanArray = (arr) =>
    (Array.isArray(arr) ? arr : []).map(trim).filter(Boolean);
  const section4 = {
    problems: cleanArray(s4raw.problems),
    suggestions: cleanArray(s4raw.suggestions),
    additionalComment: trim(s4raw.additionalComment),
  };

  return {
    section1: {
      gender: trim(s1.gender),
      age: trim(s1.age),
      education: trim(s1.education),
      nationality: trim(s1.nationality || "ethiopian"),
      nationalityOther: trim(s1.nationalityOther),
      sector: trim(s1.sector),
      sectorOther: trim(s1.sectorOther),
      legal: trim(s1.legal),
      legalOther: trim(s1.legalOther),
      years: trim(s1.years),
      role: s1.role ? trim(s1.role) : undefined,
      roleOther: trim(s1.roleOther),
      branchName: trim(s1.branchName),
    },
    section2: s2,
    section3: s3,
    section4,
  };
}

function validateSection1(s1) {
  const required = [
    "gender",
    "age",
    "education",
    "sector",
    "legal",
    "years",
    "branchName",
  ];
  for (const key of required) {
    if (!s1[key]) return `${key} is required`;
  }
  return null;
}

export const create = async (req, res) => {
  try {
    const sanitized = sanitizeFeedbackPayload(req.body);
    const s1Err = validateSection1(sanitized.section1);
    if (s1Err) return res.status(400).json({ error: s1Err });

    const doc = await Feedback.create({
      ...sanitized,
      meta: {
        userAgent: req.get("user-agent"),
        ip: req.ip,
      },
    });
    return res.status(201).json({ id: doc._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to submit feedback" });
  }
};

export const list = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.min(100, Math.max(1, Number(req.query.limit || 20)));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.branchName)
      filter["section1.branchName"] = req.query.branchName;
    if (req.query.sector) filter["section1.sector"] = req.query.sector;

    if (req.query.dateFrom || req.query.dateTo) {
      filter.createdAt = {};
      if (req.query.dateFrom)
        filter.createdAt.$gte = new Date(req.query.dateFrom);
      if (req.query.dateTo) filter.createdAt.$lte = new Date(req.query.dateTo);
    }

    const [items, total] = await Promise.all([
      Feedback.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Feedback.countDocuments(filter),
    ]);

    return res.json({ page, limit, total, items });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

export const getById = async (req, res) => {
  try {
    const item = await Feedback.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    return res.json(item);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const item = await Feedback.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "item Deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to delete feedback" });
  }
};
