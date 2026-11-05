# Better than Predator

[![Test](https://github.com/linssen/better_than_predator/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/linssen/better_than_predator/actions/workflows/test.yml)

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/linssen/better_than_predator
cd better_than_predator
nvm install
npm install --global corepack@0.36.0
corepack enable
yarn install
```

The repository pins Node.js 26.13.0 in `.nvmrc` and Yarn 4.18.1 in
`package.json`. Corepack selects the pinned Yarn version.

Create `.env.local` in the project root and set your TMDB API key:

```sh
VITE_API_KEY=your_tmdb_api_key
```

Vite embeds `VITE_` variables in the browser bundle. Do not put a private or
restricted credential in this variable.

## Development

Start the local development server:

```sh
yarn dev
```

Build and preview the production site:

```sh
yarn build
yarn preview
```

Run the test suite once or in watch mode:

```sh
yarn test
yarn test:watch
```

Check translation catalogs for missing keys or source-copy changes:

```sh
yarn check:translations
```

The check extracts UI translation keys and English defaults from the source.
When English copy changes, the parser preserves the previous translations in
`_old` catalogs and resets the affected entries to English; update those
translations before the check passes.

The GitHub Pages workflow builds `dist/` and publishes it to the existing
`www.betterthanpredator.com` domain. Configure the repository's
`REACT_APP_API_KEY` Actions secret with the TMDB API key; the workflow supplies
it to Vite as `VITE_API_KEY`.

![predator](https://f.cloud.github.com/assets/67624/415163/75afa1ae-ac2c-11e2-8a16-cab25bf1a58e.png)
