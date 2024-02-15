import express, { Request, Response } from "express";
import { ApiError, sendErrorResponse } from "../utils/ApiError";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { log } from "console";

// controller for register user.

export const RegisterUser = async function (req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (
      [firstName, lastName, email, password].some((feild) => {
        feild?.trim() === "";
      })
    ) {
      throw new ApiError(400, "All feilds required");
    }
    if (!email.includes("@")) {
      throw new ApiError(400, "Please Provide a Valid Email Address.");
    }
    if (password) {
      if (typeof password === "string") {
        if (password.length < 5) {
          throw new ApiError(400, "Password must greater than 5 characters");
        }
      }
    }

    let user = await User.findOne({
      email,
    });
    if (user) {
      // throw new ApiError(400, "User Already Exist");
      return res.status(400).json("User Already exist");
    }
    user = new User(req.body);
    await user.save();
    console.log(user);

    const createdUser: object = await User.findById(user._id).select(
      "-password"
    );

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User Created Successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

// controller for login user
export const LoginUser = async function (req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "Username and Password required");
  }
  if (password) {
    if (typeof password === "string") {
      if (password.length < 5) {
        throw new ApiError(400, "Password must greater than 5 characters");
      }
    }
  }
  console.log(password);

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new ApiError(400, "User Not Found");
    }

    console.log(user);

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Password is incorrect");
    }

    const token = Jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 8640000,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User Logged In Successfully"));
  } catch (error) {
    // throw new ApiError(500, error);
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong." });
  }
};

export const LogoutUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId);
    console.log(user);

    return res
      .status(200)
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
      })
      .json("User LoggedOut Successfully");
  } catch (error) {
    throw new ApiError(400, "Something went wrong");
  }
};
