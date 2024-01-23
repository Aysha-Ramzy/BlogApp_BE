import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decodedToken = jwt.verify(token, "your_jwt_secret") as any;
    req.user = { id: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed", error });
  }
};
