import { test as base, APIRequestContext } from "@playwright/test";
import { AuthApi } from "@api/AuthApi.js";
import { BookingApi } from "@api/BookingApi.js";
import { env } from "@config/env.js";

interface ApiFixtures {
  authApi: AuthApi;
  bookingApi: BookingApi;
  authToken: string;
}

export const test = base.extend<ApiFixtures>({
  authApi: async ({ request }: { request: APIRequestContext }, use) => {
    await use(new AuthApi(request));
  },

  bookingApi: async ({ request }: { request: APIRequestContext }, use) => {
    await use(new BookingApi(request));
  },

  authToken: async ({ authApi }, use) => {
    const token = await authApi.getToken({
      username: env.api.admin.username,
      password: env.api.admin.password,
    });
    await use(token);
  },
});

export { expect } from "@playwright/test";
