/* eslint-disable import/no-dynamic-require, global-require */
const qBody = require('./questions/body');
const qBreaking = require('./questions/breaking');
const qIssues = require('./questions/issues');
const qLerna = require('./questions/lerna');
const qScope = require('./questions/scope');
const qSubject = require('./questions/subject');
const qType = require('./questions/type');

const creators = {
  body: qBody,
  breaking: qBreaking,
  issues: qIssues,
  lerna: qLerna,
  scope: qScope,
  subject: qSubject,
  type: qType
};

const createQuestions = (state, cliAnswers) => {
  const questions = state.config.questions
    .filter((name) => cliAnswers[name] === undefined)
    .map((name) => {
      const question = name.createQuestion ? name.createQuestion(state):creators[name].createQuestion(state);

      if (state.config.messages && state.config.messages[name]) {
        question.message = state.config.messages[name];
      }

      return question;
    });

  return questions.filter(Boolean);
};

module.exports = createQuestions;
