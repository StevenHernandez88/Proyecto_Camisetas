import React, { useState } from 'react';
import axios from 'axios';
import registroImage from '../img/register.webp';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    idusuario: '',
    nombre: '',
    email: '',
    rol_id: '2', // Predeterminado a Cliente
    direccion: '',
    telefono: '',
    biografia: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        formData.rol_id === '2'
          ? 'http://localhost:3000/usuarios/crearUsuarioCliente'
          : 'http://localhost:3000/usuarios/crearUsuarioArtista';

      const response = await axios.post(url, formData);
      if (response.status === 201) {
        alert('Usuario creado exitosamente, revise correo electronico para credenciales');
        // Limpiar el formulario después del éxito
        setFormData({
          idusuario: '',
          nombre: '',
          email: '',
          rol_id: '2',
          direccion: '',
          telefono: '',
          biografia: ''
        });
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear usuario');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-image">
        <img src={registroImage} alt="Registro" />
      </div>
      <div className="registro">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Documento identificación:</label>
              <input
                type="text"
                name="idusuario"
                value={formData.idusuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Rol:</label>
              <select 
                name="rol_id" 
                value={formData.rol_id} 
                onChange={handleChange} 
                required
              >
                <option value="2">Cliente</option>
                <option value="3">Artista</option>
              </select>
            </div>

            {formData.rol_id === '2' && (
              <>
                <div className="input-group">
                  <label>Dirección:</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {formData.rol_id === '3' && (
              <div className="input-group full-width">
                <label>Biografía:</label>
                <textarea
                  name="biografia"
                  value={formData.biografia}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroUsuario;