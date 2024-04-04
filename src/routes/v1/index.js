import express from "express";
import routerOptions from "./option/index.js";
import routerQuestion from "./question/index.js";
const routerV1 = express.Router();

routerV1.use("/v1", routerOptions);
routerV1.use("/v1", routerQuestion);

export default routerV1;
