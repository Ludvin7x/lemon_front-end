import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { login, getUserInfo } from '../API/auth';  

import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { auth_token } = await login(username, password);

      localStorage.setItem('token', auth_token);

      const user = await getUserInfo(auth_token);
      localStorage.setItem('user', JSON.stringify(user));

      Swal.fire('¡Bienvenido!', `Hola ${user.username}`, 'success');
      navigate('/');                             
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <form className="form-login" onSubmit={handleSubmit}>
        <div className="user">
          <label htmlFor="username">Usuario:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="password">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Iniciar sesión</button>
        <button type="button" className="register-button">Registrar</button>
      </form>
    </div>
  );
}