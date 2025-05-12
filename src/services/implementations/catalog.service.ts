import { inject, injectable } from "inversify";
import type { IHttpClient, Product, ICatalogService } from "../interfaces";
import { TYPES } from "@/constants";
import { AxiosError } from "axios";

@injectable()
export class CatalogService implements ICatalogService {
  private readonly BASE_URL = "http://localhost:8000";

  constructor(@inject(TYPES.HttpClient) private HttpClient: IHttpClient) {}

  async getProducts(): Promise<Product[]> {
    try {
      const products = await this.HttpClient.get<Product[]>(
        `${this.BASE_URL}/products`
      );
      return products;
    } catch (error: unknown) {
      const errorMessage =
        "error while fetching the products form catalog service";
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data || errorMessage);
      }
      throw new Error(errorMessage);
    }
  }
}
