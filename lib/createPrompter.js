const fs = require('fs');
const runInteractiveQuestions = require('./runInteractiveQuestions');


module.exports = (state) => {
  const prompter = {
    async prompter (cz, commit) {
      const answers = await runInteractiveQuestions(state);


      // if (IS_LERNA_PROJECT) {
        // const allPackages = getAllPackages().map((pkg) => pkg.name);
        // const changedPackages = getChangedPackages();
      //
        // promptQuestions = promptQuestions.concat(createPackagesQuestion(allPackages, changedPackages));
      // }

      const wrapOptions = {
        indent: '',
        trim: true,
        width: MAX_LINE_WIDTH
      };

      const emoji = config.types[answers.type].emoji;
      const emojiPrefix = emoji ? emoji + ' ' : '';
      const head = answers.type + ': ' + emojiPrefix + answers.subject;
      const affectsLine = makeAffectsLine(answers);

      // Wrap these lines at MAX_LINE_WIDTH character
      const body = wrap(answers.body + affectsLine, wrapOptions);
      const breaking = wrap(answers.breaking, wrapOptions);
      const footer = wrap(answers.footer, wrapOptions);

      let msg;

      msg = head;

      if (body) {
        msg += '\n\n' + body;
      }

      if (breaking) {
        msg += '\n\nBREAKING CHANGE: ' + breaking;
      }

      if (footer) {
        msg += '\n\nIssues: ' + footer;
      }

      return commit(msg);
    }
  };

  return prompter;
};
