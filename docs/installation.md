# Installation

You have few options to install `git-cz` on your system.

## Install globally standalone

```shell
npm install -g git-cz
git-cz
# or
git-cz -e
```

## Install locally with Commitizen

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
  }
}
```

run:

```shell
git cz
```

## Install globally with Commitizen

```shell
npm install -g commitizen git-cz
commitizen init git-cz --save-dev --save-exact
```

run:

```shell
git cz
```
