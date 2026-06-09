import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  file: { type: String }
})

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  files: [FileSchema],
  createdAt: { type: Date, default: Date.now() }
})

const ConversationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  messages: [MessageSchema],
  updatedAt: { type: Date, default: Date.now() }
})

export const Conversation = mongoose.model('Conversation', ConversationSchema);