const pkg = require('../package.json');
const {runCLI, keys} = require('./testUtils');

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

  const result = await getResult();

  expect(result).toMatchSnapshot();
});

test('git-cz', async () => {
  const {getResult, write} = runCLI(['--dry-run']);

  await write([
    keys.down,
    keys.enter,
    'adding an awesome feature',
    keys.enter,
    'the feature description',
    keys.enter,
    'Some Breaking Changes',
    keys.enter,
    '#1'
  ]);

  const result = await getResult();

  expect(result).toMatchSnapshot();
});
