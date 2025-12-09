import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import logger from "../utils/logger";
import config from "../config/config";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
    },
    profileImg: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async (password: string) => {
  if (!password) {
    logger.error("Password is required for hashing");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  if (!password) {
    throw new Error("Password is required to compare");
  }
  if (!this.password) {
    throw new Error("Password in document not found");
  }
  return await bcrypt.compare(password, this.password);
};

// @ts-ignore
userSchema.methods.generateToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.emailId,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXP_TIME } as Object
  );
};

userSchema.statics.verifyJWT = async (token) => {
  if (!token) throw new Error("Token not found to decode");

  return jwt.verify(token, config.JWT_SECRET);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
