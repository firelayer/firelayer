`firelayer make`
================

maker helper

* [`firelayer make`](#firelayer-make)
* [`firelayer make:migration NAME`](#firelayer-makemigration-name)
* [`firelayer make:model NAME`](#firelayer-makemodel-name)

## `firelayer make`

maker helper

```
USAGE
  $ firelayer make

EXAMPLE

     $ firelayer make:migration create_posts_collection
     $ firelayer make:model Post
```

_See code: [dist/commands/make/index.ts](https://github.com/firelayer/firelayer/blob/v1.0.0-alpha.15/dist/commands/make/index.ts)_

## `firelayer make:migration NAME`

maker migration helper

```
USAGE
  $ firelayer make:migration NAME

EXAMPLE
  $ firelayer make:migration create_posts
```

_See code: [dist/commands/make/migration.ts](https://github.com/firelayer/firelayer/blob/v1.0.0-alpha.15/dist/commands/make/migration.ts)_

## `firelayer make:model NAME`

maker model helper

```
USAGE
  $ firelayer make:model NAME

EXAMPLE
  $ firelayer make:model create_posts
```

_See code: [dist/commands/make/model.ts](https://github.com/firelayer/firelayer/blob/v1.0.0-alpha.15/dist/commands/make/model.ts)_
