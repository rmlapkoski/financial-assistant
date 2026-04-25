import { AIMessage } from 'langchain';
import { type GraphState } from '@/graph/graph';

export async function chatResponseNode(
  state: GraphState,
): Promise<Partial<GraphState>> {
  return {
    messages: [...state.messages, new AIMessage(state.intent!)],
  };
}
