export interface IAuthService {
  login(payload: ILoginPayload): Promise<ILoginResponse>;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}
