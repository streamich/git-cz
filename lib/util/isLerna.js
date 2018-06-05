const path = require('path');
const fs = require('fs');

const isLerna = (state) =>
  fs.existsSync(path.join(state.root, 'lerna.json'));

module.exports = isLerna;
