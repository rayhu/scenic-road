export const PROVIDERS = {
  OPENAI: "OpenAI",
  ANTHROPIC: "Anthropic",
  GOOGLE: "Google",
};

export const DEFAULT_PROVIDER = PROVIDERS.OPENAI;
export type ProviderType = keyof typeof PROVIDERS;
