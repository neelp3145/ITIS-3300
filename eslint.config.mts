// eslint.config.mjs
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

// Merging recommended rules manually
const recommendedRules = {
  ...tseslint.configs.recommended.rules,
  "@typescript-eslint/no-unused-vars": "warn",
  "no-console": process.env.NODE_ENV === 'development' ? "off" : "warn",
  semi: ["error", "always"],
  quotes: ["error", "double"],
  "prettier/prettier": "error",
};

export default {
  files: ["**/*.ts", "**/*.tsx"],
  
  languageOptions: {
    parser: tsparser,
    sourceType: "module",
  },

  plugins: {
    "@typescript-eslint": tseslint,
    prettier: prettierPlugin,
  },

  ignores: ["node_modules/", "build/", ".next/"],

  rules: recommendedRules,
};
