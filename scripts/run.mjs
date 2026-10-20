import { spawn, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const bundledNode = join(
  homedir(), '.cache', 'codex-runtimes', 'codex-primary-runtime',
  'dependencies', 'node', 'bin', process.platform === 'win32' ? 'node.exe' : 'node',
)

function majorVersion(executable) {
  if (!executable || !existsSync(executable)) return 0
  const result = spawnSync(executable, ['--version'], { encoding: 'utf8' })
  return Number(result.stdout?.trim().match(/^v(\d+)/)?.[1] ?? 0)
}

const runtime = [process.execPath, process.env.PORTFOLIO_NODE, bundledNode]
  .find((candidate) => majorVersion(candidate) >= 24)

if (!runtime) {
  console.error('This portfolio requires Node.js 24 or newer. Install Node 24, or set PORTFOLIO_NODE to a Node 24 executable.')
  process.exit(1)
}

const task = process.argv[2]
const extra = process.argv.slice(3)
const tsc = join(root, 'node_modules', 'typescript', 'bin', 'tsc')
const vite = join(root, 'node_modules', 'vite', 'bin', 'vite.js')
const eslint = join(root, 'node_modules', 'eslint', 'bin', 'eslint.js')
const tasks = {
  dev: [[vite, ...extra]],
  build: [[tsc, '-b'], [vite, 'build', ...extra]],
  preview: [[vite, 'preview', ...extra]],
  lint: [[eslint, '.', ...extra]],
  typecheck: [[tsc, '-b', '--noEmit', ...extra]],
}

if (!Object.hasOwn(tasks, task)) {
  console.error(`Unknown task: ${task ?? '(none)'}`)
  process.exit(1)
}

for (const [entry, ...args] of tasks[task]) {
  const code = await new Promise((resolve) => {
    const child = spawn(runtime, [entry, ...args], { cwd: root, stdio: 'inherit' })
    child.on('error', (error) => {
      console.error(error.message)
      resolve(1)
    })
    child.on('close', (exitCode, signal) => resolve(exitCode ?? (signal ? 130 : 1)))
  })
  if (code !== 0) {
    process.exitCode = code
    break
  }
}
