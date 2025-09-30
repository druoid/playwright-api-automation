export function createBookingData() {
  return {
    firstname: `User${Math.floor(Math.random() * 1000)}`,
    lastname: `Test${Math.floor(Math.random() * 1000)}`,
    totalprice: Math.floor(Math.random() * 1000),
    depositpaid: true,
    bookingdates: {
      checkin: '2025-01-01',
      checkout: '2026-12-31'
    },
    additionalneeds: 'Breakfast'
  };
}