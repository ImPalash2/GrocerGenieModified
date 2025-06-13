import Cart from "../models/Cart.js";

const cartItems = [];

export const seedCart = async () => {
  try {
    await Cart.insertMany(cartItems);
    console.log("Cart seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
