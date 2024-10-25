import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

const MostrarModelos = () => {
    const [loaded, setLoaded] = useState(false);
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get('http://localhost:3000/modelo/getModelosConRatings');
                setModels(response.data);
            } catch (error) {
                console.error('Error al obtener los modelos:', error);
            }
        };
    
        fetchModels();
    }, []);

    const handlePersonalizar = (model) => {
        navigate('/customize', { state: { image: model.url_modelo, idmodelo: model.idmodelo, material: model.material, descripcion: model.descripcion, stock: model.stock } });
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
        <div className="ImagenesModelos">
            <h1>Galería de Modelos</h1>
            <div className="modelo-grid">
                {models.map((model, index) => (
                    <div key={index} className="modelo-card">
                        <img
                            src={model.url_modelo}
                            alt={`Modelo ${index + 1}`}
                            className={loaded ? 'loaded' : ''}
                            onLoad={() => setLoaded(true)}
                        />
                        <div className="modelo-info">
                            <h2>Modelo {index + 1}</h2>
                            <div className="rating">
                                {renderStars(model.rating)}
                            </div>
                            <p>{model.nombre}</p>
                            <p>Material: {model.material}</p>
                            <button 
                                className="personalizar-btn" 
                                onClick={() => handlePersonalizar(model)}>Personalizar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ChatBot />  {/* Añadimos el componente ChatBot aquí */}
        </div>
    );
};

export default MostrarModelos;