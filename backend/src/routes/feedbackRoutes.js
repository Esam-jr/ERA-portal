import { Router } from "express";
import rateLimit from "express-rate-limit";
import { create, list, getById } from "../controllers/feedbackController.js";
import { requireAuth } from "../utils/auth.js";

const router = Router();

const feedbackLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// Public submit
router.post("/", feedbackLimiter, create);

// Admin protected
router.get("/", requireAuth, list);
router.get("/:id", requireAuth, getById);

export default router;
