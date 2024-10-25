import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../services/DataProvider';

const PerfilHistorialCompra = () => {
  const [clienteInfo, setClienteInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { idusuario } = useContext(DataContext);

  useEffect(() => {
    const fetchClienteInfo = async () => {
      try {
        const response = await axios.post('http://localhost:3000/usuarios/getInformacionCliente', { idusuario });
        setClienteInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información del cliente:', error);
        setLoading(false);
      }
    };

    fetchClienteInfo();
  }, [idusuario]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(clienteInfo.historialCompras.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(clienteInfo.historialCompras.length / 4)) % Math.ceil(clienteInfo.historialCompras.length / 4));
  };

  if (loading) {
    return <div className="loading">Cargando información...</div>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1>Perfil del Cliente</h1>
      </div>
      <div className="perfil-info">
        <p><strong>ID Usuario:</strong> {clienteInfo.idusuario}</p>
        <p><strong>Nombre:</strong> {clienteInfo.nombre}</p>
        <p><strong>Email:</strong> {clienteInfo.email}</p>
        <p><strong>Dirección:</strong> {clienteInfo.direccion}</p>
        <p><strong>Teléfono:</strong> {clienteInfo.telefono}</p>
      </div>

      <div className="historial-container">
        <h2>Historial de Compras</h2>
        {clienteInfo.historialCompras && clienteInfo.historialCompras.length > 0 ? (
          <div className="carousel">
            <button onClick={prevSlide} className="carousel-button prev">&lt;</button>
            <div className="carousel-content">
              {clienteInfo.historialCompras.slice(currentSlide * 4, (currentSlide + 1) * 4).map((compra, index) => (
                <div key={index} className="compra-item">
                  <p><strong>Talla:</strong> {compra.talla}</p>
                  <p><strong>Precio:</strong> ${compra.precio}</p>
                  <div className="compra-item-image">
                    <img src={compra.url_modelo} alt="Camiseta" className="camiseta-image" />
                    <img src={compra.url_imagen} alt={compra.nombre_estampa} className="stamp-image" />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextSlide} className="carousel-button next">&gt;</button>
          </div>
        ) : (
          <p>No hay historial de compras disponible.</p>
        )}
      </div>
    </div>
  );
};

export default PerfilHistorialCompra;