import User from "../models/user.model";
import { errorHandler } from "../utils/error";
import bcryptjs from "bcryptjs";

export const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Unauthorized"));
  try {
    if (req.body.password) {
      req.body.password = req.body.password = bcryptjs.hashSync(
        req.body.password,
        10
      );
    }
    const updateUser = await User.findByIdandUpdate(req.params.id);
  } catch (error) {
    next(error);
  }
};
