import { z } from "zod";
import { passwordSchema, usernameSchema } from "../../../lib";

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
