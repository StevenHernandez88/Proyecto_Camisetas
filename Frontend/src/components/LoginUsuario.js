import React, { useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../services/DataProvider";
import { Link  } from "react-router-dom";
import loginImage from '../img/login.webp';

const LoginUsuario = () => {
  const { handleLogin } = useContext(DataContext);
  const [formData, setFormData] = useState({
    email: "",
    contraseña: ""
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
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
          </div>
          <Link to="/recuperarContraseña" className="forgot-password">
            ¿Olvidó su contraseña?
          </Link>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginUsuario;