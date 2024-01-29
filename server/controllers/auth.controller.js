import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// *@desc Auth user
// route POST /app/auth/register
// @access public

export const signUp = async (req, res, next) => {
  let { userName, email, password } = req.body;
  try {
    const exisitingUser = await User.findOne({ userName, email });
    if (exisitingUser) {
      res.status(200).json({ success: "true", message: "User already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
    // rest data
    const newUser = new User({ userName, email, password });
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
  }
};
