const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, '');

const url = (path) => `${API_URL}/${path.replace(/^\/+/, '')}`;

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}

export async function login(username, password) {
  const res = await fetch(url('/auth/token/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Credenciales inválidas');
  }

  const data = await res.json();
  localStorage.setItem('accessToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);
  return data;
}

export async function refreshAccessToken(refreshToken) {
  const res = await fetch(url('/auth/token/refresh/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) {
    throw new Error('No se pudo refrescar el token');
  }

  const data = await res.json();
  localStorage.setItem('accessToken', data.access);
  return data.access;
}

export async function fetchWithAuth(path, options = {}, accessToken) {
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  const res = await fetch(url(path), options);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Error en la petición');
  }

  return res.json();
}

export async function getUserInfo(accessToken) {
  return fetchWithAuth('/api/users/me/', {}, accessToken);
}

export async function register({ username, email, password, password2, first_name, last_name }) {
  const res = await fetch(url('/api/auth/register/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, password2, first_name, last_name }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const messages = [];
    if (error.username) messages.push(`Username: ${error.username.join(' ')}`);
    if (error.email) messages.push(`Email: ${error.email.join(' ')}`);
    if (error.password) messages.push(`Password: ${error.password.join(' ')}`);
    if (error.password2) messages.push(`Confirm Password: ${error.password2.join(' ')}`);
    if (error.first_name) messages.push(`First Name: ${error.first_name.join(' ')}`);
    if (error.last_name) messages.push(`Last Name: ${error.last_name.join(' ')}`);
    throw new Error(messages.join(' ') || 'Error al registrar usuario');
  }

  return res.json();
}