const pkg = require('../package.json');
const {runCLI} = require('./testUtils');

test('git-cz --help', async () => {
  const {getResult} = runCLI(['--help']);

  const result = await getResult();

  expect(result).toMatchSnapshot();
});

test('git-cz --version', async () => {
  const {getResult} = runCLI(['--version']);

  const result = await getResult();

  expect(result.trim()).toBe(pkg.version);
});

test('git-cz --non-interactive', async () => {
  const {getResult} = runCLI(['--non-interactive', '--dry-run']);

  const quote = process.platform === 'win32' ? '"' : '\'';
  const result = await getResult();

  expect(result).toBe(`\
Running in dry mode.
Will execute command:
git commit --file ${quote}.git/COMMIT_EDITMSG${quote}
Message:
chore: 🤖 automated commit
`);
});
