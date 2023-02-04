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
                let flags = '-- --template basics';
                flags = answers.typescript ? `${flags} --typescript ${answers.typescript}` : flags;
                flags = answers.yes ? `${flags} --yes` : flags;
                child_process.spawnSync(`npm create astro@latest ${answers.directory} ${flags}`, { encoding : 'utf8', stdio: 'inherit', shell: true });
                resolve('Project created.');
            } else {
                reject('Unknown project directory.');
            }
        });
    });

    plop.setActionType('addIntegrations', function (answers) {
        return new Promise((resolve, reject) => {
            const integrations = answers.frameworks.concat(answers.adapters, answers.other);
            if (integrations) {
                child_process.spawnSync(`cd ${answers.directory} && npx astro add ${integrations.join(' ')} -y`, { encoding : 'utf8', stdio: 'inherit', shell: true });
                resolve('Integrations installed.');
            } else {
                reject('Unknown integrations.');
            }
        });
    });

    plop.setActionType('configureApi', function (answers) {
      return new Promise((resolve, reject) => {
          console.log(answers);
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
        actions: function (data) {
            const actions = [];
            actions.push({
                type: 'initAstro',
            });
            actions.push({
                type: "modify",
                path: `${data.directory}/src/pages/index.astro`,
                pattern: /(<\/main>)/gi,
                templateFile: "templates/summary.hbs",
            });
            return actions;
        },
    });
    plop.setGenerator('integrations', {
        description: 'add Astro integrations',
        prompts: [{
            type: 'checkbox',
            name: 'frameworks',
            message: 'Optionally, select one or more frameworks',
            choices: [
                { name: 'Alpine.js', value: 'alpinejs' },
                { name: 'Lit', value: 'lit'},
                { name: 'Preact', value: 'preact' },
                { name: 'React', value: 'react' },
                { name: 'SolidJS', value: 'solid' },
                { name: 'Svelte', value: 'svelte'},
                { name: 'Vue', value: 'vue' },
            ],
        },
        {
            type: 'checkbox',
            name: 'adapters',
            message: 'Astro creates a static build asset by default. To enable server-sider rendering, optionally select an adapter',
            choices: [
                { name: 'Node', value: 'node' },
                { name: 'Cloudflare', value: 'cloudflare'},
                { name: 'Deno', value: 'deno' },
                { name: 'Netlify', value: 'netlify' },
                { name: 'Vercel', value: 'vercel' },
            ],
        },
        {
            type: 'checkbox',
            name: 'other',
            message: 'Optionally add other official Astro integrations.',
            choices: [
                { name: 'Image', value: 'image' },
                { name: 'MDX', value: 'mdx'},
                { name: 'Partytown', value: 'partytown' },
                { name: 'Prefetch', value: 'prefetch' },
                { name: 'Sitemap', value: 'sitemap' },
                { name: 'Tailwind', value: 'tailwind' },
            ],
        }],
        actions: [{
            type: 'addIntegrations',
        }]
    });
    plop.setGenerator('api', {
      description: 'configure approach to sourcing CMS data',
      prompts: [{
        type: 'list',
        name: 'sourcing',
        message: 'How would you like to source data from Drupal?',
        choices: [
            { name: 'JSON:API', value: 'jsonapi' },
            { name: 'I\'ll configure this later', value: 'none'},
        ],
      }],
      actions: [{
          type: 'configureApi',
      }]
  });
};