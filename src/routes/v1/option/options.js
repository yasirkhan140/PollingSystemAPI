import express from "express";
const allRouterOptions = express.Router();
// delete a option
allRouterOptions.delete("/:id/delete");
// add a vote
allRouterOptions.get("/:id/add-vote");

export default allRouterOptions;
