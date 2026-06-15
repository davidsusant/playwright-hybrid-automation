import * as dotenv from "dotenv";

dotenv.config();

function required(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  ui: {
    baseUrl: required("UI_BASE_URL", "http://automationintesing.online"),
    admin: {
      username: required("UI_ADMIN_USERNAME", "admin"),
      password: required("UI_ADMIN_PASSWORD", "password"),
    },
  },
  api: {
    baseUrl: required("API_BASE_URL", "https://restful-booker.herokuapp.com"),
    admin: {
      username: required("API_ADMIN_USERNAME", "admin"),
      password: required("API_ADMIN_PASSWORD", "password123"),
    },
  },
} as const;
