import { buildApp } from '@/app';
import { env } from '@/config/env';

async function bootstrap() {
  const app = await buildApp();

  try {
    await app.listen({
      port: Number(env.PORT) || 3000,
      host: env.HOST || '0.0.0.0',
    });
  } catch (error) {
    app.log.error(error, 'falha ao inicializar');
    process.exit(1);
  }
}

void bootstrap();
