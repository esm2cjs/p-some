# @esm2cjs/p-some

This is a fork of https://github.com/sindresorhus/p-some, but automatically patched to support ESM **and** CommonJS, unlike the original repository.

## Install

You can use an npm alias to install this package under the original name:

```
npm i p-some@npm:@esm2cjs/p-some
```

```jsonc
// package.json
"dependencies": {
    "p-some": "npm:@esm2cjs/p-some"
}
```

but `npm` might dedupe this incorrectly when other packages depend on the replaced package. If you can, prefer using the scoped package directly:

```
npm i @esm2cjs/p-some
```

```jsonc
// package.json
"dependencies": {
    "@esm2cjs/p-some": "^ver.si.on"
}
```

## Usage

```js
// Using ESM import syntax
import pSome from "@esm2cjs/p-some";

// Using CommonJS require()
const pSome = require("@esm2cjs/p-some").default;
```

> **Note:**
> Because the original module uses `export default`, you need to append `.default` to the `require()` call.

For more details, please see the original [repository](https://github.com/sindresorhus/p-some).

## Sponsoring

To support my efforts in maintaining the ESM/CommonJS hybrid, please sponsor [here](https://github.com/sponsors/AlCalzone).

To support the original author of the module, please sponsor [here](https://github.com/sindresorhus/p-some).
