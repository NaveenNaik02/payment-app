import type { OrderSchema } from "@/features/order/schema";
import type { IHttpClient, IOrderService } from "../interfaces";
import { inject, injectable } from "inversify";
import { TYPES } from "@/constants";
import { AxiosError } from "axios";

@injectable()
export class OrderService implements IOrderService {
  private readonly BASE_URL = "http://localhost:8001";

  constructor(@inject(TYPES.HttpClient) private httpClient: IHttpClient) {}

  async createCart(payload: OrderSchema): Promise<unknown> {
    try {
      const response = await this.httpClient.post(`${this.BASE_URL}/cart`, {
        qty: payload.qty,
        productId: Number(payload.productId),
      });
      return response;
    } catch (error) {
      const errorMessage = "error while adding item to cart";

      if (error instanceof AxiosError) {
        throw new Error(error.response?.data || errorMessage);
      }
      throw new Error(errorMessage);
    }
  }
}
