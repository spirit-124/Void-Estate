import express from "express";
const router = express.Router();

import { signUp } from "../controllers/auth.controller.js";

router.post("/register", signUp);

export default router;
