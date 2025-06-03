const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, '');

const url = (path) => `${API_URL}/${path.replace(/^\/+/, '')}`;

// Logout: elimina tokens y datos del almacenamiento local
export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}

// Login: obtiene tokens (access + refresh) y los guarda localmente
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

// Refrescar el token de acceso usando el refresh token
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

// Wrapper para hacer fetch con token de acceso y refrescar si es necesario
export async function fetchWithAuth(path, options = {}) {
  let accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  let res = await fetch(url(path), options);

  if (res.status === 401 && refreshToken) {
    // Intentar refrescar el token
    try {
      accessToken = await refreshAccessToken(refreshToken);

      options.headers.Authorization = `Bearer ${accessToken}`;
      res = await fetch(url(path), options);
    } catch (error) {
      // Si falla refrescar token, limpiar todo y lanzar error
      logout();
      throw new Error('Sesión expirada. Por favor, ingresa de nuevo.');
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Error en la petición');
  }

  return res.json();
}

// Obtener datos del usuario autenticado
export async function getUserInfo() {
  return fetchWithAuth('/api/users/me/');
}

// Registro: crea nuevo usuario
export async function register({ username, email, password }) {
  const res = await fetch(url('/api/register/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const messages = [];
    if (error.username) messages.push(`Username: ${error.username.join(' ')}`);
    if (error.email) messages.push(`Email: ${error.email.join(' ')}`);
    if (error.password) messages.push(`Password: ${error.password.join(' ')}`);
    throw new Error(messages.join(' ') || 'Error al registrar usuario');
  }

  return res.json();
}