import { inject, injectable } from "inversify";
import type { IAuthService, IHttpClient } from "../interfaces";
import { TYPES } from "../../constants";

@injectable()
export class AuthService implements IAuthService {
    private readonly AUTH_BASE_URL = "http://localhost:8004";

    constructor(@inject(TYPES.HttpClient) private httpClient: IHttpClient) { }

    async login(username: string, password: string): Promise<any> {
        const response = await this.httpClient.post(`${this.AUTH_BASE_URL}/auth/login`, {
            username,
            password
        });
        return response;
    }
}