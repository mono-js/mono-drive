# mono-drive

Mono module to manage storage (fileSystem, S3)

[![npm version](https://img.shields.io/npm/v/mono-drive.svg)](https://www.npmjs.com/package/mono-drive)
[![Travis](https://img.shields.io/travis/gaetansenn/mono-drive/master.svg)](https://travis-ci.org/gaetansenn/mono-drive)
[![Coverage](https://img.shields.io/codecov/c/github/gaetansenn/mono-drive/master.svg)](https://codecov.io/gh/gaetansenn/mono-drive)
[![license](https://img.shields.io/github/license/gaetansenn/mono-drive.svg)](https://github.com/gaetansenn/mono-drive/blob/master/LICENSE)

## Installation

```bash
npm install --save mono-drive
```

Then, in your configuration file of your Mono application (example: `conf/application.js`):

```js
module.exports = {
  mono: {
    modules: ['mono-drive']
  }
}
```

## Configuration

`mono-drive` will use the `mono.drive` property of your configuration (example: `conf/development.js`):

```js
module.exports = {
  mono: {
    drive: {
      local: {
        root: '' //path of the root directory
      },
      s3: {
        key: // Access key id `accessKeyId`
        secret: // secret access key `secretAccessKey`
        region: // region
      }
    }
  }
}
```

## Usage

In your `src/` files of your Mono project, you can access exposed methods like this:

```js
const MonoDrive = require('mono-drive')

// Instanciate mono drive with local provider
const { get, getStream, exists, create, delete } = new MonoDrive('local')
```

## Development / Contribution

See the [contribution guidelines](CONTRIBUTING.md) of this project.

## License

MIT &copy; gaetansenn
