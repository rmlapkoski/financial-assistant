import { END, MessagesZodMeta, START, StateGraph } from '@langchain/langgraph';
import { withLangGraph } from '@langchain/langgraph/zod';
import { BaseMessage } from 'langchain';
import z from 'zod';

import { chatResponseNode } from '@/graph/nodes/chatResponseNode';
import { fallbackNode } from '@/graph/nodes/fallbackNode';
import { identifyIntent } from '@/graph/nodes/identifyIntentNode';
import { registerTransactionNode } from '@/graph/nodes/registerTransactionNode';

const GraphState = z.object({
  messages: withLangGraph(z.custom<BaseMessage[]>(), MessagesZodMeta),
  output: z.string(),
  command: z.enum(['register', 'unknown']),
});

export type GraphState = z.infer<typeof GraphState>;

export function buildGraph() {
  const workflow = new StateGraph({
    stateSchema: GraphState,
  })
    .addNode('identifyIntent', identifyIntent)
    .addNode('registerTransaction', registerTransactionNode)
    .addNode('fallback', fallbackNode)
    .addNode('chatResponse', chatResponseNode)

    .addEdge(START, 'identifyIntent')
    .addConditionalEdges(
      'identifyIntent',
      (state: GraphState) => {
        switch (state.command) {
          case 'register':
            return 'registerTransaction';
          default:
            return 'fallback';
        }
      },
      {
        registerTransaction: 'registerTransaction',
        fallback: 'fallback',
      },
    )
    .addEdge('registerTransaction', 'chatResponse')
    .addEdge('fallback', 'chatResponse')
    .addEdge('chatResponse', END);

  return workflow.compile();
}
