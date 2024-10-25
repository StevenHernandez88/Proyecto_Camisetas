import React, { useContext, useState } from 'react';
import { DataContext } from '../services/DataProvider';
import { useNavigate } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import axios from 'axios';

function Checkout() {
  const { carrito, clearCart, idusuario, email } = useContext(DataContext);
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    setLoading(true);
  
    try {
      // Verificar el stock para cada producto en el carrito antes de continuar
      const erroresStock = [];
      for (const item of carrito) {
        const response = await axios.get(`http://localhost:3000/modelo/${item.idmodelo}/stock`);
        const stockDisponible = response.data.stock;
  
        if (item.cantidad > stockDisponible) {
          erroresStock.push({
            modelo: item.idmodelo,
            disponible: stockDisponible,
            solicitado: item.cantidad,
          });
        }
      }
  
      // Si hay problemas de stock, mostrar una alerta con los detalles y detener el proceso
      if (erroresStock.length > 0) {
        const mensajeError = erroresStock.map(e => 
          `Modelo ${e.modelo}: solicitado ${e.solicitado}, disponible ${e.disponible}`
        ).join('\n');
        alert(`No hay suficiente stock para los siguientes productos:\n${mensajeError}`);
        setLoading(false);
        return;
      }
  
      // Si no hay problemas de stock, proceder con el pedido
      const pedidoResponse = await axios.post('http://localhost:3000/pedidos/crearPedido', {
        cliente_id: parseInt(idusuario),
        total: total,
        estado_id: 6
      });
  
      const idpedido = pedidoResponse.data.idpedidos;
  
      const camisetas = carrito.map(item => item.idcamiseta);
      const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0); 
      const precioUnitario = carrito.length > 0 ? carrito[0].precio : 0;

      // Actualizar el stock para cada modelo en el carrito
      for (const item of carrito) {
        await axios.post('http://localhost:3000/modelo/actualizarStock', {
          cantidad: item.cantidad,  // Cantidad comprada
          idmodelo: item.idmodelo    // Modelo de la camiseta
        });
      }
  
      // Generar el PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      page.drawText('Resumen de Compra', { x: 50, y: 700, size: 30 });
      
      let y = 650;
      carrito.forEach((item) => {
        page.drawText(`${item.cantidad}x ${item.material} - Talla ${item.talla} - $${item.precio * item.cantidad}`, { x: 50, y, size: 12 });
        y -= 20;
      });
  
      const pdfBytes = await pdfDoc.save();
  
      const pdfBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Base64
        reader.onerror = reject;
        reader.readAsDataURL(new Blob([pdfBytes], { type: 'application/pdf' }));
      });
  
      // Enviar detalles del pedido y PDF al backend
      await axios.post('http://localhost:3000/detallespedidos/crearDetallesPedidos', {
        pedido_id: idpedido,
        camisetas,
        cantidad: cantidadTotal,
        precio_unitario: precioUnitario,
        email,
        pdf: pdfBase64
      });
  
      clearCart();
      navigate('/rating', { 
        state: { 
          models: carrito.map(item => ({
            modelId: item.idmodelo,
            image: item.image,
          }))
        } 
      });
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
    } finally {
      setLoading(false);
    }
};
  

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className='pagar'>
      <h1>Finalizar Compra</h1>

      <div className="purchase-summary">
        <h2>Resumen de la compra:</h2>
        {carrito.map((item, index) => (
          <div key={index} className="purchase-item">
            <div className="purchase-item-image">
              <img 
                src={item.image} 
                alt="Modelo" 
                className="camiseta-image"
              />
              <img 
                src={item.stamp.url_imagen} 
                alt={item.stamp.nombre} 
                className="stamp-image"
              />
            </div>
            <div className="purchase-item-details">
              <p>Talla: {item.talla}</p>
              <p>Material: {item.material}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p className="precio">Precio: ${item.precio * item.cantidad}</p>
            </div>
          </div>
        ))}
        <h3>Total: ${total}</h3>
      </div>

      <div>
        <h2>Detalles del pago</h2>
        <form>
          <div>
            <label>Nombre en la tarjeta</label>
            <input 
              type="text" 
              name="name" 
              value={paymentDetails.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label>Número de tarjeta</label>
            <input 
              type="text" 
              name="cardNumber" 
              value={paymentDetails.cardNumber} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label>Fecha de expiración</label>
            <input 
              type="text" 
              name="expirationDate" 
              value={paymentDetails.expirationDate} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label>CVV</label>
            <input 
              type="text" 
              name="cvv" 
              value={paymentDetails.cvv} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label>Dirección de envío</label>
            <input 
              type="text" 
              name="address" 
              value={paymentDetails.address} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </form>
      </div>

      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Procesando...' : 'Comprar'}
      </button>
    </div>
  );
}

export default Checkout;