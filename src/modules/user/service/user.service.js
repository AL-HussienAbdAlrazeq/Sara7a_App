import User from "../../../Database/models/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { decrypt } from "../../../utils/security/encryption.utils.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  let users = await User.find();
  users = users.map((user) => {
    return {
      ...user._doc,
      phone: decrypt(user.phone),
    };
  });
  return res.status(200).json({ message: "Done!", users });
});
