export default {
  '**/*.{ts,tsx,js,jsx,json,css,md}': ['prettier --write'],
  '**/*.{ts,tsx,js,jsx}': ['eslint --fix']
};