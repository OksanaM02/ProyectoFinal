import React, { useState } from 'react';
import './Navbar.css';
import Cart from './Cart';
import cestaImage from '../assets/cesta.png';

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header>
      <a>
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
        <a href="/services" className="nav-item" style={{ '--i': 3 }}>Mis Pedidos</a>
        <a href="#" className="nav-item cart-icon" onClick={toggleCart} style={{ '--i': 4 }}>
          <img src={cestaImage} alt="Carrito" className="cart-image" />
        </a>
        <button className="nav-item logout-button" onClick={handleLogout} style={{ '--i': 5 }}>Salir</button>
      </nav>

      {isCartOpen && <Cart onClose={toggleCart} />}
    </header>
  );
}

export default Navbar;
