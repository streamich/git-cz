/* eslint-disable no-process-exit */
/* eslint-disable no-console */
/* eslint-disable id-length */
const minimist = require('minimist');
const pkg = require('../package.json');

const helpScreen = `
    ${pkg.description}

    Usage: git-cz [options]

    options:
        -h, --help          show usage information
        -v, --version       print version info and exit
        --disable-emoji     don't add emoji to commit title
        --format            custom formatting options for subject
        --non-interactive   run git-cz in non-interactive mode

    non-interactive mode options:
        --type              type of the commit, defaults to "chore"
        --subject           message of the commit, defaults to "automated commit"
        --scope             semantic commit scope
        --body              extended description of the commit
        --breaking          description of breaking changes, if any
        --issues            GitHub issues this commit closed, e.g "#123"
        --lerna             Lerna mono-repo packages this commit affects
`;

/** If the value is empty the flag is true and the answer is undefined,
 *  in any other case the flag is false and the answer is the value.
 *
 * @param {string} value
 * @returns {[boolean, string]}
 * */
const flagAndAnswerValues = (value) => {
  const isFlagActive = value === '';

  return [isFlagActive, isFlagActive ? undefined : value];
};

const parseArgs = () => {
  const {
    // eslint-disable-next-line no-unused-vars
    _: inputs,
    'dry-run': dryRun,
    hook,
    'disable-emoji': disableEmoji,
    format,
    'non-interactive': nonInteractive,
    body,
    breaking,
    issues,
    lerna,
    scope,
    subject,
    type,
    help,
    h,
    version,
    v,
    ...passThroughParams
  } = minimist(process.argv.slice(2), {
    alias: {
      h: 'help',
      v: 'version'
    },
    boolean: [
      'version',
      'help',
      'disable-emoji',
      'non-interactive',
      'hook',
      'dry-run'
    ],
    string: [
      'format',
      'type',
      'subject',
      'scope',
      'body',
      'breaking',
      'issues',
      'learna'
    ]
  });

  if (help || h) {
    console.log(helpScreen);
    process.exit();
  }

  if (version || v) {
    console.log(pkg.version);
    process.exit();
  }

  const [breakingChangeFlag, breakingChangeValue] = flagAndAnswerValues(breaking);

  const cliOptions = {
    breaking: breakingChangeFlag,
    disableEmoji,
    dryRun,
    format,
    help,
    hook,
    nonInteractive,
    version
  };

  const cliAnswers = {
    body,
    breaking: breakingChangeValue,
    issues,
    lerna,
    scope,
    subject,
    type
  };

  return {
    cliAnswers,
    cliOptions,
    passThroughParams
  };
};

module.exports = parseArgs;
