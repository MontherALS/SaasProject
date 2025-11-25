import { Request, Response } from "express";
import User from "../model/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "console";
dotenv.config();

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const newUser = {
      email: email,
      password: password,
    };

    const user = new User(newUser);
    console.log(user);
    await user.save();

    res.status(201).json({ error: "User Created!", user: user });
  } catch (err) {
    if (err instanceof Error) {
      console.log(
        `error happened while saving the user signup: ${err.message}`
      );
      return res.status(404).json({ error: "Server Error", err: err.message });
    } else {
      console.log("Something happened when trying to save user signup", err);
      return res.status(404).json({ error: "Server Error" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "no user registered with this email" });
    }
    console.log(user.password);
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "email or password is not correct" });
    }
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in .env");

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token: token });
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happened while login:", err.message);
      return res.status(404).json({ error: "Server Error", err: err.message });
    }
  }
};
