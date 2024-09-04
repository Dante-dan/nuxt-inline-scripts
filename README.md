<picture>
 <img alt="nuxt-inline-scripts" src="./logo.svg">
</picture>

# nuxt-inline-scripts

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> Replace Nuxt3 Inline Script by Script Link

## Install

```bash
npm install nuxt-inline-scripts -S

# pnpm
pnpm add nuxt-inline-scripts -S
```

## Usage

```ts

// nuxt.config.ts
{
    // @ts-ignore
    inlineScripts: {
        disable: true,
    },
    modules: ['nuxt-inline-scripts']
}

```

## API

### inlineScripts

#### disable

Type: `boolean`


[build-img]:https://github.com/Dante-dan/nuxt-inline-scripts/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/Dante-dan/nuxt-inline-scripts/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/nuxt-inline-scripts
[downloads-url]:https://www.npmtrends.com/nuxt-inline-scripts
[npm-img]:https://img.shields.io/npm/v/nuxt-inline-scripts
[npm-url]:https://www.npmjs.com/package/nuxt-inline-scripts
[issues-img]:https://img.shields.io/github/issues/Dante-dan/nuxt-inline-scripts
[issues-url]:https://github.com/Dante-dan/nuxt-inline-scripts/issues
[codecov-img]:https://codecov.io/gh/Dante-dan/nuxt-inline-scripts/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/Dante-dan/nuxt-inline-scripts
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/

