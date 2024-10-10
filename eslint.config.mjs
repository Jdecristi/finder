import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";

const includedFiles = ["**/*.{cjs,mjs,ts,tsx}"];

const typescriptConfig = [
  {
    files: includedFiles,
    plugins: { typescript: tsPlugin },
    rules: {
      "typescript/no-unused-vars": "error",
      "typescript/no-explicit-any": "error",
    },
  },
];

const reactConfig = [
  {
    files: includedFiles,
    plugins: {
      react: reactPlugin,
      react_hooks: reactHooksPlugin,
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react_hooks/rules-of-hooks": "error",
      "react_hooks/exhaustive-deps": "warn",
    },
  },
];

const importConfig = [
  {
    files: includedFiles,
    plugins: {
      import: importPlugin,
      simple_import_sort: simpleImportSortPlugin,
    },
    rules: {
      "import/no-unresolved": ["error", { ignore: ["^@env$"] }],
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-default-export": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "simple_import_sort/imports": [
        "error",
        {
          groups: [
            // External Packages
            ["^@?\\w"],

            // Internal Packages
            ["^(@/)"],

            // Relative Imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

            // Style/JSON Imports
            ["^.+\\.?(css)$", "^.+\\.?(json)$"],

            // Import Types
            ["^@?\\w.*\\u0000$", "^[^.].*\\u0000$", "^\\..*\\u0000$"],
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  // Override "no-default-export"
  {
    files: ["*.config.mjs", "app/**/*.tsx"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-default-export": "off",
    },
  },
];

const config = [
  js.configs.recommended,
  {
    ignores: ["**/node_modules", "**/dist"],
  },
  {
    files: includedFiles,
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // General Rules
      "no-unused-expressions": "error",

      // Prettier Rules
      "prettier/prettier": "error",
    },
  },
  ...typescriptConfig,
  ...importConfig,
  ...reactConfig,
];

export default config;
