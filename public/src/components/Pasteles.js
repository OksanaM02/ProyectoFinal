import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pasteles.css'; // Importa el archivo CSS para estilos

const Pasteles = () => {
  const [pasteles, setPasteles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8; // Tamaño de la página definido en tu API

  useEffect(() => {
    fetchPasteles(page);
  }, [page]);

  const fetchPasteles = async (page) => {
    try {
      const response = await axios.get(`https://proyectofinal-qayw.onrender.com/pasteles?page=${page}`);
      setPasteles(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching pasteles:', error);
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

  return (
    <div className="pasteles-container">
      <h2 className="title">Nuestros Pasteles</h2>
      <div className="pasteles-grid">
        {pasteles.map((pastel) => (
          <div key={pastel._id} className="pastel-card">
            <img src={`/images/${pastel.foto}`} alt={pastel.nombre} className="pastel-foto" />
            <h3 className="pastel-nombre">{pastel.nombre}</h3>
            <p className="pastel-descripcion">{pastel.descripcion}</p>
            <p className="pastel-precio">${pastel.precio.toFixed(2)}</p>
            <p className="pastel-alergenos">Alergenos: {pastel.alergenos.join(', ')}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page <= 1}>
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={page >= totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pasteles;
