const {promisify} = require('util');
const childProcess = require('child_process');

const exec = promisify(childProcess.exec);

const branchName = async (option) => {
  const {cwd} = Object.assign({}, option);
  const {stdout} = await exec('git symbolic-ref --short HEAD', {cwd});

  return stdout.trimRight();
};

exports.createQuestion = () => {
  const question = {
    default: async () => {
      const branch = await branchName();
      const id = branch.match(/\d+$/);

      return id ? id[0] : false;
    },
    filter: (input) => `[#${input}]`,
    message: 'Pivotal tracker ID (without # and []) (it should be taken by default if you use git flow):',
    name: 'pivotalTrackerId',
    type: 'input',
    validate: (input) => {
      if (input.length === 0) {
        return 'Can not be empty';
      }
      if (!Boolean(input.match(/^\[#\d+\]$/))) {
        return 'Id should be number only';
      }

      return true;
    }
  };

  return question;
};
