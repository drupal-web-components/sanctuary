#!/usr/bin/env node

var child_process = require('child_process');

console.log( "=== Before Spawning Process ===" );

// TODO - Ensure we sanitize input
child_process.spawnSync("npm create astro@latest sanctuary", { encoding : 'utf8', stdio: 'inherit', shell: true });

console.log( "=== After Spawning Process ===" );