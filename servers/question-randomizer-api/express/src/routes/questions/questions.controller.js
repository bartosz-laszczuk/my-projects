const questionsModel = require('../../models/questions.model');

function getQuestion(req, res) {
  return res.status(200).json({});
}

function getQuestions(req, res) {
  return res.status(200).json(questionsModel.getQuestions());
}

function createQuestion(req, res) {
  const question = req.body;

  if (!question.answer) {
    return res
      .status(400)
      .json({ error: 'Missing required question property' });
  }

  questionsModel.createQuestion(question);

  return res.status(201).json(question);
}

function createQuestions(req, res) {
  return res.status(200).json({});
}

function updateQuestion(req, res) {
  return res.status(200).json({});
}

function deleteQuestion(req, res) {
  const questionId = req.params.id;

  if (questionsModel.existsQuestionWithId(questionId)) {
    return res.status(404).json({ error: 'Question not found' });
  }

  deleteQuestion(questionId);

  return res.status(200).json({});
}

module.exports = {
  getQuestion,
  getQuestions,
  createQuestion,
  createQuestions,
  updateQuestion,
  deleteQuestion,
};
