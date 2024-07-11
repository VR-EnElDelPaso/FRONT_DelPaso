// Desc: Types for config module
export interface EnvConfig {
  env: Environment;
  apiBaseUrl: string;  
}

export type Environment = "development" | "production" | "test";