import Order from "../models/Order.js";
import fs from "fs";

const orders = [];

export const seedOrder = async () => {
  try {
    await Order.insertMany(orders);
    console.log("Order seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
