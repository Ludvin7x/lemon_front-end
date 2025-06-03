import React, { useState } from "react";
import { register } from "../api/auth";

import "./Login.css";

export default function SignupForm({ onCancel }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      return;
    }

    try {
      await register({
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password: password1,
        password2: password2,
      });
      setAlert({ type: "success", message: "Account created! Please login." });
      setTimeout(() => onCancel(), 2000);
    } catch (err) {
      setAlert({
        type: "danger",
        message: err.message || "Registration failed",
      });
    }
  };

  return (
    <div className="login">
      <h1 className="text-center mb-4">Sign Up</h1>

      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setAlert(null)}
          ></button>
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
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
