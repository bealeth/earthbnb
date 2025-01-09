import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Configuración base
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Desactivar regla específica
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Desactivar la regla de 'any'
      "@typescript-eslint/no-unused-vars": "off" // Desactivar regla para variables no usadas
    }
  },
];

export default eslintConfig;
