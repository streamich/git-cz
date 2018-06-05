const {getAllPackages, getChangedPackages, isLerna} = require('../util/lerna');

exports.createQuestion = (state) => {
  if (!isLerna(state)) {
    return null;
  }

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
