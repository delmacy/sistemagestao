import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Se o seu editor não reconhece 'dialect', certifique-se de que 
 * rodou 'npm install' recentemente. O CLI do drizzle-kit 0.21+ 
 * exige 'dialect' e 'dbCredentials'.
 */
export default {
  schema: "./src/db/schema/**/*.ts",
  out: "./drizzle",
  dialect: "postgresql", // Nas versões novas, 'dialect' substitui o antigo 'driver'
  schemaFilter: ["auth"],
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;