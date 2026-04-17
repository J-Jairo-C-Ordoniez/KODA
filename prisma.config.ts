import 'dotenv/config'
import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: './src/infrastructure/db/schema/schema.prisma',
  migrations: {
    seed: 'npx ts-node --transpile-only src/infrastructure/db/seed.ts'
  },
  datasource: {
    url: process.env.DATABASE_URL
  }
})
