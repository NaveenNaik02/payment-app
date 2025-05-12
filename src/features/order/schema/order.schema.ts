import { z } from "zod";
import { productId, quantity } from "@/lib";

export const orderSchema = z.object({
  productId: productId,
  qty: quantity,
});

export type OrderSchema = z.infer<typeof orderSchema>;
