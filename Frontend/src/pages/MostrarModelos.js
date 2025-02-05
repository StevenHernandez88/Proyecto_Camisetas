import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

const MostrarModelos = () => {
    const [loaded, setLoaded] = useState(false);
    const [models, setModels] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('default');
    const navigate = useNavigate();

    // Fetch models based on sorting criteria
    const fetchModels = async (criteria = 'default') => {
        try {
            let response;
            switch(criteria) {
                case 'rating':
                    response = await axios.get('http://localhost:3000/modelo/getModelosOrdenados?criterio=rating');
                    break;
                case 'material':
                    response = await axios.get('http://localhost:3000/modelo/getModelosOrdenados?criterio=material');
                    break;
                case 'popularity':
                    response = await axios.get('http://localhost:3000/modelo/getModelosConRatings');
                    // For popularity, use the same data structure as default
                    break;
                default:
                    response = await axios.get('http://localhost:3000/modelo/getModelosConRatings');
            }

            // Directly set the models without any special mapping
            setModels(response.data);
        } catch (error) {
            console.error('Error al obtener los modelos:', error);
        }
    };

    // Initial fetch and fetch when sorting changes
    useEffect(() => {
        fetchModels(sortCriteria);
    }, [sortCriteria]);

    const handlePersonalizar = (model) => {
        navigate('/customize', { 
            state: { 
                image: model.url_modelo, 
                idmodelo: model.idmodelo, 
                material: model.material, 
                descripcion: model.descripcion, 
                stock: model.stock 
            } 
        });
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
            
            {/* Sorting Dropdown */}
            <div className="sorting-container">
                <label htmlFor="sort-select">Ordenar por: </label>
                <select 
                    id="sort-select"
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                >
                    <option value="default">Predeterminado</option>
                    <option value="rating">Mejor Calificado</option>
                    <option value="material">Material</option>
                    <option value="popularity">Más Popular</option>
                </select>
            </div>

            <div className="modelo-grid">
                {models.map((model, index) => (
                    <div key={index} className="modelo-card">
                        {model.url_modelo ? (
                            <img
                                src={model.url_modelo}
                                alt={`Modelo ${index + 1}`}
                                className={loaded ? 'loaded' : ''}
                                onLoad={() => setLoaded(true)}
                            />
                        ) : (
                            <div className="placeholder-image">
                                Modelo {model.modelo || `${index + 1}`}
                            </div>
                        )}
                        <div className="modelo-info">
                            <h2>{model.modelo || `Modelo ${index + 1}`}</h2>
                            {model.rating !== undefined && (
                                <div className="rating">
                                    {renderStars(model.rating)}
                                </div>
                            )}
                            <p>Material: {model.material}</p>
                            <button 
                                className="personalizar-btn" 
                                onClick={() => handlePersonalizar(model)}
                                disabled={!model.url_modelo}
                            >
                                Personalizar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ChatBot /> 
        </div>
    );
};

export default MostrarModelos;