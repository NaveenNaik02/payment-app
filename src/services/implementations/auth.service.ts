import { inject, injectable } from "inversify";
import type {
  IAuthService,
  IHttpClient,
  ILoginPayload,
  ILoginResponse,
} from "../interfaces";
import { TYPES } from "../../constants";
import { AxiosError } from "axios";

@injectable()
export class AuthService implements IAuthService {
  private readonly AUTH_BASE_URL = "http://localhost:8003";
  private readonly message = "Authentication failed. Please try again.";

  constructor(@inject(TYPES.HttpClient) private httpClient: IHttpClient) {}

  async login({ email, password }: ILoginPayload): Promise<ILoginResponse> {
    try {
      const response = await this.httpClient.post<ILoginResponse>(
        `${this.AUTH_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      const token = response.token;
      if (!token) {
        throw new Error("authentication failed please try again.");
      }
      localStorage.setItem("token", token);
      return { token: token };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data || this.message;
        throw new Error(errorMessage);
      }
      throw new Error(this.message);
    }
  }
}
