const inquirer = require('inquirer');
const AutocompletePrompt = require('inquirer-list-search-prompt');
const LimitedInputPrompt = require('./LimitedInputPrompt');
const createQuestions = require('./createQuestions');

inquirer.registerPrompt('limitedInput', LimitedInputPrompt);
inquirer.registerPrompt('autocomplete', AutocompletePrompt);

// if (IS_LERNA_PROJECT) {
// const allPackages = getAllPackages().map((pkg) => pkg.name);
// const changedPackages = getChangedPackages();
//
// promptQuestions = promptQuestions.concat(createPackagesQuestion(allPackages, changedPackages));
// }

const runInteractiveQuestions = async (state, cliAnswers) => {
  Object.keys(cliAnswers).forEach((key) => {
    state.answers[key] = cliAnswers[key];
  });

  const questions = createQuestions(state, cliAnswers);
  const answers = await inquirer.prompt(questions);

  Object.keys(state.answers).forEach((key) => {
    if (answers[key]) {
      state.answers[key] = answers[key];
    }
  });

  return answers;
};

module.exports = runInteractiveQuestions;
