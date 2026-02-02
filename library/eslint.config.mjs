import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      tailwindcss: tailwind,
    },
    rules: {
      ...tailwind.configs.recommended.rules,
      "no-undef": "off",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
