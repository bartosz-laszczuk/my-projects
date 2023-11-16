// Imports
const http = require('http');
const app = require('./app');
const { loadQuestions } = require('./models/questions.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadQuestions();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
