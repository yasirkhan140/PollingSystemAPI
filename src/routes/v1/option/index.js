import express from "express";
import allRouterOptions from "./options.routes.js";
const routerOptions = express.Router();

routerOptions.use("/option", allRouterOptions);

export default routerOptions;
