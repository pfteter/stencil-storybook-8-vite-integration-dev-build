# stencil storybook 8 vite integration dev build hot reload

Showcase how to integrate stecil 4, storybook 8 with vite with a dev build / hot reload for faster development

## Problem
The problem is that the loader is only generated in the production build. This repo showcases how to get storybook and stencil working together with hot reloading


## Modify preview.js
add the line:
``import '../dist/stencil-storybook/stencil-storybook.esm.js';``

to your preview.js in order to load the stencil webcomponens once storybook starts:

``
import '../dist/stencil-storybook/stencil-storybook.esm.js';  // ADD THIS LINE OF CODE !

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;``


## How to run it ?

First start stencil in dev watch mode:
``"start": "stencil build --dev --watch --serve"``

with the command **npm run start**

next run storybook 8 in dev mode:
``"storybook": "storybook dev -p 6006"``

with the command **npm run storybook**

