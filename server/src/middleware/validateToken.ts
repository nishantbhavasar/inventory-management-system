import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        username: string;
        email: string;
        role_id: number;
      };
    }
  }
}

// JWT Validation Middleware
export const jwtValidation = (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("Authorization");
  if (!token) throw new Error("Access Denied");
  try {
    token = token.replace("Bearer ", "");
    const verified = jwt.verify(token, process.env.TOKEN_SECRET ?? '');
    if (verified) {
      setUserData(verified, req);
      next();
    } else {
      throw new Error("Invalid Token");
    }
  } catch (error) {
    next(error);
  }
};

// Set User Data in Request Object
export const setUserData = (verified: any, req: Request) => {
  req.user = verified;
};