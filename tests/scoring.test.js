const { isAnswerCorrect } = require("../src/services/scoring");

test("single correct", () => {
  const q = {
    type: "single",
    options: [
      { _id: "a", isCorrect: false },
      { _id: "b", isCorrect: true },
    ],
  };
  expect(isAnswerCorrect(q, { selectedOptionIds: ["b"] })).toBe(true);
  expect(isAnswerCorrect(q, { selectedOptionIds: ["a"] })).toBe(false);
});

test("multiple exact match", () => {
  const q = {
    type: "multiple",
    options: [
      { _id: "o1", isCorrect: true },
      { _id: "o2", isCorrect: true },
      { _id: "o3", isCorrect: false },
    ],
  };
  expect(isAnswerCorrect(q, { selectedOptionIds: ["o1", "o2"] })).toBe(true);
  expect(isAnswerCorrect(q, { selectedOptionIds: ["o1"] })).toBe(false);
});

test("text auto-graded", () => {
  const q = { type: "text", correctAnswer: "Hello" };
  expect(isAnswerCorrect(q, { textAnswer: "hello" })).toBe(true);
  expect(isAnswerCorrect(q, { textAnswer: "no" })).toBe(false);
});
