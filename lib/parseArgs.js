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
            -h, --help         show usage information
            -v, --version      print version info and exit
            --non-interactive [non-interactive cli params] run git-cz non-interactive mode
        
        non-interactive cli params:
            --type
            --subject
            --scope
            --body
            --breaking
            --issues
            --lerna
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
