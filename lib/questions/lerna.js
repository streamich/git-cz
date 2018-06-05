exports.createQuestion = (state) => {
  const question = {
    choices: allPackages,
    default: changedPackages,
    message: `The packages that this commit has affected (${changedPackages.length} detected)\n`,
    name: 'packages',
    type: 'checkbox'
  };

  return question;
};
