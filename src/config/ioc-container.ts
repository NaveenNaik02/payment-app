import { Container } from "inversify";
import { MODEL_TYPES, TYPES } from "../constants";
import {
  AuthService,
  CatalogService,
  HttpClient,
  OrderService,
} from "../services/implementations";
import type {
  IAuthService,
  ICatalogService,
  IHttpClient,
  IOrderService,
} from "../services/interfaces";
import { createRootStore, RootStore } from "@/stores";

export const container = new Container();

container.bind<IHttpClient>(TYPES.HttpClient).to(HttpClient).inSingletonScope();

container
  .bind<IAuthService>(TYPES.AuthService)
  .to(AuthService)
  .inSingletonScope();

container
  .bind<ICatalogService>(TYPES.CatalogService)
  .to(CatalogService)
  .inSingletonScope();

container
  .bind<IOrderService>(TYPES.OrderService)
  .to(OrderService)
  .inSingletonScope();

container
  .bind<RootStore>(MODEL_TYPES.RootStore)
  .toDynamicValue(() => createRootStore())
  .inSingletonScope();
