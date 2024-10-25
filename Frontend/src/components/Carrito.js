import React, { useContext, useCallback } from "react";
import axios from 'axios';
import { DataContext } from "../services/DataProvider";
import { useNavigate } from 'react-router-dom';

export const Carrito = () => {
  const navigate = useNavigate();
  const { carrito, menu, setMenu, increaseQuantity, decreaseQuantity, removeItem, idusuario } = useContext(DataContext);
  
  const toggleFalse = useCallback(() => {
    setMenu(false);
  }, [setMenu]);

  const handlePagar = useCallback(() => {
    setMenu(false);
    if (idusuario) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  }, [idusuario, navigate, setMenu]);

  const handleIncrease = useCallback(async (index) => {
    const item = carrito[index];
    
    try {
      const response = await axios.get(`http://localhost:3000/modelo/${item.idmodelo}/stock`);
      const stockDisponible = response.data.stock;
  
      if (item.cantidad < stockDisponible) {
        increaseQuantity(index);
      } else {
        alert(`Lo sentimos, solo tenemos ${stockDisponible} unidades disponibles para este modelo.`);
      }
    } catch (error) {
      console.error('Error al verificar el stock:', error);
      alert('Error al verificar el stock. Por favor, inténtelo de nuevo.');
    }
  }, [carrito, increaseQuantity]);

  const handleDecrease = useCallback((index) => {
    decreaseQuantity(index);
  }, [decreaseQuantity]);

  if (!carrito) {
    return null;
  }

  const show1 = menu ? "carritos show" : "carrito";
  const show2 = menu ? "carrito show" : "carrito";

  return (
    <div className={show1}>
      <div className={show2}>
        <div className="carrito_close" onClick={toggleFalse}>
          <box-icon name="x"></box-icon>
        </div>
        <h2>Su carrito</h2>
        <div className="carrito_center">
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            carrito.map((item, index) => (
              <div key={index} className="carrito_item">
                <div className="carrito_item_image">
                  <img src={item.image} alt="Camiseta" className="camiseta-image" />
                  <img src={item.stamp.url_imagen} alt={item.stamp.nombre} className="stamp-image" />
                </div>
                <div className="carrito_item_details">
                  <h3>Talla: {item.talla}</h3>
                  <p className="precio">${item.precio}</p>
                </div>
                <div className="carrito_item_quantity">
                  <box-icon 
                    name="up-arrow" 
                    type="solid" 
                    onClick={() => handleIncrease(index)}
                    style={{ cursor: 'pointer' }}
                  ></box-icon>
                  <p className="cantidad">{item.cantidad}</p>
                  <box-icon 
                    name="down-arrow" 
                    type="solid" 
                    onClick={() => handleDecrease(index)}
                    style={{ cursor: 'pointer' }}
                  ></box-icon>
                </div>
                <div className="remove_item">
                  <box-icon 
                    name="trash" 
                    onClick={() => removeItem(index)}
                    style={{ cursor: 'pointer' }}
                  ></box-icon>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="carrito_footer">
          <h3>Total: ${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)}</h3>
          <button className="btn" onClick={handlePagar}>Pagar</button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;