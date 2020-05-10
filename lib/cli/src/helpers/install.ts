import * as fs from 'fs-extra'
import * as path from 'path'
import * as os from 'os'
import * as chalk from 'chalk'
import * as Listr from 'listr'
import * as semver from 'semver'
import * as glob from 'glob'
import * as open from 'open'
import { prompt } from 'inquirer'
import ignore from 'ignore'
import cmd from '../utils/cmd'
import addTemplate from './addTemplate'
import npmCli from './npmCli'
import getFirebaseConfig from './getFirebaseConfig'
import logger from '../utils/logger'

const boilerplateFolder = 'boilerplate'

export default async (targetDir, targetVersion, options) => {
  // check if running in local dev mode
  const rootPackage = path.join(__dirname, '../../../../package.json')
  let isDev = false

  if (fs.existsSync(rootPackage)) {
    isDev = (await import(rootPackage)).name === '@firelayer/root'
  }

  const firebaseConfig = await getFirebaseConfig()

  // check npm package managers
  const npmcli = await npmCli()

  let templateFn = ({ chalk, open, logger, prompt, targetDir }) => {}

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
        const gitRepo = 'https://github.com/firelayer/firelayer.git'

        // choose latest tag version that suits cli version
        const stdout = (await cmd(`git ls-remote --tags ${gitRepo}`, {}, {
          'GIT_TERMINAL_PROMPT': '0'
        })) as string

        const versions = stdout.split(/\r?\n/).map((line) => {
          const match = line.match(/tags\/(.*)/)

          return match ? match[1] : ''
        })

        let latest = versions.reverse().find((version) => semver.satisfies(version, `^${targetVersion}`))

        if (!latest) {
          logger('install', `Boilerplate version for @firelayer/cli v${targetVersion} not found, using 'master' branch..`)
          logger('install', versions)
          latest = 'master'
        }

        // get boilerplate from repo
        const tmpdir = path.join(os.tmpdir(), 'firelayer-temp')

        fs.removeSync(tmpdir)
        fs.ensureDirSync(tmpdir)

        await cmd(`git clone --branch ${latest} --depth 1 ${gitRepo} ${tmpdir}`, {}, {
          'GIT_TERMINAL_PROMPT': '0'
        })

        // copy boilerplate code to target directory
        fs.copySync(path.join(tmpdir, boilerplateFolder), targetDir, { overwrite: true })
        fs.removeSync(tmpdir)
      }

      process.chdir(targetDir)

      if (!fs.existsSync(path.join(targetDir, '.git'))) await cmd('git init')

      const packageJSON = JSON.parse(fs.readFileSync(`${targetDir}/package.json`, 'utf8'))

      packageJSON.name = options.name
      packageJSON.description = `${options.name} - Firelayer boilerplate`

      if (npmcli === 'npm') {
        packageJSON.scripts.bootstrap = 'npm install && lerna bootstrap'
        delete packageJSON.workspaces

        // remove yarn from lerna
        const lernaJSON = JSON.parse(fs.readFileSync(`${targetDir}/lerna.json`, 'utf8'))

        delete lernaJSON.npmClient
        delete lernaJSON.useWorkspaces

        fs.writeFileSync(`${targetDir}/lerna.json`, JSON.stringify(lernaJSON, null, 2))
      }

      fs.writeFileSync(`${targetDir}/package.json`, JSON.stringify(packageJSON, null, 2))
    }
  }, {
    title: 'Preparing configurations',
    task: () => {
      // prepare configuration files
      glob.sync(targetDir + '/**/*.dist.json').forEach((file) => {
        fs.copyFileSync(file, file.replace('.dist', ''))
      })

      const newAppConfig = JSON.stringify({
        firebase: {
          ...firebaseConfig
        }
      }, null, 2)

      fs.writeFileSync(path.join(targetDir, 'config/app.json'), newAppConfig)

      const firebaserc = fs.readFileSync(path.join(targetDir, '.firebaserc'), 'utf8')

      fs.writeFileSync(path.join(targetDir, '.firebaserc'), firebaserc.split('firelayer-boilerplate').join(firebaseConfig.projectId))
    }
  }, {
    title: `Adding template (${options.template})`,
    task: async () => {
      process.chdir(targetDir)

      templateFn = await addTemplate(options.template)
    }
  }])

  try {
    await tasks.run()

    let confirm = false

    if (!options.skipDependencies) {
      console.log()
      confirm = (await prompt({
        type: 'confirm',
        name: 'confirm',
        default: true,
        message: 'Install dependencies?'
      })).confirm
    }

    const tasksDependencies = new Listr([{
      title: 'Installing dependencies',
      skip: () => options.skipDependencies || !confirm,
      task: () => {
        process.chdir(targetDir)

        return cmd('npm run bootstrap')
      }
    }])

    await tasksDependencies.run()

    // run template post install script
    await templateFn({ chalk, open, logger, prompt, targetDir })

    console.log(chalk.bold(`\nDon't forget to verify hosting properties in '${chalk.cyan('firebase.json')}' and targets on '${chalk.cyan('.firebaserc')}'`))
    console.log(chalk.bold('\nIn order to use the Admin SDK you will need the service account key. See More:'))
    console.log(chalk.cyan('https://firelayer.io/docs/getting-started#get-the-firebase-service-account-key'))

    console.log(`\n🎉  Successfully created project ${chalk.yellow(options.name)}.\n`)
  } catch (e) {
    throw new Error(e)
  }
}
