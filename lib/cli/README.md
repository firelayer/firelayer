<p align="center">
  <a href="https://firelayer.io/">
    <img src="https://user-images.githubusercontent.com/3942799/78354854-884c2780-75a4-11ea-9882-a716e2095e98.png" alt="Firelayer" width="400" />
  </a>
</p>

<p align="center">Jumpstart your Firebase Web Project</p>

<br/>

<p align="center">
  <a href="https://npmjs.org/package/@firelayer/cli">
    <img src="https://img.shields.io/npm/v/@firelayer/cli.svg" alt="Version" />
  </a>
  <a href="https://npmjs.org/package/@firelayer/cli">
    <img src="https://img.shields.io/npm/dw/@firelayer/cli.svg" alt="Downloads/week" />
  </a>
  <a href="https://oclif.io">
    <img src="https://img.shields.io/badge/cli-oclif-brightgreen.svg" alt="oclif" />
  </a>
</p>

## Getting Started

Install firelayer CLI globally:

```sh
npm i -g @firelayer/cli
```

And initialize a new project:
```sh
firelayer init new-project
```

Once it's installed, you can `cd new-project` and `yarn dev` and it will run the development server on your local machine.

## Table of Contents

* [Usage](#usage)
* [Command Topics](#command-topics)

## Usage
<!-- usage -->
```sh-session
$ npm install -g @firelayer/cli
$ firelayer COMMAND
running command...
$ firelayer (-v|--version|version)
@firelayer/cli/1.0.0-alpha.10 darwin-x64 node-v10.16.0
$ firelayer --help [COMMAND]
USAGE
  $ firelayer COMMAND
...
```
<!-- usagestop -->

<!-- commands -->
# Command Topics

* [`firelayer add`](docs/add.md) - add templates and plugins to the current project
* [`firelayer auth`](docs/auth.md) - users and authentication
* [`firelayer db`](docs/db.md) - database helper
* [`firelayer deploy`](docs/deploy.md) - deploy helper
* [`firelayer down`](docs/down.md) - put the application into maintenance mode
* [`firelayer env`](docs/env.md) - change development environment
* [`firelayer help`](docs/help.md) - display help for firelayer
* [`firelayer info`](docs/info.md) - print debugging information about your environment
* [`firelayer init`](docs/init.md) - create a new project
* [`firelayer make`](docs/make.md) - maker helper
* [`firelayer migrate`](docs/migrate.md) - run migrations
* [`firelayer run`](docs/run.md) - run shell commands with injected firelayer env variables
* [`firelayer up`](docs/up.md) - bring the application out of maintenance mode

<!-- commandsstop -->
