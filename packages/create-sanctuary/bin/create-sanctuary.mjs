#!/usr/bin/env node
import nodePlop from 'node-plop';
import boxen from 'boxen';
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

import { checkDir } from '../utils.mjs';

// Use yargs to both document command options and get arguments
const args = yargs(hideBin(process.argv))
  .command('create-sanctuary <directory>', 'scaffold a new sanctuary project')
  .positional('directory', {
    describe: 'directory where your project will be created'
  })
  .option('frameworks', {
    alias: 'f',
    type: 'array',
    description: 'Specify framework integrations to add to your project.'
  })
  .option('typescript', {
    alias: 't',
    type: 'string',
    description: 'Specify the tsconfig to use (base, strict, strictest)'
  })
  .option('yes', {
    alias: 'y',
    type: 'boolean',
    description: 'Run in non-interactive mode'
  })
  .parse()

let directory = args['_'].slice(0,1).shift();
const typescript = args?.typescript;
const frameworks = args?.frameworks;
const yes = args?.yes;

// Let us introduce ourselves.
console.log(chalk.blue(boxen('An enjoyable project scaffolder for decoupled Drupal explorers. Powered by Astro.', {title: 'Welcome to Drupal Sanctuary!', titleAlignment: 'center', padding: 1, margin: 1, borderStyle: 'round'})));

// Create an instance of plop and load the generators we'll be using
const plop = await nodePlop(`plopfile.mjs`);
const astro = plop.getGenerator('astro');
const integrations = plop.getGenerator('integrations');

// Create an Astro project in the specified directory
if (directory) {
  checkDir(directory);
  await astro.runActions({ directory, typescript, yes });
}
else {
  await astro.runPrompts().then(async function (results) {
    directory = results.directory;
    await astro.runActions({ directory, typescript, yes });
  });
}

console.log(chalk.blue("\nNext, we'll guide you through optionally selecting Astro integrations to add functionality to your project..."));
console.log(chalk.blue(boxen('Integrations are optional, and can be added later with `astro add`', {title: 'Protip!', titleAlignment: 'center', padding: 1, margin: 1, borderStyle: 'round' })));

if (frameworks) {
  await integrations.runActions({directory: directory, frameworks: frameworks});
}
else {
  await integrations.runPrompts().then(async function (results) {
    await integrations.runActions({directory: directory, frameworks: results.frameworks});
  });
}

console.log(chalk.blue("\nWelcome to space. Enjoy your new project!\n"));

/**
 * Next:
 * If no frameworks, don't astro add
 * Other integrations
 * SSR options
 * Drupal data fetching
 * Prompt for envars
 * Other Drupal related integrations
 * Drupal module configurations
 * Bug - breaking out of first prompt doesn't break out of script
 * Re-think naming/github org structure
 */
