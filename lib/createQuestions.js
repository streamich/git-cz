/* eslint-disable import/no-dynamic-require, global-require */

const createQuestions = (state) => {
  const questions = state.config.questions.map((name) => require('./questions/' + name).createQuestion(state));

  return questions.filter(Boolean);
};

module.exports = createQuestions;
