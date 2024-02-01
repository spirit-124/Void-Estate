import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// *@desc Auth user
// route POST /app/auth/register
// @access public

export const signUp = async (req, res, next) => {
  let { username, email, password } = req.body;
  try {
    const exisitingUser = await User.findOne({ username, email });
    if (exisitingUser) {
      res.status(200).json({ success: "true", message: "User already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
    // rest data
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// *@desc Auth user
// route POST /app/auth/login
// @access public
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // checked for validUser
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid password!!"));

    // after validation
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
