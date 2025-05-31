import React, { useState } from "react";
import { submitAPI } from "../API/api";
import Swal from 'sweetalert2';
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
      // Agrega más campos según lo necesario en tu formulario
    };

    try {
      const submissionResult = await submitAPI(formData);
      if (submissionResult.success === true) {
        Swal.fire('¡Bienvenido!', '', 'success');
      } else {
        Swal.fire('Falló, favor revisa usuario y contraseña', submissionResult.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error al enviar el formulario', error.message, 'error');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="user">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="password">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <button type="button" className="register-button">Registrar</button>
      </form>
    </div>
  );
}

export default Login;