const express = require("express");
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("./questions.controller");

const questionRouter = express.Router();

questionRouter.get("/", getQuestions);
questionRouter.get("/:questionId", getQuestion);
questionRouter.post("/", createQuestion);
questionRouter.put("/", updateQuestion);
questionRouter.delete("/", deleteQuestion);

module.exports = questionRouter;
