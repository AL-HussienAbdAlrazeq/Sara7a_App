import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { asyncHandler } from "../../../utils/error/error.js";
import User from "../../../Database/models/User.model.js";

const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, age, gender, phone } = req.body;
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    return res.status(409).json({ message: "Email Exist" });
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    phone,
  });
  return res.status(201).json({ message: "Done!", user });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!user || !isPasswordMatch) {
    return res.status(409).json({ message: "Invalid Email or Password" });
  }
  const access_token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN }
  );

  const refresh_token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN }
  );
  return res
    .status(201)
    .json({ message: "Done", data: { access_token, refresh_token } });
});

export { signup, login };
