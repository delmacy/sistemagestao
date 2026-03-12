
import type { Config } from "drizzle-kit";

/**
 * Usar 'satisfies Config' é mais seguro quando o compilador 
 * tem problemas para encontrar o 'defineConfig'.
 */
export default {
  schema: "./src/db/schema/*.ts",
  out: "./drizzle",
  driver: "postgresql",
  schemaFilter: ["auth", "workforce", "infra"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;