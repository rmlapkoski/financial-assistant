import { type GraphState } from '../graph';

export function registerTransactionNode(state: GraphState): GraphState {
  return {
    ...state,
    output: 'registrar transação',
  };
}
