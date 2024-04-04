import express from "express";
import allRouterQuestions from "./questions.js";
const routerQuestion = express.Router();

routerQuestion.use("/question", allRouterQuestions);

export default routerQuestion;
