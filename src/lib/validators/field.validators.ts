import { z } from "zod";

export const usernameSchema = z.string().min(1, "user name is required");

export const passwordSchema = z.string().min(1, "password is required");
