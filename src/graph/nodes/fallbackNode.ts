import { AIMessage } from 'langchain';

import { type GraphState } from '@/graph/graph';

export function fallbackNode(state: GraphState): GraphState {
  const message =
    "Comando não identificado, tente algo como 'registrar gasto de 10 reais' ou 'cadastrar gasto de 10 reais'";
  const fallbackMessage = new AIMessage(message).content.toString();

  return {
    ...state,
    output: fallbackMessage,
    messages: [...state.messages],
  };
}
