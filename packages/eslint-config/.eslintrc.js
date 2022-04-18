module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb", "prettier"],
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
    "no-use-before-define": "off",
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
      },
    },
  ],
  ignorePatterns: ["**/node_modules/**", "**/*.d.ts"],
};
