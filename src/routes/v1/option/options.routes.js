import express from "express";
import {
  addVote,
  deleteOption,
} from "../../../controller/api/v1/option.contoller.js";
const allRouterOptions = express.Router();
// delete a option
allRouterOptions.delete("/:id/delete", deleteOption);
// add a vote
allRouterOptions.get("/:id/add-vote", addVote);

export default allRouterOptions;
