import React, { useState } from 'react';
import './Navbar.css'; // Asegúrate de crear un archivo CSS para los estilos específicos del navbar
import Cart from './Cart'; // Importa el componente del carrito

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem("token");
    // Redirigir a la página de inicio de sesión
    window.location.href = "/login";
  };

  return (
    <header>
      <a href="#">
        <img
          src="../logo.png"
          alt="logo"
          className="logo"
        />
      </a>

      <input type="checkbox" id="check" checked={isNavbarOpen} onChange={toggleNavbar} />
      <label htmlFor="check" className="icons">
        <i className="bx bx-menu" id="menu-icon" style={{ display: isNavbarOpen ? 'none' : 'inline' }}></i>
        <i className="bx bx-x" id="close-icon" style={{ display: isNavbarOpen ? 'inline' : 'none' }}></i>
      </label>

      <nav className={`navbar ${isNavbarOpen ? 'open' : ''}`}>
        <a href="/pasteles" className="nav-item" style={{ '--i': 0 }}>Productos</a>
        <a href="#" className="nav-item" style={{ '--i': 3 }}>Nuestros Servicios</a>
        <a href="#" className="nav-item cart-icon" onClick={toggleCart} style={{ '--i': 4 }}>
          <img src="public\public\cesta.png" alt="Carrito" className="cart-image" />
        </a>
        <button className="nav-item logout-button" onClick={handleLogout} style={{ '--i': 5 }}>Salir</button>
      </nav>

      {isCartOpen && <Cart onClose={toggleCart} />} {/* Muestra el componente del carrito si isCartOpen es true */}
    </header>
  );
}

export default Navbar;
