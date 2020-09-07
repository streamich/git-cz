const {spawn, execSync} = require('child_process');
const fs = require('fs');
const {join} = require('path');
const shellescape = require('any-shell-escape');
const signale = require('signale');
const parseArgs = require('./parseArgs');
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
    stdio: [0, 1, 2],
  });

  proc.on('close', (code) => {
    // eslint-disable-next-line no-process-exit
    process.exit(code);
  });
};

// eslint-disable-next-line complexity
const main = async () => {
  try {
    const {cliAnswers, cliOptions, passThroughParams} = parseArgs();

    if (cliOptions.dryRun) {
      // eslint-disable-next-line no-console
      console.log('Running in dry mode.');
    } else if (
      !passThroughParams['allow-empty'] &&
      !passThroughParams.a &&
      !passThroughParams.amend
    ) {
      try {
        /**
         * @author https://github.com/rodrigograca31
         * @see https://github.com/streamich/git-cz/issues/177
         *
         * Exits with 1 if there are differences and 0 if no differences.
         */
        execSync('git diff HEAD --staged --quiet --exit-code');

        // Executes the following line only if the one above didn't crash (exit code: 0)
        signale.error('No files staged!');

        // eslint-disable-next-line no-process-exit
        process.exit(0);
      } catch (error) {
        // eslint-disable no-empty
      }
    }

    const state = createState({disableEmoji: cliOptions.disableEmoji});

    if (cliOptions.nonInteractive) {
      await runNonInteractiveMode(state, cliAnswers);
    } else {
      await runInteractiveQuestions(state, cliAnswers);
    }

    const message = formatCommitMessage(state);

    /**
     * @author https://github.com/oxyii
     * @see https://github.com/streamich/git-cz/issues/79
     */
    if (cliOptions.hook) {
      const commitMsgFile = join(getGitRootDir(), '.git', 'COMMIT_EDITMSG');

      fs.writeFileSync(commitMsgFile, message);
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    }

    const appendedArgs = [];

    // eslint-disable-next-line guard-for-in
    for (const key in passThroughParams) {
      const value = passThroughParams[key];

      if (key.length === 1) {
        appendedArgs.push('-' + key);
      } else {
        appendedArgs.push('--' + key);
      }

      if (value !== true) {
        appendedArgs.push(value);
      }
    }

    const executeCommandArgs = [
      'commit',
      '--message',
      message,
      ...appendedArgs,
    ];

    if (cliOptions.dryRun) {
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
