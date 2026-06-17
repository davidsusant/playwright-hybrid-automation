import { APIRequestContext, APIResponse } from "@playwright/test";
import { Booking, BookingFilter } from "./types.js";

/**
 * Wraps the /booking and /ping endpoints of restful-booker.
 * Write operations (PUT/PATCH/DELETE) require a token passed as a Cookie header.
 */
export class BookingApi {
  constructor(private readonly request: APIRequestContext) {}

  private authHeaders(token: string): Record<string, string> {
    return { Cookie: `token=${token}` };
  }

  /**
   * Health-check endpoint.
   * Returns 201 when the service is up.
   */
  async ping(): Promise<APIResponse> {
    return this.request.get("/ping");
  }

  async getBookingIds(filter?: BookingFilter): Promise<APIResponse> {
    return this.request.get("/booking", {
      params: (filter ?? {}) as Record<string, string | number | boolean>,
    });
  }

  async getBooking(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  async createBooking(booking: Booking): Promise<APIResponse> {
    return this.request.post("/booking", { data: booking });
  }

  async updateBooking(
    id: number,
    booking: Booking,
    token: string,
  ): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data: booking,
      headers: this.authHeaders(token),
    });
  }

  async partialUpdateBooking(
    id: number,
    booking: Partial<Booking>,
    token: string,
  ): Promise<APIResponse> {
    return this.request.patch(`/booking/${id}`, {
      data: booking,
      headers: this.authHeaders(token),
    });
  }

  async deleteBooking(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: this.authHeaders(token),
    });
  }
}
