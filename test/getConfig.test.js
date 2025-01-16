const {expect} = require('chai');
const getConfig = require('../lib/getConfig');

describe('getConfig', () => {
  it('should match config with .git-cz.json', () => {
    const actual = getConfig();
    // eslint-disable-next-line no-unused-expressions
    expect(actual.disableEmoji).to.be.true;
  });
});
