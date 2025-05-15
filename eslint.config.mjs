import { fixupConfigRules } from "@eslint/compat";
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintParser from '@typescript-eslint/parser'
import eslintSecurity from 'eslint-plugin-security'
import importHelpers from 'eslint-plugin-import-helpers'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const patchedConfig = fixupConfigRules([
  ...compat.extends(
    'next/typescript',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ),
]);

export default defineConfig([
  ...patchedConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: eslintParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      'import-helpers': importHelpers,
      security: eslintSecurity,
    },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['warn', 'always'],

      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
      'react/display-name': 'off',
      'react/prop-types': 'off',

      'import-helpers/order-imports': [
        'error',
        {
          newlinesBetween: 'always',
          groups: ['/^react/', 'module', '/^@/', ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],

      // Prettier
      'prettier/prettier': 'warn',

      // Security plugin (manual rules)
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-child-process': 'error',
      'security/detect-unsafe-regex': 'warn',
      // outras regras podem ser ativadas conforme necessidade
    },
  },
  globalIgnores([
    'node_modules',
    '.next/',
    'public/',
    '.vscode/',
    '**/src/styles/globals.css',
    'eslint.config.mjs',
  ]),
])
