const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  // questionId: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  answerPl: { type: String, required: true },
  category: String,
  created: Date,
  isActive: { type: Boolean, required: true, default: true },
  qualificationId: String,
  userId: String,
});

// Connects questionsSchema with thw "questions" collection
module.exports = mongoose.model('Question', questionsSchema);
