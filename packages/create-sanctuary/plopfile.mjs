import child_process from 'child_process';
import chalk from 'chalk';

import { checkDir } from './utils.mjs';

export default function (plop) {
    plop.setActionType('initAstro', function (answers) {
        return new Promise((resolve, reject) => {
            if (answers.directory) {
                checkDir(answers.directory);
                console.log(chalk.blue("\nFirst, we'll shuttle you over to the create-astro cli to create your initial project..."));
                // TODO - sanitize input
                child_process.spawnSync(`npm create astro@latest ${answers.directory}`, { encoding : 'utf8', stdio: 'inherit', shell: true });
                resolve('Project created.');
            } else {
                reject('Unknown project directory.');
            }
        });
    });

    plop.setActionType('addIntegrations', function (answers) {
        return new Promise((resolve, reject) => {
            if (answers.frameworks) {
                child_process.spawnSync(`cd ${answers.directory} && npx astro add ${answers.frameworks.join(' ')} -y`, { encoding : 'utf8', stdio: 'inherit', shell: true });
                resolve('Integrations installed.');
            } else {
                reject('Unknown integrations.');
            }
        });
    });
    
    // Astro project generator
    plop.setGenerator('astro', {
        description: 'create an Astro project',
        prompts: [{
            type: 'input',
            name: 'directory',
            message: 'Where would you like to create your new project?',
            default: 'drupal-sanctuary'
        }],
        actions: [{
            type: 'initAstro',
        }]
    });
    plop.setGenerator('integrations', {
        description: 'add Astro integrations',
        prompts: [{
            type: 'checkbox',
            name: 'frameworks',
            message: 'Optionally, select one or more frameworks',
            choices: [
                { name: 'React', value: 'react' },
                { name: 'Vue', value: 'vue' },
                { name: 'Svelte', value: 'svelte'},
                { name: 'Lit', value: 'lit'},
            ],
        }],
        actions: [{
            type: 'addIntegrations',
        }]
    });
};