// src/api/fetchAuth.js

export const fetchAuth = (url, options = {}) => {
  const token = localStorage.getItem('token');

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...options.headers,
    },
  });
};