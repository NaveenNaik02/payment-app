import { Model, tProp, model } from "mobx-keystone";
import { AuthStore } from "./auth.store";

@model("RootStore")
export class RootStore extends Model({
  authStore: tProp(AuthStore),
}) {
  protected onInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.authStore.setToken(token);
    }
  }
}

export const createRootStore = () => {
  return new RootStore({
    authStore: new AuthStore({ token: null }),
  });
};
