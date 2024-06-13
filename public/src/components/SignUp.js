import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    street: '',
    city: '',
    postalCode: ''
  });
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const toggleAddress = () => {
    setShowAddress(!showAddress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrorMessages({
      ...errorMessages,
      [name]: ''
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'El nombre de usuario es obligatorio.';
    if (!formData.email) errors.email = 'El email es obligatorio.';
    if (!formData.phone) errors.phone = 'El número de teléfono es obligatorio.';
    if (!formData.password) errors.password = 'La contraseña es obligatoria.';
    if (showAddress) {
      if (!formData.street) errors.street = 'La calle es obligatoria.';
      if (!formData.city) errors.city = 'La ciudad es obligatoria.';
      if (!formData.postalCode) errors.postalCode = 'El código postal es obligatorio.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({}); // Reset error messages on form submit
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const response = await axios.post('https://proyectofinal-qayw.onrender.com/users/', formData);
      console.log("Respuesta del servidor:", response.data);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessages({ username: 'El nombre de usuario ya existe. Por favor, elija otro.' });
      } else {
        console.error('Error al crear el usuario:', error);
      }
    }
  };

  return (
    <main>
      <section className="formulario">
        <h1 className="título-formulario">CREAR UNA NUEVA CUENTA</h1>
        <p className="descripcion-formulario">Disfruta de unos sabores únicos</p>
        <form onSubmit={handleSubmit}>
          <label className="etiqueta-control">Nombre de Usuario</label>
          <input
            type="text"
            className={`control-formulario ${errorMessages.username ? 'user-invalid' : ''}`}
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errorMessages.username && <p className="error-message">{errorMessages.username}</p>}

          {!showAddress && (
            <>
              <label className="etiqueta-control">Email</label>
              <input
                type="email"
                className={`control-formulario ${errorMessages.email ? 'user-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}

              <label className="etiqueta-control">Número de Teléfono</label>
              <input
                type="text"
                className={`control-formulario ${errorMessages.phone ? 'user-invalid' : ''}`}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errorMessages.phone && <p className="error-message">{errorMessages.phone}</p>}

              <label className="etiqueta-control">Contraseña</label>
              <div className="campo-contraseña">
                <input
                  type="password"
                  className={`control-formulario ${errorMessages.password ? 'user-invalid' : ''}`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="4"
                  required
                />
                {errorMessages.password && <p className="error-message">{errorMessages.password}</p>}
              </div>
            </>
          )}

          {showAddress && (
            <>
              <label className="etiqueta-control">Calle</label>
              <input
                type="text"
                className={`control-formulario ${errorMessages.street ? 'user-invalid' : ''}`}
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
              {errorMessages.street && <p className="error-message">{errorMessages.street}</p>}

              <label className="etiqueta-control">Ciudad</label>
              <input
                type="text"
                className={`control-formulario ${errorMessages.city ? 'user-invalid' : ''}`}
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errorMessages.city && <p className="error-message">{errorMessages.city}</p>}

              <label className="etiqueta-control">Código Postal</label>
              <input
                type="text"
                className={`control-formulario ${errorMessages.postalCode ? 'user-invalid' : ''}`}
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
              {errorMessages.postalCode && <p className="error-message">{errorMessages.postalCode}</p>}
            </>
          )}

          <div className="activar-dirección" onClick={toggleAddress}>
            Dirección <span>{showAddress ? '▲' : '▼'}</span>
          </div>

          <button type="submit" className="enviar-formulario" id="submit">Crear Cuenta</button>
        </form>
        <p className="pie-formulario">
          ¿Ya tienes una cuenta? <br /> <a href="/login">Inicia Sesión</a>
        </p>
      </section>
      <section className="form__animation">
        <img src='../logo.png' alt="Logo" />
      </section>
    </main>
  );
}

export default SignUp;
