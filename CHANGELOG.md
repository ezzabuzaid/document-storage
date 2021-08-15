### 0.8.0 (2021-08-15)

##### Chores

*  change build target to ES6 (b822bc2c)
*  change build target to es2018 (bd36efc1)
*  revet rootDir option in tsconfig (9a16c45b)

##### Bug Fixes

*  remove types from method levels to storage level (aab13fc4)
*  imporve EntityId to take type (e4b612a9)

##### Refactors

*  rename test folder to __test__ (96680515)
*  rename test folder to __test__ (dff1d9e2)

##### Tests

*  refactor collection tests (19ba7b86)

## 1.0.0 (2021-08-15)

##### Chores

*  change build target to ES6 (b822bc2c)
*  change build target to es2018 (bd36efc1)
*  revet rootDir option in tsconfig (9a16c45b)

##### Refactors

*  rename test folder to __test__ (dff1d9e2)

### 0.7.0 (2021-06-15)

##### Build System / Dependencies

*  use cpy-cli and del-cli instead of custom script (3c9c0d7d)
*  remove declarationMap option from tsconfig file (bdb9f853)
*  run sync command after build directly (d0e0ffb5)
*  remove build script before publish (4e0fe2a5)

##### Chores

*  usd typescript strict, remove declarationMap (a6a721c0)

##### Continuous Integration

*  use one stage for build and publish (b0636181)
*  update pipeline to publish dist folder only (d9795499)

##### New Features

*  imporve EntityId to take type (e4b612a9)
*  add QueryCallback to getAll (e89ae2d0)
*  consider id in Collection.create, use typescript strict mode (e3c71722)
* **IAsyncStorage:**  doesn't require Entity type anymore (bfbfd0b1)

##### Bug Fixes

*  improve id generation by using Math.random instead of directly using Date.now() (9f1cb6bc)

##### Refactors

*  add EntityId type (c61135d1)

#### 0.6.3 (2020-10-20)

##### Build System / Dependencies

*  remove declarationMap option from tsconfig file (bdb9f853)
*  run sync command after build directly (d0e0ffb5)
*  remove build script before publish (4e0fe2a5)

##### Continuous Integration

*  update pipeline to publish dist folder only (d9795499)

##### New Features

* **IAsyncStorage:**  doesn't require Entity type anymore (bfbfd0b1)

#### 0.6.3 (2020-10-20)

##### Build System / Dependencies

*  run sync command after build directly (d0e0ffb5)
*  remove build script before publish (4e0fe2a5)

##### Continuous Integration

*  update pipeline to publish dist folder only (d9795499)

##### New Features

* **IAsyncStorage:**  doesn't require Entity type anymore (bfbfd0b1)

#### 0.6.3 (2020-10-20)

##### Build System / Dependencies

*  run sync command after build directly (d0e0ffb5)
*  remove build script before publish (4e0fe2a5)

##### Continuous Integration

*  update pipeline to publish dist folder only (d9795499)

##### New Features

* **IAsyncStorage:**  doesn't require Entity type anymore (bfbfd0b1)

### 0.7.0 (2020-06-15)

##### Continuous Integration

*  update pipeline to publish dist folder only (d9795499)

##### New Features

* **IAsyncStorage:**  doesn't require Entity type anymore (bfbfd0b1)

#### 0.6.2 (2020-06-15)

##### Build System / Dependencies

*  add script to copy package json and readme to dist folder (2627e4c7)

##### Documentation Changes

*  add keyval store to readme (b32dfa6e)
*  install changelog generator (898b68cd)
