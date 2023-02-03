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
  .option('adapters', {
    alias: 'a',
    type: 'array',
    description: 'Specify SSR adapters to add to your project.'
  })
  .option('frameworks', {
    alias: 'f',
    type: 'array',
    description: 'Specify framework integrations to add to your project.'
  })
  .option('other', {
    alias: 'o',
    type: 'array',
    description: 'Specify other official Astro integrations to add to your project.'
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
const adapters = args?.adapters;
const other = args?.other;
const yes = args?.yes;

// Let us introduce ourselves.
console.log(chalk.blue(boxen('An enjoyable project scaffolder for decoupled Drupal explorers. Powered by Astro.', {title: 'Welcome to Drupal Sanctuary!', titleAlignment: 'center', padding: 1, margin: 1, borderStyle: 'round'})));

// Create an instance of plop and load the generators we'll be using
const plop = await nodePlop(`plopfile.mjs`);
const astro = plop.getGenerator('astro');
const integrations = plop.getGenerator('integrations');
const api = plop.getGenerator('api');

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

if ((frameworks && adapters && other) || yes) {
  await integrations.runActions({directory: directory, frameworks: frameworks, adapters: adapters, other: other});
}
else {
  await integrations.runPrompts().then(async function (results) {
    if (results.frameworks.length || results.adapters.length || results.other.length) {
      await integrations.runActions({directory: directory, frameworks: results.frameworks, adapters: results.adapters, other: results.other});
    }
  });
}

await api.runPrompts().then(async function (results) {
  await api.runActions(results);
});

console.log(chalk.blue("\nWelcome to space. Enjoy your new project!\n"));
