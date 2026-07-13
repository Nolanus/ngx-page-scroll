// @ts-check
import tseslint from "typescript-eslint";
import angular from "angular-eslint";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: [
          "tsconfig.json",
          "projects/*/tsconfig.lib.json",
          "projects/*/tsconfig.spec.json",
          "tsconfig.app.json",
          "tsconfig.spec.json"
        ],
      },
    },
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "ngx",
          style: "kebab-case",
          type: "element",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "ngx",
          style: "camelCase",
          type: "attribute",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);