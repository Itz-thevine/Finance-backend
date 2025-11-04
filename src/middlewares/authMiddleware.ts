import { Request, Response, NextFunction } from "express";
import { Client, Account } from "appwrite";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!);

    const account = new Account(client);
    client.setJWT(token);

    const user = await account.get();

    // attach to request
    (req as any).user = user;
    (req as any).jwt = token;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
