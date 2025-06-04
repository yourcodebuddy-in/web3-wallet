import z from "zod";

const envSchema = z.object({
  SOLANA_RPC_URL: z.string(),
  ETHEREUM_RPC_URL: z.string(),
  ALCHEMY_API_KEY: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
