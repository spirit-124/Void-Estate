import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Login Successfully",
  });
});

export default router;
