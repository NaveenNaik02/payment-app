import { AxiosError } from "axios";
import { inject, injectable } from "inversify";
import type { OrderSchema } from "@/features/order/schema";
import { TYPES } from "@/constants";
import type {
  CartWithLineItems,
  IHttpClient,
  IOrderService,
} from "../interfaces";

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

  async getCart(): Promise<CartWithLineItems> {
    try {
      const response = await this.httpClient.get<CartWithLineItems>(
        `${this.BASE_URL}/cart`
      );
      return response;
    } catch (error) {
      const errorMessage = "error while fetching cart items";
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data || errorMessage);
      }
      throw new Error(errorMessage);
    }
  }
}
