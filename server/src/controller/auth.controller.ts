import Users from "@/db/models/users.model";
import { Optional, Op } from "sequelize";
import { LoginAttribute, UserAttribute } from "../types/UserTypes";
import { comparePassword, hashPassword } from "@/utils/hashPassword";
import { generateAccessToken } from "@/utils/generateToken";
import { ResponseType } from "@/types/ResponseType";

export class AuthController {
  async register(body: Optional<UserAttribute, "id">): Promise<ResponseType> {
    try {
      // Check If User Already Exists
      const userExists = await Users.findOne({ where: { email: body.email } });

      if (userExists) {
        return {
          message: "User Already Exists With Given Email",
          success: false,
          data: null,
          statusCode: 409,
        };
      }

      // Create Hashed Password
      const hashedPassword = await hashPassword(body?.password);

      // Create New User
      const user = await Users.create({
        name:body?.name,
        email: body?.email,
        password: hashedPassword,
        role_id: body.role_id,
      });

      if (!user) {
        return {
          message: "User Registration Failed",
          success: false,
          data: null,
          statusCode: 500,
        };
      }

      // Generate Access Token with 30 days expiry
      const access_token = generateAccessToken({
        id: user.id,
        email: user.email,
        role_id: user.role_id,
        name: user.name,
      });

      return {
        message: "User Register Successfully",
        success: true,
        data: { user_id: user.id, access_token },
        statusCode: 201,
      };
    } catch (error) {
      // @ts-ignore
      throw new Error(error?.message);
    }
  }

  //===================================== LOGIN API =================================================
  /**
   * @summary Login User And Get Access Token
   */
  async login(body: LoginAttribute): Promise<ResponseType> {
    try {
      // Find User By Username Or Email
      const user = await Users.findOne({
        where: { email: body?.email, is_active: true },
      });

      // Check If User Not Found
      if (!user) {
        return {
          message: "User Not Found",
          success: false,
          data: null,
          statusCode: 404,
        };
      }

      // Check Password Match Or Not
      const validatePassword = await comparePassword({
        password: body.password,
        hashedPassword: user.password,
      });

      if (!validatePassword) {
        return {
          message: "Invalid Password",
          success: false,
          data: null,
          statusCode: 401,
        };
      }

      // Generate Access Token
      const access_token = generateAccessToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
      });
      if (!access_token) {
        return {
          message: "Token Generation Failed",
          success: false,
          data: null,
          statusCode: 500,
        };
      }
      // Remove Private Data
      delete user.dataValues.password;

      return {
        message: "User Login Successfully",
        success: true,
        data: {
          access_token,
          user,
        },
        statusCode: 200,
      };
    } catch (error) {
      // @ts-ignore
      throw new Error(error.message);
    }
  }
}
