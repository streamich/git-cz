const createPrompter = require('./createPrompter');
const getConfig = require('./getConfig');

module.exports = createPrompter(getConfig());
