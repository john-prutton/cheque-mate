import "dotenv/config"

import { defineConfig } from "drizzle-kit"

console.log(process.env.DATABASE_URL)

export default defineConfig({
  schema: "./src/lib/db/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./db.sqlite"
  },
  verbose: true,
  strict: true
})
