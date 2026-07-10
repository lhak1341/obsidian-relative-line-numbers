import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";

export default defineConfig([
  {
    ignores: ["main.js", "node_modules/**"],
  },
  ...obsidianmd.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: { project: "./tsconfig.json" },
    },
  },
  {
    files: ["*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // build tooling, not shipped plugin code — never runs in Obsidian
      "obsidianmd/no-nodejs-modules": "off",
    },
  },
]);
