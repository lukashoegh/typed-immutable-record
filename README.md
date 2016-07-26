# typed-immutable-record

[![CircleCI](https://img.shields.io/circleci/project/rangle/typed-immutable-record/master.svg?maxAge=2592000)](https://circleci.com/gh/angular-redux/ng2-redux/tree/master)
[![npm version](https://img.shields.io/npm/v/typed-immutable-record.svg)](https://www.npmjs.com/package/typed-immutable-record)

Typed Immutable.js Records using interfaces.

The intent of this library is to offer an easy way to have types inside your application using Immutable.Record.
Two methods and one interface are exported. The methods are `makeTypedFactory` and `recordify` and the interface is `TypedRecord`.

In a nutshell:
`TypedRecord` changes the returned type from the Immutable functions so that you get your interface back instead of the Map itself.
`makeTypedFactory` is a method that returns a function Factory, which can be invoked to generate `TypedRecord` instances.
`recordify` is a utility method that generates a `TypedRecord`, usually useful when you just generate one instance from the TypedFactory.

See [tests](test/typed.factory.test.ts) for examples.
