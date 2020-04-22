<p align="center">
  <a href="https://firelayer.io/">
    <img src="https://user-images.githubusercontent.com/3942799/78354991-d7925800-75a4-11ea-9185-c558cf601e25.png" alt="Firelayer" height="180" />
  </a>
</p>

<p align="center">Jumpstart your Firebase Web Project</p>

<br/>

<p align="center">
  <a href="https://github.com/firelayer/firelayer/actions?query=workflow%3Aci">
    <img src="https://github.com/firelayer/firelayer/workflows/ci/badge.svg?branch=master" alt="Build Status on Github" />
  </a>
</p>

Firelayer is a boilerplate / framework for Firebase web projects.
It allows you to jumpstart your Firebase web projects with a boilerplate for common use cases so you don't have to start from scratch.

## Development

Firelayer is organized as a monorepo using [Lerna](https://lerna.js.org/) and yarn workspaces. Useful scripts include:

#### `yarn bootstrap`
> Installs package dependencies and links packages together - using lerna and yarn workspaces

#### `yarn build`
> Cleans the previous builds and starts building on all sub packages - using lerna run build

#### `yarn dev`
> Starts the dev mode on all sub packages - using lerna run dev

## License

The Firelayer framework is open-sourced software licensed under the [MIT license](https://github.com/firelayer/firelayer/blob/master/LICENSE).
