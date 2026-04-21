import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Somaku AI Server. All systems are live!!!"
  })
})

export default router;