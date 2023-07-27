import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

declare global {
    namespace Express {
      interface Request {
        user?: any; 
      }
    }
  }


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, String(process.env.SECRET_JWT_CODE), (err: any, user: any ) => {
    if (err) {
      return res.sendStatus(403);
    }
    if (!user) {
        return res.sendStatus(403);
      }
      req.user = user; 
      next();
  });
};

export default authenticateToken;