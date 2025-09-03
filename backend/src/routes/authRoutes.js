import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  login,
} from "../controllers/authController.js";
import {
  validateAdminCreate,
  validateAdminLogin,
} from "../validators/adminValidators.js";
import { validateRequest } from "../utils/validateRequest.js";
import { requireAuth, requireSuperAdmin } from "../utils/auth.js";

const router = Router();

router.post("/login", validateAdminLogin, validateRequest, login);

router.post(
  "/create",
  requireAuth,
  requireSuperAdmin,
  validateAdminCreate,
  validateRequest,
  createAdmin
);

router.get("/list", requireAuth, requireSuperAdmin, getAdmins);

router.delete("/:id", requireAuth, requireSuperAdmin, deleteAdmin);

export default router;
