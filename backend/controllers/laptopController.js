// File: backend/controllers/laptopController.js
import pool from "../config/db.js";

export async function registerLaptop(req, res) {
  const { userId, serialNumber, model } = req.body;
  if (!userId || !serialNumber || !model)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const result = await pool.query(
      "INSERT INTO laptops (user_id, serial_number, model) VALUES ($1, $2, $3) RETURNING id",
      [userId, serialNumber, model]
    );
    res.status(201).json({ laptopId: result.rows[0].id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function trackLaptop(req, res) {
  const { serialNumber } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM laptops WHERE serial_number = $1",
      [serialNumber]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Laptop not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listLaptops(req, res) {
  try {
    const result = await pool.query("SELECT * FROM laptops ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
