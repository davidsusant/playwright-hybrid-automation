import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import playwrightPlugin from "eslint-plugin-playwright";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["dist", "node_modules", "playwright-report", "test-results"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      playwright: playwrightPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...playwrightPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "playwright/no-skipped-test": "warn",
      "playwright/expect-expect": "error",
    },
  },
];
