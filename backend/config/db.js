// File: backend/config/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS),
  port: process.env.DB_PORT,
});

pool
  .query("SELECT current_database()")
  .then((res) =>
    console.log("✅ Connected to DB:", res.rows[0].current_database)
  )
  .catch((err) => console.error("❌ DB connection error:", err.message));

export default pool;
