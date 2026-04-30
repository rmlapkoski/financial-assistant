import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { swaggerOptions, swaggerUiOptions } from '@/config/swagger';
import { chatRoutes } from '@/routes/chat.router';

export async function buildApp() {
  const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler((error, request, reply) => {
    app.log.error(error as Error);

    const fastifyError = error as { validation?: any; statusCode?: number };

    if (fastifyError.validation) {
      return reply.status(400).send({
        message: 'Erro de validação',
        errors: fastifyError.validation,
      });
    }

    const typedError = error as Error & { statusCode?: number };

    return reply.status(typedError.statusCode || 500).send({
      message: typedError.message || 'Erro interno do servidor',
    });
  });

  await app.register(cors, { origin: true });

  await app.register(swagger, swaggerOptions);
  await app.register(swaggerUi, swaggerUiOptions);

  app.get('/', { schema: { hide: true } }, async (_, reply) => {
    return reply.redirect('/docs');
  });

  app.register(chatRoutes, { prefix: '/chat' });

  return app;
}
