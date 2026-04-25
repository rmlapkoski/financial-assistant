import { type GraphState } from '@/graph/graph';

export function registerTransactionNode(state: GraphState): GraphState {
  return {
    ...state,
    actionSuccess: true,
  };
}
