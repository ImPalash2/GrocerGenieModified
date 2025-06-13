import Address from "../models/Address.js";

const addresses = [
  // {
  //   _id: "65c26398e1e1a2106ac8fbd5",
  //   user: "65b8e564ea5ce114184ccb96",
  //   street: "main 11th",
  //   city: "Indrapuram",
  //   state: "Uttar Pradesh",
  //   phoneNumber: "9452571272",
  //   postalCode: "201012",
  //   country: "India",
  //   type: "Home",
  //   __v: 0,
  // },
];

export const seedAddress = async () => {
  try {
    await Address.insertMany(addresses);
    console.log("Address seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
