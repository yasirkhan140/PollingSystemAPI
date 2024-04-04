import { Option } from "../../../models/option.model.js";
import { Question } from "../../../models/question.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

// create a question
const createQuestion = asyncHandler(async (req, res) => {
  // if any parameter is not come
  if (!req.body || !req.body.title) {
    throw new ApiError(400, "title parameter are reqired");
  }
  const { title } = req.body;
  //   check feild are come or not then show a error
  if (title.trim() === "") {
    throw new ApiError(400, "title feild are required", [title]);
  }
  //   create a question
  const question = await Question.create({
    title,
  });
  //   check and fetched created question
  const createQuestion = await Question.findById(question._id);
  //   if created show a 201 response with data else show a error of internal server
  if (createQuestion) {
    return res
      .status(201)
      .json(
        new ApiResponse(200, createQuestion, "Question created successfully")
      );
  } else {
    throw new ApiError(500, "Internal server error");
  }
});
// get a question by id
const getQuestionById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const question = await Question.findById(id).populate({
    path: "options",
  });
  if (!question) {
    throw new ApiError(400, "Question are not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, question, "Question get successfully"));
});

// add a option to question
const addOptionToQuestion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!req.body || !req.body.text) {
    throw new ApiError(400, "text feild are required");
  }
  const { text } = req.body;
  const option = await Option.create({
    text,
    question: id,
  });
  const voteUrl =
    req.headers.host + "/api/v1/option/" + option._id + "/add-vote";
  console.log(voteUrl);
  const optionUpdated = await Option.findByIdAndUpdate(option._id, {
    $set: {
      link_to_votes: voteUrl,
    },
  });
  //   if option is not cretate
  if (!option) {
    throw new ApiError(500, "Some error in creating option");
  }
  //   update the question
  const question = await Question.findByIdAndUpdate(id, {
    $push: {
      options: optionUpdated,
    },
  }).populate({
    path: "options",
  });
  //   if question not get or nor update
  if (!question) {
    throw new ApiError(500, "question does not exists");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, question, "Option added sucessfully"));
});

// delete the question
const delelteQuestion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const question = await Question.findById(id).populate({
    path: "options",
  });
  //   if question is not found
  if (!question) {
    throw new ApiError(400, "Question does not exits");
  }
  const options = question.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].votes > 0) {
      throw new ApiError(400, "Question cannot delete votes extis");
    }
  }
  //   delete all options and question
  await Question.findByIdAndDelete(id);
  await Option.deleteMany({ question: id });

  return res
    .status(200)
    .json(new ApiResponse(200, question, "question delete successfully"));
});
// get all questions
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({}).populate({ path: "options" });
  if (!questions) {
    throw new ApiError(500, "question does not get ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Question get successfully"));
});
export {
  createQuestion,
  getQuestionById,
  addOptionToQuestion,
  delelteQuestion,
  getAllQuestions,
};
