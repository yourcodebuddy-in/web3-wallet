import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";

const compat = new FlatCompat({});

const config = [
  js.configs.recommended,
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("next/typescript"),
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("plugin:@next/next/recommended"),
  {
    ignores: [".next/", ".husky/", ".vscode/", ".public/", "src/components/ui/**/*"],
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    plugins: {
      react,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "react/no-array-index-key": ["error"],
      "react/button-has-type": ["error"],
      "react/checked-requires-onchange-or-readonly": ["error"],
      "react/hook-use-state": ["error"],
      "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary", "coerce"] }],
      "react/jsx-max-depth": ["error", { max: 5 }],
      "react/prefer-stateless-function": "error",
      "react/no-children-prop": "error",
      "react/no-danger": "error",
      "react/no-unused-prop-types": "error",
      "react/jsx-pascal-case": "error",
      "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
      "react/jsx-fragments": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-curly-brace-presence": "warn",
      "react/self-closing-comp": "warn",
      "react/no-typos": "warn",
      "react/react-in-jsx-scope": "off",
      "react/destructuring-assignment": ["error", "always", { destructureInSignature: "always" }],
      "react/boolean-prop-naming": [
        "error",
        {
          rule: "^(is|has)[A-Z]([A-Za-z0-9]?)+",
        },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "function-expression",
        },
      ],
      "react/jsx-no-bind": [
        "error",
        {
          ignoreDOMComponents: false,
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowFunctions: true,
          allowBind: false,
        },
      ],
    },
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    plugins: {
      boundaries: boundaries,
    },
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/components/**/*",
            "src/data/**/*",
            "src/database/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/utils/**/*",
            "src/types/**/*",
          ],
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
        },
      ],
    },
    rules: {
      "boundaries/no-unknown": ["error"],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: ["shared"],
              allow: ["shared", "feature"],
            },
            {
              from: ["feature"],
              allow: ["shared", ["feature", { featureName: "${from.featureName}" }]],
            },
            {
              from: ["app"],
              allow: ["shared", "feature"],
            },
            {
              from: ["app"],
              allow: [["app", { fileName: "*.css" }]],
            },
          ],
        },
      ],
    },
  },
];

export default config;
