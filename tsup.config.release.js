import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    name: 'Release Build',
    tsconfig: 'tsconfig.release.json',
    outDir: 'build',
    minify: true,
    dts: true,
  };
});
