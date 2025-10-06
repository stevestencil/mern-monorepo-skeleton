import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import base from '../../eslint.config.mjs';

export default [
  // Inherit shared monorepo rules (type-aware, strict, import-x, etc.)
  ...base,
  // App-specific ignores
  { ignores: ['dist'] },
  // Browser globals and React-specific rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
];
