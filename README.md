[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# mol-conventional-changelog


## Setup

Install commitizen version 2.8.2

```
npm install -g commitizen@2.8.2
```

Install the `mol-conventional-changelog` package.

```
npm install --save-dev mol-conventional-changelog
```

Init commitizen configuration

```
commitizen init mol-conventional-changelog --save-dev --save-exact
```

## Usage

```
git cz
```

#### Examples

```
feat: add 'graphiteWidth' option
```

```
fix: stop graphite breaking when width < 0.1
```

```
perf: remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reason.

Issues: MOL-1234
```

### Commit Message Format

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
* `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
* `refactor`: A code change that neither fixes a bug or adds a feature.
* `perf`: A code change that improves performance.
* `test`: Adding or updating tests.
* `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation and linters.

### Subject

The subject contains succinct description of the change:

* Use the imperative, present tense: "change" not "changed" nor "changes"
* No dot (.) at the end.

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Breaking Changes

**Breaking Changes** must start with the words `BREAKING CHANGE: `.

### Footer

The footer is the place to reference any tasks related to this commit.
