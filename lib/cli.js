const signale = require('signale');
const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');

const main = async () => {
  try {
    const state = createState();
    const answers = await runInteractiveQuestions(state);

    console.log(answers);
  } catch (error) {
    signale.fatal(error);
  }
};

main();
