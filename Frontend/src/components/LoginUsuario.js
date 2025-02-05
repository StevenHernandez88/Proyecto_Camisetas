import React, { useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../services/DataProvider";
import { Link } from "react-router-dom";
import loginImage from '../img/login.webp';
import { Eye, EyeOff } from 'lucide-react';

const LoginUsuario = () => {
  const { handleLogin } = useContext(DataContext);
  const [formData, setFormData] = useState({
    email: "",
    contraseña: ""
  });
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await axios.post("http://localhost:3000/login", formData);
      if (response.status === 200) {
        const { idusuario, rol_id, email } = response.data;
        handleLogin(idusuario, rol_id, email);
        alert("Inicio de sesión exitoso");
        setFormData({ email: "", contraseña: "" });
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="login">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="input-group mt-4">
            <label>Contraseña:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-blue-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
          <Link to="/recuperarContraseña" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
            ¿Olvidó su contraseña?
          </Link>
          <button 
            type="submit" 
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginUsuario;