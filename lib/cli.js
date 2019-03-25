const {spawn} = require('child_process');
const shellescape = require('any-shell-escape');
const minimist = require('minimist');
const signale = require('signale');
const createState = require('./createState');
const runInteractiveQuestions = require('./runInteractiveQuestions');
const formatCommitMessage = require('./formatCommitMessage');

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

    const {'dry-run': isDryRun, ...passThroughParams} = params;

    if (isDryRun) {
      // eslint-disable-next-line no-console
      console.log('Running in dry mode.');
    }

    await runInteractiveQuestions(state);

    const message = formatCommitMessage(state);

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
