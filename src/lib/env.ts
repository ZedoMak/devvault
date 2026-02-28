import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const env = envSchema.safeParse(process.env)
  
  if (!env.success) {
    console.error('❌ Invalid environment variables:')
    console.error(env.error.format())
    process.exit(1)
  }
  
  return env.data
}

export const env = validateEnv()
