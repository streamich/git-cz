/* eslint-disable sort-keys */
const {expect} = require('chai');
const formatCommitMessage = require('../lib/formatCommitMessage');

const defaultConfig = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  breakingChangePrefix: '🧨 ',
  closedIssuePrefix: '✅ ',
  closedIssueMessage: 'Closes: ',
  commitMessageFormat: '<type><(scope)>: <emoji><subject>',
  list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
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
    lerna: 'git-cz',
    scope: '',
    subject: 'First commit',
    type: 'feat'
  },
  config: defaultConfig,
  root: '/Users/vad/dev/git-cz'
};

describe('formatCommitMessage()', () => {
  it('does not include emoji, if emojis disabled in config (no scope)', () => {
    const message = formatCommitMessage({
      ...defaultState,
      config: {
        ...defaultConfig,
        disableEmoji: true
      }
    });

    expect(message).equal('feat: First commit');
  });

  it('does not include emoji, if emojis disabled in config (with scope)', () => {
    const message = formatCommitMessage({
      ...defaultState,
      answers: {
        ...defaultState.answers,
        scope: 'init'
      },
      config: {
        ...defaultConfig,
        disableEmoji: true
      }
    });

    expect(message).equal('feat(init): First commit');
  });

  it('does not include emoji, if emojis disabled in config (custom)', () => {
    const message = formatCommitMessage({
      ...defaultState,
      answers: {
        ...defaultState.answers,
        scope: 'init'
      },
      config: {
        ...defaultConfig,
        format: '{subject} :{scope}{type}',
        disableEmoji: true
      }
    });

    expect(message).equal('First commit :(init)feat');
  });

  it('does not include emoji, if emojis disabled in config (dynamic custom)', () => {
    const isDynamic = true;
    const message = formatCommitMessage({
      ...defaultState,
      answers: {
        ...defaultState.answers,
        scope: 'init'
      },
      config: {
        ...defaultConfig,
        format: `{subject} :{scope}{type}${isDynamic && ' [skip ci]'}`,
        disableEmoji: true
      }
    });

    expect(message).equal('First commit :(init)feat [skip ci]');
  });

  it('does not include emoji, format within lerna config', () => {
    defaultState.answers.scope = 'Lerna';
    const message = formatCommitMessage({
      ...defaultState,
      config: {
        ...defaultConfig,
        format: '【{lerna}】{type}{scope}: {emoji}{subject}',
        disableEmoji: true
      }
    });

    expect(message).equal('【git-cz】feat(Lerna): First commit');
  });
});
