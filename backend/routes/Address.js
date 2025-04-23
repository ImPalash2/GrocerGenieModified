import express from "express";
import {
  create,
  getByUserId,
  updateById,
  deleteById,
} from "../controllers/Address.js";
const route = express.Router();

route.post("/", create);
route.get("/user/:id", getByUserId);
route.patch("/:id", updateById);
route.delete("/:id", deleteById);

export default route;
