const getGitRootDir = require('./util/getGitRootDir');
const getConfig = require('./getConfig');

const createState = (config = {}) => {
  let root;

  try {
    root = getGitRootDir();
  } catch (error) {
    throw new Error('Could not find Git root folder.');
  }

  const state = {
    answers: {
      body: '',
      breaking: '',
      issues: '',
      lerna: '',
      scope: '',
      subject: '',
      type: ''
    },
    config: {
      ...getConfig(root),
      ...config
    },
    root
  };

  return state;
};

module.exports = createState;
