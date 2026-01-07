import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Указываем схему и реальные поля
    const user = await pool.query(
      "SELECT user_id, user_name, email FROM tea_shop_schema.users WHERE user_id = $1",
      [decoded.user_id] // токен должен содержать user_id, а не id
    );

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
