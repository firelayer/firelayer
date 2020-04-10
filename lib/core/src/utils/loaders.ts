import * as path from 'path'

export function lazyImport(pkg, dirname) {
  return async function (...args) {
    await (await import(path.join(dirname, pkg))).default(...args)
  }
}
