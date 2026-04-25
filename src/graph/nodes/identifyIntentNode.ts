import { type GraphState } from '@/graph/graph';
import {
  getSystemPrompt,
  getUserPromptTemplate,
  IntentSchema,
} from '@/prompts/identifyIntent';
import { OpenRouterService } from '@/services/openRouterService';

export function identifyIntent(llmCLient: OpenRouterService) {
  return async (state: GraphState): Promise<Partial<GraphState>> => {
    const input = state.messages.at(-1)!.text;

    try {
      const systemPrompt = getSystemPrompt();
      const userPrompt = getUserPromptTemplate(input);
      const result = await llmCLient.generateStructured(
        systemPrompt,
        userPrompt,
        IntentSchema,
      );
      if (!result.success) {
        return {
          intent: 'unknown',
          error: result.error,
        };
      }

      const intentData = result.data!;

      return {
        ...intentData,
      };
    } catch (error) {
      return {
        ...state,
        intent: 'unknown',
        error:
          error instanceof Error
            ? error.message
            : 'Intent identification failed',
      };
    }
  };
}
