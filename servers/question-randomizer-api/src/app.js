// Imports
const express = require("express");
const questionRouter = require("./routes/questions/questions.router");
const randomizationRouter = require("./routes/randomization/randomization.router");

// Variables
const app = express();

// Middlewere
app.use(express.json());
app.use("/question", questionRouter);
app.use("/randomization", randomizationRouter);

// Exports
module.exports = app;
