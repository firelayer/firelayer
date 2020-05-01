<p align="center">
  <a href="https://firelayer.io/">
    <img src="https://user-images.githubusercontent.com/3942799/78354991-d7925800-75a4-11ea-9185-c558cf601e25.png" alt="Firelayer" height="180" />
  </a>
</p>

<p align="center">Jump-start your Firebase Web Project</p>

<br/>

<p align="center">
  <a href="https://github.com/firelayer/firelayer/actions?query=workflow%3Aci">
    <img src="https://github.com/firelayer/firelayer/workflows/ci/badge.svg?branch=master" alt="Build Status on Github" />
  </a>
  <a href="https://npmjs.org/package/@firelayer/cli">
    <img src="https://img.shields.io/npm/v/@firelayer/cli.svg" alt="Version" />
  </a>
  <a href="https://github.com/firelayer/firelayer/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/firelayer/firelayer.svg" alt="License" />
  </a>
</p>

Firelayer is a boilerplate toolkit for Firebase web projects.
It allows you to jump-start your Firebase web projects with templates for common use cases so you don't have to start from scratch.

### Documentation

[Documentation Website](https://firelayer.io)

## Table of contents

- 🚀[ Getting Started](#getting-started)
- 👥 [Community](#community)
- 👨‍💻 [Development](#development)
- :memo: [License](#license)

## Getting Started

Install firelayer globally:

```sh
npm i -g @firelayer/cli
```

And initialize a new project:
```sh
firelayer init new-project
```

Once it's installed, you can `cd new-project` and `yarn dev` and it will run the development servers on your local machine. 

## Community

- Blogging at [Medium](https://medium.com/firelayer)

## Development

Firelayer is organized as a monorepo using [Lerna](https://lerna.js.org/) and yarn workspaces. Useful scripts include:

#### `yarn bootstrap`
> Installs package dependencies and links packages together - using lerna and yarn workspaces

#### `yarn build`
> Cleans the previous builds and starts building on all sub packages - using lerna run build

#### `yarn dev`
> Starts the dev mode on all sub packages - using lerna run dev

## License

Firelayer is open-sourced software licensed under the [MIT license](https://github.com/firelayer/firelayer/blob/master/LICENSE).
