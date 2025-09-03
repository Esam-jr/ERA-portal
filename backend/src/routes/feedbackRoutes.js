import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  create,
  list,
  getById,
  deleteById,
} from "../controllers/feedbackController.js";
import { requireAuth } from "../utils/auth.js";

const router = Router();

const feedbackLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

router.post("/", feedbackLimiter, create);

router.get("/", requireAuth, list);
router.get("/:id", requireAuth, getById);
router.delete("/:id", requireAuth, deleteById);

export default router;
