const {spawn} = require('child_process');
const fs = require('fs');
const {join} = require('path');
const shellescape = require('any-shell-escape');
const minimist = require('minimist');
const signale = require('signale');
const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');
const runNonInteractiveMode = require('./runNonInteractiveMode');
const formatCommitMessage = require('./formatCommitMessage');
const getGitRootDir = require('./util/getGitRootDir');

// eslint-disable-next-line no-process-env
const executeCommand = (command, args = [], env = process.env) => {
  const formattedCommand = shellescape([command, ...args]);
  const proc = spawn(formattedCommand, [], {
    env,
    shell: true,
    stdio: [0, 1, 2]
  });

  proc.on('close', (code) => {
    // eslint-disable-next-line no-process-exit
    process.exit(code);
  });
};

const main = async () => {
  try {
    const state = createState();

    const {_: args, ...params} = minimist(process.argv.slice(2));

    for (const arg of args) {
      params[arg] = true;
    }

    const {'dry-run': isDryRun, 'non-interactive': isNonInteractiveMode, hook: isHook, body, breaking, issues, lerna, scope, subject, type, ...passThroughParams} = params;
    const cliAnswers = {
      body,
      breaking,
      issues,
      lerna,
      scope,
      subject,
      type
    };

    if (isDryRun) {
      // eslint-disable-next-line no-console
      console.log('Running in dry mode.');
    }

    if (isNonInteractiveMode) {
      await runNonInteractiveMode(state, cliAnswers);
    } else {
      await runInteractiveQuestions(state, cliAnswers);
    }

    const message = formatCommitMessage(state);

    /**
     * @author https://github.com/oxyii
     * @see https://github.com/streamich/git-cz/issues/79
     */
    if (isHook) {
      const commitMsgFile = join(getGitRootDir(), '.git', 'COMMIT_EDITMSG');

      fs.writeFileSync(commitMsgFile, message);
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    }

    const appendedArgs = [];

    // eslint-disable-next-line guard-for-in
    for (const key in passThroughParams) {
      const value = params[key];

      if (key.length === 1) {
        appendedArgs.push('-' + key);
      } else {
        appendedArgs.push('--' + key);
      }

      if (value !== true) {
        appendedArgs.push(value);
      }
    }

    const executeCommandArgs = ['commit', '--message', message, ...appendedArgs];

    if (isDryRun) {
      const command = shellescape(['git', ...executeCommandArgs]);

      // eslint-disable-next-line no-console
      console.log('Will execute command:');
      // eslint-disable-next-line no-console
      console.log(command);
    } else {
      executeCommand('git', executeCommandArgs);
    }
  } catch (error) {
    signale.fatal(error);
  }
};

main();
