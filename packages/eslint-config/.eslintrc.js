module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb", "prettier", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-props-no-spreading": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "no-bitwise": "off",
    "no-unused-vars": "off",
    "no-shadow": "off",
    "react/require-default-props": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:react/recommended"],
      plugins: ["@typescript-eslint"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-shadow": "error",
      },
    },
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["**/node_modules/**", "**/*.d.ts", "**/dist/**"],
};
