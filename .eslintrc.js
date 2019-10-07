module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
  ],
  rules: {
    'indent': ['error', 4],
    'no-console': 'off',
    'no-new-func': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/comment-directive': 'off',
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'array-bracket-spacing': ['error', 'never', { 'objectsInArrays': false }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        mocha: true
      }
    }
  ]
};
