const signale = require('signale');
const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');
const formatCommitMessage = require('./formatCommitMessage');

const main = async () => {
  try {
    const state = createState();
    const answers = await runInteractiveQuestions(state);
    const message = formatCommitMessage(state);

    console.log(message);
    console.log(answers);
  } catch (error) {
    signale.fatal(error);
  }
};

main();
