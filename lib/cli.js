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
const executeCommand = (command, env = process.env) => {
  const proc = spawn(command, [], {
    env,
    shell: true,
    stdio: [0, 1, 2]
  });

  proc.on('close', (code) => {
    // eslint-disable-next-line no-process-exit
    process.exit(code);
  });
};

const getCommitMessageFile = () => {
  let gitDir = join(getGitRootDir(), '.git');
  const stats = fs.statSync(gitDir);

  if (stats.isFile()) {
    gitDir = fs.readFileSync('.git').toString().trim().replace(/^gitdir: /, '');
  }

  return join(gitDir, 'COMMIT_EDITMSG');
};

// eslint-disable-next-line complexity
const main = async () => {
  try {
    const {cliAnswers, cliOptions, passThroughParams} = parseArgs();

    let state = null;

    if (cliOptions.disableEmoji) {
      state = createState({disableEmoji: cliOptions.disableEmoji});
    } else {
      state = createState();
    }

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

    if (cliOptions.nonInteractive) {
      await runNonInteractiveMode(state, cliAnswers);
    } else {
      await runInteractiveQuestions(state, cliAnswers);
    }

    const message = formatCommitMessage(state);

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

    const commitMsgFile = getCommitMessageFile();

    const command = shellescape([
      'git',
      'commit',
      '--file',
      commitMsgFile,
      ...appendedArgs
    ]);

    if (cliOptions.dryRun) {
      // eslint-disable-next-line no-console
      console.log('Will execute command:');

      // The full path is replaced with a relative path to make the test pass on every machine
      // eslint-disable-next-line no-console
      console.log(command.replace(commitMsgFile, '.git/COMMIT_EDITMSG'));
      // eslint-disable-next-line no-console
      console.log('Message:');
      // eslint-disable-next-line no-console
      console.log(message);
    } else {
      fs.writeFileSync(commitMsgFile, message);

      /**
       * @author https://github.com/oxyii
       * @see https://github.com/streamich/git-cz/issues/79
       */
      if (cliOptions.hook) {
        // eslint-disable-next-line no-process-exit
        process.exit(0);
      }

      executeCommand(command);
    }
  } catch (error) {
    signale.fatal(error);
  }
};

main();
