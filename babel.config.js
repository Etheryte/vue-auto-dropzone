module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    // See: https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/
    // Manual polyfills are covered by Vue's defaults, see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app#polyfills
    plugins: ['@babel/plugin-syntax-dynamic-import'],
    // We need to import different types for build tests
    // See also: https://babeljs.io/docs/en/options#misc-options
    'sourceType': process.env.NODE_ENV === 'test' ? 'unambiguous' : 'module',
};
