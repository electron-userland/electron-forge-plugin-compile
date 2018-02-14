Electron Forge Plugin Compile
-----------------------------

A plugin for Electron Forge that brings first class `electron-compile`
support to your build pipeline.

# Usage

```bash
npm i @electron-forge/plugin-compile --save-dev
```


```js
// forge.config.js
const { CompilePlugin } = require('@electron-forge/plugin-compile')

module.exports = {
  // other config here
  plugins: [new CompilePlugin()]
}
```

## Project Setup

In order for this plugin to work correctly you need to have a few things
in place

1. `electron-prebuilt-compile` installed instead of `electron` as a `devDependency`
1. `electron-compile` as a `dependency`
1. A correctly configured `.compilerc` in the root of your project, an example is included below

Once your project is setup and the plugin added to your configuration, everything should
Just Work(tm).

### Example `.compilerc`

```json
{
  "env": {
    "development": {
      "application/javascript": {
        "presets": [
          ["env", { "targets": { "electron": "1.8" } }],
          "react"
        ],
        "plugins": ["transform-async-to-generator"],
        "sourceMaps": "inline"
      }
    },
    "production": {
      "application/javascript": {
        "presets": [
          ["env", { "targets": { "electron": "1.8" } }],
          "react"
        ],
        "plugins": ["transform-async-to-generator"],
        "sourceMaps": "none"
      }
    }
  }
}
```