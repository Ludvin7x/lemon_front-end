import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, getUserInfo } from '../API/auth';
import SignupForm from './SignupForm';

import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const { auth_token } = await login(username, password);
      localStorage.setItem('token', auth_token);

      const user = await getUserInfo(auth_token);
      localStorage.setItem('user', JSON.stringify(user));

      setSuccessMsg(`Welcome! Hello ${user.username}`);

      // Navegar con un pequeño delay para que el usuario vea el mensaje
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  if (isSignup) {
    return <SignupForm onCancel={() => setIsSignup(false)} />;
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
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-2">
          Login
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={() => setIsSignup(true)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}