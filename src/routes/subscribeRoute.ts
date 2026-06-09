import { Router } from "express";
import { subscribeGuest } from "../controllers/subscribers.js";

const router = Router();

router.post("/", subscribeGuest)

export default router;