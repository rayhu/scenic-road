export const PROVIDERS = {
  OPENAI: "OpenAI",
  ANTHROPIC: "Anthropic",
  GOOGLE: "Google",
};

export type ProviderType = keyof typeof PROVIDERS;
