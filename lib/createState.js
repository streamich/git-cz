const getGitRootDir = require('./util/getGitRootDir');
const getConfig = require('./getConfig');

const createState = (config = {}) => {
  let root;

  const showBreakingChangeQuestion = config.showBreakingChangeQuestion;
  delete config.showBreakingChangeQuestion;

  try {
    root = getGitRootDir();
  } catch (error) {
    throw new Error('Could not find Git root folder.');
  }

  const userConfig = getConfig(root);
  const missingBreakingChangeQuestion = !userConfig.questions.includes('breaking');

  if (showBreakingChangeQuestion && missingBreakingChangeQuestion) {
    userConfig.questions.push('breaking');
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
      ...userConfig,
      ...config
    },
    root
  };

  return state;
};

module.exports = createState;
