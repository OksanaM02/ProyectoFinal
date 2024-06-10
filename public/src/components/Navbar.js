// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css'; // Asegúrate de crear un archivo CSS para los estilos específicos del navbar

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

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
        <a href="#" className="nav-item" style={{ '--i': 0 }}>Productos</a>
        <a href="#" className="nav-item" style={{ '--i': 1 }}>Sobre Nosotros</a>
        <a href="#" className="nav-item" style={{ '--i': 3 }}>Nuestros Servicios</a>
      </nav>
    </header>
  );
}

export default Navbar;
