import { test, expect } from "@fixtures/apiFixtures.js";
import { env } from "@config/env.js";

test.describe("Auth API @smoke", () => {
  test("returns a token for valid credentials", async ({ authApi }) => {
    const response = await authApi.createTokenResponse({
      username: env.api.admin.username,
      password: env.api.admin.password,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("token");
    expect(typeof body.token).toBe("string");
    expect(body.token.length).toBeGreaterThan(0);
  });

  test("does not return a token for invalid credentials @regression", async ({
    authApi,
  }) => {
    const response = await authApi.createTokenResponse({
      username: "wrong",
      password: "wrong",
    });

    // restful-booker return 200 with a "reason" body rather than 401.
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).not.toHaveProperty("token");
    expect(body).toHaveProperty("reason");
  });
});
