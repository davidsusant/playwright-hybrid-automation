import { Booking } from "@api/types.js";

let counter = 0;

function uniqueSuffix(): string {
  counter += 1;
  return `${Date.now()}${counter}`;
}

function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

/**
 * Returns a valid booking payload.
 * Pass overrides to mutate specific fields.
 */
export function buildBooking(overrides: Partial<Booking> = {}): Booking {
  const suffix = uniqueSuffix();
  return {
    firstname: `John${suffix}`,
    lastname: `Doe${suffix}`,
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: isoDate(1),
      checkout: isoDate(5),
    },
    additionalneeds: "Breakfast",
    ...overrides,
  };
}

export const invalidBookings: Record<string, Partial<Booking>> = {
  missingFirstname: {
    lastname: "Doe",
    totalprice: 100,
    depositpaid: true,
    bookingdates: { checkin: isoDate(1), checkout: isoDate(2) },
  },
  missingLastname: {
    firstname: "John",
    totalprice: 100,
    depositpaid: true,
    bookingdates: { checkin: isoDate(1), checkout: isoDate(2) },
  },
  negativePrice: {
    firstname: "John",
    lastname: "Doe",
    totalprice: -50,
    depositpaid: true,
    bookingdates: { checkin: isoDate(1), checkout: isoDate(2) },
  },
  checkoutBeforeCheckin: {
    firstname: "John",
    lastname: "Doe",
    totalprice: 100,
    depositpaid: true,
    bookingdates: { checkin: isoDate(5), checkout: isoDate(1) },
  },
  emptyPayload: {},
};
