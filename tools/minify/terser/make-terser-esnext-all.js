const makeTerser = require('./make-terser');

makeTerser('dist/global/class-factory.esnext.umd.js', {
  compress: {
    inline: false
  },
});
