import React from 'react';
import './style.css'; // Assuming you have a CSS file named styles.css in the same directory

const Home = () => {
  return (
    <div>
      <video autoPlay loop muted playsInline className="background-video">
        <source
          src="https://www.pexels.com/es-es/video/comida-manos-pasos-cocina-5515573/"
          type="video/mp4"
        />
      </video>

      <header>


        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
          <i className="bx bx-menu" id="menu-icon"></i>
          <i className="bx bx-x" id="close-icon"></i>
        </label>

        <nav className="navbar">
          <a href="#" className="nav-item" style={{ '--i': 0 }}>
            Home
          </a>
          <a href="#" className="nav-item" style={{ '--i': 1 }}>
            Plan Your Visit
          </a>
          <a href="#" className="nav-item" style={{ '--i': 2 }}>
            Magical Places
          </a>
          <a href="#" className="nav-item" style={{ '--i': 3 }}>
            Contact
          </a>
        </nav>
      </header>

      <section className="content">
        <h1>The North</h1>
        <a href="#" className="btn light"></a>
      </section>
    </div>
  );
};

export default Home;
