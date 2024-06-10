import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useHistory para la redirección

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

  const navigate = useNavigate(); // Obtiene el objeto de historial

  const toggleAddress = () => {
    setShowAddress(!showAddress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://proyectofinal-qayw.onrender.com/users', formData);
      console.log("Respuesta del servidor:", response.data);

      // Redirige a la página de inicio de sesión después de crear la cuenta
      navigate.push('/login');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <main>
      <section className="formulario">
        <h1 className="título-formulario">CREAR UNA NUEVA CUENTA</h1>
        <p className="descripcion-formulario">Disfruta de unos sabores únicos</p>
        <form onSubmit={handleSubmit}>
          <label className="etiqueta-control">Nombre de Usuario</label>
          <input type="text" className="control-formulario" name="username" value={formData.username} onChange={handleChange} required />

          {showAddress ? (
            <>
              <label className="etiqueta-control">Calle</label>
              <input type="text" className="control-formulario" name="street" value={formData.street} onChange={handleChange} required />
              <label className="etiqueta-control">Ciudad</label>
              <input type="text" className="control-formulario" name="city" value={formData.city} onChange={handleChange} required />
              <label className="etiqueta-control">Código Postal</label>
              <input type="text" className="control-formulario" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
            </>
          ) : (
            <>
              <label className="etiqueta-control">Email</label>
              <input type="email" className="control-formulario" name="email" value={formData.email} onChange={handleChange} required />

              <label className="etiqueta-control">Número de Teléfono</label>
              <input type="text" className="control-formulario" name="phone" value={formData.phone} onChange={handleChange} required />

              <label className="etiqueta-control">Contraseña</label>
              <div className="campo-contraseña">
                <input type="password" className="control-formulario" name="password" value={formData.password} onChange={handleChange} minLength="4" required />
              </div>
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
