import React, { useState, useContext } from "react";
import axios from 'axios';
import { DataContext } from '../services/DataProvider';

const LoginUsuario = () => {
  const { handleLogin } = useContext(DataContext);
  const [formData, setFormData] = useState({
    email: '',
    contraseña: ''
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
      const response = await axios.post('http://localhost:3000/login', formData);
      if (response.status === 200) {
        const { idusuario, rol_id, email } = response.data;

        // Usar la función handleLogin del contexto
        handleLogin(idusuario, rol_id, email);

        alert('Inicio de sesión exitoso');
        // Limpiar el formulario después del éxito
        setFormData({
          email: '',
          contraseña: ''
        });
      } else {
        alert('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };


  return (
    <div className='login'>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginUsuario;
