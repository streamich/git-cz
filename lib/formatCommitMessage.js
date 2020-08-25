/* eslint-disable complexity */

const formatCommitMessage = (state) => {
  const {config, answers} = state;
  const scope = !answers.scope || answers.scope === 'none' ? '' : `(${answers.scope})`;
  const scopeEmoji = config.disableEmoji || !config.types[answers.type].emoji ? '' : `${config.types[answers.type].emoji} `;
  const body = (answers.body || '').trim();
  const breaking = (answers.breaking || '').trim();
  const issues = (answers.issues || '').trim();
  const msg = [`${answers.type}${scope}: ${scopeEmoji}${answers.subject}`];

  if (body) {
    msg.push(body);
  }

  if (Array.isArray(answers.packages) && answers.packages.length > 0) {
    msg.push(`affects: ${answers.packages.join(', ')}`);
  }

  if (breaking) {
    const breakingEmoji = config.disableEmoji ? '' : config.breakingChangePrefix;

    msg.push(`BREAKING CHANGE: ${breakingEmoji}${breaking}`);
  }

  if (issues) {
    const closedIssueEmoji = config.disableEmoji ? '' : config.closedIssuePrefix;

    msg.push(`${closedIssueEmoji}Closes: ${issues}`);
  }

  return msg;
};

module.exports = formatCommitMessage;
