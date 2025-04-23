import express from "express";
const route = express.Router();
import {
  create,
  getByUserId,
  deleteById,
  updateById,
  deleteByUserId,
} from "../controllers/Cart.js";

route.post("/", create);
route.get("/user/:id", getByUserId);
route.patch("/:id", updateById);
route.delete("/:id", deleteById);
route.delete("/user/:id", deleteByUserId);

export default route;
