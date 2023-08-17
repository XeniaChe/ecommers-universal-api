/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommercetoolsClientService {
  readonly #apiRoot: ApiRoot;
  readonly #projectKey: string;

  constructor(private readonly config: ConfigService) {
    this.#projectKey = config.get<string>('CTP_PROJECT_KEY')!;
    this.#apiRoot = this.#getApiRoot();
  }

  customers() {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#projectKey })
      .customers();
  }

  #getApiRoot() {
    const scopes = this.config.get('CTP_SCOPES')?.split(' ');

    //TODO: delete after fixed 'nest circular dep-cies issue'
    console.log('Pr Key: ' + this.#projectKey);
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: this.config.get<string>('CTP_AUTH_URL')!,
      projectKey: this.#projectKey,
      credentials: {
        clientId: this.config.get<string>('CTP_CLIENT_ID')!,
        clientSecret: this.config.get<string>('CTP_CLIENT_SECRET')!,
      },
      scopes,
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: this.config.get<string>('CTP_API_URL')!,
      fetch,
    };

    const client = new ClientBuilder()
      .withProjectKey(this.#projectKey)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return createApiBuilderFromCtpClient(client);
  }
}
