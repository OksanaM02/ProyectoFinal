// Pedidos.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pedidos.css';
import jsPDF from 'jspdf';
import logo from '../assets/logo.png';
import Loader from './Loader'; // Importa el componente Loader

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchPedidos = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://proyectofinal-qayw.onrender.com/compraFinalizada/obtenerComprasPorUsuario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPedidos(response.data);
        const initialExpandedState = response.data.reduce((acc, pedido) => {
          acc[pedido._id] = false;
          return acc;
        }, {});
        setExpanded(initialExpandedState);
      } catch (err) {
        setError('Error al obtener los pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const handleDownloadTicket = async (pedidoId) => {
    try {
      const pedido = pedidos.find(pedido => pedido._id === pedidoId);
      if (!pedido) {
        console.error(`Pedido con ID ${pedidoId} no encontrado.`);
        return;
      }

      const doc = new jsPDF();
      const fechaCompra = new Date(pedido.fechaCompra).toLocaleDateString();
      const nombreUsuario = pedido.nombreUsuario;

      let y = 20;

      doc.addImage(logo, 'JPEG', 75, 10, 60, 60);
      doc.setFontSize(18);
      doc.setTextColor('#e77cb1');
      doc.text(`Raices Dulces`, 105, 75, null, null, 'center');

      doc.setFontSize(14);
      doc.setTextColor('#000000');
      doc.text(`Ticket de Pedido`, 105, 90, null, null, 'center');

      doc.setFontSize(12);
      doc.text(`${pedido._id}`, 105, 105, null, null, 'center');

      y += 120;

      doc.setFontSize(12);
      doc.text(`Fecha: ${fechaCompra}`, 20, y);
      y += 10;
      doc.text(`Nombre: ${nombreUsuario}`, 20, y);
      y += 10;
      y += 10;

      let totalPages = 1; // Inicializamos el contador de páginas

      pedido.items.forEach((item, index) => {
        const nombreProducto = item.nombre;
        const cantidad = item.cantidad;
        const precioTotal = item.precio.toFixed(2); // Formatear el precio total a 2 decimales
        const precioUnitario = (precioTotal / cantidad).toFixed(2); // Calcular precio unitario y formatearlo a 2 decimales

        // Si el contenido excede la página actual, agregamos una nueva página
        if (y > 280) {
          doc.addPage();
          totalPages++;
          y = 20; // Reiniciamos la posición y para la nueva página
        }

        doc.text(`${nombreProducto} - ${cantidad} unidades`, 20, y);
        y += 10;
        doc.text(`Precio Unitario: ${precioUnitario} €`, 30, y);
        y += 10;
        doc.text(`Precio Total: ${precioTotal} €`, 30, y);
        y += 10;
      });

      // Agregamos el número de página al pie de cada página
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Página ${i} de ${totalPages}`, 160, 280); // Ajustamos aquí la posición x
      }

      const fileName = `Ticket_Pedido_${pedido._id}.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('Error al generar el ticket:', err);
    }
  };

  const toggleExpand = (pedidoId) => {
    setExpanded((prevState) => ({
      ...prevState,
      [pedidoId]: !prevState[pedidoId]
    }));
  };

  if (loading) {
    return <Loader />; // Muestra el Loader mientras se carga
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pedidosContainer">
      <h2>Mis Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos realizados.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido._id} className="pedidoItem">
            <div className="pedidoDetails">
              <h3>Pedido {pedido._id}</h3>
              <p>Fecha: {new Date(pedido.fechaCompra).toLocaleDateString()}</p>
              <p>Precio Total: {pedido.precioTotal} €</p>
              {expanded[pedido._id] ? (
                <>
                  {pedido.items.map((item) => (
                    <div key={item.item._id} className="productoItem">
                      <p>{item.nombre} - {item.cantidad} unidades</p>
                      <p>Precio: {item.precio.toFixed(2)} €</p> {/* Asegúrate de que el precio se muestre con 2 decimales */}
                    </div>
                  ))}
                  <button className="mostrarMasButton" onClick={() => toggleExpand(pedido._id)}>
                    Mostrar Menos
                  </button>
                </>
              ) : (
                <button className="mostrarMasButton" onClick={() => toggleExpand(pedido._id)}>
                  Mostrar Más
                </button>
              )}
            </div>
            <button className="downloadTicketButton" onClick={() => handleDownloadTicket(pedido._id)}>
              Descargar Ticket
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Pedidos;
