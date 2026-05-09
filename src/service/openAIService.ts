import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const SYSTEM_PROMPT = process.env.PROMPT!;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sendMessageToOpenAI = async (message: string) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("Error sending message to OpenAI:", error);
    throw error;
  }
};

