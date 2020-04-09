const rollupBundle = require('./rollup-bundle');

rollupBundle({
  input: 'dist/esm5_for_rollup/core/public.js',
  dest: 'dist/global/class-factory.core.umd.js',
});
