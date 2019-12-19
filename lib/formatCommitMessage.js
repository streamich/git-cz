const wrap = require('word-wrap');

const MAX_LINE_WIDTH = 72;

const makeAffectsLine = function (answers) {
  const selectedPackages = answers.packages;

  if (selectedPackages && selectedPackages.length) {
    return `\naffects: ${selectedPackages.join(', ')}`;
  }

  return '';
};

const formatTemplate = function (template, replacements) {
  const patterns = replacements.reduce((acc, replacement) => {
    if (acc === '') {
      return replacement.pattern;
    }

    return acc + '|' + replacement.pattern;
  }, '');

  return template.replace(new RegExp('<((?:(?!<|>).*?))>', 'g'), (match, tag) =>
      tag.replace(new RegExp(`(.*)(${patterns})(.*)`), (matchTag, prefix, type, suffix) => {
        const currentPattern = replacements.find((obj) => obj.pattern === type);

        if (!currentPattern) {
          throw new Error(`missing template property: ${type}`);
        }

        if (currentPattern.replacement === '' || currentPattern.replacement === currentPattern.antiPattern) {
          return '';
        }

        return `${prefix}${currentPattern.replacement}${suffix}`;
      })
  );
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

  const affectsLine = makeAffectsLine(answers);

  // Wrap these lines at MAX_LINE_WIDTH character
  const body = wrap(answers.body + affectsLine, wrapOptions);
  const breaking = wrap(answers.breaking, wrapOptions);
  const issues = wrap(answers.issues, wrapOptions);

  const head = formatTemplate(config.commitMessageFormat, [
    {
      pattern: 'type',
      replacement: answers.type
    },
    {
      antiPattern: 'none',
      pattern: 'scope',
      replacement: answers.scope
    },
    {
      pattern: 'emoji',
      replacement: emojiPrefix
    },
    {
      pattern: 'subject',
      replacement: answers.subject
    }
  ]);

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
