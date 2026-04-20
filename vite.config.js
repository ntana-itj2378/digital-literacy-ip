import { defineConfig } from 'vite';
import nunjucksPlugin from 'vite-plugin-nunjucks';
import { resolve } from 'path';
import { glob } from 'glob';
import nunjucks from 'nunjucks';

// Create a custom Nunjucks environment with correct search paths
// This bypasses a bug in the plugin where search paths aren't correctly passed to Nunjucks.renderString
const nunjucksEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader([
    resolve(__dirname, 'src/layouts'),
    resolve(__dirname, 'src')
  ]),
  { autoescape: true }
);

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync('src/**/*.html').reduce((acc, file) => {
        const name = file.replace(/^src\//, '').replace(/\.html$/, '');
        acc[name] = resolve(__dirname, file);
        return acc;
      }, {}),
    },
  },
  plugins: [
    nunjucksPlugin({
      nunjucksEnvironment: nunjucksEnv,
      templatesDir: resolve(__dirname, 'src/layouts'),
    }),
  ],
});
