#!/usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';
import prompts from 'prompts';

import child_process from 'child_process';

console.log(chalk.bgBlue(boxen('An enjoyable project scaffolder for decoupled Drupal explorers. Powered by Astro.', {title: 'Welcome to Drupal Sanctuary!', titleAlignment: 'center', padding: 1, borderStyle: 'arrow'})));

console.log(chalk.blue("\nFirst, we'll shuttle you over to the create-astro cli to create your initial project..."));

// TODO - Check for specified project directory, exit if it doesn't exist.

// TODO - Ensure we sanitize input
child_process.spawnSync("npm create astro@latest drupal-sanctuary", { encoding : 'utf8', stdio: 'inherit', shell: true });

console.log(chalk.blue("\nNext, we'll guide you through optionally selecting Astro integrations to add functionality to your project...\n"));

console.log(boxen('Integrations are optional, and can be added later with `astro add`', {title: 'Protip!', titleAlignment: 'center', padding: 1 }) + '\n');

(async () => {
    const response = await prompts({
        type: 'multiselect',
        name: 'frameworks',
        message: 'Pick one or more frameworks',
        instructons: false, // TODO - can we remove redundant instructions?
        choices: [
          { title: 'React', value: 'react' },
          { title: 'Vue', value: 'vue' },
          { title: 'Svelte', value: 'svelte' },
          { title: 'Lit', value: 'lit' }
        ],
        hint: '- Space to select. Return to submit'
    });
  
    // TODO - Make project directory path configurable
    if (response.frameworks.length) {
        child_process.spawnSync(`cd drupal-sanctuary && npx astro add ${response.frameworks.join(' ')} -y`, { encoding : 'utf8', stdio: 'inherit', shell: true });
    }
  })();

/**
 * Next:
 * Other integrations
 * SSR options
 * Drupal data fetching
 * Prompt for envars
 * Other Drupal related integrations
 * Drupal module configurations
 */
