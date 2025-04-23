import express from "express";

const route = express.Router();
import { getAll } from "../controllers/Brand.js";

route.get("/", getAll);

export default route;
