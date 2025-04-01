import { Response } from "express";
export default function sendResponse({
  res,
  statusCode,
  message,
  data,
  success,
}: {
  res: Response;
  statusCode: number;
  message: string;
  data?: any;
  success: boolean;
}) {
  return res.status(statusCode).json({
    success: success ?? (statusCode === 200 || statusCode < 300),
    message,
    data,
  });
}
