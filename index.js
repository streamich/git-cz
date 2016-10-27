'use strict';

const wrap = require('word-wrap');
const inquirer = require('inquirer');
inquirer.registerPrompt('limitedInput', require('./prompt/LimitedInput'));

const MAX_SUBJECT_LENGTH = 50;
const MAX_LINE_WIDTH = 72;
const MIN_SUBJECT_LENGTH = 3;
const MIN_SUBJECT_LENGTH_ERROR_MESSAGE = `The subject must have at least ${MIN_SUBJECT_LENGTH} characters`;

module.exports = {
  prompter: (cz, commit) => {
    inquirer.prompt([
      {
      type: 'list',
      name: 'type',
      message: 'Select the type of change that you\'re committing:',
      choices: [
        {
        name: 'feat:     A new feature',
        value: 'feat'
        },
        {
        name: 'fix:      A bug fix',
        value: 'fix'
        },
        {
        name: 'docs:     Documentation only changes',
        value: 'docs'
        },
        {
        name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
        value: 'style'
        },
        {
        name: 'refactor: A code change that neither fixes a bug or adds a feature',
        value: 'refactor'
        },
        {
        name: 'perf:     A code change that improves performance',
        value: 'perf'
        },
        {
        name: 'test:     Adding missing tests',
        value: 'test'
        },
        {
        name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
        value: 'chore'
        }
        ]
      },
      {
        type: 'limitedInput',
        name: 'subject',
        maxLength: MAX_SUBJECT_LENGTH,
        filter: (input) => {
          const subject = input.trim();
          return subject.endsWith('.') ? subject.substr(0, subject.length - 1).trim() : subject;
        },
        validate: (input) => input.length >= MIN_SUBJECT_LENGTH || MIN_SUBJECT_LENGTH_ERROR_MESSAGE,
        leadingLabel: (answers) => `${answers.type}:`,
        message: 'Write a short, imperative mood description of the change:'
      },
      {
        type: 'input',
        name: 'body',
        message: 'Provide a longer description of the change:\n'
      },
      {
        type: 'input',
        name: 'breaking',
        message: 'List any breaking changes:\n BREAKING CHANGE:'
      },
      {
        type: 'input',
        name: 'footer',
        message: 'Reference any task that this commit closes:\n Issues:'
      }
    ])
    .then((answers) => {
      const wrapOptions = {
        trim: true,
        indent: '',
        width: MAX_LINE_WIDTH
      };

      const head = answers.type + ': ' + answers.subject;

      // Wrap these lines at MAX_LINE_WIDTH characters
      const body = wrap(answers.body, wrapOptions);
      const breaking = wrap(answers.breaking, wrapOptions);
      const footer = wrap(answers.footer, wrapOptions);

      let msg = head;

      if (body) {
        msg += '\n\n' + body;
      }

      if (breaking) {
        msg += '\n\n' + 'BREAKING CHANGE: ' + breaking;
      }

      if (footer) {
        msg += '\n\n' + 'Issues: ' + footer;
      }

      commit(msg);
    });
  }
}
