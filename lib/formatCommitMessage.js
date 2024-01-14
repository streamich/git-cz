/* eslint-disable complexity */

const wrap = require('word-wrap');

const MAX_LINE_WIDTH = 72;

const makeAffectsLine = function (answers) {
  const selectedPackages = answers.packages;

  if (selectedPackages && selectedPackages.length) {
    return `\naffects: ${selectedPackages.join(', ')}`;
  }

  return '';
};

const formatCommitMessage = (state) => {
  const {config, answers} = state;
  const wrapOptions = {
    indent: '',
    trim: true,
    width: MAX_LINE_WIDTH
  };

  const emoji = config.types[answers.type].emoji;
  const scope = answers.scope ? '(' + answers.scope.trim() + ')' : '';
  const subject = answers.subject.trim();
  const lerna = answers.lerna.trim();
  const type = answers.type;
  const format = config.format || '{type}{scope}: {emoji}{subject}';

  const affectsLine = makeAffectsLine(answers);

  // Wrap these lines at MAX_LINE_WIDTH character
  const body = wrap((answers.body || '') + affectsLine, wrapOptions);
  const breaking = wrap(answers.breaking, wrapOptions);
  const issues = wrap(answers.issues, wrapOptions);

  const valueMaps = {
    emoji: {
      reg: /\{emoji\}/g,
      value: config.disableEmoji ? '' : emoji + ' '
    },
    lerna: {
      reg: /\{lerna\}/g,
      value: lerna
    },
    scope: {
      reg: /\{scope\}/g,
      value: scope
    },
    subject: {
      reg: /\{subject\}/g,
      value: subject
    },
    type: {
      reg: /\{type\}/g,
      value: type
    }
  };

  // @note(emoji) Add space after emoji (breakingChangePrefix/closedIssueEmoji)

  let msg = format;

  for (const key in valueMaps) {
    if (valueMaps[key]) {
      const {value, reg} = valueMaps[key];
      msg = msg.replace(reg, value);
    }
  }

  if (body) {
    msg += '\n\n' + body;
  }

  if (breaking) {
    const breakingEmoji = config.disableEmoji ? '' : config.breakingChangePrefix;

    msg += '\n\nBREAKING CHANGE: ' + breakingEmoji + breaking;
  }

  if (issues) {
    const closedIssueEmoji = config.disableEmoji ? '' : config.closedIssuePrefix;

    msg += '\n\n' + closedIssueEmoji + config.closedIssueMessage + issues;
  }

  return msg;
};

module.exports = formatCommitMessage;
