import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const appRoot = fileURLToPath(new URL('..', import.meta.url));
const dependencyAliases = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-syntax-highlighter',
  'lucide-react',
  'recharts',
  'katex',
].map((name) => ({
  find: name,
  replacement: fileURLToPath(new URL(`node_modules/${name}`, import.meta.url)),
}));

export default defineConfig({
  root: appRoot,
  cacheDir: fileURLToPath(new URL('node_modules/.vite', import.meta.url)),
  plugins: [react()],
  resolve: { alias: dependencyAliases },
  css: { postcss: { plugins: [tailwindcss(), autoprefixer()] } },
  build: { outDir: fileURLToPath(new URL('dist', import.meta.url)) },
  test: { root: appRoot, environment: 'node' },
});
