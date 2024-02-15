import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const jwtVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized request - Please login your account");
  }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    const userId = (decodedToken as JwtPayload).userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.userId = userId;
    next();
  } catch (error) {
    throw new ApiError(401, "Something went wrong");
  }
};
