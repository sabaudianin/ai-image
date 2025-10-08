import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Write your email"),
});

export type EmailInput = z.infer<typeof emailSchema>;
