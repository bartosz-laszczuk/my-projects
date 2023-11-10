// Imports
const express = require('express');
const cors = require('cors');
const questionRouter = require('./routes/questions/questions.router');
const randomizationRouter = require('./routes/randomization/randomization.router');

const questionsModel = require('./models/questions.model');

// Variables
const app = express();

// Middlewere
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);
app.use(express.json());
app.use('/questions', questionRouter);
app.use('/randomization', randomizationRouter);

// Exports
module.exports = app;
