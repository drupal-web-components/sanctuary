import child_process from 'child_process';
import chalk from 'chalk';

import { checkDir } from './utils.mjs';

export default function (plop) {
    plop.setActionType('initAstro', function (answers) {
        return new Promise((resolve, reject) => {
            if (answers.directory) {
                console.log('Prompt answers', answers);
                checkDir(answers.directory);
                console.log(chalk.blue("First, we'll shuttle you over to the create-astro cli to create your initial project..."));
                // TODO - sanitize input
                child_process.spawnSync(`npm create astro@latest ${answers.directory}`, { encoding : 'utf8', stdio: 'inherit', shell: true });
                resolve('Welcome to space. Now let\'s explore.');
            } else {
                reject('Unknown project directory.');
            }
        });
    });
    
    // Astro project generator
    plop.setGenerator('astro', {
        description: 'create an astro project',
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
};