const mongoose = require("mongoose");
const OptionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
  },
  { _id: true }
);

const QuestionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  text: { type: String, required: true },
  type: { type: String, enum: ["single", "multiple", "text"], required: true },
  options: [OptionSchema],
  correctAnswer: { type: String, default: null }, // for text auto-scoring
  maxChars: { type: Number, default: 300 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", QuestionSchema);
