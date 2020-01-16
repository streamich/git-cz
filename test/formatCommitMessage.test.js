/* eslint-disable sort-keys */
const {expect} = require('chai');
const formatCommitMessage = require('../lib/formatCommitMessage');

const defaultConfig = {
  disableEmoji: false,
  breakingChangePrefix: '🧨 ',
  closedIssuePrefix: '✅ ',
  commitMessageFormat: '<type><(scope)>: <emoji><subject>',
  list: [
    'test',
    'feat',
    'fix',
    'chore',
    'docs',
    'refactor',
    'style',
    'ci',
    'perf'
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    'type',
    'scope',
    'subject',
    'body',
    'breaking',
    'issues',
    'lerna'
  ],
  scopes: [],
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore'
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci'
    },
    docs: {
      description: 'Documentation only changes',
      emoji: '✏️',
      value: 'docs'
    },
    feat: {
      description: 'A new feature',
      emoji: '🎸',
      value: 'feat'
    },
    fix: {
      description: 'A bug fix',
      emoji: '🐛',
      value: 'fix'
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '⚡️',
      value: 'perf'
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '💡',
      value: 'refactor'
    },
    release: {
      description: 'Create a release commit',
      emoji: '🏹',
      value: 'release'
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '💄',
      value: 'style'
    },
    test: {
      description: 'Adding missing tests',
      emoji: '💍',
      value: 'test'
    }
  }
};

const defaultState = {
  answers: {
    body: '',
    breaking: '',
    issues: '',
    lerna: '',
    scope: '',
    subject: 'First commit',
    type: 'feat'
  },
  config: defaultConfig,
  root: '/Users/vad/dev/git-cz'
};

describe('formatCommitMessage()', () => {
  it('formats correctly a basic message ("feat" type, emoji, and message)', () => {
    const message = formatCommitMessage({...defaultState});

    expect(message).to.equal('feat: 🎸 First commit');
  });

  it('does not include emoji, if emojis disabled in config', () => {
    const message = formatCommitMessage({
      ...defaultState,
      config: {
        ...defaultConfig,
        disableEmoji: true
      }
    });

    expect(message).to.equal('feat: First commit');
  });
});
