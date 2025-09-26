function toStr(id) {
  return id == null ? id : id.toString();
}
function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function isAnswerCorrect(question, answer) {
  if (!question) return false;
  const type = question.type;
  if (type === "single") {
    const correct = (question.options || [])
      .filter((o) => o.isCorrect)
      .map((o) => toStr(o._id));
    if (correct.length !== 1) return false;
    const sel = (answer.selectedOptionIds || []).map(toStr);
    return sel.length === 1 && sel[0] === correct[0];
  }
  if (type === "multiple") {
    const correct = (question.options || [])
      .filter((o) => o.isCorrect)
      .map((o) => toStr(o._id));
    if (correct.length < 1) return false;
    const selSet = new Set((answer.selectedOptionIds || []).map(toStr));
    return setsEqual(selSet, new Set(correct));
  }
  if (type === "text") {
    if (!question.correctAnswer) return false; // not auto-gradable
    const provided = (answer.textAnswer || "").trim().toLowerCase();
    const expected = (question.correctAnswer || "").trim().toLowerCase();
    return provided.length > 0 && provided === expected;
  }
  return false;
}

module.exports = { isAnswerCorrect };
