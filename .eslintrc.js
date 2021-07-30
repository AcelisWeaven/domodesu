module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // 'airbnb-typescript' requires dev dependencies we don't need, this will be fixed in the future
  // --> Packages: eslint-plugin-jsx-a11y / eslint-plugin-react@^7.20.3 / eslint-plugin-react-hooks
  extends: ['airbnb-typescript', 'plugin:nuxt/recommended', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: [],
  // Add your custom rules here
  rules: {},
  settings: {
    // Needed because of 'airbnb-typescript', see above comment
    react: {
      version: '999.999.999',
    },
  },
}
