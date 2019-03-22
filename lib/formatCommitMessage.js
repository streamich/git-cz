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
  const emojiPrefix = emoji ? emoji + ' ' : '';

  let scope = '';

  if (answers.scope && answers.scope !== 'none') {
    scope = `(${answers.scope})`;
  }

  const head = answers.type + scope + ': ' + emojiPrefix + answers.subject;
  const affectsLine = makeAffectsLine(answers);

  // Wrap these lines at MAX_LINE_WIDTH character
  const body = wrap(answers.body + affectsLine, wrapOptions);
  const breaking = wrap(answers.breaking, wrapOptions);
  const issues = wrap(answers.issues, wrapOptions);

  let msg = head;

  if (body) {
    msg += '\n\n' + body;
  }

  if (breaking) {
    msg += '\n\nBREAKING CHANGE: ' + config.breakingChangePrefix + breaking;
  }

  if (issues) {
    msg += '\n\n' + config.closedIssuePrefix + 'Closes: ' + issues;
  }

  return msg;
};

module.exports = formatCommitMessage;
