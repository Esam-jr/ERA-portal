import mongoose from "mongoose";

const { Schema, model, models } = mongoose;
const ServiceRatingSchema = new Schema(
  {
    serviceId: { type: Number, required: true },
    timeVsStandard: { type: String, enum: ["as_standard", "less", "more"] },
    satisfaction: { type: Number, min: 1, max: 5 },
  },
  { _id: false }
);

const TransparencySchema = new Schema(
  {
    rating: { type: Number, min: 1, max: 5, required: true },
    reason: { type: String },
  },
  { _id: false }
);

const FeedbackSchema = new Schema(
  {
    section1: {
      gender: { type: String, enum: ["male", "female"], required: true },
      age: {
        type: String,
        enum: ["18_35", "36_45", "46_60", "60_plus"],
        required: true,
      },
      education: {
        type: String,
        enum: ["upto12", "tvet_cert", "college_diploma", "bachelor_plus"],
        required: true,
      },
      nationality: {
        type: String,
        enum: ["ethiopian", "other"],
        default: "ethiopian",
      },
      nationalityOther: String,
      sector: {
        type: String,
        enum: [
          "manufacturing",
          "service",
          "wholesale",
          "retail",
          "construction",
          "agriculture",
          "import_export",
          "mining",
          "other",
        ],
        required: true,
      },
      sectorOther: String,
      legal: {
        type: String,
        enum: ["gov_dev", "plc", "share_company", "partnership", "other"],
        required: true,
      },
      legalOther: String,
      years: {
        type: String,
        enum: ["lt2", "2to5", "5to9", "gt9"],
        required: true,
      },
      role: {
        type: String,
        enum: [
          "owner",
          "owner_manager",
          "hired_manager",
          "agent",
          "employee",
          "other",
        ],
        required: false,
      },
      roleOther: String,
      branchName: { type: String, required: true, index: true },
    },
    section2: [ServiceRatingSchema],
    section3: [TransparencySchema],
    section4: {
      problems: [String],
      suggestions: [String],
      additionalComment: String,
    },
    meta: {
      userAgent: String,
      ip: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

FeedbackSchema.index({ createdAt: -1 });
FeedbackSchema.index({ "section1.sector": 1 });
FeedbackSchema.index({ "section1.branchName": 1, createdAt: -1 });

export const Feedback = models.Feedback || model("Feedback", FeedbackSchema);
