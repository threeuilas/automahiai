import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'off', // TypeScript handles this
      'no-console': 'warn', // Warn about console statements
      'no-debugger': 'error', // Error on debugger statements
      'eqeqeq': ['error', 'always'], // Require === and !==
      'curly': ['error', 'all'], // Require curly braces for all control statements
      'no-trailing-spaces': 'error', // No trailing whitespace
      'eol-last': 'error', // Require newline at end of file
      'comma-dangle': ['error', 'always-multiline'], // Require trailing commas in multiline
      'quotes': ['error', 'single', { 'avoidEscape': true }], // Prefer single quotes
      'semi': ['error', 'always'], // Require semicolons
    },
  },
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'build/',
      'dist/',
      '*.min.js',
      '*.bundle.js',
      'coverage/',
      '.env*',
      'next-env.d.ts', // Ignore Next.js generated types
    ],
  },
];
