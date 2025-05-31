const API_URL = process.env.REACT_APP_API_URL


export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/token/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });


  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.non_field_errors?.[0] || 'Credenciales inválidas');
  }

  return res.json();               
};

export const getUserInfo = async (token) => {
  const res = await fetch(`${API_URL}/auth/users/me/`, {
    headers: { Authorization: `Token ${token}` }
  });
  if (!res.ok) throw new Error('No se pudo obtener el usuario');
  return res.json();               
};

export const logout = async (token) => {
  const res = await fetch(`${API_URL}/auth/token/logout/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` }
  });
  if (!res.ok) throw new Error('No se pudo cerrar la sesión');
  return res.json();               
};
