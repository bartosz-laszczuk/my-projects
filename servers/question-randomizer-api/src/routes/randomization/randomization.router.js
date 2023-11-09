const express = require("express");
const {
  getRandomization,
  createRandomization,
  resetRandomization,
} = require("./randomization.controller");

const randomizationRouter = express.Router();

randomizationRouter.get("/:id", getRandomization);
randomizationRouter.post("/", createRandomization);
randomizationRouter.post("/:id/reset", resetRandomization);

module.exports = randomizationRouter;
