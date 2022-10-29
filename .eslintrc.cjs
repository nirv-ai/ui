module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    jsxPragma: "null",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "warn",
  },
};
