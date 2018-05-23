const pad = require('pad-right');
const defaults = require('../defaults');

const MAX_SUBJECT_LENGTH = defaults.maxMessageLength;
const MIN_SUBJECT_LENGTH = defaults.minMessageLength;
const MIN_SUBJECT_LENGTH_ERROR_MESSAGE = `The subject must have at least ${MIN_SUBJECT_LENGTH} characters`;

const typeToListItem = ({description, emoji, value}) => ({
  name: (emoji || '❔') + '  ' + pad(value + ':', 12, ' ') + description,
  value
});

const questions = [
  {
    choices: defaults.list.map((type) => typeToListItem(defaults.types[type])),
    message: 'Select the type of change that you\'re committing:',
    name: 'type',
    type: 'list'
  },
  {
    filter: (input) => {
      let subject;

      subject = input.trim();
      while (subject.endsWith('.')) {
        subject = subject.substr(0, subject.length - 1).trim();
      }

      return subject;
    },
    leadingLabel: (answers) => `${answers.type}:`,

    // Minus 3 chars are for emoji + space.
    maxLength: MAX_SUBJECT_LENGTH - 3,
    message: 'Write a short, imperative mood description of the change:',
    name: 'subject',
    type: 'limitedInput',
    validate: (input) => input.length >= MIN_SUBJECT_LENGTH || MIN_SUBJECT_LENGTH_ERROR_MESSAGE
  },
  {
    message: 'Provide a longer description of the change:\n',
    name: 'body',
    type: 'input'
  },
  {
    message: 'List any breaking changes:\n BREAKING CHANGE:',
    name: 'breaking',
    type: 'input'
  },
  {
    message: 'Reference any task that this commit closes:\n Issues:',
    name: 'footer',
    type: 'input'
  }
];

const makePackagesQuestion = (allPackages, changedPackages) => ({
  choices: allPackages,
  default: changedPackages,
  message: `The packages that this commit has affected (${changedPackages.length} detected)\n`,
  name: 'packages',
  type: 'checkbox'
});

module.exports = {
  makePackagesQuestion,
  questions
};
