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
  .parse()
console.log('Args:', args);
const directory = args['_'].slice(0,1).shift();

// Let us introduce ourselves.
console.log(chalk.blue(boxen('An enjoyable project scaffolder for decoupled Drupal explorers. Powered by Astro.', {title: 'Welcome to Drupal Sanctuary!', titleAlignment: 'center', padding: 1, margin: 1, borderStyle: 'round'})));

// Create an instance of plop and load the generators we'll be using
const plop = await nodePlop(`plopfile.mjs`);
const astro = plop.getGenerator('astro');

// Create an Astro project in the specified directory
if (directory) {
  checkDir(directory);
  astro.runActions({directory}).then(function (results) {
    console.log('Action results with directory arg', results);
  });
}
else {
  astro.runPrompts().then(function (results) {
    console.log('Prompt Results', results);
    astro.runActions({directory: results.directory}).then(function (results) {
      console.log('Action results', results);
    });
  });
}

// console.log(chalk.blue("\nNext, we'll guide you through optionally selecting Astro integrations to add functionality to your project...\n"));

// console.log(boxen('Integrations are optional, and can be added later with `astro add`', {title: 'Protip!', titleAlignment: 'center', padding: 1 }) + '\n');

// (async () => {
//     const response = await prompts({
//         type: 'multiselect',
//         name: 'frameworks',
//         message: 'Pick one or more frameworks',
//         instructons: false, // TODO - can we remove redundant instructions?
//         choices: [
//           { title: 'React', value: 'react' },
//           { title: 'Vue', value: 'vue' },
//           { title: 'Svelte', value: 'svelte' },
//           { title: 'Lit', value: 'lit' }
//         ],
//         hint: '- Space to select. Return to submit'
//     });
  
//     // TODO - Make project directory path configurable
//     if (response.frameworks.length) {
//         child_process.spawnSync(`cd drupal-sanctuary && npx astro add ${response.frameworks.join(' ')} -y`, { encoding : 'utf8', stdio: 'inherit', shell: true });
//     }
//   })();

/**
 * Next:
 * Other integrations
 * SSR options
 * Drupal data fetching
 * Prompt for envars
 * Other Drupal related integrations
 * Drupal module configurations
 */
