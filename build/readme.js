const defaults = require('../lib/defaults');

exports.types = () => {
  let str = '';

  for (const type of defaults.list) {
    str += `- \`${type}\` &mdash; ${defaults.types[type].description}\n`;
  }

  return str;
};

exports.config = () =>
  `\`\`\`js
module.exports = ${JSON.stringify(defaults, null, 2)};
\`\`\``;
