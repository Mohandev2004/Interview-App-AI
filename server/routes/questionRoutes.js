const express = require('express');
const { togglePinQuestion, updateQuestionNote, addQuestionsToSession } = require("../controllers/questionController");
const { protect } = require("../middlewares/authMiddleware");

const route = express.Router();

route.post("/add", protect, addQuestionsToSession);
route.post("/:id/pin", protect, togglePinQuestion);
route.post("/:id/note", protect, updateQuestionNote);

module.exports = route;