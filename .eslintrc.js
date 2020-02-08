module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential'],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    import: 0,

    // When there is only a single export from a module, prefer using default export over named export.
    'import/prefer-default-export': 0,

    // A list of file extensions that will be parsed as modules and inspected for exports.
    'import/extensions': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  ecmaFeatures: {
    legacyDecorators: true,
  },
}
