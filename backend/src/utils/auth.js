import jwt from "jsonwebtoken";
const { verify } = jwt;
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token =
      req.cookies.token ||
      (header.startsWith("Bearer ") ? header.slice(7) : "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const payload = verify(token, JWT_SECRET);
    req.adminId = payload.sub;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export const requireSuperAdmin = async (req, res, next) => {
  try {
    if (!req.adminId) return res.status(401).json({ error: "Unauthorized" });

    const admin = await Admin.findById(req.adminId);
    if (!admin) return res.status(401).json({ error: "Unauthorized" });

    // Here you can mark a field `isSuperAdmin` in your Admin model
    // For now, we consider the first admin in DB as superadmin
    const firstAdmin = await Admin.findOne().sort({ createdAt: 1 });

    if (admin._id.toString() !== firstAdmin._id.toString()) {
      return res
        .status(403)
        .json({ error: "Forbidden: only superadmins allowed" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
