const seededRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;

  return () => (s = (s * a) % m) / m;
};

const fetchAPI = (date) => {
  let result = [];
  let random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) result.push(i + ":00");
    if (random() < 0.5) result.push(i + ":30");
  }

  return result;
};

const submitAPI = (formData) => {
  const random = Math.random(); // Genera un número aleatorio entre 0 y 1

  // Si el número aleatorio es menor que 0.2 (20% de probabilidad),
  // simula un fallo en la solicitud API y devuelve un mensaje de error
  if (random < 0.2) {
    return {
      success: false,
      message: 'Error: La solicitud de envío falló, por favor intente nuevamente.',
    };
  }

  return { success: true };
};

export { fetchAPI, submitAPI };
