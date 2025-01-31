import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StampManagement = () => {
  const [stamps, setStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStamps();
  }, []);

  const fetchStamps = async () => {
    try {
      const response = await axios.get('http://localhost:3000/estampas/getAllEstampas');
      setStamps(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar Stamp:', error);
      setError('Error al cargar los Stamp. Por favor, intente más tarde.');
      setLoading(false);
    }
  };

  const toggleStampStatus = async (idestampas, currentStatus) => {
    try {
      await axios.post(`http://localhost:3000/estampas/toggleStampStatus`, { idestampas, activo: !currentStatus });
      fetchStamps();
    } catch (error) {
      console.error('Error al actualizar estado del Stampo:', error);
      setError('Error al actualizar el estado. Por favor, intente más tarde.');
    }
  };

  if (loading) {
    return (
      <div className="Stamps-loading-state">
        <div className="loading-spinner"></div>
        <p>Cargando Estampas...</p>
      </div>
    );
  }

  if (error) {
    return <div className="Stamps-error-state">{error}</div>;
  }

  return (
    <div className="Stamps-container">
      <div className="Stamps-header">
        <h2 className="Stamps-title">Gestión de Estampas</h2>
      </div>
      
      <div className="Stamps-grid">
        {stamps.map((stamp) => (
          <div key={stamp.idestampas} className="Stamp-card">
            <div className="Stamp-image-container">
              <img 
                src={stamp.url_imagen} 
                alt={stamp.descripcion}
                className="Stamp-image"
              />
            </div>
            <div className="Stamp-content">
              <h3 className="Stamp-name">{stamp.descripcion}</h3>
              <div className="Stamp-details">
                <div className="detail-item">
                  <span className="detail-label">Descripción</span>
                  <span className="detail-value">{stamp.descripcion}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Estado:</span>
                  <span className={`status-badge ${stamp.activo ? 'active' : 'inactive'}`}>
                    {stamp.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleStampStatus(stamp.idestampas, stamp.activo)}
                className={`status-toggle-button ${stamp.activo ? 'deactivate' : 'activate'}`}
              >
                {stamp.activo ? 'Deshabilitar' : 'Habilitar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StampManagement;