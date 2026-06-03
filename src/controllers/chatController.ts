import { Request, Response } from "express";
import { sendMessageToOpenAI } from "../services/openAIService.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    const response = await sendMessageToOpenAI(message);
    
    return res.status(200).json({ success: true, response });
    
  } catch (error) {
    console.error("Error sending message");
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};