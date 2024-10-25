import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../services/DataProvider';

function Rating() {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { idusuario } = useContext(DataContext);
  const models = location.state?.models || [];

  const handleRating = (modelId, rating) => {
    setRatings(prev => ({ ...prev, [modelId]: rating }));
  };

  const handleComment = (modelId, comment) => {
    setComments(prev => ({ ...prev, [modelId]: comment }));
  };

  const submitRatings = async () => {
    try {
      await Promise.all(models.map(model => 
        axios.post('http://localhost:3000/ratings/crearRatings', { 
          cliente_id: idusuario,
          modelo_id: model.modelId, 
          rating: ratings[model.modelId] || 0, 
          comentario: comments[model.modelId] || ''
        })
      ));
      navigate('/');
    } catch (error) {
      console.error('Error submitting ratings:', error);
    }
  };

  return (
    <div>
      <h1>Califica tu compra</h1>
      {models.map(model => (
        <div key={model.modelId}>
          <h2>Modelo {model.modelId}</h2>
          <img src={model.image} alt={`Modelo ${model.modelId}`} style={{width: '100px', height: 'auto'}} />
          <div>
            {[1, 2, 3, 4, 5].map(star => (
              <span 
                key={star} 
                onClick={() => handleRating(model.modelId, star)}
                style={{ cursor: 'pointer', color: star <= (ratings[model.modelId] || 0) ? 'gold' : 'gray' }}
              >
                ★
              </span>
            ))}
          </div>
          <textarea 
            value={comments[model.modelId] || ''} 
            onChange={(e) => handleComment(model.modelId, e.target.value)}
            placeholder="Deja un comentario..."
          />
        </div>
      ))}
      <button onClick={submitRatings}>Enviar calificaciones</button>
    </div>
  );
}

export default Rating;