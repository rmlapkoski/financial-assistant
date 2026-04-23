import { type GraphState } from '@/graph/graph';

export function identifyIntent(state: GraphState): GraphState {
  const input = state.messages.at(-1)?.text ?? '';
  const inputLower = input.toLowerCase();

  let command: GraphState['command'] = 'unknown';

  if (inputLower.includes('registrar') || inputLower.includes('cadastrar')) {
    command = 'register';
  }

  return {
    ...state,
    command,
    output: input,
  };
}
