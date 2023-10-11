import resolveConfig from 'tailwindcss/resolveConfig.js';
import TWConfigFile from '../tailwind.config.js';
import fs from 'fs';

const fullConfig = resolveConfig(TWConfigFile);

const screensObj = fullConfig.theme.screens;

fs.writeFileSync(
  `${process.cwd()}/src/generated/tailwind-config-objs.ts`,
  `export const screens = ${JSON.stringify(screensObj)};`,
);
