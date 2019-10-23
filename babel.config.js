module.exports = {
    presets: ['@vue/app'],
    // We need to import different types for build tests
    // See also: https://babeljs.io/docs/en/options#misc-options
    'sourceType': process.env.NODE_ENV === 'test' ? 'unambiguous' : 'module',
};
