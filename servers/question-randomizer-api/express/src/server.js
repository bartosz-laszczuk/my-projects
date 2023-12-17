// Imports
const http = require('http');

const mongoose = require('mongoose');

const app = require('./app');

const { loadQuestions } = require('./models/questions.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  'mongodb+srv://question-randomizer-api:VQ6a7tCjAudiejhP@questionrandomizerclust.2byt3oe.mongodb.net/question-randomizer?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {});
  await loadQuestions();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
