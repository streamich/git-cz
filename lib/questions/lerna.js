const {getAllPackages, getChangedPackages, isLerna} = require('../util/lerna');

exports.createQuestion = (state) => {
  if (!isLerna(state)) {
    return null;
  }

  const changedPackages = getChangedPackages(state);
  const allPackages = getAllPackages(state);

  const question = {
    choices: allPackages,
    default: changedPackages,
    message: `The packages that this commit has affected (${changedPackages.length} detected)\n`,
    name: 'lerna',
    type: 'checkbox'
  };

  return question;
};
