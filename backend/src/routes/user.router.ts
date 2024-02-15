import { Router } from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../controllers/user.controller";
import { jwtVerify } from "../middleware/auth.middleware";

const router = Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/logout").get(jwtVerify, LogoutUser);
export default router;
