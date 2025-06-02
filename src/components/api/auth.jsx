const API_URL = import.meta.env.VITE_API_URL 

const url = (path) => `${API_URL}${path}`;

// ---------- Autenticación con JWT ----------

// Login: obtiene tokens (access + refresh)
export const login = async (username, password) => {
  const res = await fetch(url('/auth/token/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Credenciales inválidas');
  }

  return res.json(); // { access: "...", refresh: "..." }
};

// Obtener datos del usuario autenticado
export const getUserInfo = async (token) => {
  const res = await fetch(url('/api/users/me/'), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('No se pudo obtener la información del usuario');
  }

  return res.json();
};

// Logout: elimina tokens del almacenamiento local
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Registro: crea nuevo usuario
export const register = async ({ username, email, password }) => {
  const res = await fetch(url('/api/register/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    const messages = [];
    if (error.username) messages.push(`Username: ${error.username.join(' ')}`);
    if (error.email) messages.push(`Email: ${error.email.join(' ')}`);
    if (error.password) messages.push(`Password: ${error.password.join(' ')}`);
    throw new Error(messages.join(' ') || 'Error al registrar usuario');
  }

  return res.json(); // { id, username, email }
};