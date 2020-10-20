# NOTES

## TLDR

how to bootstrap a quick electron project with electron forge and vscode debugging main.ts file

## Bootstrap App

- [TypeScript: Create a new Electron app with TypeScript](https://www.electronforge.io/templates/typescript-template)

```shell
$ npx create-electron-app typescript-app --template=typescript
$ cd my-new-app
$ npm install && npm start
```

## Debug

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

> chetbox : **The current documentation is incorrect because the script is expected to be run from a different location**. This change means the script can be run from either location, which is great!
