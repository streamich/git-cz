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

const parseArgs = () => {
  const {
    // eslint-disable-next-line no-unused-vars
    _: inputs,
    'dry-run': dryRun,
    hook,
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
    boolean: ['version', 'help', 'non-interactive', 'hook', 'dry-run'],
    string: ['type', 'subject', 'scope', 'body', 'breaking', 'issues', 'learna']
  });

  if (help || h) {
    console.log(helpScreen);
    process.exit();
  }

  if (version || v) {
    console.log(pkg.version);
    process.exit();
  }

  const cliOptions = {
    dryRun,
    help,
    hook,
    nonInteractive,
    version
  };

  const cliAnswers = {
    body,
    breaking,
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
