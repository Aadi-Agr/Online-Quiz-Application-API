const asyncHandler = require("express-async-handler");
const quizService = require("../services/quizService");

const createQuiz = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "title required" });
  const q = await quizService.createQuiz(title);
  res.status(201).json(q);
});

const listQuizzes = asyncHandler(async (req, res) => {
  const items = await quizService.listQuizzes();
  res.json(items);
});

const addQuestion = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { text, type, options, correctAnswer, maxChars } = req.body;
  if (!text || !type)
    return res.status(400).json({ message: "text and type required" });

  // validation rules:
  if (["single", "multiple"].includes(type)) {
    if (!Array.isArray(options) || options.length < 2)
      return res.status(400).json({ message: "At least 2 options required" });
    const correctCount = options.filter((o) => o.isCorrect).length;
    if (type === "single" && correctCount !== 1)
      return res
        .status(400)
        .json({ message: "single must have exactly 1 correct option" });
    if (type === "multiple" && correctCount < 1)
      return res
        .status(400)
        .json({ message: "multiple must have >=1 correct option" });
  } else if (type === "text") {
    if (correctAnswer && correctAnswer.length > (maxChars || 300))
      return res.status(400).json({ message: "correctAnswer too long" });
  }

  const payload = {
    text,
    type,
    options: options || [],
    correctAnswer: correctAnswer || null,
    maxChars: maxChars || 300,
  };
  const q = await quizService.addQuestion(quizId, payload);
  res.status(201).json(q);
});

const getQuestions = asyncHandler(async (req, res) => {
  const q = await quizService.getQuestionsForQuiz(req.params.quizId);
  res.json(q);
});

const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  if (!Array.isArray(answers))
    return res.status(400).json({ message: "answers must be an array" });
  const result = await quizService.submitQuiz(req.params.quizId, answers);
  res.json({
    score: result.score,
    total: result.total,
    details: result.details,
  });
});

module.exports = {
  createQuiz,
  listQuizzes,
  addQuestion,
  getQuestions,
  submitQuiz,
};
