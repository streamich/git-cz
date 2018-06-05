[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# mol-conventional-changelog

## Setup

Install commitizen

```shell
npm install -g commitizen
```

Install the `mol-conventional-changelog` package.

```shell
npm install --save-dev mol-conventional-changelog
```

Init commitizen configuration

```shell
commitizen init mol-conventional-changelog --save-dev --save-exact
```

## Usage

```
git cz
```

## Examples

```
feat: 🎸 add 'graphiteWidth' option
```

```
fix: 🐞 stop graphite breaking when width < 0.1
```

```
perf: ⚡️ remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reason.

Issues: MOL-1234
```


## Custom config

You can provide custom configuration in `changelog.congfig.js` file
in your repo. See [default configuration file](./src/defaults.js) for reference.


## Commit Message Format

* A commit message consists of a **header**, **body** and **footer**.
* The header has a **type** and a **subject**:

```
{{type}}: {{subject}}
<BLANK LINE>
{{body}}
<BLANK LINE>
{{breaking changes}}
<BLANK LINE>
{{footer}}
```

The **header** is the only mandatory part of the commit message.

The first line (type + subject) is limited to 50 characters **[enforced]**

Any other line should be limited to 72 character **[automatic wrapping]**

This allows the message to be easier to read on GitHub as well as in various git tools.

### Type

Must be one of the following:

* `feat`: A new feature.
* `fix`: A bug fix.
* `docs`: Documentation only changes.
* `style`: Markup-only changes (white-space, formatting, missing semi-colons, etc).
* `refactor`: A code change that neither fixes a bug or adds a feature.
* `perf`: A code change that improves performance.
* `test`: Adding or updating tests.
* `chore`: Build process or auxiliary tool changes.
* `ci`: CI related changes.

### Subject

The subject contains succinct description of the change:

* Use the imperative, present tense: "change" not "changed" nor "changes"
* No dot (.) at the end.

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Affects [only on [lerna](https://lernajs.io/) environments]

Select the packages the commit affected.

### Breaking Changes

**Breaking Changes** must start with the words `BREAKING CHANGE: `.

### Footer

The footer is the place to reference any tasks related to this commit.



## Why this Fork?

```
npm i -g git-cz
added 1 package in 0.612s
```

Installs in 0.6s vs 31.1s.

```
npm i -g mol-conventional-changelog
added 345 packages in 31.076s
```
