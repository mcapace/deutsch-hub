#!/usr/bin/env node
/**
 * Add all variables from .env.local to Vercel (production, preview, development).
 * Run from project root: node scripts/vercel-env-add.mjs
 * Requires: vercel CLI linked and .env.local present.
 */
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const envPath = join(root, '.env.local');

const raw = readFileSync(envPath, 'utf8');
const env = {};
for (const line of raw.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eq = trimmed.indexOf('=');
  if (eq <= 0) continue;
  const name = trimmed.slice(0, eq).trim();
  let value = trimmed.slice(eq + 1).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
    value = value.slice(1, -1);
  env[name] = value;
}

const environments = ['production', 'preview', 'development'];
for (const [name, value] of Object.entries(env)) {
  for (const envType of environments) {
    try {
      execSync(`vercel env add "${name.replace(/"/g, '\\"')}" ${envType} --force`, {
        input: value,
        cwd: root,
        stdio: ['pipe', 'inherit', 'inherit'],
      });
      console.log(`Added ${name} to ${envType}`);
    } catch (e) {
      console.error(`Failed ${name} @ ${envType}:`, e.message || e);
    }
  }
}
console.log('Done.');
