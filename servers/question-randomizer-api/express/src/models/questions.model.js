const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

questions = [];

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
      .on('data', (data) => {
        questions.push(data);
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        console.log('Found questions:', questions.length);
        resolve();
      });
  });
}

function existsQuestionWithId(questionId) {
  // check if the question exists in array
  return true;
}

function getQuestions() {
  return questions;
}

function createQuestion(question) {
  questions.push(question);
}

function deleteQuestion(questionId) {
  // delete question from array
}

module.exports = {
  getQuestions,
  loadQuestions,
  createQuestion,
  existsQuestionWithId,
};
