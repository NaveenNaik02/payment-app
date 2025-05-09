import { Container } from 'inversify';
import { TYPES } from '../constants';
import { AuthService, HttpClient } from '../services/implementations';
import type { IAuthService, IHttpClient } from '../services/interfaces';

export const container = new Container();

container.bind<IHttpClient>(TYPES.HttpClient).to(HttpClient);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);