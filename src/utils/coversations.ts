import rdb from "../config/redis.js";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const CONVERSATION_TTL = 60 * 60; // 1 hour
const MAX_MESSAGES = 20;
const CONVERSATION_KEY = "conversation:default"; // swap for conversation:${userId} later

export const getHistory = async (): Promise<Message[]> => {
  const data = await rdb.get(CONVERSATION_KEY);
  if (!data) return [];
  return JSON.parse(data) as Message[];
};

export const saveHistory = async (messages: Message[]): Promise<void> => {
  const trimmed = messages.slice(-MAX_MESSAGES);
  await rdb.set(CONVERSATION_KEY, JSON.stringify(trimmed), "EX", CONVERSATION_TTL);
};

export const appendMessages = async (newMessages: Message[]): Promise<void> => {
  const history = await getHistory();
  await saveHistory([...history, ...newMessages]);
};

export const clearHistory = async (): Promise<void> => {
  await rdb.del(CONVERSATION_KEY);
};