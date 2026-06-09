import rdb from "../config/redis.js";
import { Conversation } from "../models/conversation.js";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const CONVERSATION_TTL = 60 * 60; // 1 hour
const MAX_MESSAGES = 20;
const CONVERSATION_KEY = "conversation:default"; // swap for conversation:${userId} later

export const getHistory = async (): Promise<Message[]> => {
  //1. check redis first
  const cached = await rdb.get(CONVERSATION_KEY);
  if (cached) return JSON.parse(cached) as Message[];

  //2. cached missed `n fetch from DB
  const convo = await Conversation.findOne({ userId: CONVERSATION_KEY })
  if (!convo || convo.messages.length === 0) return [];

  const messages = convo.messages.map(m => ({
    role: m.role,
    content: m.content
  }))

  //3. Populate redis cache for next time
  await rdb.set(CONVERSATION_KEY, JSON.stringify(messages), "EX", CONVERSATION_TTL);

  return messages;
};

export const appendMessages = async (newMessages: Message[]): Promise<void> => {
  const history = await getHistory();
  const updated = [...history, ...newMessages].slice(-MAX_MESSAGES);

  //1. Save to Redis (fast, for ongoing messaging)
  await rdb.set(CONVERSATION_KEY, JSON.stringify(updated), "EX", CONVERSATION_TTL)

  //2. Save to MongoDB (permanent storage)
  await Conversation.findOneAndUpdate(
    { userId: CONVERSATION_KEY },
    {
      $push: { messages: { $each: newMessages } },
      updatedAt: new Date()
    },
    { upsert: true }
  );
};

export const clearHistory = async (): Promise<void> => {
  await rdb.del(CONVERSATION_KEY);
  await Conversation.findOneAndDelete({ userId: CONVERSATION_KEY })
};