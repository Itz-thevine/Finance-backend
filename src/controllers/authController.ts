import { Request, Response } from "express";
import { getCurrentUser, loginUser, registerUser } from "../services/authServices";


export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const user = await registerUser(email, password, name);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const session = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", session });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const user = await getCurrentUser(req.headers.authorization!);
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
