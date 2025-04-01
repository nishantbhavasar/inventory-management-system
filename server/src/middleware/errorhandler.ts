import { Request, Response, NextFunction } from "express";

// Global Error Handler
export const errroHandler = (
  error: {
    status: number;
    message: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.status || 500).json({
    success: false,
    statusCode: error.status ?? 500,
    message: error.message ?? "Internal Server Error",
    data: null,
  });
};

// 404 Api Not Found Error Handler
export const handle404 = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    statusCode: 404,
    message: "Route Not Found",
    success: false,
    data: null,
  });
};
