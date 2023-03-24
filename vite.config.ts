import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

/** @type {import('vite').UserConfig} */
export default {
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@faker-js/faker', 'chance'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@faker-js/faker': 'faker',
          chance: 'chance',
        },
      },
    },
    sourcemap: true,
  },
  plugins: [
    dts(),
    visualizer({
      // template: 'network',
      filename: 'dist/stats.html',
    }),
  ],
};
