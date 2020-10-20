# NOTES

- [NOTES](#notes)
  - [TLDR](#tldr)
  - [Typescript + VsCode Debug](#typescript--vscode-debug)
    - [Bootstrap App](#bootstrap-app)
    - [Debug](#debug)
  - [Typescript + VsCode Debug + React](#typescript--vscode-debug--react)
    - [React Setup](#react-setup)
  - [Prepare for tsx files](#prepare-for-tsx-files)
    - [Create the react entrypoint as renderer.ts](#create-the-react-entrypoint-as-rendererts)

## TLDR

how to bootstrap a quick electron project with electron forge and vscode debugging main.ts file

## Typescript + VsCode Debug

### Bootstrap App

- [TypeScript + Webpack: Create a new Electron app with TypeScript and Webpack.](https://www.electronforge.io/templates/typescript-+-webpack-template)

```shell
$ npx create-electron-app typescript-webpack-app --template=typescript-webpack
$ cd typescript-webpack-app
$ npm install && npm start
```

### Debug

- [Debugging with VS Code](https://www.electronforge.io/advanced/debugging#debugging-with-vs-code)

> NOTE: bellow official `launch.json` is invalid, gives error

```shell
internal/modules/cjs/loader.js:883
  throw err;
  ^

Error: Cannot find module '/mnt/bcbe07de-fa2f-4351-ac99-2f19537a1df1/home/mario/Development/Electron/ElectronForge/@electron-forge/cli/dist/electron-forge-start'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)
    at Function.Module._load (internal/modules/cjs/loader.js:725:27)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
```

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Electron Main",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron-forge-vscode-nix",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron-forge-vscode-win.cmd"
      },
      // runtimeArgs will be passed directly to your Electron application
      "runtimeArgs": [
        "foo",
        "bar"
      ],
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

the error guides me [here](https://github.com/electron-userland/electron-forge/pull/1370#issuecomment-621510831)
where have the `launch.json` that works

> zachcowell : @chetbox , I was seeking a solution to have the VS Code debugger working for both main and renderer processes and was able to get it working by modifying your config. I am using electron-forge with the webpack template

## Typescript + VsCode Debug + React

- [Setting Electron + React with Typescript](https://dev.to/franamorim/tutorial-reminder-widget-with-electron-react-1hj9)

### React Setup

For our renderer we will install React and all dependencies necessary for typescript.

```shell
$ npm install --save-dev react react-dom @types/react @types/react-dom
```

change `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

## Prepare for tsx files

```shell
Module './app/app' was resolved to '/mnt/bcbe07de-fa2f-4351-ac99-2f19537a1df1/home/mario/Development/Electron/ElectronForge/typescript-webpack-app/src/app/app.tsx', but '--jsx' is not set.ts(6142)
```

Cannot use JSX unless the '--jsx' flag is provided
Restart your IDE. Sometimes tsconfig.json changes aren't immediately picked up
seems a problem after install react dependencies

- [Cannot use JSX unless the '--jsx' flag is provided](https://stackoverflow.com/questions/50432556/cannot-use-jsx-unless-the-jsx-flag-is-provided)

### Create the react entrypoint as renderer.ts

```shell
$ mv src/renderer.ts src/renderer.tsx
```

`renderer.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/app/app';

ReactDOM.render(<App />, document.getElementById('app'));
```