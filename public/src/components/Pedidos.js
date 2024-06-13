import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pedidos.css'; // Asegúrate de importar tu archivo CSS aquí
import jsPDF from 'jspdf';
import logo from '../assets/logo.png'; // Importa la imagen del logo

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
          // Inicializar expanded con false para cada pedido
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

        // Configurar contenido del PDF
        let y = 20; // Posición inicial

        // Logo
        doc.addImage(logo, 'JPEG', 75, 10, 60, 60); // Logo centrado

        // Título Raices Dulces
        doc.setFontSize(18);
        doc.setTextColor('#e77cb1'); // Color rosita
        doc.text(`Raices Dulces`, 105, 75, null, null, 'center');

        // Subtítulo Ticket de Pedido
        doc.setFontSize(14);
        doc.setTextColor('#000000'); // Color negro
        doc.text(`Ticket de Pedido`, 105, 90, null, null, 'center');

        // Número de Pedido
        doc.setFontSize(12);
        doc.text(`${pedido._id}`, 105, 105, null, null, 'center');

        y += 120; // Ajuste de posición para el resto de la información

        // Detalles de los productos
        doc.setFontSize(12);
        doc.text(`Fecha: ${fechaCompra}`, 20, y);
        y += 10;
        doc.text(`Nombre: ${nombreUsuario}`, 20, y);
        y += 10;
        y += 10;

        pedido.items.forEach((item, index) => {
          const nombreProducto = item.nombre;
          const cantidad = item.cantidad;
          const precioUnitario = item.precio;
          const precioTotal = cantidad * precioUnitario;

          doc.text(`${nombreProducto} - ${cantidad} unidades`, 20, y);
          y += 10;
          doc.text(`Precio Unitario: ${precioUnitario} €`, 30, y);
          y += 10;
          doc.text(`Precio Total: ${precioTotal} €`, 30, y);
          y += 10;
        });

        // Guardar el documento
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
      return <div>Cargando...</div>;
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
                        <p>Precio: {item.precio} €</p>
                      </div>
                    ))}
                    <button
                      className="mostrarMasButton"
                      onClick={() => toggleExpand(pedido._id)}
                    >
                      Mostrar Menos
                    </button>
                  </>
                ) : (
                  <button
                    className="mostrarMasButton"
                    onClick={() => toggleExpand(pedido._id)}
                  >
                    Mostrar Más
                  </button>
                )}
              </div>
              <button
                className="downloadTicketButton"
                onClick={() => handleDownloadTicket(pedido._id)}
              >
                Descargar Ticket
              </button>
            </div>
          ))
        )}
      </div>
    );
  };

  export default Pedidos;
