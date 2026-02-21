import express from "express";

const app = express();

app.get("/api", (req, res) => {
  return res.status(200).json({ success: true, message: "All systems are working fine. "})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

