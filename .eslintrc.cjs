/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended', 
    "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended',
    "plugin:react-hooks/recommended"
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    'max-len': ["error", { "code": 120 }],
    '@typescript-eslint/no-explicit-any': 'off',
    'react/self-closing-comp': ['error', {
      component: true,
      html: true,
    }],
    'react/jsx-max-props-per-line': [2, { maximum: { single: 2, multi: 1 } }],
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  },
};