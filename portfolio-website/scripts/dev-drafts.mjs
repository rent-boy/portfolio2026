// Runs the site locally showing unpublished Sanity drafts.
// Uses the Sanity CLI login on this machine (`npx sanity login`); nothing is written to disk.
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'

const { authToken } = JSON.parse(readFileSync(join(homedir(), '.config/sanity/config.json'), 'utf8'))
if (!authToken) {
  console.error('Not logged in to Sanity. Run `npx sanity login` in the studio folder first.')
  process.exit(1)
}

const next = join(import.meta.dirname, '../node_modules/next/dist/bin/next')
spawn(process.execPath, [next, 'dev', join(import.meta.dirname, '..'), '-p', '3100'], {
  stdio: 'inherit',
  env: { ...process.env, SANITY_PREVIEW_TOKEN: authToken, NEXT_DIST_DIR: '.next-drafts' },
}).on('exit', (code) => process.exit(code ?? 0))
