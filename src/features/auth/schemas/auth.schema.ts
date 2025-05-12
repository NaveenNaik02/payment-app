import { z } from "zod";
import { passwordSchema, emailSchema } from "@/lib";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
