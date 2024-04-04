import express from "express";
import {
  addOptionToQuestion,
  createQuestion,
  delelteQuestion,
  getAllQuestions,
  getQuestionById,
} from "../../../controller/api/v1/question.controller.js";
const allRouterQuestions = express.Router();
// creata a question
allRouterQuestions.post("/create", createQuestion);
// delete route
allRouterQuestions.delete("/:id/delete", delelteQuestion);
// view single question
allRouterQuestions.get("/:id", getQuestionById);
// add a option to question
allRouterQuestions.post("/:id/options/create", addOptionToQuestion);
allRouterQuestions.get("/", getAllQuestions);
export default allRouterQuestions;
