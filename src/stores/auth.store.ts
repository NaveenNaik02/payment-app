import { Model, tProp, types, model, modelAction } from "mobx-keystone";

@model("AuthStore")
export class AuthStore extends Model({
  token: tProp(types.maybeNull(types.string)),
}) {
  @modelAction
  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  @modelAction
  clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  get isAuthenticated() {
    return !!this.token;
  }
}
