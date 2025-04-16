// File: backend/controllers/theftController.js
import pool from "../config/db.js";

export async function reportTheft(req, res) {
  const { laptopId, location } = req.body;
  if (!laptopId || !location)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const result = await pool.query(
      "INSERT INTO theft_reports (laptop_id, location) VALUES ($1, $2) RETURNING id",
      [laptopId, location]
    );
    res.status(201).json({ reportId: result.rows[0].id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function resolveReport(req, res) {
  const { id } = req.params;
  try {
    await pool.query("UPDATE theft_reports SET status = $1 WHERE id = $2", [
      "resolved",
      id,
    ]);
    res.json({ message: `Report #${id} marked as resolved.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteReport(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM theft_reports WHERE id = $1", [id]);
    res.json({ message: `Report #${id} deleted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export function notifyPolice(req, res) {
  const { reportId } = req.body;
  if (!reportId)
    return res.status(400).json({ error: "Report ID is required" });
  res.json({ message: `Police notified for report ID: ${reportId}` });
}
