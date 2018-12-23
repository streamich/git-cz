const chalk = require('chalk');

exports.createQuestion = () => {
  const question = {
    message: `List any breaking changes (which affect backwards compatibility)\n  ${chalk.red('BREAKING CHANGE')}:`,
    name: 'breaking',
    type: 'input'
  };

  return question;
};
