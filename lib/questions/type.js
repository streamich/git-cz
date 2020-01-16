const pad = require('pad-right');

const typeToListItem = ({types, disableEmoji}, type) => {
  const {description, emoji, value} = types[type];
  const prefix = emoji && !disableEmoji ? emoji + '  ' : '';

  return {
    name: prefix + pad(value + ':', 12, ' ') + description,
    value
  };
};

/**
 * Searches for the type that includes the given substring.
 *
 * @param {string} substring Substring to search with.
 * @param {string[]} config The whole config.
 */
const findType = function (substring, config) {
  const input = (substring || '').toLowerCase();
  let foundTypes = config.list;

  if (input !== '') {
    foundTypes = config.list.filter((type) => type.toLowerCase().includes(input));
  }

  return Promise.resolve(foundTypes.map((type) => typeToListItem(config, type)))
};

exports.createQuestion = (state) => {
  const {config} = state;
  const question = {
    message: 'Select the type of change that you\'re committing:',
    name: 'type',
    source: (_answers, input) => findType(input, config),
    type: 'autocomplete'
  };

  return question;
};
