// Imports
const path = require('path');
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
app.use(
  express.static(
    path.join(
      __dirname,
      '..',
      '..',
      '..',
      'dist',
      'apps',
      'question-randomizer'
    )
  )
);
app.use('/questions', questionRouter);
app.use('/randomization', randomizationRouter);

app.get('/*', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '..',
      '..',
      '..',
      'dist',
      'apps',
      'question-randomizer',
      'index.html'
    )
  );
});

// Exports
module.exports = app;
