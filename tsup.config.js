import { defineConfig } from 'tsup';

const cfg = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ['esm', 'cjs'],
};

export default defineConfig([
  {
    ...cfg,
    entry: {
      index: 'index.ts',
    },
    outDir: 'dist',
  },
  {
    ...cfg,
    dts: false,
    entry: {
      script: 'script.ts',
    },
    env: {
        "DEBUG": "true"
    },
    minify: true,
    sourcemap: false,
    outDir: 'dist/public',
  },
  {
    ...cfg,
    dts: false,
    entry: {
      "script.debug": 'script.ts',
    },
    env: {
        "DEBUG": "true"
    },
    minify: true,
    sourcemap: false,
    outDir: 'dist/public',
  },
]);