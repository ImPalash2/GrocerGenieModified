import Wishlist from "../models/Wishlist.js";

const wishlistItem = [];

export const seedWishlist = async () => {
  try {
    await Wishlist.insertMany(wishlistItem);
    console.log("Wishlist seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
