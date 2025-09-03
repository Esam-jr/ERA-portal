import { Router } from "express";
import { createAdmin, login } from "../controllers/authController.js";
import {
  validateAdminCreate,
  validateAdminLogin,
} from "../validators/adminValidators.js";
import { validateRequest } from "../utils/validateRequest.js";

const router = Router();

router.post("/login", validateAdminLogin, validateRequest, login);
router.post("/create", validateAdminCreate, validateRequest, createAdmin);

export default router;
