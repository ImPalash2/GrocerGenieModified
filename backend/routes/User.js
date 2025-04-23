import express from "express";
import { getById, updateById } from "../controllers/User.js";
const route = express.Router();

route.get("/:id", getById);
route.patch("/:id", updateById);

export default route;
