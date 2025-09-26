const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const { isAnswerCorrect } = require("./scoring.js");

async function createQuiz(title) {
  return Quiz.create({ title });
}
async function listQuizzes() {
  return Quiz.find().sort({ createdAt: -1 }).lean();
}
async function addQuestion(quizId, payload) {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw { status: 404, message: "Quiz not found" };
  return Question.create({ quiz: quizId, ...payload });
}
async function getQuestionsForQuiz(quizId) {
  const questions = await Question.find({ quiz: quizId }).lean();
  return questions.map((q) => ({
    _id: q._id,
    text: q.text,
    type: q.type,
    maxChars: q.maxChars,
    options: (q.options || []).map((o) => ({ _id: o._id, text: o.text })),
  }));
}
async function submitQuiz(quizId, answers = []) {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw { status: 404, message: "Quiz not found" };
  const questions = await Question.find({ quiz: quizId }).lean();
  let score = 0;
  const details = [];
  for (const q of questions) {
    const qid = q._id.toString();
    const ans = (answers || []).find((a) => a.questionId === qid) || {};
    const correct = isAnswerCorrect(q, ans);
    if (correct) score++;
    details.push({ questionId: qid, correct });
  }
  return { score, total: questions.length, details };
}

module.exports = {
  createQuiz,
  listQuizzes,
  addQuestion,
  getQuestionsForQuiz,
  submitQuiz,
};
