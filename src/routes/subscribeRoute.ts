import { Router } from "express";
import { subscribeGuest } from "../controllers/subscribeController.js";

const router = Router();

router.post("/", subscribeGuest)

export default router;