`firelayer auth`
================

users and authentication

* [`firelayer auth`](#firelayer-auth)
* [`firelayer auth:add`](#firelayer-authadd)

## `firelayer auth`

users and authentication

```
USAGE
  $ firelayer auth

OPTIONS
  -h, --help       show CLI help
  -u, --user=user  user uid, email or phone number
  --set-admin      set user as admin

EXAMPLE
  $ firelayer auth -u johndoe@doejohn.doe --set-admin
```

_See code: [dist/commands/auth/index.ts](https://github.com/firelayer/firelayer/blob/v1.0.0/dist/commands/auth/index.ts)_

## `firelayer auth:add`

users and authentication

```
USAGE
  $ firelayer auth:add

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  (required) user password
  -u, --email=email        (required) user email

EXAMPLE
  $ firelayer auth:add -u johndoe@doejohn.doe -p password123
```

_See code: [dist/commands/auth/add.ts](https://github.com/firelayer/firelayer/blob/v1.0.0/dist/commands/auth/add.ts)_
