[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# git-cz


### Without installation

```shell
npx git-cz
```


### Install globally standalone

```shell
npm install -g git-cz
git-cz
```


### Install locally with Commitizen

```shell
npm install -g commitizen
npm install --save-dev git-cz
```

`package.json`:

```json
{
  "config": {
    "commitizen": {
      "path": "git-cz"
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
npm install -g commitizen git-cz
commitizen init git-cz --save-dev --save-exact
```

run:

```shell
git cz
```


## Example

![](./docs/example.png)


## Custom config

You can provide custom configuration in `changelog.congfig.js` file
in your repo. Below is default config:

```mmd
return scripts.config();
```


## Commit Message Format

* A commit message consists of a **header**, **body** and **footer**.
* The header has a **type** and a **subject**:

```
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

### Type

Must be one of the following:

```mmd
return scripts.types();
```

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
