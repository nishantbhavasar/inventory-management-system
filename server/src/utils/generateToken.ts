import jwt from "jsonwebtoken";

// Generate Access Token
export const generateAccessToken = (payload: {
  id: number;
  name: string;
  email: string;
  role_id: number;
}) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: "30d",
  });
};
