import express from "express";
import { verifyUser } from "../utils/verifyUser";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUserInfo);
export default router;
