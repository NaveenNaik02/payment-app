import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "email is required")
  .email("please enter valid email");

export const passwordSchema = z.string().min(1, "password is required");

export const productId = z.string().min(1, "please select item");

export const quantity = z.number();
