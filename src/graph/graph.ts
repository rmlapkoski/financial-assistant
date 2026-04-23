import z from 'zod';
import { withLangGraph } from '@langchain/langgraph/zod';
import { BaseMessage } from 'langchain';
import { END, MessagesZodMeta, START, StateGraph } from '@langchain/langgraph';
import { identifyIntent } from './nodes/identifyIntentNode';
import { chatResponseNode } from './nodes/chatResponseNode';
import { registerTransactionNode } from './nodes/registerTransactionNode';
import { fallbackNode } from './nodes/fallbackNode';

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
