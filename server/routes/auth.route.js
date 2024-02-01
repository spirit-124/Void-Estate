import express from "express";
const router = express.Router();

import { signUp, signIn } from "../controllers/auth.controller.js";

// @desc Auth user
// route POST /app/v1/auth
// @access public
// ROUTES
// REGISTER || POST
router.post("/register", signUp);
router.post("/signIn", signIn);

export default router;
