/* eslint-disable complexity */

const makeAffectsLine = function (answers) {
  const selectedPackages = answers.packages;

  if (selectedPackages && selectedPackages.length) {
    return `\n\naffects: ${selectedPackages.join(', ')}`;
  }

  return '';
};

const formatCommitMessage = (state) => {
  const {config, answers} = state;
  let head = '';
  let scope = '';

  if (answers.scope && answers.scope !== 'none') {
    scope = `(${answers.scope})`;
  }

  if (config.disableEmoji) {
    head = answers.type + scope + ': ' + answers.subject;
  } else {
    const emoji = config.types[answers.type].emoji;
    const emojiPrefix = emoji ? emoji + ' ' : '';

    head = answers.type + scope + ': ' + emojiPrefix + answers.subject;
  }

  const body = ((answers.body || '') + makeAffectsLine(answers)).trim();
  const breaking = answers.breaking.trim();
  const issues = answers.issues.trim();

  let msg = head;

  if (body) {
    msg += '\n\n' + body;
  }

  if (breaking) {
    const breakingEmoji = config.disableEmoji ? '' : config.breakingChangePrefix;

    msg += '\n\nBREAKING CHANGE: ' + breakingEmoji + breaking;
  }

  if (issues) {
    const closedIssueEmoji = config.disableEmoji ? '' : config.closedIssuePrefix;

    msg += '\n\n' + closedIssueEmoji + 'Closes: ' + issues;
  }

  return msg;
};

module.exports = formatCommitMessage;
