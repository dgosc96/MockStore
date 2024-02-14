import resolveConfig from 'tailwindcss/resolveConfig.js';
import TWConfigFile from '../tailwind.config.js';
import fs from 'fs';
import path from 'path';

const fullConfig = resolveConfig(TWConfigFile);

const screensObj = fullConfig.theme.screens;

// Define the directory and file
const dir = process.cwd() + '/generated';
const file = path.join(dir, 'tailwind-config-objs.ts');

// Create the directory if it does not exist
fs.mkdirSync(dir, { recursive: true });

// Create or overwrite the file
fs.writeFileSync(file, `export const screens = ${JSON.stringify(screensObj)};`);
