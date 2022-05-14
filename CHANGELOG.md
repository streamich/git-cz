# [4.9.0](https://github.com/streamich/git-cz/compare/v4.8.1...v4.9.0) (2022-05-14)


### Bug Fixes

* 🐛 Read git-cz config from package.json ([c72cfac](https://github.com/streamich/git-cz/commit/c72cfac5e730734c409ce4e28a3fc8c4d2d7554c))


### Features

* 🎸 support cjs config files ([4f2ebc5](https://github.com/streamich/git-cz/commit/4f2ebc5c5f9986e73184bd9d30698129cd561ae7))

## [4.8.1](https://github.com/streamich/git-cz/compare/v4.8.0...v4.8.1) (2022-05-14)


### Bug Fixes

* 🐛 Fix COMMIT_EDITMSG in bare repositories ([008ee31](https://github.com/streamich/git-cz/commit/008ee3171c82563220417453b47ad520b5c2c114))

# [4.8.0](https://github.com/streamich/git-cz/compare/v4.7.6...v4.8.0) (2021-10-13)


### Bug Fixes

* 🐛 give default value to prevent convert error ([c16df5d](https://github.com/streamich/git-cz/commit/c16df5dbaa6b8452d10877ff56c018419ec76fc6)), closes [#227](https://github.com/streamich/git-cz/issues/227)
* better support for workspaces ([215b6c3](https://github.com/streamich/git-cz/commit/215b6c3e15f417512ed5f7fd5b47b29f440c85a3))


### Features

* 🎸 add "format" field to customize subject in commit msg [#81](https://github.com/streamich/git-cz/issues/81) ([5e998cf](https://github.com/streamich/git-cz/commit/5e998cf03193ab50d7c2530ee6268a2ed72ba44a))
* 🎸️ format (custom message) ([6f0c828](https://github.com/streamich/git-cz/commit/6f0c828120adac11cb1bd80282b168f35b98d0b3))

## [4.7.6](https://github.com/streamich/git-cz/compare/v4.7.5...v4.7.6) (2020-12-07)


### Bug Fixes

* 🐛 move check for git folder to top ([cdf142c](https://github.com/streamich/git-cz/commit/cdf142cb8bbdc2186c04be31a443e79a377565d8))

## [4.7.5](https://github.com/streamich/git-cz/compare/v4.7.4...v4.7.5) (2020-11-30)


### Bug Fixes

* 🐛 pad-right ([1891a62](https://github.com/streamich/git-cz/commit/1891a62641fd978c3f9b46dedfcc1123d5490fde))
* 🐛 pad-right ([94b063c](https://github.com/streamich/git-cz/commit/94b063c69cef87b3f0a5dc688a6a0c18f1daaa96))

## [4.7.4](https://github.com/streamich/git-cz/compare/v4.7.3...v4.7.4) (2020-11-18)


### Bug Fixes

* 🐛 add config option to change closed issue message ([#218](https://github.com/streamich/git-cz/issues/218)) ([dd88ce9](https://github.com/streamich/git-cz/commit/dd88ce967abed710c0fd3b784085567e5a2e0f4b)), closes [#215](https://github.com/streamich/git-cz/issues/215)

## [4.7.3](https://github.com/streamich/git-cz/compare/v4.7.2...v4.7.3) (2020-11-11)


### Bug Fixes

* 🐛 multiple lines on Windows ([#210](https://github.com/streamich/git-cz/issues/210)) ([838d47b](https://github.com/streamich/git-cz/commit/838d47b6c4fedf0d19d50ecf0e48a3afd22ba308)), closes [#188](https://github.com/streamich/git-cz/issues/188) [#197](https://github.com/streamich/git-cz/issues/197)

## [4.7.2](https://github.com/streamich/git-cz/compare/v4.7.1...v4.7.2) (2020-11-11)


### Bug Fixes

* 🐛 disable-emoji config being overwritten by default ([#211](https://github.com/streamich/git-cz/issues/211)) ([eb9eb06](https://github.com/streamich/git-cz/commit/eb9eb06004579a0f73eaa7852c22e790414e3ddb)), closes [#207](https://github.com/streamich/git-cz/issues/207)

## [4.7.1](https://github.com/streamich/git-cz/compare/v4.7.0...v4.7.1) (2020-08-26)


### Bug Fixes

* 🐛 ignore "staged files check" when -a or --amend is passed ([206274f](https://github.com/streamich/git-cz/commit/206274ff1cfab9180fa3298f8cb9408e4971feca)), closes [#189](https://github.com/streamich/git-cz/issues/189)

# [4.7.0](https://github.com/streamich/git-cz/compare/v4.6.2...v4.7.0) (2020-06-18)


### Features

* 🎸 exit process when no files staged ([9fb4844](https://github.com/streamich/git-cz/commit/9fb4844758226798444ee74e16a0df1f3d9bc25b))

## [4.6.2](https://github.com/streamich/git-cz/compare/v4.6.1...v4.6.2) (2020-05-28)


### Bug Fixes

* 🐛 check for staged files ([78dec95](https://github.com/streamich/git-cz/commit/78dec9516b56cda86727534c76cf4f20f4f008c3))
* 🐛 failing test (execSync not defined) ([b9b6969](https://github.com/streamich/git-cz/commit/b9b6969c05fe5d1dfc2687fa471190bde2a84c83))

## [4.6.1](https://github.com/streamich/git-cz/compare/v4.6.0...v4.6.1) (2020-05-27)


### Bug Fixes

* release revert of checking for staged files ([8a6ac6e](https://github.com/streamich/git-cz/commit/8a6ac6e3df1411bf910bb79360742aa34b1bc2a2))

# [4.6.0](https://github.com/streamich/git-cz/compare/v4.5.0...v4.6.0) (2020-05-25)


### Bug Fixes

* 🐛 test when in --dry-run mode ([1697c56](https://github.com/streamich/git-cz/commit/1697c561e8edc613d6087ab2ec84ab7617c0c1e5))


### Features

* 🎸 check for staged files ([c283ad3](https://github.com/streamich/git-cz/commit/c283ad3fac13eaf00a899b49da474c7608a61708))

# [4.5.0](https://github.com/streamich/git-cz/compare/v4.4.1...v4.5.0) (2020-05-16)


### Features

* 🎸 manually bump version ([fb05bfb](https://github.com/streamich/git-cz/commit/fb05bfb03ee428ef97b397873c9e88da2902212a))
* 🎸 recursively search parent folders for config file ([ce04676](https://github.com/streamich/git-cz/commit/ce0467639c56de19f0c9f227d86ef06b570f6790)), closes [#60](https://github.com/streamich/git-cz/issues/60)

## [4.4.1](https://github.com/streamich/git-cz/compare/v4.4.0...v4.4.1) (2020-05-16)


### Bug Fixes

* manually update version ([811025c](https://github.com/streamich/git-cz/commit/811025c962eab12af792c1d071438f26785266fb))

# [4.4.0](https://github.com/streamich/git-cz/compare/v4.3.1...v4.4.0) (2020-05-16)


### Features

* 🎸 add --disable-emoji to --help and parse from CLI ([82dd0c9](https://github.com/streamich/git-cz/commit/82dd0c94ba13c9694d258a9c710f7c94409fa327))
* 🎸 add disable emoji flag ([52a43d9](https://github.com/streamich/git-cz/commit/52a43d95d66a5e0d4a1e1fd92993bf11de102a35))

## [4.3.1](https://github.com/streamich/git-cz/compare/v4.3.0...v4.3.1) (2020-02-03)


### Bug Fixes

* 🐛 fix git commit error ([b116ba0](https://github.com/streamich/git-cz/commit/b116ba0ed4206a173dfb63206ddf7c058e2046ba))

# [4.3.0](https://github.com/streamich/git-cz/compare/v4.2.0...v4.3.0) (2020-02-02)


### Features

* 🎸 add help & version flags ([799fff2](https://github.com/streamich/git-cz/commit/799fff2d9da4ec04ad7ee85b01172a038020ae89))
* 🎸 improve help screen ([1838c1c](https://github.com/streamich/git-cz/commit/1838c1c5cb96d37b116234bb1ebe06721035ca46))

# [4.2.0](https://github.com/streamich/git-cz/compare/v4.1.0...v4.2.0) (2020-01-20)


### Bug Fixes

* 🐛 do not format body as undefined ([28d6e77](https://github.com/streamich/git-cz/commit/28d6e77ce7592d03c411b3f3c9cc69d1ea7c0e53))


### Features

* 🎸 Allow emojis in non-interactive and set defaults ([08cf19c](https://github.com/streamich/git-cz/commit/08cf19c36de6c34b4502435d9b12097474db5829))
* 🎸 can set answers through CLI in default mode ([99238c2](https://github.com/streamich/git-cz/commit/99238c2c1d2c6ed2f5ee209261c297ef4feed712))
* 🎸 non-interactive mode ([61b40db](https://github.com/streamich/git-cz/commit/61b40db85d668d1a7aa62588f18ba2ec15ba4667))

# [4.1.0](https://github.com/streamich/git-cz/compare/v4.0.0...v4.1.0) (2020-01-18)


### Features

* use fuzzy search for scopes and types ([e6d615f](https://github.com/streamich/git-cz/commit/e6d615f6d1c3934c3b94a0126e32b777c5d4ae8f))

# [4.0.0](https://github.com/streamich/git-cz/compare/v3.2.1...v4.0.0) (2020-01-16)


### Bug Fixes

* 🐛 Adhere to lerna settings for workspaces directory ([4151235](https://github.com/streamich/git-cz/commit/415123502b5f00e3988fc49b4643c945f91185e3)), closes [#85](https://github.com/streamich/git-cz/issues/85)
* 🐛 fixes autocomplete prompt import ([91226ba](https://github.com/streamich/git-cz/commit/91226ba829723ebd15afec52eaf53bb8cc64e210))
* 🐛 fixes scope's empty string answer issue ([53dd466](https://github.com/streamich/git-cz/commit/53dd4667be95b1f28e13a8aeb203b1a2c8762ccb))
* 🐛 make semantic-release publish to NPM ([6f5c836](https://github.com/streamich/git-cz/commit/6f5c836256bc893b3e2a7e3b141842e03a790c4e))
* 🐛 simplify semantic-release config ([3872978](https://github.com/streamich/git-cz/commit/387297890a597fd1ad2456e8948ac12fabc4bcb9))
* remove emojis when disableEmoji is true ([62915be](https://github.com/streamich/git-cz/commit/62915be714fc9628c4dba06e37c59f4212e5a532))


### Continuous Integration

* 🎡 remove NPM semantic-release plugin for on release ([a9f23eb](https://github.com/streamich/git-cz/commit/a9f23eb96e45f8dba124a674bdf1c742fe51385e))


### Features

* 🎸 adds a feature to search for types ([f8c3452](https://github.com/streamich/git-cz/commit/f8c34521228460ffa72912012585acdbb6e40286))
* 🎸 adds git hooks support ([80176cd](https://github.com/streamich/git-cz/commit/80176cd3735c6a8988335964cfb6dbbaccce4703)), closes [#79](https://github.com/streamich/git-cz/issues/79)
* 🎸 adds scope search in scopes question ([70bf18b](https://github.com/streamich/git-cz/commit/70bf18bb02881e2c566cfa8a1cb1af20d59b2af2))


### BREAKING CHANGES

* 🧨 Release new major

## [3.2.1](https://github.com/streamich/git-cz/compare/v3.2.0...v3.2.1) (2019-07-01)


### Bug Fixes

* trigger again ([ee4cf18](https://github.com/streamich/git-cz/commit/ee4cf18))
* trigger new release ([5457be9](https://github.com/streamich/git-cz/commit/5457be9))

# [3.2.0](https://github.com/streamich/git-cz/compare/v3.1.1...v3.2.0) (2019-07-01)


### Bug Fixes

* 🐛 don't add emoji to head only when "disableEmoji" is true ([45489c8](https://github.com/streamich/git-cz/commit/45489c8))


### Features

* 🎸 added disableEmojis on config ([448873e](https://github.com/streamich/git-cz/commit/448873e))

## [3.1.1](https://github.com/streamich/git-cz/compare/v3.1.0...v3.1.1) (2019-04-26)


### Bug Fixes

* build binaries on Travis ([10194a8](https://github.com/streamich/git-cz/commit/10194a8))

# [3.1.0](https://github.com/streamich/git-cz/compare/v3.0.1...v3.1.0) (2019-04-26)


### Features

* 🎸 build binaries ([0a64804](https://github.com/streamich/git-cz/commit/0a64804))
