import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MostrarEstampas = () => {
    const [stamps, setStamps] = useState([]);

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

    return (
        <div>
            <h1>Galería de Estampas</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {stamps.map((stamp, index) => (
                    <div key={index} style={{ width: '200px', height: '200px' }}>
                        <img 
                            src={stamp} 
                            alt={`Estampa ${index + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostrarEstampas;
