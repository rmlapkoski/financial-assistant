import z from 'zod';

export const IntentSchema = z.object({
  intent: z.enum(['register', 'unknown']).describe('Intenção do usuário'),
});

export type IntentData = z.infer<typeof IntentSchema>;

export const getSystemPrompt = () => {
  return JSON.stringify({
    role: 'Intent classifier for transactions',
    task: 'Identify user intent',
    rules: {
      register: {
        description: 'Register a new transaction',
        keywords: [
          'registrar',
          'cadastrar',
          'novo',
          'nova',
          'lançamento',
          'lançar',
          'adicionar',
        ],
      },
      unknown: {
        description: 'Unknown intent',
        examples: [
          'weather questions',
          'generate info',
          'unrelated queries',
          'general conversation',
        ],
      },
    },
  });
};

export const getUserPromptTemplate = (message: string) => {
  return JSON.stringify({
    message,
    instructions: [
      'Carefully analyze the question to determine the user intent',
      'Extract all relevant transaction details',
      'Return only the fields that are present in the question',
    ],
  });
};
