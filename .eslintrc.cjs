/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended', 
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@emotion', 'import'],
  root: true,
  rules: {
    indent: ['error', 2],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'object-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-multi-spaces': 'error',
    semi: ['error', 'always'],
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'external',
            'position': 'before',
          },
          {
            'pattern': 'shared/**',
            'group': 'internal',
            'position': 'after',
          },
          {
            'pattern': 'desktop/**',
            'group': 'internal',
            'position': 'after',
          },
          {
            'pattern': 'mobile/**',
            'group': 'internal',
            'position': 'after',
          },
          // Добавьте другие паттерны, если необходимо
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
      },
    ],
    'max-len': ['error', { 'code': 120 }],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      args: 'all',
      caughtErrors: 'none',
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_',
      vars: 'all',
    }],
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
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-tag-spacing': ['error', {
      'beforeClosing': 'never',
    }],
  },
};