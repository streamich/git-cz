const {spawn} = require('child_process');
const shellescape = require('shell-escape');
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

// eslint-disable-next-line no-process-env
const appendToExecuteCommand = (prepend) => (command, args = [], env = process.env) =>
  executeCommand(command, [...args, ...prepend], env);

const main = async () => {
  try {
    const state = createState();

    await runInteractiveQuestions(state);

    const message = formatCommitMessage(state);

    const {_: args, ...params} = minimist(process.argv.slice(2));

    for (const arg of args) {
      params[arg] = true;
    }

    const appendedArgs = [];

    // eslint-disable-next-line guard-for-in
    for (const key in params) {
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

    const exec = appendToExecuteCommand(appendedArgs);

    exec('git', ['commit', '--message', message]);
  } catch (error) {
    signale.fatal(error);
  }
};

main();
