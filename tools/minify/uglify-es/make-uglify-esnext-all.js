const makeUglify = require('./make-uglify');

makeUglify('dist/global/class-factory.esnext.umd.js', {
  compress: {
    inline: false
  },
});
