const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');
const formatCommitMessage = require('./formatCommitMessage');

exports.prompter = (cz, commit) => {
  const run = async () => {
    const state = createState();

    await runInteractiveQuestions(state);

    const message = formatCommitMessage(state);

    return commit(message);
  };

  run();
};
