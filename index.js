'use strict';

const inquirer = require('inquirer');
const wrap = require('word-wrap');

inquirer.registerPrompt('limitedInput', require('./prompt/LimitedInput'));

const MAX_SUBJECT_LENGTH = 50;
const MAX_LINE_WIDTH = 72;
const MIN_SUBJECT_LENGTH = 3;
const MIN_SUBJECT_LENGTH_ERROR_MESSAGE = `The subject must have at least ${MIN_SUBJECT_LENGTH} characters`;

module.exports = {
  prompter (cz, commit) {
    return inquirer.prompt([
      {
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
        ],
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
        maxLength: MAX_SUBJECT_LENGTH,
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
    ])
      .then((answers) => {
        const wrapOptions = {
          indent: '',
          trim: true,
          width: MAX_LINE_WIDTH
        };

        const head = answers.type + ': ' + answers.subject;

        // Wrap these lines at MAX_LINE_WIDTH characters
        const body = wrap(answers.body, wrapOptions);
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
