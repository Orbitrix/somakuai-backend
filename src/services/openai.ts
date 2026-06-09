import OpenAI from "openai";
import dotenv from "dotenv";
import { appendMessages, getHistory, type Message } from "./redis.js";

dotenv.config();

const SYSTEM_PROMPT = process.env.PROMPT!;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendMessageToOpenAI = async (message: string) => {
  try {
    // 1. Fetch history from Redis
    const history = await getHistory();

    // 2. Build messages array
    const newUserMessage: Message = { role: "user", content: message };

    const messages: Message[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      newUserMessage,
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const assistantReply = response.choices[0].message.content ?? "";

    // 4. Persist new exchange to Redis
    await appendMessages([
      newUserMessage,
      { role: "assistant", content: assistantReply },
    ]);

    return assistantReply;

  } catch (error) {
    console.error("Error sending message to OpenAI:", error);
    throw error;
  }
};

