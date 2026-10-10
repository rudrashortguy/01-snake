export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        performance: 'readonly'
      }
    }
  },
  {
    ignores: ['node_modules/**', 'coverage/**']
  }
];
