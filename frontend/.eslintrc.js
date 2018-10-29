module.exports = {
  parser: 'babel-eslint',
  extends: [
    // 'standard',
    'standard-jsx',
    'plugin:react/recommended',
    'prettier/react',
    'prettier/standard'
  ],
  plugins: ['react'],
  settings: {
    react: {
      version: '16'
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true
    }
  },
  rules: {
    complexity: ['warn', { max: 7 }],
    'react/jsx-sort-props': 0,
    'react/jsx-handler-names': 'warn',
    'react/jsx-no-bind': 'warn',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true
      }
    ]
  }
}
