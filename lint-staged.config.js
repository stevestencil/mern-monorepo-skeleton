module.exports = {
  '**/*.{ts,tsx,js,jsx,json,css,md}': ['prettier --write'],
  // Run ESLint only on TypeScript files to avoid applying TS-typed rules to JS config files
  '**/*.{ts,tsx}': ['eslint --fix'],
};
