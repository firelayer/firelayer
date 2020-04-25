`firelayer migrate`
===================

run migrations

* [`firelayer migrate`](#firelayer-migrate)
* [`firelayer migrate:rollback`](#firelayer-migraterollback)

## `firelayer migrate`

run migrations

```
USAGE
  $ firelayer migrate

OPTIONS
  -h, --help  show CLI help
  -y, --yes   skip interactive session

EXAMPLE

     $ firelayer migrate
     $ firelayer migrate:rollback --steps 2
```

_See code: [dist/commands/migrate/index.ts](https://github.com/firelayer/firelayer/blob/v1.0.0-alpha.6/dist/commands/migrate/index.ts)_

## `firelayer migrate:rollback`

rollback migrations

```
USAGE
  $ firelayer migrate:rollback

OPTIONS
  -h, --help         show CLI help
  -s, --steps=steps  [default: 1] rollback the last x steps
  -y, --yes          skip interactive session

EXAMPLE
  $ firelayer migrate:rollback --steps 1
```

_See code: [dist/commands/migrate/rollback.ts](https://github.com/firelayer/firelayer/blob/v1.0.0-alpha.6/dist/commands/migrate/rollback.ts)_
