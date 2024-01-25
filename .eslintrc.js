module.exports = {
  root: true,
  env: {
    browser: true,
    mocha: true,
    node: true,
    es6: true,
    commonjs: true
  },
  extends: [
    'eslint:recommended'
  ],
  globals: {
    ClipboardJS: true,
    window: true,
    document: true,
    alert: true,
  },
  plugins: [
    '@typescript-eslint/eslint-plugin', // 加载插件，使其对代码进行处理
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // "requireConfigFile": false,
    project: "./tsconfig.json",
    sourceType: 'module',
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    ecmaVersion: 2022
  },
  rules: {
    'max-len': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': 2,
    'no-var': 2,
    'no-console': [2, { allow: ['info'] }],
    quotes: [2, 'single'], // Strings must use singlequote.
    '@typescript-eslint/naming-convention': 2,
    /**
     * 使用 2 个空格缩进，跟公司规则保持，修改为error自动修复
     */
    'indent': ['error',2],
  },
};
