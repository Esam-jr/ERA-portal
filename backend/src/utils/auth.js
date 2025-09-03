import jwt from "jsonwebtoken";
const { verify } = jwt;
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

function auth(req, res, next) {
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

export default auth;
