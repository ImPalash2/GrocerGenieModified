import Review from "../models/Review.js";

const reviews = [
  // {
  //   _id: "65c252e3dcd9253acfbaa76c",
  //   user: "65c2526fdcd9253acfbaa731",
  //   product: "1",
  //   rating: 5,
  //   comment:
  //     "Exceeded expectations! This phone is a game-changer. Lightning fast, stunning camera, incredible battery life. Best phone ever! ",
  //   createdAt: "2024-02-07T10:25:58.424Z",
  // },
];

export const seedReview = async () => {
  try {
    await Review.insertMany(reviews);
    console.log("Review seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
