import { Router } from "express";
import rateLimit from "express-rate-limit";
import { create, list, getById } from "../controllers/feedbackController.js";
import auth from "../utils/auth.js";

const router = Router();

const feedbackLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// Public submit
router.post("/", feedbackLimiter, create);

// Admin protected
router.get("/", auth, list);
router.get("/:id", auth, getById);

export default router;
