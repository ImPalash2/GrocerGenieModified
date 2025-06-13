import Brand from "../models/Brand.js";

const brands = [
  {
    _id: "65a7e20102e12c44f59943da",
    name: "Fresh Farms",
  },
  {
    _id: "65a7e20102e12c44f59943dd",
    name: "Fruit Fiesta",
  },
  {
    _id: "65a7e20102e12c44f59943e0",
    name: "Sunrise Produce",
  },
  {
    _id: "65a7e20102e12c44f59943e4",
    name: "Dairy Pure",
  },
  {
    _id: "65a7e20102e12c44f59943e5",
    name: "Bakery Bliss",
  },
  {
    _id: "65a7e20102e12c44f59943e6",
    name: "Frozen Delights",
  },
  {
    _id: "65a7e20102e12c44f59943e7",
    name: "Thirst Quenchers",
  },

  {
    _id: "65a7e20102e12c44f59943e9",
    name: "Snack Attack",
  },
  {
    _id: "65a7e20102e12c44f59943ec",
    name: "Seed Co.",
  },
  {
    _id: "65a7e20102e12c44f59943ed",
    name: "Spice Route",
  },
  {
    _id: "65a7e20102e12c44f59943ee",
    name: "Herbal Essence",
  },
  {
    _id: "65a7e20102e12c44f59943ef",
    name: "Baby Bites",
  },

  {
    _id: "65a7e20102e12c44f59943f4",
    name: "Canned Corner",
  },
  {
    _id: "65a7e20102e12c44f59943f5",
    name: "Quick Meals",
  },
];

export const seedBrand = async () => {
  try {
    await Brand.insertMany(brands);
    console.log("Brand seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
