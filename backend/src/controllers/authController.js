import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({
      email: String(email).toLowerCase().trim(),
    });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await admin.verifyPassword(password);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ sub: String(admin._id) }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Logedin Successfully", ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Login failed" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingAdmin = await Admin.findOne({
      email: String(email).toLowerCase().trim(),
    });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ error: "Admin with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name,
      email: String(email).toLowerCase().trim(),
      password: hashedPassword,
    });
    await admin.save();
    return res
      .status(201)
      .json({ message: "Admin created", adminId: admin._id });
  } catch (error) {
    console.error("Error creating admin:", error);
    throw new Error("Failed to create admin");
  }
};
