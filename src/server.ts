import { buildApp } from '@/app';
import { env } from '@/config/env';

async function bootstrap() {
  const app = await buildApp();

  try {
    await app.listen({
      port: env.PORT,
      host: env.HOST,
    });
  } catch (error) {
    app.log.error(error, 'falha ao inicializar');
    process.exit(1);
  }
}

void bootstrap();
