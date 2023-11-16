function getRandomization(req, res) {
  return res.status(200).json({});
}

function createRandomization(req, res) {
  return res.status(200).json({});
}

function resetRandomization(req, res) {
  deleteRandomizationUsedQuestions();
  updateRandomizationStatus();
}

// function deleteRandomizationUsedQuestions(req, res) {
//     res.send('some text');
// }

// function updateRandomizationStatus(req, res) {
//     res.send('some text');
// }

module.exports = {
  getRandomization,
  createRandomization,
  resetRandomization,
};
