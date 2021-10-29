[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# git-cz

![image](https://user-images.githubusercontent.com/9773803/49760520-fa6c6f00-fcc4-11e8-84c4-80727f071487.png)

## Installation

All installation options are listed in this file: [installation](./docs/installation.md)  
If you wish to use `git-cz`, you can use the following steps:

```shell
npx git-cz
# or
npx git-cz -e
```

## Configuration

Configuration details can be found in this file: [configuration](./docs/configuration.md)

## Non-interactive mode

Using `--non-interactive` flag you can run `git-cz` non-interactive mode.

For example:

```bash
git-cz --non-interactive --type=feat --subject="add onClick prop to component"
```

CLI parameters:

- `--type`
- `--subject`
- `--scope`
- `--body`
- `--breaking`
- `--issues`
- `--lerna`

## Disable Emoji

Using `--disable-emoji` flag will disable emoji.

For example:

```bash
git-cz --disable-emoji
```

## Commit message format

- A commit message consists of a **header**, **body** and **footer**.
- The header has a **type** and a **subject**:

```bash
<type>[(<scope>)]: <emoji> <subject>
[BLANK LINE]
[body]
[BLANK LINE]
[breaking changes]
[BLANK LINE]
[footer]
```

The **header** is the only mandatory part of the commit message.

The first line (type + subject) is limited to 50 characters **[enforced]**

Any other line should be limited to 72 character **[automatic wrapping]**

This allows the message to be easier to read on GitHub as well as in various git tools.

### Format

By default the subject format is: `{type}{scope}: {subject}`

Configuring the `format` field in `.git-cz.json` you can customize your own:

- `{type}{scope}: {emoji}{subject}`
- `{emoji}{scope} {subject}`

### Type

Must be one of the following:

- `test` &mdash; Adding missing tests
- `feat` &mdash; A new feature
- `fix` &mdash; A bug fix
- `chore` &mdash; Build process or auxiliary tool changes
- `docs` &mdash; Documentation only changes
- `refactor` &mdash; A code change that neither fixes a bug or adds a feature
- `style` &mdash; Markup, white-space, formatting, missing semi-colons...
- `ci` &mdash; CI related changes
- `perf` &mdash; A code change that improves performance

### Subject

The subject contains succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- No dot (.) at the end.

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Affects [only on [lerna](https://lernajs.io/) environments]

Select the packages the commit affected.

### Breaking Changes

**Breaking Changes** must start with the words  
`BREAKING CHANGE: `.

### Footer

The footer is the place to reference any tasks related to this commit.

## Why this Fork?

```bash
npm i -g git-cz
added 1 package in 0.612s
```

Installs in 0.6s vs 31.1s.

```bash
npm i -g mol-conventional-changelog
added 345 packages in 31.076s
```
