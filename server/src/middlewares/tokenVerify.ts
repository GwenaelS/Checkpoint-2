import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../modules/user/userRepository";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export interface AuthRequest extends Request {
  user?: User;
}

export const tokenVerify: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    const secret = process.env.APP_SECRET;
    if (!secret) {
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    const tokenDecode = jwt.verify(token, secret) as {
      user_id: string;
      user_email: string;
      user_role: string;
    };

    const doesUserExist = await userRepository.readEmail(
      tokenDecode.user_email,
    );
    if (!doesUserExist) {
      res.status(401).json({ error: "Unauthorized: Invalid1 token" });
      return;
    }

    req.user = doesUserExist;
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(401).json({ error: "Unauthorized: Invalid2 token" });
    return;
  }
};
