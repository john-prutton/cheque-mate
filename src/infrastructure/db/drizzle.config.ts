import { join } from "path"

import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" })

export default defineConfig({
  schema: join(__dirname, "schema", "index.ts").replaceAll("\\", "/"),
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true
})
