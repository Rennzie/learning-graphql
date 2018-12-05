module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: ['plugin:prettier/recommended', 'airbnb-base'],
  plugins: ['import', 'prettier'],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
};
