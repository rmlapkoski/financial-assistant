import z from 'zod';

export const IntentSchema = z.object({
  intent: z.enum(['register', 'unknown']).describe('Intenção do usuário'),
});

export type IntentData = z.infer<typeof IntentSchema>;

export const getSystemPrompt = () => {
  return JSON.stringify({
    role: 'Intent classifier for transactions',
    task: 'Identify user intent',
    output_format: {
      rule: 'You MUST return ONLY a valid JSON',
      schema: {
        intent: ['register', 'unknown'],
      },
      constraints: [
        'DO NOT create new intents',
        'DO NOT return values outside the enum',
        'If unsure, return "unknown"',
        'Single-word or generic inputs MUST be classified as "unknown"',
        'If the message does not clearly express an action (e.g., create, delete, update), return "unknown"',
      ],
    },
    rules: {
      register: {
        description: 'Register a new transaction',
        keywords: ['register', 'new', 'release', 'add'],
        rules: [
          'If no keyword is found, the intent MUST be "unknown".',
          'The intent "register" MUST only be used when the user explicitly indicates an action (e.g., "register", "add", "create")',
        ],
      },
      unknown: {
        description: 'Unknown intent',
        examples: [
          'weather questions',
          'generate info',
          'unrelated queries',
          'general conversation',
          'random words',
        ],
        rules: [
          'If the message is a single word with no clear action, return "unknown"',
          'Random or generic words MUST be classified as "unknown"',
          'Vague terms without explicit intent are "unknown"',
        ],
      },
    },
    examples: [
      {
        input: 'I want to register a transaction of R$28.88 for credit card',
        output: {
          intent: 'register',
        },
      },
      {
        input: 'add transaction',
        output: { intent: 'register' },
      },
      {
        input: 'register R$50,00',
        output: { intent: 'register' },
      },
      {
        input: 'register a transaction for credit card',
        ouput: { intent: 'register' },
      },
      {
        input: 'What is the weather today?',
        output: { intent: 'unknown' },
      },
      {
        input: 'Whats your name?',
        output: { intent: 'unknown' },
      },
      {
        input: 'aleatory',
        output: { intent: 'unknown' },
      },
      {
        input: 'hello',
        output: { intent: 'unknown' },
      },
      {
        input: 'test',
        output: { intent: 'unknown' },
      },
    ],
  });
};

export const getUserPromptTemplate = (message: string) => {
  return JSON.stringify({
    message,
    instructions: ['Carefully analyze the message', 'Determine the intent'],
  });
};
