import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { ChatController } from '@/controllers/chat.controller';
import { chatSchema } from '@/schemas/chat.schema';

export async function chatRoutes(app: FastifyInstance) {
  const controller = new ChatController();

  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Chat'],
        summary: 'Criar uma interação com o chat',
        body: chatSchema,
      },
    },
    async (request, reply) =>
      await controller.handleInteraction(request, reply),
  );
}
