import React, { useState } from 'react';
import axios from 'axios';

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
    <div className='registro'>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Documento identificación:</label>
          <input
            type="text"
            name="idusuario"
            value={formData.idusuario}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <select name="rol_id" value={formData.rol_id} onChange={handleChange} required>
            <option value="2">Cliente</option>
            <option value="3">Artista</option>
          </select>
        </div>

        {/* Mostrar campos adicionales basados en el rol seleccionado */}
        {formData.rol_id === '2' && (
          <>
            <div>
              <label>Direccion:</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Telefono:</label>
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
          <div>
            <label>Biografía:</label>
            <input
              type="text"
              name="biografia"
              value={formData.biografia}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
