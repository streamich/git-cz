const meow = require('meow');

const cliOptionFlags = {
  dryRun: {
    type: 'boolean'
  },
  help: {
    alias: 'h',
    type: 'boolean'
  },
  hook: {
    type: 'boolean'
  },
  nonInteractive: {
    type: 'boolean'
  },
  version: {
    alias: 'v',
    type: 'boolean'
  }
};

const cliAnswerFlags = {
  body: {
    type: 'string'
  },
  breaking: {
    type: 'string'
  },
  issues: {
    type: 'string'
  },
  lerna: {
    type: 'string'
  },
  scope: {
    type: 'string'
  },
  subject: {
    type: 'string'
  },
  type: {
    type: 'string'
  }
};

const options = {
  flags: {
    ...cliOptionFlags,
    ...cliAnswerFlags
  },
  help: `
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
    `
};

const parseArgs = () => {
  const {flags} = meow(options);

  const {
    dryRun,
    hook,
    nonInteractive,
    body,
    breaking,
    issues,
    lerna,
    scope,
    subject,
    type,
    help,
    version,
    ...cliOtherParams
  } = flags;

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
    cliOtherParams
  };
};

module.exports = parseArgs;
