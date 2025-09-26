const router = require("express").Router();
const ctrl = require("../controllers/quizController");

router.post("/quizzes", ctrl.createQuiz);
router.get("/quizzes", ctrl.listQuizzes);
router.post("/quizzes/:quizId/questions", ctrl.addQuestion);
router.get("/quizzes/:quizId/questions", ctrl.getQuestions);
router.post("/quizzes/:quizId/submit", ctrl.submitQuiz);

module.exports = router;
