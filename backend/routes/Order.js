import express from "express";
import {
  create,
  getAll,
  getByUserId,
  updateById,
} from "../controllers/Order.js";
const route = express.Router();

route.post("/", create);
route.get("/", getAll);
route.get("/user/:id", getByUserId);
route.patch("/:id", updateById);

export default route;
