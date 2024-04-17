# stencil storybook 8 vite integration dev build hot reload

Showcase how to integrate stecil 4, storybook 8 with vite with a dev build / hot reload for faster development

## Problem
The problem is that the loader is only generated in the production build. This repo showcases how to get storybook and stencil working together with hot reloading.

🚀 Hot reloading with stencil

🚀 Developer mode stencil build support (much faster)

🚀 Production build support


## Modify .storybook/main.ts
add the following lines to let storybook track our files as well as to make vite watch for changes in our dist folder / inform storybook about the changes:
```js
  staticDirs: [{ from: './../www/build/', to: '/build' }],
  async viteFinal(config) {
    return {
      ...config,
      assetsInclude: [...(config.assetsInclude as []), '/build/stencil-storybook.esm.js'],
      plugins: [...(config.plugins ?? []), externalFileWatch(['./dist/**/*.js'])],
    };
  },
```

Full main.ts:

```js
import { StorybookConfig } from '@storybook/web-components-vite';
import { externalFileWatch } from './plugins/externalFileWatch';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: [{ from: './../www/build/', to: '/build' }],
  async viteFinal(config) {
    return {
      ...config,
      assetsInclude: [...(config.assetsInclude as []), '/build/stencil-storybook.esm.js'],
      plugins: [...(config.plugins ?? []), externalFileWatch(['./dist/**/*.js'])],
    };
  },
};

export default config;
```

## add custom plugin to ## Modify .storybook/plugins/externalFileWatch.ts

```js
import colors from 'picocolors';
import chokidar from 'chokidar';

/**
 * Small plugin that watches for file changes and informs Vite to reload
 * once the change has been made.
 *
 * @param watchedFiles - List of files or directories to watch - use mask
 */
export const externalFileWatch = (watchFilesMask: readonly string[]) => ({
  name: 'internal-live-reload',

  configureServer({ ws, config }) {
    /**
     * Inform Vite server that a change has happened and trigger a full reload
     *
     * @param path - Path where the change has happened
     */
    const fileChanged = (path: string) => {
      console.info(`${colors.magenta(`File changed`)} ${colors.gray(path)}`);
      ws.send({ type: 'full-reload', path });
    };

    /**
     * Chokidar is already used by Vite for watching we will just add new paths to watch
     */
    chokidar
      .watch(watchFilesMask, { cwd: config.root, ignoreInitial: true, ...config })
      .on('change', fileChanged)
      .on('add', fileChanged);
  },
});
```



## How to run it ?

First start stencil in dev watch mode:
``"start": "stencil build --dev --watch --serve"``

with the command **npm run start**

next run storybook 8 in dev mode:
``"storybook": "storybook dev -p 6006"``

with the command **npm run storybook**

