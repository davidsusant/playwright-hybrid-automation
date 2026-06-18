import { buildBooking } from "@data/bookingData.js";
import { expect, test } from "@fixtures/apiFixtures.js";
import { BookingResponse } from "@api/types.js";

test.describe("Booking CRUD", () => {
  test("GET /ping confirms service is up @smoke", async ({ bookingApi }) => {
    const response = await bookingApi.ping();
    expect(response.status()).toBe(201);
  });

  test("creates a booking and returns the persisted entity @smoke", async ({
    bookingApi,
  }) => {
    const payload = buildBooking();
    const response = await bookingApi.createBooking(payload);

    expect(response.status()).toBe(200);
    const body = (await response.json()) as BookingResponse;
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking.firstname).toBe(payload.firstname);
    expect(body.booking.totalprice).toBe(payload.totalprice);
    expect(body.booking.bookingdates.checkin).toBe(
      payload.bookingdates.checkin,
    );
  });

  test("retrieves an existing booking by id", async ({ bookingApi }) => {
    const created = (await (
      await bookingApi.createBooking(buildBooking())
    ).json()) as BookingResponse;

    const response = await bookingApi.getBooking(created.bookingid);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe(created.booking.firstname);
  });

  test("updates a booking with PUT @regression", async ({
    bookingApi,
    authToken,
  }) => {
    const created = (await (
      await bookingApi.createBooking(buildBooking())
    ).json()) as BookingResponse;
    const updated = buildBooking({ firstname: "Updated", totalprice: 999 });

    const response = await bookingApi.updateBooking(
      created.bookingid,
      updated,
      authToken,
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe("Updated");
    expect(body.totalprice).toBe(999);
  });

  test("partially updates a booking with PATCH @regression", async ({
    bookingApi,
    authToken,
  }) => {
    const created = (await (
      await bookingApi.createBooking(buildBooking())
    ).json()) as BookingResponse;

    const response = await bookingApi.partialUpdateBooking(
      created.bookingid,
      { firstname: "Patched" },
      authToken,
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe("Patched");
    expect(body.lastname).toBe(created.booking.lastname);
  });

  test("deletes a booking and confirms removal @regression", async ({
    bookingApi,
    authToken,
  }) => {
    const created = (await (
      await bookingApi.createBooking(buildBooking())
    ).json()) as BookingResponse;

    const deleteResponse = await bookingApi.deleteBooking(
      created.bookingid,
      authToken,
    );
    expect(deleteResponse.status()).toBe(201);

    const getResponse = await bookingApi.getBooking(created.bookingid);
    expect(getResponse.status()).toBe(404);
  });
});
