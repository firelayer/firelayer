import * as shelljs from 'shelljs'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import * as Listr from 'listr'
import * as semver from 'semver'
import * as glob from 'glob'
import ignore from 'ignore'
import cmd from '../utils/cmd'
import spawner from '../utils/spawner'

const boilerplateFolder = 'boilerplate'

export default async (targetDir, targetVersion, options) => {
  // check if running in local dev mode
  const rootPackage = path.join(__dirname, '../../../../package.json')
  let isDev = false

  if (fs.existsSync(rootPackage)) {
    isDev = (await import(rootPackage)).name === '@firelayer/root'
  }

  // select firebase project and web application
  await spawner(`firebase apps:sdkconfig WEB -o ${targetDir}/firebase.js`)

  if (!fs.existsSync(path.join(targetDir, 'firebase.js'))) {
    console.log(chalk.bold('\nCreate a WEB app in the Firebase console before proceeding.\n'))

    return
  }

  const tasks = new Listr([{
    title: 'Creating project',
    task: async () => {
      if (isDev) {
        console.log(chalk.cyan('\nRunning in dev mode, copying boilerplate from root\n'))

        const boilerPath = path.join(__dirname, '../../../../boilerplate')
        const gitIgnore = fs.readFileSync(path.join(boilerPath, '.gitignore'))
        const ig = ignore().add(gitIgnore.toString())

        await fs.copy(boilerPath, targetDir, {
          filter: (src) => {
            const relativePath = path.relative(boilerPath, src)

            if (!relativePath) return true

            return ig.filter([relativePath]).length > 0
          }
        })
      } else {
        // choose latest tag version that suits cli version
        const stdout = (await cmd('git ls-remote --tags git://github.com/firelayer/firelayer.git')) as string

        const versions = stdout.split(/\r?\n/).map((line) => {
          const match = line.match(/tags\/(.*)/)

          return match ? match[1] : ''
        })

        let latest = versions.reverse().find((version) => semver.satisfies(version, `^${targetVersion}`))

        if (!latest) {
          console.log(
            chalk.bold(`Boilerplate version for @firelayer/cli v${targetVersion} not found, using 'master' branch..`)
          )
          latest = 'master'
        }

        // get boilerplate from repo
        await cmd(`git clone --branch ${latest} --depth 1 git@github.com:firelayer/firelayer.git ${targetDir}`)

        shelljs.cd(targetDir)

        await cmd(`git filter-branch --prune-empty --subdirectory-filter ${boilerplateFolder} HEAD`)

        shelljs.rm('-rf', `${targetDir}/.git`)
      }
    }
  }, {
    title: 'Preparing configurations',
    task: () => {
      // prepare configuration files
      glob.sync(targetDir + '/**/*.dist.json').forEach((file) => {
        fs.copyFileSync(file, file.replace('.dist', ''))
      })

      // get firebase configurations
      const firebaseFile = path.join(targetDir, 'firebase.js')

      if (fs.existsSync(firebaseFile)) {
        const firebase = fs.readFileSync(firebaseFile, 'utf8')
        const matched = firebase.match(/\(([^)]+)\)/g)

        const firebaseJSON = matched[0].replace('(', '').replace(')', '')
        const firebaseObject = JSON.parse(firebaseJSON)

        const newAppConfig = JSON.stringify({
          firebase: {
            ...firebaseObject
          }
        }, null, 2)

        fs.writeFileSync(path.join(targetDir, 'config/app.json'), newAppConfig)

        const firebaserc = fs.readFileSync(path.join(targetDir, '.firebaserc'), 'utf8')

        fs.writeFileSync(path.join(targetDir, '.firebaserc'), firebaserc.split('firelayer-boilerplate').join(firebaseObject.projectId))
      }

      fs.removeSync(firebaseFile)
    }
  }, {
    title: 'Installing dependencies',
    skip: () => options.skipDependencies,
    task: () => {
      shelljs.cd(targetDir)

      return cmd('yarn bootstrap')
    }
  }])

  try {
    await tasks.run()

    console.log(chalk.bold('\nIn order to use the Admin SDK in our Firebase Cloud Functions we will need the service account key. See More:'))
    console.log(chalk.cyan('https://firelayer.io/docs/getting-started#get-the-firebase-service-account-key\n'))

    console.log(`\n🎉  Successfully created project ${chalk.yellow(name)}.\n`)
  } catch (e) {
    throw new Error()
  }
}
