import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../services/DataProvider';

const UploadStamp = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [errorImagen, setErrorImagen] = useState(''); // Mensaje de error para el archivo
    const [categorias, setCategorias] = useState([]); // Categorías desde el backend
    const [categoriaId, setCategoriaId] = useState(''); // Selección de categoría
    const { idusuario } = useContext(DataContext);

    // Cargar categorías desde el backend
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categorias/getCategorias');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorías', error);
            }
        };
        fetchCategorias();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const validFormats = ['image/png', 'image/jpeg']; // Formatos permitidos

        if (file && validFormats.includes(file.type)) {
            setImagen(file);
            setErrorImagen(''); // Resetear el mensaje de error
        } else {
            setImagen(null);
            setErrorImagen('Por favor, selecciona una imagen en formato PNG o JPG.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagen) {
            setErrorImagen('Debe subir una imagen válida antes de enviar.');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('artista_id', idusuario);
        formData.append('imagen', imagen);
        formData.append('categoria_id', categoriaId); 

        try {
            await axios.post('http://localhost:3000/estampas/crearEstampa', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Estampa subida exitosamente');
        } catch (error) {
            console.error('Error al subir estampa', error);
        }
    };

    return (
        <div className='upload-stamp'>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </label>
                <label>
                    Descripción:
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </label>
                <label>
                    Imagen:
                    <input type="file" onChange={handleFileChange} required />
                    {errorImagen && <p style={{ color: 'red' }}>{errorImagen}</p>}
                </label>
                <label>
                    Categoría:
                    <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
                        <option value="">Seleccione Categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.idcategoria} value={categoria.idcategoria}>
                                {categoria.descripcion}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Subir Estampa</button>
            </form>
        </div>
    );
};

export default UploadStamp;
