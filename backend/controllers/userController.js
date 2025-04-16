// File: backend/controllers/
import pool from "../config/db.js";

import { hash } from "bcrypt";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  const hashedPassword = await hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashedPassword]
    );
    res.status(201).json({ userId: result.rows[0].id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
