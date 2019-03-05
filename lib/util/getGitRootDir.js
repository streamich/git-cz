const {execSync} = require('child_process');

const getGitRootDir = () => {
  const devNull = process.platform === 'win32' ? ' nul' : '/dev/null'
  const dir = execSync('git rev-parse --show-toplevel 2>' + devNull)
    .toString()
    .trim();

  return dir;
};

module.exports = getGitRootDir;
