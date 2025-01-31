import React, { useState } from 'react';
import axios from 'axios';

const UploadModel = () => {
    const [descripcion, setDescripcion] = useState('');
    const [material,setMaterial] = useState('');
    const [rating_id,setRating_id] = useState('');
    const [modelo, setModelo] = useState(null);
    const [stock,setStock] = useState('');

    const handleFileChange = (e) => {
        setModelo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('descripcion', descripcion);
        formData.append('material', material);
        formData.append('rating_id', rating_id);
        formData.append('modelo', modelo);
        formData.append('stock', stock)

        try {
            await axios.post('http://localhost:3000/modelo/crearModelo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Modelo subido exitosamente');
        } catch (error) {
            console.error('Error al subir Modelo', error);
        }
    };

    return (
        <div className='upload-stamp'>
            <form onSubmit={handleSubmit}>
                <label>
                    Descripción:
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </label>
                <label>
                    Material:
                    <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} required />
                </label>
                <label>
                    Rating_id:
                    <input type="text" value={rating_id} onChange={(e) => setRating_id(e.target.value)} required />
                </label>
                <label>
                    modelo:
                    <input type="file" onChange={handleFileChange} required />
                </label>
                <label>
                    Stock:
                    <textarea value={stock} onChange={(e) => setStock(e.target.value)} />
                </label>
                <button type="submit">Subir Modelo</button>
            </form>
        </div>
    );
};

export default UploadModel;
