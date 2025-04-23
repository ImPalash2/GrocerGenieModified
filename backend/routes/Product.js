import express from "express";
import {
  create,
  getAll,
  getById,
  updateById,
  undeleteById,
  deleteById,
} from "../controllers/Product.js";
const route = express.Router();

route.post("/", create);
route.get("/", getAll);
route.get("/:id", getById);
route.patch("/:id", updateById);
route.patch("/undelete/:id", undeleteById);
route.delete("/:id", deleteById);

export default route;
