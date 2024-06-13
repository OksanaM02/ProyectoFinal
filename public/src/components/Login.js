import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const url = 'https://proyectofinal-qayw.onrender.com/login';
  const navigate = useNavigate(); // Usa el hook useNavigate

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(url, { username: username, password });
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
        navigate('/home'); // Redirige a la HomePage para usuarios normales
      }

      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Usuario o contraseña incorrectos');
      } else {
        toast.error('Error fatal al iniciar sesión');
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
              className="form-control"
              minLength="4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
