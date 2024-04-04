import express from "express";
import routerV1 from "./v1/index.js";
const router = express.Router();

router.use("/api", routerV1);

export default router;
