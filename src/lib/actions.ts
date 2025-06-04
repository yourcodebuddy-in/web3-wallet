import { z } from "zod";

export async function handleError(error: unknown) {
  if (error instanceof z.ZodError) {
    throw new Error(error.message ?? "Invalid payload");
  }

  throw new Error(String(error));
}
