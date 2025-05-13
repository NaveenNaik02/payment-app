import type { OrderSchema } from "@/features/order/schema";

export interface IOrderService {
  createCart(payload: OrderSchema): Promise<unknown>;
  getCart(): Promise<CartWithLineItems>;
}

export interface CartLineItem {
  id: number;
  productId: number;
  itemName: string;
  price: string;
  qty: number;
  variant: string | null;
  createdAt: Date;
  updatedAt: Date;
  availability?: number;
}

export interface CartWithLineItems {
  id: number;
  customerId: number;
  lineItems: CartLineItem[];
  createdAt: Date;
  updatedAt: Date;
}
