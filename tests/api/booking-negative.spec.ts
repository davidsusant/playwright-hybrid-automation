import { BookingResponse } from "@api/types";
import { buildBooking } from "@data/bookingData";
import { expect, test } from "@fixtures/apiFixtures.js";

test.describe("Booking authorization & negatives @regression", () => {
  test("rejects PUT without a token", async ({ bookingApi }) => {
    const created = (await (
      await bookingApi.createBooking(buildBooking())
    ).json()) as BookingResponse;

    const response = await bookingApi.updateBooking(
      created.bookingid,
      buildBooking({ firstname: "NoAuth" }),
      "invalid-token",
    );
    expect(response.status()).toBe(403);
  });

  test("rejects DELETE without a valid token", async ({ bookingApi }) => {
    const created = (await (
      await bookingApi.createBooking(buildBooking())
    ).json()) as BookingResponse;

    const response = await bookingApi.deleteBooking(
      created.bookingid,
      "invalid-token",
    );
    expect(response.status()).toBe(403);
  });

  test("returns 404 for a non-existent booking id", async ({ bookingApi }) => {
    const response = await bookingApi.getBooking(99_999_999);
    expect(response.status()).toBe(404);
  });

  test("filters booking ids by firstname and lastname", async ({
    bookingApi,
  }) => {
    const payload = buildBooking();
    await bookingApi.createBooking(payload);

    const response = await bookingApi.getBookingIds({
      firstname: payload.firstname,
      lastname: payload.lastname,
    });

    expect(response.status()).toBe(200);
    const ids = await response.json();
    expect(Array.isArray(ids)).toBe(true);
    expect(ids.length).toBeGreaterThan(0);
  });
});
