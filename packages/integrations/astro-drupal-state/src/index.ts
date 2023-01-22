import { AstroIntegration } from 'astro';

export default function (): AstroIntegration {
	return {
		name: '@gdwc/astro-drupal-state',
		hooks: {
			'astro:config:setup': ({injectScript}) => {
				console.log('Drupal state config setup'); 
				injectScript('page', `import { DrupalState } from '@gdwc/drupal-state';`);
			},
		},
	};
}

