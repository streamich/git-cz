const path = require('path');
const spawn = require('spawncommand');

exports.keys = {
  down: '\u001B\u005B\u0042',
  enter: '\r',
  up: '\u001B\u005B\u0041'
};

exports.runCLI = (args = []) => {
  const CLI_PATH = path.join(__dirname, '/../lib/cli');

  const {promise, stdin} = spawn('node', [
    CLI_PATH,
    ...args
  ]);

  const getResult = async () => {
    const {stdout} = await promise;

    return stdout;
  };

  const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

  const write = async (inputs = []) => {
    for (const input of inputs) {
      stdin.write(input);
      await delay();
    }

    stdin.end();
  };

  return {
    getResult,
    write
  };
};
