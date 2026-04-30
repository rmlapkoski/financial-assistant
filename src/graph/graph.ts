import { END, MessagesZodMeta, START, StateGraph } from '@langchain/langgraph';
import { withLangGraph } from '@langchain/langgraph/zod';
import { BaseMessage } from 'langchain';
import z from 'zod';

import { chatResponseNode } from '@/graph/nodes/chatResponseNode';
import { identifyIntent } from '@/graph/nodes/identifyIntentNode';
import { OpenRouterService } from '@/services/openRouterService';
import { safeNode } from '@/utils/graph/safeNode';

const AppointmentStateAnnotation = z.object({
  messages: withLangGraph(z.custom<BaseMessage[]>(), MessagesZodMeta),
  intent: z.enum(['register', 'unknown']),
});

export type GraphState = z.infer<typeof AppointmentStateAnnotation>;

export function buildFinancialAssistantGraph(llmCLient: OpenRouterService) {
  const workflow = new StateGraph({
    stateSchema: AppointmentStateAnnotation,
  })
    .addNode('identifyIntent', safeNode(identifyIntent(llmCLient)))
    .addNode('chatResponse', safeNode(chatResponseNode(llmCLient)))

    .addEdge(START, 'identifyIntent')
    .addEdge('identifyIntent', 'chatResponse')
    .addEdge('chatResponse', END);

  return workflow.compile();
}
