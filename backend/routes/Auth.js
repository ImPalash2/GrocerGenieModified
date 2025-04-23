import express from "express";
import {
  signup,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  checkAuth,
  logout,
} from "../controllers/Auth.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const authRoutes = express.Router();
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/verify-otp", verifyOtp);
authRoutes.post("/resend-otp", resendOtp);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);
authRoutes.get("/check-auth", verifyToken, checkAuth);
authRoutes.get("/logout", logout);

export default authRoutes;
