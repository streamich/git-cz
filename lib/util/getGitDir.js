const {execSync} = require('child_process');

const getGitDir = () => {
  const dir = execSync('git rev-parse --absolute-git-dir', {encoding: 'utf8'})
    .trim();

  return dir;
};

module.exports = getGitDir;
