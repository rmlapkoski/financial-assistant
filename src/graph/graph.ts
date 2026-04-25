import { END, MessagesZodMeta, START, StateGraph } from '@langchain/langgraph';
import { withLangGraph } from '@langchain/langgraph/zod';
import { BaseMessage } from 'langchain';
import z from 'zod';

import { chatResponseNode } from '@/graph/nodes/chatResponseNode';
import { fallbackNode } from '@/graph/nodes/fallbackNode';
import { identifyIntent } from '@/graph/nodes/identifyIntentNode';
import { registerTransactionNode } from '@/graph/nodes/registerTransactionNode';
import { OpenRouterService } from '@/services/openRouterService';

const GraphState = z.object({
  messages: withLangGraph(z.custom<BaseMessage[]>(), MessagesZodMeta),
  intent: z.enum(['register', 'unknown']),
  actionSuccess: z.boolean().optional(),
  actionError: z.boolean().optional(),

  error: z.string().optional(),
});

export type GraphState = z.infer<typeof GraphState>;

export function buildFinancialAssistantGraph(llmCLient: OpenRouterService) {
  const workflow = new StateGraph({
    stateSchema: GraphState,
  })
    .addNode('identifyIntent', identifyIntent(llmCLient))
    .addNode('registerTransaction', registerTransactionNode)
    .addNode('fallback', fallbackNode)
    .addNode('chatResponse', chatResponseNode)

    .addEdge(START, 'identifyIntent')
    .addConditionalEdges(
      'identifyIntent',
      (state: GraphState) => {
        if (state.error || !state.intent || state.intent === 'unknown') {
          return 'fallback';
        }

        return state.intent;
      },
      {
        register: 'registerTransaction',
        fallback: 'fallback',
      },
    )
    .addEdge('registerTransaction', 'chatResponse')
    .addEdge('fallback', 'chatResponse')
    .addEdge('chatResponse', END);

  return workflow.compile();
}
