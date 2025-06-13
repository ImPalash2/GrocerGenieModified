import Category from "../models/Category.js";

const categories = [
  { _id: "65a7e24602e12c44f599442c", name: "Fruits" },
  { _id: "65a7e24602e12c44f599442d", name: "Vegetables" },
  { _id: "65a7e24602e12c44f599442e", name: "Dairy" },
  { _id: "65a7e24602e12c44f599442f", name: "Bakery" },
  { _id: "65a7e24602e12c44f5994430", name: "Frozen Foods" },
  { _id: "65a7e24602e12c44f5994434", name: "Snacks" },
  { _id: "65a7e24602e12c44f5994435", name: "Canned Goods" },
  { _id: "65a7e24602e12c44f5994437", name: "Pasta & Rice" },
  { _id: "65a7e24602e12c44f5994438", name: "Breakfast Foods" },
  { _id: "65a7e24602e12c44f5994439", name: "Baby Products" },
  { _id: "65a7e24602e12c44f599443a", name: "Pet Food" },
  { _id: "65a7e24602e12c44f599443d", name: "Nuts & Seeds" },
  { _id: "65a7e24602e12c44f5994442", name: "Tea & Coffee" },
];
export const seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Category seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
