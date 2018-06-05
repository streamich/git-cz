exports.createQuestion = () => {
  const question = {
    message: 'Provide a longer description of the change:\n ',
    name: 'body',
    type: 'input'
  };

  return question;
};
