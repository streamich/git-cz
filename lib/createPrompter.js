const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');
const formatCommitMessage = require('./formatCommitMessage');

// if (IS_LERNA_PROJECT) {
// const allPackages = getAllPackages().map((pkg) => pkg.name);
// const changedPackages = getChangedPackages();
//
// promptQuestions = promptQuestions.concat(createPackagesQuestion(allPackages, changedPackages));
// }

const createPrompter = () => {
  const prompter = {
    prompter (cz, commit) {
      const run = async () => {
        const state = createState();

        await runInteractiveQuestions(state);

        const message = formatCommitMessage(state);

        return commit(message);
      };

      run();
    }
  };

  return prompter;
};

module.exports = createPrompter;
