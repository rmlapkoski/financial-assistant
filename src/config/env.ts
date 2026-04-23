import 'dotenv/config';
import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().int().min(1).default(3333),
  HOST: z.string().default('0.0.0.0'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables', parsedEnv.error.issues);
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
