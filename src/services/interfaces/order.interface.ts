import type { OrderSchema } from "@/features/order/schema";

export interface IOrderService {
  createCart(payload: OrderSchema): Promise<unknown>;
}
