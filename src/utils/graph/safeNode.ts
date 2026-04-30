import { type GraphState } from '@/graph/graph';

type NodeFunction = (
  state: GraphState,
) => Promise<Partial<GraphState>> | Partial<GraphState>;

export function safeNode(nodeFn: NodeFunction) {
  return async (state: GraphState): Promise<Partial<GraphState>> => {
    try {
      return await nodeFn(state);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred in node';

      return {
        error: errorMessage,
        intent: 'unknown',
        actionError: errorMessage,
      };
    }
  };
}
