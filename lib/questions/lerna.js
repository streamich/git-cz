const {getAllPackages, getChangedPackages} = require('../util/lerna');

exports.createQuestion = (state) => {
  const changedPackages = getChangedPackages(state);
  const question = {
    choices: getAllPackages(state),
    default: changedPackages,
    message: `The packages that this commit has affected (${changedPackages.length} detected)\n`,
    name: 'packages',
    type: 'checkbox'
  };

  return question;
};
