import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appRouter from "./routes/appRoute.js"
import chatRouter from "./routes/chatRoute.js";
import subscribeRouter from "./routes/subscribeRoute.js";
import logger from "./middlewares/logger.js";
import { rateLimiter } from "./middlewares/limiter.js";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();

//middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json());
app.use(logger)

//routes
app.use("/", appRouter)
app.use("/api/chat", chatRouter)
app.use("/api/subscribe", rateLimiter, subscribeRouter)

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

startServer();