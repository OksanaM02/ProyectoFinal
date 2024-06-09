import React from 'react';
import './SignUp.css';

const SignUp = () => {

  return (
    <main>
      <section className="form">

        <h1 className="form__title">CREAR UNA NUEVA CUENTA</h1>
        <p className="form__description">Disfruta de unos sabores únicos</p>
        <form>
          <label className="form-control__label">Nombre de Usuario</label>
          <input type="text" className="form-control" required />

          <label className="form-control__label">Email</label>
          <input type="email" className="form-control" required />

          <label className="form-control__label">Número de Teléfono</label>
          <input type="text" className="form-control" required />

          <label className="form-control__label">Contraseña</label>
          <div className="password-field">
            <input type="password" className="form-control" minLength="4" required />
          </div>

          <label className="form-control__label">Dirección</label>
          <input type="text" className="form-control" placeholder="Calle" required />
          <input type="text" className="form-control" placeholder="Ciudad" required />
          <input type="text" className="form-control" placeholder="Código Postal" required />

          <button type="submit" className="form__submit" id="submit">Crear Cuenta</button>
        </form>
        <p className="form__footer">
  ¿Ya tienes una cuenta? <br /> <a href="/login">Inicia Sesión</a>
</p>
      </section>
      <section className="form__animation">
        <img src='../logo.png' alt="logo" />
      </section>
    </main>
  );
}

export default SignUp;
