import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin'; // 👈 5
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  pluginCypress.configs.recommended,
  { ignores: ['dist'] }, // 👈 1
  {
    files: ['**/*.{js,jsx}'], // 👈 2
    languageOptions: {
      // 👇 3
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } }, // 👈 3
    plugins: {
      // 👇 4
  
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic, // 👈 6
    },
    rules: {
      ...js.configs.recommended.rules, // 👈 7
      ...react.configs.recommended.rules, // 👈 7
      ...react.configs['jsx-runtime'].rules, // 👈 7
      ...reactHooks.configs.recommended.rules, // 👈 7
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 👇 8
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/no-tabs': ['error'],
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          tabWidth: 2,
        },
      ],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      '@stylistic/no-inner-declarations': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
    },
  },
];
