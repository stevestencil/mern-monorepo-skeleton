// Flat ESLint config for ESLint v9+
// Applies to all workspaces (apps and packages)
import tseslint from 'typescript-eslint';
import pluginImportX from 'eslint-plugin-import-x';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  // Type-aware configs per workspace tsconfig
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Let typescript-eslint locate the nearest tsconfig per file (monorepo-friendly)
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': pluginImportX,
    },
    rules: {
      // Place shared repo rules here; prettier handled by tooling
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      // These can be noisy with schema builders like Zod; rely on TS strictness instead
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/order': 'off',
    },
  },
];
