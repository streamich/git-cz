const inquirer = require('inquirer');
const LimitedInputPrompt = require('./LimitedInputPrompt');
const createQuestions = require('./createQuestions');

inquirer.registerPrompt('limitedInput', LimitedInputPrompt);

// if (IS_LERNA_PROJECT) {
// const allPackages = getAllPackages().map((pkg) => pkg.name);
// const changedPackages = getChangedPackages();
//
// promptQuestions = promptQuestions.concat(createPackagesQuestion(allPackages, changedPackages));
// }

const runInteractiveQuestions = async (state) => {
  const questions = createQuestions(state);
  const answers = await inquirer.prompt(questions);

  return answers;
};

module.exports = runInteractiveQuestions;
