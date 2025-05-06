const terser = require('@rollup/plugin-terser');
const copy = require('rollup-plugin-copy');

module.exports = {
  input: 'src/core.js',
  output: {
    file: 'dist/tabler-a11y.min.js',
    format: 'iife',
    name: 'TablerA11y'
  },
  plugins: [
    terser({
      mangle: {
        properties: {
          reserved: [
            'applyAll',
            'textSizeLevel',
            'dyslexiaFont',
            'grayscale',
            'highContrast',
            'hideImages',
            'applyFunctions',
            'settings',
            'init',
            'toggleSetting'
          ]
        }
      }
    }),
    copy({
      targets: [
        { src: 'fonts/**/*', dest: 'dist/fonts' },
        { src: 'src/styles.css', dest: 'dist', rename: 'tabler-a11y.min.css' }
      ]
    })
  ]
};