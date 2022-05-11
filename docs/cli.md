# CLI flags

Find every flags attached to `git-cz`

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

Aside from the configuration file, you can disable emojis by passing this flag: `--disable-emoji`

For example:

```bash
git-cz --disable-emoji
```

Note that the flag is overrided by the configuration file.

## Hook

You can use `git-cz` with git hooks or `Husky` hooks.

GIT hook:

```bash
#!/bin/bash
exec < /dev/tty && node_modules/.bin/cz --hook || true
```

Husky hook:

`package.json`:

```json
"husky": {
  "hooks": {
    "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true"
  }
}
```

## Divers

- help => `-h` or `--help`
- version => `-v` or `--version`
