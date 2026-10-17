/**
 * ROMI MD — Dady Bear WhatsApp Bot Startup Wrapper
 * Rebranded from wolf.js -> bear.js
 *
 * This wrapper provides clean startup, environment validation,
 * and boots the local ROMI MD bot engine.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const _GB = '\x1b[1m\x1b[38;2;255;180;50m';
const _G  = '\x1b[38;2;250;204;21m';
const _W  = '\x1b[38;2;200;215;225m';
const _DM = '\x1b[2m\x1b[38;2;100;120;130m';
const _R  = '\x1b[0m';

console.log('');
console.log(_GB + '    🐻  R O M I   M D  🐻' + _R);
console.log(_G  + '    ─────────────────────────' + _R);
console.log(_W  + '    ROMI MD  by  Dady Bear' + _R);
console.log(_DM + '    Starting ROMI MD core engine...' + _R);
console.log('');

// Boot local index.js directly
const indexPath = path.join(__dirname, 'index.js');
if (fs.existsSync(indexPath)) {
  await import('./index.js');
} else {
  console.error('[ROMI MD Error] index.js not found in ' + __dirname);
  process.exit(1);
}
