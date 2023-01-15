import { existsSync } from 'node:fs';
import chalk from 'chalk';

const checkDir = (directory) => {
    if (existsSync(directory)) {
        console.error(chalk.bgRed(`${directory} is not empty. Please provide a different location for your project.`));
        process.exit(1);
    }
}

export { checkDir };