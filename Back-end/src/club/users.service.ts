// userService.ts

import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
const bcrypt = require("bcrypt");

import Users, { UsersDocument } from "../models/users";
import usersRouter from "./users.router";

dotenv.config();

export const register = async (
  username: string,
  password: string
): Promise<UsersDocument> => {
  const newUser: UsersDocument = new Users({
    username: username,
    password: password,
    role: "user",
    created: new Date(),
  });

  const existingUser = await Users.findOne({ username });
  if (existingUser) {
    throw new Error("Username already exists");
  }
  newUser.password = await bcrypt.hash(newUser.password, 10);

  const createdUser = await Users.create(newUser);
  return createdUser;
};

export const login = async (username: string, password: string) => {
  const user = await Users.findOne({ username });

  if (!user) {
    throw new Error("Invalid username or password");
  }
  const isPasswordMatch = await comparePasswords(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { userId: user._id,  role: user.role, },
    String(process.env.SECRET_JWT_CODE),
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
};



async function comparePasswords(
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> {
  console.log(inputPassword, hashedPassword);
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
}

export default { login, comparePasswords, register };
