module.exports = {
  extends: [
    'prettier',
    'turbo',
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended-type-checked',
    // TODO: check
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/build/**/*.js', '**/.eslintrc.*'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // Add some rules that will be applied GLOBALY for all packages using this eslint-config package
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
  ],
};
