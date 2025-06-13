import { instance } from "../index.js";
import crypto from "crypto";

export const processPayment = async (req, res) => {
  try {
    const amount = Math.round(Number(req.body.amount) * 100);
    const options = {
      amount: amount,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.keyid,
  });
};

export const paymentVerification = async (req, res) => {
  console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.key_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(200).json({
      success: false,
    });
  }
};
