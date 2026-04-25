import { buildFinancialAssistantGraph } from '@/graph/graph';
import { OpenRouterService } from '@/services/openRouterService';

export function buildGraph() {
  const llmClient = new OpenRouterService();
  return buildFinancialAssistantGraph(llmClient);
}

export const graph = async () => {
  return buildGraph();
};
