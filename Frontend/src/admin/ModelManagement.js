import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelManagement = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:3000/modelo/getAllModelosWithStatus');
      setModels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar modelos:', error);
      setError('Error al cargar los modelos. Por favor, intente más tarde.');
      setLoading(false);
    }
  };

  const toggleModelStatus = async (modelId, currentStatus) => {
    try {
      await axios.post(`http://localhost:3000/modelo/toggleModelStatus`, { idmodelo: modelId, activo: !currentStatus });
      fetchModels();
    } catch (error) {
      console.error('Error al actualizar estado del modelo:', error);
      setError('Error al actualizar el estado. Por favor, intente más tarde.');
    }
  };

  if (loading) {
    return (
      <div className="models-loading-state">
        <div className="loading-spinner"></div>
        <p>Cargando modelos...</p>
      </div>
    );
  }

  if (error) {
    return <div className="models-error-state">{error}</div>;
  }

  return (
    <div className="models-container">
      <div className="models-header">
        <h2 className="models-title">Gestión de Modelos</h2>
      </div>
      
      <div className="models-grid">
        {models.map((model) => (
          <div key={model.idmodelo} className="model-card">
            <div className="model-image-container">
              <img 
                src={model.url_modelo} 
                alt={model.descripcion}
                className="model-image"
              />
            </div>
            <div className="model-content">
              <h3 className="model-name">{model.descripcion}</h3>
              <div className="model-details">
                <div className="detail-item">
                  <span className="detail-label">Material:</span>
                  <span className="detail-value">{model.material}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Stock:</span>
                  <span className="detail-value">{model.stock}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Estado:</span>
                  <span className={`status-badge ${model.activo ? 'active' : 'inactive'}`}>
                    {model.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleModelStatus(model.idmodelo, model.activo)}
                className={`status-toggle-button ${model.activo ? 'deactivate' : 'activate'}`}
              >
                {model.activo ? 'Deshabilitar' : 'Habilitar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelManagement;