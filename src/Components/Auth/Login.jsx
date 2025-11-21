import React, { useState } from "react";
import "../../Styles/LoginStyles.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, llena todos los campos.");
      return;
    }

    setError("");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="usuario@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginForm;
