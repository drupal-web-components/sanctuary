import { AstroIntegration } from 'astro';

export default function (): AstroIntegration {
	return {
		name: '@gdwc/astro-drupal-state',
		hooks: {
			'astro:config:setup': ({injectRoute}) => {
				console.log('Drupal state config setup'); 
        injectRoute({
          pattern: '/examples/test',
          entryPoint: 'examples-test.astro'
        });
			},
		},
	};
}

