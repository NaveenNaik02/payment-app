import axios from 'axios';
import { injectable } from "inversify";
import type { IHttpClient } from "../interfaces";

@injectable()
export class HttpClient implements IHttpClient {
    private client = axios.create();

    constructor() {
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        })
    }

    async get<T>(url: string): Promise<T> {
        const response = await this.client.get<T>(url);
        return response.data;
    }

    async post<T>(url: string, data: any): Promise<T> {
        const response = await this.client.post<T>(url, data);
        return response.data;
    }
}