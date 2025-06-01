import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, getUserInfo } from '../API/auth';
import SignupForm from './SignupForm';

import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const [errorMsg, setErrorMsg]   = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      // 1. Login: obtiene access y refresh
      const { access, refresh } = await login(username, password);

      // 2. Guarda tokens
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // 3. Solicita info del usuario
      const user = await getUserInfo(access);
      localStorage.setItem('user', JSON.stringify(user));

      setSuccessMsg(`¡Bienvenido, ${user.username}! Redirigiendo…`);

      // 4. Pequeño delay para mostrar el mensaje
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setErrorMsg(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  // Cambia a formulario de registro
  if (isSignup) {
    return (
      <SignupForm
        onCancel={() => {
          setIsSignup(false);
          setErrorMsg('');
          setSuccessMsg('');
        }}
      />
    );
  }

  return (
    <div className="login">
      <h1 className="text-center mb-4">Login</h1>

      {/* Alertas */}
      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="alert alert-success" role="alert">
          {successMsg}
        </div>
      )}

      <form className="form-login" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            disabled={loading}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mb-2"
          disabled={loading}
        >
          {loading ? 'Ingresando…' : 'Login'}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={() => setIsSignup(true)}
          disabled={loading}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}