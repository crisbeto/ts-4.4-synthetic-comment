# ts-4.4-synthetic-comment

## Steps to reproduce the issue
1. Clone this repo.
2. Run `npm install`.
3. Run `npm run transform` and observe the console output.

### Expected output
```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
function MyDecorator(cls, ...args) {
    return cls;
}
let Foo = class Foo {
};
/* This should only exist once */
Foo.customStaticProp = 'hello';
Foo = (0, tslib_1.__decorate)([
    MyDecorator
], Foo);
exports.Foo = Foo;
```

### Actual output
```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
function MyDecorator(cls, ...args) {
    return cls;
}
let Foo = class Foo {
};
/* This should only exist once */
/* This should only exist once */
Foo.customStaticProp = 'hello';
Foo = (0, tslib_1.__decorate)([
    MyDecorator
], Foo);
exports.Foo = Foo;
```
