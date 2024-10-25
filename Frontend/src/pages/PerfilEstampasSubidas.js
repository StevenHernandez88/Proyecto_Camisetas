import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../services/DataProvider';
import { useNavigate } from 'react-router-dom';

const PerfilEstampasSubidas = () => {
  const [artistaInfo, setArtistaInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { idusuario } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtistaInfo = async () => {
      try {
        const response = await axios.post('http://localhost:3000/usuarios/getInformacionArtista', { idusuario });
        setArtistaInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información del artista:', error);
        setLoading(false);
      }
    };

    fetchArtistaInfo();
  }, [idusuario]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(artistaInfo.estampas.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(artistaInfo.estampas.length / 4)) % Math.ceil(artistaInfo.estampas.length / 4));
  };

  const handleUploadStamp = () => {
    navigate('/uploadStamp');
  };

  if (loading) {
    return <div className="loading">Cargando información...</div>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1>Perfil del Artista</h1>
      </div>
      <div className="perfil-info">
        <p><strong>ID Usuario:</strong> {artistaInfo.idusuario}</p>
        <p><strong>Nombre:</strong> {artistaInfo.nombre}</p>
        <p><strong>Email:</strong> {artistaInfo.email}</p>
        <p><strong>Biografía:</strong> {artistaInfo.biografia}</p>
      </div>

      <div className="estampas-container">
        <h2>Estampas Subidas</h2>
        {artistaInfo.estampas && artistaInfo.estampas.length > 0 ? (
          <div className="carousel">
            <button onClick={prevSlide} className="carousel-button prev">&lt;</button>
            <div className="carousel-content">
              {artistaInfo.estampas.slice(currentSlide * 4, (currentSlide + 1) * 4).map((estampa, index) => (
                <div key={index} className="estampa-item">
                  <img src={estampa.url_imagen} alt={estampa.nombreestampa} className="estampa-image" />
                  <div className="estampa-details">
                    <h3>{estampa.nombreestampa}</h3>
                    <p>{estampa.descripcionestampa}</p>
                    <p><strong>Categoría:</strong> {estampa.descripcioncategoria}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextSlide} className="carousel-button next">&gt;</button>
          </div>
        ) : (
          <p>No has subido ninguna estampa.</p>
        )}
      </div>

      <button onClick={handleUploadStamp} className="upload-button">Agregar Estampa</button>
    </div>
  );
};

export default PerfilEstampasSubidas;