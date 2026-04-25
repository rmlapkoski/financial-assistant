import type { FastifyReply, FastifyRequest } from 'fastify';
import { HumanMessage } from 'langchain';

import { chatSchema } from '@/schemas/chat.schema';
import { buildGraph } from '@/graph/factory';

export class ChatController {
  private graph = buildGraph();

  handleInteraction = async (request: FastifyRequest, reply: FastifyReply) => {
    const data = chatSchema.parse(request.body);

    const result = await this.graph.invoke({
      messages: [new HumanMessage({ content: data.message })],
    });

    return reply.status(200).send(result.intent);
  };
}
