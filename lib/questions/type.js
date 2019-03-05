const pad = require('pad-right');

const typeToListItem = ({description, emoji, value}) => {
  const prefix = emoji ? emoji + '  ' : '';

  return {
    name: prefix + pad(value + ':', 12, ' ') + description,
    value
  }
};

exports.createQuestion = (state) => {
  const {config} = state;
  const question = {
    choices: config.list.map((type) => typeToListItem(config.types[type])),
    message: 'Select the type of change that you\'re committing:',
    name: 'type',
    type: 'list'
  };

  return question;
};
