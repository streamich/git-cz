exports.createQuestion = () => {
  const question = {
    message: 'Type the scope of the commit (where the change is made, e.g. \'Registration page\'):',
    name: 'scope',
    type: 'input'
  };

  return question;
};
