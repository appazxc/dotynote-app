/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended', 
    "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    'max-len': ["error", { "code": 100 }],
    '@typescript-eslint/no-explicit-any': 'off',
    'react/self-closing-comp': ['error', {
      component: true,
      html: true,
    }],
    'react/display-name': 'off'
  },
};