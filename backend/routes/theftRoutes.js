// File: backend/routes/theftRoutes.js
import { Router } from "express";
const router = Router();
import {
  reportTheft,
  resolveReport,
  deleteReport,
  notifyPolice,
} from "../controllers/theftController.js";

router.post("/report", reportTheft);
router.put("/:id/resolve", resolveReport);
router.delete("/:id", deleteReport);
router.post("/notify-police", notifyPolice);

export default router;
