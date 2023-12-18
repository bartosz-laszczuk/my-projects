const randomizations = require('./randomizations.mongo');
const questions = require('./questions.mongo');

async function getRandomizations() {
  return await randomizations.find({});
}

async function updateRandomization(randomization) {
  // const question = await questions.findOne({
  //   questionId: randomization.currentQuestionId,
  // });

  // if (!question) {
  //   throw new Error('No matching question found.');
  // }

  await questions.findOneAndUpdate({ question: question.question }, question, {
    upsert: true,
  });
}

module.exports = {
  getRandomizations,
  updateRandomization,
};
