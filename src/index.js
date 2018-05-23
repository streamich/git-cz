const fs = require('fs');
const inquirer = require('inquirer');
const wrap = require('word-wrap');
const appRoot = require('app-root-path');
const {
  makePackagesQuestion,
  questions
} = require('./prompt/questions');
const LimitedInput = require('./prompt/LimitedInput');
const {
  getAllPackages,
  getChangedPackages
} = require('./lernaUtils');

const MAX_LINE_WIDTH = 72;

inquirer.registerPrompt('limitedInput', LimitedInput);

const IS_LERNA_PROJECT = fs.existsSync(appRoot.resolve('lerna.json'));

const makeAffectsLine = function (answers) {
  const selectedPackages = answers.packages;

  if (selectedPackages && selectedPackages.length) {
    return `\naffects: ${selectedPackages.join(', ')}`;
  }

  return '';
};

const emojis = {
  style: '💄'
};

module.exports = {
  prompter (cz, commit) {
    let promptQuestions = questions;

    if (IS_LERNA_PROJECT) {
      const allPackages = getAllPackages().map((pkg) => pkg.name);
      const changedPackages = getChangedPackages();

      promptQuestions = promptQuestions.concat(makePackagesQuestion(allPackages, changedPackages));
    }

    return inquirer.prompt(promptQuestions)
      .then((answers) => {
        const wrapOptions = {
          indent: '',
          trim: true,
          width: MAX_LINE_WIDTH
        };

        const emojiPrefix = emojis[answers.type] ? emojis[answers.type] + ' ' : '';
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
      });
  }
};
