exports.createQuestion = () => {
  const question = {
    message: 'Type the scope of the commit (where the change is made, for example Registration page):',
    name: 'scope',
    type: 'input'
  };

  return question;
};
