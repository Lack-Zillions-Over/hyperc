import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    name: 'Development Build',
    tsconfig: 'tsconfig.json',
    outDir: 'build',
    minify: !options.watch,
    dts: true,
  };
});
