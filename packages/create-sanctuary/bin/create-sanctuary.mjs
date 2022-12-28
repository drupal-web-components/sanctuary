#!/usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';

import child_process from 'child_process';

console.log(chalk.bgBlue(boxen('An enjoyable project scaffolder for decoupled Drupal explorers. Powered by Astro.', {title: 'Welcome to Drupal Sanctuary!', titleAlignment: 'center', padding: 1, borderStyle: 'arrow'})));

console.log("\nFirst, we'll shuttle you over to the create-astro cli to create your initial project...");

// TODO - Check for specified project directory, exit if it doesn't exist.

// TODO - Ensure we sanitize input
child_process.spawnSync("npm create astro@latest drupal-sanctuary", { encoding : 'utf8', stdio: 'inherit', shell: true });

console.log( "=== After Spawning Process ===" );