import express from "express";
const allRouterQuestions = express.Router();
// creata a question
allRouterQuestions.post("/create");
// delete route
allRouterQuestions.delete("/:id/delete");
// view single question
allRouterQuestions.get("/:id");
// add a option to question
allRouterQuestions.post("/:id/options/create");
export default allRouterQuestions;
