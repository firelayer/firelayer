<a href="https://firelayer.io/">
  <img src="https://user-images.githubusercontent.com/3942799/78354854-884c2780-75a4-11ea-9882-a716e2095e98.png" alt="Firelayer" width="400" />
</a>

> Jumpstart your Firebase Web Project

<br/>

# Firelayer Application

## Development

This boilerplate is organized as a monorepo using [Lerna](https://lerna.js.org/). Useful scripts include:
<% if (npmCli == 'yarn') { %>
#### `yarn bootstrap`
> Installs package dependencies - using lerna

#### `yarn build`
> Runs build on all apps - using lerna run build

#### `yarn dev`
> Starts the dev mode on all apps - using lerna run dev
<% } %>
<% if (npmCli == 'npm') { %>
#### `npm run bootstrap`
> Installs package dependencies - using lerna

#### `npm run build`
> Runs build on all apps - using lerna run build

#### `npm run dev`
> Starts the dev mode on all apps - using lerna run dev
<% } %>
