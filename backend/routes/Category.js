import express from "express";
import { getAll } from "../controllers/Category.js";
const route = express.Router();

route.get("/", getAll);

export default route;
