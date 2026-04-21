import express from "express";
import cors from "cors";
import appRouter from "./routes/appRoute.js"
import chatRouter from "./routes/chatRoute.js";
import { logger } from "./middlewares/logger.js";

const app = express();

//middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json());
app.use(logger)


//routes
app.use("/", appRouter)
app.use("/api/chat", chatRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})