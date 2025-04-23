import express from "express";
import {
  create,
  getByProductId,
  updateById,
  deleteById,
} from "../controllers/Review.js";
const route = express.Router();

route.post("/", create);
route.get("/product/:id", getByProductId);
route.patch("/:id", updateById);
route.delete("/:id", deleteById);

export default route;
