import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const url = 'https://proyectofinal-qayw.onrender.com/login';
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Limpiar error antes de intentar el inicio de sesión

    try {
      const response = await axios.post(url, { username, password });
      console.log("Respuesta del servidor:", response.data);

      const { token, userRole } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("isLoggedIn", true);

      setUserName('');
      setPassword('');

      if (userRole === "admin") {
        window.location.reload();
      } else {
        navigate('/home');
      }

      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Usuario o contraseña incorrectos');
      } else {
        setError('Error fatal al iniciar sesión');
      }
      console.error(error);
    }
  };

  return (
    <main>
      <section className="form">
        <h1 className="form__title">ENTRA PARA HACER TU PEDIDO</h1>
        <p className="form__description">Disfuta de unos sabores únicos</p>
        <form onSubmit={handleLogin}>
          <label className="form-control__label">Email</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label className="form-control__label">Password</label>
          <div className="password-field">
            <input
              type="password"
              className={`form-control ${error ? 'user-invalid' : ''}`}
              minLength="4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button type="submit" className="form__submit" id="submit">Log In</button>
        </form>
        <p className="form__footer">
          ¿Eres nuevo en Raices Dulces?<br /> <a href="/signup">Crear Cuenta</a>
        </p>
      </section>
      <section className="form__animation">
        <img src='../logo.png' alt="Logo" />
      </section>
    </main>
  );
}

export default Login;
