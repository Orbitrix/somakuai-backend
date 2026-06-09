import { Router } from "express";
import { sendMessage } from "../controllers/chats.js";

const router = Router();

router.post("/", sendMessage);

export default router;