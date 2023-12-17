const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const questions = require('./questions.mongo');

function loadQuestions() {
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    'data',
    '20231109_questions.csv'
  );
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, delimiter: ';', relax_quotes: true }))
      .on('data', async (data) => {
        saveQuestion(data);
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', async () => {
        const countQuestionsFound = (await getQuestions()).length;
        console.log('Found questions:', countQuestionsFound);
        resolve();
      });
  });
}

function existsQuestionWithId(questionId) {
  // check if the question exists in array
  return true;
}

async function getQuestions() {
  return await questions.find({});
}

function createQuestion(question) {
  questions.push(question);
}

function deleteQuestion(questionId) {
  // delete question from array
}

async function saveQuestion(question) {
  try {
    await questions.updateOne(
      { question: question.Question },
      {
        question: question.Question,
        answer: question.Answer,
        answerPl: question.AnswerPl,
        category: question.Type,
        qualification: question.qualification,
        isActive: question.IsActive,
      },
      { upsert: true }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  getQuestions,
  loadQuestions,
  createQuestion,
  existsQuestionWithId,
};
