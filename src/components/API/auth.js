const API_URL = process.env.REACT_APP_API_URL;

// Login - obtiene tokens access y refresh
export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Invalid credentials');
  }

  return res.json();  // { access: '...', refresh: '...' }
};

// Obtener info del usuario actual con token access
export const getUserInfo = async (token) => {
  const res = await fetch(`${API_URL}/api/users/me/`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user info');
  }

  return res.json();
};

// Logout - simplemente elimina tokens localmente
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Registro - crea usuario nuevo
export const register = async ({ username, email, password }) => {
  const res = await fetch(`${API_URL}/api/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (!res.ok) {
    const error = await res.json();
    const messages = [];
    if (error.username) messages.push(`Username: ${error.username.join(' ')}`);
    if (error.email) messages.push(`Email: ${error.email.join(' ')}`);
    if (error.password) messages.push(`Password: ${error.password.join(' ')}`);
    throw new Error(messages.join(' ') || 'Registration failed');
  }

  return res.json();
};