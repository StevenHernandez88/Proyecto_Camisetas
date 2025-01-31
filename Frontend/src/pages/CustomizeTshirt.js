import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../services/DataProvider';

const CustomizeTshirt = () => {
  const [talla, setTalla] = useState('');
  const [stamps, setStamps] = useState([]);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { image, idmodelo, material } = location.state || {};
  const { addToCart } = useContext(DataContext);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comentariosVisibles, setComentariosVisibles] = useState(3);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/ratings/comentarios`, { idmodelo });
        setComentarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
        setLoading(false);
      }
    };

    if (idmodelo) {
      fetchComentarios();
    }
  }, [idmodelo]);

  useEffect(() => {
    const fetchStamps = async () => {
      try {
        const response = await axios.get('http://localhost:3000/estampas/getEstampasActivas');
        setStamps(response.data);
      } catch (error) {
        console.error('Error al obtener las estampas:', error);
      }
    };

    fetchStamps();
  }, []);

  const handleStampSelect = (stamp) => {
    setSelectedStamp(stamp);
  };

  const handleCustomization = async (e) => {
    e.preventDefault();
  
    if (!talla || !selectedStamp || !idmodelo) {
      alert("Por favor, asegúrese de seleccionar una talla, una estampa y que el modelo esté definido.");
      return;
    }
  
    try {
      const stockResponse = await axios.get(`http://localhost:3000/modelo/${idmodelo}/stock`);
      const stockDisponible = stockResponse.data.stock;

      if (stockDisponible > 0) {
        const dataToSend = {
          modelo_id: parseInt(idmodelo, 10),
          estampa_id: parseInt(selectedStamp.idestampas, 10),
          talla: talla,
          precio: 44000
        };
      
        try {
          const response = await axios.post('http://localhost:3000/camisetas/crearCamisetas', dataToSend, {
            headers: { 'Content-Type': 'application/json' },
          });
      
          const idcamiseta = response.data.idcamisetas;
      
          const product = {
            idmodelo,
            idcamiseta,
            image,
            talla,
            stamp: selectedStamp,
            precio: 44000,
            cantidad: 1,
            material,
          };
      
          addToCart(product);
          alert('Camiseta añadida al carrito exitosamente');
          
          navigate('/');
        } catch (error) {
          console.error('Error al crear la camiseta', error.response ? error.response.data : error.message);
          alert('Error al crear la camiseta. Por favor, inténtelo de nuevo.');
        }
      } else {
        alert('No hay modelos disponibles');
      }
    } catch (error) {
      console.error('Error al verificar el stock', error);
      alert('Error al verificar el stock. Por favor, inténtelo de nuevo.');
    }
  };

  const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    return (
      [...Array(5)].map((_, i) => (
        <span key={i} className={`star ${i < filledStars ? 'filled' : ''}`}>&#9733;</span>
      ))
    );
  };

  return (
    <div className="CustomizeTshirt">
      <h1>Personalizar Camiseta</h1>
      
      <div className="tshirt-preview">
        {image && (
          <div className="tshirt-image-container">
            <img src={image} alt="Camiseta Seleccionada" className="selected-image" />
            {selectedStamp && (
              <img
                src={selectedStamp.url_imagen}
                alt={`Estampa: ${selectedStamp.nombre}`}
                className="stamp-image"
              />
            )}
          </div>
        )}
      </div>

      <select value={talla} onChange={(e) => setTalla(e.target.value)}>
        <option value="">Seleccione Talla</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
        <option value="XXXL">XXXL</option>
      </select>

      <h2>Precio: 44.000</h2>

      <button onClick={handleCustomization}>Añadir al carrito</button>

      <h2>Seleccione una Estampa</h2>
      <div className="stamp-gallery">
        {stamps.map((stamp, index) => (
          <div key={index} className="stamp-item" onClick={() => handleStampSelect(stamp)}>
            <img src={stamp.url_imagen} alt={`Estampa ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="comentarios-section">
        <h2>Comentarios y Calificaciones</h2>
        {loading ? (
          <p>Cargando comentarios...</p>
        ) : comentarios.length === 0 ? (
          <p>No hay comentarios para este modelo.</p>
        ) : (
          comentarios.slice(0, comentariosVisibles).map((comentario, index) => (
            <div key={index} className="comentario">
              <p><strong>{comentario.nombre}</strong> - {new Date(comentario.fecha_rating).toLocaleDateString()}</p>
              <div className="rating">
                {renderStars(comentario.rating)}
              </div>
              <p>{comentario.comentario}</p>
            </div>
          ))
        )}

        {comentarios.length > comentariosVisibles && (
          <button onClick={() => setComentariosVisibles(comentariosVisibles + 3)}>
            Ver más
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomizeTshirt;
