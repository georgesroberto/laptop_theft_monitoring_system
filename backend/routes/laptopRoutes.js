// File: backend/routes/laptopRoutes.js
import { Router } from "express";
const router = Router();
import {
  registerLaptop,
  trackLaptop,
  listLaptops,
} from "../controllers/laptopController.js";

router.post("/register", registerLaptop);
router.get("/track/:serialNumber", trackLaptop);
router.get("/", listLaptops);

export default router;
