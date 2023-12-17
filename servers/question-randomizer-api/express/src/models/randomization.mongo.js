const mongoose = require('mongoose');

const randomizationSchema = new mongoose.Schema({
  //   randomizationId: String,
  currentQuestionId: String,
  currentQuestionId: String,
  isAnswerHidden: { type: Boolean, required: true, default: true },
  status: { type: Number, required: true },
  created: { type: Date, required: true },
  updated: Date,
  userId: { type: String, required: true },
});

// Connects questionsSchema with thw "randomizations" collection
module.exports = mongoose.model('Randomization', randomizationSchema);
