const questionsModel = require('../../models/questions.model');

function getQuestion(req, res) {
  return res.status(200).json({});
}

async function getQuestions(req, res) {
  return res.status(200).json(await questionsModel.getQuestions());
}

function createQuestion(req, res) {
  const question = req.body;
  // we need to iterate through all required properties
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

async function deleteQuestion(req, res) {
  const questionId = req.params.id;

  if (!questionId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const existsQuestion = await questionsModel.existsQuestionWithId(questionId);
  if (!existsQuestion) {
    return res.status(404).json({ error: 'Question not found' });
  }

  await questionsModel.deleteQuestionById(questionId);

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
