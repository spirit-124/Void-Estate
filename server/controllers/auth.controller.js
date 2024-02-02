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

export const google = async (req, res, next) => {
  try {
    const userExisted = await User.findOne({ email: req.body.email });
    if (userExisted) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        avatar: req.body.photo,
      });
      await newUser.save();
      const toke = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {}
};
