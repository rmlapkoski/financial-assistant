import type { FastifyReply, FastifyRequest } from 'fastify';
import { chatSchema } from '@/schemas/chat.schema';

export class ChatController {
  handleInteraction = async (request: FastifyRequest, reply: FastifyReply) => {
    const data = chatSchema.parse(request.body);

    return reply.status(201).send(data);
  };
}
