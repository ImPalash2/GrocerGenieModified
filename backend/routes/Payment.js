import express from "express";
import {
  paymentVerification,
  processPayment,
} from "../controllers/PaymentController.js";

const PaymentRoute = express.Router();
PaymentRoute.route("/process").post(processPayment);
PaymentRoute.route("/paymentVerification").post(paymentVerification);
export default PaymentRoute;
