export interface ICatalogService {
  getProducts(): Promise<Product[]>;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
}
