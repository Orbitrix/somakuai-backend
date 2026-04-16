import express from "express";
import cors from "cors";
import chatRouter from "./routes/chatRoute.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
app.use(express.json());

app.get("/api", (req, res) => {
  return res.status(200).json({ success: true, message: "All systems are working fine. "})
})

app.use("/api/chat", chatRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})