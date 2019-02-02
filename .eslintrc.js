module.exports = {
  parser: "babel-eslint",
  extends: [
    "standard",
    "standard-jsx",
    "plugin:react/recommended",
    "prettier/react",
    "prettier-standard"
  ],
  plugins: ["react", "prettier"],
  settings: {
    react: {
      version: "16"
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
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      generators: true
    }
  },
  globals: { fixture: true, FS: true },
  rules: {
    // complexity: ['warn', { max: 7 }],
    "prettier/prettier": "error",
    "react/jsx-sort-props": 0,
    "react/prop-types": "warn",
    "react/jsx-no-bind": 0,
    "react/jsx-handler-names": "warn",
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true
      }
    ]
  }
};
