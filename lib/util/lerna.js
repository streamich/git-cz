const {execSync} = require('child_process');
const path = require('path');
const fs = require('fs');

const isLerna = (state) =>
  fs.existsSync(path.join(state.root, 'lerna.json'));

const isDir = (root) => (name) => {
  const filepath = path.join(root, name);

  try {
    const stats = fs.statSync(filepath);

    return stats.isDirectory();
  } catch (error) {
    return false;
  }
};

const getAllPackages = (state) => {
  try {
    const dir = path.join(state.root, 'packages');

    return fs.readdirSync(dir).filter(isDir(dir));
  } catch (error) {
    return [];
  }
};

const getChangedFiles = () => {
  const devNull = process.platform === 'win32' ? ' nul' : '/dev/null'
  return execSync('git diff --cached --name-only 2>' + devNull)
    .toString()
    .trim()
    .split('\n');
}

const getChangedPackages = () => {
  const unique = {};
  const changedFiles = getChangedFiles();
  const regex = /^packages\/([^/]+)\//;

  for (const filename of changedFiles) {
    const matches = filename.match(regex);

    if (matches) {
      unique[matches[1]] = 1;
    }
  }

  return Object.keys(unique);
};

module.exports = {
  getAllPackages,
  getChangedPackages,
  isLerna
};
