import { env } from '@/config/env';
import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

const server =
  env.NODE_ENV === 'production'
    ? {
        url: 'https://financial-assistant-vclb.onrender.com',
        description: 'Servidor Render',
      }
    : {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor Local',
      };

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: 'Finance Control API',
      description: 'API para controle de finanças pessoais',
      version: '1.0.0',
    },
    servers: [server],
  },
  transform: jsonSchemaTransform,
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
};
