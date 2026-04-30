import { AIMessage } from 'langchain';

import { type GraphState } from '@/graph/graph';
import { OpenRouterService } from '@/services/openRouterService';

export function chatResponseNode(llmClient: OpenRouterService) {
  return async (state: GraphState): Promise<Partial<GraphState>> => {
    return {
      messages: [new AIMessage(state.intent)],
    };
  };
}
