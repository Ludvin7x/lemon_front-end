const BASE_TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

export const getAvailableTimes = async (date) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ times: BASE_TIMES });
    }, 400);
  });
};

export const submitBooking = async (bookingData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { date, time, guests, occasion } = bookingData;
      if (!date || !time || !guests || !occasion) {
        reject(new Error("Datos de reserva incompletos."));
      } else {
        resolve({ ok: true, booking: bookingData });
      }
    }, 400);
  });
};