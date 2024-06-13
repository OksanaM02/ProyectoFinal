import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Usuario no autenticado");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get('https://proyectofinal-qayw.onrender.com/carrito/vercarrito', config);

      if (response.data && Array.isArray(response.data.items)) {
        setCartItems(response.data.items);
        calculateTotalPrice(response.data.items);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Error fetching cart items');
      setLoading(false);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.cantidad * item.item.precio, 0);
    setTotalPrice(total);
  };

  const handleIncreaseQuantity = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Usuario no autenticado");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const itemToUpdate = cartItems.find(item => item.item._id === itemId);
      if (!itemToUpdate) {
        setError('Ítem no encontrado en el carrito');
        return;
      }

      const newQuantity = itemToUpdate.cantidad + 1;

      const response = await axios.patch(`https://proyectofinal-qayw.onrender.com/carrito/updateItem`, {
        pastelId: itemId,
        cantidad: newQuantity
      }, config);

      if (response.status === 200) {
        fetchCartItems();
      } else {
        setError('Error al aumentar cantidad del ítem');
      }
    } catch (error) {
      console.error('Error al aumentar cantidad del ítem:', error);
      setError('Error al aumentar cantidad del ítem');
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Usuario no autenticado");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const itemToUpdate = cartItems.find(item => item.item._id === itemId);
      if (!itemToUpdate) {
        setError('Ítem no encontrado en el carrito');
        return;
      }

      const newQuantity = itemToUpdate.cantidad - 1;

      if (newQuantity < 0) {
        setError('La cantidad no puede ser menor que 0');
        return;
      }

      const response = await axios.patch(`https://proyectofinal-qayw.onrender.com/carrito/updateItem`, {
        pastelId: itemId,
        cantidad: newQuantity
      }, config);

      if (response.status === 200) {
        fetchCartItems();
      } else {
        setError('Error al disminuir cantidad del ítem');
      }
    } catch (error) {
      console.error('Error al disminuir cantidad del ítem:', error);
      setError('Error al disminuir cantidad del ítem');
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Usuario no autenticado");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Hacer la solicitud para finalizar la compra en el backend
      await axios.post('https://proyectofinal-qayw.onrender.com/compraFinalizada/finalizarCompra', {}, config);

      // Limpiar el carrito en el frontend
      setCartItems([]);
      setTotalPrice(0);

      // Mostrar el mensaje de éxito
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
      setError('Error al finalizar la compra');
    }
  };

  const closeModal = () => {
    onClose(); // Cerrar el carrito desde el componente padre
    setShowSuccessPopup(false); // Asegurarse de que el mensaje de éxito se cierre al cerrar el carrito
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="cart-modal">
        <div className="cart-content">
          <button className="close-cart" onClick={closeModal}>Cerrar</button>
          <h2>Carrito de Compras</h2>
          {cartItems.length > 0 ? (
            <div className="cart-items-container">
              {cartItems.map(item => (
                <div key={item._id} className="cart-item-container">
                  <div className="cart-item">
                    <img src={`/images/${item.item.foto}`} alt={item.item.nombre} className="cart-item-image" />
                    <div className="cart-item-details">
                      <div className="product-info">
                        <div>
                          <h3 className="cart-item-name">{item.item.nombre}</h3>
                        </div>
                        <div className="quantity-controls">
                          <button onClick={() => handleIncreaseQuantity(item.item._id)}>+</button>
                          <p>{item.cantidad}</p>
                          <button onClick={() => handleDecreaseQuantity(item.item._id)} disabled={item.cantidad === 0}>-</button>
                        </div>
                      </div>
                      <p className="cart-item-price">Precio: {item.cantidad * item.item.precio} €</p>
                    </div>
                  </div>
                </div>
              ))}
              <h3>Total: {totalPrice} €</h3>
              <button className="checkout-button" onClick={handleCheckout}>Finalizar Compra</button>
            </div>
          ) : (
            <p>El carrito está vacío</p>
          )}
        </div>
      </div>

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-content">
            <p>Compra realizada con éxito.</p>
            <button className="close-success-popup" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
