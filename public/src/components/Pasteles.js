import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pasteles.css';
import Loader from './Loader'; // Importa el componente Loader

const Pasteles = () => {
  const [pasteles, setPasteles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPastel, setSelectedPastel] = useState(null);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const pageSize = 8;

  useEffect(() => {
    fetchPasteles(page);
  }, [page]);

  const fetchPasteles = async (page) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://proyectofinal-qayw.onrender.com/pasteles?page=${page}`);
      setPasteles(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pasteles:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (pastelId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setShowLoginMessage(true);
        setTimeout(() => setShowLoginMessage(false), 3000);
        return;
      }

      const data = {
        pastelId: pastelId,
        cantidad: 1
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post(`https://proyectofinal-qayw.onrender.com/carrito/addItem`, data, config);
      setShowAddedToCartMessage(true);
      setTimeout(() => setShowAddedToCartMessage(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const openModal = (pastel) => {
    setSelectedPastel(pastel);
  };

  const closeModal = () => {
    setSelectedPastel(null);
  };

  return (
    <div className="pasteles-container">
      <h2 className="title">Nuestros Pasteles</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="pasteles-grid">
          {pasteles.map((pastel) => (
            <div key={pastel._id} className="pastel-card">
              <img src={`/images/${pastel.foto}`} alt={pastel.nombre} className="pastel-foto" />
              <h3 className="pastel-nombre">{pastel.nombre}</h3>
              <p className="pastel-descripcion">
                {pastel.descripcion.length > 100 ? `${pastel.descripcion.substring(0, 97)}...` : pastel.descripcion}
              </p>
              <button className="more-btn" onClick={() => openModal(pastel)}>Más</button>
              <p className="pastel-precio">${pastel.precio.toFixed(2)}</p>
              <p className="pastel-alergenos">Alergenos: {pastel.alergenos.join(', ')}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(pastel._id)}>Añadir al carrito</button>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page <= 1}>
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={page >= totalPages}>
          Siguiente
        </button>
      </div>

      {selectedPastel && (
        <div className={`modal ${selectedPastel ? 'open' : ''}`}>
          <div className="modal-content">
            <h3>{selectedPastel.nombre}</h3>
            <p>{selectedPastel.descripcion}</p>
            <button className="modal-close" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      {showAddedToCartMessage && (
        <div className="added-to-cart-message">
          <p>Producto añadido al carrito!</p>
        </div>
      )}

      {showLoginMessage && (
        <div className="error-message">
          <p>Por favor, inicia sesión para comprar.</p>
        </div>
      )}

      {showErrorMessage && (
        <div className="error-message">
          <p>Error al añadir al carrito. Por favor, intenta de nuevo más tarde.</p>
        </div>
      )}
    </div>
  );
};

export default Pasteles;
