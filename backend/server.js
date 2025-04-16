// File: backend/server.js
import dotenv from "dotenv";
dotenv.config(); // 👈 this initializes the env vars

import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

// __dirname fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes
import userRoutes from "./routes/userRoutes.js";
import laptopRoutes from "./routes/laptopRoutes.js";
import theftRoutes from "./routes/theftRoutes.js";

app.use(express.json());
app.use(express.static(join(__dirname, "../frontend")));

app.use("/users", userRoutes);
app.use("/laptops", laptopRoutes);
app.use("/theft", theftRoutes);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../frontend", "index.html"));
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
