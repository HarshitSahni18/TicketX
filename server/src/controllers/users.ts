import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../models/Users";
import sendMail from "./sendMail";
import { UserLoginData, UserSignupData } from "../types/user";
import {
  userLoginInputSchema,
  userSignupInputSchema,
} from "../validation/user";

export const handleUserSignup = async (req: Request, res: Response) => {
  const bodyData: UserSignupData = req.body;
  console.log("hello")

  const isValidInput = userSignupInputSchema.safeParse(bodyData);

  if (!isValidInput.success) {
    res.status(400).json({
      message: isValidInput.error.issues[0].message,
      error: isValidInput.error,
    });
    return;
  }

  const { name, email, password, location } = isValidInput.data;

  try {
    const user = await Users.findOne({ email });

    if (user) {
      res.status(409).json({ message: "Email address is already in use." });
      return;
    }

    if (!process.env.JWT_OTP_SECRET || !process.env.JWT_AUTH_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined.");
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);
    // await sendMail(email, OTP);

    const OTP_token = jwt.sign({ OTP: OTP }, process.env.JWT_OTP_SECRET, {
      expiresIn: "5m",
    });
    const encrypted_Pswd = await bcrypt.hash(password, 11);

    const newUser = new Users({
      name,
      email,
      password: encrypted_Pswd,
      location: location,
      OTP: OTP_token,
      OTP_Attempt: 1,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: "user" },
      process.env.JWT_AUTH_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ message: "Signed successfully", authToken: token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error during user signup" });
    console.log(err);
  }
};

export const handleUserLogin = async (req: Request, res: Response) => {
  const bodyData: UserLoginData = req.body;

  const isValidInput = userLoginInputSchema.safeParse(bodyData);

  if (!isValidInput.success) {
    res.status(400).json({
      message: isValidInput.error.issues[0].message,
      error: isValidInput.error,
    });
    return;
  }

  const { email, password } = isValidInput.data;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      res
        .status(404)
        .json({ message: `The user with the email ${email} does not exist.` });
      return;
    }

    if (user.banned) {
      res.status(403).json({ message: `User ${email} is banned.` });
      return;
    }

    const isValidPswd = await bcrypt.compare(password, user.password);

    if (!isValidPswd) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    if (!process.env.JWT_AUTH_SECRET) {
      throw new Error("JWT_AUTH_SECRET environment variable is not defined.");
    }

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_AUTH_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Logged successfully", authToken: token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error during user login" });
    console.log(err);
  }
};
