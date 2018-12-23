# commit-prompt

> A fork of [`git-cz`](https://github.com/streamich/git-cz). 

1) Allows scope as free text
2) Adds **Pivotal Tracker ID** question. It tries to get the ticket id from git branch first (if you use git flow, your branch should be feature/#id), if not found, asks user to input, and wrap it in `[#id]` format, as required by Pivotal Tracker Gitlab integration.

Base principles refrences:

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)
- [GitMoji](https://gitmoji.carloscuesta.me/)

### Without installation

```shell
npx commit-prompt
```

### Install globally standalone

```shell
npm install -g commit-prompt
commit-prompt
```

### Install locally with Commitizen

```shell
npm install -g commitizen
npm install --save-dev commit-prompt
```

`package.json`:

```json
{
  "config": {
    "commitizen": {
      "path": "commit-prompt"
    }
  },
}
```

run:

```shell
git cz
```

### Install globally with Commitizen

```shell
npm install -g commitizen commit-prompt
commitizen init commit-prompt --save-dev --save-exact
```

run:

```shell
git cz
```


## Custom config

You can provide custom configuration in `commit-prompt.congfig.js` (or `.commitpromptrc`, `.commit-prompt.js`, `.commit-prompt.json`) file
in your repo. Below is default config:

```mmd
return scripts.config();
```


## Commit Message Format

* A commit message consists of a **header**, **body** and **footer**.
* The header has a **type** and a **subject**:

```
<type>[(<scope>)]: <emoji> <pivotalTrackerId> <subject>
[BLANK LINE]
[body]
[BLANK LINE]
[breaking changes]
[BLANK LINE]
[footer]
```

The **header** is the only mandatory part of the commit message.

The first line (type + pivotalTrackerId + subject) is limited to 50 characters **[enforced]**

Any other line should be limited to 72 character **[automatic wrapping]**

This allows the message to be easier to read on GitHub as well as in various git tools.

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
npm i -g commit-prompt
added 1 package in 0.612s
```

Installs in 0.6s vs 31.1s.

```
npm i -g mol-conventional-changelog
added 345 packages in 31.076s
```

