import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import Razorpay from "razorpay";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/Auth.js";
import productRoutes from "./routes/Product.js";
import orderRoutes from "./routes/Order.js";
import cartRoutes from "./routes/Cart.js";
import brandRoutes from "./routes/Brand.js";
import categoryRoutes from "./routes/Category.js";
import userRoutes from "./routes/User.js";
import addressRoutes from "./routes/Address.js";
import reviewRoutes from "./routes/Review.js";
import wishlistRoutes from "./routes/Wishlist.js";
import connectToDB from "./database/db.js";
import PaymentRoute from "./routes/Payment.js";

// server init
const server = express();

// database connection
connectToDB();

// middlewares
server.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// routeMiddleware
server.use("/auth/", authRoutes);
server.use("/users/", userRoutes);
server.use("/products/", productRoutes);
server.use("/orders/", orderRoutes);
server.use("/cart/", cartRoutes);
server.use("/brands/", brandRoutes);
server.use("/categories/", categoryRoutes);
server.use("/address/", addressRoutes);
server.use("/reviews/", reviewRoutes);
server.use("/wishlist/", wishlistRoutes);
server.use("/payment/", PaymentRoute);

//payment rajorpay
export const instance = new Razorpay({
  key_id: process.env.keyid,
  key_secret: process.env.key_secret,
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "running" });
});

const PORT = 8080;
server.listen(PORT, (req, res) => {
  console.log(`Server started at ${PORT}`);
});
