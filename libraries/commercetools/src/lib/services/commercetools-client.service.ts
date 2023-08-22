/* eslint-disable no-console */
import { Injectable, Inject } from '@nestjs/common';
import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
// import { ConfigService } from '@nestjs/config';

/* @Injectable()
export class CommercetoolsClientService {
  readonly #apiRoot: ApiRoot;
  readonly #projectKey: string;

  constructor(private readonly config: ConfigService) {
    this.#projectKey = config.get<string>('CTP_PROJECT_KEY')!;
    this.#apiRoot = this.#getApiRoot();

    // TODO: delete when finished
    this.#testPrint();
  }
  #testPrint() {
    console.log('COMMERCETOOLS loaded');
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
 */

interface EcommerceProviderConfigs {
  CTP_PROJECT_KEY: string;
  CTP_CLIENT_SECRET: string;
  CTP_CLIENT_ID: string;
  CTP_AUTH_URL: string;
  CTP_API_URL: string;
  CTP_SCOPES: string;
  CTP_REGION: string;
}

@Injectable()
export class CommercetoolsClientService {
  readonly #apiRoot: ApiRoot;
  readonly #projectKey: string;

  constructor(
    @Inject('COMMERCETOOLS_CONFIGS')
    private readonly config: EcommerceProviderConfigs
  ) {
    this.#projectKey = config.CTP_PROJECT_KEY!;
    this.#apiRoot = this.#getApiRoot();
  }

  customers() {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#projectKey })
      .customers()
      .get()
      .execute();
  }

  async getCustomers() {
    const customers = (
      await this.#apiRoot
        .withProjectKey({ projectKey: this.#projectKey })
        .customers()
        .get()
        .execute()
    ).body.results;
    return customers;
  }

  #getApiRoot() {
    const scopes = this.config.CTP_SCOPES?.split(' ');

    console.log('Pr Key: ' + this.#projectKey);
    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: this.config.CTP_AUTH_URL!,
      projectKey: this.#projectKey,
      credentials: {
        clientId: this.config.CTP_CLIENT_ID!,
        clientSecret: this.config.CTP_CLIENT_SECRET!,
      },
      scopes,
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: this.config.CTP_API_URL!,
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
