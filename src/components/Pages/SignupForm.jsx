import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { register } from '../API/auth';  // Asume que tienes esta función para registrar usuarios

import './Login.css';

export default function SignupForm({ onCancel }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    try {
      await register({ username, email, password: password1 });
      Swal.fire('Success', 'Account created! Please login.', 'success');
      onCancel(); // Vuelve al login
    } catch (err) {
      Swal.fire('Error', err.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="login">
      <h1 className="text-center mb-4">Sign Up</h1>

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
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password1">Password:</label>
          <input
            id="password1"
            type="password"
            className="form-control"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password2">Confirm Password:</label>
          <input
            id="password2"
            type="password"
            className="form-control"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-2">
          Register
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={onCancel}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}