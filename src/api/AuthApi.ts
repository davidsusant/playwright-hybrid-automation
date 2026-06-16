import { APIRequestContext, APIResponse } from "@playwright/test";
import { AuthRequest, AuthResponse } from "./types.js";

/**
 * Wraps the /auth endpoint of restful-booker.
 * Returns a token used as a Cookie header for write operations.
 */
export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async createTokenResponse(credentials: AuthRequest): Promise<APIResponse> {
    return this.request.post("/auth", { data: credentials });
  }

  async getToken(credentials: AuthRequest): Promise<string> {
    const response = await this.createTokenResponse(credentials);
    if (!response.ok()) {
      throw new Error(
        `Auth failed with status ${response.status()}: ${await response.text()}`,
      );
    }
    const body = (await response.json()) as AuthResponse;
    if (!body.token) {
      throw new Error(
        `Auth response did not contain a token: ${JSON.stringify(body)}`,
      );
    }
    return body.token;
  }
}
