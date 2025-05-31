const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/token/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.non_field_errors?.[0] || 'Invalid credentials');
  }

  return res.json();  // { auth_token: '...' }
};

export const getUserInfo = async (token) => {
  const res = await fetch(`${API_URL}/auth/users/me/`, {
    headers: { Authorization: `Token ${token}` }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user info');
  }

  return res.json();
};

export const logout = async (token) => {
  const res = await fetch(`${API_URL}/auth/token/logout/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` }
  });

  if (!res.ok) {
    throw new Error('Logout failed');
  }

  return res.json();
};

export const register = async ({ username, email, password }) => {
  const res = await fetch(`${API_URL}/auth/users/`, {
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